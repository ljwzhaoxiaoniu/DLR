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

| 专题 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|
| debit_card | q1471 | FAIL | CORRECT | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 60,262 | 39,078 | 61,468 |  |
| debit_card | q1472 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 286,969 | 94,317 | 183,400 |  |
| debit_card | q1473 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 35,825 | 72,766 | 94,395 |  |
| debit_card | q1476 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 73,221 | 61,770 | 69,729 |  |
| debit_card | q1479 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 43,712 | 43,397 | 45,318 |  |
| debit_card | q1480 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 50,260 | 59,145 | 65,519 |  |
| debit_card | q1481 | — | — | — | — | — | — | — | — | — | — | — | — | gold bug修正 |
| debit_card | q1482 | — | — | — | — | — | — | — | — | — | — | — | — | gold bug修正 |
| debit_card | q1483 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| debit_card | q1484 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| debit_card | q1486 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 62,200 | 72,659 | 75,962 |  |
| debit_card | q1490 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 105,687 | 80,806 | 108,118 | gold bug修正 |
| debit_card | q1493 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 36,552 | 54,977 | 78,468 |  |
| debit_card | q1498 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 34,828 | 32,300 | 55,564 |  |
| debit_card | q1500 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 12,809 | 14,273 | 24,543 |  |
| debit_card | q1501 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 14,500 | 19,962 | 16,182 |  |
| debit_card | q1505 | — | — | — | — | — | — | — | — | — | — | — | — | gold COUNT(*) |
| debit_card | q1506 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| debit_card | q1507 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 8,521 | 9,925 | 7,644 |  |
| debit_card | q1509 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 8,403 | 10,503 | 12,599 |  |
| debit_card | q1514 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| debit_card | q1515 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| debit_card | q1521 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 12,264 | 11,224 | 8,434 |  |
| debit_card | q1524 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 12,837 | 12,487 | 14,332 |  |
| debit_card | q1525 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 54,895 | 61,104 | 102,319 | gold COUNT(*) |
| debit_card | q1526 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 116,689 | 85,371 | 60,522 | gold NULL |
| debit_card | q1528 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 10,344 | 12,468 | 9,097 |  |
| debit_card | q1529 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 19,591 | 16,721 | 12,210 | gold笛卡尔积修正 |
| debit_card | q1531 | — | — | — | — | — | — | — | — | — | — | — | — | gold bug修正 |
| debit_card | q1533 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| student_club | q1312 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 7,847 | 9,000 | 7,702 |  |
| student_club | q1317 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 8,915 | 9,742 | 8,430 |  |
| student_club | q1322 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 43,936 | 31,509 | 35,443 |  |
| student_club | q1323 | PASS | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 104,100 | 69,207 | 36,549 |  |
| student_club | q1331 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| student_club | q1334 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| student_club | q1338 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 82,444 | 94,553 | 84,515 |  |
| student_club | q1339 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 145,494 | 34,001 | 84,865 |  |
| student_club | q1340 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 78,516 | 33,630 | 51,922 |  |
| student_club | q1344 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 61,185 | 39,130 | 27,522 |  |
| thrombosis | q1149 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| thrombosis | q1150 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| thrombosis | q1152 | FAIL | CORRECT | PASS | INCORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 68,893 | 40,351 | 27,409 | gold ratio方向修正 |
| thrombosis | q1153 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 99,754 | 39,790 | 31,537 |  |
| thrombosis | q1155 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| thrombosis | q1156 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| thrombosis | q1157 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 54,114 | 41,491 | 52,667 |  |
| thrombosis | q1162 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 28,614 | 32,648 | 36,698 |  |
| thrombosis | q1164 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 52,462 | 52,132 | 36,101 |  |
| thrombosis | q1166 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | INCORRECT | INCORRECT | CORRECT | INCORRECT | 48,084 | 41,830 | 37,609 | ⚠️ER ⚠️RDF |
| football | q1025 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| football | q1028 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| football | q1029 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 8,290 | 9,454 | 7,101 | gold ASC/DESC修正 |
| football | q1030 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 10,380 | 9,200 | 9,411 |  |
| football | q1031 | FAIL |  | FAIL |  | FAIL |  | INCORRECT | INCORRECT | INCORRECT | 11,043 | 12,355 | 13,832 | evidence伪代码修正 |
| football | q1032 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 15,042 | 8,959 | 9,801 |  |
| football | q1035 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 106,247 | 38,318 | 48,529 |  |
| football | q1036 | PASS |  | PASS |  | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 42,628 | 38,193 | 65,053 | RDF缺DISTINCT |
| football | q1037 | FAIL | INCORRECT | FAIL | CORRECT | FAIL |  | INCORRECT | CORRECT | INCORRECT | 96,538 | 50,536 | 35,882 | ER/RDF JOIN键错 |
| football | q1039 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 66,799 | 73,707 | 54,226 |  |
| formula_1 | q724 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| formula_1 | q846 | PASS | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 68,563 | 33,606 | 32,960 |  |
| formula_1 | q847 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 44,477 | 33,238 | 32,514 |  |
| formula_1 | q850 | FAIL | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 45,188 | 41,934 | 76,224 |  |
| formula_1 | q854 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 63,486 | 59,238 | 36,067 |  |
| formula_1 | q857 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| formula_1 | q859 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 46,706 | 53,110 | 50,833 |  |
| formula_1 | q861 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 38,425 | 44,531 | 43,901 |  |
| formula_1 | q862 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 34,834 | 33,632 | 42,598 |  |
| formula_1 | q865 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 48,155 | 34,326 | 30,044 |  |
| superhero | q717 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| superhero | q719 | PASS | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 90,494 | 36,282 | 28,825 |  |
| superhero | q723 | PASS | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 29,068 | 35,981 | 29,175 |  |
| superhero | q726 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 59,696 | 65,984 | 65,196 | gold RANK()过度 |
| superhero | q728 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 46,561 | 54,075 | 52,604 |  |
| superhero | q730 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 84,532 | 37,591 | 83,411 |  |
| superhero | q732 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 46,469 | 55,585 | 37,962 |  |
| superhero | q733 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 28,920 | 45,089 | 28,642 |  |
| superhero | q736 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 44,949 | 34,647 | 36,874 |  |
| superhero | q994 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| codebase | q531 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| codebase | q532 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| codebase | q533 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 36,896 | 31,686 | 49,225 | evidence DATE()修正 |
| codebase | q537 | PASS | CORRECT | PASS | CORRECT | PASS | CORRECT | CORRECT | CORRECT | CORRECT | 36,101 | 49,688 | 50,853 |  |
| codebase | q539 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 8,429 | 10,615 | 8,978 |  |
| codebase | q544 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 8,883 | 10,193 | 8,150 |  |
| codebase | q547 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 60,473 | 52,782 | 53,148 |  |
| codebase | q549 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 66,788 | 51,179 | 33,150 |  |
| codebase | q555 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 46,479 | 50,639 | 100,051 |  |
| codebase | q557 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 59,209 | 61,472 | 51,605 |  |
| card_games | q340 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| card_games | q341 | — | — | — | — | — | — | — | — | — | — | — | — | gold typo修正 |
| card_games | q344 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 53,625 | 34,288 | 52,270 | evidence补充 |
| card_games | q345 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 80,004 | 45,722 | 41,161 |  |
| card_games | q346 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| card_games | q347 | — | — | — | — | — | — | — | — | — | — | — | — | RDF扁平漏JOIN |
| card_games | q349 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 16,159 | 10,202 | 12,825 | gold bug修正 |
| card_games | q352 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 16,188 | 17,845 | 11,863 | gold bug修正 |
| card_games | q356 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 72,445 | 32,929 | 27,525 |  |
| card_games | q358 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 75,681 | 32,909 | 51,641 |  |
| card_games | q366 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 49,239 | 36,324 | 60,841 |  |
| card_games | q368 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 42,655 | 32,962 | 36,478 |  |
| toxicology | q195 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 40,714 | 31,353 | 26,530 |  |
| toxicology | q197 | FAIL | INCORRECT | PASS | CORRECT | FAIL | CORRECT | INCORRECT | CORRECT | CORRECT | 57,143 | 47,527 | 37,140 |  |
| toxicology | q198 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 35,998 | 35,893 | 50,610 | evidence笛卡尔积修正 |
| toxicology | q200 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 76,256 | 31,804 | 25,992 |  |
| toxicology | q201 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| toxicology | q206 | — | — | — | — | — | — | — | — | — | — | — | — | RDF探索≠答案 |
| toxicology | q207 | FAIL | CORRECT | PASS | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 53,325 | 43,279 | 37,239 | gold SQL bug修正 |
| toxicology | q208 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 69,775 | 41,900 | 92,819 | RDF语义理解错 |
| toxicology | q212 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 49,124 | 41,968 | 29,231 |  |
| toxicology | q213 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 115,275 | 41,431 | 35,318 |  |
| california | q5 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| california | q11 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| california | q12 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 16,586 | 14,868 | 14,295 |  |
| california | q17 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | INCORRECT | INCORRECT | CORRECT | INCORRECT | 18,134 | 13,138 | 10,845 | gold RANK()过度 |
| california | q23 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 30,608 | 69,561 | 48,607 | evidence公式→自然语言 |
| california | q24 | FAIL | CORRECT | PASS |  | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 18,975 | 29,109 | 14,707 |  |
| california | q25 | FAIL | INCORRECT | PASS |  | FAIL | INCORRECT | INCORRECT | CORRECT | INCORRECT | 101,558 | 46,950 | 50,841 |  |
| california | q26 | FAIL | INCORRECT | FAIL | CORRECT | FAIL | CORRECT | INCORRECT | CORRECT | CORRECT | 217,255 | 69,814 | 95,363 | gold bug(FreeMeal→FRPM)待修正 |
| california | q27 | FAIL | INCORRECT | FAIL | INCORRECT | FAIL | INCORRECT | INCORRECT | INCORRECT | INCORRECT | 220,572 | 183,770 | 220,435 | average歧义/LLM极限 |
| california | q28 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 79,930 | 78,232 | 107,454 |  |
| financial | q89 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| financial | q92 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| financial | q93 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| financial | q94 | — | — | — | — | — | — | — | — | — | — | — | — | question修正 |
| financial | q95 | — | — | — | — | — | — | — | — | — | — | — | — | gold bug修正 |
| financial | q98 | — | — | — | — | — | — | — | — | — | — | — | — |  |
| financial | q99 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 65,185 | 43,858 | 81,656 |  |
| financial | q100 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 56,335 | 76,136 | 57,070 |  |
| financial | q112 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 47,188 | 66,742 | 50,503 |  |
| financial | q115 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 54,014 | 54,264 | 54,263 |  |
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
