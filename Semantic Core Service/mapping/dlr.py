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

            # Public attributes
            public_attrs: List[LogicalAttribute] = []
            for attr_cfg in le_config.get("public_attributes", []):
                attr_id = attr_cfg.get("attr_id")
                attr_name = attr_cfg.get("biz_name")
                if not attr_id or not attr_name:
                    continue
                public_attrs.append(LogicalAttribute(
                    attr_id=attr_id,
                    name=attr_name,
                    description=attr_cfg.get("description", ""),
                ))

            # Physical entities with ARCS
            child_entity_ids: List[str] = []
            for pe_config in le_config.get("physical_entities", []):
                pe_id = pe_config.get("physical_entity_id", "")
                if not pe_id:
                    continue
                child_entity_ids.append(pe_id)

                # Build ARCS
                arcs = ARCSSatellite(
                    A_anchor=pe_config.get("A", {}),
                    R_row=pe_config.get("R"),
                    C_column=pe_config.get("C", {}),
                    S_semantic4arcs=pe_config.get("S"),
                )

                # Inherited attributes from C mapping
                inherited_attrs: List[PhysicalAttribute] = []
                for logical_attr_id, physical_col_id in arcs.C_column.items():
                    logical_attr = next(
                        (a for a in public_attrs if a.attr_id == logical_attr_id), None
                    )
                    inherited_attrs.append(PhysicalAttribute(
                        attr_id=physical_col_id,
                        name=logical_attr.name if logical_attr else logical_attr_id,
                        description=logical_attr.description if logical_attr else "",
                        physical_column_id=physical_col_id,
                        data_type=None,
                    ))

                # Private attributes
                private_attrs: List[PhysicalAttribute] = []
                for attr_cfg in pe_config.get("private_attributes", []):
                    attr_id = attr_cfg.get("attr_id")
                    attr_name = attr_cfg.get("biz_name")
                    if not attr_id or not attr_name:
                        continue
                    private_attrs.append(PhysicalAttribute(
                        attr_id=attr_id,
                        name=attr_name,
                        description=attr_cfg.get("description", ""),
                        physical_column_id=attr_cfg.get("physical_column_id"),
                        data_type=None,
                    ))

                all_attrs = inherited_attrs + private_attrs

                pe_name = pe_config.get("physical_table_name", pe_id)
                all_physical_entities.append(PhysicalEntity(
                    physical_entity_id=pe_id,
                    name=pe_name,
                    description=arcs.S_semantic4arcs or "",
                    physical_table_id=pe_config.get("physical_table_id"),
                    attributes=all_attrs,
                    arcs=arcs,
                ))
                logger.info(f"[DLR] 映射物理实体: {pe_id} - {pe_name} "
                            f"(A={arcs.A_anchor}, R={arcs.R_row}, "
                            f"C映射={len(arcs.C_column)}, 专有属性={len(private_attrs)})")

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
