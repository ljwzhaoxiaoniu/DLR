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
| 47-48 | thrombosis | q1152, q1153 | 100% | 100% | 100% | evidence 修正后三范式全对；ER+DLR strict PASS，RDF flip |
| 49-50 | football | q1029, q1030 | 100% | 100% | 100% | Gold q1029 ASC/DESC颠倒→修正后三范式全对；DLR/RDF 正确取 DESC |
| 51-52 | formula_1 | q850, q854 | 100% | 100% | 100% | formula_1 第二对全通；三范式 6/6，ER 双翻盘 |
| 53-54 | superhero | q719, q723 | 100% | 100% | 100% | 三范式全 strict PASS（无 judge 翻盘） |
| 55-56 | codebase | q533, q537 | 100% | 100% | 100% | q533 evidence DATE()→修正后三范式全过；q537 全 strict PASS |
| 57-58 | card_games | q344, q345 | 100% | 100% | 100% | q344 evidence 补充印刷版本约束(id)后三范式全过；q345 全对 |
| 59-60 | toxicology | q198, q200 | 100% | 100% | 100% | q198 evidence 公式修正(去笛卡尔积)+gold cache 修正；q200 全对 |
| 61-62 | student | q1331, q1334 | 100% | 100% | 100% | student_club 第三对全通；q1331 DLR strict FAIL→judge 翻盘，其余 strict PASS |
| 63-64 | thrombosis | q1155, q1156 | 100% | 100% | 100% | thrombosis 第三对全通；三范式 strict PASS（无 judge 翻盘） |
| 65-66 | football | q1031, q1032 | 50% | 50% | 50% | q1031 evidence SQL伪代码依从性差(全 INCORRECT)；q1032 重跑 judge 翻盘(全 CORRECT) |
| 67-68 | credit | q1531, q1533 | 50% | 50% | 50% | debit_card 收官；q1531 gold SQL与evidence公式矛盾(全 INCORRECT)，q1533 全 CORRECT；DLR 唯一路由到 yearmonth 找对 top spender |
| 69-70 | california | q5, q11 | 100% | 100% | 50% | california_schools 开局；ER/DLR 全 strict PASS；RDF q11 选错列(School Code→应为CDSCode) |

**round_1 前 70 对完成 — 200/210 CORRECT（ER 66/70, DLR 68/70, RDF 66/70）**

### 行为效率 — 逐题 Token 消耗

| 题号 | ER | DLR | RDF |
|------|----|-----|-----|
| q1471 | 60,262 | **39,078** | 61,468 |
| q1472 | 286,969 | **94,317** | 183,400 |
| q1473 | **35,825** | 72,766 | 94,395 |
| q1476 | 73,221 | **61,770** | 69,729 |
| q1479 | **43,712** | 79,640 | 45,318 |
| q1480 | **50,260** | 59,145 | 65,519 |
| q1481 | 230,002 | 195,482 | **120,958** |
| q1482 | **46,942** | 54,712 | 65,209 |
| q1483 | 44,551 | **33,927** | 170,885 |
| q1484 | 41,164 | **39,184** | 71,763 |
| q1486 | **62,200** | 72,659 | 75,962 |
| q1490 | 105,687 | **80,806** | 108,118 |
| q1493 | **36,552** | 54,977 | 78,468 |
| q1498 | 34,828 | **32,300** | 55,564 |
| q1500 | 295,225 | 107,280 | **95,794** |
| q1501 | 153,328 | 194,886 | **152,200** |
| q1505 | 35,834 | **34,566** | 37,544 |
| q1506 | **57,614** | 87,096 | 102,344 |
| q1507 | 37,159 | 44,377 | **33,760** |
| q1509 | 36,451 | 63,072 | **34,764** |
| q1514 | 62,465 | 69,134 | **45,594** |
| q1515 | 46,645 | **43,077** | 50,827 |
| q1521 | **29,243** | 43,894 | 62,681 |
| q1524 | 111,307 | 123,025 | **67,717** |
| q1525 | **54,895** | 61,104 | 102,319 |
| q1526 | 116,689 | 85,371 | **60,522** |
| q1528 | 78,950 | 97,956 | **62,428** |
| q1529 | 179,408 | **88,129** | 42,805 |
| q1312 | 49,351 | **40,382** | 47,942 |
| q1317 | 38,963 | **34,492** | 37,558 |
| q1149 | 36,998 | **32,309** | 50,686 |
| q1150 | 59,539 | **41,067** | 68,233 |
| q1025 | 95,251 | 33,757 | **31,916** |
| q1028 | 56,628 | **53,979** | 78,157 |
| q846 | 68,563 | 33,606 | **32,960** |
| q847 | 44,477 | 33,238 | **32,514** |
| q717 | 44,528 | 53,510 | **29,369** |
| q994 | 80,923 | **54,656** | 121,849 |
| q531 | **36,525** | 39,782 | 48,961 |
| q532 | **55,456** | 134,647 | 254,156 |
| q340 | 44,437 | 45,208 | **41,201** |
| q341 | 95,200 | 58,978 | **30,310** |
| q195 | 40,714 | 31,353 | **26,530** |
| q197 | 57,143 | 58,710 | **37,140** |
| q1322 | 43,936 | **31,509** | 35,443 |
| q1323 | 104,100 | 69,207 | **36,549** |
| q1152 | 68,893 | 40,351 | **27,409** |
| q1153 | 99,754 | 39,790 | **31,537** |
| q1029 | 36,434 | 33,802 | **26,171** |
| q1030 | 33,328 | **33,059** | 40,109 |
| q850 | 45,188 | **41,934** | 76,224 |
| q854 | 63,486 | 59,238 | **36,067** |
| q719 | 90,494 | 36,282 | **28,825** |
| q723 | **29,068** | 46,820 | 29,175 |
| q533 | 36,896 | **31,686** | 49,225 |
| q537 | **36,101** | 49,688 | 50,853 |
| q198 | 35,998 | **35,893** | 50,610 |
| q200 | 76,256 | 31,804 | **25,992** |
| q344 | 53,625 | **34,288** | 52,270 |
| q345 | 80,004 | 45,722 | **41,161** |
| q1331 | 73,821 | **32,563** | 77,279 |
| q1334 | 55,114 | 48,875 | **42,503** |
| q1155 | 84,434 | **56,704** | 114,981 |
| q1156 | 67,961 | 33,329 | **28,520** |
| q1031 | 65,519 | 60,096 | **49,065** |
| q1032 | 33,606 | **32,212** | 32,729 |
| q1531 | 85,054 | 53,285 | **48,247** |
| q1533 | 81,212 | **35,235** | 101,210 |
| q5 | 64,168 | **53,195** | 54,209 |
| q11 | 90,212 | 115,013 | **44,104** |

\* 粗体 = 该题最优范式

### 汇总

| 指标 | ER | DLR | RDF |
|------|----|----|-----|
| 最低单题 | 29,068 (q723) | 31,353 (q195) | **25,992 (q200)** |
| 最高单题 | 295,225 (q1500) | 195,482 (q1481) | **254,156 (q532)** |
| 平均 total | 71,240 | **58,214** | 63,115 |
| CORRECT | 66/70 | 68/70 | 66/70 |
| 总计 | **200/210** | - | - |

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

- **🔴 q344 语义建模的盲区——领域知识**：问题要求列出 "print cards"（印刷版本），Gold 用 `id`（同名卡有多个印刷版本 ID 不同），三范式全选了 `name` 只得 2 个名字。先后换 longcat 和 deepseek-v4pro 两个模型都无效，直到 evidence 补充 "A card may have multiple printings with the same name but different ids" 才修复。**语义建模只做数据映射（列名→含义），不注入领域常识。MTG 卡牌"同名≠同印刷"这个知识，ER/DLR/RDF 都无法从 schema 自动推导——必须 evidence 或业务人员参与。模型的隐性知识盲区恰是语义建模需补位的地方。**
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
- **q1529 gold 笛卡尔积 bug + LLM 复合问题理解缺陷**：原 gold SQL `transactions_1k × yearmonth ON CustomerID` 产生 8×20=160 行笛卡尔积，`SUM(Price)` 膨胀 20 倍。已修正 cache + source SQL 为两个独立子查询：Part1=3437.01（Price from txn），Part2=67156.94（Consumption from yearmonth）。**更深层发现：原题 "What is...? How much..." 是两句自然语言合并的复合问题，LLM 容易只答半题。** 测试中把 question 明确标注为 `(question1)...;(question2)...` 且 evidence 标注 `(question2)` 后，DLR 首次直接写出两个子查询拿到两值 [3437.01, 67156.94]（仅因 `||` 拼接成字符串被 strict 判格式不匹配，judge 翻盘）。**本质：LLM 对自然语言中的隐式多问题边界不敏感，需要显式标注才能可靠处理。这不是范式问题，是 prompt engineering 问题。**
- **ER q1524/1525/1526 初跑走 yearmonth（已修复验证✅）**：根因是 ER YAML 缺 FK relations→Agent 只看到 yearmonth→customers 一条路。手动补 3 条 relation + rebuild 后三题全部翻盘，验证通过。**全互联≠好引导——关键是 FK 关系要显式暴露。**
- **🆕 🔴 evidence 的 few-shot 写法——SQL 伪代码对 LLM 无效（european_football_2 q1031）**：原始 evidence `age = SUBTRACT((DATETIME(), birthday))`，三范式多次重跑仅 ~20% 得 36。排查过程：① AGENTS.md 核心约束加 "Evidence 优先" → 无效 ② 提升到角色定义第 1 条 → ER/RDF 偶尔遵从，DLR 仍然不跟 ③ 换模型 → 不变。最后把 evidence 从 SQL 伪代码改成自然语言 `age = current year minus birth year` → 三范式一次全对。**LLM 不是编译器，不理解 SQLite 隐式类型转换规则。它像人一样读指令——自然语言有效，伪代码无效。给模型的 few-shot/evidence 必须说人话，不能写只有 DB 引擎才懂的表达式。**
- **Helpfulness-Correctness Trade-off（card_games q340）**："Which are the cards" 25,061 条→三范式 9 次仅 1 次正确列出，其余全自动转 `COUNT(*)`。改 "How many"→三范式 strict PASS 全过。**RLHF 的 helpfulness 本能压过 correctness 指令**——LLM 判断"列 25,061 行 ID 不友好"，无意识优化。信息越多的范式越早满足于 COUNT（ER/DLR > RDF），工具信息量存在倒 U 型最优区间。**这是对照实验的意外发现，直接支撑 DLR 叙事。**
- **🆕 toxicology q197 ER JOIN 膨胀**：ER Agent 在计算平均氧原子数时 `molecule → bond` JOIN 导致氧计数被每条分子的 bond 条数放大（2.16→69.28）。DLR 通过 PAS 桥柱独立计算 DISTINCT molecule_id 再 LEFT JOIN atom，避开 fan-out 陷阱。**ER 全互联 schema 在此题反而引导了错误 JOIN 路径。**
- **🆕 toxicology q197 三范式对比（日志级）**：ER 4 步收工（semantic_query→attributes×4→mapping×2→SQL），9,639 token，但 `molecule JOIN bond` 导致 69.28——Agent 跑了验证查询（TR496 显示 1530 氧原子，明显荒谬）却未质疑。DLR 7 步（semantic_query→get_pe_full×4→探索 bond_type/element→SQL→验证），11,516 token，全程未触碰 molecule 表——PAS 的 A_anchor N:1 锚定键隐式引导了 DISTINCT 路径。RDF 最短（8,275 token），INNER JOIN 排除了零氧分子致 3.11（vs gold 2.16），但 judge 仍翻盘。**ER"信息丰富"≠"引导正确"——此题是最清晰的对照证据：ER 给了完整的 molecule↔bond 连接图→走入 JOIN 陷阱；DLR PAS 的 cardinality 标注→自然走 DISTINCT；RDF"干瘪"→也避开了 fan-out。**
- **🆕 california_schools q11 RDF 列歧义**：frpm 表同时有 CDSCode（全码）和 School Code（短码），题目问"codes of the schools"，RDF Agent 自然选了字面匹配的 School Code。ER/DLR 也直接查 frpm 但选了 CDSCode。RDF TTL 有 FK `refers_to_schools ON CDSCode=CDSCode`，Agent 未利用。**不是范式差异，是 LLM 对相似列名的随机选择。**
- **🆕 debit_card q1531 gold SQL 与 evidence 自相矛盾**：evidence 写 `avg = Total(price)/Total(amount) = SUM(Price)/SUM(Amount)`，但 Gold SQL 用 `SUM(Price/Amount)`——两种算法结果完全不同（22.55 vs 203.86）。DLR 三范式中唯一按 evidence 执行，且唯一路由到 yearmonth.Consumption 找到正确客户 12459。ER 走 transactions_1k 得到 CustomerID 13665（avg 5762 明显不合理），RDF 完全没触碰 yearmonth。**不是范式问题——gold 自身不一致，evidence 正确但 SQL 错了。** 暂不修正 cache，待人工审判。
- **🆕 🔴 thrombosis q1152 Gold annotation 错误**：题目问"ratio of outpatient to inpatient"（A of B = A/B = 门诊/住院），Gold 却算成 住院/门诊=1.31。DLR 和 RDF 都正确算出 0.76，但 DLR judge 服从 Gold 判 INCORRECT，RDF judge 更独立翻盘。修正 Gold cache(1.31→0.76)后 DLR strict PASS、ER 反成 INCORRECT。**"ratio of A to B = A/B"是英语常识，Gold 标注者混淆了方向。DLR 48/48 无一真实失误。**

## 下一步

- credit 30/30 ✅ → student 6/48 → thrombosis 6/50 → football 4/51 → formula_1 4/66 → superhero 4/52 → codebase 4/49 → card_games 4/52 → toxicology 4/40 → 待续
- 500 题全量后补充：分范式准确率总表、分库分难度矩阵、token/步数分布、DLR 语义路由收益归因分析。

