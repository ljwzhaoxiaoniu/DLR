# 评测明细 · train-ticket/startup — cloudopsbench

> 本家族已跑 **1/24** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-11T13:49:40.827Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4444 | 10 | 0 | 0 | 1011_2147_inorder4 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/ts-assurance-service` + `missing_secret_binding` ｜ 标签 `app/ts-assurance-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4444 · steps 10
- **摘要**：Pods listing shows the only outlier: ts-assurance-service-f84b798d-h2tkp is 0/1 with STATUS=CreateContainerConfigError on worker-01, while all other 47 pods in train-ticket are Running/Ready. The alert corroborates: ts-assurance-service GET /api/v1/assuranceservice/assurances/types returns HTTP 503 (85 occurrences). DescribeResource on the pod gives the break point: kubelet 'Warning Failed (x12): Error: secret "ts-assurance-mysql" not found', container State Waiting/Reason CreateContainerConfigError; the app YAML shows Deployment ts-assurance-service references it via envFrom.secretRef with Op

