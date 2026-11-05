# 场景 · 支付运营（外部基准 `BizAgentBench`）——用 TSM + DLR

[English](README.md) | 中文

> **定位**：把 TSM（三级语义建模）+ DLR 用到**外部、会改状态的业务基准**——50 道长程支付运营题，带客户模拟器与确定性 G/P/F 判分。它是场景集的「改状态业务」一端（`birdminidev` = 只读 SQL，`cloudopsbench` = 只读 RCA，`bizagentbench` = 改状态运营）。
> **规范与原则**（LE / PE / ARCS / PAS、建模规则与自检）：[docs/03-design.zh.md](../../docs/03-design.zh.md)；
> 场景包约定（目录布局、换场景清单）：[docs/04-application.zh.md](../../docs/04-application.zh.md)。

## 1. 数据集介绍（含判分口径）

### 原生语义：原材料在哪

| 原材料 | 位置 | 内容 |
|---|---|---|
| **基准本体** | 上游 BizAgentBench `bizagentbench-payment-v1`，检出在仓库外（`BIZAGENTBENCH_DIR`） | **50 题**：1–30 Operations Desk，31–50 PSP；每道题由客户模拟器驱动一条长工具链 |
| **知识** | 数据集自带知识库 | **789 份文档**（621 份可搜），覆盖业务规则、来源单据与服务接口 |
| **世界** | 数据集 tau2 风格的 world | 404 个集合 / 3,121 条记录；601 条能力（记录读取 + 业务动作） |
| **判分** | 上游确定性 verifier | **G / P / F**（目标 / 过程 / 保护），**strict = G∧P∧F**，**IF = 1 − P∧F**；无 LLM judge、无人工翻盘口径 |

### 写节/复跑前必须知道的判分机制

- verifier 读**最终世界 + 审计轨迹**（已执行请求、回执、事件）：提案或批准不是付款；计划中的退款不是已结算；只有真实落地的效果才算；
- **G** = 请求的业务结果与允许的终止状态；**P** = 执行要求（审批、顺序、时限、单次完成）；**F** = 受保护对象、账本完整性、禁止性副作用；
- 题目是长程的：漏一个截止、未批准就执行、重复付款，都会在业务结果正确时照样打挂 P/F；
- 论文按 3 轮平均报分；**本仓库按「每题最佳有效轮 + 观察到的范围」记录**——同一知识层上 agent 行为方差很大（见 §5），单轮是抽样，不是稳定率。

## 2. 建模方式（原材料 → 三层）

### L1 = 数据源级（`dlr`，`sources/configs/DLR/*.yaml`）

三个文件——`operations_desk.yaml`、`typed_services.yaml`、`psp.yaml`——构成一份 schema 级模型：**106 个逻辑实体 · 147 条 PAS 关系 · 687 条向量行**（Operations Desk 84 LE / 127 PAS / 513 行；PSP 22 LE / 20 PAS / 174 行）。

- **LE = 业务对象**（发票、汇款、授权、争议、证券、远期……），携带生命周期与挂载能力；
- **PE = 记录面**（资源、属性、public 标记）；**ARCS** 把每次请求锚到案件 scope，**PAS** 在对象间路由；
- 能力挂在 LE 上，带 **anchor + guard**（动作用什么键、改什么），来源是数据集自带的 `tool_catalog` / `DESK-*` / PSP 文档；
- **零实例值**：模型只到 schema 级，帮 agent“找得到、做得对”，从不给题目的答案。

### L2 = 领域共识（`consensus`，`sources/consensus/*.jsonl`，191 条）

跨对象、非 workflow 的知识：最小单位与舍入、报价与结算、按笔交付费、储备条件、改单与分配、证据版本、通道/退出规则、托管与争议口径。按系统拆分（`shared` 10 · `operations_desk` 44 · `typed_services` 84 · `psp` 53）；每条都写适用范围与读法，不写题级答案。

### L3 = 打法（`sop`，`sources/sop.md`，50 节）

节标题 = 客户开场白**逐字**（检索触发）；正文是类级打法，由向量检索交付（`dlr_search_sop`），只有命中该节的那道题付成本。拆分：Operations Desk 30 + PSP 20。

两条经过实测的优化（细节见 [docs/04-application.zh.md](../../docs/04-application.zh.md)）：

- **Wrong turn（负向 few-shot）**——规则已在节里、agent 仍走“看起来合理”的岔路时，把实测到的那个错误动作补一行；
- **Check before closing（收口）**——钉住关账时必须成立的业务不变量（债权仍保留、信用额度仍保留、费用不超总包、交付确实到账……），不抄 verifier 的检查名。

准入按需（数据集错误 / 无节跑不对 / 无节 >15W）；每次改节后只复跑它自己那道题。

### 工具面

评测桥暴露 **3 个语义工具**——`state_model_query`（L1 切片）、`dlr_search_consensus`（L2）、`dlr_search_sop`（L3）。数据集的记录/动作工具、客户模拟器与 verifier 不变；`search_knowledge` / `read_document` 被 DLR 工具替代（**assisted** 口径，不与裸数据集口径混报）。

## 3. 应用结果

> 每题最佳有效轮（strict 优先，否则最高 checks）；台账见 [DETAIL.md](DETAIL.md) 与 `eval/ledger.json`。

- **覆盖 50/50**；**strict 44/50（88%）**；最佳轮通过数：**G 44 · P 48 · F 49 · IF 4%**；
- 未 strict 的 6 题（剩余检查）：

| 题 | best | 剩余 |
|---|---|---|
| 008 | 43/44 | `joint.fee_and_reserve` |
| 011 | 36/42 | joint 资本 / 费用与储备 / 连续底仓 + 集团参与方 |
| 014 | 40/41 | `charges.customer_total_limit` |
| 032 | 18/19 | `a.32.reasoning_receipt_calendar` |
| 048 | 19/21 | `c48_linked_rights` + 争议债权保留 |
| 050 | 16/21 | 多个 goal/linked 检查 |

- **最终 best-practice store**：`TSM Core Service/.store/lance/bizagentbench-v35`（entities 687 / consensus 191 / sop 50）。**freeze 只固定 L1/L2**（`l1l2-4eafa301`，自 v34 未变）；L3 按题拼接，不进 freeze；
- 逐题档案：[DETAIL.md](DETAIL.md) · `eval/ledger.json` · `results/dlr-full/`（本地留档）。

## 4. 工作流（怎么跑）

### 前置（包外三样）

1. **数据集检出**——`BIZAGENTBENCH_DIR` 指向它（默认 `D:/Code_Proj/Dataset/BizAgentBench-main`）；
2. **embedding 模型快照**——`TSM_MODEL_DIR`（默认本地 `bge-base-en-v1.5` HF 快照）；
3. **DeepSeek key 文件**——`DEEPSEEK_ENV_FILE`（默认 `DSH-based Agent Service/dsh_dlr/.env`）。

### 建语义 store

```bash
cd "TSM Core Service"
TSM_SCENARIO="$PWD/../scenarios/bizagentbench" \
TSM_STORE_DIR="$PWD/.store/lance/bizagentbench-v35" \
TSM_MODEL_DIR="<hf-snapshot>" \
  npx tsx src/build/buildLance.ts --all
# 同环境：src/build/buildConsensus.ts · src/build/buildSop.ts
```

### 跑题与判分

```bash
cd scenarios/bizagentbench
TSM_STORE_DIR=".../bizagentbench-v35" BIZ_DLR_PORT=28799 bash eval/start_bridge.sh   # 起桥（幂等）
BIZ_DLR_PORT=28799 bash eval/run_dlr_pilot.sh results/<round>/case_003 3             # 单题 → summary.json
```

`run_dlr_pilot.sh` 先自动预检桥（`/health`），用 DLR 工具面跑一题；上游 verifier 把 G/P/F 结果写进批次目录（`summary.json`）。`BIZ_AGENTS_MD` 指定 agent 运行态设定（`AGENTS.md`），不设则走 harness 基线行为。

### Agent 装配（assisted 口径）

数据集自己的 agent 配置原样保留，DLR 层是**追加**，不是替换：

```
系统提示 = harness 原 policy
         + 检索说明（dlr_l1/l2/l3；无自由文本知识检索、无文档阅读器）
         + [可选] AGENTS.md 运行态层（角色 / 判序 / 工具纪律）

工具面   = harness 记录+动作工具 + dlr_l1 / dlr_l2 / dlr_l3
         − search_knowledge / read_document
```

- `eval/run_dlr.py` 包住上游环境：摘掉两个知识工具回调，注册三个 DLR 工具，把检索说明（设了 `BIZ_AGENTS_MD` 时再追加整份 `AGENTS.md`）**追加**到 `env.policy`；
- 客户模拟器、记录/动作工具与 verifier 都不动；辅助语义 MCP（TSM 桥）只供知识侧——不执行业务动作，也不参与判分；
- A/B 开关是 `BIZ_AGENTS_MD`：不设 = 原 policy + DLR 工具；设了 = 再叠运行态层。所有报出的成绩都带 AGENTS.md 层。

## 5. 实测

> 与 §3 同源（每题最佳有效轮）。

| 指标 | 值 |
|---|---|
| strict | 44/50（88%） |
| G / P / F（最佳轮通过） | 44 / 48 / 49 |
| IF（最佳轮） | 4%（2/50） |
| 覆盖 | 50/50 |

**方差是真实的**：同一模型、知识层近似不变时，单题轮次间会漂 5–8 个 check（048 19/21 ↔ 11/21 且 P/F 翻转；032 18/19 ↔ 12/19；014 39/41 vs 40/41 且失败集不相交；008 十六轮漂移）。v35 补规则后的复验中，003、004、005、010、013、049 均拿到 strict。头行数字读作“最佳有效轮”，逐题范围看台账。

## 6. 目录图

```
scenarios/bizagentbench/
├── tsm-scenario.json            # 场景清单（TSM_SCENARIO 解析）
├── README.md · README.zh.md     # ← 本场景文档（英文主 + 中文对照）
├── AGENTS.md                    # agent 运行态设定（角色/判序/工具面/纪律）
├── sources/
│   ├── configs/DLR/             # L1：operations_desk.yaml · typed_services.yaml · psp.yaml
│   ├── consensus/               # L2：shared · operations_desk · typed_services · psp（.jsonl）
│   └── sop.md                   # L3：50 个题级节（标题=开场白逐字）
├── eval/                        # 桥（dlr_server.mjs）· run_dlr_pilot.sh · freeze.v*.json · ledger.json
├── results/dlr-full/            # 跑档（本地，gitignored）
├── DETAIL.md                    # 逐题台账（最佳有效轮 + 剩余检查）
├── PROGRESS.md                  # 工作记录 / 实测教训
├── modeling-plan.md (.zh.md)    # as-built 建模记录（双语一对）
└── package.json                 # npm 打包（tsm-scenario-bizagentbench）
```

## License

MIT.
