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
console.log(`  objects  : ${r.data.objects.map((s) => `${s.name}(${s.kind}) ${s.score}`).join(" | ") || "(无)"}`);
console.log(`  surfaces : ${r.data.surfaces.map((s) => `${s.name} ${s.score}`).join(" | ") || "(无)"}`);
console.log(`  relations: ${r.data.relations.map((s) => `${s.from_name}→${s.to_name} ${s.score}`).join(" | ") || "(无)"}`);
if (r.data.objects[0]) {
  console.log(`  top obj surfaces: ${r.data.objects[0].surfaces.map((s) => s.kind).join(", ")}`);
  const withRead = r.data.objects[0].surfaces.find((s) => s.read);
  if (withRead) console.log(`  read 示例: ${withRead.read}`);
}
if (r.data.surfaces[0]) console.log(`  top surface: ${JSON.stringify(r.data.surfaces[0]).slice(0, 220)}`);

const c = await searchConsensus(store, "", question, 3);
console.log(`[consensus] count=${c.count}`);
for (const hit of c.results) console.log(`  ${hit.namespace}#${hit.qid} ${hit.score}: ${hit.text.slice(0, 110)}`);
