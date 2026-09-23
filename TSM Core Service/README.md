# TSM Core Service（TS/Node）

2.0 线的 TSM 服务：**Neo4j（图）+ LanceDB（向量/证据）** 的 TypeScript 实现，与 Python 版
`Semantic Core Service/` **同 MCP 契约**（工具名、参数、返回结构逐字段一致），用于插件化（去掉 Python sidecar）。

> 评测线（v4 及后续轮）仍跑 Python + Kuzu/FAISS，本树不动它；两者靠 MCP 契约隔离。
> 选型背景：Kuzu 上游 2025-10 已归档（被 Apple 收购），产品线不背死依赖。

## 目录

```
src/
├── model/{types,loadDlr}.ts     # DLR YAML → 向量行（逐字对齐 Python 构建器）
├── embed/encoder.ts             # TextEncoder：ONNX 本地推理，复刻 sentence-transformers 行为
├── store/lance.ts               # LanceDB 访问层（entities / evidence 两表）
├── graph/{physicalSchema,queries,types,loadNeo4j}.ts  # SQLite 类型扫描 / Neo4j 查询 / YAML→Neo4j
├── queries/{semanticQuery,searchEvidence,peMapping,executeSql}.ts  # 5 个工具的实现
├── build/{buildLance,buildEvidence}.ts          # 构建向量表 / 证据表
├── mcp/server.ts                # MCP server（stdio + streamable-http，stateful）
└── verify/                      # 回归套件（对照 Python 服务的 parity 脚本 + MCP 预检）
scripts/fetch-model.sh           # 从 hf-mirror 拉 ONNX 模型（新机器可复现）
```

## 一次性准备

```bash
npm install
bash scripts/fetch-model.sh        # ONNX 模型 → tmp_scripts/bge-onnx（~95MB，走 hf-mirror）
cp .env.example .env               # 填 NEO4J_PASSWORD
# Neo4j 本机实例（本仓库用免安装 zip + 便携 JDK 起在 D:\neo4j，非 Windows 服务）：
#   JAVA_HOME=D:\neo4j\jdk-21.0.12.1+1  neo4j-community-5.26.30\bin\neo4j.bat console
```

## 构建与运行

```bash
npx tsx src/build/buildLance.ts --all      # 向量表（11 库 948 行）
npx tsx src/build/buildEvidence.ts         # 证据表（11 namespace 458 条）
npx tsx src/graph/loadNeo4j.ts --all --wipe  # 图（LE 49/PE 72/PA 792/PAS 35）
npx tsx src/mcp/server.ts --http 28795     # MCP server（dsh 直连；stdio 模式去掉 --http）
```

## 验证（`src/verify/`）

| 脚本 | 对照 | 结果 |
|---|---|---|
| `parity_dlr.ts` | YAML→向量行 vs Python 构建产物（vector.pkl 导出） | id/name/PAS 文本逐字一致 |
| `embed_parity.ts` | Node(ONNX) vs Python(sentence-transformers) | **cosine 1.000000** |
| `tool_parity.ts` | 全链路（LanceDB+Neo4j）vs `dlr_semantic_query` 真值 | 5/5 结构逐字段一致（含顺序/confidence） |
| `evidence_parity.ts` | L2 检索 vs `dlr_search_evidence` | 内容/顺序/分数逐位一致 |
| `pe_mapping_parity.ts` | 第二跳 vs `get_pe_mapping` | **JSON 逐字节一致**（含 database_url） |
| `execute_sql_check.ts` | SQL 执行 vs `execute_sql` | 结果一致 + 拒绝口径一致 |
| `precheck.ts` | — | 连 MCP server 列工具（供 launcher 预检，退出码即结果） |

**⚠ 编码坑（已固化在 `TextEncoder`）**：sentence-transformers 用 `do_lower_case=true` 老式分词，
而 fast tokenizer **不**自动小写 → 大写英文变 `[UNK]`，向量静默偏掉（cosine 0.75~0.98）。
编码前必须 `toLowerCase()`。

**⚠ MCP HTTP 模式**：用官方推荐的 **stateful**（每会话新建 transport + McpServer 实例，共享底层连接）；
stateless 模式与 dsh/fastmcp 客户端握手不兼容（通知类请求会挂起）。

**⚠ 知识源差异**：运行中的 Python 服务里 `debit_card_specializing` 的 L2 索引是旧格式时代构建的
（返回 qid=1486…）；本栈按仓库当前文件（kid 聚合版）构建。是否需要重建 Python 侧索引由评测线决定。
