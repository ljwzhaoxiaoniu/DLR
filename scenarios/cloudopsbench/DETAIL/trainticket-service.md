# 评测明细 · train-ticket/service — cloudopsbench

> 本家族已跑 **7/37** 题：JRA ✅7 ❌0 ｜ 证据链全闭 7 ｜ token 中位 460,035 ｜ 生成 2026-10-13T07:16:58.691Z
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
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 23 | 204,578 | 0 | 0 | 1012_1521_l3-tweak1 | 全对·链闭 |

## 证据正文

### case-2

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 681,352
- **摘要**：All 47 pods in train-ticket are 2/2 Running with no alert and no scheduling/admission/startup warning events, and the supposed victim is healthy: ts-order-service:12031 answers TCP from worker-01/02/03 (Connection Succeeded), its Service ports/targetPort=12031 and selector app=ts-order-service match its pod. The break is therefore at the address layer: line-by-line audit of the gateway route table (ConfigMap ts-gateway-service-config inside GetAppYAML(ts-gateway-service)) shows route id 'order' with Path=/api/v1/orderservice/** wired to uri 'lb://${ROUTE_SERVICE_HOST:ts-route-service}' - point

### case-3

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 1,133,738
- **摘要**：Reachability is partial: ts-ui-dashboard serving other paths 200 (contactservice, travelservice, assuranceservice) while preserveservice returns 499; pods are all 2/2 Running with services/selectors/ports correct, so no workload/node break. The break is in the address layer: the gateway ConfigMap ts-gateway-service-config (application.yml) owns 41 routes and exactly one violates 'each route's Path must point at the service its Path names' - route id 'order' has Path=/api/v1/orderservice/** but uri lb://${TRAVEL_SERVICE_HOST:ts-travel-service}. The nacos ConfigMap contains only NACOS_ADDRS and 

### case-4

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 373,034
- **摘要**：All train-ticket pods are 2/2 Running with no Pending/CrashLoop/ImagePull failures, and namespace events contain only rollout churn (Killing / 503 readiness / Backoff), so scheduling, admission, image, mount, probe, node and quota surfaces are excluded. Alerts report HTTPError('404 Client Error: Not Found') on POST /api/v1/orderservice/order/refresh (entry_service ts-order-service, 20 occurrences each), and TCP checks succeed to both ts-order-service:12031 and ts-price-service:16579 from worker-01/02/03 - a live backend answering 404 proves an addressing/routing break, not a connectivity break

### case-5

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 23 · tokens 460,035
- **摘要**：Symptom: 'Service Availability Disruption.' Caller-side evidence: ts-ui-dashboard nginx log shows repeated 'POST /api/v1/preserveservice/preserve HTTP/1.1" 404 131' (alert: 20 occurrences, entry_service ts-preserve-service) while all other /api/v1/* calls return 200. Object layer is clean: all pods 2/2 Running except ts-ui-dashboard (3 restarts, caused by a transient nginx 'host not found in upstream ts-gateway-service' during rollout, now Ready), namespace events contain no FailedScheduling/FailedCreate/FailedMount/image-pull; ts-preserve-service has no error logs and CheckServiceConnectivity

### case-6

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3478 · steps 24 · tokens 437,347
- **摘要**：Alert points at entry_service=ts-preserve-service: POST /api/v1/preserveservice/preserve returns 404 Not Found (20 occurrences). Yet ts-preserve-service is fully healthy: pod 2/2 Running with 0 restarts, endpoints bound at 172.20.3.154:14568, TCP connectivity succeeds from worker-01/02/03, and its error log is empty - so the request never reaches it. The namespace-wide pod scan shows no pending/crash/image-pull/mount anomaly and the events surface carries no Warning naming the preserve chain. The break is in the address layer: in ts-gateway-service-config (ConfigMap of app ts-gateway-service) 

### case-7

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 465,479
- **摘要**：All 44 train-ticket pods read 2/2 Running/Ready with no Pending/CrashLoop and ts-preserve-service:14568 is reachable from every node (CheckServiceConnectivity: Connection Succeeded; no error logs), yet the UI-dashboard nginx access log shows 20x "POST /api/v1/preserveservice/preserve HTTP/1.1" 404 while every sibling path (orderservice/order/refresh, inside_pay_service/inside_payment, cancelservice, users/login) returns 200. Line-by-line audit of the gateway route table (configmap ts-gateway-service-config, AGE 5m55s vs 9d for all other configmaps) shows exactly one mis-paired entry: id=preser

### case-25

- **结论**：`app/ts-gateway-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-gateway-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 23 · tokens 204,578
- **摘要**：ts-gateway-service is the only workload in train-ticket that is unavailable: pod ts-gateway-service-5d577b65bb-4p686 shows READY 0/2 with 4 restarts, app container Terminated/Reason=Error/ExitCode=1, and the Service has no ready endpoints (GetResources endpoints -> empty ENDPOINTS), so callers get 503 (alert: POST /api/v1/users/login via ts-auth-service -> 503 Service Unavailable) and connectivity probes to ts-gateway-service:18888 fail from all three nodes. Its previous-container log shows the crash mechanism: 'nacos registry, ts-gateway-service register failed ... NacosException: Client not 

