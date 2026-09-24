# DLR Proj —— 原创的 Decoupled Logic Representation 建模范式

> **分支 `2.0`：DLR + TSM 的持续线**（不再是评测轮次）。
> DLR（解耦逻辑表达）是原创的**数据源级**语义建模范式：**LE-PE 双层模型 + ARCS / PAS 两个机制**——把逻辑概念层与物理数据层解耦，让 LLM agent 用自然语言可靠地落到关系数据库上。
> 项目跑在**三级语义建模（TSM）**框架下：数据源级 **`dlr`** / 领域共识级 **`consensus`** / 业务逻辑级 **`sop`**——**准入判据即治理线**。

## 📚 文档（叙事四篇 + 操作三篇）

**读法**：背景与主张 → 概念 → 设计 → 应用。完整索引见 [docs/README.md](docs/README.md)。

| # | 文档 | 一句话 |
|---|---|---|
| ① | [背景与主张](docs/01-background.md) | 当前的问题（数据 / 知识 / API）与分析 → 主张：**语义建模以结构化数据源为基础** |
| ② | [概念：TSM](docs/02-concept.md) | 三级的定义 · **准入判据（=治理线）** · 分层确权 · 换层制度 |
| ③ | [设计：DLR](docs/03-design.md) | 原创 foundation 的详细设计：**LE / PE / ARCS / PAS** + 建模规则与自检清单 |
| ④ | [应用：场景包](docs/04-application.md) | 落地解法：`scenarios/<名>/` 三层内容 + fixtures + 考卷；当前 `birdminidev` |
| 操作 | [运行手册](docs/run.md) · [评测](docs/eval.md) · [路线图与扩展边界](docs/roadmap.md) | 怎么跑 / 怎么评 / 去哪（可移植三步与扩展点） |

> **评测线**（三范式同构对比、四阶段流水线、v4 基线）：在分支 `dlr-eval-v1.5` 与另一份检出；本分支只读参考 [docs/eval-line/](docs/eval-line/)。
> **历史**（v2/v3 归档、旧分享页）：[`archive/`](archive/)。

## 架构（2.0）

```
dsh（DeepSeek Harness：headless / web）
   │  MCP（streamable-http :28795，5 工具）
   ▼
TSM Core Service（TS/Node）：LanceDB（向量）+ ONNX 编码器（进程内）
   │  bolt :7687
   ▼
Neo4j（图：LE 49 / PE 72 / PA 792 / PAS 35；Browser :7474）
   │  sqlite:///…
   ▼
数据集（MINIDEV_sqlite，gitignored）
```

**两个进程**：Neo4j + TS MCP server（LanceDB / 编码器内嵌，不是服务）。dsh web 右下角的**状态浮层**实时显示两者健康与语义资产计数。

## 快速开始

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"                 # 起后端（幂等）
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" <qid> "<question>"    # 单题（headless）
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"                       # Web 对话
```

前置：Node / npm · Neo4j（本机或任意 bolt 端点）· ONNX 模型（`TSM Core Service/scripts/fetch-model.sh`）· 数据集（`MINIDEV_sqlite/`，见 [eval-line/dataset.md](docs/eval-line/dataset.md)）· dsh（版本锁死）。
细节、状态面与排障：[运行手册](docs/run.md)。

## 项目结构

```
DLR Proj/                          # 分支 2.0
├── docs/                          # 现行文档：叙事四篇（01–04）+ 操作三篇 + README 索引
│                                  #   └── eval-line/  评测线归档（只读参考）
├── scenarios/birdminidev/         # ★ 场景包：sources/{configs,consensus,sop.md} + fixtures
├── TSM Core Service/              # 语义服务（TS）：LanceDB + Neo4j + MCP server；build=开发态，verify=质量门
├── DSH-based Agent Service/       # dsh 接入：patch 组合 / skills / 启动器 / plugins/（状态浮层）
├── Evaluation/ · validated_results/   # 评测线（1.5 分支使用）
├── archive/                       # 历史（v2/v3 归档、旧文档与分享页）——只读参考
└── MINIDEV_sqlite/                # 数据集（gitignored，需下载）
```

## 状态（2026-09-24）

| 项 | 状态 |
|---|---|
| 运行态 | ✅ dsh 直连 TS 栈（无 Python、无桥）；端到端冒烟通过 · 连接**失败不缓存**（断开自愈） |
| 状态面 | ✅ MCP server 的 `/status` + dsh web 状态浮层（服务灯 / 资产计数 / Neo4j Browser 链接） |
| 文档 | ✅ 重组完成：叙事四篇 + 操作三篇；旧文档归档 `docs/eval-line/` |
| 下一步 | **工程化**：路径解耦 → 打包（`dsh-tsm` bundle）→ 零服务（见 [roadmap.md](docs/roadmap.md) §四） |

> 仓库级执行约定（给 agent）：[CLAUDE.md](CLAUDE.md)。
