# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1856_thrombosis_b6` ｜ 题数 5 ｜ 生成 2026-09-29T11:03:13.432Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 3 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 1 ｜ 🔁 翻盘 0 ｜ ❌ 错误 3 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **15** ｜ 工具调用均值 **32** ｜ 工具错误均值 **0**
- token 合计 **1,947,819**（input 115,488 + cache_read 1,724,288 + output 108,043） ｜ cache_read 占 **89%**
- token 单题均值 **389,564**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 1 | 3 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1220 | UNCERTAIN | ⚠️ 待仲裁 | ## 解题过程 **三级锚定** - **L3（`dlr_search_sop`）**：`match=none`（含逐字复述题面、多种改写均无命中）→ 本题无题 | 27654 | F | 1936-03-25 | 444499 | raw/0929_1856_1220_dlr.ndjson |
| 1227 | FAIL | ❌ 错误 | ## 查询过程 **三级并行锚定（Step 1）** - **L3（`dlr_search_sop`）**：`match=none` —— 本题无题级节，按 L | 74.68535825545172 | raw/0929_1858_1227_dlr.ndjson |
| 1229 | FAIL | ❌ 错误 | ## 三级锚定结果 **L3（`dlr_search_sop`）**：`match=none` — 本题无题级口径节，按 L1+L2 自解。 **L1（`dlr | 106 | raw/0929_1858_1229_dlr.ndjson |
| 1231 | FAIL | ❌ 错误 | ## 结论 **3 名**男性患者（出生于 1936–1956 年）的肌酸磷酸激酶（CPK）超出正常范围。 ### 三级锚定过程 | 层级 | 工具调用 | 结 | 2 | raw/0929_1859_1231_dlr.ndjson |