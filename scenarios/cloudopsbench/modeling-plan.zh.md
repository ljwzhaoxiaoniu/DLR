# Cloud-OpsBench — TSM 建模方案（L1 · dlr-state）

> **状态**：2026-10-10 —— L1 模型已落（**按系统两份文件**）；服务路径、评分适配器与结果台账均已落地；L3 门未触发。
> **取材**：基准 README（结构 / 工具面 / 指标）+ Boutique 八个家族各抽样一例 + 全 754 例缓存扫描 + 评分器源码（`agents/*/evaluation_utils`）+ **服务名册与调用图逐条取自快照自身**——全部可见侧；gold / 答案侧材料从不进入模型。
> **English**: [modeling-plan.md](modeling-plan.md)

## 一、场景与数据源

- **是什么**：Kubernetes 上的 agentic 根因分析（RCA）；754 例（Online Boutique 550 / Train-Ticket 204），以确定性**状态快照**发布——无需真实集群。
- **评分双轨**：结果 `CA / FA / JRA`（组件 / 故障型 / 联合）+ 流程 `MC / EOC / ECR / EE / RAR`（里程碑覆盖 / 证据顺序 / 链闭合 / 证据效率 / 冗余率）。
- **单例数据源**（`benchmark/<system>/<category>/<id>/`）：
  - `metadata.json` —— **题面**（一句症状短语）+ 真值（**从不用于建模**）
  - `tool_cache.json` —— 整个 namespace 的预渲染工具输出（按 `tool:args` 键）；Boutique ~0.5k 键、TT ~1.6–1.7k 键（快照粒度，非故障粒度）
  - `raw_data/` —— `k8s_states.json` · `logs.json` · `alert.json` · `metrics.csv`；性能槽实际由 `GetAlerts` 承载（见 §四）
  - `code/` —— 修剪后的服务源码（仅 Boutique）
- **工具面**（agent 所见 = 题面 + 工具输出）：12 件——`GetResources`、`DescribeResource`、`GetAppYAML`、`GetServiceDependencies`、`CheckServiceConnectivity`、`GetAlerts`、`GetRecentLogs`、`GetErrorLogs`、`ListCodeFiles`、`GetSourceCode`、`GetClusterConfiguration`、`CheckNodeServiceStatus`。Train-Ticket 面为 10（两件代码工具是 Boutique 专属**硬门槛**）；预渲染：Boutique 10/12、TT 9/10（两侧 `GetRecentLogs` 按需）。`GetClusterConfiguration` 全 754 例、两系统都预渲染了真实节点配置。
- **快照锚定**：上游冻结于 `ea05daf`（`LLM4Ops/Cloud-OpsBench`，main，2026-10-10 拉取）——场景开发随该快照；上游变动走增量同步，不追线。

## 二、模型（LE · PE · PAS——按系统一份）

**文件**：`sources/configs/DLR/{boutique,trainticket}.yaml`（`mapping_type: dlr-state`）——一个系统一个建模单元，同 bird 线一库一份。YAML 即真源；下文是它的读法。

### 2.1 LE = 可指认的对象

> **定盘**：LE 是**业务/运维人员能指认、能定位的具体对象**——"前端挂了"、"worker-01 不对劲"。抽象类别词（"一个 Service"）指不到任何东西，等于没建模。因此 LE 列的是系统的真实对象：

| LE 组 | boutique | train-ticket | 状态槽语义 |
|---|---|---|---|
| 服务 | 11 个（frontend、cartservice、adservice…） | 42 个（ts-order-service、ts-gateway-service…） | 系统的服务单元——RCA 的受害对象（`app/<名>`）|
| 节点 | master + worker-01..03 | 同 | 放置目标（`node/<名>`）|
| 命名空间 | `boutique` | `train-ticket` | 作用域（`namespace/<名>`）|

服务描述携带角色 / 协议 / 显著状态。全 754 缓存的**可观测种类闭包 = 21 类 k8s 资源**（已验无新增）；两个闭包家族的额外面 = 代码工件（`code/`，仅 Boutique）与节点运行时服务（`CheckNodeServiceStatus`）。

### 2.2 PE = 每个对象的状态观测面

对象的状态住在哪、怎么读——面嵌套在对象下：

| 面 | 资源 | 承载 |
|---|---|---|
| `deployment` | deployments | 期望态——副本、pod 模板（镜像/探针/端口）、service account 与配置引用 |
| `pods` | pods | 实例——phase / 重启数 / 上次终止（137 vs 143）/ events（FailedScheduling · FailedMount · Unhealthy · Killing…）|
| `service_endpoints` | services + endpoints | 调用方视角可达性——端口映射、选择器匹配、绑定结果（`<none>`）|
| `telemetry` | alerts + metrics | 异常信号——自描述告警（是指针不是证据）|
| `logs` | logs | recent / error 日志流 |
| `code` | 代码工件 | 仅 Boutique——源码缺陷面（ListCodeFiles → GetSourceCode）|
| 节点面 | nodes · 节点运行时服务 | conditions / taints / capacity / cordon；kubelet · containerd · kube-proxy 状态 |
| 命名空间面 | serviceaccounts · rolebindings · resourcequota · networkpolicies · 配置对象 | 创建准入 / 流量许可 / 可绑定性 |

**锚 = 剪枝谓词**。每个面按 `A.key` = **应用标签（`app=<服务>`）**锚定——节点按 `node_name`、命名空间按 `namespace`。锚就是取数时的 WHERE 键：每个面都带锚定读法模板（`GetResources(pods, label_selector=app=<服务>)`、`GetAppYAML(app_name=…)`、`GetRecentLogs(service_name=…)`、`CheckNodeServiceStatus(node_name=…)`）。按锚取数返回**对象的薄切片**——绝不是集群全量转储——上下文因此小、注意力因此集中在链上。唯一合法的"全量" = 首轮症状扫描（找锚）；此后一切按锚收窄。

### 2.3 PAS = 系统的调用图

服务之间的具体调用边（boutique 15 / train-ticket 112），逐条取自快照自身的 `GetServiceDependencies` 输出——不是外部发明。`PAS.A` = 共享的应用标签。**放置（pod → node）刻意不做 PAS 边**：哪个 pod 落在哪个节点逐 case 不同（实例级）；对象与面都建模，关联在走动中发现。

### 2.4 边界（schema 级）

模型只存**该系统每张快照都有的东西**：种类与固定结构（名册、拓扑、节点名、锚键）。逐 case 的实例——pod 名、IP、状态值、报文文本——永不入模型；由 agent 沿面经工具实查。

## 三、运行时用法（导航，不是查询）

- **双路并行召回**——ReAct 第一步**同时**发出 `dlr_search_consensus`（L2：症状 → 入口链 + 读法）与 `state_model_query`（L1：对象 / 面 / 调用边），交叉验证后再走链。TSM 三级**并行锚定、不是串行**；挂有 L3 面时同一轮加入——本场景工具面只有 L1 + L2（L3 门未触发）。L1 对裸症状措辞可能召回不准（模板跨链重载），由 L2 的链入口纠偏。
- **锚先行、后按锚收窄**——首轮扫描（通常是 pods 清单的 RESTARTS/READY 离群行）锁定异常载体；此后每次取数都带锚。
- **第一个断点即结论**——沿链走到第一个「观测 ≠ 期望」的面即断点；结论 = 组件 + 机制，按基准契约 JSON 提交（Top-3 预测；只计 Rank 1）。

## 四、评分侧（2026-10-10 自 `agents/*/evaluation_utils` 核实；背景，不是模型输入）

- 可接受匹配 = 工具名 + 参数子集（资源别名归一如 pod↔pods）；`evidence_patterns` 匹配**工具输出的观测文本**（literal / regex / json_path / yaml_path / code_snippet）。沿链做可接受调用并引用观测原文，MC / EOC / ECR 按构造满足。
- 完成公式（多为全满足 `M1..M3`）加 `precedes` 边编码链序——与面所规定的顺序一致。
- 受限 performance 例剥 `GetAlerts` credit：告警是指针不是证据——以对象层排除 + 指标读数收口。`EE` = 证据步 / 总步；`RAR` = 重复签名率。

## 五、校验日志（抽样例——实例级，仅作验证）

| 抽样例 | 链断点 | 探针证据（仅验证用）|
|---|---|---|
| admission/1 | 引用槽（Pod 从未创建）| `FailedCreate … serviceaccount "services" not found` |
| scheduling/1 | Pod→Node 槽 | `0/4 nodes are available: 4 node(s) were unschedulable` |
| startup/1 | 镜像拉取槽 | pod 状态 `ErrImagePull` |
| runtime/1 | 探针槽（pod 在跑）| `Liveness probe failed: malformed HTTP status code` |
| service/1 | 寻址槽（TCP 全通）| 连通性探测 `Connection Succeeded`；断在 env 地址 |
| performance/1 | 遥测槽 | `LATENCY_DEGRADATION p95 4.85ms→70.04ms (+1343%)` |
| codedefect/1（checkoutservice）| 代码槽——参数顺序错 | `panic: mismatching currency codes` |
| infrastructure/1（node/worker-01）| 节点服务槽——containerd 死 | `containerd.service … Active: inactive (dead)` |

**端到端实跑（boutique/runtime/1，留档轮 `1010_1618_…-v2m`）**：一步双路召回 → pods 清单上找到锚 → 按锚收窄取数（`app_name=` / `service_name=`）→ 契约 JSON。评分：**CA/FA/JRA = 1.0 且 MC/EOC/ECR = 1.0**（链闭合且有序），EE 0.375，steps 9。

## 六、评测与台账

- `eval/`：`convert.mjs`（dsh 会话日志 → reference trace；用会话日志，不用被截断的 `--json` 流）→ `run_eval.py`（上游评分器，函数级复用）→ `grade.sh`（一条命令；按 system/category 分组）。
- `results/<轮次>/` 留 raw + `questions.csv` + `summary.md` + `traces/`；`results/STATS.md`、`DETAIL.md`、`DETAIL/<家族>.md` 由 `eval/stats.mjs` 重建（逐题 CA/FA/JRA · MC/EOC/ECR/EE · steps/RAR/inv；跨轮去重取最新）。

## 七、分级与书写纪律

- **L1**（本模型）：从数据源读出来；两份文件；随修正生长、随时间稳定。
- **L2**（`sources/consensus/kubernetes.jsonl`，12 条）：schema 级读法**外加症状 → 链的映射**（准入判据第 2 条：题面用词 ↔ 模型术语）。不超数据集自身信息。
- **L3**：门槛制（先裸跑基线 + 有据才写）；绝不由答案倒推。本场景未触发。

## 八、未结项

1. 跨家族 5 题小批走留档流水线；批跑器（每题一个基准 MCP 进程——并行需端口池）。
2. L2 随运行证据生长。
3. 若快照移动（新 pin）：复核两条活在代码里的能力事实——代码工具硬门槛与预渲染集合。
