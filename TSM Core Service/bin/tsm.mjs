#!/usr/bin/env node
/**
 * tsm —— TSM Core Service 的统一 CLI（**运行态与开发态同一入口**）
 *
 *   tsm serve  [--http <port> | --stdio]     起 MCP server（默认 --http 28795）
 *   tsm status [--port <port>]               打印 /status 健康快照（JSON）
 *   tsm build  [lance|consensus|graph|all] [--wipe]   构建（graph 需 Neo4j 在跑）
 *   tsm verify [脚本名]                       跑 verify 套件（默认 precheck）
 *
 * 实现：用包内 tsx 直接跑 TS 源码（无需先编译）；一切路径由脚本自身位置推导（cwd 无关）。
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/TSM Core Service/bin
const ROOT = path.resolve(HERE, ".."); // …/TSM Core Service
const TSX_CLI = path.join(ROOT, "node_modules", "tsx", "dist", "cli.mjs");

/** 跑一个 src/** 下的 TS 入口（继承 stdio，返回退出码） */
const runTs = (entry, args = []) =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, [TSX_CLI, path.join(ROOT, "src", entry), ...args], {
      cwd: ROOT,
      stdio: "inherit",
    });
    child.on("exit", (code) => resolve(code ?? 1));
  });

const usage = () => {
  console.log(`tsm —— TSM Core Service CLI

  tsm serve  [--http <port> | --stdio]              起 MCP server（默认 --http 28795）
  tsm status [--port <port>]                        打印 /status 快照
  tsm build  [lance|consensus|graph|all] [--wipe]   构建（graph 需 Neo4j 在跑）
  tsm verify [precheck|parity_dlr|tool_parity|...]  跑 verify 脚本（默认 precheck）
  tsm viz    [--open] [--db <库名>]                 生成自包含的 DLR 图谱页（开发态）
  tsm coverage [--db <库名>] [--out <file>]         建模覆盖度对账（数据集原生语义 ↔ L1/L2/L3）
  tsm grade    --run <目录>                         跑批结果判定与汇总（run_batch.sh 的产物）
  tsm stats    [--no-sync] [--open]                 综合统计（图/文字）+ 明细文档 DETAIL.md + 同步 README`);
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
    if (what === "graph" || what === "all")
      code ||= await runTs("graph/loadNeo4j.ts", wipe ? ["--all", "--wipe"] : ["--all"]);
    if (!["lance", "consensus", "graph", "all"].includes(what)) {
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
