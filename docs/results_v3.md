## 评测进度 — 语义+RAG+SOP 三通道模式 (round_2)

> **说明**: v3 = 三通道模式（见 3-channel-design.md）：Agent 不拿 evidence，纯 question 驱动三通道并行锚定——Ch1 语义（MCP 语义层）、Ch2 RAG（`search_evidence` 检索）、Ch3 SOP（前置读 `skills/{db}.md`），交叉验证后 mapping -> SQL。
> **数据来源**: `validated_results/v3_final/{pair}/agent_stats.csv`（per-pair，如 `1473-1476/`）
> **配置文件**: `config.json` → `output_dir: "Evaluation/outputs2"`, `round: "v3_final"`

> ⚠ **v3_final 重置（2026-08-27）**：旧归档 38 题（evidence 注入批次，含 v2 150 题基线）全部作废清空。自 08-27 起重新归档：纯 question + 三通道（Ch1 语义 / Ch2 RAG / Ch3 skills）+ 数据集原始 gold + judge 争议裁决。旧数据仅作历史参考，见 v2_baseline 与 git 历史。

### 架构变化 (vs v2)

| | v2 (round_1) | v3 (round_2) |
|---|---|---|
| evidence 来源 | prompt 注入 | 无（纯 question，三通道主动锚定） |
| 检索通道 | 单通道（被动接收） | Ch1 语义 / Ch2 RAG / Ch3 SOP 并行 |
| DLR 工具数 | 20 | 4 |
| 评测输出 | `outputs/` | `outputs2/` |
| 归档 | `validated_results/v2_final/` | `validated_results/v3_final/` |
| 知识库 | 无 | `rag_knowledge/*.jsonl` (11 topics) + `skills/*.md` |

> **DLR 工具 20→4**：按 387 runs 使用率统计收敛为核心链路 4 工具——`dlr_semantic_query`（Ch1 语义入口）/ `dlr_search_evidence`（Ch2 RAG）/ `get_pe_mapping`（LE→PE 映射）/ `get_le_attrs`（LE 属性）；其余 14 个探索类工具（`recall_*`/`path_*`/`is_*` 等）使用率 <5% 且诱发过度探索，v3 停止注册（`execute_sql` 三范式共用，不计入）。

### Agent 流程（三通道，见 3-channel-design.md）

```
question → [Ch1 semantic_query + Ch2 search_evidence + Ch3 skills/{db}.md 并行]
        → 交叉验证锚定 → mapping → SQL → Final Answer
```

---

## 评测进度

| 数据库 | 全量 | 已评 | 剩余 | 进度 |
|--------|------|------|------|------|
| debit_card_specializing | 30 | 30 | 0 | 100.0% |
| card_games | 52 | 0 | 52 | 0% |

> **总结**：共测试 30 题 × 3 范式 = **90 题次**；其中缺陷题 12/30（40%，gold/evidence 自带口径错误——COUNT 记录数当客户数、采样表当全量、矛盾公式、笛卡尔积 JOIN 等，明细见逐题表）——三范式 strict FAIL 后由 judge 依知识层翻正，**evidence 在本框架中是被裁决对象而非金标准**（判序链 disputes > SkillPath(SOP) > KnowledgePath > evidence 字面，evidence 字面排最末）。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 30/30 (100.0%) | **30/30 (100.0%)** | 29/30 (96.7%) |
| strict PASS | 10/30 (33.3%) | 13/30 (43.3%) | 12/30 (40.0%) |
| 平均 token | 86,216 (+15.9% vs DLR) | **74,375** | 75,739 (+1.8% vs DLR) |

> **口径**：上表仅覆盖 debit_card_specializing 30 题（card_games 52 题未评），勿外推为全数据集结论。

---

## 逐题校验表

### debit_card_specializing

| 数据库 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 共通 | ER-备注 | DLR-备注 | RDF-备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|--------|--------|--------|
| debit_card_specializing | q1471 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 75,889 | **45,156** | 65,446 | 题目/evidence 无缺陷；Ch3 无本题条目；EUR/CZK 比值口径无分歧 | strict FAIL 为 4 位舍入差（Pred 0.0657 = gold 0.065728 舍入至 4 位小数的同值，非不同数），judge 按舍入级翻正 | execute_sql 仅 1 次，4 步 45,156 tok 三范式最省 |  |
| debit_card_specializing | q1472 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 155,128 | **104,772** | 107,120 | 题目 LAM/consumption 语义过泛（LAM=segment 歧义）；Ch3 本题无条目，纯 Ch1+Ch2 解出 | Ch1 漂移至 card_games；Ch2×5 反复探测（top 0.60），execute_sql×8，11 步 155,128 tok 三范式最贵 | Ch1 唯一首中；Ch2×2 全命中；8 步 104,772 tok | Ch1 漂移至 formula_1 后 3 次 query 才回正；Ch2×2、rdf_search×2，9 步 107,120 tok |
| debit_card_specializing | q1473 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 75,987 | **57,091** | 76,141 | 缺陷题——evidence/gold 公式 AVG/12 与 yearmonth 月度粒度矛盾（双重除法，2013 SME 人均仅 8.0 个月记录）；三范式 Pred 一致按数据语义作答致 strict 全 FAIL；Ch3 本题条目口径=AVG 不除 12，judge 依此全翻 CORRECT | Ch1 单发首中；Ch2 单发命中（top=1473 未带偏）；execute_sql×3，7 步 75,987 tok | Ch1×2、Ch2×2（1 命中）；execute_sql 仅 1 次，5 步 57,091 tok 三范式最少 | Ch1×2、Ch2 单发命中（top=1482）；execute_sql×3，7 步 76,141 tok |
| debit_card_specializing | q1476 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 109,335 | 72,354 | **70,780** | 题目/evidence 无缺陷；CZK/EUR 消歧无分歧，数值一致（402,524,570.17）；Ch3 无本题条目 | Ch1×2、Ch2×2（1 命中）；execute_sql×6 + get_table_schema×2 探测偏多，9 步 109,335 tok 最贵 | Ch1 单发首中；execute_sql×2，6 步 72,354 tok | 结果多带两列拆分值（CZK 总额/EUR 总额）→ strict 列数不匹配 FAIL，judge 按多余列不扣分翻正；6 步 70,780 tok |
| debit_card_specializing | q1479 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 102,417 | 91,418 | **70,924** | 题目/evidence 无缺陷（"gas"即消费额而非站点实体）；Ch3 本题条目（gas=消费额非站点的词义裁定，路径自寻）生效——三范式自行路由 yearmonth JOIN customers 且带 CZK 过滤；ER 仅返回年份列 strict PASS，DLR/RDF 多带金额列 judge 翻正 | 首跳漂 california_schools 后自纠回正；execute_sql×3 + get_table_schema×1，8 步 102,417 tok 三范式最贵 | 自行经 PE mapping（YearMonth/Customer 弧）锚定路由，execute_sql 仅 1 次，7 步 91,418 tok | 无异常；execute_sql×2，6 步 70,924 tok 最省 |
| debit_card_specializing | q1480 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **55,710** | 68,376 | 72,339 | 题目/evidence 无缺陷；Ch3 本题条目（返回两位月份+格式对齐）生效——ER/DLR 按条目返回 "04" 直接 PASS | 无异常；5 步 55,710 tok 最省 | 无异常；6 步 68,376 tok | 值 "04" 正确但多带 total 列 → 列数不匹配 strict FAIL，judge 翻正；rdf_search×4 探测偏多，6 步 72,339 tok 最贵 |
| debit_card_specializing | q1481 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | **100,924** | 119,001 | 130,122 | 缺陷题——gold 算全段客户均值差（[-582092.86, 582092.86, 0]），未筛每段最低消费客户；Ch3 本题条目（每段最低客户年度总消费、不除 12；09-04 补负值提示：年总额可为负=退款/冲正合法数据，不过滤不复核）生效——ER/DLR 按条目算出裁定口径 [-14009.34, 6046.62, 7962.72]，judge 依裁定翻正 | 条目负值提示后重跑（09-04）：负值核验循环消失，7 步 100,924 tok（旧 87,365）；重跑对照见案例 3 | 条目负值提示后重跑（09-04）：7 步 119,001 tok（旧 97,023）；两轮均 CORRECT 稳定 | SQL 漏 Currency='CZK'（JOIN customers 无 WHERE）→ LAM 最低客户取到混合货币口径 -186.18（vs CZK 口径 2.24），前两差值各偏 188.42 → INCORRECT；三轮实录 0829 丢 CZK→0902 带 CZK CORRECT→0904 丢 CZK，同一知识层下 CZK 谓词编译为单轮方差（条目第一句即 "sum 2013 CZK consumption"，非知识缺口）；负值提示后 8 步 130,122 tok（旧 159,092，-18%） |
| debit_card_specializing | q1482 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 71,091 | **64,087** | 84,788 | 缺陷题——gold 分母用 2012 且未滤 EUR；evidence 规定除 2013（非常规口径），三范式均按数学常识除 2012 致 strict 全 FAIL；disputes 补判口径：问题问 which segment，答案=排序，三范式排序一致（SME 最高/LAM 最低）→ judge 全翻 CORRECT；Ch3 无本题条目 | 无异常；Ch2×3（2 命中）探测略多；execute_sql×5，6 步 71,091 tok | 无异常；execute_sql×3，5 步 64,087 tok 最省 | 无异常；execute_sql×6，7 步 84,788 tok 最贵 |
| debit_card_specializing | q1483 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 89,939 | 59,145 | **55,272** | 题目/evidence 无缺陷；Ch3 无本题条目 | execute_sql×3 + get_table_schema×1 探测偏多，8 步 89,939 tok 三范式最贵 | 无异常；execute_sql×2，5 步 59,145 tok | 无异常；execute_sql 仅 1 次，5 步 55,272 tok 最省 |
| debit_card_specializing | q1484 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 67,681 | 68,072 | **65,684** | 题目/evidence 无缺陷；Ch3 无本题条目 | 无异常；6 步 67,681 tok | 无异常；Ch2×2 全命中；execute_sql×2，6 步 68,072 tok | 无异常；Ch1×2；execute_sql×2，6 步 65,684 tok 最省 |
| debit_card_specializing | q1486 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 66,580 | 59,278 | **57,478** | 题目/evidence 无缺陷；Ch3 本题条目（差值单列收口）生效--三范式均只返回 diff=23505 单列，strict 全 PASS 免仲裁 | 无异常；Ch1×2；execute_sql×2，6 步 66,580 tok | 无异常；execute_sql 仅 1 次，5 步 59,278 tok | 无异常；execute_sql 仅 1 次，5 步 57,478 tok 最省 |
| debit_card_specializing | q1490 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 72,417 | 59,271 | **57,400** | 缺陷题--gold 两处 bug（数 customer-month 记录非客户、INNER JOIN 丢 47 无记录客户）；Ch3 本题条目（percent of customers 口径：客户总消费聚合+LEFT JOIN）与 agent 自发行为一致（3599/3658=98.39），未按 evidence 记录口径 -> strict 全 FAIL，judge 依 disputes 全翻 CORRECT | 无异常；Ch1×2 回正后直锚，execute_sql×2，6 步 72,417 tok | 无异常；Ch1 单发首中；execute_sql 仅 1 次，5 步 59,271 tok | 无异常；execute_sql 仅 1 次，5 步 57,400 tok |
| debit_card_specializing | q1493 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **68,462** | 70,648 | 85,038 | 缺陷题--gold 分母数 Feb2012 有记录客户（18,324，得 66.62%）而非全部客户，分子相同（12,208）；"percentage of customers" 语义应含全部客户（32,461，37.61%），属 q1490 已裁同型缺陷；Ch2 检索命中 q1490 泛化知识（客户级分母须含全部客户、先聚合后过阈值），三范式全部自发按客户口径 LEFT JOIN 作答，strict 全 FAIL，judge 依知识层口径全翻 CORRECT；Ch3 无本题条目 | 判序置顶重跑（09-01）：5 步 68,462 tok（旧 72,816） | 判序置顶重跑（09-01）：首条 SQL 即完整嵌套计算，旧跑 5 条验证 SQL（含 1 条双语句报错）全消失，5 步 70,648 tok（旧 111,790，-37%） | 重跑 6 步 85,038 tok（旧 90,440） |
| debit_card_specializing | q1498 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 106,199 | 73,887 | **68,312** | 题目/evidence 无缺陷（"highest monthly consumption"辖域两读，gold 口径=按月 SUM 聚合取最大月总消费 51,787,161.74）；Ch3 本题条目（辖域消歧：whole-year 无主语问 highest monthly = 按月 SUM 后取最大月总量，禁 MAX(Consumption) 裸行值）生效--三范式按月聚合 strict 全 PASS 免仲裁 | 验证性查询偏多--execute_sql×5，9 步 106,199 tok 三范式最贵 | 无异常；GROUP BY 月+SUM DESC LIMIT 1，execute_sql×2，6 步 73,887 tok | 无异常；6 步 68,312 tok 最省 |
| debit_card_specializing | q1500 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 98,086 | 59,532 | **43,554** | 缺陷题——transactions_1k 仅覆盖 2012-08-23~26，题面问的 2013-09 样本外零交易，语义正答=空列表；gold 走 yearmonth(201309) 圈客户代理 JOIN 其历史交易（时间语义相悖）；Ch3 本题条目（样本窗口事实+空集即真话+禁代理）生效——三范式验一次覆盖即答空集，judge 依 SkillPath 全翻 CORRECT | 8 步 98,086 tok 三范式最贵（3 次 SQL 验证覆盖）；返回空列表 | 自行读弧确认路由后 1 次 SQL 收口，5 步 59,532 tok | 4 步 43,554 tok 最省；返回空列表 |
| debit_card_specializing | q1501 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **45,585** | 47,565 | 45,795 | 同 q1500 缺陷型（201306 样本外月份，gold 代理 JOIN 得 CZE/SVK）；Ch3 本题条目（同窗口事实+空集+禁代理+路径自寻）生效——三范式 4~5 步收敛答空集；DLR 自行经 PE 弧确认站点侧入口，judge 依 SkillPath 全翻 CORRECT | 4 步 45,585 tok 三范式最省；返回空列表 | 4 步 47,565 tok，execute_sql 仅 1 次 | 4 步 45,795 tok；返回空列表 |
| debit_card_specializing | q1505 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **55,695** | 62,142 | 64,240 | 缺陷题——gold COUNT(*) 计 customer-month 记录（2730 人次），"how many of them"（them=customers）应计客户数；Ch3 本题条目（计数量词=客户，任一月>1000 即合格）生效——三范式均 COUNT DISTINCT 得 391，judge 依 disputes 裁定+SkillPath 全翻 CORRECT | execute_sql 仅 1 次，5 步 55,695 tok 最省 | execute_sql 仅 1 次，5 步 62,142 tok | execute_sql 仅 1 次，5 步 64,240 tok |
| debit_card_specializing | q1506 | FAIL | CORRECT | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 123,188 | 97,057 | **72,000** | 题目/evidence 无缺陷；Ch3 无本题条目，纯 Ch1+Ch2 解出 | GROUP_CONCAT 聚合为 1 行→ 列形状不匹配 strict FAIL，judge 按多余列/等价值翻正；execute_sql×5，9 步 123,188 tok 三范式最贵 | GROUP_CONCAT 聚合为 1 行→ strict FAIL，judge 翻正；execute_sql×4，7 步 97,057 tok | 逐行返回 21 个描述与 gold 完全一致 strict PASS 免仲裁；6 步 72,000 tok 最省 |
| debit_card_specializing | q1507 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **57,315** | 81,801 | 103,864 | 题目/evidence 无缺陷（evidence 为空仅 2 题之一，纯 Ch1+Ch2 解出；chain no. 11 无歧义） | GROUP_CONCAT 聚合为 1 行→ 列形状 strict FAIL，judge 按等价值翻正；5 步 57,315 tok 最省 | 逐行返回 distinct 时间与 gold 一致 strict PASS 免仲裁；6 步 81,801 tok | GROUP_CONCAT 聚合为 1 行→ strict FAIL，judge 翻正；Ch1×2 后回正，8 步 103,864 tok 最贵 |
| debit_card_specializing | q1509 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 86,066 | **67,951** | 74,136 | 题目/evidence 无缺陷（CZE 条件 + 2012/1/1 后对全样本恒真，即全部 CZE 交易）；Ch3 无本题条目，纯 Ch1+Ch2 解出——三范式 strict 全 PASS 免仲裁 | 无异常；7 步 86,066 tok | execute_sql×4 偏多但全 PASS；5 步 67,951 tok 最省 | 无异常；6 步 74,136 tok |
| debit_card_specializing | q1514 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 80,197 | **66,386** | 88,172 | 题目/evidence 无缺陷（日期格式转换提示）；Ch3 无本题条目，纯 Ch1+Ch2 解出 | 无异常；execute_sql×5 探测略多，7 步 80,197 tok | 返回 3 行重复 CZK（无 DISTINCT）→ 行数与 gold 不符 strict FAIL，judge 按值等价翻正；5 步 66,386 tok | 无异常；7 步 88,172 tok |
| debit_card_specializing | q1515 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 92,593 | 79,901 | **73,520** | 题目/evidence 无缺陷；Ch3 无本题条目，纯 Ch1+Ch2 解出 | 多带 CustomerID 列→ 列形状 strict FAIL，judge 按多余列不扣分翻正；7 步 92,593 tok 三范式最贵 | 无异常；6 步 79,901 tok | 无异常；6 步 73,520 tok 最省 |
| debit_card_specializing | q1521 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 75,170 | 71,421 | **61,210** | 题目/evidence 无缺陷；Ch3 有本题条目（09-01 新增："transactions" 字面撞 financial 的建模级召回冲突消歧）；三范式 strict 全 PASS 免仲裁 | 无异常；6 步 75,170 tok（含 summary 调用） | 判序置顶+条目命中：step2 早读 skills、financial 死路消失，5 步 71,421 tok（重跑前 7 步 101,743） | 5 步 61,210 tok；execute_sql 仅 1 次 |
| debit_card_specializing | q1524 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 63,136 | 90,562 | **60,962** | 题目/evidence 无缺陷；"nationality"=加油站所在国（kid18 领域约定，非客户表字段）、"spent 548.4"=单笔交易价格；Ch3 无本题条目，Ch2 命中 kid18 解出 | 多带 CustomerID 列→ 列形状 strict FAIL，judge 按多余列不扣分翻正；5 步 63,136 tok | 无异常；7 步 90,562 tok | execute_sql 仅 1 次，5 步 60,962 tok 最省 |
| debit_card_specializing | q1525 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **62,147** | 65,656 | 75,884 | 缺陷题——gold 计交易人次得 1.65%，"percentage of the customers" 应计客户数（7/259=2.70%）；Ch3 本题条目（客户口径）生效——三范式均 COUNT DISTINCT 得 2.70%，judge 依 disputes+SkillPath 全翻 CORRECT | execute_sql×3，5 步 62,147 tok 最省 | execute_sql 仅 1 次，5 步 65,656 tok | execute_sql×3，6 步 75,884 tok |
| debit_card_specializing | q1526 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 129,150 | **106,411** | 113,946 | 缺陷题——gold 子查询多 JOIN gasstations 无匹配返回 NULL；Ch3 本题条目（paid 634.8=单笔交易价格定位客户；decrease rate 用该客户 2012/2013 年度消费合计）生效——三范式均得 -5.8152（-581.52% 同值换算，kid5 公式授权 *100%），judge 依 disputes 全翻 CORRECT。首判 ER 曾因裁定只写裸比率 -5.8152 被判 100 倍差 INCORRECT（judge 宽严不一致实录），裁定补等价形式后重判三范式全 CORRECT | 9 步 129,150 tok（旧 130,044）；重判翻正（首判 INCORRECT：百分比表示被判与裁定差 100 倍） | 首条 SQL 即条目口径，7 步 106,411 tok（旧 151,450，-30%） | 8 步 113,946 tok（旧 93,781，验证查询增多） |
| debit_card_specializing | q1528 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 89,360 | 82,877 | **70,687** | 题目/evidence 无缺陷（evidence 为空仅 2 题之一；"premium" 是 gasstations.Segment 值域，非客户段位）；Ch3 无本题条目——三范式答案一致 35.68%（314/880），strict FAIL 为列名/格式差，judge 全翻 CORRECT | execute_sql×3，7 步 89,360 tok 三范式最贵 | Ch2×2 全命中；6 步 82,877 tok | Ch2×2 全命中；6 步 70,687 tok 最省 |
| debit_card_specializing | q1529 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 64,119 | 61,979 | **60,665** | 缺陷题——gold 笛卡尔积 JOIN（8×20=160 行）+ 采样表当全量；Ch3 本题条目（总花费=客户全量月度消费合计，非采样单笔价格）生效——三范式均取 yearmonth 全量口径（5,124,646.35 / 2012-01 67,156.94），judge 依 disputes 全翻 CORRECT | execute_sql×3，5 步 64,119 tok 最省 | execute_sql×2，5 步 61,979 tok | execute_sql 仅 1 次，5 步 60,665 tok |
| debit_card_specializing | q1531 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 113,127 | **87,939** | 111,971 | 缺陷题——gold SUM(Price/Amount) 与 evidence 公式矛盾（203.86 vs 22.55）；Ch3 本题条目（top 客户=全量月度总消费；均价=总和相除）生效——三范式均得 22.55/12459/CZK，judge 依 disputes 全翻 CORRECT | execute_sql×5，8 步 113,127 tok | execute_sql×5，6 步 87,939 tok 最省 | execute_sql×5，8 步 111,971 tok |
| debit_card_specializing | q1533 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 133,773 | 89,505 | **84,713** | 难题（多步组合：单价比筛选+月度状态输出）；Ch3 本题条目（Price/Amount 口径+201208 月值）生效——三范式均按单价比口径得 10 行月值，judge 全翻 CORRECT；条目对照：DLR 156,572→89,505 tok（-43%）且口径翻正 | 无异常；9 步 133,773 tok 三范式最贵 | 无异常；6 步 89,505 tok | 无异常；6 步 84,713 tok 最省 |
> **Token = input_tokens + output_tokens**
> **备注分栏**: 共通 = 题目/evidence/Ch3 问题（跨范式共同根源）；ER/DLR/RDF-备注 = 该范式本题的异常、错误及后果（空 = 无异常无特异观察）
> **数据来源**: `validated_results/v3_final/{pair}/agent_stats.csv`（per-pair，如 `1473-1476/`）

---

## 三通道合理性论证——SOP 条目案例

> 三通道分工：Ch1 语义锚定"在哪"（库/表），Ch2 RAG 映射"是什么"（术语→列/值），Ch3 SOP 捕获"这题怎么坑"（领域口径/格式陷阱），且消费者不止 3 个 Agent——judge 事后仲裁也读同一文件（判序 disputes > SkillPath(SOP) > KnowledgePath > evidence 字面）。SOP 通道的合理性取决于它是否解决了 Ch1/Ch2 结构上解决不了的问题——当前 16 题有 SOP 条目：9 题为案例 1-7 的对照分析题（6 题覆盖四类盲区，3 题 q1490/q1500/q1501 为非盲区形态：Ch2 泛化知识已含口径 / 行为本已对，条目价值=收敛+仲裁锚点），7 题为收官批次新增（q1505/q1521/q1525/q1526/q1529/q1531/q1533，逐题表现见逐题表）：
> **① 知识冲突/污染**（Ch2 自身携带错误公式，需第三通道仲裁）→ q1473、q1481；**② 格式约定**（Ch1/Ch2 都不含答案格式约束，含值的格式与列的形状）→ q1480、q1486；**③ 跨域词义偏导**（Ch1/Ch2 都把题面词义匹配到错误业务域，需更高阶通道消歧）→ q1479、q1521（"transactions" 字面撞 financial 的建模级召回冲突消歧首例）；**④ 量词辖域歧义**（题面量词辖域两读均自洽，Ch1/Ch2 信息全对也无法裁定）→ q1498、q1505、q1525（计数单位=客户，非 customer-month 记录/交易人次）；**④ 同型的业务口径辖域**（单笔价格定位/全量月度合计/总和相除/单价比——题面业务词两种读法在 schema 内均自洽）→ q1526、q1529、q1531、q1533；**非盲区形态**（Ch2 泛化知识已含正确口径，条目价值=收敛+仲裁锚点而非纠错）→ q1490、q1500、q1501。
> 新增 7 题全部落入既有盲区类型（③/④ 的延伸形态，无新类别）——四类盲区框架经 16 题检验收敛成立；其中 q1521/q1526/q1533 含重跑对照（DLR 101,743→71,421 / 151,450→106,411 / 156,572→89,505 tok，判序置顶+条目生效的合并效果，归因不拆分），其余 4 题条目先于首跑就位、无对照批次。

### 案例 1：q1473 — SOP 仲裁知识冲突（事前条目）

- 缺陷题：evidence/gold 公式 `AVG(Consumption)/12` 与 yearmonth 行语义（每行已是月度值）矛盾
- 无 SOP 的后果：Ch2 检索到错误公式，Ch1 无口径概念——**没有任何一层能仲裁**，三范式都会跟着除 12，答案 12 倍偏小
- 有条目后：Ch3 条目明确"月度值直接 AVG，不除 12"，三范式 Pred 一致按表语义作答（5519.48）；judge 判序 SOP>RAG，依条目全翻 CORRECT
- 证明点：**SOP 是知识冲突的仲裁层**——冲突来自 Ch2 自身携带的错误公式，只有第三通道能裁决

### 案例 2：q1480/q1486 — SOP 对齐答案格式与列形状（事后准入 + 重跑对照）

- 陷阱：问题问"月份"，gold 期望纯月份 `"04"`；Agent 自然返回完整年月 `"201304"`（ER/DLR）或附带总额列（RDF）——evidence 只讲 Date 取位，不含格式约定
- 无条目批次：strict 0/3 PASS，全部依赖 judge 等价翻正
- 补条目（返回两位月份，SQL 执行完对齐格式）重跑：**ER/DLR 返回 `"04"` 直接 strict PASS**（ER 55,710 tok，5 步，三范式最省）；RDF 值对齐但未遵守"仅月份一列"，仍 FAIL 由 judge 翻正
- 证明点：**格式对齐约定既不在 Ch1 语义层、也不在 Ch2 知识层，只能由 SOP 表达**；条目有效性有对照数据：strict PASS 0/3 → 2/3
- 同型题 q1486（“how many more” 差值题）：旧批次 DLR/RDF 返回 czk_cnt/diff/eur_cnt 三列（拆分值多带两列）→ strict 列数不匹配 FAIL、judge 翻正；补条目（“how many more” 只答差值单列）重跑：三范式均单列 diff=23505，**strict 3/3 全 PASS 免仲裁**；token ER 83,293→66,580、RDF 72,378→57,478，DLR 59,129→59,278 持平
- 证明点补充：列形状与值格式同属②类盲区——gold 只规定“什么值”、不规定“几列什么形状”；两题对照 strict 0/3→2/3（值格式）与 1/3→3/3（列形状）

### 案例 3：q1481 — SOP 对抗知识污染（事后准入，INCORRECT→CORRECT 对照）

- 陷阱：Ch2 检索命中 RAG 库 kid7 的 "/12 子句"（"dividing by 12 for annual average"），把"每段最低客户的年度总消费均值"错成 ÷12 的月值（首跑 ER/DLR 答案恰为裁定值 ÷12，RDF 600s 超时）——三范式全 INCORRECT
- 补条目（每段取最低客户、年度总消费不除 12）重跑：**ER/DLR 算出裁定口径 [-14009.34, 6046.62, 7962.72] 直接翻 CORRECT**；RDF 仍 INCORRECT，但错误类型已切换为"漏 CZK 过滤"（范式自身行为，非知识污染）
- 证明点：**SOP 能修复知识污染级的整体失败**（不只是格式微调）——判定结果 INCORRECT→CORRECT 的对照，比 q1480 的 strict FAIL→PASS 更强；且 judge 判序 SOP>RAG 使条目在与 RAG 知识冲突时稳定获胜
- **有效性→效率的补强（09-04 负值提示 A/B）**：SOP 有效≠高效——条目判对口径但没裁负值（数据库含 152 行负消费=退款语义，三通道均未记载），agent 两轮各烧 6-8 步「负值 suspicious→分布核验→复核来源」循环（RDF 0902 轮 305K tok，reasoning ×6.6）。条目补一句「年总额可为负，负值即答案，不过滤不当异常不复核」重跑：核验循环消失，RDF 8 步 130,122 tok（**-57%**）、ER 100,924 / DLR 119,001 同降。**边界同轮显形：CZK 谓词提示治不了**——三轮 RDF 丢 CZK→带 CZK→丢 CZK（条目第一句即 "sum 2013 CZK consumption"，非知识缺口），单轮编译方差属 agent 架构层。知识提示的边际收益递减是设计使然：若每维提示都能无差别覆盖底层能力，三通道+ReACT 就退化为查表——**提示收敛「想不通」的成本，架构承载「写不写得对」的能力，二者不可互相替代，后者正是被测对象**

### 案例 4：q1479 — SOP 消解跨域词义偏导（词义裁定与路径处分的分层验证）

- 偏导证据：题面 "consumption of gas" 中 gas 被 Ch1 语义召回匹配到 **GasStation 实体（加油站）**而非消费记录（DLR 返回 Top1=GasStation、Top2 才是 Consumption；ER 返回 Top2=gasstations 表、yearmonth 排第 5）；Ch2 连锁反应——agent 顺 gas 词义猜 namespace=gas_consumption 落空重试；Customer 实体（Currency 所在）不进召回前列，agent 用 2 条验库 SQL 补信息，DLR 8 步 101,077 tok 三范式最贵
- 条目 v1（含路径处方：锚 yearmonth 不锚 gasstations + join customers 滤 CZK）重跑：**DLR 101,077→72,474 tok（-28%），验库探索消失（execute_sql 4→1）；RDF 53,184 tok 且 SQL 首次带上 CZK 过滤**（旧批次完全漏 JOIN 侥幸 PASS）；ER 65,235（-17%）。副作用："Sum+top"引导使三范式均多带 total 列 → strict 全 FAIL，judge 全翻——处方版条目的降幅里混着"词义裁定"与"免费路由"两笔账，分不开
- 条目 v2（08-31 无路径处方原则后修剪：只留"gas=消费额非站点"词义裁定，路由改为自行从 schema/mapping 找）重跑：**token 全升（ER 102,417 / DLR 91,418 / RDF 70,924）——处方移除后路径发现回归范式层，这是三范式各自路由能力的真实成本**；三范式仍全部自行路由 yearmonth JOIN customers 且带 CZK 过滤；ER 仅返回年份列 strict PASS（优于旧批多带列）；**DLR 7 步内自行经 PE mapping（YearMonth/Customer 弧）锚定，execute_sql 仅 1 次**
- 证明点：**词义裁定与路径发现是两个层**——gas 偏导（跨域词义）是 Ch1/Ch2 的结构盲区，必须由 Ch3 裁定；但"锚哪张表、JOIN 谁"是各范式表征层的被测能力，写进 SOP 等于把 DLR 的弧结构免费发给 ER/RDF、抹平范式差异（q1500/q1501 三轮对照同证）。分层后 DLR 弧路由优势显现：1 次 SQL 收口 vs ER 3 次 + schema 探测

### 案例 5：q1498 — SOP 消解量词辖域歧义（事后准入，INCORRECT→strict 全 PASS 对照）

- 歧义证据：题面 "highest monthly consumption in the year 2012" 无主语无量词约束，两种读法在 schema 内均自洽——行级读法（单客户月账单，MAX(Consumption)=445,279.69）vs 月总量读法（按日历月 SUM 后取最大=51,787,161.74，gold 口径）。三范式 Ch1 信息逐字对齐（列级 Consumption 描述相同、表级均为 monthly 措辞），答对与否与信息量不相关：RDF 零列级语义照样按月 SUM 答对，DLR 语义最富反而取 MAX 裸行值失分
- Ch2 无聚合粒度知识（top5 全为日期/过滤条目）；Ch3 最近邻反向放大歧义——q1473 条目（SME 2013 月均题，"every row is already a monthly value"，行级 AVG 口径）与题面表面孪生，DLR 顺其行级语义写 MAX(Consumption)；ER/RDF 读同一文件却迁移了 q1480 条目的按月聚合模式。同型知识下，单样本分不清"迁移成功"与"抽签运气"
- 补条目（辖域消歧：whole-year 无主语问 highest monthly = 按月 SUM 后取最大月总量，禁 MAX(Consumption) 裸行值；附与 q1473 行级 AVG 的对照句画清边界）三范式重跑：**strict 全 PASS 免仲裁**——DLR GROUP BY 月+SUM DESC LIMIT 1 = 51,787,161.74；ER 106,199 tok（验证性查询×5 偏多），DLR 73,887，RDF 68,312 最省
- 证明点：**辖域歧义不是信息缺口而是裁定缺口**——Ch1/Ch2 信息全对（行粒度事实准确）仍无法裁定题面量词辖域，只有 per-question SOP 能声明"本题的 monthly 指谁"；且每题一节机制在歧义题上可被最近邻反向带偏，条目必须写成对比句（画清辖域边界）才能稳定消歧

### 案例 6：q1490 - 非盲区形态：条目价值=收敛+仲裁锚点（事后准入）

- 背景：本题不是盲区——Ch2 泛化知识 kid4（08-12 入库，源题含 1490）已写明客户级分母须含全部客户、先聚合后过阈值；首跑（0829_1856 批次）三范式已全部自发按客户口径 LEFT JOIN 作答，行为本已对，strict FAIL 源于 gold 两处 bug（数 customer-month 记录非客户、INNER JOIN 丢 47 无记录客户），judge 依 disputes 翻正
- 补条目（percent of customers 口径：客户总消费聚合 + LEFT JOIN 分母含全部客户）与 kid4 泛化知识同口径，per-question 显式化；重跑（v3_final 归档）：行为保持客户口径（3599/3658=98.39）不变，DLR 74,908→59,271（-21%）、RDF 88,580→57,400（-35%），ER 72,417 沿用首跑
- 泛化分界：同型题 q1493（无条目）靠 Ch2 命中 q1490 泛化知识自发走对口径——Ch2 泛化负责同型题覆盖，Ch3 条目负责本题收敛；条目同时是 judge 侧仲裁锚点（判序 SOP>RAG）
- 证明点：**非盲区题的条目价值是收敛（探索 token 下降）与口径显式化，不是纠错**——三通道价值不只在“解 Ch1/Ch2 之不能”，也在“把已对的行为变稳、变省”

### 案例 7：q1500/q1501 — 样本外月份：空集裁定 + 无路径处方三轮对照（事后准入）

- 陷阱：`transactions_1k` 采样表仅覆盖 2012-08-23~26 四天；两题问 2013-09 / 2013-06，样本外月份零交易——语义正答=**空列表**。gold 走 yearmonth 圈客户代理 JOIN 其历史交易（把 8 月购买归因到 9 月，时间语义相悖），evidence 只给日期格式提示、不给出题人意图的代理路线
- 无条目观察轮（0831_1430）：三范式全部自行探明覆盖范围、答空集（**行为本已对**），但 judge 分裂 5/6 INCORRECT（引 evidence 字面压过知识层，判序倒置）/ 1/6 CORRECT（识别 gold 缺陷标 [争议候选]）；RDF q1501 空集死胡同 28 次 SQL / 794,008 tok / 600s 超时——**空集不信任是 Q/E/G 口径冲突，结构层管不了**
- 条目 v1（含弧句路径处方）重跑：6/6 全翻 CORRECT、token 全降——但弧句对 DLR 是冗余负担（其 PE mapping 的 A 锚弧/S 语义本就携带该事实），且把结构推导免费发给 ER/RDF
- 条目 v2（修剪：只留窗口事实+空集即真话+禁代理，路径自寻）重跑：**DLR q1501 47,565 tok 为三轮最低（v1 76,241，-38%）；RDF 794,008→45,795（-94%，超时消失）；ER 45,585；q1500 同降（DLR 59,532 / RDF 43,554 / ER 98,086）**；6/6 CORRECT，judge 全部引用 SkillPath 裁定统一翻正；DLR 自行经 PE 弧确认站点侧入口后 1 次 SQL 收口
- 证明点：**非盲区题条目的三重价值 + 无路径处方原则**——agent 行为本已对时，条目价值=judge 仲裁锚（分裂判定统一）+ 空集收敛（死胡同消失）+ 口径显式化；路径处方必须从 Ch3 移除（DLR 弧结构天然携带路由事实，SOP 代写抹平范式差异且对 DLR 是干扰——v1/v2 三轮对照与案例 4 的 q1479 v1/v2 共同确立该原则）

### 小结

> 仅列案例 1-7 的 9 个对照分析题；收官批次新增 7 题条目（q1505/q1521/q1525/q1526/q1529/q1531/q1533）见逐题表，其中 q1521/q1526/q1533 的重跑对照数据在逐题表备注与论证段。

| 题 | 盲区类型 | 无 SOP | 有 SOP |
|---|---|---|---|
| q1473 | 知识冲突 | （无对照批次；若按 Ch2 错误公式作答，三范式均 12 倍偏小） | 三范式口径一致按表语义作答，judge 依 SOP 翻正 |
| q1480 | 格式约定 | strict 0/3，全靠 judge | strict 2/3，ER/DLR 免仲裁 |
| q1481 | 知识污染 | 三范式全 INCORRECT（kid7 污染） | ER/DLR 翻 CORRECT（RDF 另因漏 CZK 过滤 INCORRECT）；负值提示后 RDF tok -57%（核验循环消失，CZK 方差仍在=架构层） |
| q1479 | 跨域词义偏导 | Ch1/Ch2 双双偏导 gas→加油站域，DLR 验库补信息 101K tok | 消歧生效：token 三范式全降（DLR -28%），RDF 补齐 CZK 过滤 |
| q1498 | 量词辖域歧义 | Ch1/Ch2 信息全对仍 1/3 落错读法（DLR 取 MAX 裸行值 INCORRECT，被 q1473 行级条目同向强化） | 三范式 strict 全 PASS 免仲裁（DLR 445,279.69→月总量口径） |
| q1486 | 格式约定（列形状） | strict 1/3（DLR/RDF 多带拆分两列 FAIL，judge 翻正） | 三范式单列 diff=23505，strict 3/3 免仲裁；ER -20%/RDF -21% tok |
| q1490 | 非盲区形态 | 行为本已对（Ch2 kid4 泛化口径），DLR 74,908/RDF 88,580 tok | 行为不变口径一致，DLR -21%/RDF -35% tok，judge 依 disputes 翻正 |
| q1500/q1501 | 非盲区形态（空集裁定） | 行为本已对（三范式答空集），judge 分裂 5/6 INCORRECT，RDF 794K 超时 | 6/6 依 SkillPath 翻正；路径自寻后 token 全降（DLR -70%/RDF -94%），DLR 弧路由 1 次 SQL 收口 |

七个案例（9 个对照分析题）覆盖四类 Ch1/Ch2 结构盲区（知识冲突/污染、格式约定、跨域词义偏导、量词辖域歧义）加非盲区形态三例（q1490/q1500/q1501：收敛+仲裁锚点）——盲区题证明 SOP 不可替代，非盲区题证明条目在无坑可避时仍有收敛价值；收官批次新增 7 题条目全部落入既有类型（③/④ 延伸形态），16 题整体检验下四类盲区框架收敛成立；无路径处方原则（Ch3 只做题目理解层裁定，路径发现归范式表征层）经 q1479 v1/v2 与 q1500/q1501 三轮对照确立，三通道并行锚定成立。
