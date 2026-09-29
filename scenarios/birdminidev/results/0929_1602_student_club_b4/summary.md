# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1602_student_club_b4` ｜ 题数 5 ｜ 生成 2026-09-29T08:03:55.919Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **11** ｜ 工具错误均值 **0**
- token 合计 **335,101**（input 49,499 + cache_read 272,896 + output 12,706） ｜ cache_read 占 **81%**
- token 单题均值 **67,020**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| student_club | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1359 | FAIL | ❌ 错误 | ## 语义锚定过程 **L1 实体路**：`dlr_semantic_query` 命中 `LOGICAL.Budget`（student_club）——预算行 | 2.727272727272727 | raw/0929_1602_1359_dlr.ndjson |