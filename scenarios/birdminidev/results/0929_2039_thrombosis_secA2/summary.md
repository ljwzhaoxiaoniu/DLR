# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2039_thrombosis_secA2` ｜ 题数 5 ｜ 生成 2026-09-29T12:43:51.826Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **7** ｜ 工具错误均值 **0**
- token 合计 **211,245**（input 23,182 + cache_read 179,200 + output 8,863） ｜ cache_read 占 **85%**
- token 单题均值 **42,249**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1152 | FAIL | 🔁 翻盘 | ## 结论 Among the 195 `SLE`-diagnosed patients in the `Patient` table (库 `thrombos | 1.3095238095238095 | raw/0929_2039_1152_dlr.ndjson |