# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1359_financial_secC` ｜ 题数 3 ｜ 生成 2026-09-29T06:02:14.990Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **14** ｜ 工具错误均值 **0**
- token 合计 **332,912**（input 16,688 + cache_read 285,312 + output 30,912） ｜ cache_read 占 **86%**
- token 单题均值 **110,971**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| financial | 2 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 186 | FAIL | ⚠️ 待仲裁 |  | 52.63157894736842 | raw/0929_1359_186_dlr.ndjson |