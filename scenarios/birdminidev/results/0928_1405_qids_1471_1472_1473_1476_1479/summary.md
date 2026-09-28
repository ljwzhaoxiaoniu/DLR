# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1405_qids_1471_1472_1473_1476_1479` ｜ 题数 5 ｜ 生成 2026-09-28T06:09:56.256Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **286,981**（input 38,564 + cache_read 231,040 + output 17,377） ｜ cache_read 占 **81%**
- token 单题均值 **57,396**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1473 | FAIL | 🔁 翻盘 | ## 查询结论 **三级锚定结果** | 级别 | 命中 | 内容 | |---|---|---| | L3 口径（`dlr_search_sop`） | ** | 459.9562642870894 | raw/0928_1405_1473_dlr.ndjson |