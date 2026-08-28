# card_games 解题技能（搞不定时来这里查）

> 触发：题面命中模式触发词，或同一题的 SQL 连续 2 次失败 / 结果可疑（空结果、数量级异常、与题面语义矛盾）。
> 每个模式 = 坑 + 一步步做法 + 同类题 SQL 模板。**模板只教方法，具体值必须自己执行出来。**

## 领域速览

核心表：`cards`（每次印刷一行，同名卡多版本）、`legalities`、`rulings`、`foreign_data`、`sets`。
同名卡的多个印刷版本靠 uuid/id 区分，name 不唯一。

---

## 模式 1：同名卡多版本

**触发**：题面出现 "print cards" / "versions" / "list ... ids" / "different cards"，或按 name 聚合后行数骤减。

**坑**：同名卡有多个印刷版本，各占一行、uuid/id 不同。按 name 去重或 GROUP BY name 会漏。

**一步步做**：
1. 判断题目数的是"印刷版本"还是"不同卡名"：含 print/version/id 字样 -> 版本
2. list 类：SELECT 每行的 id/uuid，不按 name 去重
3. count 类：`COUNT(DISTINCT uuid)`；数"不同卡名"才用 `COUNT(DISTINCT name)`
4. 自查：结果行数应与"印刷数"语义匹配，而不是"卡名数"

**Few-shot（同类题模板）**：
```sql
-- "List the print cards of rarity R banned in format F"
SELECT c.id
FROM cards c JOIN legalities l ON l.uuid = c.uuid
WHERE c.rarity = 'R' AND l.format = 'F' AND l.status = 'Banned';
-- 同名卡的每个印刷各占一行，禁止 GROUP BY name
```

---

## 模式 2：百分比的分母

**触发**：题面出现 "percentage" / "proportion" / "fraction"，或你写出了 JOIN 后 COUNT(*) 当分母。

**坑**：JOIN 子表后 `COUNT(*)` 统计的是"卡×子表"行数（虚增），不是卡牌数。

**一步步做**：
1. 先写死分母实体：卡牌数 = `cards` 表的 `COUNT(DISTINCT uuid)`
2. 把分母单独 SELECT 出来核对（不含任何 JOIN）
3. 分子用 `COUNT(DISTINCT CASE WHEN <cond> THEN uuid END)`
4. 条件在子表时用 EXISTS / 子查询，不要让它改变分母行数
5. 自查：分母应等于卡牌总量（万级）；如果得到十几万/二十几万，就是 JOIN 虚增

**Few-shot（同类题模板）**：
```sql
-- "What percentage of cards are available in language L?"
SELECT COUNT(DISTINCT CASE WHEN EXISTS (
    SELECT 1 FROM foreign_data f WHERE f.uuid = c.uuid AND f.language = 'L'
) THEN c.uuid END) * 100.0 / COUNT(DISTINCT c.uuid)
FROM cards c;
```

---

## 模式 3：并列第一（most/highest + 列全）

**触发**：题面 "most" / "highest" / "maximum" 且要求列出（"list" / 复数名词 / "(s)"），或你的 SQL 里出现 LIMIT 1。

**坑**：多条并列第一时 `LIMIT 1` 只取一条，SQLite 取哪条不确定。

**一步步做**：
1. 检查题面：列全部还是只要一个
2. 列全部：`WHERE cnt = (SELECT MAX(cnt) FROM ...)` 而不是 LIMIT 1
3. 只要一个：LIMIT 1 可用

**Few-shot（同类题模板）**：
```sql
-- "Which play format(s) have the most banned cards?"
WITH t AS (SELECT format, COUNT(*) cnt FROM legalities WHERE status = 'Banned' GROUP BY format)
SELECT format FROM t WHERE cnt = (SELECT MAX(cnt) FROM t);
```

---

## 模式 4：Artifact / 类型信息在两列

**触发**：题面出现 "Artifact" / "original type"。

**坑**：类型信息可能存于 `types` 或 `originalType`，只查一列会漏。

**一步步做**：
1. 先抽样几行看 `types` 的存储格式（数组串还是单值），再决定用 `=` 还是 `LIKE`
2. 过滤 Artifact 类时两列都查
3. "original type" 题直接对 `originalType` 原值匹配
4. 自查：分别单查两列，对比行数差异是否合理

**Few-shot（同类题模板）**：
```sql
-- "How many cards are artifacts?"
SELECT COUNT(*) FROM cards
WHERE types LIKE '%Artifact%' OR originalType LIKE '%Artifact%';
```
