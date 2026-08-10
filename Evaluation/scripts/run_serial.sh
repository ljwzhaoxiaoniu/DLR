#!/usr/bin/env bash
# Stage 1 串行执行器 — 跑指定的两个题
# 用法: bash run_serial.sh <paradigm> <qid1> <qid2> --run-id <name>
# 示例: bash run_serial.sh er 1486 1490 --run-id 0720_1000_1486-1490_EDR

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
    echo "用法: bash run_serial.sh <paradigm> <qid1> <qid2> --run-id <name>"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -W)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd -W)"
TIMEOUT=$(python -c "import json; c=json.load(open('$ROOT/config.json')); print(c.get('eval',{}).get('timeout_per_question',300))" 2>/dev/null || echo 300)
EVAL_OUT=$(python -c "import json; c=json.load(open('$ROOT/config.json')); print(c.get('eval',{}).get('output_dir','Evaluation/outputs'))" 2>/dev/null || echo "Evaluation/outputs")

[ -z "$RUN_ID" ] && RUN_ID="$(date +%m%d_%H%M)_${QID1}-${QID2}_$(echo $PARADIGM | tr 'a-z' 'A-Z' | head -c1)"

LOG_ROOT="$ROOT/$EVAL_OUT/01_logs"
OUTPUT_DIR="$LOG_ROOT/$RUN_ID/$PARADIGM"
AGENT_DIR="$ROOT/OC-based Agent Service/oc_$PARADIGM"

mkdir -p "$OUTPUT_DIR"
echo "$RUN_ID" > "$LOG_ROOT/.last_run_id"

# 从数据集取出指定的两道题
QUESTIONS=$(cd "$ROOT/Evaluation/scripts" && python -c "
import json, sys
qs = json.load(open('$ROOT/MINIDEV_sqlite/mini_dev_sqlite.json', encoding='utf-8'))
targets = {$QID1, $QID2}
for q in qs:
    if q['question_id'] in targets:
        print(f\"{q['question_id']}|{q['question']}|{q.get('evidence','')}\")
")

echo "[RUN] $RUN_ID  $PARADIGM  q$QID1 + q$QID2"

OK=0
FAIL=0

while IFS='|' read -r QID QUESTION EVIDENCE; do
    [ -z "$QID" ] && continue
    OUT_FILE="$OUTPUT_DIR/${QID}.json"
    if [ -f "$OUT_FILE" ]; then
        echo "[SKIP] q$QID (already exists)"
        continue
    fi

    echo "[RUN] q$QID"

    PROMPT="Question: $QUESTION"
    [ -n "$EVIDENCE" ] && PROMPT="$PROMPT | Evidence: $EVIDENCE"

    cd "$AGENT_DIR" || exit 1
    timeout "$TIMEOUT" opencode run --format json --title "eval_${PARADIGM}_${QID}" "$PROMPT" < /dev/null > "$OUT_FILE" 2>&1
    RC=$?

    if [ $RC -eq 0 ]; then
        echo "  -> OK"
        OK=$((OK+1))
    elif [ $RC -eq 124 ]; then
        echo "  -> TIMEOUT"
        echo "TIMEOUT after ${TIMEOUT}s" > "$OUTPUT_DIR/${QID}.err"
        FAIL=$((FAIL+1))
    else
        echo "  -> FAIL(rc=$RC)"
        FAIL=$((FAIL+1))
    fi
done <<< "$QUESTIONS"

echo ""
echo "[DONE] $PARADIGM: ok=$OK fail=$FAIL"
