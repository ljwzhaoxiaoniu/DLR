# 评测流水线说明 — 四阶段 + 两段式判定

评测目标：在 mini_dev 500 题上，**以完全同构的链路对比三种建模范式对 LLM Agent 的语义引导差异**——最终论证 DLR 原创建模的价值。

**评测定位**：借用 NL2SQL 测试集，但**不比拼 SQL 结果集等价**（非 BIRD execution accuracy 口径）。判定口径是**最终一致性 + 数据来源合法性**，服务于 Agent+业务 SOP 泛化能力的度量。流水线第一设计原则是公平与可审计：所有阶段可独立重跑、原始日志全保留、判定链透明。

## 1. 流水线总览

| 阶段 | 脚本 | 输入 | 输出 | 依赖 |
|------|------|------|------|------|
| **Stage 0** 预处理 | `00_preprocess.py` | `mini_dev_sqlite.json` + SQLite | `00_golden_cache.json` | 无 |
| **Stage 1** Agent 执行 | `run_serial.sh` / `run_parallel.sh`（入口 `eval_run.sh`） | Stage 0 + MCP 服务 | `01_logs/{run_id}/{paradigm}/` NDJSON | Stage 0 + 服务 |
| **Stage 2** 提取与预执行 | `02_extract_and_run.py` | Stage 1 日志 | `{run_id}/02_predictions/{paradigm}/` | Stage 1 |
| **Stage 3** strict 初判 | `03_evaluate.py` | Stage 2 + Golden | `{run_id}/03_reports/{paradigm}.csv`（含待仲裁标记） | Stage 0 + 2 |
| **Stage 4** LLM 仲裁 | `04_judge.py` | Stage 3 CSV + Stage 1 日志 | 同一 CSV 逐行写回 + summary 重算 | Stage 3 |
| 汇总 | `parse_agent_stats.py` | Stage 1 tokens + Stage 3/4 | `agent_stats.csv` | — |

```bash
# 先起服务
cd "Semantic Core Service" && python main.py serve --paradigm ALL
# 端到端（三范式并行）
cd Evaluation/scripts
bash eval_run.sh EDR 2 1471 --parallel --workers 6                  # Stage 1
python 02_extract_and_run.py --paradigm er --log-subdir <run_id>    # ×3 范式
python 03_evaluate.py --paradigm er --log-subdir <run_id>           # ×3 范式(秒级,纯脚本)
python 04_judge.py --paradigm er --log-subdir <run_id>              # ×3 范式(仅判 strict FAIL 且未判的行)
python parse_agent_stats.py --paradigm ALL
```

**为什么拆两段**：strict 初判是纯脚本秒级；LLM 仲裁走 `opencode run`（慢、可能超时）。拆开后 Stage 3 立即出全量初判，Stage 4 独立循环、每题落盘、中断续跑互不拖累。

## 2. 关键设计

### Stage 0 — Golden 标准化缓存（✅ 500/500 零失败）
Golden SQL 预执行 + 标准化：`float 1.0 == int 1`（round 6）、`None == NULL`、行/列序忽略（排序比较）、BLOB decode、连接 timeout 30s。

### Stage 1 — Prompt 铁律
1. **脚本只传 `Question: ... | Evidence: ...`**——禁止在脚本塞任何指令（工具推荐/禁 bash/输出格式）；
2. **所有 Agent 行为规则只写 AGENTS.md**（唯一规则入口，三范式共用，见 [agent.md](agent.md)）；
3. **Agent 不拿 db_id**——定位库是语义层的职责（db-aware recall，见 [modeling.md](modeling.md) §5）。

run_id 命名：`MMDD_HHMM_{起始qid}-{结束qid}_{范式字母}`。Stage 1 原始 NDJSON 日志**永久保留**（debug 行为/回溯工具链/重提取 SQL 的唯一数据源）。

### Stage 2 — 重放定库
从 NDJSON 提取 `Evidence SQL` → **在 golden db_id 对应的库上重放**（不信 Agent 自己的执行结果）→ 标准化。Agent 若跑错库，SQL 重放即报错/结果不符 → 判错。

### Stage 3 + Stage 4 — 两段式判定

**Stage 3（strict 初判，纯脚本）**：标准化严格比对（PASS/FAIL，float 容差 1e-6，行/列序忽略）。PASS → `verdict=CORRECT, process_score=100`；FAIL → 初判 INCORRECT，标记待仲裁。

**Stage 4（LLM 仲裁，`opencode run` @ `Evaluation/oc_judge/`）**：只处理 strict FAIL 且未判过的行。**判定规则只写在 `oc_judge/AGENTS.md`**（与评测 Agent 同一条 Prompt 铁律——脚本只传数据：Gold/Pred 的 SQL 与结果、Agent 工具调用链、Final Answer）。

**翻盘条件（五环节全对才 CORRECT）**：
1. 语义正确（召回定位到正确库/表对象）
2. 工具正确（semantic_query → 映射工具 → execute_sql 正道）
3. 映射正确（库表字段来自映射返回，database_url 未编造）
4. SQL 执行正确（表达题意且执行成功）
5. 结果正确（最终答案与 Gold 一致；答案在 PredResult 中或按题意直接加工可得，多余行列不扣分）

结果不正确 → `process_score` 按通过环节给比例（每步 20%），REASON 注明失败环节。

CSV 判定列：`strict_match` / `judge_verdict` / `judge_reason` / `verdict` / `process_score`。

**增量与续跑**：Stage 4 每判一题立即写回 CSV；已有非 UNKNOWN 判定不重判；`--budget N` 控制单次仲裁量。

### 评测公平性
- 三范式 YAML/TTL 映射全英文化，Prompt 全英文——唯一变量是建模范式结构差异；
- 召回对齐：三范式走同构 FAISS 索引与统一 `*_semantic_query` 接口；
- 防作弊为架构级（bash deny + execute_sql 唯一路径 + MCP 范式隔离），见 [agent.md](agent.md)。

## 3. 输出与归档

```
Evaluation/outputs/
├── 00_golden_cache.json
├── 01_logs/{run_id}/{er,dlr,rdf}/<qid>.json   # Stage 1 NDJSON（保留）
└── {run_id}/
    ├── 02_predictions/{er,dlr,rdf}/<qid>.json
    ├── 03_reports/{er,dlr,rdf}.csv + *_summary.json
    └── agent_stats.csv

validated_results/round_N/{q_start}-{q_end}/    # post_process.py 归档
├── raw/{paradigm}_{qid}.json
└── agent_stats.csv    # 字段: paradigm,q_id,db_id,strict_match,judge_verdict,judge_reason,verdict,error,input_tokens,output_tokens
```

## 4. 已知问题（行为审计发现，2026-07-18，待修）

前 4 题（q1471/1472/1473/1476 × 3 范式）逐日志审计的遗留问题：

| 级别 | 问题 | 状态 |
|------|------|------|
| P0 | `post_process.py` 归档循环未按范式过滤（raw 全是 DLR 拷贝） | ✅ 已修（2026-07-18），round_1 已重归档，12 份 raw MD5 唯一 |
| P0 | `execute_sql` 无行数上限 / 无 LIMIT 的 `SELECT *` | ✅ 已修：200 行截断 + `SELECT *` 无 LIMIT 拒绝执行（重启 serve 生效） |
| P0 | opencode 内置 `task`/`read` 子代理未 deny | ⏳ 待修（防作弊活口） |
| P0 | R2RML 生成器主键列不入 predicateObjectMap | ⏳ 待修（RDF Agent 靠 PRAGMA 兜底） |
| P1 | er_1471 judge 超时误判 | ✅ 判定政策已定为"五环节全对才翻盘 + 过程分"（oc_judge/AGENTS.md），按新政策由 Stage 4 重判 |
| P1 | Agent SQL 心算终值 / 多列多行 | ✅ 双侧处理：AGENTS.md 加"Evidence SQL 必须直接返回 Final Answer 的值"引导；judge 侧按最终一致性判定（可直接加工得出即认），不再卡口径摇摆 |
| P1 | AGENTS.md 的 `/mcps` 指令在 `opencode run` 下不可执行 | ⏳ 待修（模型退而调 `list_mcp_resources` 恒空浪费） |
| P1 | `find_shortest_path` Cypher bug；`rdf_classes` 只返回 TriplesMap | ⏳ 待修 |
| P1 | `input_tokens` 不含 cache read，跨范式/跨轮对比失真 | ⏳ 待修（需补 cache_read 列） |
