# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1903_thrombosis_b7` ｜ 题数 5 ｜ 生成 2026-09-29T11:06:35.017Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **10** ｜ 工具调用均值 **18** ｜ 工具错误均值 **0**
- token 合计 **977,641**（input 83,055 + cache_read 840,192 + output 54,394） ｜ cache_read 占 **86%**
- token 单题均值 **195,528**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1241 | FAIL | ❌ 错误 | 已完成三级锚定与 SQL 闭环，结论如下。 **锚定过程** - L1 语义召回：命中 `LOGICAL.Patient`（db=`thrombosis_pre | -562 | raw/0929_1905_1241_dlr.ndjson |