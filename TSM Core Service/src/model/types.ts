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
  /** 派生列（R = unwind 展开出的列，物理表里没有对应列；column 为合成 id） */
  derived?: boolean;
}

/**
 * ARCS.R —— 行空间定义（PE 是**视图**，不物化；R 不止"行过滤"）：
 *  - null  = 行对行投影（默认：物理一行 = 视图一行）
 *  - unwind = 多槽位展开：把一个物理行按 N 个「槽位列」展开成 N 个派生行
 *             （用例：football 的 Match.home/away_player_1..11 首发槽位）
 */
export interface DlrArcRUnwind {
  kind: "unwind";
  /** 物理列名模板，如 "{side}_player_{slot}" */
  pattern: string;
  /** 模板变量取值；不写 side 则列名里不含该段 */
  side?: string[];
  slot: string[];
  /** 槽位列的值派生出的列名（LE 面用 biz_name） */
  value_as: string;
  /** 派生行身份（物理键 + 派生列名的组合） */
  key?: string[];
}

export type DlrArcR = DlrArcRUnwind;

export interface DlrYamlPhysicalEntity {
  physical_entity_id: string;
  physical_table_name?: string;
  physical_table_id: string;
  A?: DlrArcA;
  R?: DlrArcR | null;
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
  type: "logical_entity" | "entity" | "attribute" | "pas_relation" | "relation" | "symptom_slice";
  description: string;
  db: string;
  /** 送进 embedding 的文本（Python 侧不落盘；这里保留用于对齐与调试） */
  text: string;
  /** 仅 pas_relation */
  from_le_id?: string;
  to_le_id?: string;
  A_attribute?: string;
}

// ── dlr-state（非数据库形态：实体 / 关系+观测槽 / 症状切片）──────────────────
// 场景侧源：`sources/configs/DLR/*.yaml` 中 mapping_type: dlr-state 的文件
// （Cloud-OpsBench 首用；schema 注记见该场景 yaml 尾注与 modeling-plan）

export interface StateEntity {
  entity_id: string;
  side: "LE" | "PE";
  /** 回指方案 §3.1 的行号（三表 1:1 序列化的对账锚） */
  row?: number;
  description?: string;
}

export interface StateRelation {
  id: number | string;
  class: "ARCS" | "PAS" | "observation";
  /** 人读关系式，如 "Deployment → ReplicaSet → Pod" */
  relation: string;
  /** 参与实体（LOGICAL./PHYSICAL. id） */
  entities?: string[];
  carries?: string;
  /** 观测槽：工具 → 读哪段（本形态的核心列） */
  slot?: { tools?: string[]; read?: string };
}

export interface StateSymptomSlice {
  template: string;
  cases?: Record<string, number>;
  entry_chain?: string;
}

export interface StateScenarioYaml {
  mapping_type: "dlr-state";
  version?: string;
  scenario_name?: string;
  description?: string;
  source?: Record<string, unknown>;
  entities?: StateEntity[];
  relations?: StateRelation[];
  symptom_slices?: StateSymptomSlice[];
}
