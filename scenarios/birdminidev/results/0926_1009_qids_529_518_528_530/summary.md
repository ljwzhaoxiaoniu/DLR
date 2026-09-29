# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_1009_qids_529_518_528_530` ｜ 题数 4 ｜ 生成 2026-09-29T03:13:45.191Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 0 ｜ UNCERTAIN 3 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 3**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **12** ｜ 工具调用均值 **18** ｜ 工具错误均值 **8**
- token 合计 **1,224,942**（input 108,526 + cache_read 1,102,336 + output 14,080） ｜ cache_read 占 **90%**
- token 单题均值 **306,236**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 1 | 0 | 3 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 518 | UNCERTAIN | ⚠️ 待仲裁 |  | legacy | Balance | legacy | Crusade | raw/0926_1009_518_dlr.ndjson |
| 529 | UNCERTAIN | 🔁 翻盘 | The result matches the SOP's Expected values exactly. ## Answer The question is  | Tenth Edition | Fourth Edition | Fifth Dawn | Fifth Edition | raw/0926_1009_529_dlr.ndjson |
| 530 | UNCERTAIN | ⚠️ 待仲裁 | ## Result: Unable to complete the query — required tool surface is not mounted I | 1997 | Blinking Spirit | NO | 1997 | raw/0926_1009_530_dlr.ndjson |