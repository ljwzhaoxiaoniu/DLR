# 实测结果综合统计（tsm stats）

场景 `birdminidev` ｜ 轮次 1 ｜ 判定 3 次（去重 3 题）｜ 生成 2026-09-24T09:25:11.114Z

**PASS 2 ｜ UNCERTAIN 1 ｜ FAIL 0 ｜ GOLD_ERR 0**

## 逐轮

| 轮次 | 题数 | PASS | UNCERTAIN | FAIL | GOLD_ERR | tokens |
|---|---|---|---|---|---|---|
| 0924_1559_qids_1473_1480_1500 | 3 | 2 | 1 | 0 | 0 | 123,072 |

## 分库进度（去重题数 / 数据集题数）

| 库 | 已跑 | 数据集 |
|---|---|---|
| california_schools | 0 | 30 |
| card_games | 0 | 52 |
| codebase_community | 0 | 49 |
| debit_card_specializing | 3 | 30 |
| european_football_2 | 0 | 51 |
| financial | 0 | 32 |
| formula_1 | 0 | 66 |
| student_club | 0 | 48 |
| superhero | 0 | 52 |
| thrombosis_prediction | 0 | 50 |
| toxicology | 0 | 40 |

## 效率（跨全部判定）

- 均值 **4.7 步** / **8.0 工具调用** ｜ 工具错误均值 1.00
- token 合计 **123,072** ｜ 每题均值 **41,024** ｜ cache_read 占比 **78%**

> 口径：分布按判定次数（同题重跑重复计入）；进度按去重题数。逐题明细在各轮 `questions.csv`。
