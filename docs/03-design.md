# 设计：DLR —— 原创的 foundation 实现

> **定位**：四篇叙事的 **③ 实现**。① [背景与主张](01-background.md) 引出"语义建模以结构化数据源为基础"；② [概念](02-concept.md) 给出 TSM 三级框架；**本文是 DLR——数据源级（L1）这一级的原创 foundation 详细设计**：LE / PE 双层 + ARCS / PAS 两个机制。
> **读者**：接手 DLR 建模的人或 agent。读完应当能独立为一个新库写出合规的 DLR yaml，并知道哪里最容易错。

## 0. 一句话与两条设计要点

> **DLR = 把物理表投影成业务视图（PE），再把视图组织成业务实体（LE），LE 之间用 PAS 表达语义路由。**

物理世界的碎片化（宽表拆子对象、多表拼完整对象、junction 表）对 agent **透明**——agent 看到的是**业务实体树**，而不是表清单。

```
物理表 ──(ARCS 投影)──▶ PE ──(LE 1:N 容器)──▶ LE ──(PAS)──▶ 另一个 LE
```

对 ① 背景篇的两条直接回答：

- **概念与落地解耦（LE ↔ PE）→ 数据成熟度无关**：同一个 LE 的落地可以是一张 Excel、一个 3NF 系统表、一张维度建模平台表、一张实时大表。企业**不必先升级平台**；升级换代**只动 PE**，LE / L2 / L3 一字不改。
- **correction 权**：描述层可以指出 schema 的历史失真（"此表名为 X 实为 Y，按 Z 理解"）——**不擅动 schema**，但译者有资格指出笔误。

## 1. 设计模型：三层实体、两个机制、一个标记位

> 2026-09-12 与作者对齐后定稿。**这是 DLR 的语义本体，一切规则从这里推导。**

### 1.1 三层

| 层 | 是什么 | 数据上是否存在 |
|---|---|---|
| **物理表** | 数据源原样（列 / 行 / FK） | ✅ 存在 |
| **PE**（PhysicalEntity） | 物理表在**当前业务语境下的视图**：ARCS 圈定行(R)、选列(C)、定锚(A)、注语义(S) | ❌ 视图，不物化 |
| **LE**（LogicalEntity） | **业务实体**（有独立生命周期），由若干 PE 构成 | ❌ 逻辑对象，不物化 |

**LE 不物化是关键**：LE 没有"实例"，它的身份由**锚定键动态构成**——所有数量关系以**锚定键的取值**为单位。

### 1.2 两个机制

| 机制 | 连接 | 连接的是 | 携带 |
|---|---|---|---|
| **ARCS** | PE ↔ **物理表** | 视图的**投影定义** | A 锚定 / R 行过滤 / C 列选择 / S 语义补注 |
| **PAS** | LE ↔ LE | **public 属性级**的业务关联 | P 谓词（方向+动词+基数）/ A 寻址坐标 / S 语义补注 |

> ⚠️ **最常见的误解**：ARCS 连的是 **PE ↔ 物理表**（投影定义），**不是** PE ↔ LE。LE 与 PE 是 1:N **容器**关系（yaml 的嵌套结构），不是 ARCS。

- `ARCS.A.cardinality` 一律**从 LE 视角**写：`1:1`（每个锚定值 ↔ 本表 1 行 = 身份/属性面）或 `1:N`（↔ 本表 N 行 = 明细/事件面）。**不存在 `N:1` 写法。**
- `ARCS.C` 的**值**是物理列，**键**是 `{LE}.{public 属性名}`——视图说业务话，列名取自 LE 面。

### 1.3 一个标记位：public

**public 不是实体，是 PE 属性上的可见性标记**：标了的 → 投影成 **LE 的 public 面**（进 LE 向量、供召回），**同时**是 `PAS.A` 的指认对象；未标的 → 只在下钻 PE 时可见。同一业务属性在多张 PE 上物化 → 投影时**去重为一条**。

### 1.4 三档数量关系（agent 的行数推理）

两侧 PE 相连的结果行数 = cardinality 相乘：

| 组合 | 语义 |
|---|---|
| `1:1 ⋈ 1:1` | 属性 × 属性 |
| `1:1 ⋈ 1:N` | 实体 ⋈ 明细 —— 正常 |
| **`1:N ⋈ 1:N`** | **M×N**：每个锚定值内部两两配对——"按实体汇总再比较"必须先各自聚合回锚定粒度 |

### 1.5 闭环：跨 LE 的关联一定能走通

`PAS` 连接的是两个 LE 的 **public 属性**（不是 PE，也不是物理列）：源 PE →（持有的 public 属性）…LE 内串联… → PAS 坐标属性 → 目标 LE 坐标属性 →（串联）→ 目标 PE。

- `PAS.A` 命名的坐标**落在两侧之一**（多数在目标侧，或落在**桥梁 PE** 上），**不要求在源侧存在**；
- **桥梁 PE** = 同时参与两侧拼接的 PE（如 `hero_power` 持 `hero_id` + `power_id`），必然挂在某个 LE 下；
- 模型只声明「关联存在 + 起点坐标」，**路径由 agent 找**——模型给**导航语义**，不是执行计划。

### 1.6 建模义务（可查）

1. 每个 public 属性**至少被该 LE 下某个 PE 持有**（否则空挂 → 闭环断）；
2. `PAS.A` 必须落在两侧之一的 public 面**名字**上；
3. **桥梁 PE 的两侧键要在可见面上**（private 也能走通，但要多绕步）。

## 2. yaml 逐字段规范

文件位置：`scenarios/<场景>/sources/configs/DLR/{db}.yaml`（一库一份；范式内各库合并进同一套存储）。

```yaml
mapping_type: dlr
version: '2.0'
scenario_name: dlr_card_games
description: ...
databases:
  card_games: sqlite:///MINIDEV_sqlite/dev_databases/card_games/card_games.sqlite

logical_entities:
- logical_entity_id: LOGICAL.Card       # 不带库前缀，必须全局唯一
  biz_name: Card
  description: Individual card entity with attributes, printings, and game mechanics
  physical_entities:
  - physical_entity_id: PHYSICAL.Card   # 同样全局唯一
    physical_table_name: cards
    physical_table_id: card_games.cards
    A: {cardinality: '1:1', key: uuid}  # 锚定：基数（LE 视角）+ 锚定键（LE 属性名）
    R: null                             # 行过滤，通常 null
    S: Card attributes                  # 语义补注 → 落 PE 的 description
    attributes:
    - column: card_games.cards.uuid     # 物理列全 id（db.table.col，不带引号）
      biz_name: CardID                  # 业务名（进索引 name 位）
      description: ...                  # 文本（进索引 description 位）
      public: true                      # ← 透传到 LE 面

pas_relations:
- relation_id: LOGICAL.CardSet_TO_LOGICAL.Card   # 端点由 "LOGICAL.A_TO_LOGICAL.B" 拆分
  relation_name: Contains
  P:
    forward:  {verb: contains,  cardinality: 1:N}
    reverse:  {verb: belongs to, cardinality: '1:1'}
  A: SetID                              # 寻址坐标（落在两侧之一的 public 面名字上）
  S: 1 set contains N cards
```

### 字段陷阱

| 字段 | 规则 | 踩过的坑 |
|---|---|---|
| `logical_entity_id` / `physical_entity_id` | **不带库前缀，必须全局唯一** | 跨库重名会被**静默合并**——2.0 载入器按 id `MERGE`，**没有冲突拦截**（Python 线曾有 `BuildConflictError`）→ 只能靠建模自检（§7） |
| `column` | 物理列**全 id**，**不加引号** | 早期写成 `frpm."Academic Year"` → id 与 ER 不同构、data_type 查表失配。含空格/括号的列写 SQL 时自行加引号 |
| `A.cardinality` | 从 **LE 视角**写，只有 `1:1` / `1:N` | 写成 `N:1` 是常见笔误（旧文档也写错过） |
| `A.key` | 是 **LE 属性名**（public 面的名字），不是物理列名 | 写物理列名 → agent 拿不到 JOIN 落脚点 |
| `P.*.cardinality` | PAS 的基数，与 ARCS 的 cardinality 不是一回事 | 混用会误导 agent 的行数判断 |
| `description`（文件头，top-level） | 写**业务语义**（这个库是什么领域、有哪些业务对象）——**不写建模元说明**（"N PE 归 M LE"这类归场景 README） | 案例说明见 `scenarios/<名>/README.md` |
| `description`（LE） | 必须**丰富**（关键字段名 + 业务语义 + 例名），**英文** | 3 词描述在向量空间会被其他库压过 → 走错库 |
| `description`（PE 属性） | public 列 = **业务语义**；非 public 列 = 数据集描述原文 | — |

> **写入纪律（与"不越级"并列）**：L1 只写**业务语义**——不写题面口径（§4），也不写**建模元说明**（本文是规范；"这个库怎么抽象的"归场景 README：`scenarios/<名>/README.md`）。

## 3. 建模规则（按顺序决策）

### 3.0 第一原则：LE 必须有业务对象生命周期

**LE 代表业务世界中一个有独立生命周期（创建→存续→终结）、独立业务身份的对象。**

| 问题 | 例子 | 判定 |
|---|---|---|
| 有业务生命周期？有独立身份？ | Loan（批准→结清）、Transaction（逐笔发生）、Account（开户→销户） | **→ LE** |
| 纯连接表？无业务意义？ | disp（account_id + client_id，无独立生命） | **→ PE** |
| 维表 / 查找表？1:1 查属性？ | colour、gender、district | **→ PE** |

**反例**：`LOGICAL.AccountRelation`（disp 表）只是连接表，应下沉为 Account 的 PE。**正例**：Loan / Transaction 虽然物理 FK 指向 Account（N:1），但各有独立生命周期，保留为 LE。

### 3.1 物理表 → PE 还是独立 LE？

- **规则 1：纯关联/维度表（无业务生命周期）→ ARCS，PE 直挂主 LE。** 这是 DLR"**碎表集中**"的核心优势——物理碎片对 agent 透明。
- **规则 2：有业务生命周期的对象 → 独立 LE + PAS**（特征：主表被 junction 表**引用**）。

### 3.2 其余规则速查

- **规则 3：`PAS.A` 落在两侧之一的 public 面名字上**（不是实体名、不是物理列名，也不要求必须在源侧）。
- **规则 4/10：业务核心度量与 WHERE / GROUP BY / JOIN 高频列 → public**。不升也能对，但要多花 2-3 步——**public/private 影响效率（步数 × token），不影响正确性**。
- **规则 5：纯关联表下沉为 PE 时，其连接键必须升为所属 LE 的 public**（否则 PAS 锚定键在源端断头）。
- **规则 6：A_anchor 必须锚到有逻辑意义的 FK**（纯 junction FK 不配做主锚）。
- **规则 7：独立业务概念 = 独立 LE**——即使物理上 FK 挂在别的表下，也不为物理结构所限。
- **规则 8：LE description 质量 = 语义路由质量**——召回**只在 LE 面收口**，LE description 是路由正确性的**唯一信号**。
- **规则 9：同名异义列必须各自 disambiguate**（如三个 `number` 各有含义）。
- **规则 11：LE description 用英文写**，例名要列全（例名只藏在 private description 里 = 该词零命中）。

### 3.3 结构谱系：不是越复杂越好

**DLR 的核心不是"多拆 LE 用 PAS 连接"，而是用最简结构编码 JOIN 语义。**

| 极端 | 结构 | 本质 | agent 负担 |
|---|---|---|---|
| 每表一个 LE + PAS 互连 | 变种 ER | 逐实体发现 → 逐关系导航 | 最高 |
| 所有表压入一个 LE + ARCS | 变种 RDF | 一次看全，直接选列 | 最低 |
| **DLR 最优解** | **1 LE = 有生命周期的概念 + 附属 PE 经 ARCS 共享锚定键** | — | — |

**thrombosis 案例**：3 张表曾拆 3 个 LE + 2 条 PAS（Lab/Exam 无独立生命周期）；改为 **1 个 LE（Patient）+ 3 个 PE 共享 `PatientID` 锚定键、0 条 PAS** 后，agent 在单个 LE 上下文里就能发现所有列（ARCS 隐式编码了 `JOIN ON ID`），token 大幅下降。**教训**：ARCS 的价值是**结构化 JOIN 语义**；"碎表集中"时最明显。

## 4. 设计教训（实战案例）

| 案例 | 问题 | 修复 | 效果 |
|---|---|---|---|
| superhero | 旧模型 5 个 LE（含虚构 `HeroDimension`），PAS 锚定键在源端断头 | 拆掉虚构 LE，维度 PE 直挂 Superhero；`hero_power` 拆为独立 LE | token **-35%**，召回 6 次 → 1 次 |
| financial | 纯 junction 的 `AccountRelation` 占了 LE；核心度量藏在 private | disp 下沉为 PE；核心度量升 public | token **-40%** |
| student_club | `Expense` 的锚是 `link_to_budget`（无业务意义）；Member 描述仅 3 词 | Expense 升独立 LE、换锚；补 PAS；描述丰富化 | 389K/25 步 → **34K/4 步** |
| toxicology | `atom.element`、`bond_type` 等全 private，Bond→Atom 无 PAS | 四列升 public；补 PAS；描述英文+字段名 | token **-60%** |
| debit_card | `Consumption` 的 public 面缺"消费金额"；`Amount` 与 "amount spent" 冲突 | 新增 `Spending` public；`Amount` 改为"加油量(升)" | token **-33%** |

（数字来自评测线口径的历史对照，见 `eval-line/`；此处作为**设计规则有效性的证据**保留。）

## 5. DLR 如何被消费：图 + 向量

> **图后端可换**：默认目标是**进程内内存图**（YAML→内存，零依赖零锁），**Neo4j 作为兼容样例**（配 `NEO4J_URI` 即启用）；企业按同一读取接口自建连接器。见 [roadmap.md](roadmap.md) §一/§四。

### 5.1 图（Neo4j 兼容样例）

| 节点 | 属性 | 关系 |
|---|---|---|
| `LogicalEntity` | id / name / description / db | `HAS_LOGICAL_ATTRIBUTE{ord}` → `LogicalAttribute` |
| `LogicalAttribute` | id / name / description / ord | —— |
| `PhysicalEntity` | id / name / description / table_id / db / **arcs_a / arcs_r / arcs_c / arcs_s** | `INHERITS{ord}` → `LogicalEntity`；`HAS_PHYSICAL_ATTRIBUTE{ord}` → `PhysicalAttribute` |
| `PhysicalAttribute` | id / name / description / column_id / data_type / db / ord | —— |
| —— | —— | `PAS_RELATED_TO`：`LogicalEntity → LogicalEntity`（含动词 / 基数 / 关联属性 / 说明） |

`arcs_c`（C 列选择）由构建器从 public 属性**重建**——它是"逻辑属性 → 物理列"的翻译表，写 SQL 前必须下钻取到（第二跳）。

### 5.2 向量（LanceDB）——文本模板

| 行类型 | 文本模板 | 参与召回？ |
|---|---|---|
| LE | `{biz_name} {description} {public 属性: name + description 逐条}` | ✅ **只有 LE 进召回** |
| PE | `{table_name} {S}` | 归并用 |
| 属性 | `{biz_name} {description}` | 归并用 |
| PAS | `1个{from}{verb}{cardinality}个{to}；1个{to}{verb}{cardinality}个{from}；{from}和{to}通过{A}关联` | 归并用 |

**召回只在 LE 面收口**（"先收口后截断"）——这决定了两条设计纪律：LE description 必须丰富（规则 8）、例名必须写进 LE 可见面（规则 11）。

### 5.3 工具面（5 个）

`dlr_semantic_query`（LE 召回）→ `get_pe_mapping`（第二跳：表名/列/ARCS/`database_url`）/ `get_le_attrs`；`dlr_search_consensus`（L2）；`execute_sql`（取数）。

## 6. 新库接入作业流程（2.0）

> 目标：把一个新库接进 DLR，产出合规 yaml 并通过构建校验。

1. **读物理层**：`PRAGMA table_info` / `foreign_key_list` 摸清表、列、真实 FK。**物理真相优先**于任何现成清单。
2. **划 LE**：对每张表问第一原则（§3.0）；先画「表 → 归属」草图再动手。
3. **定 PE 与 ARCS**：`A.key` 选有逻辑意义的 FK；共享锚定键的多个 PE 挂同一个 LE（碎表集中）。
4. **定属性与 public**：每列一条；核心度量 / 高频过滤列 `public: true`。
5. **写 PAS**：只在跨 LE 时写；`A` 落在两侧之一；`P` 两侧动词与基数都写。
6. **构建与自检**：

```bash
cd "TSM Core Service"
npx tsx src/build/buildLance.ts --all         # 向量表（LE/PE/属性/PAS 四类行）
npx tsx src/graph/loadNeo4j.ts --all --wipe   # 图（⚠ --wipe = 清库重建：先停 MCP server）
npx tsx src/verify/precheck.ts                # 工具面可用
```

7. **跑题验证**：走 dsh 单题（`run_one.sh`），看召回是否落在正确的 LE 上。

## 7. 自检清单（提交前逐条过）

```
[ ] LE 有业务对象生命周期吗？（纯 junction 下沉为 PE）
[ ] FK 在主表上（→ ARCS）还是被引用（→ PAS）？
[ ] PAS.A 落在两侧之一的 public 面名字上了吗？
[ ] junction PE 的连接键升为所属 LE 的 public 了吗？
[ ] 业务核心度量列（金额/状态/日期/数量）在 public 面上可找到吗？
[ ] 所有属性都有 description 吗？魔鬼数字列是否声明了语义？
[ ] 同名异义的列都被 disambiguate 了吗？
[ ] WHERE / GROUP BY / JOIN 高频列都是 public 吗？
[ ] PE 的 A_anchor 有逻辑意义吗？
[ ] 有没有独立业务概念被埋在某 LE 下？
[ ] LE description 够丰富吗？（≥ 关键字段名 + 业务语义；3-5 词不够）英文？例名列全？
[ ] 所有 column 都是 db.table.col 且不带引号吗？
[ ] id 全局唯一吗？（2.0 载入器无冲突拦截，重名会静默合并）
```

## 8. 常见错误与后果

| 错误 | 后果 | 严重度 |
|---|---|---|
| LE description 缺失或过短 | **语义路由随机**——走错库，正确性问题 | 🔴 |
| `PAS.A` 写物理列名 / 实体名 | 拿到 PAS 后找不到 JOIN 落脚点，闭环断 | 🔴 |
| id 跨库重名 | 静默合并（2.0 无拦截） | 🔴 |
| 列 id 带引号 | id 不同构、`data_type` 失配 | 🟠 |
| 核心度量列留 private | 不影响正确性，多 2-3 步探索 | 🟠 |
| 过度拆 LE | agent 在 PAS 导航上浪费步数（"变种 ER"） | 🟠 |
| 例名只写在 private description | 不进 LE 向量 → 该词零命中 | 🟠 |
| `cardinality` 写 `N:1` | 违反 LE 视角，行数推理出错 | 🟡 |

## 相关

- 概念与准入判据：[02-concept.md](02-concept.md)｜应用（场景包）：[04-application.md](04-application.md)
- 构建链路与命令：[TSM Core Service/README.md](<../TSM Core Service/README.md>)
- 评测线旧口径（三范式对准、yaml→Kuzu/FAISS 全映射）：`eval-line/`
