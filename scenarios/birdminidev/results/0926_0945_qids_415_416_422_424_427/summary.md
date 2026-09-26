# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0945_qids_415_416_422_424_427` ｜ 题数 5 ｜ 生成 2026-09-26T01:48:25.925Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **898,288**（input 109,706 + cache_read 743,040 + output 45,542） ｜ cache_read 占 **83%**
- token 单题均值 **179,658**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 416 | FAIL | ❌ 错误 | **推理链路** - **L3（sop）**：card_games 各节无一复述本题 → 无对应节，按 L1+L2 锚定。 - **L2（领域共识）**：qid | 12.975290140452374 | raw/0926_0945_416_dlr.ndjson |