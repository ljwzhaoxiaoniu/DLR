# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1435_qids_1133_1134_1135_1136_1139` ｜ 题数 5 ｜ 生成 2026-09-28T13:44:44.843Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **11** ｜ 工具错误均值 **0**
- token 合计 **611,295**（input 92,385 + cache_read 483,072 + output 35,838） ｜ cache_read 占 **79%**
- token 单题均值 **122,259**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1135 | FAIL | 🔁 翻盘 | ## 检索与执行过程 **L2 领域共识（evidence 路）**：`dlr_search_consensus` 精确命中本题（qid 1135，原题即本题， | 132235 | 132236 | 66213 | 66214 | raw/0925_1435_1135_dlr.ndjson |