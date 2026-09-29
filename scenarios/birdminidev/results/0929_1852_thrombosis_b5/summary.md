# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1852_thrombosis_b5` ｜ 题数 5 ｜ 生成 2026-09-29T10:56:39.769Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **10** ｜ 工具调用均值 **20** ｜ 工具错误均值 **0**
- token 合计 **1,127,473**（input 75,101 + cache_read 966,912 + output 85,460） ｜ cache_read 占 **86%**
- token 单题均值 **225,495**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1205 | FAIL | ❌ 错误 | ## 结论：No（不在正常范围内） **锚定过程（三级并行）** - **L1 实体路**：`dlr_semantic_query` 命中 `LOGICAL.P | 0 | 0 | 0 | 0 | raw/0929_1852_1205_dlr.ndjson |
| 1209 | UNCERTAIN | ⚠️ 待仲裁 | ## 三级锚定过程 **L3（口径路）**：`dlr_search_sop` 返回 `match=similar`（唯一候选是 card_games 的题），* | Adult STILL | PSS, RA susp | PNc | MRA, SJS | raw/0929_1854_1209_dlr.ndjson |