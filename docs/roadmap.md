# 路线图与扩展边界

> 叙事四篇的"落地"在 [04-application.md](04-application.md)；本文是**工程去向**：我们做什么、不做什么、企业在哪接、怎么变得可移植。

## 一、扩展边界：契约在内，实现在外

本项目交付的是**语义接地的最小闭合**；凡是"接入企业既有数据基础设施"的部分，**都是扩展层，由企业自建，本项目不改**。

| | 本项目（冻结） | 企业扩展层（自建） | 业界参照 |
|---|---|---|---|
| **查询执行** | `execute_sql`——演示级 SQLite 直连 | 扩展成自己的 **`DSL_SQL 服务`**：受控查询 DSL → 各方言 SQL（PG / MySQL / Oracle / 数仓）→ 执行 + 权限下推（视图 / RLS） | **OData**（标准化查询协议：`$filter` / `$select` / `$expand` + `$metadata` 自描述；SAP Gateway、Microsoft Graph 在用） |
| 连接器 / 方言 | 仅 SQLite | 同上，统一在 DSL_SQL 层解决 | 各数据库驱动 |
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

组件全在本地：图（Neo4j）、向量（LanceDB）、编码器（ONNX 本地推理）、建模产物（git 文本）；**唯一外呼是 LLM API**（可指向私有部署）→ **数据不出域**。

## 四、可移植：三步走

目标："任何有 dsh 的机器上，装一条命令就能用。"

| 步 | 做什么 | 验收 |
|---|---|---|
| **1. 路径解耦** | 消灭硬编码绝对路径：`TSM Core Service/src/config.ts` 的 `ROOT` 改为**包自身位置推导 + env 覆盖**；patch 里的 skills 目录改 env/相对注入；Neo4j 位置改探测 | 仓库挪到任意目录照跑 |
| **2. 打包** | ✅ **dsh 侧**：`dsh-tsm` bundle（MCP 网关 + preset-dlr + 状态浮层 + **skills 随包**），`dsh plugin --profile {web,headless} add` 一条装 ｜ ✅ **后端 CLI**：`tsm serve｜status｜build｜verify`（运行态/开发态同一入口） ｜ **剩余**：分发（npm 发布或 git 地址） | 另一台有 dsh 的机器按 [run.md](run.md) §8 走通 |
| **3. 零服务（可选终局）** | 图很小（千级节点），可搬进 dsh 进程做**原生工具**，Neo4j 降为可选后端 | 真"零外部服务" |

> dsh 生态口径参考：bundle = npm 包 + `dsh.bundle.patch`（自带要插入的行）+ 可选 `dsh.client`（浏览器半）；安装/更新走 profile 内 pnpm（支持 registry / Git / tarball / **本地绝对路径**）；行级开关 = profile 的 `cordis.patch.yml`。两条路可并存，`--patch` 层优先级最高，正好当"本地覆盖"。

## 五、待探索

- **Cloud-OpsBench**（K8s agentic 根因分析基准）：TSM 跷跷板另一端的候选——**L3 重 / L1 薄**（诊断 runbook ≈ 知识化的 golden trajectory；其"证据链闭合（ECR）"与我们的过程可评同向）。工具面是 K8s 诊断接口（非 SQL），真玩需另起 `scenarios/cloudops/` + 工具适配层。
- **开发态能力的继续内建**：introspect → 草稿 → 评审（反身建模），与第 1/2 步同一条 CLI 长出来。

## 相关

- 扩展边界的理论依据（不发明 / 不补全 / 不重建）：[01-background.md](01-background.md) §三
- 概念与判据：[02-concept.md](02-concept.md)｜实现：[03-design.md](03-design.md)｜落地：[04-application.md](04-application.md)
