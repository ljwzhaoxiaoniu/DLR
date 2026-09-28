# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2137_qids_1113_1114` ｜ 题数 2 ｜ 生成 2026-09-28T13:53:06.915Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 1 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **182,864**（input 24,718 + cache_read 149,248 + output 8,898） ｜ cache_read 占 **82%**
- token 单题均值 **91,432**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 1 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1114 | FAIL | ❌ 错误 | ## 推理过程 **三级锚定** - **L3（SOP）**：`dlr_search_sop` 返回 `match=none` → 本题无题级口径节，按 L1  | 75.39393939393939 | raw/0928_2137_1114_dlr.ndjson |