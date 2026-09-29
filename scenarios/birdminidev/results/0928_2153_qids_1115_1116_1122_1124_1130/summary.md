# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2153_qids_1115_1116_1122_1124_1130` ｜ 题数 5 ｜ 生成 2026-09-29T03:09:59.002Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 2 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **474,509**（input 65,769 + cache_read 390,016 + output 18,724） ｜ cache_read 占 **82%**
- token 单题均值 **94,902**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 2 | 2 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1115 | FAIL | 🔁 翻盘 | **结论**：Landon Donovan 在 2013/7/12 的 overall rating 为 **79**，Jordan Bowery 为 **59 | 25.31645569620253 | raw/0928_2153_1115_dlr.ndjson |
| 1122 | UNCERTAIN | ⚠️ 待仲裁 | ## 三级锚定结果 | 级 | 工具 | 结果 | |---|---|---| | L1 实体路 | `dlr_semantic_query` | top-1  | Lionel Messi | raw/0928_2153_1122_dlr.ndjson |
| 1124 | FAIL | 🔁 翻盘 | ## 结论 **"Tend to be attacking when their mates were doing attack moves"** 对应的是球员 | Aaron Cresswell | Aaron Lennon | Aaron Meijers | Aaron Nigue | raw/0928_2153_1124_dlr.ndjson |