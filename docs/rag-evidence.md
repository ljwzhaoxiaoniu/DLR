# RAG Evidence — 语义检索升级

## 设计

将评测集从"带 evidence 提示的 NL2SQL"升级为"语义检索评测"。Agent 不再直接拿到 evidence，必须通过 `search_evidence` MCP 工具主动检索。

**前提（2026-08-25 起）**：Agent 为纯 question 模式（prompt 不注入 evidence），Ch2 检索是被测能力而非锦上添花。v2 与 v3 早期（40 题）实为 evidence 注入批次，与 v2 同条件。

三范式公平对比 — 11 个 topic-level collection 数据完全相同，区别在于每个范式携带的语义上下文（DLR 有 LE 层次化 description，ER/RDF 是扁平的表/class 描述）影响 Agent 利用 RAG 的能力。

## 文件结构

```
rag_knowledge/                 ← 直接编辑这里（两种格式，见下）
  financial.jsonl
  superhero.jsonl
  ...

Semantic Core Service/
  db/evidence_db.py            ← FAISS 向量库（11 个 collection）
  build_evidence.py            ← 从 rag_knowledge/ 重建索引
  storage/evidence/            ← 索引产出（FAISS index + metadata pickle）
```

## 日常迭代

```
# 改 evidence
vim rag_knowledge/financial.jsonl

# 重建索引（只重建改过的 topic）
python main.py build --evidence financial

# 全量 evidence
python main.py build --evidence ALL

# 清除
python main.py reset --evidence financial        # 单个
python main.py reset --evidence ALL              # 全部

# 重启服务
python main.py serve --paradigm ALL
```

## JSONL 格式

```json
{"qid": 89, "question": "How many accounts ...", "evidence": "A3 contains the data of region; 'POPLATEK PO OBRATU' represents for 'issuance after transaction'."}
```

改 `evidence` 字段即可，`qid` 和 `question` 不改。

## 知识数组格式（目标格式，card_games / debit_card_specializing 在用）

```json
[
  {"kid": 31, "knowledge": "Power & Toughness Values: ...", "source_qids": [346, 356, 408]}
]
```

- `knowledge` = 聚合后的领域知识（多条 evidence 的语义合并/消歧/修正），是唯一被嵌入索引的文本
- `kid` = 知识条目 id（检索返回的 qid 字段即它）；`source_qids` = 人肉元数据，不索引
- 一条知识对应多题（source_qids 数组）；同类术语归并成一条

**知识写法铁律**：写领域事实/出题人定义本身（术语->列/值、公式、条件），禁止对着题面写操作指令（背答案）；evidence 有错时以修正语义入库。

## MCP 工具

```
dlr_search_evidence(namespace, question, top_k=3)
er_search_evidence (namespace, question, top_k=3)
rdf_search_evidence(namespace, question, top_k=3)
```

`namespace` = db_id，Agent 从 semantic_query 返回结果的 `db` 字段获得。

## Agent Workflow（三通道，见 3-channel-design.md）

```
question -> [Ch1 semantic_query + Ch2 search_evidence + Ch3 skills/{db}.md 并行] -> 交叉验证锚定 -> mapping -> SQL -> Final Answer
```
