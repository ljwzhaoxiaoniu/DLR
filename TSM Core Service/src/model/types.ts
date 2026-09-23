/**
 * DLR 场景 YAML 的类型化视图（对齐 Python 侧 mapping/dlr.py 的解析结果）
 */

export interface DlrArcA {
  cardinality?: string;
  key?: string;
}

export interface DlrYamlAttribute {
  column: string;
  biz_name?: string;
  description?: string;
  public?: boolean;
}

export interface DlrYamlPhysicalEntity {
  physical_entity_id: string;
  physical_table_name?: string;
  physical_table_id: string;
  A?: DlrArcA;
  R?: unknown;
  S?: string;
  attributes?: DlrYamlAttribute[];
}

export interface DlrYamlLogicalEntity {
  logical_entity_id: string;
  biz_name?: string;
  description?: string;
  physical_entities?: DlrYamlPhysicalEntity[];
}

export interface DlrYamlPas {
  relation_id: string;
  relation_name?: string;
  /** { forward: {verb, cardinality}, reverse: {...} } */
  P?: Record<string, { verb?: string; cardinality?: string } | string>;
  A?: string;
  S?: string;
}

export interface DlrScenarioYaml {
  mapping_type: "dlr";
  version?: string;
  scenario_name?: string;
  description?: string;
  databases?: Record<string, string>;
  logical_entities?: DlrYamlLogicalEntity[];
  pas_relations?: DlrYamlPas[];
}

/** 向量行：与 Python vector_db.metadata 字段一一对应，并显式保留编码文本 */
export interface VectorRow {
  id: string;
  name: string;
  type: "logical_entity" | "entity" | "attribute" | "pas_relation";
  description: string;
  db: string;
  /** 送进 embedding 的文本（Python 侧不落盘；这里保留用于对齐与调试） */
  text: string;
  /** 仅 pas_relation */
  from_le_id?: string;
  to_le_id?: string;
  A_attribute?: string;
}
