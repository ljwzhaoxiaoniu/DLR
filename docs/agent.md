# Agent 层说明 — OpenCode + MCP + 防作弊架构

Agent 层负责把自然语言问题变成"语义查询 → 物理映射 → SQL 执行 → Final Answer"的完整推理链。**三范式共用同一个 Agent 配置与行为规则**，唯一变量是 MCP 连接的范式服务——这是三范式对比公平性的核心保障。

## 1. 架构

```
OC-based Agent Service/
├── AGENTS.md                 # 唯一的 Agent 行为规则入口（三范式共用）
├── skills/{db}.md            # Ch3 领域技能（难题模式 + SOP + fewshot，Agent 按需读取）
├── oc_er/opencode.json       # → localhost:28765/mcp/sse
├── oc_dlr/opencode.json      # → localhost:28775/mcp/sse
└── oc_rdf/opencode.json      # → localhost:28785/mcp/sse
```

- 每个范式一个 OpenCode 工作目录，`opencode.json` 只有三样东西：指向共享 `../AGENTS.md` 的 instructions、`permission.bash: "deny"`、对应范式的 MCP SSE 地址；
- 每道评测题 = 独立 `opencode run` session（零上下文污染）；
- **Agent 不预知范式**：MCP 服务端按 `_mapping_type` 自动注册/移除范式专属工具，Agent 按可用工具签名行动。

## 2. AGENTS.md 职责（规则唯一入口）

| 章节 | 内容 |
|------|------|
| 角色定义 | 语义业务助手（非通用编程工具） |
| 核心约束 | **元数据走 MCP、数据走 SQL（强制顺序）**；禁止跳过 MCP 猜库/猜表/猜字段 |
| 数据查询流程 | Step 1 语义召回（首跳全局 → 锁库后传 `db`）→ Step 2 物理映射（拿 `database_url`）→ Step 3 `execute_sql` → Step 4 结论 |
| 回答规范 | 证据驱动，引用工具名 + 字段 |
| Final Answer 模板 | `Final Answer: <结果>` + `Evidence SQL: <SQL>`（评测流水线双通道校验依赖此格式） |
| 三通道并行锚定 | 拿到 question 后同时发 Ch1 语义召回 / Ch2 证据检索 / Ch3 领域技能，交叉验证后锚定实体再写 SQL（见 3-channel-design.md） |
| Ch3 触发 | 预防（题面含陷阱模式）+ 救场（SQL 连续 2 次失败/结果可疑时回读 skills 自查）；文件访问限定 skills/{db}.md（db 来自 Ch1 返回） |

> **Prompt 铁律**（2026-07-18 确立，2026-08-25 修订）：评测脚本的 Prompt 只传 `Question: ...`（纯 question，不注入 evidence），**所有**行为规则只写 AGENTS.md，禁止在脚本里塞工具推荐/禁令/输出格式。evidence 的领域知识由 Agent 经 Ch2 `search_evidence` 主动检索。见 [evaluation.md](evaluation.md)。

## 3. 防作弊架构（架构级，非提示级）

| 层级 | 机制 | 效果 |
|------|------|------|
| **opencode.json** | `permission: {bash, task, read, glob, grep: "deny"}` | Agent 只有 MCP 工具，无文件系统/子代理后门 |
| **Ch3 读取豁免（✅ 2026-08-27 已解决）** | 三通道设计要求 Agent 读 `skills/{db}.md`，与 `read: "deny"` 冲突 | 采用**白名单**：`"read": {"*": "deny", "skills/*.md": "allow", "skills\\*.md": "allow"}`（opencode 按 git-worktree 相对路径匹配，**正反斜杠两种写法都要给**）。skills 有 4 份副本——`OC-based Agent Service/skills/` + `oc_{er,dlr,rdf}/skills/`，**改 skills 必须同步全部副本** |
| **execute_sql MCP** | 薄透传服务（`sql` + `database_url`，只读），200 行硬截断 | SQL 执行的唯一正经路径；`database_url` 必须来自映射工具返回 |
| **MCP 范式隔离** | 服务端按 `_mapping_type` 注册工具子集 | Agent 只能看到当前范式的工具 |
| **第一跳信息屏蔽** | `*_semantic_query` 不返回物理表/字段/database_url | 物理信息必须经第二跳映射工具按需获取 |

Agent 强制路径：`*_semantic_query`（首跳全局/锁库召回）→ 映射工具（`get_pe_mapping` / `get_entity_mapping` / `get_rdf_mapping`）→ `execute_sql` → `Final Answer`。

> **2026-07-20 防作弊加固**：实测发现 er_1472 用 `task` 子代理 grep 磁盘溢出文件绕过 MCP。已将评测 Agent 的 `opencode.json` deny 列表从 `bash` 扩展为 `bash/task/read/glob/grep`，Judge 保留 `read`（需读预测文件）。跑满 3 pair 后零违规。

## 4. db 锁库行为（2026-07-18）

Agent **不拿 db_id**（区别于 BIRD 官方设定）——定位数据库本身是语义层能力的一部分：

1. 首次召回不传 `db`：全局召回，从候选的 `db` 字段判断问题归属库（语义路由定位库）；
2. 锁定后：后续所有支持 `db` 参数的召回类调用传入库名，防止 11 库混合索引下的跨库漂移；
3. 三范式同规则，公平。

## 5. 运行环境要点

- **必须在 Git Bash 环境运行** `opencode run`（Python subprocess 启动会导致 MCP 工具不可见）；
- Agent 从 CWD 的 `opencode.json` 加载 MCP 配置，因此评测脚本先 `cd` 到 `oc_<paradigm>/` 再执行；
- 每题独立 session：`opencode run --format json --title eval_<paradigm>_<qid> "<prompt>"`，NDJSON 日志落盘作为行为审计的唯一数据源。
