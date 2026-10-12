# 实测结果综合统计（cob stats）

场景 `cloudopsbench` ｜ 轮次 1 ｜ 覆盖 4/754 ｜ 生成 2026-10-12T06:19:37.957Z

**结果分（去重取最新 · 每题取最新一轮）：JRA 4/4（100.0%）｜ CA 4 ｜ FA 4**

## 逐轮 · 结果与流程（本轮记录 · 按次数）

| 轮次 | 题数 | JRA | CA | FA | MC | EOC | ECR | EE | steps |
|---|---|---|---|---|---|---|---|---|---|
| 1012_1415_inorder4-v3 | 4 | 4 | 4 | 4 | 1 | 0.9375 | 1 | 0.3691 | 16 |

## 跑题覆盖度（跑过多少题）

> 覆盖度 = 跑过的题（去重）÷ `process-label` 全量题数——只看跑没跑过，与对错无关。

| 家族 | 全量 | 已跑 | 剩余 | 覆盖 |
|---|---|---|---|---|
| boutique/admission | 58 | 1 | 57 | 1.7% |
| boutique/codedefect | 98 | 1 | 97 | 1.0% |
| boutique/infrastructure | 40 | 0 | 40 | 0.0% |
| boutique/performance | 29 | 1 | 28 | 3.4% |
| boutique/runtime | 45 | 0 | 45 | 0.0% |
| boutique/scheduling | 164 | 1 | 163 | 0.6% |
| boutique/service | 54 | 0 | 54 | 0.0% |
| boutique/startup | 62 | 0 | 62 | 0.0% |
| train-ticket/performance | 47 | 0 | 47 | 0.0% |
| train-ticket/runtime | 96 | 0 | 96 | 0.0% |
| train-ticket/service | 37 | 0 | 37 | 0.0% |
| train-ticket/startup | 24 | 0 | 24 | 0.0% |
| **合计** | **754** | **4** | **750** | **0.5%** |

## 汇总（去重 · 取最新）

**结果分**：JRA 4/4（100.0%）｜ CA 4 ｜ FA 4 ｜ 证据链全闭 4/4

**流程分（均值）**

| MC | EOC | ECR | EE | steps | RAR | invalid |
|---|---|---|---|---|---|---|
| 1 | 0.9375 | 1 | 0.3691 | 16 | 0 | 0 |

> 口径：结果/流程分全部来自上游 scorer（同口径可与基准发表数字对表）；去重取最新（同题多轮取最新一轮）；逐题明细在各轮 `questions.csv` 与 `../DETAIL.md`。
