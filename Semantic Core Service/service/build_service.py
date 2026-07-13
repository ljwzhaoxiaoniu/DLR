"""
BuildService — persist a ScenarioModel into Kuzu + FAISS.

Dispatches on model type:
  - ERScenarioModel  → _build_er()
  - DLRScenarioModel  → _build_dlr()

Each scenario gets its own Kuzu/Vector paths (passed via constructor or
scenario_storage()), so multiple scenarios never collide.
"""
import json
from typing import Optional

from tqdm import tqdm

from mapping.base import ScenarioModel, ERScenarioModel, DLRScenarioModel
from db.graph_db import GraphDB
from db.vector_db import VectorDB
from config import extract_entity_id
from utils.logger import logger


class BuildService:
    """Knowledge base build service — ER + DLR dual support."""

    def __init__(self, graph_db: Optional[GraphDB] = None,
                 vector_db: Optional[VectorDB] = None):
        self.graph_db = graph_db or GraphDB()
        self.vector_db = vector_db or VectorDB()

    def clear(self):
        """Clear all Kuzu + vector data. Call once before building a batch."""
        self.graph_db.clear()
        self.vector_db.clear()

    def save(self):
        """Persist vector data to disk. Call once after building a batch."""
        self.vector_db._save_data()

    def build(self, model: ScenarioModel) -> bool:
        """Build knowledge base from a ScenarioModel.

        Dispatches to _build_er or _build_dlr based on model type.

        NOTE: Does NOT clear or save — caller is responsible for calling
        clear() once before the loop and save() once after. This allows
        multiple presets to be merged into the same Kuzu + FAISS store.
        """
        try:
            logger.info(f"开始构建: type={model.mapping_type}, "
                        f"scenario={model.scenario_name}")

            if isinstance(model, DLRScenarioModel):
                self._build_dlr(model)
            elif isinstance(model, ERScenarioModel):
                self._build_er(model)
            else:
                raise ValueError(f"Unknown scenario model type: {type(model).__name__}")

            logger.info("知识库构建完成")
            return True
        except Exception as e:
            logger.error(f"知识库构建失败: {e}")
            return False

    # ===================================================================
    # ER build
    # ===================================================================

    def _build_er(self, model: ERScenarioModel):
        """Build ER (Entity-Relation) knowledge base."""
        logger.info(f"[ER] 构建: {len(model.biz_entities)} 实体, "
                    f"{len(model.biz_relations)} 关系")

        # Write entity + attribute nodes
        for entity in tqdm(model.biz_entities, desc="[ER] 写入实体节点"):
            self.graph_db.create_entity_node(
                entity_id=entity.entity_id,
                name=entity.name,
                description=entity.description,
                physical_table_id=entity.physical_table_id,
                database_url=entity.database_url,
            )
            for attr in entity.attributes:
                self.graph_db.create_attribute_node(
                    attr_id=attr.attr_id,
                    name=attr.name,
                    description=attr.description,
                    physical_column_id=attr.physical_column_id,
                    data_type=attr.data_type,
                )
                self.graph_db.create_entity_attribute_relation(
                    entity_id=entity.entity_id,
                    attr_id=attr.attr_id,
                )

        # Write relations
        for rel in tqdm(model.biz_relations, desc="[ER] 写入实体关系"):
            from_id = extract_entity_id(rel.from_entity_attr_id)
            to_id = extract_entity_id(rel.to_entity_attr_id)
            self.graph_db.create_entity_relation(
                from_entity_id=from_id,
                to_entity_id=to_id,
                relation_id=rel.relation_id,
                name=rel.biz_name,
                description=rel.description,
                from_entity_attr_id=rel.from_entity_attr_id,
                to_entity_attr_id=rel.to_entity_attr_id,
            )

        # Write vectors
        self._build_er_vector(model)
        logger.info("[ER] 构建完成")

    def _build_er_vector(self, model: ERScenarioModel):
        """Write ER vectors."""
        entity_id_to_name = {e.entity_id: e.name for e in model.biz_entities}

        for entity in model.biz_entities:
            self.vector_db.insert_entity(
                entity_id=entity.entity_id,
                name=entity.name,
                description=entity.description,
            )
            for attr in entity.attributes:
                self.vector_db.insert_attribute(
                    attr_id=attr.attr_id,
                    name=attr.name,
                    description=attr.description,
                )

        for rel in model.biz_relations:
            from_id = extract_entity_id(rel.from_entity_attr_id)
            to_id = extract_entity_id(rel.to_entity_attr_id)
            from_name = entity_id_to_name.get(from_id, from_id)
            to_name = entity_id_to_name.get(to_id, to_id)
            self.vector_db.insert_relation(
                relation_id=rel.relation_id,
                name=rel.biz_name,
                from_entity_attr_id=rel.from_entity_attr_id,
                from_entity_name=from_name,
                to_entity_attr_id=rel.to_entity_attr_id,
                to_entity_name=to_name,
                description=rel.description,
            )

    # ===================================================================
    # DLR build
    # ===================================================================

    def _build_dlr(self, model: DLRScenarioModel):
        """Build DLR (Logical-Physical Dual Layer) knowledge base."""
        logger.info(f"[DLR] 构建: {len(model.logical_entities)} LE, "
                    f"{len(model.physical_entities)} PE, "
                    f"{len(model.pas_relations)} PAS")

        # 1. Logical entities + attributes
        for le in tqdm(model.logical_entities, desc="[DLR] 写入逻辑实体"):
            self.graph_db.create_logical_entity_node(
                logical_entity_id=le.logical_entity_id,
                name=le.name,
                description=le.description,
            )
            for attr in le.attributes:
                self.graph_db.create_logical_attribute_node(
                    attr_id=attr.attr_id,
                    name=attr.name,
                    description=attr.description,
                )
                self.graph_db.create_logical_entity_attribute_relation(
                    logical_entity_id=le.logical_entity_id,
                    attr_id=attr.attr_id,
                )

        # 2. Physical entities + attributes + INHERITS
        for pe in tqdm(model.physical_entities, desc="[DLR] 写入物理实体"):
            arcs_a = json.dumps(pe.arcs.A_anchor, ensure_ascii=False) if pe.arcs and pe.arcs.A_anchor else None
            arcs_r = pe.arcs.R_row if pe.arcs and pe.arcs.R_row else None
            arcs_c = json.dumps(pe.arcs.C_column, ensure_ascii=False) if pe.arcs and pe.arcs.C_column else None
            arcs_s = pe.arcs.S_semantic4arcs if pe.arcs and pe.arcs.S_semantic4arcs else None

            self.graph_db.create_physical_entity_node(
                physical_entity_id=pe.physical_entity_id,
                name=pe.name,
                description=pe.description,
                physical_table_id=pe.physical_table_id,
                arcs_a=arcs_a,
                arcs_r=arcs_r,
                arcs_c=arcs_c,
                arcs_s=arcs_s,
            )
            for attr in pe.attributes:
                self.graph_db.create_attribute_node(
                    attr_id=attr.attr_id,
                    name=attr.name,
                    description=attr.description,
                    physical_column_id=attr.physical_column_id,
                    data_type=attr.data_type,
                )
                self.graph_db.create_entity_attribute_relation(
                    entity_id=pe.physical_entity_id,
                    attr_id=attr.attr_id,
                )

        # 3. INHERITS relations (PE → LE)
        for le in model.logical_entities:
            for child_id in le.child_entity_ids:
                self.graph_db.create_inherits_relation(
                    physical_entity_id=child_id,
                    logical_entity_id=le.logical_entity_id,
                )

        # 4. PAS relations
        for pas in tqdm(model.pas_relations, desc="[DLR] 写入PAS关系"):
            from_le, to_le = self._parse_pas_relation_id(pas.relation_id)
            fwd = pas.P_predicate.get("forward")
            rev = pas.P_predicate.get("reverse")
            self.graph_db.create_pas_relation(
                from_le_id=from_le,
                to_le_id=to_le,
                relation_id=pas.relation_id,
                relation_name=pas.relation_name,
                forward_verb=fwd.verb if fwd else "",
                forward_cardinality=fwd.cardinality if fwd else "",
                reverse_verb=rev.verb if rev else "",
                reverse_cardinality=rev.cardinality if rev else "",
                a_attribute=pas.A_attribute,
                s_semantic=pas.S_semantic4pas,
            )

        # 5. Vectors
        self._build_dlr_vector(model)
        logger.info("[DLR] 构建完成")

    def _build_dlr_vector(self, model: DLRScenarioModel):
        """Write DLR vectors."""
        # Logical entities
        for le in model.logical_entities:
            self.vector_db.insert_logical_entity(
                logical_entity_id=le.logical_entity_id,
                name=le.name,
                description=le.description,
            )

        # Physical entities + attributes
        for pe in model.physical_entities:
            self.vector_db.insert_entity(
                entity_id=pe.physical_entity_id,
                name=pe.name,
                description=pe.description,
            )
            for attr in pe.attributes:
                self.vector_db.insert_attribute(
                    attr_id=attr.attr_id,
                    name=attr.name,
                    description=attr.description,
                )

        # PAS relations (compiled vector text)
        for pas in model.pas_relations:
            vector_text = pas.compile_vector_text()
            from_le, to_le = self._parse_pas_relation_id(pas.relation_id)
            self.vector_db.insert_pas_relation(
                relation_id=pas.relation_id,
                relation_name=pas.relation_name,
                vector_text=vector_text,
                from_le_id=from_le,
                to_le_id=to_le,
                a_attribute=pas.A_attribute,
            )

    # ===================================================================
    # Helpers
    # ===================================================================

    @staticmethod
    def _parse_pas_relation_id(relation_id: str):
        """Parse 'LOGICAL.变压器_TO_LOGICAL.线损' → ('LOGICAL.变压器', 'LOGICAL.线损')."""
        parts = relation_id.split("_TO_")
        if len(parts) == 2:
            return parts[0], parts[1]
        return relation_id, ""
