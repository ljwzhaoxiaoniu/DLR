# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1610_student_club_b9` ｜ 题数 5 ｜ 生成 2026-09-29T08:13:54.037Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **481,657**（input 47,148 + cache_read 386,560 + output 47,949） ｜ cache_read 占 **80%**
- token 单题均值 **96,331**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| student_club | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1422 | UNCERTAIN | ⚠️ 待仲裁 | ## 分析过程 **三级锚定** - **L1（实体路）**：`dlr_semantic_query` 命中 `LOGICAL.Event`（student_c | Advertisement | Food | Speaker Gifts | Parking | raw/0929_1610_1422_dlr.ndjson |
| 1432 | FAIL | ❌ 错误 | ## 分析过程 **三级锚定（并行）** - **L1 语义召回**（`dlr_semantic_query`，db=student_club）：命中 `LOG | 100 | raw/0929_1610_1432_dlr.ndjson |