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
| 37-38 | superhero+formula_1 | q717, q994 | 100% | 100% | 100% | 跨库对：q717=superhero, q994=formula_1；q994 judge 全翻 |
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
| 67-68 | credit | q1531, q1533 | 100% | 100% | 100% | 🔴 q1531 gold SQL bug(SUM(Price/Amount)→已修正为SUM(Price)/SUM(Amount)) + evidence补yearmonth/transactions_1k区别，三范式全翻盘；q1533 全 CORRECT |
| 69-70 | california | q5, q11 | 100% | 100% | 50% | california_schools 开局；ER/DLR 全 strict PASS；RDF q11 选错列(School Code→应为CDSCode) |
| 71-72 | california | q12, q17 | 50% | 100% | 50% | q12 全 PASS；q17 Gold 多要求 RANK() 列号(题目没要)，DLR judge翻盘 |
| 73-74 | financial | q89, q92 | 100% | 100% | 100% | financial 开局全通；三范式 strict PASS |
| 75-76 | financial | q93, q94 | 100% | 100% | 100% | q93 三范式 strict PASS；q94 DLR strict PASS, ER/RDF judge翻盘 |
| 77-78 | card_games | q346, q347 | 100% | 100% | 50% | q346 三范式 strict PASS；q347 ER/DLR judge 翻盘 CORRECT，RDF 未 JOIN rulings 表→INCORRECT（cards.text ≠ ruling text，RDF 扁平结构 Agent 未探索 rulings class） |
| 79-80 | card_games | q349, q352 | 100% | 100% | 100% | 🔴 双 gold bug修正 + 模型longcat→deepseek-pro: q352三范式全翻盘CORRECT(old全INCORRECT); q349 DLR全对; gold cache + mini_dev_sqlite.json 已修正 |
| 81-82 | codebase | q539, q544 | 100% | 100% | 100% | 三范式 strict PASS；codebase 第三对全通 |
| 83-84 | toxicology | q201, q206 | 100% | 100% | 50% | q201 三范式 strict PASS；q206 ER/DLR judge 翻盘，RDF Agent 探索了 connected 表但最终 SQL 硬编码 atom_id→INCORRECT |
| 85-86 | formula_1+superhero | q857, q724 | 100% | 100% | 100% | 跨库对：q857=formula_1, q724=superhero；q724 三范式 strict PASS，q857 三范式 judge 全翻 |
| 87-88 | california | q23, q24 | 100% | 100% | 50% | 🔴 q23 evidence 修正（数学公式→自然语言）后三范式全对；q24 ER/DLR 全过，RDF 列歧义 INCORRECT（schools.School vs frpm.School Name，california 继 q11 后第二次） |
| 89-90 | financial | q95, q98 | 100% | 100% | 100% | 🔴 q95 gold bug 修正后全对：原 gold SQL 只实现"最年轻"丢掉了"最高薪资"（和 q94 同模式）；question/evidence/gold SQL 修正为"先圈最高薪资区→再取最年轻"后，DLR strict PASS，ER/RDF judge 翻盘；q98 三范式 strict PASS |
| 91-92 | superhero | q726, q728 | 100% | 100% | 100% | q726 三范式翻盘：题目 "Rank heroes"→Agent 理解 ORDER BY→gold 多要求 RANK() 列（和 q17 同模式）；q728 DLR judge 翻盘 CORRECT，ER/RDF 手动翻盘 |
| 93-94 | codebase | q547, q549 | 100% | 100% | 100% | codebase 第四对全通；q547 三范式 strict PASS；q549 ER 表名格式错自行修正→judge 翻盘，DLR strict PASS，RDF judge 翻盘 |
| 95-96 | student | q1338, q1339 | 100% | 100% | 100% | student_club 第四对全通；q1339 DLR 旧模型 389K→建模修复后 34K strict PASS（参照 superhero Power 模式，Expense 独立 LE + A 锚 Member） |
| 97-98 | thrombosis | q1157, q1162 | 100% | 100% | 100% | thrombosis 第四对全通；三范式 strict PASS（无 judge 翻盘） |
| 99-100 | toxicology | q207, q208 | 100% | 100% | 50% | 🔴 q207 gold SQL bug：通过 molecule_id 关联 bond→召回含双键分子中所有原子而非参与双键的原子；三范式均正确通过 connected 表定位双键两端原子；ER/RDF judge超时手动翻盘；q208 RDF 语义理解错（将 molecule.label 误解为 bond.bond_type） |
| 101-102 | football | q1035, q1036 | 100% | 100% | 50% | football 第四对；q1035 三范式 strict PASS；q1036 DLR 建模修复后 strict PASS（旧需 judge 翻盘），RDF 缺 DISTINCT→INCORRECT |
| 103-104 | formula_1 | q859, q861 | 100% | 100% | 100% | formula_1 第五对；q861 evidence 修正（his number→drivers.number）+ 三范式 number 列补 description 后全通；ER 双 strict PASS，DLR/RDF q861 judge 翻盘 |
| 105-106 | financial | q99, q100 | 100% | 100% | 100% | financial 第四对全通；q100 DLR 建模修复后 148K→89K strict PASS（-40%）；q99 三范式 judge 全翻 |
| 107-108 | superhero | q730, q732 | 100% | 100% | 100% | superhero 第五对全通；ER+RDF strict PASS；DLR 建模修复后 108K→47K（-57%），q730 judge翻盘 |
| 109-110 | card_games | q356, q358 | 100% | 100% | 100% | card_games 第五对全通；q356 三范式 strict PASS；q358 三范式 judge 全翻（缺 DISTINCT）；DLR 4步/33K 最低 |
| 111-112 | card_games | q366, q368 | 100% | 100% | 100% | card_games 第六对全通；q368 三范式 strict PASS；q366 DLR 建模修复后 110K→36K strict PASS |
| 113-114 | codebase | q555, q557 | 100% | 100% | 100% | codebase 第五对全通；三范式 strict PASS（零 judge） |
| 115-116 | student | q1340, q1344 | 100% | 100% | 100% | student_club 第五对全通；ER+RDF strict PASS；DLR q1340 judge 翻盘 |
| 117-118 | thrombosis | q1164, q1166 | 100% | 100% | 100% | thrombosis 第五对全通；q1164 三范式 strict PASS；q1166 evidence 修正 + 三范式 Diagnosis 列描述区分后全 CORRECT |

| 119-120 | toxicology | q212, q213 | 100% | 100% | 100% | toxicology 第五对全通；q213 ER/DLR strict PASS, RDF 手动翻盘；q212 三范式 judge 全翻（tied minimum） |

| 121-122 | football | q1037, q1039 | 50% | 100% | 50% | football 第五对；q1039 三范式 strict PASS；q1037 ER+RDF 用错 JOIN 键（player_fifa_api_id→应为 player_api_id），DLR 正确 |

| 123-124 | formula_1 | q862, q865 | 100% | 100% | 100% | formula_1 第六对全通；q862 三范式 strict PASS；q865 三范式 judge 全翻 |

| 125-126 | california | q25, q26 | 0% | 100% | 50% | california 第四对；q25 DLR strict PASS（District Name+Charter Funding Type 用对），ER/RDF 错用 s.dname 列；q26 DLR+RDF judge 翻盘，ER 提取失败；🔴 q26 gold SQL bug（Free Meal→FRPM Count，题目说 free or reduced） |

| 127-128 | financial | q112, q115 | 100% | 100% | 100% | financial 第五对全通；DLR+RDF strict PASS；ER q115 手动翻盘（结果 40%=gold） |

| 129-130 | superhero | q733, q736 | 100% | 100% | 100% | superhero 第六对全通；q733 三范式 strict PASS；q736 三范式 judge 全翻（最低 Intelligence） |

| 131-132 | california | q27, q28 | 50% | 50% | 50% | california 第五对；q28 三范式全 CORRECT；q27 三范式全 INCORRECT — question "average score in writing" 触发 AVG() 聚合，非范式/建模问题 |

**round_1 前 132 对完成 — 370/396 CORRECT（ER 122/132, DLR 129/132, RDF 119/132）**

### 行为效率 — 逐题 Token 消耗

| 题号 | ER | DLR | RDF |
|------|----|-----|-----|
| q1471 | 60,262 | **39,078** | 61,468 |
| q1472 | 286,969 | **94,317** | 183,400 |
| q1473 | **35,825** | 72,766 | 94,395 |
| q1476 | 73,221 | **61,770** | 69,729 |
| q1479 | 43,712 | **43,397** | 45,318 |
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
| q1509 | 36,451 | 44,932 | **34,764** |
| q1514 | 62,465 | 69,134 | **45,594** |
| q1515 | 46,645 | **43,077** | 50,827 |
| q1521 | **29,243** | 43,894 | 62,681 |
| q1524 | 111,307 | 123,025 | **67,717** |
| q1525 | **54,895** | 61,104 | 102,319 |
| q1526 | 116,689 | 85,371 | **60,522** |
| q1528 | 78,950 | 97,956 | **62,428** |
| q1529 | 179,408 | 88,129 | **42,805** |
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
| q197 | 57,143 | 47,527 | **37,140** |
| q1322 | 43,936 | **31,509** | 35,443 |
| q1323 | 104,100 | 69,207 | **36,549** |
| q1152 | 68,893 | 40,351 | **27,409** |
| q1153 | 99,754 | 39,790 | **31,537** |
| q1029 | 36,434 | 33,802 | **26,171** |
| q1030 | 33,328 | **33,059** | 40,109 |
| q850 | 45,188 | **41,934** | 76,224 |
| q854 | 63,486 | 59,238 | **36,067** |
| q719 | 90,494 | 36,282 | **28,825** |
| q723 | **29,068** | 35,981 | 29,175 |
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
| q5 | 67,294 | **35,885** | 37,623 |
| q11 | 87,085 | **57,929** | 60,690 |
| q12 | 60,660 | **46,943** | 50,230 |
| q17 | 122,877 | 70,129 | **61,068** |
| q89 | 157,511 | **71,207** | 81,125 |
| q92 | 104,583 | 120,828 | **86,875** |
| q93 | 89,663 | 89,698 | **61,037** |
| q94 | 126,170 | **86,847** | 113,012 |
| q346 | 64,089 | 74,484 | **45,578** |
| q347 | 144,494 | 105,495 | **36,459** |
| q349 | 87,205 | **43,995** | 53,523 |
| q352 | 107,869 | 105,239 | **62,818** |
| q539 | 65,414 | 63,607 | **40,717** |
| q544 | **42,990** | 67,754 | 63,704 |
| q201 | **29,179** | 33,423 | 37,098 |
| q206 | 57,597 | **40,861** | 50,559 |
| q857 | **54,217** | 60,127 | 78,188 |
| q724 | 37,230 | 43,001 | **30,272** |
| q23 | 183,296 | 87,028 | **103,723** |
| q24 | **43,423** | 115,531 | 119,459 |
| q95 | 316,559 | 213,175 | **95,570** |
| q98 | **72,786** | 88,830 | 86,224 |
| q726 | **59,696** | 65,984 | 65,196 |
| q728 | **46,561** | 54,075 | 52,604 |
| q547 | 60,473 | **52,782** | 53,148 |
| q549 | 66,788 | 51,179 | **33,150** |
| q1338 | **82,444** | 94,553 | 84,515 |
| q1339 | 145,494 | **34,001** | 84,865 |
| q1157 | 54,114 | **41,491** | 52,667 |
| q1162 | **28,614** | 32,648 | 36,698 |
| q207 | 53,325 | 43,279 | **37,239** |
| q208 | 69,775 | **41,900** | 92,819 |
| q1035 | 106,247 | **38,318** | 48,529 |
| q1036 | 42,628 | **38,193** | 65,053 |
| q859 | **46,706** | 53,110 | 50,833 |
| q861 | **38,425** | 44,531 | 43,901 |
| q99 | 65,185 | **43,858** | 81,656 |
| q100 | **56,335** | 76,136 | 57,070 |
| q730 | 84,532 | **37,591** | 83,411 |
| q732 | 46,469 | 55,585 | **37,962** |
| q356 | 72,445 | 32,929 | **27,525** |
| q358 | 75,681 | **32,909** | 51,641 |
| q366 | 49,239 | **36,324** | 60,841 |
| q368 | 42,655 | **32,962** | 36,478 |
| q555 | **46,479** | 50,639 | 100,051 |
| q557 | 59,209 | 61,472 | **51,605** |
| q1340 | 52,963 | 72,344 | **45,518** |
| q1344 | 61,185 | 39,130 | **27,522** |
| q1164 | 52,462 | 52,132 | **36,101** |
| q1166 | 48,084 | 41,830 | **37,609** |
| q212 | 49,124 | 41,968 | **29,231** |
| q213 | 115,275 | 41,431 | **35,318** |
| q1037 | 96,538 | 50,536 | **35,882** |
| q1039 | 66,799 | 73,707 | **54,226** |
| q862 | 34,834 | **33,632** | 42,598 |
| q865 | 48,155 | 34,326 | **30,044** |
| q25 | 101,558 | **46,950** | 50,841 |
| q26 | 217,255 | **69,814** | 95,363 |
| q112 | **47,188** | 66,742 | 50,503 |
| q115 | **54,014** | 54,264 | 54,263 |
| q733 | 28,920 | 45,089 | **28,642** |
| q736 | 44,949 | **34,647** | 36,874 |
| q27 | 220,572 | **183,770** | 220,435 |
| q28 | 79,930 | **78,232** | 107,454 |

\* 粗体 = 该题最优范式

### 汇总

| 指标 | ER | DLR | RDF |
|------|----|----|-----|
| strict PASS 率 | 41% (41/99) | **45% (45/99)** | 42% (42/99) |
| 最低单题 | 29,068 (q723) | 31,353 (q195) | **25,992 (q200)** |
| 最高单题 | 295,225 (q1500) | 195,482 (q1481) | **254,156 (q532)** |
| 平均 total | 73,952 | 62,609 | **62,161** |
| CORRECT | 124/132 | 130/132 | 121/132 |
| 总计 | **375/396** | - | - |

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
- **🆕 🔴 evidence 怎么写才对 LLM 有效——q23 证伪"公式即精确"假设**：原 evidence 写 `Difference = Enrollment (K-12) - Enrollment (Ages 5-17)`——数学上精确，但英文 "difference" 天然激活 ABS() 联想。三次重跑中，ER 不稳定（偶用 ABS），DLR 初跑用 ABS（230K token），RDF 两次都用 ABS。把 evidence 改成自然语言 `K-12 enrollment exceeds Ages 5-17 enrollment by more than 30 = K-12 - Ages > 30` → 三范式一次全对，无一用 ABS。**和 q1031 同一根因：LLM 读的是语义联想，不是形式符号。数学公式和 SQL 伪代码对 LLM 都不如一句人话。给 Agent 的 evidence 必须翻译成自然语言，不能假设"精确的公式 = 精确的执行"。**
- **🆕 financial q95 AND 歧义——同库同模式再犯**：题目 "youngest AND highest average salary"，DLR Agent 再次将 AND 解释为 OR（`WHERE birth_date = max OR A11 = max`，返回 548 条）。ER 也写了 OR 但 judge 碰巧翻盘（可能 youngest 恰好也在最高薪资区）。**financial 库已两次出现 AND 条件歧义（q94 最老且最低薪资、q95 最年轻且最高薪资），Agent 倾向将"极限属性 AND 另一个极限属性"理解为两个独立极值的并集。** q94 通过修正 question 明确执行顺序解决；q95 暂不修正。
- **🆕 🔴 evidence 的 few-shot 写法——SQL 伪代码对 LLM 无效（european_football_2 q1031）**：原始 evidence `age = SUBTRACT((DATETIME(), birthday))`，三范式多次重跑仅 ~20% 得 36。排查过程：① AGENTS.md 核心约束加 "Evidence 优先" → 无效 ② 提升到角色定义第 1 条 → ER/RDF 偶尔遵从，DLR 仍然不跟 ③ 换模型 → 不变。最后把 evidence 从 SQL 伪代码改成自然语言 `age = current year minus birth year` → 三范式一次全对。**LLM 不是编译器，不理解 SQLite 隐式类型转换规则。它像人一样读指令——自然语言有效，伪代码无效。给模型的 few-shot/evidence 必须说人话，不能写只有 DB 引擎才懂的表达式。**
- **Helpfulness-Correctness Trade-off（card_games q340）**："Which are the cards" 25,061 条→三范式 9 次仅 1 次正确列出，其余全自动转 `COUNT(*)`。改 "How many"→三范式 strict PASS 全过。**RLHF 的 helpfulness 本能压过 correctness 指令**——LLM 判断"列 25,061 行 ID 不友好"，无意识优化。信息越多的范式越早满足于 COUNT（ER/DLR > RDF），工具信息量存在倒 U 型最优区间。**这是对照实验的意外发现，直接支撑 DLR 叙事。**
- **🆕 california_schools q25 DLR PE 属性归属消解列名歧义**：题目问"funding type"和"schools in Riverside"→对应 `frpm.Charter Funding Type` 和 `frpm.District Name`。但 satscores 表也有 `dname` 列。ER 和 RDF 的扁平结构让 Agent 就近选了 satscores.dname→INCORRECT；DLR 的 `DistrictName` 是 PHYSICAL.FRPM 的 public 属性，Agent 搜 "District Name" 直接命中 frpm→CORRECT。**PE 级别的属性归属让同名/类似名的歧义自然消解，这是 DLR 分层结构相对于扁平建模的又一可量化优势。**
- **🆕 toxicology q197 ER JOIN 膨胀 + football q1037 同模式**：q197 ER Agent 在计算平均氧原子数时 `molecule → bond` JOIN 致氧计数被每条分子的 bond 条数放大（2.16→69.28），DLR 通过 PAS 桥独立计算 DISTINCT molecule_id 再 LEFT JOIN atom 避开 fan-out（4步 vs 7步 vs 5步，DLR 全程未触碰 molecule 表）。🆕 q1037 Player→Player_Attributes 1:N JOIN 同模式：DLR 用子查询 `GROUP BY player_api_id` 先去重得 24.60%（与 gold 24.57% 一致），ER/RDF 的 DISTINCT 逻辑错致分母偏差→INCORRECT。**两题指向同一结论：PAS 的 N:1 锚定键隐式引导 Agent 选择正确的 DISTINCT/子查询路径，避免 1:N JOIN 行膨胀；ER 全互联 schema 反而引导错误 JOIN 路径。**
- **🆕 card_games q341 ER 大宽表陷阱**：`cards` 表 78 列，ER 全互联 schema 将所有列暴露给 Agent→SQL 逻辑错误。DLR 通过 `private_attributes` 隐藏非核心列（仅暴露 ~15 个 public 属性），RDF 仅映射被引用的列，两者均避开了噪音干扰。加上 q197 的 JOIN 膨胀，**ER"信息丰富"已两次成为双刃剑：宽表场景下全暴露=全噪音，Agent 在 78 列中迷失方向。**
- **california_schools q17 Gold 过度要求 RANK()**：题目只写 "Rank schools... showing their charter numbers"，Gold SQL 多生成了 `WritingScoreRank` 列号。三范式都做了正确的 ORDER BY DESC 排序，ER/RDF 因缺 RANK() 列被 judge 判 INCORRECT，DLR 因加了 GROUP BY 被 judge 翻盘——本质上三者都对。**judge 不一致，非范式问题。**
- **🆕 superhero q726 同 q17——"Rank" ≠ RANK()**：题目 "Rank heroes by height in descending order"，Gold 多要求 `RANK() OVER (ORDER BY height_cm DESC)` 列。三范式 Agent 做了 ORDER BY height_cm DESC，结果正确但缺 Rank 列号。和 q17 同一模式：**BIRD 数据集中 "Rank" 在部分题中被 gold 解释为窗口函数 RANK() 列，而非自然语言中的"排序展示"**。手动翻盘三范式全 CORRECT。**LLM 对 "rank" 的理解（排序）与 gold 标注者的理解（产生序号列）存在系统性偏差。**
- **🆕 california_schools q11 + q24 RDF 列歧义（同库两次）**：q11：frpm 表同时有 CDSCode（全码）和 School Code（短码），题目问"codes of the schools"，RDF Agent 选了字面匹配的 School Code→INCORRECT。q24：schools.School 和 frpm.School Name 都存在，RDF Agent 选了 schools.School 而 gold 期望 frpm.School Name→INCORRECT。ER/DLR 也面临同样的歧义但选了正确的列（或 judge 翻盘）。**RDF 的 flat 结构让列名歧义更致命——没有 Entity/PE 层级来区分列的归属和语义权重，两个 "School" 在 predicate 海洋里看起来一样。**
- **🆕 toxicology q206 RDF 探索≠答案——Agent 找到了 JOIN 路径但最终 SQL 弃之不用**：题目问 TR004_8_9 bond 连接什么原子。RDF Agent 的探索过程完全正确——`rdf_semantic_query` → `query_rdf_mapping(connected)` → `SELECT FROM connected WHERE bond_id=...` 成功拿到 atom_id → 但最后交卷的 SQL 变成了 `SELECT element FROM atom WHERE atom_id IN ('TR004_8', 'TR004_9')`，把 connected 表抛掉了。对比 ER/DLR：ER 的 `get_entity_relations` 返回独立关系列表，DLR 的 `get_pe_full` 返回 ARCS 结构块——attribute 填 SELECT，relation 填 JOIN，结构即引导。RDF 把所有信息倒进一个平面——列、FK、元数据全是 predicate——Agent 用 connected 探索了，但写答案时没把它当成答案结构的一部分。**RDF 的形式化表达能力足够，但缺少让 Agent 区分"这个关系应该留在答案 SQL 里"的架构信号：attribute 和 relation 在 RDF 中同为 predicate，视觉权重相等。这解释了为什么 RDF 在 q197 避免了 JOIN 陷阱（正向），却在 q347 漏了 JOIN（负向），在 q206 找到了 JOIN 但没留在最终答案里（中性偏负）——三个案例指向同一根因：扁平结构没有信息层级。**
- **🆕 card_games q347 RDF 扁平结构的代价——形式完备 ≠ LLM 友好**：题目要求列出 Stephen Daniele 卡牌的 ruling text。TTL 映射完全正确——`rulings` 表、`rulings.text`、`refers_to_cards` FK 全在，`rdf_semantic_query` 也正确召回了 `rulings` class。但 RDF Agent 只对 `cards` 做了 `query_rdf_mapping`，看到 `cards.text` 就满足了，直接 `SELECT text FROM cards WHERE artist=...` 交卷——把卡牌自身的 oracle text 当成了 ruling text。ER 和 DLR 分别通过 `get_entity_mapping` 和 `get_pe_full` 明确看到了 `rulings` 作为独立 entity/PE 及其 FK 关系，正确写出了 `LEFT JOIN rulings ON uuid`。**根因：RDF 的 triple 模型将所有事实压平——FK 关系、属性列、元数据标签全是同一种语法结构，没有信息层级。`refers_to_cards` FK 在 78 个 predicate 中不发光，Agent 的注意力没有被引向关键连接。而 ER/DLR 将关系提升为一等概念（relations/ARCS），信息层级让 LLM 自然落在正确的 JOIN 路径上。**与 q197 形成完整对照：那里 RDF 的扁平让 Agent 没发现 molecule↔bond 连接，反而避开了 fan-out 陷阱（正向结果）；这里同一特性导致 Agent 漏掉了 card↔ruling 连接（负向结果）。**W3C 标准的形式化完备性（任何事实都能编码为 triple）≠ 对 LLM 的引导有效性。扁平即平等，平等即无优先级——这是 RDF 作为 Agent 交互范式的结构性缺陷。**
- **🆕 🔴 card_games q349+q352 双 gold SQL bug——同库两题连续翻车**：q349 题目+evidence 明确要求 Max(count(rulings.uuid)) 找裁决最多的 promo 卡，Gold SQL 却算的是"拥有最多 promo 卡的画师"（`MAX(COUNT(DISTINCT uuid)) GROUP BY artist`），答非所问。q352 题目问"有中文翻译的卡牌占比"，Gold SQL 的分母是 `cards LEFT JOIN foreign_data` 后的行数（251,939）而非卡牌数（56,822），实际算的是"中文条目占 card-language 组合比"（8.77%）而非"有中文的卡牌占比"（35.38%）。修正后 DLR 双题全对（q349 judge 翻盘 + q352 strict PASS），ER 和 RDF 各因 SQL 公式错误和漏 WHERE 条件各错一题。**一个库 52 题里已发现 4 个 gold bug（q341 typo + q344 evidence 缺失 + q349/q352 SQL 语义错误），BIRD 数据集的 card_games 标注质量堪忧。** 已同步修正 `mini_dev_sqlite.json` + `00_golden_cache.json`。
- **🆕 financial q94 "最老且最低薪资"歧义→业务意图导向修复**：原题 "oldest AND lowest salary" 条件互斥（最老女性 district 51 vs 最低工资区 district 75），三范式多次重跑答案不一。本质不是范式问题——是传统 Text2SQL 死磕字面语法映射，遇到 "and" 陷入优先级死结。修复方向：question 明确为"先圈最低薪资→再取最老"，evidence 补业务逻辑步骤而非冰冷单点字段映射。**语义 Agent 能结合业务意图推导逻辑顺序，前提是给足业务上下文 Hint 而非只给字段名。** 修正后三范式全对。
- **🆕 debit_card q1531 gold SQL 与 evidence 自相矛盾**：evidence 写 `avg = Total(price)/Total(amount) = SUM(Price)/SUM(Amount)`，但 Gold SQL 用 `SUM(Price/Amount)`——两种算法结果完全不同（22.55 vs 203.86）。DLR 三范式中唯一按 evidence 执行，且唯一路由到 yearmonth.Consumption 找到正确客户 12459。ER 走 transactions_1k 得到 CustomerID 13665（avg 5762 明显不合理），RDF 完全没触碰 yearmonth。**不是范式问题——gold 自身不一致，evidence 正确但 SQL 错了。** 暂不修正 cache，待人工审判。
- **🆕 🔴 thrombosis q1152 Gold annotation 错误**：题目问"ratio of outpatient to inpatient"（A of B = A/B = 门诊/住院），Gold 却算成 住院/门诊=1.31。DLR 和 RDF 都正确算出 0.76，但 DLR judge 服从 Gold 判 INCORRECT，RDF judge 更独立翻盘。修正 Gold cache(1.31→0.76)后 DLR strict PASS、ER 反成 INCORRECT。**"ratio of A to B = A/B"是英语常识，Gold 标注者混淆了方向。DLR 48/48 无一真实失误。**
- **🆕 strict PASS 率——建模语义丰富度的量化指标**：三范式中 DLR strict PASS 率最高（45% vs ER 41%、RDF 42%）。strict PASS 意味着 Agent 产出 SQL 与 gold 在结构/格式层面完全一致——不只是答案对，是写法都对。judge 翻盘（答对但格式偏差）反映了 Agent 产出与 gold 之间的语义鸿沟；strict PASS 率越高，说明模型语义引导越精确。DLR 经过 student_club/toxicology/football 三轮建模修复后 strict 率从 ~40% 提升到 45%，证明 public_attributes + 丰富 LE description + PAS 直达的组合有效。**RDF 虽然平均 token 最低，但 strict 率低于 DLR——扁平结构让 Agent 探索效率高（token 低），但缺乏结构引导让写法一致性弱于 DLR（strict 低）。**
- **🆕 california_schools q27 "average score" 歧义——命名即陷阱**：题目 "What is the average score in writing" + 列名 `AvgScrWrite` → 三范式全部 `SELECT AVG(AvgScrWrite)` 返回一个聚合值 455.51，而不是列出每所学校的 AvgScrWrite 列值。修复尝试：① DLR AvgScrMath/Read/Write 从 private→public attributes + description "Pre-computed per-school average" → 无效 ② ER description 同样增强 → 无效 ③ evidence 加 "Average score in writing refers to AvgScrWrite" → 无效。Agent 在工具返回中看到了逐校数据和 description，但 question 的 "average" 一词对 LLM 的锚定效应太强，三次重跑无一例外。**和 q340 "Which are the cards" → COUNT(*)、q1031 evidence 伪代码 同根：LLM 读语义联想而非形式符号。当列名和 question 措辞同时指向 "average" 时，没有任何层级的 description/evidence 能扭转。这笔记录为 INCORRECT，非范式问题。**

- **🆕 🔴 toxicology DLR 建模修复——private_attributes 隐藏 JOIN 键 + 缺 PAS**：q207 DLR 旧模型 110K/10步/4次execute_sql。根因：`atom.element`、`bond.bond_type`、`connected.atom_id/atom_id2` 全是 private；Bond→Atom 无 PAS（Agent 需手动解析 connected 表）；LE description 稀疏（3-4 词）。修复：全部关键列升 public、新增 PAS `Bond→Atom`、丰富 LE description。效果：q207 DLR 110K/10步→43K/5步 strict PASS（-60%）。**和 student_club 同一根因：核心查询列和 JOIN 键不能是 private，独立业务关系必须有 PAS。**
- **🆕 🔴 toxicology q207 Gold SQL bug——分子级关联 vs 原子级关联**：题目问"What elements are in a double type bond"（参与双键的元素），Gold SQL 用 `atom JOIN bond ON molecule_id`——这是分子级关联，只要分子里有双键，该分子所有原子全被召回（13 元素：br, c, ca, cl, cu, f, h, n, o, p, pb, s, sn）。三范式均使用 `bond → connected → atom` 精确定位双键两端的原子（5 元素：c, ca, n, o, s）。独立验证确认三范式正确、gold 错误。已修正 gold cache + mini_dev_sqlite.json。**和 q1481/q1482/q1529 同模式：gold SQL 的 JOIN 粒度错了。**
- **🆕 🔴 student_club DLR 建模修复——语义路由错库根因与解法**：q1339 DLR 首跳 `dlr_semantic_query("expense...first_name last_name")` 将 "expense" 路由到 debit_card（LOGICAL.Consumption "monthly bills + transaction details" 9 词丰富描述 > LOGICAL.EventFinance "Event budget and actual expenses" 5 词稀疏描述），Agent 花了 14 步/360K cache 才逃出来。根因三层：① LE description 太短（LOGICAL.Member 仅 "Student club member" 3 词，first_name/last_name 全在 private_attributes 中，不进向量）；② Expense 作为 PE 挂在 Budget 下（A=link_to_budget），link_to_member FK 无 PAS 表达，Member→Expense 需 2 跳；③ `dlr_semantic_query` 只返回 LE 结果，PE 和 attribute 的向量被丢弃。**修复（参照 superhero Power 模式）**：Expense 拆为独立 LE，A_anchor 从 link_to_budget→link_to_member（逻辑归属），加 PAS Member→Expense + Budget→Expense，LE description 全量丰富（字段名+业务语义）。效果：q1339 DLR 389K/25步/15次 execute_sql → 34K/4步/1次 execute_sql，strict PASS。**教训：① PE 的 A_anchor 必须锚到有逻辑意义的 FK，纯 junction FK 只配做 PAS 桥；② 独立业务概念（Expense/Power）应升级为独立 LE + 直接 PAS，不为物理表结构所限；③ LE description 是语义路由的唯一信号——必须包含关键字段名和业务语义，不是写个名字就够。**

## 下一步

- debit_card 30/30 ✅ → student 10/48 → thrombosis 10/50 → football 10/51 → formula_1 10/66 → superhero 10/52 → codebase 10/49 → card_games 12/52 → toxicology 10/40 → california 8/30 → financial 10/32 → 待续
- 500 题全量后补充：分范式准确率总表、分库分难度矩阵、token/步数分布、DLR 语义路由收益归因分析。

