/**
 * 构建 LanceDB 向量表：DLR YAML → 向量行 → embedding → LanceDB（+ FTS 索引）
 *
 * 跑法:
 *   npx tsx src/build/buildLance.ts --all          # 全部 11 库（应产出 948 行，与 Python 侧一致）
 *   npx tsx src/build/buildLance.ts <db名>         # 单库
 *   [--store <dir>] [--model <onnx目录>]
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as lancedb from "@lancedb/lancedb";
import { TextEncoder } from "../embed/encoder.js";
import { loadDlrScenario, toVectorRows } from "../model/loadDlr.js";
import type { VectorRow } from "../model/types.js";

const ROOT = "D:/Code_Proj/DLR Proj";
const YAML_DIR = `${ROOT}/Semantic Core Service/configs/scenarios/DLR`;

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const STORE = arg("--store", `${ROOT}/TSM Core Service/.store/lance/dlr`);
const MODEL_DIR = arg("--model", process.env.TSM_MODEL_DIR ?? `${ROOT}/tmp_scripts/bge-onnx`);
const TABLE = "entities";
const WANT_ALL = process.argv.includes("--all");
const DBS = WANT_ALL
  ? fs
      .readdirSync(YAML_DIR)
      .filter((f) => f.endsWith(".yaml"))
      .map((f) => f.replace(/\.yaml$/, ""))
  : process.argv.slice(2).filter((a) => !a.startsWith("--") && !a.includes("/") && !a.includes("\\"));

if (DBS.length === 0) {
  console.error("用法: npx tsx src/build/buildLance.ts --all | <db名> [--store dir] [--model dir]");
  process.exit(1);
}

// ── 1) 装载全部向量行 ────────────────────────────────────────────────
const rows: VectorRow[] = [];
for (const dbName of DBS) {
  const yamlPath = path.join(YAML_DIR, `${dbName}.yaml`);
  if (!fs.existsSync(yamlPath)) {
    console.warn(`  [skip] 无 YAML: ${dbName}`);
    continue;
  }
  const rs = toVectorRows(loadDlrScenario(yamlPath));
  rows.push(...rs);
  console.log(`  ${dbName}: ${rs.length} 行`);
}
console.log(`[build] 共 ${rows.length} 行，开始编码…`);

// ── 2) 编码（分批，避免一次喂太多）────────────────────────────────────
const encoder = await TextEncoder.load(MODEL_DIR);
const BATCH = 64;
const t0 = Date.now();
const vectors: number[][] = [];
for (let i = 0; i < rows.length; i += BATCH) {
  const batch = rows.slice(i, i + BATCH).map((r) => r.text);
  vectors.push(...(await encoder.encode(batch)));
}
console.log(`[build] 编码完成 (${Date.now() - t0}ms, ${vectors[0].length} 维)`);

// ── 3) 写入 LanceDB（overwrite 重建）+ FTS 索引 ──────────────────────
fs.mkdirSync(STORE, { recursive: true });
const db = await lancedb.connect(STORE);
const data = rows.map((r, i) => ({
  id: r.id,
  name: r.name,
  type: r.type,
  description: r.description,
  db: r.db,
  text: r.text,
  vector: vectors[i],
}));
const tbl = await db.createTable(TABLE, data, { mode: "overwrite" });
await tbl.createIndex("text", { config: lancedb.Index.fts() });

const counts = rows.reduce<Record<string, number>>((a, r) => {
  const k = `${r.db}/${r.type}`;
  a[k] = (a[k] ?? 0) + 1;
  return a;
}, {});
console.log(`[build] 写入 ${STORE} 表 ${TABLE}: ${await tbl.countRows()} 行`);
for (const [k, n] of Object.entries(counts).sort()) console.log(`   ${k.padEnd(42)} ${n}`);
