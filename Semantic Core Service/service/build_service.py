"""
BuildService — persist a ScenarioModel into Kuzu + FAISS.

Dispatches on model type:
  - ERScenarioModel  → _build_er()
  - DLRScenarioModel  → _build_dlr()

Each scenario gets its own Kuzu/Vector paths (passed via constructor or
scenario_storage()), so multiple scenarios never collide.
"""
import json
from typing import Dict, Optional

from tqdm import tqdm

from mapping.base import ScenarioModel, ERScenarioModel, DLRScenarioModel
from db.graph_db import GraphDB
from db.vector_db import VectorDB
from config import extract_entity_id
from utils.logger import logger


class BuildConflictError(RuntimeError):
    """跨 preset 的对象 ID 冲突——必须改名后重建（Kuzu MERGE 会静默覆盖，向量库会重复插入）。"""


def _preset_db(model: ScenarioModel) -> str:
    """取 preset 所属数据库名。每个 preset YAML 恰好声明一个库（11 个 ER/DLR/RDF preset 均如此）。"""
    return next(iter(model.databases), "") if model.databases else ""


def _db_from_table_id(table_id: Optional[str], model: ScenarioModel) -> str:
    """'card_games.cards' → 'card_games'。

    前缀必须命中 model.databases 才可信（防 RDF class IRI 等含点字符串误切），
    否则回退到 preset 唯一库名。
    """
    if table_id and "." in table_id:
        prefix = table_id.split(".", 1)[0]
        if not model.databases or prefix in model.databases:
            return prefix
    return _preset_db(model)


class BuildService:
    """Knowledge base build service — ER + DLR dual support."""

    def __init__(self, graph_db: Optional[GraphDB] = None,
                 vector_db: Optional[VectorDB] = None):
        self.graph_db = graph_db or GraphDB()
        self.vector_db = vector_db or VectorDB()
        # 会话级 ID 注册表：跨 preset 检测重名（同一次 clear→build*N→save 批次内有效）
        self._pe_registry: Dict[str, str] = {}       # pe_id -> physical_table_id
        self._le_registry: Dict[str, str] = {}       # le_id -> scenario_name
        self._entity_registry: Dict[str, str] = {}   # ER/RDF entity_id -> physical_table_id

    def clear(self):
        """Clear all Kuzu + vector data. Call once before building a batch."""
        self.graph_db.clear()
        self.vector_db.clear()
        self._pe_registry.clear()
        self._le_registry.clear()
        self._entity_registry.clear()

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
        except BuildConflictError:
            raise  # ID 冲突必须中止整个 build，不允许静默覆盖
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

        # 0. 跨 preset ID 防重（写入前拦截，Kuzu MERGE 会静默覆盖）
        for entity in model.biz_entities:
            prev = self._entity_registry.get(entity.entity_id)
            if prev is not None and prev != entity.physical_table_id:
                raise BuildConflictError(
                    f"[{model.mapping_type.upper()}] entity_id 跨库重名: {entity.entity_id} "
                    f"已映射 {prev}, {model.scenario_name} 又映射 {entity.physical_table_id}; 请改名后重建")
            self._entity_registry[entity.entity_id] = entity.physical_table_id

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
        """Write ER vectors.

        For RDF paradigm, also vectorize each TriplesMap as a fused text
        (table name + all column names) so FAISS recall surfaces physical tables.
        """
        is_rdf = (model.mapping_type == "rdf")
        entity_id_to_name = {e.entity_id: e.name for e in model.biz_entities}

        for entity in model.biz_entities:
            # For RDF, override description with fused TriplesMap text
            if is_rdf and hasattr(model, "_rdf_vec_texts") and entity.entity_id in model._rdf_vec_texts:
                desc = model._rdf_vec_texts[entity.entity_id]
            else:
                desc = entity.description
            # db 归属：用 physical_table_id 前缀（RDF 的 entity_id 是 class IRI，不可用）
            entity_db = _db_from_table_id(entity.physical_table_id, model)
            self.vector_db.insert_entity(
                entity_id=entity.entity_id,
                name=entity.name,
                description=desc,
                db=entity_db,
            )
            for attr in entity.attributes:
                self.vector_db.insert_attribute(
                    attr_id=attr.attr_id,
                    name=attr.name,
                    description=attr.description,
                    db=entity_db,
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
                db=_db_from_table_id(rel.from_entity_attr_id, model),
            )

    # ===================================================================
    # DLR build
    # ===================================================================

    def _build_dlr(self, model: DLRScenarioModel):
        """Build DLR (Logical-Physical Dual Layer) knowledge base."""
        logger.info(f"[DLR] 构建: {len(model.logical_entities)} LE, "
                    f"{len(model.physical_entities)} PE, "
                    f"{len(model.pas_relations)} PAS")

        # 0. 跨 preset ID 防重（写入前拦截；曾发生 PHYSICAL.Card/PHYSICAL.Race 跨库覆盖）
        for pe in model.physical_entities:
            prev = self._pe_registry.get(pe.physical_entity_id)
            if prev is not None and prev != pe.physical_table_id:
                raise BuildConflictError(
                    f"[DLR] PE id 跨库重名: {pe.physical_entity_id} 已映射 {prev}, "
                    f"{model.scenario_name} 又映射 {pe.physical_table_id}; 请改名后重建")
            self._pe_registry[pe.physical_entity_id] = pe.physical_table_id
        for le in model.logical_entities:
            prev = self._le_registry.get(le.logical_entity_id)
            if prev is not None and prev != model.scenario_name:
                raise BuildConflictError(
                    f"[DLR] LE id 跨 preset 重名: {le.logical_entity_id} "
                    f"({prev} vs {model.scenario_name}); 请改名后重建")
            self._le_registry[le.logical_entity_id] = model.scenario_name

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
                self.graph_db.create_physical_attribute_node(
                    attr_id=attr.attr_id,
                    name=attr.name,
                    description=attr.description,
                    physical_column_id=attr.physical_column_id,
                    data_type=attr.data_type,
                )
                self.graph_db.create_physical_entity_attribute_relation(
                    physical_entity_id=pe.physical_entity_id,
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
        # 每个 DLR preset YAML 恰好一个库；LE/PAS 无物理锚点，用 preset 库名
        preset_db = _preset_db(model)

        # Logical entities
        for le in model.logical_entities:
            # Collect public attribute descriptions for vector search
            public_attr_parts = []
            for attr in le.public_attributes:
                if attr.description:
                    public_attr_parts.append(f"{attr.name} {attr.description}")
            public_attrs_text = " ".join(public_attr_parts)

            self.vector_db.insert_logical_entity(
                logical_entity_id=le.logical_entity_id,
                name=le.name,
                description=le.description,
                db=preset_db,
                public_attrs_text=public_attrs_text,
            )

        # Physical entities + attributes
        for pe in model.physical_entities:
            pe_db = _db_from_table_id(pe.physical_table_id, model)
            self.vector_db.insert_entity(
                entity_id=pe.physical_entity_id,
                name=pe.name,
                description=pe.description,
                db=pe_db,
            )
            for attr in pe.attributes:
                self.vector_db.insert_attribute(
                    attr_id=attr.attr_id,
                    name=attr.name,
                    description=attr.description,
                    db=pe_db,
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
                db=preset_db,
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
