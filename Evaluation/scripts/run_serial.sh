#!/usr/bin/env bash
# Stage 1 串行执行器 — 在 git-bash 中运行,保证 opencode MCP 可用
# 用法: bash run_serial.sh <paradigm> <count> <offset>
# 示例: bash run_serial.sh er 10 0

PARADIGM=$1
COUNT=${2:-10}
OFFSET=${3:-0}
TIMEOUT=300

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
TIMEOUT=$(python -c "import json; c=json.load(open('$ROOT/config.json')); print(c.get('eval',{}).get('timeout_per_question',300))" 2>/dev/null || echo 300)
OUTPUT_DIR="$ROOT/Evaluation/outputs/01_logs/$PARADIGM"
AGENT_DIR="$ROOT/OC-based Agent Service/oc_$PARADIGM"

mkdir -p "$OUTPUT_DIR"

# 用 python 生成题目列表(offset..offset+count)
QUESTIONS=$(cd "$ROOT/Evaluation/scripts" && python -c "
import json
qs = json.load(open('$ROOT/MINIDEV_sqlite/mini_dev_sqlite.json', encoding='utf-8'))
for q in qs[$OFFSET:$OFFSET+$COUNT]:
    print(f\"{q['question_id']}|{q['question']}|{q.get('evidence','')}\")
")

OK=0
FAIL=0
TOTAL=$(echo "$QUESTIONS" | wc -l)

while IFS='|' read -r QID QUESTION EVIDENCE; do
    OUT_FILE="$OUTPUT_DIR/${QID}.json"
    if [ -f "$OUT_FILE" ]; then
        echo "[SKIP] q$QID (already exists)"
        continue
    fi

    echo "[RUN] q$QID ($((OK+FAIL+1))/$TOTAL)"

    # 构造 prompt — 强制 MCP 路径 + 单行避免换行截断
    PROMPT="CRITICAL: MCP tools only. Skip list_mcp_resource* — go straight to semantic_query->mapping->sqlite3. Use get_pe_full(DLR) or get_entity_mapping(ER) for complete info in one call. NO glob/read/bash to find databases. End with Final Answer: <result> | Evidence SQL: <sql>. Question: $QUESTION"
    if [ -n "$EVIDENCE" ]; then
        PROMPT="$PROMPT | Evidence: $EVIDENCE"
    fi

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
