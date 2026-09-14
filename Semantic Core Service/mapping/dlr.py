"""
DLRSemanticMapper — DLR (Logical-Physical Dual Layer) paradigm.

Parses a YAML config with top-level keys:
  - logical_entities: list of LE definitions, each containing:
      - public_attributes
      - physical_entities: list of PE definitions with ARCS (A/R/C/S)
  - pas_relations: list of PAS semantic routes between LEs

Produces DLRScenarioModel with LogicalEntity / PhysicalEntity / PASRelation lists.

Based on LE-PE VOA's map_v2() method.
"""
from typing import Any, Dict, List, Optional

from models.physical_models import PhysicalTable
from models.semantic_models import (
    PhysicalEntity,
    PhysicalAttribute,
    LogicalEntity,
    LogicalAttribute,
    PASRelation,
    PASPredicate,
    ARCSSatellite,
)
from utils.logger import logger

from mapping.base import DLRScenarioModel, ScenarioModel, SemanticMapperABC
from mapping.registry import register


@register("dlr")
class DLRSemanticMapper(SemanticMapperABC):
    """DLR paradigm mapper — 1 LE ≈ N PE + PAS routing."""

    mapping_type = "dlr"

    def parse(
        self,
        config: Dict[str, Any],
        physical_tables: Optional[List[PhysicalTable]] = None,
    ) -> DLRScenarioModel:
        logical_entities: List[LogicalEntity] = []
        all_physical_entities: List[PhysicalEntity] = []
        all_pas_relations: List[PASRelation] = []

        # 物理列索引：补 PE 属性的 data_type（与 er.py 同口径，2026-09-11 三范式物理层对齐）
        physical_column_map: Dict[str, Any] = {}
        for t in (physical_tables or []):
            for col in t.columns:
                physical_column_map[col.column_id] = col

        # First pass: collect logical→physical mapping for cross-LE resolution
        logical_to_children: Dict[str, List[str]] = {}
        for le_config in config.get("logical_entities", []):
            le_id = le_config.get("logical_entity_id", "")
            children = []
            for pe_config in le_config.get("physical_entities", []):
                pe_id = pe_config.get("physical_entity_id", "")
                if pe_id:
                    children.append(pe_id)
            logical_to_children[le_id] = children

        # Second pass: parse LE + PE + ARCS
        for le_config in config.get("logical_entities", []):
            le_id = le_config.get("logical_entity_id")
            biz_name = le_config.get("biz_name", "")
            if not le_id:
                logger.warning(f"[DLR] 跳过无效逻辑实体: {le_config}")
                continue

            # 统一属性表（2026-09-12 schema）：PE 的每列一条，public 标记位决定是否透传到 LE 面。
            # 设计口径：public 不是实体，是 PE 属性上的可见性标记；LE 的 public 面在构建时
            # 由各 PE 的 public 属性投影而成（标识 = {le_id}.{biz_name}，可推导故不单独存）。
            public_attrs: List[LogicalAttribute] = []
            _seen_pub: Dict[str, LogicalAttribute] = {}

            # Physical entities with ARCS
            child_entity_ids: List[str] = []
            for pe_config in le_config.get("physical_entities", []):
                pe_id = pe_config.get("physical_entity_id", "")
                if not pe_id:
                    continue
                child_entity_ids.append(pe_id)

                if "attributes" not in pe_config:
                    raise ValueError(
                        f"[DLR] {pe_id} 缺 attributes 字段 —— yaml 是旧 schema"
                        f"（LE.public_attributes + PE.C/private_attributes）。"
                        f"请先运行 tmp_scripts/migrate_dlr_schema.py 迁移")

                attrs: List[PhysicalAttribute] = []
                c_column: Dict[str, str] = {}
                for attr_cfg in (pe_config.get("attributes") or []):
                    col_id = attr_cfg.get("column")
                    if not col_id:
                        continue
                    attr_name = attr_cfg.get("biz_name") or col_id
                    attr_desc = attr_cfg.get("description") or ""
                    pcol = physical_column_map.get(col_id)
                    attrs.append(PhysicalAttribute(
                        attr_id=col_id,
                        name=attr_name,
                        description=attr_desc,
                        physical_column_id=col_id,
                        data_type=pcol.data_type if pcol else None,
                    ))
                    if not attr_cfg.get("public"):
                        continue
                    # public → 透传到 LE 面；ARCS.C 由它重建（对外形态与旧 schema 一致）
                    lid = f"{le_id}.{attr_name}"
                    c_column[lid] = col_id
                    if lid not in _seen_pub:
                        _seen_pub[lid] = LogicalAttribute(
                            attr_id=lid, name=attr_name, description=attr_desc)
                    elif _seen_pub[lid].description != attr_desc:
                        logger.warning(
                            f"[DLR] 同名 public 属性 {lid} 在多个 PE 上文本不一致，取先出现者："
                            f"{_seen_pub[lid].description!r} vs {attr_desc!r}")

                # Build ARCS
                arcs = ARCSSatellite(
                    A_anchor=pe_config.get("A", {}),
                    R_row=pe_config.get("R"),
                    C_column=c_column,
                    S_semantic4arcs=pe_config.get("S"),
                )

                pe_name = pe_config.get("physical_table_name", pe_id)
                all_physical_entities.append(PhysicalEntity(
                    physical_entity_id=pe_id,
                    name=pe_name,
                    description=arcs.S_semantic4arcs or "",
                    physical_table_id=pe_config.get("physical_table_id"),
                    attributes=attrs,
                    arcs=arcs,
                ))
                logger.info(f"[DLR] 映射物理实体: {pe_id} - {pe_name} "
                            f"(A={arcs.A_anchor}, R={arcs.R_row}, "
                            f"属性={len(attrs)}, 其中 public={len(c_column)})")

            public_attrs = list(_seen_pub.values())
            logical_entities.append(LogicalEntity(
                logical_entity_id=le_id,
                name=biz_name,
                description=le_config.get("description", ""),
                attributes=public_attrs,
                child_entity_ids=child_entity_ids,
            ))
            logger.info(f"[DLR] 映射逻辑实体: {le_id} - {biz_name} "
                        f"(公共属性={len(public_attrs)}, 子实体={len(child_entity_ids)})")

        # PAS relations
        for pas_cfg in config.get("pas_relations", []):
            relation_id = pas_cfg.get("relation_id", "")
            relation_name = pas_cfg.get("relation_name", "")
            if not relation_id:
                continue

            p_dict: Dict[str, PASPredicate] = {}
            p_config = pas_cfg.get("P", {})
            if isinstance(p_config, dict):
                for direction, pred_cfg in p_config.items():
                    if isinstance(pred_cfg, dict):
                        p_dict[direction] = PASPredicate(
                            verb=pred_cfg.get("verb", ""),
                            cardinality=pred_cfg.get("cardinality", "1:N"),
                        )
                    elif isinstance(pred_cfg, str):
                        p_dict[direction] = PASPredicate(verb=pred_cfg)

            all_pas_relations.append(PASRelation(
                relation_id=relation_id,
                relation_name=relation_name,
                P_predicate=p_dict,
                A_attribute=pas_cfg.get("A", ""),
                S_semantic4pas=pas_cfg.get("S", ""),
            ))
            verbs = [p.verb for p in p_dict.values()]
            logger.info(f"[DLR] 映射PAS关系: {relation_id} - {relation_name} "
                        f"(动词={verbs}, A={pas_cfg.get('A', '')})")

        logger.info(f"[DLR] 完成: {len(logical_entities)} LE, "
                    f"{len(all_physical_entities)} PE, "
                    f"{len(all_pas_relations)} PAS")

        return DLRScenarioModel(
            mapping_type="dlr",
            scenario_name=config.get("scenario_name", ""),
            schema_version=config.get("version", "2.0"),
            databases=config.get("databases", {}),
            logical_entities=logical_entities,
            physical_entities=all_physical_entities,
            pas_relations=all_pas_relations,
        )
