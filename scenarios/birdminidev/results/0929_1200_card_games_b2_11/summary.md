# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1200_card_games_b2_11` ｜ 题数 47 ｜ 生成 2026-09-29T04:25:08.861Z

**判定（与 gold 比对）：PASS 16 ｜ FAIL 12 ｜ UNCERTAIN 19 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 16 ｜ 🔁 翻盘 6 ｜ ❌ 错误 11 ｜ ⚠️ 待仲裁 14**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **3**
- token 合计 **2,816,156**（input 453,412 + cache_read 2,210,560 + output 152,184） ｜ cache_read 占 **78%**
- token 单题均值 **59,918**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 16 | 12 | 19 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 349 | UNCERTAIN | 🔁 翻盘 | ## 结论 **Teferi's Protection（艺术家：Chase Stone）** —— 它拥有最多的 ruling 信息（**27 条 ruling | Serrated Arrows | John Avon | 1 | raw/0929_1200_349_dlr.ndjson |
| 352 | FAIL | 🔁 翻盘 | ## 结论 **35.38%** 的卡牌有简体中文版本。 ### 三级锚定过程 **L3 口径（权威，`match=exact`）** — `dlr_searc | 8.773399659641314 | raw/0929_1200_352_dlr.ndjson |
| 356 | FAIL | ❌ 错误 | ## 结论 **2 张**（`cards.power = '∞'`）。 ## 证据链 **1. L1 实体路** — `dlr_semantic_query`  | 429 | raw/0929_1200_356_dlr.ndjson |
| 366 | UNCERTAIN | 🔁 翻盘 | ## 结论 **Benalish Knight 的规则（rules text / 印刷异能）为：Flash 与 First strike。** 依据链路（三级并 | commander | duel | legacy | modern | raw/0929_1200_366_dlr.ndjson |
| 371 | FAIL | ❌ 错误 | ## 查询过程与结论 **三级锚定结果：** | 级 | 命中 | 采信内容 | |---|---|---| | L3 SOP | `match=similar | 10 | raw/0929_1201_371_dlr.ndjson |
| 383 | FAIL | 🔁 翻盘 | 三级锚定完成，结果与 L3 口径一致。 **锚定与执行过程** | 层级 | 工具 | 关键返回 | |------|------|----------| |  | 258 | raw/0929_1201_383_dlr.ndjson |
| 402 | FAIL | 🔁 翻盘 | ## 解答 **三级锚定结果** | 级别 | 工具 | 命中内容 | |------|------|----------| | L3 业务逻辑级 | `dlr | 0.18302770053852382 | raw/0929_1202_402_dlr.ndjson |
| 407 | UNCERTAIN | 🔁 翻盘 | ## 结论 **L3 口径（精确命中，最权威）**：`dlr_search_sop` 返回的节标题与本题逐字相同（`card_games#Lists all t | Human,Rebel | Legendary | Angel | Legendary | raw/0929_1202_407_dlr.ndjson |
| 416 | FAIL | ⚠️ 待仲裁 |  | 12.975290140452374 | raw/0929_1203_416_dlr.ndjson |
| 422 | UNCERTAIN | ⚠️ 待仲裁 | 我无法完成这次查询。 **执行情况** 1. 按流程并行发起了三级锚定（L3 口径路 / L1 实体路 / L2 领域共识路），随后又尝试了第二跳 `get_p | French | raw/0929_1203_422_dlr.ndjson |
| 424 | FAIL | ❌ 错误 | I attempted to run the standard three-level anchoring flow (L1 semantic recall,  | 0.20238639963394459 | raw/0929_1204_424_dlr.ndjson |
| 427 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论：无法回答（工具面缺失） 我按 DLR 三级并行锚定流程启动了本题的检索，但**本题所需的 MCP 工具在本会话中均未注册**，三条路径全部返回 `u | Chinese Simplified | Chinese Traditional | French | German | raw/0929_1206_427_dlr.ndjson |
| 440 | UNCERTAIN | ⚠️ 待仲裁 | ## 执行说明 本题要求走「三级并行锚定 → 映射 → SQL」闭环，但**本会话实际挂载的工具只有 `skill` 一个**；语义核心 MCP 工具面（`dl | Portuguese (Brazil) | raw/0929_1207_440_dlr.ndjson |
| 462 | UNCERTAIN | ⚠️ 待仲裁 | I attempted the mandated three-level anchor, but the entire `semantic-core` MCP  | Set Base Decima Edizione | Sentenza | raw/0929_1209_462_dlr.ndjson |
| 465 | UNCERTAIN | ⚠️ 待仲裁 | ## 执行状态：无法完成查询（工具面缺失） 我按 AGENTS.md 的三级并行锚定流程尝试启动，结果如下： **1. L3 口径路** — `mcp__sem | YES | raw/0929_1211_465_dlr.ndjson |
| 466 | FAIL | ❌ 错误 | I must report a tooling failure rather than guess. **Attempted workflow (three-l | 12 | raw/0929_1212_466_dlr.ndjson |
| 468 | UNCERTAIN | ⚠️ 待仲裁 | I attempted the prescribed three-level anchor flow, but I must report a hard blo | 核心系列第八版 | raw/0929_1213_468_dlr.ndjson |
| 469 | UNCERTAIN | ⚠️ 待仲裁 | ## 执行说明 我按 DLR 三级并行锚定流程启动了本题：L1 实体路（`dlr_semantic_query`）、L2 领域共识路（`dlr_search_c | YES | YES | YES | YES | raw/0929_1213_469_dlr.ndjson |
| 473 | UNCERTAIN | ⚠️ 待仲裁 | 我按「三级并行锚定」流程尝试启动本题的 L1/L2/L3 检索，但本会话的工具面只挂载了 `skill`（范式认知），语义核心 MCP 工具全部不可达： | 尝 | NO | NO | NO | NO | raw/0929_1214_473_dlr.ndjson |
| 474 | FAIL | ❌ 错误 | ## 执行说明（工具面不可达，任务无法完成） 我按 AGENTS.md 规定的「三级并行锚定」流程发起调用，但本会话实际挂载的工具面**只有 `skill` 一 | 30 | raw/0929_1214_474_dlr.ndjson |
| 479 | FAIL | ❌ 错误 | ## 执行情况说明 我按三级并行锚定流程启动了本题的检索，但**本会话的工具面不可用**——以下是实际发生的调用与返回： | 尝试 | 目标 | 结果 | |- | 6 | raw/0929_1215_479_dlr.ndjson |
| 480 | UNCERTAIN | ⚠️ 待仲裁 | ## 说明 本题需要查「卡牌 Ancestor's Chosen 的意大利语 flavor text」——这属于数据集（卡牌多语言印刷）里的一行具体值，必须走  | "La volontà di tutti, eseguita per mano mia." | Sancito da g | raw/0929_1216_480_dlr.ndjson |
| 483 | UNCERTAIN | ❌ 错误 | 当前本会话只挂载了 `skill` 一个工具（有效名仅 `paradigm`），语义核心的 MCP 工具面（`dlr_semantic_query` / `dl | Volare, cautela
{T}: Quando una creatura bersaglio diversa d | raw/0929_1216_483_dlr.ndjson |
| 484 | UNCERTAIN | ❌ 错误 | ## 执行情况（三级锚定未启动成功） 拿到问题后，我按流程**并行发出**三级调用，但 `semantic-core` MCP server 在本会话中**未挂 | Sunscour | Commandeer | Jokulmorder | Rimefeather Owl | raw/0929_1217_484_dlr.ndjson |
| 486 | FAIL | ❌ 错误 | ## 结论：本次无法给出该问题的答案 ### 执行过程（证据驱动，如实记录） 按三级并行锚定流程，我先同时发起了三条路： | 级 | 工具 | 实际返回 | | | 7.741935483870968 | raw/0929_1217_486_dlr.ndjson |
| 487 | FAIL | ❌ 错误 | I must report a runtime blocker rather than fabricate an answer. **What I attemp | 100 | raw/0929_1218_487_dlr.ndjson |
| 518 | UNCERTAIN | ⚠️ 待仲裁 | 我按三级并行锚定流程启动了本题的检索（口径路 / 实体路 / evidence 路），但当前运行组合里 **`semantic-core` MCP 工具面没有挂 | legacy | Balance | legacy | Crusade | raw/0929_1218_518_dlr.ndjson |
| 522 | UNCERTAIN | ⚠️ 待仲裁 | ## 执行结果说明 我按规范启动了三級并行锚定流程，但**本会话运行时未挂载 `semantic-core` MCP 工具面**，无法完成元数据检索与 SQL  | Sol Ring | duel | Sol Ring | legacy | raw/0929_1219_522_dlr.ndjson |
| 528 | UNCERTAIN | ⚠️ 待仲裁 | ## 执行情况说明 我按三级并行锚定流程发起检索，但**本会话运行时并未挂载 `semantic-core` MCP 工具面**，所有 MCP 调用均返回 `u | Act of Heroism | commander | Act of Heroism | duel | raw/0929_1219_528_dlr.ndjson |
| 529 | UNCERTAIN | ❌ 错误 | 我无法完成这道题——需要说明原因。 ## 执行情况 按三级并行锚定流程，我先加载了范式认知技能 `paradigm`（成功），随后尝试发出三级并行召回： | 级 | Tenth Edition | Fourth Edition | Fifth Dawn | Fifth Edition | raw/0929_1220_529_dlr.ndjson |
| 530 | UNCERTAIN | ⚠️ 待仲裁 | ## 执行情况说明 我按 DLR 三级并行锚定流程启动了本题的查询，但**本会话运行时未挂载 `semantic-core` MCP 工具面**，三级全部无法执 | 1997 | Blinking Spirit | NO | 1997 | raw/0929_1220_530_dlr.ndjson |