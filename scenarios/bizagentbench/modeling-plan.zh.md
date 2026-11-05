# BizAgentBench — TSM 建模记录（L1 · dlr · L2 · L3）

> **状态**：as-built，2026-11-04——三层已落地并有实测：L1 **106 LE / 147 PAS / 687 向量行**，L2 **191 条**，L3 **50 节**；best-practice store `bizagentbench-v35`（entities 687 / consensus 191 / sop 50）；逐题最佳 **strict 44/50**（见 [DETAIL.md](DETAIL.md)）。freeze **只固定 L1/L2**（`l1l2-4eafa301`）；L3 按题拼接。
> **材料来源**：数据集自带的 `DB-index` / `DB-*` / `DESK-*` / `PSP` 文档、`tool_catalog` 与题目说明——只看可见侧；答案、verifier 内部与实例值从不进入模型。
> **English**: [modeling-plan.md](modeling-plan.md)

## 1. 场景与数据源

- **是什么**：BizAgentBench `bizagentbench-payment-v1`——50 道长程支付运营题（1–30 Operations Desk，31–50 PSP）；客户模拟器驱动每道题；最终世界 + 审计轨迹按 **G / P / F** 确定性判分（strict = G∧P∧F；IF = 1 − P∧F）。
- **原材料**：789 份知识文档（621 份可搜）、601 条能力、404 个集合 / 3,121 条记录；数据集检出在包外（`BIZAGENTBENCH_DIR`）。
- **边界**：建模范围 ≤ 测试集能拿到的信息——只做 schema 级对象与业务口径，不写逐题金额、记录 ID、分钟或答案。

## 2. 三层

### L1 = 数据源级（`dlr`，三个 yaml）

| 文件 | 范围 | LE | PAS | 向量行 |
|---|---|---|---|---|
| `operations_desk.yaml` + `typed_services.yaml` | Desk 核心 + Joint/Link + 服务对象（cases 6–30） | 84 | 127 | 513 |
| `psp.yaml` | PSP 账户 + 20 个案件族 | 22 | 20 | 174 |
| **合计** | | **106** | **147** | **687** |

- **LE = 业务对象**，带生命周期与挂载能力；**PE = 记录面**（资源、属性、public 标记）；**ARCS** 把请求锚到案件 scope；**PAS** 在对象间路由。
- 能力挂 LE，带 **anchor + guard**（动作的键与效果），来源为 `tool_catalog` 与服务接口文档。
- **零实例值**——schema 级模型服务其系统的每一道题。

### L2 = 领域共识（`consensus`，四个 jsonl，191 条）

| 文件 | 条数 | 内容 |
|---|---|---|
| `shared.jsonl` | 10 | 跨系统口径 |
| `operations_desk.jsonl` | 44 | Desk 通用：单位、报价与结算、费用、储备、改单与分配、证据版本 |
| `typed_services.jsonl` | 84 | 服务对象口径（授权、托管、抵押、远期、争议……） |
| `psp.jsonl` | 53 | PSP 口径（额度、通知、退款、税额、索赔……） |

L2 只放**非 workflow 知识**（术语、口径、背景）；工作流与题级打法归 L3。每条都写适用范围与读法，不写答案。

### L3 = 打法（`sop.md`，50 节）

- 节标题 = 客户开场白**逐字**（检索触发）；正文是类级打法，由向量检索交付（`dlr_search_sop`）。
- 拆分：Desk 30 + PSP 20。节按需新增，三档准入：① 数据集错误 ② 无节跑不对 ③ 无节 >15W。
- 两条实测手段写进节里：**Wrong turn（负向 few-shot）**——封住实测到的“看起来合理”的岔路；**Check before closing（收口）**——钉住关账时的业务不变量。两条都用业务语言（不抄 verifier 检查名、不写实例值），每次改节后复跑该题。

## 3. 建模过程

1. **读数据集，不读答案**：从 `DB-index` / `DB-*` / `DESK-*` / `PSP` 与工具目录长出每个系统的对象族；确认每个 LE 可指认、每个 PE 是真实记录面、每条能力的 anchor 与动作一致。
2. **按题生长，再冻结**：早期题长出 Desk 核心；typed services 补服务对象；PSP 补账户与 20 个案件族。全量模型（687 行）一次建成，之后只做描述修正。
3. **质量门**：`tsm coverage`（缺列 / 缺描述 / FK 未表达）、桥接预检（工具面）、改节即复跑该题。
4. **纪律**：不写实例值、不改 gold/verifier、不注入答案；规则与数据集文档冲突时，以数据集文档为准。

## 4. 检索 / 工具面

评测桥暴露 **3 个语义工具**：`state_model_query`（L1 切片：对象、生命周期、能力、公开集合）、`dlr_search_consensus`（L2）、`dlr_search_sop`（L3）。数据集的记录/动作工具、客户模拟器与 verifier 不变；DLR 工具替代 `search_knowledge` / `read_document`（**assisted** 口径）。

agent 的装配方式是**追加、不是替换**：`eval/run_dlr.py` 包住上游环境，摘掉两个知识工具回调、注册三个 DLR 工具，并把检索说明（设了 `BIZ_AGENTS_MD` 时再追加整份 `AGENTS.md`）追加到 `env.policy`。harness 原 policy、客户模拟器、记录/动作工具与 verifier 都不动；辅助 MCP 只供知识侧，不参与判分。

## 5. 评测接入与 freeze

- 每题的运行档含 `summary.json`（G/P/F + checks）、轨迹与最终世界，落在 `results/dlr-full/`。
- **freeze = 只固定 L1/L2**（`l1l2-4eafa301`，自 v34 未变）。L3 按题拼接、不进 freeze；每题锚定自己运行时用的节文本。
- 可复现目标：同一 L1/L2 freeze + store 构建 + 跑法可重建同档成绩；单轮是抽样（agent 方差大，见 README §5），台账报 best + range，不冒充稳定率。

## 6. 实测教训

- **Wrong turn 与 Check before closing 是两条有效的 L3 杠杆**——实测翻盘：019/021/025/009/007（wrong turn）、037/038/042/044/045/046（收口），以及 v35 复验的 003/004/005/010/013/049。
- **未归一 workflow 上方差主导**：008 十六轮漂移未收敛；048/032/014 在近似同一知识层上出现 5–8 个 check 的摆动。到 3 次经验上限就收手归档 best。
- **freeze 范围很重要**：把 L3 版本要求塞进 freeze 会把无关题拖进复跑；按题拼接才是正确单位。
