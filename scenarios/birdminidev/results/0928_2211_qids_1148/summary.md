# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2211_qids_1148` ｜ 题数 1 ｜ 生成 2026-09-29T03:10:18.677Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **76,158**（input 9,380 + cache_read 64,512 + output 2,266） ｜ cache_read 占 **85%**
- token 单题均值 **76,158**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 0 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1148 | FAIL | 🔁 翻盘 | **结果说明** - **口径（L3 精确命中）**：`dlr_search_sop` 返回标题逐字复述本题的节（`european_football_2`）， | 13.940797269238713 | raw/0928_2211_1148_dlr.ndjson |