## boutique/scheduling

- cases: run=2 / selected=2 · invalid_actions=0 · errors={'unparsed_final_answer': 1}

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.5 | 0.5 | 0.5 | 1.0 | 1.0 | 1.0 | 0.2321 | 15.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 157 | 0 | 0 | 0 | 1 | 1 | 1 | 0.214286 | 14 | 0 | 0 |  +  | app/adservice + taint_toleration_mismatch |
| 158 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/cartservice + taint_toleration_mismatch | app/cartservice + taint_toleration_mismatch |
