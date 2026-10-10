/**
 * /status —— TSM 语义后端的健康 + 资产快照（HTTP 路由，**不是** MCP 工具）。
 *
 * 设计：**状态从服务自己出**——MCP server 进程本就握着图句柄与 LanceDB 句柄，
 * dsh 侧的展示插件只做"读表头"。任何一段探针失败都不抛错：对应小节记
 * `ok:false` + error，整体照常返回（面板因此能区分"服务挂了"与"面板没数据"）。
 *
 * 图后端双轨（2026-09-30）：`graph` 段为**当前生效后端**（`memory` 或 `neo4j`）；
 * 旧客户端兼容：`neo4j` 键保留——内存后端时 `enabled:false`（旧面板会画红灯，
 * 但不会报错；新版浮层改读 `graph`）。
 */
import { SCENARIO, SCENARIO_NAME, SCENARIO_SOURCE, YAML_DIR } from "../config.js";
import { scenarioKind } from "../model/scenarioKind.js";
import type { LanceStore } from "../store/lance.js";
import type { GraphHandle } from "../graph/types.js";

/** 工具面清单（**按场景形态**；仅作展示——与 server.ts 的注册保持同步） */
const TOOLS_DLR = [
  "dlr_semantic_query",
  "dlr_search_consensus",
  "dlr_search_sop",
  "get_pe_mapping",
  "get_full_data_info",
  "get_le_attrs",
  "execute_sql",
];
const TOOLS_STATE = ["state_model_query", "dlr_search_consensus"];

/** 向量表（L1 entities / L2 consensus / L3 sop 索引） */
const VECTOR_TABLES = ["entities", "consensus", "sop"];

const STARTED_AT = Date.now();

export interface StatusDeps {
  getStore: () => Promise<LanceStore>;
  getGraph: () => Promise<GraphHandle>;
  /** HTTP 基址（如 http://127.0.0.1:28795）；stdin/stdio 模式可缺省 */
  httpBase?: string;
}

export async function buildStatus({ getStore, getGraph, httpBase }: StatusDeps) {
  // ── 图：连通性 + 全图标签计数（LE/PE/PA/PAS…）；后端可能是内存图或 Neo4j ──
  const graph: {
    backend: "memory" | "neo4j" | "unknown";
    ok: boolean;
    nodes: Record<string, number> | null;
    rels: Record<string, number> | null;
    total_nodes: number | null;
    source: { scenario: string; yaml_dir: string };
    fallback_reason?: string;
    error?: string;
  } = {
    backend: "unknown",
    ok: false,
    nodes: null,
    rels: null,
    total_nodes: null,
    source: { scenario: SCENARIO_NAME, yaml_dir: YAML_DIR },
  };
  try {
    const g = await getGraph();
    graph.backend = g.backend;
    if (g.fallback_reason) graph.fallback_reason = g.fallback_reason;
    const nodes = await g.labelCounts();
    graph.nodes = nodes;
    graph.rels = await g.relationshipCounts();
    graph.total_nodes = Object.values(nodes).reduce((a, b) => a + b, 0);
    graph.ok = true;
  } catch (e) {
    graph.error = String(e);
  }

  // ── 兼容旧客户端：neo4j 键保留（内存后端时 enabled:false）──
  const neo4j = {
    enabled: graph.backend === "neo4j",
    ok: graph.backend === "neo4j" && graph.ok,
    uri: process.env.NEO4J_URI ?? "bolt://localhost:7687",
    browser_url: process.env.NEO4J_BROWSER_URL ?? "http://localhost:7474",
    nodes: graph.backend === "neo4j" ? graph.nodes : null,
    rels: graph.backend === "neo4j" ? graph.rels : null,
    total_nodes: graph.backend === "neo4j" ? graph.total_nodes : null,
    ...(graph.backend === "neo4j" && !graph.ok && graph.error ? { error: graph.error } : {}),
  };

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
    ok: graph.ok && lance.ok,
    service: "tsm-core-dlr",
    pid: process.pid,
    uptime_sec: Math.round((Date.now() - STARTED_AT) / 1000),
    service_info: {
      http_base: httpBase ?? null,
      viz_url: httpBase ? `${httpBase}/viz/dlr` : null,
    },
    scenario: { name: SCENARIO_NAME, dir: SCENARIO, source: SCENARIO_SOURCE },
    tools: scenarioKind() === "dlr-state" ? TOOLS_STATE : TOOLS_DLR,
    graph,
    neo4j,
    lance,
    checked_at: new Date().toISOString(),
  };
}
