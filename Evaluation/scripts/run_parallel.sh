#!/usr/bin/env bash
# Stage 1 并行执行器 — 跑指定的两个题
# 用法: bash run_parallel.sh <paradigm> <qid1> <qid2> --run-id <name>
# 示例: bash run_parallel.sh er 1486 1490 --run-id 0720_1000_1486-1490_EDR
# workers 自动计算: 题数 (QID1!=QID2 时 2, 否则 1)

PARADIGM="$1"
QID1="$2"
QID2="$3"
RUN_ID=""

shift 3
while [ $# -gt 0 ]; do
    case "$1" in
        --run-id) shift; RUN_ID="$1" ;;
        --run-id=*) RUN_ID="${1#*=}" ;;
    esac
    shift
done

if [ -z "$PARADIGM" ] || [ -z "$QID1" ] || [ -z "$QID2" ]; then
    echo "用法: bash run_parallel.sh <paradigm> <qid1> <qid2> --run-id <name>"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -W)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd -W)"
TIMEOUT=$(python -c "import json; c=json.load(open('$ROOT/config.json')); print(c.get('eval',{}).get('timeout_per_question',300))" 2>/dev/null || echo 300)

[ -z "$RUN_ID" ] && RUN_ID="$(date +%m%d_%H%M)_${QID1}-${QID2}_$(echo $PARADIGM | tr 'a-z' 'A-Z' | head -c1)"

LOG_ROOT="$ROOT/Evaluation/outputs/01_logs"
OUTPUT_DIR="$LOG_ROOT/$RUN_ID/$PARADIGM"
AGENT_DIR="$ROOT/OC-based Agent Service/oc_$PARADIGM"

mkdir -p "$OUTPUT_DIR"
echo "$RUN_ID" > "$LOG_ROOT/.last_run_id"

# 从数据集取出指定的两道题
QUESTIONS=$(python -c "
import json, sys
sys.stdout.reconfigure(encoding='utf-8')
qs = json.load(open('$ROOT/MINIDEV_sqlite/mini_dev_sqlite.json', encoding='utf-8'))
targets = {$QID1, $QID2}
for q in qs:
    if q['question_id'] in targets:
        print(f\"{q['question_id']}|{q['question']}|{q.get('evidence','')}\")
")

# 写入临时任务文件
TASK_FILE="$OUTPUT_DIR/.tasks.txt"
echo "$QUESTIONS" > "$TASK_FILE"
TOTAL=$(echo "$QUESTIONS" | grep -c '|')
WORKERS=$TOTAL  # 每范式 worker = 实际题目数

echo "[RUN] $RUN_ID  $PARADIGM  q$QID1 + q$QID2  workers=$WORKERS"

run_one() {
    local QID=$1 QUESTION=$2 EVIDENCE=$3
    local OUT_FILE="$OUTPUT_DIR/${QID}.json"
    [ -f "$OUT_FILE" ] && return 0

    local PROMPT="Question: $QUESTION"
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

OK=0 FAIL=0 DONE=0
while IFS='|' read -r QID QUESTION EVIDENCE; do
    [ -z "$QID" ] && continue

    while [ $(jobs -r | wc -l) -ge $WORKERS ]; do
        wait -n 2>/dev/null && DONE=$((DONE+1))
    done

    run_one "$QID" "$QUESTION" "$EVIDENCE" &
    DONE=$((DONE+1))
    echo "[$DONE/$TOTAL] q$QID started"
done <<< "$QUESTIONS"

wait
COMPLETED=$(ls "$OUTPUT_DIR"/*.json 2>/dev/null | wc -l)
OK=$COMPLETED
FAIL=$(grep -l "TIMEOUT\|FAIL" "$OUTPUT_DIR"/*.err 2>/dev/null | wc -l)
OK=$((COMPLETED - FAIL))

echo ""
echo "[DONE] $PARADIGM: ok=$OK fail=$FAIL total=$TOTAL  workers=$WORKERS"
rm -f "$TASK_FILE"
