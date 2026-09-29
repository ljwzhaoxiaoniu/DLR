# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1633_superhero_b4` ｜ 题数 5 ｜ 生成 2026-09-29T08:33:56.090Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **219,465**（input 43,796 + cache_read 168,320 + output 7,349） ｜ cache_read 占 **77%**
- token 单题均值 **43,893**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| superhero | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 750 | FAIL | ❌ 错误 | ## 结论 女性超级英雄的平均体重为 **78.51 千克（kg）**。 **依据与口径**： - L1 语义召回（`dlr_semantic_query`）锚 | 60.77956989247312 | raw/0929_1633_750_dlr.ndjson |
| 751 | UNCERTAIN | ⚠️ 待仲裁 | 三级锚定已完成：L3 无命中（`match=none`），L2 领域共识（namespace=superhero）确认「Superpowers are the  | Agility | Super Strength | Stamina | Super Speed | raw/0929_1633_751_dlr.ndjson |