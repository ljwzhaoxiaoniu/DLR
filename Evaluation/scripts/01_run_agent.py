# -*- coding: utf-8 -*-
"""Stage 1 — Agent 执行: 逐题独立 opencode session, 零上下文污染.

每个问题 = 一个全新的 opencode run (无 --continue), Agent 不知道自己属于哪个范式,
通过 /mcps 发现可用工具, 按 AGENTS.md 流程: 语义召回 → 映射查询 → SQL → Final Answer.

输出: outputs/01_logs/{paradigm}/{question_id}.json (NDJSON, 含 .usage token 事件).
Token 提取: jq 'select(.usage != null) | .usage' <file>

用途评测:
  python 01_run_agent.py --paradigm DLR --count 500
  python 01_run_agent.py --paradigm DLR --count 5 --offset 0   # 小批测试

注意: 跑前请确保 serve 已启动 (python main.py serve --paradigm <P>).
"""
import json, os, subprocess, sys, time, argparse, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# 加载项目级 config
CFG = {}
_cfg_path = ROOT / "config.json"
if _cfg_path.exists():
    CFG = json.load(open(_cfg_path, encoding="utf-8"))
_cfg_paths = CFG.get("paths", {})
_cfg_oc = CFG.get("opencode", {})
_cfg_server = CFG.get("server", {})
_cfg_eval = CFG.get("eval", {})

MINIDEV_REL = _cfg_paths.get("minidev_dir", "MINIDEV_sqlite")
MINI = ROOT / MINIDEV_REL / "mini_dev_sqlite.json"
_EVAL_OUT = _cfg_eval.get("output_dir", "Evaluation/outputs")
OUT_DIR = ROOT / _EVAL_OUT / "01_logs"
AGENT_DIR = ROOT / "OC-based Agent Service"

PARADIGM_DIR = {"er": "oc_er", "dlr": "oc_dlr", "rdf": "oc_rdf"}
DEFAULT_TIMEOUT = _cfg_eval.get("timeout_per_question", 300)

# 定位 opencode 可执行文件(从 config 或环境变量读 npm 搜索路径)
def _find_opencode():
    for name in ["opencode.exe", "opencode.cmd", "opencode"]:
        p = shutil.which(name)
        if p:
            return p
    # 从 config 读取 npm 搜索路径,支持 %USERPROFILE% 展开
    search_paths = _cfg_oc.get("npm_search_paths", [])
    for sp in search_paths:
        sp = os.path.expandvars(sp)
        for name in ["opencode.cmd", "opencode.exe", "opencode"]:
            cand = Path(sp) / name
            if cand.exists():
                return str(cand)
    return "opencode"

OPENCODE = _find_opencode()


def load_questions():
    return json.load(open(MINI, encoding="utf-8"))


def run_one(q, paradigm, timeout=300):
    """跑单题,返回 (out_path, success, dt)."""
    qid = q["question_id"]
    out_dir = OUT_DIR / paradigm
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{qid}.json"
    # 续跑跳过：仅当上一轮成功（有输出且无 .err）——失败/超时也会留下 out_path，
    # 不加这道判断会把失败静默冻结进归档
    if out_path.exists() and out_path.stat().st_size > 0 and not (out_dir / f"{qid}.err").exists():
        return out_path, True, 0.0

    # 范式无关: 不点名任何具体工具（AGENTS.md 要求先 /mcps 自发现），
    # 也不写死 Ch1→Ch2 的先后（三级并行锚定，见 AGENTS.md 核心约束 1）
    prompt = (
        "CRITICAL: MCP tools only — run /mcps first to discover this paradigm's tools. "
        "Use semantic recall + evidence search + the mapping tool for metadata, then sqlite3 for data. "
        "NO glob/read/bash to find databases. "
        "End with: Final Answer: <result> | Evidence SQL: <sql>. "
        f"Question: {q['question']}"
    )
    session_title = f"eval_{paradigm}_{qid}"
    cmd = [
        OPENCODE, "run", "--format", "json",
        "--title", session_title,   # 命名 session,追溯 + 精确查 token
        prompt,
    ]
    cwd = str(AGENT_DIR / PARADIGM_DIR[paradigm])
    # 从 config 读取 npm 路径注入 PATH
    run_env = os.environ.copy()
    npm_search = _cfg_oc.get("npm_search_paths", [])
    if npm_search:
        npm_paths = [os.path.expandvars(p) for p in npm_search]
        run_env["PATH"] = os.pathsep.join(npm_paths) + os.pathsep + run_env.get("PATH", "")
    t0 = time.time()
    try:
        # 转义双引号防止 prompt 中的引号截断
        escaped_prompt = prompt.replace('"', '\\"')
        cmd_str = f'"{OPENCODE}" run --format json --title "{session_title}" "{escaped_prompt}"'
        r = subprocess.run(cmd_str, cwd=cwd, capture_output=True, text=True, timeout=timeout,
                          encoding='utf-8', errors='replace', env=run_env, shell=True)
        out_path.write_text(r.stdout, encoding="utf-8")
        if r.returncode != 0:
            (out_dir / f"{qid}.err").write_text(r.stderr, encoding="utf-8")
        return out_path, r.returncode == 0, time.time() - t0
    except subprocess.TimeoutExpired:
        (out_dir / f"{qid}.err").write_text(f"TIMEOUT after {timeout}s", encoding="utf-8")
        return out_path, False, timeout


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--paradigm", required=True, choices=["er", "dlr", "rdf"])
    ap.add_argument("--count", type=int, default=500, help="跑几题(默认500, 小批测试设5)")
    ap.add_argument("--offset", type=int, default=0, help="起始偏移")
    ap.add_argument("--timeout", type=int, default=DEFAULT_TIMEOUT, help="每题超时秒")
    a = ap.parse_args()

    qs = load_questions()
    qs = qs[a.offset: a.offset + a.count]
    print(f"[{a.paradigm.upper()}] 跑 {len(qs)} 题 (offset={a.offset}, timeout={a.timeout}s)", flush=True)

    ok = fail = skip = 0
    for i, q in enumerate(qs):
        out_path, success, dt = run_one(q, a.paradigm, a.timeout)
        tag = "SKIP" if (dt == 0 and success) else ("OK" if success else "FAIL")
        if dt == 0 and success:
            skip += 1
        elif success:
            ok += 1
        else:
            fail += 1
        print(f"  [{i+1}/{len(qs)}] q{q['question_id']} {tag} ({dt:.1f}s) -> {out_path.name}", flush=True)

    print(f"\n[{a.paradigm.upper()}] 完成: ok={ok} fail={fail} skip={skip}")


if __name__ == "__main__":
    main()
