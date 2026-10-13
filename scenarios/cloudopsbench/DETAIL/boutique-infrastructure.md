# 评测明细 · boutique/infrastructure — cloudopsbench

> 本家族已跑 **9/40** 题：JRA ✅9 ❌0 ｜ 证据链全闭 9 ｜ token 中位 93,919 ｜ 生成 2026-10-13T09:25:34.981Z
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

