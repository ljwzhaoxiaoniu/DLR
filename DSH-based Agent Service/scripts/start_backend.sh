#!/usr/bin/env bash
# 一键起语义后端（Neo4j + TS MCP server）+ 预检
# 幂等：已在跑的不重复起。
# 用法: bash "DSH-based Agent Service/scripts/start_backend.sh"
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
ROOT="$(cd "$HERE/../.." && pwd -W)"
TSM="$ROOT/TSM Core Service"
NEO4J_HOME="${NEO4J_HOME:-D:/neo4j/neo4j-community-5.26.30}"
JAVA_HOME_WIN="${JAVA_HOME_WIN:-D:\\neo4j\\jdk-21.0.12.1+1}"
mkdir -p "$ROOT/tmp_scripts"

# 1) Neo4j（免安装 zip + 便携 JDK，前台 console 常驻）
if curl -s -o /dev/null -m 3 "http://127.0.0.1:7474/" 2>/dev/null; then
  echo "[ok]    Neo4j 已在跑 (:7474)"
else
  echo "[start] Neo4j console…"
  ( cd "$NEO4J_HOME" && JAVA_HOME="$JAVA_HOME_WIN" nohup cmd //c "bin\\neo4j.bat console" > "$ROOT/tmp_scripts/neo4j_console.log" 2>&1 & )
  for i in $(seq 1 30); do
    sleep 2
    curl -s -o /dev/null -m 2 "http://127.0.0.1:7474/" 2>/dev/null && break
  done
  curl -s -o /dev/null -m 2 "http://127.0.0.1:7474/" 2>/dev/null \
    && echo "[ok]    Neo4j 起来了" \
    || { echo "[ERR]   Neo4j 未起来，看 tmp_scripts/neo4j_console.log"; exit 1; }
fi

# 2) TS MCP server（streamable-http :28795）
if (cd "$TSM" && npx tsx src/verify/precheck.ts >/dev/null 2>&1); then
  echo "[ok]    TS MCP server 已在跑 (:28795)"
else
  echo "[start] TS MCP server…"
  ( cd "$TSM" && nohup npx tsx src/mcp/server.ts --http 28795 > "$ROOT/tmp_scripts/tsm_mcp.log" 2>&1 & )
  for i in $(seq 1 15); do
    sleep 2
    (cd "$TSM" && npx tsx src/verify/precheck.ts >/dev/null 2>&1) && break
  done
fi

# 3) 预检（也是给上面两步的验收）
cd "$TSM" && npx tsx src/verify/precheck.ts
