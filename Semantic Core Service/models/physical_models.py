from dataclasses import dataclass
from typing import List, Optional

@dataclass
class PhysicalColumn:
    """物理字段模型"""
    column_id: str  # 系统.表.字段
    table_name: str
    column_name: str
    data_type: str
    is_primary_key: bool = False
    description: Optional[str] = None

@dataclass
class PhysicalTable:
    """物理表模型"""
    table_id: str  # 系统.表
    db_name: str
    table_name: str
    columns: List[PhysicalColumn]
    description: Optional[str] = None
