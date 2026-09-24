/**
 * L2 对齐：TS（LanceDB `consensus` 表）vs Python 线真值
 *
 * 真值来源：1.5 线工具 `dlr_search_evidence` 的输出（那边保留旧工具名，
 *   "evidence" 是 BIRD 数据集字段名，非范式术语；TS 线已改名 dlr_search_consensus）。
 * 已知差异：qid 编号口径（TS=kid，Python 旧索引=原始题号），内容与分数应逐位一致。
 *
 * 跑法: npx tsx src/verify/consensus_parity.ts [namespace] ["<question>"]
 */
import * as fs from "node:fs";
import { LanceStore } from "../store/lance.js";
import { searchConsensus } from "../queries/searchConsensus.js";
import { STORE_DIR as STORE, MODEL_DIR as MODEL, FIXTURES_DIR } from "../config.js";

const PY_JSON = `${FIXTURES_DIR}/py_consensus_search.json`;
const NS = process.argv[2] ?? "debit_card_specializing";
const Q = process.argv[3] ?? "What is the ratio of customers who pay in EUR against customers who pay in CZK?";

const store = await LanceStore.open(STORE, MODEL);
const r = await searchConsensus(store, NS, Q, 5);
console.log(`[TS] namespace=${NS} count=${r.count}`);
for (const x of r.results) console.log(`   qid=${x.qid} score=${x.score}  ${x.text.slice(0, 60)}`);

if (fs.existsSync(PY_JSON)) {
  const py = JSON.parse(fs.readFileSync(PY_JSON, "utf8")) as {
    results: { qid: number; score: number; text: string }[];
  };
  console.log(`[Py] count=${py.results.length}（旧工具名 dlr_search_evidence 的输出）`);
  for (const x of py.results) console.log(`   qid=${x.qid} score=${x.score}  ${x.text.slice(0, 60)}`);
  const tsScores = r.results.map((x) => x.score).join(" | ");
  const pyScores = py.results.map((x) => x.score).join(" | ");
  const tsTexts = r.results.map((x) => x.text.slice(0, 40)).join(" | ");
  const pyTexts = py.results.map((x) => x.text.slice(0, 40)).join(" | ");
  console.log(tsScores === pyScores && tsTexts === pyTexts
    ? "✅ L2 内容与分数逐位一致（qid 编号口径不同：kid vs 旧题号）"
    : `⚠️ 内容/分数不一致\n  TS: ${tsScores}\n  Py: ${pyScores}`);
}
