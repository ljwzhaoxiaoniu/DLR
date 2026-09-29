# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2100_thrombosis_q1205b` ｜ 题数 1 ｜ 生成 2026-09-29T13:02:17.323Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **12** ｜ 工具调用均值 **25** ｜ 工具错误均值 **0**
- token 合计 **256,876**（input 13,583 + cache_read 225,280 + output 18,013） ｜ cache_read 占 **88%**
- token 单题均值 **256,876**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 0 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1205 | FAIL | 🔁 翻盘 | ## 结论 **是 —— 该患者的尿酸在正常范围内；数据集自身的标志位取值为 0。** ### 三级锚定结果 | 级 | 工具 | 命中 | |---|---| | 0 | 0 | 0 | 0 | raw/0929_2100_1205_dlr.ndjson |