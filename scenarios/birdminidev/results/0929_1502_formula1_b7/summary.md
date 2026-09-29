# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1502_formula1_b7` ｜ 题数 5 ｜ 生成 2026-09-29T07:06:25.512Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **642,189**（input 47,449 + cache_read 544,256 + output 50,484） ｜ cache_read 占 **85%**
- token 单题均值 **128,438**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 928 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 2007 年加拿大大奖赛（Canadian Grand Prix）第一名是 **Lewis Hamilton**，其 reference name（ | Fernando | Alonso | alonso | raw/0929_1502_928_dlr.ndjson |