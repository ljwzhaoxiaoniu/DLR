"""
Global configuration — environment variables + path resolution.

Priority:
  1. Environment variables (KUZU_DIR, VECTOR_DIR, SQLITE_DB_DIR, SCENARIOS_DIR)
     — injected by OpenCode via opencode.json, or set manually for CLI use.
  2. Default paths relative to this file's directory.

Auto-creates all storage directories on import (mkdir -p semantics).
"""
import os
from pathlib import Path

# ---------------------------------------------------------------------------
# Base directory
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).parent.absolute()

# ---------------------------------------------------------------------------
# Storage paths — env vars take priority, then defaults
# ---------------------------------------------------------------------------
STORAGE_DIR = BASE_DIR / "storage"
SQLITE_DIR = Path(os.environ.get("SQLITE_DB_DIR", str(STORAGE_DIR / "sqlite_dbs")))
KUZU_DB_PATH = Path(os.environ.get("KUZU_DIR", str(STORAGE_DIR / "kuzu_db")))
VECTOR_DB_PATH = Path(os.environ.get("VECTOR_DIR", str(STORAGE_DIR / "vector_db")))

# ---------------------------------------------------------------------------
# Config / scenario paths
# ---------------------------------------------------------------------------
CONFIG_DIR = BASE_DIR / "configs"
SCENARIOS_DIR = Path(
    os.environ.get("SCENARIOS_DIR", str(CONFIG_DIR / "scenarios"))
)

# ---------------------------------------------------------------------------
# Model / query config
# ---------------------------------------------------------------------------
EMBEDDING_MODEL = "BAAI/bge-small-zh-v1.5"
VECTOR_DIM = 512  # BAAI/bge-small-zh-v1.5 output dimension
TOP_K = 5
CONFIDENCE_THRESHOLD = 0.415

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
LOG_LEVEL = "INFO"
LOG_DIR = BASE_DIR / "log"               # Semantic Core Service/log/
LOG_DIR.mkdir(parents=True, exist_ok=True)

# 每次启动按时间戳生成新日志文件，下次启动不会复写
import time as _time
_LOG_TIMESTAMP = _time.strftime("%Y-%m-%d_%H-%M-%S")
LOG_FILE = LOG_DIR / f"app.{_LOG_TIMESTAMP}.log"


def paradigm_log_file(paradigm: str, port: int) -> Path:
    """Return a per-paradigm log file path: log/rdf_28785_2026-07-14_16-30-00.log"""
    return LOG_DIR / f"{paradigm}_{port}_{_LOG_TIMESTAMP}.log"

# ---------------------------------------------------------------------------
# Auto-create directories (safe to call at import time)
# ---------------------------------------------------------------------------
for _dir in [STORAGE_DIR, SQLITE_DIR, KUZU_DB_PATH.parent, VECTOR_DB_PATH.parent,
             CONFIG_DIR, SCENARIOS_DIR]:
    if not _dir.exists():
        _dir.mkdir(parents=True, exist_ok=True)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def extract_entity_id(attr_id: str) -> str:
    """Extract entity ID from attribute ID (format: 'db.table.column' -> 'db.table')."""
    if '.' not in attr_id:
        return attr_id
    parts = attr_id.split('.')
    if len(parts) >= 3:
        return f"{parts[0]}.{parts[1]}"
    return attr_id


def paradigm_storage(mapping_type: str) -> dict:
    """Return shared Kuzu + Vector paths for a paradigm.

    All presets under the same paradigm (ER / DLR / ...) share ONE Kuzu
    directory and ONE vector file — so a single ``serve`` can answer
    questions across all databases in that paradigm.

    Returns:
        {"graph": Path (dir), "vector": Path (concrete .pkl file)}
    """
    paradigm_dir = STORAGE_DIR / mapping_type
    graph_path = paradigm_dir / "graph"
    vector_path = paradigm_dir / "vector" / "vector.pkl"

    graph_path.mkdir(parents=True, exist_ok=True)
    vector_path.parent.mkdir(parents=True, exist_ok=True)

    return {
        "graph": graph_path,
        "vector": vector_path,
    }
