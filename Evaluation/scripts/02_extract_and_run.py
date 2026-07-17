# -*- coding: utf-8 -*-
"""Stage 2 — 提取 Pred SQL + 执行 + 标准化.

从 Stage 1 NDJSON 日志中正则 / JSON 解析提取 Evidence SQL → 执行 → 标准化.
标准化规则与 00_preprocess.py 完全一致(float round6、行/列序忽略、None==NULL、bytes→decode).

输出: outputs/02_predictions/{paradigm}/{question_id}.json
"""
import json, sqlite3, math, re, sys, argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DB_DIR = ROOT / "MINIDEV_sqlite" / "dev_databases"
LOG_DIR = ROOT / "Evaluation" / "outputs" / "01_logs"
OUT_BASE = ROOT / "Evaluation" / "outputs"
GOLD = json.load(open(ROOT / "Evaluation" / "outputs" / "00_golden_cache.json", encoding="utf-8"))
GOLD_MAP = {x["q_id"]: x for x in GOLD}


def norm(v):
    if v is None:
        return None
    if isinstance(v, bytes):
        return v.decode("utf-8", errors="ignore")
    if isinstance(v, float):
        if math.isnan(v) or math.isinf(v):
            return str(v)
        r = round(v, 6)
        return int(r) if r == int(r) else r
    return v


def extract_sql(ndjson_text):
    """从 NDJSON 日志提取 Evidence SQL(多种模式匹配)."""
    last_sql = None
    for line in ndjson_text.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            ev = json.loads(line)
        except:
            continue
        # 1) text 事件里输出 Evidence SQL / Final Answer
        if ev.get("type") == "text":
            txt = ev.get("part", {}).get("text", "")
            # 1a) "Evidence SQL: ..." 格式
            m = re.search(r"Evidence\s+SQL\s*:\s*(?:`+)?\s*(.+?)\s*(?:`+)?\s*$", txt, re.S | re.M | re.I)
            if m and ("SELECT" in m.group(1).upper()):
                last_sql = m.group(1).strip().strip("`").strip()
            # 1b) markdown code block 中的 SQL (```sql ... ```)
            for mm in re.finditer(r"```sql\s*\n(.+?)```", txt, re.S | re.I):
                s = mm.group(1).strip()
                if "SELECT" in s.upper():
                    last_sql = s
            # 1c) 行内 SQL 代码块 (`SELECT ...`)
            for mm in re.finditer(r"`(SELECT\s[^`]+)`", txt, re.I):
                last_sql = mm.group(1).strip()
        # 2) bash 工具调用里带 sqlite3 命令行
        if ev.get("type") == "tool_use":
            inp = ev.get("part", {}).get("state", {}).get("input", {}) or {}
            cmd = inp.get("command", "")
            if "sqlite3" in cmd and "SELECT" in cmd.upper():
                m = re.search(r'"(SELECT.+?)"', cmd, re.I | re.S)
                if m:
                    last_sql = m.group(1)
    return last_sql


def run_sql(sql, db_id):
    """执行单条 SQL,返回标准化 (columns, rows)."""
    # 尝试 .sqlite 和 .db 两种后缀
    db_path = None
    for ext in [".sqlite", ".db", ".sqlite3"]:
        cand = DB_DIR / db_id / (db_id + ext)
        if cand.exists():
            db_path = cand
            break
    if not db_path:
        return None, f"db missing: {DB_DIR / db_id}"
    try:
        con = sqlite3.connect(str(db_path), timeout=30)
        cur = con.execute(sql.strip().rstrip(";"))
        cols = [d[0] for d in cur.description]
        rows = [[norm(x) for x in r] for r in cur.fetchall()]
        con.close()
        # 列字母序 + 行字典序 标准化
        idx = sorted(range(len(cols)), key=lambda k: str(cols[k]))
        cols = [cols[k] for k in idx]
        rows = sorted([[r[k] for k in idx] for r in rows], key=lambda r: json.dumps(r, default=str))
        return {"columns": cols, "rows": rows}, None
    except Exception as e:
        return None, str(e)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--paradigm", required=True, choices=["er", "dlr", "rdf"])
    ap.add_argument("--log-subdir", default="", help="Stage 1 子目录名(如 20260717_160000)")
    a = ap.parse_args()

    base_dir = LOG_DIR
    # 自动检测最新 run-id
    run_id = a.log_subdir
    if not run_id:
        # 找 01_logs/ 下最新的子目录
        subdirs = sorted([d for d in base_dir.iterdir() if d.is_dir() and d.name != a.paradigm], reverse=True)
        if subdirs:
            run_id = subdirs[0].name
    log_dir = base_dir / run_id / a.paradigm if run_id else base_dir / a.paradigm
    if not log_dir.exists():
        print(f"[{a.paradigm.upper()}] 日志目录不存在: {log_dir}")
        return

    out_dir = OUT_BASE / run_id / "02_predictions" / a.paradigm if run_id else OUT_BASE / "02_predictions" / a.paradigm
    out_dir.mkdir(parents=True, exist_ok=True)

    logs = sorted(log_dir.glob("*.json"))
    print(f"[{a.paradigm.upper()}] 处理 {len(logs)} 题 (log_dir={log_dir})", flush=True)

    ok = fail = missing = 0
    for lf in logs:
        if not lf.stem.isdigit():
            continue  # 跳过脏文件(如 .json, .err)
        qid = int(lf.stem)
        if qid not in GOLD_MAP:
            missing += 1
            continue
        gold = GOLD_MAP[qid]
        ndjson = lf.read_text(encoding="utf-8", errors="replace")
        sql = extract_sql(ndjson)

        if not sql:
            rec = {"q_id": qid, "ok": False, "error": "no SQL extracted", "sql": None, "result": None}
            fail += 1
        else:
            result, err = run_sql(sql, gold["db_id"])
            if err:
                rec = {"q_id": qid, "ok": False, "error": err, "sql": sql, "result": None}
                fail += 1
            else:
                rec = {"q_id": qid, "ok": True, "error": None, "sql": sql, "result": result}
                ok += 1
        (out_dir / f"{qid}.json").write_text(json.dumps(rec, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"\n[{a.paradigm.upper()}] 完成: ok={ok} fail={fail} missing={missing}")
    # 默认保留全量原始日志 — 唯一数据源,用于 debug Agent 行为 / 回溯工具调用链 / 重新提取 SQL
    if run_id:
        log_path = OUT_BASE / run_id / "01_logs"
        print(f"  [KEEP] Stage 1 日志保留: {log_path}")
    if fail > 0:
        print(f"  [NOTE] 有 {fail} 题失败,建议保留日志排查")


if __name__ == "__main__":
    main()
