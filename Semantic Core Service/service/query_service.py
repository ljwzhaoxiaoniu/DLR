"""
QueryService — semantic query dispatcher.

Supports two query paradigms:
  - "er"  : vector recall → entity-first → graph expand → structured result
  - "dlr" : vector recall → LE/PE/PAS routing → ARCS-based physical mapping

The active paradigm is determined by ``mapping_type`` passed to __init__
(or read from the active config).
"""
from typing import Any, Dict, List, Optional

from db.graph_db import GraphDB
from db.vector_db import VectorDB
from config import CONFIDENCE_THRESHOLD, extract_entity_id
from utils.logger import logger


class QueryService:
    """Semantic query service — ER + DLR dual support."""

    def __init__(self, mapping_type: str = "er",
                 graph_db: Optional[GraphDB] = None,
                 vector_db: Optional[VectorDB] = None):
        self.mapping_type = mapping_type
        self.graph_db = graph_db or GraphDB(mapping_type=mapping_type)
        self.vector_db = vector_db or VectorDB()

    def query(self, question: str, top_k: int = 20) -> Dict[str, Any]:
        """Execute semantic query. Dispatches to ER or DLR path."""
        if self.mapping_type == "dlr":
            return self._query_dlr(question, top_k)
        return self._query_er(question, top_k)

    # ===================================================================
    # ER query path
    # ===================================================================

    def _query_er(self, question: str, top_k: int = 20) -> Dict[str, Any]:
        """ER query: vector recall → entity-first → graph expand."""
        try:
            logger.info(f"[ER] 查询: {question}")

            search_results = self.vector_db.search(question, top_k=top_k * 3)
            if not search_results:
                return self._empty_result("未找到相关内容")

            # Separate results by type
            entity_results = [r for r in search_results if r["type"] == "entity"]
            attribute_results = [r for r in search_results if r["type"] == "attribute"]
            relation_results = [r for r in search_results if r["type"] == "relation"]

            logger.info(f"[ER] 召回: entity={len(entity_results)}, "
                        f"attr={len(attribute_results)}, rel={len(relation_results)}")

            # Extract entity IDs with scores
            entity_id_to_score: Dict[str, float] = {}
            for res in entity_results:
                eid = res["id"]
                score = res.get("score", 0.0)
                if eid not in entity_id_to_score or score > entity_id_to_score[eid]:
                    entity_id_to_score[eid] = score

            # Infer entities from relations
            for res in relation_results:
                score = res.get("score", 0.0)
                for fid in (res.get("from_entity_id"), res.get("to_entity_id")):
                    if fid and (fid not in entity_id_to_score or score > entity_id_to_score[fid]):
                        entity_id_to_score[fid] = score

            # Infer entities from attributes
            if not entity_id_to_score and attribute_results:
                for res in attribute_results:
                    eid = extract_entity_id(res["id"])
                    score = res.get("score", 0.0)
                    if eid not in entity_id_to_score or score > entity_id_to_score[eid]:
                        entity_id_to_score[eid] = score

            if not entity_id_to_score:
                return self._empty_result("未找到相关实体")

            # Graph expansion
            entity_ids = list(entity_id_to_score.keys())
            result_data = self._expand_er(entity_ids, entity_id_to_score)

            max_confidence = max(entity_id_to_score.values())
            if max_confidence < CONFIDENCE_THRESHOLD:
                return self._empty_result("未找到高度相关的内容", confidence=max_confidence)

            return {
                "success": True,
                "message": "查询成功",
                "confidence": max_confidence,
                "data": result_data,
            }
        except Exception as e:
            logger.error(f"[ER] 查询失败: {e}")
            return self._empty_result(f"查询失败: {e}")

    def _expand_er(self, entity_ids: List[str],
                   entity_id_to_score: Optional[Dict[str, float]] = None) -> Dict[str, Any]:
        """Expand ER entities with attributes and relations."""
        entities = []
        for eid in entity_ids:
            info = self.graph_db.get_entity_by_id(eid)
            if not info:
                continue
            info["attributes"] = self.graph_db.get_entity_attributes_list(eid)
            info["relations"] = self.graph_db.get_entity_relations(eid)
            if entity_id_to_score and eid in entity_id_to_score:
                info["confidence"] = entity_id_to_score[eid]
            entities.append(info)
        return {"entities": entities}

    # ===================================================================
    # DLR query path
    # ===================================================================

    def _query_dlr(self, question: str, top_k: int = 20) -> Dict[str, Any]:
        """DLR query: vector recall → LE/PE/PAS → ARCS mapping."""
        try:
            logger.info(f"[DLR] 查询: {question}")

            search_results = self.vector_db.search(question, top_k=top_k * 3)
            if not search_results:
                return self._empty_result("未找到相关内容")

            # Separate by type
            le_results = [r for r in search_results if r["type"] == "logical_entity"]
            pe_results = [r for r in search_results if r["type"] == "entity"]
            pas_results = [r for r in search_results if r["type"] == "pas_relation"]

            logger.info(f"[DLR] 召回: LE={len(le_results)}, "
                        f"PE={len(pe_results)}, PAS={len(pas_results)}")

            # Build result
            result_data: Dict[str, Any] = {
                "logical_entities": [],
                "physical_entities": [],
                "pas_relations": [],
            }

            # LE results
            for res in le_results:
                le_id = res["id"]
                le_info = self.graph_db.get_logical_entity_by_id(le_id)
                if le_info:
                    le_info["confidence"] = res.get("score", 0.0)
                    le_info["attributes"] = self.graph_db.get_logical_entity_attributes(le_id)
                    le_info["children"] = self.graph_db.get_child_entity_ids(le_id)
                    result_data["logical_entities"].append(le_info)

            # PE results (DLR: PhysicalEntity, not BizEntity)
            for res in pe_results:
                pe_info = self.graph_db.get_physical_entity_by_id(res["id"])
                if pe_info:
                    pe_info["confidence"] = res.get("score", 0.0)
                    pe_info["attributes"] = self.graph_db.get_physical_entity_attributes(res["id"])
                    result_data["physical_entities"].append(pe_info)

            # PAS results
            for res in pas_results:
                result_data["pas_relations"].append({
                    "relation_id": res["id"],
                    "relation_name": res.get("name", ""),
                    "confidence": res.get("score", 0.0),
                })

            # Calculate max confidence
            all_scores = [r.get("score", 0.0) for r in search_results]
            max_confidence = max(all_scores) if all_scores else 0.0

            if max_confidence < CONFIDENCE_THRESHOLD:
                return self._empty_result("未找到高度相关的内容", confidence=max_confidence)

            return {
                "success": True,
                "message": "查询成功",
                "confidence": max_confidence,
                "data": result_data,
            }
        except Exception as e:
            logger.error(f"[DLR] 查询失败: {e}")
            return self._empty_result(f"查询失败: {e}")

    # ===================================================================
    # Formatting
    # ===================================================================

    def format_result(self, result: Dict[str, Any]) -> str:
        """Format query result as human-readable text."""
        if not result["success"]:
            return f"查询失败: {result['message']}"

        if self.mapping_type == "dlr":
            return self._format_dlr(result)
        return self._format_er(result)

    def _format_er(self, result: Dict[str, Any]) -> str:
        """Format ER result."""
        entities = result["data"].get("entities", [])
        if not entities:
            return "未找到相关信息"

        output = ["### 查询结果\n"]
        for idx, entity in enumerate(entities, 1):
            output.append(f"#### {idx}. {entity['name']} ({entity['entity_id']})")
            if entity.get('description'):
                output.append(f"描述: {entity['description']}\n")

            attributes = entity.get('attributes', [])
            if attributes:
                output.append("**属性列表:**")
                for attr in attributes:
                    output.append(f"- {attr['name']}: {attr.get('description', '无描述')} "
                                  f"(物理字段: {attr['physical_column_id']})")
                output.append("")

            relations = entity.get('relations', [])
            if relations:
                output.append("**关联关系:**")
                for rel in relations:
                    direction = rel.get('direction', 'out')
                    if direction == 'out':
                        rel_str = (f"- {rel['name']} → "
                                   f"{rel.get('target_name', '?')} "
                                   f"({rel.get('target_entity_id', '?')})")
                    else:
                        rel_str = (f"- {rel.get('source_name', '?')} "
                                   f"({rel.get('source_entity_id', '?')}) → "
                                   f"{rel['name']}")
                    output.append(rel_str)
                output.append("")

        return "\n".join(output)

    def _format_dlr(self, result: Dict[str, Any]) -> str:
        """Format DLR result."""
        data = result["data"]
        output = ["### 查询结果 (DLR)\n"]

        les = data.get("logical_entities", [])
        if les:
            output.append("**逻辑实体 (LE):**")
            for le in les:
                output.append(f"- {le['name']} ({le['logical_entity_id']}) "
                              f"[置信度: {le.get('confidence', 0):.4f}]")
                if le.get('description'):
                    output.append(f"  描述: {le['description']}")
                if le.get('children'):
                    output.append(f"  子PE: {', '.join(le['children'])}")
            output.append("")

        pes = data.get("physical_entities", [])
        if pes:
            output.append("**物理实体 (PE):**")
            for pe in pes:
                output.append(f"- {pe['name']} ({pe['entity_id']}) "
                              f"[置信度: {pe.get('confidence', 0):.4f}]")
            output.append("")

        pas = data.get("pas_relations", [])
        if pas:
            output.append("**PAS 语义路由:**")
            for p in pas:
                output.append(f"- {p.get('relation_name', p['relation_id'])} "
                              f"[置信度: {p.get('confidence', 0):.4f}]")
            output.append("")

        return "\n".join(output)

    # ===================================================================
    # Helpers
    # ===================================================================

    @staticmethod
    def _empty_result(message: str, confidence: float = 0.0) -> Dict[str, Any]:
        return {"success": False, "message": message, "data": {}, "confidence": confidence}
