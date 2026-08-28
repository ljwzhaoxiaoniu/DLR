# formula_1 解题技能（搞不定时来这里查）

> 触发：题面命中模式触发词，或同一题的 SQL 连续 2 次失败 / 结果可疑（空结果、数量级异常、与题面语义矛盾）。
> 每个模式 = 坑 + 一步步做法 + 同类题 SQL 模板。**模板只教方法，具体值必须自己执行出来。**

## 领域速览

核心表：`drivers`、`constructors`、`races`、`results`、`qualifying`、`circuits`。
题多为"某赛事第 X 名 / 最快圈 / 排位成绩"类排序 + JOIN。

---

## 模式 1：三个 number 列同名

**触发**：题面问 "his number" / 排位 / 完赛名次。

**坑**：`drivers.number`（车手号码）、`qualifying.number`（排位名次）、`results.number`（完赛名次）-- 同名不同义。

**一步步做**：
1. 判断指代：问车手本人属性 -> `drivers.number`；排位赛 -> `qualifying`；正赛名次 -> `results.positionOrder` / `positionText`
2. 拿不准：分别抽样两列的值域，与题面数字对照

**Few-shot（同类题模板）**：
```sql
-- "What is the number of the driver who won race R?"
SELECT d.number
FROM drivers d JOIN results r ON r.driverId = d.driverId
WHERE r.raceId = (SELECT raceId FROM races WHERE name = 'R') AND r.positionOrder = 1;
-- number 取自 drivers，不是 results.number（那是完赛名次）
```

---

## 模式 2：NULL 排序（SQLite）

**触发**：最值题（best / fastest / earliest / latest）且目标列可能为 NULL。

**坑**：SQLite `ORDER BY ASC` 时 NULL 排最前 -> "最快圈速"返回的可能是一条 NULL 记录。

**一步步做**：
1. 先查该列有无 NULL：`SELECT COUNT(*) FROM t WHERE col IS NULL`
2. 有 -> 加 `WHERE col IS NOT NULL`，或 `ORDER BY COALESCE(col, '9999')` 把 NULL 沉底
3. 自查：返回行的该列值非 NULL；方向没写反（快 = ASC，晚 = DESC）

**Few-shot（同类题模板）**：
```sql
-- "Who set the fastest qualifying time in race R?"
SELECT d.surname, q.q3
FROM qualifying q JOIN drivers d ON d.driverId = q.driverId
WHERE q.raceId = (SELECT raceId FROM races WHERE name = 'R') AND q.q3 IS NOT NULL
ORDER BY q.q3 ASC LIMIT 1;
```

---

## 待补充

其余模式在后续评测翻盘后补充。
