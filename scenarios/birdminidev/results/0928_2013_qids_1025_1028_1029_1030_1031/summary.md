# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2013_qids_1025_1028_1029_1030_1031` ｜ 题数 5 ｜ 生成 2026-09-28T13:51:49.577Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **11** ｜ 工具错误均值 **0**
- token 合计 **407,139**（input 53,619 + cache_read 328,192 + output 25,328） ｜ cache_read 占 **81%**
- token 单题均值 **81,428**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1028 | FAIL | 🔁 翻盘 | ## 查询过程与结论 **三级锚定结果：** | 层级 | 结果 | |---|---| | L3 口径 | `match=none` — 本题无 SOP 节  | Celtic | raw/0928_2013_1028_dlr.ndjson |
| 1029 | FAIL | 🔁 翻盘 | **解题路径（三级锚定）** 1. **L3 口径（`dlr_search_sop`，match=exact，标题逐字复述本题）**：明确裁定「speed in | 20 | 20 | 20 | 23 | raw/0928_2013_1029_dlr.ndjson |