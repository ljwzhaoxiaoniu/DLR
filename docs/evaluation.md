# 评测流水线说明 — 四阶段 + 两段式判定

评测目标：在 mini_dev 500 题上，**以完全同构的链路对比三种建模范式对 LLM Agent 的语义引导差异**——最终论证 DLR 原创建模的价值。

**评测定位**：借用 NL2SQL 测试集，但**不比拼 SQL 结果集等价**（非 BIRD execution accuracy 口径）。判定口径是**最终一致性 + 数据来源合法性**，服务于 Agent+业务 SOP 泛化能力的度量。流水线第一设计原则是公平与可审计：所有阶段可独立重跑、原始日志全保留、判定链透明。

**当前版本 v3（纯 question + 知识层 + 争议裁决）**：
- Agent 只拿 question（不注入 evidence）——2026-08-25 修复 pair 路径注入后生效，q360 起为真纯 question 批次
- Agent 靠三通道解题：Ch1 MCP 语义层 / Ch2 RAG 知识库（`search_evidence`）/ Ch3 领域技能（`skills/{db}.md`），见 [3-channel-design.md](3-channel-design.md)
- **数据集保持原始**（2026-08-27）：gold/evidence 不修正，缺陷题由知识层消化 + judge 争议裁决（见 §2 Stage 4）
- 历史口径：v2 = evidence 注入（150 题基线）；v3 早期 40 题实为注入批次（与 v2 同条件，对比仍公平）

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
bash eval_run.sh EDR 1471 1472 --parallel                              # Stage 1
python 02_extract_and_run.py --paradigm er --log-subdir <run_id>    # ×3 范式
python 03_evaluate.py --paradigm er --log-subdir <run_id>           # ×3 范式(秒级,纯脚本)
python 04_judge.py --paradigm er --log-subdir <run_id>              # ×3 范式(仅判 strict FAIL 且未判的行)
python parse_agent_stats.py --paradigm ALL
```

**为什么拆两段**：strict 初判是纯脚本秒级；LLM 仲裁走 `opencode run`（慢、可能超时）。拆开后 Stage 3 立即出全量初判，Stage 4 独立循环、每题落盘、中断续跑互不拖累。

**争议题裁决（2026-08-27 起）**：数据集保持原始（gold/evidence 不修正），已知缺陷题的裁决在 `Evaluation/oc_judge/disputes.md`（QID -> 裁定口径/裁定值）。judge prompt 附 QID + 三个知识路径（KnowledgePath = rag_knowledge/{db}.jsonl、SkillPath = skills/{db}.md、DisputePath）。判定顺序：先按 QID 查争议目录（命中则以裁定核对 Pred，该题 GoldResult 作废）；未命中按五步判，发现 evidence 与题面相悖时以题面语义为准并可打 `[争议候选]` 标记。术语/公式口径以知识层（rag_knowledge + skills）为准。新翻盘争议题追加 disputes.md（裁决唯一权威，勿只改 cache）。

## 2. 关键设计

### Stage 0 — Golden 标准化缓存（✅ 500/500 零失败）
Golden SQL 预执行 + 标准化：`float 1.0 == int 1`（round 6）、`None == NULL`、行/列序忽略（排序比较）、BLOB decode、连接 timeout 30s。

### Stage 1 — Prompt 铁律
1. **脚本只传 `Question: ...`（纯 question，2026-08-25 起）**——禁止在脚本塞任何指令（工具推荐/禁 bash/输出格式）。v2 及 v3 早期批次曾注入 evidence，08-25 起移除；
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
Evaluation/outputs2/                            # 由 config.json 的 eval.output_dir 决定
├── 00_golden_cache.json                        # 原始 gold 版（02/03/04 读它）
├── 01_logs/{run_id}/{er,dlr,rdf}/<qid>.json    # Stage 1 NDJSON（保留）
└── {run_id}/
    ├── 02_predictions/{er,dlr,rdf}/<qid>.json
    ├── 03_reports/{er,dlr,rdf}.csv + *_summary.json
    └── agent_stats.csv

validated_results/{eval.round}/                 # post_process.py 归档（当前 v4_final）
├── raw/{q1}-{q2}_{paradigm}_{qid}.json         # 扁平存放，pair 前缀命名
├── {q1}-{q2}/agent_stats.csv                   # 归档粒度 = 运行粒度，不合并
└── （生成的明细同步进 docs/results_{版本}.md）

archive/                                        # 历史：round_1 / round_2 / v2_final / v3_final
```

## 4. 待修问题

| 级别 | 问题 | 说明 |
|------|------|------|
| P0 | ~~opencode 内置 `task`/`read` 子代理未 deny~~ | ✅ 已加入 deny 列表(bash/task/read/glob/grep/write) |
| P0 | ~~R2RML 生成器主键列不入 predicateObjectMap~~ | ✅ 2026-07-22 修复：PK 暴露 + 启发式 FK(ID 后缀匹配) + FK 去重，11 库全量重生成 |
| — | ~~AGENTS.md `/mcps` 指令在 `opencode run` 下不可执行~~ | ⬇️ 降级：opencode 能力限制，模型已适配 fallback，不影响评测 |
| — | ~~`find_shortest_path` Cypher bug；`rdf_classes` 只返回 TriplesMap~~ | ✅ 2026-07-23 修复：`path_len`→`length(path)`；`classes()` 新增 `rr:class` 收集 |
| — | ~~04_judge.py emoji 崩溃~~ | ⬇️ 降级：CSV 已正常落盘，仅日志冗余，AGENTS.md 已约束规避 |
| P2 | ER YAML 缺 FK relations（dev_tables.json 无 FK） | 已手动补 3 条 relation，待 rebuild ER 后重跑验证。根治需 ER 配置生成器读 SQLite PRAGMA |
| P2 | 并行 eval 偶发 Kuzu 锁冲突 | 三范式同时初始化 MCP→争抢 Kuzu 排他锁，部分 Agent 启动即崩溃（database locked）。重跑可恢复 |
| P2 | Stage 4 LLM Judge 偶发超时 300s | 大日志或网络波动时 judge 无法完成，默认 UNKNOWN→INCORRECT，需手动翻盘 |
| P2 | RDF serve 进程静默崩溃 | `serve --paradigm ALL` 下 RDF 进程偶发崩溃，端口无监听但无错误日志（复启后正常） |

### Gold 数据集已知缺陷（保持原始，2026-08-27）

**数据集恢复原始版**：不修 gold SQL / evidence（此前修正已回滚）。缺陷清单与逐题分析见 [dataset.md](dataset.md)；裁决口径见 `Evaluation/oc_judge/disputes.md`。缺陷题由知识层消化（Ch2 聚合修正 + Ch3 SOP 避坑），Agent 按语义正确口径作答，strict 对原始 gold 必 FAIL、胜负落在 judge 仲裁。**统计口径：正常题/缺陷题分栏**。

> ✅ **已切换（2026-08-27 起）**：02/03/04 读 config.json 的 `eval.output_dir`（现为 `Evaluation/outputs2`），即 **`outputs2/00_golden_cache.json` = 原始 gold 版**（Stage 0 已重生成）。`outputs/00_golden_cache.json`（08-12 修正版）仅作历史留存，链路不再引用。
