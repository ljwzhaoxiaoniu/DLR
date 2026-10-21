# 评测明细 · train-ticket/performance — cloudopsbench

> 本家族已跑 **47/47** 题：JRA ✅46 ❌1 ｜ 证据链全闭 46 ｜ token 中位 299,065 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 190,281 | 0 | 0 | 1020_2001_tsm-v1-b2 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 336,152 | 0 | 0 | 1020_2320_tsm-v1-b35 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 176,324 | 0 | 0 | 1021_0121_tsm-v1-b68 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 311,422 | 0 | 0 | 1021_0221_tsm-v1-b98 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4615 | 14 | 305,781 | 0 | 0 | 1021_0302_tsm-v1-b119 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 331,488 | 0 | 0 | 1021_0306_tsm-v1-b121 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 198,131 | 0 | 0 | 1021_0310_tsm-v1-b123 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 287,357 | 0 | 0 | 1021_0315_tsm-v1-b125 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3889 | 19 | 435,179 | 0 | 0 | 1021_0316_tsm-v1-b126 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 199,097 | 0 | 0 | 1020_2006_tsm-v1-b5 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 297,422 | 0 | 0 | 1020_2011_tsm-v1-b8 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 303,103 | 0 | 0 | 1020_2017_tsm-v1-b11 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 303,138 | 0 | 0 | 1020_2022_tsm-v1-b14 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 291,938 | 0 | 0 | 1020_2241_tsm-v1-b17 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 310,379 | 0 | 1 | 1020_2247_tsm-v1-b20 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 154,918 | 0 | 0 | 1020_2256_tsm-v1-b23 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4118 | 18 | 263,400 | 0 | 0 | 1020_2302_tsm-v1-b26 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 315,935 | 0 | 0 | 1020_2309_tsm-v1-b29 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 303,662 | 0 | 0 | 1020_2315_tsm-v1-b32 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 328,265 | 0 | 0 | 1020_2327_tsm-v1-b38 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 13 | 203,641 | 0 | 0 | 1020_2333_tsm-v1-b41 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 515,615 | 0 | 0 | 1020_2338_tsm-v1-b44 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 157,524 | 0 | 0 | 1020_2345_tsm-v1-b47 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 365,995 | 0 | 0 | 1020_2350_tsm-v1-b50 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 299,065 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 271,182 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 208,557 | 0 | 0 | 1021_0101_tsm-v1-b59 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 244,124 | 0 | 0 | 1021_0107_tsm-v1-b62 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1538 | 14 | 425,078 | 0 | 0 | 1021_0115_tsm-v1-b65 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 261,821 | 0 | 0 | 1021_0127_tsm-v1-b71 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 316,815 | 0 | 0 | 1021_0134_tsm-v1-b74 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 292,839 | 0 | 0 | 1021_0140_tsm-v1-b77 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 219,488 | 0 | 0 | 1021_0146_tsm-v1-b80 | 全对·链闭 |
| [34](#case-34) | 0 | 1 | 0 | 0.5 | 0.5 | 0 | 0.2381 | 22 | 404,932 | 0 | 0 | 1021_0150_tsm-v1-b82 | 未命中 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 189,702 | 0 | 0 | 1021_0156_tsm-v1-b85 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 342,371 | 0 | 0 | 1021_0201_tsm-v1-b88 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 312,455 | 0 | 0 | 1021_0205_tsm-v1-b90 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 257,781 | 0 | 0 | 1021_0211_tsm-v1-b93 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 410,927 | 0 | 0 | 1021_0215_tsm-v1-b95 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 267,267 | 0 | 0 | 1021_0225_tsm-v1-b100 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 352,386 | 0 | 0 | 1021_0231_tsm-v1-b103 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 368,756 | 0 | 0 | 1021_0236_tsm-v1-b105 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 235,304 | 0 | 0 | 1021_0242_tsm-v1-b108 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 256,590 | 0 | 0 | 1021_0246_tsm-v1-b110 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 15 | 227,054 | 0 | 0 | 1021_0250_tsm-v1-b112 | 全对·链闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 357,254 | 0 | 0 | 1021_0255_tsm-v1-b115 | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 507,834 | 0 | 0 | 1021_0258_tsm-v1-b117 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/ts-basic-service` + `pod_network_delay` ｜ 标签 `app/ts-basic-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 190,281
- **raw 日志**：[results/1020_2001_tsm-v1-b2/raw/1020_2001_trainticket-performance-1](../results/1020_2001_tsm-v1-b2/raw/1020_2001_trainticket-performance-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts shows ts-basic-service as the epicenter: both p50 (36.38ms -> 7327.59ms, +20039.9%) and p90 (49.17ms -> 9465.52ms, +19149.8%) move together while RPS drops 73.9% — a near-constant added ~7.3s delay carried across all of its traffic. Upstream callers show only ripples/accumulation (ts-preserve-service p50 177ms -> 19677ms and p50+p90 dual-moving on the same call edge ts-preserve-service -> ts-basic-service, so the downstream row is the source; ts-travel-service, ts-gateway-service, ts-ui-dashboard move p90 only), and ts-basic-service's own downstreams ts-route-service/ts-station-servi

### case-2

- **结论**：`app/ts-contacts-service` + `pod_network_delay` ｜ 标签 `app/ts-contacts-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 336,152
- **raw 日志**：[results/1020_2320_tsm-v1-b35/raw/1020_2321_trainticket-performance-2](../results/1020_2320_tsm-v1-b35/raw/1020_2321_trainticket-performance-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (14:37:43~14:39:38) show 4 services: ts-contacts-service moved BOTH p50 (7.52ms->4750ms, +63081.7%) and p90 (9.56ms->8875ms) plus THROUGHPUT_DROP (1.56->0.53 req/s, -66.1%); ts-preserve-service moved p50 (202.40ms->7500ms) and p90 (406.58ms->9500ms); ts-gateway-service and ts-ui-dashboard moved p90 only (partial-traffic ripples). Call graph confirms ts-preserve-service -> ts-contacts-service, and ts-contacts-service is a Leaf Node with no downstream calls, so per the downstream-is-source rule the epicenter is ts-contacts-service. Object layer is clean: pod ts-contacts-service-7fc68f4bbc

### case-3

- **结论**：`app/ts-food-service` + `pod_network_delay` ｜ 标签 `app/ts-food-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 176,324
- **raw 日志**：[results/1021_0121_tsm-v1-b68/raw/1021_0122_trainticket-performance-3](../results/1021_0121_tsm-v1-b68/raw/1021_0122_trainticket-performance-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show 4 LATENCY_DEGRADATION rows; only ts-food-service and ts-preserve-service move BOTH p50 and p90, and both converge to identical values (p50 7500ms, p90 9500ms). Call graph (L1 relations + GetServiceDependencies) confirms ts-preserve-service -> ts-food-service, so the downstream row is the source and preserve's row is its accumulated wait (218.62ms + ~7.3s = 7500ms). ts-food-service also has the steepest p90 escalation (23.86ms -> 9500ms, +39711%) and its downstreams ts-travel-service / ts-station-food-service / ts-train-food-service are clean. All 4 alerts are latency-category only:

### case-4

- **结论**：`app/ts-gateway-service` + `pod_network_delay` ｜ 标签 `app/ts-gateway-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 311,422
- **raw 日志**：[results/1021_0221_tsm-v1-b98/raw/1021_0221_trainticket-performance-4](../results/1021_0221_tsm-v1-b98/raw/1021_0221_trainticket-performance-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name ts-gateway-service as the latency epicenter: LATENCY_DEGRADATION p50 27.03ms -> 1928.57ms (+7035.6%) and p90 204.84ms -> 8000.00ms (+3805.5%, peak 55500ms) with THROUGHPUT_DROP 6.92 -> 1.53 req/s (-77.8%) and inbound network drop 181.82 -> 102.24pps. ts-ui-dashboard shows byte-identical p50 1928.57ms / p90 8000.00ms, so its row is pure accumulated wait; GetServiceDependencies confirms ts-ui-dashboard calls ts-gateway-service which fans out to 38 backends, so on the single call path the downstream row (the gateway) is the source. All 38 backend services carry only TRAFFIC_ANOMALY Ne

### case-5

- **结论**：`app/ts-inside-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-inside-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4615 · steps 14 · tokens 305,781
- **raw 日志**：[results/1021_0302_tsm-v1-b119/raw/1021_0302_trainticket-performance-5](../results/1021_0302_tsm-v1-b119/raw/1021_0302_trainticket-performance-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (15:27:44~15:29:34) show ts-inside-payment-service as the only dual-moving latency row: p50 22.93ms -> 7166.67ms (+31154.5%) and p90 64.29ms -> 20333.33ms (+31529.5%) with RPS -74.4%, while its callers ts-gateway-service (p90 219ms -> 8655ms) and ts-cancel-service (p90 151ms -> 21667ms) move p90 only - the classic partial-traffic ripple of an upstream accumulating the callee's wait; dependency graph confirms gateway->inside-payment and cancel->inside-payment, and the downstream row is the larger one, so the source is ts-inside-payment-service. No saturation rows exist at all (limits 500

### case-6

- **结论**：`app/ts-order-service` + `pod_network_delay` ｜ 标签 `app/ts-order-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 331,488
- **raw 日志**：[results/1021_0306_tsm-v1-b121/raw/1021_0306_trainticket-performance-6](../results/1021_0306_tsm-v1-b121/raw/1021_0306_trainticket-performance-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts returned 22 alerts: a system-wide traffic/throughput drop (-44% to -75% pps) plus latency rows concentrated on the checkout path. Among the dual-moving latency rows (p50 AND p90 both moved) ts-order-service is the steepest by p90 escalation: p50 9.44ms -> 3881.58ms (+41016.2%) and p90 43.56ms -> 17600ms (+40305.9%), Peak=174000ms. GetServiceDependencies shows ts-order-service has NO downstream calls (it is the leaf), while ts-seat-service, ts-security-service, ts-preserve-service and ts-gateway-service all call it; their added delay equals the callee's - ts-seat-service p50 17.65ms -

### case-7

- **结论**：`app/ts-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 198,131
- **raw 日志**：[results/1021_0310_tsm-v1-b123/raw/1021_0310_trainticket-performance-7](../results/1021_0310_tsm-v1-b123/raw/1021_0310_trainticket-performance-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (window 2026-03-16 16:01:06~16:02:56) name three entities: ts-payment-service shows a dual-moving latency row (p50 16.96ms -> 5000.00ms, p90 23.79ms -> 9000.00ms), ts-inside-payment-service only moves p90 (89.68ms -> 8488.44ms) i.e. a partial-traffic ripple, and ts-order-service carries a bare RESOURCE_SATURATION [cpu_cfs] Val: 0.073s (Throttled) with no latency row of its own (collateral noise). GetServiceDependencies(ts-payment-service) shows upstream ts-gateway-service / ts-inside-payment-service and NO downstream (leaf), so of the two moving rows on the same call path the downstream

### case-8

- **结论**：`app/ts-preserve-service` + `pod_network_delay` ｜ 标签 `app/ts-preserve-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 287,357
- **raw 日志**：[results/1021_0315_tsm-v1-b125/raw/1021_0315_trainticket-performance-8](../results/1021_0315_tsm-v1-b125/raw/1021_0315_trainticket-performance-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts fired together in window 16:17:47~16:19:42: ts-preserve-service moved BOTH p50 (376.71ms -> 7500.00ms, +1890.9%) and p90 (562.50ms -> 9750.00ms, +1633.3%), while ts-gateway-service (p90 306.25ms -> 5537.50ms) and ts-ui-dashboard (p90 305.62ms -> 5487.50ms) moved only p90 - i.e. dual-moving epicenter on the call path ui-dashboard -> gateway -> preserve, with the two p90-only rows being accumulated wait on the callee. All 10 downstream services of ts-preserve-service show no latency rows (downstream server-side clean) and no RESOURCE_SATURATION (cpu_cfs/memory) row exists anywhere in the 

### case-9

- **结论**：`app/ts-price-service` + `pod_network_delay` ｜ 标签 `app/ts-price-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3889 · steps 19 · tokens 435,179
- **raw 日志**：[results/1021_0316_tsm-v1-b126/raw/1021_0317_trainticket-performance-9](../results/1021_0316_tsm-v1-b126/raw/1021_0317_trainticket-performance-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show 6 LATENCY_DEGRADATION rows with no CPU/memory saturation row. ts-price-service is the only dual-moving epicenter on the call path ui-dashboard -> gateway -> preserve-service -> basic-service -> price-service: its own latency rose p50 5.95ms -> 2436.17ms (+40864.7%) and p90 9.19ms -> 4476.74ms (+48618.5%), while GetServiceDependencies(ts-price-service) reports 'Leaf Node - No downstream calls', and its upstreams only accumulate the same wait (basic-service p50 38.70 -> 3750.00ms, preserve-service p50 389.83 -> 7500.00ms) with p90-only ripples at gateway (325.74 -> 5344.44ms), travel

### case-10

- **结论**：`app/ts-route-service` + `pod_network_delay` ｜ 标签 `app/ts-route-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 199,097
- **raw 日志**：[results/1020_2006_tsm-v1-b5/raw/1020_2007_trainticket-performance-10](../results/1020_2006_tsm-v1-b5/raw/1020_2007_trainticket-performance-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts-first per L3 exact section. Of 18 alerts, only ts-route-service shows both p50 and p90 moving (p50 7.55ms->8026.32ms, +106152%; p90 9.60ms->21000ms, +218730%, steepest dual-moving p90 escalation). Call graph closes it: GetServiceDependencies(ts-route-service) lists it as a Leaf Node with no downstream calls, while ts-basic-service->ts-route-service is a direct edge, so its latency is self-generated and the basic-service (p50 18974ms/p90 27794ms) and preserve-service rows are accumulated wait on it; gateway/travel/ui-dashboard rows are p90-only ripples. No RESOURCE_SATURATION cpu_cfs/cor

### case-11

- **结论**：`app/ts-seat-service` + `pod_network_delay` ｜ 标签 `app/ts-seat-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 297,422
- **raw 日志**：[results/1020_2011_tsm-v1-b8/raw/1020_2012_trainticket-performance-11](../results/1020_2011_tsm-v1-b8/raw/1020_2012_trainticket-performance-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (17:07:52-17:09:42) show five latency rows; only ts-preserve-service and ts-seat-service move both p50 and p90, and ts-seat-service has the steepest p90 escalation (66.40ms -> 4613.10ms, +6847%; p50 19.72ms -> 3065.48ms) plus THROUGHPUT_DROP (RPS 2.30 -> 0.44, -81%). Call graph GetServiceDependencies(ts-seat-service) gives ts-preserve-service -> ts-seat-service and ts-travel-service -> ts-seat-service, so the downstream seat pod is the source and preserve's 22.5s p90 is accumulated wait on it; gateway/ui-dashboard/travel are p90-only ripples. Branch discrimination: ts-seat-service downs

### case-12

- **结论**：`app/ts-security-service` + `pod_network_delay` ｜ 标签 `app/ts-security-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 303,103
- **raw 日志**：[results/1020_2017_tsm-v1-b11/raw/1020_2017_trainticket-performance-12](../results/1020_2017_tsm-v1-b11/raw/1020_2017_trainticket-performance-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show ts-security-service as the only dual-moving epicenter row: p50 100ms->7027ms (+6927%) and p90 425ms->9405ms (+2113%), the steepest escalation among dual-moving rows. Its direct caller ts-preserve-service (confirmed edge preserve->security) also moves but its current values equal security's own (7443≈7027, 9488≈9405), i.e. it merely accumulates the callee's wait; ts-gateway-service and ts-ui-dashboard move p90 only (partial-traffic ripples). The single RESOURCE_SATURATION row (cpu_cfs 0.122s Throttled) sits on ts-order-service which has no latency row of its own, so per the branch r

### case-13

- **结论**：`app/ts-station-service` + `pod_network_delay` ｜ 标签 `app/ts-station-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 303,138
- **raw 日志**：[results/1020_2022_tsm-v1-b14/raw/1020_2023_trainticket-performance-13](../results/1020_2022_tsm-v1-b14/raw/1020_2023_trainticket-performance-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show 8 anomalies; row-shape analysis isolates the dual-moving (p50+p90) rows as ts-station-service (p50 3.31ms->2477.27ms +74810%, p90 6.64ms->4492.19ms +67553%, the steepest p90 escalation), ts-basic-service (p50 39.29ms->7500ms) and ts-preserve-service (p50 448.86ms->19615.38ms); ts-gateway-service/ts-travel-service/ts-ui-dashboard move only p90 (ripples) and ts-inside-payment-service/ts-order-service only lose throughput. The call graph closes it: ts-preserve-service -> ts-basic-service -> ts-station-service, and ts-station-service is a leaf with no downstream, so it is the most-down

### case-14

- **结论**：`app/ts-train-service` + `pod_network_delay` ｜ 标签 `app/ts-train-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 291,938
- **raw 日志**：[results/1020_2241_tsm-v1-b17/raw/1020_2242_trainticket-performance-14](../results/1020_2241_tsm-v1-b17/raw/1020_2242_trainticket-performance-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts-first (L3 exact) on the metric surface: 7 rows, of which ts-train-service is the steepest dual-moving row (p50 6.71ms->2453.12ms +36478.3%, p90 9.67ms->4483.33ms +46258.5%), a near-zero baseline with a large fixed added delay. ts-basic-service (p50 +9346.2% / p90 +7280.8%) is its direct caller on the same call path, and per the rule the downstream row is the source; ts-gateway-service, ts-travel-service and ts-ui-dashboard move only p90 and are partial-traffic ripples. GetServiceDependencies(ts-train-service) shows Downstream (Calls): empty - Leaf Node - No downstream calls, so its own 

### case-15

- **结论**：`app/ts-travel-service` + `pod_network_delay` ｜ 标签 `app/ts-travel-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 310,379
- **raw 日志**：[results/1020_2247_tsm-v1-b20/raw/1020_2248_trainticket-performance-15](../results/1020_2247_tsm-v1-b20/raw/1020_2248_trainticket-performance-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts-first (L3 exact section). 7 latency/saturation rows in window 18:14:37~18:16:27. Row-shape epicenter selection: only ts-travel-service and its upstream ts-preserve-service move BOTH p50 and p90; ts-travel-service has the steepest p90 escalation (p50 7.50ms->2252.04ms, +29927%; p90 189.01ms->8913.17ms, +4615%, peak 9023.81ms). ts-gateway-service (+1174% p90), ts-ui-dashboard (+1195% p90), ts-seat-service (+1870% p90) and ts-basic-service (+2615% p90) move p90 only => partial-traffic ripples. ts-order-service carries a bare RESOURCE_SATURATION [cpu_cfs] 'Val: 0.226s (Throttled)' with no l

### case-16

- **结论**：`app/ts-user-service` + `pod_network_delay` ｜ 标签 `app/ts-user-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 154,918
- **raw 日志**：[results/1020_2256_tsm-v1-b23/raw/1020_2257_trainticket-performance-16](../results/1020_2256_tsm-v1-b23/raw/1020_2257_trainticket-performance-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (window 20:30:12~20:32:02) show a latency-degradation cluster plus one bare saturation row. Row-shape triage: ts-gateway-service and ts-ui-dashboard move only p90 (partial-traffic ripples); ts-order-service shows only RESOURCE_SATURATION [cpu_cfs] Val: 0.175s (Throttled) with no latency row of its own (collateral noise); ts-user-service, ts-cancel-service and ts-preserve-service move BOTH p50 and p90. Call graph closes the epicenter: both dual-moving upstream rows call ts-user-service (gateway->cancel->user, gateway/preserve->user), and on one call path the downstream row is the source,

### case-17

- **结论**：`app/ts-assurance-service` + `pod_network_delay` ｜ 标签 `app/ts-assurance-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4118 · steps 18 · tokens 263,400
- **raw 日志**：[results/1020_2302_tsm-v1-b26/raw/1020_2303_trainticket-performance-17](../results/1020_2302_tsm-v1-b26/raw/1020_2303_trainticket-performance-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts returned only one latency row: ts-assurance-service LATENCY_DEGRADATION p90latency Normal=7.86ms -> Current=2112.50ms (+26762.9%, peak 2167.35ms), i.e. a fixed ~2.1s added delay; the second alert ts-order-service RESOURCE_SATURATION [cpu_cfs] Val: 0.255s (Throttled) is a bare saturation row with no latency row of its own (pod on worker-02, not on ts-assurance-service's call path) = collateral noise. GetServiceDependencies(ts-assurance-service) shows it is a leaf node (Driving: called by ts-gateway-service/ts-preserve-service/ts-preserve-other-service; Downstream: none), so no downstr

### case-18

- **结论**：`app/ts-basic-service` + `pod_network_delay` ｜ 标签 `app/ts-basic-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 315,935
- **raw 日志**：[results/1020_2309_tsm-v1-b29/raw/1020_2309_trainticket-performance-18](../results/1020_2309_tsm-v1-b29/raw/1020_2309_trainticket-performance-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts-first per L3 exact section. GetAlerts shows ts-basic-service as the epicenter: LATENCY_DEGRADATION with BOTH p50 (38.94ms -> 6806.17ms, +17377.7%) and p90 (52.50ms -> 9361.24ms, +17730.9%) moving and the steepest p90 escalation, plus THROUGHPUT_DROP -54.1%. ts-preserve-service also dual-moves (p50 857.14ms -> 20000ms, p90 3846.15ms -> 28000ms) but the L1 call graph (ts-preserve-service -> ts-basic-service) makes it the UPSTREAM accumulated wait, so the downstream row (ts-basic-service) is the source. ts-travel-service is p90-only (ripple); ts-cancel-service and ts-inside-payment-service

### case-19

- **结论**：`app/ts-cancel-service` + `pod_network_delay` ｜ 标签 `app/ts-cancel-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 303,662
- **raw 日志**：[results/1020_2315_tsm-v1-b32/raw/1020_2316_trainticket-performance-19](../results/1020_2315_tsm-v1-b32/raw/1020_2316_trainticket-performance-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert-first chain (L3 exact). ts-cancel-service is the only row whose p50 AND p90 both moved (p50 81.78ms -> 2740.39ms +3250.9%, p90 240.83ms -> 7433.33ms +2986.5%), marking the epicenter; ts-gateway-service (p90 1096->2976ms) and ts-ui-dashboard (p90 990->2922ms) are p90-only ripples on the gateway->cancel path, and ts-inside-payment-service p90 +1004ms is far too small to explain cancel's +7192ms accumulated wait. ts-order-service carries only a bare RESOURCE_SATURATION [cpu_cfs] row (Val: 0.306s Throttled) with no latency row of its own -> collateral noise, not the source. Object layer excl

### case-20

- **结论**：`app/ts-contacts-service` + `pod_network_delay` ｜ 标签 `app/ts-contacts-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 328,265
- **raw 日志**：[results/1020_2327_tsm-v1-b38/raw/1020_2328_trainticket-performance-20](../results/1020_2327_tsm-v1-b38/raw/1020_2328_trainticket-performance-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 'alerts first' walk. Alerts: only ts-contacts-service and ts-preserve-service move BOTH p50 and p90 (contacts 7.57ms->4930.56ms p50, 9.65ms->8977.02ms p90; preserve 1219.98ms->7500.00ms p50, 3236.00ms->9500.00ms p90), while ts-gateway-service and ts-ui-dashboard move p90 only (+493%/+491%) = ripples, and ts-order-service is a bare cpu_cfs row with no latency of its own = collateral. GetServiceDependencies shows ts-preserve-service -> ts-contacts-service on one call path, so the downstream row is the source: epicenter = ts-contacts-service. That service is a leaf ('Leaf Node - No downstream 

### case-21

- **结论**：`app/ts-food-service` + `pod_network_delay` ｜ 标签 `app/ts-food-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 13 · tokens 203,641
- **raw 日志**：[results/1020_2333_tsm-v1-b41/raw/1020_2333_trainticket-performance-21](../results/1020_2333_tsm-v1-b41/raw/1020_2333_trainticket-performance-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts-first (L3 exact 'Service quality degradation.'). GetAlerts shows ts-food-service as the epicenter: LATENCY_DEGRADATION with BOTH p50 (17.50ms -> 7500.00ms, +42757.1%) and p90 (23.50ms -> 9500.00ms, +40325.5%) moving by a roughly fixed added delay (~+7.5s/+9.5s), i.e. a constant shift of the whole distribution. ts-preserve-service is the only other dual-moving row (p50 1206.09->7916.67ms, p90 2541.67->16333.33ms) and GetServiceDependencies proves the call path ts-preserve-service -> ts-food-service, so per the downstream-is-source rule the epicenter is ts-food-service and preserve's rise

### case-22

- **结论**：`app/ts-gateway-service` + `pod_network_delay` ｜ 标签 `app/ts-gateway-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 515,615
- **raw 日志**：[results/1020_2338_tsm-v1-b44/raw/1020_2339_trainticket-performance-22](../results/1020_2338_tsm-v1-b44/raw/1020_2339_trainticket-performance-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (2026-03-19 22:10:28~22:12:18) show a whole-system Network Drop sweep: 21 services all lose inbound/outbound traffic, with NO service-level latency row (ts-payment-service LATENCY_MISSING is a collection hole, not a deviation). The point every request flows through, ts-gateway-service, has the steepest collapse (Inbound 667.58pps -> 283.68pps, -57.5%; Outbound -62.5%; RPS 5.92 -> 1.30 req/s, -78.0%), and its own istio-proxy container logs network write failures only inside the injection window: '2026-03-19T14:10:39Z error failed to scraping and writing envoy metrics: write tcp 172.20.3.

### case-23

- **结论**：`app/ts-inside-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-inside-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 157,524
- **raw 日志**：[results/1020_2345_tsm-v1-b47/raw/1020_2345_trainticket-performance-23](../results/1020_2345_tsm-v1-b47/raw/1020_2345_trainticket-performance-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact-match SOP applied: alerts first, then epicenter by row shape. In the single window 10:56:33~10:59:08, ts-inside-payment-service is the only dual-moving latency row with the steepest p90 escalation: 'p50latency: Normal=42.42ms -> Current=13725.49ms (+32253.1%) | Peak=17000.00ms', 'p90latency: Normal=196.00ms -> Current=26745.10ms (+13545.5%)', plus 'THROUGHPUT_DROP [RPS] | Normal=1.01req/s -> Current=0.29req/s (-71.0%)'. p50 movement means the delay covers all of its traffic (epicenter). Its callers/ripples are consistent: ts-cancel-service (upstream per GetServiceDependencies: 'Upstre

### case-24

- **结论**：`app/ts-order-service` + `pod_network_delay` ｜ 标签 `app/ts-order-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 365,995
- **raw 日志**：[results/1020_2350_tsm-v1-b50/raw/1020_2351_trainticket-performance-24](../results/1020_2350_tsm-v1-b50/raw/1020_2351_trainticket-performance-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts window 2026-03-20 11:12:41~11:14:31: 19 entities ABNORMAL, no RESOURCE_SATURATION row at all. Dual-moving (p50+p90) latency rows mark the epicenter: ts-order-service p50 134.03->4637.29ms (+3359.9%), p90 1999.56->19476.20ms (+874.0%, Peak 252000ms), with THROUGHPUT_DROP 6.14->2.10req/s (-65.8%) and TRAFFIC_ANOMALY [Network Drop] inbound -47.4% / outbound -55.1%. p90-only ripples are ts-gateway-service (2097.73->4500ms) and ts-travel-service (1506.25->7125ms). GetServiceDependencies shows the chain ts-preserve-service -> ts-seat-service -> ts-order-service, and ts-order-service reports '

### case-25

- **结论**：`app/ts-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 299,065
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0014_trainticket-performance-25](../results/1021_0900_tsm-v1-fix/raw/1021_0014_trainticket-performance-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact section for 'Service quality degradation.' mandates alerts-first; GetAlerts shows ts-payment-service moving BOTH p50 (16.12ms -> 6477.27ms) and p90 (23.25ms -> 9295.45ms) plus Success Rate 100% -> 81.7% = epicenter, while ts-inside-payment-service moves only p90 (518.75 -> 7625ms, partial-traffic ripple) and ts-order-service carries a bare cpu_cfs row (0.836s Throttled) with no latency of its own (collateral noise). L1 relations confirm the call edge ts-inside-payment-service -> ts-payment-service, so the downstream row is the source; GetServiceDependencies shows ts-payment-service is

### case-26

- **结论**：`app/ts-preserve-service` + `pod_network_delay` ｜ 标签 `app/ts-preserve-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 271,182
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0705_trainticket-performance-26](../results/1021_0900_tsm-v1-fix/raw/1021_0705_trainticket-performance-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts-first walk (L3 exact). GetAlerts shows 5 anomalies: ts-preserve-service is the ONLY dual-moving latency row (p50 3571.43ms -> 8453.99ms +136.7% AND p90 10500.00ms -> 23627.85ms +125.0%, peak 25411.76ms); ts-food-service (p90 only 23.50 -> 1750.00ms) and ts-basic-service (p90 only 49.15 -> 1145.55ms) are p90-only ripples on its downstream call edges; ts-order-service shows only a bare RESOURCE_SATURATION [cpu_cfs] Val 0.519s (Throttled) with no latency row of its own = collateral noise; ts-assurance-service cpu core 0.01 -> 0.01 (+68%) is sub-core noise. Dependency graph confirms ts-basi

### case-27

- **结论**：`app/ts-price-service` + `pod_network_delay` ｜ 标签 `app/ts-price-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 208,557
- **raw 日志**：[results/1021_0101_tsm-v1-b59/raw/1021_0101_trainticket-performance-27](../results/1021_0101_tsm-v1-b59/raw/1021_0101_trainticket-performance-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP matched verbatim. Alerts first: ts-price-service LATENCY_DEGRADATION with BOTH percentiles moving - p50 7.50ms->3216.46ms (+42786.2%) and p90 9.62ms->4643.29ms (+48187.2%), the steepest escalation among dual-moving rows. Call graph closes it: ts-preserve-service (p50 2291.67->7500ms) -> ts-basic-service (p50 39.75->3750ms) -> ts-price-service (leaf, no downstream), so the upstream rows are accumulated wait on the callee and the leaf is the source; ts-travel-service moved only p90 (1927->4487ms) and sits upstream of basic-service, i.e. a ripple. No saturation row exists for ts-price-serv

### case-28

- **结论**：`app/ts-route-service` + `pod_network_delay` ｜ 标签 `app/ts-route-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 244,124
- **raw 日志**：[results/1021_0107_tsm-v1-b62/raw/1021_0107_trainticket-performance-28](../results/1021_0107_tsm-v1-b62/raw/1021_0107_trainticket-performance-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (12:19:31~12:21:26) name two LATENCY_DEGRADATION rows on one call path: ts-basic-service (p50 40.22ms->18501.83ms, p90 72.00ms->27700.37ms) and ts-route-service (p50 7.66ms->8224.79ms +107329.3%, p90 9.78ms->21100.00ms +215624.4%). ts-route-service is the DOWNSTREAM node and a LEAF in the call graph (ts-basic-service -> ts-route-service; GetServiceDependencies says 'Leaf Node - No downstream calls'), and its p90 escalation is the steepest, so it is the epicenter; ts-basic-service's 18.5s is accumulated wait on its callee. ts-travel-service moved p90 only (ripple, no p50 move). ts-order-

### case-29

- **结论**：`app/ts-seat-service` + `pod_network_delay` ｜ 标签 `app/ts-seat-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1538 · steps 14 · tokens 425,078
- **raw 日志**：[results/1021_0115_tsm-v1-b65/raw/1021_0115_trainticket-performance-29](../results/1021_0115_tsm-v1-b65/raw/1021_0115_trainticket-performance-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (window 12:36:16~12:38:06) show ts-seat-service as the epicenter by row shape: p50 222.24ms->3409.09ms (+3186.85ms) and p90 1689.06ms->4727.27ms (+3038.21ms) shift by the SAME fixed ~3.1s (constant additive delay, dual-moving row), while ts-preserve-service (p50 +5923.61ms) and ts-travel-service (p90 +6750.79ms) are p50/p90-only ripples on the UPPER side of the same call path (ts-preserve-service -> ts-seat-service, ts-travel-service -> ts-seat-service per GetServiceDependencies), i.e. accumulated wait on the callee. ts-order-service carries only a bare RESOURCE_SATURATION [cpu_cfs] Val

### case-30

- **结论**：`app/ts-security-service` + `pod_network_delay` ｜ 标签 `app/ts-security-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 261,821
- **raw 日志**：[results/1021_0127_tsm-v1-b71/raw/1021_0128_trainticket-performance-30](../results/1021_0127_tsm-v1-b71/raw/1021_0128_trainticket-performance-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert window 2026-03-20 12:52:59~12:54:54 fires 5 saturation alerts. Four are noise per the L3 read rules: ts-order-service shows a constant 'RESOURCE_SATURATION [cpu_cfs] | Val: 0.732s (Throttled)' with no movement, and ts-payment-service / ts-inside-payment-service / ts-user-service only move 0.01->0.02 cores (sub-core = sub-noise). The single row carrying a real deviation is ts-security-service: 'TRAFFIC_ANOMALY [Network Surge] | Inbound: Normal=5.06pps -> Current=12.71pps (+151.4%) | Outbound: Normal=5.37pps -> Current=13.41pps (+149.9%)' plus a sub-core cpu bump 0.01->0.02 cores (+74.9%) 

### case-31

- **结论**：`app/ts-station-service` + `pod_network_delay` ｜ 标签 `app/ts-station-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 316,815
- **raw 日志**：[results/1021_0134_tsm-v1-b74/raw/1021_0135_trainticket-performance-31](../results/1021_0134_tsm-v1-b74/raw/1021_0135_trainticket-performance-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts first (L3 exact rule): ts-station-service shows a dual-moving latency row (p50 3.86ms -> 3105.56ms, p90 8.56ms -> 4618.16ms) and ts-basic-service also dual-moves (p50 38.75 -> 7500ms, p90 49.75 -> 9500ms); ts-travel-service is p90-only (3291 -> 8903ms) = partial-traffic ripple, and the bare cpu_cfs (ts-order-service 0.674s Throttled) / sub-core cpu rows (ts-train, ts-user 0.01->0.02 cores) carry no latency of their own = collateral noise. Call graph closes it: GetServiceDependencies shows ts-basic-service -> ts-station-service and ts-station-service is a Leaf Node, so on the single call

### case-32

- **结论**：`app/ts-train-service` + `pod_network_delay` ｜ 标签 `app/ts-train-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 292,839
- **raw 日志**：[results/1021_0140_tsm-v1-b77/raw/1021_0140_trainticket-performance-32](../results/1021_0140_tsm-v1-b77/raw/1021_0140_trainticket-performance-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name two latency rows on one call path: ts-basic-service (p50 38.33ms->3750ms, +9682.7%; p90 49ms->4750ms, +9593.9%) and ts-train-service (p50 7.38ms->2425ms, +32754.6%; p90 9.48ms->4472.22ms, +47095.3%). GetServiceDependencies shows ts-basic-service -> ts-train-service, and ts-train-service is a leaf (no downstream calls), so per the downstream-is-source rule ts-train-service is the epicenter and ts-basic-service's row is its accumulated wait on the callee. Both p50 and p90 move together (delay across all traffic), ts-train-service has no RESOURCE_SATURATION row of its own, and its ups

### case-33

- **结论**：`app/ts-travel-service` + `pod_network_delay` ｜ 标签 `app/ts-travel-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 219,488
- **raw 日志**：[results/1021_0146_tsm-v1-b80/raw/1021_0146_trainticket-performance-33](../results/1021_0146_tsm-v1-b80/raw/1021_0146_trainticket-performance-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name the case in the metric surface: ts-travel-service LATENCY_DEGRADATION [Slow Response] p50 46.88ms -> 2416.67ms (+5055.6%, Peak 5500ms) and p90 2791.67ms -> 8944.44ms (+220.4%), plus TRAFFIC_ANOMALY [Network Surge] Inbound 6.75 -> 13.99pps (+107.2%) / Outbound 6.66 -> 13.60pps (+104.0%). It is the only row where both p50 and p90 move (full-traffic delay = epicenter); ts-order-service RESOURCE_SATURATION [cpu_cfs] Val: 0.859s (Throttled) and ts-security-service [cpu core] 0.01 -> 0.02 cores are saturation-only rows with no latency of their own (collateral noise, sub-core percentages)

### case-34

- **结论**：`app/ts-ui-dashboard` + `pod_network_delay` ｜ 标签 `app/ts-user-service` + `pod_network_delay`（✗ 与标签不符）
- **流程**：MC 0.5 · EOC 0.5 · ECR 0 · EE 0.2381 · steps 22 · tokens 404,932
- **raw 日志**：[results/1021_0150_tsm-v1-b82/raw/1021_0150_trainticket-performance-34](../results/1021_0150_tsm-v1-b82/raw/1021_0150_trainticket-performance-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert surface: ts-ui-dashboard LATENCY_DEGRADATION p90latency 0.00ms -> 194400.00ms (Peak 273840.30ms); the second alert ts-auth-service is LATENCY_MISSING ('Metrics dropped to zero/NaN after injection'), a collection hole, not a deviation, so it was not used as anchor. Object layer: only outlier row is ts-ui-dashboard-554844f867-trfg6 on worker-02 with RESTARTS 3; all other 42 service pods are Running 2/2 with RESTARTS 0. Victim-side log evidence (GetErrorLogs ts-ui-dashboard): repeated nginx '[error] upstream timed out (110: Operation timed out) while reading response header from upstream' f

### case-35

- **结论**：`app/ts-basic-service` + `pod_network_delay` ｜ 标签 `app/ts-basic-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 189,702
- **raw 日志**：[results/1021_0156_tsm-v1-b85/raw/1021_0157_trainticket-performance-35](../results/1021_0156_tsm-v1-b85/raw/1021_0157_trainticket-performance-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP match=exact demanded alerts-first. GetAlerts (window 2026-03-15 22:28:53~22:31:28) shows ts-basic-service LATENCY_DEGRADATION with BOTH p50 38.97ms->6833.33ms (+17434.4%) and p90 53.89ms->9366.67ms (+17281.4%) moving; ts-preserve-service p50 990.67->19696.97ms / p90 4117->27939ms also dual-moving; ts-gateway-service, ts-ui-dashboard and ts-travel-service move p90 only (partial-traffic ripples); ts-order-service has only a bare RESOURCE_SATURATION [cpu_cfs] 'Val: 0.213s (Throttled)' with no latency row of its own (collateral noise). GetServiceDependencies confirms the call path ts-preser

### case-36

- **结论**：`app/ts-contacts-service` + `pod_network_delay` ｜ 标签 `app/ts-contacts-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 342,371
- **raw 日志**：[results/1021_0201_tsm-v1-b88/raw/1021_0201_trainticket-performance-36](../results/1021_0201_tsm-v1-b88/raw/1021_0201_trainticket-performance-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show a system-wide Network Drop sweep plus latency rows; only ts-contacts-service moves BOTH p50 (18.85ms -> 7500ms, +39683.6%) and p90 (92.28ms -> 10000ms, +10736.8%), the steepest escalation, marking it the epicenter, while ts-gateway-service, ts-preserve-service and ts-ui-dashboard move p90 only (ripples) and the L1 relation graph confirms gateway -> contacts and preserve -> contacts (upstream rows are accumulated wait on the callee). ts-contacts-service is a leaf (no downstream calls), so no callee can carry the delay. The object layer is clean and excludes other classes: pod ts-con

### case-37

- **结论**：`app/ts-food-service` + `pod_network_delay` ｜ 标签 `app/ts-food-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 312,455
- **raw 日志**：[results/1021_0205_tsm-v1-b90/raw/1021_0206_trainticket-performance-37](../results/1021_0205_tsm-v1-b90/raw/1021_0206_trainticket-performance-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts first (L3 exact-order): 5 anomaly rows. ts-food-service is the ONLY dual-moving row - p50 18.41ms->6829.27ms (+36997.4%) AND p90 28.75ms->9365.85ms (+32476.9%), i.e. a roughly constant multi-second delay added to ALL of its traffic. Its callers move on one decile only (partial-traffic ripple): ts-preserve-service p50 1812.50->7316.64ms, ts-gateway-service p90 1023.08->5250.00ms, ts-ui-dashboard p90 941.99->5175.00ms; the call graph ts-gateway-service -> ts-preserve-service -> ts-food-service closes it, and on a shared call path the downstream row is the source while upstream rows are ac

### case-38

- **结论**：`app/ts-inside-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-inside-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 257,781
- **raw 日志**：[results/1021_0211_tsm-v1-b93/raw/1021_0211_trainticket-performance-38](../results/1021_0211_tsm-v1-b93/raw/1021_0211_trainticket-performance-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name ts-inside-payment-service as the epicenter: LATENCY_DEGRADATION [Slow Response] with BOTH p50 (363.23ms -> 8333.33ms, +2194.2%, peak 9166.67ms) and p90 (6184.73ms -> 22000ms, +255.7%) moving together, plus TRAFFIC_ANOMALY [Inbound SURGE] 23.35pps -> 55.80pps (+139%). The only other alert is a bare RESOURCE_SATURATION [cpu_cfs] Val: 0.435s (Throttled) on ts-order-service (the callee of ts-inside-payment-service) with no latency row of its own; ts-order-service GetErrorLogs is empty (server side clean), so that throttle row is collateral noise rather than the source. The delay is sco

### case-39

- **结论**：`app/ts-order-service` + `pod_network_delay` ｜ 标签 `app/ts-order-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 410,927
- **raw 日志**：[results/1021_0215_tsm-v1-b95/raw/1021_0216_trainticket-performance-39](../results/1021_0215_tsm-v1-b95/raw/1021_0216_trainticket-performance-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP for 'Service quality degradation.' matched exactly (alerts first). 17 alerts in one window (23:39:22~23:41:12). Latency rows exist only along one call path: ts-ui-dashboard and ts-gateway-service move only p90 (ripples, 2928->48000ms / 2623->46500ms), while ts-order-service is the only dual-moving leaf row (p50 308.38->9843.75ms, +3092%; p90 2060.99->25875ms, +1155%) and GetServiceDependencies shows 'Downstream (Calls): (No confirmed downstream calls in current reachable main flow)'. L1 relations confirm gateway/preserve/security/seat -> ts-order-service and travel -> seat -> order-serv

### case-40

- **结论**：`app/ts-payment-service` + `pod_network_delay` ｜ 标签 `app/ts-payment-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 267,267
- **raw 日志**：[results/1021_0225_tsm-v1-b100/raw/1021_0226_trainticket-performance-40](../results/1021_0225_tsm-v1-b100/raw/1021_0226_trainticket-performance-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts first (L3 exact section): 3 anomalies in the same window 2026-03-15 23:53:35~23:55:25. ts-payment-service LATENCY_DEGRADATION p50 16.70ms->4464.29ms (+26638.7%), p90 40.96ms->8722.22ms (+21194.5%) (both percentiles move, steepest escalation on the lowest baseline); ts-inside-payment-service p50 300.48ms->6048.39ms, p90 822.19ms->9209.68ms with success rate 100%->67.6%; ts-order-service only a bare RESOURCE_SATURATION [cpu_cfs] 'Val: 0.560s (Throttled)' row with no latency rise of its own = collateral noise. Call graph GetServiceDependencies: ts-inside-payment-service -> ts-payment-servi

### case-41

- **结论**：`app/ts-preserve-service` + `pod_network_delay` ｜ 标签 `app/ts-preserve-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 352,386
- **raw 日志**：[results/1021_0231_tsm-v1-b103/raw/1021_0231_trainticket-performance-41](../results/1021_0231_tsm-v1-b103/raw/1021_0231_trainticket-performance-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts-first per the matched L3 section. Three alerts in window 00:07:48-00:09:38: ts-preserve-service p90 8983.07ms -> 22000.00ms (+144.9%, peak 26000ms); ts-ui-dashboard p90 2732.14ms -> 5958.33ms (+118.1%, peak 7409ms); ts-order-service RESOURCE_SATURATION [cpu_cfs] Val 0.375s (Throttled) with no latency row of its own. Call graph browser -> ts-ui-dashboard -> ts-gateway-service -> ts-preserve-service -> ts-order-service puts the two moving latency rows on ONE call path, so the downstream row (ts-preserve-service) is the source and ts-ui-dashboard's rise is its accumulated wait; preserve al

### case-42

- **结论**：`app/ts-route-service` + `pod_network_delay` ｜ 标签 `app/ts-route-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 368,756
- **raw 日志**：[results/1021_0236_tsm-v1-b105/raw/1021_0236_trainticket-performance-42](../results/1021_0236_tsm-v1-b105/raw/1021_0236_trainticket-performance-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts names ts-route-service as the epicenter: its own latency row moves BOTH quantiles (p50 7.50ms -> 8103.45ms, +107946%; p90 9.50ms -> 22000.00ms, +231478%, the steepest p90 escalation in the incident) and it is the deepest node of the call path, a LEAF with no downstream (GetServiceDependencies: Upstream=gateway/travel/travel2/basic/route-plan/rebook, Downstream=none), so ts-basic-service (p50 40.00ms -> 16571.43ms, p90 72.69ms -> 27314.29ms) is its caller accumulating wait on the callee, while ts-travel-service (p90-only) and ts-preserve-service are ripples. Object layer is fully excl

### case-43

- **结论**：`app/ts-seat-service` + `pod_network_delay` ｜ 标签 `app/ts-seat-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 235,304
- **raw 日志**：[results/1021_0242_tsm-v1-b108/raw/1021_0242_trainticket-performance-43](../results/1021_0242_tsm-v1-b108/raw/1021_0242_trainticket-performance-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP for 'Service quality degradation.' is alerts-first. GetAlerts returned 4 rows: ts-seat-service LATENCY_DEGRADATION 'p50latency: Normal=189.50ms -> Current=3341.67ms (+1663.4%) | Peak=3522.73ms' plus TRAFFIC_ANOMALY 'Inbound: Normal=10.52pps -> Current=28.20pps (+168.1%) | Outbound: 10.97pps -> 24.51pps (+123.4%)'; ts-travel-service p90 only 'Normal=904.72ms -> Current=8951.22ms (+889.4%)'; ts-order-service bare 'RESOURCE_SATURATION [cpu_cfs] | Val: 0.509s (Throttled)' with RPS +192% but no latency row of its own; ts-ui-dashboard RPS +130%. GetServiceDependencies and L1 relations both co

### case-44

- **结论**：`app/ts-station-service` + `pod_network_delay` ｜ 标签 `app/ts-station-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 256,590
- **raw 日志**：[results/1021_0246_tsm-v1-b110/raw/1021_0246_trainticket-performance-44](../results/1021_0246_tsm-v1-b110/raw/1021_0246_trainticket-performance-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts-first: 4 in-window alerts. ts-station-service is the epicenter - the steepest dual-moving latency row (p50 6.99ms -> 2500.00ms, +35691.0%; p90 26.79ms -> 4500.00ms, +16694.8%), and it is the downstream-most end of the single call path (L1 relations: ts-preserve-service -> ts-basic-service -> ts-station-service), so ts-basic-service's p50 121.72 -> 7607.14ms row is its accumulated wait on the callee while ts-preserve-service p50 2011.08 -> 20000.00ms is pinned at the 20000ms timeout ceiling. ts-order-service shows only a bare RESOURCE_SATURATION [cpu_cfs] Val: 0.502s (Throttled) row with

### case-45

- **结论**：`app/ts-train-service` + `pod_network_delay` ｜ 标签 `app/ts-train-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 15 · tokens 227,054
- **raw 日志**：[results/1021_0250_tsm-v1-b112/raw/1021_0250_trainticket-performance-45](../results/1021_0250_tsm-v1-b112/raw/1021_0250_trainticket-performance-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP match=exact (alerts-first). Alerts show 3 latency rows on one call path (verified deps: ts-preserve-service -> ts-basic-service -> ts-train-service, and ts-train-service is a '(Leaf Node - No downstream calls)'). ts-train-service is the only dual-percentile row with a measured baseline: p50 8.35ms -> 2500.00ms (+29843.7%, peak 2970.69ms) and p90 411.79ms -> 4500.00ms (+992.8%, peak 4594.14ms) - a constant added delay of ~2.5-4.1s on its own latency; as a leaf it cannot be inheriting wait. Upstream rows are their accumulated wait on the callee: ts-basic-service p50 317.41ms -> 3709.68ms 

### case-46

- **结论**：`app/ts-travel-service` + `pod_network_delay` ｜ 标签 `app/ts-travel-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 357,254
- **raw 日志**：[results/1021_0255_tsm-v1-b115/raw/1021_0255_trainticket-performance-46](../results/1021_0255_tsm-v1-b115/raw/1021_0255_trainticket-performance-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name exactly one latency row: ts-travel-service LATENCY_DEGRADATION 'p90latency: Normal=9.45ms -> Current=2121.88ms (+22357.3%) | Peak=2181.07ms' — p90 and Peak are nearly equal, i.e. a fixed ~2.1s additive delay rather than a long tail. Its downstream calls (ts-basic-service, ts-route-service, ts-train-service, ts-seat-service) carry no alerts at all (downstream server-side clean), and ts-travel-service itself has no RESOURCE_SATURATION row; the ts-order-service 'RESOURCE_SATURATION [cpu_cfs] | Val: 0.671s (Throttled)' and ts-auth-service 'cpu_cfs 0.057s' rows have no latency row of th

### case-47

- **结论**：`app/ts-user-service` + `pod_network_delay` ｜ 标签 `app/ts-user-service` + `pod_network_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 507,834
- **raw 日志**：[results/1021_0258_tsm-v1-b117/raw/1021_0258_trainticket-performance-47](../results/1021_0258_tsm-v1-b117/raw/1021_0258_trainticket-performance-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name only two latency rows: ts-preserve-service (p50 0->4833ms, p90 0->8981ms, peak 41417ms) and ts-user-service (p50 0->2460ms, p90 0->4486ms). Call graph shows edge ts-preserve-service -> ts-user-service, so by the L3 rule for two moving rows on one call path the downstream row (ts-user-service) is the source and preserve's larger escalation is its accumulated wait on the callee. ts-user-service has NO saturation row of its own; its downstream ts-auth-service shows only a sub-core cpu blip (0.02->0.05 cores) with no latency row = collateral noise; ts-order-service cpu_cfs 1.029s Throt

