# TSM Core Service（TS/Node）

2.0 线的 TSM 服务：**Neo4j（图）+ LanceDB（向量/证据）** 的 TypeScript 实现，与 Python 版
`Semantic Core Service/` **同 MCP 契约**（工具名、参数、返回结构一致），用于插件化（去掉 Python sidecar）。

> 评测线（v4 及后续轮）仍跑 Python + Kuzu/FAISS，本树不动它；两者靠 MCP 契约隔离。
> 背景与选型见 `memory: tsm-2.0-ts-stack`（Kuzu 上游 2025-10 已归档/被收购）。

## 目录

```
src/
├── model/{types,loadDlr}.ts     # DLR YAML → 向量行（逐字对齐 Python 构建器）
├── embed/encoder.ts             # TextEncoder：ONNX 本地推理，复刻 sentence-transformers 行为
├── store/lance.ts               # LanceDB 访问层（entities / evidence 两表）
├── graph/{physicalSchema,queries,loadNeo4j}.ts   # SQLite 类型扫描 / Neo4j 只读查询 / YAML→Neo4j 装载
├── queries/{semanticQuery,searchEvidence,peMapping}.ts  # 三个工具的实现
├── build/{buildLance,buildEvidence}.ts          # 构建向量表 / 证据表
├── mcp/server.ts                # MCP server（stdio + streamable-http）
└── spike/*.ts                   # 各类 parity 验证脚本
```

## 一次性准备

```bash
npm install
cp .env.example .env          # 填 NEO4J_PASSWORD（本机 Neo4j）
# ONNX 模型（本地跑，不联网）：从 hf-mirror 拉 Xenova/bge-small-zh-v1.5 到 tmp_scripts/bge-onnx/
#   需要 onnx/model.onnx + tokenizer.json + tokenizer_config.json + special_tokens_config.json + config.json
```

## 构建与运行

```bash
# 1) 向量表（DLR 全 11 库，948 行）
npx tsx src/build/buildLance.ts --all
# 2) 证据表（L2，11 namespace）
npx tsx src/build/buildEvidence.ts
# 3) 图（Neo4j）
npx tsx src/graph/loadNeo4j.ts --all --wipe
# 4) MCP server
npx tsx src/mcp/server.ts                    # stdio
npx tsx src/mcp/server.ts --http 28795       # streamable-http（dsh 可原生直连）
```

## 已验证的 parity（对照 Python 服务，2026-09-23）

| 环节 | 结果 |
|---|---|
| 向量行 | 948/948；id/name 集合零差；PAS 文本逐字一致 |
| Embedding | Node(ONNX) vs Python(sentence-transformers) **cosine = 1.000000** |
| L1 检索 | LE 选择/顺序/分数/confidence 逐位一致（如 0.7208） |
| L2 证据 | 内容/顺序/分数逐位一致 |

**⚠ 编码坑（已固化在 `TextEncoder`）**：sentence-transformers 用 `do_lower_case=true` 老式分词，
而 fast tokenizer **不**自动小写 → 大写英文变 `[UNK]`，向量静默偏掉（cosine 0.75~0.98）。
编码前必须 `toLowerCase()`。

**⚠ 已知差异**：运行中的 Python 服务里 `debit_card_specializing` 的 L2 索引是旧格式时代构建的
（返回 qid=1486…，仓库现文件是 kid=1… 聚合版）；新栈按当前文件构建。
