## 评测进度 — 语义+RAG+SOP 三通道模式（v4 基线）

> **说明**: v4 = 三通道模式（见 3-channel-design.md）：Agent 不拿 evidence，纯 question 驱动三通道并行锚定——Ch1 语义（MCP 语义层）、Ch2 RAG（`search_evidence` 检索）、Ch3 SOP（前置读 `skills/{db}.md`），交叉验证后 mapping -> SQL。**与 v3 的唯一差别在语义层基线：v4 的 Ch1 是"数据集原生"全新配置**。
> **数据来源**: `validated_results/v4_final/{pair}/agent_stats.csv`（per-pair，如 `1471-1472/`）
> **配置文件**: `config.json` → `eval.output_dir: "Evaluation/outputs2"`, `eval.round: "v4_final"`
> **文档同步**: `post_process.py` 每次归档自动重建本文件明细表与汇总数字（进度表手动维护）

> ⚠ **v4 重置（2026-09-14）**：v3_final 全部 90 题次（debit_card 30 题 × 3 范式，跑于 08-27~09-04）**作废并移入 `archive/v3_final/`**——那批跑在旧 Ch1 上：数据集提供描述的列，旧 yaml 只逐字吸收了 **102/633（16%）**，且 top_k 三范式不对称（ER/RDF=20、DLR=10）。v4 起以数据集原生语义层为唯一基线，旧数据**不可与新基线混算**。

### 本轮与 v3 的配置差（同为三通道，变量是 Ch1 基线）

| | v3（旧基线，已作废） | v4（本轮） |
|---|---|---|
| Ch1 列级描述 | 旧 yaml，逐字吸收 16% | 数据集 `*.csv` 原文全量（09-10 重写） |
| top_k | ER/RDF 20 / DLR 10（不对称） | 三范式统一 **10** |
| DLR schema | `LE.public_attributes + PE.C + PE.private_attributes` 三处 | `PE.attributes:[{column,biz_name,description,public?}]`（09-12 统一） |
| DLR 属性 data_type / 列 id | 全 None / 带引号 37 列 | 792/792 非空 / 去引号（与 ER 同构） |
| RDF 属性索引 name | predicate URI slug | **rdfs:label**（与 ER 逐字同名） |
| RDF 关系 | 描述占位符 → 图 MERGE 塌缩 72 条 | `rr:joinCondition` 口径 **101** 条（与 ER 同格式） |

### 起跑前检查（2026-09-14 实测，均为新口径）

- 服务：三范式 rebuild（09-13 09:50-09:52）+ 重启（09:53 / 09-14 09:58）后实测通过
- 活库：ER 798 属性 / 102 关系；DLR 792 属性 / 72 PE / 49 LE / 35 PAS；RDF 798 属性 / 101 关系
- 配置：git 定格于 `9a38728` 之后的 v4 初始化提交；工具名（AGENTS.md）、续跑跳过（01_run_agent.py）已修正

---

## 评测进度

| 数据库 | 全量 | 已评 | 剩余 | 进度 |
|--------|------|------|------|------|
| debit_card_specializing | 30 | 0 | 30 | 0.0% |

> **总结**：共测试 0 题 × 3 范式 = **0 题次**；归档进行中。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 0/0 (0.0%) | **0/0 (0.0%)** | 0/0 (0.0%) |
| strict PASS | 0/0 (0.0%) | 0/0 (0.0%) | 0/0 (0.0%) |
| 平均 token | 0 (+0.0% vs DLR) | **0** | 0 (+0.0% vs DLR) |

> **口径**：仅覆盖已归档批次，勿外推为全数据集结论。

---

## 逐题校验表

### debit_card_specializing

| 数据库 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 共通 | ER-备注 | DLR-备注 | RDF-备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|--------|--------|--------|
| debit_card_specializing | q0000 | 待归档 | | | | | | | | | 0 | 0 | 0 | 待归档 | | | |

> **Token = input_tokens + output_tokens**
> **备注分栏**: 共通 = 题目/evidence/Ch3 问题（跨范式共同根源）；ER/DLR/RDF-备注 = 该范式本题的异常、错误及后果（空 = 无异常无特异观察）
> **数据来源**: `validated_results/v4_final/{pair}/agent_stats.csv`（per-pair，如 `1471-1472/`）

---

## 三通道合理性论证——SOP 条目案例

> 本节在分批跑完后撰写：按 [[archive-discipline]]，案例只在结果确认后写，且每个 SOP 条目题必须有对应观察、数字与归档 CSV 逐项一致。v3 的七个案例见 `archive/results_v3.md`（旧基线，不可与新基线混算）。
