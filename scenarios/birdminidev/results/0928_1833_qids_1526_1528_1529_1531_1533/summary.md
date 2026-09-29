# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1833_qids_1526_1528_1529_1531_1533` ｜ 题数 5 ｜ 生成 2026-09-29T03:08:25.518Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 3 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 3 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **260,798**（input 39,148 + cache_read 210,176 + output 11,474） ｜ cache_read 占 **81%**
- token 单题均值 **52,160**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 2 | 3 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1526 | FAIL | 🔁 翻盘 | ## 结论 **三级锚定结果** | 级 | 命中 | 关键口径 | |---|---|---| | L3 SOP | `match=exact`（标题逐字复述 | null | raw/0928_1833_1526_dlr.ndjson |
| 1529 | FAIL | 🔁 翻盘 | **答案（客户 38508，debit_card_specializing 库）** - 客户 "38508" 在加油站的消费总额：**5124646.35** | 68740.2 | 3437.01 | raw/0928_1833_1529_dlr.ndjson |
| 1531 | FAIL | 🔁 翻盘 | ## 结论 按 L3 精确命中节（`dlr_search_sop`，标题逐字复述本题，`match=exact`，Expected：`12459 | 22.54 | 12459 | 203.8560787354258 | CZK | raw/0928_1834_1531_dlr.ndjson |