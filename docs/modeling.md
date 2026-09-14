# 三范式建模说明 — 对准测试

> **本文回答**：同一份数据集（mini_dev 11 库 500 题），**三个范式怎么以同等颗粒度被建模、被使用**，从而让"建模结构"成为唯一变量。
>
> **配套文档**：
> - [modeling-guide-dlr.md](modeling-guide-dlr.md) —— **DLR 建模指南**（原创范式的详细版与前置：设计本体 / 规则 / 案例 / 新库接入）
> - [semantic-layer-build.md](semantic-layer-build.md) —— yaml/ttl → Kuzu/FAISS 的**字段级写入链路**（哪些进图、哪些进向量、文本模板）
> - [runbook.md](runbook.md) —— 怎么跑、怎么归档、故障怎么办

---

## 1. 评测口径：为什么要"同等颗粒度"

评测目标是**三范式同构对比**——同一个 Agent、同一套规则、同一套基础设施，**建模是唯一自变量**。

这要求语义底座满足一条硬约束：

> **描述逐字一致、知识等价、唯一变量 = 关联结构**。

于是三范式对同一份数据集的"吸收颗粒度"必须对齐到**列级**：

| 颗粒度 | 要求 | 现状 |
|---|---|---|
| **列级描述** | 三范式同词同义（同一列的 name / description 文本逐字一致） | ✅ ER 798 / RDF 798 逐表属性名 75/75 完全一致；DLR 非 public 列 547 处逐字一致，public 列保留 LE 业务语义（**DLR 的被测变量**） |
| **列级物理类型** | 三范式一致落 `data_type` | ✅ 三范式均从物理扫描补全 |
| **列级 id** | 三范式同构（`db.table.col`，不带引号） | ✅ DLR 09-11 去引号后与 ER 同构；RDF 09-10 修复前缀 |
| **表级/类级描述** | 各自形态 | ER 表级语义描述 / DLR LE 业务描述 / RDF 结构性占位 —— 形态差异是**被测变量**，不抹平 |
| **知识层** | 三范式共用同一份 RAG 知识与同一份 SOP | ✅ 同一 `rag_knowledge/*.jsonl` + 同一份 `skills/*.md`，三范式同等开放 |

> **不抹平的差异**（被测变量，08-27 定调）：入口面形态（ER 实体 / DLR LE / RDF class）、向量文本组成、召回力学。见 §5。

---

## 2. 范式定位

| 范式 | 全称 | 设计理念 | 角色 | 模型 |
|------|------|----------|------|------|
| **★ DLR** | Decoupled Logic Representation | 逻辑-物理解耦 | **原创核心范式** | LE / PE / PAS / ARCS |
| **ER** | Entity-Relationship | 传统实体-关系建模 | 自研对比基线 | BizEntity / BizAttribute / BizRelation |
| **RDF** | Resource Description Framework | W3C R2RML + SPARQL | W3C 标准对照基线 | rr:TriplesMap / rr:predicateObjectMap |

**DLR 缩写**：LE（LogicalEntity，业务概念层）/ PE（PhysicalEntity，类视图概念，经 ARCS 锚定物理库）/ PAS（LE 间语义路由）/ ARCS（PE 到物理库的锚定）。
→ 设计本体与建模规则见 [modeling-guide-dlr.md](modeling-guide-dlr.md)。

**命名约束**：LE/PE id（`LOGICAL.*` / `PHYSICAL.*`）不带库前缀，因此**必须全局唯一**——构建期由 `BuildConflictError` 强制（同 id 映射不同物理表 → 中止 build）。历史教训：`PHYSICAL.Card`/`PHYSICAL.Race` 曾跨库重名导致 Kuzu 静默覆盖，已分别改名 `PHYSICAL.CreditCard`（financial）/`PHYSICAL.HeroRace`（superhero）。

---

## 3. 数据集怎么被使用（三范式一致）

| 字段 | 原用法 | 本项目用法 |
|------|--------|-----------|
| `question` | 拼 prompt | **唯一输入** —— prompt 就是裸句 `Question: …` |
| `evidence` | prompt 注入 | → **Ch2 RAG**（`rag_knowledge/*.jsonl` 聚合，按术语→列/值映射）；Agent 须主动 `search_evidence` |
| `SQL`（gold） | 评判标准 | → Stage 0 预算成 `00_golden_cache.json`；**保持数据集原始**，缺陷题由 judge 仲裁 |
| `db_id` | 直接给 Agent | **不给 Agent** —— 定位库是语义层的职责（语义路由），Stage 2 重放定库 |
| `difficulty` | N/A | → Ch3 SOP 的触发器（简单题不必加载） |

### Prompt 铁律

1. **脚本只传 `Question: ...`**（纯 question，2026-08-25 起）——禁止在脚本塞任何指令（工具推荐 / 禁 bash / 输出格式）
2. **所有 Agent 行为规则只写 `AGENTS.md`**（唯一规则入口，三范式共用）
3. **Agent 不拿 db_id**——语义路由是被考察能力

---

## 4. 三范式建模作业（同级同颗粒度）

三套配置各 11 份，位置：

```
Semantic Core Service/configs/scenarios/
├── ER/{db}.yaml       # 手工撰写（脚本辅助：tmp_scripts/absorb_csv_desc_into_er.py 幂等吸收 CSV 描述）
├── DLR/{db}.yaml      # 手工撰写（原创范式，规范见 modeling-guide-dlr.md）
└── RDF/{db}.ttl       # tool&test/generate_r2rml.py 生成（FK 驱动），再由对齐批写 label/comment
```

### 4.1 ER（`ER/{db}.yaml`）

**形态**：表 → 实体，列 → 属性，FK → 关系。扁平、字段级全吸收（yaml 写什么，图里存什么）。

```yaml
mapping_type: er
version: '1.0'
scenario_name: card_games
description: Auto-generated from dev_tables.json for card_games
databases:
  card_games: sqlite:///../MINIDEV_sqlite/dev_databases/card_games/card_games.sqlite
entities:
- entity_id: card_games.cards              # db.table
  biz_name: cards
  description: '...'                        # 表级语义描述（补题面术语）
  physical_table_id: card_games.cards
  attributes:
  - attr_id: card_games.cards.artist        # db.table.col
    biz_name: artist                        # = CSV column_name（252 处对齐）
    description: The name of the artist...  # = CSV column_description + value_description 原文
    physical_column_id: card_games.cards.artist
    data_type: text
relations:
- relation_id: card_games.legalities_TO_cards
  biz_name: legalities_to_cards
  from_entity_attr_id: card_games.legalities.uuid
  to_entity_attr_id: card_games.cards.uuid
  description: legalities.uuid -> cards.uuid
```

**撰写规范**

| 项 | 规则 |
|---|---|
| 实体粒度 | **物理表 = 实体**（不做聚合、不拆子对象）—— 这是 ER 的形态，与 DLR/RDF 对照的基准 |
| `entity_id` / `attr_id` | `db.table` / `db.table.col`，不带引号 |
| `biz_name`（列） | 取 CSV `column_name` |
| `description`（列） | **数据集 `database_description/*.csv` 的 `column_description` + `value_description` 原文**（含 `commonsense evidence:` 段），不自行扩写 |
| `description`（表） | 表级语义描述，补齐题面术语 |
| `relations` | **严格等于 `dev_tables.json` 的 foreign_keys**——不自造关系（debit_card 曾有 3 条自造，已剔） |
| `data_type` | 由物理扫描补，不手写 |

> **幽灵列**：`formula_1.constructors.wins` 在 CSV 有、sqlite/dev_tables 无，未吸收（待裁定）。

### 4.2 DLR（`DLR/{db}.yaml`）

**形态**：物理表 → PE 视图 → LE 业务实体；LE 间 PAS 路由。**唯一带"业务层"的范式**——LE description 与 public 属性承载业务聚合语义，这是 DLR 的被测变量。

```yaml
logical_entities:
- logical_entity_id: LOGICAL.Card
  biz_name: Card
  description: Individual card entity with attributes, printings, and game mechanics
  physical_entities:
  - physical_entity_id: PHYSICAL.Card
    physical_table_name: cards
    physical_table_id: card_games.cards
    A: {cardinality: '1:1', key: uuid}
    R: null
    S: Card attributes
    attributes:
    - column: card_games.cards.uuid
      biz_name: CardID
      description: ...
      public: true
pas_relations:
- relation_id: LOGICAL.CardSet_TO_LOGICAL.Card
  relation_name: Contains
  P: {forward: {verb: contains, cardinality: 1:N}, reverse: {verb: belongs to, cardinality: '1:1'}}
  A: SetID
  S: 1 set contains N cards
```

**规则速查**（完整规范、决策树、七个实战案例 → [modeling-guide-dlr.md](modeling-guide-dlr.md)）

1. **LE 必须有业务生命周期**（纯 junction / 维表下沉为 PE）—— 第一原则
2. FK 在主表上 → ARCS；主表被引用 / 有生命周期 → 独立 LE + PAS
3. `PAS.A` 落在**两侧之一**的 public 面名字上
4. 核心度量列（金额/状态/日期）升 public
5. junction PE 的连接键升 public（否则 PAS 源端断头）
6. `A_anchor` 锚到有逻辑意义的 FK
7. 独立业务概念升独立 LE
8. **LE description = 语义路由质量的唯一信号**（`semantic_query` 只返回 LE）
9. 同名异义列必须 disambiguate
10. WHERE/GROUP BY/JOIN 高频列升 public（影响效率不影响正确性）
11. LE description 用英文，例名要列全

**描述来源**：非 public 列 = CSV 原文（与 ER 对齐）；public 列 = LE 业务语义（**有意不动**）。

### 4.3 RDF（`RDF/{db}.ttl`）

**形态**：W3C R2RML。每表一个 `rr:TriplesMap`，主键 → `subjectMap`，列 → `predicateObjectMap`，FK → `parentTriplesMap` + `joinCondition`。

```turtle
<http://example.org/tm/card_games/cards> a rr:TriplesMap ;
    rr:logicalTable [ rr:tableName "cards" ] ;
    rr:subjectMap [ rr:template "http://example.org/card_games/{id}" ; rr:class ex:cards ] ;
    rr:predicateObjectMap [ rr:predicate <http://example.org/cards/artist> ;
        rr:objectMap [ rr:column "artist" ; rr:datatype xsd:string ] ;
        rdfs:label "artist"@en ;                      # ← 索引 name（= ER biz_name）
        rdfs:comment "The name of the artist..."@en ] ;  # ← 索引 description（= ER 原文）
    rr:predicateObjectMap [ rr:predicate <http://example.org/foreign_data/refers_to_cards> ;
        rr:objectMap [ rr:parentTriplesMap <http://example.org/tm/card_games/cards> ;
                       rr:joinCondition [ rr:child "uuid" ; rr:parent "uuid" ] ] ] .
```

**生成与撰写规范**

| 项 | 规则 |
|---|---|
| 生成 | `python "tool&test/generate_r2rml.py" --sqlite-dir <MINIDEV>/dev_databases --output-dir configs/scenarios/RDF` —— **FK 驱动**（读 SQLite 真实 FK），不依赖 DLR 语义 |
| `rr:class` | `ex:{table}` → 实体 id = class IRI（**非表名**，与 ER 的 `db.table` 不同） |
| `rr:template` | 主键列 → subject URI 模板 |
| `rr:joinCondition` | FK 的 `child`/`parent` 列；**关系描述与 relation_id 由它派生**（09-11 起，与 ER 同格式） |
| `rdfs:label` | = ER `biz_name`（09-11 起索引 name 走它；缺失才回退 predicate slug） |
| `rdfs:comment` | = ER 列 `description` 原文（09-10 起进 Kuzu 与向量） |
| `sqlite_sequence` | 一律排除 |

> **不合成的关系**：`League.country_id → Country.id`（ER 有、ttl 无）——"有的对齐，没有的不硬挂"。
> **RDF 的双通路**：build 期 Kuzu+FAISS（与 ER 同 schema）+ serve 期 rdflib 映射定义图（供 SPARQL / `get_rdf_mapping`）。详见 [semantic-layer-build.md](semantic-layer-build.md) §3。

### 4.4 三范式配置对照

| | ER | DLR | RDF |
|---|---|---|---|
| 配置文件 | `ER/{db}.yaml` | `DLR/{db}.yaml` | `RDF/{db}.ttl` |
| 撰写方式 | 手工（脚本辅助） | 手工 | 生成器 + 对齐批 |
| 顶层对象 | 实体（表） | LE（业务实体） | TriplesMap（class） |
| 列级 name 来源 | CSV `column_name` | public=业务名 / 非 public=CSV | `rdfs:label` = ER biz_name |
| 列级 description 来源 | CSV 原文 | public=业务语义 / 非 public=CSV 原文 | `rdfs:comment` = ER 原文 |
| 关联表达 | `relations`（dataset FK） | ARCS（同 LE 内）+ PAS（跨 LE） | `parentTriplesMap` + `joinCondition` |
| 实体 id 形态 | `db.table` | `LOGICAL.*` / `PHYSICAL.*`（全局唯一） | class IRI |
| 属性条数（全库） | 798 | 792 | 798 |

---

## 5. 公平性约束与记账

### 5.1 三范式的召回面（08-27 定调）

每个范式的 `*_semantic_query` 都以**该范式的顶层语义对象**为召回入口，底层命中处理各不相同：

| 范式 | 召回入口 | 底层命中处理 | 列级信息的到达通路 |
|---|---|---|---|
| ER | 实体 | 实体命中直接输出；关系命中共振；属性命中**fallback**（无实体命中才反推） | 属性向量（列名 + CSV 原文） |
| DLR | **LE（仅 LE）** | 属性/PE/PAS 命中**有意丢弃** | **LE 融合向量**（LE 描述 + 全部 public attrs 拼入） |
| RDF | **class（仅 class）** | 属性命中**有意丢弃** | **实体融合向量**（整表列名 + comment 压进一条入口） |

**为什么公平**：入口面 = 各范式语义面（agent 拿到的正是各范式顶层导航对象，与后续工具链无缝衔接）；每个范式**都有**从题面术语到列级语义的通路，无一方被剥夺。

**保留的形态差异（被测变量，不抹平）**：
- ER 属性 fallback vs DLR/RDF 的丢弃 —— 召回力学差异，与各自入口向量丰度互补（ER 入口瘦、兜底在属性层；DLR/RDF 入口胖、无需兜底）
- DLR 14 个探索类工具已禁注册（使用率 <5% 且诱发过度探索）
- RDF 的 SPARQL 定位为**逃生舱**：R2RML 只做映射内省、从不物化数据三元组（归档 30 题 0 次使用是理性冗余）

### 5.2 旋钮对称

db 过滤、VectorDB 检索机制、`top_k`（三范式统一 **10**）、阈值策略 —— 三范式共享同一套。

### 5.3 必须记的两笔账

**① 物理列 id 三范式同构**：ER/RDF 一直无引号，DLR 早期带引号（`frpm."Academic Year"`）→ 09-11 已去引号（37 列）。现 **DLR id ∩ ER = 792/798，DLR 无 ER 之外的 id**。
> 副作用：DLR 的 `physical_column_id` 不自带引号，含空格/括号的列写 SQL 需自行加引号——与 ER/RDF 同等要求。

**② DLR 未覆盖 3 表 6 列**（有意"不硬挂"，非缺陷但必须记账）：

| 未覆盖 | 列 |
|---|---|
| european_football_2.Country | id, name |
| formula_1.seasons | url, year |
| formula_1.status | statusId, status |

即 **DLR 792 vs ER/RDF 798** 的差额，叙述时不能当作全覆盖。

**③ 图与向量应 1:1**：三范式均为 1:1（RDF 关系 101 / ER 102；DLR 792/792）。

### 5.4 知识分层与准入（四层）

表/列属性就在物理 schema 里；YAML 的原始依据是 `dev_tables.json` + 语义补充，DLR/R2RML 均以 ER 为基础——**三范式语义层同源**，YAML 只承载"必要的语义说明"。

**Ch1/Ch2 非必要不增加**——对它们的每次增改都是对评测环境（数据集原生语义）的修改，加多了三范式对比失真。**结果驱动的知识只经 Ch3 一个阀门准入**：

- 绕路按根因定性：**实体/关系建模造成召回冲突 → Ch3 补业务逻辑消歧条目**（q1521 首例）；纯执行效率问题不构成准入
- Ch3 条目**事后准入**：agent 搞不定 / 结果不确定 / 题目错误才进；没有条目的题 = 干净实验组
- **不写 SQL 成品 / few-shot 模板**（模板挖空题面即答案 95%）
- 判定顺序：judge 侧 `disputes > SkillPath(SOP) > KnowledgePath(rag) > evidence 字面`；Agent 侧 = Ch3 严格命中即为最权威，无命中不预设优先级

---

## 6. 解析链路

```
ER:   configs/scenarios/ER/*.yaml   → ERSemanticMapper.parse()  → ERScenarioModel  → BuildService.build() → Kuzu + FAISS
DLR:  configs/scenarios/DLR/*.yaml  → DLRSemanticMapper.parse() → DLRScenarioModel → BuildService.build() → Kuzu + FAISS
RDF:  SQLite 真实 FK (PRAGMA foreign_key_list)
        → tool&test/generate_r2rml.py → configs/scenarios/RDF/*.ttl
        ├─ RDFSemanticMapper (rdflib) → ERScenarioModel → Kuzu + FAISS（与 ER 同构对齐召回）
        └─ rdf_store.rdf_service → rdflib 内存图 + SPARQL（W3C 标准接口）
```

**R2RML 映射规则**：每表 → `rr:TriplesMap` + `rr:tableName`；主键 → `rr:subjectMap rr:template`；非主键列 → `rr:predicateObjectMap rr:column`；FK（many→one）→ `rr:parentTriplesMap` + `rr:joinCondition`。`sqlite_sequence` 一律排除。

**对比维度（DLR vs R2RML）**

| 维度 | DLR YAML | R2RML .ttl |
|------|----------|------------|
| Token 开销 | 低（业务概念扁平表达） | 高（嵌套 `predicateObjectMap → objectMap → column`） |
| 多表 JOIN 表达 | PAS 一句话 | `rr:joinCondition` 显式列名 |
| 大模型友好度 | 高（扁平、业务视角） | 低（嵌套、技术视角） |
| 标准接口 | 自定义 HTTP + MCP | **W3C SPARQL Protocol** |

---

## 7. 存储隔离

各范式 Graph / Vector 物理隔离（`config.paradigm_storage()`），共享同一套 SQLite 物理数据：

```
Semantic Core Service/storage/
├── er/   ├── graph/（Kuzu: BizEntity + RELATED_TO）        └── vector/vector.pkl
├── dlr/  ├── graph/（Kuzu: LE/PE 双层 + PAS + INHERITS）    └── vector/vector.pkl
└── rdf/  ├── graph/（Kuzu: 与 ER 同 schema）                └── vector/vector.pkl
```

- 范式之间隔离；**范式内 11 个库合并**在一个 Kuzu + 一个 vector.pkl 中
- 每条向量 metadata 带 `db` 字段（所属库名）→ 支撑召回锁库（见 §9）
- RDF 同时持有 rdflib 内存图以支持 SPARQL

---

## 8. 核心查询流程

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
  ▼ FAISS 召回（TriplesMap 融合文本：db + 表名 + 列名 + comment）
候选类（class_uri）
  ▼ get_rdf_mapping（SPARQL 解析 R2RML）→ {table, columns, relations, database_url}
Agent 写 SQL → execute_sql → Final Answer
```

> RDF 的映射结果只含**物理列名 + JOIN 条件**，无业务语义注释 —— 与 DLR 的 ARCS（业务动词 + 语义补注）形成纯粹对照。

---

## 9. 召回分库（db-aware recall，2026-07-18）

11 库合并索引存在跨库召回污染（实测 q1472 曾把 Agent 带进错误的库）。机制：

- 构建时每条向量写入 `db` 元数据；`VectorDB.search(query, top_k, db=None)` 传 db 时全量检索后过滤
- 3 个召回工具（`er/dlr/rdf_semantic_query`）支持可选 `db` 参数，候选统一带 `db` 字段
- **Agent 不预先知道 db_id**：首跳全局召回，从候选 db 分布判断归属库（= 语义路由定位库），锁库后传 `db` 防漂移

---

## 10. MCP 工具

设计原则：三范式统一 `*_semantic_query` 入口，返回各自建模核心概念，**第一跳完全屏蔽物理信息**（物理表/字段/database_url 只在第二跳映射工具暴露；`db` 库名属语义路由信息，不在屏蔽之列）。

| 范式 | 入口 | 返回容器 | 第二跳映射工具 |
|------|------|---------|---------------|
| ER | `er_semantic_query` | `data.entities[]`（entity_id, name, description, db） | `get_entity_mapping(entity_id)` |
| DLR | `dlr_semantic_query` | `data.structures[]`（LE-PE 复合, db） | `get_pe_mapping(pe_id)` ★ |
| RDF | `rdf_semantic_query` | `data.classes[]`（class_uri, name, description, db） | `get_rdf_mapping(class_uri)` |

### ER 工具（9 + 1 共享；`er_search_evidence` 属 Ch2）

| Tool | 参数 | 语义 |
|------|------|------|
| `er_semantic_query` | `question, top_k=10, db?` | 语义召回 → 实体（扁平，候选带 db） |
| ~~`list_entities`~~ / ~~`list_relations`~~ | — | **已禁用** — 全量枚举绕过语义召回 |
| `get_entity` / `get_entity_attributes` / `get_entity_relations` | `entity_id` | 实体详情 / 属性 / 关系 |
| `get_entity_mapping` | `entity_id` | 物理映射（database_url + 表 + 字段） |
| `find_shortest_path` | `from_id, to_id` | 两实体最短路径 |
| ~~`list_all_tables`~~ | — | **已禁用** — 全量 dump；`get_table_schema` 仍可查任意物理表 |
| `get_table_schema` | `table_id` | 任意物理表结构 |
| `summary` | — | 知识库摘要 |

### DLR 工具（4 + 1 共享；2026-09-01 起注册核心 4 个）

| Tool | 参数 | 语义 |
|------|------|------|
| `dlr_semantic_query` | `question, top_k, threshold, db?` | 语义召回 → LE-PE 结构体 |
| `dlr_search_evidence` | `namespace, question, top_k` | Ch2 证据检索 |
| **`get_pe_mapping`** ★ | `pe_id` | **PE 详情 + 属性 + ARCS + database_url 一次调用** |
| `get_le_attrs` | `le_id` | LE 属性（public 面） |
| ~~`recall_pe`~~ / ~~`recall_pas`~~ / ~~`list_le`~~ / ~~`list_pe`~~ / ~~`list_pas`~~ / ~~`schema`~~ | — | **已禁注册** — 使用率 <5% 且诱发过度探索 |

### RDF 工具（6 + 1 共享）

| Tool | 参数 | 语义 |
|------|------|------|
| `rdf_semantic_query` | `question, top_k=10, db?` | 语义召回 → 类 |
| `get_rdf_mapping` | `class_uri` | R2RML 映射（列 + JOIN + database_url） |
| ~~`rdf_classes`~~ / ~~`rdf_predicates`~~ | — | **已禁用** — 全量枚举 |
| `rdf_search` | `q, limit` | 文本搜索三元组 |
| `rdf_serialize` | `format` | 序列化（W3C） |
| `rdf_sparql` | `query` | SPARQL（W3C，定位=逃生舱） |

### 共享工具

| Tool | 参数 | 语义 |
|------|------|------|
| `execute_sql` | `sql, database_url` | 薄透传只读 SQL 执行——唯一 SQL 路径。`database_url` 必须来自第二跳映射工具返回 |

> 范式专属工具仅在对应 `--paradigm` 启动时注册（服务端按 `_mapping_type` 隔离），**Agent 无需预知范式**。

---

## 11. 可视化

三范式各自静态页面，共享 macaron 10 色调色板：
`['#FFB5BA','#FFDAB9','#FFF6CC','#C1E6C6','#A8E6CF','#B5EAD7','#C7CEEA','#E0BBE4','#FEC8D8','#FFDFD3']`

| 范式 | 页面 | 可视化内容 | 物理引擎 |
|------|------|-----------|----------|
| ER | `static/er.html` | 马卡龙圆形实体 + 灰色属性点 + RELATED_TO 蓝边 | barnesHut −800 |
| DLR | `static/dlr.html` | LE 马卡龙圆 + PE 浅蓝矩形 + PAS 绿色双向边 + INHERITS 紫虚线 | barnesHut −1800 |
| RDF | `static/rdf.html` | Plan-A 映射图：TriplesMap 马卡龙矩形 + 字段蓝点 + JOIN 橙边 | barnesHut −800 |

**解读**：ER 圆最多最密（扁平无层级）；DLR 双层圆套矩形 + 动词边（业务语义最丰富）；RDF 矩形 + JOIN 边（纯物理层，"有结构但干瘪"）。三页调同一 Kuzu+FAISS 后端，把建模范式差异变成可看的结构差异。

> RDF 为什么不用 triples 图：底层三元组全是 R2RML 本体层元数据（`rr:subjectMap` 等），直接展示不可读；Plan-A 用 SPARQL 解析成「物理表 + 字段 + JOIN」结构，与 ER/DLR 视觉同构。
