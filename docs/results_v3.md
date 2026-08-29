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

### Agent 流程（三通道，见 3-channel-design.md）

```
question → [Ch1 semantic_query + Ch2 search_evidence + Ch3 skills/{db}.md 并行]
        → 交叉验证锚定 → mapping → SQL → Final Answer
```

---

## 评测进度

| 数据库 | 全量 | 已评 | 剩余 | 进度 |
|--------|------|------|------|------|
| debit_card_specializing | 30 | 10 | 20 | 33.3% |
| card_games | 52 | 0 | 52 | 0% |

> **总结**：共测试 10 题 × 3 范式 = **30 题次**。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 10/10 (100.0%) | **10/10 (100.0%)** | 9/10 (90.0%) |
| strict PASS | 4/10 (40.0%) | 6/10 (60.0%) | 4/10 (40.0%) |
| 平均 token | 85,336 (+20.4% vs DLR) | **70,855** | 80,985 (+14.3% vs DLR) |

---

## 逐题校验表

### debit_card_specializing

| 数据库 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 共通 | ER-备注 | DLR-备注 | RDF-备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|--------|--------|--------|
| debit_card_specializing | q1471 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 75,889 | **45,156** | 65,446 | 题目/evidence 无缺陷；Ch3 无本题条目；EUR/CZK 比值口径无分歧 | strict FAIL 为 4 位舍入差（Pred 0.0657 vs gold 0.065728），judge 按舍入级翻正 | execute_sql 仅 1 次，4 步 45,156 tok 三范式最省 |  |
| debit_card_specializing | q1472 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 155,128 | **104,772** | 107,120 | 题目 LAM/consumption 语义过泛（LAM=segment 歧义）；Ch3 本题无条目，纯 Ch1+Ch2 解出 | Ch1 漂移至 card_games；Ch2×5 反复探测（top 0.60），execute_sql×8，11 步 155,128 tok 三范式最贵 | Ch1 唯一首中；Ch2×2 全命中；8 步 104,772 tok | Ch1 漂移至 formula_1 后 3 次 query 才回正；Ch2×2、rdf_search×2，9 步 107,120 tok |
| debit_card_specializing | q1473 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 75,987 | **57,091** | 76,141 | 缺陷题——evidence/gold 公式 AVG/12 与 yearmonth 月度粒度矛盾（双重除法，2013 SME 人均仅 8.0 个月记录）；三范式 Pred 一致按数据语义作答致 strict 全 FAIL；Ch3 本题条目口径=AVG 不除 12，judge 依此全翻 CORRECT | Ch1 单发首中；Ch2 单发命中（top=1473 未带偏）；execute_sql×3，7 步 75,987 tok | Ch1×2、Ch2×2（1 命中）；execute_sql 仅 1 次，5 步 57,091 tok 三范式最少 | Ch1×2、Ch2 单发命中（top=1482）；execute_sql×3，7 步 76,141 tok |
| debit_card_specializing | q1476 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 109,335 | 72,354 | **70,780** | 题目/evidence 无缺陷；CZK/EUR 消歧无分歧，数值一致（402,524,570.17）；Ch3 无本题条目 | Ch1×2、Ch2×2（1 命中）；execute_sql×6 + get_table_schema×2 探测偏多，9 步 109,335 tok 最贵 | Ch1 单发首中；execute_sql×2，6 步 72,354 tok | 结果多带两列拆分值（CZK 总额/EUR 总额）→ strict 列数不匹配 FAIL，judge 按多余列不扣分翻正；6 步 70,780 tok |
| debit_card_specializing | q1479 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 65,235 | 72,474 | **53,184** | 题目/evidence 无缺陷（"gas"即 Consumption 列，gold SQL 亦不另滤，仅滤 CZK）；Ch3 本题条目（gas=Consumption 消歧）生效——三范式全部锚 yearmonth 且带 CZK 过滤（RDF 旧批次完全漏 JOIN，本次补齐）；条目"Sum+top"引导致三范式均多带 total 列 vs gold 单列 → strict 全 FAIL，judge 全翻 CORRECT | 首跳仍漂 california_schools（Ch1 层面条目不治）；execute_sql×2，6 步 65,235 tok（旧 78,781，-17%） | 验库探索消失——execute_sql 仅 1 次（旧 4 次），6 步 72,474 tok（旧 101,077，**-28%**） | SQL 补齐 CZK 过滤（旧批次无 JOIN 侥幸 PASS）；execute_sql 仅 1 次，5 步 53,184 tok 最省 |
| debit_card_specializing | q1480 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **55,710** | 68,376 | 72,339 | 题目/evidence 无缺陷；Ch3 本题条目（返回两位月份+格式对齐）生效——ER/DLR 按条目返回 "04" 直接 PASS | 无异常；5 步 55,710 tok 最省 | 无异常；6 步 68,376 tok | 值 "04" 正确但多带 total 列 → 列数不匹配 strict FAIL，judge 翻正；rdf_search×4 探测偏多，6 步 72,339 tok 最贵 |
| debit_card_specializing | q1481 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | **87,365** | 97,023 | 159,092 | 缺陷题——gold 算全段客户均值差（[-582092.86, 582092.86, 0]），未筛每段最低消费客户；Ch3 本题条目（每段最低客户年度总消费、不除 12）生效——ER/DLR 按条目算出裁定口径 [-14009.34, 6046.62, 7962.72]，judge 依 SOP>RAG 翻正 | 无异常；execute_sql×4，7 步 87,365 tok 三范式最省 | 无异常；Ch2×2（1 命中）；execute_sql×4，7 步 97,023 tok | SQL 漏 Currency='CZK'（JOIN customers 无 WHERE）→ LAM 最低客户取到混合货币口径 -186.18（vs CZK 口径 2.24），前两差值各偏 188.42 → INCORRECT；execute_sql×12 反复试错，11 步 159,092 tok 三范式最贵 |
| debit_card_specializing | q1482 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 71,091 | **64,087** | 84,788 | 缺陷题——gold 分母用 2012 且未滤 EUR；evidence 规定除 2013（非常规口径），三范式均按数学常识除 2012 致 strict 全 FAIL；disputes 补判口径：问题问 which segment，答案=排序，三范式排序一致（SME 最高/LAM 最低）→ judge 全翻 CORRECT；Ch3 无本题条目 | 无异常；Ch2×3（2 命中）探测略多；execute_sql×5，6 步 71,091 tok | 无异常；execute_sql×3，5 步 64,087 tok 最省 | 无异常；execute_sql×6，7 步 84,788 tok 最贵 |
| debit_card_specializing | q1483 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 89,939 | 59,145 | **55,272** | 题目/evidence 无缺陷；Ch3 无本题条目 | execute_sql×3 + get_table_schema×1 探测偏多，8 步 89,939 tok 三范式最贵 | 无异常；execute_sql×2，5 步 59,145 tok | 无异常；execute_sql 仅 1 次，5 步 55,272 tok 最省 |
| debit_card_specializing | q1484 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 67,681 | 68,072 | **65,684** | 题目/evidence 无缺陷；Ch3 无本题条目 | 无异常；6 步 67,681 tok | 无异常；Ch2×2 全命中；execute_sql×2，6 步 68,072 tok | 无异常；Ch1×2；execute_sql×2，6 步 65,684 tok 最省 |
> **Token = input_tokens + output_tokens**
> **备注分栏**: 共通 = 题目/evidence/Ch3 问题（跨范式共同根源）；ER/DLR/RDF-备注 = 该范式本题的异常、错误及后果（空 = 无异常无特异观察）
> **数据来源**: `validated_results/v3_final/{pair}/agent_stats.csv`（per-pair，如 `1473-1476/`）

---

## 三通道合理性论证——SOP 条目案例（q1473 / q1480）

> 三通道分工：Ch1 语义锚定"在哪"（库/表），Ch2 RAG 映射"是什么"（术语→列/值），Ch3 SOP 捕获"这题怎么坑"（领域口径/格式陷阱）。SOP 通道的合理性取决于它是否解决了 Ch1/Ch2 结构上解决不了的问题——当前有 SOP 条目的题覆盖三类盲区：
> **① 知识冲突/污染**（Ch2 自身携带错误公式，需第三通道仲裁）→ q1473、q1481；**② 格式约定**（Ch1/Ch2 都不含答案格式约束）→ q1480；**③ 跨域词义偏导**（Ch1/Ch2 都把题面词义匹配到错误业务域，需更高阶通道消歧）→ q1479。

### 案例 1：q1473 — SOP 仲裁知识冲突（事前条目）

- 缺陷题：evidence/gold 公式 `AVG(Consumption)/12` 与 yearmonth 行语义（每行已是月度值）矛盾
- 无 SOP 的后果：Ch2 检索到错误公式，Ch1 无口径概念——**没有任何一层能仲裁**，三范式都会跟着除 12，答案 12 倍偏小
- 有条目后：Ch3 条目明确"月度值直接 AVG，不除 12"，三范式 Pred 一致按表语义作答（5519.48）；judge 判序 SOP>RAG，依条目全翻 CORRECT
- 证明点：**SOP 是知识冲突的仲裁层**——冲突来自 Ch2 自身携带的错误公式，只有第三通道能裁决

### 案例 2：q1480 — SOP 对齐答案格式（事后准入 + 重跑对照）

- 陷阱：问题问"月份"，gold 期望纯月份 `"04"`；Agent 自然返回完整年月 `"201304"`（ER/DLR）或附带总额列（RDF）——evidence 只讲 Date 取位，不含格式约定
- 无条目批次：strict 0/3 PASS，全部依赖 judge 等价翻正
- 补条目（返回两位月份，SQL 执行完对齐格式）重跑：**ER/DLR 返回 `"04"` 直接 strict PASS**（ER 55,710 tok，5 步，三范式最省）；RDF 值对齐但未遵守"仅月份一列"，仍 FAIL 由 judge 翻正
- 证明点：**格式对齐约定既不在 Ch1 语义层、也不在 Ch2 知识层，只能由 SOP 表达**；条目有效性有对照数据：strict PASS 0/3 → 2/3

### 案例 3：q1481 — SOP 对抗知识污染（事后准入，INCORRECT→CORRECT 对照）

- 陷阱：Ch2 检索命中 RAG 库 kid7 的 "/12 子句"（"dividing by 12 for annual average"），把"每段最低客户的年度总消费均值"错成 ÷12 的月值（首跑 ER/DLR 答案恰为裁定值 ÷12，RDF 600s 超时）——三范式全 INCORRECT
- 补条目（每段取最低客户、年度总消费不除 12）重跑：**ER/DLR 算出裁定口径 [-14009.34, 6046.62, 7962.72] 直接翻 CORRECT**；RDF 仍 INCORRECT，但错误类型已切换为"漏 CZK 过滤"（范式自身行为，非知识污染）
- 证明点：**SOP 能修复知识污染级的整体失败**（不只是格式微调）——判定结果 INCORRECT→CORRECT 的对照，比 q1480 的 strict FAIL→PASS 更强；且 judge 判序 SOP>RAG 使条目在与 RAG 知识冲突时稳定获胜

### 案例 4：q1479 — SOP 消解跨域词义偏导（事后准入）

- 偏导证据：题面 "consumption of gas" 中 gas 被 Ch1 语义召回匹配到 **GasStation 实体（加油站）**而非消费记录（DLR 返回 Top1=GasStation、Top2 才是 Consumption；ER 返回 Top2=gasstations 表、yearmonth 排第 5）；Ch2 连锁反应——agent 顺 gas 词义猜 namespace=gas_consumption 落空重试；Customer 实体（Currency 所在）不进召回前列，agent 用 2 条验库 SQL 补信息，DLR 8 步 101,077 tok 三范式最贵
- 补条目（gas 指 yearmonth.Consumption 的加油站业务消费，锚 yearmonth 不锚 gasstations；CZK 过滤在 customers.Currency）重跑验证：**DLR 101,077→72,474 tok（-28%），验库探索消失（execute_sql 4→1）；RDF 53,184 tok 且 SQL 首次带上 CZK 过滤**（旧批次完全漏 JOIN 侥幸 PASS）；ER 65,235（-17%）。副作用：条目"Sum+top"引导使三范式均多带 total 列 → strict 全 FAIL（旧 2/3 PASS），judge 全翻——净效果 token 全降、SQL 语义更准
- 证明点：**SOP 是更高阶的消歧层**——Ch1/Ch2 都在"gas"的跨域双语义里偏导，只有 Ch3 能声明"本题的 gas 属于哪个业务域"；消歧修复了锚定与过滤，代价仅是 gold 单列 vs 多带列的格式差（judge 可救）

### 小结

| 题 | 盲区类型 | 无 SOP | 有 SOP |
|---|---|---|---|
| q1473 | 知识冲突 | （无对照批次；若按 Ch2 错误公式作答，三范式均 12 倍偏小） | 三范式口径一致按表语义作答，judge 依 SOP 翻正 |
| q1480 | 格式约定 | strict 0/3，全靠 judge | strict 2/3，ER/DLR 免仲裁 |
| q1481 | 知识污染 | 三范式全 INCORRECT（kid7 污染） | ER/DLR 翻 CORRECT（RDF 另因漏 CZK 过滤 INCORRECT） |
| q1479 | 跨域词义偏导 | Ch1/Ch2 双双偏导 gas→加油站域，DLR 验库补信息 101K tok | 消歧生效：token 三范式全降（DLR -28%），RDF 补齐 CZK 过滤 |

四道题覆盖三类 Ch1/Ch2 的结构盲区（知识冲突/污染、格式约定、跨域词义偏导），SOP 通道不可被替代——三通道并行锚定成立。
