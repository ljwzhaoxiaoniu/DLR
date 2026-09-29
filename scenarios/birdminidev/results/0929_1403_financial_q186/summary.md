# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1403_financial_q186` ｜ 题数 1 ｜ 生成 2026-09-29T06:05:34.635Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **77,479**（input 4,896 + cache_read 66,176 + output 6,407） ｜ cache_read 占 **85%**
- token 单题均值 **77,479**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| financial | 0 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 186 | FAIL | 🔁 翻盘 | **三级锚定结果** - **L3（口径，exact 命中）**：`financial` 库该题节明确——"requests weekly statements | 52.63157894736842 | raw/0929_1403_186_dlr.ndjson |