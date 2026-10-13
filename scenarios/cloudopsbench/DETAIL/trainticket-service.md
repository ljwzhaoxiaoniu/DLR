# 评测明细 · train-ticket/service — cloudopsbench

> 本家族已跑 **16/37** 题：JRA ✅16 ❌0 ｜ 证据链全闭 16 ｜ token 中位 681,352 ｜ 生成 2026-10-13T10:42:30.373Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 681,352 | 0 | 0 | 1012_2010_attr-verify1 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 1,133,738 | 0 | 0 | 1013_1040_rank1-verify1 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 373,034 | 0 | 0 | 1013_1122_inorder4-v3b9 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 23 | 460,035 | 0 | 0 | 1013_1225_inorder4-v3b11 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3478 | 24 | 437,347 | 0 | 0 | 1013_1248_inorder4-v3b13 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 465,479 | 0 | 0 | 1013_1413_inorder4-v3b15 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 364,342 | 0 | 0 | 1013_1520_inorder4-v3b17 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.35 | 21 | 295,786 | 0 | 0 | 1013_1536_inorder4-v3b19 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2609 | 24 | 666,312 | 0 | 0 | 1013_1623_inorder4-v3b21 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2963 | 28 | 707,393 | 0 | 0 | 1013_1640_gatewayyaml-verify1 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2927 | 42 | 2,104,083 | 0 | 0 | 1013_1645_inorder4-v3b24 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2121 | 34 | 2,181,512 | 0 | 0 | 1013_1810_gateway2-verify1 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2414 | 30 | 1,341,232 | 0 | 0 | 1013_1825_dual2-verify1 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 930,757 | 0 | 0 | 1013_1831_inorder4-v3b29 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2273 | 23 | 1,188,029 | 0 | 0 | 1013_1839_inorder4-v3b31 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 23 | 204,578 | 0 | 0 | 1012_1521_l3-tweak1 | 全对·链闭 |

## 证据正文

### case-2

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 681,352
- **raw 日志**：[results/1012_2010_attr-verify1/raw/1012_2010_trainticket-service-2](../results/1012_2010_attr-verify1/raw/1012_2010_trainticket-service-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 47 pods in train-ticket are 2/2 Running with no alert and no scheduling/admission/startup warning events, and the supposed victim is healthy: ts-order-service:12031 answers TCP from worker-01/02/03 (Connection Succeeded), its Service ports/targetPort=12031 and selector app=ts-order-service match its pod. The break is therefore at the address layer: line-by-line audit of the gateway route table (ConfigMap ts-gateway-service-config inside GetAppYAML(ts-gateway-service)) shows route id 'order' with Path=/api/v1/orderservice/** wired to uri 'lb://${ROUTE_SERVICE_HOST:ts-route-service}' - point

### case-3

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 1,133,738
- **raw 日志**：[results/1013_1040_rank1-verify1/raw/1013_1040_trainticket-service-3](../results/1013_1040_rank1-verify1/raw/1013_1040_trainticket-service-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability is partial: ts-ui-dashboard serving other paths 200 (contactservice, travelservice, assuranceservice) while preserveservice returns 499; pods are all 2/2 Running with services/selectors/ports correct, so no workload/node break. The break is in the address layer: the gateway ConfigMap ts-gateway-service-config (application.yml) owns 41 routes and exactly one violates 'each route's Path must point at the service its Path names' - route id 'order' has Path=/api/v1/orderservice/** but uri lb://${TRAVEL_SERVICE_HOST:ts-travel-service}. The nacos ConfigMap contains only NACOS_ADDRS and 

### case-4

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 373,034
- **raw 日志**：[results/1013_1122_inorder4-v3b9/raw/1013_1127_trainticket-service-4](../results/1013_1122_inorder4-v3b9/raw/1013_1127_trainticket-service-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are 2/2 Running with no Pending/CrashLoop/ImagePull failures, and namespace events contain only rollout churn (Killing / 503 readiness / Backoff), so scheduling, admission, image, mount, probe, node and quota surfaces are excluded. Alerts report HTTPError('404 Client Error: Not Found') on POST /api/v1/orderservice/order/refresh (entry_service ts-order-service, 20 occurrences each), and TCP checks succeed to both ts-order-service:12031 and ts-price-service:16579 from worker-01/02/03 - a live backend answering 404 proves an addressing/routing break, not a connectivity break

### case-5

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 23 · tokens 460,035
- **raw 日志**：[results/1013_1225_inorder4-v3b11/raw/1013_1226_trainticket-service-5](../results/1013_1225_inorder4-v3b11/raw/1013_1226_trainticket-service-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom: 'Service Availability Disruption.' Caller-side evidence: ts-ui-dashboard nginx log shows repeated 'POST /api/v1/preserveservice/preserve HTTP/1.1" 404 131' (alert: 20 occurrences, entry_service ts-preserve-service) while all other /api/v1/* calls return 200. Object layer is clean: all pods 2/2 Running except ts-ui-dashboard (3 restarts, caused by a transient nginx 'host not found in upstream ts-gateway-service' during rollout, now Ready), namespace events contain no FailedScheduling/FailedCreate/FailedMount/image-pull; ts-preserve-service has no error logs and CheckServiceConnectivity

### case-6

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3478 · steps 24 · tokens 437,347
- **raw 日志**：[results/1013_1248_inorder4-v3b13/raw/1013_1249_trainticket-service-6](../results/1013_1248_inorder4-v3b13/raw/1013_1249_trainticket-service-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert points at entry_service=ts-preserve-service: POST /api/v1/preserveservice/preserve returns 404 Not Found (20 occurrences). Yet ts-preserve-service is fully healthy: pod 2/2 Running with 0 restarts, endpoints bound at 172.20.3.154:14568, TCP connectivity succeeds from worker-01/02/03, and its error log is empty - so the request never reaches it. The namespace-wide pod scan shows no pending/crash/image-pull/mount anomaly and the events surface carries no Warning naming the preserve chain. The break is in the address layer: in ts-gateway-service-config (ConfigMap of app ts-gateway-service) 

### case-7

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 465,479
- **raw 日志**：[results/1013_1413_inorder4-v3b15/raw/1013_1415_trainticket-service-7](../results/1013_1413_inorder4-v3b15/raw/1013_1415_trainticket-service-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 44 train-ticket pods read 2/2 Running/Ready with no Pending/CrashLoop and ts-preserve-service:14568 is reachable from every node (CheckServiceConnectivity: Connection Succeeded; no error logs), yet the UI-dashboard nginx access log shows 20x "POST /api/v1/preserveservice/preserve HTTP/1.1" 404 while every sibling path (orderservice/order/refresh, inside_pay_service/inside_payment, cancelservice, users/login) returns 200. Line-by-line audit of the gateway route table (configmap ts-gateway-service-config, AGE 5m55s vs 9d for all other configmaps) shows exactly one mis-paired entry: id=preser

### case-8

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 364,342
- **raw 日志**：[results/1013_1520_inorder4-v3b17/raw/1013_1523_trainticket-service-8](../results/1013_1520_inorder4-v3b17/raw/1013_1523_trainticket-service-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-ui-dashboard (nginx, fronting ts-gateway-service) logs POST /api/v1/preserveservice/preserve -> 404 (13 occurrences, alert entry_service=ts-preserve-service) while every sibling path at the same timestamps returns 200 (cancel/login/travelservice/assuranceservice), i.e. only the preserve path is unreachable. The target itself is healthy: ts-preserve-service pod 2/2 Running, Nacos 'register finished', CheckServiceConnectivity(ts-preserve-service:14568) succeeded from worker-01/02/03, and its container log shows startup only — it never receives any preserve request. The break is the address la

### case-9

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.35 · steps 21 · tokens 295,786
- **raw 日志**：[results/1013_1536_inorder4-v3b19/raw/1013_1537_trainticket-service-9](../results/1013_1536_inorder4-v3b19/raw/1013_1537_trainticket-service-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP reachability chain. Symptom side: GetAlerts shows POST /api/v1/preserveservice/preserve -> HTTPError('404 Client Error: Not Found') x13 against ts-preserve-service, while GetErrorLogs(ts-preserve-service) returns 'No error logs found' (traffic never reaches it). Object layer healthy: all pods 2/2 Running with no Pending/FailedCreate/FailedScheduling/image-pull errors, deployments ts-preserve-service and ts-gateway-service both 1/1 AVAILABLE (up-to-date 1, available 1), and endpoints ts-preserve-service bound at 172.20.2.242:14568 - so this is NOT a scheduling/startup/probe/selector-bind

### case-10

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2609 · steps 24 · tokens 666,312
- **raw 日志**：[results/1013_1623_inorder4-v3b21/raw/1013_1624_trainticket-service-10](../results/1013_1623_inorder4-v3b21/raw/1013_1624_trainticket-service-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket workloads are 2/2 Running/Ready and every Service endpoint is bound, so the break is not at the workload or network layer. Reading the address layer: ConfigMap ts-gateway-service-config (owner ts-gateway-service) contains exactly one route whose uri does not match the service its Path names -- route id 'route' with Path=/api/v1/routeservice/** has uri lb://${PRICE_SERVICE_HOST:ts-price-service} (sibling 'price' route is Path=/api/v1/priceservice/** -> lb://ts-price-service), so it should be ${ROUTE_SERVICE_HOST:ts-route-service}. No route in the table targets ts-route-service 

### case-11

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2963 · steps 28 · tokens 707,393
- **raw 日志**：[results/1013_1640_gatewayyaml-verify1/raw/1013_1640_trainticket-service-11](../results/1013_1640_gatewayyaml-verify1/raw/1013_1640_trainticket-service-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：All workloads are healthy: 43/43 pods Running 2/2 (only ts-ui-dashboard shows 3 restarts, from a transient startup nginx 'host not found in upstream "ts-gateway-service"'), all deployments 1/1 AVAILABLE, every Service has bound endpoints, TCP connectivity to ts-payment-service:19001 succeeds from worker-01/02/03, and the event surface shows no FailedScheduling/FailedCreate/FailedMount/image-pull mechanism events. The address layer is therefore the first failing surface: in the gateway's own manifest (ConfigMap ts-gateway-service-config, read via GetAppYAML(ts-gateway-service)) the route entry 

### case-12

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2927 · steps 42 · tokens 2,104,083
- **raw 日志**：[results/1013_1645_inorder4-v3b24/raw/1013_1646_trainticket-service-12](../results/1013_1645_inorder4-v3b24/raw/1013_1646_trainticket-service-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer fully healthy: 42/42 Deployments 1/1, every Pod 2/2 Running, no Pending/FailedScheduling/FailedCreate/FailedMount/image-pull errors, no namespace ResourceQuota, every Service has endpoints (ts-route-service 10.68.191.150:11178 open on worker-01/02/03) — scheduling/startup/admission/quota stages are excluded. The single alert (HTTP 500 on ts-inside-payment-service POST /api/v1/inside_pay_service/inside_payment, 5 occurrences) traces to 5 concurrent-request NonUniqueResultException rows in ts-payment-service, a load-induced data flake that matches no injectable root cause. Auditing 

### case-13

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2121 · steps 34 · tokens 2,181,512
- **raw 日志**：[results/1013_1810_gateway2-verify1/raw/1013_1810_trainticket-service-13](../results/1013_1810_gateway2-verify1/raw/1013_1810_trainticket-service-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket workloads read clean on the object layer (deployments 1/1 AVAILABLE, pods 2/2 Running; connectivity probes to ts-gateway-service:18888, ts-ui-dashboard:8080, ts-payment-service:19001, ts-preserve-service:14568 all 'Connection Succeeded'), so the break is in the address layer. The gateway's own manifest (ConfigMap ts-gateway-service-config, application.yml) holds the route table, and one route's Path and target disagree: '- id: route / uri: lb://${USER_SERVICE_HOST:ts-user-service} / Path=/api/v1/routeservice/**' — a routeservice Path wired to ts-user-service, while every other

### case-14

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2414 · steps 30 · tokens 1,341,232
- **raw 日志**：[results/1013_1825_dual2-verify1/raw/1013_1826_trainticket-service-14](../results/1013_1825_dual2-verify1/raw/1013_1826_trainticket-service-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer is fully healthy: all 41 ts-* deployments 1/1 AVAILABLE, every pod 2/2 Running, every Service has endpoints, and TCP probes to ts-gateway-service:18888 and ts-user-service:12342 succeed from all three workers — so the break is not in pods/deployments/endpoints/connectivity. Auditing the gateway route table line by line (GetAppYAML(ts-gateway-service) == live ConfigMap ts-gateway-service-config) shows exactly one Path-to-target mismatch among 41 routes: id 'route' with Path=/api/v1/routeservice/** has uri lb://${USER_SERVICE_HOST:ts-user-service}, i.e. the prefix denoting the route

### case-15

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 930,757
- **raw 日志**：[results/1013_1831_inorder4-v3b29/raw/1013_1832_trainticket-service-15](../results/1013_1831_inorder4-v3b29/raw/1013_1832_trainticket-service-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer is clean: all train-ticket pods read 2/2 Running with no Pending/CrashLoop/FailedScheduling/FailedCreate/FailedMount/image-pull events, so scheduling/startup/runtime are excluded. The address layer is the breakpoint: in the gateway ConfigMap ts-gateway-service-config (spring.cloud.gateway.routes) the route id 'travel' declares Path=/api/v1/travelservice/** but its uri is lb://${USER_SERVICE_HOST:ts-user-service}, i.e. travel search traffic is sent to ts-user-service instead of ts-travel-service (all sibling routes travel2/travel-plan/user are self-consistent). This matches the mis

### case-16

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2273 · steps 23 · tokens 1,188,029
- **raw 日志**：[results/1013_1839_inorder4-v3b31/raw/1013_1840_trainticket-service-16](../results/1013_1839_inorder4-v3b31/raw/1013_1840_trainticket-service-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom wording named no service, so the inventory listing was the entry: all 47 pods Running/Ready with the only restart outlier being ts-ui-dashboard (3, transient nginx 'host not found in upstream ts-gateway-service' at pod start). Caller-side signal: ts-ui-dashboard nginx access log shows repeated 'POST /api/v1/travelservice/trips/left HTTP/1.1" 404 131' while sibling paths return 200, matching the alert (business_action 'Search ticket', entry_service ts-travel-service, /api/v1/travelservice/trips/left, 19 occurrences, HTTP 404 Not Found). The break is in the address layer, not in either c

### case-25

- **结论**：`app/ts-gateway-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-gateway-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 23 · tokens 204,578
- **raw 日志**：[results/1012_1521_l3-tweak1/raw/1012_1521_trainticket-service-25](../results/1012_1521_l3-tweak1/raw/1012_1521_trainticket-service-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-gateway-service is the only workload in train-ticket that is unavailable: pod ts-gateway-service-5d577b65bb-4p686 shows READY 0/2 with 4 restarts, app container Terminated/Reason=Error/ExitCode=1, and the Service has no ready endpoints (GetResources endpoints -> empty ENDPOINTS), so callers get 503 (alert: POST /api/v1/users/login via ts-auth-service -> 503 Service Unavailable) and connectivity probes to ts-gateway-service:18888 fail from all three nodes. Its previous-container log shows the crash mechanism: 'nacos registry, ts-gateway-service register failed ... NacosException: Client not 

