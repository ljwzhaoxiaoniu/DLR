# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1427_qids_1501_1505_1506_1507_1509` ｜ 题数 5 ｜ 生成 2026-09-28T13:51:43.240Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **269,862**（input 39,679 + cache_read 215,680 + output 14,503） ｜ cache_read 占 **80%**
- token 单题均值 **53,972**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1501 | UNCERTAIN | 🔁 翻盘 | **Verification complete.** **L3 SOP (exact match, authoritative):** The section  | CZE | SVK | raw/0928_1427_1501_dlr.ndjson |
| 1505 | FAIL | 🔁 翻盘 | ## 结论 **391** 名以欧元（EUR）结算的客户拥有超过 1000 的月度消费。 ### 语义锚定过程 | 级 | 命中 | 锚定的列/口径 | |-- | 2730 | raw/0928_1427_1505_dlr.ndjson |