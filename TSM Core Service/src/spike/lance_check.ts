/**
 * LanceDB 可行性实测（Windows + Node 24，纯本地、零服务）
 *
 * 跑法:
 *   npx tsx src/spike/lance_check.ts            # 建表 + 四类查询
 *   npx tsx src/spike/lance_check.ts --read-only  # 独立进程只读（验证持久化 + 多读）
 *
 * 向量口径与 Python 侧对齐：text = "{name} {description}"，bge-small-zh-v1.5，
 * L2 归一化 + 内积（这里用伪向量代替真 embedding，只验证存储/检索链路）。
 */
import * as lancedb from "@lancedb/lancedb";
import * as fs from "node:fs";

const DB_DIR =
  process.argv[3] ?? "D:/Code_Proj/DLR Proj/tmp_scripts/lance-spike/tsm.lance";
const DIM = 512; // bge-small-zh-v1.5 维度
const READ_ONLY = process.argv.includes("--read-only");

/** 确定性伪向量（可复现），L2 归一化 */
function pseudoVec(seed: number, dim = DIM): number[] {
  const v: number[] = [];
  let x = seed * 9301 + 49297;
  for (let i = 0; i < dim; i++) {
    x = (x * 9301 + 49297) % 233280;
    v.push(x / 233280 - 0.5);
  }
  const norm = Math.sqrt(v.reduce((s, t) => s + t * t, 0)) || 1;
  return v.map((t) => t / norm);
}

const ROWS = [
  { id: "LOGICAL.Customer", name: "Customer", kind: "LE", db: "debit_card_specializing",
    text: "Customer Identity and classification of debit card customers", vector: pseudoVec(1) },
  { id: "LOGICAL.Consumption", name: "Consumption", kind: "LE", db: "debit_card_specializing",
    text: "Consumption Customer consumption records: monthly bills plus transaction details", vector: pseudoVec(2) },
  { id: "PHYSICAL.YearMonth", name: "YearMonth", kind: "PE", db: "debit_card_specializing",
    text: "YearMonth Monthly customer spending summary", vector: pseudoVec(3) },
  { id: "LOGICAL.Transaction", name: "Transaction", kind: "LE", db: "financial",
    text: "Transaction bank transfer records", vector: pseudoVec(4) },
  { id: "PHYSICAL.Customer", name: "Customer", kind: "PE", db: "debit_card_specializing",
    text: "Customer Customer master data", vector: pseudoVec(5) },
];

fs.mkdirSync(DB_DIR, { recursive: true });
const db = await lancedb.connect(DB_DIR);

if (READ_ONLY) {
  // 独立进程：验证持久化 + 多读（不写任何东西）
  const names = await db.tableNames();
  const tbl = await db.openTable("entities");
  const res = await tbl.search(pseudoVec(2)).limit(3).toArray();
  console.log(
    `[read-only 进程] 表=${JSON.stringify(names)} 行数=${await tbl.countRows()} ` +
      `向量检索top3=${res.map((r: any) => r.id).join(",")}`,
  );
  process.exit(0);
}

const t0 = Date.now();
const tbl = await db.createTable("entities", ROWS, { mode: "overwrite" });
console.log(`[1] 建表: ${await tbl.countRows()} 行  (${Date.now() - t0}ms)`);

// ── 2) 向量检索（内积，对应 FAISS IndexFlatIP）──────────────────────
const t1 = Date.now();
const vres = await tbl.search(pseudoVec(2)).limit(3).toArray();
console.log(
  `[2] 向量检索 top3 (${Date.now() - t1}ms): ` +
    vres.map((r: any) => `${r.id}(${(1 - r._distance).toFixed(3)})`).join("  "),
);

// ── 3) FTS 索引 + 全文检索（L2 的"术语字面"一路）────────────────────
try {
  const t2 = Date.now();
  await tbl.createIndex("text", { config: lancedb.Index.fts() });
  const fts = await tbl.search("monthly spending", "fts").limit(3).toArray();
  console.log(
    `[3] FTS top3 (${Date.now() - t2}ms): ` + fts.map((r: any) => r.id).join("  "),
  );
} catch (e: any) {
  console.log("[3] FTS 失败:", e?.message ?? e);
}

// ── 4) 标量过滤（db 维度过滤，对应 F2 的 db 约束）────────────────────
const t3 = Date.now();
const filtered = await tbl
  .query()
  .where("db = 'debit_card_specializing'")
  .limit(10)
  .toArray();
console.log(`[4] 过滤查询 db=debit_card (${Date.now() - t3}ms): ${filtered.length} 行`);

// ── 5) 叠加：过滤 + 向量（先过滤后检索）──────────────────────────────
const t4 = Date.now();
const fv = await tbl
  .search(pseudoVec(1))
  .where("db = 'debit_card_specializing'")
  .limit(3)
  .toArray();
console.log(
  `[5] 过滤+向量 (${Date.now() - t4}ms): ` + fv.map((r: any) => r.id).join("  "),
);

console.log("DONE. 目录:", DB_DIR);
