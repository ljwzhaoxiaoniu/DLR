# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1438_qids_1141_1144_1145_1146_1147` ｜ 题数 5 ｜ 生成 2026-09-29T01:12:47.934Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **494,914**（input 93,453 + cache_read 378,880 + output 22,581） ｜ cache_read 占 **77%**
- token 单题均值 **98,983**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1144 | FAIL | 🔁 翻盘 | ## 结论 **三级锚定** - **L2 领域共识（直接命中）**：`dlr_search_consensus` 返回 qid 1144（`european_ | 98022 | 13 | 13 | raw/0925_1438_1144_dlr.ndjson |