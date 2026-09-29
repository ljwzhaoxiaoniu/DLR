# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2259_toxicology_b7` ｜ 题数 5 ｜ 生成 2026-09-29T15:03:49.618Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 2 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **14** ｜ 工具错误均值 **0**
- token 合计 **405,888**（input 44,770 + cache_read 341,760 + output 19,358） ｜ cache_read 占 **84%**
- token 单题均值 **81,178**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| toxicology | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 260 | FAIL | ❌ 错误 | All checks pass. The element vocabulary is confirmed (`p`, `br` are the only sym | 1 | raw/0929_2259_260_dlr.ndjson |
| 263 | FAIL | ❌ 错误 | ## 解析过程 **L1 实体锚定**（`dlr_semantic_query`，db=toxicology）：命中 `LOGICAL.Atom`（`eleme | 2.6840451814272206 | raw/0929_2300_263_dlr.ndjson |