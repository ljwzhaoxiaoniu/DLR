# docs 索引

> **一条规矩：每篇文档只有一个读者、一个有效期。** 三档：**现行**（2.0 分支）· **仅评测线**（`dlr-eval-v1.5` / 另一份检出）· **历史**（`archive/`）。
> 本索引即文档结构；点击进各篇（标「待写」的是本轮计划落笔的）。

## 现行（2.0 分支）

| 文档 | 给谁看 | 状态 |
|---|---|---|
| [01-background.md](01-background.md) | ① **背景与主张** —— 当前的问题（数据 / 知识 / API）+ 分析 → 主张：语义建模以结构化数据源为基础 | ✅ 用户落稿 |
| [02-concept.md](02-concept.md) | ② **概念**（TSM）—— 三级 / 准入判据=治理线 / 分层确权 / 换层制度 | ✅ 已落 |
| [03-design.md](03-design.md) | ③ **实现**（DLR：原创 foundation 的详细设计）—— LE/PE/ARC/PAS · 图/向量消费 · 建模规则 + 自检清单 | ✅ 已落（由 `modeling-guide-dlr.md` 升级） |
| [04-application.md](04-application.md) | ④ **落地（解法）** —— 场景包：三层写作规范 · `fixtures/`（回归快照）· **`eval/` 考卷约定** · 双读评审 · 换场景 checklist | ✅ 已落（当前 `birdminidev`） |
| [run.md](run.md) | 操作 —— 运行手册：起后端 / 跑题 / web / **状态面** / 工具依赖矩阵 / 排障 | ✅ 已落 |
| [eval.md](eval.md) | 操作 —— 评测 = **内容（考卷跟场景）** + **能力（考试系统跟 dsh）**；考卷格式 / 报告 / 探针 | ✅ 已落 |
| [roadmap.md](roadmap.md) | 操作 —— **扩展边界（DSL_SQL/OData）** · 可移植三步 · 待探索 | ✅ 已落 |

> **读法（叙事四篇）**：`01-background.md` 提出**背景与主张**（当前的问题：数据 / 知识 / API）→ `02-concept.md` 给**概念**（TSM）→ `03-design.md` 给**实现**（DLR，原创 foundation 的详细设计）→ `04-application.md` 给**落地（解法）**（场景包）。**TSM + DLR 的设计就是为解决背景篇所列的问题。**
> 两棵树内的就地说明书（`TSM Core Service/README.md`、`DSH-based Agent Service/README.md`）保持现状，不并入本目录。

## 仅评测线有效（`dlr-eval-v1.5`）—— 已归档在 `docs/eval-line/`

> 2.0 分支**保留为参考、不再维护**；每篇头部有声明。

| 文档 | 内容 |
|---|---|
| [eval-line/runbook.md](eval-line/runbook.md) | 四阶段跑题 / 归档 / 故障排查 |
| [eval-line/evaluation.md](eval-line/evaluation.md) | 评测流水线设计（为什么这么搭） |
| [eval-line/results_v4.md](eval-line/results_v4.md) | v4 基线进度与结果 |
| [eval-line/agent.md](eval-line/agent.md) | OC Agent 层（OpenCode + MCP + 防作弊） |
| [eval-line/dataset.md](eval-line/dataset.md) | mini_dev 数据集说明（新场景建模时仍可参考） |
| [eval-line/modeling.md](eval-line/modeling.md) | 三范式建模（对准测试口径）；DLR 部分已由 `03-design.md` 吸收 |
| [eval-line/semantic-layer-build.md](eval-line/semantic-layer-build.md) | Python 构建器：yaml/ttl → 图 & 向量全映射（2.0 构建见 TSM Core Service/README） |
| [eval-line/rag-evidence.md](eval-line/rag-evidence.md) | L2 两组组织哲学（原始组 / 对照组）；L2 写作规范已并入 `04-application.md` |
| [eval-line/modeling-guide-dlr.md](eval-line/modeling-guide-dlr.md) | 旧 DLR 指南 —— **已被 [03-design.md](03-design.md) 取代** |
| [eval-line/tsm-design.md](eval-line/tsm-design.md) | 旧 TSM 设计 —— **已被 [02-concept.md](02-concept.md) 取代** |

## 历史

`archive/` —— v2/v3 归档、旧文档与分享页。**与现逻辑无关，勿据此改现状。**
