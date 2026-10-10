# 评测明细 · boutique/runtime — cloudopsbench

> 本家族已跑 **1/45** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-10T07:45:15.018Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 9 | 0 | 0 | 1010_1545_boutique-runtime-1 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/adservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 9
- **摘要**：Only adservice pod (adservice-d6c9fcc6b-d4nlb, node worker-02) shows restarts: 'RESTARTS 2 (30s ago)'. DescribeResource shows Last State: Terminated, Reason Error, Exit Code 143 (kubelet SIGTERM, not OOMKilled 137), Restart Count 2, and Events: 'Liveness probe failed: Get "http://172.20.2.163:9555/": net/http: HTTP/1.x transport connection broken: malformed HTTP status code "\x00\x00\x00\x04..."' plus 'Killing: Container server failed liveness probe, will be restarted'. GetAppYAML shows the port is a gRPC port (Service port name 'grpc', port 9555) and the readinessProbe correctly uses grpc, wh

