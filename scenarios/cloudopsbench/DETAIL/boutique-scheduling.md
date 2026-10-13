# 评测明细 · boutique/scheduling — cloudopsbench

> 本家族已跑 **5/164** 题：JRA ✅5 ❌0 ｜ 证据链全闭 5 ｜ token 中位 115,405 ｜ 生成 2026-10-13T04:31:23.874Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 115,405 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.12 | 26 | 203,615 | 0 | 0 | 1012_1846_inorder4-v3b4 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 84,424 | 0 | 0 | 1012_1856_inorder4-v3b5 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 22 | 153,471 | 0 | 0 | 1012_1928_inorder4-v3b6 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 103,798 | 0 | 0 | 1013_1134_inorder4-v3b10 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/cartservice` + `node_cordon_mismatch` ｜ 标签 `app/cartservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 115,405
- **摘要**：Anchor: cartservice-79b49f5555-rl2kp is the only outlier pod in boutique (0/1 Pending, NODE <none>); all other 10 services are 1/1 Running, and Deployment cartservice shows 0/1 AVAILABLE. Pod describe: PodScheduled=False with event 'Warning FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable. preemption: ... not helpful', while the pod spec has Node-Selectors: <none> and no affinity - so the pod itself imposes no placement constraint. Node layer: all four nodes (master, worker-01, worker-02, worker-03) report Ready,SchedulingDisabled with Taints node.kubernetes.io/unschedul

### case-2

- **结论**：`app/checkoutservice` + `node_cordon_mismatch` ｜ 标签 `app/checkoutservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.12 · steps 26 · tokens 203,615
- **摘要**：Caller side (frontend logs) shows 'rpc error: code = Unavailable ... lookup checkoutservice ... no such host' failing checkout requests, and the checkoutservice Service has only 1 ready endpoint (172.20.2.81:5050) while its Deployment is 1/5 READY (UP-TO-DATE 5). Object layer: 4 checkoutservice pods are Pending (0/1) while all other 10 boutique services are 1/1 Running with 0 restarts. Mechanism event: pod checkoutservice-8445f8b6cb-9tn5x reports PodScheduled=False, Warning FailedScheduling '0/4 nodes are available: 4 node(s) were unschedulable'. Configuration close: GetResources(nodes)/GetClu

### case-3

- **结论**：`app/emailservice` + `node_cordon_mismatch` ｜ 标签 `app/emailservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 84,424
- **摘要**：boutique 命名空间首轮 pods 扫描显示唯一离群对象 emailservice：3 副本中 2 个 Pending（0/1，无节点），Deployment 显示 1/3 READY、AVAILABLE 1，其余 10 个服务均 1/1 Running，即服务部分不可达（emailservice:5000 连通性实测仍 open，仅 1/3 后端可用）。describe 离群 Pod 得到机制事件：'FailedScheduling ... 0/4 nodes are available: 4 node(s) were unschedulable'，Pod 无 nodeSelector/affinity。节点面收口：GetClusterConfiguration 与 DescribeResource node worker-01 显示 4/4 节点均 Taints: node.kubernetes.io/unschedulable:NoSchedule 且 Unschedulable: true，kubelet 事件 'NodeNotSchedulable (x9 over 11h)'，节点资源充裕（cpu 8、mem 15G、已分配约 12%），排除容量类原因。工作负载面收口：emailservice 模板无 nodeSelector/affinity，toleratio

### case-4

- **结论**：`app/frontend` + `node_cordon_mismatch` ｜ 标签 `app/frontend` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 22 · tokens 153,471
- **摘要**：frontend Deployment scaled 3->5 (ScalingReplicaSet events) with only 1/5 available; 4 frontend pods Pending with 'FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable'. All four nodes are Ready but cordoned (STATUS Ready,SchedulingDisabled; taints node.kubernetes.io/unschedulable:NoSchedule; node Unschedulable: true; node events NodeNotSchedulable), while nodes are Ready/healthy (KubeletReady, no Memory/Disk/PID pressure) with ample allocatable CPU (8) / memory (~15Gi) and only 12-14% requested - so not capacity. Pod template has Node-Selectors <none>, no affinity, toleratio

### case-5

- **结论**：`app/paymentservice` + `node_cordon_mismatch` ｜ 标签 `app/paymentservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 103,798
- **摘要**：paymentservice is the only outlier: Deployment 1/5 READY with 4 pods (paymentservice-78c5996648-lgxtf/rjkp5/t7ckh/t82nf) stuck 0/1 Pending, and endpoints/paymentservice exposes only one address (172.20.3.57:50051) -> partial service unreachability. Its Pending pods report the mechanism event 'FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable', which names cordon rather than capacity/affinity/taint: GetResources(nodes -o wide) shows all four nodes 'Ready,SchedulingDisabled', and DescribeResource(node/worker-01) shows 'Unschedulable: true' with taint node.kubernetes.io/unsc

