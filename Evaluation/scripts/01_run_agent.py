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
MINI = ROOT / "MINIDEV_sqlite" / "mini_dev_sqlite.json"
OUT_DIR = ROOT / "Evaluation" / "outputs" / "01_logs"
AGENT_DIR = ROOT / "OC-based Agent Service"

PARADIGM_PORT = {"er": 28767, "dlr": 28777, "rdf": 28787}
PARADIGM_DIR = {"er": "oc_er", "dlr": "oc_dlr", "rdf": "oc_rdf"}

# 定位 opencode 可执行文件(Windows 上 Python CreateProcess 找不到 npm 全局 .ps1)
def _find_opencode():
    # shutil.which 在 Windows 上只找 .exe/.cmd/.bat,不找 .ps1
    for name in ["opencode.exe", "opencode.cmd", "opencode"]:
        p = shutil.which(name)
        if p:
            return p
    # 兜底:npm 全局 bin 目录
    npm_root = shutil.which("npm")
    if npm_root:
        npm_bin = Path(npm_root).parent
        for name in ["opencode.cmd", "opencode.exe", "opencode"]:
            candidate = npm_bin / name
            if candidate.exists():
                return str(candidate)
    return "opencode"  # 让它报错如果找不到

OPENCODE = _find_opencode()


def load_questions():
    return json.load(open(MINI, encoding="utf-8"))


def run_one(q, paradigm, timeout=300):
    """跑单题,返回 (out_path, success, dt)."""
    qid = q["question_id"]
    out_dir = OUT_DIR / paradigm
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{qid}.json"
    if out_path.exists():
        return out_path, True, 0.0  # 续跑跳过

    prompt = f"Question: {q['question']}\nEvidence: {q.get('evidence', '')}"
    session_title = f"eval_{paradigm}_{qid}"
    cmd = [
        OPENCODE, "run", "--format", "json",
        "--title", session_title,   # 命名 session,追溯 + 精确查 token
        prompt,
    ]
    cwd = str(AGENT_DIR / PARADIGM_DIR[paradigm])
    # Windows 上 opencode.cmd 需要 cmd.exe 执行 + 完整用户 PATH
    run_env = os.environ.copy()
    if sys.platform == "win32":
        # COMSPEC = cmd.exe; 传递完整环境 + 显式 PATH
        npm_paths = [
            r"C:\Users\user\AppData\Roaming\npm",
            r"C:\Program Files\nodejs",
        ]
        run_env["PATH"] = os.pathsep.join(npm_paths) + os.pathsep + run_env.get("PATH", "")
    t0 = time.time()
    try:
        # Windows: 通过 cmd /c 调用 opencode.cmd,匹配交互模式
        if sys.platform == "win32":
            cmd = ["cmd", "/c"] + cmd
        r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout, encoding='utf-8', errors='replace', env=run_env)
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
    ap.add_argument("--timeout", type=int, default=300, help="每题超时秒")
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
