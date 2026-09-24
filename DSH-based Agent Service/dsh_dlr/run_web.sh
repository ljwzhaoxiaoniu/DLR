#!/usr/bin/env bash
# DLR Web UI 启动器（dsh web + DLR 受限 preset）
#
# 用法: bash run_web.sh [--port <n>] [--no-open]
#   - 默认 3080，自动开浏览器；URL 带 token，用终端打印的那条进
#   - 进 UI 后先选工作区 D:\Code_Proj\DLR Proj\DSH-based Agent Service（AGENTS.md 靠它加载）
#   - 会话默认 preset = dlr（语义业务助手）；可在会话设置里切换
# 后端默认 = TSM Core Service（TS 栈，streamable-http，28795）：
#   npx tsx "TSM Core Service/src/mcp/server.ts" --http 28795
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
SVC_DIR="$(cd "$HERE/.." && pwd -W)"
ROOT="$(cd "$SVC_DIR/.." && pwd -W)"
TSM_DIR="$ROOT/TSM Core Service"
MCP_URL="${TSM_MCP_URL:-http://127.0.0.1:28795/mcp}"

export DSH_HOME="$SVC_DIR/.dsh-home"
# 技能目录绝对路径（web 的 cwd 是 UI 工作区，不能用相对路径）——注入给 dsh-web.patch.yml
export DLR_SKILLS_DIR="$HERE/skills"
export PYTHONIOENCODING=utf-8

# 凭据：把 .env 载入进程环境（dsh 凭据链里「继承环境」优先级最高）
if [ -f "$HERE/.env" ]; then set -a; . "$HERE/.env"; set +a; fi

# 部署件同步：仓库插件（真源）→ dsh 的 out-of-tree 插件位（$DSH_HOME/profiles/node_modules）
# 与 sync_sop.sh 同款思路：仓库里编辑，启动器负责把产物放到运行时该在的地方。
PLUGIN_SRC="$SVC_DIR/plugins/dsh-dlr-status"
if [ -d "$PLUGIN_SRC" ]; then
  mkdir -p "$DSH_HOME/profiles/node_modules"
  rm -rf "$DSH_HOME/profiles/node_modules/dsh-dlr-status"
  cp -r "$PLUGIN_SRC" "$DSH_HOME/profiles/node_modules/"
fi

# 预检（不可达只告警：UI 能起，但工具会起不来）
if ! (cd "$TSM_DIR" && npx tsx src/verify/precheck.ts "$MCP_URL" >/dev/null 2>&1); then
  echo "[WARN] 语义后端不可达（$MCP_URL）——先起：npx tsx \"TSM Core Service/src/mcp/server.ts\" --http 28795" >&2
fi

cd "$HERE"
exec dsh web --patch "$HERE/dsh-web.patch.yml" "$@"
