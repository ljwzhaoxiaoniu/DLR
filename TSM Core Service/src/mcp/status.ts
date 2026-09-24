/**
 * /status —— TSM 语义后端的健康 + 资产快照（HTTP 路由，**不是** MCP 工具）。
 *
 * 设计：**状态从服务自己出**——MCP server 进程本就握着 Neo4j driver 与 LanceDB
 * 句柄，dsh 侧的展示插件只做"读表头"。任何一段探针失败都不抛错：对应小节记
 * `ok:false` + error，整体照常返回（面板因此能区分"服务挂了"与"面板没数据"）。
 */
import * as path from "node:path";
import { SCENARIO } from "../config.js";
import type { LanceStore } from "../store/lance.js";
import type { Neo4jGraph } from "../graph/queries.js";

/** 工具面清单（契约冻结的 5 个，仅作展示） */
const TOOLS = [
  "dlr_semantic_query",
  "dlr_search_consensus",
  "get_pe_mapping",
  "get_le_attrs",
  "execute_sql",
];

/** 向量表（L1 entities / L2 consensus） */
const VECTOR_TABLES = ["entities", "consensus"];

const STARTED_AT = Date.now();

export interface StatusDeps {
  getStore: () => Promise<LanceStore>;
  getGraph: () => Promise<Neo4jGraph>;
}

export async function buildStatus({ getStore, getGraph }: StatusDeps) {
  // ── Neo4j：连通性 + 全图标签计数（LE/PE/PA/PAS…）──
  const neo4j: {
    ok: boolean;
    uri: string;
    browser_url: string;
    nodes: Record<string, number> | null;
    rels: Record<string, number> | null;
    total_nodes: number | null;
    error?: string;
  } = {
    ok: false,
    uri: process.env.NEO4J_URI ?? "bolt://localhost:7687",
    browser_url: process.env.NEO4J_BROWSER_URL ?? "http://localhost:7474",
    nodes: null,
    rels: null,
    total_nodes: null,
  };
  try {
    const graph = await getGraph();
    const nodes = await graph.labelCounts();
    neo4j.nodes = nodes;
    neo4j.rels = await graph.relationshipCounts();
    neo4j.total_nodes = Object.values(nodes).reduce((a, b) => a + b, 0);
    neo4j.ok = true;
  } catch (e) {
    neo4j.error = String(e);
  }

  // ── LanceDB：各向量表行数（表缺失即跳过）──
  const lance: { ok: boolean; tables: Record<string, number>; error?: string } = {
    ok: false,
    tables: {},
  };
  try {
    lance.tables = await (await getStore()).tableCounts(VECTOR_TABLES);
    lance.ok = true;
  } catch (e) {
    lance.error = String(e);
  }

  return {
    ok: neo4j.ok && lance.ok,
    service: "tsm-core",
    pid: process.pid,
    uptime_sec: Math.round((Date.now() - STARTED_AT) / 1000),
    scenario: { name: path.basename(SCENARIO), dir: SCENARIO },
    tools: TOOLS,
    neo4j,
    lance,
    checked_at: new Date().toISOString(),
  };
}
