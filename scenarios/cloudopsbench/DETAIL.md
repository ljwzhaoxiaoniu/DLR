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

**结果分（最新一轮每题）**

| 指标 | 值 |
|---|---|
| JRA（联合命中） | 8 / 8（100.0%） |
| CA（组件命中） | 8 / 8（100.0%） |
| FA（故障型命中） | 8 / 8（100.0%） |
| ECR（证据链全闭） | 8 / 8（100.0%） |

**流程分（均值）**

| MC | EOC | ECR | EE | steps | RAR | invalid |
|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 0.3536 | 14.75 | 0 | 0 |

## 分家族索引

| 家族 | 全量 | 已跑 | JRA | 链全闭 | 明细 |
|---|---|---|---|---|---|
| boutique/admission | 58 | 1 | 1 | 1 | [boutique-admission.md](DETAIL/boutique-admission.md) |
| boutique/codedefect | 98 | 1 | 1 | 1 | [boutique-codedefect.md](DETAIL/boutique-codedefect.md) |
| boutique/infrastructure | 40 | 1 | 1 | 1 | [boutique-infrastructure.md](DETAIL/boutique-infrastructure.md) |
| boutique/performance | 29 | 1 | 1 | 1 | [boutique-performance.md](DETAIL/boutique-performance.md) |
| boutique/scheduling | 164 | 1 | 1 | 1 | [boutique-scheduling.md](DETAIL/boutique-scheduling.md) |
| boutique/service | 54 | 1 | 1 | 1 | [boutique-service.md](DETAIL/boutique-service.md) |
| boutique/startup | 62 | 1 | 1 | 1 | [boutique-startup.md](DETAIL/boutique-startup.md) |
| train-ticket/startup | 24 | 1 | 1 | 1 | [trainticket-startup.md](DETAIL/trainticket-startup.md) |

## 定性观察

<!-- stats:keep-below（定性观察手写区——重建时原样保留） -->
> **2026-10-12 · 轮次 1012_1415_inorder4-v3（v3 首轮 · 4/4 全对 · ECR 全闭 · 零重试）**：① scheduling/1 实测 **pod→node 跳走通**——pods 宽表 `NODE <none>` → pod 事件 `0/4 nodes are available` → 集群配置/节点（`Unschedulable: true` / `NoSchedule`）→ `node_cordon_mismatch` 命中真值（v3 结构 + L2 kid7 口径的首个实战背书）。② admission/1 EOC 0.75——v2 时代同题为 0.25，链序明显改善、仍余轻微乱序，留观。③ EE 0.24–0.6（同该基准常态）；steps 14–18、与 v2 同题基本持平（±2）。④ 墙钟 44–69 s/题（flash 模型 + 本地工具），记作速度基线。

> **2026-10-12 · 轮次 1012_1447_inorder4-v3b2（v3 批二 · 4/4 全对）**：① **startup/1 判型翻案 ✓**——Rank1 = `image_registry_dns_failure`（v2 时代误判 `incorrect_image_reference`，v3 下纠正）。② **tt-startup/1 链没闭（ECR 0.0 · MC 0.75）**：M3「配置确认面」（`GetAppYAML` 确认 secret 引用上下文）整步未走——agent 以「pod 详情 + 错误日志 + secrets 清单」即收口，省了收口的后半。③ **EOC 两批累计 3/8 非满**（admission 0.75 · infrastructure 0.667 · tt-startup 0.75），三例机理同源：**链头序**（先扫对象层/先猜具体根因，`containerd` 抢在通用转换证据前）× **链尾漏走**（配置确认步缺失或不按序）。链序纪律 L1/L2 结构上不承载 → 按 10-12 口径**开 L3 门**。④ service/1 EOC 1.0 链闭；EE 0.33–0.4；steps 9–16。

> **2026-10-12 · 轮次 1012_1458_l3-verify3（L3 开门验收 · 3/3 全满）**：开 L3 门（`sop.md` 2 节：Partial Unreachability / Availability Disruption；走链纪律 = 先立症状 → 对象层 → 机制事件 → 配置确认收口，节点侧通用先于具体；工具面 2→3 + AGENTS 三路召回）后三例复跑对表——**admission EOC 0.75→1.0 · infrastructure EOC 0.667→1.0 · tt-startup MC/ECR/EOC 0.75/0.0/0.75→1.0/1.0/1.0**；三题 JRA 保持全对、链全闭。机理证据：首轮三路召回（sop exact 命中）、`GetAppYAML` 收口归位、节点类先读通用转换证据。**至此 8/8 题 MC/EOC/ECR 全满**。其余 7 个措辞模板无 miss 证据、按门槛未写节（出 miss 再补——迭代闭环见 modeling-plan §8-2）。









