#!/usr/bin/env bash
# 批量评测入口 — 按 pair 跑题
# 用法: bash eval_run.sh <paradigms> <qid1> <qid2> [--parallel]
#   paradigms: E=ER, D=DLR, R=RDF, 可组合如 EDR, ED, ER, D
# 示例: bash eval_run.sh EDR 1486 1490 --parallel
#       bash eval_run.sh ED 1471 1472
# workers 自动 = 范式数 × 题数,由 run_parallel.sh 内部计算

export PYTHONIOENCODING=utf-8

PARADIGMS="${1:-EDR}"
QID1="$2"
QID2="$3"
MODE="serial"

if [ -z "$QID1" ] || [ -z "$QID2" ]; then
    echo "用法: bash eval_run.sh <paradigms> <qid1> <qid2> [--parallel]"
    echo "示例: bash eval_run.sh EDR 1486 1490 --parallel"
    exit 1
fi

shift 3
while [ $# -gt 0 ]; do
    case "$1" in
        --parallel) MODE="parallel" ;;
    esac
    shift
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -W)"
RUN_ID="$(date +%m%d_%H%M)_${QID1}-${QID2}_${PARADIGMS}"

echo "========================================="
echo "  RUN: $RUN_ID  (q$QID1 + q$QID2)  mode=$MODE"
echo "========================================="
echo ""

PIDS=()
for (( i=0; i<${#PARADIGMS}; i++ )); do
    P="${PARADIGMS:$i:1}"
    case "$P" in
        E) PARADIGM="er" ;;
        D) PARADIGM="dlr" ;;
        R) PARADIGM="rdf" ;;
        *) echo "Unknown paradigm: $P"; continue ;;
    esac
    echo "--- $P ($PARADIGM) ---"
    if [ "$MODE" = "parallel" ]; then
        bash "$SCRIPT_DIR/run_parallel.sh" "$PARADIGM" "$QID1" "$QID2" --run-id "$RUN_ID" &
        PIDS+=($!)
    else
        bash "$SCRIPT_DIR/run_serial.sh" "$PARADIGM" "$QID1" "$QID2" --run-id "$RUN_ID"
    fi
done

for pid in "${PIDS[@]}"; do
    wait "$pid"
done

echo "========================================="
echo "  DONE: $RUN_ID"
echo "  下一步:"
for P in E D R; do
    case "$P" in
        E) p=er ;; D) p=dlr ;; R) p=rdf ;;
    esac
    echo "    python 02_extract_and_run.py --paradigm $p --log-subdir $RUN_ID"
done
echo "========================================="
