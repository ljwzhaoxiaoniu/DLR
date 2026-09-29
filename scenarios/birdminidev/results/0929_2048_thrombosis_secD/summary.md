# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2048_thrombosis_secD` ｜ 题数 5 ｜ 生成 2026-09-29T12:52:20.885Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **473,155**（input 43,054 + cache_read 401,792 + output 28,309） ｜ cache_read 占 **85%**
- token 单题均值 **94,631**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1247 | FAIL | 🔁 翻盘 | 三级锚定全部命中，SQL 结果与 L3 口径的 Expected 一致。 **锚定过程** - **L3 口径**（`dlr_search_sop`，`matc | 75 | raw/0929_2048_1247_dlr.ndjson |
| 1251 | FAIL | 🔁 翻盘 | ## 结论 **136 名患者** 的 IgG 高于正常值。 **依据链**： - **L3 口径（`dlr_search_sop`，match=exact，标 | 9 | raw/0929_2048_1251_dlr.ndjson |