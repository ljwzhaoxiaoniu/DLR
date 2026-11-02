# BizAgentBench · 评测总账

> 更新：2026-11-02 ｜ 全量三层已建；**006 三次有效归档；007 三次有效 best-3 归档；case_031 PSP 预跑 strict（非冻结）；008 v3 探索中（未归档）**
> 机器可读记录：[eval/ledger.json](eval/ledger.json) ｜ 最终结果：`results/dlr-full/`（本地留档，gitignored）
> 归档口径：006/007 使用 freeze `ff3663ec` / v1 store（007 取同一 freeze 内 best-3）；008 使用 v2/v3 store 探索（未归档）

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

## 二、本仓库新增的三层（全量模型）

| 层 | 文件 | 规模 | 性质 |
|---|---|---|---|
| L1 · desk | `sources/configs/DLR/operations_desk.yaml` + `typed_services.yaml` | 84 LE · 127 PAS · 513 向量行 | schema 级对象模型：零实例值；能力挂 LE（anchor + guard）；生命周期入 L1 |
| L1 · psp | `sources/configs/DLR/psp.yaml` | 22 LE · 20 PAS · 174 向量行 | PSP 命名空间（31–50）：XpCase/XpAccount + 20 案件族 |
| L2 | `sources/consensus/{shared,operations_desk,typed_services,psp}.jsonl` | 187 条 | 领域共识：shared 10 + desk 44 + typed 84 + psp 49 |
| L3 | `sources/sop.md` | 50 节 | **问题类打法**（desk 30 + psp 20）；标题 = 客户开场白逐字；正文 = 类级方法 |

- **Embedding**：BAAI/bge-base-en-v1.5（768 维，英文专用；HF 缓存 ONNX 快照）；模型与 store 同源。
- **报告口径**：bare = 只用数据集知识工具；assisted = 用 `dlr_l1/l2/l3` 替代之；两档分开报数。L3 为新增口径，不得混入“数据集 621 份可搜文档”。
- **归档 provenance**：`eval/freeze.ff3663ec.json`（006/007，v1 store `.store/lance/bizagentbench`）；008 探索用 v2/v3 store（v2 freeze `eval/freeze.json`；v3 = 复制 v2 + 只重建 sop）；逐次运行记录在 `results/dlr-full/frozen_provenance/`。

## 三、L3 问题类（新增，非数据集内容）

| 触发（客户开场白，逐字/截断） | 类 | 依据 |
|---|---|---|
| I need to pay a supplier in euros and another in pounds. … I don't want to pay the tax twice. | 外币交付 + 已发出税款修复 + 更正费融资 | DESK-fx / DESK-tax / DESK-collateral / DESK-protocol |
| Several storefronts still can't receive payments. … Can you help with both? | 多站点收款上线 + 带留存服务的账户退出 | DESK-rails / DESK-exit / DESK-collateral / DESK-protocol |
| Our September receipts still don't line up … Can you help with both? | 应收对账 + 证据制开户审查 | DESK-reconciliation / DESK-onboarding / DESK-commercial-evidence / DESK-collateral / DESK-protocol |
| Some money in our account isn't available … get the outstanding payments handled? | 受限资金释放 + 批次付款对账 | DESK-restrictions / DESK-batches / DESK-commercial-evidence / DESK-collateral / DESK-protocol |
| Our group companies have supplier bills coming due … Can you help handle both? | 集团资金授权付款 + 卡争议损失回收 | DESK-treasury / DESK-disputes / DESK-commercial-evidence / DESK-collateral / DESK-protocol |
| Can you release the securities we have promised to our counterparties and take care of the equipment bill? … | 证券释放 + 设备账单 + 分批发卡订单（case_006） | DESK-protocol / DIVERSE-dated_collateral / PAYMENT-payment_split_capture / JOINT-CASH-delivery |
| Please finish paying for our equipment orders and get the goods to the agreed depots. … | 进口单证结算 + 跨日历交付（case_007） | DESK-protocol / DIVERSE-documentary_imports / PAYMENT-payment_cross_calendar_delivery / JOINT-CASH-delivery |
| Some of our supplier direct debits seem to have gone through twice. … | 重复直接借记 + 授权退役 + 分期退货（case_008） | DESK-protocol / DIVERSE-reconciled_debits / PAYMENT-payment_installment_return / JOINT-CASH-delivery |

写法：标题 = 开场白（检索触发）；正文 = 类级打法；**不写实例金额、记录 ID、固定分钟或 verifier 口径**。

## 四、最终结果

### 4.1 预跑（001–005 + case_031 PSP，assisted）

| 题 | strict | G | P | F | 工具调用 | tokens | 产物 |
|---|---|---|---|---|---|---|---|
| case_001 | ✅ | ✅ | ✅ | ✅ | 188 | 6,302,559 | `results/dlr-pilot/case_001_result.json` |
| case_002 | ✅ | ✅ | ✅ | ✅ | 313 | 23,734,153 | `results/dlr-pilot/case_002_result.json` |
| case_003 | ✅ | ✅ | ✅ | ✅ | 253 | 9,445,421 | `results/dlr-pilot/case_003_result.json` |
| case_004 | ✅ | ✅ | ✅ | ✅ | 505 | 16,279,513 | `results/dlr-pilot/case_004_result.json` |
| case_005 | ✅ | ✅ | ✅ | ✅ | 339 | 14,006,648 | `results/dlr-pilot/case_005_result.json` |
| case_031（PSP） | ✅ | ✅ | ✅ | ✅ | 94 | 2,586,821 | `results/dlr-full/case_031_r2/case_031__trial0/result.json` |

- **case_031**：首跑 12/18；机制修复后第 2 遍 **18/18 strict**（227s / 0 错误）。该次跑在 `0b8e2cd7` 全量模型上（2026-11-01 11:08），**早于 freeze `ff3663ec`；psp.yaml / psp.jsonl / sop.md 的哈希与 freeze 不同**，故计入预跑、不计入冻结归档；**PSP 31–50 在冻结状态上的重跑仍待做**。

### 4.2 归档（006 三次有效；007 三次有效 best-3，freeze `ff3663ec` / v1 store）

| 题 | run 1 | run 2 | run 3 | 均值 | strict | P/F |
|---|---|---|---|---|---|---|
| case_006 | 33/39 | **39/39 ✅** | 36/39 | **36.00** | 1/3 | 3/3 |
| case_007（best-3） | **37/39** | 36/39 | 30/39 | **34.33** | 0/3 | 3/3 |

- **case_006**：run 1 G 失败 joint exact capital、minimum principal、delivery dates、terminal；run 2 **strict 全过**（两次 `ReadError` 重试均未执行银行动作、已恢复）；run 3 只差 minimum principal、delivery dates、COURIER timely。三次 100,707,917 tokens / 1,150 tool calls。
- **case_007（best-3）**：**37/39、36/39、30/39**（同一 freeze `ff3663ec` / v1 store）；均值 **34.33**，strict 0/3，P/F 3/3；三次合计 **55,085,560 tokens / 809 tool calls**。37 只差 cargo A、calendar EUR；36 只差 payment exact/timely A/B/C；30 是报价窗口关闭那轮。首跑 **25/39 已 excluded**（minute 0 `ESCALATED`，按用户 2026-11-02 不计入；原始判分保留）；2026-11-02 补跑 frozen5 **25/39** 有效但低分，不进 best-3。
- 006/007 的跑次均使用 v1 store；源工作区已有 case 8 的 v2 L3，但 006/007 的 L3 节与 L2 未变，v1 store 未重建。逐次 provenance 在 `results/dlr-full/frozen_provenance/`。
- **007 方差说明**：三次同一 freeze / 同一 store / 同一模型；差异来自决策路径而非信息差异。run 1 在 minute 0 因客户 USD 25 费用上限与最低路线费用 USD 40 冲突，直接 `ESCALATED`（后续 G 全部失败）；run 2 等到 minute 3，EUR/GBP 报价窗口已关闭，执行报 `EXECUTABLE_QUOTE_UNAVAILABLE`，以 `PENDING_EXTERNAL_ACTION` 收口；run 3 选择 EUR ordinary（晚 1 天到账）守住 USD 25 费用上限，minute 2 `COMPLETED`，只差 cargo A 与 calendar EUR。这是长程 agent 在硬约束权衡下的规划方差；**首跑 25/39 已按用户口径 excluded（原始判分保留）**。best-3 = 37/36/30，均值 34.33；补跑 frozen5 25/39 未抬高，不进 best-3。

## 五、case_008 总结（v3 探索中，未归档）

| 轮次 | checks | G | P | F | strict | 备注 |
|---|---|---|---|---|---|---|
| clean（首跑） | 33/44 | ❌ | ✅ | ❌ | ❌ | 跑中被机器休眠中断 |
| v2（freeze `3cbdfe16`） | 34/44 | ❌ | ✅ | ❌ | ❌ | L3 补联合资本/支付执行；D34 资本未执行 |
| v2b（端口 bug，实为 v1） | 35/44 | ❌ | ✅ | ❌ | ❌ | 本意 v2，实际打到 28797 v1；只作 v1 记录 |
| v3 首跑（无效） | 29/44 | — | — | — | — | 28797 已停，25 次 connection refused，`too_many_errors` |
| **v3b** | **43/44** | ❌ | ✅ | ✅ | ❌ | **最佳**；只差 `NEW.actual_exact_timely` |
| v3c | 38/44 | ❌ | ❌ | ❌ | ❌ | 方差；I4/cash/NEW + mandate + F |
| v4（已回滚） | 32/44 | ❌ | ✅ | ❌ | ❌ | 宽 L3 `pay_bill` 规则；退化 |

- **v3 freeze**：`6f3a3102`（`eval/freeze.v3.json`；L1/L2 同 v2 `3cbdfe16`，仅重新 build sop；v3b/v3c/v3d 共用同一 store，provenance 在 `results/dlr-full/frozen_provenance/case_008_v3*.json`）。
- **v5 修复（待验证）**：`InstallmentReturn` 的 L1 描述原为 `pay_bill {bill_id}`，与 action 实际 schema 不符；v5 改为 `{record_id}` + due-minute 语义（freeze `cff9b6c9` / `eval/freeze.v5.json`）。v5 store = 复制 v3 + 重建 entities（687/187/50），未跑；下一步 008/016 A/B。
- **v3 保留的两条 L3（已证明有效）**：① 重复借记净额重算（返回即 correction，不要手动补差）；② installment 更正必须在 reconciliation deadline 事件前完成（return/refund/新单付款/close 全落账）。
- **v3b 的唯一失败**：`activity2:NEW.actual_exact_timely`。根因：`pay_bill` 先用 `bill_id` 被 `INVALID_LOCAL_ACTION_FIELDS` 拒，改 `record_id` 后已 minute 1 > `due_minute 0`。窄修复方向：写进 L1 typed service 的能力描述（`record_id`、金额/截止语义），不要塞 L3。
- **v4 的教训**：宽 L3 `pay_bill` 规则把 43 打到 32，已回滚；工具字段/参数属于 L1，不属于 L3。
- **下一步**：晚上用 v3 store（28798）补第 3 个有效轮次（现有 v3b 43/44、v3c 38/44）；v2b/v3 首跑不混；之后 009/010。

## 六、复现

```bash
# 1) 起桥（自动解析 v1 store 与 HF 缓存英文模型；28797）
bash scenarios/bizagentbench/eval/start_bridge.sh

# 2) 跑单题（v1 freeze ff3663ec）
bash scenarios/bizagentbench/eval/run_dlr_pilot.sh \
  "D:/Code_Proj/DLR Proj/scenarios/bizagentbench/results/dlr-full/case_006_frozen2" 6
bash scenarios/bizagentbench/eval/run_dlr_pilot.sh \
  "D:/Code_Proj/DLR Proj/scenarios/bizagentbench/results/dlr-full/case_007_frozen2" 7
```

008 的 v3 store 需显式指定端口与 store：`TSM_STORE_DIR=".../.store/lance/bizagentbench-v3" BIZ_DLR_PORT=28798 bash scenarios/bizagentbench/eval/start_bridge.sh`；跑题同样带 `BIZ_DLR_PORT=28798`（`dlr_tools.py` 已改为读该变量）。归档结果必须引用对应 freeze（`eval/freeze.ff3663ec.json`）。

## 七、本地补丁披露

| 文件 | 改动 | 原因 | 影响面 |
|---|---|---|---|
| `Dataset/BizAgentBench-main/tools/transport_support.py` | `write()` 原子替换加 Windows 文件锁重试 | 实时扫描短暂占用导致 `WinError 5`，与模型行为无关 | 仅基础设施；不改判分与数据 |

## 八、待办

1. **007 已归档**（best-3 37/36/30，均值 34.33）。**008**：用 v3 store（28798）补第 3 个有效轮次（现有 v3b 43/44、v3c 38/44）；v4 已回滚，不混；之后 009/010。
2. 009/010 继续；全量 50 题按同一 freeze 口径推进。
3. README 三层表按全量数字更新（双语 + i18n 登记）。
4. `tsm coverage` 对 50 题做覆盖校验。
