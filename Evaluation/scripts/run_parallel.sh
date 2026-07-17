#!/usr/bin/env bash
# Stage 1 并行执行器 — N 个 opencode 窗口同时跑不同题
# 用法: bash run_parallel.sh <paradigm> <count> <offset> --run-id <name> [--workers N]
# 示例: bash run_parallel.sh er 500 0 --run-id 0717_1800_500q_EDR --workers 6

PARADIGM=$1
COUNT=${2:-10}
OFFSET=${3:-0}
WORKERS=2  # 默认 2 并发

# 解析参数
RUN_ID=""
for arg in "$@"; do
    case "$arg" in
        --run-id) shift; RUN_ID="$5" ;;
        --run-id=*) RUN_ID="${arg#*=}" ;;
        --workers) shift; WORKERS="$5" ;;
        --workers=*) WORKERS="${arg#*=}" ;;
    esac
done
[ -z "$RUN_ID" ] && RUN_ID="${4:-}"
[ -z "$RUN_ID" ] && RUN_ID="$(date +%m%d_%H%M)_${COUNT}q_$(echo $PARADIGM | tr 'a-z' 'A-Z' | head -c1)"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -W)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd -W)"
TIMEOUT=$(python -c "import json; c=json.load(open('$ROOT/config.json')); print(c.get('eval',{}).get('timeout_per_question',300))" 2>/dev/null || echo 300)

LOG_ROOT="$ROOT/Evaluation/outputs/01_logs"
OUTPUT_DIR="$LOG_ROOT/$RUN_ID/$PARADIGM"
AGENT_DIR="$ROOT/OC-based Agent Service/oc_$PARADIGM"
mkdir -p "$OUTPUT_DIR"
echo "$RUN_ID" > "$LOG_ROOT/.last_run_id"

# 生成题目列表
QUESTIONS=$(python -c "
import json
qs = json.load(open('$ROOT/MINIDEV_sqlite/mini_dev_sqlite.json', encoding='utf-8'))
for q in qs[$OFFSET:$OFFSET+$COUNT]:
    print(f\"{q['question_id']}|{q['question']}|{q.get('evidence','')}\")
")

# 写入临时任务文件
TASK_FILE="$OUTPUT_DIR/.tasks.txt"
echo "$QUESTIONS" > "$TASK_FILE"
TOTAL=$(echo "$QUESTIONS" | grep -c '|')

echo "[RUN] $RUN_ID  $PARADIGM  ${COUNT}q  workers=$WORKERS"

# 并行执行函数
run_one() {
    local QID=$1 QUESTION=$2 EVIDENCE=$3
    local OUT_FILE="$OUTPUT_DIR/${QID}.json"
    [ -f "$OUT_FILE" ] && return 0  # 续跑跳过

    local PROMPT="CRITICAL: MCP tools only. Skip list_mcp_resource* — go straight to semantic_query->mapping->sqlite3. Use get_pe_full(DLR) or get_entity_mapping(ER) for complete info in one call. NO glob/read/bash to find databases. End with Final Answer: <result> | Evidence SQL: <sql>. Question: $QUESTION"
    [ -n "$EVIDENCE" ] && PROMPT="$PROMPT | Evidence: $EVIDENCE"

    cd "$AGENT_DIR" || return 1
    timeout "$TIMEOUT" opencode run --format json --title "eval_${PARADIGM}_${QID}" "$PROMPT" < /dev/null > "$OUT_FILE" 2>"$OUTPUT_DIR/${QID}.err"
    local RC=$?
    if [ $RC -eq 0 ]; then
        echo "  [OK] q$QID"
        return 0
    elif [ $RC -eq 124 ]; then
        echo "  [TIMEOUT] q$QID"
        echo "TIMEOUT after ${TIMEOUT}s" > "$OUTPUT_DIR/${QID}.err"
        return 1
    else
        echo "  [FAIL] q$QID (rc=$RC)"
        return 1
    fi
}

# 并行调度: 维持 WORKERS 个活跃任务
OK=0 FAIL=0 DONE=0
while IFS='|' read -r QID QUESTION EVIDENCE; do
    [ -z "$QID" ] && continue

    # 等待有空闲 slot
    while [ $(jobs -r | wc -l) -ge $WORKERS ]; do
        wait -n 2>/dev/null && DONE=$((DONE+1))
    done

    run_one "$QID" "$QUESTION" "$EVIDENCE" &
    DONE=$((DONE+1))
    echo "[$DONE/$TOTAL] q$QID started"
done <<< "$QUESTIONS"

# 等待剩余任务
wait
COMPLETED=$(ls "$OUTPUT_DIR"/*.json 2>/dev/null | wc -l)
OK=$COMPLETED
FAIL=$(grep -l "TIMEOUT\|FAIL" "$OUTPUT_DIR"/*.err 2>/dev/null | wc -l)
OK=$((COMPLETED - FAIL))

echo ""
echo "[DONE] $PARADIGM: ok=$OK fail=$FAIL total=$TOTAL  workers=$WORKERS"
rm -f "$TASK_FILE"
