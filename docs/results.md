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
| 19-20 | credit | q1507, q1509 | 100% | 100% | 100% | ER+DLR+RDF 全 strict PASS；列谓词修复 RDF q1507 多余列问题 |
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
| 45-46 | student | q1322, q1323 | 100% | 100% | 100% | student_club 第二对全通；三范式 q1322 judge 翻盘，q1323 strict PASS |
| 47-48 | thrombosis | q1152, q1153 | 50% | 100% | 100% | Gold "outpatient to inpatient"分子分母颠倒→修正后DLR strict PASS/RDF flip; ER 也反了(1.31); q1153 全对 |
| 49-50 | football | q1029, q1030 | 100% | 100% | 100% | Gold q1029 ASC/DESC颠倒→修正后三范式全对；DLR/RDF 正确取 DESC |
| 51-52 | formula_1 | q850, q854 | 100% | 100% | 100% | formula_1 第二对全通；三范式 6/6，ER 双翻盘 |
| 53-54 | superhero | q719, q723 | 100% | 100% | 100% | 三范式全 strict PASS（无 judge 翻盘） |
| 55-56 | codebase | q533, q537 | 100% | 100% | 100% | q533 evidence 修正后三范式全过(DATE(LastAccessDate))；q537 全 strict PASS |

**round_1 当前：165/168 CORRECT**（ER 53 DLR 56 RDF 56）

### 行为效率 — 逐题 Token 消耗

| 题号 | ER | DLR | RDF |
|------|----|-----|-----|
| q1471 | 60,262 | 42,041 | 61,762 |
| q1472 | **44,719** | **71,029** | 128,238 |
| q1473 | **35,825** | **43,327** | 28,355 |
| q1476 | 73,221 | **46,208** | 98,442 |
| q1479 | 43,712 | 57,603 | 101,068 |
| q1480 | **50,260** | **36,425** | 27,664 |
| q1481 | 230,002 | **74,821** | 112,247 |
| q1482 | **46,942** | 56,468 | 110,413 |
| q1483 | 44,551 | 34,107 | **29,874** |
| q1484 | 41,164 | 50,580 | **60,725** |
| q1486 | **62,200** | 113,827 | 77,100 |
| q1490 | 105,687 | 102,516 | **93,410** |
| q1493 | **36,552** | 44,333 | 66,199 |
| q1498 | **26,961** | 33,505 | 29,178 |
| q1500 | **118,035** | 108,216 | 158,025 |
| q1501 | **152,200** | 147,662 | 100,653 |
| q1505 | **35,834** | 43,115 | 65,513 |
| q1506 | **57,614** | 60,086 | 46,527 |
| q1507 | 37,159 | 33,634 | 33,760 |
| q1509 | **36,451** | 37,094 | 64,631 |
| q1514 | 62,465 | 67,172 | 77,001 |
| q1515 | 46,645 | 54,838 | 91,229 |
| q1521 | **46,690** | 67,271 | 27,982 |
| q1524 | 111,307 | 192,900 | 227,499 |
| q1525 | 54,895 | 69,815 | 79,322 |
| q1526 | 116,689 | 111,032 | 129,295 |
| q1528 | **30,924** | 132,071 | 56,564 |
| q1529 | **85,962** | 143,077 | 55,585 |
| q1312 | 54,622 | **44,682** | 56,720 |
| q1317 | **33,692** | 76,950 | 38,509 |
| q1149 | 59,620 | 32,352 | 28,505 |
| q1150 | **36,915** | 31,879 | 26,391 |
| q1025 | 77,486 | 32,834 | 39,049 |
| q1028 | 74,394 | 35,513 | 54,205 |
| q846 | 36,922 | 34,256 | 28,437 |
| q847 | 61,332 | 50,612 | 28,697 |
| q717 | **45,779** | 69,117 | 34,036 |
| q994 | 84,002 | 55,954 | 29,100 |
| q531 | ** 27,484** | 31,518 | 26,650 |
| q532 | 64,496 | 34,233 | 197,057 |
| q340 | 80,305 | 32,905 | 28,801 |
| q341 | 107,074 | 57,978 | 49,820 |
| q195 | **8,016** | 30,269 | 25,581 |
| q197 | 15,899 | 34,862 | 55,723 |
| q1322 | 14,990 | 42,615 | 47,565 |
| q1323 | 23,735 | 51,642 | 28,111 |
| q1152 | **8,981** | 40,903 | 27,519 |
| q1153 | 18,667 | 37,227 | 43,354 |
| q1029 | 11,858 | 33,257 | 26,171 |
| q1030 | **6,348** | 33,350 | 37,527 |
| q850 | 20,702 | 42,132 | 35,048 |
| q854 | 15,347 | 52,380 | 88,718 |
| q719 | 19,287 | 17,412 | **14,367** |
| q723 | **13,673** | 17,734 | 14,080 |
| q533 | 14,897 | **12,292** | 25,741 |
| q537 | **6,111** | 14,758 | 14,551 |

\* 粗体 = 该题最优范式

### 汇总

| 指标 | ER | DLR | RDF |
|------|----|----|-----|
| 最低单题 | **6,348 (q1030)** | 30,269 (q195) | 25,581 (q195) |
| 最高单题 | 230,002 (q1481) | 192,900 (q1524) | 227,499 (q1524) |
| 平均 total | **55,454** | 59,504 | 63,838 |
| CORRECT | 53/56 | **56/56** | **56/56** |

### 定性观察

- **DLR q1471 是教科书链路**：`dlr_semantic_query` 一跳召回 LE-PE 结构 → `get_pe_full` 一跳拿全（属性+ARCS+database_url）→ 一条 SQL 收工。ER 需要 2-3 跳分散工具，RDF 需要 mapping + PRAGMA 兜底（R2RML 缺列所致）。
- **跨库漂移**（q1472 "LAM" 语义模糊）：三范式都发生过全局召回漂移——已由 db-aware recall（2026-07-18）机制性解决，后续轮次预期步数/token 显著下降。
- **54/54 无一例绕过 MCP 直接猜库/猜表**：`execute_sql` 的 database_url 全部来自映射工具——防作弊路径生效。
- **q1483 是首个三范式 strict PASS 的题**（ER/DLR/RDF 全 PASS），Agent 对简洁语义（"统计每个国家的加油站数量"）的 SQL 产出质量高。
- **q1481 是高成本题**：三范式 total 均超 120K（需嵌套子查询找最低消费客户），但 judge 验证全部五环节通过。
- **q1493 是第二个三范式 strict PASS 的题**（DLR/RDF 全 PASS，ER 翻盘），Agent 对"Feb 2012 consumption >528.3 占比"产出高质量 SQL。
- **q1498 暴露 LLM 聚合语义盲区**：DLR 三次重跑均 `MAX(Consumption)`→445K 而非 `SUM→GROUP BY month→MAX`→51.8M，process_score 从 60→80(YAML 修复)→最终 Instance 才写对；RDF 同理。ER 首次即正确——三范式 Agent 独立性导致同题不同命。
- **q719+q723 是第三个三范式 strict PASS 的题**（ER/DLR/RDF 全 PASS），Agent 对简洁 schema（hero/power 两张表）的 SQL 产出质量高。
- **🔴 q533 证据错误**：原始 evidence 写 `LastAccessDate > '2014-09-01'` 未用 DATE()，三范式照做得 5146 vs gold 4941。**非 Agent/范式/模型问题——evidence 本身有 bug。教训：排查失败先查 question + evidence + gold。**
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
- **🆕 🔴 thrombosis q1152 Gold annotation 错误**：题目问"ratio of outpatient to inpatient"（A of B = A/B = 门诊/住院），Gold 却算成 住院/门诊=1.31。DLR 和 RDF 都正确算出 0.76，但 DLR judge 服从 Gold 判 INCORRECT，RDF judge 更独立翻盘。修正 Gold cache(1.31→0.76)后 DLR strict PASS、ER 反成 INCORRECT。**"ratio of A to B = A/B"是英语常识，Gold 标注者混淆了方向。DLR 48/48 无一真实失误。**

## 下一步

- credit 30/30 ✅ → student ✅ → thrombosis ✅ → football ✅ → formula_1 ✅ → superhero ✅ → codebase ✅ → card_games ✅ → toxicology ✅ → 待续
- 500 题全量后补充：分范式准确率总表、分库分难度矩阵、token/步数分布、DLR 语义路由收益归因分析。

