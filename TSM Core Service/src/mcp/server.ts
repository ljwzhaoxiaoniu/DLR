/**
 * TSM MCP Server（TS 版）—— 暴露 DLR 的 5 个工具，与 Python 服务同契约
 *
 * 传输：
 *   npx tsx src/mcp/server.ts                → stdio（dsh/Claude 直接 spawn）
 *   npx tsx src/mcp/server.ts --http 28795   → streamable-http（dsh 原生直连，无需桥）
 *
 * HTTP 采用 MCP 官方推荐的 **stateful 模式**：initialize 时按会话新建 transport 与
 * McpServer 实例（共享底层 LanceDB/Neo4j 连接），会话 id 走 `mcp-session-id` 头。
 */
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { LanceStore } from "../store/lance.js";
import { Neo4jGraph } from "../graph/queries.js";
import { dlrSemanticQuery } from "../queries/semanticQuery.js";
import { searchConsensus } from "../queries/searchConsensus.js";
import { getPeMapping } from "../queries/peMapping.js";
import { executeSql } from "../queries/executeSql.js";

import { STORE_DIR, MODEL_DIR } from "../config.js";
const NEO4J_URI = process.env.NEO4J_URI ?? "bolt://localhost:7687";
const NEO4J_USER = process.env.NEO4J_USER ?? "neo4j";
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD ?? "";

// ── 懒加载共享上下文（跨会话复用；LanceDB 多读、Neo4j 驱动线程安全）──
let storePromise: Promise<LanceStore> | null = null;
let graphPromise: Promise<Neo4jGraph> | null = null;
const getStore = () => (storePromise ??= LanceStore.open(STORE_DIR, MODEL_DIR));
const getGraph = () => (graphPromise ??= Neo4jGraph.connect(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD));

/** 每会话一个 McpServer 实例（工具注册相同，底层共享上面的连接） */
function createServer(): McpServer {
  const server = new McpServer({ name: "tsm-core", version: "0.1.0" });

  server.registerTool(
    "dlr_semantic_query",
    {
      description:
        "[DLR] 语义召回 → 返回结构体(LE-PE 复合,无物理表/字段)。db 留空做全局召回；" +
        "确定目标库后必须传 db 避免跨库串扰。交付口径：先收口后截断——全量召回 → 归并（LE 层）→ 返回前 top_k 个结构体。",
      inputSchema: {
        question: z.string(),
        top_k: z.number().int().positive().default(5),
        threshold: z.number().default(0.5),
        db: z.string().default(""),
      },
    },
    async ({ question, top_k, threshold, db }) => {
      const [store, graph] = await Promise.all([getStore(), getGraph()]);
      const r = await dlrSemanticQuery(store, graph, question, { topK: top_k, threshold, db });
      return { content: [{ type: "text", text: JSON.stringify(r) }] };
    },
  );

  server.registerTool(
    "dlr_search_consensus",
    {
      description:
        "[DLR] L2 领域共识检索（Domain Consensus）：按库（namespace）召回领域共识条目——" +
        "基于 L1 schema 的背景知识与术语（术语→列/值、公式、口径），非明细数据。",
      inputSchema: {
        namespace: z.string().describe("库名，如 debit_card_specializing"),
        question: z.string(),
        top_k: z.number().int().positive().default(5),
      },
    },
    async ({ namespace, question, top_k }) => {
      const r = await searchConsensus(await getStore(), namespace, question, top_k);
      return { content: [{ type: "text", text: JSON.stringify(r) }] };
    },
  );

  server.registerTool(
    "get_pe_mapping",
    {
      description:
        "[DLR] 取物理实体完整映射：表名、列、JOIN 键（ARCS）、以及 database_url——写 SQL 前必须调用。",
      inputSchema: { pe_id: z.string() },
    },
    async ({ pe_id }) => {
      const r = await getPeMapping(await getGraph(), pe_id);
      return { content: [{ type: "text", text: JSON.stringify(r) }] };
    },
  );

  server.registerTool(
    "get_le_attrs",
    { description: "[DLR] 取逻辑实体的公开属性列表。", inputSchema: { le_id: z.string() } },
    async ({ le_id }) => {
      const attrs = await (await getGraph()).getLogicalEntityAttributes(le_id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ success: true, logical_entity_id: le_id, attributes: attrs }),
          },
        ],
      };
    },
  );

  server.registerTool(
    "execute_sql",
    {
      description:
        "[DLR] 执行只读 SQL（database_url 由映射工具取得）。SELECT * 必须带 LIMIT；结果超 200 行截断。" +
        "SQLite 整数除法会截断小数，需要浮点请 CAST(x AS REAL)。",
      inputSchema: { sql: z.string(), database_url: z.string() },
    },
    async ({ sql, database_url }) => ({
      content: [{ type: "text", text: JSON.stringify(executeSql(sql, database_url)) }],
    }),
  );

  return server;
}

// ── 启动 ─────────────────────────────────────────────────────────────
const httpIdx = process.argv.indexOf("--http");
if (httpIdx >= 0) {
  const port = Number(process.argv[httpIdx + 1] ?? 28795);
  const http = await import("node:http");
  const transports = new Map<string, StreamableHTTPServerTransport>();

  const readBody = async (req: import("node:http").IncomingMessage): Promise<unknown> => {
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    const raw = Buffer.concat(chunks).toString("utf8");
    return raw ? JSON.parse(raw) : undefined;
  };
  const rpcError = (res: import("node:http").ServerResponse, code: number, message: string, status = 400) =>
    res.writeHead(status, { "content-type": "application/json" }).end(
      JSON.stringify({ jsonrpc: "2.0", error: { code, message }, id: null }),
    );

  http
    .createServer(async (req, res) => {
      try {
        const sid = req.headers["mcp-session-id"] as string | undefined;
        const body = req.method === "POST" ? await readBody(req) : undefined;
        let transport = sid ? transports.get(sid) : undefined;

        if (!transport) {
          if (req.method === "POST" && isInitializeRequest(body)) {
            const t = new StreamableHTTPServerTransport({
              sessionIdGenerator: () => randomUUID(),
              onsessioninitialized: (id) => {
                transports.set(id, t);
              },
            });
            t.onclose = () => {
              if (t.sessionId) transports.delete(t.sessionId);
            };
            await createServer().connect(t); // 每会话独立实例
            transport = t;
          } else {
            rpcError(res, -32000, "Bad Request: no valid session id", 400);
            return;
          }
        }
        await transport.handleRequest(req, res, body);
      } catch (e) {
        console.error("[tsm-core] http error:", e);
        if (!res.headersSent) rpcError(res, -32603, String(e), 500);
      }
    })
    .listen(port, "127.0.0.1", () => {
      console.error(`[tsm-core] streamable-http on http://127.0.0.1:${port}/mcp`);
    });
} else {
  await createServer().connect(new StdioServerTransport());
  console.error("[tsm-core] stdio ready");
}
