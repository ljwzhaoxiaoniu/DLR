# BizAgentBench · DLR 穿刺最终结果

> 2026-10-31 ｜ assisted 口径（`dlr_l1` / `dlr_l2` / `dlr_l3` 替代数据集知识工具）
> 判分 = 上游确定性 G/P/F（无 LLM judge）

| 题 | strict | G | P | F | 工具调用 | tokens | 产物 |
|---|---|---|---|---|---|---|---|
| case_001 | ✅ | ✅ | ✅ | ✅ | 188 | 6,302,559 | `case_001_result.json` |
| case_002 | ✅ | ✅ | ✅ | ✅ | 313 | 23,734,153 | `case_002_result.json` |
| case_003 | ✅ | ✅ | ✅ | ✅ | 253 | 9,445,421 | `case_003_result.json` |
| case_004 | ✅ | ✅ | ✅ | ✅ | 505 | 16,279,513 | `case_004_result.json` |

- `case_001_result.json`：`runs/dlr-001/case_001__trial0/result.json`
- `case_002_result.json`：`runs/dlr-002-final3/case_002__trial0/result.json`
- `case_003_result.json`：`runs/dlr-003c/case_003__trial0/result.json`
- `case_004_result.json`：`runs/dlr-004b/case_004__trial0/result.json`
