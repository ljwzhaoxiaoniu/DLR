# 评测明细 · boutique/performance — cloudopsbench

> 本家族已跑 **29/29** 题：JRA ✅29 ❌0 ｜ 证据链全闭 29 ｜ token 中位 186,912 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 178,362 | 0 | 0 | 1020_2002_tsm-v1-b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 108,050 | 0 | 0 | 1020_2323_tsm-v1-b36 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 168,703 | 0 | 0 | 1021_0123_tsm-v1-b69 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 166,727 | 0 | 0 | 1021_0129_tsm-v1-b72 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 203,479 | 0 | 0 | 1021_0136_tsm-v1-b75 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 280,056 | 0 | 0 | 1021_0142_tsm-v1-b78 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 164,725 | 0 | 0 | 1021_0148_tsm-v1-b81 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 139,960 | 0 | 0 | 1021_0152_tsm-v1-b83 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 191,955 | 0 | 0 | 1021_0158_tsm-v1-b86 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 13 | 109,753 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 171,113 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4706 | 18 | 216,452 | 0 | 0 | 1020_2018_tsm-v1-b12 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3889 | 19 | 190,584 | 0 | 0 | 1020_2024_tsm-v1-b15 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1923 | 27 | 446,512 | 0 | 0 | 1020_2243_tsm-v1-b18 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 22 | 244,229 | 0 | 0 | 1020_2249_tsm-v1-b21 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 25 | 312,896 | 0 | 0 | 1020_2258_tsm-v1-b24 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4118 | 18 | 177,093 | 0 | 0 | 1020_2304_tsm-v1-b27 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4118 | 18 | 231,723 | 0 | 0 | 1020_2311_tsm-v1-b30 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 138,310 | 0 | 0 | 1020_2317_tsm-v1-b33 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4444 | 19 | 227,894 | 0 | 0 | 1020_2329_tsm-v1-b39 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 219,235 | 0 | 0 | 1020_2334_tsm-v1-b42 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 228,629 | 0 | 0 | 1020_2340_tsm-v1-b45 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 232,721 | 0 | 0 | 1020_2346_tsm-v1-b48 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 109,572 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 186,912 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 207,389 | 0 | 0 | 1021_0056_tsm-v1-b57 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 125,187 | 0 | 0 | 1021_0103_tsm-v1-b60 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 163,417 | 0 | 0 | 1021_0109_tsm-v1-b63 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 130,852 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `pod_cpu_overload` ｜ 标签 `app/adservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 178,362
- **raw 日志**：[results/1020_2002_tsm-v1-b3/raw/1020_2003_boutique-performance-1](../results/1020_2002_tsm-v1-b3/raw/1020_2003_boutique-performance-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name adservice as the primary anomaly: RESOURCE_SATURATION [cpu_cfs] Val: 0.824s (Throttled) plus [cpu core] Normal=0.03 -> Current=0.16 cores (+375.0%), together with its own LATENCY_DEGRADATION adservice-p95latency Normal=4.85ms -> Current=70.04ms (+1343.0%) — throttle and self-latency climb together, marking it the epicenter; the worker-02 node row (cpu utilization 3.15% -> 4.91%) is collateral noise with no latency rows on the other pods of that node. The object layer is clean exclusion evidence: adservice-d68dfc56-lbcrz runs 2/2 Running with RESTARTS 0, all pod conditions True, pod

### case-2

- **结论**：`app/cartservice` + `pod_cpu_overload` ｜ 标签 `app/cartservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 108,050
- **raw 日志**：[results/1020_2323_tsm-v1-b36/raw/1020_2324_boutique-performance-2](../results/1020_2323_tsm-v1-b36/raw/1020_2324_boutique-performance-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts localize the source to cartservice: RESOURCE_SATURATION [cpu_cfs] Val: 0.811s (Throttled); [cpu core] Normal=0.02 -> Current=0.16 cores (+544.6%); LATENCY_DEGRADATION cartservice-p95latency Normal=10.77ms -> Current=83.83ms (+678.2%). frontend (34.73->134.55ms) and checkoutservice (31.43->129.15ms) degrade as callers (L1 relations frontend->cartservice, checkoutservice->cartservice), i.e. downstream victims. Placement map puts cartservice-7c5f46fc47-5jrjd on worker-01 together with currencyservice/frontend/productcatalogservice/redis-cart, which show no anomalies, so this is a single-se

### case-3

- **结论**：`app/checkoutservice` + `pod_cpu_overload` ｜ 标签 `app/checkoutservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 168,703
- **raw 日志**：[results/1021_0123_tsm-v1-b69/raw/1021_0124_boutique-performance-3](../results/1021_0123_tsm-v1-b69/raw/1021_0124_boutique-performance-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact 'Service quality degradation.' walked alerts-first. GetAlerts: checkoutservice carries RESOURCE_SATURATION [cpu_cfs] Val: 0.703s (Throttled) and RESOURCE_SATURATION [cpu core] Normal=0.01 cores -> Current=0.15 cores (+1985.6%) together with its own LATENCY_DEGRADATION [Slow Response] checkoutservice-p95latency Normal=28.83ms -> Current=93.18ms (+223.2%). Saturation row rides on the epicenter with the service's own latency rise -> genuine resource fault; the second alert node worker-02 cpu utilization 3.15% -> 5.12% is sub-noise collateral (worker-02 hosts 6 boutique services, only che

### case-4

- **结论**：`app/currencyservice` + `pod_cpu_overload` ｜ 标签 `app/currencyservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 166,727
- **raw 日志**：[results/1021_0129_tsm-v1-b72/raw/1021_0130_boutique-performance-4](../results/1021_0129_tsm-v1-b72/raw/1021_0130_boutique-performance-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name three degrading services (frontend p50+p95 both moving, checkoutservice p95-only, currencyservice p95-only) but only currencyservice carries RESOURCE_SATURATION: 'RESOURCE_SATURATION [cpu_cfs] | Val: 1.081s (Throttled)' with cpu core Normal=0.04 -> Current=0.17 (+318%). Pods -o wide placement shows the degraded services do NOT share one node (frontend+currencyservice on worker-01, checkoutservice on worker-02), and both caller services (frontend, checkoutservice) are upstream of currencyservice, so per the downstream-pod rule the saturated pod itself is the source. GetResources(nod

### case-5

- **结论**：`app/emailservice` + `pod_cpu_overload` ｜ 标签 `app/emailservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 203,479
- **raw 日志**：[results/1021_0136_tsm-v1-b75/raw/1021_0136_boutique-performance-5](../results/1021_0136_tsm-v1-b75/raw/1021_0136_boutique-performance-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Placement map from pods -o wide: checkoutservice and emailservice (its only downstream, edge checkoutservice->emailservice) both sit on worker-02, but the row-shape test localizes to the pod, not the node: emailservice carries the dual-moving row - LATENCY_DEGRADATION emailservice-p95latency Normal=4.80ms -> Current=78.30ms (+1532.7%) together with RESOURCE_SATURATION [cpu_cfs] Val: 0.618s (Throttled) and [cpu core] Normal=0.00 cores -> Current=0.15 cores (+4182.4%) - while checkoutservice (caller) only ripples at 24.30ms -> 85.41ms (+251.5%). Config confirmation: emailservice server container

### case-6

- **结论**：`app/frontend` + `pod_cpu_overload` ｜ 标签 `app/frontend` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 280,056
- **raw 日志**：[results/1021_0142_tsm-v1-b78/raw/1021_0142_boutique-performance-6](../results/1021_0142_tsm-v1-b78/raw/1021_0142_boutique-performance-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one alert exists and it names frontend: Service ABNORMAL 16:19:42~16:21:37 with RESOURCE_SATURATION cpu_cfs Val 1.333s (Throttled), cpu core Normal=0.07 -> Current=0.16 cores (+138.1%), and LATENCY_DEGRADATION p50 15.87ms->45.00ms (+183.6%) plus p95 27.67ms->271.36ms (+880.8%). All 11 pods are 2/2 Running with RESTARTS 0, so there is no crash or startup mechanism. Placement test: frontend-6778bd7b8b-dtd4f runs on worker-01, yet its same-node co-tenants (cartservice, currencyservice, productcatalogservice, redis-cart) are unalerted and healthy, so this is a single-service pod story, not a 

### case-7

- **结论**：`app/paymentservice` + `pod_cpu_overload` ｜ 标签 `app/paymentservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 164,725
- **raw 日志**：[results/1021_0148_tsm-v1-b81/raw/1021_0148_boutique-performance-7](../results/1021_0148_tsm-v1-b81/raw/1021_0148_boutique-performance-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (alerts-first per L3) show the epicenter is paymentservice: RESOURCE_SATURATION [cpu_cfs] 'Val: 0.614s (Throttled)' + RESOURCE_SATURATION [cpu core] 'Normal=0.00 cores -> Current=0.16 cores' together with its own LATENCY_DEGRADATION 'paymentservice-p95latency: Normal=4.81ms -> Current=60.66ms (+1161.3%)' — the throttle climbing together with the service's own latency marks a genuine per-service resource fault, not a ripple. Pod usage-vs-limits closes it: container 'server' of pod paymentservice-869f9f96cd-k259k has limits cpu: 200m while observed usage reached 0.16 cores (~80% of limit)

### case-8

- **结论**：`app/productcatalogservice` + `pod_cpu_overload` ｜ 标签 `app/productcatalogservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 139,960
- **raw 日志**：[results/1021_0152_tsm-v1-b83/raw/1021_0153_boutique-performance-8](../results/1021_0152_tsm-v1-b83/raw/1021_0153_boutique-performance-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (16:34:08-16:36:03) name productcatalogservice as the only dual-moving epicenter: RESOURCE_SATURATION [cpu_cfs] Val: 1.095s (Throttled) and [cpu core] 0.03 -> 0.16 cores (+482.0%) riding on its own p95 latency 0.57ms -> 47.93ms (+8348.7%). Dependency graph: productcatalogservice is a leaf; frontend, checkoutservice and recommendationservice all call it, so the three other latency alerts (frontend p95 36.77->167.27ms, recommendationservice 4.83->69.79ms, checkoutservice 29.69->73.99ms) are accumulated upstream wait, not sources. Pod row productcatalogservice-6fb89f98f8-r78bx is 2/2 Runni

### case-9

- **结论**：`app/recommendationservice` + `pod_cpu_overload` ｜ 标签 `app/recommendationservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 191,955
- **raw 日志**：[results/1021_0158_tsm-v1-b86/raw/1021_0159_boutique-performance-9](../results/1021_0158_tsm-v1-b86/raw/1021_0159_boutique-performance-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts localize the epicenter to recommendationservice: LATENCY_DEGRADATION p95 4.81ms -> 84.41ms (+1656.4%) together with RESOURCE_SATURATION on the same service - cpu_cfs Val: 0.923s (Throttled) and cpu core Normal=0.03 -> Current=0.15 (+487.5%), a dual-moving row (CPU + latency). frontend is only a p95-only ripple (30.37ms -> 86.02ms) and sits on worker-01 while recommendationservice sits on worker-02, so the two victims do not share a node and the pair is the frontend -> recommendationservice call edge, making the downstream pod the source. Node surfaces show no standout retransmission/pac

### case-10

- **结论**：`app/redis-cart` + `pod_cpu_overload` ｜ 标签 `app/redis-cart` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 13 · tokens 109,753
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1020_2040_boutique-performance-10](../results/1021_0900_tsm-v1-fix/raw/1020_2040_boutique-performance-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Latency wave: alerts report frontend p95 31.63->65.66ms (+107.6%), cartservice 4.74->37.82ms (+697.2%), checkoutservice 28.86->76.12ms (+163.8%), plus RESOURCE_SATURATION on redis-cart: cpu_cfs Val: 0.679s (Throttled) and cpu core Normal=0.00 -> Current=0.15 cores (+3196.4%). Wide pods listing places redis-cart on worker-01 with cartservice/frontend (checkoutservice on worker-02), and topology shows redis-cart upstream=cartservice, downstream=none (leaf DB), i.e. the degraded services are callers of this one downstream pod. redis-cart Deployment sets container redis limits cpu: 200m / memory: 

### case-11

- **结论**：`app/shippingservice` + `pod_cpu_overload` ｜ 标签 `app/shippingservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 171,113
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1020_2040_boutique-performance-11](../results/1021_0900_tsm-v1-fix/raw/1020_2040_boutique-performance-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts: shippingservice RESOURCE_SATURATION cpu_cfs Val: 0.594s (Throttled) and cpu core Normal=0.00 -> Current=0.15 cores (+3744.6%), with LATENCY_DEGRADATION shippingservice-p95latency Normal=4.27ms -> Current=18.99ms (+345.1%); caller checkoutservice-p95latency 24.23ms -> 62.82ms (+159.3%) on the checkoutservice->shippingservice edge. Object layer reads normal: all 11 pods 2/2 Running with RESTARTS=0, deployment shippingservice 1/1 AVAILABLE, CheckServiceConnectivity(shippingservice:50051) = Connection Succeeded, namespace events all Normal (Pulled/Created/Started, no FailedCreate/Unhealthy

### case-12

- **结论**：`app/adservice` + `pod_network_delay` ｜ 标签 `app/adservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4706 · steps 18 · tokens 216,452
- **raw 日志**：[results/1020_2018_tsm-v1-b12/raw/1020_2019_boutique-performance-12](../results/1020_2018_tsm-v1-b12/raw/1020_2019_boutique-performance-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts-first (L3 exact 'Service quality degradation.'): adservice carries LATENCY_DEGRADATION with BOTH p50 2.96ms->59.89ms (+1920.7%) and p90 6.43ms->213.44ms (+3217.7%) plus THROUGHPUT_DROP 10.92->3.95 req/s (-63.8%), while frontend moves ONLY its p90 (49.81ms->222.77ms, +347.2%) - a partial-traffic ripple on the frontend->adservice call edge, so the downstream adservice is the epicenter. Caller-side signal confirms the added wait: frontend error logs 1452/20489 (7.09%) are all ad-call failures, 'failed to get ads: rpc error: code = Unavailable desc = upstream request timeout' (545+306) and 

### case-13

- **结论**：`app/cartservice` + `pod_network_delay` ｜ 标签 `app/cartservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3889 · steps 19 · tokens 190,584
- **raw 日志**：[results/1020_2024_tsm-v1-b15/raw/1020_2025_boutique-performance-13](../results/1020_2024_tsm-v1-b15/raw/1020_2025_boutique-performance-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact section 'Service quality degradation.' followed (alerts first). GetAlerts: 11 services show TRAFFIC_ANOMALY[Network Drop], but only cartservice/checkoutservice/frontend carry latency rows on one call path (frontend->checkoutservice->cartservice); downstream-most and steepest p90 escalation is cartservice (p90 29.41ms -> 4758.50ms, +16079.9%) together with its own success-rate collapse (100% -> 25.0%), while no cpu/memory saturation row exists anywhere. Caller-side logs confirm the epicenter: frontend (16323 lines / 1478 errors) is dominated by 'could not retrieve cart: rpc error: code

### case-14

- **结论**：`app/checkoutservice` + `pod_network_delay` ｜ 标签 `app/checkoutservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1923 · steps 27 · tokens 446,512
- **raw 日志**：[results/1020_2243_tsm-v1-b18/raw/1020_2244_boutique-performance-14](../results/1020_2243_tsm-v1-b18/raw/1020_2244_boutique-performance-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts: checkoutservice p50 17.36ms->7528.76ms / p90 30.51ms->23763.88ms, RPS 3.07->0.21 (-93.3%), success 100%->12.5%; upstream frontend p90 37.16ms->8979.88ms (victim of the callee). Object layer is entirely normal: all 11 boutique pods 2/2 Running with RESTARTS 0, GetErrorLogs returns 'No error logs found' for checkoutservice/frontend/currencyservice, checkoutservice log steps (PlaceOrder -> payment went through -> order confirmation email sent) stay 5-14ms, callees (paymentservice 'Transaction processed', shippingservice '[GetQuote] completed', cartservice GetCartAsync) and frontend 'http.

### case-15

- **结论**：`app/currencyservice` + `pod_network_delay` ｜ 标签 `app/currencyservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 22 · tokens 244,229
- **raw 日志**：[results/1020_2249_tsm-v1-b21/raw/1020_2250_boutique-performance-15](../results/1020_2249_tsm-v1-b21/raw/1020_2250_boutique-performance-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with RESTARTS 0 and every namespace event is Normal (no Warning: no FailedScheduling / FailedMount / FailedCreate / image-pull / probe events), so no scheduling, config, image or probe mechanism applies. Alerts name three services only: currencyservice (LATENCY_DEGRADATION currencyservice-p90latency Normal=3.82ms -> Current=921.97ms (+24005.0%) plus TRAFFIC_ANOMALY [Network Drop] Inbound 149.96pps -> 61.46pps (-59.0%), Outbound 145.23pps -> 48.97pps (-66.3%)), with its two callers echoing: frontend p90 32.41ms -> 7937.56ms and checkoutservice p90 33.40ms ->

### case-16

- **结论**：`app/emailservice` + `pod_network_delay` ｜ 标签 `app/emailservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 25 · tokens 312,896
- **raw 日志**：[results/1020_2258_tsm-v1-b24/raw/1020_2259_boutique-performance-16](../results/1020_2258_tsm-v1-b24/raw/1020_2259_boutique-performance-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: 3 LATENCY_DEGRADATION alerts in one window 00:05:23~00:07:18 forming a single call path frontend -> checkoutservice -> emailservice. emailservice p90latency 4.80ms -> 895.90ms (+18581.6%); checkoutservice p50 17.36ms -> 516.72ms and p90 28.40ms -> 948.48ms; frontend p90 40.77ms -> 574.70ms. GetServiceDependencies shows emailservice is a Leaf Service whose only upstream is checkoutservice, so it is the deepest end of the degraded chain. Object layer is fully healthy: all 11 pods read 2/2 Running with RESTARTS 0; pod emailservice-7dc7d85bcb-qtklm is Status Running / Ready True / Res

### case-17

- **结论**：`app/frontend` + `pod_network_delay` ｜ 标签 `app/frontend` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4118 · steps 18 · tokens 177,093
- **raw 日志**：[results/1020_2304_tsm-v1-b27/raw/1020_2305_boutique-performance-17](../results/1020_2304_tsm-v1-b27/raw/1020_2305_boutique-performance-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name a whole-system pattern: all 11 services show TRAFFIC_ANOMALY [Network Drop] -50%~-76% and THROUGHPUT_DROP -66% in the same window (00:12:34~00:14:29). Row shape picks the epicenter: only frontend moves BOTH percentiles (p50 15.98ms -> 11338.53ms +70835.9%; p90 32.91ms -> 25144.41ms +76309.6%), carrying the delay across all of its traffic; every other row moves p90 only (cart 4.74->1870ms, currency 3.84->1953ms, productcatalog 0.49->1981ms, recommendation 4.82->2015ms, shipping 4.07->1456ms, checkout 26.44->1942ms, ad 4.85->185ms). The set of services WITH a latency row is exactly f

### case-18

- **结论**：`app/paymentservice` + `pod_network_delay` ｜ 标签 `app/paymentservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4118 · steps 18 · tokens 231,723
- **raw 日志**：[results/1020_2311_tsm-v1-b30/raw/1020_2311_boutique-performance-18](../results/1020_2311_tsm-v1-b30/raw/1020_2311_boutique-performance-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts first (L3 order for this wording): 3 latency rows in one window 00:19:43~00:21:38 - checkoutservice p50 17.05ms -> 1367.53ms and p90 24.44ms -> 2380.35ms (dual-moving), paymentservice p90 4.81ms -> 2259.93ms (+46921.7%), frontend p90 45.76ms -> 1567.24ms (p90-only ripple). Call graph confirms one path frontend -> checkoutservice -> paymentservice (GetServiceDependencies: checkoutservice Upstream=frontend, Downstream includes paymentservice), so by the L3 call-path rule the downstream row is the source: checkoutservice p90 (2380ms) equals paymentservice added delay (2260ms) plus only ~12

### case-19

- **结论**：`app/productcatalogservice` + `pod_network_delay` ｜ 标签 `app/productcatalogservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 138,310
- **raw 日志**：[results/1020_2317_tsm-v1-b33/raw/1020_2317_boutique-performance-19](../results/1020_2317_tsm-v1-b33/raw/1020_2317_boutique-performance-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP 'Service quality degradation.' matched exactly: alerts first. GetAlerts shows latency rows only on productcatalogservice (p50 0.26ms->197.17ms +75940%, p90 0.49ms->1701.13ms +345237%, both percentiles moving = epicenter, steepest p90 slope), while recommendationservice (p50 3.01->828.55ms) and frontend (p50 15.78->3709.72ms) are its upstream callers on the same call path (L1 relations: frontend/checkoutservice/recommendationservice -> productcatalogservice) accumulating the same added delay; checkoutservice moved p90 only (+1845ms) = partial ripple. All other services (adservice, cartse

### case-20

- **结论**：`app/recommendationservice` + `pod_network_delay` ｜ 标签 `app/recommendationservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4444 · steps 19 · tokens 227,894
- **raw 日志**：[results/1020_2329_tsm-v1-b39/raw/1020_2330_boutique-performance-20](../results/1020_2329_tsm-v1-b39/raw/1020_2330_boutique-performance-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts-first walk (L3 exact section). 4 Service alerts in window 00:34:07~00:36:02: recommendationservice shows dual-moving latency p50 3.01ms->4370.55ms (+145299.7%) and p90 4.81ms->8603.86ms (+178745.4%); frontend also dual-moving (p50 15.88->3586.68ms, p90 36.11->8453.46ms) but sits UPSTREAM on the call path frontend->recommendationservice (L1 relations), so the downstream row is the source and frontend's rise is accumulated wait on it. productcatalogservice moves p90 only (0.49->576.22ms, no p50 row) = partial-traffic ripple, server-side p50 unmoved and GetErrorLogs empty = downstream clea

### case-21

- **结论**：`app/shippingservice` + `pod_network_delay` ｜ 标签 `app/shippingservice` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 219,235
- **raw 日志**：[results/1020_2334_tsm-v1-b42/raw/1020_2335_boutique-performance-21](../results/1020_2334_tsm-v1-b42/raw/1020_2335_boutique-performance-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Epicenter = shippingservice (downstream of frontend and checkoutservice; its own alert rows carry the anomaly: p90 4.18ms->1716.67ms (+40939%), RPS 12.06->1.01 req/s (-91.6%), success rate 100%->16.7%), while the two upstream p90 rows (frontend +4439.7%, checkoutservice +8901.3%) are their accumulated wait on the callee. Pod shippingservice-674c8c548d-dbrs7 is 2/2 Running with RESTARTS 0 on worker-02; Service 50051/TCP -> targetPort 50051 -> containerPort 50051 with endpoints bound to 172.20.2.247:50051 and CheckServiceConnectivity returning 'Connection Succeeded', so selectors/ports/DNS are e

### case-22

- **结论**：`node/worker-02` + `node_network_delay` ｜ 标签 `node/worker-02` + `node_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 228,629
- **raw 日志**：[results/1020_2340_tsm-v1-b45/raw/1020_2341_boutique-performance-22](../results/1020_2340_tsm-v1-b45/raw/1020_2341_boutique-performance-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Wave symptom, not a single-service fault: all 10 boutique services abnormal at once with LATENCY_DEGRADATION (frontend p50 15.96ms->3480ms, checkoutservice p50 17.55ms->3632ms, recommendationservice p50 3.01ms->4328ms, shippingservice p90 4.32ms->1846ms, productcatalogservice p90 1.48ms->606ms, adservice p90 5.63ms->205ms) plus THROUGHPUT_DROP 45-75%. Placement map from pods -o wide: worker-01 hosts cartservice/currencyservice/frontend/productcatalogservice/redis-cart, worker-02 hosts adservice/checkoutservice/emailservice/paymentservice/recommendationservice/shippingservice. All four pods who

### case-23

- **结论**：`node/worker-02` + `node_network_delay` ｜ 标签 `node/worker-02` + `node_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 232,721
- **raw 日志**：[results/1020_2346_tsm-v1-b48/raw/1020_2347_boutique-performance-23](../results/1020_2346_tsm-v1-b48/raw/1020_2347_boutique-performance-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 12 alerts share one window (2026-01-17 20:09:14~20:11:09): every boutique service shows a uniform traffic/throughput drop (-65% to -72%), with latency explosion on frontend (p50 16.05ms -> 11557.08ms, +71921%), checkoutservice (17.60ms -> 7004.69ms) and cartservice (2.45ms -> 1236.06ms). Placement map from pods -o wide localizes it: worker-02 hosts cartservice, currencyservice, emailservice, productcatalogservice, recommendationservice, shippingservice, while the loudest latency rows (frontend, checkoutservice) sit on worker-01 and only aggregate calls into those worker-02 pods (checkoutse

### case-24

- **结论**：`node/worker-02` + `node_network_delay` ｜ 标签 `node/worker-02` + `node_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 109,572
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0030_boutique-performance-24](../results/1021_0900_tsm-v1-fix/raw/1021_0030_boutique-performance-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact section 'Service latency increased significantly' followed: wide pod sheet + alerts first, then node retransmission comparison, then node-surface closure. Placement map from GetResources(pods, output_wide=true) (all pods 2/2 Running, RESTARTS 0) puts checkoutservice and recommendationservice - the two services with the moving p50 latency rows (17.35ms->3559.79ms +20420.0%; 3.01ms->1186.20ms +39362.8%) - both on worker-02, and all 6/6 boutique pods on worker-02 are in the alert wave (adservice success rate 100.0%->76.0%, cartservice RPS 26.07->14.20, redis-cart/shippingservice traffic 

### case-25

- **结论**：`node/worker-02` + `node_network_delay` ｜ 标签 `node/worker-02` + `node_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 186,912
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0026_boutique-performance-25](../results/1021_0900_tsm-v1-fix/raw/1021_0026_boutique-performance-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact match 'Service latency increased significantly' -> node-scope network branch. Object layer is healthy, so the break is at metric level: GetResources(pods, output_wide) shows all 11 pods 2/2 Running with RESTARTS=0; GetErrorLogs for recommendationservice and frontend return 'No error logs found'; GetRecentLogs(recommendationservice) keeps logging INFO [Recv ListRecommendations] at normal cadence; CheckServiceConnectivity(recommendationservice:8080) -> 'Connection Succeeded'; GetResources(events) shows only Normal rows (Pulled/Created/Started), no FailedCreate/FailedMount/image-pull/pro

### case-26

- **结论**：`node/worker-01` + `node_network_packet_loss` ｜ 标签 `node/worker-01` + `node_network_packet_loss`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 207,389
- **raw 日志**：[results/1021_0056_tsm-v1-b57/raw/1021_0057_boutique-performance-26](../results/1021_0056_tsm-v1-b57/raw/1021_0057_boutique-performance-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Cross-service p50 latency degradation (checkoutservice 18.18ms->177.28ms +875.1%, frontend 16.44ms->135.83ms +726.3%, recommendationservice 3.06ms->54.12ms +1670.7%) together with node-level alert on worker-01: 'NETWORK_QUALITY_DEGRADED [TCP Retransmission] | Normal=0.01retrans -> Current=8.49retrans (+59027.1%)' - only worker-01 shows a retransmission anomaly and it is orders of magnitude above baseline (not a sub-1 noise spike), so the class resolves to packet loss, not delay. Placement from pods wide: frontend, checkoutservice, currencyservice, cartservice, productcatalogservice run on work

### case-27

- **结论**：`node/worker-02` + `node_network_packet_loss` ｜ 标签 `node/worker-02` + `node_network_packet_loss`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 125,187
- **raw 日志**：[results/1021_0103_tsm-v1-b60/raw/1021_0103_boutique-performance-27](../results/1021_0103_tsm-v1-b60/raw/1021_0103_boutique-performance-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show p90 latency degradation on exactly three services (adservice 16.00ms->66.24ms +314.1%, checkoutservice 93.94ms->800.96ms +752.7%, recommendationservice 5.76ms->203.68ms +3433.6%) plus node TCP retransmission alerts. pods -o wide shows all three degraded pods placed on worker-02 (adservice-d68dfc56-gwgmr, checkoutservice-dbcdcb5fb-ssmhf, recommendationservice-54dfdd6986-m59w9), while every worker-01-hosted pod (cartservice, currencyservice, frontend, productcatalogservice, redis-cart) has no alert - the degraded set equals worker-02's pod set, and these services share no single down

### case-28

- **结论**：`node/worker-02` + `node_network_packet_loss` ｜ 标签 `node/worker-02` + `node_network_packet_loss`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 163,417
- **raw 日志**：[results/1021_0109_tsm-v1-b63/raw/1021_0109_boutique-performance-28](../results/1021_0109_tsm-v1-b63/raw/1021_0109_boutique-performance-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact match. 11/11 boutique pods are 2/2 Running with RESTARTS=0, so no restart/scheduling class. Alerts show a multi-service wave: frontend p50 16.78ms -> 421.43ms (+2411%) on worker-02, checkoutservice p50 18.07ms -> 392.23ms (+2070%) on worker-01, and inbound/outbound pps halved for currencyservice (-58.2%/-53.7%), productcatalogservice (-50.8%/-49.7%) and redis-cart (-50.4%) on worker-01. Per the L3 retransmission rule, worker-02 is far above every other node: 0.00 -> 9.07 retrans (New Spike), 17x worker-01's 0.03 -> 0.53, which is sub-1 and therefore noise-sized, so that small spike do

### case-29

- **结论**：`node/worker-02` + `node_network_packet_loss` ｜ 标签 `node/worker-02` + `node_network_packet_loss`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 130,852
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0708_boutique-performance-29](../results/1021_0900_tsm-v1-fix/raw/1021_0708_boutique-performance-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact SOP (Service latency increased significantly) followed: pods -o wide showed all 11 boutique pods 2/2 Running with RESTARTS 0 (no restart/probe/startup fault), and the placement map puts frontend and checkoutservice on worker-02. Alerts show a wave of latency across several services; the dual-moving p50+p90 rows (frontend p50 16.29->342.82ms +2004.0%, p90 72.73->2685.82ms +3592.8%; checkoutservice p50 17.77->148.74ms +737.1%, p90 38.93->943.59ms +2324.0%) both sit on worker-02, while worker-01 services (currencyservice, productcatalogservice, paymentservice, cartservice) show p90-only 

