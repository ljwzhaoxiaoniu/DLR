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
# 路径一律走环境变量传给 python（别插进 -c 源码：Windows 路径的反斜杠会被当转义符，
# 如 ...\tmp\... 的 \t 会变成 Tab；config 里 minidev_dir / output_dir 写相对或绝对都成立）
TIMEOUT=$(ROOT="$ROOT" python -c "import json,os;print(json.load(open(os.path.join(os.environ['ROOT'],'config.json'),encoding='utf-8')).get('eval',{}).get('timeout_per_question',300))" 2>/dev/null || echo 300)
LOG_ROOT=$(ROOT="$ROOT" python -c "
import json, os
root = os.environ['ROOT']
c = json.load(open(os.path.join(root, 'config.json'), encoding='utf-8'))
print(os.path.join(root, c.get('eval',{}).get('output_dir','Evaluation/outputs'), '01_logs'))
" 2>/dev/null || echo "$ROOT/Evaluation/outputs/01_logs")

[ -z "$RUN_ID" ] && RUN_ID="$(date +%m%d_%H%M)_$(IFS=-; echo "${QIDS[*]}")_$(echo $PARADIGM | tr 'a-z' 'A-Z' | head -c1)"

OUTPUT_DIR="$LOG_ROOT/$RUN_ID/$PARADIGM"
AGENT_DIR="$ROOT/OC-based Agent Service/oc_$PARADIGM"

mkdir -p "$OUTPUT_DIR"
echo "$RUN_ID" > "$LOG_ROOT/.last_run_id"

# 从数据集取出指定的题（数据集位置以 config.paths.minidev_dir 为准，相对/绝对路径都成立）
MINI_JSON=$(ROOT="$ROOT" python -c "
import json, os
root = os.environ['ROOT']
c = json.load(open(os.path.join(root, 'config.json'), encoding='utf-8'))
print(os.path.join(root, c.get('paths',{}).get('minidev_dir','MINIDEV_sqlite'), 'mini_dev_sqlite.json'))
" 2>/dev/null || echo "$ROOT/MINIDEV_sqlite/mini_dev_sqlite.json")
QUESTIONS=$(cd "$ROOT/Evaluation/scripts" && MINI_JSON="$MINI_JSON" python -c "
import json, os, sys
qs = json.load(open(os.environ['MINI_JSON'], encoding='utf-8'))
targets = {$(IFS=,; echo "${QIDS[*]}")}
for q in qs:
    if q['question_id'] in targets:
        print(f\"{q['question_id']}|{q['question']}|{q.get('evidence','')}\")
")
if [ "$(echo "$QUESTIONS" | grep -c '|')" -eq 0 ]; then
    echo "[ERR] 题号没匹配到任何题（数据集路径或题号有误）: $MINI_JSON"
    exit 1
fi

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
