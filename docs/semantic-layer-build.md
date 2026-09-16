# 三范式 yaml/ttl → 图结构 & 向量库 全映射

> 本文回答一个问题：**每个建模范式的配置文件里，哪些内容进了图结构（Kuzu），哪些内容以什么文本模板拼进了向量库（FAISS）**。
> 代码依据：`Semantic Core Service/service/build_service.py`、`db/graph_db.py`、`db/vector_db.py`、`mapping/{er,dlr,rdf}.py`、`models/semantic_models.py`（行号以 2026-09-11 工作区为准）。

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
| PE attributes = **该 PE 的统一属性表**（09-12 schema）：`attributes: [{column, biz_name, description, public?}]`，每列一条。`public: true` 的 name/description 是业务语义（透传到 LE 面）；未标记的是数据集原文。`data_type` 由物理扫描补 | PhysicalAttribute 节点 + `HAS_ATTRIBUTE` 边 |
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
| 每个 `rr:column` 的 predicateObjectMap | BizAttribute：attr_id = `db.table.col`，**name = rdfs:label**（= ER biz_name；09-11 起，缺失才回退 predicate 末段），**description = rdfs:comment**（09-10 起），data_type = 物理扫描（09-10 起） | ER 属性描述进图 |
| 每个 `referencingObjectMap` | 边 `RELATED_TO`：relation_id = `db.{class}_TO_{parent}`（09-11 起带库前缀，与 ER 同构），name = `refers_to_x`，**description = `{table}.{child} -> {parent_table}.{parent}`（09-11 起取 `rr:joinCondition`，与 ER 同格式）**，端点 = class IRI | 同 ER 边表 |

### 3.2 进了向量库（RDF 分支的关键机制：实体向量文本被融合文本覆盖）

- **实体向量**：`_build_er_vector` 检测 RDF 后，用 `_rdf_vec_texts` **覆盖**实体描述（build_service.py:164-168）。融合文本模板（rdf.py:269-283）：

  ```
  "{db} {table}: col1(comment1) col2(comment2) ... ->parent_table1 ->parent_table2"
  ```

  ——每列拼成 `列名(rdfs:comment)`，引用对象映射拼成 `->父表名`。**这就是"列融合代偿"**：RDF 的召回入口是 class（单条实体向量），把整表列+注释压进这条入口向量保证按自然语言问题可召回物理表；列级 comment（09-10 起）另走属性向量。
- **属性向量**：`"{rdfs:label} {rdfs:comment}"`（09-10 补 comment、09-11 起 name 走 rdfs:label —— 与 ER 的属性向量 `{biz_name} {description}` 逐字同文本）
- **关系向量**：同 ER 四段模板（name/from/to/description 用上面的 RDF 口径）。

### 3.3 第三条表面：serve 期 rdflib 映射定义图（不走 Kuzu/FAISS）

`rdf_store/rdf_service.py` 在服务启动时直接把 ttl parse 进内存 rdflib Graph（rdf_service.py:44-64）。MCP 的 `rdf_semantic_query` / `rdf_search` / `rdf_sparql` / `mapping_for_class` 查的是**这个图**——`rdfs:comment` 与 `rdfs:label` 在这里对 agent 可见（实测 `mapping_for_class` 返回 table/columns/relations，不含 subjectMap 模板）。

**RDF 因此有两条内容通路**：

| 通路 | 内容 | 时机 |
|---|---|---|
| build 期 Kuzu + FAISS | 实体（class IRI + 结构占位描述）、属性（rdfs:comment，09-10 补齐）、关系（09-11 起含 FK 列，与 ER 同格式）、实体融合向量（列+comment） | `main.py build` |
| serve 期 rdflib 图 | 完整 R2RML：rr:column、rdfs:label、rdfs:comment、joinCondition、subjectMap | 服务启动加载 |

---

## 4. 聚合方式（2026-09-10 活库实测）

| 范式 | 向量条目结构 | 是否聚合 |
|---|---|---|
| ER | 每实体 1 条（表名+表级描述）+ 每列 1 条（列名+列级描述）+ 每关系 1 条（四段）；全库 975 = 75+798+102 | **不聚合，三层独立** |
| DLR | 每 LE 1 条（name+description+**全部 public attrs 拼入**）+ 每 PE 1 条（name+S）+ PE 属性每条 1 条 + 每 PAS 1 条（编译句） | **LE 层聚合**；PE 层不聚合 |
| RDF | 每实体 1 条**融合文本**（db table: 列(comment)… ->父表）+ 每列 1 条（列名+comment，09-10 补齐）+ 每关系 1 条；全库 974 = 75+798+101 | **实体层聚合**（列融合代偿）；属性不聚合 |

**DLR 同列双条目（已于 09-12 消除）**：旧 schema 下同一物理列若同时被 C 映射且在 private_attributes 中，会存两条（业务文本 + CSV 原文），向量库出两条。09-12 schema 统一为"每列一条 + public 标记位"后，**这 5 处合并为一条，取 public（业务文本）**：`cards.id`、`customers.Segment`、`customers.Currency`、`account.district_id`、`client.district_id`。DLR 属性向量 797 → **792**。

## 5. 三范式对照速查

| | ER | DLR | RDF |
|---|---|---|---|
| 图-实体节点 | BizEntity（db.table 为 id） | LogicalEntity + PhysicalEntity 双层 | BizEntity（class IRI 为 id，复用 ER 表） |
| 图-属性描述 | ✅ yaml 原文 | `public: true` = 业务语义（透传自 LE 面）；未标记 = 数据集原文 | ✅ rdfs:comment（09-10 起进 Kuzu；此前仅 rdflib 图） |
| 图-属性 data_type | ✅ 物理扫描 | ✅ 物理扫描（09-11 起；此前 797 条全 None） | ✅ 物理扫描（09-10 起） |
| 图-关系 | RELATED_TO（dataset FK） | INHERITS + PAS_RELATED_TO（ARCS 的 C 以 JSON 挂节点属性） | RELATED_TO（referencingObjectMap 的 FK 列，09-11 起与 ER 同格式） |
| 向量-实体 | `name + description` | LE：`name + description + public attrs 全拼`；PE：`name + S` | `db table: 列(comment)… ->父表…` 融合文本 |
| 向量-属性 | `name + description` | `name + description`（C 列=LE 文本，private=CSV 原文） | `name + description`（09-11 起 name 走 rdfs:label，与 ER 逐字同文本） |
| 向量-关系 | `name + 两端实体名 + description` | PAS 编译句（双向谓词 + A 关联 + S） | 同 ER 四段模板（description 09-11 起含 FK 列） |
| 列级物理描述来源（09-10 后） | CSV column_description + value_description 原文 | private 同上；LE 层保留业务语义 | rdfs:comment 同上（rdflib 图 + 融合向量 + 属性向量/Kuzu） |

### 5.1 两笔必须记的账（09-11 核账）

**① 物理列 id 三范式同构**：ER/RDF 列 id 一直无引号（`california_schools.frpm.Academic Year`），DLR 早期带引号（`frpm."Academic Year"`），导致 id 集不能直接对齐、且会让 data_type 查表失配。09-11 已去引号（california_schools 43 处 + thrombosis_prediction 12 处，共 37 列），现 **DLR id ∩ ER = 792/798，DLR 无 ER 之外的 id**。
> 副作用：DLR 的 `physical_column_id` 不再自带引号，含空格/括号的列（如 `Free Meal Count (K-12)`）写 SQL 时需自行加引号 —— 与 ER/RDF 同等要求。

**② DLR 未覆盖 3 表 6 列**（建模有意"有的对齐、没有的不硬挂"，非缺陷但必须记账）：

| 未覆盖 | 列 |
|---|---|
| european_football_2.Country | id, name |
| formula_1.seasons | url, year |
| formula_1.status | statusId, status |

即 DLR 属性 792 条 vs ER/RDF 798 条，差额即此 6 列。三个维度表的列级语义在 DLR 侧无召回路径。

**③ 图（Kuzu）与向量（FAISS）的条目数校验**（09-11 核账，三范式对账口径）：

| 范式 | 关系 向量/边 | 属性 向量/节点 | 说明 |
|---|---|---|---|
| ER | 102 / **102** ✅ | 798 / 798 ✅ | 22 条 `Match_TO_Player` 共享 relation_id，但 `from_entity_attr_id` 逐条不同 → Kuzu 保留平行边，不合并 |
| RDF | 101 / ~~72~~ → **101** | 798 / 798 ✅ | 09-11 前关系描述是占位符（同表对 22 条 FK 属性全同）→ MERGE 塌缩 29 条边；09-11 起描述取 `rr:joinCondition` 的 FK 列，属性唯一 → 恢复 1:1（**待 rebuild 生效**） |
| DLR | 35 / 35 ✅ | **792 / 792** ✅ | 09-12 schema 统一后每列一条，图与向量 1:1（旧版 797 条含 5 处同列双条目，已消除） |

**对账口诀**：图与向量应当 **1:1**。09-12 起三范式均为 1:1（DLR 的同列双条目已消除；RDF 仅缺 1 条关系 `League→Country`，见账②）。

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
3. **索引层同词同义**：09-10 配置重写后物理层描述统一为 CSV 原文；09-11 起 RDF 属性索引的 name 也改走 `rdfs:label`（补掉最后一处 name 口径差，此前取 predicate URI slug）。至此 per-attribute 索引文本（name + description）三范式逐字一致：RDF 798/798、DLR private 552/552 与 ER 同名同描述（**重建后生效** —— 当前活库仍是 slug 口径，待办见 §7 ⑥⑦⑧）。
4. **旋钮对称**：db 过滤、VectorDB 检索机制三范式共享；top_k 已统一对齐 10（er/rdf 20→10，dlr 保持，待办②完成，生效需重启 serve）。

### 7.3 保留的形态差异（被测变量，不抹平）

- ER 属性命中的 fallback 机制 vs DLR/RDF 的丢弃——召回力学差异，与各自入口向量的文本丰度互补（ER 入口瘦、兜底在属性层；DLR/RDF 入口胖、无需属性层兜底）
- DLR 的 14 个探索类工具已禁注册（recall_pe/path_*/is_* 等，v3 决策：使用率 <5% 且诱发过度探索）
- RDF 的 SPARQL 通道定位为逃生舱：R2RML 只做映射内省、从不物化数据三元组，SPARQL 功能域与 get_rdf_mapping/rdf_search 重叠；归档 30 题 0 次使用是理性冗余（详见待办③）

### 7.4 召回交付链路（命中 → agent 手里的对象）

共同框架：`search(question, top_k×3, db)` 混排命中 → 按 `type` 分流 → 归并算分 → 剪裁交付。三范式逐步对照（行号为 `service/query_service.py` / `mcp_server.py`）：

| 步骤 | ER | DLR | RDF |
|---|---|---|---|
| 召回深度 | 首跳 k=30（MCP 默认 10×3）；锁库后小库全量扫描 | 同（`max(top_k×3,20)`） | 同 |
| 实体命中 | 计分（同实体取 max） | LE 计分 | class 计分（工具侧去重） |
| 关系命中 | **反算两端实体，无条件计分**（:69-76） | PAS **丢弃** | **丢弃** |
| 属性命中 | **反算父实体（id 前缀 `extract_entity_id`），仅当无实体/关系命中时**（:78-85，fallback） | **丢弃**（PE 命中也丢弃） | **丢弃，无 fallback** |
| 空召回语义 | 无实体分 / max<0.415（`CONFIDENCE_THRESHOLD`）→ `success:false`「未找到相关实体」 | `success:true, confidence:0.0, structures:[]`——无区分语义 | `success:true, confidence=混排 max` 但 `classes:[]`——分非零却无交付 |
| 组装 | `_expand_er`：实体 + attributes + relations（关系补两端实体名） | LE + 其 PEs（id/name/db/description）+ public_attributes | 仅 class（class_uri/name/description/db） |
| 剪裁（交付前） | 剥 source_table/database_url/attributes/relations → `{entity_id, name, description, db}` | 剥 physical_table_id/database_url → structures（DLR 交付带 PE 层，为后续 ARCS 映射铺路） | 剥 source_table/database_url → `{class_uri, name, description, db}` |
| confidence | max(归并后实体分) | max(LE 分) | max(**混排**分)——口径与交付面不一致 |

### 7.5 已知缺口与改造方向（2026-09-16，q1472 DLR 实证）

- **缺口① 首跳混排截断**：首跳不分类型取前 30 条再按类型过滤——目标类型排名 >30 即空交付。q1472 DLR 实证：LE 排名 31–60，该题 PE/属性命中在 30 内却被丢弃 → `confidence 0.0` 空响应；agent 无从区分"无此库"与"没召到"，只能改问法重试（两轮均如此，多烧 2–3 步）。**量化**：顶层类型本就是索引少数派（DLR 49 LE/948≈5.2%、ER 75 实体/975≈7.7%、RDF 75 class/974≈7.7%），混排 top-30 期望只命中 1.6–2.3 条；题面词汇天然偏列/值层（属性与 PE 描述排前排），归零并不罕见
- **缺口② 子层命中处理三家不一**：ER 有归并（关系常参与 + 属性 fallback），DLR / RDF 丢弃——**这是设计差异（入口向量瘦 ↔ 融合），不是缺陷**；评测解读时记账即可
- **修复（2026-09-16 已改码，重启 serve 生效）：召回收口位置修正**——**只改位置，不动收口逻辑与形态差异**：现在"先截断、后收口"（取混排 top-30 再按类型过滤）→ 改为**"先收口、后截断"**：**全量召回**（~950–975 条小库，成本可忽略）→ 归并去重（score=max）→ 排序取前 top_k 个顶层对象交付——**交付条数按范式定：DLR 5 / ER 20 / RDF 30**（按实测条均字符折算 ≈0.9k/0.9k/1.2k token，**token 量级对齐**，用户 2026-09-16 定；RDF 稍多，补它扁平形态的深度需求）。**两个动作两个目的**：截断（检索侧）= 检索经济；收口后交付一致性（三范式都 ≤5 个顶层对象、同构字段）= token 经济 + 幻觉低——缺陷本质 = 截断被错当成收口的输入边界。**不抹平形态差异**：DLR/RDF 不补子层归并（属 §7.3 被测变量）。RDF confidence 顺带改为取**归并后顶层对象**的 max（与 ER/DLR 对齐，此前取混排 max）。改后受影响批次按单轮重跑纪律处理

相关待办见 memory `todo-fairness-optimization`：① RDF 入库补 comment、② top_k 对齐 10 —— 09-10 落地**且已生效**（rebuild：ER 15:12 / DLR 15:13 / RDF 15:43；serve 三进程重启 15:45），不再挂"待"字；③ SPARQL 定位=逃生舱、④ 验证、⑤ 文档同步（✅）。

09-11 新增五项，代码已改、**待 rebuild + 重启**：⑥ RDF 属性索引 name 走 rdfs:label、⑦ DLR 属性 data_type 补齐、⑧ DLR 列 id 去引号、⑨ RDF 关系 id 带库前缀 + 描述取 `rr:joinCondition`（修图/向量 72 vs 101 的塌缩）、⑩ DLR 同列双条目在构建期显式打日志（口径与账见 §5.1）。

**09-12 schema 统一（DLR）**：`LE.public_attributes + PE.C + PE.private_attributes` 三处合一 → `PE.attributes: [{column, biz_name, description, public?}]`（设计依据见 `docs/modeling.md` §1.5）。**这同时消掉了 5 处同列双条目**：DLR 属性向量 797 → 792、DLR 全库 953 → 948。迁移脚本 `tmp_scripts/migrate_dlr_schema.py`（幂等，可重跑）。回归：792 条唯一无重复、`ARCS.C` 重建与旧 yaml 等价（12 处 id 大小写/拼写改为 `{LE}.{biz_name}` 一致式）、LE public 面 220 条不变、PAS.A 闭环 34/35（口径="落在两侧之一"，此前按"必须在源侧"误判为 15/35）。**待 rebuild 生效。**

另有两项属评测链路（不需要 rebuild，但**重跑基线前必须落地**，否则新旧混跑）：⑪ `Evaluation/scripts/01_run_agent.py` 的 prompt 去掉三范式工具名与 L1→L2 串行配方（改为"先 /mcps 自发现"，与 AGENTS.md 一致），并把"续跑跳过"改为只跳过**成功**的题（失败/超时留下的输出文件不再被当作成功）。

## 8. 数字核账（可复现，2026-09-10 实测）

```bash
# 全量校验：pkl 元数据 / PE 唯一性 / INHERITS 单挂 / 锁库召回
cd "Semantic Core Service"
# ⚠ 须先停 serve（脚本要开 Kuzu 写锁，serve 在跑会报 Could not set lock）
python "tool&test/verify_db_recall.py"    # 预期 RESULT: ALL PASS
```

| 范式 | 全库总向量 | debit_card_specializing | 构成 |
|---|---|---|---|
| ER | 975 | 27 | 5 实体 + 21 属性 + 1 关系 |
| DLR | **948** | **33** | 4 LE + 5 PE + 21 属性（16 public + 5 private）+ 3 PAS —— 09-12 schema 统一后（旧：953 / 35，含 5 处同列双条目） |
| RDF | 974 | 27 | 5 实体 + 21 属性 + 1 关系 |

（ER/RDF 与 DLR 的库级差 = 各范式结构互换算：ER/RDF 实体+关系 ↔ DLR LE+PE+PAS。）

**09-11 补的三项不改任何计数**，但可在 pkl 直接查：RDF 属性 `(name, description)` 与 ER 逐条相等；DLR 属性 `id` 无 ER 之外的写法（无引号）、`data_type` 非空（Kuzu 侧看，属性向量 metadata 不含 data_type）。
