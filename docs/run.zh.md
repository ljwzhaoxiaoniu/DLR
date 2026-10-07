# 运行手册（2.0）

> 操作篇：**起后端 / 跑题 / Web / 状态面 / 排障**。命令都在 Git Bash 下执行（Windows）。
> 背景见叙事四篇（[01](01-background.zh.md) → [04](04-application.zh.md)）；两棵树的就地说明书：[TSM Core Service](<../TSM Core Service/README.md>)、[DSH-based Agent Service](<../DSH-based Agent Service/README.md>)。
> 英文版：[run.md](run.md)

## 0. 全局图

```
dsh（headless / web）
   │  MCP（streamable-http :28795，7 工具）
   ▼
tsm-core-dlr（node 进程）：LanceDB（向量）+ ONNX 编码器（进程内）
   │  图后端双轨：
   │    · memory —— YAML → 进程内内存图（默认；零依赖、零锁）
   │    · neo4j  —— bolt :7687（可选；配了 NEO4J_URI 即启用）
   ▼
数据集（MINIDEV_sqlite，gitignored；手动下载）
```

**进程**：TS MCP server 常驻；Neo4j 只在用 Neo4j 图后端时启动（本仓库默认如此——见 §5）。LanceDB 与编码器是嵌在 MCP 进程里的库，**不是**服务。

## 1. 起后端（幂等）

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"
```

- 判据是**功能性的**：Neo4j 探 `:7474`（内存图后端时跳过）；MCP server 用**预检**（真连上去列 7 工具）；最后再预检一次当回执。
- 已在跑的跳过；起不来看它给的日志（`tmp_scripts/neo4j_console.log` / `tsm_mcp.log`）。
- ⚠ **改过 `TSM Core Service/src/**` 必须重启 MCP server**——tsx 常驻进程不会自动加载，脚本只会说"已在跑"；先杀端口（`netstat -ano | grep :28795` → `taskkill //F //PID <pid>`）再跑脚本。
- ⚠ Neo4j 是**前台 console 进程**：起它的终端/会话关了，它可能一起走；重跑本脚本即恢复。

## 2. 跑一道题（headless）

```bash
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" <qid> "<question>"
```

- 产物：`tmp_scripts/dsh_smoke/<stamp>_<qid>_dlr.ndjson`（`--json` 事件流）+ 同名 `.err`。
- 自动预检后端；后端不可达**响亮退出**（exit 3），不会烧模型调用。
- 会话日志：`DSH-based Agent Service/.dsh-home/sessions/<项目目录>/<session-id>/session.v4.jsonl.zstd`（**多帧 zstd**，取证解码器 `DSH-based Agent Service/scripts/decode_session_log.cjs`）。
- **跑一批**（并行 → 判定 → 统计）：见 `scenarios/birdminidev/results/README.md`「一轮怎么跑」。

## 2.5 跑考试（dsh-tsm-eval）

2.0 的考试系统（`DSH-based Agent Service/dsh-tsm-eval/`，bin `dsh-eval`）端到端驱动一套场景的考卷：逐题 dsh headless → `tsm grade` → 可回放报告。

```bash
node "DSH-based Agent Service/dsh-tsm-eval/bin/dsh-eval.mjs" doctor                       # 11 项自检
node "DSH-based Agent Service/dsh-tsm-eval/bin/dsh-eval.mjs" all --qids 1471,27 --out tmp_scripts/smoke
```

- 默认落 `<场景>/eval/runs/` —— **`tsm stats` 永不会扫到**；`--ledger` 才写 `results/`，且超 5 题须 `--yes`（批量纪律）。
- `report.json` / `report.md` 在 grade 的 CSV 之上补：过程指标、无效轮分离（TRANSPORT / 超时）、会话日志取证。
- 完整参考：[dsh-tsm-eval README](../DSH-based%20Agent%20Service/dsh-tsm-eval/README.zh.md)。

## 3. Web 对话

```bash
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"
```

- 默认 preset = dlr（语义业务助手）。agent 规则（`AGENTS.md`）**随 bundle（`dsh-tsm-agent`）分发**：工作区自带 `AGENTS.md` 时以工作区为准，否则用包内那份——**仅为加载指令**已不再必须选工作区。
- 启动器会把状态浮层插件同步到 `$DSH_HOME/profiles/node_modules`。
- 改过 patch / 插件后**必须重启 web**（组合在启动时装配）。

## 4. 状态面

- 右下角常驻 **TSM 状态浮层**（随 `dsh-tsm-agent` bundle 分发）：图后端灯（`内存图` / `Neo4j`）· MCP 灯 · LE/PE/PA/PAS · 向量行数 · 场景名 · `图谱 ↗` 链接；10 秒轮询。
- 数据源 = MCP server 的 `GET /status`（JSON；CORS 默认只放行 dsh web 的 loopback 源）：

```bash
curl -s http://127.0.0.1:28795/status
```

  关键字段：`graph.backend`（`memory` | `neo4j`）、`graph.fallback_reason`（auto 回落时）、`scenario.{name,dir,source}`、`service_info.{http_base,viz_url}`、`neo4j.enabled`（兼容键）。
- **图谱页**：**http://127.0.0.1:28795/viz/dlr**（MCP server 实时渲染；状态卡上的 `图谱 ↗` 指向它）。
  离线/分享用单文件版：`tsm viz`（产物 `<DATA_DIR>/viz/dlr-graph.html`）。
- Neo4j Browser：http://localhost:7474 —— 账号 `neo4j`，密码在 `TSM Core Service/.env`（状态卡 `Neo4j ↗` 指向它；内存图后端时隐藏）。

## 5. 图后端（Neo4j 缺席时变什么）

`TSM_GRAPH_BACKEND` = `auto`（默认）| `memory` | `neo4j`。

- `auto`：**配了 `NEO4J_URI` 才试 Neo4j**；连接失败则**回落进程内内存图**（对进程生命周期粘住；原因记在 `graph.fallback_reason` 并落一行日志）。仓库内 `.env` 配了 `NEO4J_URI` → 本检出默认仍走 Neo4j，500 题口径不变。
- `memory`：YAML → 进程内内存图。不需要 Neo4j；**7 个工具全部可用**（与 Neo4j 的一致性由 `tsm verify memory_graph_parity` 把关）。
- `neo4j`：要求 `NEO4J_URI` 且可达；否则响亮报错。

| 工具 | 依赖 |
|---|---|
| `dlr_semantic_query` · `get_pe_mapping` · `get_le_attrs` | 图（内存图**或**Neo4j） |
| `dlr_search_consensus` · `dlr_search_sop` | LanceDB |
| `execute_sql` · `get_full_data_info` | SQLite（+ YAML） |

**"失败不缓存"**（MCP server 口径）：`neo4j` 后端下连接失败会复位句柄——Neo4j 恢复后工具**自愈**（无需重启）；而 `auto` 回落到内存图属于**成功**，要回到 Cypher 需重启服务。

## 6. 排障表

| 症状 | 查这里 |
|---|---|
| 跑题 600s 白跑、无工具调用 | 后端没起：`run_one.sh` 预检会先拦；跑 `start_backend.sh` |
| 状态卡不出现 | ①启动终端有无插件告警 ②浏览器 console ③是不是没重启 web |
| 状态卡图后端红灯 | `curl /status` 看 `graph.error`；确认 `graph.backend` |
| 改了 `src/**` 不生效 | MCP server 是常驻进程：杀端口 → `start_backend.sh` |
| Web 选工作区报错（Windows） | 已钉 `-browse` 曲面（native worker 会崩）；禁 auto + 插 browse，二者不可同挂 |
| 起 UI 报 `EADDRINUSE 3080` | `netstat -ano \| grep :3080` → `taskkill //F //PID <pid>` |
| 会话日志"看起来是空的" | **多帧 zstd**：单帧解码只出 header——用 `DSH-based Agent Service/scripts/decode_session_log.cjs` |
| 机器内存吃紧 | 常驻约 650MB（Neo4j ~280 + MCP ~330）；不用时关，用时跑幂等脚本 |
| dsh 报工具名不对 | 工具面是 `mcp__semantic-core__*`；升级 dsh 后先 `--dump-config` 核行 id |
| `tsm grade` 卡死（CPU 不动、无输出） | 重活 = gold 大查询 / 结果集补救；杀该进程 → 重跑该目录即可（gold 有磁盘缓存，不重复付） |
| 整批出现 **0-token 空轮**（ndjson 停在 step 1、报 `TRANSPORT`/模型传输失败） | 网络/API 瞬断：**作废轮不计遍数**——原题重跑即可（另可 `grep -l TRANSPORT raw/*.ndjson` 定位） |
| 单题无结论句、ndjson 停在中间 | 撞上 `timeout 600`（agent 跑飞）：收紧该题 L3 节的**答案形态**后单题重跑（q186/q1241 先例） |
| 跑批中后端"卡死"（`/status` 超时、后续题全废） | agent 写的**病态 SQL**（大表相关子查询）钉死单线程服务——已加 `execute_sql` 子进程 + **20s 硬超时**护栏（`TSM_SQL_TIMEOUT_MS` 可调）；杀端口 → `start_backend.sh` |
| 换场景没生效 / 写错地方 | `tsm scenario` 打印解析结果（目录 + `source`：`env-path` / `env-package` / `default`） |

## 7. 纪律

- **运行态 = dsh 宿主 + MCP 面 + 状态面；开发态 = `tsm` CLI**（`tsm build` / `tsm verify` / `tsm viz` / `tsm coverage` / `tsm scenario`）。
  `tsm viz [--open] [--db <库>]` 生成自包含的 DLR 图谱页（开发态看建模：LE/PE/ARCS/PAS，点击 PE 看列映射），产物在 `<DATA_DIR>/viz/dlr-graph.html`。
- **服务由项目主手动启停**；本手册的命令都可**重复执行**（幂等是设计目标）。
- 改配置（patch / 插件）→ 重启对应宿主；**改 L3 源 `sources/sop.md` → `tsm build sop` 重建索引后即生效**（不再需要重启宿主；原 sync_sop.sh 已退役）。
- 路径与数据目录（全部可 env 覆盖）：`TSM_DATA_DIR`（向量库/缓存/viz；仓库内默认 `<服务>/.store`，安装态 `~/.tsm`）· `TSM_DATASET_DIR`（默认仓库根）· `TSM_SCENARIO`（路径或包名）· `TSM_OUT_DIR`（场景写入落点）· `TSM_MODEL_DIR` · `TSM_STORE_DIR` · `TSM_CACHE_DIR` · `TSM_MCP_URL` · `TSM_GRAPH_BACKEND`。
- 临时产物一律进 `tmp_scripts/`，或随用随删。
- **跑一批题 + 判定**：`run_batch.sh --qids ... --jobs 3` → `tsm grade --run <批次目录>`；判据三层、翻盘口径与迁移期纪律（5 题一批 / 每题最多两遍 / 节写完必须复跑 / 全量重判）见 [eval.zh.md](eval.zh.md) §六。

## 8. 新机器安装

> 目标：在"只有 dsh 的环境"把整套装起来。拆成三个包：**服务** `tsm-core-dlr`、**场景内容** `tsm-scenario-birdmini`、**dsh bundle** `dsh-tsm-agent`（依赖服务）。

**0) 装包**（从 npm；在检出里则改用路径安装）

```bash
npm i -g tsm-core-dlr                 # 服务 + `tsm` CLI
npm i -g tsm-scenario-birdmini        # 场景内容（一个 benchmark 一个包）
```

**1) 系统依赖**

| 项 | 说明 |
|---|---|
| Node ≥ 23.4（建议 24）+ npm | 跑服务与 dsh（`node:sqlite` 免旗标） |
| Git Bash（Windows）/ bash | 所有脚本的宿主 |
| Neo4j 5.x —— **可选** | 仅 Neo4j 图后端需要：`docker run -d --name tsm-neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/<密码> neo4j:5`；没有它则用内存图 |

**2) 模型与数据集**（都较大，单独获取）

```bash
tsm fetch-model                                    # ONNX 编码器 ~95MB（走 hf-mirror）
# 数据集 ~1.4G：从原机拷 MINIDEV_sqlite/，或按 docs/eval-line/dataset.md 下载
# mini_dev 解压到 <数据根>/MINIDEV_sqlite/
```

**3) 构建索引**（按后端；内存图下 graph 是自检、无副作用）

```bash
TSM_SCENARIO=tsm-scenario-birdmini TSM_DATASET_DIR=<数据根> tsm build all
```

**4) 起服务**

```bash
TSM_SCENARIO=tsm-scenario-birdmini TSM_DATASET_DIR=<数据根> tsm serve --http 28795
# 检出内等价：bash "DSH-based Agent Service/scripts/start_backend.sh"
```

**5) dsh 侧**

```bash
npm install -g @deepseek-ai/dsh@0.2.0-rc.2        # 当前适配版
npm install -g pnpm                               # dsh plugin 转发给它（装 bundle 必需）

dsh plugin --profile web add dsh-tsm-agent        # 连带装 tsm-core-dlr
dsh plugin --profile headless add dsh-tsm-agent
# ⚠ 装包 ≠ 启用：把 dsh-tsm-agent 加进各 profile 的 dsh.profile.bundles
#   （在插件管理器里勾选等价——那一步会同时完成装与选）
```

**6) 验收**

| 检查 | 期望 |
|---|---|
| `tsm verify precheck` | 7 工具 |
| `curl -s localhost:28795/status` | `ok:true`；图 **LE 50 / PE 74 / PA 784 · PAS 37**（内存图或 Neo4j 皆同） |
| `bash dsh_dlr/run_one.sh 1471 "What is the ratio of customers who pay in EUR against customers who pay in CZK?"` | 答案 **0.0657** |
| `bash dsh_dlr/run_web.sh` | 右下角状态卡两盏灯全绿 |

> 任何一步不符合期望 = 可移植性问题，回报给本仓库（这正是"路径解耦"要保证的）。

## 相关

- 场景包与考卷：[04-application.zh.md](04-application.zh.md)｜评测：[eval.zh.md](eval.zh.md)｜可移植与扩展边界：[roadmap.zh.md](roadmap.zh.md)
