/**
 * tsm coverage —— 建模覆盖度对账（**开发态**）
 *
 * 正向叙事的三张对账单（数据集原生语义 → 三级）：
 *   A) **L1 表/列级**：`database_description/*.csv` + SQLite（列清单、声明类型、真实表）↔ L1 YAML
 *   B) **L1 关系级**：SQLite 真实 FK ↔ L1 的 A 锚键 / public 面 / PAS
 *   C) **L2/L3 残差**：evidence（`mini_dev_sqlite.json`）↔ L1 描述 / L2 consensus 命中；L3 = sop 节数
 *
 * 说明：C 段是**启发式**（词面重叠），输出标为"候选"，需人工确认；A/B 段是硬对账。
 *
 * 用法: tsm coverage [--db <库名>] [--out <file>]
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { CONSENSUS_DIR, ROOT } from "../config.js";
import { consensusSourceFormat, readConsensusSource } from "../model/consensusSource.js";
import { readScenario, scenarioFiles } from "../model/graphData.js";
import { loadForeignKeys, loadTables, resolveSqlitePath } from "../graph/physicalSchema.js";

const arg = (name: string, fallback = ""): string => {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const ONLY_DB = arg("--db") || undefined;
const OUT = arg("--out");

// ── 小工具 ────────────────────────────────────────────────────────────

/** 极简 CSV 解析（引号包裹 + 双引号转义） */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQ = false;
      } else field += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch !== "\r") field += ch;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const words = (s: string) => norm(s).split(" ").filter((w) => w.length > 2);

/** 词面重叠率：a 的词有多少出现在 b 里 */
function overlap(a: string, b: string): number {
  const aw = words(a);
  if (!aw.length) return 0;
  const bs = new Set(words(b));
  return aw.filter((w) => bs.has(w)).length / aw.length;
}

// ── 载入数据集原生语义 ─────────────────────────────────────────────────

interface DbReport {
  db: string;
  lines: string[];
  stats: Record<string, number>;
}

function coverageForDb(db: string): DbReport {
  const L: string[] = [];
  const stats: Record<string, number> = {};
  const { sc } = readScenario(db);
  const sqliteUrl = Object.values(sc.databases ?? {})[0] ?? "";
  const sqlitePath = resolveSqlitePath(sqliteUrl, ROOT);
  if (!sqlitePath || !fs.existsSync(sqlitePath)) {
    return { db, lines: [`## ${db}\n\n[ERR] SQLite 不存在：${sqliteUrl}`], stats };
  }
  const descDir = path.join(path.dirname(sqlitePath), "database_description");
  const tables = loadTables(sqlitePath);
  const fks = loadForeignKeys(sqlitePath);

  L.push(`## ${db}`);
  L.push("");
  // 模型清单（LE / PE 表映射 / PAS）——对照 03-design 的抽象结果
  const lesAll = (sc.logical_entities ?? []) as Record<string, unknown>[];
  L.push(
    `模型清单：**LE ${lesAll.length}**（` +
      lesAll
        .map((le) => {
          const peNames = ((le.physical_entities ?? []) as Record<string, unknown>[]).map(
            (pe) => String(pe.physical_table_name ?? ""),
          );
          return `${String(le.biz_name ?? le.logical_entity_id)} ← ${peNames.join("+")}`;
        })
        .join(" ｜ ") +
      `） ｜ **PAS ${(sc.pas_relations ?? []).length}**`,
  );
  L.push(`文件头 description：${String(sc.description ?? "").replace(/\s+/g, " ")}`);
  L.push("");
  L.push(`SQLite：${tables.length} 表 / ${tables.reduce((n, t) => n + t.columns.length, 0)} 列 ｜ 真实 FK：${fks.length} 条 ｜ CSV 描述目录：${fs.existsSync(descDir) ? "有" : "**缺**"}`);

  // L1 索引：表 → {le, pe}
  const peByTable = new Map<string, { le: Record<string, unknown>; pe: Record<string, unknown> }>();
  for (const le of (sc.logical_entities ?? []) as Record<string, unknown>[]) {
    for (const pe of (le.physical_entities ?? []) as Record<string, unknown>[]) {
      const t = String(pe.physical_table_name ?? String(pe.physical_table_id).split(".").pop());
      peByTable.set(t, { le, pe });
    }
  }

  // ── A) 表/列级 ──
  const colsMissingL1: string[] = [];
  const colsDescMismatch: string[] = [];
  const colsL1Filled: string[] = [];
  for (const t of tables) {
    const csvPath = path.join(descDir, `${t.name}.csv`);
    const csv = new Map<string, { desc: string; fmt: string; value: string }>();
    if (fs.existsSync(csvPath)) {
      const rows = parseCsv(fs.readFileSync(csvPath, "utf8").replace(/^﻿/, ""));
      for (const r of rows.slice(1)) {
        if (r[0]) csv.set(r[0], { desc: (r[2] ?? "").trim(), fmt: (r[3] ?? "").trim(), value: (r[4] ?? "").trim() });
      }
    }
    const hit = peByTable.get(t.name);
    if (!hit) {
      L.push(`- ⚠ 表 \`${t.name}\`（${t.columns.length} 列）**没有对应 PE**`);
      continue;
    }
    const attrs = (hit.pe.attributes ?? []) as { column: string; description?: string; public?: boolean }[];
    for (const col of t.columns) {
      const a = attrs.find((x) => x.column.endsWith(`.${col}`));
      const c = csv.get(col);
      if (!a) {
        colsMissingL1.push(`${t.name}.${col}`);
        continue;
      }
      if (!c?.desc && a.description) colsL1Filled.push(`${t.name}.${col}`);
      if (c?.desc && !a.public && (a.description ?? "").trim() !== c.desc) {
        colsDescMismatch.push(`${t.name}.${col}：CSV="${c.desc}" ↔ L1="${(a.description ?? "").trim()}"`);
      }
    }
  }
  stats.tables = tables.length;
  stats.cols = tables.reduce((n, t) => n + t.columns.length, 0);
  stats.colsMissingL1 = colsMissingL1.length;
  stats.colsDescMismatch = colsDescMismatch.length;
  stats.colsL1Filled = colsL1Filled.length;

  L.push("");
  L.push(`### A) L1 表/列级对账（硬）`);
  L.push(`- 列覆盖：**缺 L1 的列 ${colsMissingL1.length}** ｜ 非 public 描述与 CSV 不一致 ${colsDescMismatch.length} ｜ L1 补了 CSV 空白的 ${colsL1Filled.length}`);
  if (colsMissingL1.length) L.push(`  - 缺列：${colsMissingL1.slice(0, 20).join(", ")}${colsMissingL1.length > 20 ? " …" : ""}`);
  if (colsDescMismatch.length)
    L.push(`  - 描述不一致（非 public 列应=CSV 原文）：\n${colsDescMismatch.slice(0, 10).map((x) => `    - ${x}`).join("\n")}`);

  // ── B) 关系级 ──
  const fkUnexpressed: string[] = [];
  for (const fk of fks) {
    const hit = peByTable.get(fk.table);
    const attrs = (hit?.pe.attributes ?? []) as { column: string; biz_name?: string; public?: boolean }[];
    const attr = attrs.find((x) => x.column.endsWith(`.${fk.column}`));
    const aKey = (hit?.pe.A as { key?: string } | undefined)?.key;
    const isAnchor = !!attr && aKey === (attr.biz_name || fk.column);
    const isPublic = !!attr?.public;
    const pasHit = ((sc.pas_relations ?? []) as { A?: string }[]).some((p) => p.A === (attr?.biz_name || fk.column));
    if (!isAnchor && !isPublic && !pasHit) {
      fkUnexpressed.push(`${fk.table}.${fk.column} → ${fk.refTable}.${fk.refColumn || "(pk)"}`);
    }
  }
  stats.fks = fks.length;
  stats.fkUnexpressed = fkUnexpressed.length;
  L.push("");
  L.push(`### B) L1 关系级对账（硬）`);
  L.push(`- 真实 FK ${fks.length} 条 ↔ 锚键/public/PAS：**未表达 ${fkUnexpressed.length}**`);
  if (fkUnexpressed.length) L.push(`  - ${fkUnexpressed.join("\n  - ")}`);

  // ── C) evidence 残差（启发式）──
  const qPath = path.join(ROOT, "MINIDEV_sqlite", "mini_dev_sqlite.json");
  const consPath = path.join(CONSENSUS_DIR, `${db}.jsonl`);
  const cons = fs.existsSync(consPath) ? readConsensusSource(consPath) : [];
  let evTotal = 0;
  let evInL2 = 0;
  let evInL1 = 0;
  let evFormula = 0;
  const evCandidates: string[] = [];
  // L2 源格式：聚合式 = 已加工（kid）；逐题式 = **evidence 原文照抄（未加工）**
  const l2fmt = fs.existsSync(consPath) ? consensusSourceFormat(consPath) : "(无 L2 源)";
  const l2raw = l2fmt === "per-question";
  if (fs.existsSync(qPath)) {
    // L1 文本（该库全量：LE/PE/属性 的名字与描述）——用于判"这条 evidence 讲的是不是源自身的事实"
    const l1Parts: string[] = [];
    for (const le of (sc.logical_entities ?? []) as Record<string, unknown>[]) {
      l1Parts.push(String(le.logical_entity_id ?? ""), String(le.biz_name ?? ""), String(le.description ?? ""));
      for (const pe of (le.physical_entities ?? []) as Record<string, unknown>[]) {
        l1Parts.push(String(pe.physical_table_name ?? ""), String(pe.S ?? ""));
        for (const a of (pe.attributes ?? []) as Record<string, unknown>[]) {
          l1Parts.push(String(a.biz_name ?? ""), String(a.description ?? ""), String(a.column ?? ""));
        }
      }
    }
    const l1Text = l1Parts.join(" ").toLowerCase();
    const dataTerms = [...tables.map((t) => t.name), ...tables.flatMap((t) => t.columns)]
      .filter((t) => t.length > 3)
      .map((t) => t.toLowerCase());
    /** 该 evidence 提到的"数据集词"（表/列名）是否落在 L1 文本里 */
    const l1Hit = (e: string) => {
      const lo = e.toLowerCase();
      const hit = dataTerms.filter((t) => lo.includes(t));
      return hit.length > 0 && hit.some((t) => l1Text.includes(t));
    };

    const qs = JSON.parse(fs.readFileSync(qPath, "utf8")) as { db_id: string; question_id: number; evidence?: string }[];
    const mine = qs.filter((q) => q.db_id === db && q.evidence && q.evidence.trim());
    evTotal = mine.length;
    // 语境判据：编码/领域陈述（→ 源事实，该在 L1）vs 算式/计算（→ L2/L3/弃，人工判）
    const isEncoding = /(can be (represented|presented)|refers? to|is represented|can represent|means|in the [a-z_]+ table)/i;
    const isFormula = /(=|\bcalculate|calculation|percentage|ratio|increase|decrease|difference\b)/i;
    for (const q of mine) {
      const e = String(q.evidence);
      const l2Hit = cons.some((c) => overlap(e, c.text) >= 0.5 || overlap(c.text, e) >= 0.5);
      // 逐题式源：L2 就是 evidence 原文，"命中"是恒真，不计入成功——全部按待处理分类
      if (!l2raw && l2Hit) evInL2++;
      else if (isEncoding.test(e) && !isFormula.test(e) && l1Hit(e)) evInL1++;
      else if (isFormula.test(e)) evFormula++;
      else evCandidates.push(`q${q.question_id}: ${e.replace(/\s+/g, " ").slice(0, 100)}`);
    }
  }
  stats.evidence = evTotal;
  stats.evidenceInL2 = evInL2;
  stats.evidenceInL1 = evInL1;
  stats.evidenceFormula = evFormula;
  stats.l2raw = l2raw ? 1 : 0;
  L.push("");
  L.push(`### C) L2/L3 残差（启发式，候选需人工确认）`);
  L.push(`- L2 源格式：**${l2fmt}**${l2raw ? "（= evidence 原文照抄，**未加工** → 下面分类即瘦身清单，全部需处理）" : "（已加工）"}`);
  L.push(
    `- evidence ${evTotal} 条 ↔ 已进 L2 ${evInL2} ｜ 源事实（→L1）${evInL1} ｜ 公式类（→L2/L3/弃）${evFormula} ｜ **待人工判定 ${evTotal - evInL2 - evInL1 - evFormula}**`,
  );
  if (evCandidates.length) L.push(`  - 待定（前 12）：\n${evCandidates.slice(0, 12).map((x) => `    - ${x}`).join("\n")}`);

  const sopPath = path.join(path.dirname(CONSENSUS_DIR), "sop.md");
  if (fs.existsSync(sopPath)) {
    const sop = fs.readFileSync(sopPath, "utf8");
    const secs = (sop.match(/^### When asked:/gm) ?? []).length;
    stats.sopSections = secs;
    L.push(`- L3：sop.md 节数 ${secs}（该库题目 ${evTotal} 道——节只覆盖被点名的题）`);
  }
  return { db, lines: L, stats };
}

// ── 主流程 ────────────────────────────────────────────────────────────

const dbs = ONLY_DB ? [ONLY_DB] : scenarioFiles().map((f) => f.replace(/\.yaml$/, ""));
if (!dbs.length) {
  console.error("用法: tsm coverage [--db <库名>] [--out <file>]");
  process.exit(1);
}

const reports = dbs.map(coverageForDb);
const header = [
  "# 建模覆盖度对账（tsm coverage）",
  "",
  `生成：${new Date().toISOString()} ｜ 库：${dbs.join(", ")}`,
  "",
  "| 库 | 表 | 列 | 缺 L1 列 | 描述不一致 | FK | 未表达 | evidence | L2 源 | 已进 L2 | 源事实→L1 | 公式类 | 待判定 | sop 节 |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|",
  ...reports.map((r) => {
    const s = r.stats;
    const todo = (s.evidence ?? 0) - (s.evidenceInL2 ?? 0) - (s.evidenceInL1 ?? 0) - (s.evidenceFormula ?? 0);
    return `| ${r.db} | ${s.tables ?? "-"} | ${s.cols ?? "-"} | **${s.colsMissingL1 ?? "-"}** | **${s.colsDescMismatch ?? "-"}** | ${s.fks ?? "-"} | **${s.fkUnexpressed ?? "-"}** | ${s.evidence ?? "-"} | ${s.l2raw ? "逐题(未加工)" : "聚合(已加工)"} | ${s.evidenceInL2 ?? "-"} | ${s.evidenceInL1 ?? "-"} | ${s.evidenceFormula ?? "-"} | **${todo}** | ${s.sopSections ?? "-"} |`;
  }),
  "",
  ...reports.flatMap((r) => [...r.lines, ""]),
].join("\n");

const outPath = path.resolve(OUT || path.join(ROOT, "TSM Core Service", ".store", "coverage", `${ONLY_DB ?? "all"}.md`));
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, header);
console.log(header.split("\n").slice(0, 12).join("\n"));
console.log(`\n[coverage] 完整报告 → ${outPath}`);
