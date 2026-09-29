# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1354_financial_secA` ｜ 题数 5 ｜ 生成 2026-09-29T05:56:30.238Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 3 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 3 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **282,400**（input 27,925 + cache_read 243,712 + output 10,763） ｜ cache_read 占 **86%**
- token 单题均值 **56,480**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| financial | 2 | 3 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 94 | FAIL | 🔁 翻盘 | ## 回答 **口径（L3 命中，逐字复述本题）**：`dlr_search_sop` 返回 `match=exact` 的节，Expected = `3214 | 6 | 4431 | raw/0929_1354_94_dlr.ndjson |
| 95 | FAIL | 🔁 翻盘 | ## 结论 **账户号：1372** ## 推理链（三级锚定） **L3 口径（`dlr_search_sop`，match=exact）** — 命中节标题逐 | 2836 | raw/0929_1354_95_dlr.ndjson |
| 115 | FAIL | 🔁 翻盘 | ## 结论 **南波希米亚（south Bohemia）人口最多的分支 → 男性客户占比 = 40%** ### 三级锚定过程 | 层级 | 工具 | 关键命中 | 44.26229508196721 | raw/0929_1355_115_dlr.ndjson |