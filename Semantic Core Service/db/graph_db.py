"""
Kuzu GraphDB — dual-schema support.

On init, reads ``mapping_type`` from the active config and creates the
appropriate schema:
  - "er"  : BizEntity / BizAttribute / HAS_ATTRIBUTE / RELATED_TO
  - "dlr" : PhysicalEntity / LogicalEntity / LogicalAttribute / PhysicalAttribute
           + HAS_ATTRIBUTE / RELATED_TO / INHERITS / HAS_LOGICAL_ATTRIBUTE
           / LOGICALLY_RELATED_TO / PAS_RELATED_TO

Each scenario gets its own Kuzu directory (via scenario_storage()), so schemas
never collide. The singleton pattern is preserved but keyed by db_path to
allow multiple instances in tests.
"""
import json
import os
from pathlib import Path

import kuzu
from typing import Dict, List, Any, Optional

from utils.logger import logger
from config import KUZU_DB_PATH


class GraphDB:
    """Kuzu graph database wrapper — supports ER and DLR schemas."""

    _instances: Dict[str, "GraphDB"] = {}

    def __new__(cls, db_path: str = str(KUZU_DB_PATH), mapping_type: str = "er"):
        key = f"{db_path}::{mapping_type}"
        if key not in cls._instances:
            instance = super().__new__(cls)
            cls._instances[key] = instance
        return cls._instances[key]

    def __init__(self, db_path: str = str(KUZU_DB_PATH), mapping_type: str = "er"):
        if hasattr(self, 'conn') and self.conn is not None:
            return
        # Kuzu 0.11+ requires a file path, not a directory.
        # If db_path points to a directory, append a filename.
        self.db_path = db_path
        self.mapping_type = mapping_type
        self.conn = None
        self._init_db()

    def _init_db(self):
        """Initialize Kuzu connection and create schema."""
        try:
            # Kuzu 0.11+ requires a file path. Resolve:
            #   - if db_path is an existing file → use as-is (with .db suffix)
            #   - if db_path is a directory or has no suffix → append /kuzu.db
            #   - otherwise → treat as file path
            db_path = Path(self.db_path)
            if db_path.is_file():
                self._kuzu_file = str(db_path)
            elif db_path.is_dir() or db_path.suffix == '' or str(db_path).endswith(os.sep):
                db_path.mkdir(parents=True, exist_ok=True)
                db_path = db_path / "kuzu.db"
                self._kuzu_file = str(db_path)
            else:
                db_path = db_path.with_suffix('.db')
                db_path.parent.mkdir(parents=True, exist_ok=True)
                self._kuzu_file = str(db_path)

            logger.info(f"[GraphDB] 初始化: file={self._kuzu_file}, type={self.mapping_type}")
            self.db = kuzu.Database(self._kuzu_file)
            self.conn = kuzu.Connection(self.db)
            if self.mapping_type == "dlr":
                self._create_dlr_schema()
            else:
                self._create_er_schema()
            logger.info("[GraphDB] 初始化成功")
        except Exception as e:
            logger.error(f"[GraphDB] 初始化失败: {e}")
            raise

    # ===================================================================
    # Schema creation
    # ===================================================================

    def _create_er_schema(self):
        """Create ER (Entity-Relation) schema."""
        self.conn.execute("""
            CREATE NODE TABLE IF NOT EXISTS BizEntity (
                entity_id STRING PRIMARY KEY,
                name STRING,
                description STRING,
                physical_table_id STRING,
                database_url STRING
            )
        """)
        self.conn.execute("""
            CREATE NODE TABLE IF NOT EXISTS BizAttribute (
                attr_id STRING PRIMARY KEY,
                name STRING,
                description STRING,
                physical_column_id STRING,
                data_type STRING
            )
        """)
        self.conn.execute("""
            CREATE REL TABLE IF NOT EXISTS HAS_ATTRIBUTE (
                FROM BizEntity TO BizAttribute
            )
        """)
        self.conn.execute("""
            CREATE REL TABLE IF NOT EXISTS RELATED_TO (
                FROM BizEntity TO BizEntity,
                relation_id STRING,
                name STRING,
                description STRING,
                from_entity_attr_id STRING,
                to_entity_attr_id STRING
            )
        """)

    def _create_dlr_schema(self):
        """Create DLR (Logical-Physical Dual Layer) schema."""
        # Physical layer
        self.conn.execute("""
            CREATE NODE TABLE IF NOT EXISTS PhysicalEntity (
                physical_entity_id STRING PRIMARY KEY,
                name STRING,
                description STRING,
                physical_table_id STRING,
                arcs_a_anchor STRING,
                arcs_r_row STRING,
                arcs_c_column STRING,
                arcs_s_semantic4arcs STRING
            )
        """)
        self.conn.execute("""
            CREATE NODE TABLE IF NOT EXISTS PhysicalAttribute (
                attr_id STRING PRIMARY KEY,
                name STRING,
                description STRING,
                physical_column_id STRING,
                data_type STRING
            )
        """)
        self.conn.execute("""
            CREATE REL TABLE IF NOT EXISTS HAS_ATTRIBUTE (
                FROM PhysicalEntity TO PhysicalAttribute
            )
        """)
        self.conn.execute("""
            CREATE REL TABLE IF NOT EXISTS RELATED_TO (
                FROM PhysicalEntity TO PhysicalEntity,
                relation_id STRING,
                name STRING,
                description STRING,
                from_entity_attr_id STRING,
                to_entity_attr_id STRING
            )
        """)

        # Logical layer
        self.conn.execute("""
            CREATE NODE TABLE IF NOT EXISTS LogicalEntity (
                logical_entity_id STRING PRIMARY KEY,
                name STRING,
                description STRING
            )
        """)
        self.conn.execute("""
            CREATE NODE TABLE IF NOT EXISTS LogicalAttribute (
                attr_id STRING PRIMARY KEY,
                name STRING,
                description STRING
            )
        """)
        self.conn.execute("""
            CREATE REL TABLE IF NOT EXISTS HAS_LOGICAL_ATTRIBUTE (
                FROM LogicalEntity TO LogicalAttribute
            )
        """)
        self.conn.execute("""
            CREATE REL TABLE IF NOT EXISTS INHERITS (
                FROM PhysicalEntity TO LogicalEntity
            )
        """)
        self.conn.execute("""
            CREATE REL TABLE IF NOT EXISTS LOGICALLY_RELATED_TO (
                FROM LogicalEntity TO LogicalEntity,
                relation_id STRING,
                name STRING,
                description STRING,
                from_attr_id STRING,
                to_attr_id STRING
            )
        """)
        self.conn.execute("""
            CREATE REL TABLE IF NOT EXISTS PAS_RELATED_TO (
                FROM LogicalEntity TO LogicalEntity,
                relation_id STRING,
                relation_name STRING,
                forward_verb STRING,
                forward_cardinality STRING,
                reverse_verb STRING,
                reverse_cardinality STRING,
                A_attribute STRING,
                S_semantic4pas STRING
            )
        """)

    # ===================================================================
    # ER write methods
    # ===================================================================

    def create_entity_node(self, entity_id: str, name: str,
                           description: Optional[str] = None,
                           physical_table_id: Optional[str] = None,
                           database_url: Optional[str] = None) -> bool:
        """Create a BizEntity node (ER)."""
        try:
            result = self.conn.execute("""
                MERGE (e:BizEntity {entity_id: $entity_id})
                SET e.name = $name,
                    e.description = $description,
                    e.physical_table_id = $physical_table_id,
                    e.database_url = $database_url
                RETURN e.entity_id
            """, parameters={
                "entity_id": entity_id, "name": name,
                "description": description, "physical_table_id": physical_table_id,
                "database_url": database_url,
            })
            success = result.has_next()
            if success:
                logger.info(f"[GraphDB] 创建实体: {entity_id} - {name}")
            return success
        except Exception as e:
            logger.error(f"[GraphDB] 创建实体失败 {entity_id}: {e}")
            return False

    def create_attribute_node(self, attr_id: str, name: str,
                              description: Optional[str] = None,
                              physical_column_id: Optional[str] = None,
                              data_type: Optional[str] = None) -> bool:
        """Create a BizAttribute node (ER)."""
        try:
            result = self.conn.execute("""
                MERGE (a:BizAttribute {attr_id: $attr_id})
                SET a.name = $name,
                    a.description = $description,
                    a.physical_column_id = $physical_column_id,
                    a.data_type = $data_type
                RETURN a.attr_id
            """, parameters={
                "attr_id": attr_id, "name": name,
                "description": description,
                "physical_column_id": physical_column_id,
                "data_type": data_type,
            })
            success = result.has_next()
            if success:
                logger.info(f"[GraphDB] 创建属性: {attr_id} - {name}")
            return success
        except Exception as e:
            logger.error(f"[GraphDB] 创建属性失败 {attr_id}: {e}")
            return False

    def create_entity_attribute_relation(self, entity_id: str, attr_id: str) -> bool:
        """Create HAS_ATTRIBUTE relation (ER)."""
        try:
            result = self.conn.execute("""
                MATCH (e:BizEntity {entity_id: $entity_id}),
                      (a:BizAttribute {attr_id: $attr_id})
                MERGE (e)-[r:HAS_ATTRIBUTE]->(a)
                RETURN r
            """, parameters={"entity_id": entity_id, "attr_id": attr_id})
            success = result.has_next()
            if success:
                logger.info(f"[GraphDB] 创建实体-属性关系: {entity_id} -> {attr_id}")
            return success
        except Exception as e:
            logger.error(f"[GraphDB] 创建实体属性关系失败: {e}")
            return False

    def create_entity_relation(self, from_entity_id: str, to_entity_id: str,
                               relation_id: str, name: str,
                               description: Optional[str] = None,
                               from_entity_attr_id: Optional[str] = None,
                               to_entity_attr_id: Optional[str] = None) -> bool:
        """Create RELATED_TO relation between BizEntities (ER)."""
        try:
            result = self.conn.execute("""
                MATCH (e1:BizEntity {entity_id: $from_id}),
                      (e2:BizEntity {entity_id: $to_id})
                MERGE (e1)-[r:RELATED_TO {
                    relation_id: $relation_id,
                    name: $name,
                    description: $description,
                    from_entity_attr_id: $from_entity_attr_id,
                    to_entity_attr_id: $to_entity_attr_id
                }]->(e2)
                RETURN r
            """, parameters={
                "from_id": from_entity_id, "to_id": to_entity_id,
                "relation_id": relation_id, "name": name,
                "description": description,
                "from_entity_attr_id": from_entity_attr_id,
                "to_entity_attr_id": to_entity_attr_id,
            })
            success = result.has_next()
            if success:
                logger.info(f"[GraphDB] 创建实体关系: {from_entity_id} -> {to_entity_id} [{name}]")
            return success
        except Exception as e:
            logger.error(f"[GraphDB] 创建实体关系失败: {e}")
            return False

    # ===================================================================
    # DLR write methods
    # ===================================================================

    def create_physical_entity_node(self, physical_entity_id: str, name: str,
                                    description: Optional[str] = None,
                                    physical_table_id: Optional[str] = None,
                                    arcs_a: Optional[str] = None,
                                    arcs_r: Optional[str] = None,
                                    arcs_c: Optional[str] = None,
                                    arcs_s: Optional[str] = None) -> bool:
        """Create a PhysicalEntity node (DLR)."""
        try:
            result = self.conn.execute("""
                MERGE (e:PhysicalEntity {physical_entity_id: $id})
                SET e.name = $name,
                    e.description = $description,
                    e.physical_table_id = $physical_table_id,
                    e.arcs_a_anchor = $arcs_a,
                    e.arcs_r_row = $arcs_r,
                    e.arcs_c_column = $arcs_c,
                    e.arcs_s_semantic4arcs = $arcs_s
                RETURN e.physical_entity_id
            """, parameters={
                "id": physical_entity_id, "name": name,
                "description": description, "physical_table_id": physical_table_id,
                "arcs_a": arcs_a, "arcs_r": arcs_r,
                "arcs_c": arcs_c, "arcs_s": arcs_s,
            })
            success = result.has_next()
            if success:
                logger.info(f"[GraphDB] 创建物理实体: {physical_entity_id} - {name}")
            return success
        except Exception as e:
            logger.error(f"[GraphDB] 创建物理实体失败 {physical_entity_id}: {e}")
            return False

    def create_logical_entity_node(self, logical_entity_id: str, name: str,
                                   description: Optional[str] = None) -> bool:
        """Create a LogicalEntity node (DLR)."""
        try:
            result = self.conn.execute("""
                MERGE (le:LogicalEntity {logical_entity_id: $id})
                SET le.name = $name,
                    le.description = $description
                RETURN le.logical_entity_id
            """, parameters={"id": logical_entity_id, "name": name,
                             "description": description})
            success = result.has_next()
            if success:
                logger.info(f"[GraphDB] 创建逻辑实体: {logical_entity_id} - {name}")
            return success
        except Exception as e:
            logger.error(f"[GraphDB] 创建逻辑实体失败 {logical_entity_id}: {e}")
            return False

    def create_logical_attribute_node(self, attr_id: str, name: str,
                                      description: Optional[str] = None) -> bool:
        """Create a LogicalAttribute node (DLR)."""
        try:
            result = self.conn.execute("""
                MERGE (la:LogicalAttribute {attr_id: $id})
                SET la.name = $name,
                    la.description = $description
                RETURN la.attr_id
            """, parameters={"id": attr_id, "name": name,
                             "description": description})
            success = result.has_next()
            if success:
                logger.info(f"[GraphDB] 创建逻辑属性: {attr_id} - {name}")
            return success
        except Exception as e:
            logger.error(f"[GraphDB] 创建逻辑属性失败 {attr_id}: {e}")
            return False

    def create_logical_entity_attribute_relation(self, logical_entity_id: str,
                                                 attr_id: str) -> bool:
        """Create HAS_LOGICAL_ATTRIBUTE relation (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (le:LogicalEntity {logical_entity_id: $le_id}),
                      (la:LogicalAttribute {attr_id: $attr_id})
                MERGE (le)-[r:HAS_LOGICAL_ATTRIBUTE]->(la)
                RETURN r
            """, parameters={"le_id": logical_entity_id, "attr_id": attr_id})
            success = result.has_next()
            if success:
                logger.info(f"[GraphDB] 创建逻辑实体-属性关系: {logical_entity_id} -> {attr_id}")
            return success
        except Exception as e:
            logger.error(f"[GraphDB] 创建逻辑实体属性关系失败: {e}")
            return False

    def create_inherits_relation(self, physical_entity_id: str,
                                 logical_entity_id: str) -> bool:
        """Create INHERITS relation: PhysicalEntity → LogicalEntity (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (e:PhysicalEntity {physical_entity_id: $pe_id}),
                      (le:LogicalEntity {logical_entity_id: $le_id})
                MERGE (e)-[r:INHERITS]->(le)
                RETURN r
            """, parameters={"pe_id": physical_entity_id, "le_id": logical_entity_id})
            success = result.has_next()
            if success:
                logger.info(f"[GraphDB] 创建继承关系: {physical_entity_id} -[INHERITS]-> {logical_entity_id}")
            return success
        except Exception as e:
            logger.error(f"[GraphDB] 创建继承关系失败: {e}")
            return False

    def create_pas_relation(self, from_le_id: str, to_le_id: str,
                            relation_id: str, relation_name: str,
                            forward_verb: str, forward_cardinality: str,
                            reverse_verb: str, reverse_cardinality: str,
                            a_attribute: str, s_semantic: str) -> bool:
        """Create PAS_RELATED_TO relation between LogicalEntities (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (le1:LogicalEntity {logical_entity_id: $from_id}),
                      (le2:LogicalEntity {logical_entity_id: $to_id})
                MERGE (le1)-[r:PAS_RELATED_TO {
                    relation_id: $relation_id,
                    relation_name: $relation_name,
                    forward_verb: $forward_verb,
                    forward_cardinality: $forward_cardinality,
                    reverse_verb: $reverse_verb,
                    reverse_cardinality: $reverse_cardinality,
                    A_attribute: $a_attribute,
                    S_semantic4pas: $s_semantic
                }]->(le2)
                RETURN r
            """, parameters={
                "from_id": from_le_id, "to_id": to_le_id,
                "relation_id": relation_id, "relation_name": relation_name,
                "forward_verb": forward_verb, "forward_cardinality": forward_cardinality,
                "reverse_verb": reverse_verb, "reverse_cardinality": reverse_cardinality,
                "a_attribute": a_attribute, "s_semantic": s_semantic,
            })
            success = result.has_next()
            if success:
                logger.info(f"[GraphDB] 创建PAS关系: {from_le_id} -> {to_le_id} [{forward_verb}/{reverse_verb}]")
            return success
        except Exception as e:
            logger.error(f"[GraphDB] 创建PAS关系失败: {e}")
            return False

    # ===================================================================
    # ER query methods
    # ===================================================================

    def get_entity_by_id(self, entity_id: str) -> Optional[Dict[str, Any]]:
        """Query BizEntity by ID (ER)."""
        try:
            result = self.conn.execute("""
                MATCH (e:BizEntity {entity_id: $id})
                RETURN e.entity_id, e.name, e.description, e.physical_table_id, e.database_url
            """, parameters={"id": entity_id})
            if result.has_next():
                row = result.get_next()
                return {
                    "entity_id": row[0], "name": row[1],
                    "description": row[2], "source_table": row[3],
                    "database_url": row[4] if row[4] else "",
                }
            return None
        except Exception as e:
            logger.error(f"[GraphDB] 查询实体失败 {entity_id}: {e}")
            return None

    def get_entity_attributes_list(self, entity_id: str) -> List[Dict[str, Any]]:
        """Query BizAttributes for a BizEntity (ER)."""
        try:
            result = self.conn.execute("""
                MATCH (e:BizEntity {entity_id: $id})-[:HAS_ATTRIBUTE]->(a:BizAttribute)
                RETURN a.name, a.description, a.data_type, a.physical_column_id
            """, parameters={"id": entity_id})
            return [
                {"name": r[0], "description": r[1], "data_type": r[2], "physical_column_id": r[3]}
                for r in result.get_all()
            ]
        except Exception as e:
            logger.error(f"[GraphDB] 查询属性失败 {entity_id}: {e}")
            return []

    def get_entity_attributes_with_physical(self, entity_id: str) -> Dict[str, Any]:
        """Query BizAttributes with physical mapping (ER)."""
        try:
            result = self.conn.execute("""
                MATCH (e:BizEntity {entity_id: $id})-[:HAS_ATTRIBUTE]->(a:BizAttribute)
                RETURN a.name, a.description, a.data_type, a.physical_column_id
            """, parameters={"id": entity_id})
            return {
                r[0]: {"physical_column": r[3], "data_type": r[2]}
                for r in result.get_all()
            }
        except Exception as e:
            logger.error(f"[GraphDB] 查询属性物理映射失败 {entity_id}: {e}")
            return {}

    def get_entity_relations(self, entity_id: str) -> List[Dict[str, Any]]:
        """Query all relations for a BizEntity (ER)."""
        try:
            query_out = """
                MATCH (e:BizEntity {entity_id: $id})-[r:RELATED_TO]->(t:BizEntity)
                RETURN r.relation_id, r.name, r.description,
                       t.entity_id, t.name,
                       r.from_entity_attr_id, r.to_entity_attr_id, 'out'
            """
            query_in = """
                MATCH (e:BizEntity {entity_id: $id})<-[r:RELATED_TO]-(s:BizEntity)
                RETURN r.relation_id, r.name, r.description,
                       s.entity_id, s.name,
                       r.from_entity_attr_id, r.to_entity_attr_id, 'in'
            """
            relations = []
            for q in (query_out, query_in):
                result = self.conn.execute(q, parameters={"id": entity_id})
                for r in result.get_all():
                    rel = {
                        "relation_id": r[0], "name": r[1], "description": r[2],
                        "from_entity_attr_id": r[5], "to_entity_attr_id": r[6],
                        "direction": r[7],
                    }
                    if r[7] == 'out':
                        rel["target_entity_id"] = r[3]
                        rel["target_name"] = r[4]
                    else:
                        rel["source_entity_id"] = r[3]
                        rel["source_name"] = r[4]
                    relations.append(rel)
            return relations
        except Exception as e:
            logger.error(f"[GraphDB] 查询关系失败 {entity_id}: {e}")
            return []

    def get_all_entities(self) -> List[Dict[str, Any]]:
        """List all BizEntities (ER) or PhysicalEntities (DLR)."""
        try:
            if self.mapping_type == "dlr":
                table = "PhysicalEntity"
                id_col = "physical_entity_id"
            else:
                table = "BizEntity"
                id_col = "entity_id"

            result = self.conn.execute(f"""
                MATCH (e:{table})
                RETURN e.{id_col}, e.name, e.physical_table_id, e.description, labels(e)
            """)
            entities = []
            for r in result.get_all():
                entities.append({
                    "entity_id": r[0], "name": r[1],
                    "source_table": r[2], "description": r[3],
                    "type": r[4][0] if r[4] else table,
                })
            return entities
        except Exception as e:
            logger.error(f"[GraphDB] 查询所有实体失败: {e}")
            return []

    def get_all_relations(self) -> List[Dict[str, Any]]:
        """List all relations (ER or DLR)."""
        try:
            if self.mapping_type == "dlr":
                table = "PhysicalEntity"
            else:
                table = "BizEntity"

            result = self.conn.execute(f"""
                MATCH (a:{table})-[r:RELATED_TO]->(b:{table})
                RETURN a.{'physical_entity_id' if self.mapping_type == 'dlr' else 'entity_id'},
                       b.{'physical_entity_id' if self.mapping_type == 'dlr' else 'entity_id'},
                       r.name, r.relation_id,
                       r.from_entity_attr_id, r.to_entity_attr_id, r.description
            """)
            relations = []
            for r in result.get_all():
                relations.append({
                    "from": r[0], "to": r[1], "relation_name": r[2],
                    "relation_id": r[3],
                    "from_entity_attr_id": r[4], "to_entity_attr_id": r[5],
                    "description": r[6],
                })
            return relations
        except Exception as e:
            logger.error(f"[GraphDB] 查询所有关系失败: {e}")
            return []

    def find_shortest_path(self, from_id: str, to_id: str) -> Dict[str, Any]:
        """Find shortest path between two entities (ER)."""
        try:
            query = """
                MATCH path = (e1:BizEntity {entity_id: $from_id})-[:RELATED_TO*1..10]-(e2:BizEntity {entity_id: $to_id})
                RETURN nodes(path), relationships(path), length(path)
                ORDER BY path_len ASC
                LIMIT 1
            """
            result = self.conn.execute(query, parameters={
                "from_id": from_id, "to_id": to_id,
            })
            if result.has_next():
                row = result.get_next()
                nodes_data, rels_data, path_len = row[0], row[1], row[2]
                return {
                    "success": True,
                    "from_entity_id": from_id,
                    "to_entity_id": to_id,
                    "path_length": path_len,
                    "nodes": [{"entity_id": n.get("entity_id"), "name": n.get("name")} for n in nodes_data],
                    "relations": [{"relation_id": r.get("relation_id"), "name": r.get("name")} for r in rels_data],
                }
            return {"success": False, "message": "未找到路径",
                    "from_entity_id": from_id, "to_entity_id": to_id}
        except Exception as e:
            logger.error(f"[GraphDB] 路径查询失败: {e}")
            return {"success": False, "message": str(e),
                    "from_entity_id": from_id, "to_entity_id": to_id}

    # ===================================================================
    # DLR query methods
    # ===================================================================

    def get_all_logical_entities(self) -> List[Dict[str, Any]]:
        """List all LogicalEntities (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (le:LogicalEntity)
                RETURN le.logical_entity_id, le.name, le.description
            """)
            return [
                {"logical_entity_id": r[0], "name": r[1], "description": r[2]}
                for r in result.get_all()
            ]
        except Exception as e:
            logger.error(f"[GraphDB] 查询逻辑实体失败: {e}")
            return []

    def get_logical_entity_by_id(self, le_id: str) -> Optional[Dict[str, Any]]:
        """Query LogicalEntity by ID (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (le:LogicalEntity {logical_entity_id: $id})
                RETURN le.logical_entity_id, le.name, le.description
            """, parameters={"id": le_id})
            if result.has_next():
                r = result.get_next()
                return {"logical_entity_id": r[0], "name": r[1], "description": r[2]}
            return None
        except Exception as e:
            logger.error(f"[GraphDB] 查询逻辑实体失败 {le_id}: {e}")
            return None

    def get_logical_entity_attributes(self, le_id: str) -> List[Dict[str, Any]]:
        """Query LogicalAttributes for a LogicalEntity (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (le:LogicalEntity {logical_entity_id: $id})-[:HAS_LOGICAL_ATTRIBUTE]->(la:LogicalAttribute)
                RETURN la.attr_id, la.name, la.description
            """, parameters={"id": le_id})
            return [
                {"attr_id": r[0], "name": r[1], "description": r[2]}
                for r in result.get_all()
            ]
        except Exception as e:
            logger.error(f"[GraphDB] 查询逻辑属性失败 {le_id}: {e}")
            return []

    def get_physical_entity_by_id(self, pe_id: str) -> Optional[Dict[str, Any]]:
        """Query PhysicalEntity by ID (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (pe:PhysicalEntity {physical_entity_id: $id})
                RETURN pe.physical_entity_id, pe.name, pe.description, pe.physical_table_id
            """, parameters={"id": pe_id})
            if result.has_next():
                row = result.get_next()
                return {
                    "physical_entity_id": row[0], "name": row[1],
                    "description": row[2], "physical_table_id": row[3],
                }
            return None
        except Exception as e:
            logger.error(f"[GraphDB] 查询物理实体失败 {pe_id}: {e}")
            return None

    def get_physical_entity_attributes(self, pe_id: str) -> List[Dict[str, Any]]:
        """Query PhysicalAttributes for a PhysicalEntity (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (pe:PhysicalEntity {physical_entity_id: $id})-[:HAS_ATTRIBUTE]->(a:PhysicalAttribute)
                RETURN a.attr_id, a.name, a.description, a.physical_column_id, a.data_type
            """, parameters={"id": pe_id})
            return [
                {"attr_id": r[0], "name": r[1], "description": r[2],
                 "physical_column_id": r[3], "data_type": r[4]}
                for r in result.get_all()
            ]
        except Exception as e:
            logger.error(f"[GraphDB] 查询物理属性失败 {pe_id}: {e}")
            return []

    def get_child_entity_ids(self, le_id: str) -> List[str]:
        """Get child PhysicalEntity IDs for a LogicalEntity (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (e:PhysicalEntity)-[:INHERITS]->(le:LogicalEntity {logical_entity_id: $id})
                RETURN e.physical_entity_id
            """, parameters={"id": le_id})
            return [r[0] for r in result.get_all()]
        except Exception as e:
            logger.error(f"[GraphDB] 查询子实体失败 {le_id}: {e}")
            return []

    def get_all_pas_relations(self) -> List[Dict[str, Any]]:
        """List all PAS relations (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (le1:LogicalEntity)-[r:PAS_RELATED_TO]->(le2:LogicalEntity)
                RETURN r.relation_id, r.relation_name,
                       le1.logical_entity_id, le2.logical_entity_id,
                       r.forward_verb, r.forward_cardinality,
                       r.reverse_verb, r.reverse_cardinality,
                       r.A_attribute, r.S_semantic4pas
            """)
            return [
                {
                    "relation_id": r[0], "relation_name": r[1],
                    "from_le_id": r[2], "to_le_id": r[3],
                    "forward_verb": r[4], "forward_cardinality": r[5],
                    "reverse_verb": r[6], "reverse_cardinality": r[7],
                    "A_attribute": r[8], "S_semantic4pas": r[9],
                }
                for r in result.get_all()
            ]
        except Exception as e:
            logger.error(f"[GraphDB] 查询PAS关系失败: {e}")
            return []

    def get_pas_relations_for_le(self, le_id: str) -> List[Dict[str, Any]]:
        """Get all PAS relations involving a specific LE (DLR)."""
        try:
            result = self.conn.execute("""
                MATCH (le:LogicalEntity {logical_entity_id: $id})-[r:PAS_RELATED_TO]-(other:LogicalEntity)
                RETURN r.relation_id, r.relation_name,
                       le.logical_entity_id, other.logical_entity_id,
                       r.forward_verb, r.forward_cardinality,
                       r.reverse_verb, r.reverse_cardinality,
                       r.A_attribute, r.S_semantic4pas
            """, parameters={"id": le_id})
            return [
                {
                    "relation_id": r[0], "relation_name": r[1],
                    "from_le_id": r[2], "to_le_id": r[3],
                    "forward_verb": r[4], "forward_cardinality": r[5],
                    "reverse_verb": r[6], "reverse_cardinality": r[7],
                    "A_attribute": r[8], "S_semantic4pas": r[9],
                }
                for r in result.get_all()
            ]
        except Exception as e:
            logger.error(f"[GraphDB] 查询LE的PAS关系失败 {le_id}: {e}")
            return []

    def find_le_shortest_path(self, from_le_id: str, to_le_id: str) -> Dict[str, Any]:
        """Find shortest PAS path between two LogicalEntities (DLR)."""
        try:
            query = """
                MATCH path = (le1:LogicalEntity {logical_entity_id: $from_id})-[:PAS_RELATED_TO*1..10]-(le2:LogicalEntity {logical_entity_id: $to_id})
                RETURN nodes(path), relationships(path), length(path)
                ORDER BY path_len ASC
                LIMIT 1
            """
            result = self.conn.execute(query, parameters={
                "from_id": from_le_id, "to_id": to_le_id,
            })
            if result.has_next():
                row = result.get_next()
                nodes_data, rels_data, path_len = row[0], row[1], row[2]
                return {
                    "success": True,
                    "from_entity_id": from_le_id,
                    "to_entity_id": to_le_id,
                    "path_length": path_len,
                    "nodes": [{"logical_entity_id": n.get("logical_entity_id"), "name": n.get("name")} for n in nodes_data],
                    "relations": [
                        {
                            "relation_id": r.get("relation_id"),
                            "relation_name": r.get("relation_name"),
                            "forward_verb": r.get("forward_verb"),
                            "reverse_verb": r.get("reverse_verb"),
                            "A_attribute": r.get("A_attribute"),
                            "S_semantic4pas": r.get("S_semantic4pas"),
                        }
                        for r in rels_data
                    ],
                }
            return {"success": False, "message": "未找到路径",
                    "from_entity_id": from_le_id, "to_entity_id": to_le_id}
        except Exception as e:
            logger.error(f"[GraphDB] LE路径查询失败: {e}")
            return {"success": False, "message": str(e),
                    "from_entity_id": from_le_id, "to_entity_id": to_le_id}

    # ===================================================================
    # Maintenance
    # ===================================================================

    def clear(self):
        """Clear all data (both schemas if present)."""
        try:
            # Try ER tables
            for rel in ["RELATED_TO", "HAS_ATTRIBUTE"]:
                try:
                    self.conn.execute(f"MATCH (a:{'BizEntity' if self.mapping_type == 'er' else 'PhysicalEntity'})-[r:{rel}]->(b) DELETE r")
                except Exception:
                    pass
            for label in ["BizEntity", "BizAttribute", "PhysicalEntity", "PhysicalAttribute",
                          "LogicalEntity", "LogicalAttribute"]:
                try:
                    self.conn.execute(f"MATCH (n:{label}) DELETE n")
                except Exception:
                    pass
            logger.info("[GraphDB] 已清空")
            return True
        except Exception as e:
            logger.error(f"[GraphDB] 清空失败: {e}")
            return False

    def close(self):
        """Close connection and remove from singleton cache."""
        if self.conn:
            self.conn = None
            self.db = None
            key = f"{self.db_path}::{self.mapping_type}"
            GraphDB._instances.pop(key, None)
            logger.info("[GraphDB] 连接已关闭")
