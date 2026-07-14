import yaml
from typing import Dict, Any, Optional
from pathlib import Path
from utils.logger import logger

class ConfigLoader:
    """YAML配置文件加载器"""

    @staticmethod
    def load_config(config_path: Path) -> Optional[Dict[str, Any]]:
        """加载配置文件。

        两类输入:
          - 普通 yaml (ER/DLR/RDF 单文档)
          - 多文档 All-in-One yaml → 返回第一个文档即可, build 命令会逐个文件处理
        """
        try:
            if not config_path.exists():
                logger.error(f"配置文件不存在: {config_path}")
                return None

            with open(config_path, "r", encoding="utf-8") as f:
                # 取第一个 YAML 文档(All-in-One 也是逐个文件单独调用的, 所以 safe_load 第一段没问题)
                config = yaml.safe_load(f)

            logger.info(f"[LOAD] {config_path}")
            logger.info(f"  scenario: {config.get('scenario_name', config.get('database', 'unknown'))}")
            if config.get("mapping_type") == "rdf":
                logger.info(f"  ttl_path: {config.get('ttl_path')}")
            else:
                logger.info(f"  entities={len(config.get('entities', []) or config.get('logical_entities', []))}")
            return config
        except Exception as e:
            logger.error(f"配置文件加载失败: {str(e)}")
            return None
