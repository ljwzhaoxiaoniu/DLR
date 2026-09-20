## 评测进度 — 三级语义建模模式（v4 基线）

> **说明**: v4 = 三级语义建模（见 tsm-design.md）：Agent 不拿 evidence，纯 question 驱动三级并行锚定——数据源级（L1 MCP 语义层，数据集原生配置）、领域共识级（L2 RAG，`search_evidence` 检索）、业务逻辑级（L3 SOP，前置读 `skills/sop.md`），交叉验证后 mapping -> SQL。
> **两组口径**：**原始组**充分尊重数据集原有数据；**对照组**为数据源级建模、充分吸收 evidence（该下沉的下沉到数据源、该保留的保留）。定义与现状见 [rag-evidence.md](rag-evidence.md) §两组。
> **数据来源**: `validated_results/v4_final/{group}/{run_id}/agent_stats.csv`（**按 run 归档**——几道题就几道题、哪个范式就哪个范式，如 `original/0916_1626_1471-1472_EDR/`）
> **配置文件**: `config.json` → `eval.output_dir: "Evaluation/outputs2"`, `eval.round: "v4_final"`
> **文档同步**: `post_process.py` 每次归档按组自动重建本文件明细表与汇总数字（进度表手动维护）

### 本轮配置口径

| 项 | v4 口径 |
|---|---|
| L1 列级描述 | 数据集 `*.csv` 原文全量（09-10 重写） |
| 交付条数 | **DLR 5 / ER 20 / RDF 30**（token 量级对齐；全量召回 → 收口去重 → 交付取前 N） |
| DLR schema | `PE.attributes:[{column,biz_name,description,public?}]`（09-12 统一） |
| DLR 属性 data_type / 列 id | 792/792 非空 / 去引号（与 ER 同构） |
| RDF 属性索引 name | **rdfs:label**（与 ER 逐字同名） |
| RDF 关系 | `rr:joinCondition` 口径 **101** 条（与 ER 同格式） |

---

## 评测进度

| 组别 | 数据库 | 全量 | 已评 | 剩余 | 进度 |
|------|--------|------|------|------|------|
| 原始组 | debit_card_specializing | 30 | 0 | 30 | 0.0% |
| 对照组 | card_games / debit_card_specializing | 待定 | 0 | — | 待开跑 |

> 对照组知识库已就绪（card_games 21 条 / debit_card_specializing 19 条，kid 聚合），题量待定。

> **总结（原始组）**：共测试 6 题 = **18 题次**。
> **总结（对照组）**：共测试 0 题 = **0 题次**。

| 组别 | 指标 | ER | DLR | RDF |
|------|------|----|-----|-----|
| 原始组 | CORRECT | 6/6 (100.0%) | **6/6 (100.0%)** | 6/6 (100.0%) |
| 原始组 | strict PASS | 4/6 (66.7%) | 5/6 (83.3%) | 4/6 (66.7%) |
| 原始组 | 平均 token | 58,512 (-11.0% vs DLR) | **65,751** | 60,263 (-8.3% vs DLR) |
| 对照组 | CORRECT | — | — | — |
| 对照组 | strict PASS | — | — | — |
| 对照组 | 平均 token | — | — | — |

> **口径**：仅覆盖已归档批次，勿外推为全数据集结论。

---

## 逐题校验表

**原始组**

| 数据库 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 共通 | ER-备注 | DLR-备注 | RDF-备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|--------|--------|--------|
| debit_card_specializing | q1471 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **62,919** | 63,680 | 64,679 |  |  |  |  |
| debit_card_specializing | q1472 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **48,166** | 81,982 | 65,092 |  |  |  |  |
| debit_card_specializing | q1473 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **49,213** | 50,473 | 65,220 |  |  |  |  |
| debit_card_specializing | q1476 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 79,362 | 68,496 | **65,842** |  |  |  |  |
| debit_card_specializing | q1479 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **49,126** | 79,077 | 52,136 |  |  |  |  |
| debit_card_specializing | q1480 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 62,289 | 50,796 | **48,611** |  |  |  |  |
> **Token = input + cache_read + reasoning(CoT) + output**（全算消耗，= agent_stats.csv 的 `total_tokens`）
> **备注分栏**: 共通 = 题目/evidence/L3 问题（跨范式共同根源）；ER/DLR/RDF-备注 = 该范式本题的异常、错误及后果（空 = 无异常无特异观察）
> **数据来源**: `validated_results/v4_final/{group}/{run_id}/agent_stats.csv`（按 run 归档）



**对照组**

待开跑

---

## 三级语义建模合理性论证——SOP 条目案例

> 本节在分批跑完后撰写：按 [[archive-discipline]]，案例只在结果确认后写，且每个 SOP 条目题必须有对应观察、数字与归档 CSV 逐项一致。
