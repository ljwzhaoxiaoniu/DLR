# BizAgentBench · 评测总账

> 更新：2026-10-31 ｜ 穿刺（2 题）完成
> 机器可读记录：[eval/ledger.json](eval/ledger.json) ｜ 最终结果：[results/dlr-pilot/](results/dlr-pilot/)

## 一、数据集（不属于本仓库，不修改）

| 项 | 实测 |
|---|---|
| 来源 | `D:/Code_Proj/Dataset/BizAgentBench-main`（外置，`TSM_DATASET_DIR` 同级） |
| 版本 | `bizagentbench-payment-v1` |
| 题 | 50 道（1–30 formal/operations_desk；31–50 expansion/psp） |
| 知识 | 789 份 JSON，其中 621 份进数据集自带的搜索索引 |
| 能力 | 601 条（324 个 service；227 desk / 374 psp） |
| 世界 | 404 个集合 / 3,121 条记录（每题 patch 生成独立初始世界） |
| 判分 | 上游确定性 G/P/F，无 LLM judge |

## 二、本仓库新增的三层

| 层 | 文件 | 规模 | 性质 |
|---|---|---|---|
| L1 | `sources/configs/DLR/operations_desk.yaml` | 23 LE · 16 PAS · 62 向量行 | schema 级对象模型：零实例值；能力挂 LE（anchor + guard）；生命周期入 L1 |
| L2 | `sources/consensus/{shared,operations_desk}.jsonl` | 20 条 | 领域共识；数据集产品条款的归纳 |
| L3 | `sources/sop.md` | 2 节 | **问题类打法**，本仓库新增；与数据集自带 62 份 `SOP-*` 无关 |

**报告口径**：bare = 只用数据集知识工具；assisted = 用 `dlr_l1/l2/l3` 替代之；两档分开报数。L3 为新增口径，不得混入“数据集 621 份可搜文档”。

## 三、L3 问题类（新增，非数据集内容）

| 触发（客户开场白，逐字） | 类 | 依据 |
|---|---|---|
| I need to pay a supplier in euros and another in pounds. … I don't want to pay the tax twice. | 外币交付 + 已发出税款修复 + 更正费融资 | DESK-fx / DESK-tax / DESK-collateral / DESK-protocol |
| Several storefronts still can't receive payments. … Can you help with both? | 多站点收款上线 + 带留存服务的账户退出 | DESK-rails / DESK-exit / DESK-collateral / DESK-protocol |

写法：标题 = 开场白（检索触发）；正文 = 类级打法（对象集 → 资金计划 → 校验 → 收口），**不写实例金额、记录 ID 或固定序列**。

## 四、最终结果

| 题 | strict | G | P | F | 工具调用 | tokens | 产物 |
|---|---|---|---|---|---|---|---|
| case_001 | ✅ | ✅ | ✅ | ✅ | 188 | 6,302,559 | `results/dlr-pilot/case_001_result.json` |
| case_002 | ✅ | ✅ | ✅ | ✅ | 313 | 23,734,153 | `results/dlr-pilot/case_002_result.json` |

## 五、复现

```bash
# 1) 构建隔离存储（不碰 bird/COB 的库）
cd "TSM Core Service"
TSM_SCENARIO="D:/Code_Proj/DLR Proj/scenarios/bizagentbench" \
TSM_STORE_DIR="D:/Code_Proj/DLR Proj/TSM Core Service/.store/lance/bizagentbench" \
TSM_MODEL_DIR="D:/Code_Proj/DLR Proj/tmp_scripts/bge-onnx" \
npx tsx src/build/buildLance.ts --all
# 同 env 再跑 buildConsensus.ts / buildSop.ts

# 2) 起 DLR 查询服务（28797）
TSM_SCENARIO=... TSM_STORE_DIR=... TSM_MODEL_DIR=... npx tsx tmp_scripts/biz_dlr_server.mjs

# 3) 跑题
bash tmp_scripts/run_biz_dlr_pilot.sh runs/dlr-001 1
bash tmp_scripts/run_biz_dlr_pilot.sh runs/dlr-002 2
```

## 六、本地补丁披露

| 文件 | 改动 | 原因 | 影响面 |
|---|---|---|---|
| `Dataset/BizAgentBench-main/tools/transport_support.py` | `write()` 原子替换加 Windows 文件锁重试 | 实时扫描短暂占用导致 `WinError 5`，与模型行为无关 | 仅基础设施；不改判分与数据 |

## 七、待办

1. PSP（31–50）命名空间未建模（`xp_*`），另起一份 L1。
2. 英文 README 与 i18n 登记留到规范化阶段。
3. `tsm coverage` 对 50 题做覆盖校验（下一阶段）。
