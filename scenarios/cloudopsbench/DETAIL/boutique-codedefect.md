# 评测明细 · boutique/codedefect — cloudopsbench

> 本家族已跑 **21/98** 题：JRA ✅21 ❌0 ｜ 证据链全闭 21 ｜ token 中位 200,618 ｜ 生成 2026-10-13T13:13:39.005Z
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

