## boutique/infrastructure

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.35 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 14 | 1 | 1 | 1 | 1 | 1 | 1 | 0.45 | 21 | 0 | 0 | node/worker-02 + kube_proxy_unavailable | node/worker-02 + kube_proxy_unavailable |
| 25 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | node/master + kube_scheduler_unavailable | node/master + kube_scheduler_unavailable |
