# 评测明细 · boutique/scheduling — cloudopsbench

> 本家族已跑 **1/164** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-12T07:00:35.081Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/cartservice` + `node_cordon_mismatch` ｜ 标签 `app/cartservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18
- **摘要**：Anchor: cartservice-79b49f5555-rl2kp is the only outlier pod in boutique (0/1 Pending, NODE <none>); all other 10 services are 1/1 Running, and Deployment cartservice shows 0/1 AVAILABLE. Pod describe: PodScheduled=False with event 'Warning FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable. preemption: ... not helpful', while the pod spec has Node-Selectors: <none> and no affinity - so the pod itself imposes no placement constraint. Node layer: all four nodes (master, worker-01, worker-02, worker-03) report Ready,SchedulingDisabled with Taints node.kubernetes.io/unschedul

