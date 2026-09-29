# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_0850_qids_705_707_710_716` ｜ 题数 4 ｜ 生成 2026-09-29T03:10:50.485Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 1 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **212,520**（input 31,871 + cache_read 168,832 + output 11,817） ｜ cache_read 占 **79%**
- token 单题均值 **53,130**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 2 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 710 | FAIL | 🔁 翻盘 | Both intermediate figures match the L3 spec exactly (15,091 posts / 15,089 comme | 2888 | raw/0929_0850_710_dlr.ndjson |
| 716 | FAIL | ❌ 错误 | ## 结论 **题目范围锚定**：库 `codebase_community`（L1 `dlr_semantic_query` 命中 `LOGICAL.Post | 1.3254786450662739 | raw/0929_0850_716_dlr.ndjson |