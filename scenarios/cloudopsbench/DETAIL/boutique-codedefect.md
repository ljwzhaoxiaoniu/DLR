# 评测明细 · boutique/codedefect — cloudopsbench

> 本家族已跑 **10/98** 题：JRA ✅10 ❌0 ｜ 证据链全闭 10 ｜ token 中位 181,235 ｜ 生成 2026-10-13T09:20:29.295Z
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

