# Cloud-OpsBench — TSM 建模方案（L1 先行）

> **状态**：**v1**，2026-10-10 —— 收口三项已全部折叠：codedefect / infrastructure 已抽样（实体表闭环）、Train-Ticket 差异落定、判分语义查证完成。
> **归纳来源**：benchmark README（布局 / 工具面 / 指标）+ Boutique 八家族各抽 1 例（**8/8**，含 codedefect / infrastructure）+ 全库 754 例缓存扫描（cluster-config 核查）+ `agents/*/evaluation_utils` 判分内部——只用可见侧信息；gold / 答案侧材料不用于建模。
> **待补**：场景服务路径（§七.1，实现外延）· L2 起步份已落（`sources/consensus/kubernetes.jsonl`）；L3 门槛未触发。
> 本目录当前只有本方案；场景 README 与模型产物后续再补。
> English: [modeling-plan.md](modeling-plan.md)

## 一、场景与数据源

- **是什么**：K8s 云系统 agentic 根因分析（RCA）；754 例（Online Boutique 550 / Train-Ticket 204），以**状态快照**形式发布——确定性回放，无需真集群。
- **判分双轨**：结果 `CA / FA / JRA`（组件 / 故障型别 / 联合）+ 过程 `MC / EOC / ECR / EE / RAR`（里程碑覆盖 / admissible 顺序 / 闭合 / 证据效率 / 冗余）。
- **每题数据源**（`benchmark/<system>/<category>/<id>/`）：
  - `metadata.json` —— 题面 **query**（症状短语）+ 真值（**不用于**建模）
  - `tool_cache.json` —— 全命名空间预渲染的工具输出，按工具调用（`tool:args`）为键；Boutique 约 0.5k 键、TT 约 1.6–1.7k 键（随命名空间规模变化；缓存随快照而定、与故障无关）
  - `raw_data/` —— `k8s_states.json` · `logs.json` · `alert.json` · `metrics.csv`；**`metrics.csv` 非 performance 专属**：Boutique codedefect 98/98 全带 + performance 25/29，TT 仅 performance 47/47，infrastructure（抽样）不带——"性能槽"实际由 `GetAlerts` 承载（见 §四）
  - `code/` —— 裁剪后的服务源码（仅 Boutique）
- **工具面**（agent 可见 = 题面 + 工具输出）：12 个工具 —— `GetResources`、`DescribeResource`、`GetAppYAML`、`GetServiceDependencies`、`CheckServiceConnectivity`、`GetAlerts`、`GetRecentLogs`、`GetErrorLogs`、`ListCodeFiles`、`GetSourceCode`、`GetClusterConfiguration`、`CheckNodeServiceStatus`。Train-Ticket 面为 10 个（code 两件为 Boutique 专属**硬门槛**，见 §三.2 #9）；预渲染：Boutique 12 中 10 个、TT 10 中 9 个（`GetRecentLogs` 两系统均按需）。`GetClusterConfiguration` 在**全 754 例**（两系统）均预渲染有真实节点配置。
- **快照锚定**：上游冻结于 `ea05daf`（`LLM4Ops/Cloud-OpsBench`，`main`，2026-10-10 拉取）——场景开发以该快照为准；后续上游变动走增量更新、不实时跟随。

## 二、边界（定案）

1. **只存 schema 级**：模型保存实体 / 关系 / 观测槽的**种类**；实例明细（名字、状态、报文、数值）一律不入。
2. **L1 帮找数据，不代查数据**：实例数据由 agent 经 benchmark 工具取得——既是设计初衷（同 BIRD：建模 ≠ 装数据），也是判分强制（过程分要求证据链由 agent 经 admissible 工具调用取得；模型代答反而打坏 MC/EOC/ECR）。
3. **稳定性**：数据源变化（新 case、状态变）或换系统都不动 L1；只有"世界"变了（新资源种类 / 新工具）才动——即"L1 越来越稳"。

## 三、L1 模型（schema 级）

> **观测槽** = "这个状态住在哪里、用哪个工具看、读输出的哪一段"——关系表的核心列，也是"帮找数据"的落点。
> 机器可读源：[`sources/configs/DLR/cloudopsbench.yaml`](sources/configs/DLR/cloudopsbench.yaml)（`mapping_type: dlr-state`）——三表 1:1 序列化；schema 注记在文件尾。

### 3.1 实体种类

| 侧 | 种类 | 状态槽语义 |
|---|---|---|
| LE | Service | 对调用方而言的可达性（端点绑定、连通性） |
| LE | Workload（Deployment；StatefulSet / DaemonSet / Job 的观测同构） | 期望态所有者：副本 / 模板 / 引用 / 端口 / 探针 |
| LE | 请求路径（依赖 / 寻址） | 谁调谁；地址（env / DNS / ingress） |
| PE | ReplicaSet · Pod · Container | 实例生命周期：调度了？创建了？启动了？健康？ |
| PE | Node · Namespace | 放置与作用域：taint / label / 容量 / cordon；命名空间作用域 |
| PE | Endpoints | svc↔pod 绑定结果 |
| PE | 配置对象：ServiceAccount / Secret / ConfigMap / PVC / PV / StorageClass | 被引用的存在性 / 可绑定性 |
| PE | 策略与配额：ResourceQuota / NetworkPolicy / RoleBinding | 创建许可 / 流量许可 |
| PE | Event | 机制记录（X 为什么失败） |
| PE | 日志流 / 指标流 / Alert | 实体的遥测面 |
| PE | 代码面（`code/` 下的服务源码） | 源码缺陷面：哪个文件 / 函数承载缺陷 |
| PE | 节点运行时服务（containerd / kubelet …） | 节点内部机制：本节点上的 pod 为什么起不来 |

> 可观测种类全集（**全 754 例**缓存并集 = 21 种，闭包验证无新增）：configmaps, daemonsets, deployments, endpoints, events, ingresses, jobs, namespaces, networkpolicies, nodes, persistentvolumeclaims, persistentvolumes, pods, replicasets, resourcequota, rolebindings, secrets, serviceaccounts, services, statefulsets, storageclasses。无新增种类——单数 `pod` / `service` / `statefulset` 是复数种类的参数别名。两个收口家族的观测面在 k8s 种类表**之外**：代码面（`code/`，仅 Boutique）与节点运行时服务（`CheckNodeServiceStatus` 输出）。

### 3.2 关系种类 + 观测槽（核心表）

| # | 关系（种类 → 种类） | 类 | 承载 | 观测槽（工具 → 读哪段） |
|---|---|---|---|---|
| 1 | Deployment → ReplicaSet → Pod | ARCS | 期望→实际的副本链 | GetResources(deployments / replicasets / pods) |
| 2 | Service → Endpoints ← Pod | ARCS | selector 匹配 + readiness | GetResources / DescribeResource(services · endpoints)；pods --show-labels |
| 3 | Pod → Node | ARCS | 调度约束 vs 节点状态 | DescribeResource(pod：Events FailedScheduling、Node-Selectors；node：Unschedulable / taints) · GetClusterConfiguration · CheckNodeServiceStatus |
| 4 | spec → ServiceAccount / Secret / ConfigMap / PVC-PV；image → registry | ARCS | 引用存在性 / 可拉取性 | GetAppYAML · GetResources(存在性) · pod Events（FailedMount / 镜像拉取报文） |
| 5 | 创建准入 → ResourceQuota / RoleBinding / ServiceAccount | ARCS | 创建许可 | GetResources(resourcequota · rolebindings · serviceaccounts) · pod Events（FailedCreate 报文族） |
| 6 | Container → 探针（liveness / readiness） | ARCS | 健康门控 | DescribeResource(pod：probe failed、restarts) · GetAppYAML(探针配置) |
| 7 | Service ↔ Service（依赖 / 寻址） | PAS | 调用可达与地址 | GetServiceDependencies · CheckServiceConnectivity · GetAppYAML(env) · GetErrorLogs |
| 8 | 实体 → 遥测面 | （观测） | 异常信号 | GetAlerts · GetErrorLogs / GetRecentLogs |
| 9 | 工作负载 → 代码面（`code/`） | （观测） | 缺陷定位：报错报文 → 文件 / 函数 → 代码证据 | GetErrorLogs / GetRecentLogs（报文）→ ListCodeFiles → GetSourceCode（Boutique 硬门槛） |
| 10 | Node → 节点运行时服务 | ARCS | 节点侧机制（如 containerd 挂） | CheckNodeServiceStatus |

> ARCS = 纵向锚定（LE↔PE）；PAS = 横向路由（LE↔LE）——与 DLR 模型同术语。

### 3.3 症状 → 入口切片（初步）

| 题面模板（原文） | 例数（Boutique / TT） | 入口链（初步） |
|---|---|---|
| Partial Service Unreachability. | 220 / 70 | 可达链：调用方错误日志 → 端点绑定 → 属主链 → 分阶段证据 |
| Service Availability Disruption. | 214 / 87 | 同可达链（覆盖 scheduling / startup 等阶段） |
| Service Performance Degradation. | 51 / 0 | 遥测入口：GetAlerts → 对象层排除 |
| Service abnormal restart. | 36 / 0 | 健康链：restarts → 探针 / OOM 证据 |
| Service latency increased significantly | 18 / 0 | 遥测（同 Performance Degradation） |
| Service quality degradation. | 11 / 47 | 遥测（同 Performance Degradation） |

> 模板跨家族重载（同一短语既用于 admission 也用于 service routing；Availability Disruption 既用于 scheduling 也用于 startup）——判别发生在**链上**，不是短语本身。两个收口家族走同样的模板进入：codedefect/1 与 infrastructure/1 的题面都是 "Service Availability Disruption."——指纹在**代码槽**与**节点服务槽**。

## 四、运行时用法（引导，而非查询）

症状 → 取该链的**模型切片**（槽位清单 + 查询指令模板）→ agent **调用 benchmark 工具**实查 → 实例数据回流 → 修正 → 沿边推进 → 第一个"观测 ≠ 期望"的槽 = 断点 → 结论（组件 + 机制）。专家轨迹（admission 例的 gold path = 6 步）即此走链的一个实例；证据链——进而 MC/EOC/ECR——由走链天然满足。
交付形态同 TSM 2.0：模型经 MCP 给"建模视图"，数据经源工具给——契约在内、实现在外。
（佐证，不入模型：benchmark 自己的里程碑角色体系——症状 → 机制 → 根因确认——与链上阶段一一对应。）

**判分侧（2026-10-10 查证，自 `agents/*/evaluation_utils`；语境说明、不入模型）：**

- admissible 匹配 = 工具名 + 参数子集（资源别名归一，如 pod↔pods）；`evidence_patterns` 匹配**工具输出的观察文本**（5 种：literal 子串 / regex / json_path / yaml_path 回退 / code_snippet）。沿链走 admissible 调用并引用观察文本，MC / EOC / ECR 由构造满足。
- completion_formula（8 种构造；主力 all-of `M1..M3`）+ `precedes` 边序 = 链序——与槽表规定的顺序同构。
- gated performance 案例剥 `GetAlerts` credit（`evaluation.py:246`）：alerts 只作症状指针、不作证据——靠对象层排除 + 指标读数收链。`EE` = 证据步 / 总步；`RAR` = 重复签名率。

## 五、三级分工与编入纪律

- **L1（数据源级）**——本方案主体。从数据源**读**出来（看几道样例即可——L1 是读出来的、不是跑出来的）；零 per-case 构建；靠修正增长、越来越稳。
- **L2（领域共识，按需）**——**只写 schema 级读法**：怎么读各观测槽的输出（对象清单列；日志 patterns/samples；遥测槽自描述的 alerts；代码槽），以及症状措辞如何落到链上——**不超出数据集自身信息**；数据源明细（报文文本、值域清单、组件名册）不入 L2（由 agent 沿槽实查）。难题解剖（codedefect 98 / performance 76）表明读法需求**按槽类聚类、不按系统** → v0 单域库（`sources/consensus/kubernetes.jsonl`）；按槽类拆分只在够本时做（条目量 / 检索串扰 / 第二个 k8s 场景）。
- **L3（具体业务 SOP，门槛制）**——卡死才加（裸跑基线 + 门槛证据）；可超出测试集信息；不可答案倒推。

## 六、验证记录（存证，不入模型）

| 抽样案例 | 链上断点 | 探针证据（实例级，仅供验证留档） |
|---|---|---|
| admission/1 | 引用槽（Pod 从未创建） | `FailedCreate … serviceaccount "services" not found` |
| scheduling/1 | Pod→Node 槽 | `0/4 nodes are available: 4 node(s) were unschedulable` |
| startup/1 | 镜像拉取槽 | pod 状态 `ErrImagePull` |
| runtime/1 | 探针槽（pod 在跑） | `Liveness probe failed: malformed HTTP status code` |
| service/1 | 寻址槽（TCP 全通） | connectivity 探针 `Connection Succeeded`；断在 env 地址 |
| performance/1 | 遥测槽 | `LATENCY_DEGRADATION p95 4.85ms→70.04ms (+1343%)` |
| codedefect/1（checkoutservice · hard） | 代码槽——参数顺序 | `panic: mismatching currency codes`（43 条日志、2 条错误皆为同一 panic） |
| infrastructure/1（node/worker-01 · medium） | 节点服务槽——containerd 挂 | worker-01 上 `containerd.service … Active: inactive (dead)` |

## 七、待办

1. **产物已落（v1）**：三张表 → [`sources/configs/DLR/cloudopsbench.yaml`](sources/configs/DLR/cloudopsbench.yaml)（`mapping_type: dlr-state`，行级 1:1）。**builder 已落（2026-10-10）**：`buildLance`（向量：实体 / 关系 / 切片）+ `loadNeo4j`（图：LE/PE 节点；关系即节点带槽属性 + `INVOLVES` 边；切片）按 `mapping_type` 分派。剩余（实现外延）：场景服务路径（内存图 / 工具消费），及场景切换时的图实载。
2. L2 按需生长（起步份已落）；L3 仅在门槛触发后建。
3. 快照若移动（换 pin）：重核两项落在代码里的能力事实——code 工具硬门槛与预渲染集。
