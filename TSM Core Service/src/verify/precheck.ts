/**
 * MCP 预检：连上 TSM MCP server 并列出工具（供 launcher 在跑题前调用）
 * 退出码：0 = 可用；非 0 = 不可用（调用方据此中止，避免白跑）
 * 跑法: npx tsx src/verify/precheck.ts [url]
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const url = process.argv[2] ?? "http://127.0.0.1:28795/mcp";

try {
  const client = new Client({ name: "tsm-precheck", version: "0.1.0" });
  await client.connect(new StreamableHTTPClientTransport(new URL(url)));
  const tools = await client.listTools();
  const names = tools.tools.map((t) => t.name).sort();
  console.log(`[precheck] ${url} ok (${names.length} tools): ${names.join(", ")}`);
  await client.close();
} catch (e) {
  console.error(`[precheck] ${url} 不可达: ${String((e as Error)?.message ?? e)}`);
  process.exit(1);
}
