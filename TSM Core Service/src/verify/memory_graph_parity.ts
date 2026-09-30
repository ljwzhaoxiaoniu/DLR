/**
 * 内存图 vs Neo4j 逐字段对齐自测（阶段 2 硬闸门）
 *
 * 对场景全部库：逐个 LE / PE 比较四个查询方法的返回（JSON 深比较），
 * 再比较标签计数与关系计数（/status 同口径）。任何差异 → 非零退出。
 *
 * 跑法: npx tsx src/verify/memory_graph_parity.ts [<db>]
 *   （需要 Neo4j 可达 + .env 凭据；内存图侧无需任何服务）
 */
import { InMemoryGraph } from "../graph/memory.js";
import { Neo4jGraph } from "../graph/queries.js";
import { buildBatch, readScenario, scenarioFiles } from "../model/graphData.js";

const dbFilter = process.argv.slice(2).find((a) => !a.startsWith("-"));
const uri = process.env.NEO4J_URI ?? "bolt://localhost:7687";
const user = process.env.NEO4J_USER ?? "neo4j";
const pass = process.env.NEO4J_PASSWORD ?? "";
if (!pass) {
  console.error("[ERR] 缺少 Neo4j 密码（.env 的 NEO4J_PASSWORD）——parity 需要两个后端都在");
  process.exit(1);
}

const mem = await InMemoryGraph.load();
const neo = await Neo4jGraph.connect(uri, user, pass);

// 待比较的 LE / PE id 集合：由场景 YAML 直接展开（覆盖两后端的全量 id）
const leIds = new Set<string>();
const peIds = new Set<string>();
for (const f of scenarioFiles(dbFilter)) {
  const db = f.replace(/\.yaml$/, "");
  const { sc, colTypes } = readScenario(db);
  const b = buildBatch(sc, colTypes);
  for (const r of b.les) leIds.add(r.id as string);
  for (const r of b.pes) peIds.add(r.id as string);
}

let diffs = 0;
let checks = 0;
const failed = new Set<string>();

async function cmp(label: string, a: unknown, b: unknown) {
  checks++;
  const ja = JSON.stringify(a);
  const jb = JSON.stringify(b);
  if (ja === jb) return;
  diffs++;
  failed.add(label.split("(")[0]);
  if (diffs <= 8) {
    console.log(`[DIFF] ${label}\n  memory: ${ja?.slice(0, 400)}\n  neo4j : ${jb?.slice(0, 400)}`);
  }
}

for (const leId of leIds) {
  await cmp(`getChildEntityIds(${leId})`, await mem.getChildEntityIds(leId), await neo.getChildEntityIds(leId));
  await cmp(
    `getLogicalEntityAttributes(${leId})`,
    await mem.getLogicalEntityAttributes(leId),
    await neo.getLogicalEntityAttributes(leId),
  );
}
for (const peId of peIds) {
  await cmp(`getPhysicalEntityById(${peId})`, await mem.getPhysicalEntityById(peId), await neo.getPhysicalEntityById(peId));
  await cmp(
    `getPhysicalEntityAttributes(${peId})`,
    await mem.getPhysicalEntityAttributes(peId),
    await neo.getPhysicalEntityAttributes(peId),
  );
}
await cmp("labelCounts", await mem.labelCounts(), await neo.labelCounts());
await cmp("relationshipCounts", await mem.relationshipCounts(), await neo.relationshipCounts());

await mem.close();
await neo.close();

console.log(
  `[parity] 检查 ${checks} 项（LE ${leIds.size} / PE ${peIds.size}）—— ` +
    (diffs ? `❌ ${diffs} 处不一致（方法：${[...failed].join(", ")}）` : "✅ 全部一致"),
);
process.exit(diffs ? 1 : 0);
