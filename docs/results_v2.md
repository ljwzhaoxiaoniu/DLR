# 评测结果 V2 — 全量逐题校验

> 目标结论方向：**DLR 原创建模（LE-PE 双层 + PAS 语义路由）对 LLM Agent 的 NL2SQL 引导优于 ER/RDF 基线**。
> 本文件为 results.md 的逐题校验版本：每行一题，每范式 4 列（strict/judge/result/token）。
> pair 汇总表和 token 总表见 [`results.md`](results.md)。

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
