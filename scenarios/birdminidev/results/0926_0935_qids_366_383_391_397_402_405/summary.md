# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0935_qids_366_383_391_397_402_405` ｜ 题数 6 ｜ 生成 2026-09-26T01:38:13.543Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **1,016,662**（input 131,944 + cache_read 825,472 + output 59,246） ｜ cache_read 占 **81%**
- token 单题均值 **169,444**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 4 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 366 | UNCERTAIN | 🔁 翻盘 | ## 结论 "Benalish Knight" 的规则（rules text / 异能）为两句话构成的牌面规则文本： - **Flash（闪击）** — "Yo | commander | duel | legacy | modern | raw/0926_0935_366_dlr.ndjson |
| 402 | FAIL | ❌ 错误 | **Answer: 0%** — no Story Spotlight card is textless, so the ID list is empty. R | 0.18302770053852382 | raw/0926_0936_402_dlr.ndjson |