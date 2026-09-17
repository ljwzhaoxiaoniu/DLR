#!/usr/bin/env bash
# 批量评测入口 — 平铺题号（不配对）
# 用法: bash eval_run.sh <paradigms> <qid...> [--parallel] [--monitor] [--dry-run]
#   paradigms: E=ER, D=DLR, R=RDF, 可组合如 EDR, ED, ER, D（固定第 1 位，不做顺序识别）
#   qid...: 任意个题号（≥1），平铺不配对——如 `EDR 1471 1472 1473 1476` 就是一个 run
#   并发上限 6 路（防 Kuzu 锁冲突）：每范式 workers = min(题数, 6/范式数)，由本脚本传入
#   --monitor: 自动弹出监控窗口（标题=run_id，跑完自退自关）
# 示例: bash eval_run.sh EDR 1471 1472 --parallel
#       bash eval_run.sh EDR 1471 1472 1473 1476 --parallel --monitor
#       bash eval_run.sh ED 1471 1472
#       bash eval_run.sh EDR 1471 1472 --dry-run   # 只打印计划、不执行

export PYTHONIOENCODING=utf-8

PARADIGMS="${1:-EDR}"
shift || true

case "$PARADIGMS" in
    *[!EDR]*)
        echo "[ERR] 第 1 个位置必须是范式串（仅 E/D/R 组合），收到: $PARADIGMS"
        echo "      用法: bash eval_run.sh <paradigms> <qid...> [--parallel] [--dry-run]"
        exit 1
        ;;
esac

QIDS=()
MODE="serial"
DRY=0
MONITOR=0
while [ $# -gt 0 ]; do
    case "$1" in
        --parallel) MODE="parallel" ;;
        --monitor)  MONITOR=1 ;;
        --dry-run)  DRY=1 ;;
        -*) echo "[ERR] 未知参数: $1"; exit 1 ;;
        *) QIDS+=("$1") ;;
    esac
    shift
done

if [ ${#QIDS[@]} -lt 1 ]; then
    echo "用法: bash eval_run.sh <paradigms> <qid...> [--parallel] [--dry-run]"
    echo "示例: bash eval_run.sh EDR 1471 1472 1473 1476 --parallel"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -W)"
NQ=${#QIDS[@]}
LABEL=$(IFS=-; echo "${QIDS[*]}")
RUN_ID="$(date +%m%d_%H%M)_${LABEL}_${PARADIGMS}"
NPAR=${#PARADIGMS}
WORKERS_CAP=$(( 6 / NPAR )); [ "$WORKERS_CAP" -lt 1 ] && WORKERS_CAP=1

echo "========================================="
echo "  RUN: $RUN_ID  ($NQ 题)  mode=$MODE$( [ "$DRY" = 1 ] && echo '  [DRY-RUN]' )"
echo "========================================="

# --monitor：弹监控窗口（标题 = run_id；跑题全部结束后自动退出、10s 后自关）
# dry-run 不弹；弹窗失败静默跳过，不影响跑批
if [ "$DRY" != "1" ] && [ "$MONITOR" = "1" ]; then
    WDIR=$(cygpath -w "$SCRIPT_DIR" 2>/dev/null || echo "$SCRIPT_DIR")
    cmd //c start "监控 $RUN_ID" "$WDIR\\monitor_window.cmd" >/dev/null 2>&1 || true
fi

PIDS=()
for (( i=0; i<NPAR; i++ )); do
    case "${PARADIGMS:$i:1}" in
        E) PARADIGM="er" ;;
        D) PARADIGM="dlr" ;;
        R) PARADIGM="rdf" ;;
    esac
    echo "--- ${PARADIGMS:$i:1} ($PARADIGM) ---"
    if [ "$DRY" = "1" ]; then
        if [ "$MODE" = "parallel" ]; then
            echo "    [dry] bash run_parallel.sh $PARADIGM ${QIDS[*]} --run-id $RUN_ID --workers $WORKERS_CAP"
        else
            echo "    [dry] bash run_serial.sh   $PARADIGM ${QIDS[*]} --run-id $RUN_ID"
        fi
        continue
    fi
    if [ "$MODE" = "parallel" ]; then
        bash "$SCRIPT_DIR/run_parallel.sh" "$PARADIGM" "${QIDS[@]}" --run-id "$RUN_ID" --workers "$WORKERS_CAP" &
        PIDS+=($!)
        sleep $(python -c "import random; print(round(random.uniform(10,30),1))")  # 随机错峰防 Kuzu 锁冲突
    else
        bash "$SCRIPT_DIR/run_serial.sh" "$PARADIGM" "${QIDS[@]}" --run-id "$RUN_ID"
    fi
done

if [ "$DRY" != "1" ]; then
    for pid in "${PIDS[@]}"; do
        wait "$pid"
    done
fi

echo "========================================="
echo "  DONE: $RUN_ID"
echo "  下一步:"
for (( i=0; i<NPAR; i++ )); do
    case "${PARADIGMS:$i:1}" in
        E) p=er ;; D) p=dlr ;; R) p=rdf ;;
    esac
    echo "    python 02_extract_and_run.py --paradigm $p --log-subdir $RUN_ID"
done
echo "    归档（确认后）: python post_process.py --run-id $RUN_ID"
echo "========================================="
