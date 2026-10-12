# 实测结果综合统计（cob stats）

场景 `cloudopsbench` ｜ 轮次 0 ｜ 覆盖 0/754 ｜ 生成 2026-10-12T03:10:29.767Z

**结果分（去重取最新 · 每题取最新一轮）：JRA 0/0（—）｜ CA 0 ｜ FA 0**

## 逐轮 · 结果与流程（本轮记录 · 按次数）

| 轮次 | 题数 | JRA | CA | FA | MC | EOC | ECR | EE | steps |
|---|---|---|---|---|---|---|---|---|---|

## 跑题覆盖度（跑过多少题）

> 覆盖度 = 跑过的题（去重）÷ `process-label` 全量题数——只看跑没跑过，与对错无关。

| 家族 | 全量 | 已跑 | 剩余 | 覆盖 |
|---|---|---|---|---|
| boutique/admission | 58 | 0 | 58 | 0.0% |
| boutique/codedefect | 98 | 0 | 98 | 0.0% |
| boutique/infrastructure | 40 | 0 | 40 | 0.0% |
| boutique/performance | 29 | 0 | 29 | 0.0% |
| boutique/runtime | 45 | 0 | 45 | 0.0% |
| boutique/scheduling | 164 | 0 | 164 | 0.0% |
| boutique/service | 54 | 0 | 54 | 0.0% |
| boutique/startup | 62 | 0 | 62 | 0.0% |
| train-ticket/performance | 47 | 0 | 47 | 0.0% |
| train-ticket/runtime | 96 | 0 | 96 | 0.0% |
| train-ticket/service | 37 | 0 | 37 | 0.0% |
| train-ticket/startup | 24 | 0 | 24 | 0.0% |
| **合计** | **754** | **0** | **754** | **0.0%** |

## 汇总（去重 · 取最新）

**结果分**：JRA 0/0（—）｜ CA 0 ｜ FA 0 ｜ 证据链全闭 0/0

**流程分（均值）**

| MC | EOC | ECR | EE | steps | RAR | invalid |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |

> 口径：结果/流程分全部来自上游 scorer（同口径可与基准发表数字对表）；去重取最新（同题多轮取最新一轮）；逐题明细在各轮 `questions.csv` 与 `../DETAIL.md`。
