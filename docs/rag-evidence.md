# RAG Evidence（Ch2）— 知识库的两组组织哲学

## 设计

将评测集从"带 evidence 提示的 NL2SQL"升级为"语义检索评测"。Agent 不再直接拿到 evidence，必须通过 `search_evidence` MCP 工具主动检索。

**前提（2026-08-25 起）**：Agent 为纯 question 模式（prompt 不注入 evidence），Ch2 检索是被测能力而非锦上添花。v2 与 v3 早期（40 题）实为 evidence 注入批次，与 v2 同条件。

三范式公平对比 —— 11 个 topic-level collection 数据完全相同，区别在于每个范式携带的语义上下文（DLR 有 LE 层次化 description，ER/RDF 是扁平的表/class 描述）影响 Agent 利用 RAG 的能力。

---

## 🔴 两组：原始组 / 对照组（2026-09-14 定调）

知识库有**两种组织哲学**，对应两个组，**目的不同、不可互相替代**：

| | **原始组** | **对照组** |
|---|---|---|
| **做法** | **对数据集的 naive 吸收**——材料是什么层级，就放在什么层级 | **按三范式的定义重新组织**语义层 |
| **分流方式** | 按**材料来源**分层（见下表） | 按**范式定义**分层（LE/PE/public、实体/属性、class/predicate） |
| **目的** | 与 **NL2SQL 对照**——证明三级通道（Ch1/Ch2/Ch3）**稳定且可行** | 验证**高效、少积累**；让每个领域沉淀**自己的行业资产** |
| **知识加工量** | 最少（不重写、不聚合、不跨题归并） | 高（逐条判定去向 + 聚合 + 消歧 + 修正） |
| **现状（2026-09-14）** | **9 个 topic**：california_schools / codebase_community / european_football_2 / financial / formula_1 / student_club / superhero / thrombosis_prediction / toxicology —— 逐题原文，**条数 == 该库题数**（30/49/51/32/66/48/52/50/40） | **2 个 topic**：card_games（21 条）/ debit_card_specializing（19 条）—— kid 聚合，**条数远少于题数** |

> **条数差就是证据**：对照组条数 < 题数，因为一部分 evidence **下沉**去了 Ch1、一部分**上浮**去了 Ch3，只有"该留在 Ch2"的才聚合进 kid。

### 原始组：naive 吸收（按材料来源分层）

| 材料来源 | 去向 | 说明 |
|---|---|---|
| **数据源级的** | 吸收到**数据源级** | 数据集自带的 `database_description/*.csv`（列描述、值域）→ 进 Ch1 模型 description |
| **领域共识级** | 吸收 **evidence** | 出题人写的 evidence 原文 → **照单全收**进 Ch2（逐题一条，不聚合、不消歧、不修正） |
| **都搞不定的** | **沉淀 SOP** | 前两级消化不掉的 → Ch3 skills 条目 |

**原始组的价值**：最大程度贴近数据集原貌，知识加工量≈0——它回答的是"**不额外做知识工程，三级通道能不能跑通**"。与 NL2SQL 对照，证明架构本身稳定可行。

### 对照组：按三范式定义重组（按范式定义分层）

对 evidence 逐条判定去向，**三级分流**：

```
evidence 一条
   ├─ "这个数据怎么存"（数据语义/值域/同名列消歧）→ 下沉 Ch1（模型 description）
   │      锚定实体时零成本携带，token 与条目数都更少
   ├─ "题目这句话查什么列"（术语→列/值、出题人公式）→ 保留 Ch2（kid 聚合）
   │      同类术语归并成一条，source_qids 记多题
   └─ "这种题容易怎么错"（过程性陷阱/跨题模式/本题裁定）→ 上浮 Ch3（SOP 条目）
          前两级结构上解决不了的，才升到这里
```

**对照组的价值**：知识放在"用的时候最省"的层级——**该下沉的沉下去**（agent 锚定实体时顺带拿到）、**该保留的留下来**（检索命中即用）、**搞不定的上浮**（per-question 兜底）。目标是**高效 + 少积累**：每个领域积累的是**自己的行业资产**（领域事实、术语、口径），而不是逐题的答案搬运。

> **两组的关系**：原始组是"不加工的对照"，对照组是"加工后的目标形态"。跨库推进时，一个 topic **默认处于原始组状态**；对它做按范式定义的重组后，它才进入对照组。

### 判定口诀（分流时逐条问）

1. "这个数据怎么存" → **下沉 Ch1**（模型 description）
2. "题目这句话查什么列" → **保留 Ch2**（RAG）
3. "这种题容易怎么错" → **上浮 Ch3**（SOP）

---

## 知识写法铁律

**写领域事实 / 出题人定义本身**（术语→列/值、公式、条件），**禁止对着题面写操作指令**（背答案）；evidence 有错时以修正语义入库。

- **Ch2 是 fixed 的**（2026-09-04 强调，q1481 负值教训）：evidence 里没有的事实**不可事后补进 Ch2**——结果驱动的知识只经 **Ch3** 一个阀门准入
- **Ch1/Ch2 非必要不增加**：对它们的每次增改都是对评测环境（数据集原生语义）的修改，加多了三范式对比失真
- **不写 SQL 成品 / few-shot 模板**（模板挖空题面即答案 95%）
- 评测元信息（gold 对错、evidence 缺陷）**不进**知识层，只进 `docs/dataset.md`

---

## 文件结构

```
rag_knowledge/                 ← 直接编辑这里（两种格式，见下）
  financial.jsonl              ← 原始组格式：逐题 {"qid","question","evidence"}
  debit_card_specializing.jsonl ← 对照组格式：kid 聚合数组
  ...

Semantic Core Service/
  db/evidence_db.py            ← FAISS 向量库（11 个 collection）
  build_evidence.py            ← 从 rag_knowledge/ 重建索引
  storage/evidence/            ← 索引产出（FAISS index + metadata pickle）
```

## 日常迭代

```bash
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

> ⚠️ **改完 `rag_knowledge/` 必须重建对应索引并重启服务**——索引不会自动跟随文件变化。

## 格式一：逐题原文（原始组）

```json
{"qid": 89, "question": "How many accounts ...", "evidence": "A3 contains the data of region; 'POPLATEK PO OBRATU' represents for 'issuance after transaction'."}
```

改 `evidence` 字段即可，`qid` 和 `question` 不改。**一行一题，条数 == 该库题数**。

## 格式二：知识数组（对照组，card_games / debit_card 在用）

```json
[
  {"kid": 31, "knowledge": "Power & Toughness Values: ...", "source_qids": [346, 356, 408]}
]
```

- `knowledge` = 聚合后的领域知识（多条 evidence 的语义合并/消歧/修正），**唯一被嵌入索引的文本**
- `kid` = 知识条目 id（检索返回的 `qid` 字段即它）；`source_qids` = 人肉元数据，不索引
- 一条知识对应多题（`source_qids` 数组）；同类术语归并成一条

> **从原始组升级到对照组**：逐条读 evidence → 按"判定口诀"分流（下沉/保留/上浮）→ 只把"保留"的部分按同类归并成 kid → 重建索引。分流出去的部分分别落进 `configs/scenarios/{ER,DLR,RDF}/` 的 description 与 `skills/{db}.md`。

## MCP 工具

```
dlr_search_evidence(namespace, question, top_k=3)
er_search_evidence (namespace, question, top_k=3)
rdf_search_evidence(namespace, question, top_k=3)
```

`namespace` = db_id，Agent 从 `semantic_query` 返回结果的 `db` 字段获得。

## Agent Workflow

```
question → [Ch1 semantic_query + Ch2 search_evidence + Ch3 skills/{db}.md 并行]
         → 交叉验证锚定 → mapping → SQL → Final Answer
```

见 [3-channel-design.md](3-channel-design.md)。

---

## 相关文档

- [3-channel-design.md](3-channel-design.md) —— 三通道协作协议、边界判断表、知识分层四层准入
- [modeling.md](modeling.md) —— Ch1 语义层的建模规范（下沉的目的地）
- [runbook.md](runbook.md) —— 索引重建与服务重启的操作口径
