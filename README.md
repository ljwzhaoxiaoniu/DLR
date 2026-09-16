# DLR Proj — 原创的 Decoupled Logic Representation 建模范式

> **DLR（解耦逻辑表达）是一种原创的语义建模范式**：LE-PE 双层模型 + PAS 语义路由，将逻辑概念层与物理数据层解耦，
> 使 LLM Agent 能够用自然语言理解和查询关系数据库。DLR 针对的是**数据源级语义建模**。
> 项目跑在**三级语义建模**（Three-Level Semantic Modeling，TSM：数据源级 / 领域共识级 / 业务逻辑级）框架下——
> 三范式（DLR 原创 + ER 标准基线 + RDF W3C 基线）的差异只发生在数据源级，
> 在 mini_dev 500 题 NL2SQL 上进行同构对比评测，论证建模结构对 LLM Agent 的引导效能。

## 📚 文档导航

**接手先看这三篇**：运行手册（怎么跑）→ 三范式建模说明（怎么建）→ DLR 建模指南（原创范式怎么建、为什么）。

| 文档 | 内容 |
|------|------|
| **[运行手册](docs/runbook.md)** | **怎么跑、怎么归档、故障怎么办**——跑题流程与纪律、归档规范、故障手册、命令速查（唯一执行口径） |
| [三范式建模说明](docs/modeling.md) | **对准测试**：三范式怎么以同等颗粒度使用同一份数据集；ER / DLR / RDF 作业规范；公平性约束与记账；解析链路、存储隔离、MCP 工具表、可视化 |
| [DLR 建模指南](docs/modeling-guide-dlr.md) | 原创范式的详细版与前置：设计本体（三层/两机制/public 标记位）、建模规则与决策树、七个实战案例、新库接入流程、自检清单 |
| [配置 → 存储写入链路](docs/semantic-layer-build.md) | 每范式 YAML/TTL → Kuzu/FAISS 的字段级写入对照 + 召回面公平性（透明化深度篇） |
| [评测流水线](docs/evaluation.md) | 四阶段流水线**设计**、Prompt 铁律、两段式判定、输出归档 |
| [Agent 说明](docs/agent.md) | OpenCode + MCP 架构、AGENTS.md 规则、防作弊、db 锁库行为 |
| [三级语义建模设计](docs/tsm-design.md) | 数据源级（L1 语义）/ 领域共识级（L2 RAG）/ 业务逻辑级（L3 SOP），三级并行锚定协议；知识分层四层准入 |
| [RAG 知识库](docs/rag-evidence.md) | rag_knowledge 两种格式、知识写法铁律、索引重建 |
| [数据集说明](docs/dataset.md) | mini_dev 0703：11 库 500 题、下载、任务格式、已知缺陷清单 |
| [评测结果 v4](docs/results_v4.md) | v4 逐题校验表（当前基线；post_process 自动重建） |

> **历史全在 [`archive/`](archive/)**：v2/v3 基线逐题表、旧评测归档（round_1 / round_2 / v2_final / v3_final）、v2 校验方法论、旧分享提纲与幻灯片、用量导出。`validated_results/` 只放现行基线（当前为 v4_final，首次归档时创建）。
>
> **给执行 agent**：仓库级执行约定见 [CLAUDE.md](CLAUDE.md)。

## 📦 交接状态（2026-09-16）

| 项 | 状态 |
|---|---|
| **建模范式** | 三范式（DLR 原创 + ER/RDF 基线），11 库配置齐 |
| **语义层基线** | 数据集原生（09-10 重写）：列级描述 = CSV 原文，三范式同词同义；DLR schema 统一（`PE.attributes` + public 标记位，09-12） |
| **入库收尾** | 09-13 全量 rebuild + 重启，活库实测：ER 798 属性 / 102 关系；DLR 792 / 72 PE / 49 LE / 35 PAS；RDF 798 / 101 关系 |
| **评测架构** | 三级语义建模（数据源级 / 领域共识级 / 业务逻辑级）+ 原始 gold + judge 争议裁决 |
| **当前基线轮次** | **v4_final**（`config.json eval.round`）；v3 归档（90 题次）已作废移入 `archive/v3_final/` |
| **已归档** | 原始组 4 题（2 批，逐题表见 [results_v4](docs/results_v4.md)） |
| **下一步** | 原始组 debit_card 剩 26 题（每批 2 题 × 3 范式），随后对照组 / card_games 52 题 + 其余 9 主题 |
| **已知问题** | P2：Kuzu 锁冲突 / judge 偶发超时 / RDF serve 静默崩溃；DLR 有意未覆盖 3 表 6 列；`formula_1.constructors.wins` 幽灵列待裁定 |

## 架构

```
┌──────────────────────────────────────────────────────────────────┐
│                    OC 评测执行层                                   │
│  OC Agent (OpenCode) ── 500 个自然语言任务 ── 每个 Agent 实例连一种范式 │
└─────────────────────┬────────────────────────────────────────────┘
                      │ MCP (SSE)  三范式并行，进程/存储隔离
┌─────────────────────▼────────────────────────────────────────────┐
│                 语义查询层 (Semantic Core Service)                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐             │
│  │  ER 范式     │   │ ★ DLR 范式   │   │  RDF 范式    │             │
│  │ Kuzu+FAISS  │   │ Kuzu+FAISS  │   │ Kuzu+FAISS  │             │
│  │ + er.html   │   │ + dlr.html  │   │ + rdf.html  │             │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘             │
│         └────────────────┼─────────────────┘                     │
│  解析层：YAML/TTL → Mapper Registry → ScenarioModel               │
│  ER: BizEntity/BizRelation │ DLR: LE/PE/PAS/ARCS │ RDF: R2RML     │
└─────────────────────┬────────────────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────────────────┐
│        物理数据层（共享）: 11 个 SQLite (mini_dev 0703)             │
└──────────────────────────────────────────────────────────────────┘
```

| 范式 | 角色 | Web 端口 | MCP 工具数 | 核心模型 |
|------|------|---------|-----------|----------|
| **★ DLR** | 原创核心 | 28775 | 4+1（14 探索类已禁注册） | LE / PE / PAS / ARCS |
| **ER** | 数据库建模标准基线 | 28765 | 9+1（3 全量 dump 已禁） | BizEntity / BizAttribute / BizRelation |
| **RDF** | W3C R2RML 标准基线 | 28785 | 6+1（2 全量 dump 已禁） | rr:TriplesMap + rdflib SPARQL |

三范式并行评测，进程/存储/MCP 工具全隔离。每个 Agent 实例只连接一种范式，强制路径：`*_semantic_query`（首跳全局召回定位库 → 锁库传 `db`）→ 映射工具（`get_pe_mapping` / `get_entity_mapping` / `get_rdf_mapping`）→ 共享 `execute_sql`（只读薄透传）→ `Final Answer`。

## 快速开始

### 1. 安装与配置

```bash
pip install -r requirements.txt        # 含 rdflib（RDF 范式必需）
```

- 下载 mini_dev 0703 解压为 `MINIDEV_sqlite/`（见 [数据集说明](docs/dataset.md)）；
- 编辑根目录 `config.json`（路径/端口/API/评测参数）；
- LLM Judge key 放 `Evaluation/.env_judge`（gitignored）。

### 2. 构建 + 启动

```bash
cd "Semantic Core Service"
python main.py build --paradigm ALL     # 三范式逐库构建 Kuzu + FAISS（含 ID 防重校验）
python "tool&test/verify_db_recall.py"  # 构建校验，预期 RESULT: ALL PASS
python main.py serve --paradigm ALL     # 3 进程: ER 28765 / DLR 28775 / RDF 28785
# 单范式调试: python main.py build|serve|reset --paradigm ER|DLR|RDF
```

> Kuzu 持排他文件锁：build 前必须停 serve；改过 configs/ 或构建链路代码后必须重新 build。

### 3. 评测

```bash
cd Evaluation/scripts
# Stage 1：一批 = 2 题 × 3 范式（workers 自动 = 范式数 × 题数，无需指定）
bash eval_run.sh EDR <q1> <q2> --parallel

# Stage 2/3/4：逐范式跑
for p in er dlr rdf; do
  $PY 02_extract_and_run.py --paradigm $p --log-subdir <run_id>   # 提取 SQL → 重放 → 标准化
  $PY 03_evaluate.py        --paradigm $p --log-subdir <run_id>   # strict 初判（秒级）
  $PY 04_judge.py           --paradigm $p --log-subdir <run_id>   # LLM 仲裁（增量续跑）
done

$PY parse_agent_stats.py --paradigm ALL --log-subdir <run_id>     # ⚠ 必须 ALL，逐范式会互相覆盖
$PY post_process.py --run-id <run_id> --qids <q1>,<q2>            # 归档（结果确认后）
```

`$PY` = `/d/ProgramData/anaconda3/envs/lepe_som/python`（**必须绝对路径**）。

**完整流程、跑题纪律、归档规范与故障处理见 [运行手册](docs/runbook.md)**；四阶段的设计原理与 Prompt 铁律见 [评测流水线](docs/evaluation.md)。

## 项目结构

```text
DLR Proj/
├── README.md / docs/                # 入口 + 专题文档
├── config.json                      # 全局配置(路径/端口/API/评测参数)
├── Semantic Core Service/           # 语义服务
│   ├── main.py                      # CLI: build / serve / query / reset (ALL)
│   ├── mcp_server.py                # MCP Server(范式隔离注册 + execute_sql)
│   ├── mapping/                     # er.py / dlr.py / rdf.py 解析器 + registry
│   ├── models/ | db/ | service/     # 语义模型 | Kuzu+FAISS | build/query
│   ├── rdf_store/                   # rdflib SPARQL 服务
│   ├── configs/scenarios/{ER,DLR,RDF}/   # 11 库 × 3 范式配置
│   ├── static/{er,dlr,rdf}.html     # 三范式可视化(macaron 配色)
│   └── tool&test/                   # generate_r2rml.py / verify_db_recall.py 等
├── OC-based Agent Service/          # Agent 层(AGENTS.md + oc_er/oc_dlr/oc_rdf)
├── Evaluation/                      # 四阶段评测流水线 + outputs/{run_id}/
├── validated_results/               # 分轮归档(raw NDJSON + agent_stats.csv)
└── MINIDEV_sqlite/                  # mini_dev 数据(不入库,需下载)
```

## HTTP API（各范式端口相同路由）

| 端点 | 说明 |
|------|------|
| `POST /api/v1/query` | 语义查询（body: `{question, db?}`，db 可选锁库） |
| `GET /api/v1/graph` · `/api/v1/dlr/graph` · `/api/v1/rdf/mapping/all` | 三范式可视化数据 |
| `POST /api/v1/rdf/sparql` · `GET /api/v1/rdf/serialize` | RDF W3C 标准接口（28785） |

完整 API 与 MCP 工具清单见 [三范式建模说明](docs/modeling.md)。
