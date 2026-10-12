# 评测明细 · train-ticket/runtime — cloudopsbench

> 本家族已跑 **1/96** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ token 中位 265,656 ｜ 生成 2026-10-12T07:54:17.572Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 26 | 265,656 | 0 | 0 | 1012_1512_inorder4-v3b3 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 26 · tokens 265,656
- **摘要**：Widespread availability disruption: 14 train-ticket services (ts-notification/order-other/payment/price/route/security/station/station-food/train/train-food/travel/travel2/user/wait-order-service) are 0/1 READY in CrashLoopBackOff (RESTARTS 10) spread evenly across worker-01/02/03, with no scheduling events (PodScheduled True, no FailedScheduling/FailedCreate). Pod logs close the mechanism at the shared downstream: 'java.sql.SQLNonTransientConnectionException: Too many connections' / 'SQL Error: 1040, SQLState: 08004' when building the Hibernate SessionFactory ('Unable to open JDBC Connection 

