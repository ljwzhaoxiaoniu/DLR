# 评测明细 · train-ticket/service — cloudopsbench

> 本家族已跑 **37/37** 题：JRA ✅37 ❌0 ｜ 证据链全闭 37 ｜ token 中位 500,404 ｜ 生成 2026-10-13T14:35:03.877Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 374,767 | 0 | 0 | 1013_2229_inorder4-v3b53 | 全对·链闭 |
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
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 382,197 | 0 | 0 | 1013_1848_inorder4-v3b33 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.24 | 26 | 1,087,938 | 0 | 0 | 1013_1955_inorder4-v3b34 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 414,398 | 0 | 0 | 1013_2000_inorder4-v3b35 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 296,753 | 0 | 0 | 1013_2004_inorder4-v3b36 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3684 | 20 | 734,488 | 0 | 0 | 1013_2025_chainpivot-verify1 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 528,847 | 0 | 0 | 1013_2012_inorder4-v3b38 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 555,827 | 0 | 0 | 1013_2042_inorder4-v3b39 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 456,606 | 0 | 0 | 1013_2049_inorder4-v3b40 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 23 | 204,578 | 0 | 0 | 1012_1521_l3-tweak1 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 541,741 | 0 | 0 | 1013_2059_inorder4-v3b41 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 501,550 | 0 | 0 | 1013_2106_inorder4-v3b42 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 486,562 | 0 | 0 | 1013_2110_inorder4-v3b43 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4211 | 20 | 325,996 | 0 | 0 | 1013_2114_inorder4-v3b44 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 21 | 522,118 | 0 | 0 | 1013_2133_inorder4-v3b45 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 500,404 | 0 | 0 | 1013_2141_inorder4-v3b46 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 26 | 984,705 | 0 | 0 | 1013_2150_inorder4-v3b47 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 21 | 366,893 | 0 | 0 | 1013_2156_inorder4-v3b48 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 380,698 | 0 | 0 | 1013_2203_inorder4-v3b49 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 526,268 | 0 | 0 | 1013_2210_inorder4-v3b50 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 315,331 | 0 | 0 | 1013_2214_inorder4-v3b51 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 21 | 490,553 | 0 | 0 | 1013_2217_inorder4-v3b52 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 374,767
- **raw 日志**：[results/1013_2229_inorder4-v3b53/raw/1013_2233_trainticket-service-1](../results/1013_2229_inorder4-v3b53/raw/1013_2233_trainticket-service-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Chain: symptom side first -> the only active alert is a 404 from the order API (POST /api/v1/orderservice/order/refresh, 20 occurrences, HTTPError('404 Client Error: Not Found')), i.e. an HTTP 404, not a connection refusal. Object layer is clean for both candidate services: pods ts-order-service and ts-food-service are 2/2 Running with 0 restarts, deployments 1/1/1 AVAILABLE, Service ts-order-service maps 12031->12031 with selector app=ts-order-service, and CheckServiceConnectivity to ts-order-service:12031 succeeds from worker-01/02/03 (Connection Succeeded); ts-order-service logs show normal

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

### case-17

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 21 · tokens 382,197
- **raw 日志**：[results/1013_1848_inorder4-v3b33/raw/1013_1851_trainticket-service-17](../results/1013_1848_inorder4-v3b33/raw/1013_1851_trainticket-service-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert surface: POST /api/v1/travelservice/trips/left (business action 'Search ticket', entry ts-travel-service) repeatedly returns HTTPError 404 Not Found (20x) - a valid path answered by an HTTP server that does not own it. Object/node layer is clean: GetResources(pods) shows all 40+ ts-* pods 2/2 Running with no Pending/CrashLoop/image-pull outliers, GetClusterConfiguration shows 4/4 nodes Ready with no taints or pressure, and CheckNodeServiceStatus shows kube-proxy active on worker-01/02/03 - so the break is at the address layer, not in workload or nodes. GetAppYAML(ts-gateway-service) expo

### case-18

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.24 · steps 26 · tokens 1,087,938
- **raw 日志**：[results/1013_1955_inorder4-v3b34/raw/1013_1957_trainticket-service-18](../results/1013_1955_inorder4-v3b34/raw/1013_1957_trainticket-service-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller side proves the break: ts-ui-dashboard nginx access log records repeated 'POST /api/v1/travelservice/trips/left HTTP/1.1" 404 131' from python-requests (matching alert 'Search ticket' 404 x19), while all other paths in the same log return 200. The gateway route table itself is the break: in ConfigMap ts-gateway-service-config (application.yml of ts-gateway-service) the route 'travel' with predicate Path=/api/v1/travelservice/** is wired to uri lb://${PRESERVE_SERVICE_HOST:ts-preserve-service} instead of the travel upstream (${TRAVEL_SERVICE_HOST:ts-travel-service}); the sibling 'preserv

### case-19

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 414,398
- **raw 日志**：[results/1013_2000_inorder4-v3b35/raw/1013_2002_trainticket-service-19](../results/1013_2000_inorder4-v3b35/raw/1013_2002_trainticket-service-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: 503 Service Unavailable on POST /api/v1/travelservice/trips/left (entry_service ts-travel-service, 10 occurrences). ts-ui-dashboard nginx access log reproduces it verbatim ('POST /api/v1/travelservice/trips/left HTTP/1.1" 503 153', 16:00:30-32), and ts-gateway-service logs at the same second: 'WARN RoundRobinLoadBalancer : No servers available for service: ts-nonexistent-travel-backend'. The gateway's own route table (ConfigMap ts-gateway-service-config, mounted into ts-gateway-service) carries the mis-wired entry: route id 'travel', Path=/api/v1/travelservice/**, uri=lb://ts-nonexisten

### case-20

- **结论**：`app/ts-assurance-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-assurance-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 296,753
- **raw 日志**：[results/1013_2004_inorder4-v3b36/raw/1013_2006_trainticket-service-20](../results/1013_2004_inorder4-v3b36/raw/1013_2006_trainticket-service-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom: ts-assurance-service returns 503 (alert: GET /api/v1/assuranceservice/assurances/types, 17 occurrences). Pod inventory outlier: ts-assurance-service-7d97f6cf77-xw4dz 0/2 CrashLoopBackOff, 4 restarts; all other workloads 2/2 Running. Service ts-assurance-service (port 18888 -> targetPort 18888, selector app=ts-assurance-service) has an EMPTY endpoints list, explaining the 503. Container logs: 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' -> HikariPool init failure -> Exit Code 1. The sidecar in the same pod pins the break to the resolver: 'dia

### case-21

- **结论**：`app/ts-basic-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-basic-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3684 · steps 20 · tokens 734,488
- **raw 日志**：[results/1013_2025_chainpivot-verify1/raw/1013_2028_trainticket-service-21](../results/1013_2025_chainpivot-verify1/raw/1013_2028_trainticket-service-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only ts-basic-service-76b4574cb-ttvb6 is anomalous in the namespace-wide pod listing (0/2 READY, 4 restarts, Last State Terminated exit code 1 on worker-01) while all 47 other pods are 2/2 Running. Symptom side confirms it: connectivity probe to ts-basic-service:15680 fails from worker-01/02/03 (control: nacos:8848 open from all three), and `get endpoints ts-basic-service` returns an EMPTY endpoints list (Service has no ready backend), so callers ts-preserve-service and ts-inside-payment-service surface HTTP 500 alerts. The break is DNS resolution inside that pod: its app log shows 'nacos regi

### case-22

- **结论**：`app/ts-cancel-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-cancel-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 528,847
- **raw 日志**：[results/1013_2012_inorder4-v3b38/raw/1013_2030_trainticket-service-22](../results/1013_2012_inorder4-v3b38/raw/1013_2030_trainticket-service-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts point at ts-cancel-service (503 x34). Its Service has NO endpoints and a TCP probe on its declared port 18885 fails from all three nodes (Connection Failed). Pod ts-cancel-service-758b476b4d-r56v4 is 0/2 Running with 3 restarts, last state Terminated Exit Code 1; deployment reports Available=False / MinimumReplicasUnavailable; events show 'Startup probe failed: ... 172.20.1.7:15021: connect: connection refused'. Inside that pod every name lookup times out: istio-proxy logs 'lookup istiod.istio-system.svc on 10.255.9.254:53: read udp 172.20.1.7->10.255.9.254:53: i/o timeout' and 'failed 

### case-23

- **结论**：`app/ts-contacts-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-contacts-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 555,827
- **raw 日志**：[results/1013_2042_inorder4-v3b39/raw/1013_2045_trainticket-service-23](../results/1013_2042_inorder4-v3b39/raw/1013_2045_trainticket-service-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only ts-contacts-service is broken: pod ts-contacts-service-5cfbc8875-8fwnq is 0/2 CrashLoopBackOff with 4 restarts (app container Last State Terminated/Error exit 1, istio-proxy never Ready), while all other train-ticket pods are 2/2 Running. Its logs show 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' -> 'Communications link failure' -> HikariPool init failure -> app exit 1, and its istio-proxy shows 'lookup ... on 10.255.3.254:53 ... i/o timeout', i.e. the pod cannot resolve any name. GetAppYAML(ts-contacts-service) shows the deployment uniquely pin

### case-24

- **结论**：`app/ts-food-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-food-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 456,606
- **raw 日志**：[results/1013_2049_inorder4-v3b40/raw/1013_2051_trainticket-service-24](../results/1013_2049_inorder4-v3b40/raw/1013_2051_trainticket-service-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing outlier: ts-food-service-74f4df4f7-djvnb 0/2 CrashLoopBackOff (4 restarts, exit code 1, not OOM). Service ts-food-service has NO endpoints and CheckServiceConnectivity on its declared port 18856 fails from worker-01/02/03. App log: 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' -> HikariPool init failure -> JPA EntityManagerFactory failure -> 'Application run failed'. Same-pod istio-proxy log: 'lookup istiod.istio-system.svc on 10.255.18.254:53 ... i/o timeout', showing the configured resolver does not answer. GetAppYAML(ts-food-service) sh

### case-25

- **结论**：`app/ts-gateway-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-gateway-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 23 · tokens 204,578
- **raw 日志**：[results/1012_1521_l3-tweak1/raw/1012_1521_trainticket-service-25](../results/1012_1521_l3-tweak1/raw/1012_1521_trainticket-service-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-gateway-service is the only workload in train-ticket that is unavailable: pod ts-gateway-service-5d577b65bb-4p686 shows READY 0/2 with 4 restarts, app container Terminated/Reason=Error/ExitCode=1, and the Service has no ready endpoints (GetResources endpoints -> empty ENDPOINTS), so callers get 503 (alert: POST /api/v1/users/login via ts-auth-service -> 503 Service Unavailable) and connectivity probes to ts-gateway-service:18888 fail from all three nodes. Its previous-container log shows the crash mechanism: 'nacos registry, ts-gateway-service register failed ... NacosException: Client not 

### case-26

- **结论**：`app/ts-inside-payment-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-inside-payment-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 541,741
- **raw 日志**：[results/1013_2059_inorder4-v3b41/raw/1013_2104_trainticket-service-26](../results/1013_2059_inorder4-v3b41/raw/1013_2104_trainticket-service-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the pods listing: ts-inside-payment-service-5ddd559466-pfrhl 0/2 CrashLoopBackOff, 4 restarts, Last State Terminated Exit Code 1; alert points to the same service (503 from entry ts-inside-payment-service). Its app container logs show java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution -> HikariPool pool init failure -> JPA/Hibernate init failure -> 'Application run failed'; its istio-proxy likewise fails all DNS lookups (lookup istiod.istio-system.svc on 10.255.8.254:53: i/o timeout). The DB target itself is fine: Service tsdb-mysql-leader ex

### case-27

- **结论**：`app/ts-order-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-order-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 501,550
- **raw 日志**：[results/1013_2106_inorder4-v3b42/raw/1013_2108_trainticket-service-27](../results/1013_2106_inorder4-v3b42/raw/1013_2108_trainticket-service-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-order-service is the sole outlier: pod ts-order-service-6cd5889659-v76vn is 0/2 CrashLoopBackOff (4 restarts, last state Terminated/Error exit code 1) while all 48 other pods are 2/2 Running; alerts show 503 Service Unavailable on POST /api/v1/orderservice/order/refresh (entry ts-order-service, 2x20 occurrences). Its container logs die during HikariPool-1 initialization: java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution, and its istio-proxy sidecar also fails lookup of istiod.istio-system.svc on 10.255.7.254:53 (i/o timeout) - a pod-internal DNS failure,

### case-28

- **结论**：`app/ts-payment-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-payment-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 486,562
- **raw 日志**：[results/1013_2110_inorder4-v3b43/raw/1013_2112_trainticket-service-28](../results/1013_2110_inorder4-v3b43/raw/1013_2112_trainticket-service-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory shows the single outlier ts-payment-service-dd4c6c46b-qwzxg (0/2 CrashLoopBackOff, 4 restarts, last termination Reason=Error ExitCode=1, node worker-02); connectivity probe to its own declared port ts-payment-service:19001 fails from worker-01/02/03 (no ready endpoints), while the alert pointer ts-inside-payment-service 'Process payment' returns 500. Its app log gives the break verbatim: 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' -> HikariPool-1 Exception during pool initialization -> 'Failed to initialize JPA EntityManagerFactory ..

### case-29

- **结论**：`app/ts-preserve-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-preserve-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4211 · steps 20 · tokens 325,996
- **raw 日志**：[results/1013_2114_inorder4-v3b44/raw/1013_2118_trainticket-service-29](../results/1013_2114_inorder4-v3b44/raw/1013_2118_trainticket-service-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alert names ts-preserve-service with 503, and the Service's endpoints listing is EMPTY, with connectivity probes on its declared port 14568 failing from all three workers. Workload side: pod ts-preserve-service-6bd658cfc9-gpc6b on worker-02 is 0/2 Running with 4 restarts (app container Last State Terminated, exit code 1), deployment shows MinimumReplicasUnavailable, and its Startup probe fails with 'dial tcp 172.20.2.121:15021: connect: connection refused'. Mechanism: the pod cannot resolve any cluster name — istio-proxy logs repeatedly show 'lookup istiod.istio-system.svc on 10.

### case-30

- **结论**：`app/ts-price-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-price-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 21 · tokens 522,118
- **raw 日志**：[results/1013_2133_inorder4-v3b45/raw/1013_2137_trainticket-service-30](../results/1013_2133_inorder4-v3b45/raw/1013_2137_trainticket-service-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-price-service is the only outlier workload (pod ts-price-service-69f6579f8-xv9gc, 0/2 READY, STATUS Error, 4 restarts, CrashLoopBackOff with Last State Terminated exit code 1 on node worker-01). Its container log shows 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' during HikariPool/Hibernate initialization, so the failure is at name resolution, not at the database: the Service tsdb-mysql-leader (10.68.188.173:3306) exists and a TCP probe from debug pods on worker-01/02/03 returns 'Connection Succeeded' on all three nodes, and a probe on the victim'

### case-31

- **结论**：`app/ts-route-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-route-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 500,404
- **raw 日志**：[results/1013_2141_inorder4-v3b46/raw/1013_2147_trainticket-service-31](../results/1013_2141_inorder4-v3b46/raw/1013_2147_trainticket-service-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory: pod/ts-route-service-6d9b8cb654-wjpjn is the sole outlier (0/2, Error, CrashLoopBackOff, restart 4), and endpoints/ts-route-service is empty; a probe on its Service port 11178 fails from worker-01/02/03 while the identically-shaped ts-travel-service:12346 succeeds -> partial unreachability isolated to one service. Its previous log dies on java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution (CJCommunicationsException -> HikariPool-1 init failure -> Hibernate SessionFactory -> exit code 1), and its istio-proxy shows the same address-layer break (look

### case-32

- **结论**：`app/ts-seat-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-seat-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 26 · tokens 984,705
- **raw 日志**：[results/1013_2150_inorder4-v3b47/raw/1013_2153_trainticket-service-32](../results/1013_2150_inorder4-v3b47/raw/1013_2153_trainticket-service-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one object-layer outlier exists in train-ticket: pod ts-seat-service-594847b77f-rsbbh is 0/2 Running with 4 restarts and its Service ts-seat-service (18898) has an EMPTY endpoints list (availability disruption). Its own logs show startup death at registration: 'NacosServiceRegistry: nacos registry, ts-seat-service register failed ... NacosException: Client not connected, current status:STARTING' -> 'Application run failed', container Last State Terminated Reason Error Exit Code 1, Restart Count 4; the co-located istio-proxy shows the same root form of failure - name resolution timeouts: '

### case-33

- **结论**：`app/ts-security-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-security-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 21 · tokens 366,893
- **raw 日志**：[results/1013_2156_inorder4-v3b48/raw/1013_2158_trainticket-service-33](../results/1013_2156_inorder4-v3b48/raw/1013_2158_trainticket-service-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 47 pods in train-ticket are 2/2 Running except ts-security-service-865558cd4f-g2hs7 (0/2, Error, RESTARTS 4, worker-01); synthetic alert reports HTTP 500 on 'Create ticket order' via ts-preserve-service, which calls ts-security-service. The victim's own signals: CheckServiceConnectivity on ts-security-service:11188 (its declared spec port) fails from all three workers, and endpoints ts-security-service has an empty ENDPOINTS list. Pod record shows the app container Terminated Reason=Error Exit Code 1, and previous logs give the mechanism verbatim: java.net.UnknownHostException: tsdb-mysql-

### case-34

- **结论**：`app/ts-station-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-station-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 380,698
- **raw 日志**：[results/1013_2203_inorder4-v3b49/raw/1013_2206_trainticket-service-34](../results/1013_2203_inorder4-v3b49/raw/1013_2206_trainticket-service-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-station-service-6c9db8cccd-b622n on worker-01 is the only outlier in the pods listing (0/2 CrashLoopBackOff, 4 restarts); its app container last terminated with exit code 1 and its Service port 12345 is unreachable from all three workers (CheckServiceConnectivity: Connection Failed on worker-01/02/03). Error logs show 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' causing HikariPool/JPA EntityManagerFactory init failure, and the pod template is the only workload with a DNS override (dnsPolicy: None, dnsConfig.nameservers: [10.255.13.254]); istio-pro

### case-35

- **结论**：`app/ts-train-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-train-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 526,268
- **raw 日志**：[results/1013_2210_inorder4-v3b50/raw/1013_2212_trainticket-service-35](../results/1013_2210_inorder4-v3b50/raw/1013_2212_trainticket-service-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing shows a single outlier: ts-train-service-84dbf9c989-nn5mp is 0/2 Error with 4 restarts (CrashLoopBackOff, last exit code 1), while all other 51 pods in train-ticket are Running. Its app logs show HikariPool initialization failure / 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' and 'PersistenceException: Unable to build Hibernate SessionFactory', and its istio-proxy logs show all DNS lookups timing out against the same resolver: 'lookup istiod.istio-system.svc on 10.255.12.254:53: read udp 172.20.1.37:...->10.255.12.254:53: i/o timeout' - i

### case-36

- **结论**：`app/ts-travel-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-travel-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 315,331
- **raw 日志**：[results/1013_2214_inorder4-v3b51/raw/1013_2215_trainticket-service-36](../results/1013_2214_inorder4-v3b51/raw/1013_2215_trainticket-service-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod inventory names exactly one outlier: ts-travel-service-5b5d9f9746-pxbqv (0/2, Error, 4 restarts, node worker-02), matching the alert 'ts-travel-service -> /api/v1/travelservice/trips/left -> HTTPError 503' (17 occurrences). The victim's own signal is a total in-pod DNS failure: app container last run 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' and istio-proxy 'dial tcp: lookup istiod.istio-system.svc on 10.255.4.254:53: read udp 172.20.2.14:38306->10.255.4.254:53: i/o timeout'. Connectivity probe to the port its Service declares (12346) fails fr

### case-37

- **结论**：`app/ts-user-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-user-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 21 · tokens 490,553
- **raw 日志**：[results/1013_2217_inorder4-v3b52/raw/1013_2220_trainticket-service-37](../results/1013_2217_inorder4-v3b52/raw/1013_2220_trainticket-service-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the namespace inventory: pod ts-user-service-55f7958bd-gvl47 = 0/2 Error, CrashLoopBackOff, Restart Count 4, Last State Terminated Error Exit Code 1. Its container log reads 'java.net.UnknownHostException: tsdb-mysql-leader: Temporary failure in name resolution' inside 'HikariPool-1 - Exception during pool initialization' / 'Unable to build Hibernate SessionFactory', and its in-pod istio-proxy shows 'lookup istiod.istio-system.svc on 10.255.2.254:53 ... i/o timeout' - i.e. the whole pod's resolver is dead. The config face confirms it: the ts-user-service Deployment is the only 

