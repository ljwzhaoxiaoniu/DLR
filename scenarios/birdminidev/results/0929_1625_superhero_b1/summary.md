# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1625_superhero_b1` ｜ 题数 5 ｜ 生成 2026-09-29T08:28:40.240Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **254,007**（input 30,300 + cache_read 210,560 + output 13,147） ｜ cache_read 占 **83%**
- token 单题均值 **50,801**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| superhero | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 726 | UNCERTAIN | ⚠️ 待仲裁 | 三级锚定完成：L3 无本题节（`match=none`）；L1 锚定到 `superhero` 库的 `LOGICAL.Superhero`（`height_c | Surtur | 30480 | 1 | Ymir | raw/0929_1626_726_dlr.ndjson |