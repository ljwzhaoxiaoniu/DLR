# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0933_qids_366_368_371_377_379` ｜ 题数 5 ｜ 生成 2026-09-29T01:14:28.263Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 1 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **428,441**（input 95,100 + cache_read 316,160 + output 17,181） ｜ cache_read 占 **74%**
- token 单题均值 **85,688**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 366 | UNCERTAIN | 🔁 翻盘 | ## 结论 **"Benalish Knight" 的规则（rules text）为：** > Flash (You may cast this spell a | commander | duel | legacy | modern | raw/0926_0933_366_dlr.ndjson |
| 371 | FAIL | ❌ 错误 | ## 结论 **Story Spotlight 卡牌中，语言为法语的卡牌占比为 83.65%。** ### 推演过程 **Step 1 — 三级并行锚定** - | 10 | raw/0926_0933_371_dlr.ndjson |