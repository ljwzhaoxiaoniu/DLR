# 三范式建模说明 — DLR（原创）/ ER（自研基线）/ RDF（W3C 对照基线）

> **DLR（Decoupled Logic Representation，解耦逻辑表达）是本项目原创的语义建模范式**：LE-PE 双层模型 + PAS 语义路由，将逻辑概念层与物理数据层解耦。项目同时实现 ER 与 RDF 两条基线，三范式同构对比评测。
>
> 配置文件到 Kuzu/FAISS 的字段级写入链路见深度篇：[yaml-to-storage.md](yaml-to-storage.md)。

## 1. 范式定位

| 范式 | 全称 | 设计理念 | 角色 | 模型 |
|------|------|----------|------|------|
| **★ DLR** | Decoupled Logic Representation | 逻辑-物理解耦 | **原创核心范式** | LE / PE / PAS / ARCS |
| **ER** | Entity-Relationship | 传统实体-关系建模 | 自研对比基线 | BizEntity / BizAttribute / BizRelation |
| **RDF** | Resource Description Framework | W3C R2RML + SPARQL | W3C 标准对照基线 | rr:TriplesMap / rr:predicateObjectMap |

### DLR 缩写对照

| 缩写 | 全称 | 说明 |
|------|------|------|
| **LE** | LogicalEntity | 逻辑实体（业务概念层） |
| **PE** | PhysicalEntity | 物理实体（类视图概念，通过 ARCS 锚定到物理库：可宽表拆分子对象、可多表拼合完整对象） |
| **PAS** | Predicate-Attribute-Semantic | LE 间语义路由（三元组：谓词+属性+语义补注） |
| **ARCS** | Anchor-Row-Column-Semantic | PE 到物理库的锚定（四元组：锚定+行过滤+列映射+语义补注） |

**命名约束**：LE/PE id（`LOGICAL.*` / `PHYSICAL.*`）不带库前缀，因此**必须全局唯一**——构建期由 `BuildConflictError` 强制（同 id 映射不同物理表 → 中止 build）。历史教训：`PHYSICAL.Card`/`PHYSICAL.Race` 曾跨库重名导致 Kuzu 静默覆盖，已分别改名 `PHYSICAL.CreditCard`（financial）/`PHYSICAL.HeroRace`（superhero）。

## 2. DLR 建模规则 — 多表聚合场景

> **适用场景**：一个业务概念对应一张主表 + 多张碎片化维度表/子表，需要聚合成统一的业务视图。核心原则：**一个 LE = 一个有业务生命周期的真实业务概念**，由若干物理对象（PE）构成。通过 PE 聚合实现"碎表集中"——这是 DLR 区分于 ER/RDF 的核心优势。
>
> 从 superhero + debit_card + financial 建模实践总结（2026-08-02）。

### 2.0 第一原则：LE 必须有业务对象生命周期

**LE 代表业务世界中一个有独立生命周期（创建→存续→终结）、独立业务身份的对象**，由若干物理对象（PE）构成。判定标准：

| 问题 | 例子 | 判定 |
|------|------|------|
| 有业务生命周期？有独立身份？ | Loan（批准→运行→结清）、Transaction（逐笔发生）、Account（开户→销户） | **→ LE** |
| 纯连接表？无业务意义？ | disp（account_id + client_id，无"授权关系"的独立生命） | **→ PE** |
| 维表/查找表？1:1 查属性？ | colour, gender, district 等维度表 | **→ PE** |

**反例**：`LOGICAL.AccountRelation`（disp 表）——它只是 account↔client 的连接表，没有"授权"的独立生命周期，不应为 LE，应下沉为 Account 的 PE。

**正例**：`LOGICAL.Loan`、`LOGICAL.Transaction`、`LOGICAL.PermanentOrder`——虽然物理 FK 指向 Account（N:1），但各自有独立业务生命周期和查询语境，保留为 LE 是正确的。

### 2.1 PE 聚合规则：ARCS 还是 PAS？

问题：物理表何时作为 PE 并入同一个 LE（ARCS），何时拆为独立 LE（PAS）？

**判断流程**：
```
物理表 → 有业务生命周期？ 
         ├─ 否 → 纯 junction/维表？FK 在主表上？→ ARCS，PE 挂主 LE（规则 1）
         └─ 是 → 独立 LE + PAS（规则 2）
```

**规则 1：纯关联/维度表（无业务生命周期）→ ARCS，PE 直挂主 LE**

```
superhero 表有 eye_colour_id, race_id, gender_id, …
         ↓ FK 长在主表上, 1:1 查维度
    colour, race, gender, publisher, alignment
         ↓ 全部挂为 LOGICAL.Superhero 的 PE（ARCS）
```

这是 DLR "碎表集中"的核心优势——物理上碎片化的维度表对 Agent 透明，Agent 看到的是一棵完整的业务实体树。

```
financial: disp（纯 junction, client↔account）
         ↓ FK account_id 在 disp 上 → ARCS 挂 Account 下
    PHYSICAL.Disp + PHYSICAL.Card → PE under LOGICAL.Account
         ↓ Agent 不再需要导航 Account→AccountRelation→Client 的两次跳转
```

**规则 2：有业务生命周期的对象 → 独立 LE + PAS**

即使物理 FK 指向其他表（N:1），只要对象有独立业务意义，就拆为独立 LE：

```
superhero ──N:1── hero_power ──1:N── superpower
                  ↑ junction, 主表被引用
→ LOGICAL.Power (独立 LE, hero_power + superpower)
→ PAS: Superhero ──possesses──→ Power  (A: HeroID, 1:N / N:1)
```

```
financial: Account ──N:1── Loan ──1:1── Account
                  ↑ FK account_id 在 loan 上, 但 loan 有独立业务生命周期
→ LOGICAL.Loan (独立 LE) ✓  —— 不是纯 junction, 保留为 LE
→ PAS: Account ──HasLoan──→ Loan
```

特征：主表被 junction 表**引用**（`hero_power.hero_id → superhero.id`），或有业务生命周期（Loan/Transaction/PermanentOrder）。拆为独立 LE，PAS 提供语义关联，两面都可导航。

### 2.2 PAS 锚定键规则

**规则 3：PAS 的 `A`（锚定键）必须在源 LE 端有对应的 `public_attributes` 条目**

```
PAS: Superhero ──BelongsTo──→ HeroDimension
     A: DimensionID
         ↑
     必须在 LOGICAL.Superhero.public_attributes 中可查到
     否则 Agent 拿到 PAS 后在源端找不到 JOIN 落脚点
```

### 2.3 public/private 属性约定

**规则 4：业务核心度量列 → `public_attributes`**

- 金额、数量、日期等查询高频列必须在 LE 层设为 public
- 辅助列（ID 派生、内部编码等）可留在 PE 层 private

### 2.4 规则 5：纯关联表下沉为 PE

**物理数据设计常引入纯粹的关联表（junction table）来表达多对多关系**——如 `disp`（client↔account）、`hero_power`（hero↔power）。这类表没有独立业务意义，只是关系型数据库的工程手段。

DLR 的 LE-PE 双层模型可以将这类表**吸收为 PE**，挂到有业务意义的 LE 下，而不必提升为独立 LE：

```
❌ ER/RDF：client ── disp(独立实体) ── account   （disp 被当作一等实体，Agent 多一跳）
✅ DLR：    LOGICAL.Account                      （disp 作为 PE 挂 Account 下）
              ├ PE: Account (master)
              ├ PE: Disp (N:1, A: account_id)     ← junction 不暴露为 LE
              └ ...
            PAS: Client ──owns──→ Account (A: ClientID, via disp.client_id 暴露为 public)
```

**关键**：junction PE 的连接键（如 `disp.client_id`）必须升为所属 LE 的 `public_attributes`，否则 PAS 锚定键在源端断头。

**效果**：Agent 不需要理解 `disp` 这个中间件——它只看到 Client、Account、District 三个业务对象。消除了一层无意义的导航跳转。

### 2.5 案例：financial

**旧建模（错误）**：

```
LOGICAL.Account   LOGICAL.Client   LOGICAL.AccountRelation   LOGICAL.District   LOGICAL.Loan   LOGICAL.Transaction   LOGICAL.PermanentOrder
                         ↑ 7 个 LE, 其中 AccountRelation 是纯 junction 无生命周期
```

问题：
- `disp` 被建模为独立 `LOGICAL.AccountRelation`——纯 junction 表，无业务生命周期，Agent 绕路
- `District` 无 PAS 连接到 Client/Account，虽 FK 存在但语义路由断链
- A* 魔鬼数字列（A11-A15）description 不足，`Amount` 等核心度量藏在 private
- Loan/Transaction/PermanentOrder 虽保留为 LE 正确（各有业务生命周期），但 `amount`、`status` 等核心度量列全在 private——Agent 要翻 PE 才能发现

**新建模（正确）**：

```
LOGICAL.Account                    LOGICAL.Client     LOGICAL.District     LOGICAL.Loan      LOGICAL.Transaction   LOGICAL.PermanentOrder
  ├ PE: account (master)            └ PE: client        └ PE: district       └ PE: loan         └ PE: trans            └ PE: order
  ├ PE: disp (ARCS, N:1, A: account_id)                                        amount → public    amount → public        amount → public
  └ PE: card (ARCS, N:1, A: disp_id)                                           status → public    balance → public

PAS: Client ──Holds──→ Account (A: ClientID, via disp.client_id)
PAS: Account ──HasLoan──→ Loan / ──Generates──→ Transaction / ──HasOrder──→ PermanentOrder
PAS: Client ──ResidesIn──→ District (A: DistrictID)
                       6 个 LE (消解 AccountRelation), 10 个 PE, 5 条 PAS
```

改进：
- `disp` 从独立 LE 下沉为 Account PE——Agent 不再绕路
- Loan/Transaction/PermanentOrder **保留为 LE**——各有批准→结清、逐笔发生、创建→执行的生命周期
- `amount`/`status`/`balance` 等核心度量升 public——Agent 一次 `get_pe_full` 看到关键列
- 消除 `Account→AccountRelation→Client` 的中间跳，Client↔Account 直连

### 2.6 案例：superhero

**旧建模（错误）**：

```
LOGICAL.Superhero          LOGICAL.HeroDimension       LOGICAL.HeroFeature          LOGICAL.Superpower
  └ PE: Superhero            └ PE: Colour/Race/…         └ PE: HeroPower/HeroAttr     └ PE: Superpower
      5 个 LE, 10 个 PE, 复杂的 PAS/ARCS 嵌套
```

问题：
- `HeroDimension` 虚构——实体世界没有这个概念
- 5 个维度 PE 挤一个 LE，PAS 锚定键 `DimensionID` 在 Superhero 端断头
- `HeroFeature` 把 hero_power 和 hero_attribute 混在一起
- `colour.colour`、`power_name` 等关键列缺 description

**新建模（正确）**：

```
LOGICAL.Superhero                          LOGICAL.Power           LOGICAL.Attribute
  ├ PE: Superhero (master, A: id)           ├ PE: HeroPower (N:1)    └ PE: HeroAttribute
  ├ PE: Colour (A: id)                      └ PE: Superpower (1:1)
  ├ PE: HeroRace (A: id)                    PAS: Superhero──possesses──→Power
  ├ PE: Gender (A: id)                      PAS: Superhero──has attr──→Attribute
  ├ PE: Publisher (A: id)
  └ PE: Alignment (A: id)                   3 个 LE, 10 个 PE, 2 条 PAS
```

改进：
- 拆掉 3 个虚构 LE，维度 PE 直挂 Superhero——Agent 一次 `get_pe_full` 看到完整业务结构
- hero_power/superpower 拆为独立 Power LE——PAS 表达多对多，语义清晰
- 所有列补 description，`colour.colour`、`power_name` 不再裸奔

**效果**：DLR q723 token 72K→47K（-35%），`semantic_query` 从 6 次降至 1 次。

### 2.7 案例：debit_card_specializing

**问题**：`LOGICAL.Consumption` 的 public_attributes 只有 `Customer`, `Date`, `Consumption`, `GasStationID`, `ProductID`——缺"消费金额"。`Price` 和 `Amount` 全在 `PHYSICAL.Transaction` 的 private 中。Agent 找不到"amount spent"对应的列，反复试 SQL。

**修复**：新增 `Spending` public 属性，映射到 `transactions_1k.Price`。同时修正 `Amount` 的 description 从"交易金额"→"加油量(升)"，避免与"amount spent"语义冲突。

**效果**：DLR q1529 token 132K→88K（-33%）。

### 2.8 案例：student_club — A_anchor 逻辑归属 + 独立 LE + LE description 质量

**旧建模（错误）**：

```
LOGICAL.EventFinance
  ├── PHYSICAL.Budget     (A: link_to_event)
  └── PHYSICAL.Expense    (A: link_to_budget)   ← 纯 junction，无逻辑意义
```

问题：
- `PHYSICAL.Expense` 的 A_anchor 是 `link_to_budget`——"属于哪个预算桶"没有业务意义
- `link_to_member` FK（到 Member）是 private_attribute，无 PAS 表达——Member→Expense 需 2 跳（Member→Event→EventFinance→Expense）
- `LOGICAL.Member` description 只有 "Student club member"（3 词），first_name/last_name 全在 private 中——语义路由搜 "first_name" 零命中
- 首跳 `dlr_semantic_query("expense...first_name last_name")` 将 "expense" 错误路由到 debit_card（LOGICAL.Consumption 描述更丰富，向量得分更高），Agent 14 步后才通过 `schema()` 发现 student_club

**新建模（正确，参照 superhero Power 模式）**：

```
LOGICAL.Budget              LOGICAL.Expense
  └ PE: Budget (A: event)     └ PE: Expense (A: link_to_member)  ← 逻辑归属！
                              
PAS: Member ──incurs──→ Expense       (A: Member, 1 跳直达)
PAS: Event ──has──→ Budget            (A: Event)
PAS: Budget ──funds──→ Expense        (A: Budget)
```

改进：
- Expense 升级为独立 LE，A_anchor 锚到 `link_to_member`——"谁花的钱"才是业务核心
- `link_to_member` 升为 public attribute，语义路由可见
- 新增 PAS `Member→Expense`（Incurs）——1 跳直达，和 superhero `Superhero→Power` 同模式
- `LOGICAL.Member` description 丰富为 "Student club member — first_name, last_name, position, phone, T-shirt size, zip code, and major"
- `LOGICAL.Expense` description 包含 "cost, expense_date, description, approval status"
- PE description 写业务事实（"YYYY-MM-DD 格式"），不写查询技巧（"月=SUBSTR(6,2)"，过拟合单题）

**效果**：q1339 DLR 389K/25步/15次execute_sql → 34K/4步/1次execute_sql（-91% token），strict PASS。

**揭示的通用规则**：

**规则 6（A_anchor 逻辑归属）**：PE 的 A_anchor 必须锚到有逻辑意义的 FK。纯 junction FK（如 link_to_budget）不配做主锚——它们只应作为 PAS 桥连接另一个 LE。

**规则 7（独立业务概念 = 独立 LE）**：如果一个 PE 代表独立的业务概念（Expense、Power），即使物理上通过 FK 挂在另一张表下，也应该升级为独立 LE + 直接 PAS。不为物理表结构所限。

**规则 8（LE description 质量 = 语义路由质量）**：`dlr_semantic_query` 只返回 LE 结果（PE/attribute/PAS 向量全被丢弃），LE description 是决定路由正确性的**唯一信号**。描述必须包含关键字段名和业务语义——不是写个名字就够。3 词描述在向量空间中会被其他库的丰富描述压过。

### 2.9 检查清单

0. **LE 有业务对象生命周期吗？**（纯 junction 下沉为 PE；有生命周期则保留 LE + PAS）——**第一原则**
1. FK 在主表上（→ ARCS）还是被引用（→ PAS）？
2. PAS 的 `A` 锚定键在源 LE 端有 public_attributes 条目吗？
3. junction PE 的连接键升为所属 LE 的 public 了吗？
4. **业务核心度量列（金额/状态/日期/数量）在 public_attributes 中可找到吗？**
5. 所有属性都有 description 吗？魔鬼数字列是否通过 description 声明了语义？
7. **PE 的 A_anchor 有逻辑意义吗？**（纯 junction FK → 换锚点或升级为独立 LE + PAS）**[规则 6]**
8. **有没有独立业务概念被埋在某 LE 下？**（如 Expense 埋 EventFinance、Power 埋 HeroFeature）→ 拆为独立 LE + 直接 PAS **[规则 7]**
9. **LE description 够丰富吗？**（3-5 词不够——至少包含该 LE 下所有关键字段名和业务语义）**[规则 8]**
10. **所有同名异义的列都被 disambiguate 了吗？**（如三个 `number` 列分属 driver/qualifying/results → 每个必须有 description 说明含义）**[规则 9]**
11. **WHERE / GROUP BY / JOIN 高频列都是 public 吗？**（gender, birth_date, element, bond_type, buildUpPlaySpeed — Agent 能找到但要 2-3 步探索）**[规则 10]**
12. **LE description 用英文写了吗？**（中文 BGE 模型 + 英文查询 → 向量空间不匹配，例名要列全，不能只藏在 private 的 description 里）**[规则 11]**

### 2.10 案例：toxicology — JOIN 键 private + 缺 PAS + 同名列歧义

**问题**：q207 DLR 110K/10步/4次 execute_sql。`atom.element`、`bond.bond_type`、`connected.atom_id/atom_id2` 全是 private，Bond→Atom 无 PAS，LE description 稀疏（3-4 词）。

**修复**：element/bond_type/atom_id/atom_id2 → public；新增 PAS `Bond→Atom`；LE description 英文 + 字段名。效果：110K→43K（-60%）。

**同时发现**：toxicology 已跑 8 题，全部是 strict PASS 或 judge 翻盘 CORRECT——模型"能工作"，但 Agent 额外花 2-3 步探索 private 列。**public/private 不影响正确性，但影响效率（步数×token）。**

### 2.11 案例：formula_1 — 三个同名列 `number` 全无描述

**问题**：q861 "What is his number" → 三范式全 INCORRECT。`drivers.number`（车手号码）、`qualifying.number`（排位名次）、`results.number`（正赛名次）三个同名列 description 全空，Agent 无法区分。

**修复**：evidence 补 `his number refers to drivers.number`；DLR/ER/RDF 三范式为三个 `number` 列补英文 description（"Driver number: permanent race car number, NOT qualifying position" 等）。

**教训**：evidence 是主因，但模型 description 是防线。如果三个 `number` 预先有明确描述，即使 evidence 有歧义，Agent 也能自主选择正确列。

### 2.12 案例：financial — LE description 完全缺失

**问题**：q100 DLR 148K。`LOGICAL.Client`、`LOGICAL.Account`、`LOGICAL.District` **完全没有 `description` 字段**——向量仅 = 实体名（1 词）。问题含 "customers"→debit_card 的 `LOGICAL.Customer`（9 词描述）稳赢。Agent 前 7 步全浪费在错误数据库。

**修复**：三个 LE 补英文 description，`client.gender`/`birth_date`、`district.A2` 升 public。效果：q100 148K→89K（-40%）。

**结论**：**LE description 缺失 = 语义路由随机。** 这是所有问题中最严重的一类——不是效率问题，是正确性问题（Agent 走错库）。

### 2.13 案例：superhero — 例名在 private 不进向量

**问题**：q732 DLR 120K/5次 `dlr_semantic_query`。Agent 搜 "speed"→`LOGICAL.Attribute` 的 LE description 不含这个词（只有 "英雄属性数值"），实际在 `attribute_name` 的 private description 里（"...Speed, Agility 等"）→ 零命中。

**修复**：`power_name`/`attribute_name`/`attribute_value` → public；LE description 改英文，包含例名。效果：120K→56K（-53%）。

**教训**：`dlr_semantic_query` 只搜 LE name+description——private 属性描述再好也进不了向量。LE description 写通用描述如 "英雄属性数值" 不够——必须列出具体例名（"Intelligence, Strength, Speed, Agility"）。

---

## 3. 解析链路

### ER

```
configs/scenarios/ER/*.yaml
    ▼ ERSemanticMapper.parse()
ERScenarioModel (BizEntity / BizAttribute / BizRelation)
    ▼ BuildService.build()
Kuzu 图节点 + FAISS 向量索引
    ▼ MCP 工具暴露
Agent → 语义查询 → execute_sql 查证据
```

### DLR

```
configs/scenarios/DLR/*.yaml
    ▼ DLRSemanticMapper.parse()
DLRScenarioModel (LogicalEntity / PhysicalEntity / PAS / ARCS)
    ▼ BuildService.build()
Kuzu (LE-PE 双层 + INHERITS + PAS) + FAISS
    ▼ MCP 工具暴露 (dlr_semantic_query / recall_pe / recall_pas / ...)
Agent → 语义路由 → execute_sql 查证据
```

### RDF（W3C R2RML + rdflib + SPARQL）

```
SQLite 真实 FK (PRAGMA foreign_key_list)
    ▼ tool&test/generate_r2rml.py（不依赖 DLR 语义）
configs/scenarios/RDF/*.ttl  ← W3C R2RML (Turtle)
    ├─▼ RDFSemanticMapper (rdflib) → ERScenarioModel → Kuzu + FAISS（与 ER 同构对齐召回）
    └─▼ rdf_store.rdf_service → rdflib 内存图 + SPARQL（W3C 标准接口）
```

**映射规则**（生成器）：每表 → `rr:TriplesMap` + `rr:tableName`；主键 → `rr:subjectMap rr:template`；非主键列 → `rr:predicateObjectMap rr:column`；FK（many→one）→ `rr:referencingObjectMap` + `rr:joinCondition`。`sqlite_sequence` 一律排除。

**对比维度**（DLR vs R2RML）：

| 维度 | DLR YAML | R2RML .ttl |
|------|----------|------------|
| Token 开销 | 低（业务概念扁平表达） | 高（嵌套 `predicateObjectMap → objectMap → column`） |
| 多表 JOIN 表达 | PAS 一句话（`P: {verb: generates}`） | `rr:joinCondition` 显式列名 |
| 大模型友好度 | 高（扁平、业务视角） | 低（嵌套、技术视角） |
| 标准接口 | 自定义 HTTP + MCP | **W3C SPARQL Protocol** |

## 4. 存储隔离

各范式 Graph / Vector 物理隔离（`config.paradigm_storage()`），共享同一套 SQLite 物理数据：

```
storage/
├── er/   ├── graph/（Kuzu: BizEntity + RELATED_TO）      └── vector/vector.pkl
├── dlr/  ├── graph/（Kuzu: LE/PE 双层 + PAS + INHERITS）  └── vector/vector.pkl
└── rdf/  ├── graph/（Kuzu: 与 ER 同 schema）              └── vector/vector.pkl
```

- 范式之间隔离；**范式内 11 个库合并**在一个 Kuzu + 一个 vector.pkl 中；
- 每条向量 metadata 带 `db` 字段（所属数据库名）→ 支撑召回锁库（见 §6）；
- RDF 同时持有 rdflib 内存图以支持 SPARQL。

## 5. 核心查询流程

### ER / DLR（FAISS + Kuzu）

```
自然语言问题
  ▼ FAISS 向量召回 Top-K（可选 db 过滤）
候选对象（实体/属性/关系 或 LE/PE/PAS）
  ▼ 实体优先策略 + 置信度过滤（≥ 0.415）
目标实体
  ▼ Kuzu 图谱扩展（属性 + 关联关系 / ARCS 映射）
结构化结果 → MCP 返回物理映射（database_url + 字段）
  ▼ execute_sql（只读）
数据证据 → Final Answer
```

### RDF（FAISS + Kuzu + SPARQL）

```
自然语言问题
  ▼ FAISS 召回（TriplesMap 融合文本：db + 表名 + 列名）
候选类（class_uri）
  ▼ query_rdf_mapping（SPARQL 解析 R2RML）→ {table, columns, relations, database_url}
Agent 写 SQL → execute_sql → Final Answer
```

> RDF 的映射结果只含**物理列名 + JOIN 条件**，无业务语义注释 —— 与 DLR 的 ARCS（业务动词 + 语义补注）形成纯粹对照。

## 6. 召回分库（db-aware recall，2026-07-18）

11 库合并索引存在跨库召回污染（实测 q1472 曾把 Agent 带进错误的库）。机制：

- 构建时每条向量写入 `db` 元数据；`VectorDB.search(query, top_k, db=None)` 传 db 时全量检索后过滤；
- 5 个召回工具（`er/dlr/rdf_semantic_query`、`recall_pe`、`recall_pas`）支持可选 `db` 参数，候选统一带 `db` 字段；
- **Agent 不预先知道 db_id**：首跳全局召回，从候选 db 分布判断归属库（= 语义路由定位库），锁库后传 `db` 防漂移（规则见 `OC-based Agent Service/AGENTS.md` Step 1）。

## 7. MCP 工具

设计原则：三范式统一 `*_semantic_query` 入口，返回各自建模核心概念，**第一跳完全屏蔽物理信息**（物理表/字段/database_url 只在第二跳映射工具暴露；`db` 库名属语义路由信息，不在屏蔽之列）。

| 范式 | 入口 | 返回容器 | 第二跳映射工具 |
|------|------|---------|---------------|
| ER | `er_semantic_query` | `data.entities[]`（entity_id, name, description, db） | `get_entity_mapping(entity_id)` |
| DLR | `dlr_semantic_query` | `data.structures[]`（LE-PE 复合, db） | `get_pe_full(pe_id)` ★ |
| RDF | `rdf_semantic_query` | `data.classes[]`（class_uri, name, description, db） | `query_rdf_mapping(class_uri)` |

### ER 工具（11 + 1 共享）

| Tool | 参数 | 语义 |
|------|------|------|
| `er_semantic_query` | `question, top_k=20, db?` | 语义召回 → 实体（扁平，候选带 db） |
| ~~`list_entities`~~ / ~~`list_relations`~~ | — | **已禁用** — 全量枚举绕过语义召回 |
| `get_entity` / `get_entity_attributes` / `get_entity_relations` | `entity_id` | 实体详情 / 属性 / 关系 |
| `get_entity_mapping` | `entity_id` | 物理映射（database_url + 表 + 字段） |
| `find_shortest_path` | `from_id, to_id` | 两实体最短路径 |
| `list_all_tables` | `db` | 已注册实体表（支持 db 过滤） |
| `get_table_schema` | `table_id` | 任意物理表结构 |
| `summary` | — | 知识库摘要 |

### DLR 工具（21 + 1 共享）

| Tool | 参数 | 语义 |
|------|------|------|
| `dlr_semantic_query` | `question, top_k, threshold, db?` | 语义召回 → LE-PE 结构体 |
| `recall_pe` / `recall_pas` | `question, top_k, threshold, db?` | 召回 PE / PAS |
| ~~`list_le`~~ / ~~`list_pe`~~ / ~~`list_pas`~~ | — | **已禁用** — 全量枚举，此前 list_le/list_pe 已移除，list_pas 2026-08-02 禁用 |
| `get_le` / `get_le_attrs` / `get_le_children` / `get_le_pas` | `le_id` | LE 详情/属性/子PE/PAS |
| **`get_pe_full`** ★ | `pe_id` | **PE 详情+属性+ARCS+database_url 一次调用** |
| `get_pe_parent` / `get_pas` / `get_pas_by_le` | id | 导航 |
| `path_le_le` / `path_pe_pe` | 两 id | 最短路径 |
| `is_le` / `is_pe` / `is_arcs` / `is_same_le` | id | 判定 |
| ~~`schema`~~ | — | **已禁用** — 全量 dump LE+PE+PAS（q116 实测 37KB） |

### RDF 工具（7 + 1 共享）

| Tool | 参数 | 语义 |
|------|------|------|
| `rdf_semantic_query` | `question, top_k=20, db?` | 语义召回 → 类 |
| `query_rdf_mapping` | `class_uri` | R2RML 映射（列+JOIN+database_url） |
| ~~`rdf_classes`~~ / ~~`rdf_predicates`~~ | — | **已禁用** — 全量枚举 class/predicate URI |
| `rdf_search` | `q, limit` | 文本搜索三元组 |
| `rdf_serialize` | `format` | 序列化（W3C） |
| `rdf_sparql` | `query` | SPARQL（W3C） |

### 共享工具

| Tool | 参数 | 语义 |
|------|------|------|
| `execute_sql` | `sql, database_url` | 薄透传只读 SQL 执行——唯一 SQL 路径。`database_url` 必须来自第二跳映射工具返回 |

> 范式专属工具仅在对应 `--paradigm` 启动时注册（服务端按 `_mapping_type` 隔离），Agent 无需预知范式。

## 8. 可视化

三范式各自静态页面，共享 macaron 10 色调色板：
`['#FFB5BA','#FFDAB9','#FFF6CC','#C1E6C6','#A8E6CF','#B5EAD7','#C7CEEA','#E0BBE4','#FEC8D8','#FFDFD3']`

| 范式 | 页面 | 可视化内容 | 物理引擎 |
|------|------|-----------|----------|
| ER | `static/er.html` | 马卡龙圆形实体 + 灰色属性点 + RELATED_TO 蓝边 | barnesHut −800 |
| DLR | `static/dlr.html` | LE 马卡龙圆 + PE 浅蓝矩形 + PAS 绿色双向边 + INHERITS 紫虚线 | barnesHut −1800 |
| RDF | `static/rdf.html` | Plan-A 映射图：TriplesMap 马卡龙矩形 + 字段蓝点 + JOIN 橙边 | barnesHut −800 |

**解读**：ER 圆最多最密（扁平无层级）；DLR 双层圆套矩形 + 动词边（业务语义最丰富）；RDF 矩形 + JOIN 边（纯物理层，"有结构但干瘪"）。三页调同一 Kuzu+FAISS 后端，把建模范式差异变成可看的结构差异。

> RDF 为什么不用 triples 图：底层 4800+ 三元组全是 R2RML 本体层元数据（`rr:subjectMap` 等），直接展示不可读；Plan-A 用 SPARQL 解析成「物理表+字段+JOIN」结构，与 ER/DLR 视觉同构。

**三范式可视化截图：**

ER — 扁平实体+关系图：

![ER 可视化](https://raw.gitcode.com/user-images/assets/10360544/b1245627-aa2f-4b54-9d68-1c9a24919d86/image.png 'image.png')

DLR — LE/PE 双层 + PAS 语义路由 + INHERITS：

![DLR 可视化](https://raw.gitcode.com/user-images/assets/10360544/d9e5a122-6a46-4eca-8f60-7cc2697e9ce6/image.png 'image.png')

RDF — TriplesMap 映射 + JOIN 关系：

![RDF 可视化](https://raw.gitcode.com/user-images/assets/10360544/991cdea4-acdf-40c3-9768-eb7565a2c7ff/image.png 'image.png')
