#!/usr/bin/env node
/**
 * tsm —— TSM Core Service 的统一 CLI（**运行态与开发态同一入口**）
 *
 *   tsm serve  [--http <port> | --stdio]     起 MCP server（默认 --http 28795）
 *   tsm status [--port <port>]               打印 /status 健康快照（JSON）
 *   tsm build  [lance|consensus|sop|graph|all] [--wipe]   构建（graph 需 Neo4j 在跑）
 *   tsm verify [脚本名]                       跑 verify 套件（默认 precheck）
 *   tsm fetch-model [<目标目录>]              拉取 ONNX 模型（默认到解析后的 MODEL_DIR）
 *
 * 实现：用包内 tsx 直接跑 TS 源码（无需先编译）；一切路径由脚本自身位置推导（cwd 无关）。
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/TSM Core Service/bin
const ROOT = path.resolve(HERE, ".."); // …/TSM Core Service

/** tsx CLI 解析：TSM_TSX 显式指定 → 模块解析（tsx/cli；不能用 "tsx"，那是 loader.mjs）→ 包内旧位置兜底 */
const require_ = createRequire(import.meta.url);
const TSX_CLI = (() => {
  if (process.env.TSM_TSX) return process.env.TSM_TSX;
  try {
    return require_.resolve("tsx/cli");
  } catch {
    return path.join(ROOT, "node_modules", "tsx", "dist", "cli.mjs");
  }
})();

/** 跑一个 src/** 下的 TS 入口（继承 stdio，返回退出码；cwd = 调用者目录，包目录可能只读） */
const runTs = (entry, args = []) =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, [TSX_CLI, path.join(ROOT, "src", entry), ...args], {
      cwd: process.cwd(),
      stdio: "inherit",
    });
    child.on("exit", (code) => resolve(code ?? 1));
  });

const usage = () => {
  console.log(`tsm —— TSM Core Service CLI

  tsm serve  [--http <port> | --stdio]              起 MCP server（默认 --http 28795）
  tsm status [--port <port>]                        打印 /status 快照
  tsm build  [lance|consensus|sop|graph|all] [--wipe]   构建（graph 需 Neo4j 在跑）
  tsm verify [precheck|parity_dlr|tool_parity|...]  跑 verify 脚本（默认 precheck）
  tsm fetch-model [<dir>]                           拉取 ONNX 模型（默认解析后的 MODEL_DIR）
  tsm viz    [--open] [--db <库名>]                 生成自包含的 DLR 图谱页（开发态）
  tsm coverage [--db <库名>] [--out <file>]         建模覆盖度对账（数据集原生语义 ↔ L1/L2/L3）
  tsm grade    --run <目录>                         跑批结果判定与汇总（run_batch.sh 的产物）
  tsm stats    [--no-sync] [--open]                 综合统计（图/文字）+ 明细文档 DETAIL.md + 同步 README
  tsm scenario                                      当前生效场景的解析结果（来源/目录/数据集/输出）`);
};

const [cmd, ...rest] = process.argv.slice(2);
let code = 0;

switch (cmd) {
  case "serve": {
    code = await runTs("mcp/server.ts", rest.length ? rest : ["--http", "28795"]);
    break;
  }

  case "status": {
    const i = rest.indexOf("--port");
    const port = i >= 0 ? rest[i + 1] : "28795";
    try {
      const res = await fetch(`http://127.0.0.1:${port}/status`);
      console.log(JSON.stringify(await res.json(), null, 2));
    } catch (e) {
      console.error(`[ERR] 取不到 /status（:${port} 上的服务没起？）：${e}`);
      code = 1;
    }
    break;
  }

  case "build": {
    const what = rest.find((a) => !a.startsWith("-")) ?? "all";
    const wipe = rest.includes("--wipe");
    if (what === "lance" || what === "all") code ||= await runTs("build/buildLance.ts", ["--all"]);
    if (what === "consensus" || what === "all") code ||= await runTs("build/buildConsensus.ts", []);
    if (what === "sop" || what === "all") code ||= await runTs("build/buildSop.ts", []);
    if (what === "graph" || what === "all")
      // 按后端分派：Neo4j 写入 / 内存图自检（见 src/graph/buildGraph.ts）
      code ||= await runTs("graph/buildGraph.ts", wipe ? ["--all", "--wipe"] : ["--all"]);
    if (!["lance", "consensus", "sop", "graph", "all"].includes(what)) {
      console.error(`[ERR] 未知构建目标：${what}`);
      usage();
      code = 1;
    }
    break;
  }

  case "verify": {
    const name = rest[0] ?? "precheck";
    code = await runTs(`verify/${name}.ts`, rest.slice(1));
    break;
  }

  case "fetch-model": {
    // 拉取 ONNX 模型到解析后的 MODEL_DIR（安装态与仓库内同一入口）
    code = await runTs("dev/fetchModel.ts", rest);
    break;
  }

  case "viz": {
    // 开发态：生成自包含的 DLR 图谱页（--open 打开；--db 限定单库）
    code = await runTs("viz/buildViz.ts", rest);
    break;
  }

  case "coverage": {
    // 开发态：建模覆盖度对账（数据集原生语义 ↔ L1/L2/L3）
    code = await runTs("dev/coverage.ts", rest);
    break;
  }

  case "grade": {
    // 开发态：跑批结果判定与汇总（run_batch.sh 的产物目录）
    code = await runTs("dev/grade.ts", rest);
    break;
  }

  case "scenario": {
    // 当前生效场景的解析结果（来源/各子目录/数据集/输出落点）
    code = await runTs("dev/scenarioInfo.ts", rest);
    break;
  }

  case "stats": {
    // 开发态：跨轮实测结果综合统计（图 + 文字版 + 同步场景 README）
    code = await runTs("dev/stats.ts", rest);
    break;
  }

  case undefined:
  case "-h":
  case "--help":
  case "help":
    usage();
    break;

  default:
    console.error(`[ERR] 未知命令：${cmd}\n`);
    usage();
    code = 1;
}

process.exit(code);
