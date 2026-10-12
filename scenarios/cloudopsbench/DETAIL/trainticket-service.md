# 评测明细 · train-ticket/service — cloudopsbench

> 本家族已跑 **2/37** 题：JRA ✅2 ❌0 ｜ 证据链全闭 2 ｜ token 中位 681,352 ｜ 生成 2026-10-12T12:12:14.194Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 681,352 | 0 | 0 | 1012_2010_attr-verify1 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 23 | 204,578 | 0 | 0 | 1012_1521_l3-tweak1 | 全对·链闭 |

## 证据正文

### case-2

- **结论**：`app/ts-gateway-service` + `gateway_misrouted` ｜ 标签 `app/ts-gateway-service` + `gateway_misrouted`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 681,352
- **摘要**：All 47 pods in train-ticket are 2/2 Running with no alert and no scheduling/admission/startup warning events, and the supposed victim is healthy: ts-order-service:12031 answers TCP from worker-01/02/03 (Connection Succeeded), its Service ports/targetPort=12031 and selector app=ts-order-service match its pod. The break is therefore at the address layer: line-by-line audit of the gateway route table (ConfigMap ts-gateway-service-config inside GetAppYAML(ts-gateway-service)) shows route id 'order' with Path=/api/v1/orderservice/** wired to uri 'lb://${ROUTE_SERVICE_HOST:ts-route-service}' - point

### case-25

- **结论**：`app/ts-gateway-service` + `service_dns_resolution_failure` ｜ 标签 `app/ts-gateway-service` + `service_dns_resolution_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 23 · tokens 204,578
- **摘要**：ts-gateway-service is the only workload in train-ticket that is unavailable: pod ts-gateway-service-5d577b65bb-4p686 shows READY 0/2 with 4 restarts, app container Terminated/Reason=Error/ExitCode=1, and the Service has no ready endpoints (GetResources endpoints -> empty ENDPOINTS), so callers get 503 (alert: POST /api/v1/users/login via ts-auth-service -> 503 Service Unavailable) and connectivity probes to ts-gateway-service:18888 fail from all three nodes. Its previous-container log shows the crash mechanism: 'nacos registry, ts-gateway-service register failed ... NacosException: Client not 

