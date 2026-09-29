# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1841_thrombosis_b2` ｜ 题数 5 ｜ 生成 2026-09-29T10:44:08.958Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **9** ｜ 工具调用均值 **17** ｜ 工具错误均值 **0**
- token 合计 **767,175**（input 59,050 + cache_read 657,408 + output 50,717） ｜ cache_read 占 **86%**
- token 单题均值 **153,435**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1162 | FAIL | ❌ 错误 | ## 结论过程 **三级锚定** - **L3（SOP）**：`match=none` — 本题无题级口径节，按 L1+L2 自解。 - **L2（领域共识）* | 161 | raw/0929_1841_1162_dlr.ndjson |
| 1166 | UNCERTAIN | ⚠️ 待仲裁 | ## 分析过程 **三级锚定**：L3 `dlr_search_sop` → `match=none`（本题无题级口径节）；L1 语义召回命中 `LOGICAL | CNS susp | SLE | raw/0929_1843_1166_dlr.ndjson |