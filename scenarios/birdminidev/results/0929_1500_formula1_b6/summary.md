# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1500_formula1_b6` ｜ 题数 5 ｜ 生成 2026-09-29T07:02:09.545Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 0 ｜ UNCERTAIN 2 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 2**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **457,421**（input 53,458 + cache_read 377,088 + output 26,875） ｜ cache_read 占 **82%**
- token 单题均值 **91,484**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 3 | 0 | 2 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 902 | UNCERTAIN | ⚠️ 待仲裁 | ## 查询过程 **三级锚定** - **L3（SOP）**：`dlr_search_sop` 对本题原文返回 `match=none` → 本题无题级口径，用 | Malaysian Grand Prix | Brazilian Grand Prix | San Marino Gra | raw/0929_1500_902_dlr.ndjson |
| 906 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 **Lewis Hamilton 的第一场 F1 分站赛**（按数据集中记录的最早赛季/最早轮次）：**Malaysian Grand Prix（马 | Malaysian Grand Prix | 14 | raw/0929_1501_906_dlr.ndjson |