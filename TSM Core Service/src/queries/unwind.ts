/**
 * ARCS.R = unwind（行空间定义）—— 规格校验 + 现生成可执行 SQL
 *
 * DLR 的 PE 是**视图，不物化**：R 不止"行过滤"，可以定义视图的行空间。
 * unwind = 把一个物理行按「多槽位列」展开成 N 个派生行
 * （首个用例：football / european_football_2 的 Match 首发槽位 22 列 → Appearance）。
 *
 * 派生行来自**本表已有的列**，因此不需要物理视图；get_pe_mapping 时现生成
 * UNION ALL 形式的展开 SQL（可原样粘进 execute_sql），把"表达不了"变成"可查"。
 */
import { loadTables } from "../graph/physicalSchema.js";
import type { DlrArcR } from "../model/types.js";

export interface UnwindSlot {
  side: string;
  slot: string;
  /** 物理列名（不带 db.table 前缀） */
  column: string;
}

export interface UnwindExpansion {
  /** 展开出的 (side, slot, 物理列) 清单 */
  slots: UnwindSlot[];
  /** pattern 指向但物理表里不存在的列（规格写错时的对账信号） */
  missing: string[];
  columns: string[];
  sql: string;
}

/** 把 R.pattern 按 side × slot 展开为物理列名（missing = 物理表里不存在的） */
export function expandUnwind(R: DlrArcR, physicalColumns: string[]): { slots: UnwindSlot[]; missing: string[] } {
  const sides: (string | null)[] = R.side?.length ? R.side : [null];
  const has = new Set(physicalColumns);
  const slots: UnwindSlot[] = [];
  const missing: string[] = [];
  for (const s of sides) {
    for (const k of R.slot) {
      let col = R.pattern.replace("{slot}", k);
      col = s === null ? col.replace(/^\{side\}_/, "") : col.replace("{side}", s);
      if (has.has(col)) slots.push({ side: s ?? "", slot: k, column: col });
      else missing.push(col);
    }
  }
  return { slots, missing };
}

/** 现生成行展开 SQL：每个槽位一条 SELECT，空槽位（NULL）不产生行 */
export function buildRowExpansionSql(
  tableName: string,
  keyColumn: string,
  keyAlias: string,
  valueAs: string,
  slots: UnwindSlot[],
): string {
  const q = (c: string) => `"${c}"`;
  return slots
    .map(
      (s) =>
        `SELECT ${q(keyColumn)} AS ${keyAlias}, '${s.side}' AS side, '${s.slot}' AS slot, ${q(s.column)} AS ${valueAs} ` +
        `FROM ${q(tableName)} WHERE ${q(s.column)} IS NOT NULL`,
    )
    .join("\nUNION ALL\n");
}

/**
 * 一步到位：给定 R、物理表名、库路径 → 校验 + 生成。
 * 物理表不存在/列对不上时返回 { ok:false, missing }（供建模对账）。
 */
export function buildUnwindExpansion(
  R: DlrArcR,
  tableName: string,
  sqlitePath: string,
  keyColumn: string,
  keyAlias: string,
): UnwindExpansion | null {
  const t = loadTables(sqlitePath).find((x) => x.name === tableName);
  if (!t) return null;
  const { slots, missing } = expandUnwind(R, t.columns);
  return {
    slots,
    missing,
    columns: [keyAlias, "side", "slot", R.value_as],
    sql: buildRowExpansionSql(tableName, keyColumn, keyAlias, R.value_as, slots),
  };
}
