# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1512_formula1_b9` ｜ 题数 5 ｜ 生成 2026-09-29T07:13:47.616Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **413,266**（input 49,870 + cache_read 348,160 + output 15,236） ｜ cache_read 占 **84%**
- token 单题均值 **82,653**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 951 | FAIL | ❌ 错误 | ## 语义建模问答 **三级锚定结果** - **L3（口径）**：`dlr_search_sop` 返回 `match=none` — 本题无题级口径节，按  | 2 | raw/0929_1513_951_dlr.ndjson |