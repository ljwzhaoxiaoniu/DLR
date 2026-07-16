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
PRED_DIR = ROOT / "Evaluation" / "outputs" / "02_predictions"
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
    """从 NDJSON 日志提取 Evidence SQL(最后一行的 Evidence SQL 行)."""
    last_sql = None
    for line in ndjson_text.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            ev = json.loads(line)
        except:
            continue
        # 1) 部分范式 agent 在最后 text 事件里输出 Evidence SQL
        if ev.get("type") == "text":
            txt = ev.get("part", {}).get("text", "")
            m = re.search(r"Evidence SQL:\s*(?:`?)(.+?)(?:`?)\s*$", txt, re.S | re.M | re.I)
            if m and ("SELECT" in m.group(1).upper()):
                last_sql = m.group(1).strip().strip("`")
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
    db_path = DB_DIR / db_id / (db_id + ".sqlite")
    if not db_path.exists():
        return None, f"db missing: {db_path}"
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
    a = ap.parse_args()

    log_dir = LOG_DIR / a.paradigm
    out_dir = PRED_DIR / a.paradigm
    out_dir.mkdir(parents=True, exist_ok=True)

    logs = sorted(log_dir.glob("*.json"))
    print(f"[{a.paradigm.upper()}] 处理 {len(logs)} 题", flush=True)

    ok = fail = missing = 0
    for lf in logs:
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


if __name__ == "__main__":
    main()
