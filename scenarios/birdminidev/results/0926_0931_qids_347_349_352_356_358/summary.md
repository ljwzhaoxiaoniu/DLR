# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0931_qids_347_349_352_356_358` ｜ 题数 5 ｜ 生成 2026-09-26T01:33:15.893Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **543,154**（input 99,545 + cache_read 426,112 + output 17,497） ｜ cache_read 占 **78%**
- token 单题均值 **108,631**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 349 | UNCERTAIN | 🔁 翻盘 | ## 分析与证据 **L3（SOP）命中**：`sop` 技能中 `card_games` 节有完整复述本题的一节 —— *"Name the card and | Serrated Arrows | John Avon | 1 | raw/0926_0932_349_dlr.ndjson |
| 352 | FAIL | 🔁 翻盘 | ## 分析过程 **三级锚定** - **L3（sop，精确命中）**：`card_games` 节下有完整复述本题的条目 —— *"Calculate the | 8.773399659641314 | raw/0926_0932_352_dlr.ndjson |