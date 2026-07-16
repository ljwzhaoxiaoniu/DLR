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
PRED_DIR = ROOT / "Evaluation" / "outputs" / "02_predictions"
LOG_DIR = ROOT / "Evaluation" / "outputs" / "01_logs"
REPORT_DIR = ROOT / "Evaluation" / "outputs" / "03_reports"


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
        u = ev.get("usage") or (ev.get("part", {}) or {}).get("usage") or {}
        if u:
            inp += u.get("input_tokens", 0) or u.get("prompt_tokens", 0) or 0
            out += u.get("output_tokens", 0) or u.get("completion_tokens", 0) or 0
    return inp, out


def llm_judge(question, evidence, gold_res, pred_res, gold_sql, pred_sql, db_id):
    """LLM 仲裁: 对比 gold/pred 结果是否一致. 返回 CORRECT / INCORRECT / UNKNOWN.
    使用 prompt caching (长 system + 前缀复用) 控制成本.
    """
    try:
        import anthropic
    except ImportError:
        return "UNKNOWN", "anthropic not installed"
    client = anthropic.Anthropic()  # 走 ANTHROPIC_API_KEY 环境变量
    system = ("You are a SQL evaluation arbiter. SQL-run evaluator. "
              "Decide whether two result sets are semantically equivalent. "
              "Consider: float tolerance 1e-6, row/column order irrelevant, NULL == None. "
              "Reply EXACTLY: CORRECT or INCORRECT (no other text).")
    user = (f"Question: {question}\nEvidence: {evidence or ''}\nDatabase: {db_id}\n\n"
            f"Gold SQL:\n{gold_sql}\nGold result:\n{json.dumps(gold_res, default=str)[:1500]}\n\n"
            f"Predicted SQL:\n{pred_sql}\nPredicted result:\n{json.dumps(pred_res, default=str)[:1500]}\n\n"
            "Are the predicted results correct? Reply CORRECT or INCORRECT.")
    msg = client.messages.create(
        model="claude-haiku-4-5-20251001",  # 省钱、快
        max_tokens=10, temperature=0,
        system=[{"type": "text", "text": system, "cache_control": {"type": "ephemeral"}}],
        messages=[{"role": "user", "content": user}],
    )
    reply = "".join(getattr(b, "text", "") for b in msg.content).strip()
    return reply if reply in ("CORRECT", "INCORRECT") else "UNKNOWN"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--paradigm", required=True, choices=["er", "dlr", "rdf"])
    ap.add_argument("--judge", action="store_true", help="对不一致题触发 LLM 仲裁")
    ap.add_argument("--judge-budget", type=int, default=100, help="最多仲裁几题(默认100)")
    a = ap.parse_args()

    pred_dir = PRED_DIR / a.paradigm
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    preds = sorted(pred_dir.glob("*.json"))

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

        verdict = ""
        judge_v = ""
        if not rec["ok"] or rec["result"] is None:
            verdict = "INCORRECT"
        elif strict_match(rec["result"]["rows"], gold["rows"]):
            verdict = "CORRECT"
            n_ok += 1
        else:
            # 严格不一致 → 可选仲裁
            if a.judge and n_judge < judge_budget:
                v, err = llm_judge(q.get("question", ""), evidence, gold["rows"], rec["result"]["rows"], gold["SQL"], rec["sql"], gold["db_id"])
                judge_v = v
                n_judge += 1
                if v == "CORRECT":
                    n_flip += 1
                    verdict = "CORRECT"
                elif v == "INCORRECT":
                    verdict = "INCORRECT"
                else:
                    verdict = "INCORRECT"
            else:
                verdict = "INCORRECT"

        rows.append({
            "q_id": qid, "db_id": gold["db_id"], "verdict": verdict,
            "judge_verdict": judge_v, "judge_flipped": int(judge_v == "CORRECT"),
            "sql": rec.get("sql", ""), "error": rec.get("error", ""),
            "input_tokens": inp, "output_tokens": outp,
        })

    # 写 CSV
    total = len(rows)
    n_correct = sum(1 for r in rows if r["verdict"] == "CORRECT")
    csv_path = REPORT_DIR / f"{a.paradigm}.csv"
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["q_id", "db_id", "verdict", "judge_verdict", "judge_flipped", "sql", "error", "input_tokens", "output_tokens"])
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
    (REPORT_DIR / f"{a.paradigm}_summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"\n[{a.paradigm.upper()}] accuracy={n_correct}/{total} ({summary['accuracy']:.2%})")
    print(f"  judge: used={n_judge} flipped={n_flip}")
    print(f"  tokens: input={token_in} output={token_out}")
    print(f"  -> {csv_path}")


if __name__ == "__main__":
    main()
