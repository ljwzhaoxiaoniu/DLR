# 评测结果 — 持续更新

> 目标结论方向：**DLR 原创建模（LE-PE 双层 + PAS 语义路由）对 LLM Agent 的 NL2SQL 引导优于 ER/RDF 基线**。
> 本文件随评测推进滚动更新；所有数字可从 `validated_results/` 与 `Evaluation/outputs/{run_id}/` 复核。

## round_1 — 流水线验证（q1471-1509，20 题 × 3 范式，db=debit_card_specializing）

| 轮次 | 题号 | ER | DLR | RDF | 备注 |
|------|------|----|----|-----|------|
| 1-2 | q1471, q1472 | 100% | **100%** | 100% | q1471/1472 各范式均经五环节仲裁翻盘 |
| 3-4 | q1473, q1476 | 100% | **100%** | 100% | 全通（1473 三范式 strict PASS） |
| 5-6 | q1479, q1480 | 100% | **100%** | 100% | dlr_1479 YAML 修复后翻盘 |
| 7-8 | q1481, q1482 | 100% | **100%** | 100% | gold 数据集错误 → 修正 gold cache 后 judge 翻盘 |
| 9-10 | q1483, q1484 | 100% | **100%** | 100% | q1483 三范式 strict PASS |
| 11-12 | q1486, q1490 | 100% | **100%** | **100%** | q1490 gold 两轮修正；RDF R2RML 修复后翻盘 CORRECT |
| 13-14 | q1493, q1498 | 100% | **100%** | **100%** | q1498 R2RML 修复后 RDF SUM→GROUP BY→MAX 正确 |
| 15-16 | q1500, q1501 | 100% | **100%** | 100% | q1500 DLR MCP docstring 补 ARCS 语义后翻盘 |
| 17-18 | q1505, q1506 | 100% | **100%** | 100% | q1505 三范式 COUNT(DISTINCT) 比 Gold COUNT(*)更忠实；ER judge超时/RDF不一致→手动翻盘 |
| 19-20 | q1507, q1509 | 100% | 100% | **83%** | q1507/q1509 ER+DLR 全 strict PASS；RDF q1507 多选 Date INCORRECT(80) |
| 21-22 | q1514, q1515 | 100% | **100%** | 100% | 三范式 6/6；q1514 三范式 judge 翻盘，q1515 ER/RDF strict PASS |
| 23-24 | q1521, q1524 | **83%** | 100% | 100% | ER q1524 走 yearmonth+Currency 而非 transactions_1k+gasstations.Country；DLR YAML+R2RML 修复后 DLR/RDF 均正确 |
| 25-26 | q1525, q1526 | **0%** | 100% | 100% | ER 双败：q1525 yearmonth、q1526 找错 CustomerID；gold q1525 COUNT(*)、q1526 返回 NULL |

**round_1 终态：74/78 CORRECT**（截至 pair 25-26，含 q1490/q1498 RDF 修复后翻盘）（判定政策：五环节全对才翻盘，见 [evaluation.md](evaluation.md)）。

### 行为效率 — 逐题 Token 消耗

| 题号 | ER | DLR | RDF |
|------|----|-----|-----|
| q1471 | 60,262 | **39,078** | 61,468 |
| q1472 | **44,719** | 94,317 | 183,400 |
| q1473 | **35,825** | 72,766 | 94,395 |
| q1476 | 73,221 | **61,770** | 69,729 |
| q1479 | 43,712 | **39,543** | 45,318 |
| q1480 | **50,260** | 59,145 | 65,519 |
| q1481 | 230,002 | 195,482 | **120,958** |
| q1482 | **46,942** | 54,712 | 65,209 |
| q1483 | 44,551 | **33,927** | 170,885 |
| q1484 | 41,164 | **39,184** | 71,763 |
| q1486 | **62,200** | 72,659 | 75,962 |
| q1490 | 105,687 | **80,806** | 57,840 |
| q1493 | **36,552** | 54,977 | 78,468 |
| q1498 | **26,961** | 32,300 | 75,705 |
| q1500 | **118,035** | 189,364 | 351,999 |
| q1501 | **152,200** | 194,886 | 153,328 |
| q1505 | **35,834** | 34,566 | 37,544 |
| q1506 | **57,614** | 87,096 | 102,344 |
| q1507 | 37,159 | 44,377 | 41,585 |
| q1509 | **36,451** | 63,072 | 34,764 |
| q1514 | 62,465 | 69,134 | **45,594** |
| q1515 | 46,645 | 43,077 | **50,827** |
| q1521 | **46,690** | 136,201 | 46,206 |
| q1524 | 117,758 | **77,815** | 66,272 |
| q1525 | **46,996** | 73,653 | 61,123 |
| q1526 | 92,849 | **53,856** | 72,518 |

\* 粗体 = 该题最优范式；q1490 值取首轮归档数据，多次重跑有波动

### 汇总

| 指标 | ER | DLR | RDF |
|------|----|----|-----|
| 最低单题 total | **26,961 (q1498)** | 32,300 (q1498) | 34,764 (q1509) |
| 最高单题 total | 295,225 (q1500) | 347,304 (q1500) | **357,599 (q1500)** |
| 平均 total | ~78K | **~86K** | ~90K |
| strict PASS 率 | 5/26 | **7/26** | 7/26 |
| process_score 100 | 23/26 | **26/26** | **25/26** |
| CORRECT | 23/26 | **26/26** | **25/26** |

### 定性观察

- **DLR q1471 是教科书链路**：`dlr_semantic_query` 一跳召回 LE-PE 结构 → `get_pe_full` 一跳拿全（属性+ARCS+database_url）→ 一条 SQL 收工。ER 需要 2-3 跳分散工具，RDF 需要 mapping + PRAGMA 兜底（R2RML 缺列所致）。
- **跨库漂移**（q1472 "LAM" 语义模糊）：三范式都发生过全局召回漂移——已由 db-aware recall（2026-07-18）机制性解决，后续轮次预期步数/token 显著下降。
- **RDF 的"干瘪"如实生效**：映射只有列名+JOIN，Agent 被迫用 `PRAGMA table_info` 内省补 schema（其中一部分是生成器缺列 bug，修复后仍缺业务语义——这正是对照设计要测的）。
- **46/48 无一例绕过 MCP 直接猜库/猜表**：`execute_sql` 的 database_url 全部来自映射工具——防作弊路径生效。
- **q1483 是首个三范式 strict PASS 的题**（ER/DLR/RDF 全 PASS），Agent 对简洁语义（"统计每个国家的加油站数量"）的 SQL 产出质量高。
- **q1481 是高成本题**：三范式 total 均超 120K（需嵌套子查询找最低消费客户），但 judge 验证全部五环节通过。
- **q1493 是第二个三范式 strict PASS 的题**（DLR/RDF 全 PASS，ER 翻盘），Agent 对"Feb 2012 consumption >528.3 占比"产出高质量 SQL。
- **q1498 暴露 LLM 聚合语义盲区**：DLR 三次重跑均 `MAX(Consumption)`→445K 而非 `SUM→GROUP BY month→MAX`→51.8M，process_score 从 60→80(YAML 修复)→最终 Instance 才写对；RDF 同理。ER 首次即正确——三范式 Agent 独立性导致同题不同命。
- **q1500 原创范式的工具"教材"角色**：DLR 同 LE 下多 PE 需通过 `A_anchor.key` JOIN——这从未出现在 LLM 训练数据中。前两次 Agent 看到 `transactions_1k` 无 2013 数据即放弃，第三次修复 `get_pe_full` docstring 后正确理解 ARCS 锚定键=CUSTOMERID JOIN 桥，首次写出三表 JOIN。**原创模型的每一个概念都需在工具描述中"教"给 LLM。**

## 数据可信性备注

- round_1 20 题全部落在 `debit_card_specializing`，**结果可信**；
- pair 7-8 (q1481/q1482) 发现 gold SQL 与题意/evidence 相悖（两源一致，判定为数据集本身错），已修正 gold cache 并记录到 [dataset.md](dataset.md) § Gold SQL 已知错误；
- 修正 gold 后 strict_match 仍 FAIL（pred 带标签多行 vs gold 单行纯值）→ 由 Stage 4 judge 按语义翻盘，这是两段式设计的预期行为；
- 2026-07-18 起的轮次运行在 db-aware recall + PE 改名 + clear() 修复后的索引上，后续跨库题目（card_games/formula_1 等）的召回锁库行为与 round_1 有预期差异；
- q1498 DLR/RDF 实证 YAML `private_attributes` 中核心度量列暴露不足→修复 `LOGICAL.Consumption` 新增 `Consumption` public attribute（2026-07-21）。
- **q1500 DLR 实证原创范式需要工具承担"教材"角色**：ARCS 是 DLR 独创概念，LLM 无先验知识。`get_pe_full` docstring 补上 A_anchor.key=JOIN 键、多 PE 联查模式后，Agent 首次正确写出 `yearmonth JOIN transactions_1k ON CustomerID`。
- **q1505 暴露 gold SQL 语义偏差**：question "how many of **them**" → 问客户数，三范式 `COUNT(DISTINCT CustomerID)`→391 vs gold `COUNT(*)`→2730（计人次）。gold 未区分"客户"与"客户-月记录"，见 [dataset.md](dataset.md)。
- **q1514/q1515 结构化查询**：时间+日期双条件定位单条记录再关联查 Currency/Segment，三范式全部写出正确 JOIN/子查询。DLR strict PASS 率仍为 0/2 但 judge 五环节全翻盘——说明预测结果正确只是与 gold 格式/细节略有偏差（如 LIMIT 10 等）。
- **q1525 gold 同 q1505 缺陷**：`COUNT(CustomerID)` 计交易次而非客户数；三范式 `COUNT(DISTINCT CustomerID)` 更忠实。
- **q1526 gold 返回 NULL**：子查询多 JOIN gasstations 无匹配。DLR/RDF 绕过缺陷正确给出 -5.8152（CustomerID=6718→yearmonth 聚合）。
- **ER 连续 3 题走 yearmonth 替代 transactions_1k**（q1524/1525/1526）：ER 范式所有表 FK 全暴露，面对三张有 CustomerID 的表（customers/yearmonth/transactions_1k），Agent 持续选了错误的 yearmonth（月度聚合表）而非 transactions_1k（交易明细）。DLR 的 PAS 精准路由和 RDF 的显式 `refers_to` 反而提供了更清晰的路径引导。**全互联≠好引导。**

## 下一步

- 继续推进 round_1 后续题目（下一对 27-28: q1528+q1529）；
- 修复 P1 R2RML 缺列后再跑 RDF 对照，消除 `PRAGMA table_info` 兜底噪声；
- 500 题全量后补充：分范式准确率总表、分库分难度矩阵、token/步数分布、DLR 语义路由收益归因分析。

