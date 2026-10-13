# 评测明细 · train-ticket/startup — cloudopsbench

> 本家族已跑 **6/24** 题：JRA ✅6 ❌0 ｜ 证据链全闭 6 ｜ token 中位 269,596 ｜ 生成 2026-10-13T07:16:58.691Z
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

## 证据正文

### case-1

- **结论**：`app/ts-assurance-service` + `missing_secret_binding` ｜ 标签 `app/ts-assurance-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 73,363
- **摘要**：Only ts-assurance-service is affected: pod ts-assurance-service-f84b798d-h2tkp shows 0/1 READY with STATUS CreateContainerConfigError (Pending, Restart Count 0, empty Container ID => container never started), and Service ts-assurance-service has an EMPTY endpoints list (the only business Service with no endpoints). Connectivity probes to ts-assurance-service:18888 failed on worker-01/02/03, and the alert records HTTP 503 on GET /api/v1/assuranceservice/assurances/types (85 occurrences). Pod events give the mechanism: kubelet 'Error: secret "ts-assurance-mysql" not found' (x12) while the image 

### case-2

- **结论**：`app/ts-auth-service` + `missing_secret_binding` ｜ 标签 `app/ts-auth-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 274,127
- **摘要**：Alert: POST /api/v1/users/login on entry service ts-auth-service returned 503 (370 occurrences). Connectivity test to ts-auth-service:12340 failed from worker-01/02/03. Pod listing shows the only outlier: ts-auth-service-796f849c7c-6gkj9 0/1 CreateContainerConfigError (0 restarts); Deployment ts-auth-service reports Available=False / MinimumReplicasUnavailable / unavailableReplicas=1. Kubelet mechanism event (verbatim, x12) and the namespace Warning row: 'Error: secret "ts-auth-mysql1" not found'. Config closure: the Deployment pod template uses envFrom secretRef name 'ts-auth-mysql1' (also in

### case-3

- **结论**：`app/ts-config-service` + `missing_secret_binding` ｜ 标签 `app/ts-config-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 378,044
- **摘要**：ts-config-service is the only unreachable service: connectivity probes to ts-config-service:15679 fail from worker-01/02/03 while sibling services (ts-travel-service:12346, ts-basic-service:15680) succeed, and its Deployment is the only one at 0/1 (AVAILABLE 0). Object layer shows pod ts-config-service-5cc47cd465-5v4d6 in status CreateContainerConfigError (0/1, container State Waiting/Reason CreateContainerConfigError, image already pulled). Mechanism event from kubelet: Warning Failed (x12) 'Error: secret "ts-config-mysql1" not found'. Config closure: GetAppYAML(ts-config-service) declares en

### case-4

- **结论**：`app/ts-consign-service` + `missing_secret_binding` ｜ 标签 `app/ts-consign-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 11 · tokens 252,217
- **摘要**：Caller-side reachability confirms the outage: CheckServiceConnectivity(ts-consign-service:16111) failed from debug pods on worker-01/02/03, and GetAlerts returned 0 alerts. The pods listing (wide) shows exactly one outlier among 47 pods: ts-consign-service-855b6bfd98-gsh82 is 0/1 with STATUS=CreateContainerConfigError while all other pods are 1/1 Running. Its pod detail shows container State 'Waiting / Reason: CreateContainerConfigError' with an empty Container ID (container never created) and the kubelet event 'Warning Failed (x12 over 4m58s): Error: secret "ts-consign-mysql2" not found', alo

### case-5

- **结论**：`app/ts-contacts-service` + `missing_secret_binding` ｜ 标签 `app/ts-contacts-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 267,264
- **摘要**：Symptom side: GetAlerts shows entry_service ts-contacts-service returning HTTP 503 (92 occurrences) on /api/v1/contactservice/contacts/account/{userId}, and CheckServiceConnectivity(ts-contacts-service:12347) fails from debug pods on worker-01/02/03. Object layer: the only outlier row in the train-ticket pod listing is ts-contacts-service-5cbbccffcb-gn4qm 0/1 CreateContainerConfigError (all other workloads 1/1 Running), so the node side is not the break. Mechanism/event surface: kubectl-describe events read verbatim 'Warning Failed ... Error: secret "ts-contacts-mysql" not found' (x12 over 4m5

### case-6

- **结论**：`app/ts-delivery-service` + `missing_secret_binding` ｜ 标签 `app/ts-delivery-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 269,596
- **摘要**：Reachability chain closed on ts-delivery-service. Symptom side: active TCP probe to ts-delivery-service:18808 failed from all three workers (worker-01/02/03 'Connection Failed'), while GetAlerts is clean (no metric-side pointer). Object layer: the pod listing's only outlier is ts-delivery-service-78fc79dcf6-dpqs5 with '0/1 CreateContainerConfigError' (all other 48 pods 1/1 Running), and GetResources(deployments -o wide) shows ts-delivery-service as the only drained workload, 0/1 AVAILABLE. Mechanism event (kubelet, on the exact pod and in the namespace events surface): 'Warning Failed ... Erro

