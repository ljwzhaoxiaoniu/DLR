# 评测明细 · boutique/admission — cloudopsbench

> 本家族已跑 **1/58** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-10T09:25:25.475Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.7333 | 16 | 0 | 0 | 1010_1658_inorder5 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `missing_service_account` ｜ 标签 `app/adservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.7333 · steps 16
- **摘要**：Caller-side evidence: frontend logs show 126 occurrences of 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.76.205:9555: connect: connection refused' — only the ad call path fails, matching 'Partial Service Unreachability'. Target-side: endpoints/adservice is <none> and active TCP check to adservice:9555 returns 'Connection Failed'; the Service selector (app=adservice) and port mapping (9555->9555) are correct, so there is nothing to bind. Pod/owner surface: the pods listing contains 10 Running pods with adservice entirely absent, and deployment adservice reports 0/1 ready

