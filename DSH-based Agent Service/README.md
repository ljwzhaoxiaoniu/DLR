# DSH-based Agent Service — DLR 接入 DeepSeek Harness

把 **DLR 这一个范式**接入 dsh（DeepSeek Harness）。与 `OC-based Agent Service/` 并列但**运行时完全独立**
（OC 只剩知识源血缘，见下）；`Semantic Core Service/`、`Evaluation/` 一律不动。

**默认后端 = `TSM Core Service/`（TS 栈：LanceDB + Neo4j + MCP，streamable-http）** —— 无 Python、无桥。
Python 语义服务 + SSE→stdio 桥保留为兜底路线（`PY_ROUTE=1`）。

## 结构

```
DSH-based Agent Service/
├── AGENTS.md                 # dsh 版评测 Agent 规则（独立文件，只与 OC 版内容同源）
├── README.md
├── .gitignore                # .dsh-home/、.env
├── domains/
│   └── minidev/sop.md        # L3 知识源（2.0 自己的真源；与 OC 解耦）
├── .dsh-home/                # 运行时生成（$DSH_HOME；会话日志在此，可取证可删）
└── dsh_dlr/
    ├── dsh.patch.yml         # ★ 组合真值（headless）：受限组合 + MCP 行（默认 TS）
    ├── dsh-web.patch.yml     # web 组合：preset-dlr + 进程级收尾 + MCP 行（默认 TS）
    ├── tsm-py.patch.yml      # 叠加层：切回「Python 服务 + SSE→stdio 桥」
    ├── mcp_sse_stdio_bridge.py  # 仅 Python 兜底路线用（~20 行）
    ├── skills/sop/SKILL.md      # 由 sync_sop.sh 从 domains/minidev/sop.md 生成
    ├── skills/paradigm/SKILL.md # 范式认知（TSM + DLR 结构，与数据集无关）
    ├── sync_sop.sh           # L3 同步：domains/<数据集>/sop.md → skills/sop/SKILL.md
    ├── run_one.sh            # 单题运行器（预检 + dsh headless）
    ├── run_web.sh            # Web UI 启动器（预检 + dsh web）
    └── .env.example          # DEEPSEEK_API_KEY → 复制为 .env
```

## 依赖

| 项 | 值 |
|---|---|
| dsh | `@deepseek-ai/dsh@0.1.7-alpha.1`（锁死；升级前重跑 `--dump-config` 核行 id） |
| **语义后端（默认）** | `TSM Core Service/`：`npx tsx src/mcp/server.ts --http 28795`（需 Neo4j 在跑） |
| Python 兜底 | `Semantic Core Service/`（`main.py serve`，28775）+ 桥；用 `PY_ROUTE=1` 启用 |

## 一次性准备

```bash
npm install -g @deepseek-ai/dsh@0.1.7-alpha.1
cp "DSH-based Agent Service/dsh_dlr/.env.example" "DSH-based Agent Service/dsh_dlr/.env"   # 填 key
bash "DSH-based Agent Service/dsh_dlr/sync_sop.sh"   # 生成 L3 技能（改过源后重跑）
# 语义后端：见 TSM Core Service/README（模型 / 向量表 / 证据表 / 图 / MCP server）
```

## 运行

```bash
# 起后端（TS 栈，streamable-http）
cd "TSM Core Service" && npx tsx src/mcp/server.ts --http 28795 &

# 单题（自动预检后端）
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" 1471 "What is the ratio of customers who pay in EUR against customers who pay in CZK?"
PY_ROUTE=1 bash "…/run_one.sh" …   # 兜底：走 Python 服务 + 桥

# Web UI（默认 preset = dlr；进 UI 先选工作区 DSH-based Agent Service）
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"
```

## 多数据集组织（约定）

**一个评测集 = 一套完整 TSM**：L1 DLR 图谱 + L2 evidence + L3 `sop` 文件（+ 全局共用的 `paradigm` 认知技能）。

| 层 | 换数据集时 | 载体 |
|---|---|---|
| L1 数据源级 | 重新建模/构建 | `TSM Core Service/`（YAML→LanceDB/Neo4j） |
| L2 领域共识级 | 换一组 evidence | `rag_knowledge/*.jsonl` → `buildEvidence.ts`（按 namespace 隔离） |
| L3 业务逻辑级 | 换一个源文件 | `domains/<dataset>/sop.md` → `sync_sop.sh` 生成部署件 |
| 认知层 | **不动** | `skills/paradigm/SKILL.md` |

**铁律：部署出去的 L3 技能名永远是 `sop`**——"用哪套"发生在 run 配置层，模型层永远不需要选。

## 与 OC 线的关系

| | OC 评测线 | 本树（2.0 / dsh） |
|---|---|---|
| 宿主 | opencode | dsh |
| 语义后端 | Python（Kuzu + FAISS） | **TS（LanceDB + Neo4j）** |
| 规则入口 | `AGENTS.md`（OC 版） | `AGENTS.md`（dsh 版，内容同源、文件独立） |
| 知识源 | `OC-based Agent Service/skills/sop.md`（评测线分支） | `domains/minidev/sop.md`（本分支已拷贝解耦；OC 树在 2.0 已移除） |
| 评测管线 | `Evaluation/`（四阶段 + judge + 归档） | **无**（2.0 不以评测轮次为目的；要评测需另建） |

两侧唯一的历史血缘是 AGENTS.md 的内容同源；运行时互不依赖。

## 排障（关键几条）

| 症状 | 查这里 |
|---|---|
| 跑题 600s 白跑、无工具调用 | 后端没起来：`run_one.sh` 预检会先拦；TS 栈先起 `--http 28795` |
| 起 UI 报 `Preset services require isolate realms` | `preset-dlr` 的 compaction 组缺 `isolate`（照 standard preset 抄） |
| Web 选工作区报错（Windows） | 已钉 `-browse` 曲面（native worker 会崩）；禁 auto + 插 browse，二者不可同挂 |
| 起 UI 报 `EADDRINUSE 3080` | 旧实例没死透 → 按端口杀：`netstat -ano \| grep :3080` → `taskkill //F //PID <pid>` |
| dsh 报工具名不对 | 工具面是 `mcp__semantic-core__*`；升级 dsh 后先 `--dump-config` 核行 id |
