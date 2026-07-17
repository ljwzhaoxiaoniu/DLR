#!/usr/bin/env bash
# 批量评测入口 — 一个 run-id 管理多范式, 支持并行
# 用法: bash eval_run.sh <paradigms> <count> <offset> [--parallel] [--workers N]
#   paradigms: E=ER, D=DLR, R=RDF, 可组合如 EDR, ED, ER, D
# 示例: bash eval_run.sh EDR 500 0 --parallel --workers 6   # 三范式各500题,每范式6并发
#       bash eval_run.sh ED 10 0                             # 串行

PARADIGMS="${1:-EDR}"
COUNT="${2:-10}"
OFFSET="${3:-0}"
MODE="serial"
WORKERS=2

# 解析额外参数(while/case/shift 正确模式)
shift 3  # 跳过前三个位置参数
while [ $# -gt 0 ]; do
    case "$1" in
        --parallel) MODE="parallel" ;;
        --workers) shift; WORKERS="$1" ;;
        --workers=*) WORKERS="${1#*=}" ;;
    esac
    shift
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -W)"
RUN_ID="$(date +%m%d_%H%M)_${OFFSET}-$((OFFSET+COUNT-1))_${PARADIGMS}"

echo "========================================="
echo "  RUN: $RUN_ID  mode=$MODE  workers=$WORKERS"
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
        bash "$SCRIPT_DIR/run_parallel.sh" "$PARADIGM" "$COUNT" "$OFFSET" --run-id "$RUN_ID" --workers "$WORKERS" &
        PIDS+=($!)
    else
        bash "$SCRIPT_DIR/run_serial.sh" "$PARADIGM" "$COUNT" "$OFFSET" --run-id "$RUN_ID"
    fi
done

# 等待所有并行任务
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
