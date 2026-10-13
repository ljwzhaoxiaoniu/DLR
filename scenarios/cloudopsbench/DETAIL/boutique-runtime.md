# 评测明细 · boutique/runtime — cloudopsbench

> 本家族已跑 **5/45** 题：JRA ✅5 ❌0 ｜ 证据链全闭 5 ｜ token 中位 61,752 ｜ 生成 2026-10-13T08:32:23.004Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 61,752 | 0 | 0 | 1012_1512_inorder4-v3b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 122,722 | 0 | 0 | 1012_2040_inorder4-v3b8 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 61,152 | 0 | 0 | 1013_1122_inorder4-v3b9 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 62,072 | 0 | 0 | 1013_1248_inorder4-v3b13 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 60,382 | 0 | 0 | 1013_1520_inorder4-v3b17 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/adservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 61,752
- **摘要**：Pod listing shows adservice-d6c9fcc6b-d4nlb as the only outlier with RESTARTS 2 (30s ago) while all other 10 boutique services are at 0 restarts; GetAlerts reports no metric anomalies, so the fault is object-layer. Its pod detail shows Last State Terminated with Reason Error and Exit Code 143 (SIGTERM by kubelet, not 137 OOMKilled) plus events 'Liveness probe failed: Get "http://172.20.2.163:9555/": net/http: HTTP/1.x transport connection broken: malformed HTTP status code "\x00\x00\x00\x04..."' (x9) and 'Killing: Container server failed liveness probe, will be restarted' (x3). Server-side log

### case-2

- **结论**：`app/checkoutservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/checkoutservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 122,722
- **摘要**：boutique namespace pod listing shows a single outlier: checkoutservice-7f88d56cf6-zjb4s with RESTARTS 2 (30s ago), all other 10 pods 0. DescribeResource on that pod records Last State Terminated/Reason Error/Exit Code 2 (not 137, so OOM is excluded), Ready False, Restart Count 3, and events 'Warning Unhealthy (x9): Liveness probe failed: Get "http://172.20.2.169:5050/": malformed HTTP response "\x00\x00\x06\x04..."' plus 'Normal Killing (x3): Container server failed liveness probe, will be restarted' — so the restart loop is caused by the liveness probe, not by resource limits. GetAppYAML(chec

### case-3

- **结论**：`app/currencyservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/currencyservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 61,152
- **摘要**：Only currencyservice out of 11 boutique pods shows restarts (RESTARTS 2 (25s ago), pod currencyservice-7595dc65b4-ks62n on worker-02); no alerts raised. Pod last state is Terminated with Reason=Error and Exit Code=137, and kubelet events state the mechanism verbatim: 'Warning Unhealthy 1s (x9 over 81s) Liveness probe failed: Get "http://172.20.2.175:7000/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x00\x04..."' followed by 'Normal Killing: Container server failed liveness probe, will be restarted'. The malformed response bytes are the HTTP/2/gRPC preface

### case-4

- **结论**：`app/emailservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/emailservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 62,072
- **摘要**：Pod listing shows a single restart outlier in namespace boutique: emailservice-68b7cdc49b-9fnrq with RESTARTS 2 (25s ago) while all other boutique pods report 0 restarts. Its pod detail shows Last State: Terminated, Reason: Error, Exit Code: 137 (not OOMKilled), and pod events read 'Warning Unhealthy ... Liveness probe failed: Get "http://172.20.1.99:8080/" ... malformed HTTP response "\x00\x00\x1e\x04..."' followed by 'Normal Killing ... Container server failed liveness probe, will be restarted' (x3). The malformed bytes are an HTTP/2 SETTINGS frame, i.e. port 8080 serves gRPC/HTTP-2; contain

### case-5

- **结论**：`app/paymentservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/paymentservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 60,382
- **摘要**：Only paymentservice pod (paymentservice-597747d4d8-jbdgb on worker-02) is an outlier in the boutique pods listing with RESTARTS=2 while all other 10 pods show 0. Its pod detail shows Last State Terminated with Reason: Error / Exit Code 137, and kubelet events state verbatim: 'Liveness probe failed: Get "http://172.20.2.186:50051/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x00\x04..."' followed by 'Container server failed liveness probe, will be restarted' (x3). The malformed response bytes are HTTP/2 frame prefixes, showing the container speaks gRPC/HTT

