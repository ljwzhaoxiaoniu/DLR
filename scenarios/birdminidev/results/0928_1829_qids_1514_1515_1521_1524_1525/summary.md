# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1829_qids_1514_1515_1521_1524_1525` ｜ 题数 5 ｜ 生成 2026-09-28T13:51:46.028Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **265,333**（input 43,877 + cache_read 212,224 + output 9,232） ｜ cache_read 占 **80%**
- token 单题均值 **53,067**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1525 | FAIL | 🔁 翻盘 | **答案：2.7027%** 三级锚定过程： - **L3（权威）**：`dlr_search_sop` 返回 `match=exact`，标题逐字复述本题 → | 1.6470588235294117 | raw/0928_1829_1525_dlr.ndjson |