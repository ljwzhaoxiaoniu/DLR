/**
 * Embedding 对齐校验：Node（transformers.js / ONNX）vs Python（sentence-transformers）
 *
 * 链路：DLR YAML → 向量行 → text → TextEncoder（含 ST 的 do_lower_case 复刻）
 * Node 侧落 {id,text,vector} JSON；Python 用同一模型编码同一批文本，逐条算 cosine。
 *
 * 跑法: npx tsx src/spike/embed_parity.ts [<db名>] [<取前 N 条>]
 */
import * as fs from "node:fs";
import { TextEncoder } from "../embed/encoder.js";
import { loadDlrScenario, toVectorRows } from "../model/loadDlr.js";

import { LOG_DIR, YAML_DIR, MODEL_DIR } from "../config.js";
const DB = process.argv[2] ?? "debit_card_specializing";
const N = Number(process.argv[3] ?? 6);
const OUT = `${LOG_DIR}/embed_node.json`;

const rows = toVectorRows(loadDlrScenario(`${YAML_DIR}/${DB}.yaml`));
const take = rows.slice(0, N);

const t0 = Date.now();
const encoder = await TextEncoder.load(MODEL_DIR);
const vectors = await encoder.encode(take.map((r) => r.text));

fs.writeFileSync(
  OUT,
  JSON.stringify(take.map((r, i) => ({ id: r.id, text: r.text, vector: vectors[i] }))),
);
console.log(`[node] 编码 ${take.length} 条 (${Date.now() - t0}ms) → ${OUT}`);
console.log(`[node] ids: ${take.map((r) => r.id).join(", ")}`);
console.log(
  `[node] 维度 ${vectors[0].length} | 首条前 3 维: ${vectors[0]
    .slice(0, 3)
    .map((x) => x.toFixed(5))
    .join(", ")}`,
);
