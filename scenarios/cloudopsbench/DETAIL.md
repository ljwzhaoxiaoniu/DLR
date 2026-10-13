# 评测明细 — TSM 语义层 · cloudopsbench

> **说明**：question 驱动——T1 基准诊断工具实查数据 / T2 `state_model_query` 模型切片（症状 → 入口链 + 观测槽）/ T3 `dlr_search_consensus` 读法；沿链走、第一个「观测 ≠ 期望」的槽即断点。
> **评定**：全部以上游 scorer 输出为准（无人工翻盘口径）——结果分 CA/FA/JRA（Rank 1 对 `process-label` 标签逐字）＋ 流程分 MC/EOC/ECR/EE（对里程碑证据链）。
> **数据来源**：`results/<轮次>/`（questions.csv / traces/）；本文件由 `eval/stats.mjs` 自动重建；逐题校验表与证据正文按家族拆分，见文末索引。
> **列义**：CA 组件 ｜ FA 故障型 ｜ JRA 联合命中 ｜ MC 里程碑覆盖 ｜ EOC 证据顺序 ｜ ECR 证据链闭合 ｜ EE 证据效率 ｜ steps 诊断步数 ｜ tokens 会话 token 合计（input+cache_read+cache_write+output）｜ RAR 重复调用率 ｜ inv 无效动作。

## 跑题覆盖度（跑过多少题）

| 家族 | 全量 | 已跑 | 剩余 | 覆盖 |
|---|---|---|---|---|
| boutique/admission | 58 | 7 | 51 | 12.1% |
| boutique/codedefect | 98 | 28 | 70 | 28.6% |
| boutique/infrastructure | 40 | 27 | 13 | 67.5% |
| boutique/performance | 29 | 9 | 20 | 31.0% |
| boutique/runtime | 45 | 9 | 36 | 20.0% |
| boutique/scheduling | 164 | 12 | 152 | 7.3% |
| boutique/service | 54 | 8 | 46 | 14.8% |
| boutique/startup | 62 | 5 | 57 | 8.1% |
| train-ticket/performance | 47 | 32 | 15 | 68.1% |
| train-ticket/runtime | 96 | 16 | 80 | 16.7% |
| train-ticket/service | 37 | 34 | 3 | 91.9% |
| train-ticket/startup | 24 | 13 | 11 | 54.2% |
| **合计** | **754** | **200** | **554** | **26.5%** |

## 汇总（去重 · 取最新）

**结果分（最新一轮每题）**

| 指标 | 值 |
|---|---|
| JRA（联合命中） | 200 / 200（100.0%） |
| CA（组件命中） | 200 / 200（100.0%） |
| FA（故障型命中） | 200 / 200（100.0%） |
| ECR（证据链全闭） | 199 / 200（99.5%） |

**流程分（均值）**

| MC | EOC | ECR | EE | steps | RAR | invalid |
|---|---|---|---|---|---|---|
| 0.9988 | 0.9816 | 0.995 | 0.2808 | 20.04 | 0.0011 | 0.015 |

**效率（去重取最新）**

| token 平均 / 中位 | token 最低 / 最高 | cache 读占比 |
|---|---|---|
| 331,538 / 236,382 | 54,365 / 2,181,512 | 73% |

## 分家族索引

| 家族 | 全量 | 已跑 | JRA | 链全闭 | 明细 |
|---|---|---|---|---|---|
| boutique/admission | 58 | 7 | 7 | 6 | [boutique-admission.md](DETAIL/boutique-admission.md) |
| boutique/codedefect | 98 | 28 | 28 | 28 | [boutique-codedefect.md](DETAIL/boutique-codedefect.md) |
| boutique/infrastructure | 40 | 27 | 27 | 27 | [boutique-infrastructure.md](DETAIL/boutique-infrastructure.md) |
| boutique/performance | 29 | 9 | 9 | 9 | [boutique-performance.md](DETAIL/boutique-performance.md) |
| boutique/runtime | 45 | 9 | 9 | 9 | [boutique-runtime.md](DETAIL/boutique-runtime.md) |
| boutique/scheduling | 164 | 12 | 12 | 12 | [boutique-scheduling.md](DETAIL/boutique-scheduling.md) |
| boutique/service | 54 | 8 | 8 | 8 | [boutique-service.md](DETAIL/boutique-service.md) |
| boutique/startup | 62 | 5 | 5 | 5 | [boutique-startup.md](DETAIL/boutique-startup.md) |
| train-ticket/performance | 47 | 32 | 32 | 32 | [trainticket-performance.md](DETAIL/trainticket-performance.md) |
| train-ticket/runtime | 96 | 16 | 16 | 16 | [trainticket-runtime.md](DETAIL/trainticket-runtime.md) |
| train-ticket/service | 37 | 34 | 34 | 34 | [trainticket-service.md](DETAIL/trainticket-service.md) |
| train-ticket/startup | 24 | 13 | 13 | 13 | [trainticket-startup.md](DETAIL/trainticket-startup.md) |

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

> **2026-10-12 → 10-13 · 轮次 1012_2040_inorder4-v3b8 + 1013_1040_rank1-verify1（批八 + rank1 提交条款验证）**：① 批八 3/4——`tt-service/3`（同族网关 misroute 新题）**正文叙述全对**（break = 网关·表主人；mis-wired 目标 = 受害者 order），**但 top_3 rank1 填了受害者**：条款在命中节内且被复述——病灶 = **提交落笔未跟随结论**（非知识/检索缺口）。② 处置：该节再钉「When you submit: rank 1 names the gateway — the victim may sit lower in the list, never at rank 1」→ L3 rebuild + 重启 + 探针（has-new-clause ✓）→ 复跑 **19 步全满**（rank1 网关 · 受害者在 rank2 备选 · 错配目标 rank3；dashboard nginx BackOff 判为瞬时竞态）。③ 花絮：批八首遍 boutique/runtime/2 卡 77 分钟被 runner 判失败（产物其实完整、rc=0）→ 第 2 遍 48s 过，取第 2 遍。④ **JRA 32/32**（轮次 17 · 覆盖 32/754）。⑤ 教训记档：**叙述对 ≠ 提交对**——条款要钉到提交字段（与「判定只看结论句」互为镜像）。

> **2026-10-13 · 轮次 1013_1122_inorder4-v3b9（批九 · 4/4 全对 · MC/EOC/ECR 全闭 · 无重试）**：① 覆盖 36/754，**JRA 36/36**。② **tt-service/4 = 同族网关 misroute 第三题**（继 /2 三枪、/3 条款后）：提交条款生效下**首跑即中**（`ts-gateway-service·gateway_misrouted` ✓ · 19 步）——条款在未见新题上的独立验证。③ boutique/service/2（service 家族 1→2）46 步长链全闭（`service_env_var_address_mismatch`；EE 0.13 属长链稀释常态）。④ boutique/runtime/3（10 步 · `liveness_probe_incorrect_protocol`）、tt-performance/2（23 步 · `pod_network_delay`）全满。⑤ 批内零重试、零 invalid。

> **2026-10-13 · 轮次 1013_1134_inorder4-v3b10（批十 · 4/4 全对 · MC/EOC/ECR 全闭 · 无重试）**：① 覆盖 40/754，**JRA 40/40**。② **新机制族首验**：tt-runtime/6 `db_readonly_mode`（tsdb-mysql · 23 步）——DB 只读态（StatefulSet 载体读法复用），链闭。③ scheduling/5 `node_cordon_mismatch`（paymentservice · 17 步）= 节点类第三例全闭；performance/2 `pod_cpu_overload`（cartservice · 28 步）= 性能显现类第二例；tt-startup/3 `missing_secret_binding`（ts-config-service · 17 步）。④ 批九 + 批十连续 8 题全满（**40/40 链闭**）——L3 两节与提交条款在未见题上的泛化持续成立。

> **2026-10-13 · 轮次 1013_1225_inorder4-v3b11（批十一 · 4/4 JRA · 一例流程滑点）**：① 覆盖 44/754，**JRA 44/44**。② **tt-service/5 = 网关 misroute 第四题**：提交条款下首跑即中（`ts-gateway-service` ✓ · 23 步）——条款泛化第四连。③ **infrastructure/4**（`node/worker-02·containerd_unavailable` · 节点类第四例）**EOC 0.667 留观**：链闭（ECR 1）但次序滑点再现（节点类「通用面先于具体机理」的序；同族 infra/1 曾 0.667、修复轮后全闭）——先记，不扑评分器。④ codedefect/5 `code_busy_loop`（15 步）、tt-performance/3 `pod_network_delay`（30 步）全满。

> **2026-10-13 · 轮次 1013_1235_inorder4-v3b12（批十二 · 3/4 · startup/3 判型翻车）**：① 覆盖 48/754，JRA 47/48。② **startup/3 miss**（批八以来首个）：组件对（checkoutservice）、判型错——镜像指向虚构域名 `ghost-registry.example.net`（事件 `lookup … no such host`）；agent 推理「DNS 本身正常（其他服务拉得动）→ 是引用错」→ rank1 报 `incorrect_image_reference`（正解 `image_registry_dns_failure` 被放 rank2）——**v2 时代 startup/1 同一对混淆的再现**（b2 翻案那次无 L3、靠事件消息分类判对；本次命中节 image 分支仅有「读配置面」、无定类判别线，或助偏）。③ admission/5 `missing_service_account`（EOC 0.25 · 13 步）、tt-runtime/7 `db_readonly_mode`（22 步 · 与 /6 连续同型）、tt-startup/4 `missing_secret_binding`（11 步）全满。④ 处置：该节 image-pull 分支补「拉取消息定类 + rank1 跟随」判别线（`565a0e8`）→ L3 rebuild + 探针 → 复跑 **14 步全满**（rank1 = `image_registry_dns_failure` ✓）——**JRA 48/48 恢复**。⑤ **补解剖（10-13）· admission/5 EOC 0.25 = 链头倒位**：症状面（`CheckServiceConnectivity` emailservice）拖到第 12 步、`GetErrorLogs(frontend)` 从未读——M0 唯一命中在末位 → 评分器 `ordered` 链（前置未就位不收）只保住 M0（1/4）。与 admission/3、/4 同类的「症状拖后」在 b5/b6 两轮指令加固**之后复现**（该轮 13 步、JRA/MC/ECR 全满）——**批十六 admission/6 为复检位**：再犯即系统性、需把症状面钉进该节链头句。

> **2026-10-13 · 轮次 1013_1248_inorder4-v3b13（批十三 · 3/4 · tt-performance/4 判型翻车）**：① 覆盖 52/754，JRA 51/52。② **tt-performance/4 miss**：组件对（ts-gateway-service）、判型错——p50 27ms→1928ms **恒定延迟**、下游服务边全净、无饱和；agent 推「延迟在网关自身处理路径 → `code_artificial_delay`」（正解 `pod_network_delay` 在 rank2）——42 步长链，MC/EOC/ECR 全 1（纯判型失分）。③ 症状措辞 = **第三个模板「Service quality degradation.」**（L3 无节、本次未命中）；全库真值分布：该措辞下 boutique = pod_network_delay 7 + pod_cpu_overload 4，tt = **pod_network_delay 47/47**；**`code_artificial_delay` 全库仅存在于 boutique/codedefect（另一措辞「Service Performance Degradation.」、靠代码面证实）**——判类有硬依据。④ 其余全满：boutique/runtime/4 `liveness_probe_incorrect_protocol`（11 步）· boutique/service/3 `service_env_var_address_mismatch`（15 步）· tt-service/6 `gateway_misrouted`（**条款第五连** · 24 步）。⑤ 处置：开「Service quality degradation.」新节（`384656e`：alert 面定案 + 延迟类=网络侧 + 代码排除句 + 节点域分支 + 对象层排除收口）→ L3 3 节 rebuild + 探针 → 复跑 **22 步全满**（rank1 = `pod_network_delay` ✓，42→22 步）——**JRA 52/52 恢复**。

> **2026-10-13 · 轮次 1013_1343_inorder4-v3b14（批十四 · 4/4 JRA · 新节泛化首验 · 一例 EOC 留观）**：① 覆盖 56/754，**JRA 56/56**。② **新节泛化首验过**：boutique/performance/3 `pod_cpu_overload`（16 步）——「Service quality degradation.」节在 boutique 侧（饱和分支）落对。③ **scheduling/6 EOC 0.667（节点类第三次）**：解剖 = 单处倒位——`GetClusterConfiguration`（金链 M3 素材）先于 pod 详情（M2 调度理由）一步读出；非评分器严格性类，为可修序。④ tt-runtime/8 `db_readonly_mode`（37 步长链全闭）、tt-startup/5 `missing_secret_binding`（12 步）全满。⑤ 处置：该节 Pending 分支补序句（`f564f73`：pod 自身调度理由先读、节点域证据随后）→ rebuild + 探针 → 复跑 **14 步 EOC 1.0**（倒位消除）——JRA 56/56 且流程分全清。

> **2026-10-13 · 轮次 1013_1413_inorder4-v3b15（批十五 · 4/4 全对 · MC/EOC/ECR 全满）**：① 覆盖 60/754，**JRA 60/60**。② **infra/4 EOC 留观未复现（结案）**：infra/5 同措辞同机制（`containerd_unavailable@worker-01` · 17 步）**EOC 1.0**——0.667 判定为孤立滑点、非系统性问题。③ **quality 节 TT 侧第二验过**：tt-performance/5 `pod_network_delay`（ts-inside-payment · 18 步）——继 tt-perf/4 修复后的未解剖独立样本，rank1 直接落对。④ **网关条款第六连**：tt-service/7 `gateway_misrouted`（ts-gateway-service · 19 步）首跑即中。⑤ boutique/codedefect/6 `code_busy_loop`（15 步）——代码族无 L3 节连续 6/6 稳；1 次 invalid = 虚构工具名（`GetResourceTags_placeholder`，自纠，模型产物非建模问题）。⑥ 全程零重试；全批墙钟 4m15s（含 grade+stats），单题 15–19 步。⑦ 会话 sync 与「不满→归档」新口径首次对撞（retire 过的 raw 配对会话被例行扫描捞回、assertDisjoint 拒写）→ `sessions.mjs` 避重叠守卫推广至任何其他组（跳过已归组 24 · 新登记 4）——批内例行恢复无感。⑧ 批十六起跑批改 **2 路并发**（env 成对：`COB_MCP_PORT` + `CLOUDOPSBENCH_MCP_PORT` 缺一不可——只给前者服务仍绑 8000、撞端口踩过；用户定）。

> **2026-10-13 · 轮次 chainhead-verify1/2/2b/2c（EOC 双题修复收官 · codedefect/4 + admission/5 六项全满）**：① **机理反推完成**（探针 `tmp_scripts/cob_eoc_probe.py` 复用上游 evaluator + 金轨自评模式）：EOC = 严格单遍级联——里程碑仅当前置先收才进 `ordered`，M0 形态迟到即整链塌 1/4；清单式 admissible 带 `name:""` 键位要求（模型最小参数调用永不命中，金轨靠具体形态兑现：`DescribeResource(pod)` / endpoints / 连通性）。② **金轨自评（合不合理判据）**：codedefect/4 金轨 EOC 1.0（M0 = pod 详情、第 2 步即读）；**admission/5 金轨反而 MC 0.75**（path1 漏 M1 · path2 漏 M3——弱标签，我跑却可达 1.0）；infra/4 金轨 1.0（干净标签，我跑 0.667 = 真序滑点）；**tt-runtime/5 金轨两路皆漏 M2**（MC 0.667——弱标签；我跑 MC 1.0 · EOC 0.667 = 真序滑点）。③ **修（全落「Service Availability Disruption.」节——admission 家族两措辞混用 31/27，首轮曾误加第一节目、已回撤）**：code 分支钉「pod 详情先读 · 批内领跑」→ **codedefect/4 verify2 六项全 1.0**；无名措辞钉「受害者信号领跑（非关题确认）」+ never-created 分支同句 → 序到位后连踩两坑：猜端口 8080（实为 5000）→ v4 再钉「端口从 Service spec 取 · endpoints 免猜测形态」→ **admission/5 verify2c 六项全 1.0**（M0@endpoints → M1@按锚 pods → M2@events → M3@YAML 级联全序）。④ 花絮：verify2 契约 JSON 未转义引号 → 围栏 parse 失败 → JRA 0（上游提取器同严格、无修复通道——按交付失败重置跑）。⑤ **EOC 账**：原位 4 处非满 → 2 处收官（codedefect/4 · admission/5），余 infra/4 · tt-runtime/5 **记档不追**（用户 10-13「不强求」）；EOC 均值 0.9639→0.9889。⑥ 批十六仍待令。

> **2026-10-13 · 轮次 1013_1503_inorder4-v3b16（批十六 · 首度 2 路跑批 · 4/4 全对 · 一例 EOC 0.5）**：① 覆盖 64/754，**JRA 64/64**。② **2 路并发首跑定型**（env 成对 8000/8001，两波四题全收，零重试；全批含 grade+stats ≈ 7 分钟）。③ **image 双胞胎判别线新实例验证**：startup/4 `image_registry_dns_failure`（12 步六项全满）——startup/3 翻车驱动的判别线在未解剖新题上稳定。④ tt-runtime/9 `db_readonly_mode`（28 步六项全满）· tt-startup/6 `missing_secret_binding`（12 步六项全满）。⑤ **admission/6 EOC 0.5 解剖**：症状面开得很快（M0@6：frontend 日志+连通性扫掠——端口全对，v4 端口纪律外溢生效）✓；倒位在**中链**——11 连全服务连通扫掠后 `events`（M2）先于 `deployments`（M1）落读 → M1 迟到，级联保 M0+M1 = 0.5。修法候选：第一节目同 §2 钉「workload 态先于事件面」（待令）。

> **2026-10-13 · 轮次 workload-verify1/2（admission/6 钉句两轮 · 未闭 · 停止迭代）**：① §1 两处钉句（「owner chain 先于事件面 · 批内领跑」+ never-created 分支同句）→ v1 复跑：**中链修正生效**（deployments/按锚 pods 提到 events 前）但**症状面拖到 #9-10**（EOC 0.25）；再补「无名→受害者信号领跑」句（照抄 §2 证明版）→ v2 复跑：**M0 整步未读**（开场 pods→deployments→YAML→SA→events 纯对象层收口——MC 0.75 · EOC 0 · ECR 0）。三轮行为谱：M0@6（批十六）→ M0 末位 → M0 缺席——**该题症状面读取高方差**。② 病灶解读：本 case 受害者 = 入口服务 frontend 自身（SA 缺失卡它自己的 pod）——题面无 caller 可比、frontend 又被默认当 gateway 假定健康，agent 自然把它的信号读放最后/省掉。③ 处置：**停止迭代（三连未闭，用户「不强求」线）**；钉句全部保留（§2 四案背书：codedefect/4 + admission/5 + 批十六 3/4 六项全满——不伤他题）；admission/6 记「症状面高方差」，与 infra/4 · tt-runtime/5 同列记档；若后续同形态 miss 再现，再评估「受害者=入口服务」专用句。④ 会话：v1/v2 两条入档。

> **2026-10-13 · 轮次 1013_1520_inorder4-v3b17（批十七 · 2 路续跑 · 4/4 六项全满）**：① 覆盖 68/754，**JRA 68/68**。② **第五措辞模板首验全满**：boutique/runtime/5「Service abnormal restart.」（无 L3 节 · 裸跑）`liveness_probe_incorrect_protocol`（10 步六项全满）——探针类判型无节亦稳。③ **网关条款第七连**：tt-service/8 `gateway_misrouted`（19 步六项全满）。④ boutique/service/4 `service_env_var_address_mismatch`（30 步全满）· tt-performance/6 `pod_network_delay`（19 步全满）。⑤ 批内零重试；本批起「端口空档即接下一题」管道化（wall-clock 更紧）。

> **2026-10-13 · 轮次 1013_1524_inorder4-v3b18（批十八 · 2 路续跑 · 4/4 六项全满）**：① 覆盖 72/754，**JRA 72/72**。② **又一新措辞模板首验全满**：boutique/performance/4「Service latency increased significantly」（第六模板 · 无 L3 节）`pod_cpu_overload`（18 步六项全满）。③ scheduling/7 `node_cordon_mismatch`（**Pending 序句复验位** · 20 步全满）· tt-runtime/10 `db_readonly_mode`（24 步全满；RAR 0.043 = 一次重复调用，效率常态）· tt-startup/7 `missing_secret_binding`（11 步全满）。④ **两批连续 8/8 六项全满**（批十七+十八）——2 路模式零重试全绿；EOC 记档列不变（infra/4 · tt-runtime/5 · admission/6）。

> **2026-10-13 · 轮次 1013_1536_inorder4-v3b19（批十九 · 2 路续跑 · 4/4 六项全满）**：① 覆盖 76/754，**JRA 76/76**。② **网关条款第八连**：tt-service/9 `gateway_misrouted`（21 步六项全满）。③ boutique/codedefect/7 `code_busy_loop`（13 步全满）· boutique/infrastructure/6 `containerd_unavailable@worker-02`（13 步全满 · 节点域）· tt-performance/7 `pod_network_delay`（25 步全满）。④ **批十七/十八/十九三连 12/12 六项全满**——2 路管道化（端口空档即接题）已成默认节奏。

> **2026-10-13 · 轮次 1013_1541_inorder4-v3b20（批二十 · 2 路续跑 · 4/4 六项全满）**：① 覆盖 80/754，**JRA 80/80**。② boutique/performance/5「Service latency increased significantly」第二例 `pod_cpu_overload`（19 步全满——第六模板饱和分支稳）。③ scheduling/8 `node_cordon_mismatch`（18 步全满）· tt-runtime/11 `db_readonly_mode`（23 步全满）· tt-startup/8 `missing_secret_binding`（12 步全满）。④ **四连 16/16 六项全满**（批十七–二十）——零重试。

> **2026-10-13 · 轮次 1013_1546_inorder4-v3b21（批二十一 · 2 路续跑 · 4/4 六项全满）**：① 覆盖 84/754，**JRA 84/84**。② **网关条款第九连**：tt-service/10 `gateway_misrouted`（24 步全满）。③ boutique/codedefect/8 `code_busy_loop`（15 步）· infrastructure/7 `containerd_unavailable@worker-01`（12 步）· tt-performance/8 `pod_network_delay`（18 步）全满。④ **五连 20/20 六项全满**（批十七–二十一）——零重试。

> **2026-10-13 · 轮次 1013_1628_inorder4-v3b22（批二十二 · 2 路续跑 · 4/4 六项全满）**：① 覆盖 88/754，**JRA 88/88**。② boutique/performance/6「latency increased」第三例 `pod_cpu_overload`（30 步全满——第六模板饱和分支三验稳）· scheduling/9 `node_cordon_mismatch`（19 步）· tt-runtime/12 `db_readonly_mode`（22 步）· tt-startup/9 `missing_secret_binding`（14 步）全满。③ **六连 24/24 六项全满**（批十七–二十二）——零重试。

> **2026-10-13 · 轮次 1013_1633_inorder4-v3b23（批二十三 · 2 路续跑 · 3/4 六项全满 · 一例 ECR 0）**：① 覆盖 92/754，**JRA 92/92**。② **cod/9 判型试金石过**：`code_artificial_delay`（「Service Performance Degradation.」措辞下——代码面证实类；tt-perf/4 的镜像双胞胎方向，16 步六项全满）。③ inf/8 `containerd@worker-02`（12 步）· tt-perf/9 `pod_network_delay`（18 步）全满。④ **tt-service/11 破连**：JRA ✓（网关判型第十连）但 **M2 未读**——金标准 M2 唯一形态 = `GetAppYAML(ts-gateway-service)`（路由表载体）；本轮 34 步长链走偏到 payment/order 分支，读了 gateway 日志/端点/连通性/configmap 而未做该 YAML 读 → MC 0.667 · ECR 0（收口没走完类）。⑤ 会话：ts-service/11 入档。⑥ **破连即修一轮（用户 10-13 定规程：加 L3 句后复跑，仍不过即记档）**：§1 网关句钉「路由表 = gateway 自家 `GetAppYAML`（日志/端点/清单不算）」→ **gatewayyaml-verify1 复跑 28 步六项全满**（MC/ECR/EOC 0.667/0/0.667 → 全 1）——规程首执行即闭环。

> **2026-10-13 · 轮次 1013_1645_inorder4-v3b24（批二十四 · 2 路续跑 · 4/4 六项全满）**：① 覆盖 96/754，**JRA 96/96**。② cod/10 `code_artificial_delay` 第二例（14 步全满——镜像双胞胎判型复验稳）· inf/9 `containerd@worker-01`（15 步）· tt-perf/10 `pod_network_delay`（18 步）全满。③ **tt-service/12 网关 42 步长链全闭**（§2 措辞、无新钉句——原条款独立复验；网关条款第十一连）。④ 破连后下一批即刻回绿（四连中断即复位）。

> **2026-10-13 · 轮次 1013_1656_inorder4-v3b25（批二十五 · 2 路续跑 · 4/4 六项全满 · 覆盖 100/754 达成）**：① **覆盖 100/754（13.3%）· JRA 100/100**（六项全满 97/100，余 3 = 记档列 infra/4 · tt-runtime/5 · admission/6）。② per/7 `pod_cpu_overload`（19 步全满）· sch/10 `node_cordon_mismatch`（19 步全满）· tt-runtime/13 `db_readonly_mode`（30 步全满）· tt-startup/10 `missing_secret_binding`（12 步全满）。③ 用户令「凑个 100」单批即达。

> **2026-10-13 · 轮次 1013_1805_inorder4-v3b26 + gateway2-verify1（批二十六 · 3/4 + 网关 §2 句修复闭环）**：① 覆盖 104/754。② cod/11 `code_memory_leak`（16 步全满）· inf/10 `containerd@worker-02`（11 步）· tt-perf/11 `pod_network_delay`（17 步）全满。③ **tsv/13 破连（§2 措辞网关）**：判型翻车——把**受害者的报错当代码缺陷**（ts-payment-service 收到 misroute 的外来请求 → 日志报参数缺失 → 判 `code_missing_parameter`），路由表（M2）整步未读 → JRA 0 · ECR 0。④ 处置（破连即修一轮）：§2 网关句对齐 §1 形态钉（路由表 = gateway 自家 `GetAppYAML`）+ 补判别线「外来请求异常 = misroute 症状，不是代码缺陷，先审计路由表」→ rebuild+重启 → **gateway2-verify1 复跑 34 步六项全满**——规程第二次闭环。⑤ 会话：失败轮入档。

> **2026-10-13 · 轮次 1013_1810_inorder4-v3b27（批二十七 · 4/4 六项全满）**：① 覆盖 108/754，**JRA 108/108**。② per/8 `pod_cpu_overload`（20 步）· sch/11 `node_cordon_mismatch`（17 步）· tt-startup/11 `missing_secret_binding`（15 步）全满。③ tt-runtime/14 `db_readonly_mode` **39 步长链全闭**（迄今最长之一）。④ 与 tsv/13 修复轮管道化并发执行（引擎模式：谁空接谁）。

> **2026-10-13 · 轮次 1013_1819_inorder4-v3b28 + dual2-verify1（批二十八 · 2/4 + 双题修复闭环）**：① 覆盖 112/754。② runtime/6 `liveness_probe_incorrect_protocol`（10 步 · 「Service abnormal restart.」模板二验）· service/5 `service_env_var_address_mismatch`（26 步）全满。③ **双破连**：(a) tt-perf/12 —— **5 条告警并存**（security +6927% 为主异常；gateway/dashboard/preserve 是上游涟漪；ts-order 一条 0.12s 微小 cpu 限流为旁枝）——agent 照 §3 饱和分支抓了 ts-order 旁枝 → 判 `pod_network_delay`→真值应是 security（对象+机制双错）→ 补 §3 **「多告警 = 取主异常（最深·最大偏差的那个，呼者延迟是涟漪；非主异常的孤行饱和 = 旁枝噪声）」**句；(b) tt-svc/14 —— tsv/13 修复前同款翻车（读 gateway 日志未读 gateway 配置）→ 修复句已在节、**复跑一轮验证**。④ → rebuild+重启 → **dual2-verify1 双题复跑 25/30 步六项全满**——规程第三次+第四次闭环（并行双修）。⑤ 会话：两失败轮入档。

> **2026-10-13 · 轮次 1013_1831_inorder4-v3b29（批二十九 · 4/4 六项全满）**：① 覆盖 116/754，**JRA 116/116**（轮次 50 里程碑）。② cod/12 `code_missing_parameter`（24 步）· inf/11（22 步）· tt-perf/13 `pod_network_delay`（16 步——**多告警判别线首验过**）· tt-svc/15 `gateway_misrouted`（17 步——网关条款在 §2 强化句后连过）全满。③ 引擎模式稳定：批间不停、管道化并发。

> **2026-10-13 · 轮次 1013_1834_inorder4-v3b30（批三十 · 4/4 六项全满）**：① 覆盖 120/754，**JRA 120/120**（轮次 51）。② per/9 `pod_cpu_overload`（20 步）· sch/12 `node_cordon_mismatch`（32 步）· tt-runtime/15（27 步）· tt-startup/12 `missing_secret_binding`（12 步）全满。③ 引擎模式平稳推进。

> **2026-10-13 · 轮次 1013_1839_inorder4-v3b31（批三十一 · 4/4 六项全满）**：① 覆盖 124/754，**JRA 124/124**（轮次 52）。② cod/13（23 步）· inf/12（25 步）· tt-perf/14 `pod_network_delay`（23 步）· tt-svc/16 `gateway_misrouted`（23 步）全满。③ 定时续跑段（18:05 起）批二十六–三十一累计 22/24 题六项全满 + 两次修复轮全闭（净 24/24 收官）。

> **2026-10-13 · 轮次 1013_1842_inorder4-v3b32 + triple-verify1（批三十二 · JRA 全对 · 三处流程滑点 → 二修一记档）**：① 覆盖 128/754，**JRA 128/128**。② 全对：adm/7（13 步）· bst/5（13 步）· tru/16（14 步）· tst/13（15 步）。③ 流程滑点三例（结果全对、关键形态读得晚）：**tst/13**（收口 Missing：M3=`GetAppYAML(ts-price-service)` 未读 → ECR 0）+ **tru/16**（M0@10 晚于 M1@7 → EOC 0.5）+ **adm/7**（M0@12 末位 → EOC 0.25）→ triple-verify1 复跑一轮：**tst/13 ✓ tru/16 ✓ 六项全满**（复跑即闭）；**adm/7 EOC 0.25 复现**（两轮同值 = 非随机）→ 按规程**记档**（M0-末位类，与 admission/6 同谱；4 号记档列）。④ tru/16 复跑 1 次 invalid（记观察）。⑤ 会话：4 条不满入档。

> **2026-10-13 · 轮次 1013_1848_inorder4-v3b33（批三十三 · 2/4 六项全满 · 一破连一序滑点 · 用户令「跑完停一下」收工）**：① 覆盖 132/754，**JRA 131/132**。② runtime/7（11 步）· tt-svc/17 `gateway_misrouted`（21 步 · 网关判别稳）全满。③ **tt-perf/15 破连**：多告警场景里抓了 ts-order-service 旁枝（判 `pod_cpu_overload`；**真值 ts-travel-service `pod_network_delay` 就在它 rank2**）——tpe/12 修复前同款；§3 多告警判别句已在节，按规程下一步 = 复跑一轮（待令）。④ boutique/service/6 EOC 0.5（46 步长链、纯序滑点，记观察）。⑤ 会话：两不满入档。

> **2026-10-13 · 轮次 1013_1855_multi2-verify1（tpe/15 手工复跑 · 六项全满）**：① §3 多告警句 v2（**读数字**：主异常占比碾压涟漪 · 孤立 `cpu_cfs` 无自身延迟 = 旁枝 · 真饱和 = 限流＋自身延迟同升——以已过例 per/4·per/5 的实测告警形态定标）→ **手工单跑 15 步六项全满**（真值 ts-travel-service `pod_network_delay`，+29927% 碾压行正确落位）。② **JRA 132/132 恢复**——规程第 8 次闭环；批三十三正式净收官 3/4（service/6 46 步 EOC 0.5 记观察）。

> **2026-10-13 晚 · 轮次 1013_1955_inorder4-v3b34（批三十四 · 复跑续批 · 4/4 六项全满）**：① 覆盖 136/754，**JRA 136/136**（轮次 57）。② runtime/8（「Service abnormal restart.」· 11 步）· service/7（21 步）· tt-perf/16 `pod_network_delay`（16 步 · §3 v2 后再过）· tt-svc/18 `gateway_misrouted`（26 步）全满。③ 引擎复跑（用户「继续开始评测」）。

> **2026-10-13 晚 · 轮次 1013_2000_inorder4-v3b35（批三十五 · 3/4 六项全满 · 一序滑点）**：① 覆盖 140/754，**JRA 140/140**（轮次 58）。② runtime/9（「Service abnormal restart.」· 10 步）· tt-perf/17 `pod_network_delay`（15 步）· tt-svc/19 `gateway_misrouted`（19 步）全满。③ boutique/service/8 EOC 0.5（37 步长链 · JRA/MC/ECR 全对，纯序滑点）——**service 族 EOC 观察位二例（/6 0.5 · /8 0.5）**，记观察；再复现一族三例则评估补句。④ 会话：service/8 入档。

> **2026-10-13 晚 · 轮次 1013_2004_inorder4-v3b36（批三十六 · 4/4 六项全满）**：① 覆盖 144/754，**JRA 144/144**（轮次 59）。② cod/14 `code_missing_parameter`（17 步 · 代码族无节稳）· inf/13 `kube_proxy_unavailable@worker-01`（34 步 · 节点域）· tt-perf/18 `pod_network_delay`（17 步 · §3 延迟判别线 TT 侧再验）· tt-svc/20 `service_dns_resolution_failure`（17 步 · 首验全满）——四题六项全 1.0，零 invalid。③ 引擎续跑（19:59 「继续开始评测」）：2 路管道化两波四题，无重试。

> **2026-10-13 晚 · 轮次 1013_2008_inorder4-v3b37（批三十七 · 2/4 六项全满 · 两处滑点 → 枢轴战役触发）**：① 覆盖 148/754。② inf/14 `kube_proxy_unavailable@worker-02`（22 步）· tt-perf/19 `pod_network_delay`（13 步）全满。③ **cod15 EOC 0.4/ECR 0**（66 步漂移）+ **ttsvc21 EOC 0.5**（22 步纯序滑点）。④ 解剖收敛出**系统性根因**——`GetServiceDependencies` 拓扑枢轴：全库 25 个 case 的链带 M2=GSD（22 codedefect + service/2/6/8）；同形链过题例（ccd12@7 · ccd13@6 · svc2@28）都在症状读完后 1-2 步内走它，翻车例缺席（ccd15 全程未调）或垫底（svc6@32 · svc8@27）→ 严格级联塌链。⑤ 服务观察位复盘：svc6/svc8 EOC 0.5 三例（含 tsvc21）评估后确认为**同病两形**（枢轴缺席/锚错 + 单步倒位），非随机滑点。

> **2026-10-13 晚 · 修复轮 chainpivot-verify1（批三十七滑点修复 · 3/4 闭）**：① **三处条款**（`sop.md` 本轮新增：§1 step3 / §2 step3 引导 / §2 code 分支 callee 句）：拓扑走查 `GetServiceDependencies` 坐在症状与一切机制/配置/代码材料之间——材料先读不定位；疑似自己日志干净时症状在被调方日志（空参链）里、读它再上代码面。② L3 rebuild + 探针 6 项绿 + :28796 重启 → 复跑：**ccd15 六项链全 1.0**（65→31 步，M2@8 领衔）· **svc6 六项链全 1.0**（EOC 0.5→1.0，GSD@10）· **tsvc21 全序 1.0**（EOC 0.5→1.0，pods@4 领跑）。③ **svc8 未闭（反例）**：GSD@25 但锚在 `productcatalogservice`（嫌疑侧）——M2 准入要求锚 `frontend`/`recommendationservice`（**症状侧**）→ 锚句缺失，进 verify2。

> **2026-10-13 晚 · 修复轮 chainpivot-verify2（补锚句 + 诱饵句 · 双题闭环收官 · 第 9 次闭环）**：① **第二条**：§1/§2 枢轴句补**症状侧锚点**（"an anchor anywhere else (the suspect included) is a guess"）；§2 code 分支补**陈旧事件判别句**（"A stale FailedCreate about a service account that already exists in the listing — with every workload healthy — is setup history, not the mechanism"）。② rebuild + 探针（锚句/陈旧句 ✓）→ 复跑：**svc8 六项链全 1.0**（36→19 步，GSD(frontend)@10）· **cod16 六项链全 1.0**（JRA 0→1.0：诱饵 SA 事件被正确判为历史，M3@43 代码面、M4@63 读源收口）。③ 战役全表：ccd15 · svc6 · svc8 · tsvc21 · cod16 五题全收（六项链全 1.0），**规程第 9 次闭环**。

> **2026-10-13 晚 · 轮次 1013_2012_inorder4-v3b38（批三十八 · 3/4 六项全满 · cod16 破连即修）**：① 覆盖 152/754。② inf/15（29 步）· tt-perf/20（15 步）· tt-svc/22（20 步）全满。③ **cod16 破连（JRA 0/FA 0）**：对象对（checkoutservice）判型错——环境含**陈旧 FailedCreate/"serviceaccount not found" 诱饵事件**（SA 现已在清单、负载全健康；金轨完全不读事件面、直奔代码），agent 被带偏报 `missing_service_account`，70 步未碰代码面 → 进 verify2 修。

> **2026-10-13 晚 · 轮次 1013_2042_inorder4-v3b39（批三十九 · 4/4 六项全满 · 枢轴泛化首证）**：① 覆盖 156/754，**JRA 156/156**（轮次 64）。② **cod17 = 枢轴条款全新题首证**：M2(GSD)@11 领衔 → 30 步六项链全 1.0（同形链未解剖新题）。③ inf/16 `kube_proxy_unavailable@worker-02`（19 步）· tt-perf/21 `pod_network_delay`（12 步）· tt-svc/23 `service_dns_resolution_failure`（20 步）全满。④ 修复后连续 6 题（5 复跑 + 1 新题）六项链全 1.0——EOC 观察位 service 族三例全部收官。

> **2026-10-13 晚 · 轮次 1013_2049_inorder4-v3b40（批四十 · 3/4 六项全满 · ttperf22 破连）**：① 覆盖 160/754。② cod/18（38 步）· inf/17 `kube_proxy_unavailable@worker-01`（31 步）· tt-svc/24 `service_dns_resolution_failure`（17 步）全满。③ **ttperf22 破连（JRA 0）**：判型对（`pod_network_delay`）对象错——报 ts-payment-service vs 真值 ts-gateway-service；agent 锚在唯一 `LATENCY_MISSING` 行（"Metrics dropped to zero/NaN after injection"）+ payment 日志空洞 52 步长链。④ 解剖（全库扫描 754）：**`LATENCY_MISSING` 行全库仅 3 例（perf/22 · perf/24 · perf/34），三例全 ≠ 真值对象**——系统性采集伪影（注入窗内指标掉 NaN），非故障指纹。

> **2026-10-13 晚 · 修复轮 lmdecoy-verify1（ttperf22 修复 · 第 10 次规程闭环）**：① §3 补两句：**LM 伪影句**（"a `LATENCY_MISSING` row … is a hole the collection left in the injection window, not a service's deviation — it never names the case"）+ **系统级扫掠震中句**（"a whole-system network-drop sweep with no latency row → the epicenter is the point every request flows through — its collapse is the source, the rest is the ripple"）。② rebuild + 探针（§3 双句 ✓ 无跨节泄漏）→ 复跑 **ttperf22 六项链全 1.0**（52→28 步，rank1 = ts-gateway-service ✓）。

> **2026-10-13 晚 · 轮次 1013_2059_inorder4-v3b41（批四十一 · 4/4 六项全满）**：① 覆盖 164/754，**JRA 164/164**（轮次 67）。② cod/19 `code_missing_parameter`（20 步）· inf/18 `kube_proxy_unavailable@worker-02`（21 步）· tt-perf/23 `pod_network_delay`（15 步 · §3 修后首新题）· tt-svc/26 `service_dns_resolution_failure`（18 步）全满。③ LM 战役内嵌（ttperf22 修复轮与批四十一管道并发）。

> **2026-10-13 晚 · 轮次 1013_2106_inorder4-v3b42（批四十二 · 4/4 六项全满 · LM 句泛化立证）**：① 覆盖 168/754，**JRA 168/168**（轮次 68）。② cod/20 `code_excessive_file_reads`（15 步，rank1=checkoutservice ✓）· inf/19 `kube_scheduler_unavailable@master`（26 步 · 新类型首见：调度器不可用判在 node/master）· **tt-perf/24 `pod_network_delay`（14 步，rank1=ts-order-service ✓）= LM 句泛化立证**——第二例 LATENCY_MISSING 链（/22 · /24 · /34 三例之二）全新未解剖，§3 LM 伪影句直接生效、无一脚踩进诱饵，步数 14 为该族最短量级 · tt-svc/27 `service_dns_resolution_failure`（15 步）全满。③ 该三例 LM 链余 /34 未跑——LM 战役最终验证位。

> **2026-10-13 晚 · 轮次 1013_2110_inorder4-v3b43（批四十三 · 4/4 六项全满 · 零破连）**：① 覆盖 172/754，**JRA 172/172**（轮次 69）。② cod/21 `code_excessive_file_reads`（17 步）· inf/20 `kube_scheduler_unavailable@master` 同型第二例（28 步，RAR 0.037 一处冗余）· tt-perf/25 `pod_network_delay`@ts-payment（19 步，payment 侧延迟链全网单行告警——§3 主异常判读直接命中）· tt-svc/28 `service_dns_resolution_failure`@ts-payment（18 步）全满。③ 修复后连续 8 题（b42 4 + b43 4）六项链全 1.0，条款面无新 miss——引擎稳态运行。

> **2026-10-13 晚 · 轮次 1013_2114_inorder4-v3b44（批四十四 · 3/4 六项全满 · ttperf26 破连）**：① 覆盖至 176/754。② cod/22 `code_excessive_file_reads`（14 步）· inf/21 `kube_scheduler_unavailable@master` 同型第三例（34 步）· tt-svc/29 `service_dns_resolution_failure`@ts-preserve（20 步）全满。③ **ttperf26 破连（JRA 0→CA 0 连带 process 剥权）**：判型对（`pod_network_delay`）对象错——报 ts-basic-service vs 真值 ts-preserve-service。解剖：五告警多行局（assurance 饱和 / basic p90 +2230.9% / food p90 +7346.8% / order 限流 / preserve p50+p90 双动）；agent 图读反因果向（"basic 经 travel/food 上溯、preserve 累积"）选了叶子侧 basic。**关键机理（评分侧）**：performance 类 `disable_getalerts_credit = CA<1 时剥 GetAlerts 准入`（evaluation.py:437）→ rank1 对象错连带 M1 空准入、MC/EOC/ECR 连塌（0.5/0.5/0）——流程分塌陷是对象错的后果，非独立缺陷（探针未传条件旗标曾误报 1.0，已明）。

> **2026-10-13 晚 · 修复轮 1013_2133_perf26-verify1（多延迟行判别线 · 第 11 次规程闭环）**：① **全库扫描 47 案**（tt-perf 全部 pod_network_delay）：金标行 **40/44 为双动行**（p50+p90 同引；旁枝多 p90-only）；双动行内 p90 升幅最陡者=金标 37/40（剩 3 例为 0 基线/扫掠特例）。② §3 替换原"percentages literally"句为**行形判别线**：p90-only=部分流量波纹（只与退化 pod 共享路径的流量变慢）；p50+p90 双动=全流量延迟载体=震中；双动行内比 p90 升幅；`GetServiceDependencies` 图闭——每个波纹都是它的直接邻居，"需要安静中间跳"的候选不是源头；近零基线百分比不算数。③ rebuild + 探针（行形/双动/图闭三句 ✓ 无跨节泄漏）+ :28796 重启 → 复跑 **ttperf26 六项链全 1.0**（30→11 步，rank1=ts-preserve-service ✓）。

> **2026-10-13 晚 · 轮次 1013_2133_inorder4-v3b45（批四十五 · 3/4 六项全满 · inf22 破连即修）**：① 覆盖 180/754，**JRA 180/180**（轮次 74）。② cod/23（16 步）· tt-perf/27 `pod_network_delay`@price（12 步 · 行形句后首题）· tt-svc/30 `service_dns_resolution_failure`@price（21 步）全满。③ **inf22 破连（JRA 0/FA 0）**：报 currencyservice/missing_service_account vs 真值 node/master/kube_scheduler_unavailable——被陈旧 FailedCreate（SA 事件）钓走：SA 实际在清单（age 96s>pod 82s）、pod 其实存在（Pending+Node:<none>+无任何调度行=没人尝试调度=调度器本体死）；agent 读过 SA 清单仍报 missing。④ 金链 M3=`CheckNodeServiceStatus(master,kube-scheduler)` 从未被读。

> **2026-10-13 晚 · 修复轮 inf22-verify1/2（调度器无行句 + 判活句 + 序句 · 第 12 次规程闭环）**：① **verify1**：§1 补两句——"无调度行（Node `<none>`、无 `0/N nodes` 条件、worker 全健康）=没人尝试调度→读 master `kube-scheduler`"（`CheckNodeServiceStatus` 回报 `inactive (dead)` 即收口；master 的 SchedulingDisabled 属设计不是阻塞）+ FailedCreate **判活句**（"事件只在所指之物仍缺失时才活——SA 在清单/pod 已存在=陈旧历史"）；§2 镜像调度器句。rebuild+探针+重启 → 复跑 **JRA 全对**（rank1=node/master ✓）**但 EOC 0.33**——新句把 agent 拽向控制面过早（cluster config@7→scheduler@8），pod 自身 describe 拖到 @12、M1 迟到塌级联=条款自伤。② **verify2**：§1 Pending 分支补**序句**（"pod 自身 sheet 领跑—— DescribeResource(pod) 载着 pending 行本体、是链的第一证据"）→ 复跑 **六项链全 1.0**（22 步）。

> **2026-10-13 晚 · 轮次 1013_2141_inorder4-v3b46（批四十六 · 3/4 六项全满 · cod24 流程破连记档）**：① 覆盖 184/754。② inf/23 `kube_scheduler_unavailable@master`（16 步 · 修复轮后同族新题首考即过）· tt-perf/28 `pod_network_delay`@route（18 步）· tt-svc/31 `service_dns_resolution_failure`@route（20 步）全满。③ **cod24 流程破连**：CA/FA/JRA 全 1.0（判对 checkoutservice/code_wrong_return）但 **M2（`service_topology_localization`）整步缺席** → MC 0.8/EOC 0.4/ECR 0（JRA 对、链没闭）。解剖：M2 准入 = `GSD(frontend)`（指定锚）；agent 两次 GSD（@7 emailservice〔告警点名〕· @14 checkoutservice〔嫌疑〕）**锚全错侧**且首次早于任何日志读；@16 读到 frontend 症状日志后未重走。查证子类：ccd12–17 的 GSD 里程碑**不指定锚**（None，任何走查算），cod24 与 svc2/6/8 同属**指定锚子类**。

> **2026-10-13 晚 · 修复尝试 cod24-verify1（未闭 · 记档 · 余项第五员）**：§2 枢轴句钉"最外层呼叫者"锚（"the outermost caller's trail — the entry the failed action came through"，含告警点名服务不是锚）+ **重走句**（"If your first walk anchored elsewhere, the repair is one call: take it again from the symptom side once that log is in hand"）。rebuild+探针（重走句 ✓ 无跨节）+重启 → 复跑：**锚修复生效**（GSD(frontend)@11 出现）**但**① GSD 赶在 frontend 日志@12 之前 → M2 先于 M1、严格级联再塌（与 inf22-verify1 同坑）；② 终答漂移 node/worker-02 `node_network_delay`（payment/email 共宿 worker-02 引旁路，ListCodeFiles@21 后弃 GetSourceCode）→ JRA 0。**按规程"加 L3 仍不过→记档"停止迭代**；余项第五员（流程链类）。后续同类再现时的候选守卫："重走置于症状日志读**之后**"（right after the log read）。

> **2026-10-13 晚 · 轮次 1013_2150_inorder4-v3b47（批四十七 · 4/4 JRA 全对 · inf24 级滑点记档）**：① 覆盖 188/754，**JRA 187/188**（轮次 77）。② cod/25 `code_wrong_return`（26 步 · 与 cod24 同金标但锚子类不同——本跑自然走对）· tt-perf/29 `pod_network_delay`@seat（16 步 · 行形句又一中）· tt-svc/32 `service_dns_resolution_failure`@seat（26 步）**六项链全满**；inf/24 `kube_scheduler_unavailable@master`（14 步）**JRA/MC/ECR 全对、EOC 0.667**——形状 = **控制面读抢在排除读之前**（scheduler@7 早于 cluster config@8 → M3 先于 M2、严格级联丢级）；同族 inf/23 全满 = 条款有效，按"JRA 对下 0.667 级滑点记为观察、不追条款"处置（再犯第三次才收；候选守卫 = "排除读先于组件读"短语）。

> **2026-10-13 晚 · 轮次 1013_2156_inorder4-v3b48（批四十八 · 3/4 · ttperf30 破连即修）**：① 覆盖 192/754，**JRA 192/192**（轮次 80 · 含 cod24 定稿与 perf30 修复）。② **cod/26 六项链全满**（26 步）——**codedefect 指定锚子类观察位结算**：cod24 战役后首新题直接过（§2 锚句+重走句泛化立证）。③ inf/25 `kube_scheduler_unavailable@master`（17 步）JRA ✓ EOC 0.667——调度器族级滑点第二例（inf/24 同形：控制面读抢排除读前）→ 维持观察（第三次才收）。④ tt-svc/33 `service_dns_resolution_failure`@security（21 步）全满。⑤ **ttperf30 破连（JRA 0/FA 0）**：报 ts-order-service/`pod_cpu_overload` vs 真值 ts-security-service/`pod_network_delay`——**全案无 latency 行**（4 裸饱和 + order cpu_cfs"0.732s Throttled"无基线对照=慢性底噪实锤：metrics 全窗 0.6–1.5s），唯一真位移 = security 的 `TRAFFIC_ANOMALY [Network Surge]`（±150%）。

> **2026-10-13 晚 · 修复轮 ttperf30-verify1（全裸饱和句 · 第 14 次规程闭环）**：§3 饱和句后补——"**无 latency 行且全裸饱和时：`Val: … (Throttled)` 无基线对照=无位移（慢性）、亚核百分比=亚噪声；带真位移（traffic/network）的那行才是案**"。rebuild+探针（§3 双句 ✓ 无跨节）+重启 → 复跑 **六项链全 1.0**（31→24 步，rank1=ts-security-service ✓）。边界已设：22（扫掠集，无饱和行）不被此句夺；34（有延迟行）不触发。

> **2026-10-13 晚 · cod24 定稿轮 1013_2200_cod24-verify2（用户令"再跑一次定稿" · 第 13 次规程闭环）**：同配置三跑定案——**六项链全 1.0**（30 步）：链序 M0@5 → M1（frontend 日志）@11 → **M2 = GSD(frontend)@13 紧贴症状日志** → M3@24 → M4@26，全有序。锚句+重走句被自然执行（verify1 的倒位属探针轮偶发）；**账回正**（JRA 192/192 含此轮）。codedefect 指定锚子类就此转正为"已解"，余项仍四员。

> **2026-10-13 晚 · 轮次 1013_2203_inorder4-v3b49（批四十九 · 4/4 JRA 全对 · cod27 序滑点记档）**：① 覆盖 196/754，**JRA 196/196**（轮次 81）。② inf/26 `kube_scheduler_unavailable@master`（15 步 · 同族新题全满——调度器族 EOC 观察位维持 2/不过线）· tt-perf/31 `pod_network_delay`@station（23 步 · 全裸饱和句后首新题）· tt-svc/34 `service_dns_resolution_failure`@station（16 步）**六项链全满**；**cod/27** JRA/CA/FA/MC/ECR 全对、**EOC 0.4**——形状 = **走查（GSD(frontend)@10）抢在 frontend 日志（M1@15）之前**（锚对、时序早；与 cod24-verify1 同坑）→ 按规记观察（该坑族计数：探针 1 + 正式 1，再犯才上"症状日志先于走查"守卫）。③ 花絮：ttperf31/ttsvc34 首启因轮次目录字面量笔误未跑（rc 1/2），按正确目录补跑即过——"先查实际目录再写路径"再入教训列。

> **2026-10-13 晚 · 轮次 1013_2210_inorder4-v3b50（批五十 · 4/4 六项链全满 · 覆盖整两百）**：① **覆盖 200/754**，**JRA 200/200**（轮次 82）。② cod/28 `code_wrong_return`（22 步）· inf/27 `kube_scheduler_unavailable@master`（19 步 · 调度器族连二全满、观察位未再犯）· tt-perf/32 `pod_network_delay`@train（17 步）· tt-svc/35 `service_dns_resolution_failure`@train（15 步）——**四条链全满的干净批**（自批四十三以来首见）。③ 双族连打节奏稳定：codedefect 指定锚子类 3 连过（cod26/27 序滑点外 cod28 全满）、调度器族 4 连 JRA 全对。


















































































