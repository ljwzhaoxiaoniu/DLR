# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2245_toxicology_b3` ｜ 题数 5 ｜ 生成 2026-09-29T14:48:42.310Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 2 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **265,822**（input 39,495 + cache_read 214,016 + output 12,311） ｜ cache_read 占 **81%**
- token 单题均值 **53,164**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| toxicology | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 215 | FAIL | ❌ 错误 | ## 结论 **97** 个原子。 **锚定过程** - **L1（`dlr_semantic_query`）**：命中库 `toxicology`（元素 `i | 3 | 77 | raw/0929_2245_215_dlr.ndjson |
| 218 | FAIL | ❌ 错误 | ## 分析过程 **三级锚定** - **L3（`dlr_search_sop`）**：`match=none` — 本题无题级 SOP 节，按 L1+L2 自 | 100 | raw/0929_2245_218_dlr.ndjson |