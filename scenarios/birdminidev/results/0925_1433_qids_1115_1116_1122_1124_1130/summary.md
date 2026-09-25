# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1433_qids_1115_1116_1122_1124_1130` ｜ 题数 5 ｜ 生成 2026-09-25T09:37:55.700Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **413,663**（input 95,583 + cache_read 289,408 + output 28,672） ｜ cache_read 占 **70%**
- token 单题均值 **82,733**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1124 | UNCERTAIN | 🔁 翻盘 | ## 解题过程 **三级锚定：** | 级别 | 命中 | |------|------| | L3 (sop) | `european_football_2` | Aaron Cresswell | Aaron Lennon | Aaron Meijers | Aaron Nigue | raw/0925_1433_1124_dlr.ndjson |