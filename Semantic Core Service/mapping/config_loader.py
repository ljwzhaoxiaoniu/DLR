import yaml
from typing import Dict, Any, Optional
from pathlib import Path
from utils.logger import logger

class ConfigLoader:
    """YAML配置文件加载器"""

    @staticmethod
    def load_config(config_path: Path) -> Optional[Dict[str, Any]]:
        """加载配置文件"""
        try:
            if not config_path.exists():
                logger.error(f"配置文件不存在: {config_path}")
                return None

            with open(config_path, "r", encoding="utf-8") as f:
                config = yaml.safe_load(f)

            logger.info(f"配置文件加载成功: {config_path}")
            logger.info(f"场景名称: {config.get('scenario_name', '未命名')}")
            logger.info(f"包含 {len(config.get('entities', []))} 个业务实体, {len(config.get('relations', []))} 个业务关系")
            return config
        except Exception as e:
            logger.error(f"配置文件加载失败: {str(e)}")
            return None
