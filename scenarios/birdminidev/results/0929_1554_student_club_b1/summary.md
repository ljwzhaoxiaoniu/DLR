# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1554_student_club_b1` ｜ 题数 5 ｜ 生成 2026-09-29T07:57:57.630Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **258,223**（input 41,070 + cache_read 208,640 + output 8,513） ｜ cache_read 占 **81%**
- token 单题均值 **51,645**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| student_club | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1322 | FAIL | ❌ 错误 | ## 分析过程 **三级锚定结果：** - **L3（SOP）**：`match=none` — 本题无题级口径节，按 L1 + L2 自解。 - **L1（语 | 1 | 1 | 1 | 1 | raw/0929_1555_1322_dlr.ndjson |