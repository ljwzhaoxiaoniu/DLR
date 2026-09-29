# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2248_toxicology_b4` ｜ 题数 5 ｜ 生成 2026-09-29T14:52:07.024Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **536,870**（input 48,217 + cache_read 465,024 + output 23,629） ｜ cache_read 占 **87%**
- token 单题均值 **107,374**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| toxicology | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 228 | FAIL | ❌ 错误 | ## 结论 **三级锚定结果** | 级别 | 工具 | 命中 | |------|------|------| | L1 | `dlr_semantic_qu | 45.4545 | raw/0929_2248_228_dlr.ndjson |