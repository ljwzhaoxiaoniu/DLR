# 评测明细 · boutique/codedefect — cloudopsbench

> 本家族已跑 **2/98** 题：JRA ✅2 ❌0 ｜ 证据链全闭 2 ｜ token 中位 129,107 ｜ 生成 2026-10-12T10:54:47.441Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 129,107 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 126,973 | 0 | 0 | 1012_1846_inorder4-v3b4 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 129,107
- **摘要**：Pods scan in namespace boutique shows the only outlier is checkoutservice-7c8866657f-db778: RESTARTS 4 (61s ago), age 2m31s, while all other 10 pods have 0 restarts. kubectl describe shows the 'server' container Last State Terminated with Reason=Error, Exit Code=2 (not 137, so not OOMKilled), and a kubelet event 'Warning BackOff (x5 over 2m11s) Back-off restarting failed container server'; probes (grpc 5050) match the container port, so probe/scheduling/image/volume causes are excluded. Container logs of the previous instance show 'panic: mismatching currency codes' raised from money.Must at m

### case-2

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 126,973
- **摘要**：checkoutservice pod (checkoutservice-7c8866657f-927cq, worker-01) is the only outlier in the pods listing: 1/2 Ready, RESTARTS 4 (50s ago), ContainersReady=False, with kubelet events 'Back-off restarting failed container server'. The container 'server' last termination state is Reason=Error ExitCode=2; its logs end in 'panic: mismatching currency codes' at money.Must (money/money.go:85) called from main.(*checkoutService).PlaceOrder (main.go:294). Source inspection of checkoutservice/main.go shows PlaceOrder swaps the two variables right after reading them (userID, userCurrency = userCurrency,

