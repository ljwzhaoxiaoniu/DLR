# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1437_qids_1134_1135` ｜ 题数 2 ｜ 生成 2026-09-28T13:44:47.260Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 1 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **4** ｜ 工具调用均值 **6** ｜ 工具错误均值 **0**
- token 合计 **106,902**（input 26,345 + cache_read 77,952 + output 2,605） ｜ cache_read 占 **73%**
- token 单题均值 **53,451**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 1 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1135 | FAIL | 🔁 翻盘 | ## 结论 按 L3 SOP 中完整复述本题的节（"Please provide top four football players' IDs who are  | 132235 | 132236 | 66213 | 66214 | raw/0925_1437_1135_dlr.ndjson |