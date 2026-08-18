# -*- coding: utf-8 -*-
"""评测后处理 — 一步归档到 v3_final 扁平结构.

用法:
    python post_process.py --run-id xxx --qids 1481,1482

输出:
    validated_results/v3_final/
    ├── raw/
    │   ├── 1481-1482_er_1481.json    # {pair}_{p}_{qid}.json
    │   └── ...
    └── 1481-1482/
        └── agent_stats.csv
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
_EVAL_ROUND = CFG.get("eval", {}).get("round", "v3_final")
VALIDATED = ROOT / "validated_results" / _EVAL_ROUND
RAW_DIR = VALIDATED / "raw"


def main():
    ap = argparse.ArgumentParser(description=f"评测后处理 → validated_results/{_EVAL_ROUND}/")
    ap.add_argument("--run-id", required=True, help="Stage 1 run_id")
    ap.add_argument("--qids", required=True, help="题号，逗号分隔 (如 1481,1482)")
    args = ap.parse_args()

    run_id = args.run_id
    qids = [int(x.strip()) for x in args.qids.split(",") if x.strip()]

    if not qids:
        print("[ERR] --qids 不能为空")
        return

    pair_label = str(qids[0]) if len(qids) == 1 else f"{min(qids)}-{max(qids)}"

    VALIDATED.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    # 1. 复制 raw 日志到 v3_final/raw/{pair}_{p}_{qid}.json
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
                dest = RAW_DIR / f"{pair_label}_{p}_{qf.stem}.json"
                if not dest.exists():
                    shutil.copy2(qf, dest)
                    copied += 1
    print(f"[OK] 复制 {copied} 个 raw 日志 → {RAW_DIR}")

    # 2. 生成 per-pair agent_stats.csv
    pair_dir = VALIDATED / pair_label
    pair_dir.mkdir(parents=True, exist_ok=True)

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

    out_csv = pair_dir / "agent_stats.csv"
    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields, quoting=csv.QUOTE_ALL, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    print(f"[OK] agent_stats.csv: {len(rows)} rows → {out_csv}")

    print(f"\n[DONE] {pair_dir}")
    print(f"  raw → {RAW_DIR}/{pair_label}_*.json")

    # 3. 更新 docs/results_v3.md
    update_results_md(pair_label, rows, VALIDATED)


def update_results_md(pair_label, new_rows, validated_dir):
    """从 v3_final 全量数据重建 results_v3.md 的明细表和统计."""
    md_path = ROOT / "docs" / "results_v3.md"
    if not md_path.exists():
        print("[WARN] results_v3.md 不存在，跳过")
        return

    # 收集所有 per-pair agent_stats.csv
    all_rows = []
    for pair_dir in sorted(validated_dir.glob("*")):
        csv_path = pair_dir / "agent_stats.csv"
        if not csv_path.is_file():
            continue
        with open(csv_path, encoding="utf-8") as f:
            for r in csv.DictReader(f):
                # 兼容 parse_agent_stats.py 旧格式
                if "question_id" in r and "q_id" not in r:
                    r["q_id"] = r["question_id"]
                if "tokens_total" in r and "total_tokens" not in r:
                    r["total_tokens"] = r["tokens_total"]
                # 统一 paradigm 为小写
                if "paradigm" in r:
                    r["paradigm"] = r["paradigm"].lower()
                all_rows.append(r)

    # 同 qid+paradigm 去重（后出现的覆盖）
    dedup = {}
    for r in all_rows:
        dedup[(r["q_id"], r["paradigm"])] = r
    for r in new_rows:
        r["paradigm"] = r["paradigm"].lower()
        dedup[(str(r["q_id"]), r["paradigm"])] = {**r, "q_id": str(r["q_id"])}
    all_rows = list(dedup.values())

    # 统计
    qids = sorted(set(int(r["q_id"]) for r in all_rows))
    n = len(qids)
    total_runs = len(all_rows)

    def stat(p):
        rows_p = [r for r in all_rows if r["paradigm"] == p]
        correct = sum(1 for r in rows_p if r["verdict"] == "CORRECT")
        strict = sum(1 for r in rows_p if r["strict_match"] == "PASS")
        tokens = [int(r.get("total_tokens", 0) or 0) for r in rows_p]
        avg_tok = sum(tokens) / len(tokens) if tokens else 0
        return correct, strict, avg_tok

    er_c, er_s, er_tok = stat("er")
    dlr_c, dlr_s, dlr_tok = stat("dlr")
    rdf_c, rdf_s, rdf_tok = stat("rdf")
    dlr_vs_er = (dlr_tok - er_tok) / er_tok * 100 if er_tok else 0
    rdf_vs_er = (rdf_tok - er_tok) / er_tok * 100 if er_tok else 0

    # 重建 MD（先读旧文件，保留已有备注）
    md_text = md_path.read_text(encoding="utf-8")
    import re

    # 旧明细行备注：按 qid 提取（脚本不覆盖人工写的备注）
    old_remarks = {}
    for line in md_text.splitlines():
        parts = [c.strip() for c in line.split("|")]
        if len(parts) >= 16 and parts[2].startswith("q") and parts[2][1:].isdigit():
            old_remarks[parts[2]] = parts[15]

    # 明细行
    detail_lines = []
    for qid in sorted(set(int(r["q_id"]) for r in all_rows)):
        q_rows = {r["paradigm"]: r for r in all_rows if int(r["q_id"]) == qid}
        er_r = q_rows.get("er", {})
        dlr_r = q_rows.get("dlr", {})
        rdf_r = q_rows.get("rdf", {})

        def strict_judge(p):
            s = p.get("strict_match", "")
            j = p.get("judge_verdict", "")
            if s == "PASS":
                return "PASS", ""
            return "FAIL", j

        er_sj, er_j = strict_judge(er_r)
        dlr_sj, dlr_j = strict_judge(dlr_r)
        rdf_sj, rdf_j = strict_judge(rdf_r)

        er_t = int(er_r.get("total_tokens", 0) or 0)
        dlr_t = int(dlr_r.get("total_tokens", 0) or 0)
        rdf_t = int(rdf_r.get("total_tokens", 0) or 0)
        min_t = min(er_t, dlr_t, rdf_t) if er_t and dlr_t and rdf_t else 0

        def tok_str(val):
            s = f"{val:,}"
            return f"**{s}**" if val == min_t and val > 0 else s

        db_name = er_r.get("db_id", dlr_r.get("db_id", rdf_r.get("db_id", "")))
        remark = old_remarks.get(f"q{qid}", "")
        detail_lines.append(
            f"| {db_name} | q{qid} | {er_sj} | {er_j} | {dlr_sj} | {dlr_j} | {rdf_sj} | {rdf_j} | "
            f"{er_r.get('verdict','')} | {dlr_r.get('verdict','')} | {rdf_r.get('verdict','')} | "
            f"{tok_str(er_t)} | {tok_str(dlr_t)} | {tok_str(rdf_t)} | {remark} |"
        )

    # 替换明细表：第一个 ### 到 > **Token 之前
    header = "| 数据库 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 备注 |"
    sep    = "|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|"
    detail_block = header + "\n" + sep + "\n" + "\n".join(detail_lines)
    md_text = re.sub(
        r"(### \w+\n\n).*?(\n> \*\*Token)",
        r"\1" + detail_block + r"\2",
        md_text, flags=re.DOTALL
    )

    # 进度表不再由脚本自动改（多数据库后旧正则失效），手动维护

    # 替换总结数字
    md_text = re.sub(r'共测试 \d+ 题', f'共测试 {n} 题', md_text)
    md_text = re.sub(r'\*\*\d+ 题次\*\*', f'**{total_runs} 题次**', md_text)

    # 替换汇总表 — 整行替换，加 ^\n 锚点防止匹配明细行
    er_vs_dlr_pct = (er_tok - dlr_tok) / dlr_tok * 100 if dlr_tok else 0
    rdf_vs_dlr_pct = (rdf_tok - dlr_tok) / dlr_tok * 100 if dlr_tok else 0
    md_text = re.sub(
        r'(\n\| CORRECT \|).*(\|)',
        rf'\1 {er_c}/{n} ({er_c/n*100:.1f}%) | **{dlr_c}/{n} ({dlr_c/n*100:.1f}%)** | {rdf_c}/{n} ({rdf_c/n*100:.1f}%) \2',
        md_text
    )
    md_text = re.sub(
        r'(\n\| strict PASS \|).*(\|)',
        rf'\1 {er_s}/{n} ({er_s/n*100:.1f}%) | {dlr_s}/{n} ({dlr_s/n*100:.1f}%) | {rdf_s}/{n} ({rdf_s/n*100:.1f}%) \2',
        md_text
    )
    md_text = re.sub(
        r'(\n\| 平均 token \|).*(\|)',
        rf'\1 {er_tok:,.0f} ({er_vs_dlr_pct:+.1f}% vs DLR) | **{dlr_tok:,.0f}** | {rdf_tok:,.0f} ({rdf_vs_dlr_pct:+.1f}% vs DLR) \2',
        md_text
    )

    md_path.write_text(md_text, encoding="utf-8")
    print(f"[OK] 更新 {md_path}  ({n}题/{total_runs}题次, DLR:{dlr_tok:,.0f}tok, ER +{er_vs_dlr_pct:.1f}%, RDF +{rdf_vs_dlr_pct:.1f}%)")


if __name__ == "__main__":
    main()
