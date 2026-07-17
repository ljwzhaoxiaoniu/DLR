# -*- coding: utf-8 -*-
"""Stage 3 — 评测比对 + 按需 LLM Judge.

标准化比对 Pred vs Golden(已 norm,但 float 容差 1e-6).
一致 → CORRECT, 不一致 → INCORRECT.
带 --judge 时对不一致题触发 LLM 仲裁,--judge-budget 控制仲裁上限(预算可控,prompt caching 省 token).

输出:
  outputs/03_reports/{paradigm}.csv  (per-q: q_id, db_id, verdict, judge_verdict, sql, error)
  outputs/03_reports/summary.json   (accuracy, judge_flip_rate, avg tokens)

用途:
  python 03_evaluate.py --paradigm DLR
  python 03_evaluate.py --paradigm DLR --judge --judge-budget 100
"""
import json, csv, os, sys, argparse, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
GOLD = json.load(open(ROOT / "Evaluation" / "outputs" / "00_golden_cache.json", encoding="utf-8"))
GOLD_MAP = {x["q_id"]: x for x in GOLD}
OUT_BASE = ROOT / "Evaluation" / "outputs"
LOG_DIR = OUT_BASE / "01_logs"


def strict_match(pred_rows, gold_rows):
    """严格比对(已 norm),float 容差 1e-6."""
    if len(pred_rows) != len(gold_rows):
        return False
    for pr, gr in zip(pred_rows, gold_rows):
        if len(pr) != len(gr):
            return False
        for a, b in zip(pr, gr):
            if a == b:
                continue
            try:
                if abs(float(a) - float(b)) < 1e-6:
                    continue
            except (TypeError, ValueError):
                pass
            return False
    return True


def load_tokens(paradigm, qid):
    """从 Stage 1 NDJSON 拉取 token 消耗(input/output sum)."""
    f = LOG_DIR / paradigm / f"{qid}.json"
    if not f.exists():
        return 0, 0
    txt = f.read_text(encoding="utf-8", errors="replace")
    inp = out = 0
    for line in txt.splitlines():
        try:
            ev = json.loads(line.strip())
        except:
            continue
        # opencode NDJSON format: step_finish.part.tokens.{input, output}
        tok = (ev.get("part", {}) or {}).get("tokens", {}) or {}
        if tok:
            inp += tok.get("input", 0) or 0
            out += tok.get("output", 0) or 0
    return inp, out


def llm_judge(question, evidence, gold_res, pred_res, gold_sql, pred_sql, db_id):
    """LLM 仲裁: 用 opencode run 判断结果语义等价. 返回 (verdict, reason)."""
    import subprocess, shutil, tempfile
    # 从项目 config 读 API 配置
    cfg_path = ROOT / "config.json"
    api_cfg = {}
    if cfg_path.exists():
        try: api_cfg = json.load(open(cfg_path, encoding="utf-8")).get("api", {})
        except: pass
    prompt = (
        f"Judge: Q={question} | DB={db_id} | "
        f"GoldSQL={gold_sql[:300]} | Gold={json.dumps(gold_res, default=str)[:300]} | "
        f"PredSQL={pred_sql[:300]} | Pred={json.dumps(pred_res, default=str)[:300]} | "
        f"Reply: VERDICT: CORRECT|INCORRECT | REASON: <why>"
    )
    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False, encoding='utf-8') as f:
        f.write(prompt)
        tmp = f.name
    try:
        opencode = shutil.which("opencode") or "opencode"
        # Use bash to avoid cmd.exe prompt truncation
        escaped = tmp.replace('\\', '/')
        r = subprocess.run(
            ['bash', '-c', f'"{opencode}" run --format json "$(cat {escaped})"'],
            capture_output=True, text=True, timeout=120,
            encoding='utf-8', errors='replace', cwd=str(ROOT)
        )
        reply = ""
        for line in r.stdout.splitlines():
            try:
                ev = json.loads(line.strip())
                if ev.get("type") == "text":
                    reply = ev["part"]["text"]
            except: pass
        v_m = re.search(r'VERDICT:\s*(CORRECT|INCORRECT)', reply, re.I)
        r_m = re.search(r'REASON:\s*(.+)', reply, re.I)
        return (v_m.group(1).upper() if v_m else "UNKNOWN",
                r_m.group(1).strip() if r_m else reply[:200])
    except Exception as e:
        return "UNKNOWN", str(e)[:200]
    finally:
        try: os.unlink(tmp)
        except: pass


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--paradigm", required=True, choices=["er", "dlr", "rdf"])
    ap.add_argument("--judge", action="store_true", help="对不一致题触发 LLM 仲裁")
    ap.add_argument("--judge-budget", type=int, default=100, help="最多仲裁几题(默认100)")
    ap.add_argument("--log-subdir", default="", help="Stage 1 run-id")
    a = ap.parse_args()

    run_id = a.log_subdir
    if not run_id:
        subdirs = sorted([d for d in LOG_DIR.iterdir() if d.is_dir()], reverse=True)
        if subdirs:
            run_id = subdirs[0].name
    if run_id:
        LOG_DIR = LOG_DIR / run_id
    base = OUT_BASE / run_id if run_id else OUT_BASE
    pred_dir = base / "02_predictions" / a.paradigm
    report_dir = base / "03_reports"
    report_dir.mkdir(parents=True, exist_ok=True)
    preds = sorted(pred_dir.glob("*.json"))
    csv_path = report_dir / f"{a.paradigm}.csv"

    # 读已有 CSV(支持增量 judge: 只补空白行)
    existing = {}
    if csv_path.exists():
        with open(csv_path, encoding="utf-8") as f:
            for r in csv.DictReader(f):
                existing[int(r["q_id"])] = r

    rows = []
    n_ok = n_judge = n_flip = arb_cost = 0
    token_in = token_out = 0
    judge_budget = a.judge_budget

    for pf in preds:
        qid = int(pf.stem)
        if qid not in GOLD_MAP:
            continue
        gold = GOLD_MAP[qid]
        rec = json.load(open(pf, encoding="utf-8"))
        inp, outp = load_tokens(a.paradigm, qid)
        token_in += inp
        token_out += outp
        q = next((qq for qq in json.load(open(ROOT / "MINIDEV_sqlite" / "mini_dev_sqlite.json", encoding="utf-8")) if qq["question_id"] == qid), {})
        evidence = q.get("evidence", "")
        prev = existing.get(qid, {})

        verdict = prev.get("verdict", "")
        judge_v = prev.get("judge_verdict", "")
        judge_reason = prev.get("judge_reason", "")
        strict_ok = (prev.get("strict_match") == "PASS")

        # 已有 judge 结果 → 复用,不重判
        if judge_v and judge_v != "UNKNOWN":
            if judge_v == "CORRECT":
                n_flip += 1
            n_judge += 1
        elif not rec["ok"] or rec["result"] is None:
            verdict = "INCORRECT"
        elif strict_match(rec["result"]["rows"], gold["rows"]):
            strict_ok = True
            verdict = "CORRECT"
            n_ok += 1
        else:
            strict_ok = False
            # 严格不一致 → 可选仲裁(仅当 judge_verdict 为空时)
            if a.judge and not judge_v and n_judge < judge_budget:
                v, reason = llm_judge(q.get("question", ""), evidence, gold["rows"], rec["result"]["rows"], q.get("SQL", ""), rec["sql"], gold["db_id"])
                judge_v = v
                judge_reason = reason
                n_judge += 1
                if v == "CORRECT":
                    n_flip += 1
                    verdict = "CORRECT"
                elif v == "INCORRECT":
                    verdict = "INCORRECT"
                else:
                    verdict = "INCORRECT"
            else:
                verdict = verdict or "INCORRECT"

        rows.append({
            "q_id": qid, "db_id": gold["db_id"],
            "strict_match": "PASS" if strict_ok else "FAIL",
            "judge_verdict": judge_v, "judge_reason": judge_reason,
            "verdict": verdict,
            "sql": rec.get("sql", ""), "error": rec.get("error", ""),
            "input_tokens": inp, "output_tokens": outp,
        })

    # 写 CSV
    total = len(rows)
    n_correct = sum(1 for r in rows if r["verdict"] == "CORRECT")
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["q_id", "db_id", "strict_match", "judge_verdict", "judge_reason", "verdict", "sql", "error", "input_tokens", "output_tokens"])
        w.writeheader()
        w.writerows(rows)

    # 汇总
    summary = {
        "paradigm": a.paradigm,
        "total": total, "correct": n_correct, "accuracy": round(n_correct / max(total, 1), 4),
        "judge_enabled": a.judge, "judge_used": n_judge, "judge_flip": n_flip,
        "judge_flip_rate": round(n_flip / max(n_judge, 1), 4) if a.judge else None,
        "total_input_tokens": token_in, "total_output_tokens": token_out,
    }
    (report_dir / f"{a.paradigm}_summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"\n[{a.paradigm.upper()}] accuracy={n_correct}/{total} ({summary['accuracy']:.2%})")
    print(f"  judge: used={n_judge} flipped={n_flip}")
    print(f"  tokens: input={token_in} output={token_out}")
    print(f"  -> {csv_path}")


if __name__ == "__main__":
    main()
