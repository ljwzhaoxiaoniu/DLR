# 评测明细 · train-ticket/startup — cloudopsbench

> 本家族已跑 **19/24** 题：JRA ✅19 ❌0 ｜ 证据链全闭 18 ｜ token 中位 193,872 ｜ 生成 2026-10-13T18:00:01.919Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 73,363 | 0 | 0 | 1012_1458_l3-verify3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 274,127 | 0 | 0 | 1012_2040_inorder4-v3b8 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 378,044 | 0 | 0 | 1013_1134_inorder4-v3b10 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 11 | 252,217 | 0 | 0 | 1013_1235_inorder4-v3b12 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 267,264 | 0 | 0 | 1013_1343_inorder4-v3b14 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 269,596 | 0 | 0 | 1013_1503_inorder4-v3b16 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 11 | 264,001 | 0 | 0 | 1013_1524_inorder4-v3b18 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 374,643 | 0 | 0 | 1013_1541_inorder4-v3b20 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 193,872 | 0 | 0 | 1013_1628_inorder4-v3b22 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 171,036 | 0 | 0 | 1013_1656_inorder4-v3b25 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 165,408 | 0 | 0 | 1013_1810_inorder4-v3b27 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 167,476 | 0 | 0 | 1013_1834_inorder4-v3b30 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 187,601 | 0 | 0 | 1013_1845_triple-verify1 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 169,779 | 0 | 0 | 1014_0147_inorder4-v3b87 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 292,879 | 0 | 0 | 1014_0149_inorder4-v3b88 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 171,121 | 0 | 0 | 1014_0151_inorder4-v3b89 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 11 | 172,531 | 0 | 0 | 1014_0153_inorder4-v3b90 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 269,537 | 0 | 0 | 1014_0155_inorder4-v3b91 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.3333 | 13 | 125,495 | 0 | 0 | 1014_0158_inorder4-v3b92 | 结果对·链未闭 |

## 证据正文

### case-1

- **结论**：`app/ts-assurance-service` + `missing_secret_binding` ｜ 标签 `app/ts-assurance-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 73,363
- **raw 日志**：[results/1012_1458_l3-verify3/raw/1012_1459_trainticket-startup-1](../results/1012_1458_l3-verify3/raw/1012_1459_trainticket-startup-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only ts-assurance-service is affected: pod ts-assurance-service-f84b798d-h2tkp shows 0/1 READY with STATUS CreateContainerConfigError (Pending, Restart Count 0, empty Container ID => container never started), and Service ts-assurance-service has an EMPTY endpoints list (the only business Service with no endpoints). Connectivity probes to ts-assurance-service:18888 failed on worker-01/02/03, and the alert records HTTP 503 on GET /api/v1/assuranceservice/assurances/types (85 occurrences). Pod events give the mechanism: kubelet 'Error: secret "ts-assurance-mysql" not found' (x12) while the image 

### case-2

- **结论**：`app/ts-auth-service` + `missing_secret_binding` ｜ 标签 `app/ts-auth-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 274,127
- **raw 日志**：[results/1012_2040_inorder4-v3b8/raw/1012_2159_trainticket-startup-2](../results/1012_2040_inorder4-v3b8/raw/1012_2159_trainticket-startup-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: POST /api/v1/users/login on entry service ts-auth-service returned 503 (370 occurrences). Connectivity test to ts-auth-service:12340 failed from worker-01/02/03. Pod listing shows the only outlier: ts-auth-service-796f849c7c-6gkj9 0/1 CreateContainerConfigError (0 restarts); Deployment ts-auth-service reports Available=False / MinimumReplicasUnavailable / unavailableReplicas=1. Kubelet mechanism event (verbatim, x12) and the namespace Warning row: 'Error: secret "ts-auth-mysql1" not found'. Config closure: the Deployment pod template uses envFrom secretRef name 'ts-auth-mysql1' (also in

### case-3

- **结论**：`app/ts-config-service` + `missing_secret_binding` ｜ 标签 `app/ts-config-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 378,044
- **raw 日志**：[results/1013_1134_inorder4-v3b10/raw/1013_1138_trainticket-startup-3](../results/1013_1134_inorder4-v3b10/raw/1013_1138_trainticket-startup-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-config-service is the only unreachable service: connectivity probes to ts-config-service:15679 fail from worker-01/02/03 while sibling services (ts-travel-service:12346, ts-basic-service:15680) succeed, and its Deployment is the only one at 0/1 (AVAILABLE 0). Object layer shows pod ts-config-service-5cc47cd465-5v4d6 in status CreateContainerConfigError (0/1, container State Waiting/Reason CreateContainerConfigError, image already pulled). Mechanism event from kubelet: Warning Failed (x12) 'Error: secret "ts-config-mysql1" not found'. Config closure: GetAppYAML(ts-config-service) declares en

### case-4

- **结论**：`app/ts-consign-service` + `missing_secret_binding` ｜ 标签 `app/ts-consign-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 11 · tokens 252,217
- **raw 日志**：[results/1013_1235_inorder4-v3b12/raw/1013_1238_trainticket-startup-4](../results/1013_1235_inorder4-v3b12/raw/1013_1238_trainticket-startup-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller-side reachability confirms the outage: CheckServiceConnectivity(ts-consign-service:16111) failed from debug pods on worker-01/02/03, and GetAlerts returned 0 alerts. The pods listing (wide) shows exactly one outlier among 47 pods: ts-consign-service-855b6bfd98-gsh82 is 0/1 with STATUS=CreateContainerConfigError while all other pods are 1/1 Running. Its pod detail shows container State 'Waiting / Reason: CreateContainerConfigError' with an empty Container ID (container never created) and the kubelet event 'Warning Failed (x12 over 4m58s): Error: secret "ts-consign-mysql2" not found', alo

### case-5

- **结论**：`app/ts-contacts-service` + `missing_secret_binding` ｜ 标签 `app/ts-contacts-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 267,264
- **raw 日志**：[results/1013_1343_inorder4-v3b14/raw/1013_1346_trainticket-startup-5](../results/1013_1343_inorder4-v3b14/raw/1013_1346_trainticket-startup-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: GetAlerts shows entry_service ts-contacts-service returning HTTP 503 (92 occurrences) on /api/v1/contactservice/contacts/account/{userId}, and CheckServiceConnectivity(ts-contacts-service:12347) fails from debug pods on worker-01/02/03. Object layer: the only outlier row in the train-ticket pod listing is ts-contacts-service-5cbbccffcb-gn4qm 0/1 CreateContainerConfigError (all other workloads 1/1 Running), so the node side is not the break. Mechanism/event surface: kubectl-describe events read verbatim 'Warning Failed ... Error: secret "ts-contacts-mysql" not found' (x12 over 4m5

### case-6

- **结论**：`app/ts-delivery-service` + `missing_secret_binding` ｜ 标签 `app/ts-delivery-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 269,596
- **raw 日志**：[results/1013_1503_inorder4-v3b16/raw/1013_1505_trainticket-startup-6](../results/1013_1503_inorder4-v3b16/raw/1013_1505_trainticket-startup-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain closed on ts-delivery-service. Symptom side: active TCP probe to ts-delivery-service:18808 failed from all three workers (worker-01/02/03 'Connection Failed'), while GetAlerts is clean (no metric-side pointer). Object layer: the pod listing's only outlier is ts-delivery-service-78fc79dcf6-dpqs5 with '0/1 CreateContainerConfigError' (all other 48 pods 1/1 Running), and GetResources(deployments -o wide) shows ts-delivery-service as the only drained workload, 0/1 AVAILABLE. Mechanism event (kubelet, on the exact pod and in the namespace events surface): 'Warning Failed ... Erro

### case-7

- **结论**：`app/ts-food-delivery-service` + `missing_secret_binding` ｜ 标签 `app/ts-food-delivery-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 11 · tokens 264,001
- **raw 日志**：[results/1013_1524_inorder4-v3b18/raw/1013_1527_trainticket-startup-7](../results/1013_1524_inorder4-v3b18/raw/1013_1527_trainticket-startup-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-level pods scan shows a single outlier: ts-food-delivery-service-bdcf5577f-v4x6f is 0/1 in CreateContainerConfigError on worker-01 while all other 47 pods are 1/1 Running. Its pod detail gives the mechanism verbatim: kubelet 'Warning Failed ... Error: secret "ts-food-delivery-mysq1" not found' (x12), State Waiting/Reason CreateContainerConfigError, with PodScheduled=True and image already pulled, so scheduling and image pull are fine and the break is at container-config reference resolution. The config face confirms it: the deployment's envFrom secretRef is 'ts-food-delivery-mysq1' (

### case-8

- **结论**：`app/ts-food-service` + `missing_secret_binding` ｜ 标签 `app/ts-food-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 374,643
- **raw 日志**：[results/1013_1541_inorder4-v3b20/raw/1013_1543_trainticket-startup-8](../results/1013_1541_inorder4-v3b20/raw/1013_1543_trainticket-startup-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: ts-food-service-6b7777876d-2h6dc is 0/1 in CreateContainerConfigError while all other train-ticket pods are 1/1 Running. Its pod sheet shows the container Waiting with Reason=CreateContainerConfigError and the kubelet event verbatim: 'Error: secret "ts-food-mysql" not found' (x12 over 5m), while the image was already present (ruling out image pull). The Deployment ts-food-service spec shows envFrom secretRef name=ts-food-mysql; the secrets listing contains every other '<svc>-mysql' secret but ts-food-mysql is absent — the only missing referenced object. The

### case-9

- **结论**：`app/ts-notification-service` + `missing_secret_binding` ｜ 标签 `app/ts-notification-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 193,872
- **raw 日志**：[results/1013_1628_inorder4-v3b22/raw/1013_1631_trainticket-startup-9](../results/1013_1628_inorder4-v3b22/raw/1013_1631_trainticket-startup-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: connectivity probe to the Service-declared port ts-notification-service:17853 fails from worker-01/02/03 ('Connection Failed') and the Service ts-notification-service has an EMPTY ENDPOINTS list, while its upstream callers are ts-gateway-service and ts-cancel-service. The pods inventory (only legitimate full scan) shows exactly one outlier: ts-notification-service-5fd4cd4dcd-2vbnx 0/1 CreateContainerConfigError (all other 47 pods 1/1 Running -> 'Partial'). Owner chain: Deployment/ts-notification-service replicas=1, unavailableReplicas=1, Available=False (MinimumReplicasUnav

### case-10

- **结论**：`app/ts-order-other-service` + `missing_secret_binding` ｜ 标签 `app/ts-order-other-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 171,036
- **raw 日志**：[results/1013_1656_inorder4-v3b25/raw/1013_1658_trainticket-startup-10](../results/1013_1656_inorder4-v3b25/raw/1013_1658_trainticket-startup-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.' - inventory listing shows the single outlier pod ts-order-other-service-5fdd56f7f9-r5kch as 0/1 CreateContainerConfigError (Ready=False, ContainersReady=False, State: Waiting) while all 46 other pods are 1/1 Running. Its Service ts-order-other-service (port 12032/targetPort 12032, selector app=ts-order-other-service) has an EMPTY endpoints list, i.e. the service is genuinely unreachable. kubelet mechanism event (x12 over 5m1s): 'Error: secret "ts-order-other-mysql1" not found'; image Pulled and Scheduled succeeded, so scheduling/image/probe layers are 

### case-11

- **结论**：`app/ts-order-service` + `missing_secret_binding` ｜ 标签 `app/ts-order-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 165,408
- **raw 日志**：[results/1013_1810_inorder4-v3b27/raw/1013_1813_trainticket-startup-11](../results/1013_1810_inorder4-v3b27/raw/1013_1813_trainticket-startup-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-order-service is the single outlier in the namespace: pod ts-order-service-6c6b786d8-kqmpg shows 0/1 READY with STATUS CreateContainerConfigError, Restart Count 0. Its Service ts-order-service (port/targetPort 12031) has an EMPTY endpoints list, and an active TCP probe on 12031 fails from worker-01/02/03, matching caller-side 503 alerts on ts-order-service /refresh. The pod's deployment ts-order-service reports Available=False (MinimumReplicasUnavailable) with unavailableReplicas: 1. Mechanism event is explicit in both the pod's event section and the namespace event surface: Warning Failed 

### case-12

- **结论**：`app/ts-payment-service` + `missing_secret_binding` ｜ 标签 `app/ts-payment-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 167,476
- **raw 日志**：[results/1013_1834_inorder4-v3b30/raw/1013_1837_trainticket-startup-12](../results/1013_1834_inorder4-v3b30/raw/1013_1837_trainticket-startup-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-wide pods listing shows exactly one outlier: ts-payment-service-57597f9bb4-zmzsz is 0/1 CreateContainerConfigError (all other 47 pods Running/1-1 Ready). Pod detail gives State Waiting/Reason CreateContainerConfigError with envFrom secretRef 'ts-payment-mysql2' (Optional: false) and kubelet events 'Warning Failed ... Error: secret "ts-payment-mysql2" not found' (x12), while the image is already present and the pod is Scheduled - so admission/scheduling/image are fine and the break is config injection. GetAppYAML(ts-payment-service) confirms envFrom.secretRef.name=ts-payment-mysql2, b

### case-13

- **结论**：`app/ts-price-service` + `missing_secret_binding` ｜ 标签 `app/ts-price-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 187,601
- **raw 日志**：[results/1013_1845_triple-verify1/raw/1013_1845_trainticket-startup-13](../results/1013_1845_triple-verify1/raw/1013_1845_trainticket-startup-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-price-service is the only non-Running workload in train-ticket: pod ts-price-service-755858595b-6ztwg is 0/1 with STATUS CreateContainerConfigError and State Waiting/CreateContainerConfigError. kubelet events on that pod state verbatim: 'Warning Failed (x12 over 5m2s) Error: secret "ts-price-mysql" not found'; the image was already Pulled and the pod was successfully Scheduled to worker-02, excluding image-pull and scheduling classes. GetAppYAML(ts-price-service) shows the template consumes envFrom.secretRef name=ts-price-mysql, yet GetResources(secrets, train-ticket) lists every sibling ts

### case-14

- **结论**：`app/ts-security-service` + `missing_secret_binding` ｜ 标签 `app/ts-security-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 169,779
- **raw 日志**：[results/1014_0147_inorder4-v3b87/raw/1014_0148_trainticket-startup-14](../results/1014_0147_inorder4-v3b87/raw/1014_0148_trainticket-startup-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod inventory outlier: ts-security-service-59cb94797b-t5w8x is 0/1 with STATUS=CreateContainerConfigError (all other 47 pods 1/1 Running). Its own pod sheet and the namespace event surface both carry the mechanism verbatim: kubelet 'Warning Failed ... Error: secret "ts-security-mysql" not found' (x12), while PodScheduled=True rules out scheduling and failed pulls. GetAppYAML(ts-security-service) shows the template binds envFrom.secretRef name=ts-security-mysql with Optional: false, and the secrets listing in train-ticket contains no such Secret (32 secrets, ts-security-mysql absent), so the re

### case-15

- **结论**：`app/ts-station-food-service` + `missing_secret_binding` ｜ 标签 `app/ts-station-food-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 292,879
- **raw 日志**：[results/1014_0149_inorder4-v3b88/raw/1014_0150_trainticket-startup-15](../results/1014_0149_inorder4-v3b88/raw/1014_0150_trainticket-startup-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace train-ticket the only outlier pod is ts-station-food-service-d7d77b769-46xcs (0/1, STATUS=CreateContainerConfigError, READY=False); its declared port 18855 fails connectivity from worker-01/02/03 and endpoints/ts-station-food-service has an empty ENDPOINTS list, so the service is genuinely unreachable. Pod detail carries the mechanism verbatim: 'Warning Failed ... kubelet Error: secret "ts-station-food-mysql1" not found' (x12), while scheduling succeeded ('Successfully assigned ... to worker-02') and the image was already present - so the break is at container env assembly, not sc

### case-16

- **结论**：`app/ts-station-service` + `missing_secret_binding` ｜ 标签 `app/ts-station-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 171,121
- **raw 日志**：[results/1014_0151_inorder4-v3b89/raw/1014_0152_trainticket-startup-16](../results/1014_0151_inorder4-v3b89/raw/1014_0152_trainticket-startup-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-station-service-5f5c7cc968-f9dzr is the only outlier: READY 0/1, STATUS CreateContainerConfigError, container State Waiting/Reason CreateContainerConfigError, Restart Count 0. Its endpoints listing for service ts-station-service is empty (Service declares port/targetPort 12345), so the service is genuinely unreachable; the alert shows the caller side failing (POST /api/v1/preserveservice/preserve via ts-preserve-service returns HTTP 500, 61 occurrences). The mechanism event is verbatim on the pod sheet and in the namespace event surface: 'Warning Failed (x12 over 5m4s) kubelet  Error: s

### case-17

- **结论**：`app/ts-ticket-office-service` + `missing_secret_binding` ｜ 标签 `app/ts-ticket-office-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 11 · tokens 172,531
- **raw 日志**：[results/1014_0153_inorder4-v3b90/raw/1014_0155_trainticket-startup-17](../results/1014_0153_inorder4-v3b90/raw/1014_0155_trainticket-startup-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-ticket-office-service-5b479ccdf6-9727s reports 0/1 READY with STATUS CreateContainerConfigError (State Waiting) and 0 restarts; its own sheet shows EnvFrom Secret 'ts-ticket-office-mysql' with Optional: false, and kubelet Warning events x12 read verbatim 'Error: secret "ts-ticket-office-mysql" not found'. Scheduling (PodScheduled True) and image pull (Pulled, already present) both succeeded, so the break is at container-config reference resolution, not scheduling/probe/image. The Deployment ts-ticket-office-service is 0/1 available with the same secretRef in its pod template, and the na

### case-18

- **结论**：`app/ts-train-food-service` + `missing_secret_binding` ｜ 标签 `app/ts-train-food-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 269,537
- **raw 日志**：[results/1014_0155_inorder4-v3b91/raw/1014_0157_trainticket-startup-18](../results/1014_0155_inorder4-v3b91/raw/1014_0157_trainticket-startup-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-wide pod listing showed exactly one outlier: ts-train-food-service-57684b5b44-kbhjt 0/1 CreateContainerConfigError. Its own describe sheet shows State Waiting/CreateContainerConfigError with 'Environment Variables from: ts-train-food-mysql Secret Optional: false', image already present on machine (Pulled) and successful scheduling, so the break is at container-config/admission, not scheduling or image pull. The live kubelet event on that pod reads verbatim 'Error: secret "ts-train-food-mysql" not found' (x12 over 5m5s, still recurring 4m20s ago). The deployment template confirms the 

### case-19

- **结论**：`app/ts-train-service` + `missing_secret_binding` ｜ 标签 `app/ts-train-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.3333 · steps 13 · tokens 125,495
- **raw 日志**：[results/1014_0158_inorder4-v3b92/raw/1014_0159_trainticket-startup-19](../results/1014_0158_inorder4-v3b92/raw/1014_0159_trainticket-startup-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-train-service pod ts-train-service-68845fd764-6xwgp 是 pods 清单唯一离群行（0/1 CreateContainerConfigError，其余 42 个业务 Pod 均 1/1 Running）。Service ts-train-service 声明端口 14567 但 Endpoints 为空，上游调用方 ts-basic-service 报 'Service Instance cannot be null'。DescribeResource(pod) 显示容器 State=Waiting Reason=CreateContainerConfigError，envFrom 引用 Secret 'ts-train-mysql'(Optional:false)，事件原文 'Warning Failed ... Error: secret "ts-train-mysql" not found'（连续 x12，并在同 workload 的上一实例 -qvqcb 上重复）；namespace 事件面把该机制逐字绑到 pod/ts-train-service-68845fd764-6xwgp。被引对象清单确认 secrets 中 ts-train-mysql 仍然缺失（其余 ts-*-mysql 全部存在），事件为活事件。断点在

