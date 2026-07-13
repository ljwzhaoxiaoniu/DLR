"""
MCP Server — dual-mode (stdio + SSE) + paradigm-isolated tools.

Paradigm isolation:
  - Shared + ER tools: registered at module import via @mcp.tool()
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

    _graph_db = GraphDB(db_path=str(_storage["kuzu"]), mapping_type=_mapping_type)
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
    """Ensure only the tools for the active paradigm are exposed.

    - DLR mode: register DLR tools if not already present
    - ER mode: unregister DLR tools if they were registered (e.g. during import)

    Idempotent — safe to call multiple times.
    """
    global _tools_finalized

    if _tools_finalized:
        return

    _tools_finalized = True

    if _mapping_type == "dlr":
        _register_dlr_tools()
    else:
        _remove_dlr_tools()

    logger.info(f"[MCP] Tools finalized for {_mapping_type.upper()} mode")


def _get_tool_names() -> set:
    """Return set of currently registered tool names (via local_provider)."""
    if hasattr(mcp, 'local_provider'):
        provider = mcp.local_provider
        if hasattr(provider, '_tools'):
            return set(t.name for t in provider._tools.values())
        if hasattr(provider, 'tools'):
            return set(t.name for t in provider.tools.values())
    return set()


def _remove_dlr_tools():
    """Remove DLR-only tools from the MCP registry."""
    dlr_tool_names = {
        "recall_le", "recall_pe", "recall_pas",
        "list_le", "list_pas",
        "get_le", "get_le_attrs", "get_le_children", "get_pe_arcs",
        "path_le_le",
    }
    provider = getattr(mcp, 'local_provider', None)
    if provider is None:
        return

    existing = _get_tool_names()
    removed = 0
    for name in dlr_tool_names:
        if name in existing:
            try:
                provider.remove_tool(name)
                removed += 1
            except Exception as e:
                logger.warning(f"[MCP] Failed to remove tool {name}: {e}")

    if removed:
        logger.info(f"[MCP] Removed {removed} DLR tools for {_mapping_type.upper()} mode")


# ---------------------------------------------------------------------------
# FastMCP instance
# ---------------------------------------------------------------------------
mcp = FastMCP("Semantic Core Service")


def _resolve_database_url(physical_table_id: str = "") -> str:
    """Resolve SQLite database file path from config.

    Returns the absolute path to the .sqlite/.db file (without sqlite:/// prefix)
    so it can be passed directly to sqlite3 CLI.
    """
    databases = _config_data.get("databases", {})

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


# ===================================================================
# Shared + ER tools (registered at module import)
# ===================================================================

@mcp.tool()
def semantic_query(question: str, top_k: int = 20) -> dict:
    """自然语言语义查询：输入业务问题，返回匹配的业务实体、属性及关联关系。

    Works for both ER and DLR paradigms. The return structure differs:
    - ER: {success, confidence, data: {entities: [...]}}
    - DLR: {success, confidence, data: {logical_entities: [...], physical_entities: [...], pas_relations: [...]}}
    """
    _, _, qs = _ensure_services()
    return qs.query(question, top_k)


@mcp.tool()
def list_entities() -> list:
    """列出所有业务实体（ER: BizEntity / DLR: PhysicalEntity）。"""
    gdb, _, _ = _ensure_services()
    return gdb.get_all_entities()


@mcp.tool()
def list_relations() -> list:
    """列出所有实体间的关联关系。"""
    gdb, _, _ = _ensure_services()
    return gdb.get_all_relations()


@mcp.tool()
def get_entity(entity_id: str) -> dict:
    """获取单个实体详情。"""
    gdb, _, _ = _ensure_services()
    entity = gdb.get_entity_by_id(entity_id)
    if not entity:
        return {"success": False, "message": f"实体不存在: {entity_id}"}
    return {"success": True, "entity": entity}


@mcp.tool()
def get_entity_attributes(entity_id: str) -> list:
    """获取实体的所有属性列表（含物理字段映射）。"""
    gdb, _, _ = _ensure_services()
    return gdb.get_entity_attributes_list(entity_id)


@mcp.tool()
def get_entity_relations(entity_id: str) -> list:
    """获取实体的所有关联关系（含出边和入边）。"""
    gdb, _, _ = _ensure_services()
    return gdb.get_entity_relations(entity_id)


@mcp.tool()
def get_entity_mapping(entity_id: str) -> dict:
    """获取实体的物理映射信息（数据库、物理表、属性-字段对应）。

    database_url 在 build 阶段从 YAML 的 databases 字段解析后存入 Kuzu 节点，
    此处直接读取，无需运行时匹配。

    Returns:
        {success, entity_id, physical_table, database_url, attributes}
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


@mcp.tool()
def find_shortest_path(from_entity_id: str, to_entity_id: str) -> dict:
    """查询两个实体之间的最短关联路径。"""
    gdb, _, _ = _ensure_services()
    # Use DLR LE path if in DLR mode, otherwise ER path
    if _mapping_type == "dlr":
        return gdb.find_le_shortest_path(from_entity_id, to_entity_id)
    return gdb.find_shortest_path(from_entity_id, to_entity_id)


@mcp.tool()
def list_all_tables() -> list:
    """列出已注册实体对应的物理表。"""
    gdb, _, _ = _ensure_services()
    entities = gdb.get_all_entities()
    seen = set()
    tables = []
    for e in entities:
        tid = e.get("source_table", "")
        if tid and tid not in seen:
            seen.add(tid)
            parts = tid.split(".", 1)
            tables.append({
                "table_id": tid,
                "table_name": parts[1] if len(parts) == 2 else tid,
                "db_name": parts[0] if len(parts) == 2 else "",
            })
    return tables


@mcp.tool()
def get_table_schema(table_id: str) -> list:
    """查询任意物理表的字段结构。"""
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


@mcp.tool()
def summary() -> dict:
    """获取知识库摘要统计。"""
    gdb, _, _ = _ensure_services()
    result = {"success": True, "mapping_type": _mapping_type}
    if _mapping_type == "dlr":
        result["logical_entity_count"] = len(gdb.get_all_logical_entities())
    result["physical_entity_count"] = len(gdb.get_all_entities())
    if _mapping_type == "dlr":
        result["pas_relation_count"] = len(gdb.get_all_pas_relations())
    return result


# ===================================================================
# Geo tools (shared)
# ===================================================================

@mcp.tool()
def calc_distance(tg_id1: str, tg_id2: str) -> dict:
    """计算两个变压器之间的最小距离（米，Haversine 公式）。"""
    def _haversine(lat1, lon1, lat2, lon2):
        R = 6371000
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlambda = math.radians(lon2 - lon1)
        a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
        return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    db_path = _resolve_database_url("")
    if not db_path:
        return {"success": False, "message": "无法解析数据库路径"}
    db_path = db_path.replace("sqlite:///", "")

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute(
            'SELECT "变压器编号", "变压器经度", "变压器纬度" FROM "变压器" WHERE "变压器编号" IN (?, ?)',
            (tg_id1, tg_id2),
        )
        rows = {row[0]: (row[1], row[2]) for row in cursor.fetchall()}
        conn.close()

        if tg_id1 not in rows or tg_id2 not in rows:
            return {"success": False, "message": "变压器坐标未找到"}

        lat1, lon1 = rows[tg_id1]
        lat2, lon2 = rows[tg_id2]
        dist = _haversine(lat1, lon1, lat2, lon2)

        return {
            "success": True,
            "tg_id1": tg_id1,
            "tg_id2": tg_id2,
            "min_distance_m": round(dist, 2),
        }
    except Exception as e:
        return {"success": False, "message": str(e)}


@mcp.tool()
def find_nearby_transformers(tg_id: str, radius_m: float = 1000.0) -> dict:
    """查找指定半径内的所有邻近变压器（Haversine 距离）。"""
    def _haversine(lat1, lon1, lat2, lon2):
        R = 6371000
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlambda = math.radians(lon2 - lon1)
        a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
        return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    db_path = _resolve_database_url("")
    if not db_path:
        return {"success": False, "message": "无法解析数据库路径"}
    db_path = db_path.replace("sqlite:///", "")

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        cursor.execute(
            'SELECT "变压器经度", "变压器纬度" FROM "变压器" WHERE "变压器编号" = ?',
            (tg_id,),
        )
        target = cursor.fetchone()
        if not target:
            conn.close()
            return {"success": False, "message": f"变压器 {tg_id} 坐标不存在"}
        target_lon, target_lat = target

        cursor.execute('SELECT "变压器编号", "变压器名称", "变压器经度", "变压器纬度" FROM "变压器"')
        nearby = []
        for row in cursor.fetchall():
            other_id, other_name, lon, lat = row
            if other_id == tg_id:
                continue
            dist = _haversine(target_lat, target_lon, lat, lon)
            if dist <= radius_m:
                nearby.append({"tg_id": other_id, "name": other_name, "distance_m": round(dist, 2)})

        conn.close()
        nearby.sort(key=lambda x: x["distance_m"])

        return {"success": True, "tg_id": tg_id, "radius_m": radius_m, "nearby": nearby}
    except Exception as e:
        return {"success": False, "message": str(e)}


# ===================================================================
# DLR tools — registered dynamically when _mapping_type == "dlr"
# ===================================================================

# Plain function definitions (no decorator) — registered in _register_dlr_tools()
def _recall_le(question: str, top_k: int = 3, threshold: float = 0.5) -> dict:
    """[DLR] 自然语言召回逻辑实体(LE)。"""
    _, vector_db, _ = _ensure_services()
    results = vector_db.search(question, top_k=max(top_k * 3, 20))
    le_results = [r for r in results if r["type"] == "logical_entity"]
    le_results.sort(key=lambda x: x.get("score", 0), reverse=True)
    le_results = [r for r in le_results if r.get("score", 0) >= threshold][:top_k]
    return {
        "success": True,
        "results": [
            {
                "logical_entity_id": r["id"],
                "name": r["name"],
                "description": r.get("description", ""),
                "confidence": round(r.get("score", 0), 4),
            }
            for r in le_results
        ],
    }


def _recall_pe(question: str, top_k: int = 3, threshold: float = 0.5) -> dict:
    """[DLR] 自然语言召回物理实体(PE)。"""
    _, vector_db, _ = _ensure_services()
    results = vector_db.search(question, top_k=max(top_k * 3, 20))
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
                "confidence": round(r.get("score", 0), 4),
            }
            for r in pe_results
        ],
    }


def _recall_pas(question: str, top_k: int = 3, threshold: float = 0.5) -> dict:
    """[DLR] 自然语言召回 PAS 关系。"""
    _, vector_db, _ = _ensure_services()
    results = vector_db.search(question, top_k=max(top_k * 3, 20))
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
                "confidence": round(r.get("score", 0), 4),
            }
            for r in pas_results
        ],
    }


def _list_le() -> dict:
    """[DLR] 列出所有逻辑实体(LE)。"""
    gdb, _, _ = _ensure_services()
    results = gdb.get_all_logical_entities()
    return {"success": True, "count": len(results), "results": results}


def _list_pas() -> dict:
    """[DLR] 列出所有 PAS 语义路由关系。"""
    gdb, _, _ = _ensure_services()
    results = gdb.get_all_pas_relations()
    return {"success": True, "count": len(results), "results": results}


def _get_le(le_id: str) -> dict:
    """[DLR] 获取逻辑实体详情。"""
    gdb, _, _ = _ensure_services()
    le = gdb.get_logical_entity_by_id(le_id)
    if not le:
        return {"success": False, "message": f"逻辑实体不存在: {le_id}"}
    return {"success": True, **le}


def _get_le_attrs(le_id: str) -> dict:
    """[DLR] 获取逻辑实体的所有属性。"""
    gdb, _, _ = _ensure_services()
    return {"success": True, "logical_entity_id": le_id,
            "attributes": gdb.get_logical_entity_attributes(le_id)}


def _get_le_children(le_id: str) -> dict:
    """[DLR] 获取逻辑实体下挂的所有物理实体(PE)列表。"""
    gdb, _, _ = _ensure_services()
    child_ids = gdb.get_child_entity_ids(le_id)
    children = []
    for pe_id in child_ids:
        entity = gdb.get_entity_by_id(pe_id)
        if entity:
            children.append({
                "physical_entity_id": entity["entity_id"],
                "name": entity["name"],
                "source_table": entity.get("source_table", ""),
            })
    return {"success": True, "logical_entity_id": le_id, "children": children}


def _get_pe_arcs(pe_id: str) -> dict:
    """[DLR] 获取物理实体的 ARCS 物理锚定信息 + 数据库连接 URL。"""
    gdb, _, _ = _ensure_services()
    entity = gdb.get_entity_by_id(pe_id)
    if not entity:
        return {"success": False, "message": f"物理实体不存在: {pe_id}"}
    arcs = entity.get("arcs", {})
    database_url = _resolve_database_url(entity.get("source_table", ""))
    return {"success": True, "physical_entity_id": pe_id,
            "database_url": database_url, "arcs": arcs}


def _path_le_le(from_id: str, to_id: str) -> dict:
    """[DLR] 查询两个逻辑实体(LE)之间的最短 PAS 路径。"""
    gdb, _, _ = _ensure_services()
    return gdb.find_le_shortest_path(from_id, to_id)


# Mapping of tool name → plain function for DLR tools
_DLR_TOOL_FUNCS = {
    "recall_le": _recall_le,
    "recall_pe": _recall_pe,
    "recall_pas": _recall_pas,
    "list_le": _list_le,
    "list_pas": _list_pas,
    "get_le": _get_le,
    "get_le_attrs": _get_le_attrs,
    "get_le_children": _get_le_children,
    "get_pe_arcs": _get_pe_arcs,
    "path_le_le": _path_le_le,
}


def _register_dlr_tools():
    """Register DLR tools onto the mcp instance (idempotent)."""
    from fastmcp.tools import Tool
    existing = _get_tool_names()
    for name, func in _DLR_TOOL_FUNCS.items():
        if name in existing:
            continue
        try:
            tool = Tool.from_function(func, name=name)
            mcp.add_tool(tool)
            logger.debug(f"[MCP] Registered DLR tool: {name}")
        except Exception as e:
            logger.warning(f"[MCP] Failed to register DLR tool {name}: {e}")


# ===================================================================
# Entry point
# ===================================================================

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Semantic Core Service MCP Server")
    parser.add_argument("--config", default="",
                        help="场景配置文件名 (位于 configs/scenarios/); 新范式下可留空, 由 --mapping-type 决定存储路径")
    parser.add_argument("--mapping-type", required=True, choices=["er", "dlr", "rdf"],
                        help="映射范式: er / dlr / rdf. 决定使用 storage/kuzu/<type> + storage/vector/<type>.pkl")
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
    os.environ["KUZU_DIR"] = str(storage["kuzu"])
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
