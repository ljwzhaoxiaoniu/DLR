# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0957_qids_472_477_479_480_483_484` ｜ 题数 6 ｜ 生成 2026-09-28T13:45:52.687Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 2 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **11** ｜ 工具错误均值 **0**
- token 合计 **844,188**（input 136,190 + cache_read 668,416 + output 39,582） ｜ cache_read 占 **79%**
- token 单题均值 **140,698**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 4 | 0 | 2 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 483 | UNCERTAIN | 🔁 翻盘 | I have the complete evidence. Here are the results. **Mapping (from MCP):** - L1 | Volare, cautela
{T}: Quando una creatura bersaglio diversa d | raw/0926_0957_483_dlr.ndjson |
| 484 | UNCERTAIN | 🔁 翻盘 | ## 结论 **锚定过程：** - **L2 领域共识**（`dlr_search_consensus`, namespace=`card_games`）： - | Sunscour | Commandeer | Jokulmorder | Rimefeather Owl | raw/0926_0957_484_dlr.ndjson |