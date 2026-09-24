#!/usr/bin/env bash
# L3 单一真源同步：<源 sop.md> → skills/<技能名>/SKILL.md（加 frontmatter）。
#
# 用法: sync_sop.sh [<源文件>] [<技能名>]
#   默认: <repo>/scenarios/birdminidev/sources/sop.md → skills/sop/SKILL.md
#   换场景: bash sync_sop.sh "../../scenarios/birdminidev/sources/sop.md" sop
#
# 多数据集约定（一个评测集 = 一套完整 TSM：L1 DLR 图谱 + L2 evidence + L3 本文件）：
#   - 部署出去的技能名**固定为 sop**——"用哪套"发生在 run 配置层（同步哪个源进来），
#     不在模型层（模型永远不需要选库/选数据集，不产生死循环）；
#   - 源文件按数据集一份（建议 domains/<dataset>/sop.md），互不覆盖、随手可换；
#   - 认知层（skills/paradigm）与数据集无关，换集时不动。
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd -W)"
SVC_DIR="$(cd "$HERE/.." && pwd -W)"
ROOT="$(cd "$SVC_DIR/.." && pwd -W)"
SRC="${1:-$ROOT/scenarios/birdminidev/sources/sop.md}"
NAME="${2:-sop}"
DST="$HERE/skills/$NAME/SKILL.md"

[ -f "$SRC" ] || { echo "[ERR] 真源不存在: $SRC" >&2; exit 1; }

mkdir -p "$(dirname "$DST")"
{
  printf -- '---\nname: %s\ndescription: %s\n---\n\n' "$NAME" \
    "DLR 业务逻辑级（L3）SOP：按题面分节，每节复述一道题并给出该题的口径与陷阱。回答业务问题前先加载；只采用完整复述本题的那一节。"
  cat "$SRC"
} > "$DST"

echo "[sync] $SRC"
echo "    -> $DST ($(wc -c < "$DST") bytes)"
