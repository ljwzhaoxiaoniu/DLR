# SkillLogic：[[L2_Line_Loss_Analysis]]

## 一、 专项诊断技能授权 (Authorized L3 Skills)
> 在开展全链路根因溯源前，请确认已获得以下 L3 专家技能的调用权限：
- **档案时效专家**：[[L3_Asset_Reg_Timeliness]]（负责核查投运与录入的流程时间差）。
- **拓扑核查专家**：[[L3_Topology_Consistency]]（负责核查物理连接与逻辑档案的归属一致性）。

---

## 二、 标准排查主流程 (Standard Operating Procedure)
> 请 Agent 按照以下业务阶段依次开展排查工作，并维持中间过程状态：

1.  **数据初始化与取证**：
    首先调用底层数据接口，获取目标台区在异常统计周期内的基础指标，包括 **[[供电量]]**、**[[售电量]]** 以及计算得出的 **[[线损率]]**。

2.  **管理环节探测**：
    - 调用 [[L3_Asset_Reg_Timeliness]]：核实是否存在“先送电、后归档”的管理真空期。

3.  **穿透排查决策**：
    - 调用 **[[L3_Topology_Consistency]]**：排查物理拓扑与营销逻辑归属存在错配。
 
---

## 三、 综合判定与归因规则 (Inference Rules)
> **Agent 决策大脑**：请按照以下“优先级陷阱”进行逻辑收口，只给出最可能的根因。

1.  **判定 1：管理流程断档 (Process Break)**
    * **触发条件**：若 `L3_Asset_Reg_Timeliness.{{Is_Lagging}}` 为 **True**。
    * **专家逻辑**：只要存在“未及入库”的真空期，这通常是最高权重的虚假线损。
    * **归因建议**：定性为“管理侧主因”，建议先同步档案，暂缓现场核查。

2.  **判定 2：基础数据错位 (Data Misalignment)**
    * **触发条件**：若 `L3_Topology_Consistency.{{Is_Topology_Mismatch}}` 为 **True**。
    * **专家逻辑**：流程没问题，但人挂错了地方，典型如 `TG_ERROR_POOL` 案例。
    * **归因建议**：定性为“拓扑映射错误”，建议发起“账卡物”专项清理。

---

## 四、 结论数据汇总 (Data Persistence)
> **映射协议**：请将各 L3 技能的输出（Input）填充至 L2 的标准报告变量（Output）中。

| L2 标准变量 (Output) | 映射来源 (From L3/L4) | 预期内容示例 |
| :--- | :--- | :--- |
| **`{{SkillLogic_Archive_Result}}`** | `L3_Asset_Reg_Timeliness.{{Core_Conclusion}}` | “验收与录入存在 23 天真空期...” |
| **`{{SkillLogic_Topology_Result}}`** | `L3_Topology_Consistency.{{Core_Conclusion}}` | “物理与档案不一致，发现 1 名漏挂用户...” |
| **`{{Final_Verdict}}`** | 基于上述【优先级】生成的判定结论 | “判定为：管理侧档案录入延迟” |
| **`{{Action_Suggestion}}`** | 针对判定结果的纠偏指令 | “请立即同步 2026-03-05 后的资产数据” |

---


### 维护者备注：
1. **[[ ]]**：表示该名词为受控业务词汇，Agent 需通过语义服务映射至物理数据库或下级技能。
2. **{{ }}**：表示该项为数据插槽，Agent 在执行 `StdOutput` 前必须完成真实值的填充。