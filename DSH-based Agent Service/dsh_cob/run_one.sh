#!/usr/bin/env bash
# Cloud-OpsBench 单题运行器（dsh 版）
#
# 流程：读 metadata.query → 生成按题指令（静态 AGENTS.md + 上游答案契约原文，逐字）
#       → 起基准诊断 MCP（后台，trap 收尸）→ 双 MCP 预检 → dsh headless → 收产物
#
# 用法: bash run_one.sh <system> <category> <case_id> [out_dir]
#   system: boutique | train-ticket（基准目录名为 boutique / trainticket）
#   例:   bash run_one.sh boutique runtime 1
# 产物: <out_dir>/<stamp>_<key>/（默认 out_dir = tmp_scripts/cob_runs/）
#   instructions.md · <key>_dlr.ndjson · <key>_dlr.err · mcp.jsonl（基准审计）·
#   case_metadata.json（含真值）· meta.yml · bench_mcp.log
# 前提: ① COB 语义后端在跑（scripts/start_backend.sh）② 基准端口（默认 8000）空闲
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
SVC_DIR="$(cd "$HERE/.." && pwd -W)"
ROOT="$(cd "$SVC_DIR/.." && pwd -W)"
TSM_DIR="$ROOT/TSM Core Service"
COB_DIR="${COB_DIR:-/d/Code_Proj/Cloud-OpsBench}"            # 基准检出（快照 ea05daf）
PY="${PY:-/d/ProgramData/anaconda3/envs/lepe_som/python}"    # 绝对路径规则
TIMEOUT="${TIMEOUT:-900}"                                    # RCA 链较长，默认 15 分钟

SYSTEM="${1:?用法: run_one.sh <system> <category> <case_id> [out_dir]}"
CATEGORY="${2:?}"
CASE_ID="${3:?}"
OUT_ROOT="${4:-$ROOT/tmp_scripts/cob_runs}"

# ── system 归一（dir 名 trainticket / 服务名 train-ticket）──
SYS="$(echo "$SYSTEM" | tr '[:upper:]' '[:lower:]')"
case "$SYS" in
  boutique|onlineboutique|online-boutique) SYS=boutique; SYS_DIR=boutique ;;
  train-ticket|trainticket)                SYS=train-ticket; SYS_DIR=trainticket ;;
  *) echo "[ERR] system 只支持 boutique | train-ticket（收到: $SYSTEM）" >&2; exit 2 ;;
esac
CASE_DIR="$COB_DIR/benchmark/$SYS_DIR/$CATEGORY/$CASE_ID"
[ -d "$CASE_DIR" ] || { echo "[ERR] 案例目录不存在: $CASE_DIR" >&2; exit 2; }

# ── 读题面（metadata.json：query + namespace）──
QUERY="$("$PY" -c 'import json,sys; print(json.load(open(sys.argv[1], encoding="utf-8"))["query"])' "$CASE_DIR/metadata.json")"
[ -n "$QUERY" ] || { echo "[ERR] metadata.json 无 query 字段: $CASE_DIR" >&2; exit 2; }
NAMESPACE="$("$PY" -c 'import json,sys; d=json.load(open(sys.argv[1], encoding="utf-8")); print(d.get("namespace") or "")' "$CASE_DIR/metadata.json")"
[ -n "$NAMESPACE" ] || NAMESPACE="$( [ "$SYS" = "train-ticket" ] && echo train-ticket || echo boutique )"
# 题面 = 上游原句（run.py:104-108 逐字；基准的 agent 看到的 Question 即此包装句）
QUESTION="The Kubernetes environment in namespace \`${NAMESPACE}\` is experiencing a fault. A high-level symptom has been reported: '${QUERY}'. Diagnose the root cause of this incident."

STAMP="$(date +%m%d_%H%M)"
KEY="${SYS_DIR}-${CATEGORY}-${CASE_ID}"
RUN_DIR="$OUT_ROOT/${STAMP}_${KEY}"
mkdir -p "$RUN_DIR"

# ── 按题指令：静态工作流 +（上游 build_expected_output 原文，逐字）+ 提交适配 ──
INSTRUCT="$RUN_DIR/instructions.md"
cat "$HERE/AGENTS.md" > "$INSTRUCT"
{
  printf '\n---\n\n## 答案契约（Cloud-OpsBench 原文，逐字附上）\n\n'
  (cd "$COB_DIR/agents/cloudops_agent" && "$PY" -c "from runtime.contracts import build_expected_output; print(build_expected_output('$SYS'))")
  printf '\n---\n\n'
  printf '**提交方式（本环境适配，硬性）**：本组合没有 `Submit` 工具——上面契约中「Submit 的 Action Input」= 你的**最终回答**。最终回答**必须以一个 ```json 代码块收尾**，代码块内容 = 契约规定格式的 JSON 对象（`key_evidence_summary` + `top_3_predictions` 三条，字段名逐字）；诊断报告正文写在代码块之前。**没有这个 JSON 代码块 = 交付失败。**\n'
} >> "$INSTRUCT"

# ── 基准诊断 MCP：端口预检 → 后台起 → 就绪等待（trap 收尸）──
# 注：探测一律用 netstat 判 LISTENING——**不要用 curl 探 /mcp**：GET /mcp 是长挂 SSE 流，
# curl 会拿到 200 后一直等（-m 超时），「curl 不通」并不等于端口空闲（踩过）。
BENCH_PORT="${COB_MCP_PORT:-8000}"
BENCH_URL="${COB_MCP_URL:-http://127.0.0.1:$BENCH_PORT/mcp}"
port_pid() { netstat -ano 2>/dev/null | grep -E "TCP +127\.0\.0\.1:${BENCH_PORT} +0\.0\.0\.0:0 +LISTENING" | awk '{print $NF}' | head -1; }

BUSY="$(port_pid)"
if [ -n "$BUSY" ]; then
  echo "[ERR] 端口 $BENCH_PORT 已被 PID $BUSY 占用（多为上一题未收尸的基准 MCP）——先收尸: taskkill //PID $BUSY //F" >&2
  exit 3
fi

echo "[start] 基准诊断 MCP（$KEY）…"
pushd >/dev/null "$COB_DIR"
CLOUDOPSBENCH_CASE_PATH="$CASE_DIR" \
CLOUDOPSBENCH_SYSTEM="$SYS" \
CLOUDOPSBENCH_FAULT_CATEGORY="$CATEGORY" \
CLOUDOPSBENCH_RUN_ID="$STAMP-$KEY" \
CLOUDOPSBENCH_TRACE_PATH="$RUN_DIR/mcp.jsonl" \
"$PY" -m cloudopsbench_mcp > "$RUN_DIR/bench_mcp.log" 2>&1 &
BENCH_PID=$!
popd >/dev/null

# 收尸双保险：MSYS kill 直杀子进程 + taskkill 按监听 PID 兜底（MSYS kill 有时落不到原生 python）
BENCH_WIN_PID=""
cleanup() {
  kill "$BENCH_PID" 2>/dev/null
  [ -n "$BENCH_WIN_PID" ] && taskkill //PID "$BENCH_WIN_PID" //F >/dev/null 2>&1
  return 0
}
trap cleanup EXIT

# 就绪：等 LISTENING（顺带拿监听 PID 备收尸；T-核对是 python，防误杀他人）
for i in $(seq 1 20); do
  sleep 1
  BENCH_WIN_PID="$(port_pid)"
  [ -n "$BENCH_WIN_PID" ] && break
done
if [ -n "$BENCH_WIN_PID" ] && ! tasklist //FI "PID eq $BENCH_WIN_PID" 2>/dev/null | grep -qi "python.exe"; then
  BENCH_WIN_PID=""   # 监听者不是本次起的 python（理论竞态）→ 不 taskkill
fi

# ── 双 MCP 预检（SKIP_PRECHECK=1 跳过——批跑时预检一次就够）──
MCP_URL="${TSM_MCP_URL:-http://127.0.0.1:28796/mcp}"
if [ "${SKIP_PRECHECK:-0}" != "1" ]; then
  (cd "$TSM_DIR" && npx tsx src/verify/precheck.ts "$MCP_URL") \
    || { echo "[ERR] COB 语义后端不可达: $MCP_URL —— 先跑 dsh_cob/scripts/start_backend.sh" >&2; exit 4; }
  BENCH_OK=0
  for t in 1 2 3; do
    (cd "$TSM_DIR" && npx tsx src/verify/precheck.ts "$BENCH_URL") && { BENCH_OK=1; break; }
    sleep 2
  done
  [ "$BENCH_OK" = 1 ] || { echo "[ERR] 基准诊断 MCP 不可达: $BENCH_URL（见 $RUN_DIR/bench_mcp.log）" >&2; exit 5; }
fi

# ── 凭据 + $DSH_HOME（与 dsh_dlr 同心智：会话日志可取证可删）──
export DSH_HOME="$SVC_DIR/.dsh-home"
if [ -f "$SVC_DIR/dsh_dlr/.env" ]; then set -a; . "$SVC_DIR/dsh_dlr/.env"; set +a; fi

# ── 跑 ──
# ⚠ 指令注入语义（dsh-agent-instructions 源码核实）：候选只认**裸文件名**——含 / \ 的候选
# 会被过滤掉（绝对路径无效！）；加载方式是「从 cwd 逐级向上找候选名」。
# 所以：在 RUN_DIR 里启动 dsh（instructions.md 就地命中），DLR_AGENTS_MD 传裸名。
OUT_FILE="$RUN_DIR/${KEY}_dlr.ndjson"
ERR_FILE="$RUN_DIR/${KEY}_dlr.err"
cd "$RUN_DIR"
TSM_MCP_URL="$MCP_URL" COB_MCP_URL="$BENCH_URL" DLR_AGENTS_MD="instructions.md" \
timeout "$TIMEOUT" dsh --profile headless --patch "$HERE/dsh.patch.yml" --json "Question: ${QUESTION}" \
  < /dev/null > "$OUT_FILE" 2> "$ERR_FILE"
RC=$?

# ── 留档 ──
cp "$CASE_DIR/metadata.json" "$RUN_DIR/case_metadata.json"
{
  echo "system: $SYS"
  echo "category: $CATEGORY"
  echo "case: $CASE_ID"
  echo "query: $QUERY"
  echo "rc: $RC"
  echo "stamp: $STAMP"
  echo "tsm_mcp: $MCP_URL"
  echo "bench_mcp: $BENCH_URL"
} > "$RUN_DIR/meta.yml"

echo "rc=$RC"
echo "run_dir=$RUN_DIR"
[ "$RC" -eq 0 ] || { echo "--- stderr 末尾 ---"; tail -20 "$ERR_FILE"; }
exit "$RC"
