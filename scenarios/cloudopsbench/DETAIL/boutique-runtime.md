# 评测明细 · boutique/runtime — cloudopsbench

> 本家族已跑 **17/45** 题：JRA ✅17 ❌0 ｜ 证据链全闭 17 ｜ token 中位 61,752 ｜ 生成 2026-10-14T01:41:18.020Z
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
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 60,106 | 0 | 0 | 1014_0241_inorder4-v3b111 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 75,480 | 0 | 0 | 1014_0243_inorder4-v3b112 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 96,477 | 0 | 0 | 1014_0245_inorder4-v3b113 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 60,933 | 0 | 0 | 1014_0248_inorder4-v3b114 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 94,004 | 0 | 0 | 1014_0250_inorder4-v3b115 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 98,012 | 0 | 0 | 1014_0252_inorder4-v3b116 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 61,113 | 0 | 0 | 1014_0254_inorder4-v3b117 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 81,447 | 0 | 0 | 1014_0256_inorder4-v3b118 | 全对·链闭 |

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

### case-10

- **结论**：`app/checkoutservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/checkoutservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 60,106
- **raw 日志**：[results/1014_0241_inorder4-v3b111/raw/1014_0241_boutique-runtime-10](../results/1014_0241_inorder4-v3b111/raw/1014_0241_boutique-runtime-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Health-chain walk on namespace boutique: only one pod is an outlier in the RESTARTS column - checkoutservice-7ff8466b8f-stklt shows 'RESTARTS 2 (29s ago)' while all other 10 pods show 0. Pod detail: Last State Terminated, Reason Error, Exit Code 2 (kubelet-killed on failed probe, not 137 OOMKilled / 143 SIGTERM). Container logs show the app listening on '[::]:5050' with PORT=5050 and containerPort 5050, and the readinessProbe is grpc:5050 (thus Ready=True). However the livenessProbe targets grpc port 5051, which the application never listens on: pod events read 'Warning Unhealthy 0s (x9 over 8

### case-11

- **结论**：`app/currencyservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/currencyservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 75,480
- **raw 日志**：[results/1014_0243_inorder4-v3b112/raw/1014_0243_boutique-runtime-11](../results/1014_0243_inorder4-v3b112/raw/1014_0243_boutique-runtime-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only currencyservice pod currencyservice-68bd7787c9-z922l is the restart outlier (RESTARTS 2, 14s ago) while all other boutique pods show 0. Its pod detail shows Last State Terminated, Reason Error, Exit Code 137, paired with kubelet events 'Container server failed liveness probe, will be restarted' and 'Warning Unhealthy ... Liveness probe failed: timeout: failed to connect service 172.20.2.221:7001 within 1s: context deadline exceeded'. The container actually serves gRPC on port 7000 (PORT=7000, containerPort 7000, Service targetPort 7000, readinessProbe grpc port 7000 -> READY 1/1), while G

### case-12

- **结论**：`app/emailservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/emailservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 96,477
- **raw 日志**：[results/1014_0245_inorder4-v3b113/raw/1014_0245_boutique-runtime-12](../results/1014_0245_inorder4-v3b113/raw/1014_0245_boutique-runtime-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods 清单中仅 emailservice-db586b659-tg9kn 离群（RESTARTS 2 (14s ago)，其余 10 个 pod 均为 0）。Pod 详情显示 Last State: Terminated, Reason: Error, Exit Code 137, Restart Count 2，且 kubelet 事件逐字为 'Container server failed liveness probe, will be restarted' (Killing x2) 与 'Liveness probe failed: timeout: failed to connect service "172.20.2.227:8081" within 1s: context deadline exceeded' (Unhealthy x7)——即 137 是 liveness 失败后 kubelet SIGKILL，而非 OOMKilled。GetAppYAML(emailservice) 显示 livenessProbe.grpc.port: 8081，而 readinessProbe.grpc.port: 8080、containerPort/env PORT 均为 8080；email_server.py 中 gRPC server 仅 add_insecure

### case-13

- **结论**：`app/paymentservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/paymentservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 60,933
- **raw 日志**：[results/1014_0248_inorder4-v3b114/raw/1014_0248_boutique-runtime-13](../results/1014_0248_inorder4-v3b114/raw/1014_0248_boutique-runtime-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing in boutique shows a single restarting outlier: paymentservice-57b96767-95rmd with RESTARTS 2 (14s ago) while all other 10 services are at 0. Pod detail gives Last State Terminated with Reason 'Error' and Exit Code 137 (not OOMKilled), Restart Count 2. Events bind the mechanism verbatim: 'Container server failed liveness probe, will be restarted' (Normal Killing, x2) and 'Liveness probe failed: timeout: failed to connect service "172.20.1.146:50052" within 1s' (Warning Unhealthy, x7 over 81s). GetAppYAML confirms the misconfiguration: containerPort 50051, env PORT=50051, Service tar

### case-14

- **结论**：`app/productcatalogservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/productcatalogservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 94,004
- **raw 日志**：[results/1014_0250_inorder4-v3b115/raw/1014_0250_boutique-runtime-14](../results/1014_0250_inorder4-v3b115/raw/1014_0250_boutique-runtime-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only productcatalogservice-6dd77c8957-rqvzs is an outlier in the pods listing: RESTARTS 2 (29s ago) / Restart Count 3 while all 10 other boutique pods show 0, and Deployment productcatalogservice is 0/1 AVAILABLE. Pod detail shows Last State Terminated, Reason Error, Exit Code 2 (not 137/OOMKilled), Liveness: grpc <pod>:3551 vs Readiness: grpc <pod>:3550. Pod events bind the mechanism verbatim: 'Warning Unhealthy ... Liveness probe failed: timeout: failed to connect service "172.20.2.238:3551" within 1s: context deadline exceeded' and 'Normal Killing ... Container server failed liveness probe,

### case-15

- **结论**：`app/recommendationservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/recommendationservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 98,012
- **raw 日志**：[results/1014_0252_inorder4-v3b116/raw/1014_0252_boutique-runtime-15](../results/1014_0252_inorder4-v3b116/raw/1014_0252_boutique-runtime-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one workload in namespace boutique is restarting: recommendationservice-644bfcf4c5-tcn2x (RESTARTS 2, 14s ago) on worker-02; all other 10 boutique pods show RESTARTS 0. Pod detail shows Last State Terminated, Reason=Error, Exit Code=137 (kubelet SIGKILL, not OOMKilled) with events 'Container server failed liveness probe, will be restarted' (Killing x2) and 'Warning Unhealthy: Liveness probe failed: timeout: failed to connect service "172.20.2.244:8081" within 1s: context deadline exceeded' (x7), while Ready=True and the readiness probe on :8080 passes. GetAppYAML(recommendationservice) sh

### case-16

- **结论**：`app/shippingservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/shippingservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 61,113
- **raw 日志**：[results/1014_0254_inorder4-v3b117/raw/1014_0254_boutique-runtime-16](../results/1014_0254_inorder4-v3b117/raw/1014_0254_boutique-runtime-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object-layer scan of boutique pods shows a single outlier: shippingservice-76fd56c499-2b5j7 on worker-02 with 2-3 restarts while all other 10 pods report 0 and GetAlerts() shows no metric anomaly. Pod events bind the mechanism verbatim: 'Liveness probe failed: timeout: failed to connect service "172.20.2.250:50052" within 1s' (x9) followed by 'Container server failed liveness probe, will be restarted' (x3). Configuration confirms the break: the container actually serves on 50051 (containerPort 50051, env PORT=50051, log 'Shipping Service listening on port :50051', Service targetPort 50051/Endp

### case-17

- **结论**：`app/adservice` + `liveness_probe_incorrect_timing` ｜ 标签 `app/adservice` + `liveness_probe_incorrect_timing`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 81,447
- **raw 日志**：[results/1014_0256_inorder4-v3b118/raw/1014_0256_boutique-runtime-17](../results/1014_0256_inorder4-v3b118/raw/1014_0256_boutique-runtime-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice-75d5d88689-7djn4 is the only outlier pod in namespace boutique: STATUS CrashLoopBackOff, READY 0/1, RESTARTS 4 (47s ago), Last State Terminated Reason=Error Exit Code=143 (SIGTERM by kubelet, not 137 OOMKilled). Pod events bind the mechanism verbatim: 'Liveness probe failed: timeout: failed to connect service "172.20.2.186:9555" within 1s: context deadline exceeded' and 'Container server failed liveness probe, will be restarted' -> 'Back-off restarting failed container'. The adservice Deployment configures livenessProbe: initialDelaySeconds=1, periodSeconds=1, timeoutSeconds=1, failu

