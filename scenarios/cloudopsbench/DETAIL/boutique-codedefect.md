# 评测明细 · boutique/codedefect — cloudopsbench

> 本家族已跑 **1/98** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-12T07:23:09.373Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14
- **摘要**：Pods scan in namespace boutique shows the only outlier is checkoutservice-7c8866657f-db778: RESTARTS 4 (61s ago), age 2m31s, while all other 10 pods have 0 restarts. kubectl describe shows the 'server' container Last State Terminated with Reason=Error, Exit Code=2 (not 137, so not OOMKilled), and a kubelet event 'Warning BackOff (x5 over 2m11s) Back-off restarting failed container server'; probes (grpc 5050) match the container port, so probe/scheduling/image/volume causes are excluded. Container logs of the previous instance show 'panic: mismatching currency codes' raised from money.Must at m

