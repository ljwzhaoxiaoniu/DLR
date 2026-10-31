#!/usr/bin/env bash
# BizAgentBench · run one case with the DLR tool surface
#   eval/run_dlr_pilot.sh <output-dir> <case-number>
# Env overrides: BIZAGENTBENCH_DIR · TSM_SERVICE_DIR · DEEPSEEK_ENV_FILE · BIZ_PYTHON · BIZ_DLR_PORT
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="${BIZAGENTBENCH_DIR:-D:/Code_Proj/Dataset/BizAgentBench-main}"
SERVICE="${TSM_SERVICE_DIR:-$(cd "$HERE/../../../TSM Core Service" 2>/dev/null && pwd)}"
LOCAL_TOOLS="${BIZ_LOCAL_TOOLS:-$(cd "$HERE/../../../tmp_scripts" 2>/dev/null && pwd || true)}"
ENV_FILE="${DEEPSEEK_ENV_FILE:-$HERE/../../../DSH-based Agent Service/dsh_dlr/.env}"
PYTHON="${BIZ_PYTHON:-/d/ProgramData/anaconda3/envs/lepe_som/python}"
PORT="${BIZ_DLR_PORT:-28797}"
OUT="${1:?output dir}"
NUM="${2:?case number}"

KEY=$(grep -E '^DEEPSEEK_API_KEY=' "$ENV_FILE" | head -1 | cut -d= -f2-)
: "${KEY:?DEEPSEEK_API_KEY not found in $ENV_FILE}"
export AGENT_API_KEY="$KEY" USER_API_KEY="$KEY"
export PYTHONUTF8=1
export PYTHONPATH="$HERE:$ROOT:$ROOT/third_party/tau2-bench/src"
if [ -n "$LOCAL_TOOLS" ] && [ -d "$LOCAL_TOOLS/bizdeps" ]; then
  export PYTHONPATH="$PYTHONPATH:$LOCAL_TOOLS/bizdeps:$LOCAL_TOOLS/bizstub"
fi

curl -sf --max-time 3 "http://127.0.0.1:$PORT/health" >/dev/null || {
  echo "DLR bridge not running on $PORT" >&2
  exit 2
}
cd "$ROOT"
exec "$PYTHON" "$HERE/run_dlr.py" \
  --config "${BIZ_CONFIG:-$ROOT/configs/model.json}" \
  --output "$OUT" \
  --numbers "$NUM" \
  --workers 1
