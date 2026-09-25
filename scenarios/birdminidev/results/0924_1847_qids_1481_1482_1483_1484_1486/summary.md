# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0924_1847_qids_1481_1482_1483_1484_1486` ｜ 题数 5 ｜ 生成 2026-09-25T06:21:19.997Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **2**
- token 合计 **302,400**（input 48,074 + cache_read 243,456 + output 10,870） ｜ cache_read 占 **81%**
- token 单题均值 **60,480**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1481 | FAIL | ⚠️ 待仲裁 |  | 0 | 582092.86 | -582092.86 | raw/0924_1847_1481_dlr.ndjson |
| 1482 | FAIL | 🔁 翻盘 | ## 结论 对 **EUR 结算客户**（`customers.Currency = 'EUR'`）按细分市场汇总 `yearmonth.Consumption | 545.4018999790969 | 681.5824574939339 | 708.1124062978664 | raw/0924_1847_1482_dlr.ndjson |