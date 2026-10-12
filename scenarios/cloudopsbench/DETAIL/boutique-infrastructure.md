# 评测明细 · boutique/infrastructure — cloudopsbench

> 本家族已跑 **1/40** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-12T06:50:17.188Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.3333 | 10 | 0 | 0 | 1012_1447_inorder4-v3b2 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.3333 · steps 10
- **摘要**：All pods scheduled on worker-01 (adservice, cartservice, emailservice, productcatalogservice, shippingservice) are stuck at Init:0/1 with no pod IP, while every pod on worker-02 is 2/2 Running - a node-scoped break. Pod events on adservice-d68dfc56-lbl9p show 'FailedCreatePodSandBox ... Failed to create pod sandbox: rpc error: code = Unavailable ... dial unix /run/containerd/containerd.sock: connect: no such file or directory', with PodReadyToStartContainers=False / Initialized=False. Node service check confirms containerd@worker-01 is 'Active: inactive (dead) since Fri 2026-01-02 12:32:29' wi

