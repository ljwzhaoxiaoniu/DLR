# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1333_financial_b2` ｜ 题数 5 ｜ 生成 2026-09-29T05:35:04.797Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **313,637**（input 45,995 + cache_read 255,872 + output 11,770） ｜ cache_read 占 **82%**
- token 单题均值 **62,727**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| financial | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 115 | FAIL | ❌ 错误 | ## 结论 **40%**（该支行所在地区共 45 位客户，其中男性 18 位）。 ## 推理与证据链 **1) 定位库与实体（L1 语义召回）** `dlr_ | 44.26229508196721 | raw/0929_1334_115_dlr.ndjson |