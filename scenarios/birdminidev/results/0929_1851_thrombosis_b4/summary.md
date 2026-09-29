# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1851_thrombosis_b4` ｜ 题数 5 ｜ 生成 2026-09-29T10:52:13.958Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **433,512**（input 67,633 + cache_read 347,392 + output 18,487） ｜ cache_read 占 **80%**
- token 单题均值 **86,702**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1185 | FAIL | ❌ 错误 | **解析过程** 1. **L3 口径**：`dlr_search_sop` 返回 `match=none`，本题无题级节，按 L1 + L2 自解。 2. * | 0.06030150753768844 | raw/0929_1851_1185_dlr.ndjson |