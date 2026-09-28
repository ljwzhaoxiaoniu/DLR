# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2116_qids_1058_1068_1076_1078_1079` ｜ 题数 5 ｜ 生成 2026-09-28T13:51:58.663Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **7** ｜ 工具错误均值 **0**
- token 合计 **264,351**（input 54,116 + cache_read 202,752 + output 7,483） ｜ cache_read 占 **77%**
- token 单题均值 **52,870**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1058 | FAIL | 🔁 翻盘 | ## 分析与证据 **三级锚定结果** - **L1 语义召回**（`dlr_semantic_query`）：命中 `LOGICAL.Player`（euro | Min | raw/0928_2116_1058_dlr.ndjson |