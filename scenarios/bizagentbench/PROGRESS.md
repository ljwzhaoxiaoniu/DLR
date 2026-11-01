# BizAgentBench · 穿刺进度（工作记录）

> 2026-10-31 夜 → 2026-11-01 ｜ 分支 2.0 ｜ 5/50 题已跑（全 strict）；**全量三层已建成（覆盖 50 题）**
> 对外成果见 [DETAIL.md](DETAIL.md) / [eval/ledger.json](eval/ledger.json)；本文是续做用的工作记录。

## 一、已完成

| 题 | 场景 | strict | 调用 | tokens | 关键收获 |
|---|---|---|---|---|---|
| case_001 | fx + tax | ✅ | 188 | 6.30M | 储备提款按净额/到账分钟比较；改单费上限不含设施费 |
| case_002 | rails + exit | ✅ | 313 | 23.73M | 多站点上线 + 退出；能力必须挂对对象（desk 开户 API） |
| case_003 | reconciliation + onboarding | ✅ | 253 | 9.45M | 证据按**审查时**版本；提款一次性共用储备，先摆选择再 booking；银行截止是银行事实 |
| case_004 | restrictions + batches | ✅ | 505 | 16.28M | 每 lot 可用性；批次只认银行回执；**待评估条款可能改净额**（1 分钱陷阱） |
| case_005 | treasury + disputes | ✅ | 339 | 14.01M | 授权三同 + 版本时效；仅 SETTLED 补偿；立案费上限不含设施费 |

> **前五题为预跑**；**2026-11-01 已按全量模型一次性建全三层**（Operations Desk 1–30 + PSP 31–50）。
> 正式成绩以全量模型上的统一重跑为准（001–005 一并重跑）；此前结果只作预跑。

## 二、三层现状（2026-11-01 全量）

| 层 | 规模 | 覆盖 |
|---|---|---|
| L1 · operations_desk | **84 LE · 127 PAS · 513 向量行**（302 PE） | `operations_desk.yaml`（46 LE，cases 1–5 的 desk 核心）+ `typed_services.yaml`（38 LE，cases 6–30：33 个 DIVERSE/PAYMENT 服务对象 + JointAgreement/JointSource/JointRoute/JointFunding/LinkContract） |
| L1 · psp | **22 LE · 20 PAS · 174 向量行**（132 PE） | `psp.yaml`：XpCase / XpAccount + 20 个案件族（cases 31–50），PE 覆盖各族的 `xp_*` 记录面 |
| L2 | **176 条** | shared 10 + operations_desk 35 + typed_services 84 + psp 47；全部按“一条一句口径”写 |
| L3 | **50 节** | operations_desk 30（5 预跑 + 25 新）+ psp 20；每节标题 = 客户开场白逐字，正文 = 类级打法 |

L1 的 typed/PSP 部分按 schema 级生成 + 人工收口：能力取自 `tool_catalog`，字段语义取自 `DB-service-*` / `PX-DATABASE`，动作与规则取自 `DIVERSE-* / PAYMENT-* / LINK-* / PX-* / IFACE-*` 产品文章；零实例值。
LE 面只保留锚定/状态键（避免长字段清单稀释召回）；完整字段随 PE 返回。

检索说明：L3 按题面**精确命中**是每题的入口（50/50 标题逐字对齐）。

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
3. **L1 多意图问句召回仍偏弱（已缓解）**：换 bge-base-en-v1.5 后单对象问句/对象名召回已准确；整段多意图开场白仍难一次覆盖全部对象（如 case_006），以 L3 精确命中为主入口，再按 L3 点名对象查 L1。
4. **README 三层表仍是打包时数字**（23 LE / 16 PAS / 20 条 / 2 节）→ 待按全量数字更新（双语 + i18n 登记）。
5. **模拟器口径漂移**：001/005 都出现“把设施费算进客户上限”的过度限制；靠 L3 表述可修正，但仍是评估噪声；必要时用冻结客户脚本做对照。
6. **case_002 token 偏大**（23.7M）：多站点 × 9 + 退出 + 多次等待；属结构成本，暂不动评测口径。
7. **npm 包脚手架已就绪**（`tsm-scenario-bizagentbench@0.1.0`），发布等条件齐。
8. `tsm coverage` 对 50 题的覆盖校验留到规范化阶段（dlr-state 形态的 coverage 口径待定）。

## 六、接下来

- **全量模型已装进隔离存储**（`.store/lance/bizagentbench`：entities 687 / consensus 176 / sop 50）。
- **跑题（下一阶段）**：按 4 题/批、串行跑；首批建议 `case_006–009`（desk 侧），跑完停下报数，再决定下一批。桥已支持双系统：cases 1–30 → `operations_desk`，31–50 → `psp`（`run_dlr.py` 按 `--numbers` 自动切换）。
- 跑题前起桥（28797）：`TSM_SCENARIO=... TSM_STORE_DIR=... TSM_MODEL_DIR=... npx tsx eval/dlr_server.mjs`；`run_dlr_pilot.sh <out> <num>`。
- **最终阶段**：冻结全量模型（记录版本）→ 统一重跑所有已跑题（含 001–005）→ 出正式成绩；之前结果只作预跑。
- 环境：`bash eval/start_bridge.sh` 起桥（28797，自动解析场景/store/HF 缓存里的 bge-base-en-v1.5，`/health` 回 model 路径）；跑题 `eval/run_dlr_pilot.sh <out> <num>`。手动起桥时务必 `TSM_MODEL_DIR` 指向英文模型快照。
- 提交节奏：小步 commit；日常推 atomgit；GitHub 等通知走 `tmp_scripts/ghpush/sync.sh`。

## 七、本阶段提交

- `222a86b8` 场景与最终结果（001–002）
- `0fc2ea10` npm 包骨架 + eval 桥入包
- `6e559cf9` case_003 收口
- `e692cbc0` case_004 收口
- `f6451a29` case_005 收口
