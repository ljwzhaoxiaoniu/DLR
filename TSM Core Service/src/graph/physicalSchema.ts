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

/** 全部表与列名（PRAGMA table_info；对账用） */
export function loadTables(sqlitePath: string): { name: string; columns: string[] }[] {
  const db = new DatabaseSync(sqlitePath, { readOnly: true });
  try {
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
      .all() as { name: string }[];
    return tables.map((t) => ({
      name: t.name,
      columns: (db.prepare(`PRAGMA table_info("${t.name}")`).all() as { name: string }[]).map((c) => c.name),
    }));
  } finally {
    db.close();
  }
}

/** 真实外键（PRAGMA foreign_key_list；"物理真相优先"于 dev_tables.json） */
export function loadForeignKeys(
  sqlitePath: string,
): { table: string; column: string; refTable: string; refColumn: string }[] {
  const out: { table: string; column: string; refTable: string; refColumn: string }[] = [];
  const db = new DatabaseSync(sqlitePath, { readOnly: true });
  try {
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
      .all() as { name: string }[];
    for (const t of tables) {
      const fks = db.prepare(`PRAGMA foreign_key_list("${t.name}")`).all() as {
        table: string;
        from: string;
        to: string | null;
      }[];
      for (const fk of fks) out.push({ table: t.name, column: fk.from, refTable: fk.table, refColumn: fk.to ?? "" });
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
