# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1339_financial_b4` ｜ 题数 5 ｜ 生成 2026-09-29T05:42:59.837Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 2 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 0 ｜ ❌ 错误 2 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **9** ｜ 工具调用均值 **17** ｜ 工具错误均值 **0**
- token 合计 **697,466**（input 59,411 + cache_read 583,168 + output 54,887） ｜ cache_read 占 **84%**
- token 单题均值 **139,493**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| financial | 2 | 2 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 129 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 **金融库（financial）** 上的锚定过程： - **L1 实体路**：`LOGICAL.Transaction` → `PHYSICAL. | Benesov | Beroun | Blansko | Breclav | raw/0929_1339_129_dlr.ndjson |
| 137 | FAIL | ❌ 错误 | ## 结论 **43 个账户**（Branch location 1 = `district_id = 1`）持有状态为 running contract 的贷 | 47 | raw/0929_1340_137_dlr.ndjson |
| 145 | FAIL | ❌ 错误 | ## 结论 **Analysis path (three-level anchoring)** - **L1 语义召回** (`dlr_semantic_que | 14 | 14 | 14 | 14 | raw/0929_1341_145_dlr.ndjson |