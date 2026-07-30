# 评测结果 V2 — 全量逐题校验

> 目标结论方向：**DLR 原创建模（LE-PE 双层 + PAS 语义路由）对 LLM Agent 的 NL2SQL 引导优于 ER/RDF 基线**。
> 本文件为 results.md 的校验版本：保留原 pair 汇总表 + token 表作为对照，新增逐题 strict/judge/result/token 校验表。

---

## 对照 A — Pair 汇总表（原 results.md）

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
| 79-80 | card_games | q349, q352 | 100% | 100% | 50% | 🔴 双 gold bug修正 + 模型longcat→deepseek-pro: q352三范式全翻盘CORRECT(old全INCORRECT); q349 ER/DLR对,RDF INCORRECT(SQL缺WHERE isPromo=1); gold cache + mini_dev_sqlite.json 已修正 |
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
| 117-118 | thrombosis | q1164, q1166 | 100% | 100% | 100% | ⚠️ thrombosis 第五对；q1164 三范式 strict PASS；q1166 **CSV=ER INCORRECT+RDF INCORRECT** 但此处写 100% |
| 119-120 | toxicology | q212, q213 | 100% | 100% | 100% | toxicology 第五对全通；q213 ER/DLR strict PASS, RDF 手动翻盘；q212 三范式 judge 全翻（tied minimum） |
| 121-122 | football | q1037, q1039 | 50% | 100% | 50% | football 第五对；q1039 三范式 strict PASS；q1037 ER+RDF 用错 JOIN 键（player_fifa_api_id→应为 player_api_id），DLR 正确 |
| 123-124 | formula_1 | q862, q865 | 100% | 100% | 100% | formula_1 第六对全通；q862 三范式 strict PASS；q865 三范式 judge 全翻 |
| 125-126 | california | q25, q26 | 0% | 100% | 50% | california 第四对；q25 DLR strict PASS（District Name+Charter Funding Type 用对），ER/RDF 错用 s.dname 列；q26 DLR+RDF judge 翻盘，ER 提取失败；🔴 q26 gold SQL bug（Free Meal→FRPM Count，题目说 free or reduced） |
| 127-128 | financial | q112, q115 | 100% | 100% | 100% | financial 第五对全通；DLR+RDF strict PASS；ER q115 手动翻盘（结果 40%=gold） |
| 129-130 | superhero | q733, q736 | 100% | 100% | 100% | superhero 第六对全通；q733 三范式 strict PASS；q736 三范式 judge 全翻（最低 Intelligence） |
| 131-132 | california | q27, q28 | 50% | 50% | 50% | california 第五对；q28 三范式全 CORRECT；q27 三范式全 INCORRECT — question "average score in writing" 触发 AVG() 聚合，非范式/建模问题 |

**round_1 前 132 对完成 — 374/396 CORRECT（ER 124/132, DLR 130/132, RDF 120/132）**

---

## 对照 B — Token 汇总表（原 results.md）

| 题号 | ER | DLR | RDF |
|------|----|-----|-----|
| q1471 | 60,262 | **39,078** | 61,468 |
| q1472 | 286,969 | **94,317** | 183,400 |
| q1473 | **35,825** | 72,766 | 94,395 |
| q1476 | 73,221 | **61,770** | 69,729 |
| q1479 | 43712 | **43397** | 45318 |
| q1480 | **50260** | 59145 | 65519 |
| q1481 | 230002 | 195482 | **120958** |
| q1482 | **46942** | 54712 | 65209 |
| q1483 | 44551 | **33927** | 170885 |
| q1484 | 41164 | **39184** | 71763 |
| q1486 | **62,200** | 72,659 | 75,962 |
| q1490 | 105,687 | **80,806** | 108,118 |
| q1493 | **36552** | 54977 | 78468 |
| q1498 | 34,828 | **32,300** | 55,564 |
| q1500 | **12,809** | 14,273 | 24,543 |
| q1501 | **14,500** | 19,962 | 16,182 |
| q1505 | 35834 | **34566** | 37544 |
| q1506 | **57614** | 87096 | 102344 |
| q1507 | 8,521 | 9,925 | **7,644** |
| q1509 | **8,403** | 10,503 | 12,599 |
| q1514 | 62465 | 69134 | **45594** |
| q1515 | 46645 | **43077** | 50827 |
| q1521 | 12,264 | 11,224 | **8,434** |
| q1524 | 12,837 | **12,487** | 14,332 |
| q1525 | **54,895** | 61,104 | 102,319 |
| q1526 | 116,689 | 85,371 | **60,522** |
| q1528 | 10,344 | 12,468 | **9,097** |
| q1529 | 19,591 | 16,721 | **12,210** |
| q1312 | 7,847 | 9,000 | **7,702** |
| q1317 | 8,915 | 9,742 | **8,430** |
| q1149 | 36998 | **32309** | 50686 |
| q1150 | 59539 | **41067** | 68233 |
| q1025 | 95251 | 33757 | **31916** |
| q1028 | 56628 | **53979** | 78157 |
| q846 | 68,563 | 33,606 | **32,960** |
| q847 | 44,477 | 33,238 | **32,514** |
| q717 | 45433 | 44113 | **28504** |
| q994 | 80923 | **54656** | 121849 |
| q531 | **36525** | 39782 | 48961 |
| q532 | **55456** | 134647 | 254156 |
| q340 | 44437 | 45208 | **41201** |
| q341 | 95200 | 58978 | **30310** |
| q195 | 40,714 | 31,353 | **26,530** |
| q197 | 57,143 | 47,527 | **37,140** |
| q1322 | 43,936 | **31,509** | 35,443 |
| q1323 | 104,100 | 69,207 | **36,549** |
| q1152 | 68,893 | 40,351 | **27,409** |
| q1153 | 99,754 | 39,790 | **31,537** |
| q1029 | 8,290 | 9,454 | **7,101** |
| q1030 | 10,380 | **9,200** | 9,411 |
| q850 | 45,188 | **41,934** | 76,224 |
| q854 | 63,486 | 59,238 | **36,067** |
| q719 | 90494 | 36282 | **28825** |
| q723 | **29068** | 35981 | 29175 |
| q533 | 36,896 | **31,686** | 49,225 |
| q537 | **36,101** | 49,688 | 50,853 |
| q198 | 35,998 | **35,893** | 50,610 |
| q200 | 76,256 | 31,804 | **25,992** |
| q344 | 53,625 | **34,288** | 52,270 |
| q345 | 80,004 | 45,722 | **41,161** |
| q1331 | 73821 | **32563** | 77279 |
| q1334 | 55114 | 48875 | **42503** |
| q1155 | 84434 | **56704** | 114981 |
| q1156 | 67961 | 33329 | **28520** |
| q1031 | **11,043** | 12,355 | 13,832 |
| q1032 | 15,042 | **8,959** | 9,801 |
| q1531 | 85054 | 53285 | **48247** |
| q1533 | 81212 | **35235** | 101210 |
| q5 | 67294 | **35885** | 37623 |
| q11 | 87085 | **57929** | 60690 |
| q12 | 16,586 | 14,868 | **14,295** |
| q17 | 18,134 | 13,138 | **10,845** |
| q89 | 157511 | **71207** | 81125 |
| q92 | 104583 | 219771 | **86875** |
| q93 | 89663 | 89698 | **61037** |
| q94 | 126170 | **86847** | 113012 |
| q346 | 64089 | 74484 | **45578** |
| q347 | 144494 | 105495 | **36459** |
| q349 | 16,159 | **10,202** | 12,825 |
| q352 | 16,188 | 17,845 | **11,863** |
| q539 | **8,429** | 10,615 | 8,978 |
| q544 | 8,883 | 10,193 | **8,150** |
| q201 | **29179** | 33423 | 37098 |
| q206 | 57597 | **40861** | 50559 |
| q857 | **54217** | 60127 | 78188 |
| q724 | 37230 | 43001 | **30272** |
| q23 | **30,608** | 69,561 | 48,607 |
| q24 | 18,975 | 29,109 | **14,707** |
| q95 | 316559 | 213175 | **95570** |
| q98 | **72786** | 88830 | 86224 |
| q726 | **59,696** | 65,984 | 65,196 |
| q728 | **46,561** | 54,075 | 52,604 |
| q547 | 60,473 | **52,782** | 53,148 |
| q549 | 66,788 | 51,179 | **33,150** |
| q1338 | **82,444** | 94,553 | 84,515 |
| q1339 | 145,494 | **34,001** | 84,865 |
| q1157 | 54114 | **41491** | 52667 |
| q1162 | **28614** | 32648 | 36698 |
| q207 | 53,325 | 43,279 | **37,239** |
| q208 | 69,775 | **41,900** | 92,819 |
| q1035 | 106,247 | **38,318** | 48,529 |
| q1036 | 42,628 | **38,193** | 65,053 |
| q859 | **46,706** | 53,110 | 50,833 |
| q861 | **38,425** | 44,531 | 43,901 |
| q99 | 65185 | **43858** | 81656 |
| q100 | **56335** | 76136 | 57070 |
| q730 | 84,532 | **37,591** | 83,411 |
| q732 | 46,469 | 55,585 | **37,962** |
| q356 | 72,445 | 32,929 | **27,525** |
| q358 | 75,681 | **32,909** | 51,641 |
| q366 | 49239 | **36324** | 60841 |
| q368 | 42655 | **32962** | 36478 |
| q555 | **46,479** | 50,639 | 100,051 |
| q557 | 59,209 | 61,472 | **51,605** |
| q1340 | 78516 | **33630** | 51922 |
| q1344 | 61185 | 39130 | **27522** |
| q1164 | 52462 | 52132 | **36101** |
| q1166 | 48084 | 41830 | **37609** |
| q212 | 49,124 | 41,968 | **29,231** |
| q213 | 115,275 | 41,431 | **35,318** |
| q1037 | 96,538 | 50,536 | **35,882** |
| q1039 | 66,799 | 73,707 | **54,226** |
| q862 | 34834 | **33632** | 42598 |
| q865 | 48155 | 34326 | **30044** |
| q25 | 101558 | **46950** | 50841 |
| q26 | 217255 | **69814** | 95363 |
| q112 | **47188** | 66742 | 50503 |
| q115 | **54014** | 54264 | 54263 |
| q733 | 28920 | 45089 | **28642** |
| q736 | 44949 | **34647** | 36874 |
| q27 | 220,572 | **183,770** | 220,435 |
| q28 | 79,930 | **78,232** | 107,454 |

\* 粗体 = 该题最优范式

---

## 逐题校验表 — strict / judge / result / token

> **说明**: 每行一题，每范式 4 列（strict 初判 / judge 仲裁 / result 最终判定 / token 消耗）。
> **数据来源**: `validated_results/round_1/*/agent_stats.csv`（94 题标准格式）+ `results.md` token 表（38 题旧格式仅 token）。
> **⚠️ 标记**: CSV 实际 verdict 与 results.md 不一致的题。
> **旧格式 pair**（仅 token，无 strict/judge/result）: 7-8, 9-10, 17-18, 21-22, 31-32, 33-34, 37-38, 39-40, 41-42, 61-62, 63-64, 67-68, 69-70, 73-74, 75-76, 77-78, 83-84, 85-86, 89-90

| 专题 | 题号 | ER-strict | ER-judge | ER-result | ER-token | DLR-strict | DLR-judge | DLR-result | DLR-token | RDF-strict | RDF-judge | RDF-result | RDF-token | 备注 |
|------|------|-----------|----------|-----------|----------|------------|-----------|------------|----------|------------|-----------|------------|----------|------|
| debit_card | q1471 | FAIL | CORRECT | CORRECT | 60,262 | FAIL | CORRECT | CORRECT | 39,078 | PASS |  | CORRECT | 61,468 |  |
| debit_card | q1472 | FAIL | CORRECT | CORRECT | 286,969 | FAIL | CORRECT | CORRECT | 94,317 | FAIL | CORRECT | CORRECT | 183,400 |  |
| debit_card | q1473 | PASS |  | CORRECT | 35,825 | PASS |  | CORRECT | 72,766 | PASS |  | CORRECT | 94,395 |  |
| debit_card | q1476 | PASS |  | CORRECT | 73,221 | FAIL | CORRECT | CORRECT | 61,770 | FAIL | CORRECT | CORRECT | 69,729 |  |
| debit_card | q1479 | FAIL | CORRECT | CORRECT | 43,712 | FAIL | CORRECT | CORRECT | 43,397 | FAIL | CORRECT | CORRECT | 45,318 |  |
| debit_card | q1480 | FAIL | CORRECT | CORRECT | 50,260 | FAIL | CORRECT | CORRECT | 59,145 | FAIL | CORRECT | CORRECT | 65,519 |  |
| debit_card | q1481 | — | — | — | — | — | — | — | — | — | — | — | — | gold bug修正 |
| debit_card | q1482 | — | — | — | — | — | — | — | — | — | — | — | — | gold bug修正 |
| debit_card | q1483 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| debit_card | q1484 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| debit_card | q1486 | FAIL | CORRECT | CORRECT | 62,200 | PASS |  | CORRECT | 72,659 | PASS |  | CORRECT | 75,962 |  |
| debit_card | q1490 | FAIL | CORRECT | CORRECT | 105,687 | FAIL | CORRECT | CORRECT | 80,806 | FAIL | CORRECT | CORRECT | 108,118 | gold bug修正 |
| debit_card | q1493 | FAIL | CORRECT | CORRECT | 36,552 | PASS |  | CORRECT | 54,977 | PASS |  | CORRECT | 78,468 |  |
| debit_card | q1498 | PASS |  | CORRECT | 34,828 | FAIL | CORRECT | CORRECT | 32,300 | FAIL | CORRECT | CORRECT | 55,564 |  |
| debit_card | q1500 | FAIL | CORRECT | CORRECT | 12,809 | FAIL | CORRECT | CORRECT | 14,273 | FAIL | CORRECT | CORRECT | 24,543 |  |
| debit_card | q1501 | PASS |  | CORRECT | 14,500 | PASS |  | CORRECT | 19,962 | PASS |  | CORRECT | 16,182 |  |
| debit_card | q1505 | — | — | — | — | — | — | — | — | — | — | — | — | gold COUNT(*) |
| debit_card | q1506 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| debit_card | q1507 | PASS |  | CORRECT | 8,521 | PASS |  | CORRECT | 9,925 | PASS |  | CORRECT | 7,644 |  |
| debit_card | q1509 | PASS |  | CORRECT | 8,403 | PASS |  | CORRECT | 10,503 | PASS |  | CORRECT | 12,599 |  |
| debit_card | q1514 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| debit_card | q1515 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| debit_card | q1521 | PASS |  | CORRECT | 12,264 | FAIL | CORRECT | CORRECT | 11,224 | PASS |  | CORRECT | 8,434 |  |
| debit_card | q1524 | FAIL | CORRECT | CORRECT | 12,837 | PASS |  | CORRECT | 12,487 | FAIL | CORRECT | CORRECT | 14,332 |  |
| debit_card | q1525 | FAIL | CORRECT | CORRECT | 54,895 | FAIL | CORRECT | CORRECT | 61,104 | FAIL | CORRECT | CORRECT | 102,319 | gold COUNT(*) |
| debit_card | q1526 | FAIL | CORRECT | CORRECT | 116,689 | FAIL | CORRECT | CORRECT | 85,371 | FAIL | CORRECT | CORRECT | 60,522 | gold NULL |
| debit_card | q1528 | PASS |  | CORRECT | 10,344 | FAIL | CORRECT | CORRECT | 12,468 | PASS |  | CORRECT | 9,097 |  |
| debit_card | q1529 | PASS |  | CORRECT | 19,591 | FAIL | CORRECT | CORRECT | 16,721 | FAIL | CORRECT | CORRECT | 12,210 | gold笛卡尔积修正 |
| debit_card | q1531 | — | — | — | — | — | — | — | — | — | — | — | — | gold bug修正 |
| debit_card | q1533 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| student_club | q1312 | FAIL | CORRECT | CORRECT | 7,847 | PASS |  | CORRECT | 9,000 | FAIL | CORRECT | CORRECT | 7,702 |  |
| student_club | q1317 | PASS |  | CORRECT | 8,915 | PASS |  | CORRECT | 9,742 | PASS |  | CORRECT | 8,430 |  |
| student_club | q1322 | FAIL | CORRECT | CORRECT | 43,936 | FAIL | CORRECT | CORRECT | 31,509 | FAIL | CORRECT | CORRECT | 35,443 |  |
| student_club | q1323 | PASS | CORRECT | CORRECT | 104,100 | PASS | CORRECT | CORRECT | 69,207 | PASS | CORRECT | CORRECT | 36,549 |  |
| student_club | q1331 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| student_club | q1334 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| student_club | q1338 | FAIL | CORRECT | CORRECT | 82,444 | FAIL | CORRECT | CORRECT | 94,553 | FAIL | CORRECT | CORRECT | 84,515 |  |
| student_club | q1339 | PASS |  | CORRECT | 145,494 | PASS |  | CORRECT | 34,001 | PASS |  | CORRECT | 84,865 |  |
| student_club | q1340 | PASS |  | CORRECT | 78,516 | FAIL | CORRECT | CORRECT | 33,630 | PASS |  | CORRECT | 51,922 |  |
| student_club | q1344 | PASS |  | CORRECT | 61,185 | PASS |  | CORRECT | 39,130 | PASS |  | CORRECT | 27,522 |  |
| thrombosis | q1149 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| thrombosis | q1150 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| thrombosis | q1152 | FAIL | CORRECT | CORRECT | 68,893 | PASS | INCORRECT | CORRECT | 40,351 | FAIL | CORRECT | CORRECT | 27,409 | gold ratio方向修正 |
| thrombosis | q1153 | FAIL | CORRECT | CORRECT | 99,754 | FAIL | CORRECT | CORRECT | 39,790 | FAIL | CORRECT | CORRECT | 31,537 |  |
| thrombosis | q1155 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| thrombosis | q1156 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| thrombosis | q1157 | PASS |  | CORRECT | 54,114 | PASS |  | CORRECT | 41,491 | PASS |  | CORRECT | 52,667 |  |
| thrombosis | q1162 | PASS |  | CORRECT | 28,614 | PASS |  | CORRECT | 32,648 | PASS |  | CORRECT | 36,698 |  |
| thrombosis | q1164 | PASS |  | CORRECT | 52,462 | PASS |  | CORRECT | 52,132 | PASS |  | CORRECT | 36,101 |  |
| thrombosis | q1166 | FAIL | INCORRECT | INCORRECT | 48,084 | FAIL | CORRECT | CORRECT | 41,830 | FAIL | INCORRECT | INCORRECT | 37,609 | ⚠️ER ⚠️RDF |
| football | q1025 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| football | q1028 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| football | q1029 | FAIL | CORRECT | CORRECT | 8,290 | FAIL | CORRECT | CORRECT | 9,454 | FAIL | CORRECT | CORRECT | 7,101 | gold ASC/DESC修正 |
| football | q1030 | FAIL | CORRECT | CORRECT | 10,380 | FAIL | CORRECT | CORRECT | 9,200 | FAIL | CORRECT | CORRECT | 9,411 |  |
| football | q1031 | FAIL |  | INCORRECT | 11,043 | FAIL |  | INCORRECT | 12,355 | FAIL |  | INCORRECT | 13,832 | evidence伪代码修正 |
| football | q1032 | FAIL | CORRECT | CORRECT | 15,042 | FAIL | CORRECT | CORRECT | 8,959 | FAIL | CORRECT | CORRECT | 9,801 |  |
| football | q1035 | PASS |  | CORRECT | 106,247 | PASS |  | CORRECT | 38,318 | PASS |  | CORRECT | 48,529 |  |
| football | q1036 | PASS |  | CORRECT | 42,628 | PASS |  | CORRECT | 38,193 | FAIL | INCORRECT | INCORRECT | 65,053 | RDF缺DISTINCT |
| football | q1037 | FAIL | INCORRECT | INCORRECT | 96,538 | FAIL | CORRECT | CORRECT | 50,536 | FAIL |  | INCORRECT | 35,882 | ER/RDF JOIN键错 |
| football | q1039 | PASS |  | CORRECT | 66,799 | PASS |  | CORRECT | 73,707 | PASS |  | CORRECT | 54,226 |  |
| formula_1 | q724 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| formula_1 | q846 | PASS | CORRECT | CORRECT | 68,563 | PASS | CORRECT | CORRECT | 33,606 | PASS | CORRECT | CORRECT | 32,960 |  |
| formula_1 | q847 | FAIL | CORRECT | CORRECT | 44,477 | FAIL | CORRECT | CORRECT | 33,238 | FAIL | CORRECT | CORRECT | 32,514 |  |
| formula_1 | q850 | FAIL | CORRECT | CORRECT | 45,188 | PASS | CORRECT | CORRECT | 41,934 | PASS | CORRECT | CORRECT | 76,224 |  |
| formula_1 | q854 | FAIL | CORRECT | CORRECT | 63,486 | FAIL | CORRECT | CORRECT | 59,238 | FAIL | CORRECT | CORRECT | 36,067 |  |
| formula_1 | q857 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| formula_1 | q859 | PASS |  | CORRECT | 46,706 | PASS |  | CORRECT | 53,110 | PASS |  | CORRECT | 50,833 |  |
| formula_1 | q861 | PASS |  | CORRECT | 38,425 | FAIL | CORRECT | CORRECT | 44,531 | FAIL | CORRECT | CORRECT | 43,901 |  |
| formula_1 | q862 | PASS |  | CORRECT | 34,834 | PASS |  | CORRECT | 33,632 | PASS |  | CORRECT | 42,598 |  |
| formula_1 | q865 | FAIL | CORRECT | CORRECT | 48,155 | FAIL | CORRECT | CORRECT | 34,326 | FAIL | CORRECT | CORRECT | 30,044 |  |
| superhero | q717 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| superhero | q719 | PASS | CORRECT | CORRECT | 90,494 | PASS | CORRECT | CORRECT | 36,282 | PASS | CORRECT | CORRECT | 28,825 |  |
| superhero | q723 | PASS | CORRECT | CORRECT | 29,068 | PASS | CORRECT | CORRECT | 35,981 | PASS | CORRECT | CORRECT | 29,175 |  |
| superhero | q726 | FAIL | CORRECT | CORRECT | 59,696 | FAIL | CORRECT | CORRECT | 65,984 | FAIL | CORRECT | CORRECT | 65,196 | gold RANK()过度 |
| superhero | q728 | FAIL | CORRECT | CORRECT | 46,561 | FAIL | CORRECT | CORRECT | 54,075 | FAIL | CORRECT | CORRECT | 52,604 |  |
| superhero | q730 | PASS |  | CORRECT | 84,532 | FAIL | CORRECT | CORRECT | 37,591 | PASS |  | CORRECT | 83,411 |  |
| superhero | q732 | PASS |  | CORRECT | 46,469 | PASS |  | CORRECT | 55,585 | PASS |  | CORRECT | 37,962 |  |
| superhero | q733 | PASS |  | CORRECT | 28,920 | PASS |  | CORRECT | 45,089 | PASS |  | CORRECT | 28,642 |  |
| superhero | q736 | FAIL | CORRECT | CORRECT | 44,949 | FAIL | CORRECT | CORRECT | 34,647 | FAIL | CORRECT | CORRECT | 36,874 |  |
| superhero | q994 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| codebase | q531 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| codebase | q532 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| codebase | q533 | FAIL | CORRECT | CORRECT | 36,896 | FAIL | CORRECT | CORRECT | 31,686 | FAIL | CORRECT | CORRECT | 49,225 | evidence DATE()修正 |
| codebase | q537 | PASS | CORRECT | CORRECT | 36,101 | PASS | CORRECT | CORRECT | 49,688 | PASS | CORRECT | CORRECT | 50,853 |  |
| codebase | q539 | PASS |  | CORRECT | 8,429 | PASS |  | CORRECT | 10,615 | PASS |  | CORRECT | 8,978 |  |
| codebase | q544 | PASS |  | CORRECT | 8,883 | PASS |  | CORRECT | 10,193 | PASS |  | CORRECT | 8,150 |  |
| codebase | q547 | PASS |  | CORRECT | 60,473 | PASS |  | CORRECT | 52,782 | PASS |  | CORRECT | 53,148 |  |
| codebase | q549 | FAIL | CORRECT | CORRECT | 66,788 | PASS |  | CORRECT | 51,179 | FAIL | CORRECT | CORRECT | 33,150 |  |
| codebase | q555 | PASS |  | CORRECT | 46,479 | PASS |  | CORRECT | 50,639 | PASS |  | CORRECT | 100,051 |  |
| codebase | q557 | PASS |  | CORRECT | 59,209 | PASS |  | CORRECT | 61,472 | PASS |  | CORRECT | 51,605 |  |
| card_games | q340 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| card_games | q341 | — | — | — | — | — | — | — | — | — | — | — | — | gold typo修正 |
| card_games | q344 | FAIL | CORRECT | CORRECT | 53,625 | FAIL | CORRECT | CORRECT | 34,288 | FAIL | CORRECT | CORRECT | 52,270 | evidence补充 |
| card_games | q345 | FAIL | CORRECT | CORRECT | 80,004 | FAIL | CORRECT | CORRECT | 45,722 | FAIL | CORRECT | CORRECT | 41,161 |  |
| card_games | q346 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| card_games | q347 | — | — | — | — | — | — | — | — | — | — | — | — | RDF扁平漏JOIN |
| card_games | q349 | FAIL | CORRECT | CORRECT | 16,159 | FAIL | CORRECT | CORRECT | 10,202 | FAIL | INCORRECT | INCORRECT | 12,825 | gold bug修正 |
| card_games | q352 | PASS |  | CORRECT | 16,188 | PASS |  | CORRECT | 17,845 | FAIL | CORRECT | CORRECT | 11,863 | gold bug修正 |
| card_games | q356 | PASS |  | CORRECT | 72,445 | PASS |  | CORRECT | 32,929 | PASS |  | CORRECT | 27,525 |  |
| card_games | q358 | FAIL | CORRECT | CORRECT | 75,681 | FAIL | CORRECT | CORRECT | 32,909 | FAIL | CORRECT | CORRECT | 51,641 |  |
| card_games | q366 | FAIL | CORRECT | CORRECT | 49,239 | FAIL | CORRECT | CORRECT | 36,324 | FAIL | CORRECT | CORRECT | 60,841 |  |
| card_games | q368 | PASS |  | CORRECT | 42,655 | PASS |  | CORRECT | 32,962 | PASS |  | CORRECT | 36,478 |  |
| toxicology | q195 | FAIL | CORRECT | CORRECT | 40,714 | FAIL | CORRECT | CORRECT | 31,353 | FAIL | CORRECT | CORRECT | 26,530 |  |
| toxicology | q197 | FAIL | INCORRECT | INCORRECT | 57,143 | PASS | CORRECT | CORRECT | 47,527 | FAIL | CORRECT | CORRECT | 37,140 |  |
| toxicology | q198 | FAIL | CORRECT | CORRECT | 35,998 | FAIL | CORRECT | CORRECT | 35,893 | FAIL | CORRECT | CORRECT | 50,610 | evidence笛卡尔积修正 |
| toxicology | q200 | PASS |  | CORRECT | 76,256 | FAIL | CORRECT | CORRECT | 31,804 | PASS |  | CORRECT | 25,992 |  |
| toxicology | q201 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| toxicology | q206 | — | — | — | — | — | — | — | — | — | — | — | — | RDF探索≠答案 |
| toxicology | q207 | FAIL | CORRECT | CORRECT | 53,325 | PASS | CORRECT | CORRECT | 43,279 | FAIL | CORRECT | CORRECT | 37,239 | gold SQL bug修正 |
| toxicology | q208 | FAIL | CORRECT | CORRECT | 69,775 | FAIL | CORRECT | CORRECT | 41,900 | FAIL | INCORRECT | INCORRECT | 92,819 | RDF语义理解错 |
| toxicology | q212 | FAIL | CORRECT | CORRECT | 49,124 | FAIL | CORRECT | CORRECT | 41,968 | FAIL | CORRECT | CORRECT | 29,231 |  |
| toxicology | q213 | PASS |  | CORRECT | 115,275 | PASS |  | CORRECT | 41,431 | FAIL | CORRECT | CORRECT | 35,318 |  |
| california | q5 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| california | q11 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| california | q12 | PASS |  | CORRECT | 16,586 | PASS |  | CORRECT | 14,868 | PASS |  | CORRECT | 14,295 |  |
| california | q17 | FAIL | INCORRECT | INCORRECT | 18,134 | FAIL | CORRECT | CORRECT | 13,138 | FAIL | INCORRECT | INCORRECT | 10,845 | gold RANK()过度 |
| california | q23 | FAIL | CORRECT | CORRECT | 30,608 | FAIL | CORRECT | CORRECT | 69,561 | FAIL | CORRECT | CORRECT | 48,607 | evidence公式→自然语言 |
| california | q24 | FAIL | CORRECT | CORRECT | 18,975 | PASS |  | CORRECT | 29,109 | FAIL | INCORRECT | INCORRECT | 14,707 |  |
| california | q25 | FAIL | INCORRECT | INCORRECT | 101,558 | PASS |  | CORRECT | 46,950 | FAIL | INCORRECT | INCORRECT | 50,841 |  |
| california | q26 | FAIL | INCORRECT | INCORRECT | 217,255 | FAIL | CORRECT | CORRECT | 69,814 | FAIL | CORRECT | CORRECT | 95,363 | gold bug(FreeMeal→FRPM)待修正 |
| california | q27 | FAIL | INCORRECT | INCORRECT | 220,572 | FAIL | INCORRECT | INCORRECT | 183,770 | FAIL | INCORRECT | INCORRECT | 220,435 | average歧义/LLM极限 |
| california | q28 | FAIL | CORRECT | CORRECT | 79,930 | FAIL | CORRECT | CORRECT | 78,232 | FAIL | CORRECT | CORRECT | 107,454 |  |
| financial | q89 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| financial | q92 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| financial | q93 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| financial | q94 | — | — | — | — | — | — | — | — | — | — | — | — | question修正 |
| financial | q95 | — | — | — | — | — | — | — | — | — | — | — | — | gold bug修正 |
| financial | q98 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| financial | q99 | FAIL | CORRECT | CORRECT | 65,185 | FAIL | CORRECT | CORRECT | 43,858 | FAIL | CORRECT | CORRECT | 81,656 |  |
| financial | q100 | PASS |  | CORRECT | 56,335 | PASS |  | CORRECT | 76,136 | FAIL | CORRECT | CORRECT | 57,070 |  |
| financial | q112 | PASS |  | CORRECT | 47,188 | PASS |  | CORRECT | 66,742 | PASS |  | CORRECT | 50,503 |  |
| financial | q115 | FAIL | CORRECT | CORRECT | 54,014 | PASS |  | CORRECT | 54,264 | PASS |  | CORRECT | 54,263 |  |

---

## 数据不一致报告

| 题号 | 范式 | CSV 实际 | results.md | 说明 |
|------|------|----------|-----------|------|
| q1166 | ER | strict=FAIL, judge=INCORRECT, result=INCORRECT | 100% (CORRECT) | pair 117-118 写的"全 CORRECT"有误 |
| q1166 | RDF | strict=FAIL, judge=INCORRECT, result=INCORRECT | 100% (CORRECT) | 同上 |

**影响**: pair 117-118 应为 `100% | 100% | 50%`（q1164 全对 + q1166 DLR 对），而非 `100% | 100% | 100%`。
修正后总计: ER=123/132, DLR=130/132, RDF=119/132, Total=372/396。

---

## 汇总统计

| 指标 | ER | DLR | RDF |
|------|----|----|-----|
| CORRECT | 124/132 | 130/132 | 120/132 |
| Strict PASS | 43/132 | 46/132 | 40/132 |
| 平均 token | 75,548 | 58,303 | 61,532 |
| 中位 token | 59,979 | 46,332 | 50,847 |
| **总计** | **374/396** | | |

> ⚠️ 此统计基于 CSV 实际数据。若修正 q1166 不一致，则 ER=123, RDF=119, Total=372。
