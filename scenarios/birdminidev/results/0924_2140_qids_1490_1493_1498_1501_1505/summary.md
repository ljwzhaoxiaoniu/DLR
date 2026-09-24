# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0924_2140_qids_1490_1493_1498_1501_1505` ｜ 题数 5 ｜ 生成 2026-09-24T15:52:00.325Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 2 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **306,044**（input 52,882 + cache_read 239,744 + output 13,418） ｜ cache_read 占 **78%**
- token 单题均值 **61,209**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1490 | FAIL | 🔁 翻盘 | **Analysis (three-level anchoring):** - **L3 (SOP)** — the `sop` skill has a sec | 98.5267932135058 | raw/0924_2140_1490_dlr.ndjson |
| 1493 | FAIL | ❌ 错误 | ## 回答 **问题**：2012 年 2 月，有多少百分比的客户消费超过 528.3？ **三级锚定结果** - **L1（实体路）**：`dlr_seman | 66.62300807683911 | raw/0924_2140_1493_dlr.ndjson |