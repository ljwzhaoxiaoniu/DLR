# -*- coding: utf-8 -*-
"""Stage 0 — run Golden SQL, write results. Simple: one db at a time, merge at the end."""
import json, sqlite3, math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CFG = json.load(open(ROOT / "config.json", encoding="utf-8")) if (ROOT / "config.json").exists() else {}
_EVAL_OUT = CFG.get("eval", {}).get("output_dir", "Evaluation/outputs")
MINI = ROOT / "MINIDEV_sqlite" / "mini_dev_sqlite.json"
DB_DIR = ROOT / "MINIDEV_sqlite" / "dev_databases"
OUT_DIR = ROOT / _EVAL_OUT
OUT_DIR.mkdir(parents=True, exist_ok=True)

def norm(v):
    if v is None: return None
    if isinstance(v, bytes): return v.decode('utf-8', errors='ignore')
    if isinstance(v, float):
        if math.isnan(v) or math.isinf(v): return str(v)
        r = round(v, 6)
        return int(r) if r == int(r) else r
    return v

questions = json.load(open(MINI, encoding='utf-8'))
# group by db
by_db = {}
for q in questions:
    by_db.setdefault(q['db_id'], []).append(q)

cache = []
for db, qs in by_db.items():
    db_path = DB_DIR / db / (db + '.sqlite')
    if not db_path.exists():
        for q in qs:
            cache.append({"q_id": q["question_id"], "db_id": db, "ok": False, "error": "missing db"})
        print(f"[{db}] MISSING"); continue
    con = sqlite3.connect(str(db_path), timeout=30)
    n_ok = 0
    for q in qs:
        try:
            cur = con.execute(q['SQL'].strip().rstrip(';'))
            cols = [d[0] for d in cur.description]
            rows = [[norm(x) for x in r] for r in cur.fetchall()]
            idx = sorted(range(len(cols)), key=lambda k: str(cols[k]))
            cols = [cols[k] for k in idx]
            rows = sorted([[r[k] for k in idx] for r in rows], key=lambda r: json.dumps(r, default=str))
            cache.append({"q_id": q["question_id"], "db_id": db, "ok": True, "columns": cols, "rows": rows, "error": None})
            n_ok += 1
        except Exception as e:
            cache.append({"q_id": q["question_id"], "db_id": db, "ok": False, "error": str(e)})
    con.close()
    print(f"[{db}] {n_ok}/{len(qs)} ok", flush=True)

json.dump(cache, open(OUT_DIR / "00_golden_cache.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
ok = sum(1 for x in cache if x['ok'])
print(f"Stage 0 done: {ok}/{len(cache)} ok -> {OUT_DIR / '00_golden_cache.json'}")
