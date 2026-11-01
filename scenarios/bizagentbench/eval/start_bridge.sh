#!/usr/bin/env bash
# BizAgentBench · start the DLR retrieval bridge with the full-model store.
#
# Defaults:
#   scenario   = this scenario directory
#   store      = TSM Core Service/.store/lance/bizagentbench  (full model: entities 687 / consensus 176 / sop 50)
#   model      = BAAI/bge-base-en-v1.5 snapshot in the HF cache (English embedding model)
#   port       = 28797
#
# Overrides: TSM_STORE_DIR · TSM_MODEL_DIR · BIZ_DLR_PORT · TSM_SCENARIO
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../../.." && pwd)"
SERVICE="$ROOT/TSM Core Service"

export TSM_SCENARIO="${TSM_SCENARIO:-$HERE/..}"
export TSM_STORE_DIR="${TSM_STORE_DIR:-$SERVICE/.store/lance/bizagentbench}"
export BIZ_DLR_PORT="${BIZ_DLR_PORT:-28797}"

if [ -z "${TSM_MODEL_DIR:-}" ]; then
  for d in "$HOME"/.cache/huggingface/hub/models--BAAI--bge-base-en-v1.5/snapshots/*; do
    if [ -f "$d/onnx/model.onnx" ]; then TSM_MODEL_DIR="$d"; break; fi
  done
fi
if [ -z "${TSM_MODEL_DIR:-}" ]; then
  echo "[bridge] English model not found in the HF cache; falling back to the Chinese model." >&2
  echo "[bridge] Pull it with: python -c \"from huggingface_hub import snapshot_download as d; d('BAAI/bge-base-en-v1.5', allow_patterns=['onnx/model.onnx','tokenizer.json','tokenizer_config.json','special_tokens_map.json','config.json','vocab.txt','sentence_bert_config.json','1_Pooling/config.json','modules.json'])\"" >&2
  TSM_MODEL_DIR="$ROOT/tmp_scripts/bge-onnx"
fi
export TSM_MODEL_DIR

echo "[bridge] store=$TSM_STORE_DIR"
echo "[bridge] model=$TSM_MODEL_DIR"
cd "$SERVICE"
exec npx tsx "$HERE/dlr_server.mjs"
