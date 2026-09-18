#!/usr/bin/env bash
# Stage 2/3/4 + 汇总 一把跑完 —— eval_run.sh 跑完一批后的收尾
# 用法: bash finish_run.sh [<run_id>] [--paradigms EDR] [--group original|control]
#   <run_id>      eval_run.sh 打印的那个（也写在 01_logs/.last_run_id）；省略 = 取最新
#   --paradigms   省略 = 按 01_logs/{run_id}/ 下实际存在的范式目录自动发现
#   --group       只用于打印归档命令（本脚本 **不归档** —— 归档须人工确认，CLAUDE.md 硬规则 4）
#
# 每步失败即停。跑完打印 post_process 归档命令，由人确认结果后再执行。

set -u
export PYTHONIOENCODING=utf-8

# Python：优先 $PY（CLAUDE.md 硬规则 5），否则本机默认绝对路径，最后兜底 PATH 里的 python
DEFAULT_PY="/d/ProgramData/anaconda3/envs/lepe_som/python"
PY="${PY:-}"
[ -z "$PY" ] && { [ -x "$DEFAULT_PY" ] && PY="$DEFAULT_PY" || PY="python"; }

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd -W)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd -W)"
# 路径走环境变量传给 python（别插进 -c 源码：Windows 路径的反斜杠会被当转义符）；
# config 里 output_dir 写相对或绝对路径都成立
LOG_ROOT=$(ROOT="$ROOT" "$PY" -c "
import json, os
root = os.environ['ROOT']
c = json.load(open(os.path.join(root, 'config.json'), encoding='utf-8'))
print(os.path.join(root, c.get('eval',{}).get('output_dir','Evaluation/outputs'), '01_logs'))
" 2>/dev/null || echo "$ROOT/Evaluation/outputs/01_logs")

RUN_ID=""; PARADIGMS=""; GROUP="original"
while [ $# -gt 0 ]; do
    case "$1" in
        --paradigms)  shift; PARADIGMS="${1:-}" ;;
        --paradigms=*) PARADIGMS="${1#*=}" ;;
        --group)      shift; GROUP="${1:-original}" ;;
        --group=*)    GROUP="${1#*=}" ;;
        -*) echo "[ERR] 未知参数: $1"; exit 1 ;;
        *)  RUN_ID="$1" ;;
    esac
    shift || true
done

[ -z "$RUN_ID" ] && [ -f "$LOG_ROOT/.last_run_id" ] && RUN_ID="$(cat "$LOG_ROOT/.last_run_id")"
if [ -z "$RUN_ID" ] || [ ! -d "$LOG_ROOT/$RUN_ID" ]; then
    echo "[ERR] 找不到 run 目录: $LOG_ROOT/${RUN_ID:-（未指定，也没有 .last_run_id）}"
    echo "      用法: bash finish_run.sh [<run_id>] [--paradigms EDR] [--group original|control]"
    exit 1
fi

# 范式：显式传入按 E/D/R 解析；否则按日志目录实际有什么跑什么
PARA_LIST=()
if [ -n "$PARADIGMS" ]; then
    for (( i=0; i<${#PARADIGMS}; i++ )); do
        case "${PARADIGMS:$i:1}" in
            E|e) PARA_LIST+=(er) ;;
            D|d) PARA_LIST+=(dlr) ;;
            R|r) PARA_LIST+=(rdf) ;;
            *) echo "[ERR] --paradigms 只能是 E/D/R 组合，收到: $PARADIGMS"; exit 1 ;;
        esac
    done
else
    for p in er dlr rdf; do
        [ -d "$LOG_ROOT/$RUN_ID/$p" ] && PARA_LIST+=("$p")
    done
fi
if [ ${#PARA_LIST[@]} -eq 0 ]; then
    echo "[ERR] $LOG_ROOT/$RUN_ID 下没有 er/dlr/rdf 日志目录"
    exit 1
fi

echo "========================================="
echo "  收尾: $RUN_ID   范式: ${PARA_LIST[*]}"
echo "========================================="

for p in "${PARA_LIST[@]}"; do
    for step in 02_extract_and_run 03_evaluate 04_judge; do
        echo ""
        echo "--- [$p] $step ---"
        "$PY" "$SCRIPT_DIR/$step.py" --paradigm "$p" --log-subdir "$RUN_ID" \
            || { echo "[ERR] $step ($p) 失败，已停止"; exit 1; }
    done
done

# 汇总：token / L1-L3 的唯一来源，必须一次跑齐（默认 --paradigm ALL）
echo ""
echo "--- parse_agent_stats (ALL) ---"
"$PY" "$SCRIPT_DIR/parse_agent_stats.py" --log-subdir "$RUN_ID" \
    || { echo "[ERR] parse_agent_stats 失败，已停止"; exit 1; }

echo ""
echo "========================================="
echo "  收尾完成: $RUN_ID"
echo "  下一步（结果确认后归档 —— 本脚本不自动归档）:"
echo "    $PY $SCRIPT_DIR/post_process.py --run-id $RUN_ID --group $GROUP"
echo "========================================="
