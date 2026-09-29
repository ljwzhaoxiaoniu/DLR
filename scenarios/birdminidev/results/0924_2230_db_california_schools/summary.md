# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0924_2230_db_california_schools` ｜ 题数 30 ｜ 生成 2026-09-29T01:12:00.509Z

**判定（与 gold 比对）：PASS 26 ｜ FAIL 2 ｜ UNCERTAIN 2 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 26 ｜ 🔁 翻盘 1 ｜ ❌ 错误 2 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **15** ｜ 工具错误均值 **0**
- token 合计 **5,913,733**（input 666,784 + cache_read 4,824,320 + output 422,629） ｜ cache_read 占 **82%**
- token 单题均值 **197,124**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| california_schools | 26 | 2 | 2 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 11 | FAIL | ❌ 错误 | I have the complete result set. Here's my analysis. **Caliber (from L2 domain co | 01100170109835 | 01100170112607 | 01100170124172 | 011001701 | raw/0924_2230_11_dlr.ndjson |
| 27 | UNCERTAIN | 🔁 翻盘 | I have all the evidence I need. Here is the answer. **Semantic anchoring (three  | FAME Public Charter | 505 | null | Envision Academy for Arts | raw/0924_2231_27_dlr.ndjson |
| 28 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 **口径锚定**（三级交叉验证）： - **L1**（`dlr_semantic_query`）：命中 `california_schools` 库 | Mountain Oaks | 00 | Castle Rock | 00 | raw/0924_2231_28_dlr.ndjson |
| 39 | FAIL | ❌ 错误 | ## 结论 **Fresno 市 1980 年开办学校的平均 SAT 应试人数 = 203.8** **执行路径（三级锚定 → 两跳映射 → SQL 闭环）** | 137.88888888888889 | raw/0924_2232_39_dlr.ndjson |