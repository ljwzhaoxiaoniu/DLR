# DLR Proj — 原创的 Decoupled Logic Representation 建模范式

> **DLR（解耦逻辑表达）是一种原创的语义建模范式**：LE-PE 双层模型 + PAS 语义路由，将逻辑概念层与物理数据层解耦，
> 使 LLM Agent 能够用自然语言理解和查询关系数据库。
> 项目同时实现 **ER**（自研基线）与 **RDF**（W3C R2RML 标准基线），在 mini_dev 500 题 NL2SQL 上进行三范式同构对比评测，
> 论证 DLR 建模对 LLM 的引导优势。

## 📚 文档导航

| 文档 | 内容 |
|------|------|
| [三范式建模说明](docs/modeling.md) | DLR/ER/RDF 设计理念、解析链路、存储隔离、MCP 工具表、可视化 |
| [配置 → 存储写入链路](docs/yaml-to-storage.md) | 每范式 YAML/TTL 样例 + 字段级 Kuzu/FAISS 写入对照（透明化深度篇） |
| [数据集说明](docs/dataset.md) | mini_dev 0703：11 库 500 题、下载、任务格式、实测特征 |
| [Agent 说明](docs/agent.md) | OpenCode + MCP 架构、AGENTS.md 规则、防作弊、db 锁库行为 |
| [评测流水线](docs/evaluation.md) | 四阶段流水线、Prompt 铁律、双通道判定、公平性、已知问题 |
| [评测结果](docs/results.md) | round_1 滚动更新（57/60 CORRECT, pair 1-20）：正确率、行为效率、定性观察 |

## 架构

```
┌──────────────────────────────────────────────────────────────────┐
│                    OC 评测执行层                                   │
│  OC Agent (OpenCode) ── 500 个自然语言任务 ── MCP 连接到指定范式     │
└─────────────────────┬────────────────────────────────────────────┘
                      │ MCP (SSE)  （每次连一个范式）
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
| **★ DLR** | 原创核心 | 28775 | 21+1 | LE / PE / PAS / ARCS |
| **ER** | 自研基线 | 28765 | 11+1 | BizEntity / BizAttribute / BizRelation |
| **RDF** | W3C 对照基线 | 28785 | 7+1 | rr:TriplesMap + rdflib SPARQL |

每次评测只启用一种范式连接，Agent 强制路径：`*_semantic_query`（首跳全局召回定位库 → 锁库传 `db`）→ 映射工具（`get_pe_full` / `get_entity_mapping` / `query_rdf_mapping`）→ 共享 `execute_sql`（只读薄透传）→ `Final Answer`。

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
bash eval_run.sh EDR 2 1471 --parallel --workers 6                 # Stage 1: Agent 跑题 → raw NDJSON
python 02_extract_and_run.py --paradigm er --log-subdir <run_id>   # Stage 2: 提取 SQL → 执行 → norm
python 03_evaluate.py --paradigm er --log-subdir <run_id>          # Stage 3: strict 初判(脚本秒级)
python 04_judge.py --paradigm er --log-subdir <run_id>             # Stage 4: LLM 仲裁(增量,可断点续跑)
python parse_agent_stats.py --paradigm ALL                         # 汇总 token + 工具调用统计
```

四阶段细节、Prompt 铁律与防作弊设计见 [评测流水线](docs/evaluation.md)。

## 项目结构

```text
DLR Proj/
├── README.md / docs/                # 入口 + 六个专题文档
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
