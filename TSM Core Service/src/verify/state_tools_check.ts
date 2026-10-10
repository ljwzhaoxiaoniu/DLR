/**
 * 工具面校验（进程内，不起端口）：按场景形态断言 MCP 工具面
 *
 *   dlr 形态        → 原 7 工具（契约不变）
 *   dlr-state 形态  → [dlr_search_consensus, state_model_query]（DB 型工具不挂）
 *   dlr-state 下再经 MCP 端到端调一次 state_model_query（需已 build 到 store）
 *
 * 跑法:
 *   npx tsx src/verify/state_tools_check.ts                       # 按 TSM_SCENARIO 判形态
 *   TSM_SCENARIO=<dlr-state 场景> TSM_STORE_DIR=<store> npx tsx src/verify/state_tools_check.ts ["<query>"]
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "../mcp/server.js";
import { scenarioKind } from "../model/scenarioKind.js";

const kind = scenarioKind();
const [clientT, serverT] = InMemoryTransport.createLinkedPair();
const server = createServer();
await server.connect(serverT);
const client = new Client({ name: "state-tools-check", version: "0.1.0" });
await client.connect(clientT);

const tools = (await client.listTools()).tools.map((t) => t.name).sort();
console.log(`[tools] kind=${kind}  tools(${tools.length}): ${tools.join(", ")}`);

const DLR7 = [
  "dlr_search_consensus",
  "dlr_search_sop",
  "dlr_semantic_query",
  "execute_sql",
  "get_full_data_info",
  "get_le_attrs",
  "get_pe_mapping",
].sort();
const STATE2 = ["dlr_search_consensus", "state_model_query"].sort();
const expected = kind === "dlr-state" ? STATE2 : DLR7;
const surfaceOk = JSON.stringify(tools) === JSON.stringify(expected);
console.log(surfaceOk ? "[tools] 工具面 OK" : `[tools] 期望: ${expected.join(", ")}`);

if (kind === "dlr-state") {
  const question = process.argv[2] ?? "Service Availability Disruption.";
  const r = await client.callTool({ name: "state_model_query", arguments: { question } });
  const text = (r.content as { type: string; text?: string }[])?.[0]?.text ?? "";
  const parsed = JSON.parse(text) as {
    confidence: number;
    data: {
      objects: { id: string; name: string; kind: string; surfaces: { kind: string; read: string }[] }[];
      surfaces: { id: string; name: string }[];
      relations: { id: string; from_name: string; to_name: string }[];
    };
  };
  console.log(`[tools] state_model_query("${question}") → confidence=${parsed.confidence}`);
  console.log(`  objects: ${parsed.data.objects.map((s) => `${s.name}(${s.kind})`).join(" | ") || "(无)"}`);
  console.log(`  surfaces: ${parsed.data.surfaces.map((s) => s.name).join(" | ") || "(无)"}`);
  const top = parsed.data.objects[0];
  if (top) console.log(`  top obj surfaces: ${top.surfaces.map((s) => s.kind).join(", ")}`);
  console.log(`  top rel: ${parsed.data.relations[0]?.from_name} → ${parsed.data.relations[0]?.to_name}`);
}

await client.close();
await server.close();
process.exit(surfaceOk ? 0 : 1);
