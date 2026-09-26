# 应用：场景包（当前 `birdminidev`）

> **定位**：四篇叙事的 **④ 落地（解法）**——把 ①[背景与主张](01-background.md)、②[概念](02-concept.md)、③[设计](03-design.md) 落成**一套可运行的内容包**。
> **一句话**：**一个场景 = 一套完整的 TSM 内容**，以 git 文本形态存在（Semantic Layer as Code）：可 diff、可评审、可回滚。

> **每个场景自带一份「案例说明」**：`scenarios/<名>/README.md` —— 讲数据集的语义原料原来在哪、怎么被装进三层、每库的抽象决策。它与 [03-design.md](03-design.md) 互为呼应：**规范 ↔ 案例**。

## 一、一个场景包里有什么（实测结构）

```
scenarios/birdminidev/
├── sources/
│   ├── configs/{ER,DLR,RDF}/   # L1 建模源（11 库 × 3 范式；本线消费 DLR）
│   ├── consensus/*.jsonl       # L2 领域共识源（11 库各一份）
│   └── sop.md                  # L3 口径源（sync_sop.sh 的输入）
└── fixtures/                   # 对照真值（verify 套件用，见 §三）
```

现状规模：图 **LE 49 / PE 72 / PA 792 / LA 220 / PAS 35**；向量 **entities 948 · consensus 458**；共识覆盖 11 个 namespace。

## 二、三层各写什么

### L1 `dlr` —— `sources/configs/DLR/*.yaml`

- 建模规范、自检清单：**唯一口径在 [03-design.md](03-design.md)**（本文不重复）。
- 一句话纪律：**只写数据源自身的事实**；L1 **不写题面口径**，也不写实例级事实（见 [02-concept.md](02-concept.md) §一"体系范围"）。
- **不做语义丰富度补充**（2026-09-24 定，公平性）：描述取自**数据集原生**——CSV 的 `column_name` / `column_description` / `value_description`，加上 evidence 里属于源自身的事实；**不引入外部知识**。发现的数据集缺陷**不在 L1 修**，交 L3 承载并标注（见下）。

### L2 `consensus` —— `sources/consensus/*.jsonl`

- **格式**：kid 聚合式 JSON 数组，每条 `{kid, knowledge}`（loader 也兼容 BIRD 式逐条 evidence）。
- **准入**（[02-concept.md](02-concept.md) §二）：**场景所需 · 基于 L1 schema · 非 workflow**；**不写实例级**。
- **写什么**：术语 → 列/值的映射、公式与口径、领域背景（如"CZK / EUR 是计费币种"）。
- **纪律**：**该下沉 L1 的就下沉**——源自身的事实（值域 / 粒度 / 样本性质）留在 L2 就是放错了层；一库一份文件（namespace = 库名）。
- **语言**：与题面语言一致（英文）。

### L3 `sop` —— `sources/sop.md`

- **形态**：**按题面分节**——每节标题复述一道题（`### When asked: "..."`），正文给这道题的口径 / 打法 / 陷阱；文件头部是一段**阅读协议**（怎么匹配、没命中怎么办、本节只覆盖本题）。
- **每节必须标注类型**（四类，可多选），写在标题下一行：`> **类型**：数据集问题`
  | 类型 | 指什么 |
  |---|---|
  | **数据集问题** | 题面 / gold / evidence 自身缺陷、样本窗口、错描述——**数据集的问题与麻烦在这里载** |
  | **建模冲突** | L1/L2 结构与题面的冲突、召回撞库（如"transactions"把召回带去别的库） |
  | **难题** | 题目本身难：口径陷阱、答案单位、计数单位、比值口径……需要打法 |
  | **其他** | 兜底（将来的企业口径 / 流程类内容落这里，或再细分） |
  标注**只供维护与统计，答题时一视同仁**（不改变该节的执行方式）。
- **硬纪律**：**不写库表列原名**（2026-09-20 定）。判断标准：这句话是业务在说需求，还是数据库在自我介绍？
- **质量线**（2026-09-26 定）：③ 难题节**不能只复述题面 / 解释术语**——必须钉**实测的事实与陷阱**（计数、集合大小、并列/分布、易错读法），事实**先用 SQL 核过再写**；给出事实后要说明**该事实已确立、照此作答**（否则 agent 会把余量花在自证上）。
- **可比口径**：裁定值写成 `> **Expected**：<值>`（多值用 `|` 分隔），判定/裁定都按它算；"真答案 = 空结果"的节**不写 Expected**，正文写清"空"的判据（判据认 `empty list / no data / 为空` 一类说法）。
- **准入**：**事后、按需**——运行暴露问题 → 归类 → 补节；不预写通用规则（n=1 不成为规则）。三档准入见 [02-concept.md §二](02-concept.md)。
- **部署**：`sync_sop.sh` 从源生成 **bundle 内**的 `dsh-tsm/skills/sop/SKILL.md`（加 frontmatter）。**部署出去的技能名永远是 `sop`**——"用哪套"发生在配置层，模型层永远不需要选。

## 三、`fixtures/` —— 对照真值

| 文件 | 对照什么 |
|---|---|
| `dlr_vector_manifest.json` | YAML → 向量行（id / name / PAS 文本）逐字 |
| `py_semantic_query.json` | 语义召回的结构、顺序与 confidence |
| `py_consensus_search.json` | L2 检索的内容与分数 |
| `py_pe_mapping.json` | 第二跳全量映射（含 `database_url`），JSON 逐字节 |
| `py_execute_sql.json` | SQL 执行结果与拒绝口径 |

**2.0 定位 = 回归快照**：Python 线已删，这些不再是"跨实现 parity"，而是**改建模后的自证基线**——改了 YAML / consensus，跑 `src/verify/*` 看结果是否**符合预期地**变化；预期变化则一并更新快照。

## 四、`eval/` —— 考卷（约定，尚未落地）

- 每个场景自带考卷：`eval/questions.jsonl`，每题 `{question, expected, source}`（`source` = 口径来源，便于判错归因）。
- **考卷跟场景走、考试系统跟 dsh 走**（独立 bundle）——见 [eval.md](eval.md)。

## 五、评审：双读测试

每条语义条目（L1 描述 / L2 条目 / L3 节）入库前过**双读**：一个不懂技术的业务人员读一遍**不皱眉**，一个裸 LLM 读一遍**能执行**。两条都过才入库——人的皱眉就是模型的报错（[02-concept.md](02-concept.md) §四）。

## 六、换场景 checklist

```bash
# 1) 指向新场景（或写进 .env 的 TSM_SCENARIO）
export TSM_SCENARIO="/abs/path/scenarios/<name>"

# 2) 构建三层
cd "TSM Core Service"
npx tsx src/build/buildLance.ts --all          # L1 向量（LE/PE/属性/PAS）
npx tsx src/build/buildConsensus.ts            # L2 向量（按 namespace）
npx tsx src/graph/loadNeo4j.ts --all --wipe    # 图（⚠ 先停 MCP server：清库重建）

# 3) L3 部署件
cd "../DSH-based Agent Service/dsh_dlr" && bash sync_sop.sh "<场景路径>/sources/sop.md" sop

# 4) 自检
cd "../../TSM Core Service" && npx tsx src/verify/precheck.ts
```

## 七、换场景时不动的三样

| 不动的东西 | 为什么 |
|---|---|
| 认知层 `skills/paradigm`（TSM + DLR 范式认知） | **与场景无关**——这正是它单独存在的原因 |
| 部署技能名 `sop` | 固定名：换的是配置层的内容，不是模型层的选择 |
| MCP 工具面（5 个） | 契约冻结（见 [roadmap.md](roadmap.md) §一） |

## 相关

- 概念与准入判据：[02-concept.md](02-concept.md)｜DLR 建模规范：[03-design.md](03-design.md)
- 评测（考卷 + 考试系统）：[eval.md](eval.md)｜运行与排障：[run.md](run.md)
