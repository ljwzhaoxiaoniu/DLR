# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1440_qids_1144_1148` ｜ 题数 2 ｜ 生成 2026-09-28T13:44:50.793Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 1 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **175,279**（input 30,908 + cache_read 137,984 + output 6,387） ｜ cache_read 占 **79%**
- token 单题均值 **87,640**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 1 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1144 | FAIL | 🔁 翻盘 | **分析过程** 1. **L3（sop 技能）** — 命中完整复述本题的节：*"Please state the finishing rate and cu | 98022 | 13 | 13 | raw/0925_1440_1144_dlr.ndjson |