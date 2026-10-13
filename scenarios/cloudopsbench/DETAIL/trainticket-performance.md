# 评测明细 · train-ticket/performance — cloudopsbench

> 本家族已跑 **4/47** 题：JRA ✅4 ❌0 ｜ 证据链全闭 4 ｜ token 中位 442,283 ｜ 生成 2026-10-13T05:30:38.570Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 36 | 442,283 | 0 | 1 | 1012_1512_inorder4-v3b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1818 | 23 | 294,060 | 0 | 0 | 1013_1122_inorder4-v3b9 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1379 | 30 | 453,560 | 0 | 0 | 1013_1225_inorder4-v3b11 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2381 | 22 | 346,155 | 0 | 0 | 1013_1328_quality-verify1 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/ts-basic-service` + `pod_network_delay` ｜ 标签 `app/ts-basic-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 36 · tokens 442,283
- **摘要**：Telemetry-chain case: all 48 pods Running 2/2 with no crashloops, all deployments 1/1, TCP connectivity to ts-basic-service:15680 / ts-travel-service:12346 / ts-preserve-service:14568 succeeded from all three workers, all nodes Ready with no pressure/taints and kubelet/kube-proxy/containerd active, and no error logs in any queried service (pure latency, zero errors/restarts). Within the single window 14:21:06-14:22:56 the alerts show the call chain ui-dashboard -> gateway -> preserve -> travel -> basic degrading in a monotone cascade: ts-basic-service p50 36.38ms -> 7327.59ms (+20039.9%, p90 4

### case-2

- **结论**：`app/ts-contacts-service` + `pod_network_delay` ｜ 标签 `app/ts-contacts-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1818 · steps 23 · tokens 294,060
- **摘要**：Alerts (14:37:43~14:39:38) hit exactly the transitive caller chain of ts-contacts-service: ts-contacts-service (p50 7.52ms -> 4750ms, +63081%; RPS 1.56 -> 0.53, -66.1%), plus its callers ts-preserve-service (p50 202ms -> 7500ms), ts-gateway-service (p90 199ms -> 5318ms) and ts-ui-dashboard (p90 199ms -> 4927ms). GetServiceDependencies confirms ui-dashboard -> gateway -> preserve -> contacts, and since gateway fans out to 37 downstreams and preserve to 10, only a break at the leaf ts-contacts-service can explain the alerted set. Object layer is fully clean: all pods Running/Ready, ts-contacts-s

### case-3

- **结论**：`app/ts-food-service` + `pod_network_delay` ｜ 标签 `app/ts-food-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1379 · steps 30 · tokens 453,560
- **摘要**：Telemetry chain closure: 4 identical-window (2026-03-16 14:54:22~14:56:12) LATENCY_DEGRADATION alerts, all on the single call chain ui-dashboard -> gateway-service -> preserve-service -> food-service, with ts-food-service the leaf and worst hit (p50 17.70ms -> 7500.00ms, +42269.3%; p90 23.86ms -> 9500.00ms, Current=Peak), inherited by preserve-service (p50 218.62 -> 7500ms), gateway-service (p90 215.02 -> 5465.52ms) and ui-dashboard (p90 211.96 -> 5107.14ms). Object layer excluded: all 49 pods Running with 0 restarts, ts-food-service pod 2/2 Ready, ContainersReady=True, no last termination sta

### case-4

- **结论**：`app/ts-gateway-service` + `pod_network_delay` ｜ 标签 `app/ts-gateway-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2381 · steps 22 · tokens 346,155
- **摘要**：Alerts (metric surface) show LATENCY_DEGRADATION only on ts-gateway-service (p50 27.03ms -> 1928.57ms, +7035.6%; p90 204.84 -> 8000.00ms) and on its only caller ts-ui-dashboard (p50 29.71ms -> 1928.57ms, the identical added ~1.9s), while all 38 downstream services of the gateway stay free of latency degradation and no RESOURCE_SATURATION rows exist. The object layer is clean/exclusionary: all pods Running, READY 2/2, RESTARTS 0, nodes Ready with no taints, no FailedCreate/FailedScheduling/FailedMount/image-pull events in the 15:11-15:12 alert window, gateway Service selector app=ts-gateway-ser

