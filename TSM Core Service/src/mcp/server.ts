/**
 * TSM MCP Server（TS 版）—— 暴露 DLR 的 7 个工具（L1/L2/L3 语义 + 下探 + 取数）
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
import { getFullDataInfo } from "../queries/fullDataInfo.js";
import { searchSop } from "../queries/searchSop.js";
import { executeSql } from "../queries/executeSql.js";

import { STORE_DIR, MODEL_DIR } from "../config.js";
import { buildStatus } from "./status.js";
import { renderVizHtml } from "../viz/buildViz.js";
const NEO4J_URI = process.env.NEO4J_URI ?? "bolt://localhost:7687";
const NEO4J_USER = process.env.NEO4J_USER ?? "neo4j";
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD ?? "";

/** 允许读 /status 的浏览器源（仅 dsh web 的 loopback 写法；可用 TSM_STATUS_ORIGINS 覆盖） */
const STATUS_ORIGINS = new Set(
  (process.env.TSM_STATUS_ORIGINS ?? "http://127.0.0.1:3080,http://localhost:3080").split(","),
);

// ── 懒加载共享上下文（跨会话复用；LanceDB 多读、Neo4j 驱动线程安全）──
// 失败不缓存：reject 时把缓存复位，下次调用自动重试——这样「Neo4j / MCP 谁先起」
// 都行，中途断开再拉起也能自愈（否则一个 rejected promise 会一直吐错到进程重启）。
let storePromise: Promise<LanceStore> | null = null;
let graphPromise: Promise<Neo4jGraph> | null = null;
const withReset = <T>(reset: () => void, p: Promise<T>): Promise<T> =>
  p.catch((e) => {
    reset();
    throw e;
  });
const getStore = () =>
  (storePromise ??= withReset(() => (storePromise = null), LanceStore.open(STORE_DIR, MODEL_DIR)));
const getGraph = () =>
  (graphPromise ??= withReset(
    () => (graphPromise = null),
    Neo4jGraph.connect(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD),
  ));

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
        "[DLR] L2 领域共识检索（Domain Consensus）：召回领域共识条目——" +
        "基于 L1 schema 的背景知识与术语（术语→列/值、公式、口径），非明细数据。" +
        "namespace 留空做跨库召回（与 dlr_semantic_query 的 db 留空同口径），命中自带 namespace 与原题 question，" +
        "用它判断这条共识是否对得上本题；确定目标库后必须传 namespace 避免跨库串扰。",
      inputSchema: {
        namespace: z
          .string()
          .default("")
          .describe("库名，如 debit_card_specializing；留空 = 跨库召回（命中里带 namespace 分辨来源）"),
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
    "dlr_search_sop",
    {
      description:
        "[DLR] L3 业务逻辑级 SOP 检索：按题面取「复述本题」的那一节（题级口径/陷阱/Expected）。" +
        "match=exact（标题与本题逐字相同）→ 该节是本题最权威口径，按它执行；" +
        "match=similar → 只是近似候选，**只有标题逐字复述本题时才采用**；" +
        "match=none → 本题无 L3 节，按 L1 描述 + L2 共识自解。",
      inputSchema: {
        question: z.string().describe("题目原文（逐字传入，用于精确命中）"),
        top_k: z.number().int().positive().default(2),
      },
    },
    async ({ question, top_k }) => {
      const r = await searchSop(await getStore(), question, top_k);
      return { content: [{ type: "text", text: JSON.stringify(r) }] };
    },
  );

  server.registerTool(
    "get_full_data_info",
    {
      description:
        "[DLR] 下探物理表全量列信息（数据集原始描述 + 每列 in_modeled_view 标注）——" +
        "get_pe_mapping 只回建模视图内的列；**仅当视图不足以回答问题时**才用本工具下探物理表其余列。" +
        "用过之后，请在最终答案的「建模缺口」一节固定反馈：哪张表的哪列缺口、为何视图内没有、建议（升入视图 / 升 public / 不管）。",
      inputSchema: {
        pe_id: z.string().default("").describe("物理实体 id（如 PHYSICAL.School）；与 db+table 二选一"),
        db: z.string().default("").describe("库名（如 california_schools）；与 table 搭配"),
        table: z.string().default("").describe("表名（如 schools）；与 db 搭配"),
        columns: z.array(z.string()).optional().describe("只看部分列时传（可省，默认整表列清单）"),
      },
    },
    async ({ pe_id, db, table, columns }) => ({
      content: [{ type: "text", text: JSON.stringify(getFullDataInfo({ peId: pe_id, db, table, columns })) }],
    }),
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
        // ── /status：健康 + 资产快照（给 dsh 状态面板；CORS 仅放行 dsh web 源）──
        if (req.method === "GET" && (req.url === "/status" || req.url?.startsWith("/status?"))) {
          const origin = req.headers.origin;
          const headers: Record<string, string> = {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
          };
          if (origin && STATUS_ORIGINS.has(origin)) headers["access-control-allow-origin"] = origin;
          res.writeHead(200, headers).end(JSON.stringify(await buildStatus({ getStore, getGraph })));
          return;
        }

        // ── /viz/dlr：把自包含图谱页端出来（实时渲染；浏览器不能从 http 跳 file://）──
        if (req.method === "GET" && req.url?.startsWith("/viz/dlr")) {
          const db = new URL(req.url, "http://localhost").searchParams.get("db") ?? undefined;
          res
            .writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" })
            .end(renderVizHtml(db));
          return;
        }

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
