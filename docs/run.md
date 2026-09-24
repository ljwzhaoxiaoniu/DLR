# 运行手册（2.0）

> 操作篇：**起后端 / 跑题 / Web / 状态面 / 排障**。命令都在 Git Bash 下执行（Windows）。
> 背景见叙事四篇（[01](01-background.md) → [04](04-application.md)）；两棵树的就地说明书：[TSM Core Service](<../TSM Core Service/README.md>)、[DSH-based Agent Service](<../DSH-based Agent Service/README.md>)。

## 0. 全局图

```
dsh（headless / web）
   │  MCP（streamable-http :28795，5 工具）
   ▼
TSM Core Service（node 进程）：LanceDB（向量）+ ONNX 编码器（进程内）
   │  bolt :7687
   ▼
Neo4j（Browser :7474）
   │  sqlite:///…
   ▼
数据集（MINIDEV_sqlite，gitignored）
```

**两个进程**：Neo4j + TS MCP server。LanceDB 与编码器是嵌在 MCP 进程里的库，**不是**服务。

## 1. 起后端（幂等）

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"
```

- 判据是**功能性的**：Neo4j 探 `:7474`；MCP server 用**预检**（真连上去列 5 工具）；最后再预检一次当回执。
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

## 3. Web 对话

```bash
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"
```

- 默认 preset = dlr（语义业务助手）；进 UI 先选工作区 `DSH-based Agent Service`（AGENTS.md 靠它加载）。
- 启动器会把状态浮层插件同步到 `$DSH_HOME/profiles/node_modules`。
- 改过 patch / 插件后**必须重启 web**（组合在启动时装配）。

## 4. 状态面

- 右下角常驻 **TSM 状态浮层**（随 `dsh-tsm` bundle 分发）：Neo4j / MCP 两盏灯 · LE/PE/PA/PAS · 向量行数 · 场景名 · Neo4j Browser 链接；10 秒轮询。
- 数据源 = MCP server 的 `GET /status`（JSON；CORS 只放行 dsh web 的 loopback 源）：

```bash
curl -s http://127.0.0.1:28795/status
```

- **图谱页**：**http://127.0.0.1:28795/viz/dlr**（MCP server 实时渲染；状态卡上的 `图谱 ↗` 指向它）。
  离线/分享用单文件版：`tsm viz`（产物 `.store/viz/dlr-graph.html`）。
- Neo4j Browser：http://localhost:7474 —— 账号 `neo4j`，密码在 `TSM Core Service/.env`（状态卡 `Neo4j ↗` 指向它）。

## 5. 工具依赖（Neo4j 挂了会怎样）

| 工具 | 依赖 | Neo4j 停时 |
|---|---|---|
| `dlr_semantic_query` · `get_pe_mapping` · `get_le_attrs` | Neo4j | ❌ 不可用 |
| `dlr_search_consensus` | LanceDB | ✅ 照常 |
| `execute_sql` | SQLite | ✅ 照常 |

**失败不缓存**：连接失败不会被粘住——Neo4j 恢复后工具**自愈**（无需重启 MCP）。

## 6. 排障表

| 症状 | 查这里 |
|---|---|
| 跑题 600s 白跑、无工具调用 | 后端没起：`run_one.sh` 预检会先拦；跑 `start_backend.sh` |
| 状态卡不出现 | ①启动终端有无插件告警 ②浏览器 console ③是不是没重启 web |
| 状态卡 Neo4j 红灯 | `curl /status` 看 error；Neo4j 是否在听 `:7474` |
| 改了 `src/**` 不生效 | MCP server 是常驻进程：杀端口 → `start_backend.sh` |
| Web 选工作区报错（Windows） | 已钉 `-browse` 曲面（native worker 会崩）；禁 auto + 插 browse，二者不可同挂 |
| 起 UI 报 `EADDRINUSE 3080` | `netstat -ano \| grep :3080` → `taskkill //F //PID <pid>` |
| 会话日志"看起来是空的" | **多帧 zstd**：单帧解码只出 header——用 `DSH-based Agent Service/scripts/decode_session_log.cjs` |
| 机器内存吃紧 | 常驻约 650MB（Neo4j ~280 + MCP ~330）；不用时关，用时跑幂等脚本 |
| dsh 报工具名不对 | 工具面是 `mcp__semantic-core__*`；升级 dsh 后先 `--dump-config` 核行 id |

## 7. 纪律

- **运行态 = dsh 宿主 + MCP 面 + 状态面；开发态 = `tsm` CLI**（`tsm build` / `tsm verify` / `tsm viz`）。
  `tsm viz [--open] [--db <库>]` 生成自包含的 DLR 图谱页（开发态看建模：LE/PE/ARCS/PAS，点击 PE 看列映射），产物在 `TSM Core Service/.store/viz/dlr-graph.html`。
- **服务由项目主手动启停**；本手册的命令都可**重复执行**（幂等是设计目标）。
- 改配置（patch / 插件）→ 重启对应宿主；改 `skills/*.md` 的源 → `sync_sop.sh` 后即生效（不用重启）。
- 临时产物一律进 `tmp_scripts/`，或随用随删。

## 8. 新机器安装（异地验收清单）

> 目标：在"只有 dsh 的环境"把整套装起来。**dsh 侧已 bundle 化**（DLR 的行 = `dsh-tsm` 一条命令）；**后端仍是独立服务**（clone + npm i + build）。

**0) 代码**（2.0 分支；当前它未推远端，二选一）

```bash
# A. 从远端（先在这台机器上 push）
git clone -b 2.0 https://gitcode.com/wei_44/DLR-Proj.git dlr-proj
# B. 从本机直接克隆（带上 2.0 的本地提交，最快）
git clone "D:/Code_Proj/DLR Proj" "D:/dlr-proj"
```

**1) 系统依赖**

| 项 | 说明 |
|---|---|
| Node ≥ 22 + npm | 跑服务与 dsh |
| Git Bash（Windows）/ bash | 所有脚本的宿主 |
| Neo4j 5.x | 任意 bolt 端点即可：docker 一行 `docker run -d --name tsm-neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/<密码> neo4j:5`，或本机免安装 zip |

**2) 数据与模型**（都是 gitignored，要单独弄）

```bash
# 数据集 1.4G：从原机拷（或按 eval-line/dataset.md 下载 mini_dev 解压）
cp -r "<原机>/MINIDEV_sqlite" "<新机>/dlr-proj/"
# ONNX 编码器 91M：从镜像拉
cd "dlr-proj/TSM Core Service" && bash scripts/fetch-model.sh
```

**3) 两份 .env**（gitignored，从 `.env.example` 复制）

- `TSM Core Service/.env` → `NEO4J_URI / NEO4J_USER / NEO4J_PASSWORD`
- `DSH-based Agent Service/dsh_dlr/.env` → `DEEPSEEK_API_KEY`

**4) 装依赖 + dsh + bundle**

```bash
cd "dlr-proj/TSM Core Service" && npm install
npm install -g @deepseek-ai/dsh@0.1.7-alpha.1     # 版本锁死
npm install -g pnpm                               # dsh plugin 转发给它（装 bundle 必需）

# DLR 的行（MCP 网关 / preset-dlr / 状态浮层 / skills）——一条命令装进 profile
dsh plugin --profile web add "<新机>/dlr-proj/DSH-based Agent Service/dsh-tsm"
dsh plugin --profile headless add "<新机>/dlr-proj/DSH-based Agent Service/dsh-tsm"
```

**5) 构建（先起 Neo4j）**

```bash
cd "dlr-proj/TSM Core Service"
npx tsx src/build/buildLance.ts --all
npx tsx src/build/buildConsensus.ts
npx tsx src/graph/loadNeo4j.ts --all --wipe
```

**6) L3 部署件 + 起后端**

```bash
cd "../DSH-based Agent Service/dsh_dlr" && bash sync_sop.sh
cd ../.. && bash "DSH-based Agent Service/scripts/start_backend.sh"
```

**7) 验收**

| 检查 | 期望 |
|---|---|
| `npx tsx src/verify/precheck.ts` | 5 工具 |
| `curl -s localhost:28795/status` | `ok:true`，LE 49 / PE 72 / PA 792 / PAS 35 |
| `bash dsh_dlr/run_one.sh 1471 "What is the ratio of customers who pay in EUR against customers who pay in CZK?"` | 答案 **0.0657** |
| `bash dsh_dlr/run_web.sh` | 右下角状态卡两盏灯全绿 |

> 任何一步不符合期望 = 可移植性问题，回报给本仓库（这正是"路径解耦"要保证的）。

## 相关

- 场景包与考卷：[04-application.md](04-application.md)｜评测：[eval.md](eval.md)｜可移植与扩展边界：[roadmap.md](roadmap.md)
