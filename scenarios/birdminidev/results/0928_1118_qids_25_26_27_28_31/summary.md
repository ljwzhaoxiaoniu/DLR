# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1118_qids_25_26_27_28_31` ｜ 题数 5 ｜ 生成 2026-09-28T13:51:19.377Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **11** ｜ 工具错误均值 **0**
- token 合计 **636,125**（input 83,988 + cache_read 483,712 + output 68,425） ｜ cache_read 占 **76%**
- token 单题均值 **127,225**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| california_schools | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 27 | UNCERTAIN | 🔁 翻盘 | ## 解题过程 **三级并行锚定**（同时发起）： | 级 | 工具 | 命中 | |---|---|---| | L3 口径 | `dlr_search_so | FAME Public Charter | 505 | null | Envision Academy for Arts | raw/0928_1118_27_dlr.ndjson |