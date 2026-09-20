# -*- coding: utf-8 -*-
"""跑题实时监控 —— 版式对齐 Semantic Core Service 的 build（分段标题 + tqdm 进度条）：

    Eval Monitor  20:41:07                       (Ctrl-C 退出)
    ==================================================
    [MONITOR] 0917_2042_1471-1472-1473-1476_D
    [DLR] 跑题:  50%|███████████▌        | 2/4 [01:23<01:23, 41.5s/题]
      [RUN ] q1472   02:01
      [OK  ] q1471   01:12
      [WAIT] q1476  --:--

只显示范式 / 题号 / 时间（跳秒）—— 不看 CPU、内存。依赖 psutil，只读采样、零侵入。

批次来自执行器进程 argv（run_parallel.sh <paradigm> <qid...> --run-id X），同一批次的
多个执行器进程（父壳 + worker 子壳）合并成一条；题状态来自
outputs2/01_logs/<run_id>/<paradigm>/：有 agent 进程=RUN；无进程时 `.err` 留存=失败
（`.err` 起跑就建、成功才删，别把它当"运行中即失败"）、非空 `<qid>.json`=成功。找不到
执行器时（手工起监控）退回按 .last_run_id 的日志目录估算。

用法:
    python monitor_runs.py                # 单次快照
    python monitor_runs.py --watch 5      # 每 5 秒刷新（Ctrl-C 退出）
    python monitor_runs.py --demo         # 打印示意（不采样）
"""
import argparse
import json
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CFG = json.load(open(ROOT / "config.json", encoding="utf-8")) if (ROOT / "config.json").exists() else {}
LOG_ROOT = ROOT / CFG.get("eval", {}).get("output_dir", "Evaluation/outputs") / "01_logs"

RUNNERS = ("eval_run.sh", "run_parallel.sh", "run_serial.sh")
BATCH_RUNNERS = ("run_parallel.sh", "run_serial.sh")
IDLE_GRACE = 45.0    # 连续无 agent 进程的判定窗口下限：必须盖住 5-30s 的错峰空档
BAR_W = 20           # 进度条宽度（tqdm 默认占满终端，这里固定宽度便于对齐）
PARTIAL = "▏▎▍▌▋▊▉"


def fmt_dur(sec):
    sec = int(max(sec, 0))
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m:02d}:{s:02d}"


def _mtime(path):
    try:
        return path.stat().st_mtime
    except OSError:
        return 0.0


def collect_agents():
    """运行中的 Agent 进程；返回 (rows, now)，row: paradigm/qid/start。"""
    try:
        import psutil
    except ImportError:
        print("[ERR] psutil missing -- install: pip install psutil (in lepe_som env)")
        return None
    now = time.time()
    rows = []
    for p in psutil.process_iter(["pid", "name", "cmdline", "create_time"]):
        try:
            info = p.info
            cmd = " ".join(info.get("cmdline") or [])
            name = (info.get("name") or "").lower()
            # 只认真正的 Agent 进程（opencode / node）——timeout/sh/bash 外壳的命令行里
            # 也带 --title eval_*，但名字不是 opencode/node，必须排除，保证"一题一行"
            if not (name.startswith("opencode") or (name.startswith("node") and "opencode" in cmd)):
                continue
            m = re.search(r"--title\s+eval_(\w+)_(\d+)", cmd)
            if not m:
                continue
            rows.append({"paradigm": m.group(1).lower(), "qid": int(m.group(2)),
                         "start": info.get("create_time") or now})
        except Exception:
            continue
    return rows, now


def collect_batches():
    """执行器进程 → 批次列表 + 执行器是否存活。
    批次 = run_parallel.sh/run_serial.sh <paradigm> <qid...> --run-id X [--workers N]。"""
    try:
        import psutil
    except ImportError:
        return [], False
    batches, alive = [], False
    for p in psutil.process_iter(["cmdline", "create_time"]):
        try:
            argv = [a for a in (p.info.get("cmdline") or []) if a]
        except Exception:
            continue
        if any(a.replace("\\", "/").endswith(RUNNERS) for a in argv):
            alive = True
        idx = next((i for i, a in enumerate(argv)
                    if a.replace("\\", "/").endswith(BATCH_RUNNERS)), None)
        if idx is None:
            continue
        rest = argv[idx + 1:]
        paradigm, qids, run_id = (rest[0].lower() if rest else ""), [], ""
        i = 1
        while i < len(rest):
            a = rest[i]
            if a == "--run-id" and i + 1 < len(rest):
                run_id, i = rest[i + 1], i + 2
                continue
            if a in ("--workers", "--paradigm"):
                i += 2
                continue
            if a.isdigit():
                qids.append(int(a))
            i += 1
        if qids:
            batches.append({"run_id": run_id, "paradigm": paradigm, "qids": qids,
                            "start": p.info.get("create_time") or 0.0})
    return _merge_batches(batches), alive


def _merge_batches(batches):
    """同一批次的多个执行器进程（父壳 + 各 worker 子壳都带 run_parallel.sh 名）合并成一条：
    qids 取并集、start 取最早——否则一个批次被渲染成 N 块重复。"""
    merged = {}
    for b in batches:
        key = (b["run_id"], b["paradigm"])
        m = merged.get(key)
        if m is None:
            merged[key] = {**b, "qids": sorted(set(b["qids"]))}
            continue
        m["qids"] = sorted(set(m["qids"]) | set(b["qids"]))
        if b.get("start") and (not m.get("start") or b["start"] < m["start"]):
            m["start"] = b["start"]
    return sorted(merged.values(), key=lambda x: (x["run_id"], x["paradigm"]))


def batches_from_logdir():
    """没有执行器时（手工起监控）：按 .last_run_id 的日志目录估算批次。"""
    try:
        rid = (LOG_ROOT / ".last_run_id").read_text(encoding="utf-8").strip()
    except OSError:
        return []
    out = []
    for pdir in sorted(LOG_ROOT.glob(f"{rid}/*")):
        if not pdir.is_dir():
            continue
        files = [f for f in pdir.glob("*") if f.stem.isdigit()]
        if not files:
            continue
        # 批次起止取日志文件的时间（没有执行器进程可参照时）：ctime=开跑、mtime=跑完
        cts, mts = [], []
        for f in files:
            try:
                st = f.stat()
                cts.append(st.st_ctime)
                mts.append(st.st_mtime)
            except OSError:
                pass
        out.append({"run_id": rid, "paradigm": pdir.name.lower(),
                    "qids": sorted({int(f.stem) for f in files}),
                    "start": min(cts) if cts else 0.0,
                    "end": max(mts) if mts else 0.0})
    return out


def merge_with_logdir(batches):
    """执行器退出 ≠ 该范式没跑过：把**同一 run**里执行器已退出的范式从日志目录补回来。
    否则某个范式一跑完，它那一块就从视图里消失（直到全部跑完才整体回退重现身）——
    2026-09-20 用户实跑观察到的"中间消失了一下"。"""
    logdir = batches_from_logdir()
    if not batches:
        return logdir
    live = {b["run_id"] for b in batches}
    known = {(b["run_id"], b["paradigm"]) for b in batches}
    for b in logdir:
        if b["run_id"] in live and (b["run_id"], b["paradigm"]) not in known:
            batches.append(b)
    return sorted(batches, key=lambda x: (x["run_id"], x["paradigm"]))


def question_rows(batch, agents, now, log_root):
    """批次内每题一行：(状态, 题号, 时间)。RUN=在跑 / OK=完成 / FAIL=失败 / WAIT=没开始。"""
    running = {(a["paradigm"], a["qid"]): a for a in agents}
    pdir = log_root / batch["run_id"] / batch["paradigm"]
    rows = []
    for qid in batch["qids"]:
        json_f, err_f = pdir / f"{qid}.json", pdir / f"{qid}.err"
        # 顺序要紧：.err 是 run_parallel.sh 起跑就用 2> 重定向建出来的、**成功才删**，
        # 所以"有 .err" ≠ 失败——先问 agent 进程在不在，再看 .err 是否留存下来。
        if (batch["paradigm"], qid) in running:
            rows.append(("RUN ", qid, now - running[(batch["paradigm"], qid)]["start"]))
        elif err_f.exists():
            rows.append(("FAIL", qid, max(_mtime(err_f) - _mtime(json_f), 0)))
        elif json_f.exists() and json_f.stat().st_size > 0:
            # 日志文件全程被追加写：mtime=跑完时刻，ctime=开跑时刻
            try:
                st = json_f.stat()
                rows.append(("OK  ", qid, max(st.st_mtime - st.st_ctime, 0)))
            except OSError:
                rows.append(("OK  ", qid, 0))
        else:
            rows.append(("WAIT", qid, 0))
    return rows


def render(batches, agents, now, log_root=None, watching=False, rows_override=None):
    """整帧拼成一个字符串返回——调用方一次 write 出去，清屏与重绘之间不留空窗
    （分多次 print 时，Windows 控制台会看到"闪一下空白"）。"""
    log_root = log_root or LOG_ROOT
    out = [f"  Eval Monitor  {datetime.now().strftime('%H:%M:%S')}"
           + ("        (Ctrl-C 退出)" if watching else "")]
    if not batches:
        out.append("  -- no eval processes running")
        return "\n".join(out) + "\n"
    for b in batches:
        total = len(b["qids"])
        starts = [s for s in [b.get("start")] if s] + \
                 [a["start"] for a in agents if a["paradigm"] == b["paradigm"]]
        # 该范式没有 agent 在跑 + 批次已收尾 → 显示整批耗时，而不是"距开始过了多久"
        running_here = any(a["paradigm"] == b["paradigm"] for a in agents)
        cutoff = b.get("end") if (b.get("end") and not running_here) else now
        elapsed = max(cutoff - min(starts), 0) if starts else 0
        rows = (rows_override if rows_override is not None
                else question_rows(b, agents, now, log_root))
        done = sum(1 for st, _, _ in rows if st.strip() in ("OK", "FAIL"))
        # tqdm 版式：desc: 百分比|█条| n/N [已用<剩余, 速率]
        filled = BAR_W * done / total if total else 0
        solid, frac = int(filled), filled - int(filled)
        partial = PARTIAL[min(int(frac * 7), 6)] if solid < BAR_W else ""
        bar = "█" * solid + partial + " " * max(BAR_W - solid - len(partial), 0)
        if done:
            rate = elapsed / done
            eta = "00:00" if done >= total else fmt_dur(rate * (total - done))
            tail = f"{rate:.1f}s/题"
        else:
            eta, tail = "?", "?s/题"
        out.append("  ==================================================")
        out.append(f"  [MONITOR] {b['run_id']}")
        out.append(f"  [{b['paradigm'].upper()}] 跑题: {int(done / total * 100) if total else 0:3d}%|{bar}| "
                   f"{done}/{total} [{fmt_dur(elapsed)}<{eta}, {tail}]")
        for st, qid, dur in rows:
            out.append(f"    [{st}] q{qid}  {fmt_dur(dur) if dur else '--:--'}")
    return "\n".join(out) + "\n"


def runner_alive():
    """跑题执行器是否还在跑（--until-done 的退出判据）。
    匹配口径 = argv 里有一项以脚本名结尾（真把脚本当命令跑），不用"命令行整串包含"
    —— 否则任何夹带脚本名的进程（-c 里贴了段脚本）都会被误判成执行器。"""
    try:
        import psutil
    except ImportError:
        return False
    me = os.getpid()
    try:
        for p in psutil.process_iter(["pid", "cmdline"]):
            if p.info.get("pid") == me:
                continue
            argv = p.info.get("cmdline") or []
            if any(a.replace("\\", "/").endswith(RUNNERS) for a in argv if a):
                return True
    except Exception:
        pass
    return False


def main():
    ap = argparse.ArgumentParser(description="跑题实时监控（范式 | 题号 | 时间）")
    ap.add_argument("--watch", type=float, default=0, metavar="SEC", help="刷新的秒数（默认单次快照）")
    ap.add_argument("--until-done", action="store_true",
                    help="等到批次结束自动退出（配合自动弹窗/批处理）；判据=执行器已退出且连续 3 帧无 agent")
    ap.add_argument("--wait-first", type=float, default=90, metavar="SEC",
                    help="--until-done 模式下、且**没有任何执行器进程**时，等首个跑题进程的秒数")
    ap.add_argument("--demo", action="store_true", help="打印示意（不采样）")
    a = ap.parse_args()

    if a.demo:
        now = time.time()
        batch = {"run_id": "0917_2042_1471-1472-1473-1476_D", "paradigm": "dlr",
                 "qids": [1471, 1472, 1473, 1476], "start": now - 121}
        agents = [{"paradigm": "dlr", "qid": 1473, "start": now - 41},
                  {"paradigm": "dlr", "qid": 1476, "start": now - 18}]
        rows = [("OK  ", 1471, 62), ("OK  ", 1472, 88),
                ("RUN ", 1473, 41), ("RUN ", 1476, 18)]
        sys.stdout.write(render([batch], agents, now, watching=True, rows_override=rows))
        return

    seen, idle_since, waited = False, None, 0.0
    try:
        while True:
            got = collect_agents()
            if got is None:
                return
            agents, now = got
            batches, alive = collect_batches()
            # 跑完的范式按日志补回来（执行器退了 ≠ 该块该消失）
            batches = merge_with_logdir(batches)
            frame = render(batches, agents, now, watching=bool(a.watch))
            # 清屏 + 整帧一次写出（分多次 print 会在 Windows 控制台上闪一下空白）
            sys.stdout.write(("\033[2J\033[H" if a.watch else "") + frame)
            sys.stdout.flush()
            if not a.watch:
                break
            if a.until_done:
                if agents or alive:
                    seen, idle_since = True, None
                elif seen:
                    if idle_since is None:
                        idle_since = now
                    # 窗口下限 IDLE_GRACE：即使执行器探测漏判，也不在错峰空档里误退
                    elif now - idle_since >= max(3 * a.watch, IDLE_GRACE):
                        print("  [DONE] all eval processes finished; monitor exiting")
                        break
                else:
                    waited += a.watch
                    if waited >= a.wait_first:
                        print(f"  [EXIT] no eval process appeared within {a.wait_first:.0f}s; monitor exiting")
                        break
            time.sleep(a.watch)
    except KeyboardInterrupt:
        print("\n  [EXIT] monitor stopped (runs unaffected)")


if __name__ == "__main__":
    main()
