# 评测明细 · boutique/performance — cloudopsbench

> 本家族已跑 **29/29** 题：JRA ✅28 ❌1 ｜ 证据链全闭 28 ｜ token 中位 222,648 ｜ 生成 2026-10-14T05:24:30.653Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 127,303 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1852 | 28 | 289,569 | 0 | 0 | 1013_1134_inorder4-v3b10 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 134,179 | 0 | 0 | 1013_1343_inorder4-v3b14 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 146,989 | 0 | 0 | 1013_1524_inorder4-v3b18 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 234,408 | 0 | 0 | 1013_1541_inorder4-v3b20 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1379 | 30 | 293,289 | 0 | 0 | 1013_1628_inorder4-v3b22 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 156,035 | 0 | 0 | 1013_1656_inorder4-v3b25 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 170,422 | 0 | 0 | 1013_1810_inorder4-v3b27 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 187,540 | 0 | 0 | 1013_1834_inorder4-v3b30 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 22 | 188,689 | 0 | 0 | 1013_2331_inorder4-v3b66 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1364 | 23 | 231,341 | 0 | 0 | 1013_2337_inorder4-v3b67 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4118 | 18 | 145,538 | 0 | 0 | 1014_0009_inorder4-v3b69 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 125,328 | 0 | 0 | 1014_0012_inorder4-v3b70 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1071 | 57 | 1,016,010 | 0 | 0 | 1014_0016_inorder4-v3b71 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2174 | 24 | 232,678 | 0 | 0 | 1014_0021_inorder4-v3b72 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1852 | 28 | 286,169 | 0.037 | 0 | 1014_0029_inorder4-v3b73 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 28 | 318,825 | 0 | 0 | 1014_0035_inorder4-v3b74 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 21 | 145,925 | 0 | 0 | 1014_0935_l3fix2-verify2 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 21 | 105,777 | 0 | 0 | 1014_0046_inorder4-v3b76 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 137,699 | 0 | 0 | 1014_0048_inorder4-v3b77 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3182 | 23 | 172,807 | 0 | 0 | 1014_0051_inorder4-v3b78 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.087 | 47 | 1,023,978 | 0 | 0 | 1014_0054_inorder4-v3b79 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1481 | 28 | 247,891 | 0 | 0 | 1014_0104_inorder4-v3b80 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1 | 31 | 382,289 | 0 | 0 | 1014_0928_l3fix2-verify1 | 全对·链闭 |
| [25](#case-25) | 0 | 0 | 0 | 0.5 | 0.5 | 0 | 0.0732 | 42 | 798,117 | 0 | 0 | 1014_0928_l3fix2-verify1 | 未命中 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1304 | 24 | 222,648 | 0 | 0 | 1014_0122_inorder4-v3b83 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1034 | 30 | 312,461 | 0 | 0 | 1014_0124_inorder4-v3b84 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 85,057 | 0 | 0 | 1014_0928_l3fix2-verify1 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.0882 | 35 | 350,169 | 0 | 0 | 1014_0141_inorder4-v3b86 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `pod_cpu_overload` ｜ 标签 `app/adservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 127,303
- **raw 日志**：[results/1012_1415_inorder4-v3/raw/1012_1418_boutique-performance-1](../results/1012_1415_inorder4-v3/raw/1012_1418_boutique-performance-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 2/2 with 0 restarts and all deployments 1/1 AVAILABLE (no scheduling/crash/probe/image/SA/PVC breakpoint). Alert pointer: Service/adservice ABNORMAL - cpu_cfs throttled 0.824s, cpu core Normal=0.03 -> Current=0.16 cores (+375%), adservice p95 latency Normal=4.85ms -> Current=70.04ms (+1343%). Anchor-confirmed: adservice pod (worker-02) limits cpu=200m/requests 100m with idle leaf-service baseline ~0.03 cores, yet observed 0.16 cores causing CFS throttling and 13x latency increase. Code surface (AdService.java getAds/getRandomAds) contains no busy loop or artifi

### case-2

- **结论**：`app/cartservice` + `pod_cpu_overload` ｜ 标签 `app/cartservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1852 · steps 28 · tokens 289,569
- **raw 日志**：[results/1013_1134_inorder4-v3b10/raw/1013_1134_boutique-performance-2](../results/1013_1134_inorder4-v3b10/raw/1013_1134_boutique-performance-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Telemetry-chain closure (per L2 consensus for 'Service latency increased significantly'): object layer is entirely clean — all 11 boutique pods 2/2 Running with RESTARTS=0, all 26 namespace events Normal (no Warning), 4 nodes Ready with no pressure/taint, kubelet on worker-01 healthy, cartservice:7070 connectivity OK, selector/port match, pod has no config/probe/volume anomaly. The break is at the metric level on cartservice: GetAlerts shows cartservice RESOURCE_SATURATION cpu_cfs 0.811s (Throttled) and cpu core 0.02 -> 0.16 cores (+544.6%) against its 200m CPU limit (requests 100m, QoS Bursta

### case-3

- **结论**：`app/checkoutservice` + `pod_cpu_overload` ｜ 标签 `app/checkoutservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 134,179
- **raw 日志**：[results/1013_1343_inorder4-v3b14/raw/1013_1343_boutique-performance-3](../results/1013_1343_inorder4-v3b14/raw/1013_1343_boutique-performance-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metric-surface case: GetAlerts shows the anomaly is owned by checkoutservice — RESOURCE_SATURATION [cpu_cfs] Val: 0.703s (Throttled), RESOURCE_SATURATION [cpu core] Normal=0.01 cores -> Current=0.15 cores (+1985.6%), and LATENCY_DEGRADATION checkoutservice-p95 28.83ms -> 93.18ms (+223.2%); the only other alert is a mild knock-on on its host (Node worker-02 cpu 3.15% -> 5.12%). The pods face closes it: checkoutservice container 'server' runs with limits cpu=200m / requests cpu=100m, so its sampled 0.15 cores (~75% of limit) triggers CFS throttling that explains the added latency. Object layer i

### case-4

- **结论**：`app/currencyservice` + `pod_cpu_overload` ｜ 标签 `app/currencyservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 146,989
- **raw 日志**：[results/1013_1524_inorder4-v3b18/raw/1013_1524_boutique-performance-4](../results/1013_1524_inorder4-v3b18/raw/1013_1524_boutique-performance-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer is clean (all 11 boutique pods 2/2 Running, RESTARTS=0; currencyservice pod events only Normal Scheduled/Pulled/Created/Started, Restart Count 0, no probe/OOM/scheduling warnings) and namespace events contain no Warning tied to this workload, so the break is at the metric/telemetry level, not an object or health break. GetAlerts() isolates the single resource-level anomaly to currencyservice: RESOURCE_SATURATION [cpu_cfs] Val=1.081s (Throttled) plus RESOURCE_SATURATION [cpu core] Normal=0.04 cores -> Current=0.17 cores (+318.0%), together with LATENCY_DEGRADATION p95 3.69ms -> 73.

### case-5

- **结论**：`app/emailservice` + `pod_cpu_overload` ｜ 标签 `app/emailservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 234,408
- **raw 日志**：[results/1013_1541_inorder4-v3b20/raw/1013_1541_boutique-performance-5](../results/1013_1541_inorder4-v3b20/raw/1013_1541_boutique-performance-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer is clean (all 11 boutique pods Running 2/2, 0 restarts, no Warning events, emailservice:5000 TCP open), so the break is metric-level. Alerts show the anomaly concentrated in the emailservice pod cgroup: RESOURCE_SATURATION [cpu_cfs] 0.618s Throttled and cpu core Normal=0.00 -> Current=0.15 cores (+4182.4%), plus LATENCY_DEGRADATION emailservice-p95 4.80ms -> 78.30ms (+1532.7%); its upstream caller checkoutservice shows only propagated LATENCY_DEGRADATION (p95 24.30ms -> 85.41ms, +251.5%) with fully successful PlaceOrder/payment/email log lines, and emailservice has no error logs. 

### case-6

- **结论**：`app/frontend` + `pod_cpu_overload` ｜ 标签 `app/frontend` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1379 · steps 30 · tokens 293,289
- **raw 日志**：[results/1013_1628_inorder4-v3b22/raw/1013_1628_boutique-performance-6](../results/1013_1628_inorder4-v3b22/raw/1013_1628_boutique-performance-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Telemetry chain closure: the only active alert is on Service 'frontend' with 'RESOURCE_SATURATION [cpu_cfs] | Val: 1.333s (Throttled)' and 'RESOURCE_SATURATION [cpu core] | Normal=0.07 -> Current=0.16 cores (+138.1%)' accompanied by 'LATENCY_DEGRADATION frontend-p50: 15.87ms -> 45.00ms, frontend-p95: 27.67ms -> 271.36ms'. Object-layer exclusion found no break: all 11 boutique pods are Running with READY 2/2 and RESTARTS=0, all deployments are 1/1 AVAILABLE, all namespace events are Normal (no FailedScheduling/FailedMount/FailedCreate/image-pull/probe events), all 4 nodes are Ready with MemoryP

### case-7

- **结论**：`app/paymentservice` + `pod_cpu_overload` ｜ 标签 `app/paymentservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 156,035
- **raw 日志**：[results/1013_1656_inorder4-v3b25/raw/1013_1656_boutique-performance-7](../results/1013_1656_inorder4-v3b25/raw/1013_1656_boutique-performance-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts: paymentservice RESOURCE_SATURATION [cpu_cfs] Val 0.614s (Throttled), [cpu core] Normal=0.00 -> Current=0.16 cores (+4141.0%), LATENCY_DEGRADATION paymentservice-p95latency Normal=4.81ms -> Current=60.66ms (+1161.3%); node worker-02 only echoes it (cpu util 3.03% -> 5.12%). GetAppYAML(paymentservice) closes the saturation reading: container 'server' limits cpu=200m/requests 100m, so current usage 160m rides the cgroup quota and causes the CFS throttling that degrades p95 latency. Object layer excluded: 11 pods all 2/2 Running with RESTARTS 0 (paymentservice-869f9f96cd-k259k Ready, Resta

### case-8

- **结论**：`app/productcatalogservice` + `pod_cpu_overload` ｜ 标签 `app/productcatalogservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 170,422
- **raw 日志**：[results/1013_1810_inorder4-v3b27/raw/1013_1810_boutique-performance-8](../results/1013_1810_inorder4-v3b27/raw/1013_1810_boutique-performance-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts are the pointer: productcatalogservice carries the only saturation rows (RESOURCE_SATURATION [cpu_cfs] Val: 1.095s (Throttled); [cpu core] Normal=0.03 -> Current=0.16 cores, +482.0%) plus LATENCY_DEGRADATION p95 0.57ms -> 47.93ms (+8348.7%); the three remaining alerts (frontend +354.9%, checkoutservice +149.3%, recommendationservice +1346.0%) are exactly its upstream callers per GetServiceDependencies(productcatalogservice) [Upstream: frontend, checkoutservice, recommendationservice; leaf, no downstream], so they are propagation, not epicenter. Object layer is fully clean = exclusion ev

### case-9

- **结论**：`app/recommendationservice` + `pod_cpu_overload` ｜ 标签 `app/recommendationservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 187,540
- **raw 日志**：[results/1013_1834_inorder4-v3b30/raw/1013_1834_boutique-performance-9](../results/1013_1834_inorder4-v3b30/raw/1013_1834_boutique-performance-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show recommendationservice with RESOURCE_SATURATION [cpu_cfs] Val: 0.923s (Throttled) and [cpu core] Normal=0.03 -> Current=0.15 cores (+487.5%), plus LATENCY_DEGRADATION p95 4.81ms -> 84.41ms (+1656.4%); frontend only shows LATENCY_DEGRADATION p95 30.37ms -> 86.02ms (+183.2%) whose current value matches the recommendationservice p95, i.e. it is the downstream victim. Object layer is clean: all 11 boutique pods Running 2/2 with RESTARTS=0, namespace events contain no Warning (no FailedCreate/FailedScheduling/probe faults), all 4 nodes Ready with no pressure and 8 allocatable CPUs, and T

### case-10

- **结论**：`app/redis-cart` + `pod_cpu_overload` ｜ 标签 `app/redis-cart` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 22 · tokens 188,689
- **raw 日志**：[results/1013_2331_inorder4-v3b66/raw/1013_2334_boutique-performance-10](../results/1013_2331_inorder4-v3b66/raw/1013_2334_boutique-performance-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts in window 16:49:00~16:50:55 show LATENCY_DEGRADATION propagating up the call chain (cartservice p95 4.74ms->37.82ms, +697.2%; checkoutservice +163.8%; frontend +107.6%) plus RESOURCE_SATURATION on redis-cart ([cpu_cfs] 0.679s Throttled; [cpu core] 0.00->0.15 cores, +3196.4%). GetServiceDependencies(cartservice) confirms cartservice -> redis-cart (Database) as the only downstream backend, and the latency amplification increases toward that tail. Object layer is clean and therefore excluded: all 11 pods 2/2 Running with RESTARTS=0, no Warning events in the namespace, no application error 

### case-11

- **结论**：`app/shippingservice` + `pod_cpu_overload` ｜ 标签 `app/shippingservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1364 · steps 23 · tokens 231,341
- **raw 日志**：[results/1013_2337_inorder4-v3b67/raw/1013_2338_boutique-performance-11](../results/1013_2337_inorder4-v3b67/raw/1013_2338_boutique-performance-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Telemetry-chain case: all 11 boutique pods are 2/2 Running with 0 restarts, no Warning events, all 4 nodes Ready with no pressure, and kubelet on worker-02 active - the object layer is clean, so the break is at the metric layer. GetAlerts shows shippingservice as the only entity with RESOURCE_SATURATION: 'cpu core Normal=0.00 cores -> Current=0.15 cores (+3744.6%)' and 'cpu_cfs Val: 0.594s (Throttled)', alongside 'shippingservice-p95latency: Normal=4.27ms -> Current=18.99ms (+345.1%)'. Its own 200m CPU limit is what the container is hitting (0.15 cores = 75% of limit) and being CFS-throttled, 

### case-12

- **结论**：`app/adservice` + `pod_network_delay` ｜ 标签 `app/adservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4118 · steps 18 · tokens 145,538
- **raw 日志**：[results/1014_0009_inorder4-v3b69/raw/1014_0010_boutique-performance-12](../results/1014_0009_inorder4-v3b69/raw/1014_0010_boutique-performance-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metric-surface case (L3 exact match): GetAlerts names Service/adservice with LATENCY_DEGRADATION on BOTH percentiles (p50 2.96->59.89ms, p90 6.43->213.44ms) plus THROUGHPUT_DROP 10.92->3.95 req/s, while Service/frontend (its direct upstream per GetServiceDependencies: adservice is Called By frontend, leaf service) moves only p90 (49.81->222.77ms) - a partial-traffic ripple naming adservice as the epicenter; the caller sees the same added delay (~+173ms) and the callee has no downstream. Object layer is fully excluded: pods adservice 2/2 Running RESTARTS 0 on worker-02, all 11 deployments READY

### case-13

- **结论**：`app/cartservice` + `pod_network_delay` ｜ 标签 `app/cartservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 125,328
- **raw 日志**：[results/1014_0012_inorder4-v3b70/raw/1014_0014_boutique-performance-13](../results/1014_0012_inorder4-v3b70/raw/1014_0014_boutique-performance-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metrics-surface case: all 11 boutique services alert with TRAFFIC_ANOMALY [Network Drop] (pps -54%~-79%), but only cartservice/checkoutservice/frontend carry latency rows. cartservice has the steepest p90 escalation (29.41ms -> 4758.50ms, +16079.9%) AND the only self-error spike (success rate 100% -> 25%); checkoutservice (47.68ms -> 6553.37ms) and frontend (140.15ms -> 5456.41ms) receive the same fixed added delay as its callers, while cartservice's downstream redis-cart has no latency row (clean server-side). All 16323 frontend logs / 1478 errors are cart-only: 'rpc error: code = Unavailable

### case-14

- **结论**：`app/checkoutservice` + `pod_network_delay` ｜ 标签 `app/checkoutservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1071 · steps 57 · tokens 1,016,010
- **raw 日志**：[results/1014_0016_inorder4-v3b71/raw/1014_0018_boutique-performance-14](../results/1014_0016_inorder4-v3b71/raw/1014_0018_boutique-performance-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (symptom pointer) flag only checkoutservice as ABNORMAL during 23:51:01~23:52:56: THROUGHPUT_DROP 3.07->0.21 req/s (-93.3%), ERROR_SPIKE success 100%->12.5%, LATENCY_DEGRADATION p50 17.36ms->7528.76ms (+43265%) and p90 30.51ms->23763.88ms (+77800%); its caller frontend breached only p90 (37.16ms->8979.88ms), i.e. only the checkout-path requests were slow. Object-layer exclusion: all 11 boutique pods are 2/2 Running with RESTARTS 0 (including checkoutservice-dbcdcb5fb-8rclq on worker-02), no Warning events in the namespace, endpoints bound for every Service and TCP 5050 to checkoutservic

### case-15

- **结论**：`app/currencyservice` + `pod_network_delay` ｜ 标签 `app/currencyservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2174 · steps 24 · tokens 232,678
- **raw 日志**：[results/1014_0021_inorder4-v3b72/raw/1014_0027_boutique-performance-15](../results/1014_0021_inorder4-v3b72/raw/1014_0027_boutique-performance-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts fire on exactly three entities in one window (23:58:12-00:00:07): currencyservice (LATENCY_DEGRADATION p90 3.82ms->921.97ms, +24005%, plus the only network-class anomaly TRAFFIC_ANOMALY [Network Drop] Inbound 149.96->61.46pps / Outbound 145.23->48.97pps), frontend (p90 32.41ms->7937.56ms), checkoutservice (p90 33.40ms->2937.82ms). The object layer is fully healthy: all 11 pods 2/2 Running with RESTARTS=0, no Warning events in namespace boutique, currencyservice pod Ready with 0 restarts and no probe/OOM/kill events, kube-proxy and containerd on worker-01 active, and TCP connectivity to 

### case-16

- **结论**：`app/emailservice` + `pod_network_delay` ｜ 标签 `app/emailservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1852 · steps 28 · tokens 286,169
- **raw 日志**：[results/1014_0029_inorder4-v3b73/raw/1014_0033_boutique-performance-16](../results/1014_0029_inorder4-v3b73/raw/1014_0033_boutique-performance-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Telemetry chain: 3 pure LATENCY_DEGRADATION[Slow Response] alerts in window 00:05:23-00:07:18 (emailservice p90 4.80ms->895.90ms +18581.6%; checkoutservice p90 28.40->948.48ms p50 17.36->516.72ms; frontend p90 40.77->574.70ms), with zero error/resource alerts. Object layer fully excluded: all 11 boutique pods 2/2 Running, RESTARTS=0, no abnormal status; GetErrorLogs empty for emailservice/checkoutservice; namespace events all Normal (no FailedScheduling/FailedCreate/Unhealthy/Killing); TCP connectivity to emailservice:5000 open/Connection Succeeded; all 4 nodes Ready with no pressure/taints an

### case-17

- **结论**：`app/frontend` + `pod_network_delay` ｜ 标签 `app/frontend` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 28 · tokens 318,825
- **raw 日志**：[results/1014_0035_inorder4-v3b74/raw/1014_0038_boutique-performance-17](../results/1014_0035_inorder4-v3b74/raw/1014_0038_boutique-performance-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts window 00:12:34~00:14:29 shows all 11 boutique services hit by TRAFFIC_ANOMALY [Network Drop] (~-65% in/out pps) and THROUGHPUT_DROP (~-66% RPS), with LATENCY_DEGRADATION on 8. frontend is the ONLY service whose p50 AND p90 both moved (p50 15.98ms->11338.53ms +70835.9%; p90 32.91ms->25144.41ms +76309.6%) and carries the steepest p90 escalation among percentile-paired rows -> epicenter; the other 7 rows move only their p90 (partial-traffic ripple). Topology closes it: all 7 direct downstream neighbors of frontend (adservice, cartservice, checkoutservice, currencyservice, productcatalogse

### case-18

- **结论**：`app/paymentservice` + `pod_network_delay` ｜ 标签 `app/paymentservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 21 · tokens 145,925
- **raw 日志**：[results/1014_0935_l3fix2-verify2/raw/1014_0935_boutique-performance-18](../results/1014_0935_l3fix2-verify2/raw/1014_0935_boutique-performance-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts at 00:19:43-00:21:38 show three moving latency rows on one call path frontend -> checkoutservice -> paymentservice (GetServiceDependencies: paymentservice is a Leaf Service). paymentservice p90 4.81ms->2259.93ms (+46921.7%, no saturation rows); its caller checkoutservice p90 24.44ms->2380.35ms (+2356ms ~= the same added delay) and p50 17.05ms->1367.53ms, i.e. checkout's rise is its accumulated wait on the callee; frontend moved only p90 (45.76ms->1567.24ms) since only its checkout branch is affected. paymentservice is a leaf whose own server-side latency rose by +2255ms, which cannot be

### case-19

- **结论**：`app/productcatalogservice` + `pod_network_delay` ｜ 标签 `app/productcatalogservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 21 · tokens 105,777
- **raw 日志**：[results/1014_0046_inorder4-v3b76/raw/1014_0047_boutique-performance-19](../results/1014_0046_inorder4-v3b76/raw/1014_0047_boutique-performance-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metric-surface case. No object-layer break exists anywhere: all 11 pods are 2/2 Running with RESTARTS 0, all deployments 1/1 AVAILABLE, all endpoints bound (productcatalogservice -> 172.20.1.222:3550), TCP connectivity to productcatalogservice:3550 succeeds, productcatalogservice logs are clean with no error logs, nodes are Ready, and the namespace event stream contains zero Warning rows (no FailedCreate/FailedScheduling/FailedMount/probe events). No RESOURCE_SATURATION (cpu_cfs/memory) alert is present, so this is not a resource fault. The latency rows identify productcatalogservice as the pr

### case-20

- **结论**：`app/recommendationservice` + `pod_network_delay` ｜ 标签 `app/recommendationservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 137,699
- **raw 日志**：[results/1014_0048_inorder4-v3b77/raw/1014_0050_boutique-performance-20](../results/1014_0048_inorder4-v3b77/raw/1014_0050_boutique-performance-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP for 'Service quality degradation.' pins this wording to the metric surface: read alerts first, exclude the object layer, close on metric readings. GetAlerts (window 00:34:07~00:36:02) shows the runaway deviation on recommendationservice: p50 3.01ms->4370.55ms and p90 4.81ms->8603.86ms (+178745%), i.e. BOTH percentiles moved, carrying the delay across all of its traffic, and it has the steepest p90 escalation among the both-percentile rows (vs frontend p90 +23311%); its p50/p90 are both lifted by a large fixed amount. The graph (GetServiceDependencies: frontend->recommendationservice->pr

### case-21

- **结论**：`app/shippingservice` + `pod_network_delay` ｜ 标签 `app/shippingservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3182 · steps 23 · tokens 172,807
- **raw 日志**：[results/1014_0051_inorder4-v3b78/raw/1014_0052_boutique-performance-21](../results/1014_0051_inorder4-v3b78/raw/1014_0052_boutique-performance-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metric surface names shippingservice as epicenter: its alert row carries an actual deviation beyond saturation (THROUGHPUT_DROP 12.06->1.01 req/s, ERROR_SPIKE success 100%->16.7%) plus the steepest latency escalation (p90 4.18ms->1716.67ms); the only other two alerted services (checkoutservice p90 ->3589ms, frontend p90 ->2043ms) are exactly shippingservice's direct upstream neighbors (GetServiceDependencies: shipping is a leaf with upstream frontend+checkoutservice), and the added delay is a fixed amount per call (frontend ~+1.7s for one GetQuote, checkoutservice ~+3.5s for GetQuote+ShipOrder

### case-22

- **结论**：`node/worker-02` + `node_network_delay` ｜ 标签 `node/worker-02` + `node_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.087 · steps 47 · tokens 1,023,978
- **raw 日志**：[results/1014_0054_inorder4-v3b79/raw/1014_0055_boutique-performance-22](../results/1014_0054_inorder4-v3b79/raw/1014_0055_boutique-performance-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Metrics-level performance fault with a clean object layer. Alerts (window 2025-12-26 12:23:21~12:25:16) show pure latency degradation with no restarts/failures: recommendationservice p50 3.01ms->4328.87ms (+143716%), checkoutservice p50 17.55ms->3632.62ms and success rate 100%->25%, frontend p50 15.96ms->3480.10ms (+21709%), shippingservice p90 4.32ms->1846.45ms, productcatalogservice p90 1.48ms->606.48ms, adservice p90 5.63ms->205.27ms, plus ~50% RPS/pps drops cluster-wide. All 11 boutique pods are 2/2 Running with 0 restarts; all nodes Ready with no pressure/taint; kubelet, kube-proxy and co

### case-23

- **结论**：`node/worker-02` + `node_network_delay` ｜ 标签 `node/worker-02` + `node_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1481 · steps 28 · tokens 247,891
- **raw 日志**：[results/1014_0104_inorder4-v3b80/raw/1014_0105_boutique-performance-23](../results/1014_0104_inorder4-v3b80/raw/1014_0105_boutique-performance-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service latency increased significantly' enters the telemetry chain (L2 consensus: alerts -> object-layer exclusion -> metric reading). Alerts (2026-01-17 20:09:14~20:11:09) show all 11 boutique services degraded with uniform throughput drop (-55~-72%) and explicit LATENCY_DEGRADATION on cartservice p50 2.45ms->1236.06ms (+50450%), checkoutservice 17.60ms->7004.69ms (+39696%) and frontend 16.05ms->11557.08ms (+71921%); the ONLY infrastructure-level anomaly is node worker-02 NETWORK_QUALITY_DEGRADED [TCP Retransmission] Normal=0.00retrans -> Current=0.92retrans (new spike), while maste

### case-24

- **结论**：`node/worker-02` + `node_network_delay` ｜ 标签 `node/worker-02` + `node_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1 · steps 31 · tokens 382,289
- **raw 日志**：[results/1014_0928_l3fix2-verify1/raw/1014_0929_boutique-performance-24](../results/1014_0928_l3fix2-verify1/raw/1014_0929_boutique-performance-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert window 2026-01-17 20:18:09~20:20:04: LATENCY_DEGRADATION on checkoutservice (p50 17.35ms->3559.79ms, +20420%) and recommendationservice (3.01ms->1186.20ms, +39362.8%), ERROR_SPIKE frontend 99.9%->37.5% and adservice 100%->76%, TRAFFIC_ANOMALY Network Drop on frontend (-75.4% in / -76.0% out), currencyservice (-71.8%), productcatalogservice (-63.2%), cartservice (-49.8%), redis-cart (-49.6%). Pods listing (wide) placement: worker-02 hosts checkoutservice, recommendationservice, adservice, cartservice, redis-cart, shippingservice (all 6 alerted, including both latency-degraded services); w

### case-25

- **结论**：`app/productcatalogservice` + `pod_network_delay` ｜ 标签 `node/worker-02` + `node_network_delay`（✗ 与标签不符）
- **流程**：MC 0.5 · EOC 0.5 · ECR 0 · EE 0.0732 · steps 42 · tokens 798,117
- **raw 日志**：[results/1014_0928_l3fix2-verify1/raw/1014_0930_boutique-performance-25](../results/1014_0928_l3fix2-verify1/raw/1014_0930_boutique-performance-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show latency degradation concentrated on productcatalogservice (p90 2.50ms -> 1158.68ms, +46268%) and on its sole dependent recommendationservice (p50 3.00ms -> 946.61ms; p90 4.81ms -> 2151.41ms), while all 11 boutique services show only a uniform ~-65% RPS/pps collapse (adservice -64.8%, cartservice -66.1%, redis-cart -66.8%), with frontend additionally at 25.0% success rate and vanished latency metrics. Object layer is intact for the whole namespace: 11/11 pods 2/2 Running, 0 restarts; worker-01/02/03 and master Ready with no taints/cordon/pressure; kube-proxy active on worker-01 and 

### case-26

- **结论**：`node/worker-01` + `node_network_packet_loss` ｜ 标签 `node/worker-01` + `node_network_packet_loss`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1304 · steps 24 · tokens 222,648
- **raw 日志**：[results/1014_0122_inorder4-v3b83/raw/1014_0123_boutique-performance-26](../results/1014_0122_inorder4-v3b83/raw/1014_0123_boutique-performance-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer is clean (all 11 boutique pods 2/2 Running, 0 restarts; node worker-01 Ready, no taints/pressures; kubelet/kube-proxy/containerd all active), and TCP connectivity to adservice:9555, productcatalogservice:3550, recommendationservice:8080 and frontend:80 all returned 'open / Connection Succeeded', excluding pod-start, probe, scheduling, node-component and service addressing faults. The break is at node network quality: GetAlerts shows Node worker-01 'NETWORK_QUALITY_DEGRADED [TCP Retransmission] | Normal=0.01retrans -> Current=8.49retrans (+59027.1%)' together with service p50 laten

### case-27

- **结论**：`node/worker-02` + `node_network_packet_loss` ｜ 标签 `node/worker-02` + `node_network_packet_loss`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1034 · steps 30 · tokens 312,461
- **raw 日志**：[results/1014_0124_inorder4-v3b84/raw/1014_0125_boutique-performance-27](../results/1014_0124_inorder4-v3b84/raw/1014_0125_boutique-performance-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (window 12:32:28~12:34:23) show p90 latency degradation on adservice (16.00->66.24ms), recommendationservice (5.76->203.68ms) and checkoutservice (93.94->800.96ms), plus NETWORK_QUALITY_DEGRADED [TCP Retransmission] on worker-01 (0.07->0.61) and worker-02 (0.00->6.67, New Spike, 10x higher). Object layer is clean and therefore not the break: all 11 boutique pods 2/2 Running with 0 restarts, all 4 nodes Ready with no Memory/Disk/PID pressure and no taints, resource requests only ~20% on worker-02, no Warning events in the namespace, adservice/recommendationservice logs all INFO, checkout

### case-28

- **结论**：`node/worker-02` + `node_network_packet_loss` ｜ 标签 `node/worker-02` + `node_network_packet_loss`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 85,057
- **raw 日志**：[results/1014_0928_l3fix2-verify1/raw/1014_0928_boutique-performance-28](../results/1014_0928_l3fix2-verify1/raw/1014_0928_boutique-performance-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom window 2026-01-17 19:57:17~19:59:12: alerts show LATENCY_DEGRADATION on frontend-p50 (16.78ms -> 421.43ms, +2411%) and checkoutservice-p50 (18.07ms -> 392.23ms, +2070.7%), plus TRAFFIC_ANOMALY drops on worker-01-hosted downstreams currencyservice (-58.2% inbound), productcatalogservice (-50.8%) and redis-cart (-50.4%). Per the L3 SOP for this exact wording the node retransmission rows decide the mechanism: worker-02 NETWORK_QUALITY_DEGRADED TCP retransmission 0.00 -> 9.07 retrans (New Spike) versus worker-01 only 0.03 -> 0.53 retrans, i.e. worker-02 is ~17x every other node (an order o

### case-29

- **结论**：`node/worker-02` + `node_network_packet_loss` ｜ 标签 `node/worker-02` + `node_network_packet_loss`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.0882 · steps 35 · tokens 350,169
- **raw 日志**：[results/1014_0141_inorder4-v3b86/raw/1014_0142_boutique-performance-29](../results/1014_0141_inorder4-v3b86/raw/1014_0142_boutique-performance-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with 0 restarts, namespace events contain no Warning, all nodes are Ready with no pressure, kubelet/kube-proxy/containerd are active on worker-01/worker-02, and every TCP connectivity check succeeded -> no restart/probe/scheduling/addressing/component fault; GetErrorLogs is empty and post-window logs show normal fast responses (frontend took_ms 15~33ms). The fault is purely network-performance class inside the 12:09:17~12:11:12 window: 8 LATENCY_DEGRADATION alerts (frontend p90 72.73->2685.82ms +3592.8%, checkoutservice p90 38.93->943.59ms +2324.0%, recomme

