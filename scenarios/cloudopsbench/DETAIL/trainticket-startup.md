# 评测明细 · train-ticket/startup — cloudopsbench

> 本家族已跑 **24/24** 题：JRA ✅24 ❌0 ｜ 证据链全闭 24 ｜ token 中位 241,116 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 218,453 | 0 | 0 | 1020_2002_tsm-v1-b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 224,962 | 0 | 0 | 1020_2323_tsm-v1-b36 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 330,323 | 0 | 0 | 1020_2359_tsm-v1-b54 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 252,248 | 0 | 0 | 1021_0056_tsm-v1-b57 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 247,092 | 0 | 0 | 1021_0103_tsm-v1-b60 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 239,637 | 0 | 0 | 1021_0109_tsm-v1-b63 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 258,703 | 0 | 0 | 1021_0117_tsm-v1-b66 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 229,555 | 0 | 0 | 1021_0123_tsm-v1-b69 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 208,766 | 0 | 0 | 1021_0129_tsm-v1-b72 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 347,805 | 0 | 0 | 1020_2008_tsm-v1-b6 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 227,376 | 0 | 0 | 1020_2013_tsm-v1-b9 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 207,163 | 0 | 0 | 1020_2018_tsm-v1-b12 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 211,153 | 0 | 0 | 1020_2024_tsm-v1-b15 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 306,965 | 0 | 0 | 1020_2243_tsm-v1-b18 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 252,345 | 0 | 0 | 1020_2249_tsm-v1-b21 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 366,082 | 0 | 0 | 1020_2258_tsm-v1-b24 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 249,176 | 0 | 0 | 1020_2304_tsm-v1-b27 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 230,546 | 0 | 0 | 1020_2311_tsm-v1-b30 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 166,166 | 0 | 0 | 1020_2317_tsm-v1-b33 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 263,165 | 0 | 0 | 1020_2329_tsm-v1-b39 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 243,979 | 0 | 0 | 1020_2334_tsm-v1-b42 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 236,552 | 0 | 0 | 1020_2340_tsm-v1-b45 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 241,116 | 0 | 0 | 1020_2346_tsm-v1-b48 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 238,404 | 0 | 0 | 1020_2353_tsm-v1-b51 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/ts-assurance-service` + `missing_secret_binding` ｜ 标签 `app/ts-assurance-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 218,453
- **raw 日志**：[results/1020_2002_tsm-v1-b3/raw/1020_2003_trainticket-startup-1](../results/1020_2002_tsm-v1-b3/raw/1020_2003_trainticket-startup-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one pod is an outlier in the train-ticket pod inventory: ts-assurance-service-f84b798d-h2tkp is 0/1 in CreateContainerConfigError while all other services are 1/1 Running; the sole alert points at ts-assurance-service with 503s on Get assurance types, and CheckServiceConnectivity to the Service's own declared port 18888 fails from worker-01, worker-02 and worker-03 alike (Service-level, not node-level). The pod's own sheet gives the mechanism verbatim: 'Warning Failed (x12 over 4m56s) kubelet  Error: secret "ts-assurance-mysql" not found', with PodScheduled=True and image 'already present

### case-2

- **结论**：`app/ts-auth-service` + `missing_secret_binding` ｜ 标签 `app/ts-auth-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 224,962
- **raw 日志**：[results/1020_2323_tsm-v1-b36/raw/1020_2324_trainticket-startup-2](../results/1020_2323_tsm-v1-b36/raw/1020_2324_trainticket-startup-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Login traffic fails at the edge: alert shows POST /api/v1/users/login on ts-auth-service returning 503 (370 occurrences), and a TCP probe on the Service's own declared port 12340 fails from all three workers. The only non-Ready pod in namespace train-ticket is ts-auth-service-796f849c7c-6gkj9: 0/1 CreateContainerConfigError, State Waiting. Its events carry the mechanism verbatim: 'Warning Failed (x12) kubelet Error: secret "ts-auth-mysql1" not found'. GetAppYAML(ts-auth-service) shows the deployment consumes envFrom secretRef name ts-auth-mysql1 (Optional false), while GetResources(secrets) li

### case-3

- **结论**：`app/ts-config-service` + `missing_secret_binding` ｜ 标签 `app/ts-config-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 330,323
- **raw 日志**：[results/1020_2359_tsm-v1-b54/raw/1021_0000_trainticket-startup-3](../results/1020_2359_tsm-v1-b54/raw/1021_0000_trainticket-startup-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert pointer: ts-preserve-service POST /api/v1/preserveservice/preserve (Create ticket order) returns 500. Complaint-side error logs walk one hop down each time: ts-preserve-service '[preserve][Step 3][Check tickets num][Search For Trip Detail Information error][TripId: G1236, message: getTickets failed]' plus 500 on /api/v1/travelservice/trip_detail; ts-travel-service 500 on /api/v1/seatservice/seats/left_tickets; ts-seat-service 'java.lang.IllegalArgumentException: Service Instance cannot be null' (downstream instance lookup empty). Namespace pod inventory has exactly one outlier: ts-config

### case-4

- **结论**：`app/ts-consign-service` + `missing_secret_binding` ｜ 标签 `app/ts-consign-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 252,248
- **raw 日志**：[results/1021_0056_tsm-v1-b57/raw/1021_0057_trainticket-startup-4](../results/1021_0056_tsm-v1-b57/raw/1021_0057_trainticket-startup-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-consign-service-855b6bfd98-gsh82 is 0/1 CreateContainerConfigError (State: Waiting, Ready: False); kubelet event reads: Warning Failed - Error: secret "ts-consign-mysql2" not found (x12 over 4m58s), while image pull is fine ("already present on machine"). The Deployment ts-consign-service pod template declares envFrom: secretRef name: ts-consign-mysql2, but the namespace secrets listing contains only ts-consign-mysql (Opaque, 5 keys: CONSIGN_MYSQL_HOST/PORT/DATABASE/USER/PASSWORD) - no ts-consign-mysql2 exists. Because the container never starts, no pod becomes Ready, the Service ts-con

### case-5

- **结论**：`app/ts-contacts-service` + `missing_secret_binding` ｜ 标签 `app/ts-contacts-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 247,092
- **raw 日志**：[results/1021_0103_tsm-v1-b60/raw/1021_0104_trainticket-startup-5](../results/1021_0103_tsm-v1-b60/raw/1021_0104_trainticket-startup-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows the only outlier: ts-contacts-service-5cbbccffcb-gn4qm 0/1 CreateContainerConfigError (all other train-ticket workloads Running). Pod detail shows State Waiting Reason CreateContainerConfigError, Ready False, Restart Count 0, successfully Scheduled to worker-01 and image already present, with kubelet event 'Warning Failed (x12) Error: secret "ts-contacts-mysql" not found'. GetAppYAML(ts-contacts-service) shows envFrom secretRef {name: ts-contacts-mysql} with Optional: false, while the namespace secrets listing contains ts-contacts-mysql2 but no ts-contacts-mysql (every other

### case-6

- **结论**：`app/ts-delivery-service` + `missing_secret_binding` ｜ 标签 `app/ts-delivery-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 239,637
- **raw 日志**：[results/1021_0109_tsm-v1-b63/raw/1021_0110_trainticket-startup-6](../results/1021_0109_tsm-v1-b63/raw/1021_0110_trainticket-startup-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows the single outlier ts-delivery-service-78fc79dcf6-dpqs5 as 0/1 CreateContainerConfigError on worker-01, while all other 40+ services are 1/1 Running (partial unreachability). Connectivity probe on the port the Service itself declares (18808) failed from worker-01, worker-02 and worker-03. Pod detail shows State Waiting / Reason CreateContainerConfigError, Ready False, PodScheduled True (not a scheduling issue) and kubelet event: Warning Failed (x12) 'Error: secret "ts-delivery-mysql" not found'; pod env lists 'ts-delivery-mysql Secret Optional: false'. GetAppYAML(ts-delivery

### case-7

- **结论**：`app/ts-food-delivery-service` + `missing_secret_binding` ｜ 标签 `app/ts-food-delivery-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 258,703
- **raw 日志**：[results/1021_0117_tsm-v1-b66/raw/1021_0118_trainticket-startup-7](../results/1021_0117_tsm-v1-b66/raw/1021_0118_trainticket-startup-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the pods listing is ts-food-delivery-service-bdcf5577f-v4x6f (0/1 CreateContainerConfigError, Restarts 0, Ready False, worker-01); all other 45 workloads are 1/1 Running. Pod detail shows State Waiting/Reason CreateContainerConfigError with kubelet event 'Warning Failed (x12 over 4m59s) Error: secret "ts-food-delivery-mysq1" not found'. The config face explains it: Deployment ts-food-delivery-service declares envFrom.secretRef.name = ts-food-delivery-mysq1 (trailing digit '1' instead of letter 'l'), while the secrets listing contains only the correctly named Secret ts-food-deli

### case-8

- **结论**：`app/ts-food-service` + `missing_secret_binding` ｜ 标签 `app/ts-food-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 229,555
- **raw 日志**：[results/1021_0123_tsm-v1-b69/raw/1021_0124_trainticket-startup-8](../results/1021_0123_tsm-v1-b69/raw/1021_0124_trainticket-startup-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket: only outlier in the pod listing is ts-food-service-6b7777876d-2h6dc (0/1, STATUS CreateContainerConfigError, node worker-01). Complaint side: the Service ts-food-service declares port 18856/TCP (spec.ports[0].port=18856, targetPort=18856, selector app=ts-food-service), and an active TCP probe on that declared port fails from all three nodes (worker-01/worker-02/worker-03: Connection Failed); the victim's own log surface reports 'container "ts-food-service" in pod "ts-food-service-6b7777876d-2h6dc" is waiting to start: CreateContainerConfigError'; upstream caller ts-pres

### case-9

- **结论**：`app/ts-notification-service` + `missing_secret_binding` ｜ 标签 `app/ts-notification-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 208,766
- **raw 日志**：[results/1021_0129_tsm-v1-b72/raw/1021_0130_trainticket-startup-9](../results/1021_0129_tsm-v1-b72/raw/1021_0130_trainticket-startup-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing shows the only non-Running workload: ts-notification-service-5fd4cd4dcd-2vbnx 0/1 CreateContainerConfigError on worker-01. Complaint-side probe on the port the Service spec declares (ts-notification-service:17853) fails from worker-01, worker-02 and worker-03 (Connection Failed), while upstream callers ts-cancel-service and ts-gateway-service show no error logs. Pod sheet gives the mechanism verbatim: 'Warning Failed 2m44s (x12 over 5m) kubelet Error: secret "ts-notification-mysql" not found', State Waiting Reason CreateContainerConfigError; the namespace events surface repeats 'Wa

### case-10

- **结论**：`app/ts-order-other-service` + `missing_secret_binding` ｜ 标签 `app/ts-order-other-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 347,805
- **raw 日志**：[results/1020_2008_tsm-v1-b6/raw/1020_2009_trainticket-startup-10](../results/1020_2008_tsm-v1-b6/raw/1020_2009_trainticket-startup-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side: ts-preserve-service logs 96x HTTP 500 from /api/v1/securityservice/securityConfigs/...; ts-security-service logs 'Service Instance cannot be null' and its dependency graph includes ts-order-other-service. Connectivity probe on ts-order-other-service's own Service port 12032 fails from worker-01/02/03. Object layer shows exactly one outlier among 45 pods: ts-order-other-service-5fdd56f7f9-r5kch 0/1 CreateContainerConfigError, with event 'Warning Failed (x12) kubelet Error: secret "ts-order-other-mysql1" not found'. The workload template confirms envFrom.secretRef name=ts-order-o

### case-11

- **结论**：`app/ts-order-service` + `missing_secret_binding` ｜ 标签 `app/ts-order-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 227,376
- **raw 日志**：[results/1020_2013_tsm-v1-b9/raw/1020_2014_trainticket-startup-11](../results/1020_2013_tsm-v1-b9/raw/1020_2014_trainticket-startup-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-wide pod listing shows exactly one outlier: ts-order-service-6c6b786d8-kqmpg is 0/1 with STATUS CreateContainerConfigError (0 restarts, PodScheduled=True, image already present), while all other 44 business pods are 1/1 Running. Complaint side confirms the victim is unreachable: CheckServiceConnectivity on the Service's own declared port 12031 fails from worker-01/02/03, and GetErrorLogs(ts-order-service) returns 'container "ts-order-service" ... is waiting to start: CreateContainerConfigError'; upstream alerts show 503 on ts-order-service refresh and 500 on ts-preserve-service (a ca

### case-12

- **结论**：`app/ts-payment-service` + `missing_secret_binding` ｜ 标签 `app/ts-payment-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 207,163
- **raw 日志**：[results/1020_2018_tsm-v1-b12/raw/1020_2019_trainticket-startup-12](../results/1020_2018_tsm-v1-b12/raw/1020_2019_trainticket-startup-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side: alert on ts-inside-payment-service POST /api/v1/inside_pay_service/inside_payment returns HTTPError 500, and its error log repeats 'java.lang.IllegalArgumentException: Service Instance cannot be null'; dependency graph shows it calls ts-payment-service, and TCP probes on the Service's own declared port 19001 fail from worker-01/02/03 (no usable endpoints). Inventory outlier: pod ts-payment-service-57597f9bb4-zmzsz is 0/1 CreateContainerConfigError on worker-01 while all peers are 1/1 Running. Pod mechanism event: pod is PodScheduled=True and image already pulled, but kubelet re

### case-13

- **结论**：`app/ts-price-service` + `missing_secret_binding` ｜ 标签 `app/ts-price-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 211,153
- **raw 日志**：[results/1020_2024_tsm-v1-b15/raw/1020_2025_trainticket-startup-13](../results/1020_2024_tsm-v1-b15/raw/1020_2025_trainticket-startup-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-price-service is the only outlier in the namespace pod inventory: ts-price-service-755858595b-6ztwg is 0/1 Pending with status CreateContainerConfigError while all 44 peer services are 1/1 Running. Complaint side confirms partial unreachability: the Service ts-price-service declares port 16579 yet its endpoints object has no ready addresses at all, and an internal TCP probe to ts-price-service:16579 fails from worker-01, worker-02 and worker-03. The mechanism is recorded verbatim in the pod sheet and in the namespace event surface: kubelet 'Warning Failed (x12 over 5m2s) Error: secret "ts-p

### case-14

- **结论**：`app/ts-security-service` + `missing_secret_binding` ｜ 标签 `app/ts-security-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 306,965
- **raw 日志**：[results/1020_2243_tsm-v1-b18/raw/1020_2244_trainticket-startup-14](../results/1020_2243_tsm-v1-b18/raw/1020_2244_trainticket-startup-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-security-service-59cb94797b-t5w8x is 0/1 with STATUS CreateContainerConfigError (only outlier among all Running pods); its pod sheet shows State: Waiting/Reason: CreateContainerConfigError, Ready False, empty Container ID, and the kubelet event 'Error: secret "ts-security-mysql" not found' (x12). Deployment ts-security-service (replicas 1) declares envFrom secretRef ts-security-mysql with Optional: false, but the namespace secrets listing contains no ts-security-mysql (all other ts-*-mysql secrets exist). The referenced Secret therefore cannot be resolved, so the container is never crea

### case-15

- **结论**：`app/ts-station-food-service` + `missing_secret_binding` ｜ 标签 `app/ts-station-food-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 252,345
- **raw 日志**：[results/1020_2249_tsm-v1-b21/raw/1020_2250_trainticket-startup-15](../results/1020_2249_tsm-v1-b21/raw/1020_2250_trainticket-startup-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-station-food-service-d7d77b769-46xcs is 0/1 CreateContainerConfigError with kubelet event 'Error: secret "ts-station-food-mysql1" not found' (x12); container State=Waiting Reason=CreateContainerConfigError, Restart Count 0. Deployment ts-station-food-service envFrom.secretRef names 'ts-station-food-mysql1', but the secrets listing only contains the mis-named 'ts-stationn-food-mysql' (extra n, no trailing 1) - the referenced secret does not exist. Consequence: no ready endpoints, CheckServiceConnectivity on the Service's declared port 18855 fails from worker-01/02/03, and caller ts-food-

### case-16

- **结论**：`app/ts-station-service` + `missing_secret_binding` ｜ 标签 `app/ts-station-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 366,082
- **raw 日志**：[results/1020_2258_tsm-v1-b24/raw/1020_2259_trainticket-startup-16](../results/1020_2258_tsm-v1-b24/raw/1020_2259_trainticket-startup-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side chain: alert on ts-preserve-service POST /api/v1/preserveservice/preserve (HTTPError 500, 61x); ts-preserve-service error logs show 500 from /api/v1/travelservice/trip_detail plus '[preserve][Step 3][Check tickets num][Search For Trip Detail Information error][message: getTickets failed]'; ts-travel-service error logs show 500 from /api/v1/basicservice/basic/travel; ts-basic-service error logs show 'java.lang.IllegalArgumentException: Service Instance cannot be null' (no discovery instance on downstream ts-station-service). Workload listing shows exactly one outlier: pod ts-statio

### case-17

- **结论**：`app/ts-ticket-office-service` + `missing_secret_binding` ｜ 标签 `app/ts-ticket-office-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 249,176
- **raw 日志**：[results/1020_2304_tsm-v1-b27/raw/1020_2305_trainticket-startup-17](../results/1020_2304_tsm-v1-b27/raw/1020_2305_trainticket-startup-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one outlier in the train-ticket pod listing: ts-ticket-office-service-5b479ccdf6-9727s is 0/1 CreateContainerConfigError while all other 44 business pods are 1/1 Running, matching 'Partial Service Unreachability'. Complaint side: its only caller ts-gateway-service has no error logs, probe of the Service's own declared port 16108 fails with 'Connection Failed' on worker-01/02/03, and endpoints/ts-ticket-office-service is empty (no serving pod). Pod detail shows Status Pending, State Waiting/CreateContainerConfigError with empty Container ID (container never created), but 'Normal Scheduled 

### case-18

- **结论**：`app/ts-train-food-service` + `missing_secret_binding` ｜ 标签 `app/ts-train-food-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 230,546
- **raw 日志**：[results/1020_2311_tsm-v1-b30/raw/1020_2311_trainticket-startup-18](../results/1020_2311_tsm-v1-b30/raw/1020_2311_trainticket-startup-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-train-food-service-57684b5b44-kbhjt is the only outlier in the train-ticket pod inventory: READY 0/1, STATUS CreateContainerConfigError (all 47 peer pods Running 1/1). The Service object declares port 19999, and an active connectivity probe on ts-train-food-service:19999 failed from worker-01/02/03 (Connection Failed), matching the 'Partial Service Unreachability' symptom. Pod detail and the namespace events surface both carry the mechanism verbatim: "Warning Failed (x12 over 5m5s) kubelet Error: secret \"ts-train-food-mysql\" not found", while Scheduling and image Pulled succeeded. The

### case-19

- **结论**：`app/ts-train-service` + `missing_secret_binding` ｜ 标签 `app/ts-train-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 166,166
- **raw 日志**：[results/1020_2317_tsm-v1-b33/raw/1020_2318_trainticket-startup-19](../results/1020_2317_tsm-v1-b33/raw/1020_2318_trainticket-startup-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-train-service-68845fd764-6xwgp is 0/1 in CreateContainerConfigError while all other 40+ ts-* pods are 1/1 Running (matches the 'partial' wording). Complaint side: TCP probe on the Service's own declared port 14567 failed from worker-01/02/03, i.e. the Service has no ready endpoint; the 6 upstream callers (ts-gateway, ts-travel, ts-travel2, ts-basic, ts-travel-plan, ts-rebook) all lose this edge while the gateway itself logs no errors. Workload surface: pod is Scheduled and image already present, but kubelet emits 'Warning Failed ... Error: secret \"ts-train-mysql\" not found' (x12, also

### case-20

- **结论**：`app/ts-travel2-service` + `missing_secret_binding` ｜ 标签 `app/ts-travel2-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 263,165
- **raw 日志**：[results/1020_2329_tsm-v1-b39/raw/1020_2330_trainticket-startup-20](../results/1020_2329_tsm-v1-b39/raw/1020_2330_trainticket-startup-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the namespace pod inventory is ts-travel2-service-c6bb89b56-cgz7b: 0/1, STATUS CreateContainerConfigError, Restart Count 0 (container never started), scheduled on worker-01. Pod detail Event: Warning Failed (x12 over 5m7s) kubelet "Error: secret \"ts-travel2-mysql\" not found", with State: Waiting/Reason: CreateContainerConfigError, Ready: False, while image pull succeeded (Normal Pulled). GetAppYAML(ts-travel2-service) shows envFrom: secretRef name ts-travel2-mysql (Optional: false), but GetResources(secrets, namespace=train-ticket) lists no ts-travel2-mysql object (only ts-tr

### case-21

- **结论**：`app/ts-travel-service` + `missing_secret_binding` ｜ 标签 `app/ts-travel-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 243,979
- **raw 日志**：[results/1020_2334_tsm-v1-b42/raw/1020_2335_trainticket-startup-21](../results/1020_2334_tsm-v1-b42/raw/1020_2335_trainticket-startup-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-travel-service-5fb5fb5d6-vzx7t is 0/1 in CreateContainerConfigError (container never created, Restart Count 0, image already Pulled, scheduled on worker-01). Pod sheet shows 'Environment Variables from: ts-travel-mysql Secret Optional: false' and the kubelet event reads verbatim: Warning Failed 3m2s (x12 over 5m6s) Error: secret "ts-travel-mysql" not found. Deployment ts-travel-service declares envFrom secretRef name ts-travel-mysql with replicas 1, but the secrets listing contains no ts-travel-mysql object at all (only a mis-named ts-traval-mysql1 with TRAVEL_MYSQL_* keys), so the refe

### case-22

- **结论**：`app/ts-user-service` + `missing_secret_binding` ｜ 标签 `app/ts-user-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 236,552
- **raw 日志**：[results/1020_2340_tsm-v1-b45/raw/1020_2341_trainticket-startup-22](../results/1020_2340_tsm-v1-b45/raw/1020_2341_trainticket-startup-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: ts-user-service-6bd575b698-dxnl8 0/1 STATUS=CreateContainerConfigError, all other 46 pods 1/1 Running. Pod detail/kubelet event: Warning Failed x12 over 5m7s 'Error: secret "ts-user-mysql" not found'; container State Waiting reason CreateContainerConfigError, Restart Count 0 (never started), envFrom secretRef ts-user-mysql with Optional: false. GetAppYAML(ts-user-service) confirms the deployment references envFrom secretRef name=ts-user-mysql; the secrets listing contains 31 ts-*-mysql secrets but no ts-user-mysql. Service object itself is healthy (port/tar

### case-23

- **结论**：`app/ts-voucher-service` + `missing_secret_binding` ｜ 标签 `app/ts-voucher-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 241,116
- **raw 日志**：[results/1020_2346_tsm-v1-b48/raw/1020_2348_trainticket-startup-23](../results/1020_2346_tsm-v1-b48/raw/1020_2348_trainticket-startup-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.' names no service, so the inventory listing was the entry: the single outlier is pod ts-voucher-service-65795cb488-qv8tf at 0/1 CreateContainerConfigError on worker-03, while all 44 other ts-* pods are 1/1 Running. Complaint side first: the upstream caller ts-gateway-service has no error logs, and an active TCP probe on the port the Service itself declares (16101) fails from all three nodes (worker-01/02/03: 'Connection Failed'); GetResources(endpoints, ts-voucher-service) shows an empty ENDPOINTS column, and the dependency graph confirms ts-gateway-ser

### case-24

- **结论**：`app/ts-wait-order-service` + `missing_secret_binding` ｜ 标签 `app/ts-wait-order-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 238,404
- **raw 日志**：[results/1020_2353_tsm-v1-b51/raw/1020_2354_trainticket-startup-24](../results/1020_2353_tsm-v1-b51/raw/1020_2354_trainticket-startup-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-wait-order-service-66bf698774-2ddx4 is 0/1 CreateContainerConfigError while every other pod is 1/1 Running; its sheet shows 'State: Waiting, Reason: CreateContainerConfigError' with kubelet Warning Failed (x12 over 5m8s): Error: secret "ts-wait-order-mysql" not found. GetAppYAML(ts-wait-order-service) shows envFrom.secretRef name: ts-wait-order-mysql, but the Secrets listing and the app manifest's own Secret object show the real secret is named ts-waitorder-mysql (hyphen missing between wait/order) - a broken secret reference. Scheduling and image pull are healthy (PodScheduled True, im

