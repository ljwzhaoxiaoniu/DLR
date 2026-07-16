# -*- coding: utf-8 -*-
"""三范式对比:同一题跑 ER/DLR/RDF,分析调用链/token/错误.

用途(在 PowerShell 里直接跑,不走 conda run):
  conda activate lepe_som
  python Evaluation\scripts\compare_paradigms.py --qid 1471

注意: 跑前请确保 3 个 serve 已启动(ALL 模式):
  cd Semantic\ Core\ Service && python main.py serve --paradigm ALL
"""
import json, subprocess, sys, argparse, shutil, io
from pathlib import Path
from collections import Counter

# 编码安全:防止在 conda run / Windows GBK 控制台输出时报错
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# 定位 opencode(避免 conda run 子进程 PATH 不继承)
OPENCODE = shutil.which("opencode") or "opencode"

ROOT = Path(__file__).resolve().parents[2]
AGENT_DIR = ROOT / "OC-based Agent Service"
MINI = ROOT / "MINIDEV_sqlite" / "mini_dev_sqlite.json"
GOLD = json.load(open(ROOT / "Evaluation" / "outputs" / "00_golden_cache.json", encoding="utf-8"))
GOLD_MAP = {x["q_id"]: x for x in GOLD}

PARADIGM_DIR = {"er": "oc_er", "dlr": "oc_dlr", "rdf": "oc_rdf"}


def load_question(qid):
    for q in json.load(open(MINI, encoding="utf-8")):
        if q["question_id"] == qid:
            return q
    return None


def run_one(paradigm, prompt, timeout=300):
    """跑单范式,返回 (ndjson_text, dt, success)."""
    cmd = [OPENCODE, "run", "--format", "json", prompt]
    cwd = str(AGENT_DIR / PARADIGM_DIR[paradigm])
    t0 = __import__("time").time()
    try:
        r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout, encoding="utf-8", errors="replace")
        return r.stdout, __import__("time").time() - t0, r.returncode == 0
    except subprocess.TimeoutExpired:
        return "", timeout, False


def parse_ndjson(text):
    """解析 NDJSON,提取工具调用/token/错误."""
    tools = Counter()
    token_in = token_out = 0
    errors = []
    final_answer = ""
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            ev = json.loads(line)
        except:
            continue
        if ev.get("type") == "tool_use":
            t = ev.get("part", {}).get("tool", "")
            tools[t] += 1
            st = ev.get("part", {}).get("state", {}) or {}
            err = (st.get("output") or "")
            if isinstance(err, str) and ("Error:" in err or "no such table" in err or "BizEntity" in err):
                errors.append(f"{t}: {err[:120]}")
        if ev.get("type") == "step_finish":
            tok = ev.get("part", {}).get("tokens", {}) or {}
            token_in += tok.get("input", 0)
            token_out += tok.get("output", 0)
        if ev.get("type") == "text" and "Final Answer:" in (ev.get("part", {}) or {}).get("text", ""):
            final_answer = ev["part"]["text"][ev["part"]["text"].find("Final Answer:"):]
            final_answer = final_answer.split("\n")[0]
    return tools, token_in, token_out, errors, final_answer


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--qid", type=int, default=1471)
    ap.add_argument("--question", default="")
    ap.add_argument("--evidence", default="")
    ap.add_argument("--timeout", type=int, default=300)
    a = ap.parse_args()

    if a.question:
        prompt = f"Question: {a.question}\nEvidence: {a.evidence}"
    else:
        q = load_question(a.qid)
        if not q:
            print(f"q_id {a.qid} not found"); sys.exit(1)
        prompt = f"Question: {q['question']}\nEvidence: {q.get('evidence', '')}"
        gold = GOLD_MAP.get(a.qid, {})
        print(f"=== q_id={a.qid} db={gold.get('db_id','?')} ===")
        print(f"Gold SQL: {gold.get('SQL','')[:120]}")
        print(f"Gold result: {gold.get('rows',[])}")
        print("")

    results = {}
    for p in ["er", "dlr", "rdf"]:
        print(f"[{p.upper()}] running...", flush=True)
        text, dt, ok = run_one(p, prompt, a.timeout)
        tools, tin, terr, errs, final = parse_ndjson(text)
        results[p] = {"dt": dt, "ok": ok, "tools": tools, "tin": tin, "tout": terr, "errors": errs, "final": final}
        print(f"  {dt:.1f}s ok={ok} tools={sum(tools.values())} tin={tin} tout={terr}")
        if errs:
            print(f"  ERRORS: {errs[:2]}")
        print(f"  {final[:100]}")
        print("")

    # 汇总表
    print("=" * 70)
    print(f"{'Paradigm':<8} {'Time':>5} {'MCP':>4} {'bash':>5} {'Tokens':>8} {'Errors':>6} {'Final Answer'}")
    print("-" * 70)
    for p in ["er", "dlr", "rdf"]:
        r = results[p]
        mcp = sum(v for k, v in r["tools"].items() if k != "bash")
        bash = r["tools"].get("bash", 0)
        print(f"{p.upper():<8} {r['dt']:>5.1f} {mcp:>4} {bash:>5} {r['tin']+r['tout']:>8} {len(r['errors']):>6} {r['final'][:50]}")
    print("=" * 70)

    # 详细工具链
    print("\n=== Tool call chains ===")
    for p in ["er", "dlr", "rdf"]:
        r = results[p]
        print(f"\n[{p.upper()}]")
        for t, c in r["tools"].most_common():
            print(f"  {c}x {t}")


if __name__ == "__main__":
    main()
