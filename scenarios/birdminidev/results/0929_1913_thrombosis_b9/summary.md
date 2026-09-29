# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1913_thrombosis_b9` ｜ 题数 5 ｜ 生成 2026-09-29T11:19:47.366Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 4 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 1 ｜ 🔁 翻盘 0 ｜ ❌ 错误 4 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **17** ｜ 工具调用均值 **35** ｜ 工具错误均值 **0**
- token 合计 **2,378,412**（input 126,075 + cache_read 2,112,640 + output 139,697） ｜ cache_read 占 **89%**
- token 单题均值 **475,682**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 1 | 4 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1254 | FAIL | ❌ 错误 | ## 结论过程 **三级锚定（并行）** - **L1 语义召回** → 定位到库 `thrombosis_prediction`，逻辑实体 `LOGICAL. | 1590 | raw/0929_1913_1254_dlr.ndjson |
| 1256 | FAIL | ❌ 错误 | ## 结论 **26 名**患者。 ### 三级锚定过程 | 层 | 工具调用 | 结果 | |---|---|---| | L3 口径 | `dlr_sear | 208 | raw/0929_1915_1256_dlr.ndjson |
| 1257 | FAIL | ❌ 错误 | ## 推理过程 **三级锚定** - **L1（实体路）**：`dlr_semantic_query` → 唯一含"creatinine"的库是 `thromb | 4 | raw/0929_1915_1257_dlr.ndjson |
| 1265 | FAIL | ❌ 错误 | ## 结论 **35 名患者**抗核糖核蛋白（anti-RNP）水平正常且为住院（入院）患者。 ### 锚定与口径（三级） - **L1 实体路**：`dlr_ | 47 | raw/0929_1917_1265_dlr.ndjson |