/**
 * 构建 L2 领域共识表（Domain Consensus → LanceDB：table `consensus`）
 *
 * 源：<scenario>/sources/consensus/<topic>.jsonl，两种格式都支持：
 *   - knowledge 数组: [{"kid", "knowledge", "source_qids"}]  → 只 embed knowledge
 *   - JSONL:          {"qid","question","evidence"}          → 只 embed evidence
 *     （后一种是 BIRD 数据集原生字段，作为源格式保留；"evidence" 不是范式术语）
 * namespace = 文件名（库名）；检索时按 namespace 过滤（防跨库串扰）。
 *
 * 口径与 Python 线 build_evidence.py 逐字对齐（用同一批文本、同一 embedding 模型）。
 *
 * 跑法: npx tsx src/build/buildConsensus.ts [--topics a,b] [--store dir] [--model dir]
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as lancedb from "@lancedb/lancedb";
import { TextEncoder } from "../embed/encoder.js";
import { readConsensusSource } from "../model/consensusSource.js";
import {
  CONSENSUS_DIR as KNOWLEDGE_DIR,
  STORE_DIR as DEFAULT_STORE,
  MODEL_DIR as DEFAULT_MODEL_DIR,
} from "../config.js";

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const STORE = arg("--store", DEFAULT_STORE);
const MODEL_DIR = arg("--model", DEFAULT_MODEL_DIR);
const TOPICS = arg("--topics", "")
  ? arg("--topics", "").split(",").map((s) => s.trim()).filter(Boolean)
  : fs.readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith(".jsonl")).map((f) => f.replace(/\.jsonl$/, "")).sort();

interface Rec {
  namespace: string;
  qid: number;
  question: string;
  text: string;
}

/** 与 build_evidence.py:load_topic 同口径（两种格式见 consensusSource.ts） */
function loadTopic(file: string, namespace: string): Rec[] {
  return readConsensusSource(file).map((r) => ({ namespace, ...r }));
}

const records: Rec[] = [];
for (const topic of TOPICS) {
  const f = path.join(KNOWLEDGE_DIR, `${topic}.jsonl`);
  if (!fs.existsSync(f)) {
    console.warn(`  [skip] 无文件: ${f}`);
    continue;
  }
  const rs = loadTopic(f, topic);
  records.push(...rs);
  console.log(`  ${topic}: ${rs.length} 条`);
}
console.log(`[consensus] 共 ${records.length} 条，开始编码…`);

const encoder = await TextEncoder.load(MODEL_DIR);
const BATCH = 64;
const vectors: number[][] = [];
const t0 = Date.now();
for (let i = 0; i < records.length; i += BATCH) {
  vectors.push(...(await encoder.encode(records.slice(i, i + BATCH).map((r) => r.text))));
}
console.log(`[consensus] 编码完成 (${Date.now() - t0}ms, ${vectors[0]?.length ?? 0} 维)`);

fs.mkdirSync(STORE, { recursive: true });
const db = await lancedb.connect(STORE);
const data = records.map((r, i) => ({ ...r, vector: vectors[i] }));
const tbl = await db.createTable("consensus", data, { mode: "overwrite" });
await tbl.createIndex("text", { config: lancedb.Index.fts() });
console.log(`[consensus] 写入 ${STORE} 表 consensus: ${await tbl.countRows()} 行`);
