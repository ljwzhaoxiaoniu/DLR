## 逐题校验表 — strict / judge / result / token

> **说明**: 每行一题，每范式 4 列（strict 初判 / judge 仲裁 / result 最终判定 / token 消耗）。
> **数据来源**: `validated_results/round_1/*/agent_stats.csv` + `results.md` token 表。
> **⚠️ 标记**: CSV 实际 verdict 与 results.md 不一致的题。

## 评测进度

> mini_dev 全量 500 题，当前已评测 150 题（30.0%）。已评测按专题分布：

| 数据库 | 全量 | 已评 | 剩余 | 进度 |
|--------|------|------|------|------|
| debit_card_specializing | 30 | 30 | 0 | 100% ✅ |
| card_games | 52 | 12 | 40 | 23.1% |
| california_schools | 30 | 12 | 18 | 40.0% |
| financial | 32 | 12 | 20 | 37.5% |
| toxicology | 40 | 12 | 28 | 30.0% |
| student_club | 48 | 12 | 36 | 25.0% |
| codebase_community | 49 | 12 | 37 | 24.5% |
| thrombosis_prediction | 50 | 12 | 38 | 24.0% |
| european_football_2 | 51 | 12 | 39 | 23.5% |
| superhero | 52 | 12 | 40 | 23.1% |
| formula_1 | 66 | 12 | 54 | 18.2% |
| **合计** | **500** | **150** | **350** | **30.0%** |

> **总结**：共测试 150 题 × 3 范式 = **450 题次**。
> | 指标 | ER | DLR | RDF |
> |------|----|-----|-----|
> | CORRECT | 139/150 (92.7%) | **148/150 (98.7%)** | 135/150 (90.0%) |
> | strict PASS | 70/150 (46.7%) | **73/150 (48.7%)** | 65/150 (43.3%) |
> | 平均 token | 64,583 | **53,463** (−17.2% vs ER) | 54,096 (−16.2% vs ER) |

| 专题 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 数据集备注 | 备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|----------|------|
| debit_card | q1471 | FAIL | CORRECT | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 42,421 | **42,041** | 61,762 |  | RDF唯一strict PASS |
| debit_card | q1472 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **53,755** | 71,029 | 128,238 |  | RDF 128K→SPARQL冗余嵌套 |
| debit_card | q1473 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 59,592 | 43,327 | **28,355** |  |  |
| debit_card | q1476 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 49,249 | **46,208** | 98,442 |  | RDF 98K→SPARQL冗余 |
| debit_card | q1479 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 43,712 | **43,397** | 101,068 |  | RDF 101K→SPARQL冗余 |
| debit_card | q1480 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 50,260 | 36,425 | **27,664** |  |  |
| debit_card | q1481 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 230,002 | **74,821** | 112,247 | gold bug(未过滤最低消费客户) | ER 230K极高→嵌套子查询路径膨胀；DLR 75K→PAS精准 |
| debit_card | q1482 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **46,942** | 56,468 | 110,413 | gold bug(分母应为2013) | RDF 110K→SPARQL冗余 |
| debit_card | q1483 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 44,551 | **33,927** | 170,885 |  | RDF 171K(5x DLR)→SPARQL冗余嵌套 |
| debit_card | q1484 | FAIL | CORRECT | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 41,164 | **39,184** | 60,725 |  |  |
| debit_card | q1486 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **62,200** | 113,827 | 77,100 |  | DLR 114K偏高→重试；DLR strict PASS→PAS单步定位 |
| debit_card | q1490 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **54,488** | 102,516 | 93,410 | gold bug(两轮修正) | gold bug两轮修正→三范式均反复探索 |
| debit_card | q1493 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **36,552** | 44,333 | 66,199 |  |  |
| debit_card | q1498 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 34,828 | 33,505 | **29,178** |  | DLR三次误用MAX(Consumption)而非SUM→GROUP BY→MAX→LLM聚合语义盲区 |
| debit_card | q1500 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 118,035 | **107,280** | 158,025 |  | ARCS(DLR独创概念)→三表JOIN；RDF 158K最高→SPARQL无锚定键概念 |
| debit_card | q1501 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 153,328 | 147,662 | **100,653** |  | 高成本题→三范式均>100K |
| debit_card | q1505 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **35,834** | 43,115 | 65,513 | gold语义偏差(COUNT(*)非客户数) | gold COUNT(*)计人次→三范式用COUNT(DISTINCT)更忠实 |
| debit_card | q1506 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 57,614 | 60,086 | **46,527** |  |  |
| debit_card | q1507 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 37,159 | **33,634** | 33,760 |  |  |
| debit_card | q1509 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **36,451** | 37,094 | 64,631 |  | RDF 65K→SPARQL冗余 |
| debit_card | q1514 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 62,465 | 67,172 | **45,594** |  |  |
| debit_card | q1515 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 46,645 | **43,077** | 50,827 |  |  |
| debit_card | q1521 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 29,243 | 43,894 | **27,982** |  |  |
| debit_card | q1524 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 89,050 | 123,025 | **67,717** |  | ER全互联FK反而误导Agent→按需暴露优于全量；DLR 123K偏高 |
| debit_card | q1525 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **54,895** | 61,104 | 79,322 | gold同1505缺陷 |  |
| debit_card | q1526 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 116,689 | 85,371 | **60,522** | gold返回NULL(子查询无匹配) | ER 117K→gold NULL导致多轮重试；DLR/RDF绕过缺陷 |
| debit_card | q1528 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 78,950 | 97,956 | **56,564** |  |  |
| debit_card | q1529 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **81,442** | 85,677 | 90,094 | gold笛卡尔积bug(已修正cache) | ★RDF INCORRECT→扁平triple无属性归属，被transactions_1k吸走忽略yearmonth.Consumption；DLR strict PASS→LE public属性Consumption正确引导 |
| debit_card | q1531 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 38,393 | 33,805 | **30,900** | 数据集无矛盾(evidence/gold SQL/gold cache均为SUM(Price)/SUM(Amount)=22.55) |  |
| debit_card | q1533 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 48,735 | **35,235** | 40,489 |  | DLR最低→PAS语义桥精准定位 |
| student_club | q1312 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 49,351 | **40,382** | 47,942 |  |  |
| student_club | q1317 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 38,963 | **34,492** | 37,558 |  |  |
| student_club | q1322 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 43,936 | **31,509** | 35,443 |  |  |
| student_club | q1323 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 104,100 | 51,642 | **28,111** |  | ER偏高→多表探索；DLR→PAS直达 |
| student_club | q1331 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 73,821 | **32,563** | 77,279 |  | DLR 33K(ER的44%)→LE public属性直接命中目标列 |
| student_club | q1334 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 55,114 | 48,875 | **42,503** |  |  |
| student_club | q1338 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 79,177 | **7,255** | 84,515 |  | DLR 7K极低→PAS+public属性一击命中；ER/RDF需多轮探索 |
| student_club | q1339 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 92,433 | **14,929** | 75,856 |  | DLR 15K(ER的1/6)→Expense独立LE+PAS 4步；ER需25步探索→碎表聚合 |
| student_club | q1340 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 52,963 | **33,630** | 45,518 |  | DLR 34K(ER的64%)→LE public属性暴露关键列名 |
| student_club | q1344 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 61,185 | 39,130 | **27,522** |  |  |
| student_club | q1346 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 103,071 | 112,104 | **58,878** |  | q1346 查 Carlo Jacobs 电话；三范式 strict PASS |
| student_club | q1350 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **86,683** | 91,389 | 79,538 |  | q1350 expense→budget→event_status；三范式 strict PASS |
| thrombosis | q1149 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 36,998 | 32,309 | **28,505** |  |  |
| thrombosis | q1150 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 59,539 | 31,879 | **26,391** |  |  |
| thrombosis | q1152 | FAIL | CORRECT | PASS | | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 68,893 | 40,351 | **27,409** | gold ratio方向反(门诊/住院→住院/门诊) | gold ratio方向反→DLR/RDF正确算出0.76 |
| thrombosis | q1153 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 99,754 | 37,227 | **31,537** |  | ER 100K→多表JOIN探索；DLR→PAS精准 |
| thrombosis | q1155 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 84,434 | **56,704** | 114,981 |  | RDF 115K→SPARQL多条件FILTER+OPTIONAL膨胀 |
| thrombosis | q1156 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 67,961 | 33,329 | **28,520** |  |  |
| thrombosis | q1157 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 54,114 | **41,491** | 52,667 |  |  |
| thrombosis | q1162 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **28,614** | 32,648 | 36,698 |  |  |
| thrombosis | q1164 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 52,462 | 52,132 | **36,101** |  |  |
| thrombosis | q1166 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | INCORRECT | INCORRECT | CORRECT | INCORRECT | 48,084 | 41,830 | **37,609** |  | ★ER+RDF INCORRECT→Patient+Diagnosis多对多关联路径选错；DLR PAS桥正确隔离 |
| thrombosis | q1168 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 92,545 | 122,577 | **102,850** | 🔴gold bug→已修正(evidence+SQL) | q1168 gold bug修正+建模重构(1LE/3PE)；DLR从136K降至123K |
| thrombosis | q1169 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **94,124** | 52,791 | 47,082 |  | q1169 UA异常男女比例；建模重构后DLR 53K逼近RDF 47K |
| football | q1025 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 95,251 | 32,834 | **31,916** |  | ER 95K→多表探索；DLR→PAS直达 |
| football | q1028 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 56,628 | **35,513** | 54,205 |  | ER INCORRECT→tie→judge UNKNOWN |
| football | q1029 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 36,434 | 33,257 | **26,171** | gold ASC/DESC颠倒 |  |
| football | q1030 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 33,328 | **33,059** | 37,527 |  |  |
| football | q1031 | FAIL |  | FAIL |  | FAIL |  | INCORRECT | INCORRECT | INCORRECT | 63,578 | 45,199 | **27,704** | evidence伪代码(SUBTRACT(DATETIME,birthday)) | ★三范式全INCORRECT→evidence伪代码对LLM无效 |
| football | q1032 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 64,320 | **32,502** | 32,715 |  |  |
| football | q1035 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 106,247 | **38,318** | 48,529 |  | ER 106K→多表探索；DLR→PAS直达 |
| football | q1036 | PASS |  | PASS |  | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 42,628 | **36,331** | 65,053 |  | RDF INCORRECT→缺DISTINCT |
| football | q1037 | FAIL | INCORRECT | FAIL | CORRECT | FAIL |  | INCORRECT | CORRECT | INCORRECT | 96,538 | 50,536 | **35,882** |  | ★ER+RDF INCORRECT→JOIN键选错；DLR PAS桥精准匹配→优势题 |
| football | q1039 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 66,799 | 73,707 | **54,226** |  |  |
| football | q1040 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | CORRECT | INCORRECT | CORRECT | CORRECT | 33,430 | **40,540** | 34,368 |  | ER GROUP BY player_name聚合错误→缺Naldo/多Hyypiae；DLR+RDF judge翻盘；ER唯一INCORRECT |
| football | q1042 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 84,025 | 62,283 | **34,716** | ⚡execute_sql描述+SQLite除法警告 | ★工具描述驱动修复：一行CAST AS REAL提示→三范式全PASS（旧版全INCORRECT）；参见定性观察
| superhero | q724 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 37,230 | 43,001 | **30,272** |  |  |
| formula_1 | q846 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 68,563 | 33,606 | **28,437** |  |  |
| formula_1 | q847 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 44,477 | 33,238 | **28,697** | gold NULL排序bug(Fisichella应为Räikkönen) | gold NULL排序bug→DLR/RDF返回正确 |
| formula_1 | q850 | FAIL | CORRECT | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 45,188 | 41,934 | **35,048** |  |  |
| formula_1 | q854 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 63,486 | 52,380 | **36,067** |  |  |
| formula_1 | q857 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **54,217** | 60,127 | 78,188 |  |  |
| formula_1 | q859 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 38,281 | 53,029 | **35,543** |  |  |
| formula_1 | q861 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **38,425** | 44,531 | 43,901 |  | evidence未区分两个同名number列 |
| formula_1 | q862 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 34,834 | **33,632** | 36,839 |  |  |
| formula_1 | q865 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 48,155 | 34,235 | **30,044** |  |  |
| formula_1 | q866 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 185,860 | **93,840** | 211,122 | ⚡结构引导实证 | ★DLR最优→LE分层避免RDF 11次SQL+ER 9次SQL；参见定性观察"q866结构引导实证" |
| formula_1 | q868 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 62,372 | 66,254 | **32,173** |  | RDF一骑绝尘→扁平结构直接races JOIN circuits |
| superhero | q717 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 44,528 | 44,113 | **28,504** |  |  |
| superhero | q719 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 29,488 | 36,084 | **28,825** |  |  |
| superhero | q723 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | **29,068** | 35,981 | 29,175 |  |  |
| superhero | q726 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 47,557 | 65,984 | **39,654** | gold过度要求RANK()列 | gold过度要求RANK()列→三范式ORDER BY正确 |
| superhero | q728 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **36,838** | 54,075 | 52,604 |  |  |
| superhero | q730 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 84,532 | **37,591** | 83,411 |  | DLR 38K(ER/RDF的1/2)→PAS桥一步定位hero→power |
| superhero | q732 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 46,469 | 55,585 | **37,962** |  |  |
| superhero | q733 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 28,920 | 45,089 | **28,642** |  |  |
| superhero | q736 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 44,949 | **34,647** | 36,874 |  |  |
| superhero | q737 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 48,348 | 45,840 | **30,744** |  | RDF最省(31K)→单表JOIN直达 |
| superhero | q738 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **45,017** | 80,710 | 78,843 | ⚡semantic_query中文描述修复 | ER最低(45K)；DLR 81K→大结果集371行分页；★英文描述rebuild后path_le_le生效 |
| formula_1 | q994 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 80,923 | 54,656 | **29,100** |  | ER 81K→YAML大宽表探索；RDF→SPARQL精准 |
| codebase | q531 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 36,525 | 31,518 | **26,650** |  |  |
| codebase | q532 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 55,456 | **34,233** | 197,057 |  | ★RDF 197K(6x DLR)→SPARQL多表OPTIONAL嵌套膨胀，无FK引导；DLR 34K→PAS直达 |
| codebase | q533 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 27,226 | 31,287 | **12,591** | evidence缺DATE() | evidence缺DATE()→三范式照做 |
| codebase | q537 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 33,989 | 33,914 | **27,365** |  |  |
| codebase | q539 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **52,150** | 79,768 | 68,731 |  |  |
| codebase | q544 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 56,254 | 51,592 | **35,689** |  |  |
| codebase | q547 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 60,473 | **52,782** | 53,148 |  |  |
| codebase | q549 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 46,327 | 51,179 | **33,150** |  |  |
| codebase | q555 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **46,479** | 50,639 | 100,051 |  | RDF 100K→SPARQL OPTIONAL嵌套膨胀 |
| codebase | q557 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 59,209 | 61,472 | **51,605** |  |  |
| codebase | q563 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 78,351 | 69,532 | **48,958** |  | q563 comment→FavoriteCount；RDF 最低 49K |
| codebase | q565 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 60,288 | **49,051** | 41,118 |  | q565 comment→closed→well-finished；RDF pred yes→judge翻盘 |
| card_games | q340 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 33,104 | 32,581 | **27,478** |  |  |
| card_games | q341 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | CORRECT | INCORRECT | CORRECT | CORRECT | 95,200 | 58,978 | **30,310** | gold typo | ★ER INCORRECT→cards 78列大宽表→SQL逻辑错误；DLR private_attributes避噪 |
| card_games | q344 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **12,991** | 34,288 | 13,338 | evidence缺印刷版本约束 | 同名卡多印刷版本→三范式选name非id；语义建模不注入领域知识 |
| card_games | q345 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 59,786 | 44,608 | **41,161** |  | ER偏高→78列宽表+list_all_tables兜底 |
| card_games | q346 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 64,089 | 74,484 | **45,578** |  |  |
| card_games | q347 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 144,494 | 105,495 | **36,459** |  | ★RDF INCORRECT→扁平漏JOIN；ER/DLR通过mapping/get_pe_full看到rulings FK |
| card_games | q349 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 87,205 | **43,995** | 53,523 | gold bug(答非所问) | ★RDF INCORRECT→gold答非所问；DLR独立语义推理→独胜 |
| card_games | q352 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 67,392 | 32,414 | **27,168** | gold bug(分母错) | gold分母错→DLR strict PASS |
| card_games | q356 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 72,445 | 32,929 | **27,525** |  | ER 72K→全量YAML探索；DLR→PAS精准 |
| card_games | q358 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 75,681 | **32,909** | 51,641 |  | 三范式均缺DISTINCT |
| card_games | q366 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 49,239 | **36,324** | 60,841 |  |  |
| card_games | q368 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 42,655 | **32,962** | 36,478 |  |  |
| toxicology | q195 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 40,714 | 30,269 | **25,581** |  |  |
| toxicology | q197 | FAIL | INCORRECT | PASS | | FAIL | CORRECT | INCORRECT | CORRECT | CORRECT | 57,143 | **34,862** | 37,140 |  | ★ER INCORRECT→molecule→bond JOIN膨胀→氧计数放大(2.16→69.28)；DLR PAS桥DISTINCT molecule_id避开fan-out |
| toxicology | q198 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 35,987 | 33,619 | **29,929** | evidence笛卡尔积(去笛卡尔积修正) |  |
| toxicology | q200 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 35,557 | 31,804 | **25,992** |  |  |
| toxicology | q201 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **29,179** | 33,423 | 37,098 |  |  |
| toxicology | q206 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 57,597 | **40,861** | 50,559 |  | ★RDF INCORRECT→找到connected表但最终SQL弃用→attribute和relation同为predicate无信息层级 |
| toxicology | q207 | FAIL | CORRECT | PASS | | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 53,325 | 43,279 | **37,239** | gold SQL bug(分子级关联vs原子级) | gold SQL bug(分子级关联)→三范式用bond→connected→atom精确定位 |
| toxicology | q208 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 69,775 | **41,900** | 92,819 |  | ★RDF INCORRECT→molecule.label误解为bond.bond_type |
| toxicology | q212 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 49,124 | 41,968 | **29,231** |  |  |
| toxicology | q213 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 115,275 | 41,431 | **35,318** |  | ER 115K→多表LEFT JOIN探索路径长；DLR→PAS一步定位 |
| toxicology | q215 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | INCORRECT | INCORRECT | CORRECT | INCORRECT | 62,052 | 101,940 | **56,469** |  | ★DLR独胜：connected表精确定位单键原子 i=3/s=77；ER/RDF分子级过滤多算s→97 |
| toxicology | q218 | FAIL | CORRECT | PASS |  | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | **51,885** | 108,077 | 81,788 | 🔴gold bug→已修正(100→99.34%) | RDF建模无问题(atom/molecule均可召回)，Agent COUNT(氟原子)≠COUNT(含氟分子)→LLM推理错误非建模缺陷 |
| california | q31 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 138,038 | 68,299 | **60,655** |  | q31 Enrollment 10/11 名 free rate；RDF 最低 61K |
| california | q32 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 127,270 | 100,507 | **91,756** |  | q32 SOC=66 FRPM top5；RDF 最低 92K |
| california | q5 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 67,294 | **35,885** | 37,623 |  |  |
| california | q11 | PASS |  | PASS |  | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 87,085 | **57,929** | 60,690 |  | ★RDF INCORRECT→列歧义:CDSCode vs School Code→RDF选错 |
| california | q12 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 98,325 | **60,884** | 69,884 |  |  |
| california | q17 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | INCORRECT | INCORRECT | CORRECT | INCORRECT | 85,213 | 56,187 | **41,414** | gold过度要求RANK()列 | ★ER+RDF INCORRECT→gold过度要求RANK()列号；DLR语义推理绕过→独胜 |
| california | q23 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 115,584 | 87,028 | **38,490** | evidence公式触发ABS()→自然语言修正 | evidence公式触发ABS()→三范式多次重跑 |
| california | q24 | FAIL | CORRECT | PASS |  | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 59,301 | **41,050** | 50,417 |  | ★RDF INCORRECT→列歧义:schools.School vs frpm.School Name |
| california | q25 | FAIL | INCORRECT | PASS |  | FAIL | INCORRECT | INCORRECT | CORRECT | INCORRECT | 6,393 | 46,950 | **6,267** |  | ★ER+RDF INCORRECT→选错satscores.dname；DLR独胜→PE属性归属消解列名歧义 |
| california | q26 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | CORRECT | INCORRECT | CORRECT | CORRECT | 6,443 | 15,433 | **6,180** | gold bug(Free Meal→FRPM Count)待修正 | ★ER INCORRECT→gold错列Free Meal→Agent偏离；DLR+RDF避开 |
| california | q27 | FAIL | INCORRECT | FAIL | INCORRECT | FAIL | INCORRECT | INCORRECT | INCORRECT | INCORRECT | 99,894 | **26,790** | 59,407 | average歧义(列名+question双触发AVG) | ★三范式全INCORRECT→AvgScrWrite+question average双重触发AVG()→LLM语义锚定 |
| california | q28 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 79,930 | 78,120 | **61,759** |  |  |
| financial | q89 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 157,511 | **71,207** | 81,125 |  | ER 158K→financial多表FK链全暴露→探索路径长；DLR→PAS聚焦 |
| financial | q92 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 104,583 | 120,828 | **86,875** |  | DLR偏高→4次语义搜索+2次PE探索；RDF→语义查询一次直定位 |
| financial | q93 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 89,663 | 89,698 | **61,037** |  |  |
| financial | q94 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 126,170 | **85,074** | 98,553 | question修正(条件互斥) | AND歧义→最老且最低薪资条件互斥；DLR strict PASS |
| financial | q95 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **63,563** | 80,320 | 72,234 | gold bug(只实现最年轻丢掉最高薪资) | gold只实现最年轻→丢最高薪资 |
| financial | q98 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **72,786** | 88,830 | 86,224 |  |  |
| financial | q99 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 65,185 | **43,858** | 81,656 |  |  |
| financial | q100 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **56,335** | 76,136 | 57,070 |  |  |
| financial | q112 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **47,188** | 66,742 | 50,503 |  |  |
| financial | q115 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **54,014** | 54,264 | 54,263 |  |  |
| financial | q116 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **74,564** | 108,217 | 111,705 |  | q116 贷款审批日→账户→trans余额增长率；ER 8步/75K最低，DLR 9步/108K（3次语义搜索探索），RDF 112K |
| financial | q117 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 30,957 | 36,630 | **30,186** |  | q117 贷款status='A'金额占比；ER/RDF strict PASS 4步到位，DLR ROUND()→judge翻盘 |

\* 粗体 = 该题最优范式（token 最低）

### 汇总

| 指标 | ER | DLR | RDF |
|------|----|----|-----|
| CORRECT | 134/144 | **142/144** | 129/144 |
| strict PASS | 68/144 | **71/144** | 64/144 |
| 总 token | 9,203K | **7,612K** | 7,689K |
| 平均 | 63,912 | **52,864** | 53,406 |
| 中位 | 56,968 | **43,877** | 41,414 |
| 最低 | 6,393 | 7,255 | **6,180** |
| 最高 | 230,002 | 147,662 | **197,057** |
| 总计 | **405/432** | — | — |

### 定性观察

**ER：信息全但噪音大。** YAML全量暴露所有表和列→Agent在海量信息中迷失。

- **大宽表**：cards 78列全暴露→q341 SQL逻辑错误，q345/q356 全量YAML探索偏高
- **JOIN膨胀**：q197 molecule→bond致氧计数被bond条数放大(2.16→69.28)；多表FK全互联→Agent选错JOIN路径
- **全互联FK误导**：q1524 全互联relations反而让Agent走错方向→按需暴露优于全量
- **碎表聚合**：q1339 Expense跨多表→需25步探索(92K)，而DLR独立LE+PAS仅4步(15K)
- **多表FK链**：financial q89 158K、toxicology q213 115K→探索路径长

**RDF：扁平高效但无结构层级。** 所有事实压平为triple——属性、FK、元数据视觉权重相等。

- **SPARQL膨胀**：多表OPTIONAL嵌套→q532 197K(6x DLR), q1483 171K(5x DLR), q1155 115K, q555 100K
- **无属性归属**：q1529 被transactions_1k的Date/Amount吸走而忽略yearmonth.Consumption→INCORRECT；而DLR LE public属性Consumption直接引导正确表
- **列歧义**：q11 CDSCode vs School Code、q24 schools.School vs frpm.School Name——两个"School"在predicate海洋里一样；DLR PE属性归属自然消解
- **漏JOIN**：q347 看到cards.text就满足，漏掉rulings表→INCORRECT
- **探索≠答案**：q206 找到connected表但最终SQL弃用→attribute和relation同为predicate，缺少"应留在答案里"的架构信号
- **形式化完备≠LLM友好**（q215实证）：RDF 把属性(element='c')、FK(connected.atom_id→atom)、元数据(bond_type='-')全压成同一种 triple——属性和关系视觉权重相等。Agent 找到了 bond/atom/connected 却跳过 connected 用 molecule 级过滤凑合（97 vs 80），因为在 predicate 海洋里 connected 的"桥梁 JOIN"语义不发光。ER 同样跳过 connected（全互联 FK 网致路径选择困难），唯独 DLR 的 ARCS+PAS 结构直接呈现了锚定键和 JOIN 路径——**信息结构决定了 LLM 的注意力落点，W3C 标准完备性 ≠ 对 LLM 的引导有效性**
- **正向**：简单题SPARQL精准高效，RDF最低token频现(28题中RDF最优)

**DLR：分层结构引导正确路径。** PAS桥、PE属性归属、LE public属性共同构成信息层级。

- **PAS桥精准**：q197 DISTINCT molecule_id避开fan-out、q1037正确JOIN键(ER+RDF选错)、q730 hero→power一步、q1166 Patient+Diagnosis正确隔离
- **PE属性归属消解歧义**：q25 DistrictName归属FRPM→语义路由直接命中(ER+RDF选错satscores.dname)→独胜
- **LE public属性直达**：q1331(ER的44%)、q1340(ER的64%)→免去ER mapping遍历开销
- **private_attributes避噪**：q341 cards 78列中隐藏非核心列→ER全暴露致SQL错误
- **PAS+独立LE**：q1339 Expense独立LE+PAS 4步→15K；q1338 PAS+public一击命中→7K
- **token效率**：平均50K vs ER 62K(-19%)、RDF 52K(-4%)；strict PASS率45%最高

**DLR 局限**：
- q1498 LLM聚合语义盲区：三次重跑误用MAX(Consumption)而非SUM→GROUP BY→MAX
- q92 语义路由探索成本：4次语义搜索+2次PE探索→121K(RDF一次直定位87K)
- q1500 ARCS新概念需工具docstring"教"LLM——原创范式的每个概念都需文档承载

### 数据可信性备注

- **🔴 q533 证据错误**：原始 evidence 写 `LastAccessDate > '2014-09-01'` 未用 DATE()，三范式照做得 5146 vs gold 4941。**非 Agent/范式/模型问题——evidence 本身有 bug。教训：排查失败先查 question → evidence → gold。**
- 已修正的 gold SQL bug：q1481/q1482/q1490/q1529/q1531/q207/q349/q352/q847/q95/q1152/q1505/q1525/q26，详见 [dataset.md](dataset.md)
- 修正 gold 后 strict_match 仍 FAIL（pred 带标签多行 vs gold 单行纯值）→ 由 Stage 4 judge 按语义翻盘，这是两段式设计的预期行为
- evidence 写法原则（q23/q1031 实证）：LLM 读语义联想非形式符号——自然语言有效，数学公式/SQL 伪代码无效。给 Agent 的 evidence 必须翻译成人话
- Helpfulness-Correctness Trade-off（q340）：LLM 判断"列 25,061 行不友好"→自动转 COUNT(*)，RLHF 的 helpfulness 本能压过 correctness 指令
- **q344 语义建模盲区**：同名卡多印刷版本→建模只做数据映射不注入领域知识→需 evidence 补位
- **q27/q1031 LLM 语义锚定极限**：列名+question 措辞双重触发→description/evidence 无法扭转→非范式可解
- **q866 结构引导实证（DLR 94K vs RDF 211K vs ER 186K）**：同题"lap time 1:27→driver url"。RDF 扁平 triple 无属性归属→Agent 找不到 driver.url→11 次 execute_sql 疯狂试探；ER 全量暴露→9 次 SQL + list_all_tables 全表 dump；DLR LE 分层→1 次 semantic_query 锁定 lapTimes/drivers LE→get_pe_full 拿到所有列→4 次 SQL 精准执行。**同一题 DLR 比 RDF 省 55%，比 ER 省 50%，结构引导的价值在高复杂度题上最明显。**
- **⚡ q1042 MCP 工具描述驱动修复**：SQLite 整数除法(3/2=1)导致三范式全 INCORRECT——LLM 不是不会写 SQL，是不知道 SQLite 有这个坑。在 `execute_sql` 工具描述加一行"⚠️ 整数/整数截断小数，需 CAST AS REAL 或 *1.0"，重跑后三范式全 PASS（ER 84K / DLR 62K / RDF 35K）。**启示：很多"建模问题"其实是 MCP 工具层的 UX 问题——LLM 对工具的认知边界由工具描述定义，在工具层修复比在建模层调整更直接、成本更低。**
