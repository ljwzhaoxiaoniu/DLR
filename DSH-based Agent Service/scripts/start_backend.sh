#!/usr/bin/env bash
# 一键起语义后端（Neo4j + TS MCP server）+ 预检
# 幂等：已在跑的不重复起。
# 用法: bash "DSH-based Agent Service/scripts/start_backend.sh"
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
ROOT="$(cd "$HERE/../.." && pwd -W)"
TSM="$ROOT/TSM Core Service"
# Neo4j 位置：env 优先（NEO4J_HOME / JAVA_HOME_WIN）；否则在常见位置探测——跨机器请显式设置
if [ -z "${NEO4J_HOME:-}" ]; then
  for c in "D:/neo4j/neo4j-community-5.26.30" "$HOME/neo4j" "/opt/neo4j" "/usr/local/neo4j"; do
    [ -d "$c" ] && { NEO4J_HOME="$c"; break; }
  done
fi
# JDK：优先 env；否则找 Neo4j 同级的 jdk-* 便携包（pwd -W 转成 Windows 形式给 neo4j.bat）
if [ -z "${JAVA_HOME_WIN:-}" ] && [ -n "${NEO4J_HOME:-}" ]; then
  jdk="$(ls -d "$(dirname "$NEO4J_HOME")"/jdk-* 2>/dev/null | head -1)"
  [ -n "$jdk" ] && JAVA_HOME_WIN="$(cd "$jdk" && pwd -W)"
fi
mkdir -p "$ROOT/tmp_scripts"

# 1) Neo4j（免安装 zip + 便携 JDK，前台 console 常驻）
if curl -s -o /dev/null -m 3 "http://127.0.0.1:7474/" 2>/dev/null; then
  echo "[ok]    Neo4j 已在跑 (:7474)"
else
  if [ -z "${NEO4J_HOME:-}" ]; then
    echo "[ERR]  未找到 Neo4j：设 NEO4J_HOME 指向安装目录（或先让 :7474 跑起来）" >&2
    exit 1
  fi
  echo "[start] Neo4j console…（$NEO4J_HOME）"
  ( cd "$NEO4J_HOME" && JAVA_HOME="${JAVA_HOME_WIN:-${JAVA_HOME:-}}" nohup cmd //c "bin\\neo4j.bat console" > "$ROOT/tmp_scripts/neo4j_console.log" 2>&1 & )
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
