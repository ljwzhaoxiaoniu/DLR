#!/usr/bin/env bash
# Stage 1 串行执行器 — 在 git-bash 中运行,保证 opencode MCP 可用
# 用法: bash run_serial.sh <paradigm> <count> <offset> [--run-id <name>]
# 示例: bash run_serial.sh er 10 0
#       bash run_serial.sh er 5 0 --run-id test_20260717

PARADIGM=$1
COUNT=${2:-10}
OFFSET=${3:-0}

# 解析 --run-id (支持位置参数后)
RUN_ID=""
for arg in "$@"; do
    case "$arg" in
        --run-id) shift ;;  # 下一个参数是值
        --run-id=*) RUN_ID="${arg#*=}" ;;
    esac
done
# 也支持第4个位置参数
[ -z "$RUN_ID" ] && RUN_ID="${4:-}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -W)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd -W)"
TIMEOUT=$(python -c "import json; c=json.load(open('$ROOT/config.json')); print(c.get('eval',{}).get('timeout_per_question',300))" 2>/dev/null || echo 300)

# 自动生成 run-id: MMDD_HHMM_{count}q_{paradigm_letter} (E=ER, D=DLR, R=RDF)
if [ -z "$RUN_ID" ]; then
    case "$PARADIGM" in er) PL="E";; dlr) PL="D";; rdf) PL="R";; *) PL="$PARADIGM";; esac
    RUN_ID="$(date +%m%d_%H%M)_${COUNT}q_${PL}"
fi

LOG_ROOT="$ROOT/Evaluation/outputs/01_logs"
OUTPUT_DIR="$LOG_ROOT/$RUN_ID/$PARADIGM"
AGENT_DIR="$ROOT/OC-based Agent Service/oc_$PARADIGM"

mkdir -p "$OUTPUT_DIR"
echo "$RUN_ID" > "$LOG_ROOT/.last_run_id"
echo "[RUN] $RUN_ID  $PARADIGM  ${COUNT}q  offset=$OFFSET"

# 用 python 生成题目列表(offset 为 question_id 起始值,count 为题数)
QUESTIONS=$(cd "$ROOT/Evaluation/scripts" && python -c "
import json
qs = json.load(open('$ROOT/MINIDEV_sqlite/mini_dev_sqlite.json', encoding='utf-8'))
start = next((i for i, q in enumerate(qs) if q['question_id'] >= $OFFSET), len(qs))
for q in qs[start:start+$COUNT]:
    print(f\"{q['question_id']}|{q['question']}|{q.get('evidence','')}\")
")

OK=0
FAIL=0
TOTAL=$(echo "$QUESTIONS" | wc -l)

while IFS='|' read -r QID QUESTION EVIDENCE; do
    # 跳过空 QID(Python 生成失败时的脏数据)
    [ -z "$QID" ] && continue
    OUT_FILE="$OUTPUT_DIR/${QID}.json"
    if [ -f "$OUT_FILE" ]; then
        echo "[SKIP] q$QID (already exists)"
        continue
    fi

    echo "[RUN] q$QID ($((OK+FAIL+1))/$TOTAL)"

    # 构造 prompt — 强制 MCP 路径 + 单行避免换行截断
    PROMPT="Question: $QUESTION"
    [ -n "$EVIDENCE" ] && PROMPT="$PROMPT | Evidence: $EVIDENCE"

    # 在 agent 目录下执行(opencode.json 在该目录)
    cd "$AGENT_DIR" || exit 1

    # 用 timeout 保护 + opencode run 串行
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
echo "[DONE] $PARADIGM: ok=$OK fail=$FAIL total=$TOTAL"
