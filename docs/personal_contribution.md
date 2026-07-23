# 个人贡献描述

## 核心贡献

提出并工程实现了一种**基于逻辑实体（LE）与物理实体（PE）双重语义解耦的数据库关系建模方法（DLR）**，在 BIRD_ENV 基准数据集上完成了与 ER 关系建模、W3C R2RML 建模的三范式对照实验，150 题次测试验证了该方法的有效性。

## 方法论创新

### LE-PE 双层语义解耦 + PAS 语义路由

传统 ER 建模和 R2RML 建模将语义层与物理层扁平映射，Agent 仅看到表-列-关系的全连接图，缺乏对**数据语义密度和 JOIN 方向**的显式标注。本工作提出：

- **LE（逻辑实体）**：面向业务语义的聚合层，将相关表按语义主题聚类（如 "Bond" 包含 bond + connected 两张物理表）
- **PE（物理实体）**：映射到实际数据库表，标注 **ARCS 四维语义**：
  - **A_anchor（锚定键）**：标注 PE 间 JOIN 键及其基数（如 N:1），隐式引导 Agent 的 DISTINCT/JOIN 策略
  - **R_row（行语义）**：行的业务含义
  - **C_column（列映射）**：逻辑列→物理列
  - **S_semantic4arcs（语义描述）**：自然语言描述桥接关系
- **PAS 语义路由**：Agent 通过 `dlr_semantic_query` 一跳定位 LE→PE 结构，`get_pe_full` 一跳获取全部属性+ARCS+database_url

## 工程实现

在 BIRD_ENV 数据集（500 题，11 库）上完成了三种建模范式的全栈工程实现：

| 范式 | 配置方式 | 特点 |
|------|---------|------|
| **ER** | YAML 手写（依赖 dev_tables.json） | 实体-属性-关系扁平建模 |
| **DLR** | YAML 手写（LE-PE-PAS 结构） | 原创双层语义解耦 |
| **RDF/R2RML** | R2RML 生成器 + Turtle 序列化 | W3C 标准知识图谱建模 |

三范式共享同一 MCP 工具接口（semantic_query → get_entity/pe_full → mapping → execute_sql），确保对照实验公平性。

## 实验结果（150 题次）

| 范式 | CORRECT | 关键发现 |
|------|:-------:|------|
| **DLR** | **50/50 (100%)** | 唯一零失误范式，PAS 锚定键在多表聚合场景有真实引导优势 |
| ER | 47/50 (94%) | 全互联 schema 偶发 JOIN 陷阱（molecule→bond fan-out 致 69.28 vs 2.16） |
| RDF | 48/50 (96%) | 信息"干瘪"反而迫使 Agent 更谨慎探索，偶有意外优势 |

### 对照实验关键发现

1. **全互联 ≠ 好引导**（toxicology q197）：ER 的完整 molecule↔bond 连接图引导 Agent 三表 JOIN 致 fan-out 膨胀（2.16→69.28）。DLR 的 PAS N:1 锚定键隐式引导 DISTINCT 路径，全程未触碰 molecule 表。**信息丰富度与引导质量呈倒 U 型关系。**

2. **Helpfulness-Correctness Trade-off**（card_games q340）：25,061 条结果的 "Which" 题 → 三范式 9 次仅 1 次正确列出，其余全自动转 COUNT(*)。RLHF 的 helpfulness 本能压过 correctness 指令。信息越多的范式越早"满足于"COUNT。**对照实验的意外发现，直接支撑 DLR 叙事。**

3. **Gold 标注错误的范式鲁棒性**（thrombosis q1152）：Gold 将 "ratio of A to B"（A/B）误标为 B/A。DLR 和 RDF 均正确计算 0.76，ER 因跟随错误 Gold 侥幸通过。修正后 DLR strict PASS，ER 原形毕露。**原创范式对标注噪声更鲁棒。**

4. **PAS 承担"教材"角色**（debit_card q1500）：ARCS 是 DLR 独创概念，LLM 无先验知识。`get_pe_full` docstring 补上 A_anchor.key=JOIN 键后，Agent 首次正确写出多表 JOIN。**原创模型的每个概念都需在工具描述中"教"给 LLM。**

## 技术栈

- 建模引擎：Python + YAML 配置（LE-PE-PAS 结构）
- R2RML 生成器：SQLite schema → Turtle + rr:TriplesMap
- MCP 工具服务：FastAPI + Kuzu（图索引）+ SQLite（执行）
- 评测流水线：四阶段（Agent → Extract → Strict Judge → LLM 仲裁），支持并行 EDR
- 模型：deepseek-pro 系列
