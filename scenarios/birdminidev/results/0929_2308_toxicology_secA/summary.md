# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2308_toxicology_secA` ｜ 题数 6 ｜ 生成 2026-09-29T15:12:05.322Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 3 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 4 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **301,767**（input 25,719 + cache_read 261,376 + output 14,672） ｜ cache_read 占 **87%**
- token 单题均值 **50,295**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| toxicology | 2 | 3 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 197 | FAIL | 🔁 翻盘 | ## 结论 **2.161290322580645** ### 三级锚定过程 | 层级 | 工具 | 命中结果 | |------|------|------- | 99.68354430379746 | raw/0929_2308_197_dlr.ndjson |
| 198 | FAIL | 🔁 翻盘 | L3 exact-hit 口径已按「全量致癌分子」分母执行（含无单键分子计 0），结果与 Expected 一致。 - **L3（`dlr_search_sop | 732.125 | raw/0929_2308_198_dlr.ndjson |
| 207 | UNCERTAIN | 🔁 翻盘 | ## 结论 **Double bond（`bond_type = '='`）中实际成键的原子元素共 5 种：c、o、n、s、ca**（碳、氧、氮、硫、钙）。 # | c | o | cl | h | raw/0929_2309_207_dlr.ndjson |
| 218 | FAIL | 🔁 翻盘 | ## 结论 **99.34210526315789%** 的致癌型分子不含氟。 ## 三级锚定过程 | 级 | 工具 | 命中 | |---|---|---|  | 100 | raw/0929_2309_218_dlr.ndjson |