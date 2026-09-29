# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1449_formula1_b2` ｜ 题数 5 ｜ 生成 2026-09-29T06:56:03.627Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **11** ｜ 工具调用均值 **22** ｜ 工具错误均值 **0**
- token 合计 **1,356,232**（input 72,284 + cache_read 1,185,280 + output 98,668） ｜ cache_read 占 **87%**
- token 单题均值 **271,246**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 861 | FAIL | ❌ 错误 | ## 检索与锚定过程 **三级并行锚定** - **L1 实体路**：`dlr_semantic_query` → 命中 `formula_1`，`LOGICA | 3 | 5 | raw/0929_1449_861_dlr.ndjson |
| 866 | UNCERTAIN | ⚠️ 待仲裁 | ## 查询过程与证据 **三级锚定** - **L3（口径）**：`dlr_search_sop` 对本句**无逐字命中**（match=none），故按 L1 | David | Coulthard | http://en.wikipedia.org/wiki/David_Coult | raw/0929_1450_866_dlr.ndjson |