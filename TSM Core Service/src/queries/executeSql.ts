/**
 * execute_sql（TS 版）—— 对齐 Python mcp_server._execute_sql (329-371)
 * SELECT * 必须带 LIMIT；结果超 200 行截断（truncated=true + hint）。
 */
import { DatabaseSync } from "node:sqlite";

export function executeSql(sql: string, databaseUrl: string): Record<string, unknown> {
  const MAX_ROWS = 200;
  if (!sql || !databaseUrl) return { success: false, error: "sql and database_url are required" };
  const _sql = sql.trim().replace(/;+$/, "");
  if (/^\s*SELECT\s+(DISTINCT\s+)?(\w+\.)?\*/i.test(_sql) && !/\bLIMIT\b/i.test(_sql)) {
    return {
      success: false,
      error: "SELECT * without LIMIT is not allowed. Add LIMIT (e.g. LIMIT 5) or select specific columns.",
    };
  }
  try {
    const con = new DatabaseSync(databaseUrl, { readOnly: true });
    try {
      const rows = con.prepare(_sql).all() as Record<string, unknown>[];
      const columns = rows.length ? Object.keys(rows[0]) : [];
      const values = rows.slice(0, MAX_ROWS + 1).map((r) => columns.map((c) => r[c]));
      if (values.length > MAX_ROWS) {
        return {
          success: true,
          columns,
          rows: values.slice(0, MAX_ROWS),
          truncated: true,
          returned_rows: MAX_ROWS,
          hint: `Result truncated at ${MAX_ROWS} rows. Narrow the query (WHERE/GROUP BY/LIMIT).`,
        };
      }
      return { success: true, columns, rows: values };
    } finally {
      con.close();
    }
  } catch (e) {
    return { success: false, error: String((e as Error)?.message ?? e) };
  }
}
