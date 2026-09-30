/**
 * get_pe_mapping（TS 版）—— 对齐 Python mcp_server.py:_get_pe_full (911-943)
 *
 * 返回：{success, physical_entity_id, entity, attributes, arcs, database_url}
 * 这是"第二跳"：只有这里才暴露 physical_table_id 与 database_url（刻意的信息分层）。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { parse } from "yaml";
import type { GraphQueries } from "../graph/types.js";
import { resolveSqlitePath } from "../graph/physicalSchema.js";
import type { DlrArcR } from "../model/types.js";
import { buildUnwindExpansion, type UnwindExpansion } from "./unwind.js";

import { DATASET_ROOT, YAML_DIR } from "../config.js";

/** db 名 → sqlite 绝对路径（扫 DLR 全部 YAML 的 databases 映射，进程内缓存） */
let dbUrlCache: Map<string, string> | null = null;
function dbToSqlitePath(): Map<string, string> {
  if (dbUrlCache) return dbUrlCache;
  const m = new Map<string, string>();
  for (const f of fs.readdirSync(YAML_DIR).filter((x) => x.endsWith(".yaml"))) {
    const sc = parse(fs.readFileSync(path.join(YAML_DIR, f), "utf8")) as {
      databases?: Record<string, string>;
    };
    for (const [db, url] of Object.entries(sc.databases ?? {})) {
      const p = resolveSqlitePath(url, DATASET_ROOT);
      if (p) m.set(db, p);
    }
  }
  dbUrlCache = m;
  return m;
}

/** physical_table_id（db.table）→ database_url（绝对 sqlite 路径；老库不存在则回退原 url） */
export function resolveDatabaseUrl(physicalTableId: string): string {
  const db = physicalTableId.split(".")[0] ?? "";
  const p = dbToSqlitePath().get(db);
  return p ?? "";
}

export async function getPeMapping(graph: GraphQueries, peId: string) {
  const entity = await graph.getPhysicalEntityById(peId);
  if (!entity) {
    return { success: false as const, message: `物理实体不存在: ${peId}` };
  }
  const attributes = await graph.getPhysicalEntityAttributes(peId);
  const database_url = resolveDatabaseUrl(entity.physical_table_id);

  // ARCS.R = unwind（行空间定义）→ 现生成行展开 SQL（可原样粘进 execute_sql）
  const arcs = entity.arcs as { A_anchor?: { key?: string } | null; R_row?: DlrArcR | null } | null;
  let row_expansion: UnwindExpansion | undefined;
  const R = arcs?.R_row ?? null;
  if (R && R.kind === "unwind" && database_url) {
    const tableName = entity.physical_table_id.split(".")[1] ?? "";
    const keyAlias = arcs?.A_anchor?.key ?? "id";
    const colId = (a: { physical_column_id?: string; attr_id?: string }) => a.physical_column_id ?? a.attr_id ?? "";
    const keyAttr = attributes.find((a) => a.name === keyAlias || colId(a).endsWith(`.${keyAlias}`));
    const keyColumn = keyAttr ? (colId(keyAttr).split(".").pop() ?? "id") : "id";
    row_expansion = buildUnwindExpansion(R, tableName, database_url, keyColumn, keyAlias) ?? undefined;
  }

  return {
    success: true as const,
    physical_entity_id: peId,
    entity,
    attributes,
    arcs: entity.arcs,
    database_url,
    ...(row_expansion ? { row_expansion } : {}),
  };
}
