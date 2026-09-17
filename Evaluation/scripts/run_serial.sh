#!/usr/bin/env bash
# Stage 1 串行执行器 — 跑指定的 N 个题（平铺，逐个跑）
# 用法: bash run_serial.sh <paradigm> <qid...> --run-id <name>
# 示例: bash run_serial.sh er 1471 1472 1473 --run-id 0917_1000_1471-1472-1473_EDR

PARADIGM="$1"
shift || true
QIDS=()
RUN_ID=""

while [ $# -gt 0 ]; do
    case "$1" in
        --run-id) shift; RUN_ID="$1" ;;
        --run-id=*) RUN_ID="${1#*=}" ;;
        -*) echo "[ERR] 未知参数: $1"; exit 1 ;;
        *) QIDS+=("$1") ;;
    esac
    shift
done

if [ -z "$PARADIGM" ] || [ ${#QIDS[@]} -lt 1 ]; then
    echo "用法: bash run_serial.sh <paradigm> <qid...> --run-id <name>"
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
QUESTIONS=$(cd "$ROOT/Evaluation/scripts" && python -c "
import json, sys
qs = json.load(open('$ROOT/MINIDEV_sqlite/mini_dev_sqlite.json', encoding='utf-8'))
targets = {$(IFS=,; echo "${QIDS[*]}")}
for q in qs:
    if q['question_id'] in targets:
        print(f\"{q['question_id']}|{q['question']}|{q.get('evidence','')}\")
")

echo "[RUN] $RUN_ID  $PARADIGM  $(printf 'q%s ' "${QIDS[@]}")"

OK=0
FAIL=0

while IFS='|' read -r QID QUESTION EVIDENCE; do
    [ -z "$QID" ] && continue
    OUT_FILE="$OUTPUT_DIR/${QID}.json"
    ERR_FILE="$OUTPUT_DIR/${QID}.err"
    # 续跑跳过：仅当上一轮成功（输出非空 且 无 .err）——失败/超时也会留下 OUT_FILE，
    # 只判文件存在会把失败静默冻结成"已完成"（与 01_run_agent.py 同口径）
    if [ -s "$OUT_FILE" ] && [ ! -f "$ERR_FILE" ]; then
        echo "[SKIP] q$QID (已成功)"
        continue
    fi

    echo "[RUN] q$QID"

    # v3 RAG: 纯 question，evidence 不注入（Agent 通过 search_evidence 主动检索）
    PROMPT="Question: $QUESTION"

    cd "$AGENT_DIR" || exit 1
    # stderr 单独落盘（旧版 2>&1 会把警告混进 NDJSON）；.err 只在失败时保留（成功即删）
    timeout "$TIMEOUT" opencode run --format json --title "eval_${PARADIGM}_${QID}" "$PROMPT" < /dev/null > "$OUT_FILE" 2>"$ERR_FILE"
    RC=$?

    if [ $RC -eq 0 ]; then
        rm -f "$ERR_FILE"
        echo "  -> OK"
        OK=$((OK+1))
    elif [ $RC -eq 124 ]; then
        echo "  -> TIMEOUT"
        echo "TIMEOUT after ${TIMEOUT}s" >> "$ERR_FILE"
        FAIL=$((FAIL+1))
    else
        echo "  -> FAIL(rc=$RC)"
        [ -s "$ERR_FILE" ] || echo "FAILED rc=$RC (no stderr)" > "$ERR_FILE"
        FAIL=$((FAIL+1))
    fi
done <<< "$QUESTIONS"

echo ""
echo "[DONE] $PARADIGM: ok=$OK fail=$FAIL"
