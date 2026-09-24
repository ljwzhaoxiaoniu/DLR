# 场景：`birdminidev` —— DLR 建模的应用案例

> **定位**：把 TSM + DLR 应用到一份真实数据集上的**案例**。
> **规范与原则**（LE 是什么 / PE 是什么 / 库表如何抽象成两层 / 建模规则与自检）在 **[docs/03-design.md](../../docs/03-design.md)**；
> 本文讲**这个案例**：数据集的语义原料原来在哪 → 怎么被装进三层 → 每库的抽象决策 → 怎么运行与自证。
> 场景包规范（目录约定、换场景 checklist）：[docs/04-application.md](../../docs/04-application.md)。

## 一、数据集原生语义：原来在哪

| 原料 | 位置 | 内容 |
|---|---|---|
| **列级说明** | `MINIDEV_sqlite/dev_databases/<db>/database_description/*.csv` | `original_column_name, column_name, column_description, data_format, value_description`（BIRD 原生；**部分列的描述为空**） |
| **表/列/外键** | `MINIDEV_sqlite/dev_tables.json` | 表名、列名、外键——**外键不全**（如 debit_card 只登记了 1 条） |
| **物理真相** | `<db>.sqlite` 本体 | `PRAGMA table_info / foreign_key_list`——**类型与 FK 以此为准** |
| **题目与 evidence** | `MINIDEV_sqlite/mini_dev_sqlite.json` | `{question_id, db_id, question, evidence, SQL, difficulty}`；**evidence 是出题人给的提示**——L2/L3 主要由此派生 |

## 二、正向装载：原料 → 三层

```
database_description/*.csv（列说明）─┐
dev_tables.json（表/列/关系）────────┼─▶ L1 `dlr`（逐库表列全覆盖；每条描述可追源）
SQLite PRAGMA（真实类型/FK）────────┘        ↑ 行使 correction 权：CSV 空白由 L1 补；历史失真由 L1 注明
evidence 中属于「源自身」的部分 ─────────────┘（值域 / 粒度 / 样本窗口 / 枚举 / 编码）
evidence 的剩余 ──────────────────────────▶ L2 `consensus`（题面口径 / 术语映射 / 背景；非 workflow）
建模 bug · 数据集 bug · 召回冲突 · 难题拆解 ─▶ L3 `sop`（题级打法与陷阱）
```

**对账即自证**：`tsm coverage`（开发态）把这三步变成三张对账单——L1 列级/关系级（硬）、L2 残差（启发式）。见 §五。

## 三、本场景的模型（应用结果）

| 库 | LE | PE（表 → LE） | PAS | 表/列 | 抽象决策（要点） |
|---|---|---|---|---|---|
| california_schools | 2 | School ← schools ｜ SchoolPerformance ← satscores+frpm | 1 | 3/89 | 两个成绩视角（sat / frpm）归一个 LE |
| card_games | 4 | Card ← cards ｜ CardExtension ← legalities+rulings+foreign_data ｜ CardSet ← sets ｜ SetTranslation ← set_translations | 3 | 6/115 | 同卡的多视角（法律性/裁定/外文印）收敛为一个 LE |
| codebase_community | 6 | User ← users ｜ Post ← posts ｜ PostInteraction ← comments+postHistory+postLinks ｜ Tag ← tags ｜ Badge ← badges ｜ Vote ← votes | 4 | 8/71 | 三种"帖子交互"归一个 LE；Tag/Badge/Vote 各自独立 |
| debit_card_specializing | 4 | Customer ← customers ｜ Consumption ← yearmonth+transactions_1k ｜ GasStation ← gasstations ｜ Product ← products | 3 | 5/21 | 月度汇总与逐笔样本**两种粒度**同属 Consumption，差异由各自 PE 说明 |
| european_football_2 | 4 | Player ← Player+Player_Attributes ｜ Team ← Team+Team_Attributes ｜ Match ← Match ｜ League ← League | 2 | 7/199 | 「主表 + 属性面」成对归一个 LE |
| financial | 6 | Account ← account+disp+card ｜ Client ← client ｜ District ← district ｜ Loan ← loan ｜ Transaction ← trans ｜ PermanentOrder ← order | 6 | 8/55 | 纯 junction（disp）与卡**下沉为 PE**；有独立生命周期的 Loan/Transaction/Order 升独立 LE |
| formula_1 | 8 | Driver ← drivers ｜ Circuit ← circuits ｜ Race ← races ｜ DriverRaceData ← qualifying+results+lapTimes ｜ DriverStandings ← driverStandings ｜ PitStop ← pitStops ｜ Constructor ← constructors ｜ ConstructorRaceData ← constructorResults+constructorStandings | 4 | 13/94 | 一场比赛的多视角（排位/结果/圈速）归一个 LE |
| student_club | 8 | Member ← member ｜ Event ← event ｜ Attendance ← attendance ｜ Budget ← budget ｜ Expense ← expense ｜ Income ← income ｜ Major ← major ｜ ZipCode ← zip_code | 7 | 8/48 | member↔event 的桥（attendance）独立成 LE；Major/ZipCode 作维度 |
| superhero | 3 | Superhero ← superhero+colour+race+gender+publisher+alignment ｜ Power ← hero_power+superpower ｜ Attribute ← hero_attribute+attribute | 2 | 10/31 | 5 张碎片维度表收敛进主 LE（"碎表集中"样板）；Power/Attribute 独立 LE + PAS |
| thrombosis_prediction | 1 | Patient ← Patient+Laboratory+Examination | 0 | 3/64 | 3 表共享 `PatientID` 锚键 → **1 LE + 3 PE + 0 PAS**（ARCS 隐式编码 JOIN） |
| toxicology | 3 | Molecule ← molecule ｜ Atom ← atom ｜ Bond ← bond+connected | 3 | 4/11 | bond+connected 合成一个 LE；Atom/Molecule 各自 |
| **合计** | **49** | **72 PE** | **35** | 1133 节点 | |

## 四、怎么运行与自证

```bash
cd "TSM Core Service"
tsm build            # 向量（LanceDB）+ 图（Neo4j 兼容样例）
tsm verify           # 回归套件（对 fixtures 自证；fixtures = 回归快照）
tsm viz --open       # 看结构（LE/PE/ARCS/PAS 图谱页）
tsm coverage         # 覆盖度对账（本场景离"最优解"的差距）
```
跑题与排障见 [docs/run.md](../../docs/run.md)；换场景见 [docs/04-application.md](../../docs/04-application.md)。

## 五、当前差距（2026-09-24 首份对账，`tsm coverage`）

| 指标 | 结果 |
|---|---|
| L1 列覆盖 | **11 库全 0 缺** ✓（表/列已全覆盖） |
| 非 public 描述偏离 CSV 原文 | 146 处（card_games 41 · football 40 · california 28 …）；formula_1 / toxicology / debit_card 为 0 |
| 真实 FK 未表达（非锚键/非 public/无 PAS） | 47 处（football 26 · superhero 9 · codebase 6 · formula_1 4 · student_club 2） |
| L2 源格式 | 仅 card_games / debit_card 为**聚合式（已加工）**；**其余 9 库仍是 evidence 原文（418 条待加工）** |

**后续**：① 规则决策——非 public 描述是否必须等于 CSV 原文（或承认"为召回加工的偏离"并记来源）；② 逐库整改（L2 瘦身 / 关系补齐 / 描述归位），用 `tsm build + verify + viz` 自证。

## 六、目录速查

```
scenarios/birdminidev/
├── README.md            # ← 本文（案例说明：原料 → 装载 → 决策 → 自证）
├── sources/
│   ├── configs/{ER,DLR,RDF}/   # L1 建模源（本线消费 DLR；ER/RDF 为评测线遗留）
│   ├── consensus/*.jsonl       # L2 源（11 库；两种格式：聚合式 / 逐题式）
│   └── sop.md                  # L3 源（题级打法；sync_sop.sh 的输入）
└── fixtures/                   # 回归快照（verify 套件对照）
```
