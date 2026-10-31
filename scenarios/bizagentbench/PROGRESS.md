# BizAgentBench · 穿刺进度（工作记录）

> 2026-10-31 夜 → 2026-11-01 ｜ 分支 2.0 ｜ 5/50 题，全部 strict
> 对外成果见 [DETAIL.md](DETAIL.md) / [eval/ledger.json](eval/ledger.json)；本文是续做用的工作记录。

## 一、已完成

| 题 | 场景 | strict | 调用 | tokens | 关键收获 |
|---|---|---|---|---|---|
| case_001 | fx + tax | ✅ | 188 | 6.30M | 储备提款按净额/到账分钟比较；改单费上限不含设施费 |
| case_002 | rails + exit | ✅ | 313 | 23.73M | 多站点上线 + 退出；能力必须挂对对象（desk 开户 API） |
| case_003 | reconciliation + onboarding | ✅ | 253 | 9.45M | 证据按**审查时**版本；提款一次性共用储备，先摆选择再 booking；银行截止是银行事实 |
| case_004 | restrictions + batches | ✅ | 505 | 16.28M | 每 lot 可用性；批次只认银行回执；**待评估条款可能改净额**（1 分钱陷阱） |
| case_005 | treasury + disputes | ✅ | 339 | 14.01M | 授权三同 + 版本时效；仅 SETTLED 补偿；立案费上限不含设施费 |

> **前五题为预跑**：L1 是按对象族逐题长出来的（001 用 23 LE、005 用 46 LE），搜索空间不一致。
> 正式成绩以 **L1 冻结后的统一重跑**为准；**重跑放最后**，不打断后续建模与跑题。

## 二、三层现状

| 层 | 规模 | 覆盖族 |
|---|---|---|
| L1 | **46 LE · 33 PAS · 125 向量行** | desk 基础 / fx·tax·collateral / rails·exit / reconciliation·onboarding / restrictions·batches / treasury·disputes |
| L2 | **45 条**（shared 10 + operations_desk 35） | 单位、报价与结算、按笔费、储备条件/评估、改单≠分配、证书版本、截止顺序、每 lot 可用性、批次回执、授权三同、仅 SETTLED 补偿 |
| L3 | **5 个问题类** | 每类标题 = 客户开场白；正文 = 类级打法（无实例金额/ID/固定序列） |

L1/L2 按“对象族 / 领域口径”生长，L3 按“问题类”生长；五次收口只改过 L3 与（一次）L1 能力挂载，未做单题特判。

## 三、建模流程（下次照此循环）

1. 拆 `payment/data/private/case_NNN.json`：components、acceptance、funding、required docs；
2. 统计该 scope 的世界记录，对照 L1 找缺的对象族（缺则按 schema 级补 LE + PAS + 能力挂载）；
3. 读对应 `DESK-*` 产品文章，补 L2 口径（非 workflow）；
4. 若出现新问题类，写 L3 类级打法；否则复用已有类；
5. 重建隔离存储（`TSM_STORE_DIR=.store/lance/bizagentbench`）→ 起桥 → 跑一道；
6. 失败只按“知识缺口 / agent 规划 / 模拟器”归因，改对应层；每题最多两遍，跑完停下报数；
7. 通过了只归档最终结果（result + 总账 + 台账），过程数据不留。

## 四、已固定的坑（写进 L1/L2/L3，后续题直接受益）

- **储备条款评估**：`pending_assessment` 会在事件点改净额/延迟；提前 booking 绑定旧版本（004 差 1 分）。
- **费用上限口径**：客户说的“立案费/更正费上限”只约束该费用本身，不含储备设施费；两者分开报（001 / 005）。
- **证据版本**：要匹配**审查时**的 profile 版本；替换提交重启审查延迟，可能错过截止（003）。
- **提款不可逆**：一次性、共用同一储备；先摆“截止 vs 费用”选择再 booking（003）。
- **银行截止是银行事实**：不要请客户确认或放弃（003）。
- **批次只认银行回执**：`ACK_PENDING` 既非成功也非失败；`submission_key` 同键同参返回原 attempt（004）。
- **能力挂载按 service 核**：legacy `propose_collection_application` 不能挂到 Desk 的 RailProfile（002）。

## 五、已知问题 / 待办

1. **L1 按族增长 → 前几题搜索空间偏小**：001 用 23 LE、005 用 46 LE。**不即时重跑**；最终阶段冻结 L1 后统一重跑已跑题，以重跑结果为正式成绩。
2. **PSP 命名空间（31–50）未建模**：`xp_*` 是另一套 L1，需另起一份。
2. **模拟器口径漂移**：001/005 都出现“把设施费算进客户上限”的过度限制；靠 L3 表述可修正，但仍是评估噪声；必要时用冻结客户脚本做对照。
3. **case_002 token 偏大**（23.7M）：多站点 × 9 + 退出 + 多次等待；属结构成本，暂不动评测口径。
4. **npm 包脚手架已就绪**（`tsm-scenario-bizagentbench@0.1.0`），发布等条件齐。
5. 英文 README / i18n 已登记；`tsm coverage` 对 50 题的覆盖校验留到规范化阶段。

## 六、明天从哪继续

- 下一题：`case_006`（权利分配 × 时间资格 × 重规划），先拆契约、对照 L1 找缺族。
- **最终阶段**（所有要跑的题跑完后）：冻结 L1（记录版本）→ 用同一份 L1 统一重跑已跑题 → 出正式成绩；之前的结果只作预跑。
- 环境：`TSM_SCENARIO=scenarios/bizagentbench`、`TSM_STORE_DIR=.store/lance/bizagentbench`、`TSM_MODEL_DIR=tmp_scripts/bge-onnx`；桥 `eval/dlr_server.mjs`（28797）；跑题 `eval/run_dlr_pilot.sh <out> <num>`。
- 提交节奏：小步 commit；日常推 atomgit；GitHub 等通知走 `tmp_scripts/ghpush/sync.sh`。

## 七、本阶段提交

- `222a86b8` 场景与最终结果（001–002）
- `0fc2ea10` npm 包骨架 + eval 桥入包
- `6e559cf9` case_003 收口
- `e692cbc0` case_004 收口
- `f6451a29` case_005 收口
