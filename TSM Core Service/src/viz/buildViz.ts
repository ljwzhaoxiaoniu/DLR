/**
 * tsm viz —— 生成**自包含**的 DLR 图谱页（开发态）
 *
 * 读场景 YAML → 结构载荷（graphData.buildPayload）；把页面模板 + 数据 + vis-network
 * 全部内联成一个 HTML 文件：零服务、零端口、零依赖，双击就能看。
 *
 * 用法:
 *   npx tsx src/viz/buildViz.ts [--open] [--out <file>] [--db <库名>]
 *   （或经 CLI：tsm viz [--open]）
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { buildPayload } from "../model/graphData.js";
import { VIZ_DIR } from "../config.js";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/TSM Core Service/src/viz
const SERVICE_DIR = path.resolve(HERE, "..", ".."); // …/TSM Core Service
const TEMPLATE = path.join(SERVICE_DIR, "static", "dlr.html");
const VENDOR = path.join(SERVICE_DIR, "static", "vendor", "vis-network.min.js");

const arg = (name: string, fallback = ""): string => {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const OPEN = process.argv.includes("--open");
const DB = arg("--db") || undefined;
const OUT = arg("--out") || path.join(VIZ_DIR, "dlr-graph.html");

if (!fs.existsSync(TEMPLATE)) {
  console.error(`[ERR] 页面模板不存在：${TEMPLATE}`);
  process.exit(1);
}
if (!fs.existsSync(VENDOR)) {
  console.error(`[ERR] vis-network 未本地化：${VENDOR}\n      （从 unpkg 取 vis-network@9.1.9/dist/vis-network.min.js 放到 static/vendor/）`);
  process.exit(1);
}

/** 渲染自包含页面（供 CLI 写文件；MCP server 的 `GET /viz/dlr` 也直接用它） */
export function renderVizHtml(db?: string): string {
  const payload = buildPayload(db);
  const template = fs.readFileSync(TEMPLATE, "utf8");
  const visJs = fs.readFileSync(VENDOR, "utf8");

  // 1) 外部 CDN → 本地内联
  let html = template.replace(
    /<script[^>]*src="https:\/\/unpkg\.com\/vis-network[^"]*"[^>]*><\/script>/,
    `<script>/* vis-network 9.1.9 —— 本地化内联（原 CDN: unpkg） */\n${visJs}\n</script>`,
  );
  if (html === template) console.warn("[warn] 未找到 CDN script 标签，跳过内联（模板可能已改）");

  // 2) fetch 数据 → 内联数据（保留 fetch 兜底：万一将来由服务端提供时仍可用）
  const fetchBlock = `const res = await fetch('/api/v1/dlr/graph');
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();`;
  if (!html.includes(fetchBlock)) {
    throw new Error("模板里的取数代码与预期不符（改过？）");
  }
  html = html.replace(
    fetchBlock,
    `const data = window.__DLR_GRAPH__ ?? await (await fetch('/api/v1/dlr/graph')).json();`,
  );

  // 3) 注入数据（放在 </head> 前，页面主脚本运行时已可用）
  return html.replace(
    "</head>",
    `<script>window.__DLR_GRAPH__ = ${JSON.stringify(payload)};</script>\n</head>`,
  );
}

/** 结构计数（CLI 回显用） */
export function payloadCounts(db?: string) {
  const p = buildPayload(db);
  return {
    LE: p.logical_entities.length,
    PE: p.physical_entities.length,
    LA: p.logical_entities.reduce((n, le) => n + le.attributes.length, 0),
    PA: p.physical_entities.reduce((n, pe) => n + pe.attributes.length, 0),
    PAS: p.pas_relations.length,
  };
}

// ── CLI：仅当本文件被直接执行（`tsm viz`）时跑；被 server.ts import 时不跑 ──
const invokedDirectly =
  !!process.argv[1] && path.resolve(process.argv[1]).replace(/\\/g, "/").endsWith("src/viz/buildViz.ts");

if (invokedDirectly) {
  const html = renderVizHtml(DB);
  const outPath = path.resolve(OUT);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);

  const s = payloadCounts(DB);
  console.log(`[viz] ${outPath}  (${(html.length / 1024).toFixed(0)} KB 自包含)`);
  console.log(
    `      LE ${s.LE} · PE ${s.PE} · LA ${s.LA} · PA ${s.PA} · PAS ${s.PAS}${DB ? `  [db=${DB}]` : ""}`,
  );

  if (OPEN) {
    const cmd = process.platform === "win32" ? ["cmd", ["/c", "start", "", outPath]] : ["open", [outPath]];
    spawn(cmd[0] as string, cmd[1] as string[], { detached: true, stdio: "ignore" }).unref();
  }
}
