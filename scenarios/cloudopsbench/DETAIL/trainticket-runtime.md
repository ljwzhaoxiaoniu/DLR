# 评测明细 · train-ticket/runtime — cloudopsbench

> 本家族已跑 **16/96** 题：JRA ✅16 ❌0 ｜ 证据链全闭 16 ｜ token 中位 521,337 ｜ 生成 2026-10-13T14:13:38.900Z
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
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.381 | 22 | 521,337 | 0 | 0 | 1013_1235_inorder4-v3b12 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 37 | 631,353 | 0 | 0 | 1013_1343_inorder4-v3b14 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4074 | 28 | 644,230 | 0 | 0 | 1013_1503_inorder4-v3b16 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3913 | 24 | 409,060 | 0.0435 | 0 | 1013_1524_inorder4-v3b18 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 23 | 347,660 | 0 | 0 | 1013_1541_inorder4-v3b20 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 22 | 554,907 | 0 | 0 | 1013_1628_inorder4-v3b22 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2759 | 30 | 476,723 | 0 | 0 | 1013_1656_inorder4-v3b25 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3684 | 39 | 875,225 | 0 | 0 | 1013_1810_inorder4-v3b27 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2692 | 27 | 490,757 | 0 | 0 | 1013_1834_inorder4-v3b30 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1538 | 14 | 260,976 | 0 | 1 | 1013_1845_triple-verify1 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 26 · tokens 265,656
- **raw 日志**：[results/1012_1512_inorder4-v3b3/raw/1012_1514_trainticket-runtime-1](../results/1012_1512_inorder4-v3b3/raw/1012_1514_trainticket-runtime-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Widespread availability disruption: 14 train-ticket services (ts-notification/order-other/payment/price/route/security/station/station-food/train/train-food/travel/travel2/user/wait-order-service) are 0/1 READY in CrashLoopBackOff (RESTARTS 10) spread evenly across worker-01/02/03, with no scheduling events (PodScheduled True, no FailedScheduling/FailedCreate). Pod logs close the mechanism at the shared downstream: 'java.sql.SQLNonTransientConnectionException: Too many connections' / 'SQL Error: 1040, SQLState: 08004' when building the Hibernate SessionFactory ('Unable to open JDBC Connection 

### case-2

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1944 · steps 37 · tokens 554,007
- **raw 日志**：[results/1012_1846_inorder4-v3b4/raw/1012_1850_trainticket-runtime-2](../results/1012_1846_inorder4-v3b4/raw/1012_1850_trainticket-runtime-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：13/40 train-ticket Deployments show 0/1 AVAILABLE and their pods are CrashLoopBackOff (RESTARTS=5, exit code 1) spread across worker-01/02/03; CheckServiceConnectivity to ts-user-service:12342 and ts-price-service:16579 fails from all three nodes ('Connection Failed'). Client container logs show 'HikariPool-1 - Exception during pool initialization ... java.sql.SQLNonTransientConnectionException: Too many connections' (SQL Error: 1040, SQLState: 08004) -> 'Unable to open JDBC Connection for DDL execution' -> 'Application run failed'. Server-side closure: tsdb-mysql error log contains 484 occurr

### case-3

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1818 · steps 23 · tokens 535,723
- **raw 日志**：[results/1012_1923_l1l2-verify2/raw/1012_1923_trainticket-runtime-3](../results/1012_1923_l1l2-verify2/raw/1012_1923_trainticket-runtime-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket: 13 DB-dependent services (ts-order-other, ts-payment, ts-price, ts-route, ts-security, ts-station-food, ts-train, ts-travel, ts-travel2, ts-user, ts-wait-order CrashLoopBackOff; ts-station-service and ts-train-food-service 0/1 Running with 4 restarts) across worker-01/02/03 all fail identically at JPA/Hibernate pool init: 'java.sql.SQLNonTransientConnectionException: Too many connections', 'SQL Error: 1040, SQLState: 08004'. Namespace events bind the mechanism to the DB: 'pod/tsdb-mysql-0 Readiness probe failed: ERROR 1040 (HY000): Too many connections' and the same for

### case-4

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 517,218
- **raw 日志**：[results/1012_1935_tidy-verify1/raw/1012_1937_trainticket-runtime-4](../results/1012_1935_tidy-verify1/raw/1012_1937_trainticket-runtime-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket shows a cluster-wide reachability break, not a node/app-local one: 13 business pods (ts-price, ts-route, ts-security, ts-station, ts-station-food, ts-train, ts-train-food, ts-travel, ts-travel2, ts-user, ts-wait-order, ts-order-other, ts-payment) are in CrashLoopBackOff spread across worker-01/02/03, with no FailedScheduling/FailedCreate/FailedMount/image-pull events. Caller-side logs (ts-price-service, ts-user-service) show HikariPool-1 pool initialization failing with java.sql.SQLNonTransientConnectionException 'Too many connections' (SQL Error 1040, SQLState 08004), w

### case-5

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.1429 · steps 36 · tokens 800,099
- **raw 日志**：[results/1012_2000_case-verify1/raw/1012_2004_trainticket-runtime-5](../results/1012_2000_case-verify1/raw/1012_2004_trainticket-runtime-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Shared DB tsdb-mysql is up and TCP-reachable (tsdb-mysql-leader endpoint 172.20.3.55:3306 on leader pod tsdb-mysql-2; connectivity test from all three nodes: 'open / Connection Succeeded'), but it refuses new sessions: its own log is 337/1470 lines (23%) of '[Warning] Too many connections' and its readiness probe fails with 'ERROR 1040 (HY000): Too many connections'. Consequently 10 deployments (ts-route/ts-security/ts-station/ts-station-food/ts-train/ts-train-food/ts-travel/ts-travel2/ts-user/ts-wait-order-service) are 0/1 AVAILABLE with pods Error/CrashLoopBackOff (3 restarts, BackOff events

### case-6

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3182 · steps 23 · tokens 477,041
- **raw 日志**：[results/1013_1134_inorder4-v3b10/raw/1013_1137_trainticket-runtime-6](../results/1013_1134_inorder4-v3b10/raw/1013_1137_trainticket-runtime-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket: alerts show 52x 500 on POST /api/v1/inside_pay_service/inside_payment (ts-inside-payment-service) and 9x 500 on POST /api/v1/preserveservice/preserve (ts-preserve-service). Caller logs trace the failures one hop down: ts-inside-payment-service -> 'HttpServerErrorException: 500 ... path:/api/v1/paymentservice/payment' (65x) and ts-preserve-service -> '500 ... path:/api/v1/orderservice/order' (9x). The downstream writer services themselves carry the decisive mechanism: ts-payment-service and ts-order-service both log 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server 

### case-7

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.381 · steps 22 · tokens 521,337
- **raw 日志**：[results/1013_1235_inorder4-v3b12/raw/1013_1237_trainticket-runtime-7](../results/1013_1235_inorder4-v3b12/raw/1013_1237_trainticket-runtime-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are 1/1 Running with zero restarts, so the break is not probe/scheduling/startup. Caller-side logs pin the mechanism: ts-payment-service and ts-order-service both emit 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server is running with the --read-only option so it cannot execute this statement' (68 and 54 occurrences), then throw JpaSystemException 'could not execute statement' and return HTTP 500. These 500s propagate upward exactly along the reported alerts: ts-inside-payment-service -> /api/v1/paymentservice/payment (54x 'Process payment' 500) and ts-preserve-servic

### case-8

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 37 · tokens 631,353
- **raw 日志**：[results/1013_1343_inorder4-v3b14/raw/1013_1344_trainticket-runtime-8](../results/1013_1343_inorder4-v3b14/raw/1013_1344_trainticket-runtime-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alerts point to ts-inside-payment-service ('Process payment') and ts-preserve-service ('Create ticket order') returning HTTPError 500; their caller logs show downstream 500s from /api/v1/paymentservice/payment (ts-payment-service) and /api/v1/orderservice/order (ts-order-service) plus 'getTickets failed'. Object layer is clean: all 51 pods 1/1 Running, no Pending/CrashLoop/ImagePull/Mount anomalies, and no FailedCreate/FailedScheduling/FailedMount events in the namespace. The break is at the statement level: ts-payment-service (68x) and ts-order-service (52x) both log 'SQL Error:

### case-9

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4074 · steps 28 · tokens 644,230
- **raw 日志**：[results/1013_1503_inorder4-v3b16/raw/1013_1505_trainticket-runtime-9](../results/1013_1503_inorder4-v3b16/raw/1013_1505_trainticket-runtime-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 51 pods are Running/Ready with no Pending/FailedCreate/FailedMount/image-pull outlier, excluding scheduling, admission, image and probe faults; the break is in the data layer. Alerts show HTTP 500 on POST /api/v1/inside_pay_service/inside_payment (ts-inside-payment-service, 53x) and /api/v1/preserveservice/preserve (ts-preserve-service, 14x). Caller logs show downstream 500s: ts-inside-payment-service -> /api/v1/paymentservice/payment 500, ts-preserve-service -> /api/v1/orderservice/order 500. The named downstream services' own logs carry the mechanism verbatim: ts-payment-service (66x) an

### case-10

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3913 · steps 24 · tokens 409,060
- **raw 日志**：[results/1013_1524_inorder4-v3b18/raw/1013_1525_trainticket-runtime-10](../results/1013_1524_inorder4-v3b18/raw/1013_1525_trainticket-runtime-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are 1/1 Running with 0 restarts (no scheduling/startup/probe breakpoint). Alerts point to 500s on ts-inside-payment-service (/api/v1/paymentservice/payment) and ts-preserve-service (/api/v1/orderservice/order). Downstream logs name the mechanism verbatim: ts-payment-service and ts-order-service both log 'o.h.engine.jdbc.spi.SqlExceptionHelper: SQL Error: 1290, SQLState: HY000' and 'The MySQL server is running with the --read-only option so it cannot execute this statement', then 'JpaSystemException: could not execute statement' -> HTTP 500. The write path is pinned by con

### case-11

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 23 · tokens 347,660
- **raw 日志**：[results/1013_1541_inorder4-v3b20/raw/1013_1543_trainticket-runtime-11](../results/1013_1541_inorder4-v3b20/raw/1013_1543_trainticket-runtime-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：All pods are 1/1 Running with no Pending/crash/probe outliers, ruling out scheduling/startup/probe breaks. The reachability chain breaks on the DB write path: ts-payment-service logs 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server is running with the --read-only option so it cannot execute this statement' (62x, then JpaSystemException 'could not execute statement'), and ts-order-service logs the identical read-only rejection (44x) — two independent writers, each with its own Secret both pointing at tsdb-mysql-leader:3306, are rejected by the same server, so the break is not service-loca

### case-12

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 22 · tokens 554,907
- **raw 日志**：[results/1013_1628_inorder4-v3b22/raw/1013_1630_trainticket-runtime-12](../results/1013_1628_inorder4-v3b22/raw/1013_1630_trainticket-runtime-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show HTTP 500 on 'Process payment' (ts-inside-payment-service) and 'Create ticket order' (ts-preserve-service). Caller logs pin the downstream targets: ts-preserve-service -> ts-order-service /api/v1/orderservice/order 500, ts-inside-payment-service -> ts-payment-service /api/v1/paymentservice/payment 500. Those target pods are 1/1 Running, 0 restarts, probes passing, but their own error logs show 'SQL Error: 1290, SQLState: HY000' / 'The MySQL server is running with the --read-only option so it cannot execute this statement' (52x and 67x) followed by JpaSystemException could not execut

### case-13

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2759 · steps 30 · tokens 476,723
- **raw 日志**：[results/1013_1656_inorder4-v3b25/raw/1013_1657_trainticket-runtime-13](../results/1013_1656_inorder4-v3b25/raw/1013_1657_trainticket-runtime-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are Running/Ready with 0 restarts (no scheduling/startup/probe break), and TCP connectivity to tsdb-mysql-leader:3306 succeeds from every worker. The break is at the persistence layer: two independent services report SQL Error 1290 / SQLState HY000 'The MySQL server is running with the --read-only option so it cannot execute this statement' (ts-payment-service 68x, ts-order-service 56x), surfacing as JpaSystemException/GenericJDBCException -> HTTP 500 cascading to ts-inside-payment-service (54x 'Process payment') and ts-preserve-service (12x 'Create ticket order'). Servic

### case-14

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3684 · steps 39 · tokens 875,225
- **raw 日志**：[results/1013_1810_inorder4-v3b27/raw/1013_1815_trainticket-runtime-14](../results/1013_1810_inorder4-v3b27/raw/1013_1815_trainticket-runtime-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 43 deployments are 1/1 AVAILABLE, all pods Running/Ready with bound Service endpoints, and all 4 nodes Ready with no cordon/taints; namespace events show no FailedScheduling/FailedCreate/FailedMount/image-pull/probe warnings, ruling out scheduling, admission, image, probe and addressing faults. The break is at the database write path: ts-payment-service logs 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server is running with the --read-only option so it cannot execute this statement' (69x) leading to JpaSystemException -> HTTP 500, and ts-order-service logs the identical 1290/--read-onl

### case-15

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2692 · steps 27 · tokens 490,757
- **raw 日志**：[results/1013_1834_inorder4-v3b30/raw/1013_1836_trainticket-runtime-15](../results/1013_1834_inorder4-v3b30/raw/1013_1836_trainticket-runtime-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are Running and 1/1 ready (no restarts, no Pending/FailedScheduling/FailedCreate/FailedMount/image-pull events), and tsdb-mysql-leader:3306 is TCP-open from worker-01/02/03, so the break is not scheduling, networking, DNS, Service-selector or port mapping. The alerts (Process payment / Create ticket order, 500) are only pointers; the caller-side logs descend one leaf: ts-payment-service logs 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server is running with the --read-only option so it cannot execute this statement' (67x) and ts-order-service logs the identical 1290/r

### case-16

- **结论**：`app/ts-assurance-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-assurance-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1538 · steps 14 · tokens 260,976
- **raw 日志**：[results/1013_1845_triple-verify1/raw/1013_1846_trainticket-runtime-16](../results/1013_1845_triple-verify1/raw/1013_1846_trainticket-runtime-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: GET /api/v1/assuranceservice/assurances/types -> 'HTTPError(503 Server Error: Service Unavailable)' on entry service ts-assurance-service. Inventory: no ts-assurance-service pod exists while every other train-ticket workload is 2/2 Running with 0 restarts. Victim signal: endpoints/ts-assurance-service = <none>, and caller-side ts-gateway-service logs repeat 'No servers available for service: ts-assurance-service'. Workload break: Deployment ts-assurance-service spec.replicas=0 (generation 2) although its stored last-applied config and GetAppYAML specify replicas=1. Mechanism event: 'Sca

