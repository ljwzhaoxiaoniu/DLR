# 评测明细 · boutique/codedefect — cloudopsbench

> 本家族已跑 **41/98** 题：JRA ✅41 ❌0 ｜ 证据链全闭 41 ｜ token 中位 325,537 ｜ 生成 2026-10-13T15:19:54.467Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 129,107 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 126,973 | 0 | 0 | 1012_1846_inorder4-v3b4 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 198,922 | 0 | 0 | 1012_1935_tidy-verify1 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 207,400 | 0 | 0 | 1013_1448_chainhead-verify2 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 181,235 | 0 | 0 | 1013_1225_inorder4-v3b11 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 163,551 | 0 | 1 | 1013_1413_inorder4-v3b15 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 181,778 | 0 | 0 | 1013_1536_inorder4-v3b19 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 254,844 | 0 | 0 | 1013_1623_inorder4-v3b21 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 166,187 | 0 | 0 | 1013_1633_inorder4-v3b23 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 180,151 | 0 | 0 | 1013_1645_inorder4-v3b24 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 200,618 | 0 | 0 | 1013_1805_inorder4-v3b26 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2609 | 24 | 248,815 | 0 | 0 | 1013_1831_inorder4-v3b29 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 23 | 245,322 | 0 | 0 | 1013_1839_inorder4-v3b31 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 300,857 | 0 | 0 | 1013_2004_inorder4-v3b36 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 31 | 382,747 | 0 | 0 | 1013_2025_chainpivot-verify1 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.0909 | 67 | 1,911,726 | 0.0152 | 0 | 1013_2040_chainpivot-verify2 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1724 | 30 | 365,254 | 0 | 0 | 1013_2042_inorder4-v3b39 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1351 | 38 | 650,011 | 0 | 0 | 1013_2049_inorder4-v3b40 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 386,921 | 0 | 0 | 1013_2059_inorder4-v3b41 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 197,018 | 0 | 0 | 1013_2106_inorder4-v3b42 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 149,851 | 0 | 0 | 1013_2110_inorder4-v3b43 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 325,537 | 0 | 0 | 1013_2114_inorder4-v3b44 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 330,738 | 0 | 0 | 1013_2133_inorder4-v3b45 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1724 | 30 | 514,584 | 0 | 0 | 1013_2200_cod24-verify2 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 26 | 446,652 | 0 | 0 | 1013_2150_inorder4-v3b47 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 26 | 374,809 | 0 | 0 | 1013_2156_inorder4-v3b48 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 0.4 | 1 | 0.1852 | 28 | 587,242 | 0 | 0 | 1013_2203_inorder4-v3b49 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2381 | 22 | 356,032 | 0 | 0 | 1013_2210_inorder4-v3b50 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 177,788 | 0 | 0 | 1013_2214_inorder4-v3b51 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1579 | 39 | 1,081,143 | 0.0526 | 0 | 1013_2217_inorder4-v3b52 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.119 | 43 | 334,856 | 0 | 0 | 1013_2229_inorder4-v3b53 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1136 | 45 | 831,616 | 0 | 0 | 1013_2235_inorder4-v3b54 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1111 | 46 | 1,073,129 | 0 | 0 | 1013_2240_inorder4-v3b55 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 382,069 | 0 | 0 | 1013_2245_inorder4-v3b56 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1364 | 23 | 285,528 | 0 | 0 | 1013_2249_inorder4-v3b57 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1579 | 20 | 394,816 | 0 | 0 | 1013_2253_inorder4-v3b58 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 240,302 | 0 | 0 | 1013_2258_inorder4-v3b59 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 22 | 452,396 | 0 | 0 | 1013_2303_inorder4-v3b60 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 289,503 | 0 | 0 | 1013_2308_inorder4-v3b61 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 353,688 | 0 | 0 | 1013_2311_inorder4-v3b62 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2333 | 31 | 1,115,150 | 0.0333 | 0 | 1013_2315_inorder4-v3b63 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 129,107
- **raw 日志**：[results/1012_1415_inorder4-v3/raw/1012_1417_boutique-codedefect-1](../results/1012_1415_inorder4-v3/raw/1012_1417_boutique-codedefect-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods scan in namespace boutique shows the only outlier is checkoutservice-7c8866657f-db778: RESTARTS 4 (61s ago), age 2m31s, while all other 10 pods have 0 restarts. kubectl describe shows the 'server' container Last State Terminated with Reason=Error, Exit Code=2 (not 137, so not OOMKilled), and a kubelet event 'Warning BackOff (x5 over 2m11s) Back-off restarting failed container server'; probes (grpc 5050) match the container port, so probe/scheduling/image/volume causes are excluded. Container logs of the previous instance show 'panic: mismatching currency codes' raised from money.Must at m

### case-2

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 126,973
- **raw 日志**：[results/1012_1846_inorder4-v3b4/raw/1012_1850_boutique-codedefect-2](../results/1012_1846_inorder4-v3b4/raw/1012_1850_boutique-codedefect-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice pod (checkoutservice-7c8866657f-927cq, worker-01) is the only outlier in the pods listing: 1/2 Ready, RESTARTS 4 (50s ago), ContainersReady=False, with kubelet events 'Back-off restarting failed container server'. The container 'server' last termination state is Reason=Error ExitCode=2; its logs end in 'panic: mismatching currency codes' at money.Must (money/money.go:85) called from main.(*checkoutService).PlaceOrder (main.go:294). Source inspection of checkoutservice/main.go shows PlaceOrder swaps the two variables right after reading them (userID, userCurrency = userCurrency,

### case-3

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 198,922
- **raw 日志**：[results/1012_1935_tidy-verify1/raw/1012_1936_boutique-codedefect-3](../results/1012_1935_tidy-verify1/raw/1012_1936_boutique-codedefect-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Outlier scan of boutique pods: only checkoutservice-7c8866657f-hpwj6 is 1/2 READY with 4 restarts; the reported disruption enters from frontend ('POST /cart/checkout' 500 x167) whose call edge goes to checkoutservice. Pod detail/events show container 'server' Last State Terminated Reason=Error Exit Code=2 and kubelet 'Warning BackOff ... Back-off restarting failed container server in pod checkoutservice-7c8866657f-hpwj6'. Error logs show the sole pattern 'panic: mismatching currency codes' with stack money.Must(/src/money/money.go:85) <- checkoutService.PlaceOrder(/src/main.go:294). Source clo

### case-4

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 207,400
- **raw 日志**：[results/1013_1448_chainhead-verify2/raw/1013_1448_boutique-codedefect-4](../results/1013_1448_chainhead-verify2/raw/1013_1448_boutique-codedefect-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice pod checkoutservice-7c8866657f-68dwf is the sole outlier (READY 1/2, STATUS Error, 4 restarts); its server container terminated with Reason=Error Exit Code=2 and logs show 'panic: mismatching currency codes' at money.Must (money/money.go:85) called from PlaceOrder (main.go:294). Source code shows the injected defect in main.go PlaceOrder: 'userID, userCurrency = userCurrency, userID' swaps the two arguments before prepareOrderItemsAndShippingQuoteFromCart, so prices are converted to an invalid currency code while the order total keeps req.UserCurrency, making money.Sum return E

### case-5

- **结论**：`app/checkoutservice` + `code_busy_loop` ｜ 标签 `app/checkoutservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 181,235
- **raw 日志**：[results/1013_1225_inorder4-v3b11/raw/1013_1225_boutique-codedefect-5](../results/1013_1225_inorder4-v3b11/raw/1013_1225_boutique-codedefect-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts() shows a single anomaly entity: checkoutservice — RESOURCE_SATURATION [cpu] Normal=0.00 -> Current=0.07 cores (+4631%), RESOURCE_SATURATION [cpu_cfs] 0.396s throttled, and LATENCY_DEGRADATION p50 Normal=18.62ms -> Current=750.00ms (peak=754.35ms). Object-layer exclusion is clean: all 11 boutique pods are 2/2 Running with RESTARTS=0, GetErrorLogs(checkoutservice) is empty, and all 4 nodes are Ready with 8 allocatable CPU cores and no taints/pressure, so node capacity, scheduling and probe paths are ruled out — the break is at the metric level on checkoutservice. GetSourceCode(checkou

### case-6

- **结论**：`app/checkoutservice` + `code_busy_loop` ｜ 标签 `app/checkoutservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 163,551
- **raw 日志**：[results/1013_1413_inorder4-v3b15/raw/1013_1413_boutique-codedefect-6](../results/1013_1413_inorder4-v3b15/raw/1013_1413_boutique-codedefect-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert on checkoutservice: RESOURCE_SATURATION [cpu_cfs] 0.332s throttled, [cpu] 0.00 -> 0.06 cores (+5117.2%), LATENCY_DEGRADATION p50 18.75ms -> 752.94ms (+3915.3%). Object layer excluded by anchor: all boutique pods 2/2 Running with 0 RESTARTS, no warning mechanism events (no OOMKilled/FailedScheduling/FailedMount/probe failures) on the current checkoutservice pod checkoutservice-6cd8767b6d-hznfp; GetAppYAML shows normal 100m/200m cpu request/limit, gRPC health probes on 5050 and matching Service targetPort, so probe/port/reference/quota causes are ruled out. Break is in the code surface: ma

### case-7

- **结论**：`app/checkoutservice` + `code_busy_loop` ｜ 标签 `app/checkoutservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 181,778
- **raw 日志**：[results/1013_1536_inorder4-v3b19/raw/1013_1536_boutique-codedefect-7](../results/1013_1536_inorder4-v3b19/raw/1013_1536_boutique-codedefect-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Telemetry chain (L2 consensus qid=12): the only active alert pins entity checkoutservice with RESOURCE_SATURATION [cpu] Normal=0.00 -> Current=0.07 cores (+5260.9%), RESOURCE_SATURATION [cpu_cfs] Val=0.408s throttled, and LATENCY_DEGRADATION p50 24.08ms -> 752.02ms (+3023.1%, peak 758.26ms). Object-layer exclusion is clean: all 11 boutique pods are 2/2 Running with RESTARTS=0 (checkoutservice-6cd8767b6d-9kbtf alive 0 restarts), GetErrorLogs(checkoutservice) returns no error logs, and recent logs show only normal [PlaceOrder]/payment/email entries, so no probe/OOM/scheduling/startup break exist

### case-8

- **结论**：`app/checkoutservice` + `code_busy_loop` ｜ 标签 `app/checkoutservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 254,844
- **raw 日志**：[results/1013_1623_inorder4-v3b21/raw/1013_1623_boutique-codedefect-8](../results/1013_1623_inorder4-v3b21/raw/1013_1623_boutique-codedefect-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert on entity checkoutservice: RESOURCE_SATURATION [cpu_cfs] 0.380s throttled, CPU Normal=0.00 -> Current=0.07 cores (+4730%), and LATENCY_DEGRADATION p50 19.50ms -> 750.00ms (+3745.8%). Object layer excludes infra faults: all boutique pods 2/2 Running with RESTARTS 0; checkoutservice pod Ready=True, Restart Count 0, limits cpu 200m, grpc probes 5050 healthy; recent logs show successful PlaceOrder/payment/email flow with no error logs; dependency edges frontend->checkoutservice->{productcatalog,shipping,currency,payment,email,cart} intact. Code face reveals the break: checkoutservice main.go

### case-9

- **结论**：`app/checkoutservice` + `code_artificial_delay` ｜ 标签 `app/checkoutservice` + `code_artificial_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 166,187
- **raw 日志**：[results/1013_1633_inorder4-v3b23/raw/1013_1633_boutique-codedefect-9](../results/1013_1633_inorder4-v3b23/raw/1013_1633_boutique-codedefect-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' entered the telemetry chain (L2 qid12). The sole alert names entity checkoutservice with LATENCY_DEGRADATION: p50 19.07ms -> 3750.00ms (+19564%), p90 48.57ms -> 4750.00ms. Object-layer exclusion is clean: all 11 boutique pods are 2/2 Running with RESTARTS 0, GetErrorLogs(checkoutservice) is empty, CheckServiceConnectivity(checkoutservice:5050) succeeds, and namespace events show no scheduling/mount/image-pull/probe failures -> no object-layer break, so the break is in the application path of the alerted entity. Mechanism face: checkoutservice main.go 

### case-10

- **结论**：`app/checkoutservice` + `code_artificial_delay` ｜ 标签 `app/checkoutservice` + `code_artificial_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 180,151
- **raw 日志**：[results/1013_1645_inorder4-v3b24/raw/1013_1645_boutique-codedefect-10](../results/1013_1645_inorder4-v3b24/raw/1013_1645_boutique-codedefect-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' enters the telemetry chain. GetAlerts() returns a single anomaly on entity checkoutservice: LATENCY_DEGRADATION [Slow Response], p50 18.66ms -> 3750.00ms (+19995.4%), p90 64.03ms -> 4750.00ms. Object-layer exclusion is clean: GetResources(pods, boutique) shows all 11 boutique pods 2/2 Running with RESTARTS 0, including checkoutservice-57d5fbd5f5-c9s88; GetErrorLogs(checkoutservice) returns no error logs and the container log shows a normal PlaceOrder -> payment went through -> order confirmation email sent flow; GetAppYAML(checkoutservice) shows corre

### case-11

- **结论**：`app/checkoutservice` + `code_memory_leak` ｜ 标签 `app/checkoutservice` + `code_memory_leak`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 200,618
- **raw 日志**：[results/1013_1805_inorder4-v3b26/raw/1013_1805_boutique-codedefect-11](../results/1013_1805_inorder4-v3b26/raw/1013_1805_boutique-codedefect-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods listing shows a single outlier: checkoutservice-548bb9d487-pqdm2 1/2 CrashLoopBackOff, 3 restarts, while all other 10 services are 2/2 Running with 0 restarts; Deployment checkoutservice is 0/1 AVAILABLE and CheckServiceConnectivity(checkoutservice:5050) returns 'Connection Failed'. Its pod sheet gives the mechanism: container 'server' Last State Terminated Reason=OOMKilled Exit Code=137 with limits memory 128Mi, finished 16:16:11 immediately after the last '[PlaceOrder]' log line at 16:16:10; namespace events add 'Warning BackOff: Back-off restarting failed container server in p

### case-12

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2609 · steps 24 · tokens 248,815
- **raw 日志**：[results/1013_1831_inorder4-v3b29/raw/1013_1831_boutique-codedefect-12](../results/1013_1831_inorder4-v3b29/raw/1013_1831_boutique-codedefect-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with 0 restarts and every Deployment 1/1 AVAILABLE, so no workload/node-level break exists. Emailservice is healthy (endpoints 172.20.2.17:8080 bound, TCP probe on its declared port 5000 'open / Connection Succeeded', normal request logs) yet its request stream stops ~22:39:08, matching the AVAILABILITY_MISSING alert window. The discriminator is the error chain: frontend logs 'failed to complete the order: rpc error: code = Internal desc = failed to charge card: could not charge the card: ... Cannot read properties of null (reading credit_card_number)' (199

### case-13

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 23 · tokens 245,322
- **raw 日志**：[results/1013_1839_inorder4-v3b31/raw/1013_1839_boutique-codedefect-13](../results/1013_1839_inorder4-v3b31/raw/1013_1839_boutique-codedefect-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with 0 restarts, so the object layer (scheduling/startup/admission/probe) is clean. Alerts flag paymentservice and emailservice AVAILABILITY_MISSING, and frontend POST /cart/checkout returns 500. frontend error logs (171x) read: 'failed to complete the order: rpc error: code = Internal desc = failed to prepare order: failed to convert price of "1YMWWN1N4O" to CAD'. currencyservice error logs (171x) read: 'conversion request failed: TypeError: Cannot read properties of null (reading units)', i.e. the Convert RPC arrives with from = null, while all other conv

### case-14

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 300,857
- **raw 日志**：[results/1013_2004_inorder4-v3b36/raw/1013_2004_boutique-codedefect-14](../results/1013_2004_inorder4-v3b36/raw/1013_2004_boutique-codedefect-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice-7558b7bbfc-pqrck is the only outlier in the pods inventory (1/2 READY, STATUS CrashLoopBackOff, RESTARTS 2), while all other boutique pods are 2/2 Running with 0 restarts. Its own record shows the server container Last State Terminated with Reason=Error Exit Code=2, and the pod events surface the mechanism verbatim: 'Back-off restarting failed container server'. Container logs carry the decisive evidence: '[PlaceOrder] user_id=... user_currency="EUR"' followed by 'panic: mismatching currency codes' at money.Must (money/money.go:85) from PlaceOrder (main.go:294). The code surfac

### case-15

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 31 · tokens 382,747
- **raw 日志**：[results/1013_2025_chainpivot-verify1/raw/1013_2025_boutique-codedefect-15](../results/1013_2025_chainpivot-verify1/raw/1013_2025_boutique-codedefect-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend POST /cart/checkout returned 500 (alert: entry_service=frontend, business_action='Checkout order'); all 11 boutique pods were 2/2 Running with 0 restarts and TCP probes to checkoutservice:5050 / cartservice:7070 succeeded, excluding scheduling/probe/addressing/network faults. Following the call graph frontend -> checkoutservice -> cartservice, only cartservice carried an error pattern: 'GetCartAsync called with userId=' (empty user id, 185 hits), whose timestamps line up one-for-one with checkoutservice's '[PlaceOrder] user_id="<real-uuid>"' lines while its sibling 'EmptyCartAsync cal

### case-16

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.0909 · steps 67 · tokens 1,911,726
- **raw 日志**：[results/1013_2040_chainpivot-verify2/raw/1013_2040_boutique-codedefect-16](../results/1013_2040_chainpivot-verify2/raw/1013_2040_boutique-codedefect-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: frontend POST /cart/checkout -> HTTP 500 (only active anomaly, 'Checkout order'). frontend error log shows the checkout RPC failing ('rpc error: code = Unavailable ... delayed connect error: Connection refused') at 04:22:14Z, exactly when checkoutservice's old pod (checkoutservice-5b97d6df88-lqtts) was SIGTERM-deleted during the only mid-cycle rollout in the namespace (Deployment revision 2 / generation 2, new RS checkoutservice-7fc85cc97b, pod age 2m31s vs ~5m42s for all others). Object/config layer excludes addressing faults: all 11 pods 2/2 Running with 0 restarts, all Deployments 1/

### case-17

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1724 · steps 30 · tokens 365,254
- **raw 日志**：[results/1013_2042_inorder4-v3b39/raw/1013_2042_boutique-codedefect-17](../results/1013_2042_inorder4-v3b39/raw/1013_2042_boutique-codedefect-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer clean: all 11 boutique pods 2/2 Running with 0 RESTARTS; checkoutservice:5050 connectivity probe 'open / Connection Succeeded'; GetAppYAML(checkoutservice) shows sane replicas, port 5050, gRPC probes and CART_SERVICE_ADDR=cartservice:7070, so addressing/config are not the break. The malformed-request trail is isolated to cartservice logs: 208/1832 (11.35%) entries matching 'GetCartAsync called with userId=' (EMPTY userId), each emitted immediately before 'EmptyCartAsync called with userId=<real id>' in the checkout flow. Code surface proves the mechanism in checkoutservice/main.go

### case-18

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1351 · steps 38 · tokens 650,011
- **raw 日志**：[results/1013_2049_inorder4-v3b40/raw/1013_2049_boutique-codedefect-18](../results/1013_2049_inorder4-v3b40/raw/1013_2049_boutique-codedefect-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer clean (all 11 pods 2/2 Running, RESTARTS=0, deployments 1/1 AVAILABLE, endpoints bound, TCP probes on checkoutservice:5050 and cartservice:7070 both open) rules out scheduling/startup/admission/addressing faults; the alert TRAFFIC_ANOMALY [Network Surge] +244% points at checkoutservice. Error-log scan: every service clean except cartservice, whose log stream carries 178 rows of the pattern 'GetCartAsync called with userId=' with an EMPTY userId (malformed-request trail on the downstream callee). Topology walk GetServiceDependencies(checkoutservice) -> cartservice localizes the edg

### case-19

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 386,921
- **raw 日志**：[results/1013_2059_inorder4-v3b41/raw/1013_2059_boutique-codedefect-19](../results/1013_2059_inorder4-v3b41/raw/1013_2059_boutique-codedefect-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods scan in boutique showed a single outlier: shippingservice-799cbfbc76-bl72b 1/2 Error with 4 restarts (CrashLoopBackOff), and deployment shippingservice 0/1 AVAILABLE while every other workload is 1/1. Its server container last terminated with Reason=Error ExitCode=2, kubelet event 'BackOff restarting failed container server'. Container logs show '[ShipOrder] received request' followed by 'panic: runtime error: invalid memory address or nil pointer dereference / [signal SIGSEGV]' in main.(*server).ShipOrder at /src/main.go:153, i.e. the handler dereferenced an unset in.Address. Topology wa

### case-20

- **结论**：`app/checkoutservice` + `code_excessive_file_reads` ｜ 标签 `app/checkoutservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 197,018
- **raw 日志**：[results/1013_2106_inorder4-v3b42/raw/1013_2106_boutique-codedefect-20](../results/1013_2106_inorder4-v3b42/raw/1013_2106_boutique-codedefect-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts flag Service/checkoutservice with RESOURCE_SATURATION [cpu_cfs] 'Val=1.027s throttled', RESOURCE_SATURATION [cpu] 0.00 -> 0.12 cores (+7265.9%) and LATENCY_DEGRADATION [Slow Response] p50 18.39ms -> 4478.97ms (+24254.2%), p90 -> 9224.49ms; the node-level alert (worker-01 CPU 4.85% -> 7.32%) is far too mild to be causal. Per the telemetry chain, the object layer was excluded first: all boutique pods list 2/2 Running with RESTARTS 0 (checkoutservice-6fc6d649d8-mrdxh included), and namespace events contain no FailedScheduling/FailedMount/OOMKilled/probe-kill for it, so no scheduling, quota

### case-21

- **结论**：`app/checkoutservice` + `code_excessive_file_reads` ｜ 标签 `app/checkoutservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 149,851
- **raw 日志**：[results/1013_2110_inorder4-v3b43/raw/1013_2110_boutique-codedefect-21](../results/1013_2110_inorder4-v3b43/raw/1013_2110_boutique-codedefect-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' resolved on the telemetry chain: alert on Service checkoutservice = RESOURCE_SATURATION [cpu_cfs] 1.076s throttled + [cpu] Normal=0.00 -> Current=0.12 cores (+8864.8%) + LATENCY_DEGRADATION p50 20.25ms -> 4772.73ms (+23474.8%). Object layer excluded: all 11 boutique pods 2/2 Running with 0 RESTARTS, no Pending/CrashLoop; CheckServiceConnectivity checkoutservice:5050 = open/Succeeded; GetErrorLogs empty; node worker-01 Ready, untainted, kubelet active, no pressure (its +63.3% CPU is a consequence). Break found at the workload behaviour face: checkoutse

### case-22

- **结论**：`app/checkoutservice` + `code_excessive_file_reads` ｜ 标签 `app/checkoutservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 325,537
- **raw 日志**：[results/1013_2114_inorder4-v3b44/raw/1013_2114_boutique-codedefect-22](../results/1013_2114_inorder4-v3b44/raw/1013_2114_boutique-codedefect-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' enters the telemetry chain: alert entity is checkoutservice (RESOURCE_SATURATION cpu_cfs 0.987s throttled, cpu 0.00->0.11 cores +6759.7%, LATENCY_DEGRADATION p50 19.05ms->4364.85ms +22817.4%, p90 45.06ms->9024.84ms), while node worker-01 shows only 4.50%->6.77% CPU (node capacity excluded). Object layer is clean: all boutique pods are 2/2 Running with RESTARTS=0 and no Pending/CrashLoop, so the break is not at the object layer. checkoutservice config is normal (requests cpu=100m/limits cpu=200m) and its pod logs contain no errors, but liveness/readine

### case-23

- **结论**：`app/checkoutservice` + `code_excessive_file_reads` ｜ 标签 `app/checkoutservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 330,738
- **raw 日志**：[results/1013_2133_inorder4-v3b45/raw/1013_2133_boutique-codedefect-23](../results/1013_2133_inorder4-v3b45/raw/1013_2133_boutique-codedefect-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts converge on checkoutservice: RESOURCE_SATURATION cpu_cfs 1.094s throttled, cpu 0.00->0.12 cores (+6393.5%), LATENCY_DEGRADATION p50 18.67->4334.76ms / p90 47.33->9127.39ms; frontend (its caller) shows p90 49.32->1268.67ms. Object layer excludes infra faults: all 11 boutique pods Running with RESTARTS 0, so the break is at the metric/code level; namespace events bind the mechanism to the checkoutservice instance (repeatedly re-created replica sets, liveness/readiness probe 'context deadline exceeded', 'Back-off restarting failed container server'), and frontend logs show 'failed to compl

### case-24

- **结论**：`app/checkoutservice` + `code_wrong_return` ｜ 标签 `app/checkoutservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1724 · steps 30 · tokens 514,584
- **raw 日志**：[results/1013_2200_cod24-verify2/raw/1013_2200_boutique-codedefect-24](../results/1013_2200_cod24-verify2/raw/1013_2200_boutique-codedefect-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：All pods 2/2 Running with 0 restarts, all Service endpoints bound, and connectivity to emailservice:5000 and paymentservice:50051 both open, so no scheduling/startup/transport fault exists. The break is on the checkoutservice->paymentservice charge edge: frontend logs 'failed to complete the order: rpc error: code = Internal desc = failed to charge card: connect error.' while paymentservice simultaneously logs successful charges ('Transaction processed: visa ending 0013 ... 16:51:24.068' against the frontend error at 16:51:24.069). The code surface confirms it: checkoutservice/main.go chargeCa

### case-25

- **结论**：`app/checkoutservice` + `code_wrong_return` ｜ 标签 `app/checkoutservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 26 · tokens 446,652
- **raw 日志**：[results/1013_2150_inorder4-v3b47/raw/1013_2150_boutique-codedefect-25](../results/1013_2150_inorder4-v3b47/raw/1013_2150_boutique-codedefect-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs carry 176x 'POST /cart/checkout -> failed to complete the order: rpc error: code = Internal desc = failed to charge card: charge card error.' while the object layer is clean (all 11 pods Running 2/2, RESTARTS 0). The dependency walk (frontend -> checkoutservice -> paymentservice) plus the downstream reads exonerate the callees: paymentservice error logs are empty, its charge.js/server.js are pristine, its log stream shows continuous successes ('Transaction processed: visa ending ...'), and its 50051 port is reachable; emailservice is healthy too (error logs empty, normal 'r

### case-26

- **结论**：`app/checkoutservice` + `code_wrong_return` ｜ 标签 `app/checkoutservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 26 · tokens 374,809
- **raw 日志**：[results/1013_2156_inorder4-v3b48/raw/1013_2157_boutique-codedefect-26](../results/1013_2156_inorder4-v3b48/raw/1013_2157_boutique-codedefect-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller-side trail localizes the break on the checkoutservice -> paymentservice charge edge: frontend logs 193x POST /cart/checkout 500 with 'failed to complete the order: rpc error: code = Internal desc = failed to charge card: charge card error.', while paymentservice logs show charges succeeding ('Transaction processed: visa ending 5734 ...') and checkoutservice's error logs are empty; emailservice requests stop at 12:01:36 (orders die before the confirmation-email step) and all endpoints bind normally (emailservice 172.20.2.203:8080, paymentservice 172.20.2.202:50051; CheckServiceConnectivi

### case-27

- **结论**：`app/checkoutservice` + `code_wrong_return` ｜ 标签 `app/checkoutservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.4 · ECR 1 · EE 0.1852 · steps 28 · tokens 587,242
- **raw 日志**：[results/1013_2203_inorder4-v3b49/raw/1013_2203_boutique-codedefect-27](../results/1013_2203_inorder4-v3b49/raw/1013_2203_boutique-codedefect-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain break localized on the code surface. Object layer is clean: all 11 deployments 1/1, all pods 2/2 Running with RESTARTS 0, every Service endpoint bound, so no scheduling/startup/admission/probe fault. Symptom side: frontend error logs carry 164 failures, all 'POST /cart/checkout' -> "failed to complete the order: rpc error: code = Internal desc = failed to charge card: charge card error." The callee paymentservice is healthy and its own logs show every charge succeeding ('PaymentService#Charge invoked' immediately followed by 'Transaction processed: visa ending ...'), with NO

### case-28

- **结论**：`app/checkoutservice` + `code_wrong_return` ｜ 标签 `app/checkoutservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2381 · steps 22 · tokens 356,032
- **raw 日志**：[results/1013_2210_inorder4-v3b50/raw/1013_2210_boutique-codedefect-28](../results/1013_2210_inorder4-v3b50/raw/1013_2210_boutique-codedefect-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with 0 restarts, so no scheduling/startup/admission break exists (events show only stale 'serviceaccount not found' setup history plus Normal Scheduled/Started rows for checkoutservice-5bd966485c-m5gvb). The frontend carries 182 identical errors on POST /cart/checkout: 'rpc error: code = Internal desc = failed to charge card: charge card error.' Order session 89b9cd2b-8eb8-4bb6-a849-5ba3af150105 at 16:40:25 shows checkoutservice logged [PlaceOrder], paymentservice logged 'Transaction processed: visa ending 1221 Amount: USD599.20000000' (charge SUCCEEDED), y

### case-29

- **结论**：`app/checkoutservice` + `code_excessive_file_writes` ｜ 标签 `app/checkoutservice` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 177,788
- **raw 日志**：[results/1013_2214_inorder4-v3b51/raw/1013_2214_boutique-codedefect-29](../results/1013_2214_inorder4-v3b51/raw/1013_2214_boutique-codedefect-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Telemetry-chain closure. GetAlerts returned exactly one ABNORMAL entity: Service checkoutservice (2026-05-19 11:05:50~11:08:25) with two anomaly classes: RESOURCE_SATURATION [cpu] Normal=0.00 cores -> Current=0.01 cores (+720.3%) and FILESYSTEM_WRITE_SURGE [fs_write_bytes] Normal=0.00B/s -> Current=13305.23B/s (New Spike, Peak=55334.06B/s). Object-layer exclusion: the full boutique pod listing shows all 11 pods 2/2 Running with RESTARTS=0 and no Pending/CrashLoop/NotReady rows, so no scheduling/startup/probe break exists; GetErrorLogs(checkoutservice) returned 'No error logs found' and GetRece

### case-30

- **结论**：`app/frontend` + `code_wrong_argument_order` ｜ 标签 `app/frontend` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1579 · steps 39 · tokens 1,081,143
- **raw 日志**：[results/1013_2217_inorder4-v3b52/raw/1013_2217_boutique-codedefect-30](../results/1013_2217_inorder4-v3b52/raw/1013_2217_boutique-codedefect-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：All boutique workload objects read healthy (11 pods 2/2 Running, RESTARTS 0, deployments 1/1 AVAILABLE, all Services with bound Endpoints, correct selectors/targetPorts, and successful TCP connectivity checks on every declared port), so no scheduling/startup/admission/address-layer break exists. The break is at the request-payload/code level: cartservice error logs are 766/2807 lines (27.3%) of 'AddItemAsync called with userId=66VCHSJNUP, productId=fb13bad5-dc1f-420a-b87d-c53033adb784, quantity=9' - a product ID sitting in the userId slot and a session UUID in the productId slot - matching fro

### case-31

- **结论**：`app/frontend` + `code_wrong_argument_order` ｜ 标签 `app/frontend` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.119 · steps 43 · tokens 334,856
- **raw 日志**：[results/1013_2229_inorder4-v3b53/raw/1013_2229_boutique-codedefect-31](../results/1013_2229_inorder4-v3b53/raw/1013_2229_boutique-codedefect-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object/address layers are clean: all 11 pods 2/2 Running with 0 restarts, all 11 Deployments 1/1 AVAILABLE, every Service has endpoints bound, and active TCP probes to all 11 service:port pairs returned 'Connection Succeeded' — excluding scheduling, image-pull, probe, selector, port-mapping and DNS faults. The break is on the code surface: cartservice error logs are flooded (761/2844 lines, ratio 0.268) with a single pattern showing every add-to-cart arriving with arguments inverted — 'AddItemAsync called with userId=9SIQT8TOJO, productId=4fe51a56-1a94-43ce-be91-5958ce17d236, quantity=5', i.e.

### case-32

- **结论**：`app/frontend` + `code_wrong_argument_order` ｜ 标签 `app/frontend` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1136 · steps 45 · tokens 831,616
- **raw 日志**：[results/1013_2235_inorder4-v3b54/raw/1013_2235_boutique-codedefect-32](../results/1013_2235_inorder4-v3b54/raw/1013_2235_boutique-codedefect-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry service frontend emits 503s on /product/{id} and /cart while every object-layer surface is healthy: all 11 pods 2/2 Running with 0 restarts, all endpoints bound, all deployments 1/1, 4 nodes Ready/untouched, and live TCP probes to all 8 downstream ports succeed. The only anomalous trail sits in cartservice logs (713/2657 log lines), which show AddItemAsync called with userId=<10-char product id> and productId=<session UUID> -- exactly the swap of frontend's own request fields (product=OLJCESPC7Z, session=deb5f24d-1373-4ee9-af47-3e7523a241c7), while its GetCartAsync calls carry correct se

### case-33

- **结论**：`app/frontend` + `code_wrong_argument_order` ｜ 标签 `app/frontend` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1111 · steps 46 · tokens 1,073,129
- **raw 日志**：[results/1013_2240_inorder4-v3b55/raw/1013_2240_boutique-codedefect-33](../results/1013_2240_inorder4-v3b55/raw/1013_2240_boutique-codedefect-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alerts show 503 'Service Unavailable' recorded at the frontend entry for GET /product/{id} (16x) and GET /cart (10x). Object layer is otherwise clean: all 11 boutique pods 2/2 Running with 0 restarts, all deployments 1/1 AVAILABLE, all Service endpoints bound, all downstream port probes (frontend:80, productcatalogservice:3550, cartservice:7070, redis-cart:6379, currencyservice:7000, adservice:9555, recommendation:8080, shipping/checkout/payment:50051, email:5000) succeed, nodes Ready/untinted. frontend's own error logs are clean and its main.go/middleware.go are stock, so the ma

### case-34

- **结论**：`app/frontend` + `code_busy_loop` ｜ 标签 `app/frontend` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 382,069
- **raw 日志**：[results/1013_2245_inorder4-v3b56/raw/1013_2245_boutique-codedefect-34](../results/1013_2245_inorder4-v3b56/raw/1013_2245_boutique-codedefect-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts point to frontend: RESOURCE_SATURATION [cpu_cfs] 1.170s throttled, [cpu] 0.01->0.13 cores (+1323.1%), LATENCY_DEGRADATION p50 20.39ms->2172.22ms (+10552.3%) plus 503s on / and /product/{id}. Object layer is clean (all boutique pods 2/2 Running, RESTARTS 0; nodes Ready, no taints/pressure), so the break is inside the frontend workload itself. Downstreams are healthy (adservice serving 'received ad request' steadily with no error logs; the 231 'failed to get ads' are the stock 100ms ad deadline, the rest are 'context canceled' = client giving up on slow frontend responses). Root cause fou

### case-35

- **结论**：`app/frontend` + `code_busy_loop` ｜ 标签 `app/frontend` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1364 · steps 23 · tokens 285,528
- **raw 日志**：[results/1013_2249_inorder4-v3b57/raw/1013_2249_boutique-codedefect-35](../results/1013_2249_inorder4-v3b57/raw/1013_2249_boutique-codedefect-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' enters the telemetry chain (L2 consensus). GetAlerts shows entity=frontend for 11:40:25-11:43:00: RESOURCE_SATURATION [cpu_cfs] 1.204s throttled, CPU 0.01 -> 0.13 cores (+1506.3%), LATENCY_DEGRADATION p50 24.73ms -> 2235.31ms (+8939.2%); plus frontend-entry 503s. Object layer is excluded as a K8s fault: all 11 pods Running 2/2 with RESTARTS=0, no OOMKilled/Pending/probe kills; nodes all Ready with no Pressure/cordon. The break is in the frontend business code: handlers.go chooseAd() contains an injected busy-wait spin 'start := time.Now(); for { if ti

### case-36

- **结论**：`app/frontend` + `code_busy_loop` ｜ 标签 `app/frontend` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1579 · steps 20 · tokens 394,816
- **raw 日志**：[results/1013_2253_inorder4-v3b58/raw/1013_2253_boutique-codedefect-36](../results/1013_2253_inorder4-v3b58/raw/1013_2253_boutique-codedefect-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' enters the telemetry chain (L2 qid=12): alerts name a single entity, frontend — RESOURCE_SATURATION [cpu_cfs] 1.274s throttled, [cpu] 0.01->0.14 cores (+1461.5%), LATENCY_DEGRADATION p50 21.25ms->2175.53ms (+10137.8%) / p90 230.5ms->4318.45ms, plus 503s on GET / and GET /product/{id}. Object-layer exclusion is clean: all 11 boutique pods are 2/2 Running with RESTARTS=0 and frontend-7bd85c875b-kj66s shows Ready/ContainersReady=True with only Normal events (Scheduled/Pulled/Created/Started), so there is no scheduling/startup/probe/endpoint break — the b

### case-37

- **结论**：`app/frontend` + `code_busy_loop` ｜ 标签 `app/frontend` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 240,302
- **raw 日志**：[results/1013_2258_inorder4-v3b59/raw/1013_2258_boutique-codedefect-37](../results/1013_2258_inorder4-v3b59/raw/1013_2258_boutique-codedefect-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts localize the break to frontend: RESOURCE_SATURATION [cpu] Normal=0.01 -> Current=0.14 cores (+1576.1%), RESOURCE_SATURATION [cpu_cfs] 1.254s throttled, LATENCY_DEGRADATION p50 22.19ms -> 2351.29ms (+10497.1%), with 503s on GET / and GET /product/{id}. Object-layer exclusion is clean: all 11 boutique pods 2/2 Running with RESTARTS=0, frontend pod Ready=True, Restart Count 0, probes passing, no FailedScheduling/FailedMount/FailedCreate or OOM events, and frontend's resource config (cpu limit 200m, request 100m) is unchanged. Closure is at the code surface: frontend handlers.go chooseAd() 

### case-38

- **结论**：`app/frontend` + `code_artificial_delay` ｜ 标签 `app/frontend` + `code_artificial_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 22 · tokens 452,396
- **raw 日志**：[results/1013_2303_inorder4-v3b60/raw/1013_2303_boutique-codedefect-38](../results/1013_2303_inorder4-v3b60/raw/1013_2303_boutique-codedefect-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend is the alerted entity: GetAlerts reports LATENCY_DEGRADATION on service frontend, p90 latency Normal=147.04ms -> Current=2555.00ms (+1637.6%, peak 2981.82ms) in window 17:30:08~17:32:43, with 31 accompanying 503 errors across '/' , '/product/{id}', '/cart', '/cart/checkout', '/setCurrency'. Object layer is clean (GetResources pods: all 11 pods Running 2/2, RESTARTS=0; DescribeResource frontend-556cf89656-q7b9p: Ready True, Restart Count 0, only Normal Scheduled/Pulled/Created/Started events), so the break is not scheduling/probe/resource. Node and infra layer excluded (all 4 nodes Rea

### case-39

- **结论**：`app/frontend` + `code_memory_leak` ｜ 标签 `app/frontend` + `code_memory_leak`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 289,503
- **raw 日志**：[results/1013_2308_inorder4-v3b61/raw/1013_2308_boutique-codedefect-39](../results/1013_2308_inorder4-v3b61/raw/1013_2308_boutique-codedefect-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: frontend-7b49cb6446-6lt6c 1/2 CrashLoopBackOff with 4 restarts while all other boutique pods are 2/2 Running with 0 restarts; deployment frontend is 0/1 AVAILABLE while all others are 1/1. Alerts name frontend (success rate 95.2%->36.7%) with 503 Service Unavailable on /, /product/{id}, /cart, /cart/checkout and notably /setCurrency. Pod detail: container 'server' Last State Terminated Reason=OOMKilled Exit Code=137 on a 128Mi memory limit (requests 64Mi = upstream defaults), restarting every ~2s, with pod event 'Warning BackOff: Back-off restarting failed 

### case-40

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 353,688
- **raw 日志**：[results/1013_2311_inorder4-v3b62/raw/1013_2311_boutique-codedefect-40](../results/1013_2311_inorder4-v3b62/raw/1013_2311_boutique-codedefect-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods read 2/2 Running with 0 restarts (no scheduling/startup/probe outlier); alert frontend-error-spike shows Success Rate 100%->71.7% with /cart 500s. frontend logs the failing business call 'could not retrieve product #: rpc error: code = NotFound desc = no product with ID ' on GET /cart (1105 occurrences, empty product ID), while cartservice logs the malformed request upstream shows 'AddItemAsync called with userId=..., productId=, quantity=2' (740 occurrences) even though frontend's own log for the same request carried a valid product ('adding to cart product=LS4PSXUNUM'). 

### case-41

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2333 · steps 31 · tokens 1,115,150
- **raw 日志**：[results/1013_2315_inorder4-v3b63/raw/1013_2315_boutique-codedefect-41](../results/1013_2315_inorder4-v3b63/raw/1013_2315_boutique-codedefect-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique: all 11 pods Running 2/2 with 0 restarts and 4/4 nodes Ready (no scheduling/startup/probe break); alerts show frontend entry 503s (GET /product/{id} x20, GET /cart x8) and a currencyservice inbound surge in 23:13:06-23:15:41, exactly when a new frontend ReplicaSet (frontend-645f576c45-ls98t, image wangyl2128/frontend-v2:latest) rolled in. cartservice's error-log stream is 26.78% (747 lines) one pattern: 'AddItemAsync called with userId=, productId=L9ECAV7KIM, quantity=2' - a required userId arriving empty. frontend source proves it: rpc.go insertCart() contains 'userID = ""' before pb

