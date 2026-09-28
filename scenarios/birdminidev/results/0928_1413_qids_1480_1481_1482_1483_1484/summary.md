# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1413_qids_1480_1481_1482_1483_1484` ｜ 题数 5 ｜ 生成 2026-09-28T06:15:52.365Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **7** ｜ 工具错误均值 **0**
- token 合计 **211,837**（input 35,486 + cache_read 164,096 + output 12,255） ｜ cache_read 占 **77%**
- token 单题均值 **42,367**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1481 | FAIL | 🔁 翻盘 | 三级锚定完成：L3 精确命中本题节（含 Expected），L1 锚定 `yearmonth` + `customers`，L2 提供「consumption  | 0 | 582092.86 | -582092.86 | raw/0928_1413_1481_dlr.ndjson |
| 1482 | FAIL | 🔁 翻盘 | ## 结论 **最大增幅：SME**，**最小增幅：LAM**（KAM 居中）。 ### 三级锚定结果 - **L3（`dlr_search_sop`，`mat | 545.4018999790969 | 681.5824574939339 | 708.1124062978664 | raw/0928_1413_1482_dlr.ndjson |