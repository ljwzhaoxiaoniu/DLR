"""
Extract evidence from mini_dev_sqlite.json into 11 per-topic JSONL files.

Usage:
  python export_evidence.py                    # export all topics
  python export_evidence.py --out-dir my_rag   # custom output dir
"""
import json
import argparse
from pathlib import Path
from collections import defaultdict

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DATASET = PROJECT_ROOT / "MINIDEV_sqlite" / "mini_dev_sqlite.json"
DEFAULT_OUT = PROJECT_ROOT / "rag_knowledge"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dataset", default=str(DEFAULT_DATASET))
    parser.add_argument("--out-dir", default=str(DEFAULT_OUT))
    args = parser.parse_args()

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    questions = json.load(open(args.dataset, encoding="utf-8"))
    grouped = defaultdict(list)
    for q in questions:
        grouped[q["db_id"]].append(q)

    for db_id, qs in sorted(grouped.items()):
        path = out_dir / f"{db_id}.jsonl"
        records = []
        for q in qs:
            if not q.get("evidence", "").strip():
                continue
            records.append({
                "qid": q["question_id"],
                "question": q["question"],
                "evidence": q["evidence"],
            })
        with open(path, "w", encoding="utf-8") as f:
            for r in records:
                f.write(json.dumps(r, ensure_ascii=False) + "\n")
        print(f"  {path.name}: {len(records)} records")

    print(f"\nDone. {len(grouped)} files written to {out_dir}")


if __name__ == "__main__":
    main()
