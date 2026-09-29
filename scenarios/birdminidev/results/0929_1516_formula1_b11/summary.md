# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1516_formula1_b11` ｜ 题数 5 ｜ 生成 2026-09-29T07:20:21.955Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **660,189**（input 48,653 + cache_read 557,184 + output 54,352） ｜ cache_read 占 **84%**
- token 单题均值 **132,038**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 972 | UNCERTAIN | ⚠️ 待仲裁 | **三级锚定结果** - **L1（数据源级）**：`LOGICAL.Driver`（PE `PHYSICAL.Driver` → `drivers`，锚键 ` | 14 | COU | 14 | COU | raw/0929_1516_972_dlr.ndjson |