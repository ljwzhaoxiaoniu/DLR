# -*- coding: utf-8 -*-
"""跑题实时监控 — 每个运行中的 Agent 进程一行：
    PID | 范式 | 题号 | 启动 | 运行时长 | CPU% | 内存

依赖 psutil（见 requirements.txt）。只读采样，零侵入，不影响跑题。
进程识别：cmdline 含 `--title eval_{paradigm}_{qid}` 的 opencode 进程
（eval_run.sh / 01_run_agent.py 均用此标题命名）。

用法:
    python monitor_runs.py                # 单次快照
    python monitor_runs.py --watch 5      # 每 5 秒刷新（Ctrl-C 退出）
    python monitor_runs.py --demo         # 打印示意表（不采样，验证版式）
"""
import argparse
import os
import re
import sys
import time
from datetime import datetime

COLS = ("PID", "范式", "题号", "启动", "运行", "CPU%", "内存")


def fmt_dur(sec):
    sec = int(max(sec, 0))
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    if h:
        return f"{h}h{m:02d}m"
    if m:
        return f"{m}m{s:02d}s"
    return f"{s}s"


def collect():
    """采样运行中的跑题进程；返回（行列表, now）。行含 cpu 秒数，供百分比换算。"""
    try:
        import psutil
    except ImportError:
        print("[ERR] 缺 psutil —— 先安装: pip install psutil（lepe_som 环境）")
        return None

    now = time.time()
    rows = []
    for p in psutil.process_iter(["pid", "name", "cmdline", "create_time", "memory_info"]):
        try:
            info = p.info
            cmd = " ".join(info.get("cmdline") or [])
            name = (info.get("name") or "").lower()
            if "opencode" not in cmd and "opencode" not in name:
                continue
            if "eval_" not in cmd:  # 只认跑题进程（--title eval_{paradigm}_{qid}）
                continue
            m = re.search(r"--title\s+eval_(\w+)_(\d+)", cmd)
            try:
                cpu_s = sum(p.cpu_times()[:2])
            except Exception:
                cpu_s = 0.0
            mem = info.get("memory_info")
            rows.append({
                "pid": info.get("pid", 0),
                "paradigm": (m.group(1) if m else "?").upper(),
                "qid": int(m.group(2)) if m else 0,
                "cpu_s": cpu_s,
                "rss": (mem.rss if mem else 0),
                "start": info.get("create_time") or now,
            })
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    rows.sort(key=lambda r: r["pid"])
    return rows, now


def render(rows, now, prev):
    """渲染表格；prev = {pid: (cpu_s, ts)} 用于两帧间 CPU% 换算。"""
    cores = os.cpu_count() or 1
    if rows:
        print(f"  跑题实时监控  {datetime.now().strftime('%H:%M:%S')}  "
              f"（{len(rows)} 个运行中进程；Ctrl-C 退出）")
        head = (f"  {COLS[0]:<7} {COLS[1]:<5} {COLS[2]:<6} {COLS[3]:<9} "
                f"{COLS[4]:<8} {COLS[5]:<7} {COLS[6]}")
        print(head)
        print("  " + "-" * (len(head) - 2))
        for r in rows:
            pid = r["pid"]
            runtime = now - r["start"]
            if prev and pid in prev:
                dcpu = r["cpu_s"] - prev[pid][0]
                dt = max(now - prev[pid][1], 1e-6)
                cpu_pct = dcpu / dt / cores * 100
            else:  # 单次快照：给生命周期平均 CPU%
                cpu_pct = (r["cpu_s"] / runtime / cores * 100) if runtime > 1 else 0.0
            print(f"  {pid:<7} {r['paradigm']:<5} {r['qid']:<6} "
                  f"{datetime.fromtimestamp(r['start']).strftime('%H:%M:%S'):<9} "
                  f"{fmt_dur(runtime):<8} {cpu_pct:>5.1f}%  {r['rss']/1024/1024:>6.0f}MB")
    else:
        print(f"  跑题实时监控  {datetime.now().strftime('%H:%M:%S')}  —— 无运行中的跑题进程")


def main():
    ap = argparse.ArgumentParser(description="跑题实时监控（PID | 范式 | 题号 | 启动 | 运行 | CPU% | 内存）")
    ap.add_argument("--watch", type=float, default=0, metavar="SEC", help="刷新的秒数（默认单次快照）")
    ap.add_argument("--demo", action="store_true", help="打印示意表（不采样）")
    a = ap.parse_args()

    if a.demo:
        now = time.time()
        fake = [
            {"pid": 12345, "paradigm": "ER", "qid": 1479, "cpu_s": 820, "rss": 412 * 1024 * 1024, "start": now - 754},
            {"pid": 12388, "paradigm": "ER", "qid": 1480, "cpu_s": 795, "rss": 398 * 1024 * 1024, "start": now - 742},
            {"pid": 12420, "paradigm": "DLR", "qid": 1479, "cpu_s": 610, "rss": 366 * 1024 * 1024, "start": now - 690},
            {"pid": 12451, "paradigm": "DLR", "qid": 1480, "cpu_s": 601, "rss": 371 * 1024 * 1024, "start": now - 688},
            {"pid": 12477, "paradigm": "RDF", "qid": 1479, "cpu_s": 588, "rss": 354 * 1024 * 1024, "start": now - 655},
            {"pid": 12498, "paradigm": "RDF", "qid": 1480, "cpu_s": 540, "rss": 341 * 1024 * 1024, "start": now - 651},
        ]
        render(fake, now, None)
        return

    prev = None
    try:
        while True:
            got = collect()
            if got is None:
                return
            rows, now = got
            if a.watch:
                sys.stdout.write("\033[2J\033[H")  # 清屏，模拟 top
            render(rows, now, prev)
            if not a.watch:
                break
            prev = {r["pid"]: (r["cpu_s"], now) for r in rows}
            time.sleep(a.watch)
    except KeyboardInterrupt:
        print("\n  [EXIT] 监控退出（跑题不受影响）")


if __name__ == "__main__":
    main()
