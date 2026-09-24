# 评测明细 — DLR · birdminidev

> **说明**：question 驱动三级锚定——L1 dsh MCP 语义层（`dlr_semantic_query` 等 5 工具）/ L2 共识（`dlr_search_consensus`）/ L3 SOP（`skill sop`），交叉验证后出 SQL。
> **判定**：gold SQL 在数据集 SQLite 上执行得期望值 ↔ agent 答案（**数据集原生，不修正**）；数值逐级容差、文本归一化包含。
> **数据来源**：`results/<轮次>/{questions.csv, raw/*.ndjson}` ｜ 本文件由 `tsm stats` 自动重建（定性观察一节在跑批后按 SOP 案例补写）。
> **列义**：PASS ｜ FAIL ｜ UNCERTAIN（抽不出可比对的值，待仲裁）｜ GOLD_ERR（gold 本身执行失败）。

## 逐题校验表

| 数据库 | 题号 | 判定 | 精度 | 步数 | 工具 | tokens | 轮次 |
|---|---|---|---|---|---|---|---|
| debit_card_specializing | q1473 | ✅ PASS | num@0.0001 | 4 | 7 | 33,353 | 0924_1559_qids_1473_1480_1500 |
| debit_card_specializing | q1480 | ✅ PASS | text | 5 | 8 | 43,870 | 0924_1559_qids_1473_1480_1500 |
| debit_card_specializing | q1500 | ⚠️ UNCERTAIN | - | 5 | 9 | 45,849 | 0924_1559_qids_1473_1480_1500 |

## 评测进度

> 数据集原生题数（mini_dev 全量），已评 = 去重后的跑过题数。

| 数据库 | 全量 | 已评 | 剩余 | 进度 |
|---|---|---|---|---|
| california_schools | 30 | 0 | 30 | 0.0% |
| card_games | 52 | 0 | 52 | 0.0% |
| codebase_community | 49 | 0 | 49 | 0.0% |
| debit_card_specializing | 30 | 3 | 27 | 10.0% |
| european_football_2 | 51 | 0 | 51 | 0.0% |
| financial | 32 | 0 | 32 | 0.0% |
| formula_1 | 66 | 0 | 66 | 0.0% |
| student_club | 48 | 0 | 48 | 0.0% |
| superhero | 52 | 0 | 52 | 0.0% |
| thrombosis_prediction | 50 | 0 | 50 | 0.0% |
| toxicology | 40 | 0 | 40 | 0.0% |
| **合计** | **500** | **3** | **497** | **0.6%** |

## 汇总

| 指标 | 值 |
|---|---|
| PASS | 2 / 3（66.7%） |
| UNCERTAIN（待仲裁） | 1 |
| FAIL | 0 |
| GOLD_ERR | 0 |
| token 平均 / 中位 | 41,024 / 43,870 |
| token 最低 / 最高 | 33,353 / 45,849 |
| 步数均值 / 工具调用均值 | 5 / 8 |

> **口径**：仅覆盖已跑轮次，勿外推为全数据集结论。token = input + cache_read + output（不含 CoT 的 reasoning 分项由 harness 单独计）。

## 定性观察

> 分批跑完后按 SOP 案例撰写：每个 SOP 条目题须有对应观察、数字与归档 CSV 逐项一致（防止「先写结论后找证据」）。

## 错题与裁定（SOP 条目缘由）

| 题号 | 库 | 判定 | 类型 | 问题（截） | 裁定（sop.md 摘要） |
|---|---|---|---|---|---|
| q1500 | debit_card_specializing | ⚠️ UNCERTAIN | 数据集问题 | Please list the product description of the products consumed | The individual-purchase records are only a **four-day sample**: they cover 2012-08-23 through 2012-08-26, and nothing else. Any month outsid |

## 逐题明细（怎么对的）

<details>
<summary><b>q1473</b> · debit_card_specializing · ✅ <b>PASS</b>（num@0.0001）· 4 步 / 7 工具 · 33,353 tok</summary>

**问题**：What was the average monthly consumption of customers in SME for the year 2013?

**期望**：`459.9562642870894`

**答案**：`## 分析过程 **L3 (sop) 命中**：'sop' 技能中有一节完整复述本题 —— *"What was the average monthly consumption of customers in SME for the year 2013?"*，其裁定口径为： > 消费数据本身就是**按客户-月**记录的，每一条已是一个客户一个月的消费额。因此"平均月消费"就是这些月度数值的**简单`

**调用步骤**

| # | 工具 | 参数（截 200） |
|---|---|---|
| 1 | `skill` | `{"name":"sop"}` |
| 2 | `dlr_semantic_query` | `{"question":"average monthly consumption of customers in SME for the year 2013"}` |
| 3 | `dlr_search_consensus` | `{"question":"average monthly consumption SME customers 2013"}` |
| 4 | `dlr_search_consensus` | `{"namespace":"debit_card_specializing","question":"average monthly consumption of customers in SME for the year 2013"}` |
| 5 | `get_pe_mapping` | `{"pe_id":"PHYSICAL.YearMonth"}` |
| 6 | `get_pe_mapping` | `{"pe_id":"PHYSICAL.Customer"}` |
| 7 | `execute_sql` | `{"sql":"SELECT ROUND(AVG(ym.Consumption), 4) AS avg_monthly_consumption, COUNT(*) AS n_month_records, COUNT(DISTINCT ym.CustomerID) AS n_customers FROM yearmonth ym JOIN customers c ON ym.CustomerID =` |

**依据与结论**（agent 原文）

#### 分析过程

**L3 (sop) 命中**：`sop` 技能中有一节完整复述本题 —— *"What was the average monthly consumption of customers in SME for the year 2013?"*，其裁定口径为：

> 消费数据本身就是**按客户-月**记录的，每一条已是一个客户一个月的消费额。因此"平均月消费"就是这些月度数值的**简单平均**，一步到位，**不要再除以 12**。

**L2 (共识) 冲突**：`dlr_search_consensus(qid=7)` 返回 *"Average consumption = Sum(value)/Count() 或 /Month Count（如年度平均除以 12）"*。该公式与本题题意矛盾（会把答案缩小 12 倍），且客户并非都有 12 个月记录（SME 有 22,274 个客户但仅 178,337 条月记录，平均每人约 8 个月）。按**三级判序：L3 题级 > L2 证据**，采用 SOP 口径。

**L1 (映射)**：
- `LOGICAL.Consumption` → PE `yearmonth`（月消费汇总）：`CustomerID`、`Date`(YYYYMM)、`Consumption`
- `LOGICAL.Customer` → PE `customers`：`CustomerID`、`Segment`（SME=Small Business）
- JOIN 依据 ARC `A_anchor`：`yearmonth.CustomerID` → `customers.CustomerID`（N:1）
- 年份过滤：`Date BETWEEN '201301' AND '201312'`

#### 结果

对 2013 年 SME 客户的 178,337 条"客户-月"消费记录直接取平均：

| 指标 | 值 |
|---|---|
| **平均月消费** | **5519.4752**（CZK） |
| 月度记录数 | 178,337 |
| SME 客户数 | 22,274 |

> 注：若误按 L2 的 "÷12" 公式计算会得到约 459.96，这正是 SOP 明确警告的错误（答案小 12 倍）。

Final Answer: 5519.4752
Evidence SQL: SELECT ROUND(AVG(ym.Consumption), 4) AS avg_monthly_consumption, COUNT(*) AS n_month_records, COUNT(DISTINCT ym.CustomerID) AS n_customers FROM yearmonth ym JOIN customers c ON ym.CustomerID = c.CustomerID WHERE c.Segment = 'SME' AND ym.Date BETWEEN '201301' AND '201312'

来源：`skill(sop)` 本节口径；L1 `dlr_semantic_query` + `get_pe_mapping`（PHYSICAL.YearMonth / PHYSICAL.Customer）；`execute_sql` 结果。

</details>

<details>
<summary><b>q1480</b> · debit_card_specializing · ✅ <b>PASS</b>（text）· 5 步 / 8 工具 · 43,870 tok</summary>

**问题**：What was the gas consumption peak month for SME customers in 2013?

**期望**：`04`

**答案**：`## 结论 **2013 年 SME 客户的燃气消费峰值月份是 2013 年 4 月。** ### 推理链路 1. **L3（'sop' 技能，权威口径）** — SOP 中有完整复述本题的节：*"What was the gas consumption peak month for SME customers in 2013?"*。该节明确规定：    - "Gas consumption" 就`

**调用步骤**

| # | 工具 | 参数（截 200） |
|---|---|---|
| 1 | `skill` | `{"name":"sop"}` |
| 2 | `dlr_semantic_query` | `{"question":"gas consumption peak month for SME customers in 2013"}` |
| 3 | `dlr_search_consensus` | `{"question":"gas consumption peak month for SME customers in 2013"}` |
| 4 | `dlr_search_consensus` | `{"namespace":"debit_card_specializing","question":"gas consumption peak month for SME customers in 2013"}` |
| 5 | `get_pe_mapping` | `{"pe_id":"PHYSICAL.YearMonth"}` |
| 6 | `get_pe_mapping` | `{"pe_id":"PHYSICAL.Customer"}` |
| 7 | `execute_sql` | `{"database_url":"D:\\Code_Proj\\DLR Proj\\MINIDEV_sqlite\\dev_databases\\debit_card_specializing\\debit_card_specializing.sqlite","sql":"SELECT substr(y.Date, 5, 2) AS peak_month FROM yearmonth y JOIN` |
| 8 | `execute_sql` | `{"database_url":"D:\\Code_Proj\\DLR Proj\\MINIDEV_sqlite\\dev_databases\\debit_card_specializing\\debit_card_specializing.sqlite","sql":"SELECT y.Date, SUM(y.Consumption) AS total FROM yearmonth y JOI` |

**依据与结论**（agent 原文）

#### 结论

**2013 年 SME 客户的燃气消费峰值月份是 2013 年 4 月。**

##### 推理链路

1. **L3（`sop` 技能，权威口径）** — SOP 中有完整复述本题的节：*"What was the gas consumption peak month for SME customers in 2013?"*。该节明确规定：
   - "Gas consumption" 就是这些客户的消费金额本身，**不存在单独的 gas/energy 类目**，不要去找燃料类型；
   - 峰值月 = 把 SME 客户 2013 年内的消费**按月加总**，取总额最高的那个月；
   - **答案格式**：题目问的是"month"，只给月份本身（如 `04`），**不要给完整年月码 `201304`，也不要附带总额**。

2. **L2（领域共识）** — 检索命中 `qid 16`：Gas consumption = 客户在加油站的月度总消费（CZK），是按客户-月预聚合的指标；`qid 14`：peak month 逻辑 = 按月聚合取最大值；`qid 19`：涉及客户月度消费应用 `yearmonth`（全量聚合），而非 `transactions_1k`（1000 行采样）。

3. **L1（语义召回）→ 物理映射（`get_pe_mapping`）** — 锚定两个 PE：
   - `PHYSICAL.YearMonth` → 表 `debit_card_specializing.yearmonth`，列 `CustomerID` / `Date`（YYYYMM 文本）/ `Consumption`（REAL）
   - `PHYSICAL.Customer` → 表 `debit_card_specializing.customers`，列 `Segment`（`SME`=Small Business）
   - ARC `A_anchor` = `CustomerID`（yearmonth N:1 customers）→ JOIN 依据

4. **SQL 执行** — 按 ARC 以 `CustomerID` JOIN，过滤 `Segment='SME'` 且年份 2013，按月求和取最大 → **`04`**（即 201304，合计 126,047,776.92 CZK，高于 5 月的 125,616,906.33）。

##### 数据来源
- L3：`sop` 技能 — "What was the gas consumption peak month for SME customers in 2013?" 节
- L2：`dlr_search_consensus`（namespace `debit_card_specializing`，qid 16 / 14 / 19）
- L1 + 映射：`dlr_semantic_query` → `get_pe_mapping`（`PHYSICAL.YearMonth`、`PHYSICAL.Customer`，database_url 取自 PE）
- 数据：`execute_sql` 对 `debit_card_specializing.sqlite` 的查询结果

```
Final Answer: 04
Evidence SQL: SELECT substr(y.Date, 5, 2) AS peak_month FROM yearmonth y JOIN customers c ON y.CustomerID = c.CustomerID WHERE c.Segment = 'SME' AND substr(y.Date, 1, 4) = '2013' GROUP BY y.Date ORDER BY SUM(y.Consumption) DESC LIMIT 1;
```

</details>

<details>
<summary><b>q1500</b> · debit_card_specializing · ⚠️ <b>UNCERTAIN</b>（-）· 5 步 / 9 工具 · 45,849 tok</summary>

**问题**：Please list the product description of the products consumed in September, 2013.

**期望**：`Nafta | Nafta | Provoz.nápl. | Natural | Nafta | Natural | Natural | Nemrz.kapal.`

**答案**：`## 结论 **September 2013 没有任何产品被消费——结果为空列表。** ### 依据 **L3（'sop' 技能，本题有精确命中节）** — 技能中 "Please list the product description of the products consumed in September, 2013." 一节明确规定： - 个人购买记录（individual-purcha`

**调用步骤**

| # | 工具 | 参数（截 200） |
|---|---|---|
| 1 | `skill` | `{"name":"sop"}` |
| 2 | `dlr_semantic_query` | `{"question":"product description of products consumed in September 2013"}` |
| 3 | `dlr_search_consensus` | `{"question":"product description of products consumed in September 2013"}` |
| 4 | `dlr_search_consensus` | `{"namespace":"debit_card_specializing","question":"product description of products consumed in September 2013 individual purchase date coverage"}` |
| 5 | `get_pe_mapping` | `{"pe_id":"PHYSICAL.Transaction"}` |
| 6 | `get_pe_mapping` | `{"pe_id":"PHYSICAL.Product"}` |
| 7 | `execute_sql` | `{"sql":"SELECT MIN(Date) AS min_date, MAX(Date) AS max_date, COUNT(*) AS n FROM transactions_1k","database_url":"D:\\Code_Proj\\DLR Proj\\MINIDEV_sqlite\\dev_databases\\debit_card_specializing\\debit_` |
| 8 | `execute_sql` | `{"sql":"SELECT DISTINCT p.Description FROM transactions_1k t JOIN products p ON t.ProductID = p.ProductID WHERE t.Date >= '2013-09-01' AND t.Date <= '2013-09-30'","database_url":"D:\\Code_Proj\\DLR Pr` |
| 9 | `execute_sql` | `{"database_url":"D:\\Code_Proj\\DLR Proj\\MINIDEV_sqlite\\dev_databases\\debit_card_specializing\\debit_card_specializing.sqlite","sql":"SELECT DISTINCT p.Description AS product_description FROM trans` |

**依据与结论**（agent 原文）

#### 结论

**September 2013 没有任何产品被消费——结果为空列表。**

##### 依据

**L3（`sop` 技能，本题有精确命中节）** — 技能中 "Please list the product description of the products consumed in September, 2013." 一节明确规定：
- 个人购买记录（individual-purchase records）只是一个 **四天样本**，覆盖 2012-08-23 ~ 2012-08-26，除此之外没有任何记录
- 该窗口之外的任何月份都没有已记录的购买，因此 2013 年 9 月的真实答案就是**空列表**
- 只需验证一次覆盖范围（最早/最晚购买日期），然后作答空列表并停止——不要尝试其他日期格式或 JOIN 路径
- **禁止使用代理路线**："找出 2013 年 9 月活跃的客户，再取他们的购买记录"——这会把那些客户 2012 年 8 月样本期的购买归因到 2013 年 9 月，与题目的时间语义矛盾

**L1（`dlr_semantic_query` + `get_pe_mapping`）** — 锚定到 `LOGICAL.Consumption`：
- `PHYSICAL.Transaction`（`transactions_1k`）→ 明细购买记录，列 `Date`（日历日期 YYYY-MM-DD）、`ProductID`
- `PHYSICAL.Product`（`products`）→ 列 `Description`
- JOIN 键：`transactions_1k.ProductID = products.ProductID`（ARC `A_anchor`，1:1）
- `database_url`: `.../debit_card_specializing.sqlite`

**L2（`dlr_search_consensus`）** — qid=19 印证："`transactions_1k` is a 1000-row sample of individual purchase records for transaction-level detail"。产品/明细类问题须用 `transactions_1k`，且以购买记录自身的日期为唯一时间过滤口径（不能被客户月度汇总 `yearmonth` 替代）。

**数据验证（`execute_sql`）**：
- 覆盖范围：`MIN(Date) = 2012-08-23`，`MAX(Date) = 2012-08-26`，共 1000 行 → 确认样本窗口仅为 2012 年 8 月 23–26 日
- 2013 年 9 月的产品描述查询返回 0 行

```
Final Answer: []
Evidence SQL: SELECT DISTINCT p.Description AS product_description FROM transactions_1k t JOIN products p ON t.ProductID = p.ProductID WHERE strftime('%Y-%m', t.Date) = '2013-09'
```

</details>
