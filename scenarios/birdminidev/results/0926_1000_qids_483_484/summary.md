# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_1000_qids_483_484` ｜ 题数 2 ｜ 生成 2026-09-29T01:16:07.354Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 0 ｜ UNCERTAIN 2 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **281,636**（input 48,481 + cache_read 219,136 + output 14,019） ｜ cache_read 占 **78%**
- token 单题均值 **140,818**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 0 | 0 | 2 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 483 | UNCERTAIN | 🔁 翻盘 | ## Answer **Set Coldsnap = `CSP`** (`sets.code`, name "Coldsnap"; the related co | Volare, cautela
{T}: Quando una creatura bersaglio diversa d | raw/0926_1000_483_dlr.ndjson |
| 484 | UNCERTAIN | 🔁 翻盘 | ## 解答 **三级锚定结果**： - **L3（sop 技能）**：命中完全复述本题的节 —— "Please list the Italian names  | Sunscour | Commandeer | Jokulmorder | Rimefeather Owl | raw/0926_1000_484_dlr.ndjson |