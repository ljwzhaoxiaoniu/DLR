#!/usr/bin/env bash
# 拉取 embedding 模型（ONNX，本地推理用）——从 hf-mirror 镜像，避免依赖 HuggingFace 主站
# 用法: bash scripts/fetch-model.sh [<目标目录>]   （默认 tmp_scripts/bge-onnx）
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
ROOT="$(cd "$HERE/../.." && pwd -W)"
DST="${1:-$ROOT/tmp_scripts/bge-onnx}"
BASE="https://hf-mirror.com/Xenova/bge-small-zh-v1.5/resolve/main"

mkdir -p "$DST/onnx"
for f in onnx/model.onnx tokenizer.json tokenizer_config.json special_tokens_map.json config.json; do
  out="$DST/$(basename "$f")"
  if [ -s "$out" ]; then
    echo "  [skip] $(basename "$f") 已存在 ($(du -h "$out" | cut -f1))"
  else
    echo "  [get ] $f"
    curl -sL -C - --retry 5 --retry-delay 3 --retry-all-errors --max-time 1200 -o "$out" "$BASE/$f"
    echo "         -> $(du -h "$out" | cut -f1)"
  fi
done
echo "[model] 就绪: $DST"
