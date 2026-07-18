"""
MCP Server — dual-mode (stdio + SSE) + paradigm-isolated tools.

Paradigm isolation:
  - All tools: registered DYNAMICALLY per paradigm (no @mcp.tool() decorators)
  - DLR tools: registered DYNAMICALLY at runtime when _mapping_type == "dlr"
  - ER mode: DLR tools are removed from the registry after import

Usage:
  # OpenCode spawn mode (stdio):
  python mcp_server.py --mapping-type er --transport stdio

  # Serve mode (from main.py):
  main.py serve --paradigm ER   → imports mcp_server → mounts MCP SSE
                                   → _ensure_services() triggers tool isolation
"""
import json
import math
import os
import sqlite3
from pathlib import Path
from typing import Optional

from fastmcp import FastMCP

from utils.logger import logger
from config import SCENARIOS_DIR, SQLITE_DIR

# ---------------------------------------------------------------------------
# Lazy-loaded singletons
# ---------------------------------------------------------------------------
_graph_db = None
_vector_db = None
_query_service = None
_mapping_type = "er"
_config_data = {}
_tools_finalized = False


# ---------------------------------------------------------------------------
# FastMCP instance
# ---------------------------------------------------------------------------
mcp = FastMCP("Semantic Core Service")


def _ensure_services():
    """Lazy-load and return (graph_db, vector_db, query_service).

    Also triggers paradigm-specific tool registration.
    """
    global _graph_db, _vector_db, _query_service

    if _graph_db is not None:
        _ensure_paradigm_tools()
        return _graph_db, _vector_db, _query_service

    from db.graph_db import GraphDB
    from db.vector_db import VectorDB
    from service.query_service import QueryService
    from config import paradigm_storage

    _storage = paradigm_storage(_mapping_type)

    _graph_db = GraphDB(db_path=str(_storage["graph"]), mapping_type=_mapping_type)
    _vector_db = VectorDB(db_path=str(_storage["vector"]))
    _query_service = QueryService(
        mapping_type=_mapping_type,
        graph_db=_graph_db,
        vector_db=_vector_db,
    )

    # Load config for database URL resolution
    config_name = os.environ.get("SCS_CONFIG", "")
    if config_name:
        # Single config mode (legacy / CLI direct)
        config_path = SCENARIOS_DIR / config_name
        if config_path.exists():
            from mapping.config_loader import ConfigLoader
            _config_data.update(ConfigLoader.load_config(config_path) or {})
            logger.info(f"Loaded config: {config_name} ({len(_config_data.get('databases', {}))} databases)")
    else:
        # Paradigm mode (via main.py serve): load all YAML configs in paradigm dir
        paradigm_dir = SCENARIOS_DIR / _mapping_type
        if paradigm_dir.exists():
            from mapping.config_loader import ConfigLoader
            yaml_files = sorted(paradigm_dir.glob("*.yaml")) + sorted(paradigm_dir.glob("*.yml"))
            for yf in yaml_files:
                cfg = ConfigLoader.load_config(yf)
                if cfg and "databases" in cfg:
                    _config_data.update(cfg["databases"])
            logger.info(f"Loaded {len(_config_data)} database configs from {paradigm_dir}")

    logger.info(f"MCP services initialized (type={_mapping_type})")

    # Register paradigm-specific tools now that _mapping_type is known
    _ensure_paradigm_tools()

    return _graph_db, _vector_db, _query_service


def _ensure_paradigm_tools():
    """范式工具注册 —— 各注册各的,零剥除.

    由于 @mcp.tool() 装饰器已全部去除,模块加载时不会注册任何工具.
    各范式通过自己的 _register_*_tools() 函数,只注册本范式的工具.
    Idempotent — safe to call multiple times.
    """
    global _tools_finalized

    if _tools_finalized:
        return

    _tools_finalized = True

    _register_shared_tools()        # execute_sql (所有范式共用)
    if _mapping_type == "dlr":
        _register_dlr_tools()       # DLR CLI 工具(LE/PE/PAS)
    elif _mapping_type == "rdf":
        _register_rdf_tools()       # RDF 工具(语义召回 + SPARQL)
    else:  # ER
        _register_er_tools()        # ER 工具(REST 语义查询入口)

    logger.info(f"[MCP] Tools finalized for {_mapping_type.upper()} mode")


def _get_tool_names() -> set:
    """Return set of currently registered tool names (via local_provider).

    FastMCP stores tools in provider._components dict keyed by "tool:<name>@".
    Fall back to list_tools() if _components is unavailable.
    """
    provider = getattr(mcp, 'local_provider', None)
    if provider is None:
        return set()
    # Primary: provider._components (FastMCP internal)
    components = getattr(provider, '_components', None)
    if components and isinstance(components, dict):
        names = set()
        for key in components:
            if key.startswith('tool:') and key.endswith('@'):
                names.add(key[5:-1])  # strip "tool:" prefix and "@" suffix
        return names
    # Fallback: provider._tools / provider.tools (older FastMCP)
    if hasattr(provider, '_tools'):
        return set(t.name for t in provider._tools.values())
    if hasattr(provider, 'tools'):
        return set(t.name for t in provider.tools.values())
    return set()



# ===================================================================
# Shared + ER tools (registered at module import)
# ===================================================================

def er_semantic_query(question: str, top_k: int = 20, db: str = "") -> dict:
    """[ER] 语义召回 → 返回实体(扁平结构,无物理表/字段).

    db: 可选,数据库名过滤. 首次调用留空做全局召回,用于判断问题属于哪个数据库;
    从返回的 entities[].db 确定目标库后,后续调用必须传入该 db 锁定范围,避免召回漂移到其他库.

    返回: {success, confidence, data:{entities:[{entity_id, name, description, db}]}}
    description 仅业务描述,不带属性字段名.
    """
    _, _, qs = _ensure_services()
    raw = qs.query(question, top_k, db=db or None)
    # 剥离物理信息(source_table/database_url/attributes/relations),仅保留业务语义
    clean_entities = []
    for e in raw.get("data", {}).get("entities", []):
        clean_entities.append({
            "entity_id": e.get("entity_id", ""),
            "name": e.get("name", ""),
            "description": e.get("description", ""),
            "db": e.get("db", ""),
        })
    return {
        "success": raw.get("success", True),
        "confidence": raw.get("confidence", 0.0),
        "data": {"entities": clean_entities},
    }


def list_entities() -> list:
    """[ER] List all entities (BizEntity in ER / PhysicalEntity in DLR)."""
    gdb, _, _ = _ensure_services()
    return gdb.get_all_entities()


def list_relations() -> list:
    """[ER] List all entity relations."""
    gdb, _, _ = _ensure_services()
    return gdb.get_all_relations()


def get_entity(entity_id: str) -> dict:
    """[ER] Get single entity details."""
    gdb, _, _ = _ensure_services()
    entity = gdb.get_entity_by_id(entity_id)
    if not entity:
        return {"success": False, "message": f"实体不存在: {entity_id}"}
    return {"success": True, "entity": entity}


def get_entity_attributes(entity_id: str) -> list:
    """[ER] Get all attributes of an entity (with physical column mapping)."""
    gdb, _, _ = _ensure_services()
    return gdb.get_entity_attributes_list(entity_id)


def get_entity_relations(entity_id: str) -> list:
    """[ER] Get all relations of an entity (out + in edges)."""
    gdb, _, _ = _ensure_services()
    return gdb.get_entity_relations(entity_id)


def get_entity_mapping(entity_id: str) -> dict:
    """[ER] Get physical mapping: database_url + physical_table + column mapping.

    Returns: {success, entity_id, physical_table, database_url, attributes}
    """
    gdb, _, _ = _ensure_services()
    entity = gdb.get_entity_by_id(entity_id)
    if not entity:
        return {"success": False, "message": f"实体不存在: {entity_id}"}

    attributes = gdb.get_entity_attributes_with_physical(entity_id)
    source_table = entity.get("source_table", "")
    # Read database_url directly from Kuzu node (set during build)
    database_url = entity.get("database_url", "")

    return {
        "success": True,
        "entity_id": entity_id,
        "physical_table": source_table,
        "database_url": database_url,
        "attributes": attributes,
    }


def find_shortest_path(from_entity_id: str, to_entity_id: str) -> dict:
    """[ER] Shortest path between two entities."""
    gdb, _, _ = _ensure_services()
    # Use DLR LE path if in DLR mode, otherwise ER path
    if _mapping_type == "dlr":
        return gdb.find_le_shortest_path(from_entity_id, to_entity_id)
    return gdb.find_shortest_path(from_entity_id, to_entity_id)


def list_all_tables(db: str = "") -> list:
    """[ER] List registered entity tables. Use db='debit_card_specializing' to filter."""
    gdb, _, _ = _ensure_services()
    entities = gdb.get_all_entities()
    seen = set()
    tables = []
    for e in entities:
        tid = e.get("source_table", "")
        if tid and tid not in seen:
            parts = tid.split(".", 1)
            db_name = parts[0] if len(parts) == 2 else ""
            # 支持 db 过滤
            if db and db_name != db:
                continue
            seen.add(tid)
            tables.append({
                "table_id": tid,
                "table_name": parts[1] if len(parts) == 2 else tid,
                "db_name": db_name,
            })
    return tables


def get_table_schema(table_id: str) -> list:
    """[ER] Get schema of any physical table."""
    from mapping.physical_scanner import PhysicalScanner
    parts = table_id.split(".")
    if len(parts) != 2:
        return {"success": False, "message": "table_id 格式应为 数据库名.表名"}
    scanner = PhysicalScanner(SQLITE_DIR)
    tables = scanner.scan_all()
    for t in tables:
        if t.table_id == table_id:
            return [
                {
                    "column_name": c.column_name,
                    "data_type": c.data_type,
                    "is_primary_key": c.is_primary_key,
                    "column_id": c.column_id,
                }
                for c in t.columns
            ]
    return {"success": False, "message": f"table not found: {table_id}"}


def summary() -> dict:
    """[ER] Get knowledge base summary stats."""
    gdb, _, _ = _ensure_services()
    result = {"success": True, "mapping_type": _mapping_type}
    if _mapping_type == "dlr":
        result["logical_entity_count"] = len(gdb.get_all_logical_entities())
    result["physical_entity_count"] = len(gdb.get_all_entities())
    if _mapping_type == "dlr":
        result["pas_relation_count"] = len(gdb.get_all_pas_relations())
    return result


# ===================================================================
# Shared SQL execution service (all paradigms)
# ===================================================================

def _execute_sql(sql: str, database_url: str) -> dict:
    """薄透传服务: Agent 提供 SQL + database_url, 服务端执行并返回结果.

    Agent 必须先通过 MCP 映射工具拿到 database_url, 再调用本工具.
    SELECT * 必须带 LIMIT;结果超 200 行截断(truncated=true).
    """
    import re
    import sqlite3
    MAX_ROWS = 200  # 防全表 dump 撑爆 Agent 上下文
    if not sql or not database_url:
        return {"success": False, "error": "sql and database_url are required"}
    _sql = sql.strip().rstrip(";")
    if re.match(r"^\s*SELECT\s+(DISTINCT\s+)?(\w+\.)?\*", _sql, re.IGNORECASE) and \
            not re.search(r"\bLIMIT\b", _sql, re.IGNORECASE):
        return {
            "success": False,
            "error": "SELECT * without LIMIT is not allowed. "
                     "Add LIMIT (e.g. LIMIT 5) or select specific columns.",
        }
    try:
        con = sqlite3.connect(database_url, timeout=30)
        cur = con.execute(_sql)
        cols = [d[0] for d in cur.description] if cur.description else []
        rows = [list(r) for r in cur.fetchmany(MAX_ROWS + 1)]
        con.close()
        if len(rows) > MAX_ROWS:
            return {
                "success": True, "columns": cols, "rows": rows[:MAX_ROWS],
                "truncated": True, "returned_rows": MAX_ROWS,
                "hint": f"Result truncated at {MAX_ROWS} rows. Narrow the query (WHERE/GROUP BY/LIMIT).",
            }
        return {"success": True, "columns": cols, "rows": rows}
    except Exception as e:
        return {"success": False, "error": str(e)}


# ===================================================================
# RDF tool — registered dynamically when _mapping_type == "rdf"
# ===================================================================

def _find_db_for_table(table_name: str) -> str:
    """根据表名扫描 MINIDEV 目录,返回对应 SQLite 数据库的绝对路径."""
    import sqlite3
    # 查找 MINIDEV 数据库目录
    candidates = [
        Path(__file__).resolve().parent.parent / "MINIDEV_sqlite" / "dev_databases",
        Path(__file__).resolve().parent.parent.parent / "MINIDEV_sqlite" / "dev_databases",
    ]
    db_dir = None
    for c in candidates:
        if c.exists():
            db_dir = c
            break
    if not db_dir:
        return ""

    # 遍历每个子目录,查 sqlite 文件
    for db_path in sorted(db_dir.glob("*/*.sqlite")) + sorted(db_dir.glob("*/*.db")):
        try:
            con = sqlite3.connect(str(db_path), timeout=5)
            cur = con.execute("SELECT name FROM sqlite_master WHERE type='table' AND name=?", (table_name,))
            if cur.fetchone():
                con.close()
                return str(db_path.resolve())
            con.close()
        except Exception:
            continue
    return ""


def _query_rdf_mapping(class_uri: str) -> dict:
    """[RDF] 第二跳封装:从 class IRI 解析物理映射(table + columns + relations + database_url).

    SPARQL 服务内部完成 class → table 解析,LLM 全程不见物理表名。
    参数 class_uri 来自 rdf_semantic_query 返回的 data.classes[].class_uri。

    Returns:
        {success, class_uri, table, columns, relations, database_url}
    """
    from rdf_store.rdf_service import get_rdf_store
    st = get_rdf_store()
    st.load()
    result = st.mapping_for_class(class_uri)

    # 统一 join_condition 格式 + 补 database_url
    if result.get("success"):
        table = result.get("table", "")
        # 补 database_url (与 ER/DLR 对齐)
        if not result.get("database_url"):
            result["database_url"] = _find_db_for_table(table)
        for rel in result.get("relations", []):
            src_table = table
            jc = rel.get("join_condition", "=")
            if src_table and not jc.startswith(src_table):
                parts = jc.split("=")
                if len(parts) == 2:
                    child = parts[0].strip()
                    rel["join_condition"] = f"{src_table}.{child} = {parts[1].strip()}"
            # 关联表也补 database_url
            tgt = rel.get("target_table", "")
            if tgt and not rel.get("target_database_url"):
                rel["target_database_url"] = _find_db_for_table(tgt)

    return result


def rdf_semantic_query(question: str, top_k: int = 20, db: str = "") -> dict:
    """[RDF] 语义召回 → 返回类(URI 本体结构,无 R2RML 映射/字段).

    db: 可选,数据库名过滤. 首次调用留空做全局召回,用于判断问题属于哪个数据库;
    从返回的 classes[].db 确定目标库后,后续调用必须传入该 db 锁定范围,避免召回漂移到其他库.

    返回: {success, confidence, data:{classes:[{class_uri, name, description, db}]}}
    class_uri 仅为 IRI 标识,不带 physical_table / predicateObjectMap.
    """
    from db.vector_db import VectorDB
    from db.graph_db import GraphDB
    from config import paradigm_storage

    storage = paradigm_storage("rdf")
    vector_db = VectorDB(db_path=str(storage["vector"]))
    graph_db = GraphDB(db_path=str(storage["graph"]), mapping_type="rdf")

    search_results = vector_db.search(question, top_k=top_k * 3, db=db or None)
    if not search_results:
        return {"success": False, "message": "未找到相关内容", "data": {}, "confidence": 0.0}

    entity_results = [r for r in search_results if r["type"] == "entity"]
    seen = set()
    classes = []
    for res in entity_results[:top_k]:
        eid = res["id"]
        if eid in seen:
            continue
        seen.add(eid)
        entity = graph_db.get_entity_by_id(eid)
        if entity:
            # 仅保留 class_uri + 业务描述 + db 归属,剥离 source_table/database_url/attributes/relations
            classes.append({
                "class_uri": entity.get("entity_id", eid),
                "name": entity.get("name", ""),
                "description": entity.get("description", ""),
                "db": res.get("db", ""),
            })

    max_score = max((r.get("score", 0.0) for r in search_results), default=0.0)
    return {
        "success": True,
        "confidence": round(max_score, 4),
        "data": {"classes": classes},
    }


# ── 新增:RDF 专属工具(仿 ER semantic_query + 对标 DLR 接口隔离) ──────────

def _rdf_classes() -> dict:
    """[RDF] List all rr:class URIs in R2RML graph."""
    from rdf_store.rdf_service import get_rdf_store
    st = get_rdf_store()
    st.load()
    return {"success": True, "classes": st.classes()}


def _rdf_predicates() -> dict:
    """[RDF] List all predicate URIs in R2RML graph."""
    from rdf_store.rdf_service import get_rdf_store
    st = get_rdf_store()
    st.load()
    return {"success": True, "predicates": st.predicates()}


def _rdf_search(q: str, limit: int = 20) -> dict:
    """[RDF] Text search triples by substring."""
    from rdf_store.rdf_service import get_rdf_store
    st = get_rdf_store()
    st.load()
    results = st.search(q, limit)
    return {"success": True, "results": results}


def _rdf_triples_for_class(class_uri: str) -> dict:
    """[RDF] Get all triples for a given rr:class URI."""
    from rdf_store.rdf_service import get_rdf_store
    st = get_rdf_store()
    st.load()
    triples = st.triples_for_class(class_uri)
    return {"success": True, "class_uri": class_uri, "triples": triples}


def _rdf_serialize(format: str = "turtle") -> dict:
    """[RDF] Serialize R2RML graph (turtle/json-ld/xml/n3/nt)."""
    from rdf_store.rdf_service import get_rdf_store
    st = get_rdf_store()
    st.load()
    data = st.serialize(format)
    return {"success": True, "format": format, "data": data}


def _rdf_sparql(query: str) -> dict:
    """[RDF] Execute SPARQL (SELECT/ASK/CONSTRUCT/DESCRIBE) — W3C standard for R2RML mapping."""
    from rdf_store.rdf_service import get_rdf_store
    st = get_rdf_store()
    st.load()
    result = st.sparql(query)
    return result


# ===================================================================
# DLR tools — registered dynamically when _mapping_type == "dlr"
# ===================================================================

# Plain function definitions (no decorator) — registered in _register_dlr_tools()
def dlr_semantic_query(question: str, top_k: int = 3, threshold: float = 0.5, db: str = "") -> dict:
    """[DLR] 语义召回 → 返回结构体(LE-PE 复合,无物理表/字段).

    db: 可选,数据库名过滤. 首次调用留空做全局召回,用于判断问题属于哪个数据库;
    从返回的 structures[].db 确定目标库后,后续召回类调用必须传入该 db,避免跨库串扰.

    返回: {success, data:{structures:[{logical_entity_id, name, description, db, physical_entities:[{physical_entity_id, pe_name, db}]}]}}
    不含 physical_table_id / database_url / 属性字段.
    """
    gdb, vector_db, _ = _ensure_services()
    results = vector_db.search(question, top_k=max(top_k * 3, 20), db=db or None)
    le_results = [r for r in results if r["type"] == "logical_entity"]
    le_results.sort(key=lambda x: x.get("score", 0), reverse=True)
    le_results = [r for r in le_results if r.get("score", 0) >= threshold][:top_k]

    structures = []
    for r in le_results:
        le_id = r["id"]
        # 获取该 LE 下挂的 PE 列表(仅 id + name + db 归属,无物理表名)
        child_pe_ids = gdb.get_child_entity_ids(le_id)
        pes = []
        for pe_id in child_pe_ids:
            pe = gdb.get_physical_entity_by_id(pe_id)
            if pe:
                pes.append({
                    "physical_entity_id": pe_id,
                    "pe_name": pe.get("name", ""),
                    "db": (pe.get("physical_table_id") or "").split(".", 1)[0],
                })
        structures.append({
            "logical_entity_id": le_id,
            "name": r["name"],
            "description": r.get("description", ""),
            "db": r.get("db", ""),
            "physical_entities": pes,
        })

    max_score = max((r.get("score", 0.0) for r in le_results), default=0.0)
    return {
        "success": True,
        "confidence": round(max_score, 4),
        "data": {"structures": structures},
    }


def _recall_pe(question: str, top_k: int = 3, threshold: float = 0.5, db: str = "") -> dict:
    """[DLR] Recall physical entities (PE) by natural language.

    db: 可选,数据库名过滤;锁定目标库后必须传入,防止召回漂移到其他库.
    """
    _, vector_db, _ = _ensure_services()
    results = vector_db.search(question, top_k=max(top_k * 3, 20), db=db or None)
    pe_results = [r for r in results if r["type"] == "entity"]
    pe_results.sort(key=lambda x: x.get("score", 0), reverse=True)
    pe_results = [r for r in pe_results if r.get("score", 0) >= threshold][:top_k]
    return {
        "success": True,
        "results": [
            {
                "physical_entity_id": r["id"],
                "name": r["name"],
                "source_table": r.get("description", ""),
                "db": r.get("db", ""),
                "confidence": round(r.get("score", 0), 4),
            }
            for r in pe_results
        ],
    }


def _recall_pas(question: str, top_k: int = 3, threshold: float = 0.5, db: str = "") -> dict:
    """[DLR] Recall PAS semantic routing relations by natural language.

    db: 可选,数据库名过滤;锁定目标库后必须传入,防止召回漂移到其他库.
    """
    _, vector_db, _ = _ensure_services()
    results = vector_db.search(question, top_k=max(top_k * 3, 20), db=db or None)
    pas_results = [r for r in results if r["type"] == "pas_relation"]
    pas_results.sort(key=lambda x: x.get("score", 0), reverse=True)
    pas_results = [r for r in pas_results if r.get("score", 0) >= threshold][:top_k]
    return {
        "success": True,
        "results": [
            {
                "relation_id": r["id"],
                "relation_name": r["name"],
                "from_le_id": r.get("from_le_id", ""),
                "to_le_id": r.get("to_le_id", ""),
                "db": r.get("db", ""),
                "confidence": round(r.get("score", 0), 4),
            }
            for r in pas_results
        ],
    }


def _list_le(keyword: str = "") -> dict:
    """[DLR] List logical entities (LE). Use keyword='Customer' to filter by name."""
    gdb, _, _ = _ensure_services()
    results = gdb.get_all_logical_entities()
    if keyword:
        kw = keyword.lower()
        results = [r for r in results if kw in r.get("name", "").lower() or kw in r.get("description", "").lower()]
    return {"success": True, "count": len(results), "results": results}


def _list_pas() -> dict:
    """[DLR] List all PAS semantic routing relations."""
    gdb, _, _ = _ensure_services()
    results = gdb.get_all_pas_relations()
    return {"success": True, "count": len(results), "results": results}


def _get_le(le_id: str) -> dict:
    """[DLR] Get logical entity details."""
    gdb, _, _ = _ensure_services()
    le = gdb.get_logical_entity_by_id(le_id)
    if not le:
        return {"success": False, "message": f"逻辑实体不存在: {le_id}"}
    return {"success": True, **le}


def _get_le_attrs(le_id: str) -> dict:
    """[DLR] Get all attributes of a logical entity."""
    gdb, _, _ = _ensure_services()
    return {"success": True, "logical_entity_id": le_id,
            "attributes": gdb.get_logical_entity_attributes(le_id)}


def _get_le_children(le_id: str) -> dict:
    """[DLR] List child physical entities (PE) of a logical entity."""
    gdb, _, _ = _ensure_services()
    child_ids = gdb.get_child_entity_ids(le_id)
    children = []
    for pe_id in child_ids:
        # DLR 的 PE 在 PhysicalEntity 表(非 ER 的 BizEntity)
        entity = gdb.get_physical_entity_by_id(pe_id)
        if entity:
            children.append({
                "physical_entity_id": pe_id,
                "name": entity.get("name", ""),
                "source_table": entity.get("physical_table_id", ""),
            })
    return {"success": True, "logical_entity_id": le_id, "children": children}


def _resolve_database_url(physical_table_id: str = "") -> str:
    """Resolve SQLite database file path from config.

    Returns the absolute path to the .sqlite/.db file (without sqlite:/// prefix)
    so it can be passed directly to sqlite3 CLI.
    """
    # 兼容两种格式: 单文件模式 nested {"databases": {...}} / 范式模式 flat {prefix: url}
    databases = _config_data.get("databases", _config_data)

    def _resolve_url(url: str) -> str:
        """Convert a sqlite:/// URL to an absolute file path."""
        if url.startswith("sqlite:///"):
            rel = url[len("sqlite:///"):]
            # Try resolving relative to the Semantic Core Service directory
            base_dir = Path(__file__).parent  # Semantic Core Service/
            candidate = (base_dir / rel).resolve()
            if candidate.exists():
                return str(candidate)
            # Try resolving relative to project root (one level up)
            project_root = base_dir.parent  # DLR Proj/
            candidate2 = (project_root / rel).resolve()
            if candidate2.exists():
                return str(candidate2)
            # Fallback: return the base_dir resolution even if not exists
            return str(candidate)
        return url

    # Match by prefix (e.g. "financial" from "financial.account")
    if "." in physical_table_id:
        prefix = physical_table_id.split(".")[0]
        if prefix in databases:
            return _resolve_url(databases[prefix])

    # Fallback: first database
    for url in databases.values():
        if url.startswith("sqlite:///"):
            return _resolve_url(url)
    return ""


# get_pe_arcs 已合并入 get_pe_full,不再单独注册


def _path_le_le(from_id: str, to_id: str) -> dict:
    """[DLR] Shortest PAS path between two logical entities (LE)."""
    gdb, _, _ = _ensure_services()
    return gdb.find_le_shortest_path(from_id, to_id)


# ── 新增:list_pe / LE 导航 / PE 详情 / PAS / 判断 / schema ──────────────

def _list_pe() -> dict:
    """[DLR] List all physical entities (PE)."""
    gdb, _, _ = _ensure_services()
    results = gdb.get_all_entities()
    return {"success": True, "count": len(results), "results": results}


def _get_le_pas(le_id: str) -> dict:
    """[DLR] Get all PAS relations involving a given LE."""
    gdb, _, _ = _ensure_services()
    le = gdb.get_logical_entity_by_id(le_id)
    if not le:
        return {"success": False, "message": f"逻辑实体不存在: {le_id}"}
    pas_relations = gdb.get_pas_relations_for_le(le_id)
    return {"success": True, "logical_entity_id": le_id, "pas_relations": pas_relations}


# get_pe / get_pe_attrs 已合并入 get_pe_full,不再单独注册


def _get_pe_full(pe_id: str) -> dict:
    """[DLR] Get PE details + attributes + ARCS + database_url — all in one call.

    Recommended over calling get_pe/get_pe_attrs/get_pe_arcs separately.
    Returns: {success, entity, attributes, arcs, database_url}
    """
    gdb, _, _ = _ensure_services()
    entity = gdb.get_physical_entity_by_id(pe_id)
    if not entity:
        return {"success": False, "message": f"物理实体不存在: {pe_id}"}
    attributes = gdb.get_physical_entity_attributes(pe_id)
    arcs = entity.get("arcs", {})
    database_url = _resolve_database_url(entity.get("physical_table_id", ""))
    return {"success": True, "physical_entity_id": pe_id,
            "entity": entity, "attributes": attributes,
            "arcs": arcs, "database_url": database_url}


def _get_pe_parent(pe_id: str) -> dict:
    """[DLR] Get parent logical entity (LE) + ARCS details for a PE."""
    gdb, _, qs = _ensure_services()
    entity = gdb.get_physical_entity_by_id(pe_id)
    if not entity:
        return {"success": False, "message": f"物理实体不存在: {pe_id}"}
    parent_le_id = qs._get_parent_logical_entity(pe_id)
    parent_le = gdb.get_logical_entity_by_id(parent_le_id) if parent_le_id else None
    return {
        "success": True,
        "physical_entity_id": pe_id,
        "parent_le_id": parent_le_id,
        "parent_le_name": parent_le.get("name", "") if parent_le else "",
        "arcs": entity.get("arcs", {}),
    }


def _get_pas(relation_id: str) -> dict:
    """[DLR] Get details of a PAS relation by id."""
    gdb, _, _ = _ensure_services()
    all_pas = gdb.get_all_pas_relations()
    for pas in all_pas:
        if pas.get("relation_id") == relation_id:
            return {"success": True, "pas_relation": pas}
    return {"success": False, "message": f"PAS 关系不存在: {relation_id}"}


def _get_pas_by_le(le_id: str) -> dict:
    """[DLR] Get all PAS relations for a given LE."""
    gdb, _, _ = _ensure_services()
    le = gdb.get_logical_entity_by_id(le_id)
    if not le:
        return {"success": False, "message": f"逻辑实体不存在: {le_id}"}
    pas_relations = gdb.get_pas_relations_for_le(le_id)
    return {"success": True, "logical_entity_id": le_id, "pas_relations": pas_relations}


def _path_pe_pe(pe_id1: str, pe_id2: str) -> dict:
    """[DLR] Shortest path between two PEs (across LE via PAS + ARCS)."""
    gdb, _, qs = _ensure_services()
    parent1 = qs._get_parent_logical_entity(pe_id1)
    parent2 = qs._get_parent_logical_entity(pe_id2)
    if not parent1 or not parent2:
        return {"success": False, "message": "至少一个 PE 不存在或无父 LE"}
    if parent1 == parent2:
        return {"success": False, "message": "两个 PE 属于同一 LE,请使用 get_pe_full"}

    le_path = gdb.find_le_shortest_path(parent1, parent2)
    if not le_path.get("success"):
        return le_path

    entity1 = gdb.get_physical_entity_by_id(pe_id1)
    entity2 = gdb.get_physical_entity_by_id(pe_id2)
    le_rels = le_path.get("relations", [])
    path_steps = []
    for i, rel in enumerate(le_rels):
        step = {"pas": rel}
        if i == 0 and entity1:
            step["from_arcs"] = {"physical_entity_id": pe_id1, "arcs": entity1.get("arcs", {})}
        if i == len(le_rels) - 1 and entity2:
            step["to_arcs"] = {"physical_entity_id": pe_id2, "arcs": entity2.get("arcs", {})}
        path_steps.append(step)

    return {
        "success": True,
        "from_pe_id": pe_id1,
        "to_pe_id": pe_id2,
        "from_le_id": parent1,
        "to_le_id": parent2,
        "path_length": le_path.get("path_length", 0),
        "path": path_steps,
    }


def _is_le(id: str) -> dict:
    """[DLR] Check if id is a logical entity (LE)."""
    gdb, _, _ = _ensure_services()
    le = gdb.get_logical_entity_by_id(id)
    return {"success": True, "is_le": le is not None, "id": id}


def _is_pe(id: str) -> dict:
    """[DLR] Check if id is a physical entity (PE)."""
    gdb, _, _ = _ensure_services()
    entity = gdb.get_physical_entity_by_id(id)
    return {"success": True, "is_pe": entity is not None, "id": id}


def _is_arcs(pe_id: str, le_id: str) -> dict:
    """[DLR] Check if PE belongs to LE via ARCS."""
    _, _, qs = _ensure_services()
    parent_le = qs._get_parent_logical_entity(pe_id)
    return {"success": True, "is_arcs": parent_le == le_id, "pe_id": pe_id, "le_id": le_id}


def _is_same_le(pe_id1: str, pe_id2: str) -> dict:
    """[DLR] Check if two PEs share the same parent LE."""
    _, _, qs = _ensure_services()
    parent1 = qs._get_parent_logical_entity(pe_id1)
    parent2 = qs._get_parent_logical_entity(pe_id2)
    return {
        "success": True,
        "is_same_le": (parent1 == parent2 and parent1 != ""),
        "pe_id1_parent_le": parent1,
        "pe_id2_parent_le": parent2,
    }


def _schema() -> dict:
    """[DLR] Get full schema: all LE, PE, PAS."""
    gdb, _, _ = _ensure_services()
    return {
        "success": True,
        "logical_entities": gdb.get_all_logical_entities(),
        "physical_entities": gdb.get_all_entities(),
        "pas_relations": gdb.get_all_pas_relations(),
    }


# Mapping of tool name → plain function for DLR tools (23 个纯 CLI 风格)
_DLR_TOOL_FUNCS = {
    # 召回层(主入口是 dlr_semantic_query;recall_pe/recall_pas 为辅助按类型召回)
    "dlr_semantic_query": dlr_semantic_query,
    "recall_pe": _recall_pe,
    "recall_pas": _recall_pas,
    # 列表层
    "list_le": _list_le,
    "list_pe": _list_pe,
    "list_pas": _list_pas,
    # LE 查询
    "get_le": _get_le,
    "get_le_attrs": _get_le_attrs,
    "get_le_children": _get_le_children,
    "get_le_pas": _get_le_pas,
    # PE 查询(get_pe/get_pe_attrs/get_pe_arcs 已合并入 get_pe_full)
    "get_pe_full": _get_pe_full,  # PE+属性+ARCS+database_url 一次调用
    "get_pe_parent": _get_pe_parent,
    # PAS 导航
    "get_pas": _get_pas,
    "get_pas_by_le": _get_pas_by_le,
    # 路径层
    "path_le_le": _path_le_le,
    "path_pe_pe": _path_pe_pe,
    # 判断层
    "is_le": _is_le,
    "is_pe": _is_pe,
    "is_arcs": _is_arcs,
    "is_same_le": _is_same_le,
    # 统计层
    "schema": _schema,
}


# ER 范式专属工具集(原模块级 @mcp.tool() 注册,现改为动态注册)
_ER_TOOL_FUNCS = {
    # 语义入口
    "er_semantic_query": er_semantic_query,
    # 实体图谱导航
    "list_entities": list_entities,
    "list_relations": list_relations,
    "get_entity": get_entity,
    "get_entity_attributes": get_entity_attributes,
    "get_entity_relations": get_entity_relations,
    "get_entity_mapping": get_entity_mapping,
    "find_shortest_path": find_shortest_path,
    # 表结构
    "list_all_tables": list_all_tables,
    "get_table_schema": get_table_schema,
    # 统计
    "summary": summary,
}


def _register_shared_tools():
    """注册所有范式共用的工具(薄透传 SQL 执行服务)."""
    from fastmcp.tools import Tool
    if "execute_sql" in _get_tool_names():
        return
    try:
        mcp.add_tool(Tool.from_function(_execute_sql, name="execute_sql"))
        logger.info("[MCP] Registered shared tool: execute_sql")
    except Exception as e:
        logger.warning(f"[MCP] Failed to register execute_sql: {e}")


def _register_er_tools():
    """注册 ER 专属工具集: semantic_query(语义入口) + 12 个 REST 查询工具.

    对标: DLR CLI 工具(LE/PE/PAS), RDF 工具(语义召回 + SPARQL).
    """
    from fastmcp.tools import Tool
    existing = _get_tool_names()
    added = 0
    for name, func in _ER_TOOL_FUNCS.items():
        if name in existing:
            continue
        try:
            tool = Tool.from_function(func, name=name)
            mcp.add_tool(tool)
            added += 1
            logger.debug(f"[MCP] Registered ER tool: {name}")
        except Exception as e:
            logger.warning(f"[MCP] Failed to register ER tool {name}: {e}")
    if added:
        logger.info(f"[MCP] Registered {added} ER-specific tools")


def _register_dlr_tools():
    """Register DLR tools onto the mcp instance (idempotent)."""
    from fastmcp.tools import Tool
    existing = _get_tool_names()
    added = 0
    for name, func in _DLR_TOOL_FUNCS.items():
        if name in existing:
            continue
        try:
            tool = Tool.from_function(func, name=name)
            mcp.add_tool(tool)
            added += 1
            logger.debug(f"[MCP] Registered DLR tool: {name}")
        except Exception as e:
            logger.warning(f"[MCP] Failed to register DLR tool: {name}: {e}")
    if added:
        logger.info(f"[MCP] Registered {added} DLR-specific tools")


_RDF_TOOL_FUNCS = {
    # 语义召回(对标 ER 的 semantic_query / DLR 的 recall_*)
    "rdf_semantic_query": rdf_semantic_query,
    # 映射查询(对标 ER 的 get_entity_mapping / DLR 的 get_pe_full)
    "query_rdf_mapping": _query_rdf_mapping,
    # 图探索
    "rdf_classes": _rdf_classes,
    "rdf_predicates": _rdf_predicates,
    "rdf_search": _rdf_search,
    # rdf_triples_for_class 已移除 — 永远返回空,误导 Agent
    # 序列化
    "rdf_serialize": _rdf_serialize,
    # SPARQL 控制台(W3C 标准,Agent 自由验证映射)
    "rdf_sparql": _rdf_sparql,
}


def _register_rdf_tools():
    """Register RDF tools onto the mcp instance (idempotent)."""
    from fastmcp.tools import Tool
    existing = _get_tool_names()
    added = 0
    for name, func in _RDF_TOOL_FUNCS.items():
        if name in existing:
            continue
        try:
            tool = Tool.from_function(func, name=name)
            mcp.add_tool(tool)
            added += 1
            logger.debug(f"[MCP] Registered RDF tool: {name}")
        except Exception as e:
            logger.warning(f"[MCP] Failed to register RDF tool: {e}")
    if added:
        logger.info(f"[MCP] Registered {added} RDF-specific tools")



# ===================================================================
# Entry point
# ===================================================================

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Semantic Core Service MCP Server")
    parser.add_argument("--config", default="",
                        help="场景配置文件名 (位于 configs/scenarios/); 新范式下可留空, 由 --mapping-type 决定存储路径")
    parser.add_argument("--mapping-type", required=True, choices=["er", "dlr", "rdf"],
                        help="映射范式: er / dlr / rdf. 决定使用 storage/<type>/graph + storage/<type>/vector/vector.pkl")
    parser.add_argument("--transport", default="stdio", choices=["stdio", "sse"],
                        help="传输模式: stdio (OpenCode spawn) 或 sse (独立调试)")
    parser.add_argument("--port", default=28765, type=int, help="SSE 模式监听端口")
    parser.add_argument("--host", default="0.0.0.0", help="SSE 模式监听地址")
    args = parser.parse_args()

    # Set env vars
    os.environ["SCS_CONFIG"] = args.config
    _mapping_type = args.mapping_type

    from config import paradigm_storage
    storage = paradigm_storage(args.mapping_type)
    os.environ["KUZU_DIR"] = str(storage["graph"])
    os.environ["VECTOR_DIR"] = str(storage["vector"])

    # Optional: load single-preset YAML for extra metadata (旧兼容)
    if args.config:
        config_path = SCENARIOS_DIR / args.config
        if config_path.exists():
            from mapping.config_loader import ConfigLoader
            cfg = ConfigLoader.load_config(config_path)
            if cfg:
                _config_data.update(cfg)

    # Trigger tool registration/removal now that _mapping_type is set
    _ensure_paradigm_tools()

    logger.info(f"🚀 MCP Server starting: mapping_type={args.mapping_type}, transport={args.transport}")

    if args.transport == "stdio":
        mcp.run(transport="stdio")
    else:
        logger.info(f"📍 SSE endpoint: http://{args.host}:{args.port}/sse")
        mcp.run(transport="sse", host=args.host, port=args.port)