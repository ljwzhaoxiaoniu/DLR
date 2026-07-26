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

> **适用场景**：一个业务概念对应一张主表 + 多张碎片化维度表/子表，需要聚合成统一的业务视图。核心原则：**一个 LE = 一个真实业务概念**，通过 PE 的聚合实现"碎表集中"——这是 DLR 区分于 ER/RDF 的核心优势。但聚合密度高的前提是每个 PE 的锚定键和关键属性暴露给 LE（public），否则 Agent 找不到落脚点。
>
> 从 superhero + debit_card 建模修复总结（2026-07-25）。

### 2.1 PE 聚合规则：ARCS 还是 PAS？

问题：物理表何时作为 PE 并入同一个 LE（ARCS），何时拆为独立 LE（PAS）？

**规则 1：FK 在主表上的 1:1 维度查表 → ARCS，PE 直挂主 LE**

```
superhero 表有 eye_colour_id, race_id, gender_id, …
         ↓ FK 长在主表上, 1:1 查维度
    colour, race, gender, publisher, alignment
         ↓ 全部挂为 LOGICAL.Superhero 的 PE（ARCS）
```

这是 DLR "碎表集中"的核心优势——物理上碎片化的维度表对 Agent 透明，Agent 看到的是一棵完整的业务实体树。

**规则 2：Junction 表（多对多）→ 拆为独立 LE，PAS 关联**

```
superhero ──N:1── hero_power ──1:N── superpower
                  ↑ junction, 主表被引用
→ LOGICAL.Power (独立 LE, hero_power + superpower)
→ PAS: Superhero ──possesses──→ Power  (A: HeroID, 1:N / N:1)
```

特征：主表被 junction 表**引用**（`hero_power.hero_id → superhero.id`），不是主表主动指向 junction。这种反向引用必须拆独立 LE。PAS 提供语义层关联，两面都可导航。

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

**物理设计**：`disp` 是 client↔account 的纯 junction 表，`district` 是统计维表（A2-A16 魔鬼数字列）。旧 DLR 建模把 disp 提升为独立 LE `AccountRelation`，District 又设为孤立 LE，三条 PAS 绕了 Agent 两跳还找不到北。

**问题**：
- `disp` 被建模为独立 `LOGICAL.AccountRelation`——它没有业务意义，Agent 绕路
- `District` 无 PAS 连接到 Client/Account，虽 FK 存在但语义路由断链
- A* 列全为魔鬼数字（A11=平均工资），无描述无法召回

**修复**：
- `DistrictID` 升为 Client 和 Account 的 public attribute，补 PAS `Client→District` 和 `District→Account`
- A11-A15 补英文 description
- 后续可进一步将 disp 吸收为 Account 的 PE

**效果**：Agent 现在能从 Client 直接导航到 District，q94 的 gap 计算全部取对（4431）。

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

### 2.8 检查清单

1. 每个 LE 在实体世界有对应概念吗？（没有则拆；纯 junction 表下沉为 PE）
2. FK 在主表上（→ ARCS）还是被引用（→ PAS）？
3. PAS 的 `A` 锚定键在源 LE 端有 public_attributes 条目吗？
4. junction PE 的连接键升为所属 LE 的 public 了吗？
5. 业务核心度量列在 public_attributes 中可找到吗？
6. 所有属性都有 description 吗？

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
| `list_entities` / `list_relations` | — | 列出实体 / 关系 |
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
| `list_le(keyword)` / `list_pe` / `list_pas` | — | 列表 |
| `get_le` / `get_le_attrs` / `get_le_children` / `get_le_pas` | `le_id` | LE 详情/属性/子PE/PAS |
| **`get_pe_full`** ★ | `pe_id` | **PE 详情+属性+ARCS+database_url 一次调用** |
| `get_pe_parent` / `get_pas` / `get_pas_by_le` | id | 导航 |
| `path_le_le` / `path_pe_pe` | 两 id | 最短路径 |
| `is_le` / `is_pe` / `is_arcs` / `is_same_le` | id | 判定 |
| `schema` | — | 完整 schema |

### RDF 工具（7 + 1 共享）

| Tool | 参数 | 语义 |
|------|------|------|
| `rdf_semantic_query` | `question, top_k=20, db?` | 语义召回 → 类 |
| `query_rdf_mapping` | `class_uri` | R2RML 映射（列+JOIN+database_url） |
| `rdf_classes` / `rdf_predicates` | — | 列出类 / 谓词 |
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
![ER 可视化](https://raw.gitcode.com/user-images/assets/10360544/5c2b3bfb-acb8-463b-a5a8-0cf7026ac437/image.png)

![ER 可视化 2](https://raw.gitcode.com/user-images/assets/10360544/6c684b8a-36a9-417d-a4d4-f98748d5a3ce/image.png)

DLR — LE/PE 双层 + PAS 语义路由 + INHERITS：
![DLR 可视化](https://raw.gitcode.com/user-images/assets/10360544/fb65f5f9-7135-4796-8b15-e127f10d941a/image.png)

RDF — TriplesMap 映射 + JOIN 关系：
![RDF 可视化](https://raw.gitcode.com/user-images/assets/10360544/5a98b0b2-1141-45e2-9c99-3d159028305e/image.png)
