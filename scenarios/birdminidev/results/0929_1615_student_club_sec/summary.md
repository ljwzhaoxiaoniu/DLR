# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1615_student_club_sec` ｜ 题数 5 ｜ 生成 2026-09-29T08:16:38.900Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **236,761**（input 22,327 + cache_read 204,800 + output 9,634） ｜ cache_read 占 **87%**
- token 单题均值 **47,352**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| student_club | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1322 | FAIL | 🔁 翻盘 | **结论**：所有出席人数超过 10 人的学生社团活动中，类型为 Meeting（会议）的有 **4** 个。 **执行过程** 1. **L3 口径**（`d | 1 | 1 | 1 | 1 | raw/0929_1615_1322_dlr.ndjson |