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

## 2. 解析链路

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

## 3. 存储隔离

各范式 Graph / Vector 物理隔离（`config.paradigm_storage()`），共享同一套 SQLite 物理数据：

```
storage/
├── er/   ├── graph/（Kuzu: BizEntity + RELATED_TO）      └── vector/vector.pkl
├── dlr/  ├── graph/（Kuzu: LE/PE 双层 + PAS + INHERITS）  └── vector/vector.pkl
└── rdf/  ├── graph/（Kuzu: 与 ER 同 schema）              └── vector/vector.pkl
```

- 范式之间隔离；**范式内 11 个库合并**在一个 Kuzu + 一个 vector.pkl 中；
- 每条向量 metadata 带 `db` 字段（所属数据库名）→ 支撑召回锁库（见 §5）；
- RDF 同时持有 rdflib 内存图以支持 SPARQL。

## 4. 核心查询流程

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

## 5. 召回分库（db-aware recall，2026-07-18）

11 库合并索引存在跨库召回污染（实测 q1472 曾把 Agent 带进错误的库）。机制：

- 构建时每条向量写入 `db` 元数据；`VectorDB.search(query, top_k, db=None)` 传 db 时全量检索后过滤；
- 5 个召回工具（`er/dlr/rdf_semantic_query`、`recall_pe`、`recall_pas`）支持可选 `db` 参数，候选统一带 `db` 字段；
- **Agent 不预先知道 db_id**：首跳全局召回，从候选 db 分布判断归属库（= 语义路由定位库），锁库后传 `db` 防漂移（规则见 `OC-based Agent Service/AGENTS.md` Step 1）。

## 6. MCP 工具

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

## 7. 可视化

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
