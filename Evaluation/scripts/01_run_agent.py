# -*- coding: utf-8 -*-
"""Stage 1 — 兼容入口（薄壳）：换算题号后转交 bash 执行器（run_serial.sh / run_parallel.sh）。

⚠ 本文件**不再自己起 opencode**。旧实现用 Python subprocess 直接跑，有两个硬伤：
  1. 违反硬规则 7 —— Python 子进程启动 opencode，MCP 工具对 Agent 不可见（跑出来的题是废的）；
  2. 日志落在 01_logs/{paradigm}/（没有 run_id），而 02/03/04/parse 都按 run 找日志，接不上。
所以 Stage 1 只保留一份实现（bash），本文件仅保留旧的 --count/--offset 用法做兼容。

用法（在 Git Bash 下）:
  python 01_run_agent.py --paradigm DLR --count 5 --offset 0             # 串行
  python 01_run_agent.py --paradigm DLR --count 5 --offset 0 --parallel  # 并行（--workers 封顶）

收尾（02→03→04→parse）: bash finish_run.sh <run_id>
"""
import argparse, json, shutil, subprocess, sys, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CFG = json.load(open(ROOT / "config.json", encoding="utf-8")) if (ROOT / "config.json").exists() else {}
MINI = ROOT / CFG.get("paths", {}).get("minidev_dir", "MINIDEV_sqlite") / "mini_dev_sqlite.json"
SCRIPT_DIR = ROOT / "Evaluation" / "scripts"


def main():
    ap = argparse.ArgumentParser(description="Stage 1 兼容入口 → 转交 bash 执行器")
    ap.add_argument("--paradigm", required=True, type=str.lower, choices=["er", "dlr", "rdf"])
    ap.add_argument("--count", type=int, default=500, help="跑几题（默认 500）")
    ap.add_argument("--offset", type=int, default=0, help="起始偏移")
    ap.add_argument("--parallel", action="store_true", help="并行跑（默认串行）")
    ap.add_argument("--workers", type=int, default=6, help="并行路数上限（默认 6；新环境实测 12 可行）")
    ap.add_argument("--run-id", default="", help="不传则自动生成 日期_时分_题号_范式")
    a = ap.parse_args()

    para = a.paradigm
    qids = [str(q["question_id"]) for q in json.load(open(MINI, encoding="utf-8"))[a.offset: a.offset + a.count]]
    if not qids:
        print("[ERR] 题号为空（--count / --offset 越界）")
        return 1

    run_id = a.run_id or f"{datetime.datetime.now():%m%d_%H%M}_{'-'.join(qids)}_{para[0].upper()}"
    runner = "run_parallel.sh" if a.parallel else "run_serial.sh"
    bash = shutil.which("bash")
    if not bash:
        print("[ERR] 找不到 bash —— Stage 1 必须在 Git Bash 下跑（CLAUDE.md 硬规则 7）")
        return 1

    cmd = [bash, str(SCRIPT_DIR / runner), para, *qids, "--run-id", run_id]
    if a.parallel:
        cmd += ["--workers", str(a.workers)]
    print(f"[01] {runner} {para} {len(qids)} 题 -> run_id={run_id}", flush=True)
    rc = subprocess.run(cmd).returncode
    if rc == 0:
        print(f"\n[下一步] bash finish_run.sh {run_id}")
    return rc


if __name__ == "__main__":
    sys.exit(main())
