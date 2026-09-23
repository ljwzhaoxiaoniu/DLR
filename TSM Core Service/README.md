# TSM Core Service（TS/Node）

2.0 线的 TSM 服务：**Neo4j（图）+ LanceDB（向量/共识）+ ONNX（编码器）** 的 TypeScript 实现，
契约 = MCP 5 工具（L2 工具名与 Python 线不同，见下）。用于插件化（无 Python、无 sidecar）。

> 三级语义建模（TSM）：**L1 = `dlr`**（语义图谱）｜**L2 = `consensus`**（Domain Consensus = 场景所需的、
> 基于 L1 schema 的一类**非 workflow** 知识：术语/口径/背景，非明细）｜**L3 = `sop`**（题级流程/打法）。
> 准入判据：非 workflow → consensus；题级流程/打法 → sop。注意："evidence" 是 BIRD 数据集字段名，**不是**范式术语。

## 目录

```
src/
├── config.ts                    # 路径唯一来源（场景可选择：TSM_SCENARIO）
├── model/{types,loadDlr}.ts     # L1：DLR YAML → 向量行（逐字对齐 Python 线构建器）
├── embed/encoder.ts             # TextEncoder：ONNX 本地推理，复刻 sentence-transformers 行为
├── store/lance.ts               # LanceDB 访问层（entities=L1 语义 / consensus=L2 领域共识）
├── graph/{physicalSchema,queries,types,loadNeo4j}.ts  # SQLite 类型扫描 / Neo4j 查询 / YAML→Neo4j
├── queries/{semanticQuery,searchConsensus,peMapping,executeSql}.ts  # 5 个工具的实现
├── build/{buildLance,buildConsensus}.ts         # 构建向量表 / 领域共识表
├── mcp/server.ts                # MCP server（stdio + streamable-http，stateful）
└── verify/                      # 回归套件（对 fixtures 自证 + MCP 预检）
scripts/fetch-model.sh           # 从 hf-mirror 拉 ONNX 模型（新机器可复现）
```

**场景（scenario）** = 一套完整 TSM 的内容，在仓库 `scenarios/<name>/`（当前 `birdminidev`）：
`sources/configs/{ER,DLR,RDF}/*.yaml`（L1 建模源）+ `sources/consensus/*.jsonl`（L2 源）+ `sources/sop.md`（L3 源）
+ `fixtures/*.json`（对照真值）。切换场景：`TSM_SCENARIO=<路径> npx tsx …`。

## 一次性准备

```bash
npm install
bash scripts/fetch-model.sh        # ONNX 模型 → tmp_scripts/bge-onnx（~95MB，走 hf-mirror）
cp .env.example .env               # 填 NEO4J_PASSWORD
# Neo4j 本机实例（本仓库用免安装 zip + 便携 JDK 起在 D:\neo4j，非 Windows 服务）：
#   JAVA_HOME=D:\neo4j\jdk-21.0.12.1+1  neo4j-community-5.26.30\bin\neo4j.bat console
# 或一键：bash "../DSH-based Agent Service/scripts/start_backend.sh"
```

## 构建与运行

```bash
npx tsx src/build/buildLance.ts --all        # L1 向量表（11 库 948 行）
npx tsx src/build/buildConsensus.ts          # L2 领域共识表（11 namespace 458 条）
npx tsx src/graph/loadNeo4j.ts --all --wipe  # 图（LE 49/PE 72/PA 792/PAS 35）
npx tsx src/mcp/server.ts --http 28795       # MCP server（dsh 直连；stdio 模式去掉 --http）
```

## MCP 工具（5）

`dlr_semantic_query`（L1 召回）· **`dlr_search_consensus`**（L2 领域共识）· `get_pe_mapping`（第二跳）·
`get_le_attrs` · `execute_sql`

> ⚠ 与 Python 线的契约差异：L2 工具名 Python 线仍是 `dlr_search_evidence`（BIRD 遗留命名）。
> 其余 4 个工具同名同构；L2 的**返回形状与分数口径一致**，仅 qid 编号口径不同（kid vs 旧题号）。

## 验证（`src/verify/`，全部对 `scenarios/*/fixtures/` 自证，零 Python）

| 脚本 | 对照 | 结果 |
|---|---|---|
| `parity_dlr.ts` | YAML→向量行 vs Python 线产物（fixtures manifest） | id/name/PAS 文本逐字一致 |
| `embed_parity.ts` | Node(ONNX) 编码（与 Python 线比对见 fixtures 历史） | cosine 1.000000（已验） |
| `tool_parity.ts` | 全链路（LanceDB+Neo4j）vs `dlr_semantic_query` 真值 | 5/5 结构逐字段一致 |
| `consensus_parity.ts` | L2 检索 vs Python 线真值 | 内容与分数逐位一致 |
| `pe_mapping_parity.ts` | 第二跳 vs `get_pe_mapping` 真值 | JSON 逐字节一致（含 database_url） |
| `execute_sql_check.ts` | SQL 执行 vs 真值 | 结果一致 + 拒绝口径一致 |
| `precheck.ts` | — | 连 MCP server 列工具（供 launcher 预检） |

**⚠ 编码坑（已固化在 `TextEncoder`）**：sentence-transformers 用 `do_lower_case=true` 老式分词，
而 fast tokenizer **不**自动小写 → 大写英文变 `[UNK]`，向量静默偏掉。编码前必须 `toLowerCase()`。

**⚠ MCP HTTP 模式**：必须 **stateful**（每会话新建 transport + McpServer 实例）；stateless 与
dsh/fastmcp 客户端握手不兼容。
