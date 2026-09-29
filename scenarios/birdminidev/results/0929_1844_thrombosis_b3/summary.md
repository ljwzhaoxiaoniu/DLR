# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1844_thrombosis_b3` ｜ 题数 5 ｜ 生成 2026-09-29T10:51:01.636Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **12** ｜ 工具调用均值 **22** ｜ 工具错误均值 **0**
- token 合计 **1,440,473**（input 88,869 + cache_read 1,250,048 + output 101,556） ｜ cache_read 占 **87%**
- token 单题均值 **288,095**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1169 | FAIL | ❌ 错误 | ## 结论 **男性:女性 ≈ 4.33:1**（共 224 条异常尿酸化验记录中，男性 182 条、女性 42 条） ## 推理链 **三级并行锚定** -  | 0.20566810835419985 | raw/0929_1844_1169_dlr.ndjson |
| 1175 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 **数据源**：`thrombosis_prediction`（L1 语义召回命中 `LOGICAL.Patient`，三张 PE：`Patient | 28 | SLE | raw/0929_1845_1175_dlr.ndjson |