# -*- coding: utf-8 -*-
"""评测后处理 — 产出整理到 validated_results/round_1/.

命名: round_1/1-2/(q1471+q1472), round_1/3-4/(q1473+q1476), ...

用法:
    python post_process.py --run-id 0718_0059_1471-1472_EDR --pair 1
    python post_process.py --run-id 0718_0126_1473-1474_EDR --pair 2
"""
import argparse
import csv
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT_BASE = ROOT / "Evaluation" / "outputs"
VALIDATED = ROOT / "validated_results" / "round_1"


def main():
    ap = argparse.ArgumentParser(description="评测后处理 → validated_results/round_1/")
    ap.add_argument("--run-id", required=True, help="Stage 1 run_id")
    ap.add_argument("--pair", required=True, type=int, help="题对编号(1=题1-2, 2=题3-4, ...)")
    args = ap.parse_args()

    run_id = args.run_id
    pair = args.pair
    q_label = f"{pair*2-1}-{pair*2}"  # 1→1-2, 2→3-4, ...

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
        # 按范式子目录取日志(曾因遍历全部子目录+先到先得,把 dlr 日志复制成三份范式文件)
        p_dir = src_logs / p
        if not p_dir.is_dir():
            print(f"[WARN] 缺范式日志目录: {p_dir}")
            continue
        for qf in sorted(p_dir.glob("*.json")):
            if qf.stem.isdigit():
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

    # 读 run 目录 agent_stats(parse_agent_stats.py 产出:含 reasoning/cache_read/total tokens)
    stats_csv = OUT_BASE / run_id / "agent_stats.csv"
    stats_map = {}  # (paradigm, q_id) -> row
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
                row = {
                    "paradigm": p,
                    "q_id": qid,
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
                # 合并 token 列(parse_agent_stats.py 产出: tokens_reasoning/tokens_cache_read/tokens_total)
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
