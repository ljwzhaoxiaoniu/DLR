#!/usr/bin/env bash
# DLR Web UI 启动器（dsh web + DLR 受限 preset）
#
# 用法: bash run_web.sh [--port <n>] [--no-open]
#   - 默认 3080，自动开浏览器；URL 带 token，用终端打印的那条进
#   - 进 UI 后先选工作区 D:\Code_Proj\DLR Proj\DSH-based Agent Service（AGENTS.md 靠它加载）
#   - 会话默认 preset = dlr（语义业务助手）；可在会话设置里切换
#
# 注意：不要裸跑 `dsh web`——DLR_MCP_BRIDGE_PY 不设的话 MCP 行起不来。
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
SVC_DIR="$(cd "$HERE/.." && pwd -W)"
PY_WIN="${PY_WIN:-D:/ProgramData/anaconda3/envs/lepe_som/python.exe}"
PATCH="$HERE/dsh-web.patch.yml"

export DSH_HOME="$SVC_DIR/.dsh-home"
export DLR_MCP_BRIDGE_PY="$PY_WIN"
export PYTHONIOENCODING=utf-8

# 凭据：把 .env 载入进程环境（dsh 凭据链里「继承环境」优先级最高）
if [ -f "$HERE/.env" ]; then set -a; . "$HERE/.env"; set +a; fi

if ! curl -s -o /dev/null -m 3 "http://localhost:28775/" 2>/dev/null; then
  echo "[WARN] DLR 语义服务（28775）当前不可达——UI 能起来，但 MCP 工具会起不来；先起 serve 再用。" >&2
fi

cd "$HERE"
exec dsh web --patch "$PATCH" "$@"
