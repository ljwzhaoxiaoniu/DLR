#!/usr/bin/env bash
# 跑批器（2.0）：**并行**驱动 dsh headless 跑题，产物 = 一轮结果目录（raw 可追溯）
#
# 用法:
#   bash run_batch.sh --all [--jobs 4] [--out <run_dir>]      # 全量 500 题
#   bash run_batch.sh --qids 11,12 [--jobs 2]                 # 指定题号
#   bash run_batch.sh --db debit_card_specializing            # 单库
#
# 产物: <run_dir>/raw/<stamp>_<qid>_dlr.ndjson（dsh --json 事件流）+ .err
#       判定与汇总：`tsm grade --run <run_dir>`（在 TSM Core Service 下跑）
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
SVC_DIR="$(cd "$HERE/.." && pwd -W)"
ROOT="$(cd "$SVC_DIR/.." && pwd -W)"
DSH_DIR="$SVC_DIR/dsh_dlr"
QJSON="$ROOT/MINIDEV_sqlite/mini_dev_sqlite.json"

JOBS="${JOBS:-4}"
SCOPE=""
OUT=""
while [ $# -gt 0 ]; do
  case "$1" in
    --all) SCOPE="all" ;;
    --qids) SCOPE="qids:$2"; shift ;;
    --db) SCOPE="db:$2"; shift ;;
    --jobs) JOBS="$2"; shift ;;
    --out) OUT="$2"; shift ;;
    *) echo "[ERR] 未知参数: $1"; exit 2 ;;
  esac
  shift
done
[ -n "$SCOPE" ] || { echo "用法: run_batch.sh --all | --qids a,b | --db <库> [--jobs N] [--out dir]"; exit 2; }

STAMP="$(date +%m%d_%H%M)"
RUN_DIR="${OUT:-$ROOT/scenarios/birdminidev/results/${STAMP}_${SCOPE//[:,\/]/_}}"
RAW="$RUN_DIR/raw"
mkdir -p "$RAW"

# 题目清单（TSV: qid \t db \t question）——由数据集本身提供，不做筛选性改写
node - "$QJSON" "$SCOPE" > "$RUN_DIR/questions.tsv" <<'EOF'
const fs = require("fs");
const [qpath, scope] = process.argv.slice(2);
const qs = JSON.parse(fs.readFileSync(qpath, "utf8"));
let sel = qs;
if (scope.startsWith("qids:")) {
  const ids = new Set(scope.slice(5).split(",").map((s) => Number(s.trim())));
  sel = qs.filter((q) => ids.has(Number(q.question_id)));
} else if (scope.startsWith("db:")) {
  sel = qs.filter((q) => q.db_id === scope.slice(3));
}
for (const q of sel) {
  console.log([q.question_id, q.db_id, String(q.question).replace(/\t/g, " ")].join("\t"));
}
EOF
TOTAL=$(wc -l < "$RUN_DIR/questions.tsv")
echo "[batch] 共 $TOTAL 题 → $RUN_DIR（并发 $JOBS）"

# 并行：多开 dsh 进程；每条题一行产物（run_one.sh 自带预检与命名）
DONE=0
while IFS=$'\t' read -r qid db question; do
  [ -n "${qid:-}" ] || continue
  while [ "$(jobs -rp | wc -l)" -ge "$JOBS" ]; do sleep 1; done
  (
    SKIP_PRECHECK=1 bash "$DSH_DIR/run_one.sh" "$qid" "$question" "$RAW" >/dev/null 2>&1 \
      || echo "[warn] q$qid 退出码非 0"
  ) &
  DONE=$((DONE + 1))
  [ $((DONE % 25)) -eq 0 ] && echo "[batch] 已派发 $DONE/$TOTAL"
done < "$RUN_DIR/questions.tsv"
wait
echo "[batch] 全部完成：$(ls "$RAW"/*.ndjson 2>/dev/null | wc -l)/$TOTAL 题有产物"
echo "[batch] 下一步判定：cd \"TSM Core Service\" && tsm grade --run \"$RUN_DIR\""
