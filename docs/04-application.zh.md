# 应用：场景包（现有 `birdminidev` 与 `cloudopsbench`）

> **定位**：四篇叙事的 **④ 落地（解法）**——把 ①[背景与主张](01-background.zh.md)、②[概念](02-concept.zh.md)、③[设计](03-design.zh.md) 落成**一套可运行的内容包**。
> **一句话**：**一个场景 = 一套完整的 TSM 内容**，以 git 文本形态存在（Semantic Layer as Code）：可 diff、可评审、可回滚。
> 英文版：[04-application.md](04-application.md) ｜ 索引：[README.zh.md](README.zh.md)

> **每个场景自带一份「案例说明」**：`scenarios/<名>/README.md` —— 讲数据集的语义原料原来在哪、怎么被装进三层、每库的抽象决策。它与 [03-design.zh.md](03-design.zh.md) 互为呼应：**规范 ↔ 案例**。

## 一、一个场景包里有什么（实测结构）

```
scenarios/<场景>/
├── sources/
│   ├── configs/DLR/            # L1 建模源（dlr：一库一份 yaml；dlr-state：一系统一份 yaml）
│   ├── consensus/*.jsonl       # L2 领域共识源（按命名空间 / 槽类组织）
│   └── sop.md                  # L3 口径源（人写；`tsm build sop` 编译成按题检索索引）
├── eval/                       # 考卷 / 评测适配：自建题库（questions.jsonl）或外部基准适配（convert / grade / stats）
├── fixtures/                   # 对照真值（可选；birdminidev 用作回归快照）
├── results/<轮次>/             # 跑批留档（questions.csv + raw/ 或 traces/）
└── DETAIL.md · DETAIL/         # 评测总账 + 逐题明细（stats 重建）
```

**两个已落地场景（并重）**：

| | `birdminidev` | `cloudopsbench` |
|---|---|---|
| 场景形态 | `dlr`（SQLite NL2SQL） | `dlr-state`（K8s 状态空间 RCA） |
| L1 规模 | 11 库 · **50 LE / 74 PE / 37 PAS**（图 1,185 节点） | 2 系统 · **169 LE / 355 PE / 233 PAS**（53 服务 + 节点 + 命名空间） |
| L2 | 11 文件 · 91 条 | 1 文件 · 15 条（按槽类聚类） |
| L3 | 180 节（**按题**分节） | 5 节（**按症状措辞**分节，覆盖 754 例；节内是决策树） |
| 工具面 | 7 个 | 3 个（不装 Neo4j 图） |
| 评测内容 | 自建考卷：`eval/questions.jsonl` 500 题 | 外部基准：754 例 + 上游 scorer 适配 |
| 结果 | **500/500**（✅ 426 + 🔁 74） | **覆盖 754/754 · JRA 752/754（99.7%）** |

## 二、三层各写什么

### L1 `dlr` —— `sources/configs/DLR/*.yaml`

- 建模规范、自检清单：**唯一口径在 [03-design.zh.md](03-design.zh.md)**（本文不重复）。
- 一句话纪律：**只写数据源自身的事实**；L1 **不写题面口径**，也不写实例级事实（见 [02-concept.zh.md](02-concept.zh.md) §一"体系范围"）。
- **不做语义丰富度补充**（2026-09-24 定，公平性）：描述取自**数据集原生**——CSV 的 `column_name` / `column_description` / `value_description`，加上 evidence 里属于源自身的事实；**不引入外部知识**。发现的数据集缺陷**不在 L1 修**，交 L3 承载并标注（见下）。
- **`dlr-state`（COB）写什么**：一个系统一份 yaml；LE = 可指认对象（服务 / 节点 / 命名空间），PE = 对象的观测面（deployment / pods / endpoints / telemetry / logs / code……），每个面带**锚定读法模板**；锚 = 取数 WHERE 键（应用标签 / 节点名 / 命名空间），PAS = 调用图与载体/信号边。**放置与作用域不建边**（逐 case 的实例事实）。完整规范见 [03-design.zh.md](03-design.zh.md) §1.7.1。

### L2 `consensus` —— `sources/consensus/*.jsonl`

- **格式**：kid 聚合式 JSON 数组，每条 `{kid, knowledge}`（loader 也兼容 BIRD 式逐条 evidence）。
- **准入**（[02-concept.zh.md](02-concept.zh.md) §二）：**场景所需 · 基于 L1 schema · 非 workflow**；**不写实例级**。
- **写什么**：术语 → 列/值的映射、公式与口径、领域背景（如"CZK / EUR 是计费币种"）。
- **纪律**：**该下沉 L1 的就下沉**——源自身的事实（值域 / 粒度 / 样本性质）留在 L2 就是放错了层；按命名空间 / 槽类组织（bird：一库一份，namespace = 库名；COB：一类槽位一份，`kubernetes.jsonl` 10 条，按槽类聚类；通用读法标 `shared`，系统专属条目按 `boutique` / `trainticket` 标作用域）。
- **COB 的 L2**：schema 级读法、**工具/环境事实** + **L1 冲突裁决**（题面用词 ↔ 模型术语），含落位读法（pods 的 NODE 字段 → 节点面）；**不写走链顺序**（顺序归 L3），不写实例明细；通用条目 `shared`，系统专属条目按系统隔离。
- **语言**：与题面语言一致（英文）。

### L3 `sop` —— `sources/sop.md`

- **两种分节形态，同一条逐层消歧原则**：
  - **`birdminidev`（NL2SQL）：按题分节**——180 节，每节标题复述一道题（`### When asked: "..."`），正文给这道题的口径 / 打法 / 陷阱。
  - **`cloudopsbench`（RCA）：按症状措辞分节**——5 节覆盖 754 例；标题 = 题面症状措辞逐字，节内是**决策树**：链上实际观测 → 机制分支（Pending / 镜像 / 准入 / 路由……）→ 收口三件套（机制事件 + 事件面 + 配置）。**节少不等于薄：这是 SOP 的分层**（措辞层 → 分支层 → 收口层），见 [02-concept.zh.md](02-concept.zh.md) §六「逐层消歧」。系统专属分支在构建期按系统拆行（通用节标 `shared`），运行时由 `/mcp/boutique` / `/mcp/trainticket` 端点绑定作用域。
  - 共同的阅读协议：怎么匹配、没命中怎么办、本节只覆盖本题。
- **每节必须标注类型**（四类，可多选），写在标题下一行：`> **类型**：数据集问题`
  | 类型 | 指什么 |
  |---|---|
  | **数据集问题** | 题面 / gold / evidence 自身缺陷、样本窗口、错描述——**数据集的问题与麻烦在这里载** |
  | **建模冲突** | L1/L2 结构与题面的冲突、召回撞库（如"transactions"把召回带去别的库） |
  | **难题** | 题目本身难：口径陷阱、答案单位、计数单位、比值口径……需要打法 |
  | **其他** | 兜底（将来的企业口径 / 流程类内容落这里，或再细分） |
  标注**只供维护与统计，答题时一视同仁**（不改变该节的执行方式）。
  > 类型标注与 `Expected` 是 **bird 自建题库**的维护约定；COB 的 5 节按症状族维护、不写 `Expected`（判分在上游 scorer，见 §四）。
- **硬纪律**：**不写库表列原名**（2026-09-20 定）。判断标准：这句话是业务在说需求，还是数据库在自我介绍？
- **质量线**（2026-09-26 定）：③ 难题节**不能只复述题面 / 解释术语**——必须钉**实测的事实与陷阱**（计数、集合大小、并列/分布、易错读法），事实**先用 SQL 核过再写**；给出事实后要说明**该事实已确立、照此作答**（否则 agent 会把余量花在自证上）。
- **补强配方（按需，不是每节都要）**：若某题跑完发现 agent 在**反复自证**（同一节命中、口径也对，却烧掉大量 SQL 求证边界），按这三条补该节（实测实勘——q37，见 [birdmini README §四](../scenarios/birdminidev/README.zh.md)）：① 这题最容易走错的**岔路**是哪条？② 岔路有没有**可实测的具体后果**（数字 / 行数 / 另一个实体——「2,269 行里 218 行考生数为 0」「会选到 1900 Third Street, Alameda」这种粒度，而不是「有些/可能」）？③ 加一句**「已确立，照此作答」**（settled 语气是功能性的：它直接对应 agent 的核查预算）。**只在出问题的节上做**——节的自然写法优先，不要为了凑格式改写健康的节。
- **节的厚度**：L3 已检索化（`dlr_search_sop` 只取命中那一节）——**节变长不再有全局成本，只在该题命中时付费**。所以补事实时不必心疼字数。
- **Expected 一致性（不变量）**：`Expected` 里的每个值都必须落在**本节正文口径的答案集合内**（q27 反例为实勘案例，见 [birdmini README §四](../scenarios/birdminidev/README.zh.md)）。
- **可比口径**：裁定值写成 `> **Expected**：<值>`（多值用 `|` 分隔），判定/裁定都按它算；"真答案 = 空结果"的节**不写 Expected**，正文写清"空"的判据（判据认 `empty list / no data / 为空` 一类说法）。
- **准入**：**事后、按需**——运行暴露问题 → 归类 → 补节；不预写通用规则（n=1 不成为规则）。三档准入见 [02-concept.md §二](02-concept.zh.md)。
- **写完必须复跑**（2026-09-29 定）：节补完 → `tsm build sop` → **立刻跑该题对表**。节的生效时点晚于跑批时，归档里那一行还是补节前的结果，而它可能是被假阳性撑着的 ✅（两个迟到节案例 q1136/q1472 见 [birdmini README §四](../scenarios/birdminidev/README.zh.md)）。
- **范围限定（防跨题移植）**：节的告诫会被 agent 搬到同型的其他题（移植案例 q716 见 [birdmini README §四](../scenarios/birdminidev/README.zh.md)）。凡**可被推广的告诫**都要写明"它属于**本题**的口径"，并指出什么情形不适用（该节已补一句范围限定收口）。
- **交付**：`tsm build sop` 把源编译成 LanceDB 的 `sop` 索引（题面 → 节），由 `dlr_search_sop` 按题检索——**只取复述本题的那一节**（原 `sync_sop.sh` + `skills/sop` 整文件载入的传输方式已退役，2026-09-28）。真源仍只有这一份 `sop.md`。

## 三、`fixtures/` —— 对照真值

`fixtures/` 目前是 `birdminidev` 的回归快照；COB 的对照真值是上游 scorer 账本（`results/` + `DETAIL`，见 §四）。

| 文件 | 对照什么 |
|---|---|
| `dlr_vector_manifest.json` | YAML → 向量行（id / name / PAS 文本）逐字 |
| `py_semantic_query.json` | 语义召回的结构、顺序与 confidence |
| `py_consensus_search.json` | L2 检索的内容与分数 |
| `py_pe_mapping.json` | 第二跳全量映射（含 `database_url`），JSON 逐字节 |
| `py_execute_sql.json` | SQL 执行结果与拒绝口径 |

**2.0 定位 = 回归快照**：Python 线已删，这些不再是"跨实现 parity"，而是**改建模后的自证基线**——改了 YAML / consensus，跑 `src/verify/*` 看结果是否**符合预期地**变化；预期变化则一并更新快照。

## 四、`eval/` —— 考卷的两种形态（两场景并重）

- **形态 A：自建题库（birdminidev）**——`eval/questions.jsonl`，每题 `{question, expected, source}`（`source` = 口径来源，便于判错归因）；500 行 = **L3 节口径 74 处**（翻盘题的答案键）+ **gold 426 处**；生成器 `eval/build.mjs`（`node eval/build.mjs` 可复现，74/426 与评定分栏**逐项一致**）。
- **形态 B：外部基准适配（cloudopsbench）**——`eval/` 放的是适配器而非题库：`convert.mjs`（会话日志 → reference trace）· `run_eval.py`（复用上游 scorer）· `grade.sh`（一条命令判分）· `stats.mjs`（重建 STATS / DETAIL）。考卷本体是上游 754 例（`process-label` 全量），判分口径 = 上游 CA/FA/JRA + MC/EOC/ECR/EE，**没有人工翻盘口径**。
- **结果**：bird **500/500**（✅ 426 + 🔁 74）；COB **覆盖 754/754 · JRA 752/754（99.7%）**（轮次 230）。
- **考卷跟场景走、考试系统跟 dsh 走**（独立 bundle）——见 [eval.zh.md](eval.zh.md)。

## 五、评审：双读测试

每条语义条目入库前过**双读测试**（完整定义见 [02-concept.zh.md](02-concept.zh.md) §四）。

## 六、换场景 checklist

```bash
# 1) 指向新场景（或写进 .env 的 TSM_SCENARIO）
export TSM_SCENARIO="/abs/path/scenarios/<name>"

# 2) 构建三层（在仓库根起）
cd "TSM Core Service"
npx tsx src/build/buildLance.ts --all          # L1 向量（LE/PE/属性/PAS）
npx tsx src/build/buildConsensus.ts            # L2 向量（按 namespace）
npx tsx src/build/buildSop.ts                  # L3 索引（题面 → 节）
npx tsx src/graph/loadNeo4j.ts --all --wipe    # 图（⚠ 先停 MCP server：清库重建；dlr-state 场景不装图）
cd ..

# 3) 考卷（可选：从三层源生成）
node scenarios/<name>/eval/build.mjs

# 4) 自检
cd "TSM Core Service" && npx tsx src/verify/precheck.ts
```

> **`dlr-state` 场景**：一系统一份 yaml；构建 `buildLance` / `buildConsensus` / `buildSop` 即可，**跳过 `loadNeo4j`**（不装图）；单例验证走 `dsh_cob/run_one.sh <system> <category> <case_id>`，判分走 `scenarios/cloudopsbench/eval/grade.sh` + `stats.mjs`（见 [run.zh.md](run.zh.md) §2.1）。

## 七、换场景时不动的三样

| 不动的东西 | 为什么 |
|---|---|
| 认知层 `skills/paradigm`（TSM + DLR 范式认知） | **与场景无关**——这正是它单独存在的原因 |
| L3 工具名 `dlr_search_sop` | 固定名：换的是索引内容（`tsm build sop` 从场景源编译），不是模型层的选择 |
| MCP 工具面（冻结：`dlr` 形态 7 个——L1/L2/L3 语义 + `get_full_data_info` 下探 + `execute_sql` 取数；`dlr-state` 形态 3 个） | 契约冻结（见 [roadmap.zh.md](roadmap.zh.md) §一） |

## 相关

- 概念与准入判据：[02-concept.zh.md](02-concept.zh.md)｜DLR 建模规范：[03-design.zh.md](03-design.zh.md)
- 评测（考卷 + 考试系统）：[eval.zh.md](eval.zh.md)｜运行与排障：[run.zh.md](run.zh.md)
