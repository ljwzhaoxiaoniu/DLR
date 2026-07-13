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
│  │  Kuzu + FAISS   │  │  Kuzu + FAISS   │  │  Kuzu + FAISS   │  │
│  │  专属 MCP 工具   │  │  专属 MCP 工具   │  │  (未来)          │  │
│  │  专属 HTTP API   │  │  专属 HTTP API   │  │                 │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │           │
│           └────────────────────┼────────────────────┘           │
│                                │                                 │
│  ┌─────────────────────────────▼─────────────────────────────┐  │
│  │  解析层：YAML 配置 → Mapper Registry → SemanticModel       │  │
│  │  ER:  ERSemanticMapper  (BizEntity / BizRelation)          │  │
│  │  DLR: DLRSemanticMapper (LE / PE / PAS / ARCS)             │  │
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
| **ER** | Entity-Relationship | 实体-关系 | ✅ 已实现 + 有配置 | BizEntity / BizAttribute / BizRelation / RELATED_TO | 扁平实体+关系 |
| **DLR** | Decoupled Logic Representation | 解耦逻辑表达 | ✅ 代码已实现，配置待写 | LE / PE / PAS / ARCS | LE-PE 双层 + INHERITS + PAS |
| **RDF** | Resource Description Framework | 资源描述框架 | 🔜 未来 | — | — |

> DLR 是核心范式；ER 与 RDF 作为对比基线纳入评测。

### DLR（Decoupled Logic Representation）缩写对照表

DLR 范式使用的内部缩写：

| 缩写 | 全称 | 说明 |
|------|------|------|
| **LE** | LogicalEntity | 逻辑实体（业务概念层） |
| **PE** | PhysicalEntity | 物理实体（具体表/字段层） |
| **PAS** | Predicate-Attribute-Semantic | LE 间语义路由（三元组：谓词+属性+语义补注） |
| **ARCS** | Anchor-Row-Column-Semantic | PE 到物理库的锚定（四元组：锚定+行过滤+列映射+语义补注） |

**启动方式**（每次只启动一个范式，不并行）：
```bash
python main.py build --paradigm ER      # 构建 ER 的知识库
python main.py serve --paradigm ER      # 启动 ER 的 API + MCP

python main.py build --paradigm DLR     # 构建 DLR 的知识库
python main.py serve --paradigm DLR     # 启动 DLR 的 API + MCP
```

## 存储隔离

各范式 Kuzu / FAISS 物理隔离（`config.paradigm_storage()`），但共享同一套 SQLite 物理数据：

```
storage/
├── kuzu/
│   ├── er/        ← ER (Entity-Relationship) 专用 Kuzu 图
│   └── dlr/       ← DLR (Decoupled Logic Representation) 专用 Kuzu 图
├── vector/
│   ├── er.pkl     ← ER 专用 FAISS 索引
│   └── dlr.pkl    ← DLR 专用 FAISS 索引
└── sqlite_dbs/
    └── *.db       ← 共享的物理数据库
```

## 解析链路（以 ER 为例）

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

## 核心查询流程

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

## 项目结构

```text
DLR Proj/
├── README.md
├── requirements.txt
│
├── Semantic Core Service/          # 语义服务（Python）
│   ├── main.py                     # CLI: build / serve / query / interactive / init / reset
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
│   │   ├── rdf.py                  # (未来)
│   │   ├── config_loader.py        # YAML 加载
│   │   ├── config_generator.py     # 物理库扫描 → 模板生成
│   │   ├── physical_scanner.py     # SQLite 表/字段扫描
│   │   └── semantic_mapper.py      # (兼容)
│   ├── db/
│   │   ├── graph_db.py             # Kuzu 双 schema (ER / DLR)
│   │   └── vector_db.py            # FAISS + NumPy 降级
│   ├── service/
│   │   ├── build_service.py        # Kuzu + FAISS 写入
│   │   └── query_service.py        # 向量召回 → 实体优先 → 图谱扩展
│   ├── configs/scenarios/
│   │   ├── ER/                     ← ✅ mini_dev 数据库配置 (11 个 yaml)
│   │   ├── DLR/                    ← 空目录，配置待写
│   │   ├── RDF/                    ← 预留
│   │   └── *.yaml                   ← 范式参考示例 (er/dlr_line_loss 等)
│   ├── static/index.html           # 图可视化 UI
│   └── storage/                    # 运行时生成
│
├── OC-based Agent Service/          # Agent 层 (OpenCode)
│   ├── AGENTS.md                   # Agent 角色指令 (元数据走 MCP，数据走 SQL)
│   ├── oc_dlr/opencode.json        # MCP 连接: localhost:28765/mcp/sse
│   └── (oc_er/ oc_rdf/)
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
| `calc_distance` | `tg_id1, tg_id2` | Haversine 距离（米） |
| `find_nearby_transformers` | `tg_id, radius_m=1000` | 半径内邻近变压器 |
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

> **注意**：DLR 工具仅在 `--paradigm DLR` 启动时注册，ER 启动时不暴露。

## HTTP API

启动 `serve`（端口 28765）后可用：

| 端点 | 用途 |
|------|------|
| `POST /api/v1/query` | 自然语言语义查询 |
| `GET /api/v1/entities` | 列出所有实体 |
| `GET /api/v1/graph` | 实体 + 关系（图谱数据） |
| `GET /health` | 健康检查 |

MCP SSE 端点：`http://localhost:28765/mcp/sse`

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 构建 + 启动 ER 范式服务

```bash
cd Semantic\ Core\ Service
python main.py build --paradigm ER
python main.py serve --paradigm ER --port 28765

# 浏览器打开 http://localhost:28765/ 查看语义图谱
# MCP SSE 端点：http://localhost:28765/mcp/sse
```

### 3. 构建 + 启动 DLR 范式服务

```bash
cd Semantic\ Core\ Service
# 需要先写 configs/scenarios/DLR/*.yaml 配置
python main.py build --paradigm DLR
python main.py serve --paradigm DLR --port 28765
```

### 4. 通过 OC Agent 执行 mini_dev 评测任务

```bash
cd OC-based Agent Service
opencode    # 启动 OpenCode，连接 MCP → 跑 500 个 NL 任务
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
