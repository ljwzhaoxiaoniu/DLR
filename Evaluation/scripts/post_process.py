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
        for q_dir in src_logs.iterdir():
            if q_dir.is_dir():
                for qf in q_dir.glob("*.json"):
                    if qf.stem.isdigit():
                        dest = raw_dir / f"{p}_{qf.stem}.json"
                        if not dest.exists():
                            shutil.copy2(qf, dest)
                            copied += 1
    print(f"[OK] 复制 {copied} 个 raw 日志 → {raw_dir}")

    # 2. 合并三范式 report CSV
    reports_dir = OUT_BASE / run_id / "03_reports"
    if not reports_dir.exists():
        print(f"[ERR] reports 不存在: {reports_dir}")
        return

    rows, fields = [], ["paradigm"]
    for p in ["er", "dlr", "rdf"]:
        csv_path = reports_dir / f"{p}.csv"
        if not csv_path.exists():
            continue
        with open(csv_path, encoding="utf-8") as f:
            reader = csv.DictReader(f)
            if not fields[1:]:
                fields += [k for k in reader.fieldnames if k not in fields and k != "sql"]
            for r in reader:
                rows.append({"paradigm": p, **{k: v for k, v in r.items() if k != "sql"}})

    out_csv = target / "agent_stats.csv"
    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields, quoting=csv.QUOTE_ALL)
        w.writeheader()
        w.writerows(rows)
    print(f"[OK] 汇总 CSV: {len(rows)} rows → {out_csv}")

    print(f"\n[DONE] {target}")


if __name__ == "__main__":
    main()
