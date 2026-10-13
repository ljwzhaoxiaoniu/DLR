# 评测明细 · train-ticket/performance — cloudopsbench

> 本家族已跑 **47/47** 题：JRA ✅46 ❌1 ｜ 证据链全闭 46 ｜ token 中位 304,738 ｜ 生成 2026-10-13T15:40:50.356Z
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
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 304,738 | 0 | 0 | 1013_1645_inorder4-v3b24 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 356,222 | 0 | 0 | 1013_1805_inorder4-v3b26 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 25 | 850,385 | 0 | 0 | 1013_1825_dual2-verify1 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 207,450 | 0 | 0 | 1013_1831_inorder4-v3b29 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1818 | 23 | 395,607 | 0 | 0 | 1013_1839_inorder4-v3b31 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 197,634 | 0 | 0 | 1013_1855_multi2-verify1 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 188,088 | 0 | 0 | 1013_1955_inorder4-v3b34 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 195,228 | 0 | 0 | 1013_2000_inorder4-v3b35 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 258,590 | 0 | 0 | 1013_2004_inorder4-v3b36 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 13 | 184,004 | 0 | 0 | 1013_2008_inorder4-v3b37 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 213,402 | 0 | 0 | 1013_2012_inorder4-v3b38 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 258,331 | 0 | 0 | 1013_2042_inorder4-v3b39 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 28 | 625,309 | 0 | 0 | 1013_2059_lmdecoy-verify1 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 150,648 | 0 | 0 | 1013_2059_inorder4-v3b41 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1538 | 14 | 343,773 | 0 | 0 | 1013_2106_inorder4-v3b42 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 322,359 | 0 | 0 | 1013_2110_inorder4-v3b43 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 11 | 185,640 | 0.1 | 0 | 1013_2133_perf26-verify1 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 160,103 | 0 | 0 | 1013_2133_inorder4-v3b45 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 206,042 | 0 | 0 | 1013_2141_inorder4-v3b46 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 700,398 | 0 | 0 | 1013_2150_inorder4-v3b47 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2609 | 24 | 524,234 | 0 | 0 | 1013_2203_ttperf30-verify1 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1818 | 23 | 345,078 | 0 | 0 | 1013_2203_inorder4-v3b49 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 236,382 | 0 | 0 | 1013_2210_inorder4-v3b50 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 335,749 | 0 | 0 | 1013_2214_inorder4-v3b51 | 全对·链闭 |
| [34](#case-34) | 0 | 1 | 0 | 0.5 | 0.5 | 0 | 0.0732 | 42 | 1,529,218 | 0 | 0 | 1013_2217_inorder4-v3b52 | 未命中 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 111,650 | 0 | 0 | 1013_2229_inorder4-v3b53 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 264,687 | 0 | 0 | 1013_2235_inorder4-v3b54 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 223,685 | 0 | 0 | 1013_2240_inorder4-v3b55 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 461,392 | 0 | 0 | 1013_2245_inorder4-v3b56 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 540,637 | 0 | 0 | 1013_2249_inorder4-v3b57 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.15 | 21 | 299,756 | 0 | 0 | 1013_2253_inorder4-v3b58 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 216,649 | 0 | 0 | 1013_2258_inorder4-v3b59 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 25 | 359,493 | 0 | 0 | 1013_2303_inorder4-v3b60 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 142,097 | 0 | 0 | 1013_2308_inorder4-v3b61 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 333,677 | 0 | 0 | 1013_2311_inorder4-v3b62 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 367,029 | 0 | 0 | 1013_2315_inorder4-v3b63 | 全对·链闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1538 | 27 | 845,040 | 0 | 0 | 1013_2320_inorder4-v3b64 | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 472,209 | 0 | 0 | 1013_2331_ttperf47-verify1 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/ts-basic-service` + `pod_network_delay` ｜ 标签 `app/ts-basic-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 36 · tokens 442,283
- **raw 日志**：[results/1012_1512_inorder4-v3b3/raw/1012_1516_trainticket-performance-1](../results/1012_1512_inorder4-v3b3/raw/1012_1516_trainticket-performance-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Telemetry-chain case: all 48 pods Running 2/2 with no crashloops, all deployments 1/1, TCP connectivity to ts-basic-service:15680 / ts-travel-service:12346 / ts-preserve-service:14568 succeeded from all three workers, all nodes Ready with no pressure/taints and kubelet/kube-proxy/containerd active, and no error logs in any queried service (pure latency, zero errors/restarts). Within the single window 14:21:06-14:22:56 the alerts show the call chain ui-dashboard -> gateway -> preserve -> travel -> basic degrading in a monotone cascade: ts-basic-service p50 36.38ms -> 7327.59ms (+20039.9%, p90 4

### case-2

- **结论**：`app/ts-contacts-service` + `pod_network_delay` ｜ 标签 `app/ts-contacts-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1818 · steps 23 · tokens 294,060
- **raw 日志**：[results/1013_1122_inorder4-v3b9/raw/1013_1125_trainticket-performance-2](../results/1013_1122_inorder4-v3b9/raw/1013_1125_trainticket-performance-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (14:37:43~14:39:38) hit exactly the transitive caller chain of ts-contacts-service: ts-contacts-service (p50 7.52ms -> 4750ms, +63081%; RPS 1.56 -> 0.53, -66.1%), plus its callers ts-preserve-service (p50 202ms -> 7500ms), ts-gateway-service (p90 199ms -> 5318ms) and ts-ui-dashboard (p90 199ms -> 4927ms). GetServiceDependencies confirms ui-dashboard -> gateway -> preserve -> contacts, and since gateway fans out to 37 downstreams and preserve to 10, only a break at the leaf ts-contacts-service can explain the alerted set. Object layer is fully clean: all pods Running/Ready, ts-contacts-s

### case-3

- **结论**：`app/ts-food-service` + `pod_network_delay` ｜ 标签 `app/ts-food-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1379 · steps 30 · tokens 453,560
- **raw 日志**：[results/1013_1225_inorder4-v3b11/raw/1013_1228_trainticket-performance-3](../results/1013_1225_inorder4-v3b11/raw/1013_1228_trainticket-performance-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Telemetry chain closure: 4 identical-window (2026-03-16 14:54:22~14:56:12) LATENCY_DEGRADATION alerts, all on the single call chain ui-dashboard -> gateway-service -> preserve-service -> food-service, with ts-food-service the leaf and worst hit (p50 17.70ms -> 7500.00ms, +42269.3%; p90 23.86ms -> 9500.00ms, Current=Peak), inherited by preserve-service (p50 218.62 -> 7500ms), gateway-service (p90 215.02 -> 5465.52ms) and ui-dashboard (p90 211.96 -> 5107.14ms). Object layer excluded: all 49 pods Running with 0 restarts, ts-food-service pod 2/2 Ready, ContainersReady=True, no last termination sta

### case-4

- **结论**：`app/ts-gateway-service` + `pod_network_delay` ｜ 标签 `app/ts-gateway-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2381 · steps 22 · tokens 346,155
- **raw 日志**：[results/1013_1328_quality-verify1/raw/1013_1328_trainticket-performance-4](../results/1013_1328_quality-verify1/raw/1013_1328_trainticket-performance-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (metric surface) show LATENCY_DEGRADATION only on ts-gateway-service (p50 27.03ms -> 1928.57ms, +7035.6%; p90 204.84 -> 8000.00ms) and on its only caller ts-ui-dashboard (p50 29.71ms -> 1928.57ms, the identical added ~1.9s), while all 38 downstream services of the gateway stay free of latency degradation and no RESOURCE_SATURATION rows exist. The object layer is clean/exclusionary: all pods Running, READY 2/2, RESTARTS 0, nodes Ready with no taints, no FailedCreate/FailedScheduling/FailedMount/image-pull events in the 15:11-15:12 alert window, gateway Service selector app=ts-gateway-ser

### case-5

- **结论**：`app/ts-inside-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-inside-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 224,570
- **raw 日志**：[results/1013_1413_inorder4-v3b15/raw/1013_1414_trainticket-performance-5](../results/1013_1413_inorder4-v3b15/raw/1013_1414_trainticket-performance-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service quality degradation.' enters the metric surface: GetAlerts shows no RESOURCE_SATURATION rows, only latency degradation on the single call chain ts-ui-dashboard -> ts-gateway-service -> ts-cancel-service -> ts-inside-payment-service. The deepest node of that chain, ts-inside-payment-service, has the largest anomaly (p50 22.93ms -> 7166.67ms, +31154.5%; p90 64.29ms -> 20333.33ms, +31529.5%), and its callers inherit the same added delay (ts-cancel-service p90 150.77ms -> 21666.67ms +14270.8%; ts-gateway-service p90 +3851.6%; ts-ui-dashboard p90 +4305.0%), while its own downstream

### case-6

- **结论**：`app/ts-order-service` + `pod_network_delay` ｜ 标签 `app/ts-order-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 301,957
- **raw 日志**：[results/1013_1520_inorder4-v3b17/raw/1013_1521_trainticket-performance-6](../results/1013_1520_inorder4-v3b17/raw/1013_1521_trainticket-performance-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metric-surface incident: GetAlerts shows LATENCY_DEGRADATION on the preserve-booking path only (ts-order-service p50 9.44ms->3881.58ms, ts-seat-service 17.65->3906.25ms, ts-security-service 39.11->3750.00ms, ts-travel-service p90 98.74->11000ms, ts-preserve-service p50 295.1->30000ms, ts-gateway-service p90 227.8->39000ms, ts-ui-dashboard p90 229.6->34500ms) plus a cluster-wide ~50-70% pps 'Network Drop' on every service. Object layer is excluded: all pods Running/READY 2/2, RESTARTS 0, nodes Ready with no taints/pressure, namespace events contain no mechanism Warnings (no FailedCreate/FailedM

### case-7

- **结论**：`app/ts-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2083 · steps 25 · tokens 319,046
- **raw 日志**：[results/1013_1536_inorder4-v3b19/raw/1013_1537_trainticket-performance-7](../results/1013_1536_inorder4-v3b19/raw/1013_1537_trainticket-performance-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metrics-surface incident (L3 wording 'Service quality degradation.'): GetAlerts shows LATENCY_DEGRADATION on ts-payment-service (p50 16.96ms -> 5000.00ms, +29389%; p90 23.79ms -> 9000.00ms, Peak 9136.36ms) mirrored by its caller ts-inside-payment-service (p90 89.68ms -> 8488.44ms), plus a mild RESOURCE_SATURATION [cpu_cfs] 0.073s row on ts-order-service within the same 16:01:06-16:02:56 window. Topology: ts-inside-payment-service -> ts-payment-service (leaf, no downstream). The ~5s added latency rides on ts-payment-service's own latency (p50 current is exactly 5000.00ms) and its caller sees th

### case-8

- **结论**：`app/ts-preserve-service` + `pod_network_delay` ｜ 标签 `app/ts-preserve-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 270,805
- **raw 日志**：[results/1013_1623_inorder4-v3b21/raw/1013_1624_trainticket-performance-8](../results/1013_1623_inorder4-v3b21/raw/1013_1624_trainticket-performance-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts report pure LATENCY_DEGRADATION [Slow Response] with zero RESOURCE_SATURATION rows: ts-preserve-service p50 376.71ms->7500.00ms (+1890.9%) and p90 562.50ms->9750.00ms (+1633.3%), with its upstream callers ts-gateway-service (p90 306.25ms->5537.50ms, +1708.2%) and ts-ui-dashboard (p90 305.62ms->5487.50ms, +1695.5%) showing the same added delay. Service dependency chain is browser -> ts-ui-dashboard -> ts-gateway-service -> ts-preserve-service -> 10 downstream services, and every one of ts-preserve-service's downstream services stays clean, while ts-preserve-service's own p50 increase (+7

### case-9

- **结论**：`app/ts-price-service` + `pod_network_delay` ｜ 标签 `app/ts-price-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 343,666
- **raw 日志**：[results/1013_1633_inorder4-v3b23/raw/1013_1634_trainticket-performance-9](../results/1013_1633_inorder4-v3b23/raw/1013_1634_trainticket-performance-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts are latency-only (no saturation rows) on 6 services: ts-price-service p50 5.95ms->2436.17ms (+40864.7%) / p90 9.19->4476.74ms, ts-basic-service p50 38.70->3750ms, ts-travel-service p90 152.45->4463.41ms, ts-preserve-service p50 389.83->7500ms, ts-gateway-service p90 325.74->5344.44ms, ts-ui-dashboard p90 331.76->5052.63ms. The alerted set is exactly the caller closure of ts-price-service: dependency graph shows ts-price-service is a LEAF (no downstream) called only by ts-gateway-service and ts-basic-service; basic's other downstreams (route/station/train) are completely clean, which exc

### case-10

- **结论**：`app/ts-route-service` + `pod_network_delay` ｜ 标签 `app/ts-route-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 304,738
- **raw 日志**：[results/1013_1645_inorder4-v3b24/raw/1013_1646_trainticket-performance-10](../results/1013_1645_inorder4-v3b24/raw/1013_1646_trainticket-performance-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP for this wording says the signal is on the metric surface: alerts first, object layer only for exclusion. GetAlerts returns 18 abnormal services with NO RESOURCE_SATURATION row (latency/throughput/traffic only). The unique outlier is ts-route-service: p50 7.55ms -> 8026.32ms (+106152.5%, peak 9791.67ms), p90 9.60ms -> 21000ms (+218729.8%) — i.e. a constant ~8s delay added onto its own server-side latency. GetServiceDependencies shows ts-route-service is a LEAF node with no downstream calls, so its latency jump cannot be inherited from anything it calls, while every other latency-degrade

### case-11

- **结论**：`app/ts-seat-service` + `pod_network_delay` ｜ 标签 `app/ts-seat-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 356,222
- **raw 日志**：[results/1013_1805_inorder4-v3b26/raw/1013_1806_trainticket-performance-11](../results/1013_1805_inorder4-v3b26/raw/1013_1806_trainticket-performance-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts surface (metric chain per L3): 5 LATENCY_DEGRADATION rows, no RESOURCE_SATURATION. ts-seat-service is the most anomalous and the only one with THROUGHPUT_DROP: p50 19.72ms -> 3065.48ms (+15445.4%), p90 66.40 -> 4613.10ms, RPS 2.30 -> 0.44 (-81.0%). Dependency graph shows ui-dashboard -> gateway -> {preserve, travel} -> seat, so the alerted set is exactly ts-seat-service plus every caller that calls it (ts-preserve-service p50 463.24 -> 8416.67ms; ts-travel-service p90 209.04 -> 8925.00ms; ts-gateway-service p90 372.82 -> 5860.00ms; ts-ui-dashboard p90 391.18 -> 5800.00ms), while seat's 

### case-12

- **结论**：`app/ts-security-service` + `pod_network_delay` ｜ 标签 `app/ts-security-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 25 · tokens 850,385
- **raw 日志**：[results/1013_1825_dual2-verify1/raw/1013_1825_trainticket-performance-12](../results/1013_1825_dual2-verify1/raw/1013_1825_trainticket-performance-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (window 17:24:33~17:26:28) show LATENCY_DEGRADATION on a single call chain ui-dashboard(p90 431->5205ms) -> gateway-service(p90 435->5128ms) -> preserve-service(p50 483->7443ms, +1442%) -> ts-security-service; the deepest alerted service and the largest deviation is ts-security-service (p50 100.00ms->7027.09ms, +6927.1%; p90 425->9405ms), and its caller preserve-service shows the SAME added delay (+6961ms), i.e. a constant delay riding on ts-security-service's own latency with the downstream server-side latency clean (ts-order-service carries no latency alert). Application-side logs pro

### case-13

- **结论**：`app/ts-station-service` + `pod_network_delay` ｜ 标签 `app/ts-station-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 207,450
- **raw 日志**：[results/1013_1831_inorder4-v3b29/raw/1013_1832_trainticket-performance-13](../results/1013_1831_inorder4-v3b29/raw/1013_1832_trainticket-performance-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service quality degradation.' enters the metric surface: GetAlerts (all rows in the same 2026-03-16 17:41:15~17:43:10 window) shows latency/throughput anomalies only - NO RESOURCE_SATURATION rows - so this is not a resource fault. Dependency chain ts-ui-dashboard -> ts-gateway-service -> ts-preserve-service -> ts-travel-service -> ts-basic-service -> ts-station-service identifies ts-station-service as the deepest node of the call direction and the carrier of the largest deviation: p50 3.31ms -> 2477.27ms (+74810.0%), p90 6.64 -> 4492.19ms, while it is a Leaf Node (GetServiceDependenci

### case-14

- **结论**：`app/ts-train-service` + `pod_network_delay` ｜ 标签 `app/ts-train-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1818 · steps 23 · tokens 395,607
- **raw 日志**：[results/1013_1839_inorder4-v3b31/raw/1013_1840_trainticket-performance-14](../results/1013_1839_inorder4-v3b31/raw/1013_1840_trainticket-performance-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metric-surface case: 7 alerts in window 2026-03-16 17:57:56~17:59:46. ts-train-service (a call-graph LEAF: 'Upstream: gateway/travel/travel2/basic/travel-plan/rebook; Downstream: (Leaf Node - No downstream calls)') carries by far the largest deviation: p50 6.71ms->2453.12ms (+36478.3%), p90 9.67ms->4483.33ms (+46258.5%), and every other latency alert is one of its callers (ts-basic-service +9346% p50, ts-travel-service +1964% p90, ts-preserve-service +1400% p50, ts-gateway-service +983.8%, ts-ui-dashboard +960.6%), i.e. the added delay accumulates hop-by-hop (leaf +2.4s -> basic +3.7s -> trave

### case-15

- **结论**：`app/ts-travel-service` + `pod_network_delay` ｜ 标签 `app/ts-travel-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 197,634
- **raw 日志**：[results/1013_1855_multi2-verify1/raw/1013_1855_trainticket-performance-15](../results/1013_1855_multi2-verify1/raw/1013_1855_trainticket-performance-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (window 18:14:37~18:16:27) show one runaway deviation: ts-travel-service p50 7.50ms->2252.04ms (+29927.2%), p90 189.01ms->8913.17ms (+4615.7%); its callers ts-preserve-service (+1550.2%), ts-gateway-service (+1174.4%), ts-ui-dashboard (+1195.0%) rise only as ripples, and its two direct downstreams ts-basic-service (+2615.8%) and ts-seat-service (+1870.9%) are also lifted, so the common denominator is ts-travel-service's own network path. The delay is not in code: travel's raw logs show each seat call handled internally in ~13-30ms. It is not a node-scope fault: all 4 nodes are Ready wit

### case-16

- **结论**：`app/ts-user-service` + `pod_network_delay` ｜ 标签 `app/ts-user-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 188,088
- **raw 日志**：[results/1013_1955_inorder4-v3b34/raw/1013_1956_trainticket-performance-16](../results/1013_1955_inorder4-v3b34/raw/1013_1956_trainticket-performance-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metric-surface case under 'Service quality degradation.': 6 alerts in window 20:30:12~20:32:02. The epicenter (runaway deviation) is ts-user-service: p50 7.44ms->2500.00ms (+33513.4%), p90 9.58ms->4500.00ms (+46868.0%), dwarfing every other row. All other latency alerts are caller ripples on PAS edges into it (ts-gateway-service +772.8%, ts-cancel-service +3325.9%, ts-preserve-service +500%, ts-ui-dashboard +830.4%), consistent with the dependency graph ts-gateway-service/ts-preserve-service/ts-preserve-other-service/ts-cancel-service -> ts-user-service -> ts-auth-service. The latency shift is

### case-17

- **结论**：`app/ts-assurance-service` + `pod_network_delay` ｜ 标签 `app/ts-assurance-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 195,228
- **raw 日志**：[results/1013_2000_inorder4-v3b35/raw/1013_2000_trainticket-performance-17](../results/1013_2000_inorder4-v3b35/raw/1013_2000_trainticket-performance-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name ts-assurance-service with LATENCY_DEGRADATION [Slow Response]: p90 7.86ms -> 2112.50ms (+26762.9%), peak 2167.35ms - a fixed ~2.1s additive delay on that service's own latency, with no saturation row of its own; the only other alert is a bare RESOURCE_SATURATION [cpu_cfs] 0.255s on ts-order-service, which has no latency deviation of its own (collateral noise per L3). ts-assurance-service is a leaf service (GetServiceDependencies: no downstream calls), so no downstream server-side latency can explain the shift; TCP connectivity to ts-assurance-service:18888 succeeds from worker-01/0

### case-18

- **结论**：`app/ts-basic-service` + `pod_network_delay` ｜ 标签 `app/ts-basic-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 258,590
- **raw 日志**：[results/1013_2004_inorder4-v3b36/raw/1013_2005_trainticket-performance-18](../results/1013_2004_inorder4-v3b36/raw/1013_2005_trainticket-performance-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts shows a single runaway epicenter: ts-basic-service p50 38.94ms -> 6806.17ms (+17377.7%) and p90 52.50ms -> 9361.24ms (+17730.9%) with RPS -54.1%, dwarfing its callers' ripples (ts-preserve-service +2233.3%, ts-travel-service p90 +2501.7%) which are all upstream callers of ts-basic-service per GetServiceDependencies. A constant added delay (~6.8-9.3s) rides on that service's own latency while its downstream services (ts-route-service, ts-station-service, ts-train-service, ts-price-service) stay clean and it carries no saturation row; its own container logs show ms-level processing (21

### case-19

- **结论**：`app/ts-cancel-service` + `pod_network_delay` ｜ 标签 `app/ts-cancel-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 13 · tokens 184,004
- **raw 日志**：[results/1013_2008_inorder4-v3b37/raw/1013_2010_trainticket-performance-19](../results/1013_2008_inorder4-v3b37/raw/1013_2010_trainticket-performance-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (2026-03-19 21:20:14~21:22:09) show ts-cancel-service as the runaway epicenter: p50 81.78ms -> 2740.39ms (+3250.9%), p90 240.83ms -> 7433.33ms (+2986.5%), dwarfing its callers' ripple rises (ts-gateway-service +171.6%, ts-ui-dashboard +195.2%, ts-inside-payment-service +332.3%). No RESOURCE_SATURATION alert on ts-cancel-service; the only saturation row is a bare 'RESOURCE_SATURATION [cpu_cfs] Val: 0.306s (Throttled)' on ts-order-service, which carries no latency alert of its own (collateral noise, not the epicenter). Symptom side: ts-cancel-service container logs show a complete cancel 

### case-20

- **结论**：`app/ts-contacts-service` + `pod_network_delay` ｜ 标签 `app/ts-contacts-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 213,402
- **raw 日志**：[results/1013_2012_inorder4-v3b38/raw/1013_2029_trainticket-performance-20](../results/1013_2012_inorder4-v3b38/raw/1013_2029_trainticket-performance-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts in window 21:36:59~21:38:49: ts-contacts-service carries the runaway deviation (LATENCY_DEGRADATION p50 7.57ms->4930.56ms +65011.3%, p90 9.65ms->8977.02ms +92950.2%), while its callers show only ripples of the same added delay - ts-gateway-service p90 980.77ms->5819.44ms (+4838ms, +493.4%), ts-ui-dashboard p90 982.00ms->5805.56ms (+4823ms, +491.2%), ts-preserve-service p50 1219.98ms->7500.00ms (+514.8%). GetServiceDependencies confirms ts-contacts-service is a leaf (Downstream: none) called by ts-gateway-service/ts-preserve-service/ts-preserve-other-service, matching the ripple topology

### case-21

- **结论**：`app/ts-food-service` + `pod_network_delay` ｜ 标签 `app/ts-food-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 258,331
- **raw 日志**：[results/1013_2042_inorder4-v3b39/raw/1013_2044_trainticket-performance-21](../results/1013_2042_inorder4-v3b39/raw/1013_2044_trainticket-performance-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name ts-food-service as the primary anomaly: LATENCY_DEGRADATION with p50 17.50ms->7500.00ms (+42757.1%) and p90 23.50ms->9500.00ms (+40325.5%), an order of magnitude larger than the ripple rises of its callers ts-preserve-service (+556.4%), ts-gateway-service (+468.1%) and ts-ui-dashboard (+422.0%), whose dependency graph (GetServiceDependencies) shows ts-gateway-service/ts-preserve-service as upstream callers of ts-food-service. Its downstream services (ts-travel-service, ts-station-food-service, ts-train-food-service) show clean server-side latencies, and ts-food-service has no satur

### case-22

- **结论**：`app/ts-gateway-service` + `pod_network_delay` ｜ 标签 `app/ts-gateway-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 28 · tokens 625,309
- **raw 日志**：[results/1013_2059_lmdecoy-verify1/raw/1013_2059_trainticket-performance-22](../results/1013_2059_lmdecoy-verify1/raw/1013_2059_trainticket-performance-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service quality degradation.' lives on the metric surface (L3 exact match): 21 alerts in one window 22:10:28-22:12:18 show a whole-system Network Drop sweep (in/out pps -40%~-66% on every service, THROUGHPUT_DROP [RPS] -60%~-78%) with NO saturation row and no genuine latency row (only a LATENCY_MISSING collection hole on ts-payment-service). The dependency graph is browser -> ts-ui-dashboard -> ts-gateway-service -> all 38 backends, so ts-gateway-service is the point every request flows through and carries the system's total traffic (Inbound 667.58 pps, max of all services) plus the r

### case-23

- **结论**：`app/ts-inside-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-inside-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 150,648
- **raw 日志**：[results/1013_2059_inorder4-v3b41/raw/1013_2102_trainticket-performance-23](../results/1013_2059_inorder4-v3b41/raw/1013_2102_trainticket-performance-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts identify ts-inside-payment-service as the primary anomaly (epicenter): its own p50 latency went 42.42ms -> 13725.49ms (+32253.1%) and p90 196.00ms -> 26745.10ms (+13545.5%, peak 27400ms) with RPS 1.01 -> 0.29 (-71.0%) - a runaway deviation far larger than its callers' ripples (ts-cancel-service p90 +4925.6%, ts-gateway-service p90 +868.8%, ts-ui-dashboard p90 +1292.9%), confirming it as the source, not the victim of propagation. Its downstream callees (ts-payment-service, ts-order-service, ts-order-other-service) show no server-side latency rows, and there is no saturation row on ts-ins

### case-24

- **结论**：`app/ts-order-service` + `pod_network_delay` ｜ 标签 `app/ts-order-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1538 · steps 14 · tokens 343,773
- **raw 日志**：[results/1013_2106_inorder4-v3b42/raw/1013_2107_trainticket-performance-24](../results/1013_2106_inorder4-v3b42/raw/1013_2107_trainticket-performance-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show a system-wide traffic collapse (gateway inbound 638.12->196.54pps -69.2%, ui-dashboard -66.6%, RPS -58%~-71% everywhere) plus a localized latency blow-up whose runaway deviation sits on ts-order-service: p50latency 134.03ms -> 4637.29ms (+3359.9%, Peak 60000ms) and p90latency 1999.56ms -> 19476.20ms (+874.0%, Peak 252000ms) - far beyond its callers' rises (gateway p90 +114.5%, travel p90 +373.0%, preserve p50 +629.6%) and beyond ts-seat-service (p50 +17124.6% but p90 only +595%). Dependency graph shows ts-order-service is a leaf core (upstream: gateway/preserve/seat/security/inside

### case-25

- **结论**：`app/ts-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 322,359
- **raw 日志**：[results/1013_2110_inorder4-v3b43/raw/1013_2112_trainticket-performance-25](../results/1013_2110_inorder4-v3b43/raw/1013_2112_trainticket-performance-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metric-surface wording: GetAlerts shows the epicenter is ts-payment-service with the runaway deviation — LATENCY_DEGRADATION p50 16.12ms -> 6477.27ms (+40069.1%), p90 23.25 -> 9295.45ms (+39880.5%) plus ERROR_SPIKE success 100% -> 81.7%; its caller ts-inside-payment-service shows only the rippled rise (p90 518.75 -> 7625ms, +1369.9%), and ts-order-service's bare RESOURCE_SATURATION cpu_cfs 0.836s row carries no latency of its own (collateral noise, not the case). GetServiceDependencies(ts-payment-service) shows it is a LEAF ('No downstream calls'), so nothing downstream can explain its own 40x

### case-26

- **结论**：`app/ts-preserve-service` + `pod_network_delay` ｜ 标签 `app/ts-preserve-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 11 · tokens 185,640
- **raw 日志**：[results/1013_2133_perf26-verify1/raw/1013_2133_trainticket-performance-26](../results/1013_2133_perf26-verify1/raw/1013_2133_trainticket-performance-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts in window 11:46:04~11:47:54 show ts-preserve-service as the only LATENCY_DEGRADATION row moving BOTH percentiles (p50 3571.43ms->8453.99ms +136.7%, p90 10500.00ms->23627.85ms +125.0%) = the epicenter; ts-basic-service and ts-food-service moved only p90 (49.15->1145.55ms, 23.50->1750.00ms) i.e. partial-traffic ripples, and every one of them is a direct graph neighbor of ts-preserve-service (GetServiceDependencies: downstream ts-basic/ts-food/ts-order/ts-assurance), so no quiet intermediate hop is needed. The ts-order-service cpu_cfs throttled row and the ts-assurance-service cpu core +68

### case-27

- **结论**：`app/ts-price-service` + `pod_network_delay` ｜ 标签 `app/ts-price-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 160,103
- **raw 日志**：[results/1013_2133_inorder4-v3b45/raw/1013_2135_trainticket-performance-27](../results/1013_2133_inorder4-v3b45/raw/1013_2135_trainticket-performance-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service quality degradation.' lives on the metric surface (L3 exact-hit: alerts name the case, object layer only excludes). GetAlerts (12:02:47~12:04:42) shows LATENCY_DEGRADATION with BOTH percentiles moving on ts-price-service (p50 7.50->3216.46ms +42786%, p90 9.62->4643.29ms +48187% - the steepest p90 escalation) and on ts-basic-service (p50 39.75->3750ms, p90 69.29->4750ms); ts-travel-service (p90 only 1927->4487ms) and ts-preserve-service (p50 only 2291->7500ms) moved a single percentile, i.e. partial-traffic ripples. ts-food-service (cpu core 0.01->0.02) and ts-order-service (cp

### case-28

- **结论**：`app/ts-route-service` + `pod_network_delay` ｜ 标签 `app/ts-route-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 206,042
- **raw 日志**：[results/1013_2141_inorder4-v3b46/raw/1013_2144_trainticket-performance-28](../results/1013_2141_inorder4-v3b46/raw/1013_2144_trainticket-performance-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (metric surface) show latency degradation on ts-route-service with BOTH percentiles moving (p50 7.66ms->8224.79ms, p90 9.78ms->21100.00ms, steepest p90 escalation +215624.4%), on ts-basic-service with both percentiles moving (p50 40.22ms->18501.83ms, p90 72.00ms->27700.37ms), and on ts-travel-service with p90 only (partial-traffic ripple). GetServiceDependencies shows ts-route-service is a LEAF (no downstream calls) whose upstream callers are exactly ts-basic-service and ts-travel-service, i.e. every rippling row is a direct neighbor of ts-route-service; the alternative candidate ts-bas

### case-29

- **结论**：`app/ts-seat-service` + `pod_network_delay` ｜ 标签 `app/ts-seat-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 700,398
- **raw 日志**：[results/1013_2150_inorder4-v3b47/raw/1013_2153_trainticket-performance-29](../results/1013_2150_inorder4-v3b47/raw/1013_2153_trainticket-performance-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (12:36:16-12:38:06) show ts-seat-service as the only entity whose latency row moves BOTH percentiles (p50 222.24->3409.09ms, p90 1689.06->4727.27ms) with a fixed added increment (~+3187ms p50 / +3038ms p90) - the constant-delay signature; ts-travel-service moves only p90 (+303.9%) and ts-preserve-service only p50, i.e. partial-traffic ripples. GetServiceDependencies closes the graph: both ripples are DIRECT upstream callers of ts-seat-service, so no quiet intermediate hop is needed, while any order-service-centric source would require one. The only saturation row (RESOURCE_SATURATION cp

### case-30

- **结论**：`app/ts-security-service` + `pod_network_delay` ｜ 标签 `app/ts-security-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2609 · steps 24 · tokens 524,234
- **raw 日志**：[results/1013_2203_ttperf30-verify1/raw/1013_2203_trainticket-performance-30](../results/1013_2203_ttperf30-verify1/raw/1013_2203_trainticket-performance-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts: 5 rows in window 2026-03-20 12:52:59-12:54:54, all RESOURCE_SATURATION (sub-core, e.g. ts-user-service cpu core 0.01->0.02 cores, ts-order-service 'cpu_cfs Val: 0.732s (Throttled)'), with NO latency row anywhere in the set. Per the L3 rule for this wording (metric surface, alerts first) a bare cpu_cfs with no normal shows no movement and sub-core percentages are sub-noise; the only row carrying a deviation beyond saturation is ts-security-service's TRAFFIC_ANOMALY [Network Surge] Inbound Normal=5.06pps -> Current=12.71pps (+151.4%), Outbound Normal=5.37pps -> Current=13.41pps (+149.

### case-31

- **结论**：`app/ts-station-service` + `pod_network_delay` ｜ 标签 `app/ts-station-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1818 · steps 23 · tokens 345,078
- **raw 日志**：[results/1013_2203_inorder4-v3b49/raw/1013_2206_trainticket-performance-31](../results/1013_2203_inorder4-v3b49/raw/1013_2206_trainticket-performance-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (13:09:43~13:11:38) show two latency rows whose p50 AND p90 both move: ts-station-service (p50 3.86ms->3105.56ms, +80417%; p90 8.56ms->4618.16ms, +53875.7%, the steepest p90 escalation) and ts-basic-service (p50 38.75->7500ms; p90 49.75->9500ms); ts-travel-service moves its p90 only (partial-traffic ripple). GetServiceDependencies closes the graph: ts-station-service is a LEAF called by ts-gateway-service and ts-basic-service, whereas ts-basic-service calls ts-station-service — an upstream/caller delay cannot raise the server-side latency of a downstream leaf, so the two both-percentile

### case-32

- **结论**：`app/ts-train-service` + `pod_network_delay` ｜ 标签 `app/ts-train-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 236,382
- **raw 日志**：[results/1013_2210_inorder4-v3b50/raw/1013_2212_trainticket-performance-32](../results/1013_2210_inorder4-v3b50/raw/1013_2212_trainticket-performance-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show two both-percentile latency rows: ts-train-service (p50 7.38ms->2425ms, p90 9.48ms->4472ms, +47095% p90 escalation = steepest) and its direct caller ts-basic-service (p50 38.33ms->3750ms, p90 49ms->4750ms). ts-train-service is a leaf node in the dependency graph (GetServiceDependencies: no downstream), so the added delay sits on its own network path; ts-basic-service's other downstreams (ts-route-service, ts-station-service, ts-price-service) show clean server-side latency, so ts-basic is only the inheriting caller, not the source. Object layer is fully healthy (all pods Running 2/

### case-33

- **结论**：`app/ts-travel-service` + `pod_network_delay` ｜ 标签 `app/ts-travel-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 335,749
- **raw 日志**：[results/1013_2214_inorder4-v3b51/raw/1013_2215_trainticket-performance-33](../results/1013_2214_inorder4-v3b51/raw/1013_2215_trainticket-performance-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts shows 3 anomalies; only ts-travel-service carries a LATENCY_DEGRADATION row moving BOTH percentiles (p50 46.88ms->2416.67ms, +5055.6%; p90 2791.67ms->8944.44ms, +220.4%) plus a TRAFFIC_ANOMALY network surge (inbound 6.75pps->13.99pps, +107.2%), marking it the epicenter; ts-order-service's bare 'RESOURCE_SATURATION [cpu_cfs] Val: 0.859s (Throttled)' has no baseline movement and no latency of its own, and ts-security-service's 'cpu core 0.01 -> 0.02 cores (+64.6%)' is sub-core noise, so both are collateral. ts-travel-service logs show a constant ~1.4-1.5s gap between every downstream r

### case-34

- **结论**：`app/ts-security-service` + `pod_network_delay` ｜ 标签 `app/ts-user-service` + `pod_network_delay`（✗ 与标签不符）
- **流程**：MC 0.5 · EOC 0.5 · ECR 0 · EE 0.0732 · steps 42 · tokens 1,529,218
- **raw 日志**：[results/1013_2217_inorder4-v3b52/raw/1013_2218_trainticket-performance-34](../results/1013_2217_inorder4-v3b52/raw/1013_2218_trainticket-performance-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts: ts-ui-dashboard LATENCY_DEGRADATION [Slow Response] p90 0.00ms->194400.00ms (Peak 273840.30ms) plus ts-auth-service LATENCY_MISSING (a metric hole only: ts-auth-service's own logs show [getToken][success] logins in ~100ms inside the injection window, so it is not the fault). The dashboard (entry nginx) returned 504 'upstream timed out (110) while reading response header from upstream, upstream http://10.68.32.132:18888/...' only for POST /api/v1/preserveservice/preserve while contacts/travel/assurance/login all returned 200 within the same instants -> the slowdown is confined to the pr

### case-35

- **结论**：`app/ts-basic-service` + `pod_network_delay` ｜ 标签 `app/ts-basic-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 111,650
- **raw 日志**：[results/1013_2229_inorder4-v3b53/raw/1013_2231_trainticket-performance-35](../results/1013_2229_inorder4-v3b53/raw/1013_2231_trainticket-performance-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (6 rows, same window 22:28:53~22:31:28) name ts-basic-service as the epicenter: it is the only latency row moving BOTH percentiles (p50 38.97->6833.33ms +17434.4%, p90 53.89->9366.67ms +17281.4%) with the steepest p90 escalation; the other four latency rows move p90 only (ts-gateway-service +1626.8%, ts-travel-service +1445.6%, ts-ui-dashboard +1637.7%) or less steeply (ts-preserve-service), i.e. partial-traffic ripples. Topology closes it: every flagged service is a path through ts-basic-service (gateway->basic, preserve->basic, travel->basic, ui-dashboard->gateway->basic), while gatew

### case-36

- **结论**：`app/ts-contacts-service` + `pod_network_delay` ｜ 标签 `app/ts-contacts-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 264,687
- **raw 日志**：[results/1013_2235_inorder4-v3b54/raw/1013_2236_trainticket-performance-36](../results/1013_2235_inorder4-v3b54/raw/1013_2236_trainticket-performance-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (metric surface) carry a ~7.5-10s near-constant added delay riding on ts-contacts-service: it is the ONLY service whose p50 AND p90 both moved (p50 18.85ms -> 7500.00ms, +39683.6%; p90 92.28ms -> 10000.00ms, +10736.8%), i.e. the delay covers all of its traffic, and it carries the steepest p90 escalation - the epicenter. Its direct upstreams named by GetServiceDependencies (ts-gateway-service, ts-preserve-service) plus the front-end (ts-ui-dashboard) show p90-only latency rises (+1218.8% / +284.9% / +1253.9%) = partial-traffic ripple, while ts-contacts-service is a leaf with no downstrea

### case-37

- **结论**：`app/ts-food-service` + `pod_network_delay` ｜ 标签 `app/ts-food-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 21 · tokens 223,685
- **raw 日志**：[results/1013_2240_inorder4-v3b55/raw/1013_2241_trainticket-performance-37](../results/1013_2240_inorder4-v3b55/raw/1013_2241_trainticket-performance-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (22:57:16~22:59:51) show ts-food-service with BOTH percentiles deviating and the steepest escalation (p50 18.41ms->6829.27ms, +36997.4%; p90 28.75ms->9365.85ms, +32476.9%), marking it the epicenter; the other rows are ripples on its path (ts-gateway-service p90 only 1023.08->5250ms; ts-preserve-service p50 1812.50->7316.64ms; ts-ui-dashboard p90 941.99->5175ms), and ts-order-service's bare '[cpu_cfs] Val: 0.306s (Throttled)' carries no latency of its own -> collateral. GetServiceDependencies confirms ts-food-service's direct callers are exactly ts-gateway-service/ts-preserve-service/ts-

### case-38

- **结论**：`app/ts-inside-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-inside-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 461,392
- **raw 日志**：[results/1013_2245_inorder4-v3b56/raw/1013_2246_trainticket-performance-38](../results/1013_2245_inorder4-v3b56/raw/1013_2246_trainticket-performance-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name ts-inside-payment-service as the epicenter: LATENCY_DEGRADATION with BOTH percentiles moving (p50 363.23ms -> 8333.33ms, +2194.2%; p90 6184.73ms -> 22000.00ms, +255.7%) plus an INBOUND TRAFFIC SURGE (23.35pps -> 55.80pps, +139.0%). The second alert (ts-order-service, RESOURCE_SATURATION [cpu_cfs] 0.435s Throttled) is a bare saturation row with NO latency of its own, and ts-order-service is the epicenter's direct downstream neighbour (GetServiceDependencies: ts-inside-payment-service -> ts-payment-service, ts-order-service, ts-order-other-service) whose server-side latency stays cle

### case-39

- **结论**：`app/ts-order-service` + `pod_network_delay` ｜ 标签 `app/ts-order-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 540,637
- **raw 日志**：[results/1013_2249_inorder4-v3b57/raw/1013_2250_trainticket-performance-39](../results/1013_2249_inorder4-v3b57/raw/1013_2250_trainticket-performance-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：17 alerts in window 23:39:22-23:41:12: system-wide TRAFFIC_ANOMALY[Network Drop] plus LATENCY_DEGRADATION/THROUGHPUT_DROP, with NO RESOURCE_SATURATION row (not a saturation surface) and no restart/OOM/FailedScheduling/FailedMount mechanism events. Percentile shape isolates the epicenter: ts-gateway-service and ts-ui-dashboard moved only p90 (partial-traffic ripples), while ts-order-service (p50 308ms->9844ms, p90 2061ms->25875ms), ts-seat-service, ts-travel-service, ts-preserve-service and ts-security-service moved both p50 and p90. GetServiceDependencies shows ts-order-service is the deepest 

### case-40

- **结论**：`app/ts-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.15 · steps 21 · tokens 299,756
- **raw 日志**：[results/1013_2253_inorder4-v3b58/raw/1013_2254_trainticket-performance-40](../results/1013_2253_inorder4-v3b58/raw/1013_2254_trainticket-performance-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (23:53:35~23:55:25) name three entities: ts-payment-service LATENCY_DEGRADATION (p50 16.70ms->4464.29ms, p90 40.96ms->8722.22ms, Peak 9362ms), ts-inside-payment-service ERROR_SPIKE+LATENCY (success 100%->67.6%; p50 300.48->6048.39ms, p90 822.19->9209.68ms), ts-order-service RESOURCE_SATURATION [cpu_cfs] Val 0.560s (Throttled). Of the two both-percentile latency rows, ts-payment-service carries the steepest p90 escalation and the largest absolute deviation, i.e. the epicenter; ts-order-service is a bare saturation row with no latency of its own (collateral per the wording's rule). Graph:

### case-41

- **结论**：`app/ts-preserve-service` + `pod_network_delay` ｜ 标签 `app/ts-preserve-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 216,649
- **raw 日志**：[results/1013_2258_inorder4-v3b59/raw/1013_2259_trainticket-performance-41](../results/1013_2258_inorder4-v3b59/raw/1013_2259_trainticket-performance-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (GetAlerts) place the case on the metric surface: ts-preserve-service LATENCY_DEGRADATION p90 Normal=8983.07ms -> Current=22000.00ms (+144.9%, Peak 26000.00ms) is the steepest escalation = primary anomaly; ts-ui-dashboard p90 2732.14ms -> 5958.33ms (+118.1%) is its ripple; ts-order-service shows only a bare RESOURCE_SATURATION [cpu_cfs] 'Val: 0.375s (Throttled)' with no latency row of its own = collateral noise per L3. GetServiceDependencies closes it: ts-ui-dashboard -> ts-gateway-service -> ts-preserve-service (caller sees the same added delay), while ts-preserve-service's own downstr

### case-42

- **结论**：`app/ts-route-service` + `pod_network_delay` ｜ 标签 `app/ts-route-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 25 · tokens 359,493
- **raw 日志**：[results/1013_2303_inorder4-v3b60/raw/1013_2304_trainticket-performance-42](../results/1013_2303_inorder4-v3b60/raw/1013_2304_trainticket-performance-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (metric surface, per the exact-matched L3 rule) show latency rows on ts-route-service (p50 7.50ms->8103.45ms, p90 9.50ms->22000ms), ts-basic-service (40.00ms->16571.43ms / 72.69ms->27314.29ms), ts-preserve-service (5647.11->21250.00ms / 24126.89->51000.00ms) and a p90-only partial ripple on ts-travel-service, plus throughput/network-drop ripples (config, contacts, gateway, ui-dashboard) and a bare cpu_cfs throttle on ts-order-service with no latency of its own (collateral). GetServiceDependencies shows ts-route-service is a LEAF (no downstream calls) while ts-basic-service, ts-travel-se

### case-43

- **结论**：`app/ts-seat-service` + `pod_network_delay` ｜ 标签 `app/ts-seat-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 142,097
- **raw 日志**：[results/1013_2308_inorder4-v3b61/raw/1013_2309_trainticket-performance-43](../results/1013_2308_inorder4-v3b61/raw/1013_2309_trainticket-performance-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts point at a metric-surface case: ts-seat-service carries the runaway deviation (LATENCY_DEGRADATION p50 189.50ms -> 3341.67ms, +1663.4%, Peak=3522.73ms) with its own network traffic surge (in 10.52->28.20pps, out 10.97->24.51pps), i.e. a fixed ~3.1s delay added to ALL of its traffic (p50 moves, not just p90). Its direct upstream neighbor ts-travel-service shows only a p90 ripple (904.72 -> 8951.22ms) = partial-traffic ripple, while ts-ui-dashboard (RPS +130%) and ts-order-service (bare cpu_cfs 0.509s throttled + RPS +192%, with NO latency row of its own) are collateral noise that must no

### case-44

- **结论**：`app/ts-station-service` + `pod_network_delay` ｜ 标签 `app/ts-station-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 333,677
- **raw 日志**：[results/1013_2311_inorder4-v3b62/raw/1013_2313_trainticket-performance-44](../results/1013_2311_inorder4-v3b62/raw/1013_2313_trainticket-performance-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts (window 2026-03-16 01:18:55~01:20:50) gives the epicenter by row shape: ts-station-service LATENCY_DEGRADATION moves BOTH percentiles with the steepest p90 escalation (p50 6.99ms -> 2500.00ms +35691.0%, p90 26.79ms -> 4500.00ms +16694.8%, peak 4657.24ms). ts-basic-service shows the rippled p50+p90 (121.72->7607.14ms, 495.02->9925.22ms, peak 23294.12ms) and ts-preserve-service is pinned at the 20000.00ms RPC-timeout ceiling. GetServiceDependencies closes the graph: ts-station-service is a LEAF ('[Downstream (Calls)]: (Leaf Node)') called directly by ts-basic-service, which is called d

### case-45

- **结论**：`app/ts-train-service` + `pod_network_delay` ｜ 标签 `app/ts-train-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 367,029
- **raw 日志**：[results/1013_2315_inorder4-v3b63/raw/1013_2316_trainticket-performance-45](../results/1013_2315_inorder4-v3b63/raw/1013_2316_trainticket-performance-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metric-surface case per the L3 SOP: alerts are the signal, the object layer is only exclusion. Among 8 co-window alerts (2026-03-16 01:33~01:35), only ts-train-service shows a latency row where BOTH percentiles move on a real baseline: p50 8.35ms -> 2500.00ms (+29843.7%) and p90 411.79ms -> 4500.00ms (+992.8%, Peak 4594.14ms) - the runaway deviation and the steepest p90 escalation, marking the epicenter; ts-preserve-service's p50/p90 'New Spike' starts from a 0.00ms near-zero baseline (proves nothing) and ts-basic-service moves only p50 (partial ripple). GetServiceDependencies closes the graph

### case-46

- **结论**：`app/ts-travel-service` + `pod_network_delay` ｜ 标签 `app/ts-travel-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1538 · steps 27 · tokens 845,040
- **raw 日志**：[results/1013_2320_inorder4-v3b64/raw/1013_2321_trainticket-performance-46](../results/1013_2320_inorder4-v3b64/raw/1013_2321_trainticket-performance-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metric-surface entry chain (per the wording's alert-first discipline): in the injection window 2026-03-16 01:47:22~01:49:12 the alert set carries exactly ONE latency row — ts-travel-service LATENCY_DEGRADATION [Slow Response] p90 9.45ms -> 2121.88ms (+22357.3%, Peak 2181.07ms) — i.e. a fixed ~2.1s ADDITIVE delay on a near-zero baseline, the single runaway deviation; the dependency graph closes it: its direct neighbours are the ripples (ts-gateway-service THROUGHPUT_SURGE +319.2% RPS = caller retry storm; ts-ui-dashboard RPS +274.1% / success 78.9%->62.5%), while ts-order-service (cpu_cfs 0.671

### case-47

- **结论**：`app/ts-user-service` + `pod_network_delay` ｜ 标签 `app/ts-user-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 472,209
- **raw 日志**：[results/1013_2331_ttperf47-verify1/raw/1013_2331_trainticket-performance-47](../results/1013_2331_ttperf47-verify1/raw/1013_2331_trainticket-performance-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert-first per the 'Service quality degradation.' SOP (exact L3 match): only two LATENCY_DEGRADATION rows move BOTH p50 and p90 — ts-preserve-service (p50 0->4833.33ms, p90 0->8981.48ms, peak 41417.50ms) and ts-user-service (p50 0->2460.53ms, p90 0->4486.11ms, peak 4750.00ms); all other rows are ripple/collateral (gateway Inbound +249.8% / RPS +230.2%, contacts/seat/station/travel outbound surges, ui-dashboard cpu 0.01->0.03 cores, ts-order-service cpu_cfs 1.029s Throttled with no latency of its own, ts-auth-service sub-core 0.02->0.05 cores). Dependency graph shows ts-preserve-service -> ts-

