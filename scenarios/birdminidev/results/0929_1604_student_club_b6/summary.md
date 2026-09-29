# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1604_student_club_b6` ｜ 题数 5 ｜ 生成 2026-09-29T08:08:18.316Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **19** ｜ 工具错误均值 **0**
- token 合计 **958,505**（input 83,027 + cache_read 819,200 + output 56,278） ｜ cache_read 占 **85%**
- token 单题均值 **191,701**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| student_club | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1389 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 **三级锚定结果**：L3 精确命中为空（`dlr_search_sop` → `match=none`，本题无题级口径节）；L1 召回将题目锚定到 | November Speaker | raw/0929_1605_1389_dlr.ndjson |