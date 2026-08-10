"""
Build evidence RAG indexes from rag_knowledge/*.jsonl files.

Supports two formats:
  JSONL:  {"qid": 1471, "question": "...", "evidence": "..."}
  Knowledge array:  [{"kid": 1, "knowledge": "...", "source_qids": [...]}, ...]

Usage:
  python build_evidence.py                    # build all 11 topics
  python build_evidence.py --topics financial # selective re-index
"""
import json
import argparse
from pathlib import Path

from db.evidence_db import EvidenceDB
from config import STORAGE_DIR
from utils.logger import logger

PROJECT_ROOT = Path(__file__).resolve().parent.parent  # DLR Proj/
DEFAULT_KNOWLEDGE_DIR = PROJECT_ROOT / "rag_knowledge"
EVIDENCE_DIR = STORAGE_DIR / "evidence"


def load_topic(path: Path) -> list:
    """Load one topic file, return list of {id, text} records.

    Supports both JSONL (one JSON per line) and knowledge array (single JSON array).
    """
    raw = path.read_text(encoding="utf-8").strip()
    if not raw:
        return []

    # Try knowledge array format first: [{"kid": ..., "knowledge": ..., "source_qids": [...]}]
    # Only "knowledge" is embedded; "source_qids" is human metadata, NOT indexed
    if raw.startswith("["):
        items = json.loads(raw)
        records = []
        for obj in items:
            text = obj.get("knowledge", "").strip()
            if not text:
                continue
            records.append({
                "qid": obj.get("kid", 0),
                "question": "",
                "text": text,
            })
        return records

    # JSONL format: one JSON object per line
    records = []
    for line in raw.split("\n"):
        line = line.strip()
        if not line:
            continue
        obj = json.loads(line)
        text = obj.get("evidence", "").strip()
        if not text:
            continue
        records.append({
            "qid": obj.get("qid", 0),
            "question": obj.get("question", ""),
            "text": text,
        })
    return records


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--topics", default="",
                        help="Comma-separated topic names (default: all topics in rag_knowledge/)")
    parser.add_argument("--knowledge-dir", default=str(DEFAULT_KNOWLEDGE_DIR),
                        help="Path to rag_knowledge/ directory")
    args = parser.parse_args()

    knowledge_dir = Path(args.knowledge_dir)
    if not knowledge_dir.exists():
        logger.error(f"Knowledge dir not found: {knowledge_dir}")
        return

    if args.topics:
        topics = [t.strip() for t in args.topics.split(",") if t.strip()]
    else:
        topics = sorted(p.stem for p in knowledge_dir.glob("*.jsonl"))

    logger.info(f"Building evidence indexes from {knowledge_dir}: {len(topics)} topics")

    db = EvidenceDB(EVIDENCE_DIR)

    for db_id in topics:
        path = knowledge_dir / f"{db_id}.jsonl"
        if not path.exists():
            logger.warning(f"File not found: {path}, skipping")
            continue
        records = load_topic(path)
        if not records:
            logger.warning(f"No evidence records in {path}, skipping")
            continue
        ok = db.build_index(db_id, records)
        if ok:
            logger.info(f"  OK {db_id}: {len(records)} records indexed")
        else:
            logger.error(f"  FAIL {db_id}: build failed")

    logger.info(f"Done. Indexes stored in {EVIDENCE_DIR}")


if __name__ == "__main__":
    main()
