---
description: "TSM / DLR 的 dsh 套件（bundle）：到 tsm-core-dlr 的 MCP 语义网关 + 与场景无关的 paradigm 技能 + Web 状态浮层 + agent 规则（AGENTS.md）。"
kind: "package-bundle"
---

# dsh-tsm-agent

[English](README.md) | 中文

## Summary

`dsh-tsm-agent` 把一个 dsh profile 接到运行中的 **TSM Core Service**（`tsm-core-dlr`）上，并附带与场景无关的 `paradigm` 技能、Web 状态浮层和 agent 规则（`AGENTS.md`）。它贡献两条**顶层行**——`mcp-semantic-core`（MCP 客户端，指向 `http://127.0.0.1:28795/mcp`，streamable HTTP）与 `dlr-status`（浮层）——以及一个 agent preset `preset-dlr`（persona、AGENTS.md 指令、技能、compaction）。语义后端是**独立包 `tsm-core-dlr`**（已声明为依赖，装本包会连带装上）；场景内容来自独立的 `tsm-scenario-*` 包或路径。L3 SOP 已走索引检索（`dlr_search_sop`），**不再随包发 L3 技能**。

## 目录

- [使用本包](#使用本包)
- [实现说明](#实现说明)
- [模型体验](#模型体验)
- [已知限制与待办](#已知限制与待办)
- [开发注记](#开发注记)

-----

<a id="使用本包"></a>
## 使用本包

每个 profile 装一次。推荐走 Harness 的**插件管理器**（设置 → 插件 → 安装 bundle）或 agent 侧的 `plugin_manager` 工具（`install_bundle`）——两者都会**装包 + 选中 bundle**。CLI 等价命令只装包，装完还要在插件管理器里**启用**（或把包名加进 profile 的 `dsh.profile.bundles`）：

```bash
dsh plugin --profile web add dsh-tsm-agent                              # 从 npm 装（连带 tsm-core-dlr）
dsh plugin --profile web add "<repo>/DSH-based Agent Service/dsh-tsm-agent"   # 或从本地检出装
# 然后启用 bundle——只装不选，不会生效
```

先起语义后端——连不上时 MCP 行会拒绝激活：

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"    # Neo4j + TS MCP server (:28795)
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"
```

MCP 端点默认 `http://127.0.0.1:28795/mcp`，可用环境变量 `TSM_MCP_URL` 覆盖。MCP 行是**顶层行**，headless 跑题同样生效（`--profile headless` 挂不了 preset）；`preset-dlr` 只塑造选用它的交互会话。

本包贡献的行：

| 行 | 层 | 用途 |
|---|---|---|
| `mcp-semantic-core` | 顶层 | MCP 客户端 → `http://127.0.0.1:28795/mcp`（streamable HTTP），`toolCallTimeoutMs: 60000`、`failOnStartupError: true`、重连至多 3 次 |
| `dlr-status` | 顶层 | Web 浮层：后端健康 + 语义资产计数（浏览器半 = `lib/client.js`，读服务的 `/status`） |
| `preset-dlr` | agent preset | persona（语义业务助手）· `AGENTS.md` 指令加载 · 文件系统技能 · `skill` 工具 · compaction（组带 `isolate`） |

网关背后的工具面（7 个）：`dlr_semantic_query` · `dlr_search_consensus` · `dlr_search_sop` · `get_pe_mapping` · `get_le_attrs` · `get_full_data_info` · `execute_sql`。

<a id="实现说明"></a>
## 实现说明

- `cordis.patch.yml` —— 上面的两条顶层行（MCP 网关 + 状态浮层）。
- `presets/dlr.patch.yml` —— `preset-dlr`；compaction 组的 `isolate` realm 是 preset 服务的硬要求（缺了报 "Preset services require isolate realms"）。
- `skills/paradigm/SKILL.md` —— 范式认知（TSM 三级；DLR 结构：LE / PE / 锚键与 JOIN）；与数据集无关，按需加载。
- `lib/index.js` —— node 半：boot 期把随包的 `skills/` 目录设为 `DLR_SKILLS_DIR`；`lib/client.js` —— 浏览器半（状态浮层）。
- 层序：bundle patch → profile 的 `cordis.patch.yml` → `$DSH_HOME/cordis.patch.yml` → `--patch`（最高）。使用方本地策略——禁用清单、模型选择、默认 preset、目录选择器修复——留在 `--patch` 层（`dsh_dlr/dsh.patch.yml`、`dsh_dlr/dsh-web.patch.yml`），不在本包内。

<a id="模型体验"></a>
## 模型体验

工具注册为 `mcp__semantic-core__<tool>`：

| 工具 | 用途 |
|---|---|
| `dlr_semantic_query` | L1 召回：问题涉及哪些业务实体（LE） |
| `get_pe_mapping` / `get_le_attrs` | 第二跳：物理视图列、ARCS、`database_url` |
| `dlr_search_consensus` | L2 领域共识条目（术语 → 列 / 值） |
| `dlr_search_sop` | L3：按题检索口径节（有才返回） |
| `get_full_data_info` | 下探视图之外的物理列 |
| `execute_sql` | 对数据集执行只读 SQL（子进程，20s 硬超时） |

<a id="已知限制与待办"></a>
## 已知限制与待办

- 本包依赖 `tsm-core-dlr`（装本包会连带装服务包及其原生依赖，约 200 MB）。服务仍需**单独起**（`tsm serve --http 28795`，或检出里的 `scripts/start_backend.sh`）——端点不可达时激活会响亮失败（`failOnStartupError: true`）。
- dsh 是 alpha；本包已对 `@deepseek-ai/dsh@0.2.0-rc.2` 核过（配置组合 / 引用插件包名 / 客户端契约 / headless `--json` 四项探测全过）。500 题跑批早于该验证、产出于 `0.1.7-alpha.1`，**结果未重跑**。任何升级后先 `--dump-config` 核行。
- 语义后端不在包内：后端没起时激活失败（`failOnStartupError: true`）。
- 默认模型与凭据是 profile 层的事（`dsh_dlr/` 的 patch + `.env`），不属于本包。

<a id="开发注记"></a>
## 开发注记

patch 行按 `id` 合并，覆写时 `config` 是**整块替换**——要保留的字段必须重述。id 未命中只 warn 不报错，所以改完用 `dsh --profile web --dump-config` 核对。

`preset-dlr` 的技能目录取自 `DLR_SKILLS_DIR`，由本 bundle 的 node 半在 boot 期设置（按包位置推导，**不含机器相关路径**）；启动器可覆盖。如果你依赖 `preset-dlr` 的技能加载，请保持 `dlr-status` 行启用，或自行设置该变量。

仓库带 `dsh-plugin` GitHub topic，供 DSH 插件目录（deepseek1024.com / 1024 Store）收录：目录按静态校验（`dsh.bundle.patch` + 补丁文件已提交）自动识别；包**发布到 npm 后**才显示安装命令，之前以浏览模式收录。
