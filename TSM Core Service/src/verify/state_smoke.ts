/**
 * dlr-state 服务路径冒烟：模型检索（症状 → 模型切片）+ L2 共识检索
 *
 * 跑法（先建产物到目标 store）:
 *   cd "TSM Core Service"
 *   TSM_SCENARIO=<场景> npx tsx src/build/buildLance.ts --all --store <store>
 *   TSM_SCENARIO=<场景> npx tsx src/build/buildConsensus.ts --store <store>
 *   TSM_SCENARIO=<场景> TSM_STORE_DIR=<store> npx tsx src/verify/state_smoke.ts ["<query>"]
 */
import { LanceStore } from "../store/lance.js";
import { stateModelQuery } from "../queries/stateModelQuery.js";
import { searchConsensus } from "../queries/searchConsensus.js";
import { MODEL_DIR, STORE_DIR } from "../config.js";

const question = process.argv[2] ?? "Service Availability Disruption.";
const store = await LanceStore.open(STORE_DIR, MODEL_DIR);

const r = await stateModelQuery(store, question);
console.log(`[state] q="${question}"  confidence=${r.confidence}`);
console.log(`  slices   : ${r.data.symptom_slices.map((s) => `${s.id} ${s.score}`).join(" | ") || "(无)"}`);
console.log(`  relations: ${r.data.relations.map((s) => `${s.id} ${s.class} ${s.score}`).join(" | ") || "(无)"}`);
console.log(`  entities : ${r.data.entities.map((s) => `${s.id} ${s.score}`).join(" | ") || "(无)"}`);
if (r.data.symptom_slices[0]) console.log(`  top slice: ${r.data.symptom_slices[0].entry_chain}`);
if (r.data.relations[0]) console.log(`  top rel  : ${JSON.stringify(r.data.relations[0])}`);

const c = await searchConsensus(store, "", question, 3);
console.log(`[consensus] count=${c.count}`);
for (const hit of c.results) console.log(`  ${hit.namespace}#${hit.qid} ${hit.score}: ${hit.text.slice(0, 110)}`);
