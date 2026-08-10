# -*- coding: utf-8 -*-
"""评测后处理 — 产出整理到 validated_results/round_2/.

命名: round_2/1471-1472/(按题号), round_2/1471/(单题)

用法:
    python post_process.py --run-id xxx --qids 1471,1472
    python post_process.py --run-id xxx --qids 1471
"""

import argparse
import csv
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CFG = json.load(open(ROOT / "config.json", encoding="utf-8")) if (ROOT / "config.json").exists() else {}
_EVAL_OUT = CFG.get("eval", {}).get("output_dir", "Evaluation/outputs")
OUT_BASE = ROOT / _EVAL_OUT
_EVAL_ROUND = CFG.get("eval", {}).get("round", "round_1")
VALIDATED = ROOT / "validated_results" / _EVAL_ROUND


def main():
    ap = argparse.ArgumentParser(description=f"评测后处理 → validated_results/{_EVAL_ROUND}/")
    ap.add_argument("--run-id", required=True, help="Stage 1 run_id")
    ap.add_argument("--qids", required=True, help="题号，逗号分隔 (如 1471,1472)")
    args = ap.parse_args()

    run_id = args.run_id
    qids = [int(x.strip()) for x in args.qids.split(",") if x.strip()]

    if not qids:
        print("[ERR] --qids 不能为空")
        return

    if len(qids) == 1:
        q_label = str(qids[0])
    else:
        q_label = f"{min(qids)}-{max(qids)}"

    VALIDATED.mkdir(parents=True, exist_ok=True)
    target = VALIDATED / q_label
    raw_dir = target / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)

    # 1. 复制 Stage 1 raw 日志
    src_logs = OUT_BASE / "01_logs" / run_id
    if not src_logs.exists():
        src_logs = OUT_BASE / run_id / "01_logs"

    copied = 0
    for p in ["er", "dlr", "rdf"]:
        p_dir = src_logs / p
        if not p_dir.is_dir():
            print(f"[WARN] 缺范式日志目录: {p_dir}")
            continue
        for qf in sorted(p_dir.glob("*.json")):
            if qf.stem.isdigit() and int(qf.stem) in qids:
                dest = raw_dir / f"{p}_{qf.stem}.json"
                if not dest.exists():
                    shutil.copy2(qf, dest)
                    copied += 1
    print(f"[OK] 复制 {copied} 个 raw 日志 → {raw_dir}")

    # 2. 合并三范式 report CSV + parse_agent_stats token 数据
    reports_dir = OUT_BASE / run_id / "03_reports"
    if not reports_dir.exists():
        print(f"[ERR] reports 不存在: {reports_dir}")
        return

    stats_csv = OUT_BASE / run_id / "agent_stats.csv"
    stats_map = {}
    if stats_csv.exists():
        with open(stats_csv, encoding="utf-8") as f:
            for r in csv.DictReader(f):
                stats_map[(r["paradigm"].lower(), int(r["question_id"]))] = r

    rows = []
    fields = ["paradigm", "q_id", "db_id", "strict_match", "judge_verdict", "judge_reason",
              "verdict", "process_score", "error", "input_tokens", "output_tokens",
              "reasoning_tokens", "cache_read_tokens", "total_tokens"]
    for p in ["er", "dlr", "rdf"]:
        csv_path = reports_dir / f"{p}.csv"
        if not csv_path.exists():
            continue
        with open(csv_path, encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                qid = int(r["q_id"])
                if qid not in qids:
                    continue
                row = {
                    "paradigm": p, "q_id": qid,
                    "db_id": r.get("db_id", ""),
                    "strict_match": r.get("strict_match", ""),
                    "judge_verdict": r.get("judge_verdict", ""),
                    "judge_reason": r.get("judge_reason", ""),
                    "verdict": r.get("verdict", ""),
                    "process_score": r.get("process_score", ""),
                    "error": r.get("error", ""),
                    "input_tokens": r.get("input_tokens", ""),
                    "output_tokens": r.get("output_tokens", ""),
                }
                st = stats_map.get((p, qid), {})
                row["reasoning_tokens"] = st.get("tokens_reasoning", "")
                row["cache_read_tokens"] = st.get("tokens_cache_read", "")
                row["total_tokens"] = st.get("tokens_total", "")
                rows.append(row)

    out_csv = target / "agent_stats.csv"
    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields, quoting=csv.QUOTE_ALL, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    print(f"[OK] 汇总 CSV: {len(rows)} rows → {out_csv}")

    print(f"\n[DONE] {target}")


if __name__ == "__main__":
    main()
