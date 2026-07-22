"""一次性从 MINIDEV_sqlite 抽取题号→db/题目映射,存到 Evaluation/eval_question_map.json"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MINI = ROOT / "MINIDEV_sqlite" / "mini_dev_sqlite.json"
OUT = ROOT / "Evaluation" / "eval_question_map.json"

qs = json.loads(MINI.read_text(encoding="utf-8"))
mapping = [
    {
        "qid": q["question_id"],
        "db": q["db_id"],
        "question": q["question"][:120],
    }
    for q in qs
]
mapping.sort(key=lambda x: x["qid"])
OUT.write_text(json.dumps(mapping, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK: {len(mapping)} questions → {OUT}")

# 顺便看下 q1514/q1515
for m in mapping:
    if m["qid"] in (1514, 1515):
        print(f"  q{m['qid']}  db={m['db']}  {m['question']}")
