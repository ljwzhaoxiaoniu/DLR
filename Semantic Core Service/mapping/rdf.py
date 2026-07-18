"""
RDFSemanticMapper — parse W3C R2RML Turtle (.ttl), emit an ER-like ScenarioModel.

Reuse the existing pipeline:
  RDF .ttl (R2RML) → RDFSemanticMapper.parse()
      → RDFScenarioModel (entities + relations, Kuzu/FAISS-compatible)
      → BuildService._build_er()  (same Kuzu write path as ER)

This means RDF paradigm shares Kuzu schema (BizEntity / BizAttribute /
RELATED_TO) with ER — different content, same engine.
"""
from pathlib import Path
from typing import Any, Dict, List, Optional

import rdflib
from rdflib.namespace import RDF

from models.physical_models import PhysicalTable
from models.semantic_models import BizAttribute, BizEntity, BizRelation
from utils.logger import logger

from mapping.base import ERScenarioModel, ScenarioModel, SemanticMapperABC
from mapping.registry import register


# R2RML namespace
_RR = rdflib.Namespace("http://www.w3.org/ns/r2rml#")
# rr:class 标准 URI — rdflib 无法直接表示(保留字冲突:RR.clazz→#clazz, RR.class_→#class_)
R2RML_CLASS = rdflib.URIRef("http://www.w3.org/ns/r2rml#class")


def _safe_name(uri: str) -> str:
    """Extract a readable name from a URI: http://example.org/financial/客户 → 客户"""
    for sep in ("#", "/"):
        if sep in uri:
            return uri.split(sep)[-1]
    return uri


def _first(g: rdflib.Graph, subject, predicate) -> Optional[rdflib.term.Node]:
    return g.value(subject, predicate) if subject else None


def _resolve_database_url(databases: Dict[str, str], db_name: str) -> Optional[str]:
    if not databases:
        return None
    url = databases.get(db_name)
    if not url:
        url = next(iter(databases.values()))
    if not url:
        return None
    if url.startswith("sqlite:///"):
        rel = url[len("sqlite:///"):]
        bases = [
            Path(__file__).parent.parent,  # Semantic Core Service/
            Path(__file__).parent.parent.parent,  # DLR Proj/
        ]
        for base in bases:
            cand = (base / rel).resolve()
            if cand.exists():
                return str(cand)
        return str((bases[0] / rel).resolve())
    return url


@register("rdf")
class RDFSemanticMapper(SemanticMapperABC):
    """Parse W3C R2RML .ttl, emit ERScenarioModel (compatible with Kuzu/FAISS)."""

    mapping_type = "rdf"

    def parse(
        self,
        config: Dict[str, Any],
        physical_tables: Optional[List[PhysicalTable]] = None,
    ) -> ScenarioModel:
        ttl_path = config.get("ttl_path", "")
        db_name = config.get("database", "")
        scenario = config.get("scenario_name", db_name)
        databases = config.get("databases", {})

        if not ttl_path:
            raise ValueError("[RDF] ttl_path missing in config")

        # ttl_path may be bare filename → resolve relative to config dir or CWD bases
        ttl_p = Path(ttl_path)
        if not ttl_p.is_absolute():
            candidates = [
                Path("Semantic Core Service/configs/scenarios/RDF") / ttl_path,
                Path("configs/scenarios/RDF") / ttl_path,
                Path("configs/scenarios/RDF") / ttl_path,
            ]
            for c in candidates:
                if c.exists():
                    ttl_p = c
                    break

        if not ttl_p.exists():
            raise FileNotFoundError(f"[RDF] ttl not found: {ttl_path} (cwd={Path.cwd()})")

        g = rdflib.Graph()
        # rdflib parses each line; blank lines between prefix-block and triples
        # reset the prefix-binding table. Solution: strip comments + collapse
        # blank lines so prefixes stick, then parse via BytesIO UTF-8.
        import io as _io, re as _re

        text = ttl_p.read_text(encoding="utf-8-sig")
        cleaned_lines = []
        for ln in text.splitlines():
            s = ln.strip().replace("\r", "")
            if s == "" or s.startswith("#"):
                continue
            cleaned_lines.append(s)
        clean = "\n".join(cleaned_lines) + "\n"
        buf = _io.BytesIO(clean.encode("utf-8"))
        g.parse(buf, format="turtle")

        physical_table_map = (
            {t.table_id: t for t in physical_tables} if physical_tables else {}
        )
        physical_column_map: Dict[str, Any] = {}
        for t in (physical_tables or []):
            for col in t.columns:
                physical_column_map[col.column_id] = col

        biz_entities: List[BizEntity] = []
        biz_relations: List[BizRelation] = []

        database_url = _resolve_database_url(databases, db_name)

        RR = _RR
        Rdf = RDF

        for tm in g.subjects(Rdf.type, RR.TriplesMap):
            # physical table
            lt = _first(g, tm, RR.logicalTable)
            table_name = str(_first(g, lt, RR.tableName)) if lt else None
            if not table_name:
                continue
            if table_name == "sqlite_sequence":
                continue  # SQLite 自增元数据表:4 库 TTL 中 class URI 相同会跨库撞名,且非业务表

            # RDF class → entity name + description
            sm = _first(g, tm, RR.subjectMap)
            class_node = _first(g, sm, R2RML_CLASS) if sm else None
            biz_name = _safe_name(str(class_node)) if class_node else table_name

            # primary key
            pk = "id"
            if sm:
                tmpl = _first(g, sm, RR.template)
                if tmpl:
                    s = str(tmpl)
                    if "{" in s and "}" in s:
                        pk = s.split("{")[-1].split("}")[0]

            physical_table_id = f"{db_name}.{table_name}"
            ptable = physical_table_map.get(physical_table_id)

            # --- attributes: each predicateObjectMap with a rr:column ---
            biz_attributes: List[BizAttribute] = []
            for pom in g.objects(tm, RR.predicateObjectMap):
                pred = _first(g, pom, RR.predicate)
                om = _first(g, pom, RR.objectMap)
                if om is None:
                    continue

                # skip referencingObjectMaps here → handled as relations
                if _first(g, om, RR.parentTriplesMap) is not None:
                    continue

                col = _first(g, om, RR.column)
                predicate = _safe_name(str(pred)) if pred else None
                col_str = str(col) if col else None
                if not predicate or not col_str:
                    continue

                col_id = f"{db_name}.{table_name}.{col_str}"
                pcol = physical_column_map.get(col_id)
                biz_attributes.append(BizAttribute(
                    attr_id=col_id,
                    name=predicate,
                    description=None,
                    physical_column_id=col_id,
                    data_type=pcol.data_type if pcol else None,
                ))

            # RDF 原生起点:class IRI(非物理表名),保证 LLM 第一跳只见 class
            class_iri = str(class_node) if class_node else physical_table_id
            biz_entities.append(BizEntity(
                entity_id=class_iri,
                name=biz_name,
                description=f"[RDF] R2RML class {class_node}" if class_node else None,
                physical_table_id=physical_table_id,
                database_url=database_url,
                attributes=biz_attributes,
            ))

            # --- relations: referencingObjectMaps ---
            for pom in g.objects(tm, RR.predicateObjectMap):
                pred = _first(g, pom, RR.predicate)
                om = _first(g, pom, RR.objectMap)
                if om is None:
                    continue
                parent_tm = _first(g, om, RR.parentTriplesMap)
                if parent_tm is None:
                    continue

                parent_lt = _first(g, parent_tm, RR.logicalTable)
                parent_table = str(_first(g, parent_lt, RR.tableName)) if parent_lt else ""
                rel_name = _safe_name(str(pred)) if pred else "related"

                parent_sm = _first(g, parent_tm, RR.subjectMap)
                parent_class = _first(g, parent_sm, R2RML_CLASS) if parent_sm else None
                parent_name = _safe_name(str(parent_class)) if parent_class else parent_table

                # 关系端点也使用 class IRI,与 entity_id 一致
                parent_class_iri = str(parent_class) if parent_class else f"{db_name}.{parent_table}"
                biz_relations.append(BizRelation(
                    relation_id=f"{biz_name}_TO_{parent_name}",
                    biz_name=rel_name,
                    from_entity_attr_id=class_iri,
                    to_entity_attr_id=parent_class_iri,
                    description=f"[RDF] referencingObjectMap -> {parent_table}",
                ))

        logger.info(f"[RDF] parsed: {len(biz_entities)} entities, {len(biz_relations)} relations from {ttl_path}")

        model = ERScenarioModel(
            mapping_type="rdf",
            scenario_name=scenario,
            schema_version="1.0",
            databases=databases,
            biz_entities=biz_entities,
            biz_relations=biz_relations,
        )

        # Attach fused vector text per entity (build_service reads this).
        # Walk the parsed TTL again: for each TriplesMap, build a flat text.
        # key = class IRI(与 entity_id 一致),保证 build_service 能命中
        model._rdf_vec_texts = {}
        for tm in g.subjects(Rdf.type, RR.TriplesMap):
            lt = _first(g, tm, RR.logicalTable)
            tname = str(_first(g, lt, RR.tableName)) if lt else None
            sm = _first(g, tm, RR.subjectMap)
            class_node = _first(g, sm, R2RML_CLASS) if sm else None
            # key 必须与上面 biz_entities 的 entity_id 一致:优先 class_iri,回退 physical
            entity_key = str(class_node) if class_node else f"{db_name}.{tname}"
            if not tname:
                continue
            if tname == "sqlite_sequence":
                continue  # 与主解析循环一致:跳过 SQLite 元数据表
            col_names = []
            for pom in g.objects(tm, RR.predicateObjectMap):
                om = _first(g, pom, RR.objectMap)
                if om is None:
                    continue
                if _first(g, om, RR.parentTriplesMap) is not None:
                    continue
                col = _first(g, om, RR.column)
                if col:
                    col_names.append(str(col))
            for pom in g.objects(tm, RR.predicateObjectMap):
                om = _first(g, pom, RR.objectMap)
                if om is None:
                    continue
                parent_tm = _first(g, om, RR.parentTriplesMap)
                if parent_tm is None:
                    continue
                parent_lt = _first(g, parent_tm, RR.logicalTable)
                if parent_lt:
                    parent_tbl = str(_first(g, parent_lt, RR.tableName))
                    col_names.append(f"->{parent_tbl}")
            model._rdf_vec_texts[entity_key] = f"{db_name} {tname} {' '.join(col_names)}"

        return model

    @staticmethod
    def vector_text_for_tm(pe: Dict, db_name: str) -> str:
        """Produce flat search text for one TriplesMap (used by FAISS).

        Text format: "db.table col1 col2 col3 ..."
        so vector recall can surface the physical table name by NL question.
        """
        tbl = pe["physical_table_name"]
        parts = [f"{db_name}.{tbl}", tbl]
        for attr in (pe.get("private_attributes") or []):
            col = _bare(attr.get("physical_column_id", ""))
            biz = attr.get("biz_name", col)
            if col:
                parts.append(col)
            if biz and biz != col:
                parts.append(biz)
        return " ".join(parts)
