#!/usr/bin/env python3
"""Cloud-OpsBench 评分驱动 —— 复用上游 evaluation.py 的函数（**不触碰其固定 CONFIG_PATH**）。

用法:
  $PY run_eval.py --checkout <COB检出> --score-root <轨迹根> --system <boutique|train-ticket>
                  --category <cat> --out <成绩目录> [--model dsh-tsm]

输入: <score-root>/<sysDir>/<model>/<category>/<case>/<case>.json（convert.mjs 产物）
标签: <checkout>/process-label/<sysDir>/<category>/<case>/milestone.json
产出: <out>/<sysDir>_<cat>_summary.json · _details.json · _questions.csv · _group.md
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path

METRIC_NAMES = ["CA", "FA", "JRA", "MC", "EOC", "ECR", "EE", "steps", "RAR", "invalid_actions"]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--checkout", required=True, help="Cloud-OpsBench 检出（含 process-label/ 与 agents/）")
    ap.add_argument("--score-root", required=True, help="convert.mjs 的 --score-root")
    ap.add_argument("--system", required=True, help="boutique | train-ticket")
    ap.add_argument("--category", required=True)
    ap.add_argument("--out", required=True, help="成绩输出目录")
    ap.add_argument("--model", default="dsh-tsm")
    args = ap.parse_args()

    agent_dir = Path(args.checkout) / "agents" / "cloudops_agent"
    if not agent_dir.is_dir():
        print(f"[ERR] 找不到上游 agent 目录: {agent_dir}", file=sys.stderr)
        return 2
    sys.path.insert(0, str(agent_dir))
    import evaluation  # type: ignore  # 上游评分器（函数级复用）

    config = {
        "model": {"model": args.model},
        "diagnosis": {
            "system": args.system,
            "fault_category": args.category,
            "dataset_root": args.checkout,
            "save_root": args.score_root,
        },
    }
    paths = evaluation.resolve_paths_from_config(config)
    label_root = paths["label_root"]
    agent_root = paths["agent_root"]
    if not agent_root.is_dir():
        print(f"[ERR] 轨迹目录不存在（先跑 convert.mjs）: {agent_root}", file=sys.stderr)
        return 2

    # 案例名单 = agent_root 下已有 <case>/<case>.json 的子目录（即本次转换过的）
    case_names = sorted(
        (p.name for p in agent_root.iterdir() if p.is_dir() and (p / f"{p.name}.json").is_file()),
        key=lambda x: int(x) if x.isdigit() else x,
    )
    if not case_names:
        print(f"[ERR] {agent_root} 下没有可用轨迹", file=sys.stderr)
        return 2

    details = [evaluation.evaluate_case(c, label_root, agent_root) for c in case_names]
    summary = evaluation.summarize(details, paths, config)

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    sys_dir = evaluation.normalize_system_name(args.system)
    stem = f"{sys_dir}_{args.category}"
    (out / f"{stem}_summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (out / f"{stem}_details.json").write_text(json.dumps(details, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # ── questions.csv（每案一行）──
    csv_path = out / f"{stem}_questions.csv"
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["case", *METRIC_NAMES, "pred_fault_object", "pred_root_cause", "gt_fault_object", "gt_root_cause", "error"])
        for d in details:
            m = d.get("metrics", {}) or {}
            gt = d.get("ground_truth", {}) or {}
            preds = d.get("top_3_predictions") or []
            p1 = preds[0] if preds else {}
            w.writerow([
                f"{sys_dir}/{args.category}/{d.get('case_name')}",
                *["" if m.get(n) is None else m.get(n) for n in METRIC_NAMES],
                p1.get("fault_object", ""), p1.get("root_cause", ""),
                gt.get("fault_object", ""), gt.get("root_cause", ""),
                d.get("error", ""),
            ])

    # ── group.md（组片段；grade.sh 汇总进 summary.md）──
    counts = summary.get("counts", {})
    metrics = summary.get("metrics", {})
    lines = [f"## {sys_dir}/{args.category}", ""]
    lines.append(f"- cases: run={counts.get('run_cases', 0)} / selected={counts.get('selected_cases', 0)}"
                 f" · invalid_actions={counts.get('invalid_action_total', 0)}"
                 + (f" · errors={ {k: v for k, v in counts.items() if k.endswith('missing_agent_case_json') or k.startswith('unparsed')} }" if any(k.startswith('unparsed') or k.endswith('missing_agent_case_json') for k in counts) else ""))
    lines.append("")
    lines.append("| " + " | ".join(METRIC_NAMES) + " |")
    lines.append("|" + "---|" * len(METRIC_NAMES))
    lines.append("| " + " | ".join(str(metrics.get(n, "")) for n in METRIC_NAMES) + " |")
    lines.append("")
    lines.append("| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |")
    lines.append("|---|---|---|---|---|---|---|---|---|---|---|---|---|")
    for d in details:
        m = d.get("metrics", {}) or {}
        gt = d.get("ground_truth", {}) or {}
        preds = d.get("top_3_predictions") or []
        p1 = preds[0] if preds else {}
        cell = lambda n: "" if m.get(n) is None else (f"{m.get(n):g}" if isinstance(m.get(n), float) else str(m.get(n)))
        lines.append(
            f"| {d.get('case_name')} | {cell('CA')} | {cell('FA')} | {cell('JRA')} | {cell('MC')} | {cell('EOC')} | {cell('ECR')} | "
            f"{cell('EE')} | {cell('steps')} | {cell('RAR')} | {cell('invalid_actions')} | "
            f"{p1.get('fault_object','')} + {p1.get('root_cause','')} | {gt.get('fault_object','')} + {gt.get('root_cause','')} |"
        )
    lines.append("")
    (out / f"{stem}_group.md").write_text("\n".join(lines), encoding="utf-8")

    # stdout：上游原版表（grade.sh tee 进日志）
    evaluation.print_summary(summary)
    print("-" * 80)
    print(f"[group] {stem}: {csv_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
