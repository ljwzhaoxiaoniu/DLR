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
from pathlib import Path

import click

from utils.logger import logger
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
    required=True,
    type=click.Choice(["ER", "DLR", "RDF"], case_sensitive=False),
    help="建模范式 (ER / DLR / RDF)",
)


# ---------------------------------------------------------------------------
# build  — merge all presets under the paradigm into ONE Kuzu + ONE Vector
# ---------------------------------------------------------------------------
@cli.command()
@PARADIGM
def build(paradigm):
    """构建知识库: 将范式下所有预设合并写入 Kuzu + FAISS"""
    paradigm = paradigm.lower()
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
        if hasattr(model, "logical_entities") and Paradigm == "dlr":
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

    click.echo(f"\n{'='*50}")
    click.echo(f"Build Summary: [OK] {ok_count} / [FAIL] {fail_count} / Total {len(preset_files)}")
    click.echo(f"存储位置: {storage['graph']}  +  {storage['vector']}")


# ---------------------------------------------------------------------------
# serve  — single shared endpoint for the whole paradigm
# ---------------------------------------------------------------------------
@cli.command()
@PARADIGM
@click.option("--port", default=28765, help="服务监听端口")
@click.option("--host", default="0.0.0.0", help="服务监听地址")
def serve(paradigm, host, port):
    """启动 HTTP API + MCP SSE 服务 (覆盖范式下所有数据库)"""
    paradigm = paradigm.lower()
    storage = paradigm_storage(paradigm)
    os.environ["KUZU_DIR"] = str(storage["graph"])
    os.environ["VECTOR_DIR"] = str(storage["vector"])

    try:
        from fastapi import FastAPI
        from fastapi.staticfiles import StaticFiles
        from fastapi.responses import RedirectResponse
        import uvicorn
        from pydantic import BaseModel
    except ImportError:
        logger.error("请先安装依赖: pip install fastapi uvicorn pydantic")
        return

    graph_db = GraphDB(db_path=str(storage["graph"]), mapping_type=paradigm)
    query_svc = QueryService(mapping_type=paradigm, graph_db=graph_db)

    app = FastAPI(title=f"语义元数据查询API [{paradigm.upper()}]", version="1.0.0")

    static_dir = Path(__file__).parent / "static"
    if static_dir.exists():
        app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

    _visual_map = {"er": "er.html", "dlr": "dlr.html", "rdf": None}
    _default_html = _visual_map.get(paradigm, "er.html")

    @app.get("/", include_in_schema=False)
    async def root():
        if _default_html and (static_dir / _default_html).exists():
            return RedirectResponse(url=f"/static/{_default_html}")
        return RedirectResponse(url="/static/er.html")

    class QueryRequest(BaseModel):
        question: str

    @app.post("/api/v1/query")
    async def api_query(req: QueryRequest):
        return query_svc.query(req.question)

    @app.get("/api/v1/entities")
    async def get_all_entities():
        return graph_db.get_all_entities()

    @app.get("/api/v1/graph")
    async def get_graph_data():
        return {"entities": graph_db.get_all_entities(),
                "relations": graph_db.get_all_relations()}

    @app.get("/api/v1/dlr/graph")
    async def get_dlr_graph():
        if paradigm != "dlr":
            return {"error": "not in dlr paradigm"}
        return graph_db.get_dlr_graph_data()

    @app.get("/health")
    async def health_check():
        return {"status": "ok", "paradigm": paradigm}

    try:
        from mcp_server import mcp as mcp_app
        # Filter MCP tools by active paradigm (remove DLR tools in ER mode, etc.)
        from mcp_server import _ensure_paradigm_tools
        _ensure_paradigm_tools()
        app.mount("/mcp", mcp_app.http_app(transport="sse"))
        logger.info(f"🤖 MCP 已挂载: /mcp/sse (paradigm={paradigm})")
    except Exception as e:
        logger.warning(f"MCP 挂载失败: {e}")

    access_host = "localhost" if host == "0.0.0.0" else host
    logger.info(f"🌐 http://{access_host}:{port}/  (API / MCP /mcp/sse)")
    uvicorn.run(app, host=host, port=port, log_level="info")


# ---------------------------------------------------------------------------
# reset  — clear Kuzu + Vector for the whole paradigm
# ---------------------------------------------------------------------------
@cli.command()
@PARADIGM
def reset(paradigm):
    """清除范式的 Graph / 向量数据"""
    paradigm = paradigm.lower()
    storage = paradigm_storage(paradigm)

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
