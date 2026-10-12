# 评测明细 · train-ticket/runtime — cloudopsbench

> 本家族已跑 **2/96** 题：JRA ✅2 ❌0 ｜ 证据链全闭 2 ｜ token 中位 554,007 ｜ 生成 2026-10-12T10:54:47.441Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 26 | 265,656 | 0 | 0 | 1012_1512_inorder4-v3b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1944 | 37 | 554,007 | 0 | 0 | 1012_1846_inorder4-v3b4 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 26 · tokens 265,656
- **摘要**：Widespread availability disruption: 14 train-ticket services (ts-notification/order-other/payment/price/route/security/station/station-food/train/train-food/travel/travel2/user/wait-order-service) are 0/1 READY in CrashLoopBackOff (RESTARTS 10) spread evenly across worker-01/02/03, with no scheduling events (PodScheduled True, no FailedScheduling/FailedCreate). Pod logs close the mechanism at the shared downstream: 'java.sql.SQLNonTransientConnectionException: Too many connections' / 'SQL Error: 1040, SQLState: 08004' when building the Hibernate SessionFactory ('Unable to open JDBC Connection 

### case-2

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1944 · steps 37 · tokens 554,007
- **摘要**：13/40 train-ticket Deployments show 0/1 AVAILABLE and their pods are CrashLoopBackOff (RESTARTS=5, exit code 1) spread across worker-01/02/03; CheckServiceConnectivity to ts-user-service:12342 and ts-price-service:16579 fails from all three nodes ('Connection Failed'). Client container logs show 'HikariPool-1 - Exception during pool initialization ... java.sql.SQLNonTransientConnectionException: Too many connections' (SQL Error: 1040, SQLState: 08004) -> 'Unable to open JDBC Connection for DDL execution' -> 'Application run failed'. Server-side closure: tsdb-mysql error log contains 484 occurr

