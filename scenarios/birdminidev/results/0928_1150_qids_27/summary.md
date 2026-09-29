# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1150_qids_27` ｜ 题数 1 ｜ 生成 2026-09-29T03:08:04.331Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **100,273**（input 19,451 + cache_read 67,072 + output 13,750） ｜ cache_read 占 **67%**
- token 单题均值 **100,273**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| california_schools | 0 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 27 | UNCERTAIN | 🔁 翻盘 | ## 检索路径 **L3（`dlr_search_sop`，`match=exact`，标题逐字复述本题 → 本题最权威口径）** 给出四条关键口径： 1. " | FAME Public Charter | 505 | null | Envision Academy for Arts | raw/0928_1150_27_dlr.ndjson |