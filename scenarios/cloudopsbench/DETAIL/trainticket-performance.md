# 评测明细 · train-ticket/performance — cloudopsbench

> 本家族已跑 **9/47** 题：JRA ✅9 ❌0 ｜ 证据链全闭 9 ｜ token 中位 319,046 ｜ 生成 2026-10-13T08:37:23.454Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 36 | 442,283 | 0 | 1 | 1012_1512_inorder4-v3b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1818 | 23 | 294,060 | 0 | 0 | 1013_1122_inorder4-v3b9 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1379 | 30 | 453,560 | 0 | 0 | 1013_1225_inorder4-v3b11 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2381 | 22 | 346,155 | 0 | 0 | 1013_1328_quality-verify1 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 224,570 | 0 | 0 | 1013_1413_inorder4-v3b15 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 301,957 | 0 | 0 | 1013_1520_inorder4-v3b17 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2083 | 25 | 319,046 | 0 | 0 | 1013_1536_inorder4-v3b19 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 270,805 | 0 | 0 | 1013_1623_inorder4-v3b21 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 343,666 | 0 | 0 | 1013_1633_inorder4-v3b23 | 全对·链闭 |

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

### case-5

- **结论**：`app/ts-inside-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-inside-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 224,570
- **摘要**：Symptom 'Service quality degradation.' enters the metric surface: GetAlerts shows no RESOURCE_SATURATION rows, only latency degradation on the single call chain ts-ui-dashboard -> ts-gateway-service -> ts-cancel-service -> ts-inside-payment-service. The deepest node of that chain, ts-inside-payment-service, has the largest anomaly (p50 22.93ms -> 7166.67ms, +31154.5%; p90 64.29ms -> 20333.33ms, +31529.5%), and its callers inherit the same added delay (ts-cancel-service p90 150.77ms -> 21666.67ms +14270.8%; ts-gateway-service p90 +3851.6%; ts-ui-dashboard p90 +4305.0%), while its own downstream

### case-6

- **结论**：`app/ts-order-service` + `pod_network_delay` ｜ 标签 `app/ts-order-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 301,957
- **摘要**：Metric-surface incident: GetAlerts shows LATENCY_DEGRADATION on the preserve-booking path only (ts-order-service p50 9.44ms->3881.58ms, ts-seat-service 17.65->3906.25ms, ts-security-service 39.11->3750.00ms, ts-travel-service p90 98.74->11000ms, ts-preserve-service p50 295.1->30000ms, ts-gateway-service p90 227.8->39000ms, ts-ui-dashboard p90 229.6->34500ms) plus a cluster-wide ~50-70% pps 'Network Drop' on every service. Object layer is excluded: all pods Running/READY 2/2, RESTARTS 0, nodes Ready with no taints/pressure, namespace events contain no mechanism Warnings (no FailedCreate/FailedM

### case-7

- **结论**：`app/ts-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2083 · steps 25 · tokens 319,046
- **摘要**：Metrics-surface incident (L3 wording 'Service quality degradation.'): GetAlerts shows LATENCY_DEGRADATION on ts-payment-service (p50 16.96ms -> 5000.00ms, +29389%; p90 23.79ms -> 9000.00ms, Peak 9136.36ms) mirrored by its caller ts-inside-payment-service (p90 89.68ms -> 8488.44ms), plus a mild RESOURCE_SATURATION [cpu_cfs] 0.073s row on ts-order-service within the same 16:01:06-16:02:56 window. Topology: ts-inside-payment-service -> ts-payment-service (leaf, no downstream). The ~5s added latency rides on ts-payment-service's own latency (p50 current is exactly 5000.00ms) and its caller sees th

### case-8

- **结论**：`app/ts-preserve-service` + `pod_network_delay` ｜ 标签 `app/ts-preserve-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 270,805
- **摘要**：Alerts report pure LATENCY_DEGRADATION [Slow Response] with zero RESOURCE_SATURATION rows: ts-preserve-service p50 376.71ms->7500.00ms (+1890.9%) and p90 562.50ms->9750.00ms (+1633.3%), with its upstream callers ts-gateway-service (p90 306.25ms->5537.50ms, +1708.2%) and ts-ui-dashboard (p90 305.62ms->5487.50ms, +1695.5%) showing the same added delay. Service dependency chain is browser -> ts-ui-dashboard -> ts-gateway-service -> ts-preserve-service -> 10 downstream services, and every one of ts-preserve-service's downstream services stays clean, while ts-preserve-service's own p50 increase (+7

### case-9

- **结论**：`app/ts-price-service` + `pod_network_delay` ｜ 标签 `app/ts-price-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 343,666
- **摘要**：Alerts are latency-only (no saturation rows) on 6 services: ts-price-service p50 5.95ms->2436.17ms (+40864.7%) / p90 9.19->4476.74ms, ts-basic-service p50 38.70->3750ms, ts-travel-service p90 152.45->4463.41ms, ts-preserve-service p50 389.83->7500ms, ts-gateway-service p90 325.74->5344.44ms, ts-ui-dashboard p90 331.76->5052.63ms. The alerted set is exactly the caller closure of ts-price-service: dependency graph shows ts-price-service is a LEAF (no downstream) called only by ts-gateway-service and ts-basic-service; basic's other downstreams (route/station/train) are completely clean, which exc

