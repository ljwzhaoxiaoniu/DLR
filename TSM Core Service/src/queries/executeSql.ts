/**
 * execute_sql（TS 版）—— 对齐 Python mcp_server._execute_sql (329-371)
 * SELECT * 必须带 LIMIT；结果超 200 行截断（truncated=true + hint）。
 *
 * ⚠ 查询走**子进程**（sqlWorker.mjs）+ 硬超时：node:sqlite 是同步 API、无 interrupt，
 *   一条病态 SQL（如大表上的 CASE WHEN EXISTS）会把单线程服务钉死、拖垮所有并发会话
 *   （2026-09-29 实测）。超时 = 杀子进程并返回错误，让 agent 改写，服务不受影响。
 */
import { spawnSync } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const MAX_ROWS = 200;
const WORKER = path.join(path.dirname(fileURLToPath(import.meta.url)), "sqlWorker.mjs");
const TIMEOUT_MS = Number(process.env.TSM_SQL_TIMEOUT_MS ?? 20000);

export function executeSql(sql: string, databaseUrl: string): Record<string, unknown> {
  if (!sql || !databaseUrl) return { success: false, error: "sql and database_url are required" };
  const _sql = sql.trim().replace(/;+$/, "");
  if (/^\s*SELECT\s+(DISTINCT\s+)?(\w+\.)?\*/i.test(_sql) && !/\bLIMIT\b/i.test(_sql)) {
    return {
      success: false,
      error: "SELECT * without LIMIT is not allowed. Add LIMIT (e.g. LIMIT 5) or select specific columns.",
    };
  }

  const r = spawnSync(process.execPath, [WORKER], {
    input: JSON.stringify({ dbUrl: databaseUrl, sql: _sql }),
    encoding: "utf8",
    timeout: TIMEOUT_MS,
    maxBuffer: 32 * 1024 * 1024,
    windowsHide: true,
  });

  const timedOut = (r.error as NodeJS.ErrnoException | undefined)?.code === "ETIMEDOUT" || (!!r.signal && !r.stdout);
  if (timedOut) {
    return {
      success: false,
      error:
        `query exceeded ${TIMEOUT_MS / 1000}s and was aborted. Rewrite it: aggregate the large/unindexed ` +
        `table first (GROUP BY) and then join; avoid correlated subqueries / CASE WHEN EXISTS over big tables.`,
    };
  }
  if (r.error) return { success: false, error: String(r.error.message ?? r.error) };

  let out: { ok?: boolean; error?: string; columns?: string[]; rows?: unknown[][] };
  try {
    out = JSON.parse(r.stdout || "");
  } catch {
    return { success: false, error: `sql worker failed: ${(r.stderr || "no output").slice(0, 300)}` };
  }
  if (!out?.ok) return { success: false, error: String(out?.error ?? "unknown error") };

  const columns = out.columns ?? [];
  const rows = out.rows ?? [];
  if (rows.length > MAX_ROWS) {
    return {
      success: true,
      columns,
      rows: rows.slice(0, MAX_ROWS),
      truncated: true,
      returned_rows: MAX_ROWS,
      hint: `Result truncated at ${MAX_ROWS} rows. Narrow the query (WHERE/GROUP BY/LIMIT).`,
    };
  }
  return { success: true, columns, rows };
}
