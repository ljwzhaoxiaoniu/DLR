# 评测明细 · train-ticket/runtime — cloudopsbench

> 本家族已跑 **6/96** 题：JRA ✅6 ❌0 ｜ 证据链全闭 6 ｜ token 中位 535,723 ｜ 生成 2026-10-13T04:31:23.874Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 26 | 265,656 | 0 | 0 | 1012_1512_inorder4-v3b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1944 | 37 | 554,007 | 0 | 0 | 1012_1846_inorder4-v3b4 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1818 | 23 | 535,723 | 0 | 0 | 1012_1923_l1l2-verify2 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 517,218 | 0 | 0 | 1012_1935_tidy-verify1 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.1429 | 36 | 800,099 | 0 | 0 | 1012_2000_case-verify1 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3182 | 23 | 477,041 | 0 | 0 | 1013_1134_inorder4-v3b10 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 26 · tokens 265,656
- **摘要**：Widespread availability disruption: 14 train-ticket services (ts-notification/order-other/payment/price/route/security/station/station-food/train/train-food/travel/travel2/user/wait-order-service) are 0/1 READY in CrashLoopBackOff (RESTARTS 10) spread evenly across worker-01/02/03, with no scheduling events (PodScheduled True, no FailedScheduling/FailedCreate). Pod logs close the mechanism at the shared downstream: 'java.sql.SQLNonTransientConnectionException: Too many connections' / 'SQL Error: 1040, SQLState: 08004' when building the Hibernate SessionFactory ('Unable to open JDBC Connection 

### case-2

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1944 · steps 37 · tokens 554,007
- **摘要**：13/40 train-ticket Deployments show 0/1 AVAILABLE and their pods are CrashLoopBackOff (RESTARTS=5, exit code 1) spread across worker-01/02/03; CheckServiceConnectivity to ts-user-service:12342 and ts-price-service:16579 fails from all three nodes ('Connection Failed'). Client container logs show 'HikariPool-1 - Exception during pool initialization ... java.sql.SQLNonTransientConnectionException: Too many connections' (SQL Error: 1040, SQLState: 08004) -> 'Unable to open JDBC Connection for DDL execution' -> 'Application run failed'. Server-side closure: tsdb-mysql error log contains 484 occurr

### case-3

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1818 · steps 23 · tokens 535,723
- **摘要**：Namespace train-ticket: 13 DB-dependent services (ts-order-other, ts-payment, ts-price, ts-route, ts-security, ts-station-food, ts-train, ts-travel, ts-travel2, ts-user, ts-wait-order CrashLoopBackOff; ts-station-service and ts-train-food-service 0/1 Running with 4 restarts) across worker-01/02/03 all fail identically at JPA/Hibernate pool init: 'java.sql.SQLNonTransientConnectionException: Too many connections', 'SQL Error: 1040, SQLState: 08004'. Namespace events bind the mechanism to the DB: 'pod/tsdb-mysql-0 Readiness probe failed: ERROR 1040 (HY000): Too many connections' and the same for

### case-4

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 517,218
- **摘要**：Namespace train-ticket shows a cluster-wide reachability break, not a node/app-local one: 13 business pods (ts-price, ts-route, ts-security, ts-station, ts-station-food, ts-train, ts-train-food, ts-travel, ts-travel2, ts-user, ts-wait-order, ts-order-other, ts-payment) are in CrashLoopBackOff spread across worker-01/02/03, with no FailedScheduling/FailedCreate/FailedMount/image-pull events. Caller-side logs (ts-price-service, ts-user-service) show HikariPool-1 pool initialization failing with java.sql.SQLNonTransientConnectionException 'Too many connections' (SQL Error 1040, SQLState 08004), w

### case-5

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.1429 · steps 36 · tokens 800,099
- **摘要**：Shared DB tsdb-mysql is up and TCP-reachable (tsdb-mysql-leader endpoint 172.20.3.55:3306 on leader pod tsdb-mysql-2; connectivity test from all three nodes: 'open / Connection Succeeded'), but it refuses new sessions: its own log is 337/1470 lines (23%) of '[Warning] Too many connections' and its readiness probe fails with 'ERROR 1040 (HY000): Too many connections'. Consequently 10 deployments (ts-route/ts-security/ts-station/ts-station-food/ts-train/ts-train-food/ts-travel/ts-travel2/ts-user/ts-wait-order-service) are 0/1 AVAILABLE with pods Error/CrashLoopBackOff (3 restarts, BackOff events

### case-6

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3182 · steps 23 · tokens 477,041
- **摘要**：Namespace train-ticket: alerts show 52x 500 on POST /api/v1/inside_pay_service/inside_payment (ts-inside-payment-service) and 9x 500 on POST /api/v1/preserveservice/preserve (ts-preserve-service). Caller logs trace the failures one hop down: ts-inside-payment-service -> 'HttpServerErrorException: 500 ... path:/api/v1/paymentservice/payment' (65x) and ts-preserve-service -> '500 ... path:/api/v1/orderservice/order' (9x). The downstream writer services themselves carry the decisive mechanism: ts-payment-service and ts-order-service both log 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server 

