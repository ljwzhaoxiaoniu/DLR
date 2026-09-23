# CLAUDE.md — 给执行 agent 的入口

> 本文件是本仓库的**执行约定与索引**。规则只写在这里；具体操作写在下文指向的文档里，**不要在三处重复**。

## 分支说明（2026-09-23 起）

本检出在分支 **`2.0`**：DLR + TSM 的**持续线**（不再是评测轮次）。与 `dlr-eval-v1.5` 已面目全非 → **各自分支演进，不要求跨分支一致**。

- **2.0 日常**：`DSH-based Agent Service/`（dsh 接入 + 领域知识源）+ `TSM Core Service/`（TypeScript 语义服务：LanceDB + Neo4j）
- **评测线**（v4 基线、opencode 四阶段、归档）：在 `dlr-eval-v1.5` 分支 / 另一份检出。本分支**已移除 `OC-based Agent Service/`**；`Evaluation/`、`docs/` 中指向它的引用仅评测线有效
- 2.0 命令速查：

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"              # 起后端（Neo4j + TS MCP server，幂等）
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" <qid> "<question>"  # 单题（自动预检）
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"                    # Web 对话（默认 preset=dlr）
```


## 项目一句话

**DLR（Decoupled Logic Representation）** 是本项目原创的**数据源级**语义建模范式（LE-PE 双层 + PAS 语义路由）。评测跑在**三级语义建模**（TSM：数据源级 / 领域共识级 / 业务逻辑级）框架下——与 **ER**（数据库建模标准基线）、**RDF**（W3C R2RML 标准基线）在 mini_dev 500 题 NL2SQL 上做**三范式同构对比评测**（差异只在数据源级），论证建模结构对 LLM Agent 的引导效能。

```
OC 评测执行层（opencode + MCP）
        ↓
语义查询层（Semantic Core Service：ER 28765 / DLR 28775 / RDF 28785）
        ↓
物理数据层（11 个 SQLite，共享）
```

---

## 硬规则

| # | 规则 |
|---|---|
| 1 | **不执行 `build` / `serve` / `reset`** —— 由项目主手动操作（Kuzu 排他锁 + 服务影响所有并发跑题） |
| 2 | **不自行重跑**任何题 —— 默认单轮；任何重跑/多跑/方差验证，先列方案（跑谁、几轮、为什么）等确认 |
| 3 | **批间停下报数** —— 跑完一批报告结果，等确认再跑下一批 |
| 4 | **归档须确认** —— Stage 1–4 跑完不自动归档，等结果确认再 `post_process` |
| 5 | **Python 用绝对路径** `/d/ProgramData/anaconda3/envs/lepe_som/python`，禁止裸 `python` |
| 6 | **临时文件只进 `tmp_scripts/`**，或随用随删 —— 禁止写盘根 / 仓库散落 |
| 7 | **`opencode run` 必须在 Git Bash 下执行**（Python subprocess 启动会让 MCP 工具不可见） |
| 8 | **判定口径以知识层为准**：术语/公式以 `rag_knowledge` + `skills` 为准；证据冲突时按 `disputes > SkillPath(SOP) > KnowledgePath(rag) > evidence 字面` |

---

## 按场景找文档

| 我要… | 看这篇 |
|---|---|
| **跑一批题 / 归档 / 故障排查** | **[docs/runbook.md](docs/runbook.md)** ← 运行手册，唯一执行口径 |
| 搞懂评测流水线**为什么**这么设计 | [docs/evaluation.md](docs/evaluation.md) |
| **给一个新库建模**（ER / DLR / RDF 三件套） | [docs/modeling.md](docs/modeling.md)（对准测试口径）+ [docs/modeling-guide-dlr.md](docs/modeling-guide-dlr.md)（DLR 详细规范） |
| 搞懂 yaml/ttl 的每个字段**进了图还是进了向量** | [docs/semantic-layer-build.md](docs/semantic-layer-build.md) |
| 改 Agent 行为规则（评测线） | `OC-based Agent Service/AGENTS.md`（opencode 评测 Agent 的唯一规则入口；**本分支已移除该目录**）／ 2.0 的规则入口 = `DSH-based Agent Service/AGENTS.md` |
| 看数据集缺陷 / 争议裁定 | [docs/dataset.md](docs/dataset.md) + `Evaluation/oc_judge/disputes.md` |
| 看当前进度 / 结果 | [docs/results_v4.md](docs/results_v4.md) |
| 三级语义建模（数据源级/领域共识级/业务逻辑级）设计 | [docs/tsm-design.md](docs/tsm-design.md) |
| 历史资料 | `archive/`（v2/v3 基线、旧归档、旧分享页）——**与现逻辑无关，勿据此改现状** |

---

## 命令速查

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
- **改配置必须 rebuild + 重启**（`skills/*.md` 例外，改文件即生效）；同批次配置必须一致

---

## 仓库结构

```
DLR Proj/
├── CLAUDE.md                  # ← 本文件
├── README.md / docs/          # 文档（现行）
├── archive/                   # 历史（v2/v3 归档、旧文档与分享页）——只读参考
├── config.json                # 全局配置（路径/端口/API/eval.round）
├── Semantic Core Service/     # 语义服务（build / serve / query）
│   ├── configs/scenarios/{ER,DLR,RDF}/    # 11 库 × 3 范式配置
│   ├── mapping/ models/ db/ service/      # 解析器 / 模型 / Kuzu+FAISS / 构建
│   ├── storage/{er,dlr,rdf}/              # 图 + 向量（范式隔离）
│   └── tool&test/                         # generate_r2rml.py / verify_db_recall.py
├── DSH-based Agent Service/   # 2.0：DLR 接入 dsh（AGENTS.md + dsh_dlr 组合/技能/启动器 + domains/ 知识源）
├── TSM Core Service/          # 2.0：TypeScript 语义服务（LanceDB + Neo4j + MCP server）
├── OC-based Agent Service/    # 评测线（本分支已移除该目录；见 dlr-eval-v1.5）
├── Evaluation/                # 四阶段流水线 + oc_judge + outputs2
├── validated_results/         # 现行基线（当前 v4_final）
├── rag_knowledge/             # L2 知识（kid 聚合格式）
└── MINIDEV_sqlite/            # 数据集（gitignored，需下载）
```

> 项目记忆（跨会话）在 `~/.claude/projects/D--Code-Proj-DLR-Proj/memory/`，索引见其中的 `MEMORY.md`。
