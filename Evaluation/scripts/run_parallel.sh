#!/usr/bin/env bash
# Stage 1 并行执行器 — 跑指定的 N 个题（平铺）
# 用法: bash run_parallel.sh <paradigm> <qid...> --run-id <name> [--workers N]
# 示例: bash run_parallel.sh er 1471 1472 1473 --run-id 0917_1000_1471-1472-1473_EDR
# workers 默认 = 题数；--workers 传入上限（eval_run.sh 按 6 路总并发折算）

PARADIGM="$1"
shift || true
QIDS=()
RUN_ID=""
WORKERS_CAP=""

while [ $# -gt 0 ]; do
    case "$1" in
        --run-id) shift; RUN_ID="$1" ;;
        --run-id=*) RUN_ID="${1#*=}" ;;
        --workers) shift; WORKERS_CAP="$1" ;;
        --workers=*) WORKERS_CAP="${1#*=}" ;;
        -*) echo "[ERR] 未知参数: $1"; exit 1 ;;
        *) QIDS+=("$1") ;;
    esac
    shift
done

if [ -z "$PARADIGM" ] || [ ${#QIDS[@]} -lt 1 ]; then
    echo "用法: bash run_parallel.sh <paradigm> <qid...> --run-id <name> [--workers N]"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -W)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd -W)"
TIMEOUT=$(python -c "import json; c=json.load(open('$ROOT/config.json')); print(c.get('eval',{}).get('timeout_per_question',300))" 2>/dev/null || echo 300)
EVAL_OUT=$(python -c "import json; c=json.load(open('$ROOT/config.json')); print(c.get('eval',{}).get('output_dir','Evaluation/outputs'))" 2>/dev/null || echo "Evaluation/outputs")

[ -z "$RUN_ID" ] && RUN_ID="$(date +%m%d_%H%M)_$(IFS=-; echo "${QIDS[*]}")_$(echo $PARADIGM | tr 'a-z' 'A-Z' | head -c1)"

LOG_ROOT="$ROOT/$EVAL_OUT/01_logs"
OUTPUT_DIR="$LOG_ROOT/$RUN_ID/$PARADIGM"
AGENT_DIR="$ROOT/OC-based Agent Service/oc_$PARADIGM"

mkdir -p "$OUTPUT_DIR"
echo "$RUN_ID" > "$LOG_ROOT/.last_run_id"

# 从数据集取出指定的题
QUESTIONS=$(python -c "
import json, sys
sys.stdout.reconfigure(encoding='utf-8')
qs = json.load(open('$ROOT/MINIDEV_sqlite/mini_dev_sqlite.json', encoding='utf-8'))
targets = {$(IFS=,; echo "${QIDS[*]}")}
for q in qs:
    if q['question_id'] in targets:
        print(f\"{q['question_id']}|{q['question']}|{q.get('evidence','')}\")
")

# 写入临时任务文件
TASK_FILE="$OUTPUT_DIR/.tasks.txt"
echo "$QUESTIONS" > "$TASK_FILE"
TOTAL=$(echo "$QUESTIONS" | grep -c '|')
WORKERS=$TOTAL  # 默认：每范式 worker = 实际题目数
if [ -n "$WORKERS_CAP" ] && [ "$WORKERS_CAP" -lt "$WORKERS" ]; then
    WORKERS=$WORKERS_CAP  # 并发上限（eval_run.sh 折算的 6 路总并发）
fi

echo "[RUN] $RUN_ID  $PARADIGM  $(printf 'q%s ' "${QIDS[@]}")  workers=$WORKERS"

run_one() {
    local QID=$1 QUESTION=$2 EVIDENCE=$3
    local OUT_FILE="$OUTPUT_DIR/${QID}.json"
    local ERR_FILE="$OUTPUT_DIR/${QID}.err"

    # 续跑跳过：仅当上一轮成功（输出非空 且 无 .err）——失败/超时也会留下 OUT_FILE，
    # 只判文件存在会把失败静默冻结成"已完成"（与 01_run_agent.py 同口径）
    if [ -s "$OUT_FILE" ] && [ ! -f "$ERR_FILE" ]; then
        echo "  [SKIP] q$QID (已成功)"
        return 0
    fi

    # v3 RAG: 纯 question，evidence 不注入（Agent 通过 search_evidence 主动检索）
    local PROMPT="Question: $QUESTION"

    cd "$AGENT_DIR" || return 1
    # stderr 单独落盘，不污染 NDJSON；.err 只在失败时保留（成功即删）——是"是否成功"的唯一标记
    timeout "$TIMEOUT" opencode run --format json --title "eval_${PARADIGM}_${QID}" "$PROMPT" < /dev/null > "$OUT_FILE" 2>"$ERR_FILE"
    local RC=$?
    if [ $RC -eq 0 ]; then
        rm -f "$ERR_FILE"
        echo "  [OK] q$QID"
        return 0
    elif [ $RC -eq 124 ]; then
        echo "  [TIMEOUT] q$QID"
        echo "TIMEOUT after ${TIMEOUT}s" >> "$ERR_FILE"
        return 1
    else
        echo "  [FAIL] q$QID (rc=$RC)"
        [ -s "$ERR_FILE" ] || echo "FAILED rc=$RC (no stderr)" > "$ERR_FILE"
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
# .err 只在失败/超时时存在（成功即删）→ 直接数 .err，不再 grep 内容
FAIL=$(ls "$OUTPUT_DIR"/*.err 2>/dev/null | wc -l)
OK=$((COMPLETED - FAIL))

echo ""
echo "[DONE] $PARADIGM: ok=$OK fail=$FAIL total=$TOTAL  workers=$WORKERS"
rm -f "$TASK_FILE"
