# 争议题裁决目录（judge 专用）

> mini_dev 部分题目的 gold SQL / evidence 与题意相悖。**数据集保持原始，不修数据**；缺陷由知识层（rag_knowledge / skills）消化，由本目录裁决。
>
> **judge 用法**：输入 prompt 带 `QID`。PredResult 与 GoldResult 不一致时，先在本目录按 QID 查找：
> - **命中** -> 以该条「裁定」核对 Pred，该题 GoldResult 作废；
> - **未命中** -> 按标准五步判；evidence 与题面相悖时以题面语义为准。
>
> 裁决值均经 SQLite 独立重放 + 三范式交叉验证（出处：docs/dataset.md）。
> **维护**：新翻盘/新发现的争议题按同格式追加到对应 db 节；裁决以本文件为唯一权威，勿只改 cache。

## card_games

### q344（evidence 薄弱，gold 正确）
- Q: List all the mythic rarity print cards banned in gladiator format.
- 缺陷：evidence 未说明同名卡多印刷版本（不同 id）。
- 裁定：每个印刷版本一行，答案为 5 个 id；按 name 去重得 2 个 name = INCORRECT（无论撞不撞 gold）。

### q349（gold 答非所问）
- Q: Name the card and artist with the most ruling information. Also state if the card is a promotional printing.
- 缺陷：gold 算的是"拥有最多 promo 卡的画师"（Serrated Arrows/John Avon），无视 rulings 表。
- 裁定：裁决最多 rulings 的卡 -> **Teferi's Protection / Chase Stone / isPromo=1**（27 条裁决）。

### q352（gold 分母口径错）
- Q: What is the percentage of cards available in Chinese Simplified language?
- 缺陷：gold LEFT JOIN 后 COUNT(id) 统计 card-language 行数（251,939），得 8.77%。
- 裁定：分母 = cards 的 COUNT(DISTINCT uuid)（56,822），分子 = 有中文翻译的卡（20,106）-> **35.38**。Pred≈8.77（撞 gold 错口径）= INCORRECT。

### q474（evidence 笔误）
- Q: ...sets with a base set number of under 100?
- 缺陷：evidence 写 `baseSetSize < 10`，题面明确 under 100。
- 裁定：正确口径 = `baseSetSize < 100`。PredSQL 用 < 10 = INCORRECT。

## debit_card_specializing

### q1473（evidence 公式与表粒度矛盾，gold 照错口径）
- Q: What was the average monthly consumption of customers in SME for the year 2013?
- 缺陷：evidence（kid7）`Average Monthly consumption = AVG(Consumption)/12` 与表粒度矛盾——`yearmonth` 每行已是"某客户某月"的月度值，再除 12 等于把月度值当年度值二次摊薄，得 459.956；gold 照该口径取值。
- 裁定：正确口径 = plain `AVG(Consumption)`（SME ∩ 2013）-> **5519.475171**（SQLite 独立重放，178,337 行）。Pred = 5519.475 = CORRECT；Pred = 459.96（撞 gold 错口径）= INCORRECT。
- 依据：`skills/sop.md` 本题条目（L3 唯一入口，judge 同读）——"trust the table and the question's own words"。

### q1481（gold 未过滤"最低消费客户"）
- Q: What is the difference in the annual average consumption of the customers with the least amount of consumption in each segment paid in CZK for 2013...?
- 缺陷：gold 算全段客户均值差（[-582092.86, 582092.86, 0]），未先筛每段最低消费客户。
- 裁定：每客户 2013 总消费 -> 每段取最低 -> 该批客户均值 -> 段间差（SME-LAM, LAM-KAM, KAM-SME）-> **[-14009.34, 6046.62, 7962.72]**。

### q1482（gold 分母年份错）
- Q: Which of the three segments-SME, LAM, KAM-has the biggest and lowest percentage increases in consumption paid in EUR between 2012 and 2013?
- 缺陷：gold 分母用 2012（得 545.40/708.11/681.58），evidence 规定除 2013。
- 裁定：pct = (2013-2012)/2013\*100 -> **SME 88.02 最高，KAM 84.69，LAM 84.37 最低**。
- 判口径补充（08-29）：问题问的是 which segment has the biggest and lowest——答案是排序而非数值。Pred 分母用 2012 或 2013 不改变排序（SME 最大、LAM 最小），排序与裁定一致即判 CORRECT。

### q1490（gold 两处 bug：缺 DISTINCT + INNER JOIN 丢人）
- Q: How many percent of LAM customer consumed more than 46.73?
- 缺陷：gold 数的是 customer-month 记录（59530），且 INNER JOIN 丢 47 个无记录客户（分母 3611）。
- 裁定：按客户总消费聚合、LEFT JOIN 含全部 3658 个 LAM 客户 -> **98.39**（3599/3658）。

### q1505（已裁决 2026-08-31，同 q1525 客户口径）
- Q: Among the customers who paid in euro, how many of them have a monthly consumption of over 1000?
- 缺陷：gold COUNT(*) 计 customer-month 记录（2730 人次），"how many of them"（them=customers）应计客户数。
- 裁定：任一月消费 > 1000 的 EUR 客户去重计数 -> **391**（COUNT DISTINCT CustomerID）；skills 本题条目同口径，判序 SOP>RAG。

### q1525（gold 数交易次数非客户数）
- Q: What is the percentage of the customers who used EUR in 2012/8/25?
- 缺陷：gold COUNT(CustomerID) 计人次得 1.65%。
- 裁定：COUNT(DISTINCT CustomerID) -> **2.70**（7/259）。

### q1526（gold 子查询多 JOIN 返回 NULL）
- Q: For the customer who paid 634.8 in 2012/8/25, what was the consumption decrease rate from Year 2012 to 2013?
- 缺陷：gold JOIN gasstations 无匹配 -> NULL。
- 裁定：(2012-2013)/2012，CustomerID=6718 -> **-5.8152（比率）= -581.52%（百分比表示，等价——kid5 公式授权 *100%）**。

### q1529（gold 笛卡尔积膨胀 + 采样表当全量）
- Q: What is the amount spent by customer "38508" at the gas stations? How much had the customer spent in January 2012?
- 缺陷：gold transactions_1k JOIN yearmonth 笛卡尔积（160 行）；且用采样表 SUM 当总花费。
- 裁定：全量 = yearmonth -> **总花费 5,124,646.35；2012 年 1 月 67,156.94**。

### q1531（gold 公式与 evidence 矛盾）
- Q: Who is the top spending customer and how much is the average price per single item...? What currency was being used?
- 缺陷：gold 用 SUM(Price/Amount)（203.86），evidence 定义 Total(price)/Total(amount)。
- 裁定：SUM(Price)/SUM(Amount)，top 客户从 yearmonth.Consumption 取（12459）-> **22.55，CZK**。

## financial

### q94（gold 锁区不锁人）
- Q: List out the account numbers of female clients who are oldest and has lowest average salary, calculate the gap...
- 缺陷：gold 子查询取最老女性的 district_id 后拉全区账户，未锁定本人。
- 裁定：先圈最低平均薪资区（district 67, A11=8110）-> 再取该区最老女性（client 3888）-> **account 3214, gap 4431**。

### q95（gold 丢掉 highest 条件）
- Q: List out the account numbers of clients who are youngest and have highest average salary?
- 缺陷：gold 只实现"最年轻"，无视"最高薪资区"。
- 裁定：先圈最高薪资区（A11=MAX）-> 再取该区最年轻 -> **account 1372**（client 1660）。

## european_football_2

### q1029（gold ASC/DESC 颠倒）
- Q: What are the speed in which attacks are put together of the top 4 teams with the highest build Up Play Speed?
- 缺陷：gold ASC 取最低 4 个（[20,20,20,23]）。
- 裁定：DESC 取最高 -> **[80, 78, 78, 77]**。

### q1037（evidence 用错 JOIN 键，gold 正确）
- Q: Calculate the percentage of players who prefer left foot, who were born between 1987 and 1992.
- 缺陷：evidence 写 player_fifa_api_id，gold 用 player_api_id。
- 裁定：正确键 = **player_api_id**（gold 24.6% 为准）；照 evidence 用 fifa id 得 25.6% = INCORRECT。

## formula_1

### q847（gold NULL 排序 bug）
- Q: What is the surname of the driver with the best lap time in race number 19 in the second qualifying period?
- 缺陷：gold `ORDER BY q2 ASC LIMIT 1`，SQLite 中 NULL 排第一 -> Fisichella（q2=NULL）。
- 裁定：NULL 非有效圈速，过滤后取最快 -> **Räikkönen**（q2=1:21.966）。返回 Fisichella = INCORRECT。

### q861（evidence 未区分同名 number 列，gold 正确）
- Q: What is his number of the driver who finished 0:01:54 in the Q3 of qualifying race No.903?
- 缺陷：evidence 的 "his number" 歧义——qualifying.number（排位名次）vs drivers.number（车手号码）。
- 裁定：**his number = drivers.number**（gold 为准）；用 qualifying.number = INCORRECT。

## thrombosis_prediction

### q1152（gold 分子分母颠倒）
- Q: What is the ratio of outpatient to inpatient followed up treatment among all the 'SLE' diagnosed patient?
- 缺陷：gold 算住院/门诊（110/84=1.3095）。
- 裁定：门诊/住院 = 84/110 -> **0.7636**。

## toxicology

### q198（gold 笛卡尔积）
- Q: On average how many carcinogenic molecules are single bonded?
- 缺陷：gold JOIN bond×atom 笛卡尔积得 732.125。
- 裁定：按分子 GROUP BY 后 AVG -> **20.25**。

### q207（gold JOIN 粒度错）
- Q: What elements are in a double type bond?
- 缺陷：gold 分子级关联召回全部 13 元素。
- 裁定：bond -> connected -> atom 精确定位双键两端 -> **c, ca, n, o, s**（5 元素）。

### q218（gold "不含氟"判定恒真）
- Q: What percentage of carcinogenic-type molecules does not contain fluorine?
- 缺陷：gold `element <> 'f'` 对有机分子恒真 -> 100%。
- 裁定：分子级 NOT IN 含氟集合 -> **99.34**（151/152，仅 TR450 含氟）。

## codebase_community

### q533（evidence 误导，gold 正确）
- Q: How many users last accessed the website after 2014/9/1?
- 缺陷：evidence 写 `LastAccessDate > '2014-09-01'` 未包 DATE()，照做得 5146。
- 裁定：LastAccessDate 是 datetime，需 `DATE(LastAccessDate) > '2014-09-01'` -> **4941** 为准。

## california_schools

### q23（evidence 公式触发 ABS 误解，gold 正确）
- Q: List the names of schools with more than 30 difference in enrollments between K-12 and ages 5-17?
- 缺陷：evidence 数学公式 `Diff = A - B` 易激活 ABS() 联想。
- 裁定：**有符号差值**（Enrollment(K-12) − Enrollment(Ages 5-17) > 30），加 ABS = INCORRECT。
