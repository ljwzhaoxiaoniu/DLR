# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2044_thrombosis_secC` ｜ 题数 5 ｜ 生成 2026-09-29T12:48:23.382Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **318,049**（input 38,050 + cache_read 265,728 + output 14,271） ｜ cache_read 占 **84%**
- token 单题均值 **63,610**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1241 | FAIL | ⚠️ 待仲裁 |  | -562 | raw/0929_2044_1241_dlr.ndjson |