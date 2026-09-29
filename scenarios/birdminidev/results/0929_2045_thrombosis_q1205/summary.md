# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2045_thrombosis_q1205` ｜ 题数 1 ｜ 生成 2026-09-29T12:48:09.576Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **4** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **43,874**（input 8,810 + cache_read 32,000 + output 3,064） ｜ cache_read 占 **73%**
- token 单题均值 **43,874**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 0 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1205 | FAIL | ⚠️ 待仲裁 |  | 0 | 0 | 0 | 0 | raw/0929_2045_1205_dlr.ndjson |