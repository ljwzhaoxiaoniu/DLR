#!/usr/bin/env bash
# DLR 单题运行器（dsh 版）
#
# 默认后端 = TSM Core Service（TS 栈，streamable-http，端口 28795）：
#   timeout 600 dsh --profile headless --patch <dsh.patch.yml> --json "Question: ..."
#
# 用法: bash run_one.sh <qid> "<question>" [out_dir]
# 产物: <out_dir>/<MMDD_HHMM>_<qid>_dlr.ndjson（dsh --json 事件流）+ 同名 .err
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
SVC_DIR="$(cd "$HERE/.." && pwd -W)"
ROOT="$(cd "$SVC_DIR/.." && pwd -W)"
TSM_DIR="$ROOT/TSM Core Service"
PATCHES=(--patch "$HERE/dsh.patch.yml")
MCP_URL="${TSM_MCP_URL:-http://127.0.0.1:28795/mcp}"
TIMEOUT="${TIMEOUT:-600}"

QID="${1:?用法: run_one.sh <qid> \"<question>\" [out_dir]}"
QUESTION="${2:?用法: run_one.sh <qid> \"<question>\" [out_dir]}"
OUT_DIR="${3:-$ROOT/tmp_scripts/dsh_smoke}"

# ── $DSH_HOME 指到仓库内：切断 ~/.dsh 的 user-global 引导，会话日志可取证可删 ──
export DSH_HOME="$SVC_DIR/.dsh-home"
# 技能目录（bundle 内的 skills；bundle 的 node 半也会设，这里显式兜底）
export DLR_SKILLS_DIR="$SVC_DIR/dsh-tsm/skills"

# 凭据：把 .env 载入进程环境（dsh 凭据链里「继承环境」优先级最高）
if [ -f "$HERE/.env" ]; then set -a; . "$HERE/.env"; set +a; fi

mkdir -p "$OUT_DIR" "$DSH_HOME"
STAMP="$(date +%m%d_%H%M)"
OUT_FILE="$OUT_DIR/${STAMP}_${QID}_dlr.ndjson"
ERR_FILE="$OUT_DIR/${STAMP}_${QID}_dlr.err"

# ── MCP 预检：failOnStartupError 只响亮报错、不中止 harness，先验后端再跑 ──
# 批跑（run_batch.sh）设 SKIP_PRECHECK=1 跳过——预检一次就够，省掉每题几秒 tsx 启动
if [ "${SKIP_PRECHECK:-0}" != "1" ]; then
  (cd "$TSM_DIR" && npx tsx src/verify/precheck.ts "$MCP_URL")
  if [ $? -ne 0 ]; then
    echo "[ERR] 语义后端不可达: $MCP_URL —— 先起后端：bash \"$ROOT/DSH-based Agent Service/scripts/start_backend.sh\"" >&2
    exit 3
  fi
fi

cd "$HERE"
timeout "$TIMEOUT" dsh --profile headless "${PATCHES[@]}" --json "Question: ${QUESTION}" \
  < /dev/null > "$OUT_FILE" 2> "$ERR_FILE"
RC=$?

echo "rc=$RC"
echo "out=$OUT_FILE"
echo "err=$ERR_FILE"
[ "$RC" -eq 0 ] || { echo "--- stderr 末尾 ---"; tail -20 "$ERR_FILE"; }
exit "$RC"
