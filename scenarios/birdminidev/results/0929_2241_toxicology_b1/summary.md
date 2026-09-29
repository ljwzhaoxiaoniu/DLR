# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2241_toxicology_b1` ｜ 题数 5 ｜ 生成 2026-09-29T14:43:51.876Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 2 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **256,023**（input 37,644 + cache_read 204,800 + output 13,579） ｜ cache_read 占 **80%**
- token 单题均值 **51,205**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| toxicology | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 197 | FAIL | ❌ 错误 | ## 推理过程 **三级锚定** - **L1 实体路**（`dlr_semantic_query`）：命中 `toxicology` 库三张核心表——`LOG | 99.68354430379746 | raw/0929_2241_197_dlr.ndjson |
| 198 | FAIL | ❌ 错误 | **结论**：致癌分子平均含有 **20.25** 条单键。 **推理链** - L1 召回锚定库 `toxicology`：`LOGICAL.Molecule | 732.125 | raw/0929_2241_198_dlr.ndjson |