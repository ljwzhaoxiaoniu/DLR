# DSH-based Agent Service — DLR 范式接入 DeepSeek Harness

把 **DLR 这一个范式**从 opencode 宿主接入 dsh（DeepSeek Harness）。与 `OC-based Agent Service/` 并列：**OC 版是 v4 基线，本目录不改动它一行**；`Semantic Core Service/`、`Evaluation/` 同样不动。

## 结构

```
DSH-based Agent Service/
├── AGENTS.md                 # dsh 版评测 Agent 规则（OC 132 行的宿主适配版）
├── README.md                 # 本文件
├── .gitignore                # .dsh-home/、.env 等
├── .dsh-home/                # 运行时生成（$DSH_HOME 指到这里，跨机可删）
└── dsh_dlr/
    ├── dsh.patch.yml         # headless 组合（--patch 引入；禁用/改配/新增 MCP 行）
    ├── dsh-web.patch.yml     # web 组合（新增 preset-dlr + 进程级收尾；web 工具归属 preset）
    ├── mcp_sse_stdio_bridge.py  # stdio→SSE 桥（dsh 不支持 SSE；桥不碰 Kuzu）
    ├── skills/sop/SKILL.md   # L3 技能（sync_sop.sh 从 OC sop.md 生成，勿手改）
    ├── skills/paradigm/SKILL.md  # 范式认知技能（TSM + DLR 结构，与数据集无关，手工维护）
    ├── sync_sop.sh           # L3 单一真源同步
    ├── run_one.sh            # 单题运行器（= OC 版 opencode 调用的 dsh 等价形式）
    ├── run_web.sh            # Web UI 启动器（dsh web + DLR preset）
    └── .env.example          # 凭据样例 → 复制为 .env 填 key
```

## 依赖

| 项 | 值 |
|---|---|
| dsh | `@deepseek-ai/dsh@0.1.7-alpha.1`（**锁死**；preview 会破坏性变更，升级前重跑验证） |
| node / npm | ≥22（本机 v24.14.0 ✓） |
| python | 本仓库 conda 环境：`/d/ProgramData/anaconda3/envs/lepe_som/python`（桥用 fastmcp 3.4.2） |
| DLR 语义服务 | `main.py serve` 的 DLR 进程，`http://localhost:28775/mcp/sse`（**项目主启动**） |

## 一次性准备

```bash
npm install -g @deepseek-ai/dsh@0.1.7-alpha.1     # rc/latest 线发布断链，alpha 线完整
cp "DSH-based Agent Service/dsh_dlr/.env.example" "DSH-based Agent Service/dsh_dlr/.env"
# 编辑 .env，填 DEEPSEEK_API_KEY（复用 opencode 现用那把）
bash "DSH-based Agent Service/dsh_dlr/sync_sop.sh"   # 生成 L3 技能（改过 OC sop.md 后需重跑）
```

## 运行（单题）

```bash
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" 1471 "How many percent of customers paid in EUR?" 
# 产物: tmp_scripts/dsh_smoke/<MMDD_HHMM>_1471_dlr.ndjson（dsh --json 事件流）+ 同名 .err
```

`run_one.sh` 做三件事：① MCP 预检（服务不可达直接退出 3，避免白跑 600s）；② 把 `$DSH_HOME` 指到仓库内 `.dsh-home/`（切断 `~/.dsh` 的 user-global 引导）；③ 以 `--profile headless --patch dsh.patch.yml --json` 跑题。

## Web UI（手动问答通道）

```bash
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"        # 起 UI 并自动开浏览器（默认 3080）
```

- **进 UI 第一件事选工作区**：`D:\Code_Proj\DLR Proj\DSH-based Agent Service`（或其下 `dsh_dlr`）——AGENTS.md 靠 workspace 链加载，选错目录规则不进来
- 会话默认 preset = **`dlr`**（语义业务助手 + 5 个 MCP 工具 + sop 技能；无 shell/文件/联网工具）；可在会话设置里切回内置 preset 对比
- 这是**手动通道**：不进评测、不归档、不适用单轮纪律；URL 每次带新 token，用终端打印那条进
- 前置：DLR 语义服务在跑（28775）；桥由 dsh 按会话自动拉起。官方拒绝 `--host 0.0.0.0`（界面无 TLS，远程走 SSH 隧道）

## 验证清单（装好后按序）

1. **结构**：`dsh --profile headless --patch "<绝对路径>/dsh.patch.yml" --dump-config`
   - stderr 无 `patch: entry ... not found`（有 = id 打错或该版本无此行）
   - 禁用清单在列；`fs-sandbox` / `skill` / `skill-filesystem` / `tool-skill` / `agent-instructions` / `llm-deepseek` **未被禁**（`fs-sandbox` 是 AGENTS.md 加载与 skill 扫描的 fs provider，禁了就什么都不加载）
2. **桥**：`run_one.sh` 自带预检，期望 `[precheck] upstream ok (5 tools): ['dlr_search_evidence', 'dlr_semantic_query', 'execute_sql', 'get_le_attrs', 'get_pe_mapping']`
3. **冒烟**：跑一道已归档题（建议 1471）；核对 `tool_call` 事件只出现 `mcp__semantic-core__*` 与 `skill`；至少一次 `skill(name="sop")`；无 bash/read/write 类工具
4. **取证**：`.dsh-home/sessions/--<cwd>--/<id>/session.v*.jsonl(.zstd)` 里能搜到 persona、AGENTS.md 文本、`skill_content name="sop"`，且 `CLAUDE.md` 出现 0 次

冒烟产物放 `tmp_scripts/`；**不进 `validated_results/`，归档须另行确认**。

## 多数据集组织（约定）

**一个评测集 = 一套完整 TSM**：L1 DLR 图谱 + L2 evidence + L3 `sop` 文件（+ 全局共用的 `paradigm` 认知技能）。

| 层 | 换数据集时 | 载体 |
|---|---|---|
| L1 数据源级 | 重新建模 / 构建 | `Semantic Core Service/`（该数据集的三范式配置 + storage） |
| L2 领域共识级 | 换一组 evidence | `rag_knowledge/*.jsonl`（集内再按库分 `namespace`） |
| L3 业务逻辑级 | 换一个源文件 | `domains/<dataset>/sop.md` → `sync_sop.sh <src> sop` 生成部署件 |
| 认知层 | **不动** | `skills/paradigm/SKILL.md`（TSM + DLR 结构，与数据集无关） |

**铁律：部署出去的 L3 技能名永远是 `sop`**——"用哪套"发生在 run 配置层（同步哪个源、`customSkillDirs` 指哪），模型层永远不需要"选库/选数据集"，所以不会重现 09-18 合并时避开的那个死循环（`docs/tsm-design.md` §v3→TSM 迁移路径第 2 条）。

**换集清单**：① 建 L1（三范式 build）② 备 L2 evidence ③ 写 L3 源文件并 `sync_sop.sh <src> sop` ④ 跑题时指向该数据集的服务端口与技能根。

## 与 OC 版（opencode）的差异

| 维度 | OC 版 | dsh 版 | 说明 |
|---|---|---|---|
| 接入方式 | `http://localhost:28775/mcp/sse` 直连 | dsh 按 stdio 起**桥进程** → 转发到同一 SSE | dsh 客户端不支持 SSE；桥不碰 Kuzu，服务仍单进程 |
| 工具名 | `semantic-core_dlr_semantic_query` | `mcp__semantic-core__dlr_semantic_query` | 命名规则不同 → **结果不可与 v4 基线同表比较** |
| 工具发现 | `/mcps`（实际一直被权限拒绝，从未生效） | 无此机制；工具表由 5 个固定工具代替 | AGENTS.md 已重写 |
| L3 读取 | `read skills/*.md`（权限白名单） | `skill(name="sop")`（唯一读取通道） | 本组合无 fs 工具，"只读" 由组合保证 |
| 权限模型 | opencode `permission` deny 清单 | 不挂载对应工具行（`disabled: true`） | dsh 的 YAML 层没有读白名单 |
| 模型 | `oc-deepseek / deepseek-v4-flash` @ `api.deepseek.com/v1`（OpenAI 兼容） | `deepseek-official / deepseek-flash`（Messages API） | 口径对齐 A/B 待做：改 `agent-default-model` 行或加 `llm-pi-ai` 路由 |
| 会话日志 | opencode NDJSON 直落 | `$DSH_HOME/sessions/**`（zstd 多帧 + packed row） | 评测管线对接需适配器（**本轮不做**） |

## 排障

| 症状 | 查这里 |
|---|---|
| 跑题 600s 白跑、答案里没有任何工具调用 | MCP 行没起来：看 `.err` 里有无 `dsh:` 级 warn；先跑 `run_one.sh` 的预检；`failOnStartupError: true` 只响亮报错**不中止** harness |
| `skill` 加载报错 / 模型说没有 sop | `sync_sop.sh` 是否跑过；`skills/sop/SKILL.md` frontmatter（`name: sop` / `description` 必需，kebab-case）；`--patch` 里 `customSkillDirs` 相对 cwd，run_one.sh 会 `cd dsh_dlr` |
| dump 里某条 disable 没生效 | 对照 `--dump-config` stderr 的 `patch: entry ... not found`；行名单来自 0.1.7-alpha.1 实测，升级 dsh 后必须重新核对 |
| AGENTS.md 没进上下文 | 先确认 `fs-sandbox` 未被禁；`instructionFileCandidates` 只留 `AGENTS.md`（排除仓库根 `CLAUDE.md`）；cwd 必须是 `dsh_dlr/`（链路：repo 根 → DSH-based Agent Service/ → dsh_dlr/） |
| 回答被截断/丢候选实体 | `tool-result-pruner` 已抬到 48000；若仍截断，看 `.err`、调阈值并记录 |
| Web UI 选工作区报错（Windows） | 原生目录选择器 worker 会崩（官方已知问题）；本 patch 已把 `directory-picker`（auto）钉为 `-browse` 曲面（**禁 auto + 插 browse 行**，二者不可同挂，会 duplicate 报错） |
| 起 UI 报 `Preset services require isolate realms: compaction, toolResultPruner` | preset 内服务必须声明隔离域：`preset-dlr` 的 compaction 组 `isolate: {compaction: true, toolResultPruner: true}` 不能缺（照 standard preset 抄） |
| 起 UI 报 `EADDRINUSE ... 3080` | 旧实例没死透（`TaskStop` 杀不掉 exec 后的 node）→ 按端口杀：`netstat -ano \| grep :3080` 取 PID 后 `taskkill //F //PID <pid>` |

## 边界（本轮）

- **不改**：`OC-based Agent Service/**`、`Semantic Core Service/**`、`Evaluation/**`
- **不做**：评测管线对接（NDJSON 适配器设计已备好，Phase 2 待批）、Web UI 路线、社区插件（需 pnpm + GitHub，本机均缺）、ER/RDF 范式
- 若桥路线失败，备选方案 = 在 `main.py` 给 DLR 挂一个 streamable-http mount（届时单独批）
