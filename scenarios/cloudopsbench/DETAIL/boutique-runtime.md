# 评测明细 · boutique/runtime — cloudopsbench

> 本家族已跑 **9/45** 题：JRA ✅9 ❌0 ｜ 证据链全闭 9 ｜ token 中位 61,723 ｜ 生成 2026-10-13T15:08:00.868Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 61,752 | 0 | 0 | 1012_1512_inorder4-v3b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 122,722 | 0 | 0 | 1012_2040_inorder4-v3b8 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 61,152 | 0 | 0 | 1013_1122_inorder4-v3b9 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 62,072 | 0 | 0 | 1013_1248_inorder4-v3b13 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 60,382 | 0 | 0 | 1013_1520_inorder4-v3b17 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 60,547 | 0 | 0 | 1013_1819_inorder4-v3b28 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 11 | 61,706 | 0 | 0 | 1013_1848_inorder4-v3b33 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 11 | 62,065 | 0 | 0 | 1013_1955_inorder4-v3b34 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 61,723 | 0 | 0 | 1013_2000_inorder4-v3b35 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/adservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 61,752
- **raw 日志**：[results/1012_1512_inorder4-v3b3/raw/1012_1512_boutique-runtime-1](../results/1012_1512_inorder4-v3b3/raw/1012_1512_boutique-runtime-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing shows adservice-d6c9fcc6b-d4nlb as the only outlier with RESTARTS 2 (30s ago) while all other 10 boutique services are at 0 restarts; GetAlerts reports no metric anomalies, so the fault is object-layer. Its pod detail shows Last State Terminated with Reason Error and Exit Code 143 (SIGTERM by kubelet, not 137 OOMKilled) plus events 'Liveness probe failed: Get "http://172.20.2.163:9555/": net/http: HTTP/1.x transport connection broken: malformed HTTP status code "\x00\x00\x00\x04..."' (x9) and 'Killing: Container server failed liveness probe, will be restarted' (x3). Server-side log

### case-2

- **结论**：`app/checkoutservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/checkoutservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 122,722
- **raw 日志**：[results/1012_2040_inorder4-v3b8/raw/1012_2158_boutique-runtime-2](../results/1012_2040_inorder4-v3b8/raw/1012_2158_boutique-runtime-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique namespace pod listing shows a single outlier: checkoutservice-7f88d56cf6-zjb4s with RESTARTS 2 (30s ago), all other 10 pods 0. DescribeResource on that pod records Last State Terminated/Reason Error/Exit Code 2 (not 137, so OOM is excluded), Ready False, Restart Count 3, and events 'Warning Unhealthy (x9): Liveness probe failed: Get "http://172.20.2.169:5050/": malformed HTTP response "\x00\x00\x06\x04..."' plus 'Normal Killing (x3): Container server failed liveness probe, will be restarted' — so the restart loop is caused by the liveness probe, not by resource limits. GetAppYAML(chec

### case-3

- **结论**：`app/currencyservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/currencyservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 61,152
- **raw 日志**：[results/1013_1122_inorder4-v3b9/raw/1013_1124_boutique-runtime-3](../results/1013_1122_inorder4-v3b9/raw/1013_1124_boutique-runtime-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only currencyservice out of 11 boutique pods shows restarts (RESTARTS 2 (25s ago), pod currencyservice-7595dc65b4-ks62n on worker-02); no alerts raised. Pod last state is Terminated with Reason=Error and Exit Code=137, and kubelet events state the mechanism verbatim: 'Warning Unhealthy 1s (x9 over 81s) Liveness probe failed: Get "http://172.20.2.175:7000/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x00\x04..."' followed by 'Normal Killing: Container server failed liveness probe, will be restarted'. The malformed response bytes are the HTTP/2/gRPC preface

### case-4

- **结论**：`app/emailservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/emailservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 62,072
- **raw 日志**：[results/1013_1248_inorder4-v3b13/raw/1013_1248_boutique-runtime-4](../results/1013_1248_inorder4-v3b13/raw/1013_1248_boutique-runtime-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing shows a single restart outlier in namespace boutique: emailservice-68b7cdc49b-9fnrq with RESTARTS 2 (25s ago) while all other boutique pods report 0 restarts. Its pod detail shows Last State: Terminated, Reason: Error, Exit Code: 137 (not OOMKilled), and pod events read 'Warning Unhealthy ... Liveness probe failed: Get "http://172.20.1.99:8080/" ... malformed HTTP response "\x00\x00\x1e\x04..."' followed by 'Normal Killing ... Container server failed liveness probe, will be restarted' (x3). The malformed bytes are an HTTP/2 SETTINGS frame, i.e. port 8080 serves gRPC/HTTP-2; contain

### case-5

- **结论**：`app/paymentservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/paymentservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 60,382
- **raw 日志**：[results/1013_1520_inorder4-v3b17/raw/1013_1520_boutique-runtime-5](../results/1013_1520_inorder4-v3b17/raw/1013_1520_boutique-runtime-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only paymentservice pod (paymentservice-597747d4d8-jbdgb on worker-02) is an outlier in the boutique pods listing with RESTARTS=2 while all other 10 pods show 0. Its pod detail shows Last State Terminated with Reason: Error / Exit Code 137, and kubelet events state verbatim: 'Liveness probe failed: Get "http://172.20.2.186:50051/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x00\x04..."' followed by 'Container server failed liveness probe, will be restarted' (x3). The malformed response bytes are HTTP/2 frame prefixes, showing the container speaks gRPC/HTT

### case-6

- **结论**：`app/productcatalogservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/productcatalogservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 60,547
- **raw 日志**：[results/1013_1819_inorder4-v3b28/raw/1013_1819_boutique-runtime-6](../results/1013_1819_inorder4-v3b28/raw/1013_1819_boutique-runtime-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：productcatalogservice pod (productcatalogservice-747b447754-r49cw, worker-02) is the only outlier with RESTARTS 2 (30s ago) / Restart Count 3 and Ready False, while all other 10 boutique services show RESTARTS 0. Pod events bind the mechanism verbatim: 'Liveness probe failed: Get "http://172.20.2.192:3550/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x06\x04..."' (x9) followed by 'Container server failed liveness probe, will be restarted' (x3), with Last State Terminated Reason Error Exit Code 2. Config cross-check (GetAppYAML) shows the liveness probe is

### case-7

- **结论**：`app/recommendationservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/recommendationservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 11 · tokens 61,706
- **raw 日志**：[results/1013_1848_inorder4-v3b33/raw/1013_1848_boutique-runtime-7](../results/1013_1848_inorder4-v3b33/raw/1013_1848_boutique-runtime-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods 清单中唯一离群行是 recommendationservice-667699c9dd-cx2c9（RESTARTS 2 (25s ago)，其余 11 个 pod 均为 0）；其 pod 详情 Last State 为 Terminated/Reason: Error/Exit Code: 137，事件逐字给出机制：'Liveness probe failed: Get "http://172.20.2.198:8080/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x1e\x04..."' 与 'Container server failed liveness probe, will be restarted'（x3），返回体开头的 \x00\x00\x1e\x04 为 HTTP/2/gRPC SETTINGS 帧，说明 kubelet 以 HTTP/1.x 客户端探测只提供 gRPC 的端口。GetAppYAML 确认断点：readinessProbe 使用 grpc:8080（正确），而 livenessProbe 使用 httpGet path=/ port=8080（错误）。反证面显示业务与网络健康——CheckServiceConnect

### case-8

- **结论**：`app/shippingservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/shippingservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 11 · tokens 62,065
- **raw 日志**：[results/1013_1955_inorder4-v3b34/raw/1013_1955_boutique-runtime-8](../results/1013_1955_inorder4-v3b34/raw/1013_1955_boutique-runtime-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Health-chain walk on namespace boutique: pods -o wide shows a single outlier, shippingservice-dcf97c8fd-lkfpz, at 0/1 Running with 3 RESTARTS (0s ago) while all 10 other pods are 1/1 Running with 0 restarts; deployments confirm shippingservice is the only workload at 0/1 AVAILABLE. Pod detail shows Last State Terminated, Reason Error, Exit Code 2 (not 137/OOMKilled), Ready False. The mechanism events bind it exactly: kubelet 'Liveness probe failed: Get "http://172.20.1.120:50051/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x06\x04..."' (that byte pattern

### case-9

- **结论**：`app/adservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/adservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 61,723
- **raw 日志**：[results/1013_2000_inorder4-v3b35/raw/1013_2000_boutique-runtime-9](../results/1013_2000_inorder4-v3b35/raw/1013_2000_boutique-runtime-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice pod adservice-645c94d6-9jrbk shows RESTARTS 2 (29s ago) within 91s while all other 10 boutique services show 0. Pod detail gives Last State: Terminated, Reason: Error, Exit Code 143 (kubelet SIGTERM), ruling out OOMKilled 137. Pod events name the mechanism verbatim: kubelet 'Container server failed liveness probe, will be restarted' and Warning Unhealthy 'Liveness probe failed: timeout: failed to connect service "172.20.1.125:8080" within 1s: context deadline exceeded' (x8). Deployment YAML confirms the misconfiguration: livenessProbe.grpc.port=8080 while containerPort=9555, env PORT

