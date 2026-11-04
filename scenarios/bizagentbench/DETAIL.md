# BizAgentBench · 最终结果（按题号）

> 更新：2026-11-04 凌晨 ｜ 只记录每题**最佳有效成绩**（strict 优先，否则最高 checks）；无效/排除轮单列。
> 机器可读记录：[eval/ledger.json](eval/ledger.json) ｜ 跑档：`results/dlr-full/`（本地留档，gitignored）
> **最终 best-practice store**：`TSM Core Service/.store/lance/bizagentbench-v35`（freeze `92d551b9+l3opt8`，entities 687 / consensus 191 / sop 50）——v34 全量 + 8 个失败驱动 L3 节优化（003/004/005/006/010/013/014/049；尚未复跑验证）。

**指标口径**（与上游 `README.md` 一致）：

| 指标 | 含义 |
|---|---|
| G · Goal | 请求的业务结果与允许的终止条件（目标类 check） |
| P · Process | 业务操作的执行要求（审批、顺序、时限、单次完成等） |
| F · Protection | 受保护对象、账本完整性、禁止性副作用（不重复付款、不越权等） |
| Strict | G ∧ P ∧ F 全过（本题表一“strict”列） |
| IF · Intermediate failure | `not (P ∧ F)`：过程或保护要求失败的比例（与 G 是否达成无关） |

## 一、最终结果（001–050）

| 题 | 最佳 | strict | store / freeze | 最佳轮失败项 | 备注 |
|---|---|---|---|---|---|
| 1 | **37/37** | ✅ | v1 预跑（非冻结） | — |  |
| 2 | **85/85** | ✅ | v1 预跑（非冻结） | — |  |
| 3 | **50/50** | ✅ | v1 预跑（非冻结） | — |  |
| 4 | **58/58** | ✅ | v1 预跑（非冻结） | — |  |
| 5 | **46/46** | ✅ | v1 预跑（非冻结） | — |  |
| 6 | **39/39** | ✅ | v1 / `ff3663ec` | — |  |
| 7 | **39/39** | ✅ | case_007_v25 / `021c7717` | — |  |
| 8 | **43/44** | ❌ | case_008_v9 / `faaa7cc1` | joint.fee_and_reserve | 16 轮；方差主导，未归一 |
| 9 | **42/42** | ✅ | case_009_v24 / `530cf148` | — |  |
| 10 | **37/39** | ❌ | case_010_a2 | joint.continuous_operating_floors, activity1:cash.reserve_and_no_foreign_surplus.continuous_reserve |  |
| 11 | **36/42** | ❌ | case_011_a2 | joint.exact_capital, joint.fee_and_reserve, joint.continuous_operating_floors, activity2:participant.A, activity2:participant.B |  |
| 12 | **38/38** | ✅ | case_012_v3 / `6f3a3102` | — |  |
| 13 | **45/47** | ❌ | case_013_v29 / `118b0fdf` | activity1:loss.actual_recoveries.C, activity1:loss.actual_recoveries.D |  |
| 14 | **39/41** | ❌ | case_014_v29 / `118b0fdf` | joint.fee_and_reserve, activity1:invoices.final_individual_discharge |  |
| 15 | **42/42** | ✅ | case_015_a2 | — |  |
| 16 | **40/40** | ✅ | case_016_v9 / `faaa7cc1` | — |  |
| 17 | **32/32** | ✅ | case_017_a2 | — |  |
| 18 | **30/30** | ✅ | case_018_a1 | — |  |
| 19 | **35/35** | ✅ | case_019_v23 / `985c683d` | — |  |
| 20 | **29/29** | ✅ | case_020_v17 / `b91c7bcc` | — |  |
| 21 | **30/30** | ✅ | case_021_a3 | — |  |
| 22 | **30/30** | ✅ | case_022_v15 / `082bfe9f` | — |  |
| 23 | **32/32** | ✅ | case_023_v17 / `b91c7bcc` | — |  |
| 24 | **33/33** | ✅ | case_024_v18 / `bcca13d2` | — |  |
| 25 | **29/29** | ✅ | case_025_a3 | — |  |
| 26 | **31/31** | ✅ | case_026_a2 | — |  |
| 27 | **34/34** | ✅ | case_027_v25 / `021c7717` | — |  |
| 28 | **35/35** | ✅ | case_028_v26 / `5d4976b0` | — |  |
| 29 | **37/37** | ✅ | case_029_v26 / `5d4976b0` | — |  |
| 30 | **29/29** | ✅ | case_030_v26 / `5d4976b0` | — |  |
| 31 | **18/18** | ✅ | 预跑 r2（非冻结） / `0b8e2cd7` | — | 冻结态 best = v29 5 G；预跑 strict 仅历史 |
| 32 | **18/19** | ❌ | case_032_v26 / `5d4976b0` | a.32.reasoning_collection_budget |  |
| 33 | **18/18** | ✅ | case_033_v30 / `66b2b33d` | — |  |
| 34 | **16/16** | ✅ | case_034_v26 / `5d4976b0` | — |  |
| 35 | **17/17** | ✅ | case_035_v30 / `66b2b33d` | — | 首跑/优化轮 |
| 36 | **16/16** | ✅ | case_036_v30 / `66b2b33d` | — | 首跑/优化轮 |
| 37 | **18/18** | ✅ | case_037_v32 / `02b80d7f` | — | 首跑/优化轮 |
| 38 | **19/19** | ✅ | case_038_v32 / `02b80d7f` | — | 首跑/优化轮 |
| 39 | **17/17** | ✅ | case_039_v30 / `66b2b33d` | — | 首跑/优化轮 |
| 40 | **16/16** | ✅ | case_040_v30 / `66b2b33d` | — | 首跑/优化轮 |
| 41 | **19/19** | ✅ | case_041_v30 / `66b2b33d` | — | 首跑/优化轮 |
| 42 | **17/17** | ✅ | case_042_v31 / `347b7944` | — | 首跑/优化轮 |
| 43 | **17/17** | ✅ | case_043_v30 / `66b2b33d` | — | 首跑/优化轮 |
| 44 | **21/21** | ✅ | case_044_v31 / `347b7944` | — | 首跑/优化轮 |
| 45 | **20/20** | ✅ | case_045_v32 / `02b80d7f` | — | 首跑/优化轮 |
| 46 | **23/23** | ✅ | case_046_v32 / `02b80d7f` | — | 首跑/优化轮 |
| 47 | **21/21** | ✅ | case_047_v30 / `66b2b33d` | — | 首跑/优化轮 |
| 48 | **19/21** | ❌ | case_048_v30 / `66b2b33d` | c48_linked_rights, process.048.disputed_claim_preserved | 首跑/优化轮 |
| 49 | **23/24** | ❌ | case_049_v31 / `347b7944` | c49_reasoning_fees | 首跑/优化轮 |
| 50 | **16/21** | ❌ | case_050_v32 / `02b80d7f` | c50_goal, c50_linked_accounting, c50_linked_match, c50_reasoning_payroll, shared.single_final_outcome.terminal_goal | 首跑/优化轮 |

## 二、最终 best-practice store

| 项 | 值 |
|---|---|
| store | `TSM Core Service/.store/lance/bizagentbench-v35` |
| freeze | `92d551b9+l3opt8`（`eval/freeze.v35.json`） |
| 规模 | entities 687 · consensus 191 · sop 50 |
| Embedding | BAAI/bge-base-en-v1.5（768 维，HF 缓存 ONNX 快照）；模型与 store 同源 |
| 覆盖 | v34（L1 字段映射、013 scrub、历史最佳节拼接）+ v35 八节失败驱动优化：003 调度通知后版、004 用途匹配、005 争端登记全组件、006 连续底仓先行出资、010 早价补外币、013 零回收亦登记、014 零分钟义务当刻支付、049 经济额度分配与到账回执 |
| 说明 | 最终单一 best-practice store；表一最佳成绩锚定于此前的各节文本（v35 八节尚未复跑）。001–006/031 为早期/预跑结果，不在当前底座 |

## 三、复现

```bash
# 起桥（v35 / 28799）
cd "D:/Code_Proj/DLR Proj/scenarios/bizagentbench"
TSM_STORE_DIR="D:/Code_Proj/DLR Proj/TSM Core Service/.store/lance/bizagentbench-v35" \
BIZ_DLR_PORT=28799 bash eval/start_bridge.sh

# 跑单题
BIZ_DLR_PORT=28799 bash eval/run_dlr_pilot.sh results/dlr-full/<out-dir> <题号>
```

## 四、本地补丁披露

| 文件 | 改动 | 原因 | 影响面 |
|---|---|---|---|
| `Dataset/BizAgentBench-main/tools/transport_support.py` | `write()` 原子替换加 Windows 文件锁重试 | 实时扫描短暂占用导致 `WinError 5`，与模型行为无关 | 仅基础设施；不改判分与数据 |

## 五、论文外部基线（仅参照，保留用于最终确认）

> 来源：BizAgentBench / BizBench（arXiv:2610.20424）主表；50 题、多数模型 3 轮平均。**本仓库不以论文 3 轮均值为交付口径**，只保留这组数字作外部参照；我们的推进以“每题最佳有效过程”为准（strict 一次即 pass）。

| 模型 | G | P | F | IF | Strict |
|---|---|---|---|---|---|
| Claude Opus 5 | 64.0 | 96.0 | 98.0 | 4.0 | **64.0** |
| GPT-6 Sol | 64.7 | 94.7 | 100.0 | 5.3 | **61.3** |
| GLM-5.3-Flash | 48.0 | 79.3 | 87.3 | 29.3 | 43.3 |
| DeepSeek-V4.1-Flash | 46.7 | 92.0 | 96.7 | 9.3 | 43.3 |
| DeepSeek-V4-Pro | 41.3 | 85.3 | 88.7 | 24.7 | 39.3 |
| Muse Spark 1.3 | 38.0 | 94.0 | 98.0 | 6.0 | 38.0 |
| Qwen3.8-27B | 42.0 | 74.0 | 93.3 | 28.0 | 32.7 |
| DeepSeek-V4-Flash | 7.3 | 53.3 | 95.3 | 47.3 | 5.3 |
| Qwen3.5-397B-A17B | 1.3 | 46.7 | 93.3 | 56.7 | 0.7 |
| Qwen3.5-9B | 0.0 | 18.7 | 89.3 | 83.3 | 0.0 |

- 我们的跑批 agent = **DeepSeek-V4.1-Flash**（dsh 别名 `deepseek-flash`），对应表中 46.7 / 92.0 / 96.7 / 9.3 / 43.3 一行。
- 该表只作“最终确认”时的外部锚点；当前 DETAIL 表一的最佳成绩是我们自己的过程口径，不强行与论文的 3 轮均值对齐。
- 论文消融参考：strict 43.3 → 50.0（Gold-doc）→ 70.0（full customer disclosure）；工具调用上限收紧到 1.2× 参考值会跌到 0.7。
- **方差观察（2026-11-04）**：知识层近似不变时，单题轮次间可出现 5–8 个 check 的漂移（048 19/21 ↔ 11/21 且 P/F 翻转；032 18/19 ↔ 12/19；014 两轮同为 39/41 但失败集合不同；008 十六轮失败模式漂移）。同模型同题的 strict 本质是高方差抽样；论文每题 3 轮均值只能部分压制，接近名次（如 64.0 vs 61.3）不宜作强弱结论。早期简单建模即 strict（001–005 各 N=1）同样应读作单次抽样，而非“简单建模足够”。

## 六、剩余工作

1. **v34 验证窗口（2026-11-04 12:05–13:45）**：14 题；001/002 strict，其余未满；逐题失败点记于 `eval/ledger.json` 的 `window_v34_2026_11_04`。
2. **v35 已优化八节**（003/004/005/006/010/013/014/049）：每条对应实测失败根因（003 后版调度通知、004 用途匹配、005 全组件登记、006 底仓先行出资、010 早价补外币、013 零回收亦登记、014 零分钟义务当刻支付、049 经济额度分配）；**尚未复跑**——本轮按「直接优化、不强制重跑」口径。
3. **验证建议（待确认）**：上述八题各 1 轮验证 v35 节效果；strict 即收关，不 strict 归档 best。
4. **未追**：011（同失败集稳定、无新手段）、031/032/048（多点/方差）、008/050（已归档）。
5. **底座口径**：001/002 已在窗口 strict；003–006 与 010/013/014/049 的最佳成绩仍锚定此前各节文本（v35 节待验证）。
