# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2201_qids_1133_1134_1135_1136_1139` ｜ 题数 5 ｜ 生成 2026-09-28T14:05:01.259Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 3 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 3 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **381,606**（input 64,709 + cache_read 298,880 + output 18,017） ｜ cache_read 占 **78%**
- token 单题均值 **76,321**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 2 | 3 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1133 | FAIL | 🔁 翻盘 | **答案：6** 依据与口径说明： | 环节 | 结论 | 来源 | |------|------|------| | 实体 | `LOGICAL.Player | 9 | raw/0928_2201_1133_dlr.ndjson |
| 1135 | FAIL | 🔁 翻盘 | **三级锚定结果** - **L3（`dlr_search_sop`，match=exact）**：本题有逐字命中的题级口径节，两条关键读法： 1. **只算右 | 132235 | 132236 | 66213 | 66214 | raw/0928_2201_1135_dlr.ndjson |
| 1136 | FAIL | 🔁 翻盘 | ## 结论路径 **三级锚定** - **L1（实体路）**：命中 `LOGICAL.Player`（db=`european_football_2`），属性含 | 3 | raw/0928_2201_1136_dlr.ndjson |