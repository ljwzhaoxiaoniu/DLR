"""
Evidence RAG Database — per-topic FAISS collections.

Each of the 11 topics gets its own index directory under `storage/evidence/<db_id>/`.
The embedding model is shared with VectorDB (same SentenceTransformer instance).
"""

import os
import numpy as np
import pickle
from pathlib import Path
from typing import List, Dict, Any, Optional

from sentence_transformers import SentenceTransformer
from utils.logger import logger
from config import EMBEDDING_MODEL, VECTOR_DIM

try:
    import faiss
    FAISS_AVAILABLE = True
except ImportError:
    FAISS_AVAILABLE = False


class EvidenceDB:
    """Per-topic evidence vector store — 11 collections, one per db_id."""

    def __init__(self, storage_dir: Path):
        self.storage_dir = Path(storage_dir)
        self.storage_dir.mkdir(parents=True, exist_ok=True)
        self.embedding_model: Optional[SentenceTransformer] = None
        # In-memory: {db_id: {"index": faiss.IndexFlatIP, "metadata": [dict, ...]}}
        self._collections: Dict[str, dict] = {}
        self._init_embedding_model()

    def _init_embedding_model(self):
        logger.info(f"EvidenceDB loading embedding model: {EMBEDDING_MODEL}")
        self.embedding_model = SentenceTransformer(EMBEDDING_MODEL, local_files_only=True)
        logger.info("EvidenceDB embedding model loaded")

    # ------------------------------------------------------------------
    # Vector helpers (same logic as VectorDB)
    # ------------------------------------------------------------------

    def _normalize(self, vector: List[float]) -> np.ndarray:
        vec = np.array(vector, dtype=np.float32)
        norm = np.linalg.norm(vec)
        return vec / norm if norm > 0 else vec

    def encode(self, text: str) -> np.ndarray:
        return self.embedding_model.encode(text)

    # ------------------------------------------------------------------
    # Build / load / save
    # ------------------------------------------------------------------

    def build_index(self, db_id: str, records: List[Dict[str, Any]]) -> bool:
        """Build a FAISS index for one topic from a list of evidence records.

        Each record must have: ``text`` (embedding source), ``qid``, ``question``.
        """
        if not records:
            logger.warning(f"EvidenceDB: no records for {db_id}, skipping")
            return False

        if FAISS_AVAILABLE:
            index = faiss.IndexFlatIP(VECTOR_DIM)
        else:
            index = None

        metadata = []
        vectors = []

        for rec in records:
            text = rec.get("text", "")
            if not text:
                continue
            vec = self.encode(text)
            normalized = self._normalize(vec.tolist())
            vectors.append(normalized)
            metadata.append({
                "qid": rec.get("qid", ""),
                "db_id": db_id,
                "text": text,
                "question": rec.get("question", ""),
            })

        if not vectors:
            logger.warning(f"EvidenceDB: no valid vectors for {db_id}")
            return False

        if FAISS_AVAILABLE:
            stacked = np.stack(vectors).astype(np.float32)
            index.add(stacked)
            self._collections[db_id] = {"index": index, "metadata": metadata, "vectors": None}
        else:
            self._collections[db_id] = {"index": None, "metadata": metadata, "vectors": vectors}

        self._save(db_id)
        logger.info(f"EvidenceDB: built index for {db_id} ({len(metadata)} records)")
        return True

    def _save(self, db_id: str):
        col = self._collections.get(db_id)
        if not col:
            return
        dir_path = self.storage_dir / db_id
        dir_path.mkdir(parents=True, exist_ok=True)
        data = {"metadata": col["metadata"]}
        if FAISS_AVAILABLE and col["index"] is not None:
            data["index"] = col["index"]
        else:
            data["vectors"] = col.get("vectors", [])
        with open(dir_path / "index.pkl", "wb") as f:
            pickle.dump(data, f)

    def load(self, db_id: str) -> bool:
        """Load an existing index for a topic into memory."""
        if db_id in self._collections:
            return True
        data_path = self.storage_dir / db_id / "index.pkl"
        if not data_path.exists():
            return False
        try:
            with open(data_path, "rb") as f:
                data = pickle.load(f)
            metadata = data.get("metadata", [])
            if FAISS_AVAILABLE and "index" in data:
                self._collections[db_id] = {"index": data["index"], "metadata": metadata, "vectors": None}
            else:
                self._collections[db_id] = {"index": None, "metadata": metadata, "vectors": data.get("vectors", [])}
            logger.info(f"EvidenceDB: loaded {db_id} ({len(metadata)} records)")
            return True
        except Exception as e:
            logger.error(f"EvidenceDB: failed to load {db_id}: {e}")
            return False

    def load_all(self) -> int:
        """Load all existing topic indexes. Returns count loaded."""
        count = 0
        if not self.storage_dir.exists():
            return 0
        for d in self.storage_dir.iterdir():
            if d.is_dir() and (d / "index.pkl").exists():
                if self.load(d.name):
                    count += 1
        return count

    def list_topics(self) -> List[str]:
        """List all topic db_ids that have been built or loaded."""
        topics = set(self._collections.keys())
        if self.storage_dir.exists():
            for d in self.storage_dir.iterdir():
                if d.is_dir() and (d / "index.pkl").exists():
                    topics.add(d.name)
        return sorted(topics)

    def clear(self, db_id: str) -> bool:
        """Clear one topic from memory and disk."""
        import shutil
        self._collections.pop(db_id, None)
        dir_path = self.storage_dir / db_id
        if dir_path.exists():
            shutil.rmtree(dir_path)
            logger.info(f"EvidenceDB: cleared {db_id}")
            return True
        return False

    def clear_all(self) -> int:
        """Clear all topics from memory and disk. Returns count cleared."""
        import shutil
        count = 0
        for db_id in list(self._collections.keys()):
            self._collections.pop(db_id, None)
            count += 1
        if self.storage_dir.exists():
            for d in self.storage_dir.iterdir():
                if d.is_dir():
                    shutil.rmtree(d)
                    count += 1
        logger.info(f"EvidenceDB: cleared all ({count} topics)")
        return count

    # ------------------------------------------------------------------
    # Search
    # ------------------------------------------------------------------

    def search(self, query: str, namespace: str, top_k: int = 3) -> List[Dict[str, Any]]:
        """Search evidence within a namespace (db_id).

        Returns list of {qid, db_id, text, question, score}.
        """
        # Ensure loaded
        if namespace not in self._collections:
            if not self.load(namespace):
                logger.warning(f"EvidenceDB: namespace '{namespace}' not found")
                return []

        col = self._collections[namespace]
        metadata = col["metadata"]
        if not metadata:
            return []

        query_vec = self.encode(query)
        normalized = self._normalize(query_vec.tolist())

        if FAISS_AVAILABLE and col["index"] is not None:
            n = len(metadata)
            k = min(top_k, n)
            scores, indices = col["index"].search(normalized.reshape(1, -1), k)
            results = []
            for i, idx in enumerate(indices[0]):
                if idx < 0 or idx >= len(metadata):
                    continue
                meta = metadata[idx]
                results.append({**meta, "score": round(float(scores[0][i]), 4)})
        else:
            vectors = col.get("vectors", [])
            similarities = [float(np.dot(normalized, v)) for v in vectors]
            order = np.argsort(similarities)[::-1][:top_k]
            results = [dict(metadata[i], score=round(float(similarities[i]), 4)) for i in order]

        logger.info(f"EvidenceDB search '{namespace}': '{query[:60]}...' → {len(results)} results")
        return results
