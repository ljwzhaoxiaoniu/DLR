# -*- coding: utf-8 -*-
"""Stage 3 — 数据加工 + strict 初判(纯脚本,无 LLM,秒级).

标准化比对 Pred vs Golden(已 norm,float 容差 1e-6):
  一致   → verdict=CORRECT, process_score=100
  不一致 → 初判 verdict=INCORRECT,留待 04_judge.py 仲裁翻盘
增量重跑时已有 judge 结果原样保留.

用法:
  python 03_evaluate.py --paradigm er --log-subdir <run_id>
LLM 仲裁(独立第二段):
  python 04_judge.py --paradigm er --log-subdir <run_id>
"""
import json, csv, argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
GOLD = json.load(open(ROOT / "Evaluation" / "outputs" / "00_golden_cache.json", encoding="utf-8"))
GOLD_MAP = {x["q_id"]: x for x in GOLD}
OUT_BASE = ROOT / "Evaluation" / "outputs"
LOG_DIR = OUT_BASE / "01_logs"

CSV_FIELDS = ["q_id", "db_id", "strict_match", "judge_verdict", "judge_reason",
              "verdict", "process_score", "sql", "error", "input_tokens", "output_tokens"]


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


def load_tokens(paradigm, qid, run_id=""):
    """从 Stage 1 NDJSON 拉取 token 消耗(input/output sum)."""
    f = (LOG_DIR / run_id / paradigm / f"{qid}.json") if run_id else (LOG_DIR / paradigm / f"{qid}.json")
    if not f.exists():
        return 0, 0
    inp = out = 0
    for line in f.read_text(encoding="utf-8", errors="replace").splitlines():
        try:
            ev = json.loads(line.strip())
        except:
            continue
        tok = (ev.get("part", {}) or {}).get("tokens", {}) or {}
        if tok:
            inp += tok.get("input", 0) or 0
            out += tok.get("output", 0) or 0
    return inp, out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--paradigm", required=True, choices=["er", "dlr", "rdf"])
    ap.add_argument("--log-subdir", default="", help="Stage 1 run-id")
    a = ap.parse_args()

    run_id = a.log_subdir
    if not run_id:
        subdirs = sorted([d for d in LOG_DIR.iterdir() if d.is_dir()], reverse=True)
        if subdirs:
            run_id = subdirs[0].name
    base = OUT_BASE / run_id if run_id else OUT_BASE
    pred_dir = base / "02_predictions" / a.paradigm
    report_dir = base / "03_reports"
    report_dir.mkdir(parents=True, exist_ok=True)
    preds = sorted(pred_dir.glob("*.json"))
    csv_path = report_dir / f"{a.paradigm}.csv"

    # 读已有 CSV(增量: judge 结果原样保留)
    existing = {}
    if csv_path.exists():
        with open(csv_path, encoding="utf-8") as f:
            for r in csv.DictReader(f):
                existing[int(r["q_id"])] = r

    rows = []
    n_strict = 0
    token_in = token_out = 0

    for pf in preds:
        qid = int(pf.stem)
        if qid not in GOLD_MAP:
            continue
        gold = GOLD_MAP[qid]
        rec = json.load(open(pf, encoding="utf-8"))
        inp, outp = load_tokens(a.paradigm, qid, run_id)
        token_in += inp
        token_out += outp
        prev = existing.get(qid, {})

        judge_v = prev.get("judge_verdict", "")
        judge_reason = prev.get("judge_reason", "")
        process_score = prev.get("process_score", "")

        if rec.get("ok") and rec.get("result") is not None and strict_match(rec["result"]["rows"], gold["rows"]):
            strict_ok = True
            verdict = "CORRECT"
            process_score = "100"
            n_strict += 1
        else:
            strict_ok = False
            # 初判 INCORRECT;已有 judge 翻盘结果则沿用
            if judge_v and judge_v != "UNKNOWN":
                verdict = "CORRECT" if judge_v == "CORRECT" else "INCORRECT"
            else:
                verdict = "INCORRECT"

        rows.append({
            "q_id": qid, "db_id": gold["db_id"],
            "strict_match": "PASS" if strict_ok else "FAIL",
            "judge_verdict": judge_v, "judge_reason": judge_reason,
            "verdict": verdict, "process_score": process_score,
            "sql": rec.get("sql", ""), "error": rec.get("error", ""),
            "input_tokens": inp, "output_tokens": outp,
        })

    total = len(rows)
    n_correct = sum(1 for r in rows if r["verdict"] == "CORRECT")
    n_pending = sum(1 for r in rows if r["strict_match"] == "FAIL" and not r["judge_verdict"])
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=CSV_FIELDS, quoting=csv.QUOTE_ALL)
        w.writeheader()
        w.writerows(rows)

    summary = {
        "paradigm": a.paradigm,
        "total": total, "correct": n_correct, "accuracy": round(n_correct / max(total, 1), 4),
        "strict_pass": n_strict, "judge_pending": n_pending,
        "total_input_tokens": token_in, "total_output_tokens": token_out,
    }
    (report_dir / f"{a.paradigm}_summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"\n[{a.paradigm.upper()}] strict={n_strict}/{total}  accuracy(含已有judge)={n_correct}/{total}")
    if n_pending:
        print(f"  待仲裁 {n_pending} 题 → python 04_judge.py --paradigm {a.paradigm} --log-subdir {run_id}")
    print(f"  tokens: input={token_in} output={token_out}")
    print(f"  -> {csv_path}")


if __name__ == "__main__":
    main()
