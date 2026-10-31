# tsm-scenario-bizagentbench

BizAgentBench 的 TSM 场景包——支付域长程 agent 基准（50 题）。在数据集之上新增三级语义建模层，
不修改数据集的题、知识、工具与判分。

## 三层

| 层 | 文件 | 规模 | 内容 |
|---|---|---|---|
| L1 | `sources/configs/DLR/operations_desk.yaml` | 23 LE · 16 PAS | schema 级业务对象：生命周期 + 挂载能力（anchor + guard）；记录面按案件 scope 锚定；零实例值 |
| L2 | `sources/consensus/{shared,operations_desk}.jsonl` | 20 条 | 跨对象口径：最小单位、报价与结算、按笔交付费、储备条件、改单与分配、证据版本、开通/退出规则 |
| L3 | `sources/sop.md` | 2 节 | 问题类打法；标题 = 客户开场白（检索触发），正文 = 类级方法——不写实例金额、记录 ID 或固定序列 |

L1 的建模源是数据集自带的 `DB-index` / `DB-*` / `DESK-*` / `tool_catalog`；schema 级，一份模型服务
所有 Operations Desk 题。L3 是本包新增，**不是**数据集内容。

## 数据集

BizAgentBench `bizagentbench-payment-v1`：50 题（1–30 Operations Desk，31–50 PSP）、789 份知识文档
（621 份可搜）、601 条能力、404 个集合 / 3,121 条记录。数据集外置，用 `BIZAGENTBENCH_DIR` 指向其检出目录。
PSP 命名空间尚未建模。

## 与 tsm-core-dlr 一起用

```bash
TSM_SCENARIO=tsm-scenario-bizagentbench   # 安装态
# 或路径：TSM_SCENARIO=/path/to/scenarios/bizagentbench
tsm build all
tsm serve --http 28795
```

服务暴露 `state_model_query`（L1）、`dlr_search_consensus`（L2）、`dlr_search_sop`（L3）。
L1 返回每个对象的生命周期、挂载能力（名称 / 锚 / 守卫），桥接版还会带上 `search_records` 接受的公开集合清单。

## 评测桥（可选）

`eval/` 把 DLR 工具接进上游 BizAgentBench harness：`search_knowledge` / `read_document` 被
`dlr_l1` / `dlr_l2` / `dlr_l3` 替代；客户模拟器、环境与确定性 G/P/F 判分不变。

```bash
# 1) 建隔离存储（不碰其他场景）
TSM_SCENARIO=... TSM_STORE_DIR=... TSM_MODEL_DIR=... \
  npx tsx "../../TSM Core Service/src/build/buildLance.ts" --all
# 同 env 再跑 buildConsensus.ts / buildSop.ts

# 2) 起桥（默认 28797）
TSM_SCENARIO=... TSM_STORE_DIR=... TSM_MODEL_DIR=... npx tsx eval/dlr_server.mjs

# 3) 跑一题
eval/run_dlr_pilot.sh runs/dlr-001 1
```

可覆盖：`BIZAGENTBENCH_DIR`、`TSM_SERVICE_DIR`、`DEEPSEEK_ENV_FILE`、`BIZ_PYTHON`、`BIZ_DLR_PORT`。
Python harness 需要基准自己的依赖；桥本身是 Node。

## 最终结果（assisted）

| 题 | strict | G | P | F | 工具调用 | tokens |
|---|---|---|---|---|---|---|
| case_001 | ✅ | ✅ | ✅ | ✅ | 188 | 6,302,559 |
| case_002 | ✅ | ✅ | ✅ | ✅ | 313 | 23,734,153 |
| case_003 | ✅ | ✅ | ✅ | ✅ | 253 | 9,445,421 |
| case_004 | ✅ | ✅ | ✅ | ✅ | 505 | 16,279,513 |
| case_005 | ✅ | ✅ | ✅ | ✅ | 339 | 14,006,648 |

产物：`results/dlr-pilot/case_00*_result.json`。

## 数据集 vs 新增

数据集的 621 份可搜文档**不含**本包的 L1/L2/L3。结果分两档报：**bare**（只用数据集知识工具）与
**assisted**（DLR 工具），不得混写。

## License

MIT.
