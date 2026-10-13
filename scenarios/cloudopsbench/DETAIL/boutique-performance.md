# 评测明细 · boutique/performance — cloudopsbench

> 本家族已跑 **9/29** 题：JRA ✅9 ❌0 ｜ 证据链全闭 9 ｜ token 中位 170,422 ｜ 生成 2026-10-13T10:42:30.373Z
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

