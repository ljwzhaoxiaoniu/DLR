import yaml
from typing import List, Dict
from pathlib import Path
from models.physical_models import PhysicalTable
from utils.logger import logger
from config import SCENARIOS_DIR

class ConfigGenerator:
    """YAML配置模板生成器"""

    def __init__(self, output_dir: Path = SCENARIOS_DIR):
        self.output_dir = output_dir

    def generate_template(self, physical_tables: List[PhysicalTable], template_name: str = "template.yaml") -> Path:
        """生成配置模板"""
        template_path = self.output_dir / template_name

        # 提取数据库前缀，生成 databases 配置
        db_prefixes = set()
        for table in physical_tables:
            if "." in table.table_id:
                prefix = table.table_id.split(".")[0]
                db_prefixes.add(prefix)

        # 构建模板结构
        template = {
            "databases": {},
            "scenario_name": "请填写场景名称",
            "description": "请填写场景描述",
            "entities": [],
            "relations": []
        }

        # 填充 databases 配置
        for prefix in sorted(db_prefixes):
            template["databases"][prefix] = f"sqlite:///storage/sqlite_dbs/{prefix.lower()}.db"

        # 生成实体配置
        for table in physical_tables:
            entity_config = {
                "entity_id": table.table_id,
                "biz_name": "",  # 用户填写业务对象名称，如"变压器"
                "description": "",
                "physical_table_id": table.table_id,
                "attributes": []
            }

            for column in table.columns:
                attr_config = {
                    "attr_id": column.column_id,
                    "biz_name": "",  # 用户填写业务属性名称，如"额定容量"
                    "description": "",
                    "physical_column_id": column.column_id
                }
                entity_config["attributes"].append(attr_config)

            template["entities"].append(entity_config)

        # 生成关系配置示例
        template["relations"].append({
            "relation_id": "示例关系ID",
            "biz_name": "示例关系名称，如'产生线损'",
            "from_entity_attr_id": "来源实体属性ID",
            "to_entity_attr_id": "目标实体属性ID",
            "description": "关系描述"
        })

        # 写入YAML文件
        with open(template_path, "w", encoding="utf-8") as f:
            yaml.dump(template, f, allow_unicode=True, sort_keys=False, indent=2)

        logger.info(f"配置模板已生成: {template_path}")
        return template_path
