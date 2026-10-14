# 评测明细 · boutique/runtime — cloudopsbench

> 本家族已跑 **45/45** 题：JRA ✅45 ❌0 ｜ 证据链全闭 45 ｜ token 中位 81,447 ｜ 生成 2026-10-14T12:19:10.767Z
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
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 107,286 | 0 | 0 | 1014_1226_inorder4-v3b119 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 71,479 | 0 | 0 | 1014_1230_inorder4-v3b120 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 154,772 | 0 | 0 | 1014_1234_inorder4-v3b121 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 84,911 | 0 | 0 | 1014_1236_inorder4-v3b122 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 147,618 | 0 | 0 | 1014_1239_inorder4-v3b123 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 82,921 | 0 | 0 | 1014_1241_inorder4-v3b124 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 88,747 | 0 | 0 | 1014_1245_inorder4-v3b125 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 81,268 | 0 | 0 | 1014_1247_inorder4-v3b126 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 94,812 | 0 | 0 | 1014_1250_inorder4-v3b127 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 102,987 | 0 | 0 | 1014_1252_inorder4-v3b128 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 115,722 | 0 | 0 | 1014_1255_inorder4-v3b129 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 68,980 | 0 | 0 | 1014_1257_inorder4-v3b130 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 68,255 | 0 | 0 | 1014_1300_inorder4-v3b131 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 82,684 | 0 | 0 | 1014_1302_inorder4-v3b132 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 113,648 | 0.0588 | 0 | 1014_1305_inorder4-v3b133 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 80,370 | 0 | 0 | 1014_1308_inorder4-v3b134 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 78,923 | 0 | 0 | 1014_1312_inorder4-v3b135 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 81,258 | 0 | 0 | 1014_1314_inorder4-v3b136 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 29 | 128,004 | 0 | 0 | 1014_1318_inorder4-v3b137 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 81,865 | 0 | 0 | 1014_1321_inorder4-v3b138 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 60,233 | 0 | 0 | 1014_1841_inorder4-v3b139 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 102,360 | 0 | 0 | 1014_1843_inorder4-v3b140 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 116,960 | 0 | 0 | 1014_1844_inorder4-v3b141 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 80,472 | 0 | 0 | 1014_1846_inorder4-v3b142 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 93,092 | 0 | 0 | 1014_1848_inorder4-v3b143 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 66,266 | 0 | 0 | 1014_1850_inorder4-v3b144 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 115,895 | 0 | 0 | 1014_1851_inorder4-v3b145 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 103,946 | 0 | 0 | 1014_1853_inorder4-v3b146 | 全对·链闭 |

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

### case-18

- **结论**：`app/currencyservice` + `liveness_probe_incorrect_timing` ｜ 标签 `app/currencyservice` + `liveness_probe_incorrect_timing`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 107,286
- **raw 日志**：[results/1014_1226_inorder4-v3b119/raw/1014_1226_boutique-runtime-18](../results/1014_1226_inorder4-v3b119/raw/1014_1226_boutique-runtime-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows only currencyservice-6c5cd895d9-wszxs as an outlier: RESTARTS=5 (45s ago) vs 0 for all other 10 boutique pods. Its last termination state is Terminated/Reason=Error/Exit Code=137 after only ~8s of life, and kubelet events bind the mechanism literally: 'Liveness probe failed: timeout: failed to connect service "172.20.1.147:7000" within 1s: context deadline exceeded' followed by 'Container server failed liveness probe, will be restarted' (x3) and 'Back-off restarting failed container server', i.e. kubelet SIGKILLed the container — Reason is Error, not OOMKilled. The deploymen

### case-19

- **结论**：`app/emailservice` + `liveness_probe_incorrect_timing` ｜ 标签 `app/emailservice` + `liveness_probe_incorrect_timing`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 71,479
- **raw 日志**：[results/1014_1230_inorder4-v3b120/raw/1014_1230_boutique-runtime-19](../results/1014_1230_inorder4-v3b120/raw/1014_1230_boutique-runtime-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only emailservice-75d7c8757-7pmzv is an outlier in the namespace-wide pod scan: 0/1 CrashLoopBackOff with 4 restarts, while all 10 other pods are 1/1 Running with 0 restarts (including the other pods on the same node worker-01, ruling out node-level faults). Pod detail shows Last State: Terminated, Reason: Error, Exit Code: 137 (SIGKILL class, not OOMKilled; memory limit 128Mi never implicated) with a ~7s container lifetime, and the kubelet events read verbatim: 'Liveness probe failed: timeout: failed to connect service "172.20.1.163:8080" within 1s: context deadline exceeded' followed by 'Con

### case-20

- **结论**：`app/paymentservice` + `liveness_probe_incorrect_timing` ｜ 标签 `app/paymentservice` + `liveness_probe_incorrect_timing`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 154,772
- **raw 日志**：[results/1014_1234_inorder4-v3b121/raw/1014_1234_boutique-runtime-20](../results/1014_1234_inorder4-v3b121/raw/1014_1234_boutique-runtime-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object-layer scan: only paymentservice-55d4c9b59-cc5z2 is an outlier with RESTARTS=3 (all other 10 pods 0); its pod detail shows Last State Terminated Reason=Error ExitCode=137 with events 'Liveness probe failed: timeout: failed to connect service "172.20.2.236:50051" within 1s' (x3) → 'Container server failed liveness probe, will be restarted' (x3) → BackOff, i.e. kubelet probe-kill, not OOMKilled. GetAppYAML(paymentservice) shows a pathologically tight liveness probe: initialDelaySeconds=1, periodSeconds=1, timeoutSeconds=1, failureThreshold=1 against grpc port 50051 (port/protocol match con

### case-21

- **结论**：`app/recommendationservice` + `liveness_probe_incorrect_timing` ｜ 标签 `app/recommendationservice` + `liveness_probe_incorrect_timing`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 84,911
- **raw 日志**：[results/1014_1236_inorder4-v3b122/raw/1014_1237_boutique-runtime-21](../results/1014_1236_inorder4-v3b122/raw/1014_1237_boutique-runtime-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace boutique only recommendationservice-649b47b8f5-w7zd6 is an outlier in the pods listing (READY 0/1, RESTARTS 5, all other 10 pods 1/1 Running with 0 restarts). Pod detail shows Last State Terminated with Reason Error / Exit Code 137 and Restart Count 5 (not OOMKilled). Pod events bind the mechanism verbatim: 'Liveness probe failed: timeout: failed to connect service "172.20.2.254:8080" within 1s: context deadline exceeded' followed by 'Container server failed liveness probe, will be restarted' and BackOff/CrashLoopBackOff; kubelet log confirms 'failed to StartContainer for server w

### case-22

- **结论**：`app/adservice` + `container_memory_limit_too_low` ｜ 标签 `app/adservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 147,618
- **raw 日志**：[results/1014_1239_inorder4-v3b123/raw/1014_1239_boutique-runtime-22](../results/1014_1239_inorder4-v3b123/raw/1014_1239_boutique-runtime-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows the single outlier adservice-74c7f4c787-8g8cs (0/1 ContainerCreating on worker-01) while all other boutique services are 1/1 Running. Its own signal: endpoints/adservice = <none> (no routable backend). Pod conditions show PodScheduled=True, State Waiting/ContainerCreating, with repeated Warning FailedCreatePodSandBox: 'failed to create containerd task: ... runc create failed: unable to start container process: container init was OOM-killed (memory limit too low?)'. The config face confirms the mechanism: Deployment/Pod spec sets resources.limits.memory=5Mi (requests.memory=5

### case-23

- **结论**：`app/cartservice` + `container_memory_limit_too_low` ｜ 标签 `app/cartservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 82,921
- **raw 日志**：[results/1014_1241_inorder4-v3b124/raw/1014_1241_boutique-runtime-23](../results/1014_1241_inorder4-v3b124/raw/1014_1241_boutique-runtime-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace boutique, only cartservice is broken: pod cartservice-8c5b58976-49rrx is 0/1 ContainerCreating while all other 10 services are 1/1 Running, and a connectivity probe on its declared port 7070 returns 'Connection Failed'. DescribeResource on the pod shows PodScheduled=True but PodReadyToStartContainers=False with Warning FailedCreatePodSandBox: 'failed to create containerd task ... runc create failed: unable to start container process: container init was OOM-killed (memory limit too low?)'. GetAppYAML(cartservice) confirms the referenced config: requests/limits memory = 5Mi (limits 

### case-24

- **结论**：`app/checkoutservice` + `container_memory_limit_too_low` ｜ 标签 `app/checkoutservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 88,747
- **raw 日志**：[results/1014_1245_inorder4-v3b125/raw/1014_1245_boutique-runtime-24](../results/1014_1245_inorder4-v3b125/raw/1014_1245_boutique-runtime-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side (wording names no service -> inventory entry): pods wide listing shows the single outlier checkoutservice-79cc47d4c5-7q259 0/1 ContainerCreating on worker-03 (all other 10 boutique workloads 1/1 Running); endpoints listing shows 'checkoutservice <none>' while every other service has bound endpoints; active TCP probe on the port the victim's own Service declares (5050) returns 'Connection Failed'. Victim-side signal leads to the pod sheet, whose events carry the mechanism verbatim: 'Warning FailedCreatePodSandBox ... OCI runtime create failed: runc create failed: unable to start co

### case-25

- **结论**：`app/emailservice` + `container_memory_limit_too_low` ｜ 标签 `app/emailservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 81,268
- **raw 日志**：[results/1014_1247_inorder4-v3b126/raw/1014_1247_boutique-runtime-25](../results/1014_1247_inorder4-v3b126/raw/1014_1247_boutique-runtime-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one outlier in the boutique inventory: pod emailservice-6ddd77457-tzhbg is 0/1 in ContainerCreating on worker-03 while all other 10 services are 1/1 Running; the deployments listing confirms emailservice 0/1 (AVAILABLE 0). The pod's own events carry the mechanism verbatim: 'Warning FailedCreatePodSandBox ... runc create failed: unable to start container process: container init was OOM-killed (memory limit too low?)' — the container dies before sandbox init, with PodScheduled=True and no FailedScheduling/FailedMount/image-pull/probe rows. GetAppYAML(emailservice) reads the referenced confi

### case-26

- **结论**：`app/frontend` + `container_memory_limit_too_low` ｜ 标签 `app/frontend` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 94,812
- **raw 日志**：[results/1014_1250_inorder4-v3b127/raw/1014_1250_boutique-runtime-26](../results/1014_1250_inorder4-v3b127/raw/1014_1250_boutique-runtime-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the boutique pods inventory: frontend-5b4698b8c7-4462b is 0/1 CrashLoopBackOff (2 restarts) while all other 10 pods are 1/1 Running with 0 restarts. Victim's own signal: the frontend Service has an EMPTY endpoints list (no ready backend) and CheckServiceConnectivity(frontend:80) returns 'Connection Failed'; its owner deployment frontend is the only one at 0/1 AVAILABLE. Pod sheet carries the mechanism verbatim: Last State Terminated Reason=StartError ExitCode=128, message 'failed to create containerd task: ... OCI runtime create failed: runc create failed: unable to start conta

### case-27

- **结论**：`app/paymentservice` + `container_memory_limit_too_low` ｜ 标签 `app/paymentservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 102,987
- **raw 日志**：[results/1014_1252_inorder4-v3b128/raw/1014_1252_boutique-runtime-27](../results/1014_1252_inorder4-v3b128/raw/1014_1252_boutique-runtime-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability localized to paymentservice: its Service endpoints are '<none>' while every other boutique service has bound endpoints. Pod paymentservice-8694bc5949-9p4xp is 0/1 in ContainerCreating (not Ready, 0 restarts) and owner deployment/paymentservice is 0/1 AVAILABLE. The pod's own event carries the mechanism: Warning FailedCreatePodSandBox (x3) - 'failed to create containerd task ... OCI runtime create failed: runc create failed: unable to start container process: container init was OOM-killed (memory limit too low?)'. GetAppYAML(paymentservice) confirms resources.limits.memor

### case-28

- **结论**：`app/productcatalogservice` + `container_memory_limit_too_low` ｜ 标签 `app/productcatalogservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 115,722
- **raw 日志**：[results/1014_1255_inorder4-v3b129/raw/1014_1255_boutique-runtime-28](../results/1014_1255_inorder4-v3b129/raw/1014_1255_boutique-runtime-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial reachability localized to productcatalogservice: pods listing shows the sole outlier productcatalogservice-6bdfff7c55-bntnp 0/1 ContainerCreating (all 10 other boutique pods 1/1 Running). Victim-side signals: the Service-declared port 3550 probe returns 'Connection Failed' and the endpoints listing for productcatalogservice shows '<none>' (no backend endpoints), while the Service selector app=productcatalogservice matches the pod label. Owner chain: deployment productcatalogservice 0/1 READY, 1 UP-TO-DATE, 0 AVAILABLE. The pod's own sheet carries the mechanism verbatim: 'Warning Failed

### case-29

- **结论**：`app/redis-cart` + `container_memory_limit_too_low` ｜ 标签 `app/redis-cart` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 68,980
- **raw 日志**：[results/1014_1257_inorder4-v3b130/raw/1014_1257_boutique-runtime-29](../results/1014_1257_inorder4-v3b130/raw/1014_1257_boutique-runtime-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Endpoints listing shows redis-cart with no endpoints (<none>) while all 11 peer services are bound, and an active probe to redis-cart:6379 returned 'Connection Failed' -> partial unreachability isolated to redis-cart. Its pod redis-cart-754cf58cb4-42f8g is 0/1 ContainerCreating on worker-02 (PodScheduled=True, so not a scheduling fault). The pod's own events carry the mechanism: 'FailedCreatePodSandBox ... Failed to create pod sandbox: failed to create containerd task: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: container init w

### case-30

- **结论**：`app/shippingservice` + `container_memory_limit_too_low` ｜ 标签 `app/shippingservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 68,255
- **raw 日志**：[results/1014_1300_inorder4-v3b131/raw/1014_1300_boutique-runtime-30](../results/1014_1300_inorder4-v3b131/raw/1014_1300_boutique-runtime-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pods listing (wide) shows a single outlier: shippingservice-84778d9f49-l8d2p 0/1 ContainerCreating on worker-03, while all other 10 pods are 1/1 Running and the other pods on worker-03 (cartservice, emailservice, paymentservice, redis-cart) are healthy, excluding a node-level fault. The victim's own signal confirms the disruption: Endpoints for shippingservice is '<none>' and CheckServiceConnectivity(shippingservice:50051) returns 'Connection Failed'. Pod detail gives the mechanism event: Status Pending, container Waiting/ContainerCreating, RestartCount 0, with Warning Faile

### case-31

- **结论**：`app/adservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/adservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 82,684
- **raw 日志**：[results/1014_1302_inorder4-v3b132/raw/1014_1302_boutique-runtime-31](../results/1014_1302_inorder4-v3b132/raw/1014_1302_boutique-runtime-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice is the unique outlier in the namespace: pod adservice-7446b5cf5d-4fv94 shows READY 0/1 (Ready=False, ContainersReady=False) and Deployment adservice is 0/1 AVAILABLE while all other 10 boutique services are 1/1. Kubelet event: 'Warning Unhealthy ... Readiness probe failed: Get "http://172.20.1.249:9555/": net/http: HTTP/1.x transport connection broken: malformed HTTP status code "\x00\x00\x00\x04\b..."' - i.e. an HTTP/1.x probe receiving HTTP/2 (gRPC) frames. GetAppYAML(adservice) confirms the mismatch: readinessProbe uses httpGet path=/ port=9555, while the container serves gRPC on 

### case-32

- **结论**：`app/checkoutservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/checkoutservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 113,648
- **raw 日志**：[results/1014_1305_inorder4-v3b133/raw/1014_1305_boutique-runtime-32](../results/1014_1305_inorder4-v3b133/raw/1014_1305_boutique-runtime-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice pod checkoutservice-74fc7d4686-9vlrn is 0/1 Running with Ready=False/ContainersReady=False and empty Service endpoints (Deployment AVAILABLE 0/1), while all other boutique pods are 1/1 with 0 restarts. Kubelet events show repeated 'Warning Unhealthy ... Readiness probe failed: Get "http://172.20.2.80:5050/health": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x06\x04..."' (x11 over 81s). Deployment YAML shows readinessProbe using httpGet /health on port 5050 whereas livenessProbe correctly uses grpc on 5050; main.go confirms port 5050 serves 

### case-33

- **结论**：`app/currencyservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/currencyservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 80,370
- **raw 日志**：[results/1014_1308_inorder4-v3b134/raw/1014_1308_boutique-runtime-33](../results/1014_1308_inorder4-v3b134/raw/1014_1308_boutique-runtime-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only currencyservice is the outlier: pod currencyservice-665c44c9f4-5p79r is 0/1 Running with Restarts=0, deployment currencyservice 0/1 AVAILABLE=0, Service currencyservice has EMPTY ENDPOINTS while all other 10 services have endpoints, and CheckServiceConnectivity(currencyservice:7000) returned 'Connection Failed'; GetAlerts shows no metric anomalies. Mechanism event read verbatim from the pod: 'Warning Unhealthy 1s (x11 over 81s) kubelet Readiness probe failed: Get "http://172.20.1.7:7000/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x00\x04..."' — the

### case-34

- **结论**：`app/emailservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/emailservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 78,923
- **raw 日志**：[results/1014_1312_inorder4-v3b135/raw/1014_1312_boutique-runtime-34](../results/1014_1312_inorder4-v3b135/raw/1014_1312_boutique-runtime-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Health-chain walk on namespace boutique: pod listing shows a single outlier row emailservice-77bbb89876-x85qb 0/1 Running (all other 10 pods 1/1), matching deployment emailservice 0/1 ready / 0 available while every peer deployment is 1/1. Pod describe gives the mechanism verbatim: kubelet 'Warning Unhealthy (x10 over 82s) Readiness probe failed: Get "http://172.20.2.91:8080/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x1e\x04..."' — the response bytes are HTTP/2 gRPC frame headers, proving an HTTP/1.x probe hitting a gRPC port. Config confirmation: emai

### case-35

- **结论**：`app/paymentservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/paymentservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 81,258
- **raw 日志**：[results/1014_1314_inorder4-v3b136/raw/1014_1315_boutique-runtime-35](../results/1014_1314_inorder4-v3b136/raw/1014_1315_boutique-runtime-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: only paymentservice is anomalous (pod paymentservice-6fbb5fdcd6-krhgt 0/1 Running, Restart Count 0; deployment paymentservice 0/1 AVAILABLE 0), while all other 10 pods/deployments are 1/1 Running with RESTARTS 0. kubelet event on the pod: 'Warning Unhealthy (x11 over 82s) Readiness probe failed: Get "http://172.20.2.97:50051/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x00\x04..."' — the returned bytes are raw gRPC/HTTP2 frames. The Deployment's readinessProbe is httpGet path=/ port=50051 while the container (containerPort 50051, PORT

### case-36

- **结论**：`app/productcatalogservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/productcatalogservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 29 · tokens 128,004
- **raw 日志**：[results/1014_1318_inorder4-v3b137/raw/1014_1318_boutique-runtime-36](../results/1014_1318_inorder4-v3b137/raw/1014_1318_boutique-runtime-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in boutique: pod productcatalogservice-695767b548-2x2xc is 0/1 Running with Restart Count 0 (no OOMKilled/137, no crash) while all other pods are 1/1; its pod events show 'Warning Unhealthy ... Readiness probe failed: Get "http://172.20.2.102:3550/": malformed HTTP response "\x00\x00\x06\x04..."' — the response bytes are an HTTP/2 preface, proving port 3550 serves gRPC. GetAppYAML confirms the injected config: productcatalogservice readinessProbe is httpGet path=/ port=3550 while its own livenessProbe and every other gRPC service use grpc: port=<svc port>. Container log 'starting 

### case-37

- **结论**：`app/recommendationservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/recommendationservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 81,865
- **raw 日志**：[results/1014_1321_inorder4-v3b138/raw/1014_1321_boutique-runtime-37](../results/1014_1321_inorder4-v3b138/raw/1014_1321_boutique-runtime-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice pod recommendationservice-68d8957488-2l4kj is 0/1 Running (Deployment 0/1 AVAILABLE, 0 ready replicas) while all other boutique pods are 1/1 Running. kubelet events repeat: 'Warning Unhealthy ... Readiness probe failed: Get http://172.20.2.107:8080/: net/http: HTTP/1.x transport connection broken: malformed HTTP response' returning HTTP/2/gRPC frame bytes, while container logs show the service healthy and 'listening on port: 8080'. GetAppYAML confirms the injected mutation: readinessProbe uses httpGet path=/ port=8080 against a gRPC (HTTP/2) server, whereas livenessProbe 

### case-38

- **结论**：`app/shippingservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/shippingservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 60,233
- **raw 日志**：[results/1014_1841_inorder4-v3b139/raw/1014_1841_boutique-runtime-38](../results/1014_1841_inorder4-v3b139/raw/1014_1841_boutique-runtime-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pod scan shows a single outlier: shippingservice-546b9d5bcb-42mk8 is 0/1 (Ready=False, ContainersReady=False) while all other 10 pods are 1/1 Running; Restart Count is 0, so no crash-loop. Pod events show 'Warning Unhealthy ... Readiness probe failed: Get "http://172.20.2.113:50051/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x06\x04..."' (x10 over 83s) — the returned bytes are an HTTP/2 frame, indicating the port speaks gRPC rather than HTTP. GetAppYAML(shippingservice) confirms the mismatch: livenessProbe uses grpc on port 50051 (cor

### case-39

- **结论**：`app/adservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/adservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 102,360
- **raw 日志**：[results/1014_1843_inorder4-v3b140/raw/1014_1843_boutique-runtime-39](../results/1014_1843_inorder4-v3b140/raw/1014_1843_boutique-runtime-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice is the sole outlier in namespace boutique: Deployment 'adservice' shows 0/1 READY, 1 UP-TO-DATE, 0 AVAILABLE while all other 10 deployments are 1/1/1; its Service endpoint list is empty (all other services have IP:port endpoints) and CheckServiceConnectivity(adservice:9555) fails. Pod adservice-7b9d8c87cf-gpwlc reports Ready=False with Restart Count 0 and no OOMKilled/termination state, and the only Warning event is 'Readiness probe failed: timeout: failed to connect service "172.20.1.39:9556" within 1s: context deadline exceeded' (x10 over 80s). GetAppYAML shows readinessProbe grpc 

### case-40

- **结论**：`app/checkoutservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/checkoutservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 116,960
- **raw 日志**：[results/1014_1844_inorder4-v3b141/raw/1014_1844_boutique-runtime-40](../results/1014_1844_inorder4-v3b141/raw/1014_1844_boutique-runtime-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object-layer scan of namespace boutique: all 11 pods freshly created (~91s) with RESTARTS=0; the only outlier is checkoutservice-757c84f65-48bhl 0/1 Running (deployment checkoutservice 0/1 AVAILABLE), all other workloads 1/1. Pod events (kubelet, verbatim): 'Warning Unhealthy 10s (x9 over 80s) Readiness probe failed: timeout: failed to connect service "172.20.2.125:5051" within 1s: context deadline exceeded'; no liveness failure, no Killing, no 137/143 termination -> OOM/low-memory and liveness restarts excluded. Container logs show the app listens on only one port: 'starting to listen on tcp:

### case-41

- **结论**：`app/currencyservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/currencyservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 80,472
- **raw 日志**：[results/1014_1846_inorder4-v3b142/raw/1014_1846_boutique-runtime-41](../results/1014_1846_inorder4-v3b142/raw/1014_1846_boutique-runtime-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：currencyservice-7cc975cfff-nk87k (worker-02) is the only outlier: READY 0/1, Ready=False/ContainersReady=False, deployment currencyservice 0/1 and AVAILABLE 0, and the currencyservice Service has an EMPTY endpoint list; CheckServiceConnectivity(currencyservice:7000) returned 'Connection Failed'. The pod events show 'Warning Unhealthy 0s (x10 over 80s) kubelet Readiness probe failed: timeout: failed to connect service "172.20.2.130:7001" within 1s', while the container log proves the process is healthy ('CurrencyService gRPC server started on port 7000') with no error logs and Restart Count 0 (

### case-42

- **结论**：`app/emailservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/emailservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 93,092
- **raw 日志**：[results/1014_1848_inorder4-v3b143/raw/1014_1848_boutique-runtime-42](../results/1014_1848_inorder4-v3b143/raw/1014_1848_boutique-runtime-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：emailservice pod emailservice-5795bc6dc5-tt6tf is 0/1 Running with Restart Count 0; kubelet events repeat 'Readiness probe failed: timeout: failed to connect service "172.20.1.56:8081" within 1s: context deadline exceeded' (x10). GetAppYAML shows readinessProbe.grpc.port=8081 while the container only exposes containerPort 8080, env PORT=8080, and livenessProbe correctly uses 8080 (so the container is never killed -> RESTARTS 0 everywhere). Source email_server.py binds only '[::]:'+os.environ.get('PORT','8080') and logs 'listening on port: 8080', so nothing listens on 8081. Consequence: the ema

### case-43

- **结论**：`app/productcatalogservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/productcatalogservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 66,266
- **raw 日志**：[results/1014_1850_inorder4-v3b144/raw/1014_1850_boutique-runtime-43](../results/1014_1850_inorder4-v3b144/raw/1014_1850_boutique-runtime-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only productcatalogservice is degraded: pod productcatalogservice-66d84469c7-pvlhv is 0/1 Running (Ready False, Restart Count 0) and Deployment productcatalogservice shows 0/1 AVAILABLE while all 10 peer services are 1/1 with 0 restarts. Pod events show 'Warning Unhealthy 2s (x10 over 82s) kubelet Readiness probe failed: timeout: failed to connect service "172.20.2.146:3551" within 1s: context deadline exceeded'. The container only serves on 3550 (containerPort 3550, env PORT=3550, app log 'starting grpc server at :3550'), while GetAppYAML shows readinessProbe.grpc.port: 3551 (livenessProbe co

### case-44

- **结论**：`app/recommendationservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/recommendationservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 115,895
- **raw 日志**：[results/1014_1851_inorder4-v3b145/raw/1014_1851_boutique-runtime-44](../results/1014_1851_inorder4-v3b145/raw/1014_1851_boutique-runtime-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object-layer scan of ns boutique shows a single outlier: pod recommendationservice-754c777cbc-brp8t is 0/1 Running (Deployment recommendationservice 0/1 AVAILABLE, all other pods/deployments 1/1). Pod describe: State Running, Restart Count 0, Ready False, with kubelet event 'Warning Unhealthy 1s (x11 over 81s) Readiness probe failed: timeout: failed to connect service "172.20.1.72:8081" within 1s'. Container logs show the process healthy and 'listening on port: 8080' with zero error logs. GetAppYAML(recommendationservice) shows readinessProbe.grpc.port=8081 while containerPort=8080, PORT=8080,

### case-45

- **结论**：`app/shippingservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/shippingservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 103,946
- **raw 日志**：[results/1014_1853_inorder4-v3b146/raw/1014_1853_boutique-runtime-45](../results/1014_1853_inorder4-v3b146/raw/1014_1853_boutique-runtime-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object-layer scan of namespace boutique: 10/11 pods 1/1 Running RESTARTS=0, only shippingservice-6fccf4868f-29764 is 0/1 Running (READY 0/1) and Deployment shippingservice shows AVAILABLE 0. Pod events repeatedly report 'Warning Unhealthy ... Readiness probe failed: timeout: failed to connect service "172.20.1.78:50052" within 1s' (x11 over 82s), with container State Running and Restart Count 0 (no OOMKilled/SIGTERM termination). GetAppYAML(shippingservice) shows the container serves gRPC on containerPort/env PORT 50051 (Service targetPort 50051) and the app log states 'Shipping Service listen

