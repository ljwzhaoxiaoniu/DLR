# -*- coding: utf-8 -*-
"""评测后处理 — 一步归档到 validated_results/{eval.round}/{group}/{run_id}/（按 run 归档）.

用法:
    python post_process.py --run-id xxx [--group original]

输出（轮次由 config.json 的 eval.round 决定，如 v4_final；组别默认 original）:
    validated_results/{round}/{group}/
    └── {run_id}/                      # 归档单元 = 运行任务本身
        ├── raw/
        │   ├── 1471_er.json           # {qid}_{paradigm}.json——跑了什么就归档什么
        │   └── ...
        └── agent_stats.csv            # 该 run 实际跑出的 (题 × 范式) 行

- 题号与范式**自动发现**（从 03_reports/{er,dlr,rdf}.csv），不传 --qids
- 组别隔离两组同题重跑：original=原始组 / control=对照组
- 同题重跑 = 新 run 目录；文档重建按 run_id 排序去重（新的覆盖旧的），
  旧 run 目录如需"一题一档"由人工删除（脚本发现重复题次会提示）
明细文档同步写 docs/results_{版本}.md（v4_final → docs/results_v4.md）。
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
_EVAL_ROUND = CFG.get("eval", {}).get("round", "v4_final")
# 明细文档名只取主版本号：v4_final → docs/results_v4.md（此前硬编码 results_v3.md，换轮次会写错文件）
_MD_PATH = ROOT / "docs" / f"results_{_EVAL_ROUND.split('_')[0]}.md"
GROUP_LABELS = {"original": "原始组", "control": "对照组"}


def _normalize_ch_keys(d):
    """兼容旧字段名：ch1_calls → l1_calls 等（2026-09-16 Ch→L 术语统一）."""
    for k in [k for k in d if k.startswith("ch") and k[2:3] in "123" and k[3:4] == "_"]:
        d.setdefault("l" + k[2:], d[k])
    return d


def _discover_run(run_id):
    """从 run 产物发现实际跑了什么：返回 (paradigms, qids, src_logs, reports_dir)."""
    reports_dir = OUT_BASE / run_id / "03_reports"
    src_logs = OUT_BASE / "01_logs" / run_id
    if not src_logs.exists():
        src_logs = OUT_BASE / run_id / "01_logs"

    paradigms, qids = [], set()
    for p in ["er", "dlr", "rdf"]:
        csv_path = reports_dir / f"{p}.csv"
        if not csv_path.exists():
            continue
        paradigms.append(p)
        with open(csv_path, encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                try:
                    qids.add(int(r["q_id"]))
                except Exception:
                    continue
    return paradigms, sorted(qids), src_logs, reports_dir


def main():
    ap = argparse.ArgumentParser(
        description=f"评测后处理（按 run 归档）→ validated_results/{_EVAL_ROUND}/{{group}}/{{run_id}}/")
    ap.add_argument("--run-id", required=True, help="Stage 1 run_id（归档单元）")
    ap.add_argument("--group", choices=list(GROUP_LABELS), default="original",
                    help="组别：original=原始组（默认）/ control=对照组")
    args = ap.parse_args()

    run_id = args.run_id
    group = args.group
    validated = ROOT / "validated_results" / _EVAL_ROUND / group
    run_dir = validated / run_id
    raw_dir = run_dir / "raw"

    paradigms, qids, src_logs, reports_dir = _discover_run(run_id)
    if not paradigms:
        print(f"[ERR] 未发现任何 03_reports（{reports_dir}）—— 先跑 Stage 2/3")
        return
    print(f"[INFO] run {run_id}: 范式 = {','.join(paradigms)}；题 = {qids}")

    run_dir.mkdir(parents=True, exist_ok=True)
    raw_dir.mkdir(parents=True, exist_ok=True)

    # 1. 复制 raw 日志到 {run_id}/raw/{qid}_{paradigm}.json（该 run 实际跑出的）
    copied = 0
    for p in paradigms:
        p_dir = src_logs / p
        if not p_dir.is_dir():
            print(f"[WARN] 缺范式日志目录: {p_dir}")
            continue
        for qf in sorted(p_dir.glob("*.json")):
            if qf.stem.isdigit() and int(qf.stem) in qids:
                dest = raw_dir / f"{qf.stem}_{p}.json"
                if not dest.exists():
                    shutil.copy2(qf, dest)
                    copied += 1
    print(f"[OK] 复制 {copied} 个 raw 日志 → {raw_dir}")

    # 2. 生成 {run_id}/agent_stats.csv（该 run 实际跑出的行，无 qid 过滤）
    stats_csv = OUT_BASE / run_id / "agent_stats.csv"
    stats_map = {}
    if stats_csv.exists():
        with open(stats_csv, encoding="utf-8") as f:
            for r in csv.DictReader(f):
                stats_map[(r["paradigm"].lower(), int(r["question_id"]))] = _normalize_ch_keys(r)

    rows = []
    fields = ["paradigm", "q_id", "db_id", "strict_match", "judge_verdict", "judge_reason",
              "verdict", "process_score", "error", "input_tokens", "output_tokens",
              "reasoning_tokens", "cache_read_tokens", "total_tokens",
              "steps", "tool_calls_detail",
              "l1_calls", "l1_db_hit", "l1_first_dbs",
              "l2_calls", "l2_hits", "l2_top",
              "l3_calls", "l3_hit"]
    for p in paradigms:
        csv_path = reports_dir / f"{p}.csv"
        with open(csv_path, encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                try:
                    qid = int(r["q_id"])
                except Exception:
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
                row["steps"] = st.get("steps", "")
                row["tool_calls_detail"] = st.get("tool_calls_detail", "")
                row["l1_calls"] = st.get("l1_calls", "")
                row["l1_db_hit"] = st.get("l1_db_hit", "")
                row["l1_first_dbs"] = st.get("l1_first_dbs", "")
                row["l2_calls"] = st.get("l2_calls", "")
                row["l2_hits"] = st.get("l2_hits", "")
                row["l2_top"] = st.get("l2_top", "")
                row["l3_calls"] = st.get("l3_calls", "")
                row["l3_hit"] = st.get("l3_hit", "")
                rows.append(row)

    out_csv = run_dir / "agent_stats.csv"
    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields, quoting=csv.QUOTE_ALL, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    print(f"[OK] agent_stats.csv: {len(rows)} rows → {out_csv}")
    print(f"\n[DONE] {run_dir}")

    # 3. 重跑提示：同 (qid, paradigm) 已存在于别的 run 目录（文档取新，旧目录需人工清理）
    my_keys = {(str(r["q_id"]), r["paradigm"]) for r in rows}
    dups = []
    for d in sorted(validated.glob("*")):
        if d.name == run_id or not (d / "agent_stats.csv").is_file():
            continue
        with open(d / "agent_stats.csv", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                r = _normalize_ch_keys(r)
                key = (r.get("q_id") or r.get("question_id"), (r.get("paradigm") or "").lower())
                if key in my_keys:
                    dups.append(f"{d.name}:{key[0]}/{key[1]}")
    if dups:
        print(f"[WARN] 以下题次已存在于其他 run 目录（文档取新，如需一题一档请删除旧目录）:\n        " + "  ".join(sorted(set(dups))))

    # 4. 更新 docs/results_{版本}.md 的本组段落
    update_results_md(group, validated)


def update_results_md(group_key, validated_dir):
    """从 {round}/{group} 全量 run 目录重建 results_{版本}.md 中**本组**的明细表与统计."""
    label = GROUP_LABELS[group_key]
    md_path = _MD_PATH
    if not md_path.exists():
        print(f"[WARN] {md_path.name} 不存在，跳过文档更新（归档 CSV 不受影响）")
        return

    # 收集本组所有 run 目录的 agent_stats.csv（run_id 排序 = 时间排序，新的覆盖旧的）
    all_rows = []
    for run_path in sorted(validated_dir.glob("*")):
        csv_path = run_path / "agent_stats.csv"
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
                # 兼容旧字段名 ch*_ → l*_（2026-09-16 术语统一）
                _normalize_ch_keys(r)
                all_rows.append(r)

    # 同 qid+paradigm 去重（后出现的覆盖——按 run_id 排序，新 run 覆盖旧 run）
    dedup = {}
    for r in all_rows:
        dedup[(r["q_id"], r["paradigm"])] = r
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
    er_vs_dlr_pct = (er_tok - dlr_tok) / dlr_tok * 100 if dlr_tok else 0
    rdf_vs_dlr_pct = (rdf_tok - dlr_tok) / dlr_tok * 100 if dlr_tok else 0

    # 重建 MD（先读旧文件，保留已有备注）
    md_text = md_path.read_text(encoding="utf-8")
    import re

    # 旧明细行备注：只扫**本组段落**，按 qid 提取四栏（共通/ER/DLR/RDF，脚本不覆盖人工写的备注）
    old_remarks = {}
    span = re.search(rf"\*\*{label}\*\*\n\n(.*?)\n> \*\*Token", md_text, re.DOTALL)
    if span:
        for line in span.group(1).splitlines():
            parts = [c.strip() for c in line.split("|")]
            if len(parts) >= 19 and parts[2].startswith("q") and parts[2][1:].isdigit():
                old_remarks[parts[2]] = parts[15:19]

    # 明细行
    detail_lines = []
    for qid in qids:
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
        common_rk, er_rk, dlr_rk, rdf_rk = old_remarks.get(f"q{qid}", ["", "", "", ""])
        detail_lines.append(
            f"| {db_name} | q{qid} | {er_sj} | {er_j} | {dlr_sj} | {dlr_j} | {rdf_sj} | {rdf_j} | "
            f"{er_r.get('verdict','')} | {dlr_r.get('verdict','')} | {rdf_r.get('verdict','')} | "
            f"{tok_str(er_t)} | {tok_str(dlr_t)} | {tok_str(rdf_t)} | {common_rk} | {er_rk} | {dlr_rk} | {rdf_rk} |"
        )

    header = "| 数据库 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 共通 | ER-备注 | DLR-备注 | RDF-备注 |"
    sep    = "|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|--------|--------|--------|"
    detail_block = header + "\n" + sep + "\n" + "\n".join(detail_lines)

    # 替换本组明细段：**{组}** 到 > **Token 之前
    detail_pat = rf"(\*\*{label}\*\*\n\n).*?(\n> \*\*Token)"
    if re.search(detail_pat, md_text, re.DOTALL):
        md_text = re.sub(
            detail_pat,
            lambda m: m.group(1) + detail_block + m.group(2),
            md_text, flags=re.DOTALL
        )
    else:
        # 本组首次归档：整段创建（替换占位行"待开跑"）
        ph = f"**{label}**\n\n待开跑"
        if ph in md_text:
            notes = (
                "> **Token = input + cache_read + reasoning(CoT) + output**（全算消耗，= agent_stats.csv 的 `total_tokens`）\n"
                "> **备注分栏**: 共通 = 题目/evidence/L3 问题（跨范式共同根源）；ER/DLR/RDF-备注 = 该范式本题的异常、错误及后果（空 = 无异常无特异观察）\n"
                f"> **数据来源**: `validated_results/{_EVAL_ROUND}/{{group}}/{{run_id}}/agent_stats.csv`（按 run 归档）\n"
            )
            md_text = md_text.replace(ph, f"**{label}**\n\n{detail_block}\n{notes}", 1)
        else:
            print(f"[WARN] 未找到 **{label}** 明细锚点，跳过明细更新")

    # 进度表不再由脚本自动改（多数据库后旧正则失效），手动维护

    # 替换本组总结数字（组名锚定，两组互不干扰）
    md_text = re.sub(
        rf"(总结（{label}）\*\*：共测试 )\d+( 题 × 3 范式 = \*\*)\d+( 题次\*\*)",
        rf"\g<1>{n}\g<2>{total_runs}\g<3>",
        md_text
    )

    # 替换本组汇总表行（组别列锚定）
    md_text = re.sub(
        rf"(\n\| {label} \| CORRECT \|).*(\|)",
        rf"\1 {er_c}/{n} ({er_c/n*100:.1f}%) | **{dlr_c}/{n} ({dlr_c/n*100:.1f}%)** | {rdf_c}/{n} ({rdf_c/n*100:.1f}%) \2",
        md_text
    )
    md_text = re.sub(
        rf"(\n\| {label} \| strict PASS \|).*(\|)",
        rf"\1 {er_s}/{n} ({er_s/n*100:.1f}%) | {dlr_s}/{n} ({dlr_s/n*100:.1f}%) | {rdf_s}/{n} ({rdf_s/n*100:.1f}%) \2",
        md_text
    )
    md_text = re.sub(
        rf"(\n\| {label} \| 平均 token \|).*(\|)",
        rf"\1 {er_tok:,.0f} ({er_vs_dlr_pct:+.1f}% vs DLR) | **{dlr_tok:,.0f}** | {rdf_tok:,.0f} ({rdf_vs_dlr_pct:+.1f}% vs DLR) \2",
        md_text
    )

    md_path.write_text(md_text, encoding="utf-8")
    print(f"[OK] 更新 {md_path}（{label} {n}题/{total_runs}题次, DLR:{dlr_tok:,.0f}tok, ER +{er_vs_dlr_pct:.1f}%, RDF +{rdf_vs_dlr_pct:.1f}%）")


if __name__ == "__main__":
    main()
