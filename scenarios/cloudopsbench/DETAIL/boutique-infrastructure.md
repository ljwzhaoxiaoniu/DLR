# 评测明细 · boutique/infrastructure — cloudopsbench

> 本家族已跑 **7/40** 题：JRA ✅7 ❌0 ｜ 证据链全闭 7 ｜ token 中位 96,876 ｜ 生成 2026-10-13T08:32:23.004Z
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

## 证据正文

### case-1

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 96,876
- **摘要**：All 5 unavailable services (adservice, cartservice, emailservice, productcatalogservice, shippingservice) have <none> endpoints; their pods are all stuck at Init:0/1/Pending on node worker-01 while every pod on worker-02 is 2/2 Running. Pod describe on productcatalogservice-6fb89f98f8-ptjsz shows PodScheduled=True but event 'FailedCreatePodSandBox ... dial unix /run/containerd/containerd.sock: connect: no such file or directory'. GetClusterConfiguration shows worker-01 NotReady (not-ready taints) while other nodes are Ready. CheckNodeServiceStatus(worker-01, containerd) = 'Active: inactive (de

### case-2

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 107,349
- **摘要**：All boutique pods scheduled on worker-02 (checkoutservice, currencyservice, emailservice, recommendationservice, redis-cart, shippingservice) are stuck at 0/2 Init:0/1 with no IP, while every pod on worker-01 runs 2/2 (RESTARTS 0). Pod event 'FailedCreatePodSandBox: Failed to create pod sandbox: rpc error: code = Unavailable desc = ... dial unix /run/containerd/containerd.sock: connect: no such file or directory' and node event 'ContainerGCFailed' with the same socket error, plus kubelet log '"Skipping pod synchronization" err="container runtime is down"' and 'GenericPLEG: Unable to retrieve p

### case-3

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 79,206
- **摘要**：All 5 unavailable boutique workloads (frontend, paymentservice, productcatalogservice, redis-cart, shippingservice) have their only pod stuck at 'Init:0/1' with no IP and are all placed on worker-01, while every pod on worker-02 is 2/2 Running. Pod detail and namespace/node events bind the mechanism to the node: 'Warning FailedCreatePodSandBox: Failed to create pod sandbox: rpc error: code = Unavailable ... dial unix /run/containerd/containerd.sock: connect: no such file or directory' and 'Warning ContainerGCFailed' on node worker-01. Node generic evidence: worker-01 NotReady, CONTAINER-RUNTIM

### case-4

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2667 · steps 16 · tokens 110,448
- **摘要**：Partial unreachability is scoped exactly to the pods scheduled on worker-02. frontend caller logs show 'rpc error: code = Unavailable desc = no healthy upstream' for productcatalogservice (107x), currencyservice (80x) and checkoutservice (32x). Pod listing: adservice/cartservice/emailservice/frontend/redis-cart on worker-01 are 2/2 Running, while all 6 pods on worker-02 (checkoutservice, currencyservice, paymentservice, productcatalogservice, recommendationservice, shippingservice) are stuck 0/2 Init:0/1 with no PodIP. Pod and namespace events name the mechanism verbatim: 'Warning FailedCreate

### case-5

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 100,063
- **摘要**：Partial unreachability is node-scoped, not service-scoped. Connectivity probe: adservice:9555 -> 'Connection Failed' while productcatalogservice:3550 (172.20.2.80, worker-02) -> open/'Connection Succeeded'. Pods listing: all 5 pods on worker-01 (frontend, adservice, paymentservice, shippingservice, redis-cart) are stuck '0/2 Init:0/1' with no pod IP, while all 6 pods on worker-02 are '2/2 Running'. Mechanism event, verbatim in both pod describe and namespace events (Warning FailedCreatePodSandBox): 'Failed to create pod sandbox: rpc error: code = Unavailable desc = ... dial unix /run/container

### case-6

- **结论**：`node/worker-02` + `containerd_unavailable` ｜ 标签 `node/worker-02` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 76,649
- **摘要**：All 6 boutique pods scheduled on worker-02 are stuck at 0/2 Init:0/1 (checkoutservice, currencyservice, emailservice, productcatalogservice, recommendationservice, shippingservice) while every pod on worker-01 runs 2/2 Running — the fault is strictly node-partitioned. Pod events and pod describe show 'FailedCreatePodSandBox: rpc error: code = Unavailable ... dial unix /run/containerd/containerd.sock: connect: no such file or directory'. CheckNodeServiceStatus(worker-02) confirms containerd.service is 'Active: inactive (dead)' since 12:54:54 (main PID exited), while kubelet and kube-proxy on th

### case-7

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 77,500
- **摘要**：Pods on worker-01 (adservice, currencyservice, productcatalogservice, recommendationservice, redis-cart) are all stuck at 0/2 Init:0/1 while every pod on worker-02 is 2/2 Running — a node-scoped outlier. The pod event surface shows the mechanism verbatim on worker-01 pods: 'Warning FailedCreatePodSandBox: Failed to create pod sandbox: rpc error: code = Unavailable desc = "... dial unix /run/containerd/containerd.sock: connect: no such file or directory"' (PodScheduled=True, so scheduling succeeded). CheckNodeServiceStatus(worker-01, containerd) returns 'Active: inactive (dead) since Fri 2026-0

