# 三范式 yaml/ttl → 图结构 & 向量库 全映射

> 本文回答一个问题：**每个建模范式的配置文件里，哪些内容进了图结构（Kuzu），哪些内容以什么文本模板拼进了向量库（FAISS）**。
> 代码依据：`Semantic Core Service/service/build_service.py`、`db/graph_db.py`、`db/vector_db.py`、`mapping/{er,dlr,rdf}.py`、`models/semantic_models.py`（行号以 2026-09-10 工作区为准）。

## 0. Build 管线总览

```
configs/scenarios/{ER|DLR}/{db}.yaml（或 RDF/{db}.ttl）
   → ConfigLoader + 范式 mapper（er.py / dlr.py / rdf.py）→ ScenarioModel
   → BuildService.build()（build_service.py:69）
       ├─ 图结构：GraphDB 写 Kuzu（节点 + 边）
       └─ 向量库：VectorDB 写 FAISS（每条记录 = 一段拼好的文本 → SentenceTransformer 编码 → 归一化 → IndexFlatIP）
```

- 一次 `clear()` → build 11 个 preset → `save()`，11 库合并进**同一个** Kuzu + **同一个** FAISS（build_service.py:69-77）。
- 向量检索：FAISS 内积（归一化后等价余弦）；`db` 过滤时小库全量扫描、大库超采（vector_db.py:20-23, 240-298）。
- 向量库每条记录的元数据带 `type`（entity/attribute/relation/logical_entity/pas_relation）与 `db`（所属库名，检索过滤用）。

---

## 1. ER（`configs/scenarios/ER/{db}.yaml`）

### 1.1 进了图结构（Kuzu：`BizEntity` / `BizAttribute` / `HAS_ATTRIBUTE` / `RELATED_TO`，graph_db.py:86-118）

| yaml 字段 | Kuzu 落点 |
|---|---|
| `entities[].entity_id` | BizEntity.entity_id（主键） |
| `entities[].biz_name` | BizEntity.name |
| `entities[].description`（表级描述） | BizEntity.description |
| `entities[].physical_table_id` / `databases` 解析出的 URL | BizEntity.physical_table_id / database_url |
| `attributes[].attr_id` | BizAttribute.attr_id（主键） |
| `attributes[].biz_name` | BizAttribute.name |
| `attributes[].description`（列级描述） | BizAttribute.description |
| `attributes[].physical_column_id` / 物理扫描补的 `data_type` | BizAttribute.physical_column_id / data_type |
| entity→attribute | 边 `HAS_ATTRIBUTE` |
| `relations[]` 每条 | 边 `RELATED_TO`：relation_id、name=biz_name、description、from/to_entity_attr_id（端点实体由 attr id 提取实体段） |

**ER 是字段级全吸收**：yaml 里写什么，图里存什么（entity 描述、属性描述全部落图）。

### 1.2 进了向量库（FAISS，build_service.py:155-200 + vector_db.py 模板）

| 记录类型 | 文本模板（空格拼接） | 代码 |
|---|---|---|
| 实体向量 | `"{biz_name} {description}"` | vector_db.py:89 |
| 属性向量 | `"{biz_name} {description}"` | vector_db.py:116 |
| 关系向量 | `"{biz_name} {from_entity_name} {to_entity_name} {description}"`（四段） | vector_db.py:143 |

即：实体/属性 = 名字+描述两段；关系额外拼两端实体名。**09-10 重写后**：列级 `biz_name` = CSV column_name（如 "client segment"）、`description` = CSV column_description + value_description 原文（如 `Price. commonsense evidence: total price = Amount x Price`），因此 ER 的属性向量文本 = 数据集原生语义。

---

## 2. DLR（`configs/scenarios/DLR/{db}.yaml`）

### 2.1 进了图结构（Kuzu：物理层 + 逻辑层六张表，graph_db.py:120-211）

**逻辑层**

| yaml 字段 | Kuzu 落点 |
|---|---|
| `logical_entities[].logical_entity_id` / `biz_name` / `description`（LE 业务描述） | LogicalEntity 三字段 |
| `public_attributes[].attr_id` / `biz_name` / `description`（**LE 业务语义，非 CSV 原文**） | LogicalAttribute 三字段 |
| LE→LA | 边 `HAS_LOGICAL_ATTRIBUTE` |

**物理层**

| yaml 字段 | Kuzu 落点 |
|---|---|
| `physical_entities[].physical_entity_id` / `physical_table_name` | PhysicalEntity.physical_entity_id / name |
| `physical_entities[].S`（ARCS 语义补注） | PhysicalEntity.description |
| `physical_entities[].physical_table_id` | PhysicalEntity.physical_table_id |
| `physical_entities[].A` | PhysicalEntity.arcs_a_anchor（JSON 序列化字符串） |
| `physical_entities[].R` | PhysicalEntity.arcs_r_row（原样） |
| `physical_entities[].C` | PhysicalEntity.arcs_c_column（**JSON 序列化字符串，非边**） |
| `physical_entities[].S` | PhysicalEntity.arcs_s_semantic4arcs |
| PE attributes = **C 继承属性 + private_attributes 合并**（dlr.py:96-122）：C 映射列的 name/description 取自 LE public 同名字段（业务语义）；private 的 name/description 取自 yaml | PhysicalAttribute 节点 + `HAS_ATTRIBUTE` 边 |
| LE↔PE | 边 `INHERITS`（PhysicalEntity → LogicalEntity） |
| `pas_relations[]` | 边 `PAS_RELATED_TO`：relation_name、forward/reverse verb+cardinality、A_attribute、S_semantic4pas；端点 LE 由 relation_id `"LOGICAL.A_TO_LOGICAL.B"` 拆分 |

### 2.2 进了向量库（build_service.py:306-357 + vector_db.py:181-238）

| 记录类型 | 文本模板 | 代码 |
|---|---|---|
| LE 向量 | `"{name} {description} {public_attrs_text}"`，其中 `public_attrs_text = " ".join("{attr.name} {attr.description}")`（仅 public attrs、空描述跳过） | build_service.py:314-318, vector_db.py:186 |
| PE 向量 | `"{name} {description}"`（description = S） | vector_db.py:89 |
| PE 属性向量 | `"{name} {description}"`——**C 映射列带 LE 业务文本，private 列带 CSV 原文**（09-10 对齐后） | vector_db.py:116 |
| PAS 向量 | `compile_vector_text()`（semantic_models.py:135-150）：`1个{A}{fwd.verb}{fwd.cardinality}个{B}` + 反向句 + `{A}和{B}通过{A_attribute}关联` + S（有则加） | vector_db.py:215 |

**DLR 的双层要点**：LE 层（描述、public 属性）承载业务聚合/加工语义，原样进图进向量；PE 层是物理注册表——ARCS 四字段以 JSON 字符串挂在 PhysicalEntity 节点属性上（不是图边），C 映射列的属性文本复用 LE public 语义，private 属性文本 = 数据集 CSV 原文。

---

## 3. RDF（`configs/scenarios/RDF/{db}.ttl`，R2RML）

RDF 不走自己的 Kuzu schema——`mapping/rdf.py` 把 R2RML 解析成 **ER 形态的 ScenarioModel**，复用 `_build_er` 的同一条 Kuzu/FAISS 写入路径（rdf.py:1-10）。

### 3.1 进了图结构（复用 ER 的 Kuzu 表，但内容口径不同）

| ttl 内容 | Kuzu 落点 | 口径差异 |
|---|---|---|
| TriplesMap 的 `rr:class`（subjectMap） | BizEntity.entity_id = **class IRI**（如 `http://example.org/customers`，非表名！），name = IRI 末段 | ER 用 `db.table` 作 entity_id |
| — | BizEntity.description = `"[RDF] R2RML class {class_node}"`（结构性占位，非语义） | ER 是表级语义描述 |
| 每个 `rr:column` 的 predicateObjectMap | BizAttribute：attr_id = `db.table.col`，name = predicate URI 末段（=列名），**description = rdfs:comment**（rdf.py，09-10 公平性补齐） | ER 属性描述进图 |
| 每个 `referencingObjectMap` | 边 `RELATED_TO`：name = `refers_to_x`，description = `"[RDF] referencingObjectMap -> {parent_table}"`，端点 = class IRI | 同 ER 边表 |

### 3.2 进了向量库（RDF 分支的关键机制：实体向量文本被融合文本覆盖）

- **实体向量**：`_build_er_vector` 检测 RDF 后，用 `_rdf_vec_texts` **覆盖**实体描述（build_service.py:164-168）。融合文本模板（rdf.py:264-278）：

  ```
  "{db} {table}: col1(comment1) col2(comment2) ... ->parent_table1 ->parent_table2"
  ```

  ——每列拼成 `列名(rdfs:comment)`，引用对象映射拼成 `->父表名`。**这就是"列融合代偿"**：RDF 的召回入口是 class（单条实体向量），把整表列+注释压进这条入口向量保证按自然语言问题可召回物理表；列级 comment（09-10 起）另走属性向量。
- **属性向量**：`"{predicate 末段} {rdfs:comment}"`（09-10 补齐：comment 进属性向量，与 ER 同模板）
- **关系向量**：同 ER 四段模板（name/from/to/description 用上面的 RDF 口径）。

### 3.3 第三条表面：serve 期 rdflib 映射定义图（不走 Kuzu/FAISS）

`rdf_store/rdf_service.py` 在服务启动时直接把 ttl parse 进内存 rdflib Graph（rdf_service.py:44-64）。MCP 的 `rdf_semantic_query` / `rdf_search` / `rdf_sparql` / `mapping_for_class` 查的是**这个图**——`rdfs:comment` 与 `rdfs:label` 在这里对 agent 可见（实测 `mapping_for_class` 返回 table/columns/relations，不含 subjectMap 模板）。

**RDF 因此有两条内容通路**：

| 通路 | 内容 | 时机 |
|---|---|---|
| build 期 Kuzu + FAISS | 实体（class IRI + 结构占位描述）、属性（rdfs:comment，09-10 补齐）、关系（结构占位）、实体融合向量（列+comment） | `main.py build` |
| serve 期 rdflib 图 | 完整 R2RML：rr:column、rdfs:label、rdfs:comment、joinCondition、subjectMap | 服务启动加载 |

---

## 4. 聚合方式（2026-09-10 活库实测）

| 范式 | 向量条目结构 | 是否聚合 |
|---|---|---|
| ER | 每实体 1 条（表名+表级描述）+ 每列 1 条（列名+列级描述）+ 每关系 1 条（四段）；全库 975 = 75+798+102 | **不聚合，三层独立** |
| DLR | 每 LE 1 条（name+description+**全部 public attrs 拼入**）+ 每 PE 1 条（name+S）+ PE 属性每条 1 条 + 每 PAS 1 条（编译句） | **LE 层聚合**；PE 层不聚合 |
| RDF | 每实体 1 条**融合文本**（db table: 列(comment)… ->父表）+ 每列 1 条（列名+comment，09-10 补齐）+ 每关系 1 条；全库 974 = 75+798+101 | **实体层聚合**（列融合代偿）；属性不聚合 |

**DLR 同列双条目**：同一物理列若同时被 C 映射且列在 private_attributes 中，向量库出现两条——C 继承条目带 LE 业务文本、private 条目带 CSV 原文（如 debit_card `customers.Segment`：`Customer segment: SME=Small Business…` + `client segment`）。继承+私有并存是 DLR 既有设计：业务语义与物理原文各占一个召回面。

## 5. 三范式对照速查

| | ER | DLR | RDF |
|---|---|---|---|
| 图-实体节点 | BizEntity（db.table 为 id） | LogicalEntity + PhysicalEntity 双层 | BizEntity（class IRI 为 id，复用 ER 表） |
| 图-属性描述 | ✅ yaml 原文 | LE=业务语义；PE private=CSV 原文（C 映射列复用 LE 文本） | ✅ rdfs:comment（09-10 起进 Kuzu；此前仅 rdflib 图） |
| 图-关系 | RELATED_TO（dataset FK） | INHERITS + PAS_RELATED_TO（ARCS 的 C 以 JSON 挂节点属性） | RELATED_TO（referencingObjectMap，结构占位描述） |
| 向量-实体 | `name + description` | LE：`name + description + public attrs 全拼`；PE：`name + S` | `db table: 列(comment)… ->父表…` 融合文本 |
| 向量-属性 | `name + description` | `name + description`（C 列=LE 文本，private=CSV 原文） | `列名 + comment`（09-10 起与 ER 同模板） |
| 向量-关系 | `name + 两端实体名 + description` | PAS 编译句（双向谓词 + A 关联 + S） | 同 ER 四段模板（结构占位） |
| 列级物理描述来源（09-10 后） | CSV column_description + value_description 原文 | private 同上；LE 层保留业务语义 | rdfs:comment 同上（rdflib 图 + 融合向量 + 属性向量/Kuzu） |

## 6. 与 09-10 配置重写的关系

三范式物理层描述统一为数据集 CSV 原文后，上表的口径即当前生效状态：ER 的图/向量全带 CSV 原文；DLR 的 PE private 层带 CSV 原文、LE 业务层保留建模语义（分层不变）；RDF 的 CSV 原文走 rdflib 图 + 实体融合向量 + 属性向量（rdfs:comment，09-10 补齐进 Kuzu 与 FAISS）三条通路。

## 7. 召回面与公平性（2026-09-10 定调）

### 7.1 三范式的召回面设计

每个范式的 `*_semantic_query` 都以**该范式的顶层语义对象**为召回入口，且底层命中类型的处理方式各不相同：

| 范式 | 召回入口（顶层对象） | 底层命中处理 | 列级信息的到达通路 |
|---|---|---|---|
| ER | 实体 | 实体命中直接输出；关系命中**常参与**反推实体；属性命中仅**fallback**（无实体命中时才反推，query_service.py:78-85） | 属性向量（列名+CSV 原文）在实体向量（表级概括）失手时兜底 |
| DLR | **LE（仅 LE）** | 属性/PE/PAS 命中搜索后**有意丢弃**（mcp_server.py `dlr_semantic_query` 只消费 `logical_entity` 类型） | **LE 融合向量**——LE 描述 + 全部 public attrs 文本拼进一条入口向量，列级语义在入口层内建 |
| RDF | **class（仅 class）** | 属性命中**有意丢弃**（`rdf_semantic_query` 只消费 `entity` 类型） | **实体融合向量**——整表列名+comment 压进一条入口向量（列融合代偿） |

### 7.2 为什么大方向公平

1. **入口面 = 各范式语义面**：ER 召回实体、DLR 召回 LE、RDF 召回 class——agent 拿到的正是各范式顶层导航对象，与后续范式工具链（get_entity_mapping / ARCS·PAS / get_rdf_mapping）无缝衔接。
2. **列级文本三范式各有通路**：ER 靠属性向量 fallback、DLR 靠 LE 融合、RDF 靠列融合——通路机制不同（08-27 定的「向量文本组成各按范式形态」），但每个范式都有从题面术语到列级语义的召回路径，无一方被剥夺。
3. **索引层同词同义**：09-10 配置重写后物理层描述统一为 CSV 原文；待办①（RDF 属性向量补 comment）已完成（rdf.py），rebuild 后三范式 per-attribute 索引文本完全对称。
4. **旋钮对称**：db 过滤、VectorDB 检索机制三范式共享；top_k 已统一对齐 10（er/rdf 20→10，dlr 保持，待办②完成，生效需重启 serve）。

### 7.3 保留的形态差异（被测变量，不抹平）

- ER 属性命中的 fallback 机制 vs DLR/RDF 的丢弃——召回力学差异，与各自入口向量的文本丰度互补（ER 入口瘦、兜底在属性层；DLR/RDF 入口胖、无需属性层兜底）
- DLR 的 14 个探索类工具已禁注册（recall_pe/path_*/is_* 等，v3 决策：使用率 <5% 且诱发过度探索）
- RDF 的 SPARQL 通道定位为逃生舱：R2RML 只做映射内省、从不物化数据三元组，SPARQL 功能域与 get_rdf_mapping/rdf_search 重叠；归档 30 题 0 次使用是理性冗余（详见待办③）

相关待办见 memory `todo-fairness-optimization`：① RDF 入库补 comment（✅ 09-10 代码已改，待 rebuild）、② top_k 对齐 10（✅ 代码已改，待重启）、③ SPARQL 定位、④ 验证、⑤ 文档同步（✅）。
