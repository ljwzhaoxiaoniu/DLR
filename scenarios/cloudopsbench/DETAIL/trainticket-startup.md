# 评测明细 · train-ticket/startup — cloudopsbench

> 本家族已跑 **2/24** 题：JRA ✅2 ❌0 ｜ 证据链全闭 2 ｜ token 中位 274,127 ｜ 生成 2026-10-13T03:28:27.251Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 73,363 | 0 | 0 | 1012_1458_l3-verify3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 274,127 | 0 | 0 | 1012_2040_inorder4-v3b8 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/ts-assurance-service` + `missing_secret_binding` ｜ 标签 `app/ts-assurance-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 73,363
- **摘要**：Only ts-assurance-service is affected: pod ts-assurance-service-f84b798d-h2tkp shows 0/1 READY with STATUS CreateContainerConfigError (Pending, Restart Count 0, empty Container ID => container never started), and Service ts-assurance-service has an EMPTY endpoints list (the only business Service with no endpoints). Connectivity probes to ts-assurance-service:18888 failed on worker-01/02/03, and the alert records HTTP 503 on GET /api/v1/assuranceservice/assurances/types (85 occurrences). Pod events give the mechanism: kubelet 'Error: secret "ts-assurance-mysql" not found' (x12) while the image 

### case-2

- **结论**：`app/ts-auth-service` + `missing_secret_binding` ｜ 标签 `app/ts-auth-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 274,127
- **摘要**：Alert: POST /api/v1/users/login on entry service ts-auth-service returned 503 (370 occurrences). Connectivity test to ts-auth-service:12340 failed from worker-01/02/03. Pod listing shows the only outlier: ts-auth-service-796f849c7c-6gkj9 0/1 CreateContainerConfigError (0 restarts); Deployment ts-auth-service reports Available=False / MinimumReplicasUnavailable / unavailableReplicas=1. Kubelet mechanism event (verbatim, x12) and the namespace Warning row: 'Error: secret "ts-auth-mysql1" not found'. Config closure: the Deployment pod template uses envFrom secretRef name 'ts-auth-mysql1' (also in

