"""
ERSemanticMapper — ER (Entity-Relation) paradigm.

Parses a YAML config with top-level keys:
  - entities: list of {entity_id, biz_name, physical_table_id, attributes: [...]}
  - relations: list of {relation_id, biz_name, from_entity_attr_id, to_entity_attr_id}

Produces ERScenarioModel with BizEntity / BizAttribute / BizRelation lists.
"""
from pathlib import Path
from typing import Any, Dict, List, Optional

from models.physical_models import PhysicalTable
from models.semantic_models import BizEntity, BizAttribute, BizRelation
from utils.logger import logger

from mapping.base import ERScenarioModel, ScenarioModel, SemanticMapperABC
from mapping.registry import register


def _resolve_database_url(databases: Dict[str, str], physical_table_id: str) -> Optional[str]:
    """Resolve the absolute SQLite file path for an entity.

    Given the YAML's databases dict and an entity's physical_table_id
    (e.g. "financial.account"), extracts the prefix ("financial"),
    looks up the sqlite:/// URL, and returns the absolute file path.
    """
    if not databases or not physical_table_id:
        return None

    # Match by prefix (e.g. "financial" from "financial.account")
    prefix = physical_table_id.split(".")[0] if "." in physical_table_id else physical_table_id
    url = databases.get(prefix)

    if not url and len(databases) == 1:
        # Single-database YAML: use the only entry
        url = next(iter(databases.values()))

    if not url:
        return None

    if url.startswith("sqlite:///"):
        rel = url[len("sqlite:///"):]
        # Try multiple base directories
        bases = [
            Path(__file__).parent.parent,  # Semantic Core Service/
            Path(__file__).parent.parent.parent,  # DLR Proj/
        ]
        for base in bases:
            candidate = (base / rel).resolve()
            if candidate.exists():
                return str(candidate)
        # Fallback: return first base resolution
        return str((bases[0] / rel).resolve())

    return url


@register("er")
class ERSemanticMapper(SemanticMapperABC):
    """ER paradigm mapper — 1 entity ≈ 1 physical table."""

    mapping_type = "er"

    def parse(
        self,
        config: Dict[str, Any],
        physical_tables: Optional[List[PhysicalTable]] = None,
    ) -> ERScenarioModel:
        physical_table_map: Dict[str, PhysicalTable] = (
            {t.table_id: t for t in physical_tables} if physical_tables else {}
        )
        physical_column_map: Dict[str, Any] = {}
        for t in (physical_tables or []):
            for col in t.columns:
                physical_column_map[col.column_id] = col

        biz_entities: List[BizEntity] = []
        biz_relations: List[BizRelation] = []
        databases = config.get("databases", {})

        # --- entities ---
        for entity_config in config.get("entities", []):
            entity_id = entity_config.get("entity_id")
            biz_name = entity_config.get("biz_name")
            if not entity_id or not biz_name:
                logger.warning(f"[ER] 跳过无效实体配置: {entity_config}")
                continue

            physical_table_id = entity_config.get("physical_table_id")
            physical_table = physical_table_map.get(physical_table_id) if physical_table_id else None

            biz_attributes: List[BizAttribute] = []
            for attr_config in entity_config.get("attributes", []):
                attr_id = attr_config.get("attr_id")
                attr_biz_name = attr_config.get("biz_name")
                if not attr_id or not attr_biz_name:
                    logger.warning(f"[ER] 跳过无效属性配置: {attr_config}")
                    continue

                physical_column_id = attr_config.get("physical_column_id")
                physical_column = physical_column_map.get(physical_column_id) if physical_column_id else None

                biz_attributes.append(BizAttribute(
                    attr_id=attr_id,
                    name=attr_biz_name,
                    description=attr_config.get("description", ""),
                    physical_column_id=physical_column_id,
                    data_type=physical_column.data_type if physical_column else None,
                ))

            # Resolve database_url: entity → yaml prefix → databases dict → sqlite path
            database_url = _resolve_database_url(databases, physical_table_id)

            biz_entities.append(BizEntity(
                entity_id=entity_id,
                name=biz_name,
                description=entity_config.get("description", ""),
                physical_table_id=physical_table_id,
                database_url=database_url,
                attributes=biz_attributes,
            ))
            logger.info(f"[ER] 映射实体: {entity_id} - {biz_name} (db={database_url})")

        # --- relations ---
        for relation_config in config.get("relations", []):
            relation_id = relation_config.get("relation_id")
            relation_biz_name = relation_config.get("biz_name")
            from_entity_attr_id = relation_config.get("from_entity_attr_id")
            to_entity_attr_id = relation_config.get("to_entity_attr_id")
            if not all([relation_id, relation_biz_name, from_entity_attr_id, to_entity_attr_id]):
                logger.warning(f"[ER] 跳过无效关系配置: {relation_config}")
                continue

            biz_relations.append(BizRelation(
                relation_id=relation_id,
                biz_name=relation_biz_name,
                from_entity_attr_id=from_entity_attr_id,
                to_entity_attr_id=to_entity_attr_id,
                description=relation_config.get("description", ""),
            ))
            logger.info(f"[ER] 映射关系: {from_entity_attr_id} -> {to_entity_attr_id} [{relation_biz_name}]")

        logger.info(f"[ER] 完成: {len(biz_entities)} 实体, {len(biz_relations)} 关系")

        return ERScenarioModel(
            mapping_type="er",
            scenario_name=config.get("scenario_name", ""),
            schema_version=config.get("version", "1.0"),
            databases=config.get("databases", {}),
            biz_entities=biz_entities,
            biz_relations=biz_relations,
        )
