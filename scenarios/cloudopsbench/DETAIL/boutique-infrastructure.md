# 评测明细 · boutique/infrastructure — cloudopsbench

> 本家族已跑 **40/40** 题：JRA ✅40 ❌0 ｜ 证据链全闭 40 ｜ token 中位 127,753 ｜ 生成 2026-10-13T15:40:50.356Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 96,876 | 0 | 0 | 1012_1458_l3-verify3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 107,349 | 0 | 0 | 1012_1856_inorder4-v3b5 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 79,206 | 0 | 0 | 1012_1941_inorder4-v3b7 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2667 | 16 | 110,448 | 0 | 0 | 1013_1225_inorder4-v3b11 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 100,063 | 0 | 0 | 1013_1413_inorder4-v3b15 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 76,649 | 0 | 0 | 1013_1536_inorder4-v3b19 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 77,500 | 0 | 0 | 1013_1623_inorder4-v3b21 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 77,283 | 0 | 0 | 1013_1633_inorder4-v3b23 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 93,919 | 0 | 0 | 1013_1645_inorder4-v3b24 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 11 | 54,365 | 0 | 0 | 1013_1805_inorder4-v3b26 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.381 | 22 | 169,478 | 0 | 0 | 1013_1831_inorder4-v3b29 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 25 | 224,905 | 0 | 0 | 1013_1839_inorder4-v3b31 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 34 | 233,765 | 0 | 0 | 1013_2004_inorder4-v3b36 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.381 | 22 | 127,921 | 0 | 0 | 1013_2008_inorder4-v3b37 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3214 | 29 | 204,295 | 0 | 0 | 1013_2012_inorder4-v3b38 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 127,753 | 0 | 0 | 1013_2042_inorder4-v3b39 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5667 | 31 | 150,940 | 0 | 0 | 1013_2049_inorder4-v3b40 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 21 | 131,291 | 0 | 0 | 1013_2059_inorder4-v3b41 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.12 | 26 | 208,511 | 0 | 0 | 1013_2106_inorder4-v3b42 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1111 | 28 | 177,400 | 0.037 | 0 | 1013_2110_inorder4-v3b43 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.0909 | 34 | 399,815 | 0 | 0 | 1013_2114_inorder4-v3b44 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 22 | 155,346 | 0 | 0 | 1013_2143_inf22-verify2 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 92,595 | 0 | 0 | 1013_2141_inorder4-v3b46 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2308 | 14 | 88,573 | 0 | 0 | 1013_2150_inorder4-v3b47 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.1875 | 17 | 113,077 | 0 | 0 | 1013_2156_inorder4-v3b48 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 125,844 | 0 | 0 | 1013_2203_inorder4-v3b49 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 134,232 | 0 | 0 | 1013_2210_inorder4-v3b50 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 89,399 | 0 | 0 | 1013_2214_inorder4-v3b51 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 125,901 | 0 | 0 | 1013_2217_inorder4-v3b52 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 99,048 | 0 | 0 | 1013_2229_inorder4-v3b53 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 99,780 | 0 | 0 | 1013_2235_inorder4-v3b54 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 140,955 | 0 | 0 | 1013_2240_inorder4-v3b55 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 123,672 | 0 | 0 | 1013_2245_inorder4-v3b56 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 127,753 | 0 | 0 | 1013_2249_inorder4-v3b57 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1905 | 22 | 156,072 | 0 | 0 | 1013_2253_inorder4-v3b58 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2083 | 25 | 224,794 | 0 | 0 | 1013_2258_inorder4-v3b59 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2609 | 24 | 178,626 | 0 | 0 | 1013_2303_inorder4-v3b60 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 137,377 | 0 | 0 | 1013_2308_inorder4-v3b61 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 104,041 | 0 | 0 | 1013_2311_inorder4-v3b62 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1905 | 22 | 128,665 | 0 | 0 | 1013_2315_inorder4-v3b63 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 96,876
- **raw 日志**：[results/1012_1458_l3-verify3/raw/1012_1459_boutique-infrastructure-1](../results/1012_1458_l3-verify3/raw/1012_1459_boutique-infrastructure-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 5 unavailable services (adservice, cartservice, emailservice, productcatalogservice, shippingservice) have <none> endpoints; their pods are all stuck at Init:0/1/Pending on node worker-01 while every pod on worker-02 is 2/2 Running. Pod describe on productcatalogservice-6fb89f98f8-ptjsz shows PodScheduled=True but event 'FailedCreatePodSandBox ... dial unix /run/containerd/containerd.sock: connect: no such file or directory'. GetClusterConfiguration shows worker-01 NotReady (not-ready taints) while other nodes are Ready. CheckNodeServiceStatus(worker-01, containerd) = 'Active: inactive (de

### case-2

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 107,349
- **raw 日志**：[results/1012_1856_inorder4-v3b5/raw/1012_1902_boutique-infrastructure-2](../results/1012_1856_inorder4-v3b5/raw/1012_1902_boutique-infrastructure-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：All boutique pods scheduled on worker-02 (checkoutservice, currencyservice, emailservice, recommendationservice, redis-cart, shippingservice) are stuck at 0/2 Init:0/1 with no IP, while every pod on worker-01 runs 2/2 (RESTARTS 0). Pod event 'FailedCreatePodSandBox: Failed to create pod sandbox: rpc error: code = Unavailable desc = ... dial unix /run/containerd/containerd.sock: connect: no such file or directory' and node event 'ContainerGCFailed' with the same socket error, plus kubelet log '"Skipping pod synchronization" err="container runtime is down"' and 'GenericPLEG: Unable to retrieve p

### case-3

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 79,206
- **raw 日志**：[results/1012_1941_inorder4-v3b7/raw/1012_1941_boutique-infrastructure-3](../results/1012_1941_inorder4-v3b7/raw/1012_1941_boutique-infrastructure-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 5 unavailable boutique workloads (frontend, paymentservice, productcatalogservice, redis-cart, shippingservice) have their only pod stuck at 'Init:0/1' with no IP and are all placed on worker-01, while every pod on worker-02 is 2/2 Running. Pod detail and namespace/node events bind the mechanism to the node: 'Warning FailedCreatePodSandBox: Failed to create pod sandbox: rpc error: code = Unavailable ... dial unix /run/containerd/containerd.sock: connect: no such file or directory' and 'Warning ContainerGCFailed' on node worker-01. Node generic evidence: worker-01 NotReady, CONTAINER-RUNTIM

### case-4

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2667 · steps 16 · tokens 110,448
- **raw 日志**：[results/1013_1225_inorder4-v3b11/raw/1013_1225_boutique-infrastructure-4](../results/1013_1225_inorder4-v3b11/raw/1013_1225_boutique-infrastructure-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability is scoped exactly to the pods scheduled on worker-02. frontend caller logs show 'rpc error: code = Unavailable desc = no healthy upstream' for productcatalogservice (107x), currencyservice (80x) and checkoutservice (32x). Pod listing: adservice/cartservice/emailservice/frontend/redis-cart on worker-01 are 2/2 Running, while all 6 pods on worker-02 (checkoutservice, currencyservice, paymentservice, productcatalogservice, recommendationservice, shippingservice) are stuck 0/2 Init:0/1 with no PodIP. Pod and namespace events name the mechanism verbatim: 'Warning FailedCreate

### case-5

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 100,063
- **raw 日志**：[results/1013_1413_inorder4-v3b15/raw/1013_1413_boutique-infrastructure-5](../results/1013_1413_inorder4-v3b15/raw/1013_1413_boutique-infrastructure-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability is node-scoped, not service-scoped. Connectivity probe: adservice:9555 -> 'Connection Failed' while productcatalogservice:3550 (172.20.2.80, worker-02) -> open/'Connection Succeeded'. Pods listing: all 5 pods on worker-01 (frontend, adservice, paymentservice, shippingservice, redis-cart) are stuck '0/2 Init:0/1' with no pod IP, while all 6 pods on worker-02 are '2/2 Running'. Mechanism event, verbatim in both pod describe and namespace events (Warning FailedCreatePodSandBox): 'Failed to create pod sandbox: rpc error: code = Unavailable desc = ... dial unix /run/container

### case-6

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 76,649
- **raw 日志**：[results/1013_1536_inorder4-v3b19/raw/1013_1536_boutique-infrastructure-6](../results/1013_1536_inorder4-v3b19/raw/1013_1536_boutique-infrastructure-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 6 boutique pods scheduled on worker-02 are stuck at 0/2 Init:0/1 (checkoutservice, currencyservice, emailservice, productcatalogservice, recommendationservice, shippingservice) while every pod on worker-01 runs 2/2 Running — the fault is strictly node-partitioned. Pod events and pod describe show 'FailedCreatePodSandBox: rpc error: code = Unavailable ... dial unix /run/containerd/containerd.sock: connect: no such file or directory'. CheckNodeServiceStatus(worker-02) confirms containerd.service is 'Active: inactive (dead)' since 12:54:54 (main PID exited), while kubelet and kube-proxy on th

### case-7

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 77,500
- **raw 日志**：[results/1013_1623_inorder4-v3b21/raw/1013_1623_boutique-infrastructure-7](../results/1013_1623_inorder4-v3b21/raw/1013_1623_boutique-infrastructure-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods on worker-01 (adservice, currencyservice, productcatalogservice, recommendationservice, redis-cart) are all stuck at 0/2 Init:0/1 while every pod on worker-02 is 2/2 Running — a node-scoped outlier. The pod event surface shows the mechanism verbatim on worker-01 pods: 'Warning FailedCreatePodSandBox: Failed to create pod sandbox: rpc error: code = Unavailable desc = "... dial unix /run/containerd/containerd.sock: connect: no such file or directory"' (PodScheduled=True, so scheduling succeeded). CheckNodeServiceStatus(worker-01, containerd) returns 'Active: inactive (dead) since Fri 2026-0

### case-8

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 77,283
- **raw 日志**：[results/1013_1633_inorder4-v3b23/raw/1013_1633_boutique-infrastructure-8](../results/1013_1633_inorder4-v3b23/raw/1013_1633_boutique-infrastructure-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability': 6 of 11 boutique pods (adservice, cartservice, checkoutservice, currencyservice, productcatalogservice, shippingservice) are stuck at Init:0/1 with no pod IP, all of them scheduled on worker-02, while every worker-01 pod is 2/2 Running. Namespace events show 'Warning FailedCreatePodSandBox ... dial unix /run/containerd/containerd.sock: connect: no such file or directory' for each worker-02 pod. On worker-02: containerd.service is 'Active: inactive (dead) since Fri 2026-01-02 13:00:51 CST' (runtime socket gone, only leftover shims), while kubelet is sti

### case-9

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 93,919
- **raw 日志**：[results/1013_1645_inorder4-v3b24/raw/1013_1645_boutique-infrastructure-9](../results/1013_1645_inorder4-v3b24/raw/1013_1645_boutique-infrastructure-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique shows a node-scoped outage: all 7 pods assigned to worker-01 (adservice, currencyservice, emailservice, productcatalogservice, redis-cart, shippingservice) are stuck 0/1 ContainerCreating, while every pod on worker-02 is 1/1 Running. Their pod events and the namespace events surface all carry the identical Warning FailedCreatePodSandBox with 'rpc error: code = Unavailable ... dial unix /run/containerd/containerd.sock: connect: no such file or directory' (pods are PodScheduled=True and Initialized=True, so scheduling/admission are fine). Node worker-01 is NotReady with condit

### case-10

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 11 · tokens 54,365
- **raw 日志**：[results/1013_1805_inorder4-v3b26/raw/1013_1805_boutique-infrastructure-10](../results/1013_1805_inorder4-v3b26/raw/1013_1805_boutique-infrastructure-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 5 pods scheduled on worker-02 (cartservice, checkoutservice, frontend, productcatalogservice, recommendationservice) are stuck 0/1 ContainerCreating while all worker-01 pods are Running — a node-partitioned, 'partial' outage. Pod events show 'Warning FailedCreatePodSandBox: rpc error: code = Unavailable ... dial unix /run/containerd/containerd.sock: connect: no such file or directory', and worker-02's kubelet logs repeatedly report 'Skipping pod synchronization err=container runtime is down', 'GenericPLEG: Unable to retrieve pods' and 'ImageFsInfo from image service failed' on the same mis

### case-11

- **结论**：`node/worker-01` + `kube_proxy_unavailable` ｜ 标签 `node/worker-01` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.381 · steps 22 · tokens 169,478
- **raw 日志**：[results/1013_1831_inorder4-v3b29/raw/1013_1831_boutique-infrastructure-11](../results/1013_1831_inorder4-v3b29/raw/1013_1831_boutique-infrastructure-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts, all 11 deployments 1/1 AVAILABLE, and all service endpoints bind correctly, so the workload/admission layer is clean. Frontend (on worker-01) logs 197/867 errors (22.7%) with HTTP 500: 'dial tcp 10.68.20.26:3550: i/o timeout' (productcatalogservice) and 'dial tcp 10.68.52.125:5050: i/o timeout' (checkoutservice) plus 'lookup currencyservice on 169.254.20.10:53: no such host'. Dialing ClusterIPs (not pod IPs) points the break at the Service forwarding path. CheckServiceConnectivity decisively shows currencyservice:7000, productcatalogservice

### case-12

- **结论**：`node/worker-02` + `kube_proxy_unavailable` ｜ 标签 `node/worker-02` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 25 · tokens 224,905
- **raw 日志**：[results/1013_1839_inorder4-v3b31/raw/1013_1839_boutique-infrastructure-12](../results/1013_1839_inorder4-v3b31/raw/1013_1839_boutique-infrastructure-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Node-scoped reachability break on worker-02. Active TCP probes from worker-02 fail to EVERY ClusterIP Service (redis-cart:6379, cartservice:7070, productcatalogservice:3550 all 'Connection Failed'), while the same probes succeed from worker-01 and worker-03. CheckNodeServiceStatus(worker-02, kube-proxy) shows 'Active: inactive (dead) since Fri 2026-01-02 15:46:13 CST' (killed, signal=TERM), whereas kube-proxy is active(running) on worker-01/worker-03 and kubelet/containerd on worker-02 are active(running) with the node Ready. Consequently cartservice, which runs on worker-02, cannot reach redi

### case-13

- **结论**：`node/worker-01` + `kube_proxy_unavailable` ｜ 标签 `node/worker-01` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 34 · tokens 233,765
- **raw 日志**：[results/1013_2004_inorder4-v3b36/raw/1013_2004_boutique-infrastructure-13](../results/1013_2004_inorder4-v3b36/raw/1013_2004_boutique-infrastructure-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer clean: all 11 boutique pods 1/1 Running with 0 restarts, all Deployments 1/1 AVAILABLE, all Service selectors app=<name> with endpoints bound; node worker-01 Ready with kubelet/containerd/flannel healthy. Active TCP probes from a debug pod on worker-01 to EVERY service ClusterIP (cartservice:7070, currencyservice:7000, checkoutservice:5050, shippingservice:50051, redis-cart:6379) return 'Connection Failed', while the same probes from worker-02 and worker-03 return 'open / Connection Succeeded' - a node-scoped, not service-scoped, reachability break. The mechanism is read directly:

### case-14

- **结论**：`node/worker-02` + `kube_proxy_unavailable` ｜ 标签 `node/worker-02` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.381 · steps 22 · tokens 127,921
- **raw 日志**：[results/1013_2008_inorder4-v3b37/raw/1013_2008_boutique-infrastructure-14](../results/1013_2008_inorder4-v3b37/raw/1013_2008_boutique-infrastructure-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller-side frontend error logs (22.4% error ratio) show pure address-layer failures: 'dial tcp <ClusterIP>:<port>: i/o timeout' to currencyservice 10.68.192.252:7000, productcatalogservice 10.68.54.111:3550 and checkoutservice 10.68.176.74:5050. The workload surface is clean (all 11 pods 1/1 Running, 0 restarts, no Pending/image-pull events) and every Service has correctly bound endpoints, so the break is not selector/port/template. Connectivity probes on the services' declared ports succeed from worker-01 and worker-03 ('open / Connection Succeeded') but fail from worker-02 for EVERY service

### case-15

- **结论**：`node/worker-01` + `kube_proxy_unavailable` ｜ 标签 `node/worker-01` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3214 · steps 29 · tokens 204,295
- **raw 日志**：[results/1013_2012_inorder4-v3b38/raw/1013_2012_boutique-infrastructure-15](../results/1013_2012_inorder4-v3b38/raw/1013_2012_boutique-infrastructure-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer is fully healthy (11/11 pods 1/1 Running with 0 restarts, all deployments 1/1 AVAILABLE, all Service Endpoints correctly bound, frontend env addresses/ports correct), so the break is in the transport/addressing plane on one node. Cross-node connectivity probes show failure is bound to the probe's node, not to the target: productcatalogservice:3550, currencyservice:7000, checkoutservice:5050 and cartservice:7070 ALL fail from worker-01 but ALL succeed from worker-02 and worker-03. Caller-side evidence from frontend (scheduled on worker-01) shows exactly this: 'could not retrieve pr

### case-16

- **结论**：`node/worker-02` + `kube_proxy_unavailable` ｜ 标签 `node/worker-02` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 127,753
- **raw 日志**：[results/1013_2042_inorder4-v3b39/raw/1013_2043_boutique-infrastructure-16](../results/1013_2042_inorder4-v3b39/raw/1013_2043_boutique-infrastructure-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no alerts or Warning events, so the fault is at the reachability layer, not scheduling/startup/probe. Caller-side logs anchor on the cart path: frontend reports 'failed to complete the order ... cart failure ... transport: Error while dialing: dial tcp 10.68.139.239:7070: i/o timeout' (checkoutservice on worker-02 dialing the cartservice ClusterIP), and cartservice logs 198 errors / ratio 0.3694 ending in 'It was not possible to connect to the redis server(s). ConnectTimeout, serverEndpoint: redis-cart:6379, clientName: cartservice-7c5f4

### case-17

- **结论**：`node/worker-01` + `kube_proxy_unavailable` ｜ 标签 `node/worker-01` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5667 · steps 31 · tokens 150,940
- **raw 日志**：[results/1013_2049_inorder4-v3b40/raw/1013_2049_boutique-infrastructure-17](../results/1013_2049_inorder4-v3b40/raw/1013_2049_boutique-infrastructure-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 1/1 with 0 RESTARTS, all deployments 1/1 AVAILABLE, all endpoints bound, and no alerts - the object layer is clean. Active TCP probes of each service's own declared port diverge strictly by node: every probe from the worker-01 debug pod fails ('punt! / Terminated / Connection Failed') across all 11 services, while identical probes from worker-02 and worker-03 succeed ('open / Connection Succeeded'), so the break follows the node and severs ClusterIP reachability node-wide. The mechanism is read directly: kube-proxy.service on worker-01 is 'Active: inactive (dea

### case-18

- **结论**：`node/worker-02` + `kube_proxy_unavailable` ｜ 标签 `node/worker-02` + `kube_proxy_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 21 · tokens 131,291
- **raw 日志**：[results/1013_2059_inorder4-v3b41/raw/1013_2101_boutique-infrastructure-18](../results/1013_2059_inorder4-v3b41/raw/1013_2101_boutique-infrastructure-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod/Deployment/Service/Endpoints listings are all uniformly healthy (all pods 1/1 Running, 0 restarts, all deployments 1/1 AVAILABLE, all endpoints populated), so the break is not in the workload layer. Caller-side read (frontend error logs, 197 errors) shows simultaneous address-layer failures: 'lookup productcatalogservice on 169.254.20.10:53: no such host' (85x), 'lookup currencyservice ... no such host' (76x), and 'dial tcp 10.68.159.24:5050: i/o timeout' (34x). Per-node connectivity probes on the ports each Service declares show that from worker-02 every service probe FAILS ('punt! Termin

### case-19

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.12 · steps 26 · tokens 208,511
- **raw 日志**：[results/1013_2106_inorder4-v3b42/raw/1013_2106_boutique-infrastructure-19](../results/1013_2106_inorder4-v3b42/raw/1013_2106_boutique-infrastructure-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique (live cluster confirms boutique is the only workload namespace; no train-ticket namespace exists). Inventory outlier: adservice-64ddc5c766-skqvc 0/1 Pending, NODE <none>, while all other pods are 1/1 Running. Victim signal: endpoints/adservice = <none> and CheckServiceConnectivity(adservice, 9555) = 'Connection Failed'. Pod's own reason is absent (no 'N nodes are available' line, Events: <none>) and the namespace event surface carries no FailedScheduling at all -> the scheduler never processed the pod. Node side: all 4 nodes Ready, no pressure, workers untainted with 8 CPU f

### case-20

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1111 · steps 28 · tokens 177,400
- **raw 日志**：[results/1013_2110_inorder4-v3b43/raw/1013_2110_boutique-infrastructure-20](../results/1013_2110_inorder4-v3b43/raw/1013_2110_boutique-infrastructure-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique inventory has exactly one outlier: pod cartservice-79b49f5555-mmhv4 (0/1 Pending, Node:<none>, Events:<none>), while the other 10 workloads are 1/1 Running. Service-side signal confirms the disruption: CheckServiceConnectivity(cartservice:7070)=Connection Failed, deployment cartservice 0/1 available (Available=False MinimumReplicasUnavailable), so the cartservice Service has no ready endpoints. The break is the scheduler: CheckNodeServiceStatus(master, kube-scheduler) shows 'Active: inactive (dead) since Tue 2025-12-02 21:13:59 CST' with 'Scheduling queue is closed' / 'Requested to te

### case-21

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.0909 · steps 34 · tokens 399,815
- **raw 日志**：[results/1013_2114_inorder4-v3b44/raw/1013_2114_boutique-infrastructure-21](../results/1013_2114_inorder4-v3b44/raw/1013_2114_boutique-infrastructure-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend caller logs show 'failed to complete the order: ... dial tcp 10.68.129.244:5050: connect: connection refused' (checkoutservice ClusterIP) and CheckServiceConnectivity(checkoutservice:5050) returns 'Connection Failed' - only 1 of 11 services is unreachable. Object layer: the single outlier pod checkoutservice-8445f8b6cb-58chn is 0/1 Pending with Node:<none>, and its own Events are empty (no scheduling event at all); owner chain deployment/checkoutservice is 0/1 available (Available=False MinimumReplicasUnavailable), RS 1 current/1 desired / 1 Waiting. Scheduling blockers 

### case-22

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 22 · tokens 155,346
- **raw 日志**：[results/1013_2143_inf22-verify2/raw/1013_2143_boutique-infrastructure-22](../results/1013_2143_inf22-verify2/raw/1013_2143_boutique-infrastructure-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain closed on currencyservice: its Endpoints are '<none>' while every other boutique service is bound, a TCP probe on its declared port 7000 fails, and frontend caller logs show 388 errors 'dial tcp 10.68.249.177:7000: connect: connection refused'. The workload outlier is pod currencyservice-5c6fdf7ccb-tc4gk (0/1 Pending) with deployment currencyservice 0/1 AVAILABLE; the pod's own sheet shows 'Node: <none>' and 'Events: <none>' with NO '0/N nodes are available' scheduling line, meaning no scheduling attempt was ever made. The control plane is the break: CheckNodeServiceStatus(m

### case-23

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 92,595
- **raw 日志**：[results/1013_2141_inorder4-v3b46/raw/1013_2143_boutique-infrastructure-23](../results/1013_2141_inorder4-v3b46/raw/1013_2143_boutique-infrastructure-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only emailservice is anomalous: pod emailservice-c86b9b8f6-92zg7 is Pending on 1/1 replicas while all other 10 boutique pods are 1/1 Running. Its own sheet shows Node: <none>, Status: Pending, Events: <none> and NO '0/N nodes are available' scheduling condition, while GetClusterConfiguration shows worker-01/02/03 all Ready with no taints (only master carries the by-design unschedulable taint) -> nothing ever attempted to schedule it. The control-plane read closes it: CheckNodeServiceStatus(master, kube-scheduler) = 'Active: inactive (dead) since Tue 2025-12-02 21:23:01 CST', 'Stopped Kubernete

### case-24

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2308 · steps 14 · tokens 88,573
- **raw 日志**：[results/1013_2150_inorder4-v3b47/raw/1013_2152_boutique-infrastructure-24](../results/1013_2150_inorder4-v3b47/raw/1013_2152_boutique-infrastructure-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend pod frontend-c884c5787-lnqxr is the lone outlier (0/1 Pending, Node <none>, Events: <none>, no '0/N nodes are available' condition) while all other boutique pods are 1/1 Running; frontend deployment reads 0/1 UP-TO-DATE=1 AVAILABLE=0. All three workers are Ready, untainted, no pressure, with ~8 CPU/15Gi allocatable (GetClusterConfiguration), so cordon/taint/capacity/affinity classes are excluded and nothing on the node side blocked it. CheckNodeServiceStatus(master, kube-scheduler) shows 'Active: inactive (dead)' with 'Stopped Kubernetes Scheduler' and 'Requested to terminate, exiting

### case-25

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.1875 · steps 17 · tokens 113,077
- **raw 日志**：[results/1013_2156_inorder4-v3b48/raw/1013_2157_boutique-infrastructure-25](../results/1013_2156_inorder4-v3b48/raw/1013_2157_boutique-infrastructure-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: CheckServiceConnectivity(paymentservice:50051) = 'Connection Failed' and Service paymentservice shows empty Endpoints, while the other 10 boutique services are reachable ('Partial' unreachability). Object layer: the only outlier pod is paymentservice-78c5996648-hn8w6, 0/1 Pending for 82s with Node=<none>; DescribeResource shows Status Pending, Node <none> and Events: <none> - no '0/N nodes are available' scheduling condition at all, i.e. no scheduling attempt was ever made; deployment paymentservice is 0/1 available with 1 up-to-date (replicas not zero). Node layer: GetClusterCon

### case-26

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 125,844
- **raw 日志**：[results/1013_2203_inorder4-v3b49/raw/1013_2204_boutique-infrastructure-26](../results/1013_2203_inorder4-v3b49/raw/1013_2204_boutique-infrastructure-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: only outlier in the pods inventory is productcatalogservice-ddb46fc86-h9klx (0/1 Pending, Node <none>); its endpoints listing is <none> and deployment productcatalogservice reads 0/1 AVAILABLE, i.e. the availability disruption. The pod's own detail carries NO scheduling reason line (Events: <none>, no 'N nodes are available' message), while all three workers are Ready with no taints and ample allocatable (8 CPU / ~15.6Gi each) and the pod specifies no nodeSelector/affinity - so nothing failed to schedule, nothing is attempting to schedule. The closing read is the control pl

### case-27

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 134,232
- **raw 日志**：[results/1013_2210_inorder4-v3b50/raw/1013_2210_boutique-infrastructure-27](../results/1013_2210_inorder4-v3b50/raw/1013_2210_boutique-infrastructure-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice is the only service with zero endpoints ('recommendationservice  <none>' in the endpoints listing) and its Deployment reads 0/1 AVAILABLE. Its pod recommendationservice-7bf5b7d9b8-tk7kf is Pending with 'Node: <none>' and 'Events: <none>' — no FailedScheduling line at all, meaning nothing ever attempted to place it. The node side is clean: worker-01/02/03 are all Ready, untainted, each with 8 CPU / ~15.6Gi allocatable, and the deployment has no nodeSelector/affinity and only 100m/220Mi requests, excluding capacity, taint, affinity and cordon causes. The mechanism is at the

### case-28

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 89,399
- **raw 日志**：[results/1013_2214_inorder4-v3b51/raw/1013_2214_boutique-infrastructure-28](../results/1013_2214_inorder4-v3b51/raw/1013_2214_boutique-infrastructure-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique inventory shows a single outlier: pod redis-cart-589d486f78-ghstg is 0/1 Pending with 'Node: <none>' and NO scheduling line/event at all (DescribeResource Events: <none>), while deployment redis-cart reports 0/1 AVAILABLE and endpoints/redis-cart shows ENDPOINTS <none> and CheckServiceConnectivity(redis-cart:6379) returns 'Connection Failed'. No node-side blocker exists: workers worker-01/02/03 are Ready with no taints and no pressure (master's unschedulable taint is by design), and the PVC redis-cart-pvc is Bound to redis-cart-pv (2Gi RWO, storageClassName '' matched), so s

### case-29

- **结论**：`node/master` + `kube_scheduler_unavailable` ｜ 标签 `node/master` + `kube_scheduler_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 125,901
- **raw 日志**：[results/1013_2217_inorder4-v3b52/raw/1013_2217_boutique-infrastructure-29](../results/1013_2217_inorder4-v3b52/raw/1013_2217_boutique-infrastructure-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice is unreachable (CheckServiceConnectivity shippingservice:50051 = Connection Failed; endpoints/shippingservice = <none>) because its only pod shippingservice-7ff54bf6b6-5b4tc is stuck Pending, 0/1, with no node assigned and ZERO events - i.e. no FailedScheduling reason at all, meaning nothing ever attempted to bind it. The node side is clean: all three workers are Ready, untainted (taints []) with abundant allocatable (8 CPU / ~15Gi each), and the pod's spec carries no nodeSelector/affinity/tolerations. The break is on the control plane: CheckNodeServiceStatus(master, kube-sched

### case-30

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 99,048
- **raw 日志**：[results/1013_2229_inorder4-v3b53/raw/1013_2230_boutique-infrastructure-30](../results/1013_2229_inorder4-v3b53/raw/1013_2230_boutique-infrastructure-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：worker-01's kubelet is dead: CheckNodeServiceStatus(worker-01, kubelet) shows 'inactive (dead) since Fri 2025-12-05 15:03:23 CST', its log ending mid-sync of boutique/adservice-69ccdc578f-7qkqh ('No sandbox for pod can be found' then 'Stopped Kubernetes Kubelet'), while worker-02's kubelet is active. GetClusterConfiguration shows worker-01 status Unknown with taints node.kubernetes.io/unreachable:NoSchedule/NoExecute while master/worker-02/worker-03 are Ready, and the namespace event surface carries five 'NodeNotReady' warnings for exactly the pods on worker-01. The reachability symptom matche

### case-31

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 99,780
- **raw 日志**：[results/1013_2235_inorder4-v3b54/raw/1013_2235_boutique-infrastructure-31](../results/1013_2235_inorder4-v3b54/raw/1013_2235_boutique-infrastructure-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability' localized to cartservice: endpoints/cartservice shows ENDPOINTS <none> and CheckServiceConnectivity(cartservice:7070) returns 'Connection Failed'. Its pod cartservice-57fd8b5d44-rvsr8 is 0/1 ContainerCreating with no IP and no Container ID, PodScheduled=True/Initialized=True, pinned to worker-01 via nodeSelector kubernetes.io/hostname=worker-01. The pod's sheet and worker-01 kubelet log show the kubelet was handling this exact pod (SyncLoop ADD, 'No sandbox for pod can be found. Need to start a new one', volume mount succeeded) and then stopped: 'Active

### case-32

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 140,955
- **raw 日志**：[results/1013_2240_inorder4-v3b55/raw/1013_2240_boutique-infrastructure-32](../results/1013_2240_inorder4-v3b55/raw/1013_2240_boutique-infrastructure-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: checkoutservice-59664766bc-lmm4p 0/1 ContainerCreating on worker-01 (all other 11 pods 1/1 Running). Victim-side signal: endpoints/checkoutservice = <none>, connectivity probe to its own declared port (Service spec port 5050) = Connection Failed, and caller frontend's error log reads 'dial tcp 192.168.0.222:10250: connect: connection refused' (worker-01, kubelet API port). Pod sheet shows PodScheduled=True with only a Normal Scheduled event (no scheduling failure), so scheduling/capacity causes are excluded. Node side: GetClusterConfiguration reports worker

### case-33

- **结论**：`node/worker-02` + `kubelet_unavailable` ｜ 标签 `node/worker-02` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 123,672
- **raw 日志**：[results/1013_2245_inorder4-v3b56/raw/1013_2245_boutique-infrastructure-33](../results/1013_2245_inorder4-v3b56/raw/1013_2245_boutique-infrastructure-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：currencyservice Service has <none> endpoints and a connectivity probe on its declared port 7000 fails; frontend logs carry 404x 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.127.51:7000: connect: connection refused'. Its pod currencyservice-769fddbbdd-z2bjw is stuck 0/1 ContainerCreating on worker-02 (PodScheduled=True, no mount/image/probe events). worker-02 shows Ready=Unknown with reason NodeStatusUnknown 'Kubelet stopped posting node status.', unreachable:NoSchedule/NoExecute taints and a NodeNotReady event; CheckNodeServiceStatus(worker-02, kubelet) repo

### case-34

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 127,753
- **raw 日志**：[results/1013_2249_inorder4-v3b57/raw/1013_2249_boutique-infrastructure-34](../results/1013_2249_inorder4-v3b57/raw/1013_2249_boutique-infrastructure-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods show Running 1/1 with 0 restarts and no alerts, yet Endpoints are selectively empty: adservice, currencyservice, paymentservice, recommendationservice, shippingservice have NO endpoints while cartservice/checkoutservice/frontend/productcatalogservice/redis-cart/emailservice are bound. The split is exactly node-shaped: every pod on worker-01 is unreachable, every pod on worker-02 is fine — hence 'Partial'. worker-01 is NotReady with Ready=Unknown, Reason=NodeStatusUnknown, Message='Kubelet stopped posting node status.', and carries node.kubernetes.io/unreachable:NoSchedule/

### case-35

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1905 · steps 22 · tokens 156,072
- **raw 日志**：[results/1013_2253_inorder4-v3b58/raw/1013_2253_boutique-infrastructure-35](../results/1013_2253_inorder4-v3b58/raw/1013_2253_boutique-infrastructure-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: frontend Service endpoints are <none> and CheckServiceConnectivity(frontend:80) failed; the endpoints listing splits the namespace by node - all worker-01 pods (adservice, checkoutservice, emailservice, productcatalogservice, shippingservice) plus frontend have no endpoints, while every worker-02 service still has endpoints (partial, node-scoped blast radius). The single outlier in the pod inventory is frontend-55c88c6544-7rvkn (0/1 Pending, Node <none>, 62s). Its own sheet carries the scheduling line: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) had untolerated

### case-36

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2083 · steps 25 · tokens 224,794
- **raw 日志**：[results/1013_2258_inorder4-v3b59/raw/1013_2258_boutique-infrastructure-36](../results/1013_2258_inorder4-v3b59/raw/1013_2258_boutique-infrastructure-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: CheckServiceConnectivity(paymentservice:50051) = Connection Failed and the endpoints surface shows EMPTY endpoints for every service whose pods sit on worker-01 (adservice, currencyservice, frontend, recommendationservice, shippingservice) plus paymentservice <none>, while all worker-02-hosted services keep their endpoints. The pods listing outlier is paymentservice-5668cc5547-fzd74 0/1 Pending (all other 10 pods 1/1 Running), whose own reason reads 'FailedScheduling: 0/4 nodes are available: 1 node(s) had untolerated taint {node.kubernetes.io/unreachable:}, 1 node(s) were 

### case-37

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2609 · steps 24 · tokens 178,626
- **raw 日志**：[results/1013_2303_inorder4-v3b60/raw/1013_2303_boutique-infrastructure-37](../results/1013_2303_inorder4-v3b60/raw/1013_2303_boutique-infrastructure-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 端点面按节点成片分裂：worker-02 上的 adservice/currencyservice/emailservice/paymentservice/shippingservice 均有端点（1/1 AVAILABLE），而 worker-01 上的 cartservice/checkoutservice/frontend/recommendationservice/redis-cart 端点全为空、deployments AVAILABLE=0，连通性实测 Connection Failed（cartservice:7070），productcatalogservice 端点 <none> 且其 pod productcatalogservice-84d997fd97-kzfpn 为 0/1 Pending。根本机制在 worker-01 节点自身：DescribeResource(node worker-01) 显示 Ready=Unknown、Reason=NodeStatusUnknown 'Kubelet stopped posting node status.'，taints node.kubernetes.io/unreachable:NoSchedule/NoExecute；CheckNodeServiceStatus(worker-01, 

### case-38

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 137,377
- **raw 日志**：[results/1013_2308_inorder4-v3b61/raw/1013_2308_boutique-infrastructure-38](../results/1013_2308_inorder4-v3b61/raw/1013_2308_boutique-infrastructure-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows a single outlier: recommendationservice-7df56b7d59-m8hmq Pending with no node assigned, while all other pods are 1/1 Running. Its DescribeResource reports PodScheduled=False with 'FailedScheduling: 0/4 nodes are available: 1 node(s) had untolerated taint {node.kubernetes.io/unreachable: }, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector'. Node surface: worker-01 STATUS=NotReady, all conditions Unknown, taints node.kubernetes.io/unreachable:NoSchedule/NoExecute (master's SchedulingDisabled and worker-02/03 Ready are baseline). Che

### case-39

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 104,041
- **raw 日志**：[results/1013_2311_inorder4-v3b62/raw/1013_2312_boutique-infrastructure-39](../results/1013_2311_inorder4-v3b62/raw/1013_2312_boutique-infrastructure-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: cartservice (downstream = redis-cart per GetServiceDependencies) error logs show 528 errors / 37% error ratio with 'UnableToConnect on redis-cart:6379 ... no connection became available (5000ms)', and CheckServiceConnectivity(redis-cart, 6379) returned 'Connection Failed'. Object layer: the only unhealthy workload is redis-cart-56db4dcdd5-n9flp, stuck 0/1 ContainerCreating/Pending on worker-01 (its Deployment pins it with nodeSelector kubernetes.io/hostname=worker-01). Namespace events bind the mechanism to objects: 'Warning NodeNotReady pod/adservice|shippingservice|checko

### case-40

- **结论**：`node/worker-01` + `kubelet_unavailable` ｜ 标签 `node/worker-01` + `kubelet_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1905 · steps 22 · tokens 128,665
- **raw 日志**：[results/1013_2315_inorder4-v3b63/raw/1013_2315_boutique-infrastructure-40](../results/1013_2315_inorder4-v3b63/raw/1013_2315_boutique-infrastructure-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：worker-01 kubelet is inactive/dead (systemd: 'Stopped Kubernetes Kubelet', Main PID 144481 exited, since 16:36:24); node worker-01 is NotReady with conditions Unknown and taints node.kubernetes.io/unreachable:NoSchedule/NoExecute; checkoutservice error log shows 'dial tcp 192.168.0.222:10250: connect: connection refused' (kubelet port). Containerd and kube-proxy on worker-01 are both active/running, and containerd log shows the sandbox/container were created and started successfully — so the runtime is fine. Reachability is partial exactly along worker-01: shippingservice:50051 Connection Fail

