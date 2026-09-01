# 从建模配置到图/向量存储 —— 三范式写入链路

> 目的：让读者能逐字段追踪「配置文件里的一行」如何变成「Kuzu 图数据库的一个节点/边」和「FAISS 向量库的一条记录」。
> 全文使用同一个数据库 `debit_card_specializing`（round_1 评测用库）作贯穿样例，所有数字可用文末的验证方法复核。

## 0. 总览

```
configs/scenarios/{ER,DLR,RDF}/<db>.{yaml,ttl}
        │  mapping/{er,dlr,rdf}.py  →  Mapper.parse()
        ▼
ScenarioModel（ER/RDF: ERScenarioModel；DLR: DLRScenarioModel）
        │  service/build_service.py  →  BuildService.build()
        │    ├─ 0. 跨 preset ID 防重（BuildConflictError，同 id 不同归属直接中止）
        │    ├─ 1. 写 Kuzu 节点/边（db/graph_db.py，MERGE 幂等）
        │    └─ 2. 写 FAISS 向量（db/vector_db.py，文本 → bge-small-zh 512 维 → IndexFlatIP）
        ▼
storage/{er,dlr,rdf}/graph/（Kuzu） + storage/{er,dlr,rdf}/vector/vector.pkl（FAISS）
```

- 三范式**物理隔离**（各自 Kuzu + 各自 vector.pkl），范式内 11 个库合并存储；
- 每条向量记录的 metadata 带 `db` 字段（所属数据库名），支撑召回锁库（见 §4）；
- 构建入口：`python main.py build --paradigm ALL`，逐 preset 调 `mapper.parse()` + `build_service.build()`，先 `clear()` 一次再全量重写。
- **配置层溯源**：ER YAML 基于 `dev_tables.json`（数据集原生表/列描述）聚合+必要语义补充而来；DLR YAML、RDF R2RML 均以 ER 为基础生成——三范式语义层同源，Ch1/Ch2 非必要不增加（准入纪律见 docs/3-channel-design.md 原则）。

## 1. ER 范式（自研基线）

### 1.1 配置样例（`configs/scenarios/ER/debit_card_specializing.yaml` 节选）

```yaml
mapping_type: er
databases:
  debit_card_specializing: sqlite:///../MINIDEV_sqlite/dev_databases/debit_card_specializing/debit_card_specializing.sqlite
entities:
- entity_id: debit_card_specializing.customers        # 一表一实体，id 天然带库前缀
  biz_name: customers
  description: 'customers: identification of the customer; client segment; Currency'
  physical_table_id: debit_card_specializing.customers
  attributes:
  - attr_id: debit_card_specializing.customers.Segment
    biz_name: client segment
    description: client segment
    physical_column_id: debit_card_specializing.customers.Segment
    data_type: text
relations:
- relation_id: debit_card_specializing.yearmonth_TO_customers   # 物理 FK 关系
  biz_name: yearmonth_to_customers
  from_entity_attr_id: debit_card_specializing.yearmonth.CustomerID
  to_entity_attr_id: debit_card_specializing.customers.CustomerID
  description: yearmonth.CustomerID -> customers.CustomerID
```

### 1.2 解析与写入

解析器 `mapping/er.py::ERSemanticMapper` → `ERScenarioModel`（BizEntity / BizAttribute / BizRelation），其中 `database_url` 由 `databases` 字典按 `physical_table_id` 前缀解析为绝对路径。

**写入 Kuzu**（`build_service._build_er`）：

| YAML 字段 | Kuzu 节点/边 | 节点属性 |
|---|---|---|
| `entities[]` | `BizEntity` 节点 | `entity_id`(PK), `name`, `description`, `physical_table_id`, `database_url` |
| `attributes[]` | `BizAttribute` 节点 + `HAS_ATTRIBUTE` 边 | `attr_id`(PK), `name`, `description`, `physical_column_id`, `data_type` |
| `relations[]` | `RELATED_TO` 边（实体↔实体） | `relation_id`, `name`, `description`, `from/to_entity_attr_id` |

**写入 FAISS**（`build_service._build_er_vector` → `vector_db.insert_*`）：

| 对象 | 向量文本（被嵌入的字符串） | metadata |
|---|---|---|
| 实体 | `f"{name} {description}"` → `"customers customers: identification of the customer; client segment; Currency"` | `{id, name, type:"entity", description, db}` |
| 属性 | `f"{name} {description}"` → `"client segment client segment"` | `{id, name, type:"attribute", description, db}` |
| 关系 | `f"{name} {from_entity_name} {to_entity_name} {description}"` | `{id, name, type:"relation", from/to_entity_id, from/to_entity_attr_id, from/to_entity_name, description, db}` |

`db` 取值：`physical_table_id` 前缀（`"debit_card_specializing.customers"` → `"debit_card_specializing"`），关系取 `from_entity_attr_id` 前缀。

**本库产出**：27 条向量（5 实体 + 21 属性 + 1 关系；ER 配置来自 dev_tables.json，不含 sqlite_sequence）。

## 2. DLR 范式（原创核心）

### 2.1 配置样例（`configs/scenarios/DLR/debit_card_specializing.yaml` 节选）

```yaml
mapping_type: "dlr"
databases:
  debit_card_specializing: "sqlite:///MINIDEV_sqlite/dev_databases/debit_card_specializing/debit_card_specializing.sqlite"
logical_entities:
  - logical_entity_id: LOGICAL.Consumption          # LE：业务概念层，无库前缀
    biz_name: Consumption
    description: "Customer consumption records: monthly bills + transaction details"
    public_attributes:                               # LE 公共属性（身份锚点）
      - {attr_id: LOGICAL.Consumption.Customer, biz_name: Customer}
      - {attr_id: LOGICAL.Consumption.Date, biz_name: Date}
    physical_entities:                               # 嵌套表达 LE-PE 父子（INHERITS）
      - physical_entity_id: PHYSICAL.YearMonth       # PE id 必须全局唯一（BuildConflictError 强制）
        physical_table_name: yearmonth
        physical_table_id: debit_card_specializing.yearmonth
        A: {cardinality: "N:1", key: CustomerID}     # ARCS.A 锚定（Anchor）
        R: null                                      # ARCS.R 行过滤（Row，null=全表）
        C: {LOGICAL.Consumption.Customer: debit_card_specializing.yearmonth.CustomerID,
            LOGICAL.Consumption.Date: debit_card_specializing.yearmonth.Date}   # ARCS.C 列映射
        S: "Monthly gas consumption summary"          # ARCS.S 语义补注
        private_attributes:                           # PE 专有属性（带物理列）
          - {attr_id: debit_card_specializing.yearmonth.Consumption, biz_name: Volume,
             physical_column_id: debit_card_specializing.yearmonth.Consumption}
pas_relations:
  - relation_id: LOGICAL.Customer_TO_LOGICAL.Consumption   # PAS：LE 间语义路由
    relation_name: Generates
    P: {forward: {verb: generates, cardinality: '1:N'},    # 双向谓词
        reverse: {verb: belongs to, cardinality: '1:1'}}
    A: CustomerID                                          # 关联公共属性
    S: "1 customer generates N consumption records"        # 语义补注
```

### 2.2 解析与写入

解析器 `mapping/dlr.py::DLRSemanticMapper` → `DLRScenarioModel`（LogicalEntity / PhysicalEntity / PAS / ARCS）。LE-PE 父子关系由 YAML 嵌套表达，解析时收集为 `le.child_entity_ids`。

**写入 Kuzu**（`build_service._build_dlr`）：

| YAML 字段 | Kuzu 节点/边 | 节点属性 |
|---|---|---|
| `logical_entities[]` | `LogicalEntity` 节点 | `logical_entity_id`(PK), `name`, `description`（无 db 字段——LE 是纯逻辑概念） |
| `public_attributes[]` | `LogicalAttribute` 节点 + `HAS_LOGICAL_ATTRIBUTE` 边 | `attr_id`(PK), `name`, `description` |
| `physical_entities[]` | `PhysicalEntity` 节点 | `physical_entity_id`(PK), `name`, `description`, `physical_table_id`, **`arcs_a_anchor` / `arcs_r_row` / `arcs_c_column` / `arcs_s_semantic4arcs`**（A/R/C/S 四元组按 JSON 存四列） |
| （嵌套关系） | `INHERITS` 边（PE→LE） | — |
| `private_attributes[]` | `PhysicalAttribute` 节点 + 边 | `attr_id`(PK), `name`, `physical_column_id`, `data_type` |
| `pas_relations[]` | `PAS_RELATED_TO` 边（LE→LE） | `relation_id`, `relation_name`, `forward/reverse_verb`, `forward/reverse_cardinality`, `a_attribute`, `s_semantic` |

**写入 FAISS**（`build_service._build_dlr_vector`）：

| 对象 | 向量文本 | metadata |
|---|---|---|
| LE | `f"{name} {description}"` → `"Consumption Customer consumption records: monthly bills + transaction details"` | `{id, name, type:"logical_entity", description, db}` |
| PE | `f"{name} {description}"`（注意 type 与 ER 实体同为 `"entity"`） | `{id, name, type:"entity", description, db}` |
| PE 私有属性 | `f"{name} {description}"` | `{id, name, type:"attribute", description, db}` |
| PAS | `compile_vector_text()`（见下） | `{id, name, type:"pas_relation", from_le_id, to_le_id, A_attribute, description, db}` |

PAS 向量文本编译公式（`models/semantic_models.py::compile_vector_text`）：

```
"1个{from_le}{fwd.verb}{fwd.cardinality}个{to_le}；1个{to_le}{rev.verb}{rev.cardinality}个{from_le}；{from_le}和{to_le}通过{A}关联；{S}"
```

样例实际产出：

```
1个Customer generates 1:N个Consumption；1个Consumption belongs to 1:1个Customer；Customer和Consumption通过CustomerID关联；1 customer generates N consumption records
```

`db` 取值：PE / PE 属性取 `physical_table_id` 前缀；**LE 和 PAS 无物理锚点，取 preset 唯一库名**（每个 DLR YAML 恰好声明一个 `databases` 条目）。

**本库产出**：32 条向量 = 4 LE + 5 PE + 20 属性（私有属性 13 + ARCS.C 映射列 7）+ 3 PAS（LE 公共属性不入向量库，只进 Kuzu）。

## 3. RDF 范式（W3C R2RML 对照基线）

### 3.1 配置样例（`configs/scenarios/RDF/debit_card_specializing.ttl` 节选）

```turtle
@prefix rr: <http://www.w3.org/ns/r2rml#> .
@prefix ex: <http://example.org/> .

# === Table: debit_card_specializing.yearmonth (pk=Date) ===
<http://example.org/tm/debit_card_specializing/yearmonth> a rr:TriplesMap ;
    rr:logicalTable [ rr:tableName "yearmonth" ] ;
    rr:subjectMap [ rr:template "http://example.org/debit_card_specializing/{Date}" ; rr:class ex:yearmonth ] ;
    rr:predicateObjectMap [ rr:predicate <http://example.org/yearmonth/CustomerID> ; rr:objectMap [ rr:column "CustomerID" ; rr:datatype xsd:string ] ] ;
    rr:predicateObjectMap [ rr:predicate <http://example.org/yearmonth/Consumption> ; rr:objectMap [ rr:column "Consumption" ; rr:datatype xsd:string ] ] ;
    rr:predicateObjectMap [ rr:predicate <http://example.org/yearmonth/refers_to_customers> ;
        rr:objectMap [ rr:parentTriplesMap <http://example.org/tm/debit_card_specializing/customers> ;
                       rr:joinCondition [ rr:child "CustomerID" ; rr:parent "CustomerID" ] ] ] .
```

TTL 由 `tool&test/generate_r2rml.py` 从 SQLite 真实 FK（`PRAGMA foreign_key_list`）自动生成，不依赖 DLR 语义。

**如实说明两个已知特征**（对照实验的一部分）：
1. 主键列进 `rr:subjectMap rr:template` 而非 `predicateObjectMap`（上例 `Date` 是 pk），因此 `query_rdf_mapping` 返回的 columns 不含主键列 —— 这是当前生成器的已知缺陷（待修），评测中 RDF Agent 需靠 `PRAGMA table_info` 兜底；
2. `sqlite_sequence`（SQLite 自增元数据表）曾进入 4 个库的 TTL 且共用 class URI 跨库撞名：现由 `mapping/rdf.py` 解析时跳过 + `generate_r2rml.py` 生成时排除，TTL 文件中的残留块不再进入 Kuzu/FAISS。

### 3.2 解析与写入

解析器 `mapping/rdf.py::RDFSemanticMapper` 用 rdflib 读 TTL，**复用 ERScenarioModel 结构**（即 RDF 在 Kuzu/FAISS 侧与 ER 同构，这正是"召回阶段对齐"的实现方式）：

| TTL 结构 | 模型字段 | 说明 |
|---|---|---|
| `rr:subjectMap rr:class ex:yearmonth` | `BizEntity.entity_id` = **class IRI**（`http://example.org/yearmonth`，无库前缀） | 区别于 ER 的 `db.table` id |
| `rr:logicalTable rr:tableName` | `physical_table_id` = `f"{db}.{table}"` | db 来自 TTL 顶部注释对应的 YAML `database` 字段 |
| `rr:predicateObjectMap rr:column` | `BizAttribute`，attr_id = `f"{db}.{table}.{col}"` | |
| `rr:referencingObjectMap + rr:joinCondition` | `BizRelation` | 端点是 class IRI |

**写入 Kuzu**：与 ER 完全同一套表（BizEntity/BizAttribute/RELATED_TO/HAS_ATTRIBUTE）。

**写入 FAISS**：属性/关系同 ER 公式；**实体的向量文本被融合文本覆盖**（`rdf.py` 生成 `_rdf_vec_texts`，`build_service._build_er_vector` 检测到 RDF 时替换 description）：

```
f"{db_name} {table_name} {col1} {col2} ... ->{join_target_table}"
```

样例实际产出（yearmonth）：

```
debit_card_specializing yearmonth CustomerID Consumption ->customers
```

> 融合文本的首 token 就是库名 —— 让 FAISS 能按"库 + 表 + 列名"整体召回物理表，补偿 R2RML 无业务描述的先天弱势（对照公平性设计）。

`db` 取值：实体/属性取 `physical_table_id` 前缀（**不能用 entity_id**——它是 class IRI）；关系端点是 IRI，回退 preset 唯一库名。

**本库产出**：23 条向量（5 实体 + 16 属性 + 2 关系，sqlite_sequence 已排除）。

## 4. db 元数据与召回锁库（2026-07-18）

- 每条向量 metadata 带 `db`；`VectorDB.search(query, top_k, db=None)` 传 db 时全量检索后按 `metadata["db"]` 过滤（三库 637~975 条规模下 IndexFlatIP 全扫为亚毫秒级）；
- 5 个 MCP 召回工具（`er/dlr/rdf_semantic_query`、`recall_pe`、`recall_pas`）支持可选 `db` 参数，召回候选统一带 `db` 字段；
- Agent 流程：**首跳全局召回**（从候选 db 分布判断问题归属库 = 语义路由定位库）→ **锁库后传 db** 防跨库漂移。Agent 不预先拿到 db_id（评测 Prompt 只传 Question + Evidence）。

## 5. 数字核账（可复现验证）

```bash
# 全量校验：pkl 元数据 / PE 唯一性 / INHERITS 单挂 / 锁库召回
cd "Semantic Core Service"
python "tool&test/verify_db_recall.py"    # 预期 RESULT: ALL PASS

# 手工抽查 debit_card_specializing 的 DLR 向量记录
python -c "
import pickle
d = pickle.load(open('storage/dlr/vector/vector.pkl','rb'))
recs = [m for m in d['metadata'] if m['db']=='debit_card_specializing']
from collections import Counter
print(Counter(m['type'] for m in recs))   # {'attribute':20,'entity':5,'logical_entity':4,'pas_relation':3} = 32
"
```

| 范式 | 全库总向量 | 其中 debit_card_specializing | 构成 |
|---|---|---|---|
| ER | 975 | 27 | 5 实体 + 21 属性 + 1 关系 |
| DLR | 637 | 32 | 4 LE + 5 PE + 20 属性 + 3 PAS |
| RDF | 903 | 23 | 5 实体 + 16 属性 + 2 关系 |
