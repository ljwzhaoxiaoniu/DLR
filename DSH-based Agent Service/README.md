# DSH-based Agent Service — DLR 接入 DeepSeek Harness

把 **DLR 这一个范式**接入 dsh（DeepSeek Harness）。与 `OC-based Agent Service/`（评测线，1.5 分支）运行时
**完全独立**；`Evaluation/` 属评测线，本分支不动。

**后端 = `TSM Core Service/`（TS/Node 栈：LanceDB + Neo4j + MCP，streamable-http 直连）** —— 无 Python、无桥。

三级语义建模（TSM）：**L1 = DLR** ｜ **L2 = Domain Consensus**（领域共识）｜ **L3 = SOP**。

## 结构

```
DSH-based Agent Service/
├── AGENTS.md                 # dsh 版评测 Agent 规则（独立文件，只与 OC 版内容同源）
├── README.md
├── .gitignore                # .dsh-home/、.env
├── scripts/start_backend.sh  # 一键起后端（Neo4j + TS MCP server，幂等 + 预检）
├── dsh-tsm/                  # ★ bundle（dsh plugin add 安装）：MCP 网关 + preset-dlr + 状态浮层 + skills
│   ├── cordis.patch.yml      #   顶层行：mcp-semantic-core · dlr-status
│   ├── presets/dlr.patch.yml #   preset-dlr：persona / AGENTS.md / skills / compaction
│   ├── skills/               #   paradigm（认知层，场景无关）；L3 已走索引检索（不随包发技能）
│   └── lib/client.js         #   TSM 状态浮层（浏览器半）
├── .dsh-home/                # 运行时生成（$DSH_HOME；会话日志在此，可取证可删）
└── dsh_dlr/
    ├── dsh.patch.yml         # headless 本地策略：禁用清单 / 模型 / persona / 指令候选
    ├── dsh-web.patch.yml     # web 本地策略：进程级收尾 / 目录选择器修复 / registry 默认 preset
    ├── run_one.sh / run_web.sh / run_batch.sh   # 单题 / Web / 批跑（L3 索引用 tsm build sop 重建）
    ├── run_one.sh            # 单题运行器（预检 + dsh headless）
    ├── run_web.sh            # Web UI 启动器（预检 + dsh web）
    └── .env.example          # DEEPSEEK_API_KEY → 复制为 .env
```

## 依赖

| 项 | 值 |
|---|---|
| dsh | `@deepseek-ai/dsh@0.1.7-alpha.1`（锁死；升级前重跑 `--dump-config` 核行 id） |
| 语义后端 | `TSM Core Service/`（`src/mcp/server.ts --http 28795`，需 Neo4j 在跑） |
| Neo4j | 本机 `D:\neo4j`（免安装 zip + 便携 JDK）或任意 bolt 端点 |

## 运行

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"        # 起后端（幂等）

# 单题（自动预检后端）
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" 1471 "What is the ratio of customers who pay in EUR against customers who pay in CZK?"

# Web 对话（默认 preset = dlr；进 UI 先选工作区 DSH-based Agent Service）
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"
#   ↑ 右下角浮出 TSM 状态卡：Neo4j / MCP 服务灯 · LE/PE/PA/PAS · 向量行数 · 场景名 · Neo4j Browser 链接
#     （前提：dsh-tsm bundle 已装 —— dsh plugin --profile web add "<abs>/DSH-based Agent Service/dsh-tsm"）
```

## 场景（scenario = 一套完整 TSM）

内容在仓库根 `scenarios/<name>/`（当前 `birdminidev`）：

| 层 | 换场景时 | 载体 |
|---|---|---|
| L1 DLR | 重新建模/构建 | `scenarios/<s>/sources/configs/{ER,DLR,RDF}/*.yaml` → `TSM Core Service` 构建 |
| L2 Domain Consensus | 换一组共识源 | `scenarios/<s>/sources/consensus/*.jsonl` → `buildConsensus.ts`（namespace 隔离） |
| L3 SOP | 换一个源文件 | `scenarios/<s>/sources/sop.md` → `buildSop.ts` 编译成检索索引（`dlr_search_sop`） |
| 认知层 | **不动** | `skills/paradigm/SKILL.md`（与场景无关） |
| 对照真值 | 随场景 | `scenarios/<s>/fixtures/*.json`（verify 套件用） |

**铁律：部署出去的 L3 技能名永远是 `sop`**——"用哪套"发生在 run 配置层，模型层永远不需要选。

## MCP 工具面（5 + skill）

`dlr_semantic_query` · `dlr_search_consensus` · `get_pe_mapping` · `get_le_attrs` · `execute_sql`（+ `skill`）

> L2 工具名与 Python 线（1.5）不同：那边仍是 `dlr_search_evidence`（BIRD 遗留命名）。

## 排障（关键几条）

| 症状 | 查这里 |
|---|---|
| 跑题 600s 白跑、无工具调用 | 后端没起来：`run_one.sh` 预检会先拦；先跑 `scripts/start_backend.sh` |
| 起 UI 报 `Preset services require isolate realms` | `preset-dlr` 的 compaction 组缺 `isolate`（照 standard preset 抄） |
| Web 选工作区报错（Windows） | 已钉 `-browse` 曲面（native worker 会崩）；禁 auto + 插 browse，二者不可同挂 |
| 起 UI 报 `EADDRINUSE 3080` | 旧实例没死透 → `netstat -ano \| grep :3080` → `taskkill //F //PID <pid>` |
| dsh 报工具名不对 | 工具面是 `mcp__semantic-core__*`；升级 dsh 后先 `--dump-config` 核行 id |
| MCP 握手挂起 | HTTP 模式必须 stateful（见 `TSM Core Service` README 的教训） |
