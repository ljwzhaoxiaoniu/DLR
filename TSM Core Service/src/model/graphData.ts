/**
 * DLR YAML → 结构对象（**单一来源**：图构建 / 可视化页 / 将来的"进程内图后端"共用）
 *
 * 纯映射：只读场景 YAML（+ 可选读 SQLite 取列声明类型），**不连任何服务**。
 *   buildBatch()   —— 扁平批次（loadNeo4j.ts 的写入用；口径对齐 1.5/Kuzu 线）
 *   buildPayload() —— 可视化页的 API 契约（1.5 `/api/v1/dlr/graph` 的形状）
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { parse } from "yaml";
import type { DlrScenarioYaml, StateScenarioYaml } from "./types.js";
import { loadColumnTypes, resolveSqlitePath } from "../graph/physicalSchema.js";
import { DATASET_ROOT, YAML_DIR } from "../config.js";

const dbFromTableId = (t: string) => t.split(".")[0];

export interface Batch {
  db: string;
  les: Record<string, unknown>[];
  las: Record<string, unknown>[];
  pes: Record<string, unknown>[];
  pas: Record<string, unknown>[];
  pasRels: Record<string, unknown>[];
  inherits: Record<string, unknown>[];
}

/** 场景 YAML 文件（可按库名过滤） */
export function scenarioFiles(db?: string): string[] {
  return fs
    .readdirSync(YAML_DIR)
    .filter((f) => f.endsWith(".yaml") && (!db || f === `${db}.yaml`));
}

/** 读一个库的 YAML + 该库 SQLite 的列声明类型（同 physical_scanner.py） */
export function readScenario(dbName: string): { sc: DlrScenarioYaml; colTypes: Map<string, string> } {
  const sc = parse(fs.readFileSync(path.join(YAML_DIR, `${dbName}.yaml`), "utf8")) as DlrScenarioYaml;
  const sqliteUrl = sc.databases?.[dbName] ?? Object.values(sc.databases ?? {})[0] ?? "";
  const sqlitePath = resolveSqlitePath(sqliteUrl, DATASET_ROOT);
  const colTypes =
    sqlitePath && fs.existsSync(sqlitePath) ? loadColumnTypes(sqlitePath) : new Map<string, string>();
  return { sc, colTypes };
}

export function buildBatch(sc: DlrScenarioYaml, colTypes: Map<string, string>): Batch {
  const presetDb = Object.keys(sc.databases ?? {})[0] ?? "";
  const b: Batch = { db: presetDb, les: [], las: [], pes: [], pas: [], pasRels: [], inherits: [] };

  for (const le of sc.logical_entities ?? []) {
    b.les.push({
      id: le.logical_entity_id,
      name: le.biz_name ?? "",
      description: le.description ?? "",
      db: presetDb,
    });
    const seen = new Map<string, { name: string; description: string }>();
    for (const pe of le.physical_entities ?? []) {
      for (const a of pe.attributes ?? []) {
        if (!a.public) continue;
        const id = `${le.logical_entity_id}.${a.biz_name || a.column}`;
        if (!seen.has(id)) seen.set(id, { name: a.biz_name || a.column, description: a.description ?? "" });
      }
    }
    let laOrd = 0;
    for (const [id, v] of seen) {
      b.las.push({ id, name: v.name, description: v.description, le_id: le.logical_entity_id, ord: laOrd++ });
    }
  }

  for (const le of sc.logical_entities ?? []) {
    const pes = le.physical_entities ?? [];
    for (let peOrd = 0; peOrd < pes.length; peOrd++) {
      const pe = pes[peOrd];
      const peDb = dbFromTableId(pe.physical_table_id);
      // C_column 重建（mapping/dlr.py:110-115：仅 public 属性，键为 {le_id}.{biz_name}）
      const cColumn: Record<string, string> = {};
      for (const a of pe.attributes ?? []) {
        if (!a.public) continue;
        cColumn[`${le.logical_entity_id}.${a.biz_name || a.column}`] = a.column;
      }
      b.pes.push({
        id: pe.physical_entity_id,
        name: pe.physical_table_name || pe.physical_entity_id,
        description: pe.S ?? "",
        table_id: pe.physical_table_id,
        db: peDb,
        arcs_a: pe.A ? JSON.stringify(pe.A) : null,
        arcs_r: pe.R ? JSON.stringify(pe.R) : null,
        arcs_c: Object.keys(cColumn).length ? JSON.stringify(cColumn) : null,
        arcs_s: pe.S ?? null,
      });
      b.inherits.push({ pe_id: pe.physical_entity_id, le_id: le.logical_entity_id, ord: peOrd });
      let paOrd = 0;
      for (const a of pe.attributes ?? []) {
        b.pas.push({
          id: a.column,
          name: a.biz_name || a.column,
          description: a.description ?? "",
          column_id: a.column,
          data_type: colTypes.get(a.column) ?? null,
          pe_id: pe.physical_entity_id,
          db: peDb,
          ord: paOrd++,
        });
      }
    }
  }

  for (const p of sc.pas_relations ?? []) {
    const [from, to] = p.relation_id.split("_TO_");
    const P = p.P ?? {};
    const fwd = typeof P.forward === "object" ? P.forward : undefined;
    const rev = typeof P.reverse === "object" ? P.reverse : undefined;
    b.pasRels.push({
      id: p.relation_id,
      name: p.relation_name ?? "",
      from,
      to,
      forward_verb: fwd?.verb ?? "",
      forward_cardinality: fwd?.cardinality ?? "",
      reverse_verb: rev?.verb ?? "",
      reverse_cardinality: rev?.cardinality ?? "",
      a_attribute: p.A ?? "",
      s_semantic: p.S ?? "",
      db: presetDb,
    });
  }
  return b;
}

// ── 可视化页载荷（1.5 `/api/v1/dlr/graph` 的形状，页面零改动）──────────────

export interface GraphPayload {
  logical_entities: {
    logical_entity_id: string;
    name: string;
    description: string;
    db: string;
    attributes: { attr_id: string; name: string; description: string }[];
    pas_relations: GraphPayload["pas_relations"];
  }[];
  physical_entities: {
    entity_id: string;
    physical_entity_id: string;
    name: string;
    description: string;
    source_table: string;
    physical_table_id: string;
    db: string;
    attributes: {
      attr_id: string;
      name: string;
      description: string;
      physical_column_id: string;
      data_type: string | null;
    }[];
    arcs: {
      A_anchor: unknown;
      R_row: unknown;
      C_column: unknown;
      S_semantic4arcs: unknown;
    };
  }[];
  inherits: Record<string, string>;
  pas_relations: {
    relation_id: string;
    relation_name: string;
    from_le_id: string;
    to_le_id: string;
    P_predicate: { forward: unknown; reverse: unknown };
    A_attribute: string;
    S_semantic4pas: string;
    db: string;
  }[];
}

const parseJsonOrRaw = (v: unknown): unknown => {
  if (typeof v !== "string" || !v) return null;
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
};

/** dlr-state 的可视化载荷。v2（shape=entities）：LE=具体对象（服务/节点/命名空间，嵌套观测面 PE），
 *  PAS=调用图——页面按经典 DLR 观感渲染；v1（shape=slices，过渡期）：类别级 entities/relations/slices。 */
export interface StateGraphPayloadV2 {
  kind: "dlr-state";
  shape: "entities";
  scenario: string;
  logical_entities: {
    id: string;
    name: string;
    kind: "service" | "node" | "namespace";
    description: string;
    attributes: { name: string; description: string }[];
  }[];
  physical_entities: {
    id: string;
    le_id: string;
    name: string;
    resource: string;
    s: string;
    cardinality: string;
    attributes: { name: string; description: string }[];
  }[];
  pas_relations: {
    id: string;
    name: string;
    from: string;
    to: string;
    forward: { verb: string; cardinality: string };
    reverse: { verb: string; cardinality: string };
    a_attribute: string;
    s: string;
  }[];
}

export interface StateGraphPayloadV1 {
  kind: "dlr-state";
  shape: "slices";
  scenario: string;
  logical_entities: { id: string; name: string; description: string }[];
  physical_entities: { id: string; name: string; description: string }[];
  relations: {
    id: string;
    class: string;
    relation: string;
    carries: string;
    tools: string[];
    read: string;
    entities: string[];
  }[];
  slices: { id: string; template: string; entry_chain: string; cases: Record<string, number> }[];
}

export type StateGraphPayload = StateGraphPayloadV1 | StateGraphPayloadV2;

/** v1（过渡期）载荷 */
export function buildStatePayloadV1(file: string): StateGraphPayloadV1 {
  const sc = parse(fs.readFileSync(file, "utf8")) as StateScenarioYaml;
  const b = buildStateBatch(sc);
  return {
    kind: "dlr-state",
    shape: "slices",
    scenario: b.ns,
    logical_entities: b.les.map((r) => ({
      id: r.id as string,
      name: r.name as string,
      description: r.description as string,
    })),
    physical_entities: b.pes.map((r) => ({
      id: r.id as string,
      name: r.name as string,
      description: r.description as string,
    })),
    relations: b.rels.map((r) => ({
      id: r.id as string,
      class: r.class as string,
      relation: r.relation as string,
      carries: (r.carries as string) ?? "",
      tools: String(r.slot_tools ?? "").split(" ").filter(Boolean),
      read: (r.slot_read as string) ?? "",
      entities: (r.entities as string[]) ?? [],
    })),
    slices: b.slices.map((r) => ({
      id: r.id as string,
      template: r.template as string,
      entry_chain: r.entry_chain as string,
      cases: (r.cases as Record<string, number>) ?? {},
    })),
  };
}

/** v2 载荷：逐文件读（LE 嵌套 PE + PAS），多文件合并（--db 过滤时单系统） */
interface StateScenarioYamlV2 {
  scenario_name?: string;
  logical_entities?: {
    logical_entity_id: string;
    biz_name: string;
    description?: string;
    physical_entities?: {
      physical_entity_id: string;
      resource?: string;
      A?: { cardinality?: string; key?: string };
      S?: string;
      attributes?: { name: string; description?: string; public?: boolean }[];
    }[];
  }[];
  pas_relations?: {
    relation_id: string;
    relation_name?: string;
    P?: { forward?: { verb?: string; cardinality?: string }; reverse?: { verb?: string; cardinality?: string } };
    A?: string;
    S?: string;
  }[];
}

export function buildStatePayloadV2(files: string[]): StateGraphPayloadV2 {
  const payload: StateGraphPayloadV2 = {
    kind: "dlr-state",
    shape: "entities",
    scenario: files.map((f) => path.basename(f, ".yaml")).join(" + "),
    logical_entities: [],
    physical_entities: [],
    pas_relations: [],
  };
  for (const file of files) {
    const sc = parse(fs.readFileSync(file, "utf8")) as StateScenarioYamlV2;
    for (const le of sc.logical_entities ?? []) {
      let kind: "service" | "node" | "namespace" = "service";
      if (/\.node\./.test(le.logical_entity_id)) kind = "node";
      else if (/\.namespace$/.test(le.logical_entity_id)) kind = "namespace";
      // LE 公开面 = 嵌套 PE 里 public 属性的去重投影
      const pub = new Map<string, { name: string; description: string }>();
      for (const pe of le.physical_entities ?? []) {
        for (const a of pe.attributes ?? []) {
          if (a.public && !pub.has(a.name)) pub.set(a.name, { name: a.name, description: a.description ?? "" });
        }
      }
      payload.logical_entities.push({
        id: le.logical_entity_id,
        name: le.biz_name,
        kind,
        description: le.description ?? "",
        attributes: [...pub.values()],
      });
      for (const pe of le.physical_entities ?? []) {
        payload.physical_entities.push({
          id: pe.physical_entity_id,
          le_id: le.logical_entity_id,
          name: pe.physical_entity_id.split(".").pop() ?? pe.physical_entity_id,
          resource: pe.resource ?? "",
          s: pe.S ?? "",
          cardinality: pe.A?.cardinality ?? "",
          attributes: (pe.attributes ?? []).map((a) => ({ name: a.name, description: a.description ?? "" })),
        });
      }
    }
    for (const r of sc.pas_relations ?? []) {
      const m = r.relation_id.split("_TO_");
      if (m.length !== 2) continue;
      payload.pas_relations.push({
        id: r.relation_id,
        name: r.relation_name ?? "",
        from: m[0],
        to: m[1],
        forward: { verb: r.P?.forward?.verb ?? "", cardinality: r.P?.forward?.cardinality ?? "" },
        reverse: { verb: r.P?.reverse?.verb ?? "", cardinality: r.P?.reverse?.cardinality ?? "" },
        a_attribute: typeof r.A === "string" ? r.A : "",
        s: r.S ?? "",
      });
    }
  }
  return payload;
}

export function buildPayload(db?: string): GraphPayload | StateGraphPayload {
  // 形态分派（同 scenarioKind 口径：任一文件为 dlr-state 即判 state——两形态不混装）。
  // 注：scenarioFiles 返回**裸文件名**（dlr 路径经 readScenario 自行 join）——这里要手动 join。
  // dlr-state 内部再分派：有 logical_entities 的 v2 文件优先（v1 过渡文件同场时被跳过）。
  const files = scenarioFiles(db).map((f) => path.join(YAML_DIR, f));
  const v2Files: string[] = [];
  let v1File = "";
  for (const full of files) {
    try {
      const raw = parse(fs.readFileSync(full, "utf8")) as { mapping_type?: string; logical_entities?: unknown };
      if (raw.mapping_type !== "dlr-state") continue;
      if (Array.isArray(raw.logical_entities)) v2Files.push(full);
      else if (!v1File) v1File = full;
    } catch {
      /* 解析失败留给 dlr 路径报错 */
    }
  }
  if (v2Files.length) return buildStatePayloadV2(v2Files);
  if (v1File) return buildStatePayloadV1(v1File);
  const logical_entities: GraphPayload["logical_entities"] = [];
  const physical_entities: GraphPayload["physical_entities"] = [];
  const inherits: Record<string, string> = {};
  const pas_relations: GraphPayload["pas_relations"] = [];

  for (const f of scenarioFiles(db)) {
    const { sc, colTypes } = readScenario(f.replace(/\.yaml$/, ""));
    const b = buildBatch(sc, colTypes);

    const laByLe = new Map<string, GraphPayload["logical_entities"][number]["attributes"]>();
    for (const la of b.las) {
      const list = laByLe.get(la.le_id as string) ?? [];
      list.push({ attr_id: la.id as string, name: la.name as string, description: la.description as string });
      laByLe.set(la.le_id as string, list);
    }
    const paByPe = new Map<string, GraphPayload["physical_entities"][number]["attributes"]>();
    for (const pa of b.pas) {
      const list = paByPe.get(pa.pe_id as string) ?? [];
      list.push({
        attr_id: pa.id as string,
        name: pa.name as string,
        description: pa.description as string,
        physical_column_id: pa.column_id as string,
        data_type: (pa.data_type as string) ?? null,
      });
      paByPe.set(pa.pe_id as string, list);
    }

    for (const le of b.les) {
      logical_entities.push({
        logical_entity_id: le.id as string,
        name: le.name as string,
        description: le.description as string,
        db: le.db as string,
        attributes: laByLe.get(le.id as string) ?? [],
        pas_relations: [], // 稍后统一挂
      });
    }
    for (const pe of b.pes) {
      physical_entities.push({
        entity_id: pe.id as string,
        physical_entity_id: pe.id as string,
        name: pe.name as string,
        description: pe.description as string,
        source_table: pe.table_id as string,
        physical_table_id: pe.table_id as string,
        db: pe.db as string,
        attributes: paByPe.get(pe.id as string) ?? [],
        arcs: {
          A_anchor: parseJsonOrRaw(pe.arcs_a),
          R_row: parseJsonOrRaw(pe.arcs_r),
          C_column: parseJsonOrRaw(pe.arcs_c),
          S_semantic4arcs: pe.arcs_s ?? null,
        },
      });
    }
    for (const rel of b.inherits) inherits[rel.pe_id as string] = rel.le_id as string;
    for (const p of b.pasRels) {
      pas_relations.push({
        relation_id: p.id as string,
        relation_name: p.name as string,
        from_le_id: p.from as string,
        to_le_id: p.to as string,
        P_predicate: {
          forward: { verb: p.forward_verb, cardinality: p.forward_cardinality },
          reverse: { verb: p.reverse_verb, cardinality: p.reverse_cardinality },
        },
        A_attribute: p.a_attribute as string,
        S_semantic4pas: p.s_semantic as string,
        db: p.db as string,
      });
    }
  }

  // 每个 LE 挂上与之相关的 PAS（页面详情面板用）
  const pasByLe = new Map<string, GraphPayload["pas_relations"]>();
  for (const p of pas_relations) {
    for (const key of [p.from_le_id, p.to_le_id]) {
      const list = pasByLe.get(key) ?? [];
      list.push(p);
      pasByLe.set(key, list);
    }
  }
  for (const le of logical_entities) {
    le.pas_relations = pasByLe.get(le.logical_entity_id) ?? [];
  }

  return { logical_entities, physical_entities, inherits, pas_relations };
}

// ── dlr-state（非数据库形态：实体 / 关系即节点 / 症状切片）────────────────────
// 关系在本形态 = 带观测槽的节点（1..n 参与方，INVOLVES 连实体）——槽是本形态核心列。

export interface StateBatch {
  ns: string;
  les: Record<string, unknown>[];
  pes: Record<string, unknown>[];
  rels: Record<string, unknown>[];
  slices: Record<string, unknown>[];
}

export function readStateFile(file: string): StateScenarioYaml {
  return parse(fs.readFileSync(file, "utf8")) as StateScenarioYaml;
}

export function buildStateBatch(sc: StateScenarioYaml): StateBatch {
  const ns = sc.scenario_name ?? "state";
  const b: StateBatch = { ns, les: [], pes: [], rels: [], slices: [] };
  for (const e of sc.entities ?? []) {
    const rec = {
      id: e.entity_id,
      name: e.entity_id.split(".").slice(1).join("."), // LOGICAL.Service → Service
      description: e.description ?? "",
      db: ns,
    };
    (e.side === "LE" ? b.les : b.pes).push(rec);
  }
  for (const r of sc.relations ?? []) {
    b.rels.push({
      id: `RELATION.${r.id}`,
      class: r.class,
      relation: r.relation,
      carries: r.carries ?? "",
      slot_tools: (r.slot?.tools ?? []).join(" "),
      slot_read: r.slot?.read ?? "",
      entities: r.entities ?? [],
      db: ns,
    });
  }
  (sc.symptom_slices ?? []).forEach((sl, i) => {
    b.slices.push({
      id: `SLICE.${i + 1}`,
      template: sl.template,
      entry_chain: sl.entry_chain ?? "",
      cases: JSON.stringify(sl.cases ?? {}),
      db: ns,
    });
  });
  return b;
}
