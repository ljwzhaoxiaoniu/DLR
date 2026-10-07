# CLAUDE.md — 给执行 agent 的入口

> 本文件是本仓库的**执行约定与索引**。规则只写在这里；具体操作写在下文指向的文档里，**不要在三处重复**。

## 分支说明（2026-09-23 起）

本检出在分支 **`2.0`**：DLR + TSM 的**持续线**（不再是评测轮次）。与 `dlr-eval-v1.5` 已面目全非 → **各自分支演进，不要求跨分支一致**。

- **2.0 日常**：`scenarios/<场景>/`（一套完整 TSM 的内容：`sources/{configs=L1, consensus=L2, sop.md=L3}` + `eval/`（考卷）+ `fixtures/`，当前 `birdminidev`）＋ `TSM Core Service/`（TS 语义服务：LanceDB + Neo4j）＋ `DSH-based Agent Service/`（dsh 接入）
- **评测线**（v4 基线、opencode 四阶段、归档）：在 `dlr-eval-v1.5` 分支 / 另一份检出。本分支**已移除 `OC-based Agent Service/` 与 `Semantic Core Service/`**；`Evaluation/`、`docs/` 中指向它们的引用仅评测线有效
- **术语（三级标识，定案 2026-09-23）**：L1 = **`dlr`**（DLR 语义图谱）｜ L2 = **`consensus`**（Domain Consensus = **场景所需的、基于 L1 schema 的一类「非 workflow」知识**：术语 / 口径 / 背景；工作流与题级打法归 L3。刻意不用 "knowledge" 作名——区别于传统知识库/KG）｜ L3 = **`sop`**（SOP，题级流程/打法，**向量索引按题检索交付**——`dlr_search_sop`，2026-09-28 起不再整文件载入）。中文级名：数据源级 / 领域共识级 / 业务逻辑级
- **L2/L3 准入判据**：非 workflow → `consensus`；题级流程/打法/陷阱 → `sop`
- 源数据里的 `evidence`（BIRD 字段）/ `knowledge`（聚合格式字段）只是**源格式字段名**，不是范式术语（loader 两种都兼容）
- 2.0 命令速查：

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"              # 起后端（Neo4j + TS MCP server，幂等）
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" <qid> "<question>"  # 单题（自动预检）
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"                    # Web 对话（默认 preset=dlr）
```


## 项目一句话

**DLR（Decoupled Logic Representation）** 是本项目原创的**数据源级**语义建模范式（LE-PE 双层 + PAS 语义路由）。评测跑在**三级语义建模**（TSM：数据源级 / 领域共识级 / 业务逻辑级）框架下——与 **ER**（数据库建模标准基线）、**RDF**（W3C R2RML 标准基线）在 mini_dev 500 题 NL2SQL 上做**三范式同构对比评测**（差异只在数据源级），论证建模结构对 LLM Agent 的引导效能。

```
# 2.0（本分支）
dsh（headless / web）→ MCP（7 工具）→ TSM Core Service（LanceDB + Neo4j）→ 物理层（数据集 SQLite）

# 评测线（dlr-eval-v1.5）
opencode 执行层 → Semantic Core Service（Kuzu + FAISS）→ 同一物理层
```

---

## 硬规则

| # | 规则 |
|---|---|
| 1 | **不执行 `build` / `serve` / `reset`**（评测线 Python 服务）—— 由项目主手动操作（Kuzu 排他锁 + 服务影响所有并发跑题）。**2.0 后端不在此列**：`start_backend.sh`（幂等）由 agent 负责启停，卡死时杀进程再拉起（见 [docs/run.md](docs/run.md)） |
| 2 | **不自行重跑**任何题 —— 默认单轮；任何重跑/多跑/方差验证，先列方案（跑谁、几轮、为什么）等确认 |
| 3 | **批间停下报数** —— 2.0 一批 **5 题**，跑完报告结果，等确认再跑下一批 |
| 4 | **归档须确认** —— Stage 1–4 跑完不自动归档，等结果确认再 `post_process` |
| 5 | **Python 用绝对路径** `/d/ProgramData/anaconda3/envs/lepe_som/python`，禁止裸 `python`（2.0 默认不用 Python；仅兜底路线/评测线） |
| 6 | **临时文件只进 `tmp_scripts/`**，或随用随删 —— 禁止写盘根 / 仓库散落 |
| 7 | **`opencode run` 必须在 Git Bash 下执行**（评测线；Python subprocess 启动会让 MCP 工具不可见） |
| 8 | **判定口径以知识层为准**：术语/公式以 L2 领域共识（`scenarios/<场景>/sources/consensus`）+ L3（`scenarios/<场景>/sources/sop.md`，检索交付 `dlr_search_sop`）为准；冲突时按 `disputes > L3 节口径 > L2 共识 > 源字段字面` |
| 9 | **SOP 加节有三档准入**：① 数据集错误 ② 无 SOP 跑不对 ③ 无 SOP 时 >15W —— 新库**先裸跑取基线**，只给 ①②③ 写节，**每题最多两遍**；节必须钉**实测事实与陷阱**并附"不必再核、直接作答"（[docs/02-concept.md](docs/02-concept.md) §二 / [docs/04-application.md](docs/04-application.md) §二） |

---

## 按场景找文档

| 我要… | 看这篇 |
|---|---|
| **全貌与读法** | [docs/README.md](docs/README.md)（索引：叙事四篇 + 操作三篇 + eval-line 归档） |
| 懂"为什么"（背景与主张） | [docs/01-background.md](docs/01-background.md) |
| 懂概念（三级 / 准入判据 / 分层确权） | [docs/02-concept.md](docs/02-concept.md) |
| **建模**（DLR 规范 + 自检清单） | [docs/03-design.md](docs/03-design.md) |
| **场景包 / 换场景** | [docs/04-application.md](docs/04-application.md) |
| **跑（起后端 / 跑题 / web / 状态面 / 排障）** | [docs/run.md](docs/run.md) |
| 评测设计（考卷跟场景、考试系统跟 dsh） | [docs/eval.md](docs/eval.md) |
| 可移植 / 扩展边界（DSL_SQL · OData 参照） | [docs/roadmap.md](docs/roadmap.md) |
| **评测线**（跑批 / 归档 / 流水线 / 结果 / 数据集缺陷 / 争议 / 三范式口径） | [docs/eval-line/](docs/eval-line/)（runbook · evaluation · results_v4 · dataset · agent · modeling …） |
| 改 Agent 行为规则 | 2.0 入口 = `DSH-based Agent Service/AGENTS.md`；评测线 = `OC-based Agent Service/AGENTS.md`（**本分支已移除该目录**） |
| 历史资料 | `archive/`（v2/v3 基线、旧归档、旧分享页）——**与现逻辑无关，勿据此改现状** |

---

## 命令速查

**2.0（本分支）**：

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"               # 起后端（Neo4j + TS MCP，幂等）
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" <qid> "<question>"  # 单题（自动预检）
bash "DSH-based Agent Service/scripts/run_batch.sh" --qids <q1>,<q2> --jobs 3   # 跑一批（产物进 scenarios/<场景>/results/）
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"                     # Web 对话
cd "TSM Core Service" && node bin/tsm.mjs grade --run "<批次目录>"    # 判定 → questions.csv + summary.md（口径见 docs/eval.md §六）
cd "TSM Core Service" && npx tsx src/verify/precheck.ts               # 后端预检（应列出 7 工具）
node "DSH-based Agent Service/dsh-tsm-eval/bin/dsh-eval.mjs" doctor   # 考试系统自检（11 项；任一失败非零退出）
node "DSH-based Agent Service/dsh-tsm-eval/bin/dsh-eval.mjs" all --qids <q1>,<q2> --out tmp_scripts/<目录>  # 跑+判+报一条龙（默认不进台账；--ledger 才进，且 >5 题需 --yes）
```

**评测线（dlr-eval-v1.5）**：

```bash
export PYTHONIOENCODING=utf-8
PY=/d/ProgramData/anaconda3/envs/lepe_som/python

# 服务（⚠ 项目主执行）
cd "Semantic Core Service"
python main.py build --paradigm ALL     # 前提：已停 serve
python main.py serve --paradigm ALL

# 跑一批（2 题 × 3 范式 = 6 路，实测上限）
cd Evaluation/scripts
bash eval_run.sh EDR <q1> <q2> [<q3> ...] --parallel   # 题号平铺（≥1），总并发封顶 6 路
bash finish_run.sh $RID                    # 收尾：02→03→04 逐范式 + parse（范式自动发现；不归档）
$PY post_process.py --run-id $RID [--group original|control]  # 确认后归档（按 run；题目/范式自动发现）
```

---

## 容易踩的坑（详见 runbook §5/§6）

- **Kuzu 排他锁**：`build` 前必须停 `serve`；提高并发会引发 `database locked`
- **`parse_agent_stats` 归档前会被校验**（09-17 起）：缺 CSV / 与判定不一致 → `post_process` 直接 `[ERR]` 退出（归档器只搬不生产）；**judge 翻盘后必须重跑 parse 再归档**
- **`post_process` 不覆盖已有 raw**：整题重跑时旧 raw 会挡住新日志（输出"迁移 0 条"），归档自相矛盾
- **旧 pair 目录字母序反杀**：单题目录排在前面时旧行会覆盖新行
- **judge 超时**默认 INCORRECT：不要直接改 CSV，先手动 `opencode run` 验证
- **token 口径** `total = input + cache_read + reasoning(CoT) + output`（cache_read 可占 80%+），**差异看 steps**
- **改配置必须 rebuild + 重启**（L1/L2/L3 三层同规：改 yaml / consensus / **sop.md** → 各自 `tsm build` 重建；原「skills/*.md 改文件即生效」的例外已随 L3 检索化取消）；同批次配置必须一致
- **2.0 判定只看结论句**（`Final Answer:` 区域）：正文里"参考值 / 被否决的备选读法"不算命中（2026-09-29 judge 加固）；写节时 `Expected` 要写**结论句里会给出的那个值**
- **节写完必须复跑该题**（节晚于跑批生效 → 旧档 ✅ 可能靠假阳性撑着）；节标题须与题面**逐字符**一致（含结尾标点）；判据/口径变动后**全量重判**（口径与流程见 [docs/eval.md](docs/eval.md) §六）
- **`tsm grade` 可能卡死**（重活 = gold 大查询 / 结果集补救；表现为 CPU 不动、无输出）→ 杀该进程重跑该目录即可（金缓存已落盘，不重复付）

---

## 仓库结构

```
DLR Proj/                          # 分支 2.0
├── CLAUDE.md                    # ← 本文件
├── scenarios/birdminidev/       # ★ 一套完整 TSM：
│                                #   sources/configs/{ER,DLR,RDF}/ = L1 建模源
│                                #   sources/consensus/           = L2 Domain Consensus 源
│                                #   sources/sop.md               = L3 口径源
│                                #   eval/questions.jsonl         = 考卷（500 题=题面+期望+口径来源；eval/build.mjs 生成）
│                                #   fixtures/                    = 对照真值（verify 用）
│                                #   results/<轮次>/              = 跑批留档（questions.csv + raw/）
│                                #   DETAIL.md                    = 评测总账（覆盖度/汇总/分库索引/缺陷裁定）
│                                #   DETAIL/<库>.md               = 逐题校验表 + 证据正文（按库拆）
├── TSM Core Service/            # 2.0 语义服务（TS）：LanceDB + Neo4j + MCP server；build=开发态，verify=质量门
├── DSH-based Agent Service/     # 2.0 宿主接入：组合 patch / 技能 / 启动器 / plugins/（状态浮层）
├── Evaluation/ · validated_results/   # 评测线（1.5）：四阶段流水线、oc_judge、基线归档
├── docs/                        # 现行：叙事四篇（01–04）+ 操作三篇 + README 索引；eval-line/ = 评测线归档（只读）
├── archive/                     # 历史（v2/v3 归档、旧文档与分享页）——只读参考
└── MINIDEV_sqlite/              # 数据集（gitignored，需下载）
```

> 项目记忆（跨会话）在 `~/.claude/projects/D--Code-Proj-DLR-Proj/memory/`，索引见其中的 `MEMORY.md`。
