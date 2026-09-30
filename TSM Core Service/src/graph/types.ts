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

/** 查询层需要的最小图接口（Neo4j 与内存图两个实现共同满足） */
export interface GraphQueries {
  getChildEntityIds(leId: string): Promise<string[]>;
  getPhysicalEntityById(peId: string): Promise<PeFull | null>;
  getPhysicalEntityAttributes(peId: string): Promise<PeAttribute[]>;
  getLogicalEntityAttributes(leId: string): Promise<LeAttribute[]>;
}

/** 状态面板/统计口径（两后端同名标签与关系名，便于逐项对照） */
export interface GraphStats {
  readonly backend: "memory" | "neo4j";
  labelCounts(): Promise<Record<string, number>>;
  relationshipCounts(): Promise<Record<string, number>>;
}

/** 图句柄：查询 + 统计 + 关闭；`fallback_reason` 仅在 auto 回落内存时出现 */
export interface GraphHandle extends GraphQueries, GraphStats {
  close(): Promise<void>;
  fallback_reason?: string;
}
