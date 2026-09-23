/**
 * 图侧共享类型（Neo4j 实现与查询层共用，避免循环依赖）
 * 字段口径对齐 Python db/graph_db.py 的同名方法返回。
 */

export interface PeArcs {
  A_anchor: unknown;
  R_row: unknown;
  C_column: unknown;
  S_semantic4arcs: string | null;
}

export interface PeFull {
  physical_entity_id: string;
  name: string;
  description: string;
  physical_table_id: string;
  arcs: PeArcs;
}

export interface PeAttribute {
  attr_id: string;
  name: string;
  description: string;
  physical_column_id: string;
  data_type: string | null;
}

export interface LeAttribute {
  attr_id: string;
  name: string;
  description: string;
}

/** 查询层需要的最小图接口 */
export interface GraphQueries {
  getChildEntityIds(leId: string): Promise<string[]>;
  getPhysicalEntityById(peId: string): Promise<PeFull | null>;
  getLogicalEntityAttributes(leId: string): Promise<LeAttribute[]>;
}
