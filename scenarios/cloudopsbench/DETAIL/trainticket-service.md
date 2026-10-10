# 评测明细 · train-ticket/service — cloudopsbench

> 本家族已跑 **1/37** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-10T09:25:25.475Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [25](#case-25) | 1 | 1 | 1 | 1 | 0.75 | 1 | 0.25 | 29 | 0 | 0 | 1010_1658_inorder5 | 全对·链闭 |

## 证据正文

### case-25

- **结论**：`app/ts-gateway-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-gateway-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.75 · ECR 1 · EE 0.25 · steps 29
- **摘要**：Only ts-gateway-service is unhealthy in train-ticket: pod ts-gateway-service-5d577b65bb-4p686 is 0/2 Ready with 4 restarts (app container Terminated/Error/exit code 1; istio-proxy Startup probe failed on 15021). Its Service has an EMPTY endpoint list and CheckServiceConnectivity to ts-gateway-service:18888 fails from all three nodes, while ts-auth-service:12340 is open everywhere - so the 503 on POST /api/v1/users/login (alert: 'HTTPError(503 Service Unavailable)') comes from the gateway hop of the chain ts-ui-dashboard -> ts-gateway-service -> ts-auth-service, not from ts-auth-service. Inside

