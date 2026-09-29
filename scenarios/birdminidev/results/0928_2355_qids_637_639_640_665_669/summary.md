# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2355_qids_637_639_640_665_669` ｜ 题数 5 ｜ 生成 2026-09-29T03:10:40.740Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **294,875**（input 42,563 + cache_read 240,256 + output 12,056） ｜ cache_read 占 **81%**
- token 单题均值 **58,975**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 639 | FAIL | 🔁 翻盘 | ## 结论 **答案：0** ### 三级锚定过程 | 级别 | 工具 | 命中结果 | |------|------|----------| | **L3 业 | 0.19569471624266144 | raw/0928_2355_639_dlr.ndjson |
| 640 | FAIL | 🔁 翻盘 | ## 结论 **L3 命中**：`dlr_search_sop` 返回 `match=exact`，标题逐字复述本题（`codebase_community#C | -1491 | raw/0928_2355_640_dlr.ndjson |