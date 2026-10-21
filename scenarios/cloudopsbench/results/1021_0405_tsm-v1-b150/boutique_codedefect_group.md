## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 0.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.1538 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 70 | 1 | 0 | 0 | 0.5 | 0.5 | 0 | 0.153846 | 14 | 0 | 0 | app/productcatalogservice + container_memory_limit_too_low | app/productcatalogservice + code_memory_leak |
