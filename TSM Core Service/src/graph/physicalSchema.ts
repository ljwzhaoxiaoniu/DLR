/**
 * 物理列类型扫描 —— 与 Python mapping/physical_scanner.py 同口径：
 * 直接 PRAGMA table_info 读 SQLite 声明类型（Node 24 内置 node:sqlite）。
 */
import * as path from "node:path";
import { DatabaseSync } from "node:sqlite";

/** key: `db.table.column` → data_type（原始声明类型字符串） */
export function loadColumnTypes(sqlitePath: string): Map<string, string> {
  const out = new Map<string, string>();
  const dbName = path.basename(sqlitePath).replace(/\.(sqlite|db)$/i, "");
  const db = new DatabaseSync(sqlitePath, { readOnly: true });
  try {
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
      .all() as { name: string }[];
    for (const t of tables) {
      const cols = db.prepare(`PRAGMA table_info("${t.name}")`).all() as { name: string; type?: string }[];
      for (const c of cols) out.set(`${dbName}.${t.name}.${c.name}`, c.type ?? "");
    }
  } finally {
    db.close();
  }
  return out;
}

/** sqlite:///rel/path → <root>/rel/path（与 Python _resolve_database_url 同口径） */
export function resolveSqlitePath(url: string, projectRoot: string): string | null {
  if (!url.startsWith("sqlite:///")) return null;
  const rel = url.slice("sqlite:///".length);
  const p = path.resolve(projectRoot, rel);
  return p;
}
