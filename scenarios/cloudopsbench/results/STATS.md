# 实测结果综合统计（cob stats）

场景 `cloudopsbench` ｜ 轮次 4 ｜ 覆盖 10/754 ｜ 生成 2026-10-11T13:49:40.827Z

**结果分（去重取最新 · 每题取最新一轮）：JRA 9/10（90.0%）｜ CA 10 ｜ FA 9**

## 逐轮 · 结果与流程（本轮记录 · 按次数）

| 轮次 | 题数 | JRA | CA | FA | MC | EOC | ECR | EE | steps |
|---|---|---|---|---|---|---|---|---|---|
| 1010_1545_boutique-runtime-1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 9 |
| 1010_1618_boutique-runtime-1-v2m | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 9 |
| 1010_1658_inorder5 | 5 | 5 | 5 | 5 | 1 | 0.8 | 1 | 0.3786 | 18.2 |
| 1011_2147_inorder4 | 4 | 3 | 4 | 3 | 1 | 1 | 1 | 0.3551 | 12.5 |

## 跑题覆盖度（跑过多少题）

> 覆盖度 = 跑过的题（去重）÷ `process-label` 全量题数——只看跑没跑过，与对错无关。

| 家族 | 全量 | 已跑 | 剩余 | 覆盖 |
|---|---|---|---|---|
| boutique/admission | 58 | 1 | 57 | 1.7% |
| boutique/codedefect | 98 | 1 | 97 | 1.0% |
| boutique/infrastructure | 40 | 1 | 39 | 2.5% |
| boutique/performance | 29 | 1 | 28 | 3.4% |
| boutique/runtime | 45 | 1 | 44 | 2.2% |
| boutique/scheduling | 164 | 1 | 163 | 0.6% |
| boutique/service | 54 | 1 | 53 | 1.9% |
| boutique/startup | 62 | 1 | 61 | 1.6% |
| train-ticket/performance | 47 | 0 | 47 | 0.0% |
| train-ticket/runtime | 96 | 0 | 96 | 0.0% |
| train-ticket/service | 37 | 1 | 36 | 2.7% |
| train-ticket/startup | 24 | 1 | 23 | 4.2% |
| **合计** | **754** | **10** | **744** | **1.3%** |

## 汇总（去重 · 取最新）

**结果分**：JRA 9/10（90.0%）｜ CA 10 ｜ FA 9 ｜ 证据链全闭 10/10

**流程分（均值）**

| MC | EOC | ECR | EE | steps | RAR | invalid |
|---|---|---|---|---|---|---|
| 1 | 0.9 | 1 | 0.3688 | 15 | 0 | 0 |

> 口径：结果/流程分全部来自上游 scorer（同口径可与基准发表数字对表）；去重取最新（同题多轮取最新一轮）；逐题明细在各轮 `questions.csv` 与 `../DETAIL.md`。
