# 评测明细 — TSM 语义层 · cloudopsbench

> **说明**：question 驱动——T1 基准诊断工具实查数据 / T2 `state_model_query` 模型切片（症状 → 入口链 + 观测槽）/ T3 `dlr_search_consensus` 读法；沿链走、第一个「观测 ≠ 期望」的槽即断点。
> **评定**：全部以上游 scorer 输出为准（无人工翻盘口径）——结果分 CA/FA/JRA（Rank 1 对 `process-label` 标签逐字）＋ 流程分 MC/EOC/ECR/EE（对里程碑证据链）。
> **数据来源**：`results/<轮次>/`（questions.csv / traces/）；本文件由 `eval/stats.mjs` 自动重建；逐题校验表与证据正文按家族拆分，见文末索引。
> **列义**：CA 组件 ｜ FA 故障型 ｜ JRA 联合命中 ｜ MC 里程碑覆盖 ｜ EOC 证据顺序 ｜ ECR 证据链闭合 ｜ EE 证据效率 ｜ steps 诊断步数 ｜ RAR 重复调用率 ｜ inv 无效动作。

## 跑题覆盖度（跑过多少题）

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

**结果分（最新一轮每题）**

| 指标 | 值 |
|---|---|
| JRA（联合命中） | 9 / 10（90.0%） |
| CA（组件命中） | 10 / 10（100.0%） |
| FA（故障型命中） | 9 / 10（90.0%） |
| ECR（证据链全闭） | 10 / 10（100.0%） |

**流程分（均值）**

| MC | EOC | ECR | EE | steps | RAR | invalid |
|---|---|---|---|---|---|---|
| 1 | 0.9 | 1 | 0.3688 | 15 | 0 | 0 |

## 分家族索引

| 家族 | 全量 | 已跑 | JRA | 链全闭 | 明细 |
|---|---|---|---|---|---|
| boutique/admission | 58 | 1 | 1 | 1 | [boutique-admission.md](DETAIL/boutique-admission.md) |
| boutique/codedefect | 98 | 1 | 1 | 1 | [boutique-codedefect.md](DETAIL/boutique-codedefect.md) |
| boutique/infrastructure | 40 | 1 | 1 | 1 | [boutique-infrastructure.md](DETAIL/boutique-infrastructure.md) |
| boutique/performance | 29 | 1 | 1 | 1 | [boutique-performance.md](DETAIL/boutique-performance.md) |
| boutique/runtime | 45 | 1 | 1 | 1 | [boutique-runtime.md](DETAIL/boutique-runtime.md) |
| boutique/scheduling | 164 | 1 | 1 | 1 | [boutique-scheduling.md](DETAIL/boutique-scheduling.md) |
| boutique/service | 54 | 1 | 1 | 1 | [boutique-service.md](DETAIL/boutique-service.md) |
| boutique/startup | 62 | 1 | 0 | 1 | [boutique-startup.md](DETAIL/boutique-startup.md) |
| train-ticket/service | 37 | 1 | 1 | 1 | [trainticket-service.md](DETAIL/trainticket-service.md) |
| train-ticket/startup | 24 | 1 | 1 | 1 | [trainticket-startup.md](DETAIL/trainticket-startup.md) |

## 定性观察

<!-- stats:keep-below（定性观察手写区——重建时原样保留） -->
> （跑批后按案例补写：值得注意的错法 / 链闭而答案错 / 流程分特低特高 的题。）





