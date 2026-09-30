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
import type { DlrScenarioYaml } from "./types.js";
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

export function buildPayload(db?: string): GraphPayload {
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
