#!/usr/bin/env bash
# Cloud-OpsBench 评分：dsh run 目录 → 上游 evaluation.py → 成绩单（summary.md + questions.csv）
#
# 用法:
#   bash grade.sh <run_dir> [<run_dir>...] [--out <dir>]
#   bash grade.sh --runs-root <dir> [--match "<glob>"]   # 批跑后一次评分
#
# 产物（<out>/，默认 = 第一个 run 的同级 score_<stamp>/）:
#   traces/                convert.mjs 的 reference 轨迹（含 manifest.json）
#   <sys>_<cat>_questions.csv · _summary.json · _details.json · _group.md · _eval.log（每组）
#   questions.csv          各组拼合
#   summary.md             总成绩单
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
COB_DIR="${COB_DIR:-/d/Code_Proj/Cloud-OpsBench}"        # 基准检出（快照 ea05daf）
PY="${PY:-/d/ProgramData/anaconda3/envs/lepe_som/python}" # 绝对路径规则
MODEL="${COB_MODEL:-dsh-tsm}"

RUN_DIRS=()
OUT=""
RUNS_ROOT=""
MATCH=""
while [ $# -gt 0 ]; do
  case "$1" in
    --out) OUT="$2"; shift ;;
    --runs-root) RUNS_ROOT="$2"; shift ;;
    --match) MATCH="$2"; shift ;;
    --model) MODEL="$2"; shift ;;
    *) RUN_DIRS+=("$1") ;;
  esac
  shift
done

if [ -n "$RUNS_ROOT" ]; then
  for d in "$RUNS_ROOT"/${MATCH:-*}/; do
    [ -d "$d" ] && [ -f "$d/meta.yml" ] && RUN_DIRS+=("${d%/}")
  done
fi
[ "${#RUN_DIRS[@]}" -gt 0 ] || { echo "[ERR] 用法: grade.sh <run_dir>... [--out dir] | --runs-root <dir> [--match <glob>]" >&2; exit 2; }

STAMP="$(date +%m%d_%H%M)"
[ -n "$OUT" ] || OUT="$(dirname "${RUN_DIRS[0]}")/score_${STAMP}"
mkdir -p "$OUT"
SCORE_ROOT="$OUT/traces"

echo "[grade] runs=${#RUN_DIRS[@]} → out=$OUT"
node "$HERE/convert.mjs" "${RUN_DIRS[@]}" --score-root "$SCORE_ROOT" --model "$MODEL" || exit 3

# ── 分组（system|category，按首见序）──
# 注：不要用 GROUPS 作变量名——它是 bash 的特殊变量（用户组 ID 数组，indexed），
# `declare -A GROUPS` 会直接报 "cannot convert indexed to associative array"（踩过）。
GROUP_ORDER=()
SEEN_KEYS="|"
for d in "${RUN_DIRS[@]}"; do
  SYS=$(grep -m1 '^system:' "$d/meta.yml" | sed 's/^system:[[:space:]]*//')
  CAT=$(grep -m1 '^category:' "$d/meta.yml" | sed 's/^category:[[:space:]]*//')
  [ -n "$SYS" ] && [ -n "$CAT" ] || { echo "[ERR] meta.yml 缺 system/category: $d" >&2; exit 2; }
  KEY="$SYS|$CAT"
  case "$SEEN_KEYS" in
    *"|$KEY|"*) ;;
    *) SEEN_KEYS="$SEEN_KEYS$KEY|"; GROUP_ORDER+=("$KEY") ;;
  esac
done

echo "# Cloud-OpsBench 评测 · $STAMP" > "$OUT/summary.md"
{
  echo ""
  echo "- runs: ${#RUN_DIRS[@]} 个（$(for d in "${RUN_DIRS[@]}"; do basename "$d"; done | tr '\n' ' ')）"
  echo "- model: $MODEL · checkout: $COB_DIR（快照 ea05daf）"
  echo "- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计"
  echo ""
} >> "$OUT/summary.md"

FIRST_CSV=""
for KEY in "${GROUP_ORDER[@]}"; do
  SYS="${KEY%%|*}"; CAT="${KEY##*|}"
  SD="$(echo "$SYS" | tr -d '-')"   # 目录名：train-ticket → trainticket
  STEM="${SD}_${CAT}"
  echo "[grade] 评分组: $SYS/$CAT"
  "$PY" "$HERE/run_eval.py" --checkout "$COB_DIR" --score-root "$SCORE_ROOT" \
      --system "$SYS" --category "$CAT" --out "$OUT" --model "$MODEL" \
      | tee "$OUT/${STEM}_eval.log" || { echo "[ERR] 评分失败: $SYS/$CAT（见 ${STEM}_eval.log）" >&2; exit 4; }
  cat "$OUT/${STEM}_group.md" >> "$OUT/summary.md"
  if [ -z "$FIRST_CSV" ]; then
    FIRST_CSV="$OUT/${STEM}_questions.csv"
    cp "$FIRST_CSV" "$OUT/questions.csv"
  else
    tail -n +2 "$OUT/${STEM}_questions.csv" >> "$OUT/questions.csv"
  fi
done

echo ""
echo "[grade] 完成"
echo "  summary.md   : $OUT/summary.md"
echo "  questions.csv: $OUT/questions.csv"
echo "  traces/      : $SCORE_ROOT"
