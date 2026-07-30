## 逐题校验表 — strict / judge / result / token

> **说明**: 每行一题，每范式 4 列（strict 初判 / judge 仲裁 / result 最终判定 / token 消耗）。
> **数据来源**: `validated_results/round_1/*/agent_stats.csv`（94 题标准格式）+ `results.md` token 表（38 题旧格式仅 token）。
> **⚠️ 标记**: CSV 实际 verdict 与 results.md 不一致的题。
> **旧格式 pair**（仅 token，无 strict/judge/result）: 7-8, 9-10, 17-18, 21-22, 31-32, 33-34, 37-38, 39-40, 41-42, 61-62, 63-64, 67-68, 69-70, 73-74, 75-76, 77-78, 83-84, 85-86, 89-90

| 专题 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 数据集备注 | 备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|----------|------|
| debit_card | q1471 | FAIL | CORRECT | FAIL | CORRECT | — | — | CORRECT | 1472 | — | 60,262 | — | — |  | ⚠️DLR |
| debit_card | q1472 | FAIL | CORRECT | — | — | FAIL | CORRECT | CORRECT | — |  | 286,969 | — | — |  | ⚠️RDF |
| debit_card | q1473 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 35,825 | 72,766 | 94,395 |  | 三范式strict PASS；简单题ER更高效(35K vs 72K vs 94K) |
| debit_card | q1476 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT |  | 73,221 | 61,770 | — |  | ⚠️RDF |
| debit_card | q1479 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 43,712 | 43,397 | 45,318 |  |  |
| debit_card | q1480 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 50,260 | 59,145 | 65,519 |  |  |
| debit_card | q1481 | FAIL | CORRECT | — | — | FAIL | CORRECT | CORRECT | — | ""rdf_search"": 6 | 230,002 | — | 120,958 | gold bug(未过滤最低消费客户) | ⚠️RDF |
| debit_card | q1482 | FAIL | CORRECT | — | — | — | — | ""get_le_attrs"": 2 | — | — | 46,942 | — | — | gold bug(分母应为2013) | ⚠️ER |
| debit_card | q1483 | PASS |  | — | — | — | — | CORRECT | — | — | 44,551 | — | — |  | 三范式strict PASS；Agent对简洁语义SQL产出质量高 |
| debit_card | q1484 | FAIL | CORRECT | FAIL | CORRECT | PASS |  | ""get_pe_full"": 3 | ""rdf_predicates"": 1 | CORRECT | 41,164 | 39,184 | 71,763 |  | ⚠️ER ⚠️DLR |
| debit_card | q1486 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 62,200 | 72,659 | 75,962 |  |  |
| debit_card | q1490 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 105,687 | 80,806 | 108,118 | gold bug(两轮修正) |  |
| debit_card | q1493 | FAIL | CORRECT | — | — | PASS |  | 1493 | — | CORRECT | — | — | 78,468 |  | ⚠️ER |
| debit_card | q1498 | PASS |  | FAIL | CORRECT | — | — | CORRECT | 1498 | — | 34,828 | — | — |  | ⚠️DLR |
| debit_card | q1500 | FAIL | CORRECT | — | — | — | — | 1500 | — | — | — | — | — |  | ⚠️ER |
| debit_card | q1501 | — | — | PASS |  | PASS |  | — | CORRECT | CORRECT | — | 19,962 | 16,182 |  |  |
| debit_card | q1505 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | ""get_pe_full"": 4 | ""query_rdf_mapping"": 3 | — | 34,566 | 37,544 | gold语义偏差(COUNT(*)非客户数) | ⚠️DLR ⚠️RDF |
| debit_card | q1506 | PASS |  | — | — | — | — | CORRECT | — | — | 57,614 | — | — |  |  |
| debit_card | q1507 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 8,521 | 9,925 | 7,644 |  |  |
| debit_card | q1509 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 8,403 | 10,503 | 12,599 |  |  |
| debit_card | q1514 | FAIL | CORRECT | FAIL | CORRECT | — | — | ""get_entity"": 3 | CORRECT | — | 62,465 | 69,134 | — |  | ⚠️ER |
| debit_card | q1515 | — | — | FAIL | CORRECT | — | — | — | ""query_rdf_mapping"": 2 | — | — | 43,077 | — |  | ⚠️DLR |
| debit_card | q1521 | PASS |  | FAIL | CORRECT | — | — | CORRECT | 1521 | — | 12,264 | — | — |  | ⚠️DLR |
| debit_card | q1524 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 12,837 | 12,487 | 14,332 |  | ER YAML缺FK relations→Agent走错路；补3条relation+rebuild后翻盘；全互联≠好引导 |
| debit_card | q1525 | FAIL | CORRECT | FAIL | CORRECT | — | — | CORRECT | 1526 | — | 54,895 | — | — | gold同1505缺陷 | ⚠️DLR |
| debit_card | q1526 | FAIL | CORRECT | — | — | — | — | CORRECT | — | — | 116,689 | — | — | gold返回NULL(子查询无匹配) | gold返回NULL(子查询无匹配)；DLR/RDF绕过缺陷正确给出-5.8152 |
| debit_card | q1528 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 10,344 | 12,468 | 9,097 |  |  |
| debit_card | q1529 | PASS |  | FAIL | CORRECT | — | — | CORRECT | 1529 | — | 19,591 | — | — | gold笛卡尔积bug(已修正cache) | ⚠️DLR |
| debit_card | q1531 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 53,497 | 53,285 | 46,551 | 数据集无矛盾(evidence/gold SQL/gold cache均为SUM(Price)/SUM(Amount)=22.55);旧跑次已CORRECT | 旧跑次三范式全CORRECT(ER 53K/DLR 53K/RDF 47K) |
| debit_card | q1533 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 81,212 | 35,235 | 101,210 |  |  |
| student_club | q1312 | FAIL | CORRECT | — | — | FAIL | CORRECT | 1312 | — | 1317 | — | — | — |  | ⚠️ER ⚠️RDF |
| student_club | q1317 | — | — | PASS |  | PASS |  | — | CORRECT | CORRECT | — | 9,742 | 8,430 |  | student_club开局全通 |
| student_club | q1322 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 43,936 | 31,509 | 35,443 |  | 三范式judge翻盘 |
| student_club | q1323 | PASS | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 104,100 | 69,207 | 36,549 |  | 三范式strict PASS + judge翻盘 |
| student_club | q1331 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | ""get_pe_full"": 2 | CORRECT | 73,821 | 32,563 | 77,279 |  | ⚠️DLR |
| student_club | q1334 | PASS |  | — | — | PASS |  | CORRECT | — | CORRECT | 55,114 | — | 42,503 |  |  |
| student_club | q1338 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | 1339 | 1339 | 1339 | — | — | — |  | ⚠️ER ⚠️DLR ⚠️RDF |
| student_club | q1339 | — | — | — | — | — | — | — | — | — | — | — | — |  | DLR建模修复:语义路由错库→Expense独立LE+PAS；389K/25步→34K/4步strict PASS |
| student_club | q1340 | PASS |  | FAIL | CORRECT | — | — | CORRECT |  | — | 78,516 | — | — |  | ⚠️DLR |
| student_club | q1344 | PASS |  | — | — | — | — | CORRECT | — | — | 61,185 | — | — |  | 三范式strict PASS |
| thrombosis | q1149 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | ""get_entity_mapping"": 1 | CORRECT | ""query_rdf_mapping"": 1 | 36,998 | 32,309 | 50,686 |  | ⚠️ER ⚠️RDF |
| thrombosis | q1150 | — | — | PASS |  | — | — | — | CORRECT | — | — | 41,067 | — |  |  |
| thrombosis | q1152 | FAIL | CORRECT | PASS | INCORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 68,893 | 40,351 | 27,409 | gold ratio方向反(门诊/住院→住院/门诊) | gold ratio方向反:门诊/住院→住院/门诊；DLR/RDF正确算出0.76；修正后DLR strict PASS |
| thrombosis | q1153 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 99,754 | 39,790 | 31,537 |  | 三范式judge翻盘 |
| thrombosis | q1155 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 84,434 | 56,704 | 114,981 |  | 三范式strict PASS |
| thrombosis | q1156 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 67,961 | 33,329 | 28,520 |  | 三范式strict PASS |
| thrombosis | q1157 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 54,114 | 41,491 | 52,667 |  | 三范式strict PASS |
| thrombosis | q1162 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 28,614 | 32,648 | 36,698 |  | 三范式strict PASS |
| thrombosis | q1164 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 52,462 | 52,132 | 36,101 |  | 三范式strict PASS |
| thrombosis | q1166 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | INCORRECT | INCORRECT | CORRECT | INCORRECT | 48,084 | 41,830 | 37,609 |  | ⚠️ER |
| football | q1025 | FAIL | CORRECT | FAIL | CORRECT | — | — | ""get_entity_mapping"": 3 | CORRECT | — | 95,251 | 33,757 | — |  | ⚠️ER |
| football | q1028 | — | — | FAIL | CORRECT | — | — | — | ""query_rdf_mapping"": 2 | — | — | 53,979 | — |  | ⚠️DLR |
| football | q1029 | FAIL | CORRECT | — | — | FAIL | CORRECT | 1029 | — | CORRECT | — | — | 7,101 | gold ASC/DESC颠倒 | ⚠️ER |
| football | q1030 | FAIL | CORRECT | — | — | — | — | 1030 | — | — | — | — | — |  | ⚠️ER |
| football | q1031 | FAIL |  | FAIL |  | FAIL |  | INCORRECT | INCORRECT | INCORRECT | 11,043 | 12,355 | 13,832 | evidence伪代码(SUBTRACT(DATETIME,birthday)) | evidence伪代码(SUBTRACT(DATETIME,birthday))→LLM无法执行；改自然语言后翻盘；三范式全INCORRECT |
| football | q1032 | FAIL | CORRECT | — | — | — | — | 1032 | — | — | — | — | — |  | 重跑judge翻盘全CORRECT |
| football | q1035 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 106,247 | 38,318 | 48,529 |  | 三范式strict PASS |
| football | q1036 | PASS |  | PASS |  | FAIL | INCORRECT | CORRECT | CORRECT |  | 42,628 | 38,193 | — |  | RDF缺DISTINCT→INCORRECT |
| football | q1037 | FAIL | INCORRECT | FAIL | CORRECT | FAIL |  | 1039 | CORRECT | INCORRECT | — | 50,536 | 35,882 |  | ER/RDF JOIN键错；DLR子查询去重正确 |
| football | q1039 | — | — | PASS |  | PASS |  | — | CORRECT | CORRECT | — | 73,707 | 54,226 |  | 三范式strict PASS |
| formula_1 | q724 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 37,230 | 43,001 | 30,272 |  | 三范式strict PASS |
| formula_1 | q846 | PASS | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 68,563 | 33,606 | 32,960 |  | formula_1开局全通 |
| formula_1 | q847 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 44,477 | 33,238 | 32,514 | gold NULL排序bug(Fisichella应为Räikkönen) | gold NULL排序bug:Fisichella(q2=NULL)排第一；DLR/RDF返回Räikkönen(judge翻盘)，ER strict PASS返回Fisichella |
| formula_1 | q850 | FAIL | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 45,188 | 41,934 | 76,224 |  | formula_1第二对全通 |
| formula_1 | q854 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 63,486 | 59,238 | 36,067 |  | 三范式judge翻盘 |
| formula_1 | q857 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT |  | 54,217 | 60,127 | 78,188 |  | ⚠️RDF |
| formula_1 | q859 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 46,706 | 53,110 | 50,833 |  | 三范式strict PASS |
| formula_1 | q861 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 38,425 | 44,531 | 43,901 |  | evidence未区分两个同名number列；补description后全通 |
| formula_1 | q862 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 34,834 | 33,632 | 42,598 |  | 三范式strict PASS |
| formula_1 | q865 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT |  | 48,155 | 34,326 | — |  | ⚠️RDF |
| superhero | q717 | PASS |  | — | — | — | — | CORRECT | — | — | 45,433 | — | — |  |  |
| superhero | q719 | PASS | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 90,494 | 36,282 | 28,825 |  | 三范式strict PASS；Agent对简洁schema(hero/power)SQL产出质量高 |
| superhero | q723 | PASS | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 29,068 | 35,981 | 29,175 |  | 三范式strict PASS |
| superhero | q726 | FAIL | CORRECT | FAIL | CORRECT | — | — | CORRECT | CORRECT | — | 59,696 | 65,984 | — | gold过度要求RANK()列 | gold过度要求RANK()列(题目只写Rank)；三范式ORDER BY正确缺Rank列号；手动翻盘 |
| superhero | q728 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | 726 | CORRECT | 46,561 | — | 52,604 |  | ⚠️DLR |
| superhero | q730 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 84,532 | 37,591 | 83,411 |  | DLR建模修复后108K→47K(-57%)，judge翻盘 |
| superhero | q732 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 46,469 | 55,585 | 37,962 |  | 三范式strict PASS |
| superhero | q733 | PASS |  | — | — | PASS |  | CORRECT | — | CORRECT | 28,920 | — | 28,642 |  | 三范式strict PASS；DLR建模修复(1→9 public)后-49% token |
| superhero | q736 | FAIL | CORRECT | — | — | FAIL | CORRECT |  | — |  | — | — | — |  | ⚠️ER ⚠️RDF |
| superhero | q994 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | ""get_pe_full"": 3 | ""query_rdf_mapping"": 3 |  | 80,923 | 54,656 | 121,849 |  | ⚠️ER ⚠️DLR ⚠️RDF |
| codebase | q531 | FAIL | CORRECT | FAIL | CORRECT | — | — | ""get_entity_mapping"": 1 | ""get_pe_full"": 1 | — | 36,525 | 39,782 | — |  | ⚠️ER ⚠️DLR |
| codebase | q532 | — | — | — | — | — | — | — | — | — | — | — | — |  | 三范式全CORRECT |
| codebase | q533 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 36,896 | 31,686 | 49,225 | evidence缺DATE() | 🔴evidence错误:LastAccessDate>'2014-09-01'未用DATE()；三范式照做得5146 vs gold 4941 |
| codebase | q537 | PASS | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 36,101 | 49,688 | 50,853 |  | 三范式strict PASS |
| codebase | q539 | — | — | — | — | — | — | — | — | — | — | — | — |  | 三范式strict PASS |
| codebase | q544 | — | — | — | — | — | — | — | — | — | — | — | — |  | 三范式strict PASS |
| codebase | q547 | PASS |  | — | — | PASS |  | CORRECT | — | CORRECT | 60,473 | — | 53,148 |  | 三范式strict PASS |
| codebase | q549 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | 547 | CORRECT |  | — | 51,179 | — |  | ⚠️ER ⚠️RDF |
| codebase | q555 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 46,479 | 50,639 | 100,051 |  | 三范式strict PASS |
| codebase | q557 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 59,209 | 61,472 | 51,605 |  | 三范式strict PASS |
| card_games | q340 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 50,870 | 33,440 | 27,685 |  | 问题改How many后三范式strict PASS(DLR 33K/ER 51K/RDF 28K) |
| card_games | q341 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | CORRECT | INCORRECT | CORRECT | CORRECT | 95,200 | 58,978 | 30,310 | gold typo | ER大宽表陷阱:cards表78列全暴露→SQL逻辑错误；DLR private_attributes隐藏非核心列避噪 |
| card_games | q344 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 53,625 | 34,288 | 52,270 | evidence缺印刷版本约束 | 🔴语义建模盲区——领域知识:同名卡多印刷版本，gold用id三范式选name；evidence补充后修复 |
| card_games | q345 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 80,004 | 45,722 | 41,161 |  | 三范式judge翻盘 |
| card_games | q346 | PASS |  | — | — | — | — | CORRECT | — | — | 64,089 | — | — |  | 三范式strict PASS |
| card_games | q347 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | ""get_pe_full"": 2 | ""rdf_classes"": 1 |  | 144,494 | 105,495 | 36,459 |  | ⚠️ER ⚠️DLR |
| card_games | q349 | FAIL | CORRECT | — | — | — | — | 349 | — | — | — | — | — | gold bug(答非所问) | ⚠️ER |
| card_games | q352 | — | — | PASS |  | FAIL | CORRECT | — | CORRECT |  | — | 17,845 | — | gold bug(分母错) | 🔴gold bug分母错:cards LEFT JOIN foreign_data行数(251939)非卡牌数(56822)；DLR strict PASS |
| card_games | q356 | PASS |  | — | — | — | — | CORRECT | — | — | 72,445 | — | — |  | 三范式strict PASS；DLR 4步/33K最低 |
| card_games | q358 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | 356 | 356 |  | — | — | — |  | ⚠️ER ⚠️DLR ⚠️RDF |
| card_games | q366 | FAIL | CORRECT | — | — | FAIL | CORRECT |  | — |  | — | — | — |  | ⚠️ER ⚠️RDF |
| card_games | q368 | — | — | PASS |  | — | — | — | CORRECT | — | — | 32,962 | — |  | 三范式strict PASS |
| toxicology | q195 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 40,714 | 31,353 | 26,530 |  | 三范式judge翻盘 |
| toxicology | q197 | FAIL | INCORRECT | PASS | CORRECT | FAIL | CORRECT | INCORRECT | CORRECT | CORRECT | 57,143 | 47,527 | 37,140 |  | ER JOIN膨胀:molecule→bond致氧计数被bond条数放大(2.16→69.28)；DLR PAS桥独立计算DISTINCT molecule_id避开fan-out |
| toxicology | q198 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 35,998 | 35,893 | 50,610 | evidence笛卡尔积(去笛卡尔积修正) | evidence笛卡尔积(去笛卡尔积修正)+gold cache修正；三范式judge翻盘 |
| toxicology | q200 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 76,256 | 31,804 | 25,992 |  | 三范式judge翻盘 |
| toxicology | q201 | PASS |  | — | — | — | — | CORRECT | — | — | 29,179 | — | — |  | 三范式strict PASS |
| toxicology | q206 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | ""get_pe_full"": 2 | ""query_rdf_mapping"": 3 |  | 57,597 | 40,861 | 50,559 |  | ⚠️ER ⚠️DLR |
| toxicology | q207 | FAIL | CORRECT | — | — | — | — | CORRECT | — | — | 53,325 | — | — | gold SQL bug(分子级关联vs原子级) | 🔴gold SQL bug:atom JOIN bond ON molecule_id(分子级)→三范式用bond→connected→atom(原子级)精确定位；DLR建模修复110K→43K |
| toxicology | q208 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | 207 | 207 |  | — | — | — |  | ⚠️ER ⚠️DLR |
| toxicology | q212 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | 213 | CORRECT | CORRECT | — | 41,968 | 29,231 |  | ⚠️ER |
| toxicology | q213 | — | — | PASS |  | FAIL | CORRECT | — | CORRECT | CORRECT | — | 41,431 | 35,318 |  | RDF手动翻盘 |
| california | q5 | PASS |  | PASS |  | — | — | CORRECT | CORRECT | — | 67,294 | 35,885 | — |  | california开局；ER/DLR strict PASS |
| california | q11 | PASS |  | PASS |  | FAIL | INCORRECT | CORRECT | CORRECT | ""query_rdf_mapping"": 2 | 87,085 | 57,929 | 60,690 |  | 🔴RDF列歧义:frpm有CDSCode(全码)和School Code(短码)，RDF选错列；ER/DLR选了正确列 |
| california | q12 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 16,586 | 14,868 | 14,295 |  | 三范式strict PASS |
| california | q17 | FAIL | INCORRECT | — | — | — | — | 17 | — | — | — | — | — | gold过度要求RANK()列 | 🔴gold过度要求RANK()列(题目只写Rank schools)；DLR judge翻盘；judge不一致非范式问题 |
| california | q23 | FAIL | CORRECT | — | — | — | — | 23 | — | — | — | — | — | evidence公式触发ABS()→自然语言修正 | ⚠️ER |
| california | q24 | — | — | — | — | FAIL | INCORRECT | — | — | INCORRECT | — | — | 14,707 |  | DLR建模教训:public属性双刃剑(升public后两个School都可见→选错列)；跨库向量漂移(free meal被thrombosis/hero抢走) |
| california | q25 | FAIL | INCORRECT | PASS |  | — | — |  | CORRECT | — | — | 46,950 | — |  | DLR PE属性归属消解列名歧义:District Name是FRPM的public属性→直接命中frpm；ER/RDF选错satscores.dname |
| california | q26 | — | — | FAIL | CORRECT | FAIL | CORRECT | — |  |  | — | — | — | gold bug(Free Meal→FRPM Count)待修正 | ⚠️DLR |
| california | q27 | FAIL | INCORRECT | — | — | — | — | 28 | — | — | — | — | — | average歧义(列名+question双触发AVG) | 🔴average歧义:列名AvgScrWrite+question'average'双触发AVG()→三范式全INCORRECT；LLM语义联想非形式符号 |
| california | q28 | — | — | — | — | — | — | — | — | — | — | — | — |  | 三范式judge翻盘全CORRECT |
| financial | q89 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 157,511 | 71,207 | 81,125 |  | financial开局全通 |
| financial | q92 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 104,583 | 219,771 | 86,875 |  | 三范式全CORRECT |
| financial | q93 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 89,663 | 89,698 | 61,037 |  | 三范式strict PASS |
| financial | q94 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 126,170 | 86,847 | 113,012 | question修正(条件互斥) | 🔴AND歧义:最老且最低薪资条件互斥；question明确执行顺序后DLR strict PASS |
| financial | q95 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 75,835 | 80,320 | 95,570 | gold bug(只实现最年轻丢掉最高薪资) | 重跑后DLR CORRECT |
| financial | q98 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 72,786 | 88,830 | 86,224 |  | 三范式strict PASS |
| financial | q99 | FAIL | CORRECT | — | — | FAIL | CORRECT |  | — |  | — | — | — |  | ⚠️ER ⚠️RDF |
| financial | q100 | PASS |  | — | — | FAIL | CORRECT | CORRECT | — | CORRECT | 56,335 | — | 57,070 |  | DLR建模修复后148K→89K strict PASS(-40%) |
| financial | q112 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 47,188 | 66,742 | 50,503 |  | 三范式strict PASS |
| financial | q115 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 54,014 | 54,264 | 54,263 |  | ER手动翻盘(结果40%=gold) |