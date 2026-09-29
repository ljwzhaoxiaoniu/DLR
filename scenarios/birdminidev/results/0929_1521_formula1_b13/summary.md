# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1521_formula1_b13` ｜ 题数 5 ｜ 生成 2026-09-29T07:24:20.511Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **15** ｜ 工具错误均值 **0**
- token 合计 **537,772**（input 61,429 + cache_read 445,696 + output 30,647） ｜ cache_read 占 **83%**
- token 单题均值 **107,554**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1011 | UNCERTAIN | ⚠️ 待仲裁 | ## 解题过程 **三级锚定（并行）** - **L3（`dlr_search_sop`）**：本题未命中（返回的都是 `european_football_2 | Nico | Hülkenberg | 807 | Daniel | raw/0929_1522_1011_dlr.ndjson |