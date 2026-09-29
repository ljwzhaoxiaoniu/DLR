# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_2041_qids_584_586_587_592_595` ｜ 题数 5 ｜ 生成 2026-09-29T03:07:11.962Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 1 ｜ UNCERTAIN 2 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 0 ｜ ❌ 错误 2 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **10** ｜ 工具调用均值 **17** ｜ 工具错误均值 **0**
- token 合计 **1,495,016**（input 111,521 + cache_read 1,295,360 + output 88,135） ｜ cache_read 占 **87%**
- token 单题均值 **299,003**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 2 | 1 | 2 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 584 | UNCERTAIN | ❌ 错误 | ## 结论 **锚定过程（三级）** | 级 | 信号 | 采用 | |---|---|---| | L2 领域共识（qid 584, namespace=co |  |  |  | edited title | raw/0926_2041_584_dlr.ndjson |
| 587 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 **目标库**：`codebase_community`（L1 语义召回的 LOGICAL.Post / LOGICAL.Tag / LOGICAL | 288 | So how many staticians *does* it take to screw in a li | raw/0926_2041_587_dlr.ndjson |
| 595 | FAIL | ❌ 错误 | ## 三级锚定结果 **L2 领域共识（`dlr_search_consensus`，命中本题原题 qid 595 / namespace `codebase_ | 57 | 61 | 80 | 124 | raw/0926_2042_595_dlr.ndjson |