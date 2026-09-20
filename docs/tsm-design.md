# 三级语义建模（TSM）数据集协作架构

> **框架 vs 范式（两层工程）**：三级语义建模（Three-Level Semantic Modeling）是**跨范式通用**的框架（ER / DLR / RDF 都适用）；**DLR 是针对数据源级语义建模的原创建模范式**（ER = 数据库建模标准基线，RDF = W3C R2RML 标准基线）。三范式差异只可能在**数据源级**出现——领域共识级与业务逻辑级三范式共享，是公平性前提。
>
> **三级**：数据源级（L1）/ 领域共识级（L2）/ 业务逻辑级（L3）。

## 背景

**v2 (evidence prompt 注入) → v3 (纯 question + RAG) → TSM（三级语义建模，L1/L2/L3 并行锚定）。**

- v2 150 题 evidence 直接注入 prompt — Agent 被动接收最强信号，DLR 98.7%
- v3 40 题实际仍是 evidence 注入（`run_serial.sh`/`run_parallel.sh` 未删证据注入行，08-25 修复 `0f69e49`）
- **纯 question 模式**：L2（RAG）仅剩 kid 22 一条 — search_evidence 召回哑火，Agent 只剩 L1 单级盲搜
- **目标**：三级独立信号交叉验证 → 锚定唯一实体/属性 → 消除语义鸿沟

## 三级定义

```
                         问题文本 (question only, no evidence)
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
      数据源级 L1      领域共识级 L2    业务逻辑级 L3
      (MCP 语义层)      (RAG 证据)       (SOP 技能)
      Kuzu+FAISS        search_          skills/*.md
      dlr_semantic      evidence
      _query
      get_pe_mapping
      get_le_attrs
              │             │             │
              ▼             ▼             ▼
       数据结构全貌   术语→列/值的    难题模式+处理建议
       实体+属性+关系  映射词典       “这种题容易错在哪”
              │             │             │
              └─────────────┼─────────────┘
                            ▼
                    交叉验证 → 锚定实体
                            │
                            ▼
                      get_pe_mapping / get_entity_mapping / get_rdf_mapping
                            │
                            ▼
                      execute_sql → 按 SOP 验证 → Final Answer
```

| 维度 | 数据源级（L1 MCP 语义层） | 领域共识级（L2 RAG） | 业务逻辑级（L3 SOP） |
|------|---------------|-------------|-------------|
| **存储** | YAML/TTL 模型 description | `rag_knowledge/*.jsonl` | `OC-based Agent Service/skills/sop.md`（**合并单文件**，09-18 起） |
| **工具** | `dlr_semantic_query`、`get_pe_mapping`、`get_le_attrs`（v3 起为 4 核心工具集，探索类已禁注册） | `search_evidence` | 文件系统读取 (`Read` → `AGENTS.md`) |
| **回答什么** | 这个领域有哪些结构？ | 这个问题用词对应什么列/值？ | 这种题有什么坑？ |
| **产出** | 实体ID + 属性列表 + DB 路径 | 术语→列/值的映射 | 验证规则 + 反模式 |
| **独特价值** | 全貌 + 结构完整性 | 弥合 NL→模型语言鸿沟 | 知道"容易错在哪" |
| **盲区** | NL 术语和列名不对齐时召回不到 | 零散映射，未知实体间关系 | 需要 L1+L2 提供上下文 |

## 分层书写原则：引用下级对象，不越级描述

> **数据源级语义之上，好的语义架构设计 = 上层可以引用下级的对象描述；层层对齐、层层收敛；不要越级描述。**（2026-09-20 用户定）

各层的表述者视角：**L1 = 业务+IT，L2 = 业务+懂 IT 的业务，L3 = 业务**。由此推出：

- **L3（`skills/sop.md`）面向业务语义，不写库表列原名**（`yearmonth`、`Consumption`、`Date`、`transactions_1k` …）。需要指涉某列时，用当前这道题的业务语言说"我要什么数据"——物理映射由 L1/L2 提供，L3 **引用**即可。
- **数据本身的约定可留**（如"期间记录为 YYYYMM"），**库表结构描述不留**。判断标准：这句话是业务在说需求，还是在描述数据库？
- 反面教材：q1472 条目曾把"每行 = 某客户某月"写成 `yearmonth.Consumption` 级别的数据源描述——**越级**。（2026-09-20 用户指出"1472 没写好"）

## 边界判断

| 事实 | 归入 | 理由 |
|------|------|------|
| `borderColor` 列有 black/white/borderless 三个值 | **L1** (模型 description) | 数据长什么样 — 普适领域事实 |
| `power` 列：数字/'*'(无限)/NULL(未知) | **L1** (模型 description) | 列的值域 — 任何使用此数据的人都需要 |
| 题目说 "borderless cards" → 查 borderColor = 'borderless' | **L2** (RAG) | 题面用词→列映射 — 弥合 NL 鸿沟 |
| "incredibly powerful foils" = cardKingdomFoilId IS NOT NULL AND cardKingdomId IS NOT NULL | **L2** (RAG) | 出题人定义的术语 — 不是领域通用知识 |
| "story spotlight" = isStorySpotlight = 1 | **L2** (RAG) | 题面词→具体列/值 |
| 百分比分母不能通过 JOIN 路径（虚增行数） | **L3** (SOP) | 过程性陷阱 — 跨多领域的防坑规则 |
| 同名卡多版本 → 用 uuid 区分，不要只按 name 聚合 | **L3** (SOP) | 解题模式 — 这个坑在这个领域反复出现 |
| `percentage = DIVIDE(COUNT(part), COUNT(total)) * 100` | **L2** (RAG) | 计算公式 — 出题人对百分比的定义 |

**判断口诀**：
1. "这个数据怎么存" → L1 (模型)
2. "题目这句话查什么列" → L2 (RAG)
3. "这种题容易怎么错" → L3 (SOP)

## 协同协议

### Step 1：并行发出

拿到 question 后，Agent **同时**调用三级（不串行）：

| 级 | 动作 |
|------|------|
| L1 | `{paradigm}_semantic_query(question)` — 召回候选实体 + DB |
| L2 | `search_evidence(namespace=db, question)` — 召回术语映射 |
| L3 | 读 `skills/sop.md` — 固定路径，**不需要先知道 db**；命中本节就按它执行，没有就跳过 |

### Step 2：交叉验证 & 置信度门控

```
┌─ 三级指向同一实体/列 → HIGH 置信度，直接映射+SQL
├─ 2 级一致，1 无信号 → MEDIUM 置信度，用一致的 2 条验证后行动
├─ 仅 1 级有信号 → LOW 置信度，深入探索该级，尝试不同 query 重试
└─ 全哑 → 盲搜，尝试逐表探索
```

**交叉验证不是多数投票**——两个弱信号交叉后可能变强（各自有噪声但指向同一点）。L1 可能召回多个候选实体，L2 返回的列名可以选出正确的那个。

### Step 3：L3 介入

L3 在锚定实体后、写 SQL 前介入，提供：
- 该领域该题型的常见陷阱（如 JOIN 虚增、LIMIT 1 取众数）
- 验证步骤（如分母 COUNT DISTINCT vs COUNT(*)、ORDER 方向检查）

### Step 4：输出

Final Answer + Evidence SQL + 标注信息来源（MCP 工具名 / RAG kid / SOP 名称）

## 数据集结构

| 字段 | 原用法 | 新用法 |
|------|--------|--------|
| `question` | prompt 注入 | **唯一输入** — 直接给 Agent |
| `evidence` | prompt 注入 | → **L2 RAG** 聚合（按领域术语→映射） |
| `SQL` | gold 评判 | 保留为 gold cache（已修正的错误见 dataset.md） |
| `db_id` | 不给 Agent → 语义路由 | Stage 2 重放 + gold 缓存 |
| `difficulty` | N/A | → **L3 SOP** 的触发器（简单题不用加载 SOP） |

## v3 → TSM 迁移路径

1. **L2 重建**：card_games RAG 从 1 条 → 覆盖 52 题 evidence 的术语映射（**本次行动**）
2. **L3 骨架**：~~11 数据库各建 `skills/{db}.md`~~ → **2026-09-18 改为合并单文件 `skills/sop.md`**。原因：L3 入口原先挂在「L1 返回的 db」上（`读 skills/{db}.md`），而 L1 恰恰可能把库排错 —— 要读 SOP 得先选对库、SOP 却正是用来纠正选库的，**死循环**。合并后：固定路径、开局就能读、不需要 db；有 restate 本题的节就按它执行，没有就跳过（常态）。新库条目直接追加到 sop.md 对应库的小节下。旧 `{db}.md` 已随合并**删除**（不留指针文件），仓库内全部引用改指 sop.md，judge 侧同读 sop.md
3. **AGENTS.md 更新**：三步并行协议 + Skill 加载策略
4. **纯 question 重跑**：q360 起真正纯 question，三级验证效果
5. **全量迁移**：按数据库推进，每批重跑后对比 v2/v3 baseline

## 开放问题

1. ~~**L3 读取权限冲突**~~ ✅ **已解决（2026-08-27）**：`oc_*/opencode.json` 的 `permission.read` 改为**白名单**——`{"*": "deny", "skills/*.md": "allow", "skills\\*.md": "allow"}`（opencode 按 git-worktree 相对路径匹配，两种斜杠都要给）。防作弊其余不变；skills 四份副本需同步（见 [agent.md](agent.md) §3）
2. ~~**旧 evidence JSONL topic 的迁移**~~ ❌ **不是欠账（2026-09-14 定调）**：9 个 topic 的逐题原文格式 = **原始组的设计态**（naive 吸收，与 NL2SQL 对照用），**不需要**按 card_games 模式重写。是否把一个 topic 升级为**对照组**（按三范式定义重组：下沉 L1 / 保留 L2 / 上浮 L3）按需决定。两组口径见 [rag-evidence.md](rag-evidence.md)
3. ~~gold cache 过渡态~~ ✅ **已切换（2026-08-27 起）**：02/03/04 读 config 的 `eval.output_dir`（现为 `outputs2`），即原始 gold 版 cache

## 原则

- **知识库的两组组织哲学（2026-09-14 定调）**：**原始组** = 对数据集的 naive 吸收（数据源级归数据源级、领域共识级吸收 evidence、搞不定的沉淀 SOP）——目的是与 NL2SQL 对照，证明三级语义建模稳定可行；**对照组** = 按三范式的定义重新组织语义层——目的是验证高效、少积累，让每个领域沉淀自己的行业资产。一个 topic **默认处于原始组状态**，对它做按范式定义的重组后才进入对照组。判定口诀：**"这个数据怎么存"→下沉 L1 / "题目这句话查什么列"→保留 L2 / "这种题容易怎么错"→上浮 L3**。详见 [rag-evidence.md](rag-evidence.md)
- **RAG = evidence 聚合，原则上全留**（对照组的 L2 侧）。清理只针对与 L1 模型层完全重复的纯结构描述。
- **SOP ≠ 诊断流程（Digi-Onto）→ 解题防坑建议**。DLR 的数据集题面简单、无复杂业务逻辑，SOP 聚焦"这种题容易错在哪"。
- **三级并行，不是串行**。ReACT 循环中三级同时发出，交叉验证后才进入 SQL 构造阶段。
- **L2 不可匮乏**。search_evidence 返回空 → L1+L3 两级各自有噪声 → 交叉不到同一点。L2 的术语密度决定锚定质量。
- **Skill 写法 = 一个个具体问题 + 怎么做（纯文字，用英文，与题面语言一致）**。条目事后准入：agent 搞不定/结果不确定/题目错误才进 skills--头疼医头的基础上略微聚合，n=1 不预写通用规则；没有条目的题 = 干净实验组，只考 L1 description + L2 RAG。**不写任何 SQL 成品/few-shot 模板（2026-08-28 修订，旧版允许方法模板已删）**：表和聚合的选择是解释（skill 的活），查询结构是执行（agent 从 L1 映射自建，是被测能力）；模板挖空题面即答案 95%（judge 实录：技能少样本模板即本题原句）。评测元信息（gold 对错、evidence 缺陷）不进 skills，只进 docs/dataset.md。
- **Skill 累积闭环**：每道翻盘/失败的题，根因归类 → 已有模式则补充案例，新坑则新增模式。
- **软修复 = SOP 高维覆盖（2026-08-28 定）**：知识层内部冲突（kid 聚合碎片 vs SOP 模式）不改数据、不改 kid，由 L3 按题目模式给出高维指引覆盖低层碎片--SOP 不参与 kid 聚类，只按“这种题容易怎么错”组织；judge 判序显式定：disputes > SkillPath(SOP) > KnowledgePath(rag) > evidence 字面（oc_judge/AGENTS.md）。首例 q1473：kid7 的 /12 模板与 kid16/19 粒度事实矛盾，skill 模式4 覆盖后三范式 judge 统一翻正。
- **Agent 侧判序（2026-09-01 定，与 judge 侧判序对称）**：只有一条硬规则——L3 严格命中（节 heading restate 本题）即为最权威，按该节的表选择/口径执行；**无命中节时不预设优先级**，agent 按 ReACT 循环综合问题原文 + L1 + L2 自行判断，prompt 不做微观干预。首例 q1521（DLR，PASS/101K token）：L1 把 financial 的 `LOGICAL.Transaction` 排第一（"transactions" 字面撞库，正确的 `LOGICAL.Consumption` 排第三），agent 读 L3 无命中节，ReACT 分支先探 financial 死路（空 namespace 搜索 + error read 不存在的 `skills/financial.md`），后靠 L2 granularity 证据自发否决 L1 排序走对——纠偏是 agent 自发行为，证明该分支能自愈；该次跑题无节，其根因（建模级召回冲突）事后按准入规则补了业务逻辑消歧条目。**位置即杠杆（q1521 三轮对照实证）**：判序写在 AGENTS.md 核心约束第 4 位时 agent 晚读 L3、financial 对冲保留（9步/130.9K）；置顶第 1 位后 step 2 即并行读 skills，消歧先于 db 动作到达，死路消失、双腿映射合批、单 SQL（5步/71.4K，低于同期 ER 75.2K）——同一规则内容，位置决定 agent 是否及时消费。重跑复现两例：q1526（有条目旧跑"读了不信"首条 SQL 走自释，置顶后首条 SQL 即条目口径，9步/151.4K→7步/106.4K）、q1493（无条目组，置顶后无节分支不漂移且省掉验证 SQL，8步/111.8K→5步/70.6K）。
- **数据集保持原始（2026-08-27 起）**：不修 gold SQL / evidence，已知缺陷题（docs/dataset.md 清单）由知识层消化——L2 聚合时修正错误 evidence、L3 模式化指引避开陷阱。Agent 按语义正确口径作答；strict 对原始 gold 必挂，胜负落在 judge 仲裁（judge 拿原始 evidence，evidence 支持题面语义的题可翻）。**统计口径：正常题/缺陷题分栏**，避免数据集缺陷污染三范式对比。这才是本体要解决的问题：在不完美的数据与表述上建立语义秩序，而非迁就数据修数据。
- **语义层同源与四层准入（2026-09-01 定）**：表/列属性就在物理 schema 里；YAML 的原始依据是 ER 基于 `dev_tables.json` 聚合+语义补充而来，DLR、R2RML 均以 ER 为基础生成——三范式语义层同源，YAML 只承载"必要的语义说明"，不是自由发挥空间；RAG = evidence 聚合；L3 看题的跑题结果决定是否加节。**L1/L2 非必要不增加**——对它们的每次增改都是对评测环境（数据集原生语义）的修改，加多了数据集改动过大、三范式对比失真；结果驱动的知识只经 L3 一个阀门准入。绕路按根因定性：**实体/关系建模造成召回冲突 → L3 补业务逻辑消歧条目**（q1521 首例："transactions" 字面把 DLR L1 拉去 financial，2026-09-01 补条目；DLR 更易发生但 ER/RDF 同样可能，skills 三范式共用一份）；纯执行效率问题不构成准入。
