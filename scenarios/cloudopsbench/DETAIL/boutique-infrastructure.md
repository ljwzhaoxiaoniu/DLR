# 评测明细 · boutique/infrastructure — cloudopsbench

> 本家族已跑 **1/40** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-11T13:49:40.827Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 0 | 0 | 1011_2147_inorder4 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`node/worker-01` + `containerd_unavailable` ｜ 标签 `node/worker-01` + `containerd_unavailable`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12
- **摘要**：All pods scheduled on node worker-01 are stuck at Init:0/1 with no pod IP (adservice, cartservice, emailservice, productcatalogservice, shippingservice), while every pod on worker-02 is 2/2 Running with an IP. The pod events show the breakpoint: 'Warning FailedCreatePodSandBox ... Failed to create pod sandbox: rpc error: code = Unavailable desc = ... dial unix /run/containerd/containerd.sock: connect: no such file or directory'. Node/service checks discriminate the cause: GetClusterConfiguration shows worker-01 status NotReady (taints node.kubernetes.io/not-ready:NoSchedule/NoExecute) while ma

