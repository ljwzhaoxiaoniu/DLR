# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1459_formula1_b5` ｜ 题数 5 ｜ 生成 2026-09-29T07:00:25.332Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **11** ｜ 工具错误均值 **0**
- token 合计 **359,745**（input 48,012 + cache_read 291,840 + output 19,893） ｜ cache_read 占 **81%**
- token 单题均值 **71,949**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 896 | FAIL | ❌ 错误 | ## 结论 **Hamilton 自 2010 年以来「不在第 1 名（1st track）完赛」的占比 ≈ 66.20%** ### 三级锚定过程 **L1  | 73.2394366197183 | raw/0929_1459_896_dlr.ndjson |