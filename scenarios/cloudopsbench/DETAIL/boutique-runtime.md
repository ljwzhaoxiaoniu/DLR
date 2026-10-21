# 评测明细 · boutique/runtime — cloudopsbench

> 本家族已跑 **45/45** 题：JRA ✅45 ❌0 ｜ 证据链全闭 45 ｜ token 中位 112,348 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 98,863 | 0 | 0 | 1020_2001_tsm-v1-b2 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 97,393 | 0 | 0 | 1020_2320_tsm-v1-b35 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 99,724 | 0 | 0 | 1021_0121_tsm-v1-b68 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 98,403 | 0 | 0 | 1021_0221_tsm-v1-b98 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 97,833 | 0 | 0 | 1021_0255_tsm-v1-b115 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 111,328 | 0 | 0 | 1021_0258_tsm-v1-b117 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 97,404 | 0 | 0 | 1021_0302_tsm-v1-b119 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 97,497 | 0 | 0 | 1021_0306_tsm-v1-b121 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 94,615 | 0 | 0 | 1021_0310_tsm-v1-b123 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 96,343 | 0 | 0 | 1020_2006_tsm-v1-b5 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 94,670 | 0 | 0 | 1020_2011_tsm-v1-b8 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 95,475 | 0 | 0 | 1020_2017_tsm-v1-b11 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 95,146 | 0 | 0 | 1020_2022_tsm-v1-b14 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 99,786 | 0 | 0 | 1020_2241_tsm-v1-b17 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 96,085 | 0 | 0 | 1020_2247_tsm-v1-b20 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 96,573 | 0 | 0 | 1020_2256_tsm-v1-b23 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 102,363 | 0 | 0 | 1020_2302_tsm-v1-b26 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 124,247 | 0 | 0 | 1020_2309_tsm-v1-b29 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 116,060 | 0 | 0 | 1020_2315_tsm-v1-b32 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 154,709 | 0 | 0 | 1020_2327_tsm-v1-b38 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 123,462 | 0 | 0 | 1020_2333_tsm-v1-b41 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 11 | 181,008 | 0 | 0 | 1020_2338_tsm-v1-b44 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 124,980 | 0 | 0 | 1020_2345_tsm-v1-b47 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 124,117 | 0 | 0 | 1020_2350_tsm-v1-b50 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 153,289 | 0 | 0 | 1020_2357_tsm-v1-b53 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 107,716 | 0 | 0 | 1021_0054_tsm-v1-b56 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 107,478 | 0 | 0 | 1021_0101_tsm-v1-b59 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 148,430 | 0 | 0 | 1021_0107_tsm-v1-b62 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 164,422 | 0 | 0 | 1021_0115_tsm-v1-b65 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 156,913 | 0 | 0 | 1021_0127_tsm-v1-b71 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 134,240 | 0 | 0 | 1021_0134_tsm-v1-b74 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 115,161 | 0 | 0 | 1021_0140_tsm-v1-b77 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 123,045 | 0 | 0 | 1021_0146_tsm-v1-b80 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 149,022 | 0 | 0 | 1021_0152_tsm-v1-b83 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 122,673 | 0 | 0 | 1021_0156_tsm-v1-b85 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 142,317 | 0 | 0 | 1021_0201_tsm-v1-b88 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 118,968 | 0 | 0 | 1021_0207_tsm-v1-b91 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 135,634 | 0 | 0 | 1021_0211_tsm-v1-b93 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 98,748 | 0 | 0 | 1021_0218_tsm-v1-b96 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 98,131 | 0 | 0 | 1021_0227_tsm-v1-b101 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 117,526 | 0 | 0 | 1021_0231_tsm-v1-b103 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 142,565 | 0 | 0 | 1021_0237_tsm-v1-b106 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 143,480 | 0 | 0 | 1021_0242_tsm-v1-b108 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 112,348 | 0 | 0 | 1021_0246_tsm-v1-b110 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 111,465 | 0 | 0 | 1021_0251_tsm-v1-b113 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/adservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 98,863
- **raw 日志**：[results/1020_2001_tsm-v1-b2/raw/1020_2001_boutique-runtime-1](../results/1020_2001_tsm-v1-b2/raw/1020_2001_boutique-runtime-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice is the only outlying pod in namespace boutique: adservice-d6c9fcc6b-d4nlb shows RESTARTS 2 (30s ago) in a 90s-old pod while all 10 other services show RESTARTS 0. Pod detail shows Last State Terminated, Reason Error, Exit Code 143 (SIGTERM from kubelet, not 137/OOMKilled), and pod Events bind the mechanism verbatim: 'Warning Unhealthy ... Liveness probe failed: Get "http://172.20.2.163:9555/": net/http: HTTP/1.x transport connection broken: malformed HTTP status code "\x00\x00\x00\x04\b\x00..."' followed by 'Normal Killing ... Container server failed liveness probe, will be restarted

### case-2

- **结论**：`app/checkoutservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/checkoutservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 97,393
- **raw 日志**：[results/1020_2320_tsm-v1-b35/raw/1020_2323_boutique-runtime-2](../results/1020_2320_tsm-v1-b35/raw/1020_2323_boutique-runtime-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace boutique only checkoutservice-7f88d56cf6-zjb4s is an outlier: RESTARTS 2 (30s ago), Restart Count 3, while all other 10 pods show RESTARTS 0; GetAlerts() reports no metric anomaly, so the fault is in the container lifecycle. Pod events give the mechanism verbatim: Warning Unhealthy x9 'Liveness probe failed: Get "http://172.20.2.169:5050/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x06\x04\x00\x00\x00\x00\x00\x00\x05\x00\x00@\x00"' followed by Normal Killing x3 'Container server failed liveness probe, will be restarted'. Last State is Termin

### case-3

- **结论**：`app/currencyservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/currencyservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 99,724
- **raw 日志**：[results/1021_0121_tsm-v1-b68/raw/1021_0122_boutique-runtime-3](../results/1021_0121_tsm-v1-b68/raw/1021_0122_boutique-runtime-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only currencyservice-7595dc65b4-ks62n is an outlier in the pods listing: RESTARTS 2 (25s ago) while all other 10 pods show RESTARTS 0. Pod detail shows Last State Terminated, Reason Error, Exit Code 137 (not OOMKilled) with pod events: Warning Unhealthy 'Liveness probe failed: Get "http://172.20.2.175:7000/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x00\x04..."' (x9 over 81s) and Normal Killing 'Container server failed liveness probe, will be restarted' (x3). The returned bytes are HTTP/2 frame headers, i.e. kubelet probes a gRPC/HTTP2-only port with HT

### case-4

- **结论**：`app/emailservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/emailservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 98,403
- **raw 日志**：[results/1021_0221_tsm-v1-b98/raw/1021_0222_boutique-runtime-4](../results/1021_0221_tsm-v1-b98/raw/1021_0222_boutique-runtime-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows a single outlier: emailservice-68b7cdc49b-9fnrq READY 1/1 Running with RESTARTS 2 (25s ago) at only 90s age, while all other 10 pods have 0 restarts. Pod events bind the mechanism verbatim: 'Warning Unhealthy Liveness probe failed: Get http://172.20.1.99:8080/: net/http: HTTP/1.x transport connection broken: malformed HTTP response' followed by 'Normal Killing Container server failed liveness probe, will be restarted' (x3 in 61s). The returned bytes (\x00\x00\x1e\x04 ...) are an HTTP/2 SETTINGS frame, proving the container speaks gRPC/HTTP2 on 8080. GetAppYAML(em

### case-5

- **结论**：`app/paymentservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/paymentservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 97,833
- **raw 日志**：[results/1021_0255_tsm-v1-b115/raw/1021_0255_boutique-runtime-5](../results/1021_0255_tsm-v1-b115/raw/1021_0255_boutique-runtime-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing shows the only outlier: paymentservice-597747d4d8-jbdgb with RESTARTS 2 while all 10 other boutique pods are 0. Pod detail: Last State Terminated, Reason Error, Exit Code 137, Restart Count 2; pod events bind the mechanism verbatim: 'Warning Unhealthy 2s (x9 over 82s) kubelet Liveness probe failed: Get http://172.20.2.186:50051/: net/http: HTTP/1.x transport connection broken: malformed HTTP response \x00\x00\x00\x04\x00\x00\x00\x00...' plus 'Normal Killing 2s (x3 over 62s) kubelet Container server failed liveness probe, will be restarted'. The returned bytes are a gRPC/HTTP2 SETT

### case-6

- **结论**：`app/productcatalogservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/productcatalogservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 111,328
- **raw 日志**：[results/1021_0258_tsm-v1-b117/raw/1021_0258_boutique-runtime-6](../results/1021_0258_tsm-v1-b117/raw/1021_0258_boutique-runtime-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods 清单中仅 productcatalogservice-747b447754-r49cw 离群：RESTARTS 2 (30s ago)，其余服务全为 0；pod 详情显示 Restart Count 3、Ready False，Last State Terminated Reason Error Exit Code 2（非 137/OOMKilled，排除内存限额致死）。机制事件在 pod events 中逐字可见：Warning Unhealthy 'Liveness probe failed: Get "http://172.20.2.192:3550/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x06\x04..."' 以及 Normal Killing 'Container server failed liveness probe, will be restarted'；该字节串为 HTTP/2(gRPC) 帧，即 HTTP/1.1 探针打到 gRPC-only 端口。配置收口 GetAppYAML 证实：readinessProbe 用 grpc:3550（正确），而 livenessProbe 用 httpGet path=/ port

### case-7

- **结论**：`app/recommendationservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/recommendationservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 97,404
- **raw 日志**：[results/1021_0302_tsm-v1-b119/raw/1021_0302_boutique-runtime-7](../results/1021_0302_tsm-v1-b119/raw/1021_0302_boutique-runtime-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice pod recommendationservice-667699c9dd-cx2c9 on worker-02 is the only outlier: RESTARTS 2 (25s ago) while all other boutique pods show 0. Pod detail: Last State Terminated, Reason: Error, Exit Code 137, Restart Count 2. Pod events show the mechanism verbatim: 'Warning Unhealthy Liveness probe failed: Get http://172.20.2.198:8080/: net/http: HTTP/1.x transport connection broken: malformed HTTP response \x00\x00\x1e\x04\x00...' (those bytes are an HTTP/2/gRPC frame header) followed by 'Normal Killing Container server failed liveness probe, will be restarted' - so the 137 is a

### case-8

- **结论**：`app/shippingservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/shippingservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 97,497
- **raw 日志**：[results/1021_0306_tsm-v1-b121/raw/1021_0306_boutique-runtime-8](../results/1021_0306_tsm-v1-b121/raw/1021_0306_boutique-runtime-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing shows a single outlier: shippingservice-dcf97c8fd-lkfpz is 0/1 Running with 3 restarts (0s ago) while all other boutique pods are 1/1 with 0 restarts. Pod detail last_termination = Reason: Error, Exit Code: 2 (neither 137 OOMKilled nor 143 SIGTERM), ruling out a memory-limit kill. Pod events give the mechanism verbatim: 'Warning Unhealthy 3s (x9 over 83s) kubelet Liveness probe failed: Get "http://172.20.1.120:50051/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x06\x04..."' followed by 'Normal Killing 3s (x3 over 63s) kubelet Container server 

### case-9

- **结论**：`app/adservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/adservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 94,615
- **raw 日志**：[results/1021_0310_tsm-v1-b123/raw/1021_0310_boutique-runtime-9](../results/1021_0310_tsm-v1-b123/raw/1021_0310_boutique-runtime-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice pod adservice-645c94d6-9jrbk is the only outlier in the boutique pods listing (READY 1/1, RESTARTS 2, 28s ago) while all 10 peer services show 0 restarts. Pod detail shows Last State Terminated with Exit Code 143 (SIGTERM from kubelet, not 137/OOMKilled) and Restart Count 2, with events: Normal Killing 'Container server failed liveness probe, will be restarted' (x2 over 60s) and Warning Unhealthy 'Liveness probe failed: timeout: failed to connect service 172.20.1.125:8080 within 1s: context deadline exceeded' (x8 over 80s). GetErrorLogs(adservice) returned no error logs, indicating t

### case-10

- **结论**：`app/checkoutservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/checkoutservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 96,343
- **raw 日志**：[results/1020_2006_tsm-v1-b5/raw/1020_2007_boutique-runtime-10](../results/1020_2006_tsm-v1-b5/raw/1020_2007_boutique-runtime-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only checkoutservice-7ff8466b8f-stklt deviates in the boutique pod listing: RESTARTS=2 (29s ago) while all 10 peer pods show 0. Pod detail shows Last State Terminated with Reason=Error, Exit Code=2 (not OOMKilled 137, ruling out memory-limit kills), and the Events section carries the mechanism verbatim: 'Warning Unhealthy 0s (x9 over 80s) kubelet Liveness probe failed: timeout: failed to connect service "172.20.2.215:5051" within 1s: context deadline exceeded' followed by 'Normal Killing 0s (x3 over 60s) kubelet Container server failed liveness probe, will be restarted'. The container only lis

### case-11

- **结论**：`app/currencyservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/currencyservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 94,670
- **raw 日志**：[results/1020_2011_tsm-v1-b8/raw/1020_2012_boutique-runtime-11](../results/1020_2011_tsm-v1-b8/raw/1020_2012_boutique-runtime-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only currencyservice-68bd7787c9-z922l is an outlier in the namespace pod scan: RESTARTS 2 (14s ago) vs 0 for all other 10 pods. Pod detail shows container port 7000/TCP, Restart Count 2, Last State Terminated Reason=Error Exit Code=137 (SIGKILL, not OOMKilled), and Liveness: grpc <pod>:7001 while Readiness: grpc <pod>:7000. Kubelet events bind the mechanism verbatim: 'Container server failed liveness probe, will be restarted' and 'Warning Unhealthy Liveness probe failed: timeout: failed to connect service "172.20.2.221:7001" within 1s: context deadline exceeded'. GetAppYAML(currencyservice) co

### case-12

- **结论**：`app/emailservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/emailservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 95,475
- **raw 日志**：[results/1020_2017_tsm-v1-b11/raw/1020_2018_boutique-runtime-12](../results/1020_2017_tsm-v1-b11/raw/1020_2018_boutique-runtime-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod emailservice-db586b659-tg9kn is the only outlier among 11 boutique pods (RESTARTS 2 (14s ago) vs 0 for all peers). DescribeResource shows Last State Terminated, Reason: Error, Exit Code 137, with kubelet events 'Killing ... Container server failed liveness probe, will be restarted' (x2) and Warning 'Liveness probe failed: timeout: failed to connect service "172.20.2.227:8081" within 1s: context deadline exceeded' (x7). GetAppYAML(emailservice) confirms the mismatch: containerPort 8080, env PORT=8080, readinessProbe grpc port 8080 (passes, container Ready True), but livenessProbe grpc port 

### case-13

- **结论**：`app/paymentservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/paymentservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 95,146
- **raw 日志**：[results/1020_2022_tsm-v1-b14/raw/1020_2023_boutique-runtime-13](../results/1020_2022_tsm-v1-b14/raw/1020_2023_boutique-runtime-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only paymentservice-57b96767-95rmd is the outlier in the pod sheet: RESTARTS 2 (14s ago) while all other 10 boutique pods show 0 restarts. Pod detail shows Last State Terminated, Reason: Error, Exit Code 137, and pod events bind the mechanism verbatim: 'Warning Unhealthy 1s (x7 over 81s) kubelet Liveness probe failed: timeout: failed to connect service "172.20.1.146:50052" within 1s: context deadline exceeded' followed by 'Normal Killing 21s (x2 over 61s) kubelet Container server failed liveness probe, will be restarted'. The container actually serves on 50051 (Port 50051/TCP, env PORT=50051, 

### case-14

- **结论**：`app/productcatalogservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/productcatalogservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 99,786
- **raw 日志**：[results/1020_2241_tsm-v1-b17/raw/1020_2242_boutique-runtime-14](../results/1020_2241_tsm-v1-b17/raw/1020_2242_boutique-runtime-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing in boutique showed a single outlier: productcatalogservice-6dd77c8957-rqvzs with RESTARTS 2 (29s ago) while all 10 peer pods had RESTARTS 0. Pod detail showed Restart Count 3, Ready False, Last State Terminated (Reason Error, Exit Code 2) and kubelet events 'Warning Unhealthy 1s (x9 over 81s) Liveness probe failed: timeout: failed to connect service "172.20.2.238:3551" within 1s: context deadline exceeded' followed by 'Normal Killing 1s (x3 over 61s) Container server failed liveness probe, will be restarted'. The probe line reads 'Liveness: grpc <pod>:3551' while the container serv

### case-15

- **结论**：`app/recommendationservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/recommendationservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 96,085
- **raw 日志**：[results/1020_2247_tsm-v1-b20/raw/1020_2248_boutique-runtime-15](../results/1020_2247_tsm-v1-b20/raw/1020_2248_boutique-runtime-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 命名空间 pod 清单中 recommendationservice-644bfcf4c5-tcn2x 是唯一离群行（RESTARTS 2, 14s ago），其余 10 个 pod 均 RESTARTS 0。GetErrorLogs 无错误日志，GetAlerts 无活跃告警，说明重启非业务代码崩溃。DescribeResource(pod) 显示 containerPort 8080、readinessProbe grpc 8080，但 livenessProbe 为 grpc <pod>:8081，Last State Terminated Exit Code 137；pod events 逐字给出机制: Warning Unhealthy 'Liveness probe failed: timeout: failed to connect service "172.20.2.244:8081" within 1s: context deadline exceeded' 与 Normal Killing 'Container server failed liveness probe, will be restarted'。GetAppYAML(recommendationservice) 证实配置自相矛盾: env PORT=8080、containerPo

### case-16

- **结论**：`app/shippingservice` + `liveness_probe_incorrect_port` ｜ 标签 `app/shippingservice` + `liveness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 96,573
- **raw 日志**：[results/1020_2256_tsm-v1-b23/raw/1020_2257_boutique-runtime-16](../results/1020_2256_tsm-v1-b23/raw/1020_2257_boutique-runtime-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：First-round pod scan showed the only outlier row: shippingservice-76fd56c499-2b5j7 with RESTARTS 2 (29s ago), READY 1/1, while all 10 peer pods had 0 restarts. Pod detail: containers.server Last State = Terminated, Reason: Error, Exit Code: 2 (not OOMKilled 137, not SIGTERM 143), Restart Count: 3, Ready: False; Events show 'Warning Unhealthy 2s (x9 over 82s) kubelet Liveness probe failed: timeout: failed to connect service "172.20.2.250:50052" within 1s: context deadline exceeded' and 'Normal Killing 2s (x3 over 62s) kubelet Container server failed liveness probe, will be restarted'. Deploymen

### case-17

- **结论**：`app/adservice` + `liveness_probe_incorrect_timing` ｜ 标签 `app/adservice` + `liveness_probe_incorrect_timing`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 102,363
- **raw 日志**：[results/1020_2302_tsm-v1-b26/raw/1020_2303_boutique-runtime-17](../results/1020_2302_tsm-v1-b26/raw/1020_2303_boutique-runtime-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods scan shows a single outlier: adservice-75d5d88689-7djn4 0/1 CrashLoopBackOff, 4 restarts on worker-02, while all 10 peer pods are 1/1 Running with 0 restarts; alerts empty and adservice produced no error logs (Java server never finished booting). Pod detail: Last State Terminated Reason Error Exit Code 143 (SIGTERM from kubelet, NOT 137/OOMKilled) with image already pulled and ServiceAccount adservice present. Mechanism event: 'Liveness probe failed: timeout: failed to connect service 172.20.2.186:9555 within 1s: context deadline exceeded' -> 'Container server failed liveness pro

### case-18

- **结论**：`app/currencyservice` + `liveness_probe_incorrect_timing` ｜ 标签 `app/currencyservice` + `liveness_probe_incorrect_timing`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 124,247
- **raw 日志**：[results/1020_2309_tsm-v1-b29/raw/1020_2309_boutique-runtime-18](../results/1020_2309_tsm-v1-b29/raw/1020_2309_boutique-runtime-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace boutique only currencyservice is outlier on the object sheet: currencyservice-6c5cd895d9-wszxs RESTARTS 5 (45s ago) while all other 10 pods show 0. Pod detail last termination = Reason: Error, Exit Code 137 (SIGKILL, not OOMKilled); pod events bind the mechanism verbatim: 'Liveness probe failed: timeout: failed to connect service "172.20.1.147:7000" within 1s: context deadline exceeded' then 'Container server failed liveness probe, will be restarted' and 'Back-off restarting failed container server'. Logs show no application errors (GetErrorLogs: none) and the gRPC server only bec

### case-19

- **结论**：`app/emailservice` + `liveness_probe_incorrect_timing` ｜ 标签 `app/emailservice` + `liveness_probe_incorrect_timing`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 116,060
- **raw 日志**：[results/1020_2315_tsm-v1-b32/raw/1020_2316_boutique-runtime-19](../results/1020_2315_tsm-v1-b32/raw/1020_2316_boutique-runtime-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod sheet outlier: emailservice-75d7c8757-7pmzv is 0/1 CrashLoopBackOff with RESTARTS=4 while all other 10 boutique pods are 1/1 Running with 0 restarts. Pod detail shows Last State: Terminated, Reason: Error, Exit Code: 137, and its Events give the mechanism verbatim: 'Warning Unhealthy  Liveness probe failed: timeout: failed to connect service "172.20.1.163:8080" within 1s: context deadline exceeded' followed by 'Normal Killing  Container server failed liveness probe, will be restarted' and 'Warning BackOff  Back-off restarting failed container server'. Namepace events repeat the same chain 

### case-20

- **结论**：`app/paymentservice` + `liveness_probe_incorrect_timing` ｜ 标签 `app/paymentservice` + `liveness_probe_incorrect_timing`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 154,709
- **raw 日志**：[results/1020_2327_tsm-v1-b38/raw/1020_2328_boutique-runtime-20](../results/1020_2327_tsm-v1-b38/raw/1020_2328_boutique-runtime-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods 全量扫描仅 paymentservice-55d4c9b59-cc5z2 离群：RESTARTS 3 (84s ago)，其余 10 个 pod 均 RESTARTS=0。Pod 详情 Last State: Terminated, Reason: Error, Exit Code: 137，Started 15:51:58 / Finished 15:52:06（存活仅 8s），Restart Count 3；kubelet 事件逐字绑定机制：Warning Unhealthy 'Liveness probe failed: timeout: failed to connect service 172.20.2.236:50051 within 1s: context deadline exceeded'、Normal Killing 'Container server failed liveness probe, will be restarted'、Warning BackOff 'Back-off restarting failed container server'。即重启是被 kubelet 因 liveness 失败 Kill 后重启，Reason 非 OOMKilled。应用侧排除崩溃：GetErrorLogs(paymentservic

### case-21

- **结论**：`app/recommendationservice` + `liveness_probe_incorrect_timing` ｜ 标签 `app/recommendationservice` + `liveness_probe_incorrect_timing`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 123,462
- **raw 日志**：[results/1020_2333_tsm-v1-b41/raw/1020_2333_boutique-runtime-21](../results/1020_2333_tsm-v1-b41/raw/1020_2333_boutique-runtime-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one pod in boutique is off-nominal: recommendationservice-649b47b8f5-w7zd6 (READY 0/1, RESTARTS 5, Deployment recommendationservice 0/1 AVAILABLE 0); all 10 other services are 1/1 Running with 0 restarts and GetAlerts() shows no metric anomalies. The restart is caused by the liveness probe, not the app: pod Last State Terminated Reason Error Exit Code 137 with event 'Normal Killing ... Container server failed liveness probe, will be restarted' (not OOMKilled, memory limit 128Mi). Probe message: 'Warning Unhealthy ... Liveness probe failed: timeout: failed to connect service 172.20.2.254:8

### case-22

- **结论**：`app/adservice` + `container_memory_limit_too_low` ｜ 标签 `app/adservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 11 · tokens 181,008
- **raw 日志**：[results/1020_2338_tsm-v1-b44/raw/1020_2339_boutique-runtime-22](../results/1020_2338_tsm-v1-b44/raw/1020_2339_boutique-runtime-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory scan shows a single outlier: adservice-74c7f4c787-8g8cs 0/1 ContainerCreating (all other boutique pods 1/1 Running); frontend error log and GetAlerts are clean, so the fault is workload-availability, not a call path. DescribeResource on that pod returns 'Status: Pending, State: Waiting, Reason: ContainerCreating, Restart Count: 0' with the mechanism event 'Warning FailedCreatePodSandBox: Failed to create pod sandbox: rpc error: code = Unknown desc = failed to create containerd task: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container p

### case-23

- **结论**：`app/cartservice` + `container_memory_limit_too_low` ｜ 标签 `app/cartservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 124,980
- **raw 日志**：[results/1020_2345_tsm-v1-b47/raw/1020_2345_boutique-runtime-23](../results/1020_2345_tsm-v1-b47/raw/1020_2345_boutique-runtime-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: cartservice Service had no endpoints ('cartservice <none>') and an active TCP probe to its own declared port 7070 returned 'Connection Failed', while the entry caller frontend's error log was clean (only benign GCE metadata noise). Anchored pods listing in boutique showed exactly one outlier: cartservice-8c5b58976-49rrx 0/1 ContainerCreating (all 10 other services 1/1 Running). Pod detail: PodScheduled True on worker-01, Status Pending, container State Waiting/Reason ContainerCreating, Restart Count 0 - so neither crash-restart nor scheduling failure, the container was neve

### case-24

- **结论**：`app/checkoutservice` + `container_memory_limit_too_low` ｜ 标签 `app/checkoutservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 124,117
- **raw 日志**：[results/1020_2350_tsm-v1-b50/raw/1020_2351_boutique-runtime-24](../results/1020_2350_tsm-v1-b50/raw/1020_2351_boutique-runtime-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods listing showed a single outlier: checkoutservice-79cc47d4c5-7q259 0/1 ContainerCreating on worker-03 (all peers 1/1 Running). Victim Service checkoutservice declares 5050/TCP but its endpoints are <none>, i.e. no ready address bound -> 'Service Availability Disruption'. Pod sheet: PodScheduled=True and event 'Normal Scheduled ... Successfully assigned boutique/checkoutservice-79cc47d4c5-7q259 to worker-03' (scheduling fine), but repeated 'Warning FailedCreatePodSandBox 1s (x3 over 30s) kubelet: failed to create containerd task: failed to create shim task: OCI runtime create faile

### case-25

- **结论**：`app/emailservice` + `container_memory_limit_too_low` ｜ 标签 `app/emailservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 153,289
- **raw 日志**：[results/1020_2357_tsm-v1-b53/raw/1020_2358_boutique-runtime-25](../results/1020_2357_tsm-v1-b53/raw/1020_2358_boutique-runtime-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows a single outlier: emailservice-6ddd77457-tzhbg 0/1 ContainerCreating (Pending, 0 restarts) on worker-03, while all other 10 boutique pods are 1/1 Running. Symptom side: emailservice Service (ClusterIP 10.68.98.214, declared port 5000/TCP) has ENDPOINTS <none> and the TCP probe to port 5000 returns Connection Failed; caller checkoutservice error logs are clean. The pod was Scheduled successfully, so placement is not the fault. Its own event gives the mechanism verbatim: 'Warning FailedCreatePodSandBox (x3 over 31s) kubelet: Failed to create pod sandbox: rpc error:

### case-26

- **结论**：`app/frontend` + `container_memory_limit_too_low` ｜ 标签 `app/frontend` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 107,716
- **raw 日志**：[results/1021_0054_tsm-v1-b56/raw/1021_0055_boutique-runtime-26](../results/1021_0054_tsm-v1-b56/raw/1021_0055_boutique-runtime-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 中唯一离群工作负载为 frontend-5b4698b8c7-4462b (0/1, CrashLoopBackOff, RESTARTS 2)，其余 10 个服务均 1/1 Running，与 'Partial Service Unreachability' 吻合。frontend GetErrorLogs / GetRecentLogs 均无输出（故障不在应用调用层）。Service frontend (ClusterIP 10.68.134.29, 80 -> targetPort 8080, selector app=frontend) 配置正确且 selector 可匹配，但 endpoints 为 <none>，无 Ready Pod 绑定，调用方因此不可达。DescribeResource(pod) 给出断点：Last State Terminated / Reason StartError / Exit Code 128，Message 'failed to create containerd task: OCI runtime create failed: runc create failed: unable to start container process: container init was OOM-killed (memory lim

### case-27

- **结论**：`app/paymentservice` + `container_memory_limit_too_low` ｜ 标签 `app/paymentservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 107,478
- **raw 日志**：[results/1021_0101_tsm-v1-b59/raw/1021_0102_boutique-runtime-27](../results/1021_0101_tsm-v1-b59/raw/1021_0102_boutique-runtime-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 10 boutique pods are 1/1 Running except paymentservice-8694bc5949-9p4xp (0/1 ContainerCreating on worker-03). Its own pod sheet shows PodScheduled=True (scheduling is healthy) but the kubelet event reads: 'Warning FailedCreatePodSandBox (x3 over 31s): Failed to create pod sandbox: ... failed to create containerd task: ... runc create failed: unable to start container process: container init was OOM-killed (memory limit too low?)'. The deployment config confirms the cause: GetAppYAML(paymentservice) sets resources.requests.memory=5Mi and limits.memory=5Mi (far below what the container/init 

### case-28

- **结论**：`app/productcatalogservice` + `container_memory_limit_too_low` ｜ 标签 `app/productcatalogservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 148,430
- **raw 日志**：[results/1021_0107_tsm-v1-b62/raw/1021_0107_boutique-runtime-28](../results/1021_0107_tsm-v1-b62/raw/1021_0107_boutique-runtime-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory in boutique shows a single outlier: productcatalogservice-6bdfff7c55-bntnp is 0/1 ContainerCreating on worker-01 while all 10 other pods are 1/1 Running with 0 restarts. The pod's own sheet shows PodScheduled=True (Successfuln assigned to worker-01), so scheduling/cordon/affinity/capacity are excluded, but PodReadyToStartContainers=False with a repeating Warning event: FailedCreatePodSandBox (x3 over 31s) from kubelet - 'Failed to create pod sandbox: rpc error: code = Unknown desc = failed to create containerd task: failed to create shim task: OCI runtime create failed: runc cre

### case-29

- **结论**：`app/redis-cart` + `container_memory_limit_too_low` ｜ 标签 `app/redis-cart` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 164,422
- **raw 日志**：[results/1021_0115_tsm-v1-b65/raw/1021_0115_boutique-runtime-29](../results/1021_0115_tsm-v1-b65/raw/1021_0115_boutique-runtime-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entry caller) error logs contain only benign GCE metadata noise and cartservice has no error logs, so the chain moved to the inventory: exactly one outlier among 11 pods - redis-cart-754cf58cb4-42f8g is 0/1 ContainerCreating with IP <none> on worker-02 while all peers are 1/1 Running with 0 restarts. Signal side closed on the Service's own declared port: CheckServiceConnectivity(redis-cart, 6379/TCP) returned 'Connection Failed' and endpoints redis-cart returned '<none>', matching the 'partial' wording (only the cart path is broken). Pod sheet shows PodScheduled=True with event 'Norm

### case-30

- **结论**：`app/shippingservice` + `container_memory_limit_too_low` ｜ 标签 `app/shippingservice` + `container_memory_limit_too_low`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 156,913
- **raw 日志**：[results/1021_0127_tsm-v1-b71/raw/1021_0128_boutique-runtime-30](../results/1021_0127_tsm-v1-b71/raw/1021_0128_boutique-runtime-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: CheckServiceConnectivity(shippingservice, 50051 - the port its own Service declares) returned 'Connection Failed', and GetResources(endpoints, shippingservice) showed ENDPOINTS '<none>' - no ready pod serving the Service, so the availability disruption is confirmed. The pods listing had exactly one outlier row: shippingservice-84778d9f49-l8d2p 0/1 ContainerCreating on worker-03, while all other 10 pods were 1/1 Running. DescribeResource(pod) shows PodScheduled=True (scheduling excluded) and PodReadyToStartContainers=False with the mechanism event: Warning FailedCreatePodSan

### case-31

- **结论**：`app/adservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/adservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 134,240
- **raw 日志**：[results/1021_0134_tsm-v1-b74/raw/1021_0135_boutique-runtime-31](../results/1021_0134_tsm-v1-b74/raw/1021_0135_boutique-runtime-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice pod adservice-7446b5cf5d-4fv94 is the only outlier: READY 0/1 Running, RESTARTS 0, Restart Count 0 with no last_termination (no OOMKilled 137 / SIGTERM 143) - the process is alive but never becomes Ready. Pod events show a repeating readiness failure: 'Warning Unhealthy 0s (x9 over 80s) kubelet Readiness probe failed: Get http://172.20.1.249:9555/: net/http: HTTP/1.x transport connection broken: malformed HTTP status code "\x00\x00\x00\x04\b..."' - the bytes returned are gRPC/HTTP2 frame data, not an HTTP/1.x status line. Deployment YAML confirms the misconfiguration: readinessProbe.

### case-32

- **结论**：`app/checkoutservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/checkoutservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 115,161
- **raw 日志**：[results/1021_0140_tsm-v1-b77/raw/1021_0141_boutique-runtime-32](../results/1021_0140_tsm-v1-b77/raw/1021_0141_boutique-runtime-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: checkoutservice-74fc7d4686-9vlrn is 0/1 Running (READY False) while all 10 peer pods are 1/1; container Restart Count is 0 and there is no OOMKilled/137 or SIGTERM/143 last-termination state, so this is not a memory-limit or kubelet-kill restart. The pod Events record the mechanism: 'Warning Unhealthy 1s (x11 over 81s) kubelet Readiness probe failed: Get "http://172.20.2.80:5050/health": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x06\x04..."' — the returned bytes are an HTTP/2 SETTINGS frame, proving port 5050 speaks g

### case-33

- **结论**：`app/currencyservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/currencyservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 123,045
- **raw 日志**：[results/1021_0146_tsm-v1-b80/raw/1021_0146_boutique-runtime-33](../results/1021_0146_tsm-v1-b80/raw/1021_0146_boutique-runtime-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller frontend logs (362 hits, 18.6%) show 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.153.49:7000: connect: connection refused'. Pod scan: only currencyservice-665c44c9f4-5p79r is outlier at 0/1 Running (Ready False, Restart Count 0). Pod events: Warning Unhealthy x11 - Readiness probe failed: Get "http://172.20.1.7:7000/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x00\x04..." (HTTP/2 SETTINGS frame => the port answers gRPC/h2). Deployment YAML confirms container port 7000 is named grpc and livenessProbe uses grpc p

### case-34

- **结论**：`app/emailservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/emailservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 149,022
- **raw 日志**：[results/1021_0152_tsm-v1-b83/raw/1021_0152_boutique-runtime-34](../results/1021_0152_tsm-v1-b83/raw/1021_0152_boutique-runtime-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod emailservice-77bbb89876-x85qb is the only outlier in the boutique pod sheet: READY 0/1 Running while all 10 peers are 1/1, Restart Count 0 and last_termination empty (rules out OOMKilled 137 / kubelet SIGTERM 143). Pod events bind the mechanism verbatim: Warning Unhealthy x10 over 82s 'Readiness probe failed: Get "http://172.20.2.91:8080/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x1e\x04..."' - the port answered with HTTP/2 (gRPC) frames because the server speaks gRPC. Deployment config confirms the break: readinessProbe httpGet path / port 8080 ag

### case-35

- **结论**：`app/paymentservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/paymentservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 122,673
- **raw 日志**：[results/1021_0156_tsm-v1-b85/raw/1021_0157_boutique-runtime-35](../results/1021_0156_tsm-v1-b85/raw/1021_0157_boutique-runtime-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts() 无告警；pods 全量扫描唯一离群行为 paymentservice-6fbb5fdcd6-krhgt 0/1 Running（其余 pod 均 1/1、RESTARTS=0）。Pod 详情：Restart Count 0，Liveness 为 grpc :50051（正确），Readiness 为 http-get http://:50051/，事件 Warning Unhealthy x11 over 82s: 'Readiness probe failed: Get "http://172.20.2.97:50051/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x00\x04\x00\x00\x00\x00\x00\x00\x00\b\a..."' —— 返回的是 HTTP/2 gRPC 帧头，说明 TCP 连通、服务端确实在 50051 应答，断点在探针协议而非端口。GetAppYAML(paymentservice) 确认 readinessProbe 使用 httpGet path=/ port=50051（而 livenessProbe 正确使用 grpc），containerPort/PORT/Service targ

### case-36

- **结论**：`app/productcatalogservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/productcatalogservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 142,317
- **raw 日志**：[results/1021_0201_tsm-v1-b88/raw/1021_0202_boutique-runtime-36](../results/1021_0201_tsm-v1-b88/raw/1021_0202_boutique-runtime-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：productcatalogservice-695767b548-2x2xc is the only outlier pod (0/1 Running) though Restart Count is 0 and the container State is Running with Started 18:42:59 — no 137/143 last-termination, so it is not OOM or a kubelet SIGTERM kill. The sole Warning event states verbatim: Readiness probe failed: Get "http://172.20.2.102:3550/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x06\x04\x00\x00\x00\x00\x00\x00\x05\x00\x00@\x00" (x11 over 82s) — those bytes are the HTTP/2 frame preface returned by a gRPC server to an HTTP/1.1 httpGet probe, proving the port 3550 

### case-37

- **结论**：`app/recommendationservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/recommendationservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 118,968
- **raw 日志**：[results/1021_0207_tsm-v1-b91/raw/1021_0207_boutique-runtime-37](../results/1021_0207_tsm-v1-b91/raw/1021_0207_boutique-runtime-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in boutique: pod recommendationservice-68d8957488-2l4kj is 0/1 Running (READY False, Ready False, ContainersReady False) while all other 10 pods are 1/1; Restart Count 0 and app logs show a healthy server ('listening on port: 8080'). Pod events carry the mechanism: 'Warning Unhealthy 3s (x10 over 83s) kubelet Readiness probe failed: Get "http://172.20.2.107:8080/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x1e\x04\x00..."' — the payload is an HTTP/2 SETTINGS frame, proving the HTTP/1.x GET probe hits a gRPC-only port. GetAppYAML confirms the

### case-38

- **结论**：`app/shippingservice` + `readiness_probe_incorrect_protocol` ｜ 标签 `app/shippingservice` + `readiness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 135,634
- **raw 日志**：[results/1021_0211_tsm-v1-b93/raw/1021_0212_boutique-runtime-38](../results/1021_0211_tsm-v1-b93/raw/1021_0212_boutique-runtime-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows a single outlier: shippingservice-546b9d5bcb-42mk8 is 0/1 Running (all 10 other pods are 1/1 Running, and no cluster alerts fire). Pod detail: Ready=False, ContainersReady=False, Restart Count=0, State=Running with Normal Created/Started events and image already present, so this is not OOMKilled(137), SIGTERM(143), image-pull or scheduling. The only Warning event is 'Readiness probe failed: Get "http://172.20.2.113:50051/": net/http: HTTP/1.x transport connection broken: malformed HTTP response "\x00\x00\x06\x04..."' (x10 over 83s) — the response body is an HTTP/

### case-39

- **结论**：`app/adservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/adservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 98,748
- **raw 日志**：[results/1021_0218_tsm-v1-b96/raw/1021_0218_boutique-runtime-39](../results/1021_0218_tsm-v1-b96/raw/1021_0218_boutique-runtime-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod adservice-7b9d8c87cf-gpwlc on worker-01 is 0/1 Running with Ready=False and Restart Count 0, while all other 10 boutique pods are 1/1. Pod Events carry the mechanism verbatim: 'Warning Unhealthy 4s (x10 over 80s) kubelet Readiness probe failed: timeout: failed to connect service \"172.20.1.39:9556\" within 1s: context deadline exceeded'. GetAppYAML(adservice) confirms the mismatch: the container declares ports.containerPort 9555 with env PORT=9555 and livenessProbe grpc port 9555 (correct, hence zero restarts), but readinessProbe grpc port 9556 where nothing listens, so the readiness probe

### case-40

- **结论**：`app/checkoutservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/checkoutservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 98,131
- **raw 日志**：[results/1021_0227_tsm-v1-b101/raw/1021_0227_boutique-runtime-40](../results/1021_0227_tsm-v1-b101/raw/1021_0227_boutique-runtime-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod checkoutservice-757c84f65-48bhl is 0/1 Running (the only non-1/1 row among 11 pods) on worker-02. Pod detail: container port 5050/TCP, PORT=5050, Ready=False, Restart Count=0, Liveness grpc <pod>:5050, Readiness grpc <pod>:5051; events show 'Warning Unhealthy 10s (x9 over 80s) kubelet  Readiness probe failed: timeout: failed to connect service "172.20.2.125:5051" within 1s: context deadline exceeded'. Deployment YAML confirms readinessProbe grpc port 5051 while the container only declares containerPort 5050, so the readiness probe can never succeed while liveness on 5050 stays healthy (no 

### case-41

- **结论**：`app/currencyservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/currencyservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 117,526
- **raw 日志**：[results/1021_0231_tsm-v1-b103/raw/1021_0232_boutique-runtime-41](../results/1021_0231_tsm-v1-b103/raw/1021_0232_boutique-runtime-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in namespace boutique: only outlier is currencyservice-7cc975cfff-nk87k, showing 0/1 READY (all other 10 services 1/1), RESTARTS 0. Pod detail shows container port 7000/TCP with env PORT=7000, Liveness grpc <pod>:7000 (correct), but Readiness grpc <pod>:7001, Ready=False. Pod events carry the mechanism verbatim: 'Warning Unhealthy 0s (x10 over 80s) kubelet Readiness probe failed: timeout: failed to connect service "172.20.2.130:7001" within 1s: context deadline exceeded'. GetAppYAML confirms the misconfiguration: spec.template.spec.containers[server].readinessProbe.grpc.port = 700

### case-42

- **结论**：`app/emailservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/emailservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 142,565
- **raw 日志**：[results/1021_0237_tsm-v1-b106/raw/1021_0237_boutique-runtime-42](../results/1021_0237_tsm-v1-b106/raw/1021_0237_boutique-runtime-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods sheet in boutique showed a single outlier: emailservice-5795bc6dc5-tt6tf is 0/1 (Running, Restart Count 0) while all 10 peer services are 1/1 Running. Pod events gave the mechanism verbatim: 'Warning Unhealthy 1s (x10 over 81s) kubelet Readiness probe failed: timeout: failed to connect service "172.20.1.56:8081" within 1s: context deadline exceeded'. Pod detail shows Port 8080/TCP, env PORT=8080, Liveness grpc 8080 (succeeds -> container Running, no restarts), Readiness grpc 8081 (never succeeds). GetAppYAML(emailservice) confirms readinessProbe.grpc.port=8081 while containerPort=8080 and

### case-43

- **结论**：`app/productcatalogservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/productcatalogservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 143,480
- **raw 日志**：[results/1021_0242_tsm-v1-b108/raw/1021_0242_boutique-runtime-43](../results/1021_0242_tsm-v1-b108/raw/1021_0242_boutique-runtime-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：productcatalogservice pod productcatalogservice-66d84469c7-pvlhv is Running but Ready=False (ContainersReady=False), Restart Count 0, and deployment productcatalogservice is 0/1 AVAILABLE; kubelet events show 'Warning Unhealthy (x10 over 82s) Readiness probe failed: timeout: failed to connect service \"172.20.2.146:3551\" within 1s: context deadline exceeded'. GetAppYAML confirms containerPort 3550 / PORT=3550 / livenessProbe.grpc.port 3550 but readinessProbe.grpc.port 3551 - the readiness probe targets a port the Go server never listens on, so it can never succeed. Consequently GetResources(e

### case-44

- **结论**：`app/recommendationservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/recommendationservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 112,348
- **raw 日志**：[results/1021_0246_tsm-v1-b110/raw/1021_0246_boutique-runtime-44](../results/1021_0246_tsm-v1-b110/raw/1021_0246_boutique-runtime-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod recommendationservice-754c777cbc-brp8t is the only outlier: 0/1 Running with Restart Count 0, Ready False, ContainersReady False. kubelet event: "Warning Unhealthy 1s (x11 over 81s) Readiness probe failed: timeout: failed to connect service \"172.20.1.72:8081\" within 1s: context deadline exceeded". GetAppYAML(recommendationservice) confirms the mismatch in the pod template: containerPort 8080 and env PORT=8080, livenessProbe grpc port 8080 (passes, so the container is never restarted), but readinessProbe grpc port 8081 where nothing listens. Service mapping itself is correct (port 8080 ->

### case-45

- **结论**：`app/shippingservice` + `readiness_probe_incorrect_port` ｜ 标签 `app/shippingservice` + `readiness_probe_incorrect_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 111,465
- **raw 日志**：[results/1021_0251_tsm-v1-b113/raw/1021_0251_boutique-runtime-45](../results/1021_0251_tsm-v1-b113/raw/1021_0251_boutique-runtime-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod sheet is the entry point: shippingservice-6fccf4868f-29764 is the only off-nominal row, 0/1 READY (Running, Restart Count: 0) while all 10 peers are 1/1. Alerts surface is clean and GetErrorLogs(shippingservice) returns no error logs, so the app process is not crashing. Pod Events give the mechanism verbatim: 'Warning Unhealthy 2s (x11 over 82s) kubelet: Readiness probe failed: timeout: failed to connect service "172.20.1.78:50052" within 1s: context deadline exceeded'. The container declares Port 50051/TCP with env PORT=50051, and livenessProbe grpc port 50051 succeeds, but readinessProbe

