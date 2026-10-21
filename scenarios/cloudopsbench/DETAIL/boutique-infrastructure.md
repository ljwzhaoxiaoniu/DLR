# 评测明细 · boutique/infrastructure — cloudopsbench

> 本家族已跑 **40/40** 题：JRA ✅40 ❌0 ｜ 证据链全闭 39 ｜ token 中位 191,825 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 178,501 | 0 | 0 | 1020_2002_tsm-v1-b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 185,857 | 0 | 0 | 1020_2323_tsm-v1-b36 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 163,562 | 0 | 0 | 1021_0123_tsm-v1-b69 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 194,519 | 0 | 0 | 1021_0221_tsm-v1-b98 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 194,774 | 0 | 0 | 1021_0231_tsm-v1-b103 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 146,558 | 0 | 0 | 1021_0237_tsm-v1-b106 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.3333 | 13 | 135,365 | 0 | 0 | 1021_0242_tsm-v1-b108 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 167,002 | 0 | 0 | 1021_0247_tsm-v1-b111 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 116,394 | 0 | 0 | 1021_0251_tsm-v1-b113 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 211,113 | 0 | 0 | 1020_2008_tsm-v1-b6 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 23 | 191,856 | 0 | 0 | 1020_2013_tsm-v1-b9 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 21 | 234,531 | 0 | 0 | 1020_2018_tsm-v1-b12 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 21 | 207,716 | 0 | 0 | 1020_2024_tsm-v1-b15 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.45 | 21 | 210,604 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 149,212 | 0 | 0 | 1020_2249_tsm-v1-b21 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3889 | 19 | 153,288 | 0 | 0 | 1020_2258_tsm-v1-b24 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 22 | 217,230 | 0 | 0 | 1020_2304_tsm-v1-b27 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4211 | 20 | 191,880 | 0 | 0 | 1020_2311_tsm-v1-b30 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 177,791 | 0 | 0 | 1020_2317_tsm-v1-b33 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 182,130 | 0 | 0 | 1020_2329_tsm-v1-b39 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 161,246 | 0 | 0 | 1020_2334_tsm-v1-b42 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 213,837 | 0 | 0 | 1020_2340_tsm-v1-b45 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 154,390 | 0 | 0 | 1020_2346_tsm-v1-b48 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 175,828 | 0 | 0 | 1020_2353_tsm-v1-b51 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 154,039 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 157,203 | 0 | 0 | 1021_0056_tsm-v1-b57 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 163,662 | 0 | 0 | 1021_0103_tsm-v1-b60 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 168,537 | 0 | 0 | 1021_0109_tsm-v1-b63 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 181,378 | 0 | 0 | 1021_0117_tsm-v1-b66 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 191,825 | 0 | 0 | 1021_0129_tsm-v1-b72 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2632 | 20 | 206,709 | 0 | 0 | 1021_0136_tsm-v1-b75 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 219,088 | 0 | 0 | 1021_0140_tsm-v1-b77 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 209,250 | 0 | 0 | 1021_0146_tsm-v1-b80 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 0.6667 | 0.3333 | 0 | 0.15 | 21 | 212,997 | 0 | 0 | 1021_0152_tsm-v1-b83 | 结果对·链未闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 213,403 | 0 | 0 | 1021_0158_tsm-v1-b86 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 241,320 | 0 | 0 | 1021_0201_tsm-v1-b88 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 0.3333 | 1 | 0.2857 | 15 | 166,253 | 0 | 0 | 1021_0207_tsm-v1-b91 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 222,351 | 0 | 0 | 1021_0211_tsm-v1-b93 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2632 | 20 | 225,842 | 0 | 0 | 1021_0218_tsm-v1-b96 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 28 | 368,553 | 0 | 0 | 1021_0227_tsm-v1-b101 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 178,501
- **raw 日志**：[results/1020_2002_tsm-v1-b3/raw/1020_2002_boutique-infrastructure-1](../results/1020_2002_tsm-v1-b3/raw/1020_2002_boutique-infrastructure-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entry caller) logs show 212 errors with 'rpc error: code = Unavailable desc = no healthy upstream' for productcatalogservice, cartservice and checkout path. The pods listing is node-aligned: all five failing pods (adservice, cartservice, emailservice, productcatalogservice, shippingservice) are 0/2 Init:0/1 with no IP on worker-01, while every pod on worker-02 (frontend, checkoutservice, currencyservice, paymentservice, recommendationservice, redis-cart) is 2/2 Running. The pod sheets and the namespace event surface bind the mechanism verbatim: 'Warning FailedCreatePodSandBox ... Fai

### case-2

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 185,857
- **raw 日志**：[results/1020_2323_tsm-v1-b36/raw/1020_2323_boutique-infrastructure-2](../results/1020_2323_tsm-v1-b36/raw/1020_2323_boutique-infrastructure-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend error logs are led by 'could not retrieve currencies: rpc error: code = Unavailable desc = no healthy upstream' (111 occurrences) with currencyservice Endpoints = <none> while the Service object (10.68.16.92:7000/TCP) exists, ruling out missing-Service/DNS. Pod listing (-o wide) shows exactly 6 pods in Init:0/1 (checkoutservice, currencyservice, emailservice, recommendationservice, redis-cart, shippingservice) ALL on worker-02, while all Running pods are on worker-01. Pod detail for currencyservice-5cd6467fc4-5snk4 is Pending with event 'Warning FailedCreatePodSandBox ... Failed to cr

### case-3

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 163,562
- **raw 日志**：[results/1021_0123_tsm-v1-b69/raw/1021_0123_boutique-infrastructure-3](../results/1021_0123_tsm-v1-b69/raw/1021_0123_boutique-infrastructure-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 5 pods on node worker-01 (frontend, paymentservice, productcatalogservice, redis-cart, shippingservice) are stuck at Init:0/1 with no IP while every worker-02 pod is 2/2 Running. Pod detail for frontend-6778bd7b8b-gxx44 shows PodScheduled=True but a kubelet event 'Warning FailedCreatePodSandBox: Failed to create pod sandbox: rpc error: code = Unavailable desc = "transport: Error while dialing: dial unix /run/containerd/containerd.sock: connect: no such file or directory"'. Namespace events show the same FailedCreatePodSandBox only for worker-01 pods, while worker-02 pods have all-Normal Cr

### case-4

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 194,519
- **raw 日志**：[results/1021_0221_tsm-v1-b98/raw/1021_0222_boutique-infrastructure-4](../results/1021_0221_tsm-v1-b98/raw/1021_0222_boutique-infrastructure-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability traced from the entry caller to node worker-02's container runtime. Frontend (entry service) error logs contain 221 errors dominated by 'could not retrieve product/currencies/complete the order: rpc error: code = Unavailable desc = no healthy upstream' (107/80/32 counts). Pods inventory splits perfectly along the node boundary: all 5 healthy 2/2 Running pods are on worker-01, while all 6 pods stuck in Init:0/1 with IP <none> (productcatalogservice, currencyservice, paymentservice, checkoutservice, recommendationservice, shippingservice) are on worker-02. Endpoints for pr

### case-5

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 194,774
- **raw 日志**：[results/1021_0231_tsm-v1-b103/raw/1021_0232_boutique-infrastructure-5](../results/1021_0231_tsm-v1-b103/raw/1021_0232_boutique-infrastructure-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: frontend's only error is 'container "server" in pod "frontend-6778bd7b8b-nc9c9" is waiting to start: PodInitializing'. Pod listing splits by node: worker-02 pods all 2/2 Running (cartservice, checkoutservice, currencyservice, emailservice, productcatalogservice, recommendationservice), while all 5 pods placed on worker-01 (adservice-d68dfc56-bcmdq, frontend-6778bd7b8b-nc9c9, paymentservice-869f9f96cd-rcjgl, redis-cart-58649b5469-rmkzf, shippingservice-674c8c548d-xn5hw) are 0/2 Init:0/1 with IP <none>. Pod events: 'Warning FailedCreatePodSandBox 73s kubelet Failed to create pod san

### case-6

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 146,558
- **raw 日志**：[results/1021_0237_tsm-v1-b106/raw/1021_0237_boutique-infrastructure-6](../results/1021_0237_tsm-v1-b106/raw/1021_0237_boutique-infrastructure-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) error logs show 192/865 errors, dominated by 'no healthy upstream' for product (84), currencies (79) and checkout (27) calls. Pod inventory separates cleanly by node: the 6 pods on worker-02 (productcatalogservice, currencyservice, shippingservice, recommendationservice, emailservice, checkoutservice) are all 0/2 Init:0/1 with no pod IP, while every pod on worker-01 is 2/2 Running. Pod productcatalogservice-6fb89f98f8-d9ggt shows PodScheduled=True (scheduling succeeded, ruling out affinity/taint/capacity causes) but emits 'Warning FailedCreatePodSandBox: Failed to creat

### case-7

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.3333 · steps 13 · tokens 135,365
- **raw 日志**：[results/1021_0242_tsm-v1-b108/raw/1021_0243_boutique-infrastructure-7](../results/1021_0242_tsm-v1-b108/raw/1021_0243_boutique-infrastructure-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend logged 181 errors (22.8%): 93x "could not retrieve product: rpc error: code = Unavailable desc = no healthy upstream" and 65x "could not retrieve currencies: ... no healthy upstream", plus cart failures reaching redis-cart:6379. Pods listing shows a single outlier group: ALL 5 boutique pods on worker-01 (adservice, currencyservice, productcatalogservice, recommendationservice, redis-cart) are 0/2 Init:0/1 with IP <none>, while all worker-02 pods are 2/2 Running; PodScheduled=True, so placement succeeded and startup failed. Pod event: "Warning FailedCreatePodSandBox pod/ad

### case-8

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 167,002
- **raw 日志**：[results/1021_0247_tsm-v1-b111/raw/1021_0247_boutique-infrastructure-8](../results/1021_0247_tsm-v1-b111/raw/1021_0247_boutique-infrastructure-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (GetErrorLogs) shows gRPC 'no healthy upstream' for products (102x), currencies (83x) and checkout (24x). Pod listing is split by node: every pod on worker-02 is stuck 'Init:0/1' with IP <none> (adservice, cartservice, checkoutservice, currencyservice, productcatalogservice, shippingservice) while every worker-01 pod is 2/2 Running. All 11 Services exist, so quota/missing-Service branches are excluded. The mechanism event on pod adservice-d68dfc56-26dtl and on 6 namespace events is "FailedCreatePodSandBox ... dial unix /run/containerd/containerd.sock: connect: no such file o

### case-9

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 116,394
- **raw 日志**：[results/1021_0251_tsm-v1-b113/raw/1021_0251_boutique-infrastructure-9](../results/1021_0251_tsm-v1-b113/raw/1021_0251_boutique-infrastructure-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend logs show 358/1624 errors dominated by 'connection refused' to downstream ClusterIPs (currencyservice:7000, productcatalogservice:3550) plus redis-cart:6379 UnableToConnect. Pod listing splits cleanly by node: every pod on worker-01 is 0/1 ContainerCreating with IP <none> (adservice, currencyservice, emailservice, productcatalogservice, redis-cart, shippingservice), while all worker-02 pods are 1/1 Running. Pod detail adservice-64ddc5c766-p8jsd shows PodScheduled=True (scheduling fine) but Warning FailedCreatePodSandBox from kubelet: 'Failed to create pod sandbox: rpc err

### case-10

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 211,113
- **raw 日志**：[results/1020_2008_tsm-v1-b6/raw/1020_2008_boutique-infrastructure-10](../results/1020_2008_tsm-v1-b6/raw/1020_2008_boutique-infrastructure-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability is node-scoped: all 5 pods on worker-02 (frontend, cartservice, checkoutservice, productcatalogservice, recommendationservice) are stuck 0/1 ContainerCreating while all 6 pods on worker-01 are 1/1 Running. Connectivity probe on declared Service ports: frontend:80 -> Connection Failed, adservice:9555 -> open/Succeeded. Pod detail of frontend-657dd795f-m6578 shows PodScheduled=True (Successfully assigned to worker-02) but container wait reason ContainerCreating with event 'Warning FailedCreatePodSandBox ... dial unix /run/containerd/containerd.sock: connect: no such file o

### case-11

- **结论**：`node/worker-01` + `kube_proxy_unavailable` ｜ 标签 `node/worker-01` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 23 · tokens 191,856
- **raw 日志**：[results/1020_2013_tsm-v1-b9/raw/1020_2013_boutique-infrastructure-11](../results/1020_2013_tsm-v1-b9/raw/1020_2013_boutique-infrastructure-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entry caller, scheduled on worker-01) logs 197 errors against three different callees: 97x 'could not retrieve product: ... dial tcp 10.68.20.26:3550: i/o timeout', 65x 'lookup currencyservice on 169.254.20.10:53: no such host', 33x 'failed to complete the order: ... dial tcp 10.68.52.125:5050: i/o timeout'. All 11 boutique pods are 1/1 Running with 0 restarts, callee error logs are clean and GetAlerts reports no metric anomalies, so the workload is healthy and only the traffic path is broken. Anchored connectivity probes on each Service's declared port fail from worker-01 for every 

### case-12

- **结论**：`node/worker-02` + `kube_proxy_unavailable` ｜ 标签 `node/worker-02` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 21 · tokens 234,531
- **raw 日志**：[results/1020_2018_tsm-v1-b12/raw/1020_2018_boutique-infrastructure-12](../results/1020_2018_tsm-v1-b12/raw/1020_2018_boutique-infrastructure-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 1/1 with 0 restarts, so no pod-level outage. The entry caller (frontend) shows 68/297 errors: 'Can't access cart storage ... It was not possible to connect to the redis server(s). ConnectTimeout, serverEndpoint: redis-cart:6379, timeout: 5000' (40 hits) plus 'dial tcp 10.68.60.91:7070: i/o timeout' (8 hits); cartservice's own error log repeats 58x 'RedisConnectionException ... ConnectTimeout'. Service objects and endpoints are correctly bound (redis-cart 10.68.166.170:6379 -> 172.20.1.173:6379; cartservice -> 172.20.2.200:7070), ruling out selector/port/DNS fau

### case-13

- **结论**：`node/worker-01` + `kube_proxy_unavailable` ｜ 标签 `node/worker-01` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 21 · tokens 207,716
- **raw 日志**：[results/1020_2024_tsm-v1-b15/raw/1020_2024_boutique-infrastructure-13](../results/1020_2024_tsm-v1-b15/raw/1020_2024_boutique-infrastructure-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and GetAlerts is clean, yet the entry caller frontend logs 75 errors: 'cart failure: failed to get user cart during checkout ... dial tcp 10.68.106.186:7070: i/o timeout' (10.68.106.186/7070 is cartservice's ClusterIP and declared Service port) plus 'lookup currencyservice/checkoutservice on 169.254.20.10:53: no such host'. Every Service object exists with populated Endpoints (e.g. currencyservice 10.68.25.113:7000 -> 172.20.2.222:7000), ruling out Service selector/port/quota/DNS-object causes. Declared-port connectivity probes give a perfec

### case-14

- **结论**：`node/worker-02` + `kube_proxy_unavailable` ｜ 标签 `node/worker-02` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.45 · steps 21 · tokens 210,604
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0017_boutique-infrastructure-14](../results/1021_0900_tsm-v1-fix/raw/1021_0017_boutique-infrastructure-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (on worker-02) logs 206 errors, all gRPC dial timeouts to Service ClusterIPs: 'dial tcp 10.68.192.252:7000: i/o timeout' (currencyservice), 'dial tcp 10.68.54.111:3550: i/o timeout' (productcatalogservice), 'dial tcp 10.68.176.74:5050: i/o timeout' (checkoutservice). All 11 boutique pods are 1/1 Running with 0 restarts, so no scheduling/probe/image-pull fault. Service objects are correct and endpoints are fully bound (currencyservice 172.20.1.218:7000, productcatalogservice 172.20.2.254:3550, checkoutservice 172.20.2.4:5050), ruling out selector/port/env-address mismatch. CheckService

### case-15

- **结论**：`node/worker-01` + `kube_proxy_unavailable` ｜ 标签 `node/worker-01` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 149,212
- **raw 日志**：[results/1020_2249_tsm-v1-b21/raw/1020_2249_boutique-infrastructure-15](../results/1020_2249_tsm-v1-b21/raw/1020_2249_boutique-infrastructure-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (scheduled on worker-01) error logs show pure connectivity/addressing failures, not business errors: 107x 'could not retrieve product: rpc error: code = Unavailable desc = connection error: dial tcp 10.68.101.73:3550: i/o timeout', 70x 'could not retrieve currencies ... dial tcp 10.68.199.86:7000: i/o timeout', 34x 'failed to complete the order ... dial tcp: lookup checkoutservice on 169.254.20.10:53: no such host'. Workload layer is healthy: all 11 pods 1/1 Running with 0 RESTARTS, all nodes Ready with no pressure/taints/cordon, and GetAlerts reports no metric anomalies, so this is n

### case-16

- **结论**：`node/worker-02` + `kube_proxy_unavailable` ｜ 标签 `node/worker-02` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3889 · steps 19 · tokens 153,288
- **raw 日志**：[results/1020_2258_tsm-v1-b24/raw/1020_2258_boutique-infrastructure-16](../results/1020_2258_tsm-v1-b24/raw/1020_2258_boutique-infrastructure-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend error logs (78/325) show cart failures: 'Can't access cart storage ... It was not possible to connect to the redis server(s). ConnectTimeout, serverEndpoint: redis-cart:6379' and 'cart failure ... dial tcp 10.68.139.239:7070: i/o timeout'. cartservice logs (198/536) are all Redis ConnectTimeout. All 11 pods are 1/1 Running with RESTARTS=0, so scheduling/create/image/probe/resource causes are excluded. TCP probes on the Service-declared ports: cartservice:7070 and redis-cart:6379 succeed from debug pods on worker-01 and worker-03 but fail from the debug pod on worker-02 ('punt! Termina

### case-17

- **结论**：`node/worker-01` + `kube_proxy_unavailable` ｜ 标签 `node/worker-01` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 22 · tokens 217,230
- **raw 日志**：[results/1020_2304_tsm-v1-b27/raw/1020_2304_boutique-infrastructure-17](../results/1020_2304_tsm-v1-b27/raw/1020_2304_boutique-infrastructure-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP 'Service Availability Disruption.' matched exactly. No active metric anomalies; all 11 boutique pods 1/1 Running with 0 restarts, so the pod-up/reachability branch applies. frontend (entry caller) error logs show Service VIP calls failing: 'lookup shippingservice on 169.254.20.10:53: no such host' (14x) and 'failed to complete the order ... shipping quote failure ... no such host' (12x). The shippingservice Service object DOES exist (ClusterIP 10.68.26.147, 50051/TCP) with its endpoint bound (172.20.2.241:50051), excluding the never-created-Service/quota branch and selector/port mapping

### case-18

- **结论**：`node/worker-02` + `kube_proxy_unavailable` ｜ 标签 `node/worker-02` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4211 · steps 20 · tokens 191,880
- **raw 日志**：[results/1020_2311_tsm-v1-b30/raw/1020_2311_boutique-infrastructure-18](../results/1020_2311_tsm-v1-b30/raw/1020_2311_boutique-infrastructure-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (197/881, 22.4%) show Unavailable on downstreams: "lookup productcatalogservice on 169.254.20.10:53: no such host" (85x), "lookup currencyservice on 169.254.20.10:53: no such host" (76x) and "dial tcp 10.68.159.24:5050: i/o timeout" for checkoutservice. Workload layer is fully healthy: 11 pods all 1/1 Running with 0 RESTARTS, all 12 Services present, all endpoints bound, no ResourceQuota shortfall -> quota / probe / image branches excluded. Address-layer connectivity on the ports each Service declares splits strictly by node: checkoutservice:5050, productcatalogservice:3550

### case-19

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 177,791
- **raw 日志**：[results/1020_2317_tsm-v1-b33/raw/1020_2317_boutique-infrastructure-19](../results/1020_2317_tsm-v1-b33/raw/1020_2317_boutique-infrastructure-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (240/244 errors) show 'failed to get ads: ... dial tcp 10.68.171.203:9555: connect: connection refused' against adservice's own Service spec port 9555, and endpoints/adservice is '<none>'. The pods listing has exactly one outlier: adservice-64ddc5c766-skqvc 0/1 Pending, whose DescribeResource shows Status Pending, Node: <none>, IP: <none> and Events: <none> - i.e. no scheduling line at all. All 4 nodes are Ready with 8 CPU / ~15Gi allocatable and worker-01/02/03 untainted (only master carries the normal unschedulable taint), and 10 other boutique pods are 1/1 Running, so ca

### case-20

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 182,130
- **raw 日志**：[results/1020_2329_tsm-v1-b39/raw/1020_2329_boutique-infrastructure-20](../results/1020_2329_tsm-v1-b39/raw/1020_2329_boutique-infrastructure-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend entry-caller error log: 314x 'could not retrieve cart: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.57.19:7070: connect: connection refused' (error ratio 21.4%); 10.68.57.19:7070 is exactly the port cartservice's Service spec declares (port 7070, targetPort 7070). GetResources(endpoints, cartservice) = '<none>'. Pods listing outlier: cartservice-79b49f5555-mmhv4 is 0/1 Pending with NODE '<none>' while all other 10 boutique pods are 1/1 Running; deployment cartservice is 0/1 AVAILABLE. Pod sheet shows Status Pending, Node <none>,

### case-21

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 161,246
- **raw 日志**：[results/1020_2334_tsm-v1-b42/raw/1020_2334_boutique-infrastructure-21](../results/1020_2334_tsm-v1-b42/raw/1020_2334_boutique-infrastructure-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs show 28 order failures 'failed to complete the order: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.129.244:5050: connect: connection refused'. Pod inventory outlier (only non-Running row): checkoutservice-8445f8b6cb-58chn 0/1 Pending; GetResources(endpoints, name=checkoutservice) = '<none>'. Pod sheet shows 'Node: <none>', 'IP: <none>', 'Node-Selectors: <none>' and 'Events: <none>' - i.e. no scheduling line at all, so the pod was never even attempted/bound by a scheduler. Node side is healthy and general

### case-22

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 213,837
- **raw 日志**：[results/1020_2340_tsm-v1-b45/raw/1020_2340_boutique-infrastructure-22](../results/1020_2340_tsm-v1-b45/raw/1020_2340_boutique-infrastructure-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: frontend GetErrorLogs shows 388/2010 (19.3%) errors of one pattern - 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.249.177:7000: connect: connection refused', plus 6 cascaded checkout failures 'failed to convert shipping cost to currency ... connection refused' on the same currencyservice address (port 7000, the port declared by its Service spec). Pod sheet: only outlier is currencyservice-5c6fdf7ccb-tc4gk 0/1 Pending with Node <none>; all other 10 pods 1/1 Running. Pending branch: the pod's own sheet has Node-Selectors <none>, no affinity, only 

### case-23

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 154,390
- **raw 日志**：[results/1020_2346_tsm-v1-b48/raw/1020_2346_boutique-infrastructure-23](../results/1020_2346_tsm-v1-b48/raw/1020_2346_boutique-infrastructure-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory shows exactly one outlier: emailservice-c86b9b8f6-92zg7 is 0/1 Pending. Its pod sheet has Node: <none>, Events: <none>, no nodeSelector and only default not-ready/unreachable tolerations - i.e. no scheduling line at all, which points at the control-plane scheduler. A namespace Warning event 'FailedCreate replicaset/emailservice-c86b9b8f6: pods "emailservice-c86b9b8f6-" is forbidden: error looking up service account boutique/emailservice: serviceaccount "emailservice" not found' is setup history: the serviceaccounts listing shows emailservice present (age 96s, created after that 

### case-24

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 175,828
- **raw 日志**：[results/1020_2353_tsm-v1-b51/raw/1020_2353_boutique-infrastructure-24](../results/1020_2353_tsm-v1-b51/raw/1020_2353_boutique-infrastructure-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend is the victim: pods listing shows 10/11 services Running 1/1 while frontend-c884c5787-lnqxr is 0/1 Pending with RESTARTS 0. Its pod detail shows 'Node: <none>', 'Events: <none>', 'Node-Selectors: <none>' and no affinity, so there is no scheduling line at all - the L3 Pending branch routes this to the control plane. General node face: all 4 nodes Ready with no Memory/Disk/PID pressure and 8 CPU allocatable each; only master is Ready,SchedulingDisabled (normal control-plane taint) and worker-03 is entirely empty while 10 pods pack worker-01/02, indicating placement has stopped. Specific

### case-25

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 154,039
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0015_boutique-infrastructure-25](../results/1021_0900_tsm-v1-fix/raw/1021_0015_boutique-infrastructure-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: frontend error logs show checkout failing with 'failed to charge card ... dial tcp 10.68.243.106:50051: connect: connection refused', pointing at paymentservice. Pod inventory outlier: paymentservice-78c5996648-hn8w6 is 0/1 Pending while all 10 other pods are 1/1 Running with 0 restarts. Pod detail shows Node: <none>, Node-Selectors: <none>, default tolerations only and Events: <none> — i.e. no FailedScheduling row at all, meaning the scheduler never rendered a scheduling decision. General node surface rules out placement causes: worker-01/02/03 all Ready with empty taints, no Mem

### case-26

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 157,203
- **raw 日志**：[results/1021_0056_tsm-v1-b57/raw/1021_0056_boutique-infrastructure-26](../results/1021_0056_tsm-v1-b57/raw/1021_0056_boutique-infrastructure-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error log (388/1910 errors, 20.3%) shows 'could not retrieve product: rpc error: code = Unavailable ... dial tcp 10.68.36.45:3550: connect: connection refused' (210x) plus recommendationservice 'failed to connect to all addresses; last error: ipv4:10.68.36.45:3550 Failed to connect to remote host: Connection refused' (76x); the port 3550 matches the Service's own spec (productcatalogservice ClusterIP 10.68.36.45 3550/TCP) and GetResources(endpoints, productcatalogservice) returns ENDPOINTS: <none>. Object layer: pods listing has exactly one outlier - productcatalogservic

### case-27

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 163,662
- **raw 日志**：[results/1021_0103_tsm-v1-b60/raw/1021_0103_boutique-infrastructure-27](../results/1021_0103_tsm-v1-b60/raw/1021_0103_boutique-infrastructure-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Availability Disruption' names no service, so the pods listing was the entry: the single outlier is recommendationservice-7bf5b7d9b8-tk7kf, 0/1 Pending, Node: <none>. Complaint side (frontend GetErrorLogs) confirms the victim and its port: 252x 'failed to get product recommendations' with 'rpc error: code = Unavailable ... dial tcp 10.68.94.195:8080: connect: connection refused' (Service recommendationservice declares port 8080 -> targetPort 8080). The pod sheet shows Status: Pending, Node: <none> and Events: <none> - no scheduling line at all, the L3 discriminator for the con

### case-28

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 168,537
- **raw 日志**：[results/1021_0109_tsm-v1-b63/raw/1021_0109_boutique-infrastructure-28](../results/1021_0109_tsm-v1-b63/raw/1021_0109_boutique-infrastructure-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend GetErrorLogs (178 errors) shows all cart failures as cartservice -> "UnableToConnect on redis-cart:6379", state=Connecting, last-heartbeat: never, conn-sec: n/a (socket-level, never established). Pods listing: redis-cart-589d486f78-ghstg is the sole outlier at 0/1 Pending, Node: <none>, while all 10 other pods are 1/1 Running. Pod describe shows Node: <none>, Status: Pending and Events: <none> - no FailedScheduling line at all, and no nodeSelector/affinity. endpoints/redis-cart => <none> (no ready addresses), matching caller UnableToConnect. Node side general: 4/4 nodes Ready, no Memo

### case-29

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 181,378
- **raw 日志**：[results/1021_0117_tsm-v1-b66/raw/1021_0117_boutique-infrastructure-29](../results/1021_0117_tsm-v1-b66/raw/1021_0117_boutique-infrastructure-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (110x) show 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.118.176:50051: connect: connection refused'; the Service shippingservice itself declares ClusterIP 10.68.118.176 / 50051/TCP and its endpoints are '<none>' with CheckServiceConnectivity returning 'Connection Failed'. Pod shippingservice-7ff54bf6b6-5b4tc is the only outlier: 0/1 Pending, Node: <none>, and DescribeResource shows 'Events: <none>' — no scheduling row at all — while all other 10 boutique pods are 1/1 Running on worker-01/02/03. General node face is clean (all 4 nodes Read

### case-30

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 191,825
- **raw 日志**：[results/1021_0129_tsm-v1-b72/raw/1021_0129_boutique-infrastructure-30](../results/1021_0129_tsm-v1-b72/raw/1021_0129_boutique-infrastructure-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (240/244 errors) show 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.200.162:9555: connect: connection refused', the ClusterIP:port the adservice Service declares. services/adservice is 10.68.200.162:9555/TCP with selector app=adservice matching the pod, but endpoints/adservice is '<none>' - no ready backend. Pod adservice-69ccdc578f-7qkqh is 0/1 ContainerCreating on worker-01 with PodScheduled=True and PodReadyToStartContainers=False, no FailedMount/image-pull events. On worker-01 kubelet.service is 'Active: inactive (dead)' (Stopped Kubernetes Kubele

### case-31

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2632 · steps 20 · tokens 206,709
- **raw 日志**：[results/1021_0136_tsm-v1-b75/raw/1021_0136_boutique-infrastructure-31](../results/1021_0136_tsm-v1-b75/raw/1021_0136_boutique-infrastructure-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：worker-01 is NotReady/Unknown with unreachable taints; CheckNodeServiceStatus(worker-01, kubelet) shows 'Active: inactive (dead) since Fri 2025-12-05 15:12:29 CST' — its log ends with 'Stopping Kubernetes Kubelet... kubelet.service: Deactivated successfully' right after mounting volumes for boutique/cartservice-57fd8b5d44-rvsr8, while containerd and kube-proxy on the same node are still active (running). The only outlier row in the pods listing is cartservice-57fd8b5d44-rvsr8 0/1 ContainerCreating on worker-01 (all other 10 pods 1/1 Running); its pod sheet shows PodScheduled=True but PodReadyT

### case-32

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 219,088
- **raw 日志**：[results/1021_0140_tsm-v1-b77/raw/1021_0141_boutique-infrastructure-32](../results/1021_0140_tsm-v1-b77/raw/1021_0141_boutique-infrastructure-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice pod stuck in ContainerCreating with no IP and only a 'Normal Scheduled' event (no FailedMount/image-pull/FailedCreate), while all 10 other pods are 1/1 Running. checkoutservice Service declares port 5050/TCP; endpoints are '<none>' and CheckServiceConnectivity(5050) returned 'Connection Failed'. frontend error logs show 'dial tcp 192.168.0.222:10250: connect: connection refused'. GetClusterConfiguration shows worker-01 as the only node with Status Unknown and 'Kubelet stopped posting node status.' plus unreachable:NoSchedule/NoExecute taints. CheckNodeServiceStatus(worker-01, k

### case-33

- **结论**：`node/worker-02` + `kubelet_unavailable` ｜ 标签 `node/worker-02` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 209,250
- **raw 日志**：[results/1021_0146_tsm-v1-b80/raw/1021_0147_boutique-infrastructure-33](../results/1021_0146_tsm-v1-b80/raw/1021_0147_boutique-infrastructure-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend GetErrorLogs (404/424 errors) shows 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.127.51:7000: connect: connection refused' on GET /cart and POST /cart/checkout - the currency conversion edge is the complaint. Pods listing has exactly one outlier: currencyservice-769fddbbdd-z2bjw 0/1 ContainerCreating, IP <none>, NODE worker-02. Pod detail: Status Pending, PodReadyToStartContainers False, Events contain only 'Normal Scheduled 113s default-scheduler Successfully assigned boutique/currencyservice-769fddbbdd-z2bjw to worker-02' - no sandbox was ever cre

### case-34

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 0.6667 · EOC 0.3333 · ECR 0 · EE 0.15 · steps 21 · tokens 212,997
- **raw 日志**：[results/1021_0152_tsm-v1-b83/raw/1021_0152_boutique-infrastructure-34](../results/1021_0152_tsm-v1-b83/raw/1021_0152_boutique-infrastructure-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entry service) error log shows the only unreachability pattern: 'failed to get ads: rpc error: code = DeadlineExceeded desc = context deadline exceeded', and a TCP probe on adservice's own declared port 9555 returns 'Connection Failed'. All 11 pods are 1/1 Running with 0 RESTARTS, so the workload layer is healthy. The endpoints listing splits exactly along the node boundary: every empty-endpoint Service (adservice, currencyservice, paymentservice, recommendationservice, shippingservice) has its pod on worker-01 (172.20.1.x), while every populated one (cartservice, checkoutservice, em

### case-35

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 213,403
- **raw 日志**：[results/1021_0158_tsm-v1-b86/raw/1021_0158_boutique-infrastructure-35](../results/1021_0158_tsm-v1-b86/raw/1021_0158_boutique-infrastructure-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact match on 'Partial Service Unreachability.'. Complaint side: frontend error logs empty; frontend Service exists (80->8080) but endpoints are '<none>'. Workload outlier: pod frontend-55c88c6544-7rvkn 0/1 Pending, Node <none>, PodScheduled False, with event 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) had untolerated taint {node.kubernetes.io/unreachable: }, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector' and Node-Selectors: kubernetes.io/hostname=worker-01. Node surface: worker-01 is NotReady/Unknown with taints node.kubernetes.io/unre

### case-36

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 241,320
- **raw 日志**：[results/1021_0201_tsm-v1-b88/raw/1021_0202_boutique-infrastructure-36](../results/1021_0201_tsm-v1-b88/raw/1021_0202_boutique-infrastructure-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows the single outlier paymentservice-5668cc5547-fzd74 as 0/1 Pending with NODE=<none> while all other 10 boutique pods are 1/1 Running. Its own pod sheet carries the scheduling line: Warning FailedScheduling '0/4 nodes are available: 1 node(s) had untolerated taint {node.kubernetes.io/unreachable: }, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector', and Node-Selectors: kubernetes.io/hostname=worker-01 (confirmed verbatim in the paymentservice deployment YAML as nodeSelector kubernetes.io/hostname: worker-01). Node side: worker-01 (InternalIP 19

### case-37

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.3333 · ECR 1 · EE 0.2857 · steps 15 · tokens 166,253
- **raw 日志**：[results/1021_0207_tsm-v1-b91/raw/1021_0207_boutique-infrastructure-37](../results/1021_0207_tsm-v1-b91/raw/1021_0207_boutique-infrastructure-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side (frontend error logs) shows `dial tcp 192.168.0.222:10250: connect: connection refused` to worker-01's kubelet API — refused, not timeout, so not a network delay/loss. Pods listing has exactly one outlier: productcatalogservice-84d997fd97-kzfpn 0/1 Pending; all other 10 pods Running 1/1, with 5 of them (frontend, cartservice, checkoutservice, recommendationservice, redis-cart) still bound to worker-01. Pod detail carries the scheduling line: Node: <none>, PodScheduled False, Node-Selectors: kubernetes.io/hostname=worker-01, and `Warning FailedScheduling 0/4 nodes are available: 

### case-38

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 222,351
- **raw 日志**：[results/1021_0211_tsm-v1-b93/raw/1021_0212_boutique-infrastructure-38](../results/1021_0211_tsm-v1-b93/raw/1021_0212_boutique-infrastructure-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice Service (port 8080) has ENDPOINTS: <none> and an active TCP probe returned 'Connection Failed'; its pod recommendationservice-7df56b7d59-m8hmq is 0/1 Pending with Node: <none>, PodScheduled False, and the scheduling line '0/4 nodes are available: 1 node(s) had untolerated taint {node.kubernetes.io/unreachable: }, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector'. Node listing resolves each count exactly: master=Ready,SchedulingDisabled (unschedulable taint); worker-01=NotReady with conditions Unknown, internal IP 192.168.0.222, taints node

### case-39

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2632 · steps 20 · tokens 225,842
- **raw 日志**：[results/1021_0218_tsm-v1-b96/raw/1021_0218_boutique-infrastructure-39](../results/1021_0218_tsm-v1-b96/raw/1021_0218_boutique-infrastructure-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs 180/920 (19.6%), 128 identical 'could not retrieve cart: rpc error: code = FailedPrecondition desc = Can't access cart storage ... RedisConnectionException: UnableToConnect on redis-cart:6379 ... clientName: cartservice-79b49f5555-z2z4g' -> failing edge cartservice -> redis-cart:6379. Object layer: pods listing outlier row only 'redis-cart-56db4dcdd5-n9flp 0/1 ContainerCreating 0 113s IP=<none> NODE=worker-01' while all 10 peer pods are 1/1 Running; endpoints/redis-cart shows '<none>' while services/redis-cart declares 6379/TCP; redis-cart-pvc is 'Bound' to re

### case-40

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 28 · tokens 368,553
- **raw 日志**：[results/1021_0227_tsm-v1-b101/raw/1021_0227_boutique-infrastructure-40](../results/1021_0227_tsm-v1-b101/raw/1021_0227_boutique-infrastructure-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend error logs (192/950) show cart storage unreachable: 'UnableToConnect on redis-cart:6379 ... state: Connecting, last-heartbeat: never' plus 'cart failure: failed to get user cart during checkout'. Active TCP probes with Service-declared ports failed for every worker-01-hosted service (redis-cart:6379, adservice:9555, paymentservice:50051, shippingservice:50051) while worker-02-hosted services succeeded as control (productcatalogservice:3550 open, cartservice:7070 open), proving a node-scoped fault, not a service-scoped one. Node surface: worker-01 is NotReady / Status Unknown with Memo

