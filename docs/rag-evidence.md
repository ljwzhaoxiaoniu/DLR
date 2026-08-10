# RAG Evidence — 语义检索升级

## 设计

将评测集从"带 evidence 提示的 NL2SQL"升级为"语义检索评测"。Agent 不再直接拿到 evidence，必须通过 `search_evidence` MCP 工具主动检索。

三范式公平对比 — 11 个 topic-level collection 数据完全相同，区别在于每个范式携带的语义上下文（DLR 有 LE 层次化 description，ER/RDF 是扁平的表/class 描述）影响 Agent 利用 RAG 的能力。

## 文件结构

```
rag_knowledge/                 ← 直接编辑这里（JSONL，每行一个 question 的 evidence）
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

## MCP 工具

```
dlr_search_evidence(namespace, question, top_k=3)
er_search_evidence (namespace, question, top_k=3)
rdf_search_evidence(namespace, question, top_k=3)
```

`namespace` = db_id，Agent 从 semantic_query 返回结果的 `db` 字段获得。

## Agent Workflow

```
question → semantic_query → search_evidence → mapping → SQL
```
