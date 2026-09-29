# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1346_financial_b6` ｜ 题数 5 ｜ 生成 2026-09-29T05:49:54.721Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 3 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 0 ｜ ❌ 错误 3 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **9** ｜ 工具调用均值 **17** ｜ 工具错误均值 **0**
- token 合计 **773,327**（input 66,060 + cache_read 656,384 + output 50,883） ｜ cache_read 占 **85%**
- token 单题均值 **154,665**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| financial | 2 | 3 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 186 | FAIL | ❌ 错误 | ## 分析路径 **三级并行锚定** - **L3（`dlr_search_sop`）**：`match=none` —— 本题无题级口径节，按 L1+L2 自 | 52.63157894736842 | raw/0929_1346_186_dlr.ndjson |
| 189 | FAIL | ❌ 错误 | ## 推理过程 **三级锚定** - **L3（`dlr_search_sop`）**：`match=none`（近邻候选均为其他库/其他题，标题未复述本题）→ | 1743 | raw/0929_1346_189_dlr.ndjson |
| 192 | FAIL | ❌ 错误 | ## 解答 **语义锚定（三级）** | 级 | 结果 | |---|---| | L1 语义召回 | `LOGICAL.Loan`（financial）→ ` | 192836.57142857142 | raw/0929_1347_192_dlr.ndjson |