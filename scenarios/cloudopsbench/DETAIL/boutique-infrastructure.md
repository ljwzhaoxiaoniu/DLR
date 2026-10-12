# 评测明细 · boutique/infrastructure — cloudopsbench

> 本家族已跑 **1/40** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-12T07:00:35.081Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 0 | 0 | 1012_1458_l3-verify3 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15
- **摘要**：All 5 unavailable services (adservice, cartservice, emailservice, productcatalogservice, shippingservice) have <none> endpoints; their pods are all stuck at Init:0/1/Pending on node worker-01 while every pod on worker-02 is 2/2 Running. Pod describe on productcatalogservice-6fb89f98f8-ptjsz shows PodScheduled=True but event 'FailedCreatePodSandBox ... dial unix /run/containerd/containerd.sock: connect: no such file or directory'. GetClusterConfiguration shows worker-01 NotReady (not-ready taints) while other nodes are Ready. CheckNodeServiceStatus(worker-01, containerd) = 'Active: inactive (de

