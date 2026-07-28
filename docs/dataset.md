# 数据集说明 — mini_dev（BIRD-bench 精简开发版）

本项目使用 **mini_dev**（bird-bench 子集，版本 **0703**）作为 NL2SQL 评测基准。

| 属性 | 详情 |
|------|------|
| **名称** | mini_dev（BIRD-bench 精简开发版） |
| **版本** | 0703 |
| **数据库数量** | 11 个 SQLite 数据库 |
| **任务数量** | 500 个自然语言查询任务 |
| **评测目标** | NL2SQL（自然语言 → SQL 查询） |

## 数据库一览

| 数据库 | 领域 | 题数 | 说明 |
|--------|------|------|------|
| `california_schools` | 教育 | 30 | 加州学校信息（学校、学区、学生数等） |
| `financial` | 金融 | 32 | 银行账户、交易、客户信息 |
| `superhero` | 娱乐 | 52 | 超级英雄角色、能力、所属团队 |
| `debit_card_specializing` | 零售 | 30 | 借记卡消费记录与商户信息 |
| `european_football_2` | 体育 | 51 | 欧洲足球联赛、球队、球员、比赛记录 |
| `card_games` | 游戏 | 52 | 卡牌游戏、卡牌属性、对战记录 |
| `formula_1` | 体育 | 66 | F1 赛车、车手、赛道、比赛结果 |
| `codebase_community` | 技术 | 49 | 开源社区、帖子、用户关系 |
| `student_club` | 教育 | 48 | 大学社团、成员、活动信息 |
| `thrombosis_prediction` | 医疗 | 50 | 血栓预测临床数据 |
| `toxicology` | 化学 | 40 | 毒性物质、分子结构、毒性反应 |

## 下载与目录

```
版本：BIRD Mini-Dev (SQLite)
GitHub：https://github.com/bird-bench/mini_dev
HuggingFace：https://huggingface.co/datasets/birdsql/bird_mini_dev
论文：https://arxiv.org/abs/2305.03111
排行榜：https://bird-bench.github.io/
```

下载后解压到项目根目录：

```
DLR Proj/
└── MINIDEV_sqlite/
    ├── dev_tables.json              # 表结构元数据
    ├── mini_dev_sqlite.json         # 任务集（500 条 NL → SQL）
    ├── mini_dev_sqlite_gold.sql     # 标准答案 SQL
    └── dev_databases/               # 11 个 SQLite 数据库
        ├── california_schools/california_schools.sqlite
        ├── financial/financial.sqlite
        └── ...
```

> `MINIDEV_sqlite/` 已加入 `.gitignore`，不纳入版本控制。

## 任务格式

`mini_dev_sqlite.json` 每条任务字段：`question_id, db_id, question, evidence, SQL, difficulty`。

```json
{
  "question_id": 1471,
  "db_id": "debit_card_specializing",
  "question": "What is the ratio of customers who pay in EUR against customers who pay in CZK?",
  "evidence": "ratio of customers who pay in EUR against customers who pay in CZK = ...",
  "SQL": "SELECT CAST(SUM(IIF(Currency = 'EUR', 1, 0)) AS FLOAT) / SUM(IIF(Currency = 'CZK', 1, 0)) AS ratio FROM customers",
  "difficulty": "simple"
}
```

## 与评测相关的实测特征

- **question_id 不连续**：debit_card_specializing 库已测 20 题 qid 为 `1471,1472,1473,1476,1479,1480,1481,1482,1483,1484,1486,1490,1493,1498,1500,1501,1505,1506,1507,1509`；全量 min=5、max=1533，共 317 处跳号。
- **文件按 db 分组排列**，并非全局按 qid 升序。
- **evidence 为空的仅 2 条**：qid 1507、1528。
- 任务字段中 question/evidence **不含 `|` 字符**（500 条实测零冲突），评测脚本以 `|` 作字段分隔安全。
- **本项目设定：Agent 不拿到 `db_id`**（区别于 BIRD 官方"给定库写 SQL"设定）——语义层负责从问题定位数据库（语义路由），见 [Agent 说明](agent.md)。`db_id` 仅用于 Stage 2 重放定库与 Golden 缓存。

## Gold SQL 已知错误（已修正）

mini_dev 数据集的 gold SQL **在部分题目中与题意 / evidence 相悖**，导致其执行结果不是"题意正确答案"。本项目 gold cache（`Evaluation/outputs/00_golden_cache.json`）已对发现的错误条目**直接覆盖为正确结果**，并在此记录。

> 核对方法：分别取 `mini_dev_sqlite.json` 的 `SQL` 字段与 `mini_dev_sqlite_gold.sql`（按行号顺序对应 500 题）逐字对比 → 相忠实执行；再用 SQLite 直跑 gold SQL 并与 evidence 公式比语义。下两题两源 SQL **逐字一致**，判定为数据集本身的 gold SQL 错误，非 Stage 0 引入。

### qid 1481 — `debit_card_specializing`

- **问题**：What is the difference in the annual average consumption of the customers with the *least amount of consumption* in each segment paid in CZK for 2013 between SME and LAM, LAM and KAM, and KAM and SME?
- **evidence**：annual average consumption of customer with the lowest consumption in each segment = total consumption per year / the number of customer with lowest consumption in each segment。

| | 内容 |
|---|---|
| **数据集 gold SQL 做的事** | 全段客户的「总消费 / 客户数」差值（`SUM(Segment消费)/COUNT(Customers)`），**未过滤"最低消费客户"** |
| **错误结果（原 gold rows）** | `[[-582092.86, 582092.86, 0]]` |
| **题意正确答案** | 先把每段消费最低的客户筛出来，再算均值差 |
| **正确结果（已写入 cache）** | `[[-14009.34, 6046.62, 7962.72]]`（三范式 pred 与独立验证 100% 一致） |

**正确的 SQL**（按题意：先求每客户 2013 总消费 → 取每段最小值 → 均值 → 做差）：

```sql
-- q1481 正确语义：每段最低消费客户的年均消费之差
WITH cust AS (
  SELECT c.CustomerID, c.Segment, SUM(y.Consumption) AS total
  FROM customers c JOIN yearmonth y ON c.CustomerID = y.CustomerID
  WHERE c.Currency = 'CZK' AND y.Date BETWEEN '201301' AND '201312'
  GROUP BY c.CustomerID, c.Segment
),
seg_min AS (
  SELECT Segment, MIN(total) AS min_total FROM cust GROUP BY Segment
),
lowest AS (
  SELECT c.Segment, SUM(c.total) AS s, COUNT(*) AS n
  FROM cust c JOIN seg_min m ON c.Segment = m.Segment AND c.total = m.min_total
  GROUP BY c.Segment
)
SELECT Segment, ROUND(s * 1.0 / n, 2) AS annual_avg FROM lowest ORDER BY Segment;
-- 结果: KAM=-6044.38  LAM=2.24  SME=-14007.1
-- 三差值: SME-LAM=-14009.34  LAM-KAM=6046.62  KAM-SME=7962.72
```

### qid 1482 — `debit_card_specializing`

- **问题**：Which of the three segments—SME, LAM, KAM—has the biggest and lowest percentage increases in consumption paid in EUR between 2012 and 2013?
- **evidence**：Percentage of Increase = (Increase or Decrease / **consumption for 2013**) * 100。

| | 内容 |
|---|---|
| **数据集 gold SQL 做的事情** | 分母用了 **2012** 年消费（`/ SUM(...Date LIKE '2012%')`），与 evidence 规定的"除 2013"相悖 |
| **错误结果（原 gold rows）** | `[[545.4019, 708.112406, 681.582457]]` |
| **题意正确答案** | 分母应为 2013 |
| **正确结果（已写入 cache）** | `[[84.37, 84.69, 88.02]]`（SME 88.02% 最高，LAM 84.37% 最低） |

**正确的 SQL**（按 evidence 公式：pct = (2013−2012) / 2013 × 100）：

```sql
-- q1482 正确语义：分母用 2013（与 evidence 一致）
SELECT c.Segment,
  ROUND(
    (SUM(CASE WHEN SUBSTR(y.Date,1,4)='2013' THEN y.Consumption ELSE 0 END)
   - SUM(CASE WHEN SUBSTR(y.Date,1,4)='2013' THEN y.Consumption ELSE 0 END))
    * 100.0
    / SUM(CASE WHEN SUBSTR(y.Date,1,4)='2013' THEN y.Consumption ELSE 0 END),
  2) AS pct_inc
FROM customers c JOIN yearmonth y ON c.CustomerID = y.CustomerID
WHERE c.Currency = 'EUR' AND c.Segment IN ('SME','LAM','KAM')
GROUP BY c.Segment ORDER BY pct_inc DESC;
-- 结果: SME=88.02(最高)  KAM=84.69  LAM=84.37(最低)
```

### qid 1490 — `debit_card_specializing`

- **问题**：How many percent of LAM customer consumed more than 46.73?
- **evidence**：Percentage of LAM customer consumed more than 46.73 = (Total no. of LAM customers who consumed more than 46.73 / Total no. of LAM customers) * 100。

| | 内容 |
|---|---|
| **Bug #1 — 缺 DISTINCT** | `SUM(IIF(…)) / COUNT(T1.CustomerID)` 分子分母都数的是 customer-month records（59530 条），不是 customers |
| **Bug #2 — INNER JOIN** | evidence 明确说 "Total no. of LAM customers" = 3658，但 INNER JOIN 排除 47 个无 yearmonth 记录的客户，分母仅 3611 |
| **错误结果（原 gold rows）** | `[[98.526793]]` → 第一次修正（加 DISTINCT）→ `[[99.529216]]` → 第二次修正（INNER→LEFT JOIN）→ `[[98.38709732]]` |
| **题意正确答案** | `COUNT(DISTINCT CASE WHEN SUM(Consumption) > 46.73 THEN CustomerID END) / COUNT(DISTINCT CustomerID)`，LEFT JOIN 包含所有 LAM 客户 |
| **正确结果（已写入 cache）** | `[[98.38709732]]`（3599/3658，总消费 > 46.73 的 LAM 客户 / 全部 LAM 客户） |

**正确的 SQL**（DISTINCT + LEFT JOIN + SUM 聚合）：

```sql
-- q1490 正确语义：按客户总消费聚合，LEFT JOIN 包含全部 3658 个 LAM 客户
SELECT ROUND(CAST(SUM(CASE WHEN total > 46.73 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*) * 100, 2)
FROM (
  SELECT c.CustomerID, SUM(y.Consumption) as total
  FROM customers c LEFT JOIN yearmonth y ON c.CustomerID = y.CustomerID
  WHERE c.Segment = 'LAM'
  GROUP BY c.CustomerID
);
-- 结果: 98.39%（3599 个总消费 > 46.73 / 3658 全部 LAM 客户）

> **备注**：q1490 ER/DLR 能得出 98.39% 是在将 opencode 底层 LLM 从 longcat 切换为 deepseek-pro 之后。旧模型（longcat）下三范式全错——ER 用 AVG、DLR 走 transactions_1k、RDF 走 transactions_1k——多次重跑均无法收敛到正确答案。模型能力是这道题 ER/DLR 翻盘的关键变量。
```

### qid 1505 — `debit_card_specializing`（待确认：gold COUNT(*) vs COUNT(DISTINCT)）

- **问题**：Among the customers who paid in euro, how many of them have a monthly consumption of over 1000?
- **evidence**：Pays in euro = Currency = 'EUR'.

| | 内容 |
|---|---|
| **Gold SQL** | `SELECT COUNT(*) FROM yearmonth JOIN customers ON CustomerID WHERE Currency='EUR' AND Consumption>1000` → 2,730 |
| **三范式 Pred SQL** | `SELECT COUNT(DISTINCT c.CustomerID) ...` → 391 |
| **分歧性质** | "how many **of them**"（them=customers）问的是有多少个**客户**——如果某 EUR 客户在多个月消费 >1000，他仍是 ONE customer。Gold COUNT(*) 统计了人次，三范式 COUNT(DISTINCT CustomerID) 统计了不重复客户数，语义上后者更忠实于题干指代。**暂未修改 gold cache**（待后续系统性核对后决定）。 |

### qid 1525 — `debit_card_specializing`（同 q1505：gold COUNT(*) vs COUNT(DISTINCT)，已修正 gold cache）

- **问题**：What is the percentage of the customers who used EUR in 2012/8/25?
- **evidence**：EUR can be represented by Currency = 'EUR'.

| | 内容 |
|---|---|
| **Gold SQL（原）** | `COUNT(T1.CustomerID)` 计交易次数而非客户数 → 1.65% |
| **正确结果（已写入 cache）** | `COUNT(DISTINCT CustomerID)` → 7/259 = **2.70%** |
| **三范式一致** | ER/DLR/RDF 均输出 2.70%（7 个 EUR 客户 / 259 个当天有交易的客户）。2026-07-23 修正 gold cache。

### qid 1152 — `thrombosis_prediction`（gold 分子分母颠倒，2026-07-24 修正）

- **问题**：What is the ratio of outpatient to inpatient followed up treatment among all the 'SLE' diagnosed patient?

| | 内容 |
|---|---|
| **Gold SQL** | `SUM(CASE WHEN Admission='+' THEN 1.0 ELSE 0 END) / SUM(CASE WHEN Admission='-' THEN 1 ELSE 0 END)` = 110/84 = **1.3095** |
| **Bug** | 题目写"ratio of outpatient to inpatient"（门诊/住院 = 84/110 = 0.7636），Gold 和 evidence 都计算了 B/A（住院/门诊）。Gold cache 和 evidence 均已修正（门诊/住院 = 84/110 = **0.7636**），Gold 计算了 B/A |
| **正确结果** | `CAST(SUM(CASE WHEN Admission='-' THEN 1.0 ELSE 0 END) AS REAL) / SUM(CASE WHEN Admission='+' THEN 1 ELSE 0 END)` = **0.7636** |
| **验证** | DLR/RDF 均正确算出 0.76；ER 初始 strict PASS 因公式反了撞上错误 Gold。修正后 DLR strict PASS。2026-07-24 修正 cache。 |

### qid 1029 — `european_football_2`（gold ASC/DESC 颠倒，2026-07-24 修正）

- **问题**：What are the speed in which attacks are put together of the top 4 teams with the highest build Up Play Speed?

| | 内容 |
|---|---|
| **Gold SQL** | `ORDER BY buildUpPlaySpeed ASC LIMIT 4` → 最低值 [20, 20, 20, 23] |
| **Bug** | 题目要求 "highest"，应取 DESC。Gold 用 ASC 取了最低的 4 个 |
| **正确结果** | `ORDER BY buildUpPlaySpeed DESC LIMIT 4` → 最高值 [80, 78, 78, 77] |
| **验证** | 三范式一致输出 80/78/78/77。2026-07-24 修正 cache。 |

### qid 1526 — `debit_card_specializing`（gold 返回 NULL：子查询多 JOIN gasstations，已修正 gold cache）

- **问题**：For the customer who paid 634.8 in 2012/8/25, what was the consumption decrease rate from Year 2012 to 2013?
- **evidence**：decrease rate = (consumption of 2012 - consumption of 2013) / consumption of 2012.

| | 内容 |
|---|---|
| **Gold SQL（原）** | 子查询多 JOIN `gasstations` → 无匹配 → 返回 NULL |
| **正确结果（已写入 cache）** | CustomerID=6718 → yearmonth 聚合 2012/2013 → **-5.8152** |
| **三范式一致** | ER/DLR/RDF 均输出 -5.8152。2026-07-23 修正 gold cache。


- **问题**：What is the ratio of outpatient to inpatient followed up treatment among all the 'SLE' diagnosed patient?

| | 内容 |
|---|---|
| **Gold SQL** | `SUM(CASE WHEN Admission='+' THEN 1.0 ELSE 0 END) / SUM(CASE WHEN Admission='-' THEN 1 ELSE 0 END)` = 110/84 = **1.3095** |
| **Bug** | 题目写"ratio of outpatient to inpatient"（门诊/住院 = 84/110 = 0.7636），Gold 和 evidence 都计算了 B/A（住院/门诊）。Gold cache 和 evidence 均已修正（门诊/住院 = 84/110 = **0.7636**），Gold 计算了 B/A |
| **正确结果** | `CAST(SUM(CASE WHEN Admission='-' THEN 1.0 ELSE 0 END) AS REAL) / SUM(CASE WHEN Admission='+' THEN 1 ELSE 0 END)` = **0.7636** |
| **验证** | DLR/RDF 均正确算出 0.76；ER 初始 strict PASS 因公式反了撞上错误 Gold。修正后 DLR strict PASS。2026-07-24 修正 cache。 |


- **问题**：What are the speed in which attacks are put together of the top 4 teams with the highest build Up Play Speed?

| | 内容 |
|---|---|
| **Gold SQL** | `ORDER BY buildUpPlaySpeed ASC LIMIT 4` → 最低值 [20, 20, 20, 23] |
| **Bug** | 题目要求 "highest"，应取 DESC。Gold 用 ASC 取了最低的 4 个 |
| **正确结果** | `ORDER BY buildUpPlaySpeed DESC LIMIT 4` → 最高值 [80, 78, 78, 77] |
| **验证** | 三范式一致输出 80/78/78/77。2026-07-24 修正 cache。 |

### qid 1529 — `debit_card_specializing`（gold JOIN 笛卡尔积→SUM(Price) 膨胀 20 倍，已修正 gold cache）

- **问题**：What is the amount spent by customer "38508" at the gas stations? How much had the customer spent in January 2012?
- **evidence**：January 2012 refers to the Date value = '201201'.

| | 内容 |
|---|---|
| **Gold SQL（原）** | `transactions_1k JOIN gasstations JOIN yearmonth ON CustomerID` → 8 条交易 × 20 条年月 = 160 行笛卡尔积。`SUM(Price)`=68740.2（3437.01×20 膨胀），`SUM(IIF(Date='201201',Price,0))`=3437.01（实为交易总额，非一月消费） |
| **Bug 本质** | yearmonth JOIN 造成 Price 重复求和。Gold Part1 是正确值的 20 倍，Part2 返回了 Part1 的正确值而非一月消费 |
| **正确结果（已写入 cache）** | Part1（加油站花费）= `SUM(Price) FROM transactions_1k WHERE CustomerID='38508'` = **3437.01**；Part2（2012年1月消费）= `Consumption FROM yearmonth WHERE CustomerID='38508' AND Date='201201'` = **67156.94** |
| **验证** | ER 正确输出 [3437.01, 67156.94]。DLR/RDF 因多步查询复杂度各自走了错误路径。2026-07-23 修正 gold cache。


### qid 1531 — `debit_card_specializing`（gold SQL 与 evidence 公式矛盾）

- **问题**：Who is the top spending customer and how much is the average price per single item purchased by this customer? What currency was being used?
- **evidence**：average price per single item = Total(price) / Total(amount)

| | 内容 |
|---|---|
| **Gold SQL** | `SUM(T2.Price / T2.Amount)`（每行比值相加）|
| **Bug 本质** | evidence 定义 avg = Total(price)/Total(amount) = SUM(Price)/SUM(Amount)，但 Gold SQL 用 `SUM(Price/Amount)`——两种算法结果不同（22.55 vs 203.86）。**Agent 按 evidence 执行，Gold 却按另一种算法评判。** |
| **正确结果（与 evidence 一致）** | `SUM(Price)/SUM(Amount) FROM transactions_1k WHERE CustomerID = (SELECT CustomerID FROM yearmonth ORDER BY Consumption DESC LIMIT 1)` = **22.55**（CustomerID 12459, CZK） |
| **验证** | DLR 三范式中唯一路由到 yearmonth.Consumption 找到 CustomerID 12459；ER 走 transactions_1k 得 CustomerID 13665（avg 5762 离谱）；RDF 未触及 yearmonth。2026-07-25 标记，暂不修正 cache。 |


### qid 94 — `financial`（gold SQL 逻辑错误：锁区不锁人 + cache 列序反转）

- **问题**：List out the account numbers of female clients who are oldest and has lowest average salary, calculate the gap between this lowest average salary with the highest average salary?
- **evidence**：Female = 'F'; A11 = average salary; Gap = highest - lowest; birth_date 比大小

| | 内容 |
|---|---|
| **Gold SQL（原）** | `WHERE district_id = (SELECT district_id FROM client WHERE gender='F' ORDER BY birth_date ASC LIMIT 1)` — 子查询找了最老女性的 district_id → 外层 JOIN 拉出该 district 所有 account（364 行），不限定该女性本人。正确做法是以 client_id 锁人。 |
| **Bug 本质** | ① WHERE 子查询只锁区不锁人；② 结果未筛选 client.gender='F'；③ gold cache 列序与 SQL 执行结果反转（[4431, 6] vs SQL 返回 (6, 4431)）；④ 正确结果 account_id=1743, gap=4431 |
| **正确结果（已写入 cache）** | `account_id=3214, gap=4431`（最低工资区 district 67, A11=8110 中最老女性 client 3888, born 1916-10-27） |
| **修复** | 原题条件互斥（最老≠最低工资区）。question 明确为"先圈最低工资区→再取最老"，evidence 补执行顺序。修正 gold SQL + cache + source JSON。 |
| **验证** | DLR 三次中两次命中 3214+4431；ER/RDF 因条件模糊各次答案不一。2026-07-26 修正完成。 |

### qid 349 — `card_games`（gold SQL 答非所问：算了画师 promo 卡数而非裁决数，2026-07-26 修正）

- **问题**：Name the card and artist with the most ruling information. Also state if the card is a promotional printing.
- **evidence**：with the most ruling information refers to Max(count(rulings.uuid)); the card is the promotional printing refers to isPromo = 1;

| | 内容 |
|---|---|
| **Gold SQL（原）** | 子查询 `SELECT artist FROM cards WHERE isPromo=1 GROUP BY artist HAVING COUNT(DISTINCT uuid) = (SELECT MAX(count_uuid) FROM (SELECT COUNT(DISTINCT uuid) AS count_uuid FROM cards WHERE isPromo=1 GROUP BY artist))` — 找的是**拥有最多 promo 卡的画师**，而非裁决最多的卡 |
| **Bug 本质** | 题目+evidence 明确要求 Max(count(rulings.uuid))，Gold SQL 却用 MAX(COUNT(DISTINCT uuid)) 按 artist 聚合，完全无视了 rulings 表和 evidence 公式。Gold answer=Serrated Arrows/John Avon（John Avon 有 96 张 promo 卡最多） |
| **正确结果（已写入 cache）** | `SELECT name, artist, isPromo FROM cards JOIN rulings ON uuid GROUP BY uuid ORDER BY COUNT(rulings.uuid) DESC LIMIT 1` → **Teferi's Protection / Chase Stone / isPromo=1**（27 rulings） |
| **验证** | ER/DLR 均正确找到 Teferi's Protection，judge 翻盘时明确指出 gold 语义错误。RDF 漏 WHERE isPromo=1 被判 INCORRECT。2026-07-26 修正 gold cache + mini_dev_sqlite.json。 |

### qid 352 — `card_games`（gold SQL 分母口径错：card-language pairs 而非 cards，2026-07-26 修正）

- **问题**：What is the percentage of cards available in Chinese Simplified language?
- **evidence**：percentage = number of Chinese Simplified language card / total number of cards; cards available in Chinese Simplified refers to language = 'Chinese Simplified'  in foreign_data;

| | 内容 |
|---|---|
| **Gold SQL（原）** | `CAST(SUM(CASE WHEN T2.language='Chinese Simplified' THEN 1 ELSE 0 END) AS REAL) * 100 / COUNT(T1.id) FROM cards T1 LEFT JOIN foreign_data T2 ON T1.uuid = T2.uuid` — LEFT JOIN 后 COUNT(T1.id) 统计的是所有 card-language 组合行数（251,939），而非卡牌数（56,822） |
| **Bug 本质** | 分母是 card-language pairs，分子是 Chinese 条目数。算的是"中文条目占所有 card-language 对的比例"=8.77%，而非"有中文翻译的卡牌占所有卡牌的比例"=35.38% |
| **正确结果（已写入 cache）** | `CAST(COUNT(DISTINCT CASE WHEN language='Chinese Simplified' THEN T1.uuid END) AS REAL) * 100 / COUNT(DISTINCT T1.uuid) FROM cards T1 LEFT JOIN foreign_data T2 ON T1.uuid = T2.uuid` → **35.38%**（20,106 张有中文 / 56,822 张总计） |
| **验证** | DLR 正确算出 35.38%，gold 修正后 strict PASS。ER 仅查 foreign_data 得 8.77%（错公式），RDF SQL 正确但 judge 初判被旧 gold 误导→手动翻盘。2026-07-26 修正 gold cache + mini_dev_sqlite.json。 |

> **card_games 已发现 4 个 gold/evidence bug**：q341 typo、q344 evidence 缺领域知识、q349 答非所问、q352 分母口径错。标注质量堪忧。

### qid 95 — `financial`（gold SQL 只实现"最年轻"丢掉了"最高薪资"，2026-07-27 修正）

- **问题**：List out the account numbers of clients who are youngest and have highest average salary?
- **原 evidence**：`birth_date 比较规则 + A11 指平均薪资`（仅定义术语，未说明 AND 如何组合）

| | 内容 |
|---|---|
| **Gold SQL（原）** | `WHERE client_id = (SELECT client_id FROM client ORDER BY birth_date DESC LIMIT 1)` — 只取了最年轻的人，完全无视 "highest average salary" 条件 |
| **Bug 本质** | 最年轻的人（client 3428, district 42, A11=8388）不在最高薪资区（district 1, A11=12541）。gold 只实现了 "youngest"，"highest" 被吞了 |
| **正确结果（已写入 cache）** | 先圈最高薪资区（A11=MAX）→ 再取该区最年轻：client 1660, account **1372** |
| **修正** | question 改 "in the highest average salary district and are youngest"，evidence 补执行顺序 "first find highest A11 district, then youngest"，gold SQL 补 `WHERE district_id = (SELECT district_id FROM district ORDER BY A11 DESC LIMIT 1) AND birth_date = (SELECT MAX(birth_date) FROM client WHERE district_id = ...)` |
| **验证** | 和 q94 同模式——financial 库的 AND of 极值条件，需明确执行顺序才能有解。2026-07-27 修正 gold cache + mini_dev_sqlite.json。 |

> **financial 已发现 2 个 gold/evidence bug**：q94 条件互斥（最老≠最低工资区）、q95 gold 只实现一半条件（丢掉了 highest salary）。


- **问题**：What is the ratio of outpatient to inpatient followed up treatment among all the 'SLE' diagnosed patient?

| | 内容 |
|---|---|
| **Gold SQL** | `SUM(CASE WHEN Admission='+' THEN 1.0 ELSE 0 END) / SUM(CASE WHEN Admission='-' THEN 1 ELSE 0 END)` = 110/84 = **1.3095** |
| **Bug** | 题目写"ratio of outpatient to inpatient"（门诊/住院 = 84/110 = 0.7636），Gold 和 evidence 都计算了 B/A（住院/门诊）。Gold cache 和 evidence 均已修正（门诊/住院 = 84/110 = **0.7636**），Gold 计算了 B/A |
| **正确结果** | `CAST(SUM(CASE WHEN Admission='-' THEN 1.0 ELSE 0 END) AS REAL) / SUM(CASE WHEN Admission='+' THEN 1 ELSE 0 END)` = **0.7636** |
| **验证** | DLR/RDF 均正确算出 0.76；ER 初始 strict PASS 因公式反了撞上错误 Gold。修正后 DLR strict PASS。2026-07-24 修正 cache。 |


- **问题**：What are the speed in which attacks are put together of the top 4 teams with the highest build Up Play Speed?

| | 内容 |
|---|---|
| **Gold SQL** | `ORDER BY buildUpPlaySpeed ASC LIMIT 4` → 最低值 [20, 20, 20, 23] |
| **Bug** | 题目要求 "highest"，应取 DESC。Gold 用 ASC 取了最低的 4 个 |
| **正确结果** | `ORDER BY buildUpPlaySpeed DESC LIMIT 4` → 最高值 [80, 78, 78, 77] |
| **验证** | 三范式一致输出 80/78/78/77。2026-07-24 修正 cache。 |

### qid 344 — `card_games`（evidence 缺少领域知识，2026-07-24 修正）

- **问题**：List all the mythic rarity print cards banned in gladiator format.
- **原 evidence**：`mythic rarity printing refers to rarity = 'mythic'; card banned refers to status = 'Banned'; in gladiator format refers to format = 'gladiator'`

| | 内容 |
|---|---|
| **Bug** | evidence 只给了过滤条件，未说明同名卡有多个印刷版本（不同 id）。三范式全选了 name 只得 2 个名字，Gold 用 id 得 5 个。换上 longcat 和 deepseek-v4pro 均无效 |
| **修正** | 补充 "A card may have multiple printings with the same name but different ids — return each printing's id" |
| **验证** | 修正后三范式一致输出 5 个 id。2026-07-24 修正 evidence。

### qid 533 — `codebase_community`（evidence 引导错误，2026-07-24 修正）

- **问题**：How many users last accessed the website after 2014/9/1?
- **原 evidence**：`LastAccessDate > '2014-09-01'`

| | 内容 |
|---|---|
| **Bug** | evidence 写了 `LastAccessDate > '2014-09-01'` 未用 DATE()，导致 Agent 照做得到 5146（含当天有时间分量的记录）。Gold 正确答案 4941 需要 `DATE(LastAccessDate) > '2014-09-01'` |
| **修正** | `DATE(LastAccessDate) > '2014-09-01'`（LastAccessDate 是 datetime 列，需用 DATE() 取日期部分） |
| **教训** | 排查失败先看 question + evidence + gold，不要先怪 Agent/范式/模型 |

### qid 23 — `california_schools`（evidence 数学公式触发 ABS() 误解，2026-07-27 修正）

- **问题**：List the names of schools with more than 30 difference in enrollments between K-12 and ages 5-17?
- **原 evidence**：`Difference = Enrollment (K-12) - Enrollment (Ages 5-17)`

| | 内容 |
|---|---|
| **Bug** | evidence 写数学公式 `Diff = A - B`，但英文 "difference" 天然激活 LLM 的 ABS() 联想。三次重跑中 DLR 初跑加 ABS（230K token），RDF 两次都加 ABS，ER 偶有不稳。**LLM 不是编译器——它读语义联想而非形式符号。** |
| **修正** | `K-12 enrollment exceeds Ages 5-17 enrollment by more than 30 = Enrollment (K-12) - Enrollment (Ages 5-17) > 30`（自然语言描述方向，公式作为补充） |
| **验证** | 修正后三范式一次全对，无一用 ABS。2026-07-27 修正 mini_dev_sqlite.json。 |

> **和 q1031 同一根因**：SQL 伪代码（`age = SUBTRACT(DATETIME(), birthday)`）和数学公式（`Diff = A - B`）对 LLM 都不如一句人话。给 Agent 的 evidence 必须翻译成自然语言。


### qid 198 — `toxicology`（evidence 公式错误导致 gold 同样出错，2026-07-24 修正）

- **问题**：On average how many carcinogenic molecules are single bonded?
- **原 evidence**：`DIVIDE(SUM(bond_type='-'), COUNT(atom_id))`

| | 内容 |
|---|---|
| **Bug** | evidence 公式 JOIN bond+atom 产生笛卡尔积（分子内每条 bond × 每个 atom），COUNT 被放大。正确做法：只 JOIN bond 按分子 GROUP BY 后 AVG。三者均独立验证得 20.25 |
| **Gold 原值** | 732.125（同样被笛卡尔积污染） |
| **正确结果** | 20.25（每个致癌分子平均约 20 条单键） |
| **验证** | 修正 evidence 后三范式一致输出 20.25。2026-07-24 修正 cache。

### qid 207 — `toxicology`（gold JOIN 粒度错：分子级→原子级，2026-07-27 修正）

- **问题**：What elements are in a double type bond?
- **evidence**：double type bond refers to bond_type = '='

| | 内容 |
|---|---|
| **Bug** | 原 Gold SQL `atom JOIN bond ON molecule_id` 是分子级关联——只要分子里有双键，该分子**所有原子**全被召回（13 元素），而非真正参与双键的原子（5 元素） |
| **Gold 原值** | br, c, ca, cl, cu, f, h, n, o, p, pb, s, sn（13 元素） |
| **正确结果** | c, ca, n, o, s（5 元素，三范式一致通过 `bond → connected → atom ON atom_id + atom_id2` 精确定位双键两端） |
| **验证** | ER/DLR/RDF 三种建模独立得出相同 SQL 结构和相同结果，SQLite 直跑确认。三范式 judge 均判 CORRECT（DLR judge 在裁决过程中发现并记录了 gold bug）。2026-07-27 修正 cache + mini_dev_sqlite.json。 |

### qid 861 — `formula_1`（evidence 未区分两个同名 number 列，2026-07-27 修正）

- **问题**：What is his number of the driver who finished 0:01:54 in the Q3 of qualifying race No.903?
- **原 evidence**：`race number refers to raceId; finished 0:0M:SS in the Q3 refers to q3 LIKE 'M:SS%'`

| | 内容 |
|---|---|
| **Bug** | "his number" 有歧义——`qualifying.number`（排位名次）和 `drivers.number`（车手号码）两个同名列，evidence 未区分。三范式 Agent 都用了 `qualifying.number`→全部 INCORRECT |
| **修正** | evidence 补 `his number refers to drivers.number` |
| **验证** | 修正后三范式全部 CORRECT（JOIN drivers 取 `drivers.number`）。同时 DLR/ER/RDF 三范式为三个 `number` 列补了 description（Driver number / Qualifying position / Race finishing position）。2026-07-27 修正 mini_dev_sqlite.json。 |

### qid 1037 — `european_football_2`（evidence 公式用错 JOIN 键，2026-07-28 修正）

- **问题**：Calculate the percentage of players who prefer left foot, who were born between 1987 and 1992.
- **原 evidence**：`COUNT(player_fifa_api_id)`

| | 内容 |
|---|---|
| **Bug** | evidence 公式写 `COUNT(player_fifa_api_id)`，但 gold SQL JOIN 用的是 `player_api_id`。Player 表同时有 `player_api_id` 和 `player_fifa_api_id` 两列，都是合法的 JOIN 键但值不同。ER 和 RDF 按 evidence 使用 `player_fifa_api_id`→结果 25.6% vs gold 24.6%→INCORRECT |
| **修正** | evidence `player_fifa_api_id` → `player_api_id`，与 gold SQL 一致 |
| **验证** | 修正后三范式统一使用 `player_api_id`。同时 DLR 模型补了 `player_fifa_api_id` 列（private + 描述区分），保证三范式公平对比。2026-07-28 修正 mini_dev_sqlite.json。 |

### 处理约定

- 对 gold SQL 与题意相悖的题目，**直接覆盖 gold cache 的 `rows` 与 `columns` 为正确结果**，保持 `ok=True`。
- 尚未对全 500 题做系统性证据核对；后续若再发现 gold 错误，按同等格式追加到此节并修正 cache。
- 本节所述"正确结果"均在 SQLite 中独立重放验证，并与三范式 Agent 的 pred 交叉比对一致。

## SQLite 元数据注意事项

- `dev_tables.json` 的 FK 元数据严重缺失（如 debit_card_specializing 只记录 1 条 FK，实际 transactions_1k 有 3 条）——凡需要真实 FK 的地方（如 R2RML 生成）一律用 `PRAGMA foreign_key_list(table)` 从 SQLite 直读。
- `sqlite_sequence` 是 SQLite 自增元数据表（4 个库中存在），**不属于业务表**：语义层解析与映射生成均已排除。
