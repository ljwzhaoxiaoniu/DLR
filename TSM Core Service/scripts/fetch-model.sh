#!/usr/bin/env bash
# 拉取 embedding 模型（ONNX，本地推理用）——薄壳：实现与目标目录解析都在
# `tsm fetch-model`（src/dev/fetchModel.ts，纯 Node，跨平台；目标 = config 的 MODEL_DIR）
# 用法: bash scripts/fetch-model.sh [<目标目录>]
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
exec node "$HERE/../bin/tsm.mjs" fetch-model "$@"
