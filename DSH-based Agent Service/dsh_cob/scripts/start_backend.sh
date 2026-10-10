#!/usr/bin/env bash
# COB 语义后端（dlr-state，:28796）——幂等
#
# 只起 TS MCP server（scenario=cloudopsbench、独立 store）：
#   state 路径（state_model_query / dlr_search_consensus）不依赖 Neo4j，图不装载——
#   birdmini 后端的 :28795 与 Neo4j 完全不受影响（两实例可并存）。
#
# 用法: bash "DSH-based Agent Service/dsh_cob/scripts/start_backend.sh"
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
SVC_DIR="$(cd "$HERE/../.." && pwd -W)"
ROOT="$(cd "$SVC_DIR/.." && pwd -W)"
TSM="$ROOT/TSM Core Service"
SCENARIO="$ROOT/scenarios/cloudopsbench"
STORE="$TSM/.store/lance/cloudopsbench"
PORT="${COB_TSM_PORT:-28796}"
URL="http://127.0.0.1:$PORT/mcp"

mkdir -p "$ROOT/tmp_scripts"

# store 预检：缺即报（build 口径见 scenarios/cloudopsbench/modeling-plan.md §7）
if [ ! -d "$STORE/entities.lance" ]; then
  echo "[ERR]  store 未建: $STORE" >&2
  echo "       先构建: cd \"TSM Core Service\"" >&2
  echo "         TSM_SCENARIO=\"$SCENARIO\" npx tsx src/build/buildLance.ts --all --store .store/lance/cloudopsbench" >&2
  echo "         TSM_SCENARIO=\"$SCENARIO\" npx tsx src/build/buildConsensus.ts --store .store/lance/cloudopsbench" >&2
  exit 1
fi

# 幂等：探活
if (cd "$TSM" && npx tsx src/verify/precheck.ts "$URL" >/dev/null 2>&1); then
  echo "[ok]    COB 语义后端已在跑 ($URL)"
else
  echo "[start] COB TSM MCP server…（scenario=cloudopsbench, store=.store/lance/cloudopsbench）"
  ( cd "$TSM" && TSM_SCENARIO="$SCENARIO" TSM_STORE_DIR="$STORE" nohup npx tsx src/mcp/server.ts --http "$PORT" > "$ROOT/tmp_scripts/cob_tsm.log" 2>&1 & )
  for i in $(seq 1 15); do
    sleep 2
    (cd "$TSM" && npx tsx src/verify/precheck.ts "$URL" >/dev/null 2>&1) && break
  done
fi

# 验收（也作为失败退出）
cd "$TSM" && npx tsx src/verify/precheck.ts "$URL"
