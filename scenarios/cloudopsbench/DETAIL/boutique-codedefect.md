# 评测明细 · boutique/codedefect — cloudopsbench

> 本家族已跑 **1/98** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-10T09:25:25.475Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 0 | 0 | 1010_1658_inorder5 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15
- **摘要**：checkoutservice pod checkoutservice-7c8866657f-db778 is the only outlier (RESTARTS=4, 2m31s age, container 'server' Last State Terminated/Reason Error/Exit Code 2, event 'Back-off restarting failed container server'); its logs show 'panic: mismatching currency codes' at money.Must (/src/money/money.go:85) called from main.(*checkoutService).PlaceOrder (/src/main.go:294). Source review of checkoutservice/main.go PlaceOrder shows the injected defect: 'userID, userCurrency = userCurrency, userID' swaps the two arguments before calling prepareOrderItemsAndShippingQuoteFromCart, so the currency con

