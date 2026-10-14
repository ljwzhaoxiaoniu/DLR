# 路线图与扩展边界

> 叙事四篇的"落地"在 [04-application.zh.md](04-application.zh.md)；本文是**工程去向**：我们做什么、不做什么、企业在哪接、怎么变得可移植。
> 英文版：[roadmap.md](roadmap.md)

## 一、扩展边界：契约在内，实现在外

本项目交付的是**语义接地的最小闭合**；凡是"接入企业既有数据基础设施"的部分，**都是扩展层，由企业自建，本项目不改**。

| | 本项目（冻结） | 企业扩展层（自建） | 业界参照 |
|---|---|---|---|
| **查询执行** | `execute_sql`——演示级 SQLite 直连 | 扩展成自己的 **`DSL_SQL 服务`**：受控查询 DSL → 各方言 SQL（PG / MySQL / Oracle / 数仓）→ 执行 + 权限下推（视图 / RLS） | **OData**（标准化查询协议：`$filter` / `$select` / `$expand` + `$metadata` 自描述；SAP Gateway、Microsoft Graph 在用） |
| 连接器 / 方言 | 仅 SQLite | 同上，统一在 DSL_SQL 层解决 | 各数据库驱动 |
| **图结构后端** | **进程内内存图**（YAML→内存，**默认**，已落）＋ **Neo4j 兼容样例**（可选） | 企业自建连接器（自家图库/图服务），按同一读取接口实现 | 与 `execute_sql`→DSL_SQL 同构 |
| 行 / 列级权限 | 无（单用户本地） | 权限下推到 DSL_SQL 层 | 数据库 RLS / 视图 |
| 冷启动建模 | 手写 YAML（样板） | introspect → 草稿 → 评审（可接企业元数据平台） | dbt docs / DataHub |
| 指标口径对接 | L2 引用即可 | 从 dbt / Cube / LookML 导入为 L2 条目 | MetricFlow |
| 服务化 / HA / 审计 | 单机 + 本地会话日志 | 企业网关 / 容器化 / 审计平台 | 标准 Ops |

**关键句**：语义网关**只发 DSL，不碰方言**——工具签名不变，变的是实现。**"当前项目不改"是边界，不是欠债**；"轻量"的承诺正是靠这个边界兑现的。

## 二、明确不做

- **不做本体 / KG 平台**——DLR 只有四个概念（LE / PE / ARC / PAS），DBA 半天上手；
- **不替代指标计算平台**——只做"LLM 能不能正确落到你的数据上"的**接地层**，可引用既有指标定义；
- **不锁模型、不锁宿主**——MCP 是标准（换宿主可行），模型可换；dsh 是**首选宿主**，不是唯一。

## 三、数据主权

组件全在本地：图（内存图或 Neo4j）、向量（LanceDB）、编码器（ONNX 本地推理）、建模产物（git 文本）；**唯一外呼是 LLM API**（可指向私有部署）→ **数据不出域**。

## 四、可移植：三步走 —— 全部落地

目标："任何有 dsh 的机器上，装一条命令就能用。"

| 步 | 做什么 | 状态 |
|---|---|---|
| **1. 路径解耦** | 消灭硬编码绝对路径：路径从**包自身位置推导 + env 覆盖**（`TSM_*` 全家）；数据目录在检出内落原位置、安装态落用户目录；Neo4j 位置探测 | ✅ 已落——仓库挪到任意目录照跑；`tsm scenario` 可打印当前生效解析 |
| **2. 打包** | **五个 npm 包**：`tsm-core-dlr`（服务 + `tsm` CLI）· `tsm-scenario-<benchmark>`（内容；一个 benchmark 一个包——`tsm-scenario-birdmini`、`tsm-scenario-cloudopsbench`）· `dsh-tsm-agent`（dsh bundle；依赖服务）· `dsh-tsm-eval`（考试系统）。场景可选/可插拔：`TSM_SCENARIO` 支持**路径或包名** | ✅ 已落 |
| **3. 图后端双轨（"零服务"）** | 默认**进程内**（YAML→内存：零依赖、零锁、零服务；千级节点只读查找）；**保留 Neo4j 兼容**（配 `NEO4J_URI` 即启用：Cypher / Browser / 大图 / 企业已有图库）。一致性由 `tsm verify memory_graph_parity` 逐字段把关（11 库） | ✅ 已落——测试机不装 Neo4j 也跑通验收四连 |
| **附带：可视化独立成页** | ✅ `tsm viz`（开发态）读 YAML 结构载荷 → 自包含 HTML（数据 + vis-network 内联）；服务侧以 **`GET /viz/dlr`** 端出（状态卡 `图谱 ↗` 直链）；Neo4j Browser 作为并列入口保留 | ✅ 已落 |

> dsh 生态口径参考：bundle = npm 包 + `dsh.bundle.patch`（+ 可选 `dsh.client` 浏览器半）；安装/更新走 profile 内 pnpm（registry / Git / tarball / **本地绝对路径**）；行级开关 = profile 的 `cordis.patch.yml`。两条路可并存，`--patch` 层优先级最高，正好当"本地覆盖"。

## 五、待探索

- **Cloud-OpsBench**（K8s agentic 根因分析基准）——✅ **已落为第二个场景**（架构「换场景」的首个真实检验；TSM 跷跷板另一端——**L3 重 / L1 薄**）：落地为 `scenarios/cloudopsbench/` + `tsm-scenario-cloudopsbench` 包，含 K8s 诊断工具适配层与上游评分器适配；**覆盖 754/754 · JRA 752/754（99.7%）**。
- **开发态能力的继续内建**：introspect → 草稿 → 评审（反身建模），与第 1/2 步同一条 CLI 长出来。

## 相关

- 扩展边界的理论依据（不发明 / 不补全 / 不重建）：[01-background.zh.md](01-background.zh.md) §三
- 概念与判据：[02-concept.zh.md](02-concept.zh.md)｜实现：[03-design.zh.md](03-design.zh.md)｜落地：[04-application.zh.md](04-application.zh.md)
