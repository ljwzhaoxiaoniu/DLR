# debit_card_specializing 解题技能（搞不定时来这里查）

> 触发：题面命中模式触发词，或同一题的 SQL 连续 2 次失败 / 结果可疑（空结果、数量级异常、与题面语义矛盾）。
> 每个模式 = 坑 + 一步步做法 + 同类题 SQL 模板。**模板只教方法，具体值必须自己执行出来。**

## 领域速览

核心表：`customers`（客户）、`yearmonth`（月度消费汇总，全量）、`transactions_1k`（单笔交易，仅千行采样）、`gasstations`。
两张消费表粒度不同，选错表 = 系统性偏差。

---

## 模式 1：百分比分母 - JOIN 丢人 / 虚增

**触发**："percentage" / "what percent" / "among the customers"。

**坑**：
- INNER JOIN yearmonth -> 没消费记录的客户被丢掉，分母少算
- JOIN 后 `COUNT(*)` -> 行数虚增

**一步步做**：
1. 分母实体 = 客户数 -> 从 `customers` 独立数：`COUNT(DISTINCT CustomerID) FROM customers WHERE <段/币种等条件>`
2. 分子用 CASE 或子查询，不得改变分母行数
3. JOIN 只用来取信息（LEFT JOIN），不用来过滤分母
4. 自查：把分母单独 SELECT 出来，再用一个不含 JOIN 的写法数一遍核对

**Few-shot（同类题模板）**：
```sql
-- "What percentage of Segment-S customers spent more than X in 2013?"
SELECT COUNT(DISTINCT CASE WHEN y.CustomerID IS NOT NULL THEN c.CustomerID END) * 100.0
       / COUNT(DISTINCT c.CustomerID)
FROM customers c
LEFT JOIN (SELECT DISTINCT CustomerID FROM yearmonth
           WHERE Consumption > X AND yearmonth BETWEEN '201301' AND '201312') y
  ON y.CustomerID = c.CustomerID
WHERE c.Segment = 'S';
```

---

## 模式 2：最低消费客户的多步聚合

**触发**："least amount of consumption" / "lowest" / "minimum" + 按段（Segment）求均值或差。

**坑**：一步 `AVG(Consumption)` 直接算段均值，跳过"先锁定最低消费客户"这一层。

**一步步做**：
1. 每客户总消费：`GROUP BY CustomerID, Segment` -> `SUM(Consumption)`
2. 每段最低值：`MIN(总消费) GROUP BY Segment`
3. 锁定"段内总消费 = 最低值"的那批客户
4. 对这批客户算题目要求的指标（均值等）
5. 段间比较 / 做差

**Few-shot（同类题模板）**：
```sql
WITH per AS (SELECT CustomerID, Segment, SUM(Consumption) tot FROM yearmonth GROUP BY 1, 2),
     low AS (SELECT Segment, MIN(tot) mt FROM per GROUP BY 1)
SELECT per.Segment, AVG(per.tot)   -- 按题目要求的指标替换
FROM per JOIN low ON per.Segment = low.Segment AND per.tot = low.mt
GROUP BY per.Segment;
```

---

## 模式 3：yearmonth vs transactions_1k 选表

**触发**：题面出现 "spent" / "consumption"（全量口径）或 "transaction" / "price" / "product"（单笔口径）。

**规则**：
- 总体 / 月 / 年消费 -> `yearmonth`（全量）
- 具体单笔 / 价格 / 产品 / 时间点 -> `transactions_1k`（采样）
- 用千行采样表算全量汇总 -> 采样偏差，必错

**自查**：涉及"总消费/总花费"的题，若结果来自 `transactions_1k` -> 换 `yearmonth` 重算。
