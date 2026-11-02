# BizAgentBench · 穿刺进度（工作记录）

> 2026-10-31 夜 → 2026-11-01 ｜ 分支 2.0 ｜ 5/50 预跑 strict（001–005）+ case_031 PSP strict；**全量三层已建成（覆盖 50 题）**
> **目标（2026-11-02 用户定）**：摸清 TSM+DLR 在当前 BizAgentBench 建模状态下的最终成绩；**过程只记本文件 + 本地 commit，不对外推送（GitHub / 公开文档 / npm 等）；等建模/成绩稳定后再开始推送**。
> 对外成果见 [DETAIL.md](DETAIL.md) / [eval/ledger.json](eval/ledger.json)；本文是续做用的工作记录。

## 一、已完成

| 题 | 场景 | strict | 调用 | tokens | 关键收获 |
|---|---|---|---|---|---|
| case_001 | fx + tax | ✅ | 188 | 6.30M | 储备提款按净额/到账分钟比较；改单费上限不含设施费 |
| case_002 | rails + exit | ✅ | 313 | 23.73M | 多站点上线 + 退出；能力必须挂对对象（desk 开户 API） |
| case_003 | reconciliation + onboarding | ✅ | 253 | 9.45M | 证据按**审查时**版本；提款一次性共用储备，先摆选择再 booking；银行截止是银行事实 |
| case_004 | restrictions + batches | ✅ | 505 | 16.28M | 每 lot 可用性；批次只认银行回执；**待评估条款可能改净额**（1 分钱陷阱） |
| case_005 | treasury + disputes | ✅ | 339 | 14.01M | 授权三同 + 版本时效；仅 SETTLED 补偿；立案费上限不含设施费 |
| case_031 | PSP（payment expansion） | ✅（预跑，非冻结） | 94 | 2.59M | 机制修复后第 2 遍 **18/18 strict**；跑在 `0b8e2cd7` 全量模型（早于 freeze `ff3663ec`），PSP 31–50 冻结态重跑仍待做 |
| case_006 | allocation/delivery + split capture | —（不计数） | 226 | 12.40M | r8 通过依赖**案例级答案注入**（实例金额/ID/分钟 + verifier 口径），与前 5 题口径不一致；已撤回，一致口径待重跑 |

> **前五题为预跑**；**2026-11-01 已按全量模型一次性建全三层**（Operations Desk 1–30 + PSP 31–50）。
> 正式成绩以全量模型上的统一重跑为准（001–005 一并重跑）；此前结果只作预跑。
> **case_006 的 r8 不计入成绩**：它靠 L3 exact 答案注入（实例值 + verifier 口径）通过，属于答案透传；已撤回注入、恢复类级 L3 + 通用 L2，待一致口径重跑。
>
> **一致口径重跑记录（2026-11-01，无答案注入）**：
> - case_006：第 1 遍 6 个 G 失败；第 2 遍仅 `activity1:allocation.minimum_principal_and_fee`（P/F 已过）；第 3 遍仍只差同一项——agent 实际还款 A 50k + E 25k + B 15k（3 笔，费用 1,500），未按最小集（2 笔/85k/费用 1,000）。网络有 4 段空档，但结果与第 2 遍一致，属真实规划/计算差距。**006 到此为止，不再重跑**。
> - case_007：第 1 遍仅 `activity1:cargo.agreed_delivery.A`（交付晚）；第 2 遍退化为多 G 失败；第 3 遍断网 98s 后 minute 0 `ESCALATED`，**按网络无效作废**；第 4 遍（休眠中断）28/39，11 个 G 失败、P/F 通过，仍未过。**007 到此为止**，最好成绩为第 1 遍 38/39（只差 cargo A）。
> - case_008：首跑 33/44，G 失败 + **F 失败**（`activity1:ledger.independent_reconstruction`、`activity1:frame.original_records`），P 通过，`mixed_failure`；跑中被机器休眠中断 20 分钟，结果标注“睡眠/墙钟噪声”，是否重跑待定。
>
> **负优化回滚（2026-11-01）**：007 在加入 cargo/agreed-depot/instrument/route 类级规则后，从第 1 遍 38/39 退化到 11 个 G 失败；006 的最小本金算法也未带来提升（仍 38/39）。已回滚 007 的 L3 改动与 L2 #185/#190、006 的 #189，恢复最佳已知状态；**类级规则是假设，必须 A/B 对比，变差就回滚，不叠规则**。
> **源版本 ↔ 成绩对应（2026-11-01，归档前置核对）**：
> - 007 的 38/39 ← `e5b50731`（L2 184，case 7 原始打法）；`263d6a3d` 加 #185 cargo + case 7 agreed depot 后退化；`9f830b9f` 再加 instrument/route；`ff3663ec` 已回滚。
> - 006 的 38/39 ← `263d6a3d`（覆盖分支，尚未加 #189）与 `6dfdd4e3`（加 #189 后仍 38/39，无提升）。
> - **冻结源 = `ff3663ec`**：保留 006 覆盖分支，移除 007 负优化与 #189；`eval/freeze.json` 记录 commit + L1/L2/L3/模型 SHA-256。
> - 归档规则：归档结果必须引用 `freeze_id`；历史 38/39 来自不同源，只作探索记录，**不与冻结源成绩混写**。
>
> **冻结源实测（2026-11-01，无注入）**：
> - case_006 frozen：**33/39**，G 失败（joint exact capital、minimum_principal_and_fee、delivery dates、terminal），P/F 通过；27.1M tokens。
> - case_007 frozen：**25/39**，14 个 G 失败（joint capital、payments A/B/C、cargo A/B/C、calendar EUR/GBP、terminal），P/F 通过；提前 `ESCALATED`，3.4M tokens。**该次后按用户 2026-11-02 口径标为 excluded。**
> - 结论：历史 38/39 **不可复现**，是源状态差异 + 跑次方差的离群结果；冻结源上的首轮成绩为 33/39 与 25/39（007 首跑已 excluded；当前 006 三次、007 两次有效待补跑）。单次跑不足以代表能力（论文也是 3 runs/task）。
>
> **006 三次有效；007 两次有效 + 待补跑（2026-11-01，freeze `ff3663ec` / v1 store）**：
> - case_006：第 1 次 **33/39**（27.1M，0 重试）；第 2 次 **39/39 strict ✅**（39.7M，两次 `ReadError` 重试均未执行银行动作、已恢复，结果完整）；第 3 次 **36/39**（33.9M，0 重试；G 失败 minimum principal、delivery dates、COURIER timely）。**均值 36.0/39；strict 1/3；P/F 3/3。**
> - case_007：第 1 次 **25/39**（3.4M，0 重试；minute 0 `ESCALATED`，**按用户 2026-11-02 口径标为 excluded、不计入有效三次**）；第 2 次 **30/39**（14.7M，0 重试）；第 3 次 **37/39**（27.9M，一次 `ReadError` 重试已恢复；只差 cargo A、calendar EUR）。**补跑第 4 次作为第 3 个有效记录，完成后按 30/37/新跑重算均值。**
> - **007 方差原因**：同一 freeze/store/model；run1 minute 0 因 USD 25 费用上限与最低路线费用 USD 40 冲突直接 `ESCALATED`；run2 等到 minute 3，报价窗口关闭（`EXECUTABLE_QUOTE_UNAVAILABLE`），以 `PENDING_EXTERNAL_ACTION` 收口；run3 选 EUR ordinary（晚 1 天）守住费用上限，minute 2 `COMPLETED`。是规划/权衡方差，不是信息差异。
> - 三次跑全部使用 v1 store（`.store/lance/bizagentbench`）；源工作区已有 case 8 的 v2 L3 改动，但 006/007 的 L3 节与 L2 未变，v1 store 未重建。逐次 provenance 在 `results/dlr-full/frozen_provenance/`。
>
> | 题 | run 1 | run 2 | run 3 | 均值 | strict |
> |---|---|---|---|---|---|
> | case_006 | 33/39 | **39/39 ✅** | 36/39 | 36.0 | 1/3 |
> | case_007 | 25/39（excluded） | 30/39 | 37/39 | 33.50（2 有效） | 0/2 |
>
> **008 首跑诊断与类级优化（2026-11-01）**：
> - 首跑 33/44，F 失败 `activity1:ledger.independent_reconstruction` / `activity1:frame.original_records`。离线按 project 后的世界复算：根因不是“改动了原始记录”，而是 **D34 钱包没有按联合协议注入注册资本**。D34 的 `capital_by_case` = 500,000、初始运营 10,000；其 490,000 来自受 release condition 约束的 TRADE 源（需 PAY48 先有 settled installment），PAY48 的 90,000 中 18,000 来自需 D34 先发生实际 cash debit 的 PROCUREMENT 源。agent 只给 PAY48 general 投了 55,000，D34 仍是 10,000，minute 2/4 的 Q4/Q5 收款实际为 `UNPAID`；验证器按协议资本独立重建时认为它们应 SETTLED 并生成 `SETTLED_Q4/SETTLED_Q5` 新借记，于是 queue 状态与新借记集合都对不上 → ledger + frame 同时失败。
> - 另两个独立问题：agent 在已可 return 的重复借记之外又手动 `pay_invoice` I4/I5（30k/40k），造成不必要支付；`pay_bill` 只提案/批准、没有 execute（`NEW.actual_exact_timely` actual=0），并换用 `propose_service_payment` 重复提案。
> - L3 case 8 已补类级机制（无实例值）：① 联合计划先按每服务精确注册资本注资，处理 release-condition 前置、按事件时点排序，过期注资不能补救 UNPAID collection；② 重复借记在 return 时不要再手动补付发票；③ 批准 ≠ 支付，必须 execute 并核对回执，不要用多个支付能力重复提案同一账单。
> - **freeze v2 = `3cbdfe16`**（仅 case 8 L3 改动；`eval/freeze.json` 指向 v2 store `.store/lance/bizagentbench-v2`）；v1 freeze 保留为 `eval/freeze.ff3663ec.json`，v1 store 原样保留给 006/007。
> - **008 v2 复跑：34/44**（首跑 33/44），P 过、F 仍失败。PAY48 的 90k 联合资本已按 72k GENERAL + 18k PROCUREMENT 在 minute 2 投齐；Q4/Q4_OLD 均 RECALLED（与独立重建一致）；I4 不再误付。仍失败：D34 的 490k TRADE 资本在 minute 4 **只到批准、没有执行**，Q5 仍 UNPAID，独立重建预期 Q5 SETTLED 并生成 `SETTLED_Q5` → ledger/frame 继续失败；I5 仍误付 40k；installment 结算 actual 9k vs expected 49k；`joint.exact_capital` 仍失败。根因从“完全没注资”收敛为“D34 注资执行太晚/未执行”，属时序与执行问题，不是 L1/L2/L3 缺知识。**008 已跑两遍；下一轮 2026-11-02 12:05 起跑（v2 store），跑完不停下报告：方差则补到 3 轮算平均，出现新系统性失败则优化 L3/L2（A/B）重建后再跑，直到 14:00。**

## 二、三层现状（2026-11-01 全量）

| 层 | 规模 | 覆盖 |
|---|---|---|
| L1 · operations_desk | **84 LE · 127 PAS · 513 向量行**（302 PE） | `operations_desk.yaml`（46 LE，cases 1–5 的 desk 核心）+ `typed_services.yaml`（38 LE，cases 6–30：33 个 DIVERSE/PAYMENT 服务对象 + JointAgreement/JointSource/JointRoute/JointFunding/LinkContract） |
| L1 · psp | **22 LE · 20 PAS · 174 向量行**（132 PE） | `psp.yaml`：XpCase / XpAccount + 20 个案件族（cases 31–50），PE 覆盖各族的 `xp_*` 记录面 |
| L2 | **187 条** | shared 10 + operations_desk 44 + typed_services 84 + psp 49；全部按“一条一句口径”写。**负优化回滚（2026-11-01）**：移除 #185/#189/#190（007 的 cargo/交付前置/路由规则与 006 的最小本金算法），保留证据支持的 #186–188（覆盖恢复/最小本金/账单时点） |
| L3 | **50 节** | operations_desk 30（5 预跑 + 25 新）+ psp 20；每节标题 = 客户开场白逐字，正文 = 类级打法 |

L1 的 typed/PSP 部分按 schema 级生成 + 人工收口：能力取自 `tool_catalog`，字段语义取自 `DB-service-*` / `PX-DATABASE`，动作与规则取自 `DIVERSE-* / PAYMENT-* / LINK-* / PX-* / IFACE-*` 产品文章；零实例值。
LE 面只保留锚定/状态键（避免长字段清单稀释召回）；完整字段随 PE 返回。

检索说明：L3 按题面**精确命中**是每题的入口（50/50 标题逐字对齐）。**不做答案注入**——`run_dlr.py` 保持原策略，agent 自行按需调用 `dlr_l3`；L3 节必须是类级打法，不得含实例金额、记录 ID、固定分钟或 verifier 口径。case_006 的 r8 曾用“启动时注入精确答案”通过，已认定为口径不一致并撤回。

**L3 结构定盘（2026-11-01）**：BizAgentBench 是固定 50 题 → **按题分节（BIRD 式）**，不采用 COB 的 5 节决策树（那是 754 例症状措辞重复、需要收敛的形态）。节内只写类级方法；不写实例值、记录 ID、固定分钟或 verifier 口径。COB 的决策树思路仅作为将来题目数量/重复度上来时的备选，非必要不改。

**Embedding 模型（2026-11-01 变更）**：biz 场景改用 **BAAI/bge-base-en-v1.5**（768 维，英文专用；HF 缓存快照，`onnx/model.onnx` 436MB），同一套 CLS + L2 + `toLowerCase` 管线，代码零改；正式存储已按新模型重建。实测目标对象直接排第 1（DatedPayroll / DatedCollateral / GatewayOrder / TaxAgentHandover / PricedPaymentRoute），L2 分数同步提升。旧 zh 全量存储备份在 `.store/lance/bizagentbench.zh-bak`。**模型与存储必须同源**——起桥用下方 `eval/start_bridge.sh`，它会自动解析 HF 缓存里的英文模型。

## 三、建模流程（全量模型建成后，此循环只用于补缺口）

> **2026-11-01 全量模型已建成**；下列逐题循环只在跑题暴露缺口时触发（补 L1 族 / L2 条 / L3 类），
> 不再作为首次建模路径。

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

1. **前几题搜索空间偏小（已解决）**：全量模型已建成（84 + 22 LE），001–005 统一重跑即可对齐。
2. **PSP 命名空间（31–50）已建模**：`psp.yaml` + `psp.jsonl` + 20 节 L3。
3. **L1 多意图问句召回仍偏弱（已缓解）**：换 bge-base-en-v1.5 后单对象问句/对象名召回已准确；整段多意图开场白仍难一次覆盖全部对象（如 case_006）。优化只在框架内做：L3 类级打法 + 新增的 6 条通用 L2 口径 + L1 对象名查询，不做答案注入。
4. **README 三层表仍是打包时数字**（23 LE / 16 PAS / 20 条 / 2 节）→ 待按全量数字更新（双语 + i18n 登记）。
5. **模拟器口径漂移**：001/005 都出现“把设施费算进客户上限”的过度限制；靠 L3 表述可修正，但仍是评估噪声；必要时用冻结客户脚本做对照。
6. **case_002 token 偏大**（23.7M）：多站点 × 9 + 退出 + 多次等待；属结构成本，暂不动评测口径。
7. **npm 包脚手架已就绪**（`tsm-scenario-bizagentbench@0.1.0`），发布等条件齐。
8. `tsm coverage` 对 50 题的覆盖校验留到规范化阶段（dlr-state 形态的 coverage 口径待定）。

## 六、接下来

- **全量模型已装进隔离存储**（`.store/lance/bizagentbench`：entities 687 / consensus 187 / sop 50）。
- **case_006 三次有效记录已归档**（v1 freeze `ff3663ec`）：33/39、**39/39 strict**、36/39；均值 36.0，strict 1/3，P/F 3/3。已进 ledger/DETAIL（2026-11-02）。
- **case_007 best-3 已归档**（v1 freeze `ff3663ec`）：37/39、36/39、30/39；**best-3 均值 34.33**，strict 0/3，P/F 3/3。另有两轮 25/39：首跑 minute 0 `ESCALATED` excluded；2026-11-02 补跑 frozen5 为有效但低分，不进 best-3。已进 `eval/ledger.json` / `DETAIL.md`。
- **case_008 调优进展**：v2 34/44；v3b **43/44**（仅 `NEW.actual_exact_timely`，P/F 全过）；v3c 38/44（方差）；v4 32/44（宽规则回归，已回滚）。**当前最佳 = v3b 43/44**，v3 两轮 43/38。v2b 35/44 与 v3 首跑 29/44 因 `dlr_tools` 端口硬编码无效。**下一步（用户 2026-11-02）：晚上用 v3 store（28798）继续跑，凑第 3 个有效轮次后按 best-3 报；007 归档后面再说。** NEW 的窄修复（写进 L1 typed service 的 `pay_bill` 参数/截止语义，不叠宽 L3）作为后续选项；之后 009/010。
- **晚间自动跑（2026-11-02）**：18:45 实际起跑，**两路并行**——路 A 008 v3 三轮齐（v3 freeze `6f3a3102`，`eval/freeze.v3.json`）：**43/44、38/44、37/44**，best-3 均值 **39.33**，strict 0/3，P 2/3、F 1/3（v3b 43 仍最佳，NEW.actual_exact_timely 仍为唯一稳定缺口）；路 A：011 **32/42**（P 挂 continuous floors；G 挂 joint capital/cargo/charges/group）；013 **39/47**（goal_only；G 挂 retained indemnity、loss recoveries、replacement payments、wallet retained purchase；P/F 过）；015 **40/42**（goal_only；G 挂 response ALDER、seller.B；P/F 过）；017 **30/32**（goal_only；G 挂 finance minimum principal/fee、seller.B；P/F 过）。不再开新任务，等 016 跑完即停。路 B：009 首跑 **41/42**（只差 `activity2:seller.B`，P/F 过）；010 **35/39**（P 挂 continuous floors/reserve，G 挂 joint fee/reserve + no remaining exposure，F 过）；**012 38/38 strict ✅**；014 **38/41**（goal_only；G 挂 invoice due amounts、external source/recipient/deadline、SERVICE exact/timely；P/F 过）；016 **29/40**（goal_only；G 挂 joint capital/payments/deposits/cash/installment/NEW；P/F 过）。共用 v3 store（008/011/013/015/017 桥 28798、009/010/012/014/016 桥 28797）。**20:16 用户令：不开新任务，016/017 跑完即停，不再接 018+**；20:33 已停 28797/28798 与服务，22:02 兜底 cron 取消。过程不推送。
- **并行纪律（2026-11-02 用户定）**：最多同时 3 题；目标是优化后稳定建模上的合理成绩，不追求测试推进数量。
- **2026-11-03 夜班（用户令）**：继续做到 **6:00 收尾**（cron 6:02 停）；按 pre-run → optimize → pre-run 推进 015/010/011/013/014/017；上限 3 路；strict 即 pass；无效轮排除；过程不推送。
- **008 收口**：best **43/44**（v3b / v9）；v10 **42/44**（仅 I2/I6；NEW 与 joint.fee_and_reserve 已过，属方差）；v2b/v3-first/v4 记 invalid/回滚；停止优化。
- **第二批 v10 pre-run**：015（已收口 41/42）、010（34/39；剩 exact/timely）、011（30/42；group participants/merchant/segregated + joint capital/fee）、013（41/47；retained indemnity EW/PW + recoveries A-D）、014（35/41；invoice original due/external/SERVICE exact-timely）、017（29/32；finance minimum/payables/seller.B）。
- **v11 = v10 + 010/011/013/014/017 窄 L3**（freeze `b4882f0f`）；010/011/013 v11 pre-run 在跑（28798）；014/017 v11 待接。
- **011 收口**：v11 = **33/42**（group participant A/B、merchant G1、joint capital/fee、continuous floors 仍挂）；best 33/42 归档；3 次尝试，停止优化。
- **013 收口**：v11 = **41/47**（retained indemnity EW/PW、recoveries A-D 仍挂，与 v10 同）；best 41/47 归档；3 次尝试，停止优化。
- **010 收口**：v11 = **35/39**（失败在 exact/timely 与 joint capital/floors 之间摆动）；best 35/39 归档；3 次尝试，停止优化。
- **014 收口**：v11 = **35/41**（joint capital、invoice original due、external、SERVICE exact/timely、cheque stop）；best **38/41（v3）**归档；3 次尝试，停止优化。
- **015 收口**：v10 = **41/42**（仅 `seller.B`；`payout_due_minute 0` 仍拖到 minute 1）；best 41/42 归档；停止优化。
- **010 v10 = 34/39**（P/F 过；G 挂 payments exact/on-time、COURIER exact/timely、terminal）：floors/joint fee 已修，剩 exact/timely 类；可补窄 L3 后再 pre-run。
- **22:12 起三路 pre-run**：008 v5 = **36/44**（未 strict）；trace 显示 agent 根本没调用 `pay_bill`，而是用 `pay_balance` 170 + `close_plan`，误以为 NEW 的 400 已被 plan balance 覆盖——**NEW 是独立账单**。v7 补 case-8 L3 后，**008 v7 = 41/44**（G 挂 I2/I6/NEW；P/F 过）；**008 v9 = 43/44**（仅 `joint.fee_and_reserve`；P/F 过，NEW 已过）——GENERAL 终值 300 < 最低 400；v10 补 fee/reserve 下限，008 v10 pre-run 在跑（28798）。
- **016 v5 = 39/40**（只差 `NEW.actual_exact_timely`）：`record_id` 已生效、金额 40k 正确，但 **minute 1 > due 0**；v9 的 case-16 due-minute 前置已生效——**016 v9 = 40/40 strict PASS**（v3 29/40 buggy 不计；v5 39/40 有效）。016 收官。
- **009 v6 = 40/42**（seller.A/B）：根因是**卖家净额公式错**——应为 `(gross − accepted_return) × (1 − commission_rate)`，不是“原分配 − 退货价”；且 seller.B 的 `payout_due_minute 0` 被拖到 minute 1。v6 的 marketplace 规则写错了，v9 已改为正确公式 + due-0 立即付。**009 v9 = 24/42，`too_many_errors`（16 tool errors），无效、不计入；009 已按 best 41/42（v3）归档并停止优化。**
- **v9 = v7 + 修正 marketplace 公式 + NEW due-minute 前置**（freeze `faaa7cc1`）；**016 v9 = 40/40 strict PASS**；009 v9 = 24/42 invalid（`too_many_errors`）；015 v5 = **39/42**（ALDER/CEDAR、seller.B）。规则：**strict 即 pass，不跑 3 轮**；未 strict 再按缺口优化。
- **v12 = v11 + 017 documents 窄修**（freeze `6f02ba5e`）：017 v12 = **30/32**（`documents.acceptance_and_payment` + `finance.minimum_principal_and_fee` 波动；documents 根因 = A 交 4 单未退 1 单、B 整单未动）；**018 v12 首跑 = 29/30**（仅 `interest.exact_facility_adjustment`：新调整按毛 entitlement 入账，未扣已 POSTED 的 REFUND_A/B，且对已 SETTLED 的 pending 另发 −1866 冲销）；**019 v12 首跑 = 29/35**（`authority.current_versions.GUARANTEE/PLATFORM` 重绑全部返回 `SOURCE_ACCEPTANCE_OR_VERSION_UNAVAILABLE`——最后一次 GUARANTEE 带了 5 个版本、含未完成的 CURRENT；`seller.B` due-0 拖到 minute 1；3 个 terminal 因收口 `ESCALATED` 全挂）。
- **v13 = v12 + 三处窄 L3**（freeze `b48b70f0`）：017 documents 按每张账单拆分（交 accepted÷unit_price 份、退 (face−accepted)÷unit_price 份，DP 须收妥）；018 利息调整 = entitlement − 已 POSTED 历史退款 − 已 SETTLED 的 pending，一笔入账不冲销；019 重绑只列该 authority 的 required 源与当前版本、待 required reliance COMPLETE 后重试，marketplace 补 due-0 与精确净额。store `bizagentbench-v13`（sop 用 bge-base-en 768 维重建）；017/018/019 v13 三路在 28799 复跑。
- **v13 结果**：017 **31/32**（documents 已过；仅 `seller.B`——B 的 due-0 拖到 minute 3）；018 **28/30**（`interest.exact_facility_adjustment` 仍挂：SALES 需 −800 回收但 L3 写“positive”导致漏记；`cash.accounts_and_continuous_reserves` 新挂：minute 0 先付 retainer 6000，OPERATING 0 < 2000 准备金，需先记 +6866 调整再付）；019 **33/35**（authority 重绑全过、terminal 全过；`reliance.validity_and_scope.CURRENT` 因 completed_minute 5 > due 2——OPEN reliance 应先做；`seller.B` due-0 仍拖后）。
- **v14 = v13 + 三处时序窄修**（freeze `4516b4d7`）：017/019 due-0 卖家在**最开局、任何等待之前**先付；018 带符号调整（负值回收也要记）+ minute 0 先记调整再付 retainer + pending 结算后补一笔对冲；019 开局即完成仍 OPEN 的 reliance（其截止最早）。017/018/019 v14 三路在 28799 复跑。
- **v14 结果**：017 **31/32**（seller.B 已过；documents 又漏退 A1/B2——两模式各自都通过过，属摆动）；018 **29/30**（G 全过；仅 P `shared.unapproved_execution_attempt`——REQUESTS-0002 未先获批就 execute，被拒后重试成功仍记不可逆违规）；019 **34/35**（CURRENT 已过；仅 `seller.B` 仍 minute 3 才付）。
- **017 归档**：best **31/32**（v11/v13/v14；v12 30/32 有效），strict 0/4；documents 与 seller.B 两失败模式互换、均已分别通过，判为 agent 方差，停止优化；已进 ledger。
- **v15 = v14 + 两处流程窄修**（freeze `082bfe9f`）：018 每个 request 必须**自己的**客户批准后才能 execute（批一个不等于批全部，未批执行尝试不可逆）；019 把 due-0 卖家置于**所有证书工作之前**（段首加粗）。018/019 v15 + 020 首跑 三路在 28799。
- **v15 结果**：018 **24/30 退化**（漏记全部价值日修订 → 利息 entitlement 算成 10032；SERVICE 200 因“无收款人字段”被 escalate；terminal 挂）；019 **34/35**（仍 `seller.B`，minute 1）；020 首跑 **24/29**（`claims.exact_unauthorized_physical_presentments`：RAIL_DUP 报 25000 而非净损失 20000；`checkout.A`：新验证只 prepare 未获客户实际完成，A 未付）。
- **v16 = v15 + 三处补修**（freeze `06d6533a`）：018 每个 final 确认不一致的 dated item 都要记价值日修订 + 无收款人字段的 due-0 服务账单仍用 `pay_bill` 直付 + 批准语句改为事实陈述；020 报**净损失**、新验证须客户实际完成后再付；019 把 due-0 卖家列为 **step 0**（先于任何证书动作）。018/019/020 v16 待跑（021/022/023 v15 占着 28799）。
- **v15 批次结果**：021 **26/30**（employee M 结算 due 2 拖到 3；COURIER 10000 未按账单付，反而对 FIRST 行做了 10000 cash_payment → FIRST 超额；未 release 15000 剩余额度）；022 **30/30 strict PASS**（首跑即过，section 后续未改，不必复跑）；023 **31/32**（仅 `COURIER.actual_exact_timely`：due 0 拖到 minute 2）。
- **v17 = v16 + 021/023 补修**（freeze `b91c7bcc`）：021 员工按各自 due 最早先结 + COURIER 按独立账单直付（due 0 先付）+ 行 capture 不超过 final + release 未用额度；023 COURIER due 0 先付。018/019/020 v17 三路在 28799；之后 021/023 v17。
- **v17 首批结果**：**020 = 29/29 strict PASS**（两处 L3 修复均生效；已归档）；**019 v17 无效**（`too_many_errors`，11 挂含新 reliance/authority + link.quote_version_refresh，按无效轮排除）；019 归档 best **34/35**（v14/v15，仅 seller.B，停止优化）；**018 v17 = 28/30**（价值日已补记，但 minute 0 先付 retainer 再加 OPERATING +5000 → 准备金瞬时跌破，SALES −800 仍未记）；018 归档 best **29/30**（v12/v14，5 有效轮）。
- **v17 第二批**：**023 = 32/32 strict PASS**（courier due-0 修复生效；已归档）；**021 = 25/30**（employee.M 已修好；COURIER 仍未付、OLD 额度剩 25000 未 release、收口 ESCALATED）；**024 首跑 = 32/33**（仅 `fees.actual_total`：guarantee 给了 A，B 走 standard 3500+topup 500，含 return fee 总 8000 > 7500；最优是 guarantee 给 B，总 7500）。
- **v18 = v17 + 024 路线指派**（freeze `bcca13d2`）：一次性 protected 路线给 standard 费更大的账单（B），其余 standard+topup，总费用须 ≤ 上限。024 v18 + 025 首跑 + 021 v18 三路在 28799。
- **v18 结果**：**024 = 33/33 strict PASS**（protected 给 B 后总费用正好 7500；已归档）；**025 首跑 = 28/29**（仅 `billing.minimum_total_cost`：BULK+EXPORT 31000，最优 BULK+PRO 30000——voucher 抵扣被 fixed 封顶，PRO 20000 能吸满 15000）；**021 = 22/30**（courier/额度释放仍未做，另挂 capture.FIRST/SECOND 与 link）；021 归档 best **26/30**（v15）。
- **v19 = v18 + 025 voucher 配对**（freeze `5bc3a79a`）：voucher 抵扣按当期 fixed 封顶，两期套餐要整体比较（高 fixed 套餐可吸满）；021 补“courier 金额不可当行缺口”。025/021/026 v19 三路在 28799。
- **v5（L1 pay_bill 修复，待验证）**：freeze `cff9b6c9` / `eval/freeze.v5.json`；`InstallmentReturn` 描述由 `pay_bill {bill_id}` 改为 `{record_id, amount_minor}`，并补“due minute 是操作截止”；v5 store = 复制 v3 + 重建 entities（687/187/50），已在 28799 验证描述生效。未跑，等 008/016 A/B。
- **冻结态复跑（后续）**：001–005 与 case_031 的预跑 strict 在冻结 v1 store 上复跑确认；按当前建模设计预期只是方差摆动，不应大幅劣化；PSP 32–50 同批推进。
- **纪律**：类级规则改动必须 A/B；变差即回滚，不叠规则；样本不足不宣称优化有效。
- **跑题（后续）**：按 4 题/批、串行跑；桥已支持双系统：cases 1–30 → `operations_desk`，31–50 → `psp`（`run_dlr.py` 按 `--numbers` 自动切换）。
- 跑题前起桥（28797）：`TSM_SCENARIO=... TSM_STORE_DIR=... TSM_MODEL_DIR=... npx tsx eval/dlr_server.mjs`；`run_dlr_pilot.sh <out> <num>`。
- **最终阶段**：冻结全量模型（记录版本）→ 统一重跑所有已跑题（含 001–005）→ 出正式成绩；之前结果只作预跑。
- 环境：`bash eval/start_bridge.sh` 起桥（28797，自动解析场景/store/HF 缓存里的 bge-base-en-v1.5，`/health` 回 model 路径）；跑题 `eval/run_dlr_pilot.sh <out> <num>`。手动起桥时务必 `TSM_MODEL_DIR` 指向英文模型快照。桥另提供 `/status`（dsh 状态浮层同口径）与 `/viz/dlr` 图谱页；007 用 v1 store 起 28797、008 用 v2 store 起 28798（`TSM_STORE_DIR` + `BIZ_DLR_PORT`）。
- 提交节奏：小步 commit；日常推 atomgit；GitHub 等通知走 `tmp_scripts/ghpush/sync.sh`。

## 七、本阶段提交

- `222a86b8` 场景与最终结果（001–002）
- `0fc2ea10` npm 包骨架 + eval 桥入包
- `6e559cf9` case_003 收口
- `e692cbc0` case_004 收口
- `f6451a29` case_005 收口

## 八、建模与调优经验（2026-11-02 007/008 实测）

> 目的：后续调优照这本账走，不再重复试错。原则：**L1 放工具/字段语义，L3 放类级打法与顺序；每条规则单变量 A/B，变差即回滚，不叠规则。**

### 007（operations_desk，v1 freeze `ff3663ec`）

- **best-3（同一 freeze `ff3663ec`）：37/39、36/39、30/39，均值 34.33，strict 0/3，P/F 3/3。** 另有 2026-11-02 补跑 frozen5 = 25/39（有效但低分，不进 best-3）；首跑 25/39 因 minute 0 `ESCALATED` excluded。
- 30 那轮：等 FX 报价窗口到 minute 3，窗口关闭（`EXECUTABLE_QUOTE_UNAVAILABLE`），EUR/GBP 两笔汇款未出，收口 `PENDING_EXTERNAL_ACTION`；设备三单已完成。
- 37 在窗口内选 EUR ordinary（慢一天但守费用上限）；36 付款执行了但挂 `payment.exact_and_timely.A/B/C`。
- 结论：007 的差距是 **窗口内 booking vs 等更好报价/路线** 的权衡方差，不是知识缺口。历史上 cargo/route 宽规则曾把 38/39 打到 11 个 G，已回滚；后续如再调 007，只做窄规则并 A/B。

### 008（operations_desk，v2/v3/v4 store）

- 有效轮次：v2 **34/44** → v3b **43/44**（仅 `NEW.actual_exact_timely`）→ v3c **38/44**（方差）；v4 **32/44**（回归，已回滚）。v3 两轮 43/38。
- **v3 保留的两条 L3（类级，已证明有效）**：
  1. **重复借记净额重算**：不要用「毛发票额 − 剩余借记」补差；重复借记的 return 本身就是 correction，手动补付会造出第二笔义务。
  2. **更正截止事件**：installment 的 return/refund/新单付款/close 必须在 reconciliation deadline 事件之前全部落账；截止后补做，独立重建不认。
- **v4 的教训**：把 `pay_bill` 的 `record_id` / 最早分钟写成宽 L3 规则 → 32/44 退化。**工具字段名、参数 schema、due-minute 语义属于 L1 能力描述（typed service），不属于 L3 宽规则。**
- **剩余唯一缺口**：`activity2:NEW.actual_exact_timely`。根因：`pay_bill` 先用 `bill_id` 被 `INVALID_LOCAL_ACTION_FIELDS` 拒，改 `record_id` 后已 minute 1 > `due_minute 0`。窄修复方向：在 L1 `propose_payment_installment_return` 的能力描述里写明参数名 `record_id`、`pay_bill` 的金额/截止语义；不要再塞进 L3。
- **基础设施教训**：`eval/dlr_tools.py` 曾硬编码 28797，导致 008 v2b/v3 首跑打错/打空（v2b 35/44 实为 v1，v3 首跑 29/44 为连接拒绝）。已改为读 `BIZ_DLR_PORT`；多 store 并行前先 `curl /health` 核对 store 路径。

### 调优清单（后续照做）

1. 先看失败谱系，区分「知识缺口 / 时序与执行 / 工具 schema / 环境」。
2. 知识缺口 → L3 类级规则（顺序、取舍、陷阱），不写实例值。
3. 工具字段/参数 → L1 能力描述或工具 schema，不写 L3。
4. 每条改动单变量 A/B；变差立即回滚；不叠规则。
5. 每题至少 3 个有效轮次再报均值；excluded/无效轮次单独记档，不混入。
6. **归档只取同一 freeze（同一稳定建模状态）内的记录**；best-3 也在同一 freeze 内选，历史不同源状态的成绩只作探索记录，不混入。007 的 freeze `ff3663ec` 池 = 30/37/36 + 补跑；25 excluded；历史 38/39 不混。
7. **有已知优化空间时只做单轮 pre-run**；优化验证通过、建模稳定后才跑 3 轮平均；pre-run 不进正式均值。**任一轮 strict（G/P/F 全过）即 PASS，不再跑 3 轮；3 轮只用于未 strict 的题。**
8. **3 次是经验上限，不是硬性封顶**：有明确优化空间就继续修；没有空间（只剩方差/“差不多”）或 strict pass 就归档最佳有效结果。**buggy/无效轮排除**（如 016 v3 29/40 不计）；**不再要求稳定 freeze**，归档记录实际 store/freeze，取最佳有效结果。
9. **最终交付 = 单一可复现的 best-practice store/freeze**：合并所有已验证的 L1/L2/L3 修复；受影响题在它上面复跑，**在合理方差带内达到/接近旧 per-case best**；不要求每次精确复现同一分数，agent 摇摆可接受；大幅退化才视为回归并修。旧 store 的 best 只作探索证据，不混入最终归档。
10. **实验结果真实**：有效轮、无效轮、excluded 轮都如实记录（store/freeze/checks/failed/原因）；最终归档引用实际 store/freeze 与 artifact；报 **best + 观察到的 range**，不追求 deterministic；不筛选、不混写、不 cherry-pick；禁止答案注入/实例值提示/改 verifier。
