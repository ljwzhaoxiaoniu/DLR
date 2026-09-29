# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1506_formula1_b8` ｜ 题数 5 ｜ 生成 2026-09-29T07:12:35.413Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **11** ｜ 工具调用均值 **20** ｜ 工具错误均值 **0**
- token 合计 **1,357,099**（input 61,321 + cache_read 1,210,368 + output 85,410） ｜ cache_read 占 **89%**
- token 单题均值 **271,420**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 937 | FAIL | ❌ 错误 | ## 结论 **Race identification (关键点)**：题面中的赛事名 `AustChineseralian Grand Prix` 是 "Au | +16.445 | raw/0929_1506_937_dlr.ndjson |