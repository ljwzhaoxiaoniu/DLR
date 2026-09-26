# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0940_qids_407_408_409_412_414` ｜ 题数 5 ｜ 生成 2026-09-26T01:43:48.372Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **11** ｜ 工具调用均值 **21** ｜ 工具错误均值 **0**
- token 合计 **1,712,193**（input 166,201 + cache_read 1,452,544 + output 93,448） ｜ cache_read 占 **85%**
- token 单题均值 **342,439**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 407 | UNCERTAIN | ⚠️ 待仲裁 | ## 语义锚定过程 **L1（数据源级）**：`dlr_semantic_query` 把本问题锚到 `card_games` 库的 `LOGICAL.Card | Human,Rebel | Legendary | Angel | Legendary | raw/0926_0940_407_dlr.ndjson |