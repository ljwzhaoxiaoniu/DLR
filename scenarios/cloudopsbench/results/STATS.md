# 实测结果综合统计（cob stats）

场景 `cloudopsbench` ｜ 轮次 2 ｜ 覆盖 8/754 ｜ 生成 2026-10-12T06:50:17.188Z

**结果分（去重取最新 · 每题取最新一轮）：JRA 8/8（100.0%）｜ CA 8 ｜ FA 8**

## 逐轮 · 结果与流程（本轮记录 · 按次数）

| 轮次 | 题数 | JRA | CA | FA | MC | EOC | ECR | EE | steps |
|---|---|---|---|---|---|---|---|---|---|
| 1012_1415_inorder4-v3 | 4 | 4 | 4 | 4 | 1 | 0.9375 | 1 | 0.3691 | 16 |
| 1012_1447_inorder4-v3b2 | 4 | 4 | 4 | 4 | 0.9375 | 0.8542 | 0.75 | 0.3604 | 11.25 |

## 跑题覆盖度（跑过多少题）

> 覆盖度 = 跑过的题（去重）÷ `process-label` 全量题数——只看跑没跑过，与对错无关。

| 家族 | 全量 | 已跑 | 剩余 | 覆盖 |
|---|---|---|---|---|
| boutique/admission | 58 | 1 | 57 | 1.7% |
| boutique/codedefect | 98 | 1 | 97 | 1.0% |
| boutique/infrastructure | 40 | 1 | 39 | 2.5% |
| boutique/performance | 29 | 1 | 28 | 3.4% |
| boutique/runtime | 45 | 0 | 45 | 0.0% |
| boutique/scheduling | 164 | 1 | 163 | 0.6% |
| boutique/service | 54 | 1 | 53 | 1.9% |
| boutique/startup | 62 | 1 | 61 | 1.6% |
| train-ticket/performance | 47 | 0 | 47 | 0.0% |
| train-ticket/runtime | 96 | 0 | 96 | 0.0% |
| train-ticket/service | 37 | 0 | 37 | 0.0% |
| train-ticket/startup | 24 | 1 | 23 | 4.2% |
| **合计** | **754** | **8** | **746** | **1.1%** |

## 汇总（去重 · 取最新）

**结果分**：JRA 8/8（100.0%）｜ CA 8 ｜ FA 8 ｜ 证据链全闭 7/8

**流程分（均值）**

| MC | EOC | ECR | EE | steps | RAR | invalid |
|---|---|---|---|---|---|---|
| 0.9688 | 0.8958 | 0.875 | 0.3647 | 13.625 | 0 | 0 |

> 口径：结果/流程分全部来自上游 scorer（同口径可与基准发表数字对表）；去重取最新（同题多轮取最新一轮）；逐题明细在各轮 `questions.csv` 与 `../DETAIL.md`。
