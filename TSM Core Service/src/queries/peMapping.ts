/**
 * get_pe_mapping（TS 版）—— 对齐 Python mcp_server.py:_get_pe_full (911-943)
 *
 * 返回：{success, physical_entity_id, entity, attributes, arcs, database_url}
 * 这是"第二跳"：只有这里才暴露 physical_table_id 与 database_url（刻意的信息分层）。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { parse } from "yaml";
import type { Neo4jGraph } from "../graph/queries.js";
import { resolveSqlitePath } from "../graph/physicalSchema.js";

import { ROOT, YAML_DIR } from "../config.js";

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
      const p = resolveSqlitePath(url, ROOT);
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

export async function getPeMapping(graph: Neo4jGraph, peId: string) {
  const entity = await graph.getPhysicalEntityById(peId);
  if (!entity) {
    return { success: false as const, message: `物理实体不存在: ${peId}` };
  }
  const attributes = await graph.getPhysicalEntityAttributes(peId);
  const database_url = resolveDatabaseUrl(entity.physical_table_id);
  return {
    success: true as const,
    physical_entity_id: peId,
    entity,
    attributes,
    arcs: entity.arcs,
    database_url,
  };
}
