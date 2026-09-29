# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1331_financial_b1` ｜ 题数 5 ｜ 生成 2026-09-29T05:35:03.412Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 2 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **16** ｜ 工具错误均值 **0**
- token 合计 **676,286**（input 72,847 + cache_read 566,144 + output 37,295） ｜ cache_read 占 **84%**
- token 单题均值 **135,257**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| financial | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 94 | FAIL | ❌ 错误 | ## 结论 **三级锚定结果：** - **L1（实体路）**：`dlr_semantic_query(db=financial)` → `LOGICAL.Cl | 6 | 4431 | raw/0929_1331_94_dlr.ndjson |
| 95 | FAIL | ❌ 错误 | ## 结论 **账户号：1372** ### 推理链（三级锚定） | 级 | 命中 | 采信要点 | |---|---|---| | L3 `dlr_searc | 2836 | raw/0929_1332_95_dlr.ndjson |