# 评测明细 · train-ticket/performance — cloudopsbench

> 本家族已跑 **21/47** 题：JRA ✅21 ❌0 ｜ 证据链全闭 21 ｜ token 中位 294,060 ｜ 生成 2026-10-13T12:48:02.877Z
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

