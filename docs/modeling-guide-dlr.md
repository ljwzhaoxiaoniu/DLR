# DLR 建模指南 — 原创范式 LE / PE / PAS / ARCS

> **本文与 [modeling.md](modeling.md) 的关系**：`modeling.md` 讲"**三范式怎么对准测试**"——同一份数据集，三个范式以**同等颗粒度**被建模、被使用；本文讲 DLR 这一范式**怎么建、为什么这么建**，是 `modeling.md` 的**前置与详细版**。
>
> **读者**：接手 DLR 建模的人或 agent。读完应当能独立为一个新库写出合规的 DLR yaml，并知道哪里最容易错。
>
> **DLR 是本项目唯一原创范式**，另外两个（ER / RDF）是标准基线，作业规范在 [modeling.md](modeling.md)。

---

## 0. 一句话

DLR = 把**物理表**投影成**业务视图（PE）**，再把视图组织成**业务实体（LE）**，LE 之间用 **PAS** 表达语义路由。

物理世界的碎片化（宽表拆子对象、多表拼完整对象、junction 表）对 Agent 透明——Agent 看到的是**业务实体树**，而不是表清单。

```
物理表 ──(ARCS 投影)──▶ PE ──(LE 1:N 容器)──▶ LE ──(PAS)──▶ 另一个 LE
```

---

## 1. 设计模型：三层实体、两个机制、一个标记位

> 2026-09-12 与作者对齐后定稿。**这是 DLR 的语义本体，一切规则从这里推导。**

### 1.1 三层

| 层 | 是什么 | 数据上是否存在 |
|---|---|---|
| **物理表** | 数据源原样（列 / 行 / FK） | ✅ 存在 |
| **PE**（PhysicalEntity） | 物理表在**当前业务语境下的视图**：ARCS 圈定行(R)、选列(C)、定锚(A)、注语义(S) | ❌ 视图，不物化 |
| **LE**（LogicalEntity） | **业务实体**（有独立生命周期），由若干 PE 构成 | ❌ 逻辑对象，不物化 |

**LE 不物化是关键**：LE 没有"实例"这种东西，它的身份由**锚定键动态构成**。因此所有数量关系都以**锚定键的取值**为单位，而不是"LE 实例"。

### 1.2 两个机制

| 机制 | 连接 | 连接的是 | 携带 |
|---|---|---|---|
| **ARCS** | PE ↔ **物理表** | 视图的**投影定义** | A 锚定 / R 行过滤 / C 列选择 / S 语义补注 |
| **PAS** | LE ↔ LE | **public 属性级**的业务关联 | P 谓词（方向+动词+基数）/ A 寻址坐标 / S 语义补注 |

> ⚠️ **最常见的误解**：ARCS 连的是 **PE ↔ 物理表**（视图的投影定义），**不是** PE ↔ LE。LE 与 PE 是 1:N **容器**关系（yaml 里的嵌套结构），不是 ARCS。

- `ARCS.A.cardinality` 一律**从 LE 视角**写：`1:1`（每个锚定值 ↔ 本表 1 行 = 实体的身份/属性面）或 `1:N`（每个锚定值 ↔ 本表 N 行 = 实体的明细/事件面）。**不存在 `N:1` 写法。**
- `ARCS.C` 的**值**是物理列，**键**是 `{LE}.{public 属性名}`——视图说业务话，所以列名取自 LE 面。

### 1.3 一个标记位：public

**public 不是实体，是 PE 属性上的可见性标记**：

```yaml
attributes:
- column: card_games.cards.uuid      # 物理列
  biz_name: CardID                   # 业务名
  description: ...                   # 文本
  public: true                       # ← 唯一标记位：标记即"透传到 LE 面"
```

- 标记了的 → 投影成 **LE 的 public 面**（进 LE 向量，供召回），**同时**是 `PAS.A` 的指认对象
- 未标记的 → 只在下钻 PE 时可见（`get_pe_mapping`）
- 同一个业务属性在多张 PE 上物化（共享锚定键）= 同名 public 标记出现多次 → 投影时**去重为一条**

### 1.4 三档数量关系（agent 的推理规则）

两个 PE 相连的结果行数 = 两侧 cardinality 相乘：

| 组合 | 语义 |
|---|---|
| `1:1 ⋈ 1:1` | 属性 × 属性 |
| `1:1 ⋈ 1:N` | 实体 ⋈ 明细 —— 正常 |
| **`1:N ⋈ 1:N`** | **M×N：每个锚定值内部两两配对**。要"按实体汇总再比较"必须先各自聚合到锚定粒度 |

### 1.5 闭环：跨 LE 的 PE↔PE 关联一定能走通

`PAS` 连接的是两个 LE 的 **public 属性**（不是 PE，也不是物理列）。于是：

```
源 PE →（它持有的 public 属性）…LE 内串联… → PAS 坐标属性
      →PAS→ 目标 LE 坐标属性 → 目标 LE 内串联 → 目标 PE
```

- `PAS.A` 命名的坐标**落在两侧之一**（多数在目标侧，或落在**桥梁 PE** 上），**不要求在源侧存在**
- **桥梁 PE** = 同时参与两侧拼接的 PE（如 `hero_power` 持 `hero_id` + `power_id`），它必然挂在某个 LE 下
- 模型只声明「关联存在 + 起点坐标」，**路径由 agent 找**——模型给的是导航语义，不是执行计划

### 1.6 建模义务（可查）

1. 每个 public 属性**至少被该 LE 下某个 PE 持有**（否则空挂 → 闭环断环）
2. `PAS.A` 必须落在两侧之一的 public 面**名字**上（不是实体名、不是物理列名）
3. **桥梁 PE 的两侧键要在可见面上**（private 也能走，但会多绕步 —— §5 toxicology 教训）

---

## 2. yaml 逐字段规范

文件位置：`Semantic Core Service/configs/scenarios/DLR/{db}.yaml`（11 库各一份，范式内 11 库合并进同一套存储）。

```yaml
mapping_type: dlr
version: '1.0'
scenario_name: card_games
description: ...
databases:
  card_games: sqlite:///../MINIDEV_sqlite/dev_databases/card_games/card_games.sqlite

logical_entities:
- logical_entity_id: LOGICAL.Card          # 不带库前缀，必须全局唯一（跨库重名会中止 build）
  biz_name: Card
  description: Individual card entity with attributes, printings, and game mechanics
  physical_entities:
  - physical_entity_id: PHYSICAL.Card      # 同样全局唯一
    physical_table_name: cards
    physical_table_id: card_games.cards
    A: {cardinality: '1:1', key: uuid}     # 锚定：基数（LE 视角）+ 锚定键（LE 属性名）
    R: null                                # 行过滤，通常 null
    S: Card attributes                     # 语义补注 → 落 PE 的 description
    attributes:
    - column: card_games.cards.uuid        # 物理列全 id（db.table.col，不带引号）
      biz_name: CardID                     # 业务名（进索引 name 位）
      description: ...                     # 文本（进索引 description 位）
      public: true                         # 透传到 LE 面

pas_relations:
- relation_id: LOGICAL.CardSet_TO_LOGICAL.Card   # 端点由 "LOGICAL.A_TO_LOGICAL.B" 拆分
  relation_name: Contains
  P:
    forward:  {verb: contains,  cardinality: 1:N}
    reverse:  {verb: belongs to, cardinality: '1:1'}
  A: SetID                                  # 寻址坐标（落在两侧之一的 public 面名字上）
  S: 1 set contains N cards
```

### 字段陷阱

| 字段 | 规则 | 踩过的坑 |
|---|---|---|
| `logical_entity_id` / `physical_entity_id` | **不带库前缀，必须全局唯一** | `PHYSICAL.Card`/`PHYSICAL.Race` 曾跨库重名 → Kuzu 静默覆盖；已改名 `CreditCard`(financial) / `HeroRace`(superhero)。构建期由 `BuildConflictError` 强制 |
| `column` | 物理列**全 id**，**不加引号** | 早期写成 `frpm."Academic Year"` → id 与 ER 不同构、data_type 查表失配（37 列，09-11 已修）。含空格/括号的列写 SQL 时自行加引号 |
| `A.cardinality` | 从 **LE 视角**写，只有 `1:1` / `1:N` | 写成 `N:1` 是常见笔误（旧文档也写错过） |
| `A.key` | 是 **LE 属性名**（public 面的名字），不是物理列名 | 写物理列名 → agent 拿不到 JOIN 落脚点 |
| `P.*.cardinality` | PAS 的两侧基数，与 ARCS 的 cardinality 不是一回事 | 混用会误导 agent 判断行数膨胀 |
| `description`（LE） | 必须写**丰富**（含关键字段名 + 业务语义 + 例名），英文 | 3 词描述在向量空间会被其他库压过 → 走错库（§5 financial / superhero 案例） |
| `description`（PE attr） | public 列 = **业务语义**；非 public 列 = **数据集 CSV 原文** | 09-12 schema 统一前分三处存，现已合并为每列一条 |

---

## 3. 建模规则（按顺序决策）

### 3.0 第一原则：LE 必须有业务对象生命周期

**LE 代表业务世界中一个有独立生命周期（创建→存续→终结）、独立业务身份的对象**，由若干物理对象（PE）构成。

| 问题 | 例子 | 判定 |
|---|---|---|
| 有业务生命周期？有独立身份？ | Loan（批准→运行→结清）、Transaction（逐笔发生）、Account（开户→销户） | **→ LE** |
| 纯连接表？无业务意义？ | disp（account_id + client_id，无"授权关系"的独立生命） | **→ PE** |
| 维表/查找表？1:1 查属性？ | colour, gender, district 等维度表 | **→ PE** |

**反例**：`LOGICAL.AccountRelation`（disp 表）——只是 account↔client 的连接表，没有"授权"的独立生命周期，不应为 LE，应下沉为 Account 的 PE。

**正例**：`LOGICAL.Loan`、`LOGICAL.Transaction`、`LOGICAL.PermanentOrder`——虽然物理 FK 指向 Account（N:1），但各自有独立业务生命周期和查询语境，保留为 LE 是正确的。

### 3.1 物理表 → PE 还是独立 LE？

```
物理表 → 有业务生命周期？
         ├─ 否 → 纯 junction/维表？FK 在主表上？→ ARCS，PE 挂主 LE（规则 1）
         └─ 是 → 独立 LE + PAS（规则 2）
```

**规则 1：纯关联/维度表（无业务生命周期）→ ARCS，PE 直挂主 LE**

这是 DLR "**碎表集中**"的核心优势——物理上碎片化的维度表对 Agent 透明，Agent 看到的是一棵完整的业务实体树。

```
superhero 表有 eye_colour_id, race_id, gender_id, …
         ↓ FK 长在主表上, 1:1 查维度
    colour, race, gender, publisher, alignment
         ↓ 全部挂为 LOGICAL.Superhero 的 PE（ARCS）
```

**规则 2：有业务生命周期的对象 → 独立 LE + PAS**

```
superhero ──N:1── hero_power ──1:N── superpower
                  ↑ junction, 主表被引用
→ LOGICAL.Power (独立 LE, hero_power + superpower)
→ PAS: Superhero ──possesses──→ Power
```

特征：主表被 junction 表**引用**（`hero_power.hero_id → superhero.id`），或有业务生命周期。拆为独立 LE，PAS 提供语义关联，两面都可导航。

### 3.2 PAS 锚定键

**规则 3：`PAS.A` 必须落在两侧之一的 public 面名字上**（不是实体名、不是物理列名，也不要求必须在源侧）。

> 旧文档曾写成"必须在源 LE public 中可查到"——那是**错的**，会把合法模型误判为断环（曾据此误算 15/35）。正确口径：**落在两侧之一**，多数在目标侧或桥梁 PE 上。

### 3.3 public / private

**规则 4：业务核心度量列 → public**

- 金额、数量、日期等查询高频列必须在 LE 层设为 public
- 辅助列（ID 派生、内部编码等）可留在 PE 层 private
- `WHERE` / `GROUP BY` / `JOIN` 高频列也应当 public（规则 10）

### 3.4 结构谱系：不是越复杂越好

**DLR 的核心不是"多拆 LE 用 PAS 连接"，而是用最简结构编码 JOIN 语义。**

| 极端 | 结构 | 本质 | Agent 负担 |
|------|------|------|-----------|
| 每表一个 LE + PAS 互连 | 变种 ER | 逐实体发现→逐关系导航 | 最高 |
| 所有表压入一个 LE + ARCS | 变种 RDF | 一次看全，直接选列 | 最低 |
| **DLR 最优解** | **1 LE = 有业务生命周期的概念 + 附属 PE 通过 ARCS 共享锚定键** | — | — |

**thrombosis_prediction 案例（2026-08-02）**：

```
旧模型：3 张表 → 3 个 LE (Patient/Lab/Exam) → 2 条 PAS
新模型：3 张表 → 1 个 LE (Patient) + 3 个 PE (PatientMaster/LabResults/ExamFindings) → 0 条 PAS
```

- 旧模型：Agent 搜 "uric acid" 时 LaboratoryTest 的 LE 描述不含关键词，`semantic_query` 反复重试，q1169 DLR 消耗 **217K tokens（RDF 的 5 倍）**
- 根因：三张表共享 `ID` 作为唯一键，Lab 和 Exam 无独立业务生命周期，拆 LE 是过度设计
- 新模型：三个 PE 共享 `PatientID` 锚定键，ARCS 隐式编码了 `JOIN ON ID`，Agent 在单个 LE 上下文中即可发现所有列

**教训**：ARCS 的价值是**结构化 JOIN 语义**——通过共享锚定键让 Agent 看到 PE 就知道怎么连。这个能力在"碎表集中"时最明显；场景简单到只需一个 LE 时，DLR 的上限是 RDF 的检索效率 + 内置 JOIN 语义，不要在两者之间做无意义权衡。

### 3.5 其余规则速查

**规则 5：纯关联表下沉为 PE**——junction 表的连接键（如 `disp.client_id`）**必须升为所属 LE 的 public**，否则 PAS 锚定键在源端断头。效果：Agent 不必理解 `disp` 这个中间件。

**规则 6：A_anchor 逻辑归属**——PE 的 A 必须锚到有逻辑意义的 FK。纯 junction FK（如 `link_to_budget`）不配做主锚，它们只应作为 PAS 桥连接另一个 LE。

**规则 7：独立业务概念 = 独立 LE**——如果一个 PE 代表独立业务概念（Expense、Power），即使物理上通过 FK 挂在另一张表下，也应升级为独立 LE + 直接 PAS。不为物理表结构所限。

**规则 8：LE description 质量 = 语义路由质量**——`dlr_semantic_query` **只返回 LE 结果**（PE/属性/PAS 向量全被丢弃），LE description 是决定路由正确性的**唯一信号**。必须包含关键字段名和业务语义；3 词描述在向量空间中会被其他库的丰富描述压过。

**规则 9：同名异义列必须 disambiguate**——如 `drivers.number` / `qualifying.number` / `results.number` 各有含义，每个都要有 description 说明。

**规则 10：WHERE/GROUP BY/JOIN 高频列升 public**——不升也能对（Agent 会探索到），但要多花 2-3 步；**public/private 不影响正确性，影响效率（步数 × token）**。

**规则 11：LE description 用英文写**——中文描述 + 英文查询在向量空间不匹配；例名要列全，不能只藏在 private 的 description 里。

---

## 4. 实战案例（七个）

| 案例 | 问题 | 修复 | 效果 |
|---|---|---|---|
| **superhero** | 旧模型 5 个 LE（含虚构的 `HeroDimension`），PAS 锚定键在 Superhero 端断头；`colour.colour`、`power_name` 缺 description | 拆掉 3 个虚构 LE，维度 PE 直挂 Superhero；`hero_power`/`superpower` 拆为独立 Power LE | q723 token **72K→47K（-35%）**，`semantic_query` 6 次→1 次 |
| **financial** | 7 个 LE（含纯 junction 的 AccountRelation）；A11-A15 魔鬼数字列 description 不足；Amount 等核心度量藏在 private | disp 下沉为 Account PE；核心度量升 public；消除 Account→AccountRelation→Client 中间跳 | q100 **148K→89K（-40%）** |
| **thrombosis** | 3 表拆 3 LE + 2 PAS，Lab/Exam 无独立生命周期 | 3 表 → 1 LE + 3 PE，共享 PatientID 锚定键 | q1169 **217K→** 大幅下降（见 §3.4） |
| **student_club** | Expense 的 A_anchor 是 `link_to_budget`（无业务意义）；Member description 仅 3 词；link_to_member 是 private 无 PAS | Expense 升独立 LE，A 锚到 `link_to_member`；新增 PAS `Member→Expense`；Member description 丰富化 | q1339 **389K/25步/15次SQL → 34K/4步/1次 SQL（-91%）**，strict PASS |
| **toxicology** | `atom.element`、`bond.bond_type`、`connected.atom_id/atom_id2` 全 private，Bond→Atom 无 PAS，LE description 稀疏 | 四列升 public；新增 PAS `Bond→Atom`；LE description 英文+字段名 | q207 **110K→43K（-60%）** |
| **formula_1** | 三个同名列 `number` description 全空，Agent 无法区分车手号/排位名次/正赛名次 | 三范式为三个 `number` 列补英文 description | q861 由全 INCORRECT 变可解 |
| **debit_card** | `LOGICAL.Consumption` 的 public 面缺"消费金额"，Price/Amount 藏在 private；`Amount` description 是"交易金额"与 "amount spent" 冲突 | 新增 `Spending` public（→`transactions_1k.Price`）；`Amount` 改为"加油量(升)" | q1529 token **132K→88K（-33%）** |

---

## 5. 新库接入作业流程

> 目标：把一个新的 SQLite 库接进 DLR，产出合规 yaml 并通过构建校验。

**Step 0 · 读物理层**
用 `PhysicalScanner` 或直接 `PRAGMA table_info` / `foreign_key_list` 摸清表、列、真实 FK。**物理真相优先于 `dev_tables.json`**（后者可能缺 FK 或有过时列）。

**Step 1 · 划分 LE**
对每张表问第一原则（§3.0）：有独立业务生命周期 → LE；纯 junction / 维表 → PE。
先画一张「表 → 归属」草图，再动手写 yaml。

**Step 2 · 定 PE 与 ARCS**
- 每张表 → 一个 PE，`physical_table_id` 写全
- `A.key` 选**有逻辑意义的 FK**（规则 6），`cardinality` 从 LE 视角写
- 共享锚定键的多个 PE 挂同一个 LE —— 这就是"碎表集中"

**Step 3 · 定属性与 public**
- **每列一条** `attributes` 条目（含 PK、FK 列）
- 业务核心度量 / 高频过滤列标 `public: true`
- `biz_name` 写业务名；`description`：public 列写业务语义（英文、含例名），非 public 列写数据集 `database_description/*.csv` **原文**

**Step 4 · 写 PAS**
- 只在**跨 LE** 时写；同 LE 内由 ARCS 锚定键隐式表达
- `A` 落在两侧之一的 public 面名字上（规则 3）
- `P.forward/reverse` 都写动词与基数；`S` 写一句人话

**Step 5 · 构建与自检**
```bash
cd "Semantic Core Service"
# ⚠ 先停 serve（Kuzu 排他锁）
python main.py build --paradigm DLR
python "tool&test/verify_db_recall.py"     # 预期 RESULT: ALL PASS
```

**Step 6 · 跑题验证**
见 [runbook.md](runbook.md)（服务启动 → 跑批 → 归档）。

---

## 6. 自检清单（提交前逐条过）

```
[ ] LE 有业务对象生命周期吗？（纯 junction 下沉为 PE；有生命周期则保留 LE + PAS）
[ ] FK 在主表上（→ ARCS）还是被引用（→ PAS）？
[ ] PAS.A 落在两侧之一的 public 面名字上了吗？
[ ] junction PE 的连接键升为所属 LE 的 public 了吗？
[ ] 业务核心度量列（金额/状态/日期/数量）在 public 面上可找到吗？
[ ] 所有属性都有 description 吗？魔鬼数字列是否通过 description 声明了语义？
[ ] 同名异义的列都被 disambiguate 了吗？
[ ] WHERE / GROUP BY / JOIN 高频列都是 public 吗？
[ ] PE 的 A_anchor 有逻辑意义吗？（纯 junction FK → 换锚点或升独立 LE）
[ ] 有没有独立业务概念被埋在某 LE 下？→ 拆为独立 LE + PAS
[ ] LE description 够丰富吗？（≥ 关键字段名 + 业务语义；3-5 词不够）
[ ] LE description 是英文吗？例名列全了吗？
[ ] 所有 column 都是 db.table.col 且不带引号吗？
[ ] id 全局唯一吗？（跨库重名会让 build 中止）
```

---

## 7. 常见错误与后果

| 错误 | 后果 | 严重度 |
|---|---|---|
| LE description 缺失或过短 | **语义路由随机**——Agent 走错库，不是效率问题而是正确性问题 | 🔴 |
| `PAS.A` 写物理列名 / 写实体名 | Agent 拿到 PAS 后找不到 JOIN 落脚点，闭环断 | 🔴 |
| id 跨库重名 | Kuzu 静默覆盖（构建期已加 `BuildConflictError` 拦截） | 🔴 |
| 列 id 带引号 | 与 ER/RDF id 不同构、data_type 失配 | 🟠 |
| 核心度量列留 private | 不影响正确性，多 2-3 步探索（步数 × token） | 🟠 |
| 过度拆 LE | Agent 在 PAS 导航上浪费 token（"变种 ER"） | 🟠 |
| 例名只写在 private description | 不进 LE 向量 → 该词零命中 | 🟠 |
| `cardinality` 写 `N:1` | 违反 LE 视角口径，agent 行数推理出错 | 🟡 |

---

## 相关文档

- [modeling.md](modeling.md) —— 三范式对准测试的建模说明（ER / RDF 的作业规范在这里）
- [semantic-layer-build.md](semantic-layer-build.md) —— yaml → Kuzu / FAISS 的**字段级写入链路**（哪些进图、哪些进向量、文本模板）
- [runbook.md](runbook.md) —— 怎么跑、怎么归档、故障怎么办
