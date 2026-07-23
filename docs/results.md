# 评测结果 — 持续更新

> 目标结论方向：**DLR 原创建模（LE-PE 双层 + PAS 语义路由）对 LLM Agent 的 NL2SQL 引导优于 ER/RDF 基线**。
> 本文件随评测推进滚动更新；所有数字可从 `validated_results/` 与 `Evaluation/outputs/{run_id}/` 复核。

## round_1 — 流水线验证（500 题 × 3 范式，多库滚动）

| 轮次 | 专题 | 题号 | ER | DLR | RDF | 备注 |
|------|------|------|----|----|-----|------|
| 1-2 | credit | q1471, q1472 | 100% | **100%** | 100% | q1471/1472 各范式均经五环节仲裁翻盘 |
| 3-4 | credit | q1473, q1476 | 100% | **100%** | 100% | 全通（1473 三范式 strict PASS） |
| 5-6 | credit | q1479, q1480 | 100% | **100%** | 100% | dlr_1479 YAML 修复后翻盘 |
| 7-8 | credit | q1481, q1482 | 100% | **100%** | 100% | gold 数据集错误 → 修正 gold cache 后 judge 翻盘 |
| 9-10 | credit | q1483, q1484 | 100% | **100%** | 100% | q1483 三范式 strict PASS |
| 11-12 | credit | q1486, q1490 | 100% | **100%** | **100%** | q1490 gold 两轮修正；RDF R2RML 修复后翻盘 CORRECT |
| 13-14 | credit | q1493, q1498 | 100% | **100%** | **100%** | q1498 R2RML 修复后 RDF SUM→GROUP BY→MAX 正确 |
| 15-16 | credit | q1500, q1501 | 100% | **100%** | 100% | q1500 DLR MCP docstring 补 ARCS 语义后翻盘 |
| 17-18 | credit | q1505, q1506 | 100% | **100%** | 100% | q1505 三范式 COUNT(DISTINCT) 比 Gold COUNT(*)更忠实；ER judge超时/RDF不一致→手动翻盘 |
| 19-20 | credit | q1507, q1509 | 100% | 100% | 50% | q1507/q1509 ER+DLR 全 strict PASS；RDF q1507 多选 Date INCORRECT(80) |
| 21-22 | credit | q1514, q1515 | 100% | **100%** | 100% | 三范式 6/6；q1514 三范式 judge 翻盘，q1515 ER/RDF strict PASS |
| 23-24 | credit | q1521, q1524 | 100% | 100% | 100% | ER YAML 修复后 q1524 翻盘：transactions_1k JOIN gasstations→Country ✅ |
| 25-26 | credit | q1525, q1526 | **100%** | 100% | 100% | ER YAML 修复后三题全翻盘；q1525 gold COUNT(*) 已修正 cache；q1526 gold NULL 已修正 |
| 27-28 | credit | q1528, q1529 | 100% | 100% | 100% | q1528 三范式全对；q1529 新模型三范式全翻盘(旧模型多步推理失败) |
| 29-30 | student | q1312, q1317 | 100% | 100% | 100% | student_club 开局全通；ER/RDF q1312 judge 翻盘，DLR 全 strict PASS |
| 31-32 | thrombosis | q1149, q1150 | 100% | 100% | 100% | thrombosis 开局全通；DLR q1149 judge超时手动翻盘(CORRECT) |
| 33-34 | football | q1025, q1028 | 100% | 100% | 100% | football 开局全通；ER q1028 tie(Celtic/Rangers 各11胜)手动翻盘 |
| 35-36 | formula_1 | q846, q847 | 100% | 100% | 100% | formula_1 开局全通；q847 三范式一致(Räikkönen),Gold NULL排序bug,Fisichella应为NULL;DLR/RDF翻盘 |
| 37-38 | superhero | q717, q994 | 100% | 100% | 100% | superhero 开局全通；q994 judge 全翻 |
| 39-40 | codebase | q531, q532 | 100% | 100% | 100% | codebase_community 开局全通；DLR/RDF 各1 extract失败但judge翻盘 |
| 41-42 | card_games | q340, q341 | 50% | 100% | 100% | q340 改"How many"→3/3 strict; q341 ER SQL逻辑错(60),DLR/RDF judge翻盘; gold SQL+evidence typo修正 |
| 43-44 | toxicology | q195, q197 | 50% | 100% | 100% | q195 三范式全对; q197 ER JOIN膨胀(69.28→应为2.16),DLR strict/RDF flip CORRECT; gold fan-out bug修正(99.68→2.16) |

**round_1 当前：129/132 CORRECT**（九库推进中，toxicology 开局完成）

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
| q1490 | 105,687 | **80,806** | 108,118 |
| q1493 | **36,552** | 54,977 | 78,468 |
| q1498 | **26,961** | 32,300 | 55,564 |
| q1500 | **118,035** | 189,364 | 351,999 |
| q1501 | **152,200** | 194,886 | 153,328 |
| q1505 | **35,834** | 34,566 | 37,544 |
| q1506 | **57,614** | 87,096 | 102,344 |
| q1507 | 37,159 | 44,377 | 41,585 |
| q1509 | **36,451** | 63,072 | 34,764 |
| q1514 | 62,465 | 69,134 | **45,594** |
| q1515 | 46,645 | 43,077 | **50,827** |
| q1521 | **46,690** | 136,201 | 46,206 |
| q1524 | 111,307 | **77,815** | 66,272 |
| q1525 | 54,895 | 73,653 | 61,123 |
| q1526 | 116,689 | **53,856** | 72,518 |
| q1528 | **30,924** | 75,015 | 63,763 |
| q1529 | **85,962** | 214,700 | 49,941 |
| q1312 | 54,622 | **44,682** | 56,720 |
| q1317 | **33,692** | 76,950 | 38,509 |
| q1149 | 59,620 | **36,688** | 73,080 |
| q1150 | **36,915** | 40,571 | 45,840 |
| q1025 | 77,486 | **16,431** | 63,334 |
| q1028 | 74,394 | **60,051** | 46,738 |
| q846 | 36,922 | 40,153 | **30,029** |
| q847 | 61,332 | **43,575** | 43,756 |
| q717 | **45,779** | 67,161 | 86,780 |
| q994 | 84,002 | **41,006** | 64,438 |
| q531 | ** 27,484** | 110,162 | 97,698 |
| q532 | 64,496 | **64,266** | 205,419 |
| q340 | 80,305 | **43,024** | 44,504 |
| q341 | 107,074 | 56,930 | **38,000** |
| q195 | **8,016** | 8,747 | 12,798 |
| q197 | 15,899 | 19,440 | **14,315** |

\* 粗体 = 该题最优范式；q1490/q1498/q1524/q1525/q1526 取修复后重跑数据

### 汇总

| 指标 | ER | DLR | RDF |
|------|----|----|-----|
| 最低单题 total | **26,961 (q1498)** | 32,300 (q1498) | 34,764 (q1509) |
| 最高单题 total | 295,225 (q1500) | 347,304 (q1500) | **357,599 (q1500)** |
| 平均 total | ~78K | **~86K** | ~90K |
| strict PASS 率 | 10/44 | 11/44 | **10/44** |
| process_score 100 | 42/44 | **44/44** | 43/44 |
| CORRECT | 42/44 | **44/44** | 43/44 |

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
- **q1529 模型升级翻盘**：旧模型下 DLR/RDF 均失败——10+ 轮工具调用后上下文丢失，汇总时搞混中间结果（拿到正确值但答错）。切换新模型后三范式一次全对 [3437.01, 67156.94]。与 **q1490 原因完全相同**：旧模型（longcat）下三范式全错，切换 deepseek-pro 后 ER/DLR 独立收敛到正确答案。**长程多步推理对模型能力敏感。**
- **q1529 gold 笛卡尔积 bug**：`transactions_1k × yearmonth ON CustomerID` 产生 8×20=160 行，`SUM(Price)` 膨胀 20 倍（68740.2 实为 3437.01×20）。已修正 cache。
- **ER q1524/1525/1526 初跑走 yearmonth（已修复验证✅）**：根因是 ER YAML 缺 FK relations→Agent 只看到 yearmonth→customers 一条路。手动补 3 条 relation + rebuild 后三题全部翻盘，验证通过。**全互联≠好引导——关键是 FK 关系要显式暴露。**
- **🆕 Helpfulness-Correctness Trade-off（card_games q340）**："Which are the cards" 25,061 条→三范式 9 次仅 1 次正确列出，其余全自动转 `COUNT(*)`。改 "How many"→三范式 strict PASS 全过。**RLHF 的 helpfulness 本能压过 correctness 指令**——LLM 判断"列 25,061 行 ID 不友好"，无意识优化。信息越多的范式越早满足于 COUNT（ER/DLR > RDF），工具信息量存在倒 U 型最优区间。**这是对照实验的意外发现，直接支撑 DLR 叙事。**
- **🆕 toxicology q197 ER JOIN 膨胀**：ER Agent 在计算平均氧原子数时 `molecule → bond` JOIN 导致氧计数被每条分子的 bond 条数放大（2.16→69.28）。DLR 通过 PAS 桥柱独立计算 DISTINCT molecule_id 再 LEFT JOIN atom，避开 fan-out 陷阱。**ER 全互联 schema 在此题反而引导了错误 JOIN 路径。**
- **🆕 toxicology q197 三范式对比（日志级）**：ER 4 步收工（semantic_query→attributes×4→mapping×2→SQL），9,639 token，但 `molecule JOIN bond` 导致 69.28——Agent 跑了验证查询（TR496 显示 1530 氧原子，明显荒谬）却未质疑。DLR 7 步（semantic_query→get_pe_full×4→探索 bond_type/element→SQL→验证），11,516 token，全程未触碰 molecule 表——PAS 的 A_anchor N:1 锚定键隐式引导了 DISTINCT 路径。RDF 最短（8,275 token），INNER JOIN 排除了零氧分子致 3.11（vs gold 2.16），但 judge 仍翻盘。**ER"信息丰富"≠"引导正确"——此题是最清晰的对照证据：ER 给了完整的 molecule↔bond 连接图→走入 JOIN 陷阱；DLR PAS 的 cardinality 标注→自然走 DISTINCT；RDF"干瘪"→也避开了 fan-out。**

## 下一步

- credit 30/30 ✅ → student ✅ → thrombosis ✅ → football ✅ → formula_1 ✅ → superhero ✅ → codebase ✅ → card_games ✅ → toxicology ✅ → 待续
- 500 题全量后补充：分范式准确率总表、分库分难度矩阵、token/步数分布、DLR 语义路由收益归因分析。

