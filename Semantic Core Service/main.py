"""
Semantic Core Service — CLI entry point.

Three paradigm "scenarios":
  - ER   : Entity-Relation (BizEntity / BizAttribute / BizRelation)
  - DLR  : Logical-Physical Dual Layer (LE / PE / PAS / ARCS)
  - RDF  : (future)

Within each paradigm all preset databases share ONE Kuzu + ONE Vector DB
(so a single ``serve`` can answer questions across the whole corpus).

Usage:
    python main.py build --paradigm ER                    # merge all into one KB
    python main.py reset --paradigm ER
    python main.py serve --paradigm ER [--port 28765]
    python main.py query --paradigm ER "<question>"
    python main.py interactive --paradigm ER
    python main.py init --preset <name> --paradigm ER
"""
import os
import shutil
import sys
import json
from pathlib import Path
from typing import Optional

import click

from utils.logger import logger, reset_log_file_for_build, reset_log_file_for_evidence
from config import BASE_DIR, SCENARIOS_DIR, SQLITE_DIR, paradigm_storage
from mapping.config_loader import ConfigLoader
from mapping.physical_scanner import PhysicalScanner
from mapping.registry import get_mapper
from service.build_service import BuildService
from service.query_service import QueryService
from db.graph_db import GraphDB
from db.vector_db import VectorDB


def _resolve_preset(preset: str, paradigm: str):
    """Resolve a single preset file under a paradigm directory.

    Returns (config_path, config_data, mapper) or (None, None, None).
    Storage is paradigm-level, resolved separately via paradigm_storage().
    """
    base = SCENARIOS_DIR / paradigm
    config_path = None
    for ext in (".yaml", ".yml"):
        candidate = base / f"{preset}{ext}"
        if candidate.exists():
            config_path = candidate
            break

    if config_path is None:
        click.echo(f"[MISS] not found: {base}/{preset}.yaml")
        return None, None, None

    config_data = ConfigLoader.load_config(config_path)
    if not config_data:
        click.echo(f"[FAIL] load failed: {config_path}")
        return None, None, None

    mapping_type = config_data.get("mapping_type", "er")
    mapper = get_mapper(mapping_type)

    rel = config_path.relative_to(SCENARIOS_DIR)
    click.echo(f"[LOAD] {rel}  (mapping_type={mapping_type})")
    return config_path, config_data, mapper


def _scan_paradigm_dir(paradigm: str):
    """Return all YAML file paths under SCENARIOS_DIR / paradigm/."""
    base = SCENARIOS_DIR / paradigm
    if not base.exists():
        click.echo(f"[MISS] paradigm dir not found: {base}")
        return []
    files = sorted(base.glob("*.yaml")) + sorted(base.glob("*.yml"))
    if not files:
        click.echo(f"[WARN] no YAML in: {base}")
    return files


@click.group()
def cli():
    """语义元数据平台命令行工具

    三大范式场景: ER / DLR / RDF(未来)
    每个范式下所有数据库共享一套 Kuzu + Vector (单次 serve 覆盖全量)。

    用法:
        python main.py build --paradigm ER
        python main.py reset --paradigm ER
        python main.py serve --paradigm ER --port 28765
        python main.py query --paradigm ER "问题"
        python main.py interactive --paradigm ER
        python main.py init --preset financial --paradigm ER
    """
    pass


# ---------------------------------------------------------------------------
# Shared options
# ---------------------------------------------------------------------------
PARADIGM = click.option(
    "--paradigm",
    required=False,
    default="none",
    type=click.Choice(["ER", "DLR", "RDF", "ALL", "none"], case_sensitive=False),
    help="建模范式 (ER / DLR / RDF / ALL=三个一起跑)",
)


# ---------------------------------------------------------------------------
# build  — merge all presets under the paradigm into ONE Kuzu + ONE Vector
# ---------------------------------------------------------------------------
@cli.command()
@PARADIGM
@click.option("--evidence", default=None, type=str,
              help="Build evidence RAG indexes: ALL or topic name (e.g. financial)")
def build(paradigm, evidence):
    """构建知识库: 将范式下所有预设合并写入 Kuzu + FAISS.

    --evidence ALL  额外构建所有 topic 的 evidence 索引
    --evidence financial  只构建 financial 的 evidence 索引
    """
    # Evidence-only mode (no paradigm build needed)
    if evidence is not None:
        _build_evidence(evidence)
        if not paradigm or paradigm.lower() == "none":
            return

    paradigm = paradigm.lower()
    if paradigm == "all":
        for p in ["er", "dlr", "rdf"]:
            click.echo(f"\n{'#'*60}")
            click.echo(f"# 构建范式: {p.upper()}")
            click.echo(f"{'#'*60}")
            _build_one(p)
        return
    _build_one(paradigm)


def _build_one(paradigm: str):
    """Build a single paradigm (internal helper)."""
    reset_log_file_for_build(paradigm)
    preset_files = _scan_paradigm_dir(paradigm)
    if not preset_files:
        return

    # Shared storage for the whole paradigm
    storage = paradigm_storage(paradigm)
    os.environ["KUZU_DIR"] = str(storage["graph"])
    os.environ["VECTOR_DIR"] = str(storage["vector"])

    # Scan once, share across all presets
    scanner = PhysicalScanner()
    all_tables = scanner.scan_all()
    if not all_tables:
        logger.error("未发现任何物理表")
        return

    # Open shared DB once, build incrementally
    graph_db = GraphDB(db_path=str(storage["graph"]), mapping_type=paradigm)
    vector_db = VectorDB(db_path=str(storage["vector"]))
    build_service = BuildService(graph_db=graph_db, vector_db=vector_db)

    # Clear once before building all presets
    build_service.clear()

    ok_count = 0
    fail_count = 0
    for preset_path in preset_files:
        preset = preset_path.stem
        click.echo(f"\n{'='*50}")
        click.echo(f"[BUILD] {paradigm}/{preset}.yaml")
        _, config_data, mapper = _resolve_preset(preset, paradigm)
        if not config_data:
            fail_count += 1
            continue

        # Filter tables to those this preset actually uses
        db_prefixes = {k for k in config_data.get("databases", {})}
        if db_prefixes:
            preset_tables = [t for t in all_tables if t.db_name in db_prefixes]
        else:
            preset_tables = all_tables

        model = mapper.parse(config_data, preset_tables)
        # Get entity list regardless of paradigm — DLR uses logical_entities,
        # ER/RDF use biz_entities.
        if hasattr(model, "logical_entities") and paradigm == "dlr":
            ents = model.logical_entities
        else:
            ents = model.biz_entities
        if not ents:
            logger.error("  [FAIL] no entities generated")
            fail_count += 1
            continue

        ok = build_service.build(model)
        if ok:
            logger.info("  [OK] done")
            ok_count += 1
        else:
            logger.error("  [FAIL] build failed")
            fail_count += 1

    # Save once after all presets are built
    build_service.save()

    # 必须显式 close —— Kuzu 的 WAL 只在 Database.close() 时刷到主库.
    # (singleton _instances 缓存使 __del__ 不会被调用, 不能依赖析构)
    graph_db.close()

    click.echo(f"\n{'='*50}")
    click.echo(f"Build Summary: [OK] {ok_count} / [FAIL] {fail_count} / Total {len(preset_files)}")
    click.echo(f"存储位置: {storage['graph']}  +  {storage['vector']}")


# ---------------------------------------------------------------------------
# Evidence RAG helpers
# ---------------------------------------------------------------------------

def _build_evidence(target: str):
    """Build evidence indexes from rag_knowledge/*.jsonl."""
    reset_log_file_for_evidence("build", target)
    from db.evidence_db import EvidenceDB
    knowledge_dir = BASE_DIR.parent / "rag_knowledge"

    if target.lower() == "all":
        topics = sorted(p.stem for p in knowledge_dir.glob("*.jsonl"))
    else:
        topics = [target]

    if not topics:
        click.echo("[EVIDENCE] No topics found")
        return

    db = EvidenceDB(BASE_DIR.parent / "Semantic Core Service" / "storage" / "evidence")
    for db_id in topics:
        path = knowledge_dir / f"{db_id}.jsonl"
        if not path.exists():
            click.echo(f"[EVIDENCE] Not found: {path}")
            continue
        records = []
        raw = open(path, encoding="utf-8").read().strip()
        if raw.startswith("["):
            # JSON 数组格式: [{kid, knowledge, source_qids}]
            chunks = json.loads(raw)
            for c in chunks:
                text = c.get("knowledge", "").strip()
                if text:
                    records.append({
                        "qid": c["source_qids"][0],
                        "question": f"[kid={c['kid']}] {text[:80]}...",
                        "text": text,
                    })
        else:
            # JSONL 格式: 每行一个 {qid, question, evidence}
            for line in raw.split("\n"):
                line = line.strip()
                if not line:
                    continue
                obj = json.loads(line)
                text = obj.get("evidence", "").strip()
                if text:
                    records.append({"qid": obj["qid"], "question": obj["question"], "text": text})
        if records:
            db.build_index(db_id, records)
            click.echo(f"[EVIDENCE] Built: {db_id} ({len(records)} records)")
        else:
            click.echo(f"[EVIDENCE] No records: {db_id}")

    click.echo("[EVIDENCE] Done")


def _reset_evidence(target: str):
    """Clear evidence indexes."""
    reset_log_file_for_evidence("reset", target)
    from db.evidence_db import EvidenceDB
    evidence_dir = BASE_DIR.parent / "Semantic Core Service" / "storage" / "evidence"
    db = EvidenceDB(evidence_dir)

    if target.lower() == "all":
        count = db.clear_all()
        click.echo(f"[EVIDENCE] Cleared all ({count} topics)")
    else:
        ok = db.clear(target)
        if ok:
            click.echo(f"[EVIDENCE] Cleared: {target}")
        else:
            click.echo(f"[EVIDENCE] Not found: {target}")


# ---------------------------------------------------------------------------
# serve_app — build a FastAPI app for one paradigm (reused by serve / serve_all)
# ---------------------------------------------------------------------------
def _build_serve_app(paradigm: str):
    """Construct the FastAPI app for a single paradigm.

    GraphDB is NOT opened here — it is created lazily on first API call.
    This avoids Kuzu file-lock conflicts when _serve_all spawns subprocesses.
    """
    from fastapi import FastAPI
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import RedirectResponse
    from pydantic import BaseModel

    storage = paradigm_storage(paradigm)
    os.environ["KUZU_DIR"] = str(storage["graph"])
    os.environ["VECTOR_DIR"] = str(storage["vector"])

    # Lazy singletons — created on first request, not at import time
    _lazy_graph_db = None
    _lazy_vector_db = None
    _lazy_query_svc = None

    def _get_graph_db():
        nonlocal _lazy_graph_db
        if _lazy_graph_db is None:
            _lazy_graph_db = GraphDB(db_path=str(storage["graph"]), mapping_type=paradigm)
        return _lazy_graph_db

    def _get_vector_db():
        nonlocal _lazy_vector_db
        if _lazy_vector_db is None:
            from db.vector_db import VectorDB
            _lazy_vector_db = VectorDB(db_path=str(storage["vector"]))
        return _lazy_vector_db

    def _get_query_svc():
        nonlocal _lazy_query_svc
        if _lazy_query_svc is None:
            _lazy_query_svc = QueryService(
                mapping_type=paradigm,
                graph_db=_get_graph_db(),
                vector_db=_get_vector_db(),
            )
        return _lazy_query_svc

    app = FastAPI(title=f"语义元数据查询API [{paradigm.upper()}]", version="1.0.0")

    static_dir = Path(__file__).parent / "static"
    if static_dir.exists():
        app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

    _visual_map = {"er": "er.html", "dlr": "dlr.html", "rdf": "rdf.html"}
    _default_html = _visual_map.get(paradigm, "er.html")

    @app.get("/", include_in_schema=False)
    async def root():
        if _default_html and (static_dir / _default_html).exists():
            return RedirectResponse(url=f"/static/{_default_html}")
        return RedirectResponse(url="/static/er.html")

    class QueryRequest(BaseModel):
        question: str
        db: Optional[str] = None  # 可选：锁定数据库召回

    @app.post("/api/v1/query")
    async def api_query(req: QueryRequest):
        return _get_query_svc().query(req.question, db=req.db)

    @app.get("/api/v1/entities")
    async def get_all_entities():
        return _get_graph_db().get_all_entities()

    @app.get("/api/v1/graph")
    async def get_graph_data():
        return {"entities": _get_graph_db().get_all_entities(),
                "relations": _get_graph_db().get_all_relations()}

    @app.get("/api/v1/dlr/graph")
    async def get_dlr_graph():
        if paradigm != "dlr":
            return {"error": "not in dlr paradigm"}
        return _get_graph_db().get_dlr_graph_data()

    # ─── RDF / W3C-standard endpoints (only in rdf paradigm) ───────────────
    if paradigm == "rdf":
        from rdf_store.rdf_service import get_rdf_store

        @app.get("/api/v1/rdf/graph")
        async def rdf_graph_summary():
            st = get_rdf_store(); st.load()
            return {"total_triples": st.total_triples(),
                    "classes": st.classes(), "predicates": st.predicates()}

        @app.get("/api/v1/rdf/triples")
        async def rdf_triples():
            st = get_rdf_store(); st.load()
            return {"triples": st.triples()}

        @app.get("/api/v1/rdf/classes")
        async def rdf_classes():
            st = get_rdf_store(); st.load()
            return {"classes": st.classes()}

        @app.get("/api/v1/rdf/triples/class/{class_name:path}")
        async def rdf_triples_for_class(class_name: str):
            st = get_rdf_store(); st.load()
            return {"class": class_name, "triples": st.triples_for_class(class_name)}

        @app.post("/api/v1/rdf/sparql")
        async def rdf_sparql(req: QueryRequest):
            st = get_rdf_store(); st.load()
            return st.sparql(req.question)

        @app.get("/api/v1/rdf/serialize")
        async def rdf_serialize(format: str = "turtle"):
            st = get_rdf_store(); st.load()
            from fastapi.responses import PlainTextResponse
            ct_map = {"turtle": "text/turtle", "ttl": "text/turtle",
                      "jsonld": "application/ld+json", "json-ld": "application/ld+json",
                      "xml": "application/rdf+xml", "rdf/xml": "application/rdf+xml",
                      "n3": "text/n3", "nt": "application/n-triples"}
            ct = ct_map.get(format.lower(), "text/turtle")
            return PlainTextResponse(content=st.serialize(format=format), media_type=ct)

        @app.get("/api/v1/rdf/search")
        async def rdf_search(q: str = "", limit: int = 20):
            st = get_rdf_store(); st.load()
            return {"results": st.search(q, limit)}

        # ─── Plan-A mapping graph: one call returns ALL tables + columns + joins ──

        @app.get("/api/v1/rdf/mapping/all")
        async def rdf_mapping_all():
            """Return the full R2RML mapping structure for the Plan-A visualization.

            Shape:
              {
                "tables": [ {table, db, columns, relations}, ... ],
                "total_tables": N,
                "total_joins": M
              }

            One shot, no per-table round-trips from the front-end.
            """
            st = get_rdf_store(); st.load()

            # Single SPARQL pulls every distinct tableName
            sparql_tables = """
            PREFIX rr: <http://www.w3.org/ns/r2rml#>
            SELECT DISTINCT ?tn WHERE {
              ?tm rr:logicalTable [ rr:tableName ?tn ] .
            }
            """
            t_res = st.sparql(sparql_tables)
            if "error" in t_res:
                return {"error": t_res["error"], "tables": [], "total_tables": 0, "total_joins": 0}

            table_names = sorted({b["tn"] for b in t_res.get("bindings", []) if b.get("tn")})

            tables = []
            total_joins = 0
            for tn in table_names:
                m = st.mapping_for_table(tn)
                if m.get("success"):
                    tables.append(m)
                    total_joins += len(m.get("relations", []))

            return {"tables": tables, "total_tables": len(tables), "total_joins": total_joins}

    # ─── MCP (mounted for every paradigm, tool set filtered by paradigm) ────
    try:
        import mcp_server
        mcp_server._mapping_type = paradigm  # sync BEFORE tool finalization
        from mcp_server import mcp as mcp_app, _ensure_paradigm_tools
        _ensure_paradigm_tools()
        app.mount("/mcp", mcp_app.http_app(transport="sse"))
    except Exception as e:
        logger.warning(f"MCP 挂载失败: {e}")

    return app


# Port convention: 287[6,7,8][5,6,7]
#   tens digit:  6=ER, 7=DLR, 8=RDF
#   ones digit:  5=web, 6=api, 7=mcp
#   优先读项目根 config.json / 环境变量, 其次用约定值
import json as _json
_DEFAULT_PORT_MAP = {
    "er":  {"web": 28765, "api": 28766, "mcp": 28767},
    "dlr": {"web": 28775, "api": 28776, "mcp": 28777},
    "rdf": {"web": 28785, "api": 28786, "mcp": 28787},
}
_PORT_MAP = dict(_DEFAULT_PORT_MAP)
_cfg = Path(__file__).resolve().parent.parent / "config.json"
if _cfg.exists():
    try:
        _cfg_srv = _json.load(open(_cfg, encoding="utf-8")).get("server", {})
        for _p in ("er", "dlr", "rdf"):
            if _p in _cfg_srv:
                _PORT_MAP[_p] = {**_DEFAULT_PORT_MAP[_p], **_cfg_srv[_p]}
    except Exception:
        pass


def _serve_one(paradigm: str, host: str, port: int):
    """Run uvicorn for a single paradigm (blocking)."""
    from config import paradigm_log_file
    from utils.logger import reset_log_file_for_paradigm
    reset_log_file_for_paradigm(paradigm_log_file(paradigm, port))
    import uvicorn
    app = _build_serve_app(paradigm)
    access_host = "localhost" if host == "0.0.0.0" else host
    logger.info(f"[SERVE] {paradigm.upper()} -> http://{access_host}:{port}/  (API / MCP /mcp/sse)")
    uvicorn.run(app, host=host, port=port, log_level="info")


# ---------------------------------------------------------------------------
# serve  — single paradigm (original, kept for per-paradigm debugging)
# ---------------------------------------------------------------------------
@cli.command()
@PARADIGM
@click.option("--port", default=None, type=int, help="服务监听端口 (默认根据范式自动选定)")
@click.option("--host", default="0.0.0.0", help="服务监听地址")
def serve(paradigm, host, port):
    """启动 HTTP API + MCP SSE 服务 (覆盖范式下所有数据库)

    端口 conventions:
      ER  web/api/mcp = 28765/28766/28767
      DLR web/api/mcp = 28775/28776/28777
      RDF web/api/mcp = 28785/28786/28787
    """
    if paradigm == "none":
        click.echo("[ERROR] serve 必须指定 --paradigm")
        return
    paradigm = paradigm.lower()
    if paradigm == "all":
        _serve_all(host)
        return
    if port is None:
        port = _PORT_MAP[paradigm]["web"]
    _serve_one(paradigm, host, port)


def _serve_all(host: str):
    """Spawn 3 SEPARATE python processes, one per paradigm, on conventional ports.

    ER  → 28765
    DLR → 28775
    RDF → 28785
    """
    import subprocess, sys
    procs = []
    click.echo(f"\n{'='*50}")
    click.echo("ALL 模式: 启动 3 个独立服务")
    for p in ["er", "dlr", "rdf"]:
        port = _PORT_MAP[p]["web"]
        click.echo(f"  {p.upper():3s} -> http://localhost:{port}/")
        proc = subprocess.Popen(
            [sys.executable, __file__, "serve", "--paradigm", p,
             "--host", host, "--port", str(port)],
            **({"creationflags": 0x00000200} if sys.platform == "win32" else {}),
        )
        procs.append((p, port, proc))
    click.echo(f"{'='*50}\n")
    click.echo("3 个服务已全部拉起. Ctrl-C 全部退出.\n")

    try:
        while True:
            import time
            time.sleep(2)
            for p, port, proc in procs:
                if proc.poll() is not None:
                    click.echo(f"[ALL] ⚠️  {p.upper()}:{port} 已退出 (rc={proc.returncode})")
            if all(proc.poll() is not None for _, _, proc in procs):
                break
    except KeyboardInterrupt:
        click.echo("\n[ALL] Ctrl-C: 关闭所有服务...")
    finally:
        for p, port, proc in procs:
            try:
                proc.terminate()
                proc.wait(timeout=5)
            except Exception:
                proc.kill()
        click.echo("[ALL] 已停止")


# ---------------------------------------------------------------------------
# reset  — clear Kuzu + Vector for the whole paradigm
# ---------------------------------------------------------------------------
@cli.command()
@PARADIGM
@click.option("--evidence", default=None, type=str,
              help="Clear evidence RAG indexes: ALL or topic name (e.g. financial)")
def reset(paradigm, evidence):
    """清除范式的 Graph / 向量数据.

    --evidence ALL  清除所有 topic 的 evidence 索引
    --evidence financial  只清除 financial 的 evidence 索引
    """
    if evidence is not None:
        _reset_evidence(evidence)
        if paradigm == "none":
            return

    paradigm = paradigm.lower()
    if paradigm == "all":
        for p in ["er", "dlr", "rdf"]:
            click.echo(f"\n{'#'*50}")
            click.echo(f"# 重置范式: {p.upper()}")
            click.echo(f"{'#'*50}")
            _reset_one(p)
        return
    elif paradigm == "none":
        click.echo("[ERROR] --evidence 只能独立使用，构建范式时需指定 --paradigm")
        return
    _reset_one(paradigm)


def _reset_one(paradigm: str):
    """Reset a single paradigm (internal helper)."""
    from db.graph_db import GraphDB

    storage = paradigm_storage(paradigm)

    # 必须先清 singleton 缓存 —— 否则 GraphDB() 返回旧实例,
    # __init__ 因 self.conn!=None 早返, 新路径不会生效, 写到的还是旧(已删)文件.
    for key in list(GraphDB._instances.keys()):
        if key.endswith(f"::{paradigm}"):
            try:
                GraphDB._instances[key].close()
            except Exception:
                pass
            GraphDB._instances.pop(key, None)

    cleared = 0
    graph_path = storage["graph"]
    if graph_path.exists():
        shutil.rmtree(graph_path)
        logger.info(f"  已清除 Graph: {graph_path}")
        cleared += 1

    vec_path = storage["vector"]
    if vec_path.exists():
        vec_path.unlink()
        logger.info(f"  已清除 Vector: {vec_path}")
        cleared += 1

    # Recreate empty dirs
    graph_path.mkdir(parents=True, exist_ok=True)
    vec_path.parent.mkdir(parents=True, exist_ok=True)

    if cleared:
        click.echo(f"[OK] {paradigm.upper()} cleared")
    else:
        click.echo(f"[WARN] {paradigm.upper()} nothing to clear")


# ---------------------------------------------------------------------------
# query  — ask the whole paradigm
# ---------------------------------------------------------------------------
@cli.command()
@PARADIGM
@click.argument("question")
def query(paradigm, question):
    """语义查询: 向范式知识库提问"""
    paradigm = paradigm.lower()
    storage = paradigm_storage(paradigm)
    os.environ["KUZU_DIR"] = str(storage["graph"])
    os.environ["VECTOR_DIR"] = str(storage["vector"])
    graph_db = GraphDB(db_path=str(storage["graph"]), mapping_type=paradigm)
    vector_db = VectorDB(db_path=str(storage["vector"]))
    qs = QueryService(mapping_type=paradigm, graph_db=graph_db, vector_db=vector_db)
    click.echo(qs.format_result(qs.query(question)))


# ---------------------------------------------------------------------------
# interactive  — REPL for the paradigm
# ---------------------------------------------------------------------------
@cli.command()
@PARADIGM
def interactive(paradigm):
    """交互式查询模式"""
    paradigm = paradigm.lower()
    storage = paradigm_storage(paradigm)
    os.environ["KUZU_DIR"] = str(storage["graph"])
    os.environ["VECTOR_DIR"] = str(storage["vector"])
    qs = QueryService(mapping_type=paradigm)
    click.echo(f"[{paradigm.upper()}] 输入问题查询，exit / quit / q 退出")
    while True:
        try:
            q = input("\n查询> ").strip()
            if not q or q.lower() in ("exit", "quit", "q"):
                break
            click.echo(qs.format_result(qs.query(q)))
        except (KeyboardInterrupt, EOFError):
            break


# ---------------------------------------------------------------------------
# init  — scan physical DB and generate a preset YAML template
# ---------------------------------------------------------------------------
@cli.command("init")
@click.option("--preset", required=True, help="业务数据库名")
@PARADIGM
def init(preset, paradigm):
    """扫描物理库生成配置模板 (写入 scenarios/<paradigm>/<preset>.yaml)"""
    paradigm = paradigm.lower()
    scanner = PhysicalScanner()
    tables = scanner.scan_all()
    if not tables:
        logger.error("未发现任何物理表")
        return

    from mapping.config_generator import ConfigGenerator
    out_dir = SCENARIOS_DIR / paradigm
    out_dir.mkdir(exist_ok=True)
    generator = ConfigGenerator(output_dir=out_dir)
    generator.generate_template(tables, f"{preset}.yaml")


if __name__ == "__main__":
    cli()
