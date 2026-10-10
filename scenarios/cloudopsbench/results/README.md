# 跑批结果（结果文档）

> 本目录记录 `cloudopsbench` 的**跑题结果**——结构仿 `birdminidev/results/`：**raw 可追溯 + 单轮汇总 + 逐题明细 + 跨轮统计**，随跑随更新。
> 产生方式：跑题（`dsh_cob/run_one.sh`；批跑器后续单元）→ `eval/grade.sh`（上游 evaluation.py 评分）→ `eval/stats.mjs`（重建 [STATS.md](STATS.md) + [../DETAIL.md](../DETAIL.md) + `../DETAIL/<家族>.md`）。

## 结构

```
results/
├── README.md            # ← 本文（怎么产生、怎么看、怎么更新）
├── STATS.md             # 跨轮统计（stats.mjs 重建）：逐轮表 / 跑题覆盖度 / 汇总（去重取最新）
└── <run_id>/            # 一轮 = 一个目录（如 1010_1545_boutique-runtime-1）
    ├── raw/             # ★ 可追溯：每题一个 run 目录（dsh --json 事件流 + .err + 基准 mcp.jsonl
    │   └── <stamp>_<case>/   #   审计 + instructions.md + meta.yml + case_metadata.json）
    ├── traces/          # convert.mjs 产物：上游 reference 轨迹（<system>/dsh-tsm/<category>/<case>/）
    ├── <sys>_<cat>_questions.csv · _summary.json · _details.json · _group.md   # 每家族的评分产物
    ├── questions.csv    # 各组拼合的逐题明细（机器可读）
    └── summary.md       # 单轮汇总（家族指标表 + 逐题行）
```

`DETAIL/` 与 `DETAIL.md`（场景根目录）是**总账**：逐题校验表与证据正文按家族（system/category）拆分；覆盖度 / 汇总 / 索引在总账。

## 口径（`eval/grade.sh` —— 复用上游 scoring）

- **标签** = `process-label/<system>/<category>/<case>/milestone.json`（基准原生，不修正）
- **结果分（对 Rank 1 答案）**：`CA` 组件 / `FA` 故障型 / `JRA` 联合——与标签 `result` 逐字相等（仅 Rank 1 计分）
- **流程分（对证据链）**：`MC` 里程碑覆盖（工具名+参数匹配 + 观测文本满足证据模式）/ `EOC` 证据顺序（依赖边成立）/ `ECR` 证据链闭合（布尔）/ `EE` 证据效率（证据步/总步）
- **过程**：`steps` 诊断步数 ｜ `RAR` 重复调用率 ｜ `invalid` 无效动作数
- **评定**：无人工翻盘口径——**全部以上游 scorer 的输出为准**（同口径可与基准发表数字对表）

## 怎么更新

```bash
# 1) 跑题（单题示例；批跑器后续单元直接落 raw/）
bash "DSH-based Agent Service/dsh_cob/run_one.sh" boutique runtime 1
# 2) 归轮到 results/<run_id>/raw/ 后评分（--runs-root 扫 raw/）
bash scenarios/cloudopsbench/eval/grade.sh --runs-root scenarios/cloudopsbench/results/<run_id>/raw \
     --out scenarios/cloudopsbench/results/<run_id>
# 3) 重建跨轮统计与总账
node scenarios/cloudopsbench/eval/stats.mjs
```
