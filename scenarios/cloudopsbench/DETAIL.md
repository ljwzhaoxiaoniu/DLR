# 评测明细 — TSM 语义层 · cloudopsbench

> **说明**：question 驱动——T1 基准诊断工具实查数据 / T2 `state_model_query` 模型切片（症状 → 入口链 + 观测槽）/ T3 `dlr_search_consensus` 读法；沿链走、第一个「观测 ≠ 期望」的槽即断点。
> **评定**：全部以上游 scorer 输出为准（无人工翻盘口径）——结果分 CA/FA/JRA（Rank 1 对 `process-label` 标签逐字）＋ 流程分 MC/EOC/ECR/EE（对里程碑证据链）。
> **数据来源**：`results/<轮次>/`（questions.csv / traces/）；本文件由 `eval/stats.mjs` 自动重建；逐题校验表与证据正文按家族拆分，见文末索引。
> **列义**：CA 组件 ｜ FA 故障型 ｜ JRA 联合命中 ｜ MC 里程碑覆盖 ｜ EOC 证据顺序 ｜ ECR 证据链闭合 ｜ EE 证据效率 ｜ steps 诊断步数 ｜ RAR 重复调用率 ｜ inv 无效动作。

## 跑题覆盖度（跑过多少题）

| 家族 | 全量 | 已跑 | 剩余 | 覆盖 |
|---|---|---|---|---|
| boutique/admission | 58 | 0 | 58 | 0.0% |
| boutique/codedefect | 98 | 0 | 98 | 0.0% |
| boutique/infrastructure | 40 | 0 | 40 | 0.0% |
| boutique/performance | 29 | 0 | 29 | 0.0% |
| boutique/runtime | 45 | 1 | 44 | 2.2% |
| boutique/scheduling | 164 | 0 | 164 | 0.0% |
| boutique/service | 54 | 0 | 54 | 0.0% |
| boutique/startup | 62 | 0 | 62 | 0.0% |
| train-ticket/performance | 47 | 0 | 47 | 0.0% |
| train-ticket/runtime | 96 | 0 | 96 | 0.0% |
| train-ticket/service | 37 | 0 | 37 | 0.0% |
| train-ticket/startup | 24 | 0 | 24 | 0.0% |
| **合计** | **754** | **1** | **753** | **0.1%** |

## 汇总（去重 · 取最新）

**结果分（最新一轮每题）**

| 指标 | 值 |
|---|---|
| JRA（联合命中） | 1 / 1（100.0%） |
| CA（组件命中） | 1 / 1（100.0%） |
| FA（故障型命中） | 1 / 1（100.0%） |
| ECR（证据链全闭） | 1 / 1（100.0%） |

**流程分（均值）**

| MC | EOC | ECR | EE | steps | RAR | invalid |
|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 0.375 | 9 | 0 | 0 |

## 分家族索引

| 家族 | 全量 | 已跑 | JRA | 链全闭 | 明细 |
|---|---|---|---|---|---|
| boutique/runtime | 45 | 1 | 1 | 1 | [boutique-runtime.md](DETAIL/boutique-runtime.md) |

## 定性观察

<!-- stats:keep-below（定性观察手写区——重建时原样保留） -->
> （跑批后按案例补写：值得注意的错法 / 链闭而答案错 / 流程分特低特高 的题。）

