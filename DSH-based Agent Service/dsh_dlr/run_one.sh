#!/usr/bin/env bash
# DLR 单题运行器（dsh 版）
#
# 对应 Evaluation/scripts/run_parallel.sh 里那条 OC 调用：
#   timeout 600 opencode run --format json --title eval_dlr_<qid> "Question: ..."
# dsh 等价：
#   timeout 600 dsh --profile headless --patch <dsh.patch.yml> --json "Question: ..."
#
# 用法: bash run_one.sh <qid> "<question>" [out_dir]
# 产物: <out_dir>/<MMDD_HHMM>_<qid>_dlr.ndjson（dsh --json 事件流）+ 同名 .err
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
SVC_DIR="$(cd "$HERE/.." && pwd -W)"
ROOT="$(cd "$SVC_DIR/.." && pwd -W)"
PY="${PY:-/d/ProgramData/anaconda3/envs/lepe_som/python}"                            # Git Bash 用
PY_WIN="${PY_WIN:-D:/ProgramData/anaconda3/envs/lepe_som/python.exe}"                # 交给 dsh(Node) 起子进程用
PATCH="$HERE/dsh.patch.yml"
UPSTREAM="${DLR_MCP_UPSTREAM:-http://localhost:28775/mcp/sse}"
TIMEOUT="${TIMEOUT:-600}"

QID="${1:?用法: run_one.sh <qid> \"<question>\" [out_dir]}"
QUESTION="${2:?用法: run_one.sh <qid> \"<question>\" [out_dir]}"
OUT_DIR="${3:-$ROOT/tmp_scripts/dsh_smoke}"

# ── $DSH_HOME 指到仓库内：切断 ~/.dsh 的 user-global 引导，会话日志可取证可删 ──
export DSH_HOME="$SVC_DIR/.dsh-home"
export DLR_MCP_BRIDGE_PY="$PY_WIN"
export PYTHONIOENCODING=utf-8

# 凭据：把 .env 载入进程环境（dsh 凭据链里「继承环境」优先级最高）
if [ -f "$HERE/.env" ]; then set -a; . "$HERE/.env"; set +a; fi

mkdir -p "$OUT_DIR" "$DSH_HOME"
STAMP="$(date +%m%d_%H%M)"
OUT_FILE="$OUT_DIR/${STAMP}_${QID}_dlr.ndjson"
ERR_FILE="$OUT_DIR/${STAMP}_${QID}_dlr.err"

# ── MCP 预检：failOnStartupError 只会响亮报错、不会中止 harness，先验上游再跑 ──
"$PY" - "$UPSTREAM" <<'PYEOF'
import asyncio, sys
from fastmcp import Client

async def main():
    async with Client(sys.argv[1]) as c:
        tools = await c.list_tools()
        print(f"[precheck] upstream ok ({len(tools)} tools): {sorted(t.name for t in tools)}")

asyncio.run(main())
PYEOF
if [ $? -ne 0 ]; then
  echo "[ERR] DLR 语义服务不可达: $UPSTREAM —— 先起 serve（项目主操作），再跑本题" >&2
  exit 3
fi

cd "$HERE"
timeout "$TIMEOUT" dsh --profile headless --patch "$PATCH" --json "Question: ${QUESTION}" \
  < /dev/null > "$OUT_FILE" 2> "$ERR_FILE"
RC=$?

echo "rc=$RC"
echo "out=$OUT_FILE"
echo "err=$ERR_FILE"
[ "$RC" -eq 0 ] || { echo "--- stderr 末尾 ---"; tail -20 "$ERR_FILE"; }
exit "$RC"
