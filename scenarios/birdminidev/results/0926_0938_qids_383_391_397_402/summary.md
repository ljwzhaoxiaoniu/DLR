# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0938_qids_383_391_397_402` ｜ 题数 4 ｜ 生成 2026-09-29T01:14:49.978Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **392,650**（input 72,244 + cache_read 303,232 + output 17,174） ｜ cache_read 占 **77%**
- token 单题均值 **98,163**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 2 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 383 | FAIL | 🔁 翻盘 | ## 结论 **有 89 张白色边框的牌是被禁的。** ### 三级锚定过程 | 级别 | 工具 | 命中 | |------|------|------| | | 258 | raw/0926_0938_383_dlr.ndjson |
| 402 | FAIL | 🔁 翻盘 | ## 语义锚定过程 **L3 (SOP 技能)** — 命中唯一完全复述本题的节：*"What is the percentage of Story Spotl | 0.18302770053852382 | raw/0926_0939_402_dlr.ndjson |