# DLR Proj（Decoupled Logic Representation）— 逻辑与物理解耦的语义建模

> 让 Agent 用自然语言查询 mini_dev 数据库 —— 逻辑与物理解耦的语义建模、双引擎检索、MCP 集成。

**DLR** = **Decoupled Logic Representation**（解耦逻辑表达），即逻辑层与物理层分离的语义建模方法。

## 架构

```
┌──────────────────────────────────────────────────────────────────┐
│                    OC 评测执行层                                   │
│  OC Agent (OpenCode) ── 500 个自然语言任务 ── MCP 连接到指定范式     │
└─────────────────────┬────────────────────────────────────────────┘
                      │ MCP (SSE)  （每次连一个范式）
┌─────────────────────▼────────────────────────────────────────────┐
│                 语义查询层 (Semantic Core Service)                 │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   ER 范式        │  │   DLR 范式       │  │   RDF 范式       │  │
│  │  Kuzu + FAISS   │  │  Kuzu + FAISS   │  │  rdflib          │  │
│  │  HTTP + MCP     │  │  HTTP + MCP+RDF │  │  SPARQL + MCP   │  │
│  │  + er.html      │  │  + dlr.html     │  │  + rdf.html     │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │           │
│           └────────────────────┼────────────────────┘           │
│                                │                                 │
│  ┌─────────────────────────────▼─────────────────────────────┐  │
│  │  解析层：YAML 配置 → Mapper Registry → SemanticModel       │  │
│  │  ER:  ERSemanticMapper  (BizEntity / BizAttribute / BizRelation)│  │
│  │  DLR: DLRSemanticMapper (LE / PE / PAS / ARCS)                  │  │
│  │  RDF: RDFSemanticMapper (rdflib R2RML .ttl → ERScenarioModel)   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────┬────────────────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────────────────┐
│               物理数据层（各范式共享）                              │
│  SQLite 数据库: california_schools / financial / superhero / ...  │
└──────────────────────────────────────────────────────────────────┘
```

三种建模范式：**ER**（Entity-Relationship，实体-关系）、**DLR**（Decoupled Logic Representation，解耦逻辑表达）、**RDF**（Resource Description Framework，资源描述框架）。每次评测只启用一种范式，OC Agent 通过 MCP 连接到当前范式。

### 建模范式

| 范式 | 全称 | 中文 | 状态 | 模型 | Kuzu Schema |
|------|------|------|------|------|-------------|
| **ER** | Entity-Relationship | 实体-关系 | ✅ 已实现 + 已配置 + 已构建 | BizEntity / BizAttribute / BizRelation / RELATED_TO | 扁平实体+关系 |
| **DLR** | Decoupled Logic Representation | 解耦逻辑表达 | ✅ 已实现 + 已配置 + 已构建 | LE / PE / PAS / ARCS | LE-PE 双层 + INHERITS + PAS |
| **RDF** | Resource Description Framework | 资源描述框架 | ✅ 已实现（rdflib + W3C R2RML 基线 + SPARQL） | rr:TriplesMap / rr:referencingObjectMap | rdflib in-memory（无 Kuzu） |

> DLR 是核心范式；ER 与 RDF 作为对比基线纳入评测。

### DLR（Decoupled Logic Representation）缩写对照表

DLR 范式使用的内部缩写：

| 缩写 | 全称 | 说明 |
|------|------|------|
| **LE** | LogicalEntity | 逻辑实体（业务概念层） |
| **PE** | PhysicalEntity | 物理实体（具体表/字段层） |
| **PAS** | Predicate-Attribute-Semantic | LE 间语义路由（三元组：谓词+属性+语义补注） |
| **ARCS** | Anchor-Row-Column-Semantic | PE 到物理库的锚定（四元组：锚定+行过滤+列映射+语义补注） |

**启动方式**（三选一范式或 ALL 一键全起）:
```bash
# 一键构建 + 启动 3 个范式(各端口 28765/28766/28767)
python main.py build --paradigm ALL
python main.py serve --paradigm ALL

# 单范式调试
python main.py build --paradigm ER
python main.py serve --paradigm ER --port 28765

python main.py build --paradigm DLR
python main.py serve --paradigm DLR --port 28766

python main.py build --paradigm RDF
python main.py serve --paradigm RDF --port 28767

# 清理
python main.py reset --paradigm ALL     # 或 ER / DLR / RDF
```

## 存储隔离

各范式 Graph / Vector 物理隔离（`config.paradigm_storage()`），但共享同一套 SQLite 物理数据：

```
storage/
├── ER/
│   ├── graph/             ← ER 专用 Kuzu 图数据库
│   └── vector/
│       └── vector.pkl     ← ER 专用 FAISS 向量索引
├── DLR/
│   ├── graph/             ← DLR 专用 Kuzu 图数据库
│   └── vector/
│       └── vector.pkl     ← DLR 专用 FAISS 向量索引
└── rdf_store/             ← RDF 三元组(内存,serve 时从 .ttl 加载)
    └── (在 rdflib Graph 中,不落盘)

> **RDF 范式使用 `rdflib` 内存图,不写 Kuzu/FAISS。**
```

> **目录命名约定**：`graph/` `vector/` 为 Kuzu / FAISS 对应能力层目录。RDF 范式不走此路径,直接 rdflib 内存。

## 解析链路

### ER

```
configs/scenarios/ER/*.yaml
        │
        ▼  ERSemanticMapper.parse()
ERScenarioModel (BizEntity / BizAttribute / BizRelation)
        │
        ▼  BuildService.build()
Kuzu 图节点 + FAISS 向量索引
        │
        ▼  MCP 工具暴露
Agent 通过 MCP 调用 → 语义查询 → sqlite3 查证据
```

### DLR

```
configs/scenarios/DLR/*.yaml
        │
        ▼  DLRSemanticMapper.parse()
DLRScenarioModel (LogicalEntity / PhysicalEntity / PAS / ARCS)
        │
        ▼  BuildService.build()
Kuzu 图节点 (LE-PE 双层 + INHERITS + PAS) + FAISS 向量索引
        │
        ▼  MCP 工具暴露 (recall_le / recall_pe / recall_pas / ...)
Agent 通过 MCP 调用 → 语义路由 → sqlite3 查证据
```

### RDF（W3C R2RML 基线 + rdflib + SPARQL）

RDF 范式以 W3C R2RML 标准为**对比基线**。使用 `rdflib` 内存图 + SPARQL 引擎,提供 W3C-标准接口。

```
configs/scenarios/DLR/*.yaml
        │
        ▼  tool&test/generate_r2rml.py
configs/scenarios/RDF/*.ttl   ← W3C R2RML (Turtle)
        │
        ▼  RDFSemanticMapper (rdflib) → ERScenarioModel → Kuzu + FAISS (可选)
        │
        ▼  rdf_store.rdf_service → rdflib Graph + SPARQL
sqlite3 只读查询 → 数据证据
```

**生成命令**：

```bash
cd Semantic\ Core\ Service
python tool&test/generate_r2rml.py
    --scenario-dir configs/scenarios/DLR      # 输入：DLR yaml
    --output-dir   configs/scenarios/RDF      # 输出：11 个 .ttl
```

**映射规则**：

| DLR 概念 | R2RML 表达 |
|----------|-----------|
| 每个 PE 表 | `rr:TriplesMap` + `rr:tableName` |
| PE 主键 (A.key) | `rr:subjectMap rr:template ".../{pk}"` |
| PE 所属 LE | `rr:subjectMap rr:class <LE IRI>` |
| PE 私有属性 | `rr:predicateObjectMap` → `rr:column` |
| PAS 关系 (many→one) | `rr:referencingObjectMap` + `rr:joinCondition` |

**对比维度**（DLR vs R2RML 基线）：

| 维度 | DLR YAML | R2RML .ttl |
|------|----------|------------|
| Token 开销 | 低（中文动词 + 业务概念） | 高（嵌套 `predicateObjectMap → objectMap → column`） |
| 多表 JOIN 表达 | PAS 一句话 (`P: {verb: 产生}`) | `rr:joinCondition` 显式列名 |
| 大模型友好度 | 高（扁平、业务视角） | 低（嵌套、技术视角） |
| 标准接口 | 自定义 HTTP + MCP | **W3C SPARQL Protocol** |

## 核心查询流程

### ER / DLR 范式 (FAISS + Kuzu)

```
自然语言问题
    │
    ▼  FAISS 向量召回 Top-K
候选对象 (实体/属性/关系)
    │
    ▼  实体优先策略 + 置信度过滤 (≥ 0.415)
目标实体
    │
    ▼  Kuzu 图谱扩展 (属性 + 关联关系)
结构化结果
    │
    ▼  MCP 返回物理映射 (数据库路径 + 字段)
sqlite3 只读查询 → 数据证据
    │
    ▼  Agent SOP 推理
最终答案（引用数据来源）
```

### RDF 范式 (rdflib + SPARQL)

```
SPARQL SELECT 查询
    │
    ▼  rdflib SPARQL 引擎解析查询
    │      ↓
匹配的三元组 (subject, predicate, object)
    │
    └→ JSON 结果集
```

或文本搜索模式 (无向量):

```
自然语言问题
    │
    ▼  全文匹配 (过滤 subject/predicate/object)
匹配的三元组
    │
    └→ 带分数的候选列表
```

## 项目结构

```text
DLR Proj/
├── README.md
├── requirements.txt
│
├── Semantic Core Service/          # 语义服务（Python）
│   ├── main.py                     # CLI: build / serve / query / interactive / init / reset / ALL
│   ├── config.py                   # 全局配置 + 范式存储路径 + extract_entity_id()
│   ├── mcp_server.py               # MCP Server（范式隔离的工具注册）
│   ├── models/
│   │   ├── semantic_models.py      # ER: BizEntity / BizRelation
│   │   │                            # DLR: LE / PE / PAS / ARCS
│   │   └── physical_models.py      # PhysicalTable / PhysicalColumn
│   ├── mapping/
│   │   ├── base.py                 # ScenarioModel / ERScenarioModel / DLRScenarioModel
│   │   ├── registry.py             # register() + get_mapper() 动态分发
│   │   ├── er.py                   # @register("er") → ERSemanticMapper
│   │   ├── dlr.py                  # @register("dlr") → DLRSemanticMapper
│   │   ├── rdf.py                  # @register("rdf") → RDFSemanticMapper
│   │   ├── config_loader.py        # YAML 加载
│   │   ├── config_generator.py     # 物理库扫描 → 模板生成
│   │   ├── physical_scanner.py     # SQLite 表/字段扫描
│   │   └── semantic_mapper.py      # (兼容)
│   ├── db/
│   │   ├── graph_db.py             # Kuzu 双 schema (ER / DLR)
│   │   └── vector_db.py            # FAISS + NumPy 降级 (ER / DLR 共用)
│   ├── rdf_store/                   # RDF rdflib 服务 (SPARQL + 序列化)
│   │   ├── __init__.py
│   │   └── rdf_service.py
│   ├── service/
│   │   ├── build_service.py        # Kuzu + FAISS 写入
│   │   └── query_service.py        # 向量召回 → 实体优先 → 图谱扩展
│   ├── configs/scenarios/
│   │   ├── ER/                     ← ✅ mini_dev 11 个数据库配置 yaml
│   │   ├── DLR/                    ← ✅ mini_dev 11 个数据库配置 yaml
│   │   ├── RDF/                    ← ✅ 11 个 R2RML .ttl（W3C 标准基线）
│   │   └── *.yaml                   ← 范式参考示例
│   ├── static/
│   │   ├── er.html                  # ER 实体+关系图
│   │   ├── dlr.html                 # DLR LE/PE/PAS/INHERITS 图
│   │   └── rdf.html                 # RDF triples + SPARQL 控制台
│   ├── tool&test/
│   │   └── generate_r2rml.py        # DLR yaml → W3C R2RML .ttl
│   ├── storage/                     # 运行时 Kuzu/FAISS
│
├── OC-based Agent Service/          # Agent 层 (OpenCode, 3 个独立窗口)
│   ├── oc_er/opencode.json          # → localhost:28765/mcp/sse (14 tools)
│   ├── oc_dlr/opencode.json         # → localhost:28766/mcp/sse (24 tools)
│   └── oc_rdf/opencode.json         # → localhost:28767/mcp/sse (14 tools + SPARQL)
│
└── MINIDEV_sqlite/                  # mini_dev 评测数据（未入库，需下载）
```

## MCP 工具

### 共享工具（所有范式）

| Tool | 参数 | 语义 |
|------|------|------|
| `semantic_query` | `question, top_k=20` | 自然语言查询（主入口） |
| `list_entities` | — | 列出所有实体 |
| `list_relations` | — | 列出所有关系 |
| `get_entity` | `entity_id` | 单个实体详情 |
| `get_entity_attributes` | `entity_id` | 实体属性（含物理字段） |
| `get_entity_relations` | `entity_id` | 实体关系（含方向） |
| `get_entity_mapping` | `entity_id` | 物理映射（数据库+表+字段） |
| `find_shortest_path` | `from_id, to_id` | 两实体最短路径 |
| `list_all_tables` | — | 列出已注册实体表 |
| `get_table_schema` | `table_id: "db.表名"` | 任意物理表结构 |
| `summary` | — | 知识库摘要统计 |

### DLR（Decoupled Logic Representation）范式专用工具

| Tool | 参数 | 语义 |
|------|------|------|
| `recall_le` | `question, top_k, threshold` | 召回逻辑实体 (LE) |
| `recall_pe` | `question, top_k, threshold` | 召回物理实体 (PE) |
| `recall_pas` | `question, top_k, threshold` | 召回 PAS 语义路由 |
| `list_le` | — | 列出所有逻辑实体 (LE) |
| `list_pas` | — | 列出所有 PAS 关系 |
| `get_le` | `le_id` | 逻辑实体 (LE) 详情 |
| `get_le_attrs` | `le_id` | 逻辑实体 (LE) 属性 |
| `get_le_children` | `le_id` | 获取物理实体 (PE) 列表 |
| `get_pe_arcs` | `pe_id` | ARCS 锚定 + 数据库 URL |
| `path_le_le` | `from_id, to_id` | 两 LE 最短 PAS 路径 |

> **注意**：DLR 工具仅在 `--paradigm DLR` 启动时注册，ER/RDF 启动时不暴露。RDF 范式通过 SPARQL 接口查询,不依赖 MCP 专属工具。

## HTTP API

### ER / DLR 范式 (端口 28765 / 28766)

| 端点 | 范式 | 用途 |
|------|------|------|
| `POST /api/v1/query` | ER/DLR/RDF | 自然语言语义查询 (向量+F Kuzu) |
| `GET /api/v1/entities` | ER/DLR/RDF | 列出所有实体 |
| `GET /api/v1/graph` | ER/DLR/RDF | 实体 + 关系 (图谱数据) |
| `GET /api/v1/dlr/graph` | DLR only | DLR 完整图谱 (LE+PE+PAS+INHERITS) |
| `GET /health` | ER/DLR/RDF | 健康检查 |

### RDF 范式 W3C-标准接口 (端口 28767)

| 端点 | 用途 |
|------|------|
| `GET /api/v1/rdf/graph` | 三元组总数 + 类列表 + 谓词列表 |
| `GET /api/v1/rdf/triples` | 全部三元组 JSON |
| `GET /api/v1/rdf/classes` | rr:class 列表 |
| `GET /api/v1/rdf/triples/class/{uri}` | 按类过滤的三元组 |
| `POST /api/v1/rdf/sparql` | 执行 SPARQL (SELECT/ASK/CONSTRUCT/DESCRIBE) |
| `GET /api/v1/rdf/serialize` | 序列化 (turtle/json-ld/xml/n3/nt) |
| `GET /api/v1/rdf/search` | 文本搜索三元组 |

MCP SSE 端点：

| 范式 | MCP 地址 | 工具数 |
|------|----------|--------|
| ER | `http://localhost:28765/mcp/sse` | 14 shared |
| DLR | `http://localhost:28766/mcp/sse` | 14 shared + 10 DLR-RDF |
| RDF | `http://localhost:28767/mcp/sse` | 14 shared |

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt    # 含 rdflib (RDF 范式必需)
```

### 2. 一键构建 + 启动 3 个范式 (ALL 模式)

```bash
cd Semantic\ Core\ Service
python main.py build --paradigm ALL     # 逐个构建 ER/DLR/RDF
python main.py serve --paradigm ALL     # fork 3 进程,端口 28765/28766/28767
```

启动后 3 个独立服务:
- `http://localhost:28765/` ER  + MCP /mcp/sse (14 tools)
- `http://localhost:28766/` DLR + MCP /mcp/sse (24 tools)
- `http://localhost:28767/` RDF + MCP /mcp/sse (14 tools + SPARQL)

### 3. 单范式调试

```bash
python main.py build --paradigm ER
python main.py serve  --paradigm ER   --port 28765

python main.py reset --paradigm ALL     # 全部清理
```

### 4. 通过 OC Agent 执行 mini_dev 评测任务 (3 个 OpenCode 窗口)

```bash
cd "D:\Code_Proj\DLR Proj\OC-based Agent Service"
cd oc_er   && opencode    # window 1 → ER   (localhost:28765/mcp/sse)
cd oc_dlr  && opencode    # window 2 → DLR  (localhost:28766/mcp/sse)
cd oc_rdf  && opencode    # window 3 → RDF  (localhost:28767/mcp/sse)
```

## 数据集

本项目使用 **mini_dev**（bird-bench 子集，版本 **0703**）作为评测基准。

| 属性 | 详情 |
|------|------|
| **名称** | mini_dev（BIRD-bench 精简开发版） |
| **版本** | 0703 |
| **数据库数量** | 11 个 SQLite 数据库 |
| **任务数量** | 500 个自然语言查询任务 |
| **评测目标** | NL2SQL（自然语言 → SQL 查询） |

### 数据库一览

| 数据库 | 领域 | 说明 |
|--------|------|------|
| `california_schools` | 教育 | 加州学校信息（学校、学区、学生数等） |
| `financial` | 金融 | 银行账户、交易、客户信息 |
| `superhero` | 娱乐 | 超级英雄角色、能力、所属团队 |
| `debit_card_specializing` | 零售 | 借记卡消费记录与商户信息 |
| `european_football_2` | 体育 | 欧洲足球联赛、球队、球员、比赛记录 |
| `card_games` | 游戏 | 卡牌游戏、卡牌属性、对战记录 |
| `formula_1` | 体育 | F1 赛车、车手、赛道、比赛结果 |
| `codebase_community` | 技术 | 开源社区、代码仓库、开发者关系 |
| `student_club` | 教育 | 大学社团、成员、活动信息 |
| `thrombosis_prediction` | 医疗 | 血栓预测临床数据 |
| `toxicology` | 化学 | 毒性物质、分子结构、毒性反应 |

### 下载

```
版本：mini_dev 0703
下载地址：https://drive.google.com/file/d/13VLWIwpw5E3d5DUkMvzw7hvHE7a4XkG/view
```

下载后解压到项目根目录，目录结构为：

```
DLR Proj/
└── MINIDEV_sqlite/
    ├── dev_tables.json              # 表结构元数据
    ├── mini_dev_sqlite.json         # 任务集（500 条 NL → SQL）
    ├── mini_dev_sqlite_gold.sql     # 标准答案 SQL
    └── dev_databases/               # 11 个 SQLite 数据库
        ├── california_schools/california_schools.sqlite
        ├── financial/financial.sqlite
        ├── superhero/superhero.sqlite
        └── ...
```

> **注意**：`MINIDEV_sqlite/` 已加入 `.gitignore`，不纳入版本控制。

### 任务格式

`mini_dev_sqlite.json` 中每条任务包含：

```json
{
  "question_id": 1,
  "db_id": "financial",
  "question": "查询账户余额大于10000的客户数量",
  "SQL": "SELECT COUNT(*) FROM account WHERE balance > 10000;"
}
```

Agent 的工作流：接收自然语言 `question` → 通过 MCP 语义查询定位实体/字段 → 生成并执行 SQL → 返回结果。

## 评测目标

在 mini_dev（0703）数据集上跑通 **500 个自然语言查询任务**：
- Agent 通过 MCP 获取语义理解（实体/关系/映射）
- Agent 通过 sqlite3 只读查询获取数据证据
- 最终输出结构化答案（引用数据来源）


---

![image.png](https://raw.gitcode.com/user-images/assets/10360544/5c2b3bfb-acb8-463b-a5a8-0cf7026ac437/image.png 'image.png')

![image.png](https://raw.gitcode.com/user-images/assets/10360544/6c684b8a-36a9-417d-a4d4-f98748d5a3ce/image.png 'image.png')

--- 
DLR
![image.png](https://raw.gitcode.com/user-images/assets/10360544/4c90fb5b-fbd5-4e34-9ef9-e83d6b61b3c6/image.png 'image.png')

---
RDF
![image.png](https://raw.gitcode.com/user-images/assets/10360544/f9adc0b4-a339-4f7b-8420-45dba3dbbf85/image.png 'image.png')