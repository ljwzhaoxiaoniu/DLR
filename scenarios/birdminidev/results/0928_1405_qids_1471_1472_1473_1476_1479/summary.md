# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1405_qids_1471_1472_1473_1476_1479` ｜ 题数 5 ｜ 生成 2026-09-29T03:08:09.340Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 1 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **286,981**（input 38,564 + cache_read 231,040 + output 17,377） ｜ cache_read 占 **81%**
- token 单题均值 **57,396**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1472 | FAIL | ❌ 错误 | ## 结论 **Customer ID 7653** — 2012 年 LAM（Local）客户群中消费额最低的客户，其最低月度消费出现在 201201，为 * | 47273 | raw/0928_1405_1472_dlr.ndjson |
| 1473 | FAIL | 🔁 翻盘 | ## 查询结论 **三级锚定结果** | 级别 | 命中 | 内容 | |---|---|---| | L3 口径（`dlr_search_sop`） | ** | 459.9562642870894 | raw/0928_1405_1473_dlr.ndjson |