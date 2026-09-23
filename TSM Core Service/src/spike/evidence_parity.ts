/**
 * L2 对齐：TS（LanceDB evidence 表）vs Python 服务（dlr_search_evidence 返回）
 * 前置：tmp_scripts/py_search_evidence.json（Python 真值）
 * 跑法: npx tsx src/spike/evidence_parity.ts [namespace] ["<question>"]
 */
import * as fs from "node:fs";
import { LanceStore } from "../store/lance.js";
import { searchEvidence } from "../queries/searchEvidence.js";

const ROOT = "D:/Code_Proj/DLR Proj";
const STORE = `${ROOT}/TSM Core Service/.store/lance/dlr`;
const MODEL = `${ROOT}/tmp_scripts/bge-onnx`;
const PY_JSON = `${ROOT}/tmp_scripts/py_search_evidence.json`;
const NS = process.argv[2] ?? "debit_card_specializing";
const Q = process.argv[3] ?? "What is the ratio of customers who pay in EUR against customers who pay in CZK?";

const store = await LanceStore.open(STORE, MODEL);
const r = await searchEvidence(store, NS, Q, 5);
console.log(`[TS] namespace=${NS} count=${r.count}`);
for (const x of r.results) console.log(`   qid=${x.qid} score=${x.score}  ${x.text.slice(0, 60)}`);

if (fs.existsSync(PY_JSON)) {
  const py = JSON.parse(fs.readFileSync(PY_JSON, "utf8")) as {
    results: { qid: number; score: number; text: string }[];
  };
  console.log(`[Py] count=${py.results.length}`);
  for (const x of py.results) console.log(`   qid=${x.qid} score=${x.score}  ${x.text.slice(0, 60)}`);
  const tsSeq = r.results.map((x) => `${x.qid}:${x.score}`).join(" | ");
  const pySeq = py.results.map((x) => `${x.qid}:${x.score}`).join(" | ");
  console.log(tsSeq === pySeq ? "✅ L2 结果（qid+score）完全一致" : `⚠️ 不一致\n  TS: ${tsSeq}\n  Py: ${pySeq}`);
}
