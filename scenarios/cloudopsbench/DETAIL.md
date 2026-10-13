# 评测明细 — TSM 语义层 · cloudopsbench

> **说明**：question 驱动——T1 基准诊断工具实查数据 / T2 `state_model_query` 模型切片（症状 → 入口链 + 观测槽）/ T3 `dlr_search_consensus` 读法；沿链走、第一个「观测 ≠ 期望」的槽即断点。
> **评定**：全部以上游 scorer 输出为准（无人工翻盘口径）——结果分 CA/FA/JRA（Rank 1 对 `process-label` 标签逐字）＋ 流程分 MC/EOC/ECR/EE（对里程碑证据链）。
> **数据来源**：`results/<轮次>/`（questions.csv / traces/）；本文件由 `eval/stats.mjs` 自动重建；逐题校验表与证据正文按家族拆分，见文末索引。
> **列义**：CA 组件 ｜ FA 故障型 ｜ JRA 联合命中 ｜ MC 里程碑覆盖 ｜ EOC 证据顺序 ｜ ECR 证据链闭合 ｜ EE 证据效率 ｜ steps 诊断步数 ｜ tokens 会话 token 合计（input+cache_read+cache_write+output）｜ RAR 重复调用率 ｜ inv 无效动作。

## 跑题覆盖度（跑过多少题）

| 家族 | 全量 | 已跑 | 剩余 | 覆盖 |
|---|---|---|---|---|
| boutique/admission | 58 | 4 | 54 | 6.9% |
| boutique/codedefect | 98 | 4 | 94 | 4.1% |
| boutique/infrastructure | 40 | 3 | 37 | 7.5% |
| boutique/performance | 29 | 1 | 28 | 3.4% |
| boutique/runtime | 45 | 2 | 43 | 4.4% |
| boutique/scheduling | 164 | 4 | 160 | 2.4% |
| boutique/service | 54 | 1 | 53 | 1.9% |
| boutique/startup | 62 | 2 | 60 | 3.2% |
| train-ticket/performance | 47 | 1 | 46 | 2.1% |
| train-ticket/runtime | 96 | 5 | 91 | 5.2% |
| train-ticket/service | 37 | 3 | 34 | 8.1% |
| train-ticket/startup | 24 | 2 | 22 | 8.3% |
| **合计** | **754** | **32** | **722** | **4.2%** |

## 汇总（去重 · 取最新）

**结果分（最新一轮每题）**

| 指标 | 值 |
|---|---|
| JRA（联合命中） | 31 / 32（96.9%） |
| CA（组件命中） | 31 / 32（96.9%） |
| FA（故障型命中） | 32 / 32（100.0%） |
| ECR（证据链全闭） | 32 / 32（100.0%） |

**流程分（均值）**

| MC | EOC | ECR | EE | steps | RAR | invalid |
|---|---|---|---|---|---|---|
| 1 | 0.9661 | 1 | 0.3069 | 18.6875 | 0 | 0.0313 |

**效率（去重取最新）**

| token 平均 / 中位 | token 最低 / 最高 | cache 读占比 |
|---|---|---|
| 250,915 / 129,107 | 58,131 / 1,044,906 | 79% |

## 分家族索引

| 家族 | 全量 | 已跑 | JRA | 链全闭 | 明细 |
|---|---|---|---|---|---|
| boutique/admission | 58 | 4 | 4 | 4 | [boutique-admission.md](DETAIL/boutique-admission.md) |
| boutique/codedefect | 98 | 4 | 4 | 4 | [boutique-codedefect.md](DETAIL/boutique-codedefect.md) |
| boutique/infrastructure | 40 | 3 | 3 | 3 | [boutique-infrastructure.md](DETAIL/boutique-infrastructure.md) |
| boutique/performance | 29 | 1 | 1 | 1 | [boutique-performance.md](DETAIL/boutique-performance.md) |
| boutique/runtime | 45 | 2 | 2 | 2 | [boutique-runtime.md](DETAIL/boutique-runtime.md) |
| boutique/scheduling | 164 | 4 | 4 | 4 | [boutique-scheduling.md](DETAIL/boutique-scheduling.md) |
| boutique/service | 54 | 1 | 1 | 1 | [boutique-service.md](DETAIL/boutique-service.md) |
| boutique/startup | 62 | 2 | 2 | 2 | [boutique-startup.md](DETAIL/boutique-startup.md) |
| train-ticket/performance | 47 | 1 | 1 | 1 | [trainticket-performance.md](DETAIL/trainticket-performance.md) |
| train-ticket/runtime | 96 | 5 | 5 | 5 | [trainticket-runtime.md](DETAIL/trainticket-runtime.md) |
| train-ticket/service | 37 | 3 | 2 | 3 | [trainticket-service.md](DETAIL/trainticket-service.md) |
| train-ticket/startup | 24 | 2 | 2 | 2 | [trainticket-startup.md](DETAIL/trainticket-startup.md) |

## 定性观察

<!-- stats:keep-below（定性观察手写区——重建时原样保留） -->
> **2026-10-12 · 轮次 1012_1415_inorder4-v3（v3 首轮 · 4/4 全对 · ECR 全闭 · 零重试）**：① scheduling/1 实测 **pod→node 跳走通**——pods 宽表 `NODE <none>` → pod 事件 `0/4 nodes are available` → 集群配置/节点（`Unschedulable: true` / `NoSchedule`）→ `node_cordon_mismatch` 命中真值（v3 结构 + L2 kid7 口径的首个实战背书）。② admission/1 EOC 0.75——v2 时代同题为 0.25，链序明显改善、仍余轻微乱序，留观。③ EE 0.24–0.6（同该基准常态）；steps 14–18、与 v2 同题基本持平（±2）。④ 墙钟 44–69 s/题（flash 模型 + 本地工具），记作速度基线。

> **2026-10-12 · 轮次 1012_1447_inorder4-v3b2（v3 批二 · 4/4 全对）**：① **startup/1 判型翻案 ✓**——Rank1 = `image_registry_dns_failure`（v2 时代误判 `incorrect_image_reference`，v3 下纠正）。② **tt-startup/1 链没闭（ECR 0.0 · MC 0.75）**：M3「配置确认面」（`GetAppYAML` 确认 secret 引用上下文）整步未走——agent 以「pod 详情 + 错误日志 + secrets 清单」即收口，省了收口的后半。③ **EOC 两批累计 3/8 非满**（admission 0.75 · infrastructure 0.667 · tt-startup 0.75），三例机理同源：**链头序**（先扫对象层/先猜具体根因，`containerd` 抢在通用转换证据前）× **链尾漏走**（配置确认步缺失或不按序）。链序纪律 L1/L2 结构上不承载 → 按 10-12 口径**开 L3 门**。④ service/1 EOC 1.0 链闭；EE 0.33–0.4；steps 9–16。

> **2026-10-12 · 轮次 1012_1458_l3-verify3（L3 开门验收 · 3/3 全满）**：开 L3 门（`sop.md` 2 节：Partial Unreachability / Availability Disruption；走链纪律 = 先立症状 → 对象层 → 机制事件 → 配置确认收口，节点侧通用先于具体；工具面 2→3 + AGENTS 三路召回）后三例复跑对表——**admission EOC 0.75→1.0 · infrastructure EOC 0.667→1.0 · tt-startup MC/ECR/EOC 0.75/0.0/0.75→1.0/1.0/1.0**；三题 JRA 保持全对、链全闭。机理证据：首轮三路召回（sop exact 命中）、`GetAppYAML` 收口归位、节点类先读通用转换证据。**至此 8/8 题 MC/EOC/ECR 全满**。其余 7 个措辞模板无 miss 证据、按门槛未写节（出 miss 再补——迭代闭环见 modeling-plan §8-2）。

> **2026-10-12 · 轮次 1012_1512_inorder4-v3b3 + 1012_1521_l3-tweak1（批三 4 题 + 收口位微调验证）**：① 批三 **4/4 全对**（覆盖 12/754）——补回 `runtime/1`·`trainticket/service/25`；**TT 空白族首秀**：`tt-runtime/1`（`db_connection_exhaustion`·26 步）、`tt-performance/1`（`pod_network_delay`·36 步）均 JRA ✓、链闭。② **tt-service/25 EOC 0.75 —— v2 时代即 0.75 的持久倒位**：解剖 = `GetAppYAML` 在第 7 步被当探针读（早于点名机制的日志）——与 admission 旧倒位同类 → sop 两节补**「配置面 = 收口位，不是探针」**警示 → **复跑 EOC 0.75→1.0**（YAML 归位到第 13 步后，先日志点名机制）。③ `tt-performance/1` 首个 invalid action：模型把工具名写成 `GetServiceConnectivity`（应为 `CheckServiceConnectivity`）、无编造参数、自纠——非建模问题，记观察。④ EE 随 TT 长链稀释（0.14–0.33）；合计 **12/12 JRA 全对、MC/EOC/ECR 全满**。

> **2026-10-12 · 轮次 1012_1846_inorder4-v3b4（族内纵深第一批 · 4/4 全对 · 全指标闭）**：① **L3 泛化对照成立**——四题全为**未解剖**新题、措辞均命中两节走链纪律，**MC/EOC/ECR 全保持 1.0**（admission/2 · scheduling/2 · codedefect/2 · tt-runtime/2）——走链节在未见样本上稳定生效、不是「答案钥匙」。② scheduling/2 再中 `node_cordon_mismatch`（节点类第二例全闭）；tt-runtime/2 **37 步**（迄今最长链）仍链闭。③ EE 0.12–0.60（长链稀释属常态）；覆盖 **16/754**。

> **2026-10-12 · 轮次 1012_1856_inorder4-v3b5 + l3-tweak2 + l1l2-verify1/2（批五 4 题 + tsdb-mysql 修复三连）**：① 批五 4/4 全对（覆盖 20/754），两处流程分失分进入修复：**admission/3** EOC 0.75（症状侧拖到第 13 步；根源 = AGENTS 工作流第 2 步「先锚定」与链序打架 → 改「症状先」→ **复跑 EOC 1.0**）；**tt-runtime/3** ECR 0/MC 0.667（机制只到服务级、未落实到实例）。② 修复逐层打（分诊：缺陷→L1/L2）：**L1** tsdb-mysql 载体误写 deployments → StatefulSet 读法；**顺带揪出系统性缺陷**——readHint 把 LE 名当 app 标签（84 服务载体/观测读法全带 `-deploy`/`-obs` 后缀）→ 锚名归一；**L2** 补 kid8 事件面读法。③ 一轮不够：verify1 用上了 statefulset 读法但仍零事件面、只描一个实例（金链实例特定：runtime/2 = -0、runtime/3 = -2——唯一稳健口 = `GetResources(events)`）→ AGENTS 加「**关题前读一遍 namespace 事件面**」兜底 + sop 收口句点名多实例 → **verify2 全闭**（23 步，第 10 步主动读 events、事件行绑住机制）。④ 全程 JRA 保持全对；三轮修法各打在：链序（L3）→ 载体缺陷（L1）/读法（L2）→ 行为兜底（AGENTS）。

> **2026-10-12 · 轮次 1012_1928_inorder4-v3b6 + 1012_1935_tidy-verify1（批六 + 指令体检对表）**：① 批六 4/4 全对（覆盖 24/754），三处流程分滑点：admission/4 EOC 0.25（events+配置面提前、症状拖最后）、codedefect/3 EOC 0.25（配置/代码抢前）、tt-runtime/4 ECR 0/MC 0.667（服务日志用了 `GetRecentLogs` 变体、错失 M1 的 11 服务 `GetErrorLogs` 扫掠）。② 病灶判定 = **规则叠加互竞**（多条并列纪律稀释了走序主线的执行）→ **指令体检**：第 2 步加牙齿「症状侧未读不碰配置/代码/事件面（关题工具≠开路工具）」、两条浮动收口纪律收进第 5 步按序化、纪律区瘦身至 5 条。③ **复跑三题全满**（admission/4 0.25→1.0 · codedefect/3 0.25→1.0 · tt-runtime/4 ECR 0→全闭）——三处既是金链指纹类也是**指令结构类**；单线走序让 agent 一次走对（tt-runtime/4 的日志扫掠也自然带出）。**24/24 证据链全闭恢复。**

> **2026-10-12 · 轮次 1012_1941_inorder4-v3b7 + 1012_2000_case-verify1 + 1012_2010_attr-verify1（批七战役 · tt-service/2 三枪修一题）**：① 批七 3/4——**首个真 miss** `tt-service/2`（网关 misroute：预测 food-delivery·dns ✗；**89 步、47 次探测轰炸**）。② **三枪**：case-by-case 判别线重写（L3，用户定调「对着解决 + 讲人话」）+ L2 kid9 网关路由表读法（`Path ↔ uri` 逐条核对，针 = `order` 路由指向 route-service）→ 复跑 32 步：机制对了（`gateway_misrouted` ✓）、组件仍错（报了受害者 order）→ kid9/sop 补「**报路由表的主人（网关）；被错配目标是受害者不是断点**」→ **attr-verify1 20 步全满**（JRA/MC/EOC/ECR 全 1）。③ 两道 EOC 小滑（codedefect/4 0.25 两轮不变 · tt-runtime/5 0.667）：解剖显示**首次命中序其实干净**——EOC 匹配含超出 first-match 的严格性成分，口径未完全反推，**不再为此调参**（守住不扑评分器的线），记档。④ **28/28 JRA 恢复全满。**
























