# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2255_toxicology_b6` ｜ 题数 5 ｜ 生成 2026-09-29T14:59:04.456Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **245,192**（input 38,137 + cache_read 196,352 + output 10,703） ｜ cache_read 占 **80%**
- token 单题均值 **49,038**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| toxicology | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 245 | FAIL | ❌ 错误 | 三级锚定完成：L3 无命中（`match=none`）；L1 语义召回定位到 `toxicology` 库的 `Atom`（element 列）与 `Bond` | 1 | raw/0929_2255_245_dlr.ndjson |