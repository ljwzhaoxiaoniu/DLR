/**
 * get_full_data_info（下探工具 · 软引导）—— 物理表**全量**列信息
 *
 * 契约（2026-09-28 定）：`get_pe_mapping` 只按建模返回（PE = 视图，只含 yaml 里的属性列）；
 * 视图不足以回答问题时，用本工具下探物理表真实列清单——每列带 `in_modeled_view` 标注，
 * 用完请在最终答案的「建模缺口」一节固定反馈（软引导，不做硬卡点）。
 *
 * 数据来源（与既有实现同源）：
 *   - 列名/声明类型：PRAGMA table_info（同 graph/physicalSchema.ts）
 *   - 列描述：数据集自身 `database_description/<table>.csv`（同 dev/coverage.ts 的读法）
 *   - 视角列判定：DLR YAML 的 PE 块（同 loadNeo4j 的来源，进程内缓存）
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { parse } from "yaml";
import { YAML_DIR } from "../config.js";
import { resolveDatabaseUrl } from "./peMapping.js";

export interface FullDataColumn {
  column: string;
  data_type: string;
  description: string;
  in_modeled_view: boolean;
  biz_name?: string;
}

export interface FullDataInfoResult {
  success: boolean;
  message?: string;
  db?: string;
  table?: string;
  physical_entity_ids?: string[];
  database_url?: string;
  modeled_view_count?: number;
  physical_column_count?: number;
  returned_columns?: number;
  columns?: FullDataColumn[];
}

/** table_id（db.table）→ { peIds, cols: Map<物理列名, biz_name> }；DLR YAML 扫描，进程内缓存 */
let modelIndex: Map<string, { peIds: string[]; cols: Map<string, string> }> | null = null;
function getModelIndex() {
  if (modelIndex) return modelIndex;
  const idx = new Map<string, { peIds: string[]; cols: Map<string, string> }>();
  for (const f of fs.readdirSync(YAML_DIR).filter((x) => x.endsWith(".yaml"))) {
    const sc = parse(fs.readFileSync(path.join(YAML_DIR, f), "utf8")) as {
      logical_entities?: {
        physical_entities?: {
          physical_entity_id?: string;
          physical_table_id?: string;
          attributes?: { column?: string; biz_name?: string }[];
        }[];
      }[];
    };
    for (const le of sc.logical_entities ?? []) {
      for (const pe of le.physical_entities ?? []) {
        const tableId = pe.physical_table_id ?? "";
        if (!tableId) continue;
        const cur = idx.get(tableId) ?? { peIds: [], cols: new Map<string, string>() };
        if (pe.physical_entity_id) cur.peIds.push(pe.physical_entity_id);
        for (const a of pe.attributes ?? []) {
          const col = String(a.column ?? "").split(".").pop() ?? "";
          if (col) cur.cols.set(col, a.biz_name ?? col);
        }
        idx.set(tableId, cur);
      }
    }
  }
  modelIndex = idx;
  return idx;
}

/** 极简 CSV 解析（引号包裹 + 双引号转义；与 dev/coverage.ts 同口径） */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

/** 数据集描述（database_description/<table>.csv，键 = original_column_name） */
function readDescriptions(sqlitePath: string, table: string): Map<string, string> {
  const out = new Map<string, string>();
  const csvPath = path.join(path.dirname(sqlitePath), "database_description", `${table}.csv`);
  if (!fs.existsSync(csvPath)) return out;
  const rows = parseCsv(fs.readFileSync(csvPath, "utf8").replace(/^﻿/, ""));
  for (const r of rows.slice(1)) if (r[0]) out.set(r[0], (r[2] ?? "").trim());
  return out;
}

export function getFullDataInfo(opts: {
  peId?: string;
  db?: string;
  table?: string;
  columns?: string[];
}): FullDataInfoResult {
  const idx = getModelIndex();
  const { peId = "", db = "", table = "", columns } = opts;

  // 1) 解析表
  let tableId = db && table ? `${db}.${table}` : "";
  if (!tableId && peId) {
    for (const [tid, v] of idx) if (v.peIds.includes(peId)) { tableId = tid; break; }
    if (!tableId) return { success: false, message: `未知物理实体：${peId}（示例：PHYSICAL.School）` };
  }
  if (!tableId) return { success: false, message: "请提供 pe_id，或 db + table（如 california_schools + schools）" };
  const [dbName, tableName] = [tableId.split(".")[0], tableId.split(".").slice(1).join(".")];
  const modeled = idx.get(tableId);
  const modeledCols = modeled?.cols ?? new Map<string, string>();

  // 2) 物理真相：列 + 声明类型（PRAGMA）
  const sqlitePath = resolveDatabaseUrl(tableId);
  if (!sqlitePath || !fs.existsSync(sqlitePath)) {
    return { success: false, message: `SQLite 不存在：${tableId}（database_url 解析失败）` };
  }
  let physical: { name: string; type?: string }[];
  try {
    const con = new DatabaseSync(sqlitePath, { readOnly: true });
    try {
      physical = con.prepare(`PRAGMA table_info("${tableName}")`).all() as { name: string; type?: string }[];
    } finally {
      con.close();
    }
  } catch (e) {
    return { success: false, message: `读表失败：${String((e as Error)?.message ?? e)}` };
  }
  if (!physical.length) return { success: false, message: `表不存在或没有列：${tableId}` };

  // 3) 组装（可选 columns 过滤）
  const desc = readDescriptions(sqlitePath, tableName);
  const want = columns && columns.length ? new Set(columns) : null;
  const all: FullDataColumn[] = physical.map((c) => ({
    column: c.name,
    data_type: c.type ?? "",
    description: desc.get(c.name) ?? "",
    in_modeled_view: modeledCols.has(c.name),
    ...(modeledCols.has(c.name) ? { biz_name: modeledCols.get(c.name) } : {}),
  }));
  const picked = want ? all.filter((c) => want.has(c.column)) : all;
  const missing = want ? [...want].filter((c) => !all.some((x) => x.column === c)) : [];

  return {
    success: true,
    db: dbName,
    table: tableName,
    physical_entity_ids: modeled?.peIds ?? [],
    database_url: sqlitePath,
    modeled_view_count: modeledCols.size,
    physical_column_count: all.length,
    returned_columns: picked.length,
    columns: picked,
    ...(missing.length ? { message: `物理表中不存在这些列（原样返回其余）：${missing.join("、")}` } : {}),
  };
}
