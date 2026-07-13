from typing import List, Dict, Any, Tuple
from models.physical_models import PhysicalTable
from models.semantic_models import BizEntity, BizAttribute, BizRelation
from utils.logger import logger

class SemanticMapper:
    """语义映射转换器"""

    @staticmethod
    def map(physical_tables: List[PhysicalTable], config: Dict[str, Any]) -> Tuple[List[BizEntity], List[BizRelation]]:
        """将物理结构和配置映射为业务语义对象"""
        # 先构建物理表ID到物理表的映射
        physical_table_map: Dict[str, PhysicalTable] = {
            table.table_id: table for table in physical_tables
        }
        # 构建物理字段ID到物理字段的映射
        physical_column_map: Dict[str, Any] = {}
        for table in physical_tables:
            for column in table.columns:
                physical_column_map[column.column_id] = column

        biz_entities: List[BizEntity] = []
        biz_relations: List[BizRelation] = []

        # 处理实体
        for entity_config in config.get("entities", []):
            entity_id = entity_config.get("entity_id")
            biz_name = entity_config.get("biz_name")
            if not entity_id or not biz_name:
                logger.warning(f"跳过无效实体配置: {entity_config}")
                continue

            physical_table_id = entity_config.get("physical_table_id")
            physical_table = physical_table_map.get(physical_table_id) if physical_table_id else None

            # 处理属性
            biz_attributes = []
            for attr_config in entity_config.get("attributes", []):
                attr_id = attr_config.get("attr_id")
                attr_biz_name = attr_config.get("biz_name")
                if not attr_id or not attr_biz_name:
                    logger.warning(f"跳过无效属性配置: {attr_config}")
                    continue

                physical_column_id = attr_config.get("physical_column_id")
                physical_column = physical_column_map.get(physical_column_id) if physical_column_id else None

                biz_attr = BizAttribute(
                    attr_id=attr_id,
                    name=attr_biz_name,
                    description=attr_config.get("description", ""),
                    physical_column_id=physical_column_id,
                    data_type=physical_column.data_type if physical_column else None
                )
                biz_attributes.append(biz_attr)

            biz_entity = BizEntity(
                entity_id=entity_id,
                name=biz_name,
                description=entity_config.get("description", ""),
                physical_table_id=physical_table_id,
                attributes=biz_attributes
            )
            biz_entities.append(biz_entity)
            logger.info(f"映射生成业务实体: {entity_id} - {biz_name}")

        # 处理关系
        for relation_config in config.get("relations", []):
            relation_id = relation_config.get("relation_id")
            relation_biz_name = relation_config.get("biz_name")
            from_entity_attr_id = relation_config.get("from_entity_attr_id")
            to_entity_attr_id = relation_config.get("to_entity_attr_id")
            if not all([relation_id, relation_biz_name, from_entity_attr_id, to_entity_attr_id]):
                logger.warning(f"跳过无效关系配置: {relation_config}")
                continue

            biz_relation = BizRelation(
                relation_id=relation_id,
                biz_name=relation_biz_name,
                from_entity_attr_id=from_entity_attr_id,
                to_entity_attr_id=to_entity_attr_id,
                description=relation_config.get("description", "")
            )
            biz_relations.append(biz_relation)
            logger.info(f"映射生成业务关系: {from_entity_attr_id} -> {to_entity_attr_id} [{relation_biz_name}]")

        logger.info(f"语义映射完成: 生成 {len(biz_entities)} 个业务实体, {len(biz_relations)} 个业务关系")
        return biz_entities, biz_relations
