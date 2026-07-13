from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any


# ===================================================================
# ER models (Entity-Relation paradigm)
# ===================================================================

@dataclass
class BizAttribute:
    """业务属性模型"""
    attr_id: str
    name: str  # 业务属性名称，如"额定容量"
    description: Optional[str] = None
    physical_column_id: Optional[str] = None  # 关联的物理字段ID
    data_type: Optional[str] = None


@dataclass
class BizRelation:
    """业务关系模型"""
    relation_id: str
    biz_name: str  # 关系业务名称，如"产生线损"
    from_entity_attr_id: str
    to_entity_attr_id: str
    description: Optional[str] = None


@dataclass
class BizEntity:
    """业务对象模型"""
    entity_id: str
    name: str  # 业务对象名称，如"变压器"
    description: Optional[str] = None
    physical_table_id: Optional[str] = None  # 关联的物理表ID
    database_url: Optional[str] = None  # 绝对路径，从 YAML databases 解析
    attributes: List[BizAttribute] = field(default_factory=list)


# ===================================================================
# DLR models (Logical-Physical Dual Layer paradigm)
# ===================================================================

@dataclass
class PhysicalAttribute:
    """物理属性模型 (DLR)"""
    attr_id: str
    name: str
    description: Optional[str] = None
    physical_column_id: Optional[str] = None
    data_type: Optional[str] = None
    value: Optional[Any] = None


@dataclass
class PhysicalRelation:
    """物理关系模型 (DLR, 1.0兼容)"""
    relation_id: str
    biz_name: str
    from_entity_attr_id: str
    to_entity_attr_id: str
    description: Optional[str] = None
    properties: Dict[str, Any] = None

    def __post_init__(self):
        if self.properties is None:
            self.properties = {}


@dataclass
class ARCSSatellite:
    """ARCS 四元组：PE 附着到 LE 的物理触角 (DLR)

    A - Anchor: 锚定（基数逻辑 + 标识键）
    R - Row: 行级过滤（划定集合边界）
    C - Column: 列级映射（逻辑属性→物理字段）
    S - Semantic4arcs: 语义补充（业务语境、枚举翻译、计算公式）
    """
    A_anchor: Dict[str, Any] = field(default_factory=dict)
    R_row: Optional[str] = None
    C_column: Dict[str, str] = field(default_factory=dict)
    S_semantic4arcs: Optional[str] = None


@dataclass
class PhysicalEntity:
    """物理实体模型 (DLR)"""
    physical_entity_id: str
    name: str
    description: Optional[str] = None
    physical_table_id: Optional[str] = None
    attributes: List[PhysicalAttribute] = None
    relations: List[PhysicalRelation] = None
    properties: Dict[str, Any] = None
    arcs: Optional[ARCSSatellite] = None

    def __post_init__(self):
        if self.attributes is None:
            self.attributes = []
        if self.relations is None:
            self.relations = []
        if self.properties is None:
            self.properties = {}


@dataclass
class LogicalAttribute:
    """逻辑属性模型 (DLR) - 仅语义描述，无物理映射"""
    attr_id: str   # e.g. "LOGICAL.变压器.额定容量"
    name: str      # e.g. "额定容量"
    description: Optional[str] = None


@dataclass
class PASPredicate:
    """PAS 中 P 的结构：谓词 + 基数 (DLR)"""
    verb: str
    cardinality: str = "1:N"


@dataclass
class PASRelation:
    """PAS 三元组：逻辑实体间语义路由 (DLR)

    P - Predicate: 谓词关联（方向 + 动词 + 基数）
    A - Attribute: 属性关联（寻址坐标，即 JOIN 锚点）
    S - Semantic4pas: 语义关联（推理补丁）
    """
    relation_id: str
    relation_name: str
    P_predicate: Dict[str, PASPredicate] = field(default_factory=dict)
    A_attribute: str = ""
    S_semantic4pas: str = ""

    def compile_vector_text(self) -> str:
        """编译为向量检索文本"""
        from config import extract_entity_id
        from mapping.base import _extract_le_names_from_id
        from_le, to_le = _extract_le_names_from_id(self.relation_id)

        parts = []
        if "forward" in self.P_predicate:
            fwd = self.P_predicate["forward"]
            parts.append(f"1个{from_le}{fwd.verb}{fwd.cardinality}个{to_le}")
        if "reverse" in self.P_predicate:
            rev = self.P_predicate["reverse"]
            parts.append(f"1个{to_le}{rev.verb}{rev.cardinality}个{from_le}")
        parts.append(f"{from_le}和{to_le}通过{self.A_attribute}关联")
        if self.S_semantic4pas:
            parts.append(self.S_semantic4pas)

        return "；".join(parts)


@dataclass
class LogicalRelation:
    """逻辑关系模型 (DLR, 1.0兼容)"""
    relation_id: str
    biz_name: str
    from_attr_id: str
    to_attr_id: str
    description: Optional[str] = None


@dataclass
class LogicalEntity:
    """逻辑实体模型 (DLR) - 业务实体的分类抽象"""
    logical_entity_id: str       # e.g. "LOGICAL.变压器"
    name: str                    # e.g. "变压器"
    description: Optional[str] = None
    attributes: List[LogicalAttribute] = field(default_factory=list)
    relations: List[LogicalRelation] = field(default_factory=list)
    pas_relations: List[PASRelation] = field(default_factory=list)
    child_entity_ids: List[str] = field(default_factory=list)
