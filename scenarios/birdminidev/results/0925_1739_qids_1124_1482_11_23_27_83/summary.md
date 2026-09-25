# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1739_qids_1124_1482_11_23_27_83` ｜ 题数 6 ｜ 生成 2026-09-25T09:42:33.050Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 3 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **955,192**（input 128,249 + cache_read 741,632 + output 85,311） ｜ cache_read 占 **78%**
- token 单题均值 **159,199**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| california_schools | 3 | 0 | 1 | 0 |
| debit_card_specializing | 0 | 1 | 0 | 0 |
| european_football_2 | 0 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1124 | FAIL | 🔁 翻盘 | I have everything needed. Cross-checked L1 (LOGICAL.Player / PHYSICAL.Player_Att | Aaron Cresswell | Aaron Lennon | Aaron Meijers | Aaron Nigue | raw/0925_1739_1124_dlr.ndjson |
| 1482 | FAIL | 🔁 翻盘 | ## 结论 按 SOP 中该题专属节的权威口径（L3 业务逻辑级 restate 命中）：问题点名了货币，因此必须先按客户主数据的结算货币过滤（`Currenc | 545.4018999790969 | 681.5824574939339 | 708.1124062978664 | raw/0925_1739_1482_dlr.ndjson |
| 27 | UNCERTAIN | 🔁 翻盘 | ## 处理路径 **三级锚定** - **L3（`sop`，权威命中）**：技能中存在完整复述本题的节（"What is the average score i | FAME Public Charter | 505 | null | Envision Academy for Arts | raw/0925_1740_27_dlr.ndjson |