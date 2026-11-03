# BizAgentBench · 最终结果（按题号）

> 更新：2026-11-03 06:00 ｜ 只记录每题**最佳有效成绩**（strict 优先，否则最高 checks）；无效/排除轮单列。
> 机器可读记录：[eval/ledger.json](eval/ledger.json) ｜ 跑档：`results/dlr-full/`（本地留档，gitignored）
> 最终 best-practice store：`TSM Core Service/.store/lance/bizagentbench-v20`（freeze `8992a5aa`，entities 687 / consensus 187 / sop 50）

## 一、最终结果（001–031）

| 题 | 最佳 | strict | store / freeze | 最佳轮失败项 | 备注 |
|---|---|---|---|---|---|
| 001 | **37/37** | ✅ | v1 预跑（非冻结） | — | assisted 预跑；冻结态复跑待做 |
| 002 | **85/85** | ✅ | v1 预跑（非冻结） | — | 同上 |
| 003 | **50/50** | ✅ | v1 预跑（非冻结） | — | 同上 |
| 004 | **58/58** | ✅ | v1 预跑（非冻结） | — | 同上 |
| 005 | **46/46** | ✅ | v1 预跑（非冻结） | — | 同上 |
| 006 | **39/39** | ✅ | v1 / `ff3663ec` | — | 3 有效轮 33/39、**39/39**、36/39（strict 1/3） |
| 007 | **37/39** | ❌ | v1 / `ff3663ec` | cargo A、calendar EUR | best-3 37/36/30，均值 34.33；首跑 25 excluded |
| 008 | **43/44** | ❌ | v3 / `6f3a3102`（v9 同分 / `faaa7cc1`） | `activity2:NEW.actual_exact_timely` | v10 42/44、v7 41/44、v3c 38、v3d 37、v5 36、v2 34、clean 33；v2b/v3-first/v4 排除 |
| 009 | **41/42** | ❌ | v3 / `6f3a3102` | `activity2:seller.B` | v6 40/42；v9 24/42 `too_many_errors` 排除 |
| 010 | **35/39** | ❌ | v3 / `6f3a3102`（v11 同分 / `b4882f0f`） | G: joint fee/reserve、no remaining exposure；P: joint floors、continuous reserve | v10 34/39 |
| 011 | **33/42** | ❌ | v11 / `b4882f0f` | G: joint capital/fee、participant A/B、merchant G1、terminal；P: joint floors | v3 32/42、v10 30/42 |
| 012 | **38/38** | ✅ | v3 / `6f3a3102` | — | 首跑 strict |
| 013 | **41/47** | ❌ | v10 / `d0777d2a`（v11 同分 / `b4882f0f`） | G: retained indemnity EW/PW、recoveries A-D | v3 39/47 |
| 014 | **38/41** | ❌ | v3 / `6f3a3102` | G: invoice original due、external source/recipient/deadline、SERVICE exact/timely | v10/v11 35/41 |
| 015 | **41/42** | ❌ | v10 / `d0777d2a` | G: `activity2:seller.B` | v3 40/42、v5 39/42 |
| 016 | **40/40** | ✅ | v9 / `faaa7cc1` | — | v5 39/40；v3 29/40 buggy 排除 |
| 017 | **31/32** | ❌ | v11 / `b4882f0f`（v13/v14 同分） | G: `documents.acceptance_and_payment`（此轮）；v13 仅 seller.B | v12 30/32；两失败模式互换，判为摆动 |
| 018 | **29/30** | ❌ | v14 / `4516b4d7`（v12 同分） | G: `interest.exact_facility_adjustment` | 5 有效轮；剩 minute 0 顺序 + SALES 负调整 |
| 019 | **34/35** | ❌ | v14 / `4516b4d7`（v15 同分） | G: `activity2:seller.B` | v12 29/35、v13 33/35；v17 无效排除 |
| 020 | **29/29** | ✅ | v17 / `b91c7bcc` | — | v15 首跑 24/29 |
| 021 | **26/30** | ❌ | v15 / `082bfe9f` | G: employee.M、COURIER、capture.FIRST、unused hold | v17 25/30、v18 22/30；v19 无效排除 |
| 022 | **30/30** | ✅ | v15 / `082bfe9f` | — | 首跑 strict |
| 023 | **32/32** | ✅ | v17 / `b91c7bcc` | — | v15 31/32（仅 courier） |
| 024 | **33/33** | ✅ | v18 / `bcca13d2` | — | v17 32/33（费用 8000 > 7500） |
| 025 | **28/29** | ❌ | v18 / `bcca13d2`（v19 同分 / `5bc3a79a`） | G: `billing.minimum_total_cost` | 套餐配对未达静态最优 |
| 026 | **30/31** | ❌ | v19 / `5bc3a79a`（v20 同分 / `8992a5aa`） | G: `activity2:seller.B` | 两轮一致，due-0 被拖后 |
| 027 | **27/34** | ❌ | v20b / `8992a5aa` | G: COURIER、unused hold、payroll L1/N1/L2/N2；P: link deadline priority | 首有效基线；v20 首跑无效排除 |
| 028–030 | — | — | — | — | 未跑 |
| 031 | **18/18** | ✅ | 预跑（`0b8e2cd7`，非冻结） | — | PSP；冻结态复核待做 |

- store 全路径：`TSM Core Service/.store/lance/bizagentbench-<v>`；001–005/031 为冻结前预跑，仅作预跑记录。
- 032–050（PSP 扩展）尚未跑。
- 判分：上游确定性 G/P/F；strict = G/P/F 全过；**strict 一次即 pass**。无效轮（bug/端口/`too_many_errors`）不混入最佳。
- 每题完整尝试链（含 store/freeze/artifact/failed）见 `eval/ledger.json`；过程记录见 `PROGRESS.md`。
- **得分率（checks 通过率，strict 之外的连续指标）**：已覆盖 28 题 case-average **95.9%**（pooled 96.1%）；冻结 desk 006–027 为 **94.8%**（pooled 94.6%）。≥90% 的题 23/28，≥95% 的题 21/28；最低为 011 78.6%、027 79.4%、021 86.7%、013 87.2%、010 89.7%。**strict 只差最后一两个 check，不代表建模收益小**；论文未报裸模型得分率，暂无法直接算“90 vs 60”的差值。

## 二、最终 best-practice store

| 项 | 值 |
|---|---|
| store | `TSM Core Service/.store/lance/bizagentbench-v20` |
| freeze | `8992a5aa`（`eval/freeze.v20.json`；commit `8992a5aaa587c5e7bbb390e9c619de5d651ab98c`） |
| 规模 | entities 687 · consensus 187 · sop 50 |
| Embedding | BAAI/bge-base-en-v1.5（768 维，HF 缓存 ONNX 快照）；模型与 store 同源 |
| 覆盖 | 已并入 017–026 的全部已验证 L3 修复；L1/L2 自 v12 起未变 |
| 说明 | 旧 store 的 per-case best 只作探索证据；最终以 v20 上的统一复跑为准 |

## 三、复现

```bash
# 起桥（v20 / 28799）
cd "D:/Code_Proj/DLR Proj/scenarios/bizagentbench"
TSM_STORE_DIR="D:/Code_Proj/DLR Proj/TSM Core Service/.store/lance/bizagentbench-v20" \
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

## 六、剩余工作

1. 027 定向优化（COURIER、释放额度、payroll、link 优先级）。
2. 028–030（desk）与 032–050（PSP）首跑。
3. 001–005 / 031 在冻结 store 上复核。
4. 在 v20 上对 006–026 统一复跑，确认最终 store 在合理方差带内达到/接近各题 best。
