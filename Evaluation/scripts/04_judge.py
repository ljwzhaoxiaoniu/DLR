# -*- coding: utf-8 -*-
"""Stage 4 — LLM Judge 仲裁循环(独立第二段,可中断续跑).

读 03_reports/{paradigm}.csv,对 strict_match=FAIL 且 judge_verdict 为空/UNKNOWN 的行:
  拼数据 prompt(Gold/Pred/工具链/Final Answer) → opencode run(cwd=oc_judge) → 写回该行.
判定规则只写在 Evaluation/oc_judge/AGENTS.md(五环节全对才翻盘,过程分每步 20%).
每判一题立即写回 CSV,中断后重跑自动续.

用法:
  python 04_judge.py --paradigm er --log-subdir <run_id> [--budget 100]
"""
import json, csv, argparse, re, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CFG = json.load(open(ROOT / "config.json", encoding="utf-8")) if (ROOT / "config.json").exists() else {}
_EVAL_OUT = CFG.get("eval", {}).get("output_dir", "Evaluation/outputs")
GOLD = json.load(open(ROOT / _EVAL_OUT / "00_golden_cache.json", encoding="utf-8"))
GOLD_MAP = {x["q_id"]: x for x in GOLD}
QUESTIONS = {q["question_id"]: q for q in json.load(open(ROOT / "MINIDEV_sqlite" / "mini_dev_sqlite.json", encoding="utf-8"))}
OUT_BASE = ROOT / _EVAL_OUT
LOG_DIR = OUT_BASE / "01_logs"
JUDGE_CWD = ROOT / "Evaluation" / "oc_judge"

CSV_FIELDS = ["q_id", "db_id", "strict_match", "judge_verdict", "judge_reason",
              "verdict", "process_score", "sql", "error", "input_tokens", "output_tokens"]


def load_trace(paradigm, qid, run_id=""):
    """从 Stage 1 NDJSON 提取工具调用链摘要 + Final Answer(供 judge 判来源合法性)."""
    f = (LOG_DIR / run_id / paradigm / f"{qid}.json") if run_id else (LOG_DIR / paradigm / f"{qid}.json")
    if not f.exists():
        return "", ""
    tools, final_answer = [], ""
    for line in f.read_text(encoding="utf-8", errors="replace").splitlines():
        try:
            ev = json.loads(line.strip())
        except:
            continue
        part = ev.get("part", {}) or {}
        if ev.get("type") == "tool_use":
            tools.append(part.get("tool", "?").replace("semantic-core_", ""))
        elif ev.get("type") == "text":
            m = re.findall(r"Final Answer[:：]\s*([^\n]+)", part.get("text", ""))
            if m:
                final_answer = m[-1].strip()
    return " -> ".join(tools), final_answer


def llm_judge(question, evidence, gold_res, pred_res, gold_sql, pred_sql, db_id,
              trace="", final_answer="", pred_path="", log_path="", qid=""):
    """opencode run 仲裁(规则在 oc_judge/AGENTS.md). 返回 (verdict, process, reason)."""
    # Prompt 只传数据(与评测 Agent 同一铁律); 知识层路径供 judge 查争议/口径
    know_path = ROOT / "rag_knowledge" / f"{db_id}.jsonl"
    skill_path = ROOT / "OC-based Agent Service" / "skills" / f"{db_id}.md"
    dispute_path = JUDGE_CWD / "disputes.md"
    prompt = (
        f"QID: {qid}\n"
        f"Q: {question}\n"
        f"Evidence: {evidence}\n"
        f"DB: {db_id}\n"
        f"GoldSQL: {gold_sql[:300]}\n"
        f"GoldResult: {json.dumps(gold_res, default=str)[:300]}\n"
        f"PredSQL: {pred_sql[:300]}\n"
        f"PredResult: {json.dumps(pred_res, default=str)[:300]}\n"
        f"AgentToolTrace: {trace[:400]}\n"
        f"AgentFinalAnswer: {final_answer[:200]}\n"
        f"PredJsonPath: {pred_path}\n"
        f"AgentLogPath: {log_path}\n"
        f"KnowledgePath: {know_path}\n"
        f"SkillPath: {skill_path if skill_path.exists() else '无'}\n"
        f"DisputePath: {dispute_path}"
    )
    try:
        # 用命令名走 PATH(不要用 shutil.which 解析出的 Windows .CMD 路径,
        # 否则 bash -c 包裹后反斜杠被当转义符,路径解析失败导致 120s 超时)
        # timeout: Judge 按 AGENTS.md 会读完整 AgentLogPath(NDJSON 最大 ~50KB)+PredJsonPath,
        # LLM 多轮读+推理需 2-4 分钟,120s 会误伤大日志题 → 300s
        r = subprocess.run(
            ['bash', '-c', 'opencode run --format json'],
            input=prompt,
            capture_output=True, text=True, timeout=300,
            encoding='utf-8', errors='replace', cwd=str(JUDGE_CWD)
        )
        reply = ""
        for line in r.stdout.splitlines():
            try:
                ev = json.loads(line.strip())
                if ev.get("type") == "text":
                    reply += ev["part"]["text"]
            except: pass
        v_m = re.search(r'(?:VERDICT|Judgment|判断)[\s:：\d]*\(?\s*\*?(CORRECT|INCORRECT)\*?\)?', reply, re.I)
        if not v_m:
            v_m = re.search(r'\*\*(CORRECT|INCORRECT)\*\*', reply, re.I)
        if not v_m:
            v_m = re.search(r'\b(CORRECT|INCORRECT)\b', reply, re.I)
        p_m = re.search(r'PROCESS[\s:：]*\*?(\d{1,3})', reply, re.I)
        r_m = re.search(r'(?:REASON|原因|分析)\s*[:：]?\s*(.+)', reply, re.I | re.S)
        verdict = v_m.group(1).upper() if v_m else "UNKNOWN"
        process = p_m.group(1) if p_m else ("100" if verdict == "CORRECT" else "")
        reason = r_m.group(1).strip() if r_m else reply[:200]
        return verdict, process, reason
    except Exception as e:
        return "UNKNOWN", "", str(e)[:200]


def save(csv_path, rows):
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=CSV_FIELDS, quoting=csv.QUOTE_ALL)
        w.writeheader()
        w.writerows(rows)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--paradigm", required=True, choices=["er", "dlr", "rdf"])
    ap.add_argument("--log-subdir", default="", help="Stage 1 run-id")
    ap.add_argument("--budget", type=int, default=100, help="本次最多仲裁几题(默认100)")
    a = ap.parse_args()

    run_id = a.log_subdir
    if not run_id:
        subdirs = sorted([d for d in LOG_DIR.iterdir() if d.is_dir()], reverse=True)
        if subdirs:
            run_id = subdirs[0].name
    base = OUT_BASE / run_id if run_id else OUT_BASE
    report_dir = base / "03_reports"
    pred_dir = base / "02_predictions" / a.paradigm
    csv_path = report_dir / f"{a.paradigm}.csv"
    if not csv_path.exists():
        print(f"[ERR] 先跑 03_evaluate.py,缺 {csv_path}")
        return

    rows = list(csv.DictReader(open(csv_path, encoding="utf-8")))
    todo = [r for r in rows if r["strict_match"] == "FAIL"
            and (not r.get("judge_verdict") or r.get("judge_verdict") == "UNKNOWN")]
    print(f"[{a.paradigm.upper()}] 待仲裁 {len(todo)} 题 (budget={a.budget})")

    n_done = n_flip = 0
    for r in todo[:a.budget]:
        qid = int(r["q_id"])
        gold = GOLD_MAP.get(qid)
        q = QUESTIONS.get(qid, {})
        pf = pred_dir / f"{qid}.json"
        if not gold or not pf.exists():
            continue
        rec = json.load(open(pf, encoding="utf-8"))
        pred_rows = (rec.get("result") or {}).get("rows", [])
        trace, fa = load_trace(a.paradigm, qid, run_id)

        v, proc, reason = llm_judge(
            q.get("question", ""), q.get("evidence", ""),
            gold["rows"] if gold.get("ok") else [], pred_rows,
            q.get("SQL", ""), r.get("sql", ""), gold["db_id"],
            trace=trace, final_answer=fa,
            pred_path=str(pf),
            log_path=str((LOG_DIR / run_id / a.paradigm / f"{qid}.json") if run_id else (LOG_DIR / a.paradigm / f"{qid}.json")),
            qid=qid)

        r["judge_verdict"] = v
        r["judge_reason"] = reason
        r["process_score"] = proc
        if v == "CORRECT":
            r["verdict"] = "CORRECT"
            n_flip += 1
        elif v == "INCORRECT":
            r["verdict"] = "INCORRECT"
        n_done += 1
        save(csv_path, rows)  # 每题落盘,可中断续跑
        print(f"  q{qid}: {v} (process={proc or '-'}) | {reason[:80]}")

    # 重算 summary
    total = len(rows)
    n_correct = sum(1 for r in rows if r["verdict"] == "CORRECT")
    sp = report_dir / f"{a.paradigm}_summary.json"
    summary = json.loads(sp.read_text(encoding="utf-8")) if sp.exists() else {"paradigm": a.paradigm}
    summary.update({
        "total": total, "correct": n_correct, "accuracy": round(n_correct / max(total, 1), 4),
        "judge_done": n_done, "judge_flip": n_flip,
        "judge_pending": sum(1 for r in rows if r["strict_match"] == "FAIL" and not r.get("judge_verdict")),
    })
    sp.write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"[{a.paradigm.upper()}] judged={n_done} flipped={n_flip}  accuracy={n_correct}/{total}")
    print(f"  -> {csv_path}")


if __name__ == "__main__":
    main()
