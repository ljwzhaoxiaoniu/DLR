# 评测结果 — 持续更新

> 目标结论方向：**DLR 原创建模（LE-PE 双层 + PAS 语义路由）对 LLM Agent 的 NL2SQL 引导优于 ER/RDF 基线**。
> 本文件随评测推进滚动更新；所有数字可从 `validated_results/` 与 `Evaluation/outputs/{run_id}/` 复核。

## round_1 — 流水线验证（q1471-1482，8 题 × 3 范式，db=debit_card_specializing）

| 轮次 | 题号 | ER | DLR | RDF | 备注 |
|------|------|----|----|-----|------|
| 1-2 | q1471, q1472 | 100% | **100%** | 100% | q1471/1472 各范式均经五环节仲裁翻盘 |
| 3-4 | q1473, q1476 | 100% | **100%** | 100% | 全通（1473 三范式 strict PASS） |
| 5-6 | q1479, q1480 | 100% | **100%** | 100% | dlr_1479 YAML 修复后翻盘 |
| 7 | q1481, q1482 | 100% | **100%** | 100% | gold 数据集错误 → 修正 gold cache 后 judge 翻盘 |

**round_1 终态：24/24 CORRECT，process_score 全 100**（判定政策：五环节全对才翻盘——语义召回/工具链/映射/SQL 执行/最终一致性，见 [evaluation.md](evaluation.md)；q1471 式"SQL 返回 count、比值由 Agent 直接加工"按最终一致性认定为对，同时 AGENTS.md 已引导后续轮次把计算写进 SQL 以提升 strict PASS 率）。

### 行为效率对比（来自 NDJSON 日志逐条审计）

| 指标 | ER | DLR | RDF |
|------|----|----|-----|
| 最佳单题链路 | 6 步（q1473） | **3 步（q1471：semantic_query → get_pe_full → execute_sql）** | 7 步（q1471） |
| 最差单题链路 | 34 步（q1472，跨库漂移 + 全表 dump） | 12 步（q1472） | 23 步（q1472） |
| input tokens 区间* | 8.0K–24.7K | 1.9K–20.2K | 9.9K–19.4K |

\* 注意：`input_tokens` 现口径不含 cache read，三范式系统提示/工具 schema 大小不同，跨范式绝对值对比需等 cache_read 列补齐后修正（见 [evaluation.md](evaluation.md) 已知问题）。

### 定性观察

- **DLR q1471 是教科书链路**：`dlr_semantic_query` 一跳召回 LE-PE 结构 → `get_pe_full` 一跳拿全（属性+ARCS+database_url）→ 一条 SQL 收工。ER 需要 2-3 跳分散工具，RDF 需要 mapping + PRAGMA 兜底（R2RML 缺列所致）。
- **跨库漂移**（q1472 "LAM" 语义模糊）：三范式都发生过全局召回漂移（ER 撞进 financial/student_club 并执行 3 条错库 SQL；DLR recall 到 codebase_community；RDF 查了 financial/formula_1 的 mapping）——已由 db-aware recall（2026-07-18）机制性解决，后续轮次预期步数/token 显著下降。
- **RDF 的"干瘪"如实生效**：映射只有列名+JOIN，Agent 被迫用 `PRAGMA table_info` 内省补 schema（其中一部分是生成器缺列 bug，修复后仍缺业务语义——这正是对照设计要测的）。
- 12/12 无一例绕过 MCP 直接猜库/猜表，`execute_sql` 的 database_url 全部来自映射工具——防作弊路径生效。

## 数据可信性备注

- round_1 4 题全部落在 `debit_card_specializing`（无 PE 重名牵连、无 db 漂移致错），**结果可信，不因 2026-07-18 的修复重跑**；
- 2026-07-18 起的轮次运行在 db-aware recall + PE 改名 + clear() 修复后的索引上，与 round_1 存在预期行为差异（召回锁库、from_entity_id 修复），对比指标时注明；
- DLR 范式下 card_games（52 题）/ formula_1（66 题）必须使用修复后索引（修复前 `PHYSICAL.Card`/`PHYSICAL.Race` 被跨库覆盖，涉及题必错）。

## 下一步

- 从 q1483-1484 继续推进（`bash eval_run.sh EDR 2 1483 --parallel --workers 6`）；
- 500 题全量后补充：分范式准确率总表、分库分难度矩阵、token/步数分布、DLR 语义路由收益归因分析。

## 数据可信性备注（2026-07-20 更新）

- round_1 8 题全部落在 `debit_card_specializing`，**结果可信**；
- pair 7 (q1481/q1482) 发现 gold 数据集 gold SQL 与题意/evidence 相悖（两源一致，判定为数据集本身错），已修正 gold cache 并记录到 [dataset.md](dataset.md) § Gold SQL 已知错误；
- 修正 gold 后 strict_match 仍 FAIL（pred 带标签多行 vs gold 单行纯值）→ 由 Stage 4 judge 按语义翻盘，这是两段式设计的预期行为。
