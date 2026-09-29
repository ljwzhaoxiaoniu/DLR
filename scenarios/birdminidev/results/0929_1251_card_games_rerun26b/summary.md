# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1251_card_games_rerun26b` ｜ 题数 26 ｜ 生成 2026-09-29T05:00:31.026Z

**判定（与 gold 比对）：PASS 21 ｜ FAIL 2 ｜ UNCERTAIN 3 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 21 ｜ 🔁 翻盘 4 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **1,996,731**（input 343,499 + cache_read 1,575,040 + output 78,192） ｜ cache_read 占 **79%**
- token 单题均值 **76,797**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 21 | 2 | 3 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 416 | FAIL | 🔁 翻盘 | 三级锚定全部一致，且 L3 的 Expected 与 SQL 结果吻合。 **口径来源（L3 精确命中）**：`dlr_search_sop` 命中节标题逐字复 | 12.975290140452374 | raw/0929_1251_416_dlr.ndjson |
| 474 | FAIL | ❌ 错误 | Both query formulations agree. **Reasoning & evidence:** - L1 semantic recall (` | 30 | raw/0929_1255_474_dlr.ndjson |
| 483 | UNCERTAIN | 🔁 翻盘 | L3 exact hit confirmed the expected count, and the SQL matches it exactly (149 n | Volare, cautela
{T}: Quando una creatura bersaglio diversa d | raw/0929_1256_483_dlr.ndjson |
| 484 | UNCERTAIN | 🔁 翻盘 | ## Result **L3 (SOP) exact hit** — the section title verbatim restates this ques | Sunscour | Commandeer | Jokulmorder | Rimefeather Owl | raw/0929_1256_484_dlr.ndjson |
| 529 | UNCERTAIN | 🔁 翻盘 | 三级锚定完成：L3 SOP **精确命中**本题（`match=exact`），L2 共识确认了 set 级翻译在 `set_translations` 表（l | Tenth Edition | Fourth Edition | Fifth Dawn | Fifth Edition | raw/0929_1258_529_dlr.ndjson |