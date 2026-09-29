# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1303_card_games_sec4` ｜ 题数 4 ｜ 生成 2026-09-29T05:07:07.261Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 1 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **7** ｜ 工具错误均值 **0**
- token 合计 **485,161**（input 118,497 + cache_read 349,312 + output 17,352） ｜ cache_read 占 **72%**
- token 单题均值 **121,290**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 2 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 340 | FAIL | ❌ 错误 | ## 结论 **"Incredibly powerful foils"（超强闪卡）** 的判定口径来自三级锚定： - **L3（`dlr_search_sop` | 4 | 5 | 6 | 9 | raw/0929_1303_340_dlr.ndjson |
| 371 | FAIL | 🔁 翻盘 | ## 结论 **83.65%** — 故事焦点（Story Spotlight）卡牌中，有法文印制的卡牌占比。 ### 三级锚定过程 | 级 | 工具 | 命中 | 10 | raw/0929_1304_371_dlr.ndjson |