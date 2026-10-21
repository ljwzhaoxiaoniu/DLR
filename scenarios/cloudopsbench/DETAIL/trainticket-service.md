# 评测明细 · train-ticket/service — cloudopsbench

> 本家族已跑 **37/37** 题：JRA ✅37 ❌0 ｜ 证据链全闭 36 ｜ token 中位 508,361 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 341,610 | 0 | 0 | 1020_2002_tsm-v1-b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 341,259 | 0 | 0 | 1020_2323_tsm-v1-b36 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 540,615 | 0 | 0 | 1021_0123_tsm-v1-b69 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 332,608 | 0 | 0 | 1021_0213_tsm-v1-b94 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 337,105 | 0 | 0 | 1021_0218_tsm-v1-b96 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 485,837 | 0 | 0 | 1021_0223_tsm-v1-b99 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 456,072 | 0 | 0 | 1021_0227_tsm-v1-b101 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 361,386 | 0 | 0 | 1021_0233_tsm-v1-b104 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 272,693 | 0 | 0 | 1021_0237_tsm-v1-b106 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 21 | 954,922 | 0 | 0 | 1020_2008_tsm-v1-b6 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 631,401 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 297,176 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 31 | 1,722,412 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 332,905 | 0 | 0 | 1020_2243_tsm-v1-b18 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 320,259 | 0 | 0 | 1020_2249_tsm-v1-b21 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 541,423 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 442,692 | 0 | 0 | 1020_2304_tsm-v1-b27 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 339,844 | 0 | 0 | 1020_2311_tsm-v1-b30 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 324,697 | 0 | 0 | 1020_2317_tsm-v1-b33 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 756,118 | 0 | 0 | 1020_2329_tsm-v1-b39 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 612,023 | 0 | 0 | 1020_2334_tsm-v1-b42 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.35 | 21 | 477,194 | 0 | 0 | 1020_2340_tsm-v1-b45 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2917 | 25 | 653,936 | 0 | 0 | 1020_2346_tsm-v1-b48 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 548,778 | 0 | 0 | 1020_2353_tsm-v1-b51 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 608,519 | 0 | 0 | 1020_2359_tsm-v1-b54 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 746,860 | 0 | 0 | 1021_0056_tsm-v1-b57 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2381 | 22 | 490,230 | 0 | 0 | 1021_0103_tsm-v1-b60 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 0.75 | 0.25 | 0 | 0.2353 | 18 | 425,928 | 0 | 0 | 1021_0109_tsm-v1-b63 | 结果对·链未闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 610,376 | 0 | 0 | 1021_0117_tsm-v1-b66 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 551,879 | 0 | 0 | 1021_0129_tsm-v1-b72 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 655,349 | 0 | 0 | 1021_0136_tsm-v1-b75 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1818 | 23 | 592,231 | 0 | 0 | 1021_0142_tsm-v1-b78 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2609 | 24 | 508,361 | 0 | 0 | 1021_0146_tsm-v1-b80 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 759,258 | 0 | 0 | 1021_0152_tsm-v1-b83 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 505,808 | 0 | 0 | 1021_0158_tsm-v1-b86 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 520,435 | 0 | 0 | 1021_0203_tsm-v1-b89 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2632 | 20 | 517,463 | 0 | 0 | 1021_0207_tsm-v1-b91 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 341,610
- **raw 日志**：[results/1020_2002_tsm-v1-b3/raw/1020_2002_trainticket-service-1](../results/1020_2002_tsm-v1-b3/raw/1020_2002_trainticket-service-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alert on POST /api/v1/orderservice/order/refresh returns HTTPError('404 Client Error: Not Found') (20 occurrences, 'Refresh order list'/'Refresh orders for cancel'), i.e. the order business path is partially unreachable at HTTP level. Object layer for the named victim: ts-order-service pod is 2/2 Running with 0 restarts, its Service declares port 12031 -> targetPort 12031 with selector app=ts-order-service, endpoints 172.20.3.129:12031 exist, and an active TCP probe on the Service-declared port 12031 from worker-01/02/03 all report 'open / Connection Succeeded'; GetErrorLogs(ts-o

### case-2

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 341,259
- **raw 日志**：[results/1020_2323_tsm-v1-b36/raw/1020_2323_trainticket-service-2](../results/1020_2323_tsm-v1-b36/raw/1020_2323_trainticket-service-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.' matched L3 exact. Complaint side clean: GetErrorLogs on ts-ui-dashboard and ts-gateway-service returned no error logs, and CheckServiceConnectivity to ts-gateway-service:18888 succeeded from worker-01/02/03. Pod inventory all Running/Ready (only ts-ui-dashboard shows RESTARTS 3, consistent with rolling recreation). Services inventory divergence: ts-food-delivery-service and ts-wait-order-service return NotFound from DescribeResource, but GetResources(resourcequotas, namespace=train-ticket) returns 'No resources found', so the quota branch is excluded a

### case-3

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 540,615
- **raw 日志**：[results/1021_0123_tsm-v1-b69/raw/1021_0123_trainticket-service-3](../results/1021_0123_tsm-v1-b69/raw/1021_0123_trainticket-service-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods read healthy (2/2 Running; only outlier ts-ui-dashboard RESTARTS 3), GetAlerts returns clean, and no ResourceQuota exists in the namespace (quota branch excluded; the absent Services ts-food-delivery-service and ts-wait-order-service are background). ts-order-service itself is healthy and reachable on its Service-declared port 12031 (GetResources services shows 10.68.138.137:12031; CheckServiceConnectivity returns 'Connection Succeeded' from worker-01/02/03). Yet requests to the order path never reach it: auditing the ts-gateway-service-config route table in GetAppYAML(ts

### case-4

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 332,608
- **raw 日志**：[results/1021_0213_tsm-v1-b94/raw/1021_0213_trainticket-service-4](../results/1021_0213_tsm-v1-b94/raw/1021_0213_trainticket-service-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 47 workloads are 2/2 Running with no Pending/ImagePullBackOff/CrashLoop, and the namespace events surface shows only rolling-update churn (Killing / Scheduled / SuccessfulCreate) plus probe-503 rows - no FailedCreate, FailedScheduling or FailedMount. Error logs for ts-order-service, ts-gateway-service and ts-price-service are empty, which excludes crash/startup/log-level defects. The signal side is the alert pointer: POST /api/v1/orderservice/order/refresh returns HTTPError('404 Client Error: Not Found') x20 for both 'Refresh order list' and 'Refresh orders for cancel' (entry_service ts-or

### case-5

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 337,105
- **raw 日志**：[results/1021_0218_tsm-v1-b96/raw/1021_0218_trainticket-service-5](../results/1021_0218_tsm-v1-b96/raw/1021_0218_trainticket-service-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：All pods healthy (2/2 Running; only ts-ui-dashboard shows 3 restarts). GetAlerts: entry ts-preserve-service, POST /api/v1/preserveservice/preserve -> HTTPError('404 Client Error: Not Found') x20. GetErrorLogs on ts-preserve-service and ts-gateway-service: no error logs. CheckServiceConnectivity ts-preserve-service:14568 from worker-01/02/03: 'open / Connection Succeeded' (backend healthy). No ResourceQuota object in train-ticket, so the quota branch is excluded; the Services absent from the listing (ts-food-delivery-service, ts-wait-order-service) are background. Namespace events contain only 

### case-6

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 485,837
- **raw 日志**：[results/1021_0223_tsm-v1-b99/raw/1021_0223_trainticket-service-6](../results/1021_0223_tsm-v1-b99/raw/1021_0223_trainticket-service-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket workloads are healthy (Running, 2/2 or 4/4 READY, no Pending/ImagePull/FailedMount) and no ResourceQuota object exists (quota branch excluded). The alert is POST /api/v1/preserveservice/preserve -> HTTPError('404 Client Error: Not Found') x20, and 404 rather than 5xx points at the address layer. CheckServiceConnectivity(ts-preserve-service,14568) succeeded from worker-01/02/03 (port taken from the Service spec), and GetErrorLogs(ts-preserve-service) is empty, so no request ever reached it. The break is in the gateway route table (ConfigMap ts-gateway-service-config): route id=

### case-7

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 456,072
- **raw 日志**：[results/1021_0227_tsm-v1-b101/raw/1021_0228_trainticket-service-7](../results/1021_0227_tsm-v1-b101/raw/1021_0228_trainticket-service-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: POST /api/v1/preserveservice/preserve -> HTTPError('404 Client Error: Not Found') x20. All 45 workloads report Running 2/2 with 0 restarts (ts-preserve-service healthy, its log shows 'Tomcat started on port(s): 14568' and 'nacos registry ... ts-preserve-service 172.20.2.204:14568 register finished'); GetErrorLogs on ts-preserve-service and ts-gateway-service returned no error entries. Direct probes from all three nodes succeeded (ts-preserve-service 10.68.28.164:14568 open, ts-route-service 10.68.77.199:11178 open), so every object is healthy yet the entry call diverges - an address-lay

### case-8

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 361,386
- **raw 日志**：[results/1021_0233_tsm-v1-b104/raw/1021_0233_trainticket-service-8](../results/1021_0233_tsm-v1-b104/raw/1021_0233_trainticket-service-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: GetAlerts shows 13x POST /api/v1/preserveservice/preserve -> HTTPError('404 Client Error: Not Found') with entry ts-preserve-service; GetErrorLogs(ts-preserve-service) is empty and CheckServiceConnectivity(ts-preserve-service:14568) reports 'open / Connection Succeeded' from worker-01/02/03, so the target service itself is healthy and reachable. Object layer: all pods are 2/2 Running with no READY/RESTARTS outlier; GetResources(resourcequotas) returns 'No resources found in train-ticket namespace', excluding the quota branch, and the only missing objects are the Service entries ts

### case-9

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 272,693
- **raw 日志**：[results/1021_0237_tsm-v1-b106/raw/1021_0238_trainticket-service-9](../results/1021_0237_tsm-v1-b106/raw/1021_0238_trainticket-service-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: GetAlerts shows entry_service ts-preserve-service POST /api/v1/preserveservice/preserve failing with HTTPError('404 Client Error: Not Found') x13. ts-preserve-service is healthy and reachable: CheckServiceConnectivity(ts-preserve-service,14568, declared Service port) returned 'Connection Succeeded' from worker-01/02/03, GetErrorLogs(ts-preserve-service) has no errors, and its pod is 2/2 Running - so the request never reached it. Quota branch excluded: GetResources(resourcequotas) returned 'No resources found' (no ResourceQuota object at all); the only absent Service, ts-food-deli

### case-10

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 21 · tokens 954,922
- **raw 日志**：[results/1020_2008_tsm-v1-b6/raw/1020_2008_trainticket-service-10](../results/1020_2008_tsm-v1-b6/raw/1020_2008_trainticket-service-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：All workloads read healthy (every ts-* pod 2/2 Running, no Pending/CrashLoopBackOff/ImagePullBackOff; Service objects all present) and no ResourceQuota exists in the namespace ('No resources found'), so pod-level and quota causes are excluded. The break is on the address layer inside the gateway's own config: in ConfigMap ts-gateway-service-config, the route entry 'id: route' with predicate Path=/api/v1/routeservice/** is wired to uri lb://${PRICE_SERVICE_HOST:ts-price-service} instead of ROUTE_SERVICE_HOST:ts-route-service, so every /api/v1/routeservice/** request is sent to the price service

### case-11

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 631,401
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1020_2049_trainticket-service-11](../results/1021_0900_tsm-v1-fix/raw/1020_2049_trainticket-service-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：All workloads healthy: pods listing shows every ts-* pod Running with READY 2/2, no Pending/CrashLoop/image-pull/PVC events; namespace events are all Normal scheduling/probe transitions and GetResources(resourcequotas) returned 'No resources found', which excludes the quota branch (the two Service objects absent from the listing - ts-food-delivery-service and ts-wait-order-service - are background, not the victim named by the complaint). Symptom side: alert on entry_service ts-inside-payment-service plus its error log 'HttpServerErrorException$InternalServerError: 500 Internal Server Error ...

### case-12

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 297,176
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1020_2050_trainticket-service-12](../results/1021_0900_tsm-v1-fix/raw/1020_2050_trainticket-service-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 47 pods in train-ticket are Running and Ready (2/2) - no Pending, no ImagePullBackOff, no CrashLoopBackOff; namespace events contain no FailedScheduling/FailedCreate/FailedMount, so the workload layer is healthy. No ResourceQuota object exists (GetResources resourcequotas -> 'No resources found in train-ticket namespace'), so the quota branch is excluded; ts-food-delivery-service and ts-wait-order-service are absent from the Services listing while their pods run, but the target of the failing call (ts-payment-service) exists, so those missing Services are background. Reading the gateway's 

### case-13

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 31 · tokens 1,722,412
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1020_2049_trainticket-service-13](../results/1021_0900_tsm-v1-fix/raw/1020_2049_trainticket-service-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：All pods are 2/2 Running (only ts-ui-dashboard restarted, 3x, on a transient nginx startup error) so no workload is broken; direct-connect probes succeed to both ts-route-service:11178 and ts-user-service:12342 on worker-01/02/03, so objects and endpoints are healthy while addresses diverge. The address layer is the break: in ts-gateway-service-config the route with id 'route' declares Path=/api/v1/routeservice/** but its uri is lb://${USER_SERVICE_HOST:ts-user-service}, a target naming a different service than the Path denotes, so /api/v1/routeservice/** is delivered to ts-user-service and ts

### case-14

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 332,905
- **raw 日志**：[results/1020_2243_tsm-v1-b18/raw/1020_2243_trainticket-service-14](../results/1020_2243_tsm-v1-b18/raw/1020_2243_trainticket-service-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side entry: alert names ts-inside-payment-service POST /api/v1/inside_pay_service/inside_payment -> 500. Its error log shows HttpServerErrorException 500 on path /api/v1/paymentservice/payment, so the failure originates downstream. One hop down, ts-payment-service is a leaf (GetServiceDependencies: 'Leaf Node - No downstream calls') yet raises IncorrectResultSizeDataAccessException: query did not return a unique result: 5 - an exception trail, not a mechanism. Object layer is fully healthy: pods listing shows all train-ticket workloads Running (ts-route-service, ts-user-service, ts-gat

### case-15

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 320,259
- **raw 日志**：[results/1020_2249_tsm-v1-b21/raw/1020_2249_trainticket-service-15](../results/1020_2249_tsm-v1-b21/raw/1020_2249_trainticket-service-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts recorded 20x 'HTTPError(404 Client Error: Not Found)' for POST /api/v1/travelservice/trips/left. All pods were 2/2 Running with no Pending/CrashLoop outliers, so the object layer was healthy. Auditing the gateway's own manifest (GetAppYAML ts-gateway-service, ConfigMap ts-gateway-service-config) line by line showed exactly one route whose Path does not match its uri target: '- id: travel / uri: lb://${USER_SERVICE_HOST:ts-user-service} / Path=/api/v1/travelservice/**' (it duplicates the 'user' route's target instead of TRAVEL_SERVICE_HOST:ts-travel-service). Traffic for the travel path 

### case-16

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 541,423
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0013_trainticket-service-16](../results/1021_0900_tsm-v1-fix/raw/1021_0013_trainticket-service-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 51 pods in namespace train-ticket are Running/Ready (2/2, 3/3, 4/4) with no Pending/CrashLoop/image-pull and no Warning event tying any workload to a scheduling, mount or quota failure, so workload/config-quota/DNS branches are excluded. Signal side: GetAlerts reports 'Search ticket' POST /api/v1/travelservice/trips/left returning HTTPError('404 Client Error: Not Found') 19 times. Auditing the gateway's own manifest (GetAppYAML(ts-gateway-service), ConfigMap ts-gateway-service-config) route table line by line exposes the break: route id 'travel' has predicate Path=/api/v1/travelservice/** 

### case-17

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 442,692
- **raw 日志**：[results/1020_2304_tsm-v1-b27/raw/1020_2304_trainticket-service-17](../results/1020_2304_tsm-v1-b27/raw/1020_2304_trainticket-service-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: Search ticket POST /api/v1/travelservice/trips/left -> 404 Not Found (20x) on entry service ts-travel-service. Object layer is healthy: pod ts-travel-service-5b9b99c879-kbm48 is 2/2 Running with 0 restarts, Service ts-travel-service (ClusterIP 10.68.18.40:12346) exists, and CheckServiceConnectivity on the Service's own declared port 12346 succeeded from worker-01/02/03; GetErrorLogs(ts-travel-service) shows only business-level 'Trip already exists' errors, no connection failures. GetServiceDependencies(ts-travel-service) lists ts-gateway-service as an upstream. Decisive evidence is the 

### case-18

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 339,844
- **raw 日志**：[results/1020_2311_tsm-v1-b30/raw/1020_2311_trainticket-service-18](../results/1020_2311_tsm-v1-b30/raw/1020_2311_trainticket-service-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 48 train-ticket workload pods are 2/2 Running; pod listing shows no CrashLoopBackOff/Pending/ImagePullBackOff, and the namespace events surface contains only Normal 'Killing' rows from a rolling restart plus transient istio probe failures - no FailedCreate / FailedScheduling / FailedMount / image-pull warnings, so no creation or capacity breakpoint exists. GetResources(resourcequotas) returns 'No resources found in train-ticket namespace', which excludes the quota branch entirely, and the two Services absent from the services listing (ts-food-delivery-service, ts-wait-order-service) have r

### case-19

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 324,697
- **raw 日志**：[results/1020_2317_tsm-v1-b33/raw/1020_2317_trainticket-service-19](../results/1020_2317_tsm-v1-b33/raw/1020_2317_trainticket-service-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: POST /api/v1/travelservice/trips/left returned 503 Service Unavailable (entry_service ts-travel-service, 10 occurrences). Object layer was healthy: all train-ticket pods Running 2/2 (only ts-ui-dashboard showed restart noise), and CheckServiceConnectivity to ts-travel-service 10.68.156.18:12346 succeeded from worker-01/02/03; ts-travel-service error log only shows business-level 'Trip already exists'. The break is at the address layer: in ts-gateway-service's own ConfigMap route table, the route id 'travel' declares Path=/api/v1/travelservice/** but targets uri: lb://ts-nonexistent-trav

### case-20

- **结论**：`app/ts-assurance-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-assurance-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 756,118
- **raw 日志**：[results/1020_2329_tsm-v1-b39/raw/1020_2329_trainticket-service-20](../results/1020_2329_tsm-v1-b39/raw/1020_2329_trainticket-service-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only ts-assurance-service is unhealthy: pod ts-assurance-service-7d97f6cf77-xw4dz is 0/2 CrashLoopBackOff (4 restarts, last termination Reason=Error ExitCode=1); all other train-ticket services (including ts-order-service, which uses the same tsdb-mysql-leader host) are 2/2 Running. Alert pointer: GET /api/v1/assuranceservice/assurances/types -> HTTPError('503 Server Error: Service Unavailable'). Connectivity probe on the port the Service declares (18888) fails from worker-01/02/03 (Connection Failed). First-level error log: 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure 

### case-21

- **结论**：`app/ts-basic-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-basic-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 612,023
- **raw 日志**：[results/1020_2334_tsm-v1-b42/raw/1020_2334_trainticket-service-21](../results/1020_2334_tsm-v1-b42/raw/1020_2334_trainticket-service-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-basic-service is the only outlier pod (0/2 Running, 4 restarts) while all 45 other pods are 2/2 Ready. Service ts-basic-service declares port 15680; a probe of that exact port fails from worker-01/02/03 and endpoints/ts-basic-service is empty. GetErrorLogs shows the app container dying at startup with 'NacosException: Client not connected, current status:STARTING' (register failed, exit code 1), while istio-proxy logs repeat 'dial tcp: lookup istiod.istio-system.svc on 10.255.10.254:53: read udp 172.20.1.7:...->10.255.10.254:53: i/o timeout' and the kubelet reports 'Startup probe failed: Ge

### case-22

- **结论**：`app/ts-cancel-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-cancel-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.35 · steps 21 · tokens 477,194
- **raw 日志**：[results/1020_2340_tsm-v1-b45/raw/1020_2340_trainticket-service-22](../results/1020_2340_tsm-v1-b45/raw/1020_2340_trainticket-service-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-cancel-service-758b476b4d-r56v4 is the only outlier (READY 0/2, RESTARTS 3); Service ts-cancel-service:18885 connectivity fails from worker-01/02/03 and its Endpoints object is empty, while Alerts name entry_service=ts-cancel-service with HTTPError('503 Server Error: Service Unavailable') x34. Pod describe shows the app container Last State 'Terminated, Reason: Error, Exit Code: 1' with Ready=False while the pod itself is Running and PodScheduled=True, and namespace events contain no FailedScheduling/FailedCreate/FailedMount/ImagePull warnings, so scheduling, mount and image are exclude

### case-23

- **结论**：`app/ts-contacts-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-contacts-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2917 · steps 25 · tokens 653,936
- **raw 日志**：[results/1020_2346_tsm-v1-b48/raw/1020_2346_trainticket-service-23](../results/1020_2346_tsm-v1-b48/raw/1020_2346_trainticket-service-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Victim ts-contacts-service is 0/2 Error with 4 restarts (CrashLoopBackOff, last termination exit 1); connectivity probe to its Service-declared port 12347 fails from worker-01/02/03 and its endpoints list is empty, matching alerts of HTTP 503 on /api/v1/contactservice/contacts (20 occurrences). First-level error log shows 'Caused by: java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' -> HikariPool-1 Exception during pool initialization -> Unable to build Hibernate SessionFactory -> container exit; the co-located istio-proxy fails the same way ('lookup istio

### case-24

- **结论**：`app/ts-food-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-food-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 548,778
- **raw 日志**：[results/1020_2353_tsm-v1-b51/raw/1020_2353_trainticket-service-24](../results/1020_2353_tsm-v1-b51/raw/1020_2353_trainticket-service-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Full pod listing shows one outlier: ts-food-service-74f4df4f7-djvnb 0/2 CrashLoopBackOff (Restarts 4), owner chain Deployment/ts-food-service; all other pods (incl. same-node worker-01 ts-order-service, which has zero error logs) are 2/2 Running, so the fault is service-scoped. Complaint side: alert POST /api/v1/preserveservice/preserve 500 from ts-preserve-service, whose dependency graph lists ts-food-service downstream; active TCP probe of ts-food-service:18856 (the port its own Service spec declares, clusterIP 10.68.222.241) fails from worker-01/02/03 -> confirmed partial service unreachabi

### case-25

- **结论**：`app/ts-gateway-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-gateway-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 608,519
- **raw 日志**：[results/1020_2359_tsm-v1-b54/raw/1020_2359_trainticket-service-25](../results/1020_2359_tsm-v1-b54/raw/1020_2359_trainticket-service-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: POST /api/v1/users/login (entry ts-auth-service) returns HTTPError('503 Server Error: Service Unavailable') x30. Connectivity probe on the gateway's declared Service port ts-gateway-service:18888 fails from worker-01/02/03 (Connection Failed). Pods listing has a single outlier: ts-gateway-service-5d577b65bb-4p686 = 0/2 READY, RESTARTS 4, while all other business pods are 2/2 Running. Pod detail: container ts-gateway-service State=Terminated, Reason=Error, Exit Code=1 (not OOMKilled 137, not SIGTERM 143), Last State Error 1, Restart Count 4; Event: Warning Unhealthy 'Startup probe failed

### case-26

- **结论**：`app/ts-inside-payment-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-inside-payment-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 746,860
- **raw 日志**：[results/1021_0056_tsm-v1-b57/raw/1021_0056_trainticket-service-26](../results/1021_0056_tsm-v1-b57/raw/1021_0056_trainticket-service-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: entry_service ts-inside-payment-service POST /api/v1/inside_pay_service/inside_payment -> HTTPError('503 Server Error: Service Unavailable'). Pod listing outlier: ts-inside-payment-service-5ddd559466-pfrhl 0/2 CrashLoopBackOff, RESTARTS 4, last state Terminated Reason=Error ExitCode=1. First-level app log evidence (GetErrorLogs): 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' -> HikariPool-1 Exception during pool initialization -> Failed to initialize JPA EntityManagerFactory -> Application run failed; sidecar logs also show 'lookup istiod.istio

### case-27

- **结论**：`app/ts-order-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-order-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2381 · steps 22 · tokens 490,230
- **raw 日志**：[results/1021_0103_tsm-v1-b60/raw/1021_0103_trainticket-service-27](../results/1021_0103_tsm-v1-b60/raw/1021_0103_trainticket-service-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing outlier: ts-order-service-6cd5889659-v76vn is 0/2 CrashLoopBackOff with 4 restarts, the only unhealthy workload in train-ticket; alerts point to ts-order-service returning 503. Complaint side: CheckServiceConnectivity on ts-order-service's declared Service port 12031 failed from worker-01/02/03. Pod sheet: app container Last State Terminated, Reason: Error, Exit Code: 1 (not OOMKilled), and previous-container logs show 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' -> 'HikariPool-1 - Exception during pool initialization' -> 'Unable to build

### case-28

- **结论**：`app/ts-payment-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-payment-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.25 · ECR 0 · EE 0.2353 · steps 18 · tokens 425,928
- **raw 日志**：[results/1021_0109_tsm-v1-b63/raw/1021_0109_trainticket-service-28](../results/1021_0109_tsm-v1-b63/raw/1021_0109_trainticket-service-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: ts-inside-payment-service error log repeats 'java.lang.IllegalArgumentException: Service Instance cannot be null' on its call edge to ts-payment-service (dependency graph: ts-payment-service is a leaf called by ts-gateway-service and ts-inside-payment-service). Workload: ts-payment-service-dd4c6c46b-qwzxg is the only outlier in the pods listing - 0/2 CrashLoopBackOff, RESTARTS 4, while all 46 other business pods are 2/2 Running; pod detail shows Last State Terminated, Reason Error, Exit Code 1 (not 137 OOMKilled, not 143 SIGTERM), so the app fails at startup. Mechanism (app logs):

### case-29

- **结论**：`app/ts-preserve-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-preserve-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 610,376
- **raw 日志**：[results/1021_0117_tsm-v1-b66/raw/1021_0117_trainticket-service-29](../results/1021_0117_tsm-v1-b66/raw/1021_0117_trainticket-service-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert pointer: POST /api/v1/preserveservice/preserve returning 503, entry_service=ts-preserve-service. Pod listing outlier: ts-preserve-service-6bd658cfc9-gpc6b 0/2 Running with 4 restarts; all 45 other pods 2/2 Running. Pod sheet: app container Last State Terminated, Reason Error, Exit Code 1, Ready False; istio-proxy Ready False with event 'Warning Unhealthy Startup probe failed: Get "http://172.20.2.121:15021/healthz/ready": dial tcp 172.20.2.121:15021: connect: connection refused'. Connectivity probe on the Service-declared port 14568 failed from all three nodes (no ready endpoints). Both 

### case-30

- **结论**：`app/ts-price-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-price-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 551,879
- **raw 日志**：[results/1021_0129_tsm-v1-b72/raw/1021_0129_trainticket-service-30](../results/1021_0129_tsm-v1-b72/raw/1021_0129_trainticket-service-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: ts-preserve-service error logs show repeated 500s, and GetAlerts points at ts-preserve-service / ts-inside-payment-service. Object layer: the only outlier row in the pods listing is ts-price-service-69f6579f8-xv9gc (READY 0/2, STATUS Error, RESTARTS 4) on worker-01; all other pods are 2/2 Running. Pod detail: container ts-price-service is Waiting/CrashLoopBackOff with Last State Terminated, Reason Error, Exit Code 1 (not 137 OOMKilled, not 143 SIGTERM); namespace events for this pod show repeated 'Startup probe failed: Get http://172.20.1.243:15021/healthz/ready: dial tcp: connect

### case-31

- **结论**：`app/ts-route-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-route-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 655,349
- **raw 日志**：[results/1021_0136_tsm-v1-b75/raw/1021_0136_trainticket-service-31](../results/1021_0136_tsm-v1-b75/raw/1021_0136_trainticket-service-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-route-service was the only outlier (pod ts-route-service-6d9b8cb654-wjpjn: 0/2, Error, 4 restarts, CrashLoopBackOff exit code 1) while all other train-ticket pods were 2/2 Running; its Service ts-route-service (port 11178) failed the connectivity probe from worker-01/02/03. Previous container log: 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' causing HikariPool-1 initialization failure, and the istio-proxy sidecar independently logged 'lookup istiod.istio-system.svc on 10.255.11.254:53 ... i/o timeout'. The referenced Service exists (tsdb-mysql-lea

### case-32

- **结论**：`app/ts-seat-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-seat-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1818 · steps 23 · tokens 592,231
- **raw 日志**：[results/1021_0142_tsm-v1-b78/raw/1021_0142_trainticket-service-32](../results/1021_0142_tsm-v1-b78/raw/1021_0142_trainticket-service-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: alerts point to entry services ts-preserve-service (/api/v1/preserveservice/preserve) and ts-inside-payment-service (/api/v1/inside_pay_service/inside_payment) returning 500; their error logs show the real downstream failure: 500 from '/api/v1/travelservice/trip_detail' (ts-travel-service). ts-travel-service error logs repeat 'java.lang.IllegalArgumentException: Service Instance cannot be null', meaning its downstream instance set is empty. Workload scan shows exactly one outlier pod: ts-seat-service-594847b77f-rsbbh 0/2 Running, 4 restarts, node worker-01 (ts-seat-service is a di

### case-33

- **结论**：`app/ts-security-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-security-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2609 · steps 24 · tokens 508,361
- **raw 日志**：[results/1021_0146_tsm-v1-b80/raw/1021_0147_trainticket-service-33](../results/1021_0146_tsm-v1-b80/raw/1021_0147_trainticket-service-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-security-service pod ts-security-service-865558cd4f-g2hs7 is 0/2 Error with 4 restarts (deployment 0/1 AVAILABLE) while all 43 other workloads are Running; Service ts-security-service (port 11188, selector app=ts-security-service) has an EMPTY endpoints object and a declared-port probe fails from worker-01/02/03. Pod was Scheduled normally on worker-01, image already present, no FailedMount/FailedCreate, so scheduling/image/PVC branches are excluded; the app container shows State Terminated, Reason Error, Exit Code 1 (not 137 OOMKilled, not 143 SIGTERM). GetErrorLogs on the app container gi

### case-34

- **结论**：`app/ts-station-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-station-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 759,258
- **raw 日志**：[results/1021_0152_tsm-v1-b83/raw/1021_0153_trainticket-service-34](../results/1021_0152_tsm-v1-b83/raw/1021_0153_trainticket-service-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: ts-basic-service (caller) throws 'Service Instance cannot be null', i.e. no ready instance of ts-station-service; alerts point to 500s on ts-preserve-service and ts-inside-payment-service. Pod inventory has exactly one outlier: ts-station-service-6c9db8cccd-b622n 0/2 CrashLoopBackOff, 4 restarts, node worker-01. Its app log shows 'Caused by: java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' -> HikariPool-1 Exception during pool initialization -> Failed to initialize JPA EntityManagerFactory -> Application run failed; pod detail gives Last Sta

### case-35

- **结论**：`app/ts-train-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-train-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 505,808
- **raw 日志**：[results/1021_0158_tsm-v1-b86/raw/1021_0158_trainticket-service-35](../results/1021_0158_tsm-v1-b86/raw/1021_0158_trainticket-service-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：victim ts-train-service: pod ts-train-service-84dbf9c989-nn5mp is the only outlier (0/2 Error, 4 restarts, CrashLoopBackOff, Last State Terminated Exit Code 1 - not 137/OOMKilled, not 143). Its app container logs 'HikariPool-1 - Exception during pool initialization' caused by 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution', and its istio-proxy reports 'lookup istiod.istio-system.svc on 10.255.12.254:53: read udp ... i/o timeout' - i.e. both containers in the pod fail name resolution. The DNS target is healthy and present: Service tsdb-mysql-leader exist

### case-36

- **结论**：`app/ts-travel-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-travel-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 520,435
- **raw 日志**：[results/1021_0203_tsm-v1-b89/raw/1021_0203_trainticket-service-36](../results/1021_0203_tsm-v1-b89/raw/1021_0203_trainticket-service-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: POST /api/v1/travelservice/trips/left returns 503 (x17). Pod inventory outlier: ts-travel-service-5b5d9f9746-pxbqv 0/2 Error, 4 restarts on worker-02, while all other 45 service pods are 2/2 Running. Connectivity probe to ts-travel-service on its own declared Service port 12346 failed from all three debug pods (no endpoints). Container previous log: 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' -> 'CJCommunicationsException: Communications link failure' -> 'Hibernate SessionFactory' build failure, exit code 1; the pod's istio-proxy simultaneous

### case-37

- **结论**：`app/ts-user-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-user-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2632 · steps 20 · tokens 517,463
- **raw 日志**：[results/1021_0207_tsm-v1-b91/raw/1021_0208_trainticket-service-37](../results/1021_0207_tsm-v1-b91/raw/1021_0208_trainticket-service-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier among 47 pods: ts-user-service-55f7958bd-gvl47 is 0/2 Error with 4 restarts (CrashLoopBackOff, last state Terminated/Reason Error/Exit Code 1). Entry-side signal: ts-preserve-service logs 'java.lang.IllegalArgumentException: Service Instance cannot be null' (no downstream instance) and alerts show 14x HTTP 500 on /api/v1/preserveservice/preserve; ts-user-service is its downstream. First-level log evidence: 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' (HikariPool init failed -> container exit 1), and the same pod's istio-proxy shows 'look

