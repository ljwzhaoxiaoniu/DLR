# 场景 2 · K8s 根因诊断（外部基准 `Cloud-OpsBench`）—— TSM + DLR 怎么用

[English](README.md) | 中文

> **定位**：把 TSM（三级语义建模）+ DLR 用到**外部基准 Cloud-OpsBench**（K8s agentic RCA）上的场景——**架构「换场景」的首个真实检验**，也是三级体系"L3 重 / L1 薄"跷跷板的另一端。
> **规范与原则**（LE / PE / ARCS / PAS、建模规则与自检）在 **[docs/03-design.zh.md](../../docs/03-design.zh.md)**；
> 本文按用法顺序展开：**数据集介绍（含判分口径）→ 建模应用思路 → 应用结果 → 处理和使用流程 → 实测结果**。
> 场景包规范（目录约定、换场景 checklist）：[docs/04-application.zh.md](../../docs/04-application.zh.md)。

## 一、数据集介绍（外部基准，含判分口径）

### 原生语义：原来在哪

| 原料 | 位置 | 内容 |
|---|---|---|
| **基准本体** | 上游 [LLM4Ops/Cloud-OpsBench](https://github.com/LLM4Ops/Cloud-OpsBench)（中山大学 / 港中文） | **快照锚 `ea05daf`**（main，commit 2026-10-06；2026-10-10 拉取）——开发与复跑以该快照为准，上游变动只在需要时增量拉取 |
| **case 快照** | 基准检出 `benchmark/{boutique 550, trainticket 204}` | 真集群注入故障 + Verifier 验证后，把工具可观测上下文固化为 JSON：`tool_cache.json`（预渲染工具输出）/ `logs.json` / `metrics.csv`（性能类）/ `alert.json` / `code/`（boutique 源码）——**确定性回放，无需真集群、可复现** |
| **判分** | `process-label/`（里程碑）· `evaluation_utils/`（scorer） | 结果分 **CA/FA/JRA**（Rank 1 对标签逐字）＋流程分 **MC/EOC/ECR/EE**（证据链：admissible 工具调用 + 证据模式匹配）；**金标准打分，无人工翻盘口径** |
| **规模** | 12 家族 = 754 case | Easy/Medium/Hard 分层；Online Boutique 550 + Train-Ticket 204；57 种故障类型 |
| ⚠ **不随包分发** | 基准检出（约 3.9GB）外挂在仓库外 | 本包（`scenarios/cloudopsbench/`）只放**适配层**：L1/L2/L3 源 + 评测适配；case 数据由 agent 经基准工具实查 |

### 判分机理要点（写节 / 复跑前先读）

- **证据必须经工具取得**：MC/EOC/ECR 匹配的是工具输出的观察文本（admissible = 工具名 + 参数子集）——模型代查会打坏证据链分；
- **EOC = 严格单遍级联**：里程碑仅当前置先收才进 `ordered`，链头倒位即整条塌到 1/4——**链序条款**是 L3 的主体之一；
- `performance` 类有 `disable_getalerts_credit`：Rank 1 对象错会**连带** MC/EOC/ECR 塌，流程分塌是对象错的后果；
- 上游关键发现（与本项目主张对味）：**结果对 ≠ 诊断可靠**——顶级模型 JRA 0.76 但 ECR（证据链闭合）仅 0.38，"够到正确证据区却闭不上证据链"。

## 二、建模应用思路（原料 → 三层）

### L1 = 系统状态空间（`mapping_type: dlr-state`）

与经典 DLR 共享词汇（LE/PE、ARCS/PAS、id 约定、描述纪律）；差异 = 无 databases/attributes、关系带**观测槽**；三表行级 1:1。两份按系统落：`sources/configs/DLR/boutique.yaml` · `trainticket.yaml`。

- **LE = 具体对象**：服务三件套（`<svc>` 业务 / `<svc>-deploy` 载体 / `<svc>-obs` 观测面）+ 节点 + 命名空间——展开到具体对象，不留抽象 kind；
- **PE = 观测面**：deployment / pods / service+endpoints / telemetry / logs / code——每面读法带**谓词模板**；
- **ARCS 锚 = 剪枝**：锚 A = 取数 `WHERE` 键（应用标签）——**唯一合法的全量检索 = 首轮找锚**，其后按锚收窄（DLR 省 token 机制本体）；
- **PAS = 系统调用图**：自快照 `GetServiceDependencies` 逐条读得（boutique 15 边 / TT 112 边）；
- **实例边界**：图只存 **schema 级**——实例明细（名字/状态/报文/数值）一律不入；L1 是帮 agent「找到数据」的导航索引，不是「直接查询数据」（同 BIRD：建模 ≠ 装数据）。

### L2 = 领域共识（`sources/consensus/kubernetes.jsonl`，15 条）

schema 级读法：对象清单 / 日志槽 / 遥测槽 / 排除 / 终止原因 / 代码槽 / 落位（Placement）/ 事件面……每条带 L1 锚 + 可见侧依据。**层界 = 不超数据集自身信息**（数据源明细不入 L2，由 agent 沿槽实查）；读法按**槽类**聚类、不按系统。

### L3 = 走链 SOP（`sources/sop.md`，5 节）

节标题 = 题面措辞**逐字**（向量检索交付：`dlr_search_sop`）；节内 = **实测打法**（判型双胞胎判别线 / 链序条款 / 提交落笔条款），不钉答案：

1. `Partial Service Unreachability.`
2. `Service Availability Disruption.`
3. `Service quality degradation.`
4. `Service latency increased significantly`
5. `Service Performance Degradation.`

准入走三档（①数据集错误 ②无 SOP 跑不对 ③无 SOP >15W）；**破连才加句、改句必搭回归锚复跑**（既有验证位对表）。

### 工具面

dlr-state 形态 = **3 工具**（`state_model_query` 症状→模型切片 / `dlr_search_consensus` / `dlr_search_sop`）；数据面 = 上游基准 MCP（按题起停 `:8000`）。召回形态 = 同一轮**双路并行**（TSM 并行锚定）；agent 侧装配在仓库 `DSH-based Agent Service/dsh_cob/`（不随本包分发）。

## 三、应用结果（本场景的模型）

> 数据截至留档**轮次 230**；口径 = 上游 scorer 输出、去重取最新（详见 [DETAIL.md](DETAIL.md) / `results/STATS.md`）。

- **覆盖 754/754（100%）**；**JRA 752/754（99.7%）** · CA 752 · FA 753 · **ECR 724/754（96.0%）**；
- 流程分（均值）：**MC 0.990 · EOC 0.946 · ECR 0.960** · steps 18.3 · invalid 0.4%；
- **十二家族满覆盖**（12/12 全跑），其中 **10 族全 JRA**：boutique/{admission, codedefect, infrastructure, runtime, scheduling, service, startup} · train-ticket/{runtime, service, startup}；boutique/performance 与 train-ticket/performance 各余 1 例按「摸到极限也算」**记档**；
- 对标：上游顶模基线 JRA 0.76 / ECR 0.38、工业界 Train-Ticket 全量 82.8% JRA——本场景 **752/754** 已在场之上；余 2 处（perf25 / ttperf34）记档不追；
- 逐题留档：[DETAIL.md](DETAIL.md)（总账）＋ `DETAIL/<家族>.md`（逐题校验表 + 证据正文）＋ `results/<轮次>/`（questions.csv + traces/）。

## 四、处理和使用流程（这份基准怎么跑）

### 先决（本包外的两件）

1. **基准检出**：外挂克隆上游（快照 `ea05daf`）到仓库外（默认 `D:\Code_Proj\Cloud-OpsBench`；`COB_DIR` 可覆盖）——不随包分发；
2. **语义后端**：本包经 TSM Core Service 构建（本包可 `npm i tsm-scenario-cloudopsbench` 后按**包名**解析）：

```bash
cd "TSM Core Service"
TSM_SCENARIO=tsm-scenario-cloudopsbench npx tsx src/build/buildLance.ts --all --store .store/lance/cloudopsbench
TSM_SCENARIO=tsm-scenario-cloudopsbench npx tsx src/build/buildConsensus.ts --store .store/lance/cloudopsbench
```

（仓库内开发态用路径形式：`TSM_SCENARIO="$PWD/../scenarios/cloudopsbench"`）

### 跑题与判分（仓库侧装配 `DSH-based Agent Service/dsh_cob/`）

```bash
bash "DSH-based Agent Service/dsh_cob/scripts/start_backend.sh"                   # 语义后端 :28796（幂等）
bash "DSH-based Agent Service/dsh_cob/run_one.sh" <system> <category> <case_id>   # 单题 → results/<轮次>/
bash scenarios/cloudopsbench/eval/grade.sh --runs-root scenarios/cloudopsbench/results --match "<glob>"  # 判分 → questions.csv + summary.md
node scenarios/cloudopsbench/eval/stats.mjs         # 重建 STATS.md / DETAIL.md / DETAIL/<家族>.md
```

二路并发（内存约束）：`COB_MCP_PORT=8001 CLOUDOPSBENCH_MCP_PORT=8001` **成对**设置（前者 = runner 探针口，后者 = 上游服务实际绑定口——只给前者 = 服务仍绑 8000 → 撞端口）。

（`dsh_cob/instructions.md` 为 `run_one.sh` 逐题生成的装配产物（AGENTS.md 原文 + 上游契约），勿手改。）

## 五、实测结果

> 与 §三 同源（去重取最新 · 轮次 230）；明细见 `results/STATS.md`。

| 指标 | 值 |
|---|---|
| token 均值 / 中位 | 241,049 / 145,925（口径 = input+cache_read+cache_write+output；cache 读占比 74%） |
| steps 均值 | 18.3 |
| RAR（重复调用率）/ invalid | 0.13% / 0.4% |
| EE（证据效率） | 0.283（走链即满足流程分的论证在首题即兑现；EE 只作观察） |

## 六、目录速查

```
scenarios/cloudopsbench/
├── tsm-scenario.json          # 场景清单（TSM_SCENARIO 解析用）
├── README.md · README.zh.md   # ← 场景说明（英文主 + 中文对照）
├── sources/
│   ├── configs/DLR/           # L1 建模源（boutique.yaml · trainticket.yaml）
│   ├── consensus/             # L2 领域共识（kubernetes.jsonl）
│   └── sop.md                 # L3 走链 SOP
├── eval/                      # 评测适配：convert.mjs / run_eval.py / grade.sh / stats.mjs / sessions.mjs
├── results/<轮次>/            # 跑批留档（questions.csv + traces/ + raw/）
├── DETAIL.md · DETAIL/        # 评测总账 + 逐家族逐题明细（stats.mjs 重建）
├── modeling-plan.md (.zh.md)  # 建模方案（双语成对，哈希记录 README.i18n.yaml）
└── overview.html              # 总视图（stats.mjs 生成）
```
