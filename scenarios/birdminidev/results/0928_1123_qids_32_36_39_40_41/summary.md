# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1123_qids_32_36_39_40_41` ｜ 题数 5 ｜ 生成 2026-09-28T13:51:21.751Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **638,284**（input 84,479 + cache_read 526,080 + output 27,725） ｜ cache_read 占 **82%**
- token 单题均值 **127,657**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| california_schools | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 39 | FAIL | ❌ 错误 | ## 解题路径 **三级锚定：** - **L1 语义召回**（`dlr_semantic_query`）：定位到 `california_schools` 库 | 137.88888888888889 | raw/0928_1123_39_dlr.ndjson |
| 41 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 **只有 1 所**虚拟学校满足条件：**California Connections Academy @ Ripon**（San Joaquin  | Dunlap Leadership Academy | Academy of Arts and Sciences: Fr | raw/0928_1123_41_dlr.ndjson |