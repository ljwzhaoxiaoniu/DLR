# 评测明细 · boutique/scheduling — cloudopsbench

> 本家族已跑 **28/164** 题：JRA ✅28 ❌0 ｜ 证据链全闭 28 ｜ token 中位 113,543 ｜ 生成 2026-10-14T11:00:09.483Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 115,405 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.12 | 26 | 203,615 | 0 | 0 | 1012_1846_inorder4-v3b4 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 84,424 | 0 | 0 | 1012_1856_inorder4-v3b5 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 22 | 153,471 | 0 | 0 | 1012_1928_inorder4-v3b6 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 103,798 | 0 | 0 | 1013_1134_inorder4-v3b10 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 82,842 | 0 | 0 | 1013_1350_order-verify1 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 131,524 | 0 | 0 | 1013_1524_inorder4-v3b18 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 130,578 | 0 | 0 | 1013_1541_inorder4-v3b20 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 130,741 | 0 | 0 | 1013_1628_inorder4-v3b22 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 186,153 | 0 | 0 | 1013_1656_inorder4-v3b25 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 132,905 | 0 | 0 | 1013_1810_inorder4-v3b27 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.129 | 32 | 325,732 | 0 | 0 | 1013_1834_inorder4-v3b30 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 175,486 | 0 | 0 | 1014_1855_inorder4-v3b147 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 113,543 | 0 | 0 | 1014_1858_inorder4-v3b148 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 107,955 | 0 | 0 | 1014_1312_inorder4-v3b135 | 全对·链闭 |
| [50](#case-50) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 140,439 | 0 | 0 | 1014_1314_inorder4-v3b136 | 全对·链闭 |
| [51](#case-51) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1905 | 22 | 134,958 | 0 | 0 | 1014_1318_inorder4-v3b137 | 全对·链闭 |
| [52](#case-52) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 149,540 | 0 | 0 | 1014_1321_inorder4-v3b138 | 全对·链闭 |
| [53](#case-53) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 106,786 | 0 | 0 | 1014_1841_inorder4-v3b139 | 全对·链闭 |
| [54](#case-54) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 112,632 | 0 | 0 | 1014_1843_inorder4-v3b140 | 全对·链闭 |
| [55](#case-55) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 103,433 | 0 | 0 | 1014_1844_inorder4-v3b141 | 全对·链闭 |
| [56](#case-56) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 104,861 | 0 | 0 | 1014_1846_inorder4-v3b142 | 全对·链闭 |
| [57](#case-57) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 11 | 83,930 | 0 | 0 | 1014_1848_inorder4-v3b143 | 全对·链闭 |
| [58](#case-58) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 70,189 | 0 | 0 | 1014_1850_inorder4-v3b144 | 全对·链闭 |
| [59](#case-59) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 88,692 | 0 | 0 | 1014_1851_inorder4-v3b145 | 全对·链闭 |
| [60](#case-60) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 83,004 | 0 | 0 | 1014_1853_inorder4-v3b146 | 全对·链闭 |
| [61](#case-61) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 103,236 | 0 | 0 | 1014_1855_inorder4-v3b147 | 全对·链闭 |
| [62](#case-62) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 92,274 | 0 | 0 | 1014_1858_inorder4-v3b148 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/cartservice` + `node_cordon_mismatch` ｜ 标签 `app/cartservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 115,405
- **raw 日志**：[results/1012_1415_inorder4-v3/raw/1012_1416_boutique-scheduling-1](../results/1012_1415_inorder4-v3/raw/1012_1416_boutique-scheduling-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Anchor: cartservice-79b49f5555-rl2kp is the only outlier pod in boutique (0/1 Pending, NODE <none>); all other 10 services are 1/1 Running, and Deployment cartservice shows 0/1 AVAILABLE. Pod describe: PodScheduled=False with event 'Warning FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable. preemption: ... not helpful', while the pod spec has Node-Selectors: <none> and no affinity - so the pod itself imposes no placement constraint. Node layer: all four nodes (master, worker-01, worker-02, worker-03) report Ready,SchedulingDisabled with Taints node.kubernetes.io/unschedul

### case-2

- **结论**：`app/checkoutservice` + `node_cordon_mismatch` ｜ 标签 `app/checkoutservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.12 · steps 26 · tokens 203,615
- **raw 日志**：[results/1012_1846_inorder4-v3b4/raw/1012_1847_boutique-scheduling-2](../results/1012_1846_inorder4-v3b4/raw/1012_1847_boutique-scheduling-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller side (frontend logs) shows 'rpc error: code = Unavailable ... lookup checkoutservice ... no such host' failing checkout requests, and the checkoutservice Service has only 1 ready endpoint (172.20.2.81:5050) while its Deployment is 1/5 READY (UP-TO-DATE 5). Object layer: 4 checkoutservice pods are Pending (0/1) while all other 10 boutique services are 1/1 Running with 0 restarts. Mechanism event: pod checkoutservice-8445f8b6cb-9tn5x reports PodScheduled=False, Warning FailedScheduling '0/4 nodes are available: 4 node(s) were unschedulable'. Configuration close: GetResources(nodes)/GetClu

### case-3

- **结论**：`app/emailservice` + `node_cordon_mismatch` ｜ 标签 `app/emailservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 84,424
- **raw 日志**：[results/1012_1856_inorder4-v3b5/raw/1012_1857_boutique-scheduling-3](../results/1012_1856_inorder4-v3b5/raw/1012_1857_boutique-scheduling-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 命名空间首轮 pods 扫描显示唯一离群对象 emailservice：3 副本中 2 个 Pending（0/1，无节点），Deployment 显示 1/3 READY、AVAILABLE 1，其余 10 个服务均 1/1 Running，即服务部分不可达（emailservice:5000 连通性实测仍 open，仅 1/3 后端可用）。describe 离群 Pod 得到机制事件：'FailedScheduling ... 0/4 nodes are available: 4 node(s) were unschedulable'，Pod 无 nodeSelector/affinity。节点面收口：GetClusterConfiguration 与 DescribeResource node worker-01 显示 4/4 节点均 Taints: node.kubernetes.io/unschedulable:NoSchedule 且 Unschedulable: true，kubelet 事件 'NodeNotSchedulable (x9 over 11h)'，节点资源充裕（cpu 8、mem 15G、已分配约 12%），排除容量类原因。工作负载面收口：emailservice 模板无 nodeSelector/affinity，toleratio

### case-4

- **结论**：`app/frontend` + `node_cordon_mismatch` ｜ 标签 `app/frontend` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 22 · tokens 153,471
- **raw 日志**：[results/1012_1928_inorder4-v3b6/raw/1012_1928_boutique-scheduling-4](../results/1012_1928_inorder4-v3b6/raw/1012_1928_boutique-scheduling-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend Deployment scaled 3->5 (ScalingReplicaSet events) with only 1/5 available; 4 frontend pods Pending with 'FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable'. All four nodes are Ready but cordoned (STATUS Ready,SchedulingDisabled; taints node.kubernetes.io/unschedulable:NoSchedule; node Unschedulable: true; node events NodeNotSchedulable), while nodes are Ready/healthy (KubeletReady, no Memory/Disk/PID pressure) with ample allocatable CPU (8) / memory (~15Gi) and only 12-14% requested - so not capacity. Pod template has Node-Selectors <none>, no affinity, toleratio

### case-5

- **结论**：`app/paymentservice` + `node_cordon_mismatch` ｜ 标签 `app/paymentservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 103,798
- **raw 日志**：[results/1013_1134_inorder4-v3b10/raw/1013_1136_boutique-scheduling-5](../results/1013_1134_inorder4-v3b10/raw/1013_1136_boutique-scheduling-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：paymentservice is the only outlier: Deployment 1/5 READY with 4 pods (paymentservice-78c5996648-lgxtf/rjkp5/t7ckh/t82nf) stuck 0/1 Pending, and endpoints/paymentservice exposes only one address (172.20.3.57:50051) -> partial service unreachability. Its Pending pods report the mechanism event 'FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable', which names cordon rather than capacity/affinity/taint: GetResources(nodes -o wide) shows all four nodes 'Ready,SchedulingDisabled', and DescribeResource(node/worker-01) shows 'Unschedulable: true' with taint node.kubernetes.io/unsc

### case-6

- **结论**：`app/productcatalogservice` + `node_cordon_mismatch` ｜ 标签 `app/productcatalogservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 82,842
- **raw 日志**：[results/1013_1350_order-verify1/raw/1013_1350_boutique-scheduling-6](../results/1013_1350_order-verify1/raw/1013_1350_boutique-scheduling-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller-side symptom enters from frontend: 180/182 error logs are 'could not retrieve products/product: rpc error code=Unavailable ... dial tcp 10.68.235.126:3550: connect: connection refused', and CheckServiceConnectivity(productcatalogservice:3550) returns Connection Failed. The only outlier in the workload scan is productcatalogservice: deployment 0/3 AVAILABLE, all three pods (ddb46fc86-2fqgv/69krc/xm7ln) 0/1 Pending with no node assigned, while all other 10 services are 1/1 Running. The pod's own reason is 'FailedScheduling ... 0/4 nodes are available: 4 node(s) were unschedulable' - the s

### case-7

- **结论**：`app/redis-cart` + `node_cordon_mismatch` ｜ 标签 `app/redis-cart` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 131,524
- **raw 日志**：[results/1013_1524_inorder4-v3b18/raw/1013_1526_boutique-scheduling-7](../results/1013_1524_inorder4-v3b18/raw/1013_1526_boutique-scheduling-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom names no service, so the inventory listing was the entry: every service is 1/1 Running except redis-cart (deployment 1/5, four pods Pending with no Node assigned). The affected pod's own reason is the mechanism event: DescribeResource(pod=redis-cart-68db7b6f97-5nwwk, and identically -hlbw9) shows Conditions PodScheduled=False with 'Warning FailedScheduling ... 0/4 nodes are available: 4 node(s) were unschedulable. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.' The node surface confirms the blocker: GetResources(nodes) shows master, worker-01, worker-0

### case-8

- **结论**：`app/shippingservice` + `node_cordon_mismatch` ｜ 标签 `app/shippingservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 130,578
- **raw 日志**：[results/1013_1541_inorder4-v3b20/raw/1013_1541_boutique-scheduling-8](../results/1013_1541_inorder4-v3b20/raw/1013_1541_boutique-scheduling-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods(-o wide) 清单唯一离群行为 shippingservice：3 个副本 Pending/无节点（deployment 2/5 available），其余 10 个服务均 1/1 Running；Pending pod 的 DescribeResource 给出机制事件 'Warning FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable'；节点侧 GetResources(nodes)=四个节点全部 Ready,SchedulingDisabled，GetClusterConfiguration 显示每个节点带 taint node.kubernetes.io/unschedulable:NoSchedule，worker-01 DescribeResource 确认 Unschedulable: true 且事件 NodeNotSchedulable 90s(x3 over 4m54s)（封禁晚于在跑 Pod 的调度时刻）；GetAppYAML(shippingservice) 显示 pod 模板无 nodeSelector/affinity，tolerations 仅默认 not-ready/unreachable，无法容忍 unschedulable 污点，排除亲和/

### case-9

- **结论**：`app/cartservice` + `node_cordon_mismatch` ｜ 标签 `app/cartservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 130,741
- **raw 日志**：[results/1013_1628_inorder4-v3b22/raw/1013_1628_boutique-scheduling-9](../results/1013_1628_inorder4-v3b22/raw/1013_1628_boutique-scheduling-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace inventory scan isolated a single outlier: cartservice-5955678f49-ct98j is Pending 0/1 with no node assigned, while all 10 other boutique pods are 1/1 Running; Deployment cartservice is 0/1 UP-TO-DATE 1 AVAILABLE 0. Victim-side signal: Service cartservice has NO endpoints, active probe of cartservice:7070 returned 'Connection Failed', and caller logs (frontend) show 170x 'could not retrieve cart' and 117x 'failed to add to cart' with 'dial tcp 10.68.243.208:7070: connect: connection refused' - a partial unreachability confined to cartservice. Mechanism event: Warning FailedScheduling 

### case-10

- **结论**：`app/checkoutservice` + `node_cordon_mismatch` ｜ 标签 `app/checkoutservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 186,153
- **raw 日志**：[results/1013_1656_inorder4-v3b25/raw/1013_1656_boutique-scheduling-10](../results/1013_1656_inorder4-v3b25/raw/1013_1656_boutique-scheduling-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing (only legitimate full scan, wide form) shows a single outlier: checkoutservice-6b448f7956-xbc46 0/1 Pending with Node=<none>. DescribeResource(pod) gives the pod's own reason: Node-Selectors: hardware-type=gpu and 'Warning FailedScheduling ... 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable'. Node side: GetClusterConfiguration / nodes listing show worker-01 is the ONLY node carrying label hardware-type=gpu, and it is Ready,SchedulingDisabled with taint node.kubernetes.io/unschedulable:NoSchedule (Unschedulable: true); mast

### case-11

- **结论**：`app/currencyservice` + `node_cordon_mismatch` ｜ 标签 `app/currencyservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 132,905
- **raw 日志**：[results/1013_1810_inorder4-v3b27/raw/1013_1811_boutique-scheduling-11](../results/1013_1810_inorder4-v3b27/raw/1013_1811_boutique-scheduling-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend caller errors 'could not retrieve currencies: rpc error ... dial tcp 10.68.108.3:7000: connect: connection refused' (153/165 errors) and CheckServiceConnectivity(currencyservice:7000) = Connection Failed; upstream env CURRENCY_SERVICE_ADDR=currencyservice:7000. Object layer: the only outlier pod is currencyservice-6f654d5956-ff8rt 0/1 Pending (all 10 other boutique pods 1/1 Running) and deployment currencyservice is 0/1 available. Mechanism event on the pod: Warning FailedScheduling '0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) 

### case-12

- **结论**：`app/emailservice` + `node_cordon_mismatch` ｜ 标签 `app/emailservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.129 · steps 32 · tokens 325,732
- **raw 日志**：[results/1013_1834_inorder4-v3b30/raw/1013_1834_boutique-scheduling-12](../results/1013_1834_inorder4-v3b30/raw/1013_1834_boutique-scheduling-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side first: connectivity probe to emailservice:5000 -> 'Connection Failed'. Object-layer outlier in boutique: pod emailservice-66975b79b8-8k46l is 0/1 Pending (Node: <none>, PodScheduled=False) while all other 10 services are 1/1 Running with 0 restarts; owner chain agrees (deployment emailservice 0/1 AVAILABLE, RS revision 1 with 1 Waiting pod). Mechanism event on the pod: 'FailedScheduling ... 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable.' The pod template requires nodeSelector hardware-type=gpu, and the ONLY node carrying

### case-13

- **结论**：`app/frontend` + `node_cordon_mismatch` ｜ 标签 `app/frontend` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 175,486
- **raw 日志**：[results/1014_1855_inorder4-v3b147/raw/1014_1855_boutique-scheduling-13](../results/1014_1855_inorder4-v3b147/raw/1014_1855_boutique-scheduling-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend Services (frontend, frontend-external) have <none> endpoints; only outlier in the pods inventory is frontend-6d8845c9d6-9l86h (0/1 Pending, NODE <none>), owner chain frontend Deployment 0/1 READY with a single ReplicaSet (creation succeeded, never scheduled). Pod sheet: Node-Selectors: hardware-type=gpu; condition PodScheduled=False; Event Warning FailedScheduling '0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable'. Node layer: only worker-02 carries label hardware-type=gpu (the sole node satisfying frontend's pin)

### case-14

- **结论**：`app/paymentservice` + `node_cordon_mismatch` ｜ 标签 `app/paymentservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 113,543
- **raw 日志**：[results/1014_1858_inorder4-v3b148/raw/1014_1858_boutique-scheduling-14](../results/1014_1858_inorder4-v3b148/raw/1014_1858_boutique-scheduling-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique's only unhealthy workload is paymentservice-649775dc6-r5gvj (0/1 Pending, no node, no IP); CheckServiceConnectivity(paymentservice:50051) returns Connection Failed. DescribeResource on the pod shows the mechanism verbatim: 'FailedScheduling ... 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable', with Node-Selectors: hardware-type=gpu. GetClusterConfiguration shows worker-01 is the ONLY node carrying hardware-type=gpu, and worker-01 is cordoned (Unschedulable: true, taint node.kubernetes.io/unschedulable:NoSchedule), as

### case-49

- **结论**：`app/productcatalogservice` + `memory_capacity_mismatch` ｜ 标签 `app/productcatalogservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 107,955
- **raw 日志**：[results/1014_1312_inorder4-v3b135/raw/1014_1313_boutique-scheduling-49](../results/1014_1312_inorder4-v3b135/raw/1014_1313_boutique-scheduling-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain, uncontested: the target's own signal is unreachable — endpoints/productcatalogservice has ENDPOINTS <none> and a connectivity probe on its declared port 3550 returns 'Connection Failed'. Its workload is the sole outlier: pod productcatalogservice-d84897895-bvcdj is 0/1 Pending and deployment productcatalogservice is 0/1 AVAILABLE (all other pods 1/1 Running, 0 restarts). The pod's own sheet carries the mechanism line: 'Node: <none>', PodScheduled False, Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory.' The 1 unschedulab

### case-50

- **结论**：`app/recommendationservice` + `memory_capacity_mismatch` ｜ 标签 `app/recommendationservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 140,439
- **raw 日志**：[results/1014_1314_inorder4-v3b136/raw/1014_1316_boutique-scheduling-50](../results/1014_1314_inorder4-v3b136/raw/1014_1316_boutique-scheduling-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique has one scheduling outlier: recommendationservice-79579f557f-vjbwq is 0/1 Pending with PodScheduled=False and Node=<none>, while all other 14 pods are 1/1 Running. Its own FailedScheduling reason reads '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory'. Victim-side signal confirms the outage: GetResources(endpoints) shows 'recommendationservice <none>' (all other services bound) and CheckServiceConnectivity(recommendationservice:8080) returns Connection Failed. Node layer explains it: each node has allocatable memory ~15.3Gi, but a DaemonSet 'memory-consume

### case-51

- **结论**：`app/redis-cart` + `memory_capacity_mismatch` ｜ 标签 `app/redis-cart` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1905 · steps 22 · tokens 134,958
- **raw 日志**：[results/1014_1318_inorder4-v3b137/raw/1014_1319_boutique-scheduling-51](../results/1014_1318_inorder4-v3b137/raw/1014_1319_boutique-scheduling-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing outlier: redis-cart-56496f856-rzsz7 is Pending (0/1) while every other boutique pod is Running; redis-cart Service endpoints = <none> and deployment redis-cart = 0/1 AVAILABLE, matching the Service Availability Disruption symptom. The Pending pod's own scheduling reason is decisive: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: ... 3 No preemption victims found'. Node side: master is Ready,SchedulingDisabled (the 1 unschedulable node) while worker-01/02/03 are Ready, untainted, MemoryPressure=False with ~15.3Gi alloc

### case-52

- **结论**：`app/shippingservice` + `memory_capacity_mismatch` ｜ 标签 `app/shippingservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 21 · tokens 149,540
- **raw 日志**：[results/1014_1321_inorder4-v3b138/raw/1014_1322_boutique-scheduling-52](../results/1014_1321_inorder4-v3b138/raw/1014_1322_boutique-scheduling-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only shippingservice is unreachable: GetResources(endpoints) shows 'shippingservice <none>' (all other 11 Services have endpoints) and CheckServiceConnectivity(shippingservice:50051) returned 'Connection Failed'. Source: pod shippingservice-5d5dbb88bf-vmczd is 0/1 Pending, and its own sheet carries the mechanism event verbatim: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory.' Deployment listing shows shippingservice 0/1 available (the only non-ready workload), while the pod object already exists (so this is a scheduling break, not admissi

### case-53

- **结论**：`app/redis-cart` + `pvc_capacity_mismatch` ｜ 标签 `app/redis-cart` + `pvc_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 106,786
- **raw 日志**：[results/1014_1841_inorder4-v3b139/raw/1014_1842_boutique-scheduling-53](../results/1014_1841_inorder4-v3b139/raw/1014_1842_boutique-scheduling-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory scan isolated the single outlier pod redis-cart-68db7b6f97-f2skx (0/1 Pending, Node <none>) while all other boutique services ran 1/1. Its own record shows PodScheduled=False with event 'FailedScheduling: 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims', and the PVC event 'FailedBinding: no persistent volumes available for this claim and no storage class is set' names redis-cart-pvc exactly. Config cross-check shows the only mismatched dimension is capacity: PVC requests storage 3Gi while the sole candidate PV redis-cart-pv offers 1Gi (PV is Available/unclai

### case-54

- **结论**：`app/redis-cart` + `pvc_capacity_mismatch` ｜ 标签 `app/redis-cart` + `pvc_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 112,632
- **raw 日志**：[results/1014_1843_inorder4-v3b140/raw/1014_1844_boutique-scheduling-54](../results/1014_1843_inorder4-v3b140/raw/1014_1844_boutique-scheduling-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart is the only unreachable service: its Service endpoint list is empty ('redis-cart <none>') and active connectivity probes to redis-cart:6379 fail from worker-01/02/03, while all 10 other boutique services are 1/1 Running with populated endpoints. Its pod redis-cart-68db7b6f97-krnq9 is stuck Pending with Node=<none> and PodScheduled=False; the scheduler event reads '0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims', and the PVC event reads 'no persistent volumes available for this claim and no storage class is set'. All four nodes are Ready/untouched (no taint

### case-55

- **结论**：`app/redis-cart` + `pvc_capacity_mismatch` ｜ 标签 `app/redis-cart` + `pvc_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 103,433
- **raw 日志**：[results/1014_1844_inorder4-v3b141/raw/1014_1845_boutique-scheduling-55](../results/1014_1844_inorder4-v3b141/raw/1014_1845_boutique-scheduling-55/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the boutique inventory is redis-cart-68db7b6f97-7vdqn (0/1 Pending); connectivity probe to redis-cart:6379 failed from worker-01/02/03, matching the 'partial service unreachability' complaint (redis-cart backs cartservice). Pod sheet shows Node:<none>, PodScheduled=False with event 'FailedScheduling: 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims'. The PVC redis-cart-pvc is stuck Pending with 'FailedBinding: no persistent volumes available for this claim and no storage class is set', while the referenced PV redis-cart-pv exists and is Available (1Gi, 

### case-56

- **结论**：`app/adservice` + `node_affinity_mismatch` ｜ 标签 `app/adservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 104,861
- **raw 日志**：[results/1014_1846_inorder4-v3b142/raw/1014_1847_boutique-scheduling-56](../results/1014_1846_inorder4-v3b142/raw/1014_1847_boutique-scheduling-56/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice's only pod (adservice-5db445fc48-txrtd) is stuck Pending with PodScheduled=False; DescribeResource shows 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' GetAppYAML(adservice) shows a required nodeAffinity requiring label env In [prod, staging], but GetClusterConfiguration/nodes listing show all three workers carry env=dev and only master (no env label) is Ready,SchedulingDisabled, so no node can satisfy the constraint. Endpoints(adservice)=<none> and Deployment adservice 0/1 AVAILABLE, and frontend

### case-57

- **结论**：`app/cartservice` + `node_affinity_mismatch` ｜ 标签 `app/cartservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 11 · tokens 83,930
- **raw 日志**：[results/1014_1848_inorder4-v3b143/raw/1014_1849_boutique-scheduling-57](../results/1014_1848_inorder4-v3b143/raw/1014_1849_boutique-scheduling-57/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial (single-service) unreachability localized to cartservice: pods listing shows the only outlier cartservice-6dc446b96c-bpxgc 0/1 Pending (all other 10 services 1/1 Running) and deployments shows cartservice 0/1 AVAILABLE; CheckServiceConnectivity on its declared port 7070 returns 'Connection Failed'. The pod's own sheet carries the mechanism verbatim: Status Pending, Node <none>, PodScheduled False, Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector; preemption: 4 Preemption is not helpful for scheduling'. 

### case-58

- **结论**：`app/currencyservice` + `node_affinity_mismatch` ｜ 标签 `app/currencyservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 70,189
- **raw 日志**：[results/1014_1850_inorder4-v3b144/raw/1014_1851_boutique-scheduling-58](../results/1014_1850_inorder4-v3b144/raw/1014_1851_boutique-scheduling-58/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory shows a single outlier: currencyservice-6999d4d666-c4bs8 is 0/1 Pending with Node <none>, while all other 10 boutique pods are 1/1 Running. Its own sheet carries the mechanism verbatim: PodScheduled=False, event 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'; the pod's Node-Selectors are <none>, so the blocking predicate is affinity. GetClusterConfiguration shows all 4 nodes Ready and unpressured, with worker-01/02/03 carrying label env=dev (no taints) and only master cordoned (node.kubern

### case-59

- **结论**：`app/emailservice` + `node_affinity_mismatch` ｜ 标签 `app/emailservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 88,692
- **raw 日志**：[results/1014_1851_inorder4-v3b145/raw/1014_1852_boutique-scheduling-59](../results/1014_1851_inorder4-v3b145/raw/1014_1852_boutique-scheduling-59/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.': the emailservice Service has no backends. Entry via inventory scan: only outlier is pod emailservice-df95f74cd-srzrm = 0/1 Pending, NODE <none>, and deployment emailservice = 0/1 AVAILABLE. Victim's own signal: GetResources(endpoints, emailservice) shows ENDPOINTS <none>, and CheckServiceConnectivity(emailservice:5000) = Connection Failed (declared Service port 5000 -> targetPort 8080). Pod sheet carries the mechanism event verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity

### case-60

- **结论**：`app/frontend` + `node_affinity_mismatch` ｜ 标签 `app/frontend` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 83,004
- **raw 日志**：[results/1014_1853_inorder4-v3b146/raw/1014_1854_boutique-scheduling-60](../results/1014_1853_inorder4-v3b146/raw/1014_1854_boutique-scheduling-60/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend pod frontend-6499cbd48d-5859c is Pending with FailedScheduling: '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'; all other 10 boutique services are 1/1 Running. Node labels: worker-01/02/03 carry env=dev (Ready, untainted) and master is unschedulable-tainted; no node carries env=prod or env=staging. GetAppYAML(frontend) declares a hard requiredDuringSchedulingIgnoredDuringExecution nodeAffinity requiring env In [prod, staging] with no nodeSelector, so no node can ever satisfy it. Victim-side signal confirms impact: endpoints

### case-61

- **结论**：`app/productcatalogservice` + `node_affinity_mismatch` ｜ 标签 `app/productcatalogservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 103,236
- **raw 日志**：[results/1014_1855_inorder4-v3b147/raw/1014_1857_boutique-scheduling-61](../results/1014_1855_inorder4-v3b147/raw/1014_1857_boutique-scheduling-61/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Availability Disruption.' with no service named -> pods inventory (wide) surfaced the single outlier: productcatalogservice-799cc5ccb4-fnxqw 0/1 Pending with no node assigned, while the other 10 boutique services are 1/1 Running. The pod's own FailedScheduling reason reads '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'; Node-Selectors on the pod is <none>, so the constraint comes from the workload spec. GetAppYAML(productcatalogservice) shows a requiredDuringScheduling nodeAffinity requiring label env In [prod, stag

### case-62

- **结论**：`app/recommendationservice` + `node_affinity_mismatch` ｜ 标签 `app/recommendationservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 92,274
- **raw 日志**：[results/1014_1858_inorder4-v3b148/raw/1014_1859_boutique-scheduling-62](../results/1014_1858_inorder4-v3b148/raw/1014_1859_boutique-scheduling-62/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice is the only outlier: its pod (recommendationservice-f498857d6-rv5bj) is Pending with Node <none> and its Deployment is 0/1 AVAILABLE, while all 10 other boutique services are 1/1 Running. Victim signal precedes the workload/config reads: the recommendationservice endpoints listing shows '<none>' (all other services have endpoints) and the entry caller frontend logs 'failed to get product recommendations' with 'rpc error: code = Unavailable ... dial tcp 10.68.145.254:8080: connect: connection refused' (73 occurrences, 9.4% of errors) against the service's own declared Clus

