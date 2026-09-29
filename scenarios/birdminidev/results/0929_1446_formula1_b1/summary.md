# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1446_formula1_b1` ｜ 题数 5 ｜ 生成 2026-09-29T06:49:26.000Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **297,381**（input 49,110 + cache_read 236,672 + output 11,599） ｜ cache_read 占 **80%**
- token 单题均值 **59,476**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 847 | UNCERTAIN | ⚠️ 待仲裁 | **推理过程** - **L1 实体路**：`dlr_semantic_query` 命中 `formula_1` 库的 `LOGICAL.DriverRace | Fisichella | raw/0929_1446_847_dlr.ndjson |