# 运行手册 — 怎么跑、怎么归档、故障怎么办

> **读者**：接手评测执行的人或 agent。本文是**唯一**的执行口径——跑题流程、纪律、归档规范、故障处理都在这里。
> 设计原理见 [evaluation.md](evaluation.md)（流水线设计）与 [agent.md](agent.md)（Agent 层），本文只讲**怎么做**。

---

## 0. 硬规则（先读这三条）

| # | 规则 | 为什么 |
|---|---|---|
| 1 | **不自行 `build` / `serve` / `reset`** —— 这三件事由项目主手动执行 | Kuzu 持排他文件锁；服务生命周期影响所有并发跑题 |
| 2 | **默认单轮**：每 (题, 范式) 只跑 1 轮 Stage 1。**任何重跑/多跑/复跑/方差验证，先列方案（跑谁、几轮、为什么）等确认** | 评测预算有限；历史上有过"自行补跑浪费 token"的教训 |
| 3 | **批间停下报数**：一批跑完报告结果，等确认再跑下一批 | 总会有意外，早发现早处理 |

⚠️ **Python 一律用绝对路径** `/d/ProgramData/anaconda3/envs/lepe_som/python`（禁止裸 `python`）。

---

## 1. 环境前提

| 项 | 要求 |
|---|---|
| Conda 环境 | `lepe_som`（Python 绝对路径见上） |
| Shell | **Git Bash** —— `opencode run` 必须在 Git Bash 下执行（Python subprocess 启动会导致 MCP 工具不可见） |
| 数据集 | `MINIDEV_sqlite/`（mini_dev 0703，见 [dataset.md](dataset.md)，gitignored） |
| Judge key | `Evaluation/.env_judge`（**gitignored，需单独取得**） |
| 服务 | 三范式已 `serve`（见 §2） |

---

## 2. 服务生命周期

```bash
cd "Semantic Core Service"

python main.py build --paradigm ALL        # 三范式逐库构建 Kuzu + FAISS（含 ID 防重校验）
python "tool&test/verify_db_recall.py"     # 构建校验，预期 RESULT: ALL PASS
python main.py serve --paradigm ALL        # 3 进程：ER 28765 / DLR 28775 / RDF 28785

# 单范式：--paradigm ER | DLR | RDF
# 其他子命令：reset（清存储）/ query（单问）/ interactive / init
```

### ⚠️ Kuzu 排他锁

**`build` 前必须停 `serve`**，否则报 `Could not set lock`。顺序永远是：

```
停 serve → build → （校验）→ 起 serve
```

### 何时必须 rebuild

| 改动 | 要 rebuild？ | 要重启 serve？ |
|---|---|---|
| `configs/scenarios/{ER,DLR}/*.yaml`、`RDF/*.ttl` | ✅ | ✅ |
| `mapping/*.py`、`models/*.py`、`build_service.py` 等构建链路 | ✅ | ✅ |
| `AGENTS.md`、`skills/*.md`（L3 是实时读取） | ❌ | ❌（skills 改文件即生效） |
| `rag_knowledge/*.jsonl`（L2） | 需 `python main.py build --evidence <topic>` 重建对应索引 | ✅ |
| 查询层代码（如 `db/graph_db.py` 的读路径） | ❌ | ✅ |

**配置改动后，同批次内必须一致**——改过配置要么重跑整批、要么本批全用旧配置，不允许半批换口径。

---

## 3. 单批跑题（标准流程）

> 批粒度 = **2 题 × 3 范式 = 6 路并发**（实测上限；再高会触发 Kuzu 锁冲突）。

```bash
cd Evaluation/scripts

# ── Stage 1：Agent 跑题（三范式并行，6 路）─────────────────
bash eval_run.sh EDR 1471 1472 --parallel
#   E=ER D=DLR R=RDF，可组合（EDR / ED / ER / D）
#   workers 自动 = 范式数 × 题数
#   run_id 形如 0914_1530_1471-1472_EDR，也写在 01_logs/.last_run_id

RID=0914_1530_1471-1472_EDR        # ← 换成刚跑出的 run_id

# ── Stage 2/3/4：逐范式提取 → strict 初判 → LLM 仲裁 ────────
for p in er dlr rdf; do
  /d/ProgramData/anaconda3/envs/lepe_som/python 02_extract_and_run.py --paradigm $p --log-subdir $RID
  /d/ProgramData/anaconda3/envs/lepe_som/python 03_evaluate.py        --paradigm $p --log-subdir $RID
  /d/ProgramData/anaconda3/envs/lepe_som/python 04_judge.py           --paradigm $p --log-subdir $RID
done

# ── 汇总 ──────────────────────────────────────────────────
/d/ProgramData/anaconda3/envs/lepe_som/python parse_agent_stats.py --paradigm ALL --log-subdir $RID
```

**Stage 说明**

| 阶段 | 脚本 | 输入 → 输出 | 备注 |
|---|---|---|---|
| Stage 1 | `eval_run.sh` → `run_serial.sh`/`run_parallel.sh` | question → `01_logs/{run_id}/{er,dlr,rdf}/<qid>.json`（NDJSON） | **永久保留**，是行为审计与重提取 SQL 的唯一数据源 |
| Stage 2 | `02_extract_and_run.py` | NDJSON → 提取 `Evidence SQL` → **在 golden db_id 的库上重放** → 标准化 | 不信 Agent 自报结果；跑错库会报错/结果不符 |
| Stage 3 | `03_evaluate.py` | 结果 vs golden cache → `03_reports/{p}.csv` | 纯脚本、秒级；PASS → CORRECT，FAIL → 待仲裁 |
| Stage 4 | `04_judge.py` | strict FAIL 且未判的行 → 写回 CSV | 走 `opencode run`（慢、可能超时）；增量可断点续跑；`--budget N` 限流 |
| 汇总 | `parse_agent_stats.py` | tokens + 判定 → `agent_stats.csv` | ⚠️ **必须 `--paradigm ALL` 一次跑齐**——逐范式跑会互相覆盖 |

**Paradigm 大小写注意**：`02/03/04` 用小写（`er`），`parse_agent_stats` 用大写（`ER`/`ALL`）。

---

## 4. 跑题纪律

| 纪律 | 内容 |
|---|---|
| **单轮默认** | 每 (题, 范式) 1 轮。strict FAIL → Stage 4 judge 是流水线内标准步骤，不算"重跑" |
| **重跑须批** | judge 判 INCORRECT 后 **停下来**：给根因 → 提复跑方案（谁、几轮、为什么）→ 等确认 |
| **批间确认** | 一批跑完报数，等确认再下一批 |
| **归档须确认**（Stage 5） | Stage 1–4 跑完后**不自动归档**，等结果确认无误再 `post_process` |
| **同批配置一致** | 批内三范式与所有题必须用同一套配置；改过配置则整批重跑 |
| **缺陷题流程** | 数据集保持原始 → Agent 按语义正确口径作答 → strict 对原始 gold 必 FAIL → judge 依 `oc_judge/disputes.md` / 知识层裁定翻正。**这是设计内路径，不是异常** |
| **判定顺序** | judge 侧：`disputes > SkillPath(SOP) > KnowledgePath(rag) > evidence 字面`；Agent 侧：L3 严格命中即最权威，无命中不预设优先级 |

---

## 5. 归档规范

```bash
cd Evaluation/scripts
/d/ProgramData/anaconda3/envs/lepe_som/python post_process.py --run-id <run_id> --qids <q1>,<q2> [--group original|control]
```

一步完成三件事：raw 扁平复制 + per-pair `agent_stats.csv` + 刷新 `docs/results_{版本}.md` **本组**段落。`--group`：`original`=原始组（默认）/ `control`=对照组——同轮次两组同题重跑靠组目录隔离，pair 与 raw 不碰撞、汇总不混算。

### 目标位置由 `config.json` 决定

```json
"eval": { "output_dir": "Evaluation/outputs2", "round": "v4_final" }
```

- `round` → `validated_results/{round}/{group}/`，并派生明细文档名 `docs/results_{版本}.md`（`v4_final` → `results_v4.md`）；文档内按组（**原始组**/**对照组**）分段重建
- **换轮次只改这一个键**
- 历史归档在 `archive/`（`round_1` / `round_2` / `v2_final` / `v3_final`）——`validated_results/` 只放现行基线

### 目录形态

```
validated_results/v4_final/{group}/         # original=原始组 / control=对照组
├── raw/{q1}-{q2}_{paradigm}_{qid}.json     # 扁平，pair 前缀命名
└── {q1}-{q2}/agent_stats.csv               # 归档粒度 = 运行粒度，不合并（24 列含 L1/L2/L3 三级命中）
```

### 备注四栏（`results_{版本}.md` 逐题表）

| 栏 | 只写什么 |
|---|---|
| **共通** | 题目 / evidence / L3 问题（跨范式共同根源）。题目无缺陷时写明"无缺陷" |
| **ER / DLR / RDF-备注** | 该范式本题的异常、错误及后果（首跳漂移、strict FAIL 原因、探测偏多、token 代价）；空 = 无异常 |

- **L3 命中口径**：只有 skill 文件里**存在本题匹配条目**才算命中；命中他题条目属干扰，统一写"L3 无本题条目"
- **只写当前结果的客观分析**——不写重跑次数、run_id、前后 token 对比（这些进 commit message 或论证案例区）
- **L3 条目 ↔ 观察对账**：skills 里每个条目题，`results_*.md` 必须有对应观察，且数字（steps / token / execute_sql 次数）与归档 CSV **逐项一致**

### ⚠️ 归档三个坑

1. **`post_process` 全对重跑不覆盖 raw**：`post_process.py` 有 `if not dest.exists()` 保护（防单题补跑覆盖同伴日志）→ **整题/全对重跑时旧 raw 会挡住新日志**，输出"迁移 0 条"，导致 CSV 是新的、raw 是旧的。**重跑已有题后必查 `raw/` 文件 mtime 是否等于本次 run**，必要时手动 `cp` 刷新。
2. **旧 pair 目录必须拆分**：pair 里只有一题重跑时，旧 pair 目录 + 新单题目录并存 = 同题两处记录；且合并是「sorted 目录序 + 后出现覆盖」，**单题目录若字母序在前会反杀新行**（`1493/` < `1493-1498/`）。修复形状：删旧 pair 目录、未重跑题拆为单题目录、重跑题以单题目录为唯一记录。
3. **翻盘后必须重跑 `parse_agent_stats`**（否则汇总 token 与判定不对应）。

---

## 6. 故障手册

| 症状 | 根因 | 处理 |
|---|---|---|
| Agent 启动即崩，日志 `database locked` | 三范式同时初始化 MCP → 争抢 Kuzu 排他锁（P2） | 重跑该题即可恢复；降低并发（2 题 × 3 范式已是实测上限） |
| Stage 4 judge 超时 300s → UNKNOWN → 默认 INCORRECT | 大日志或网络抖动（P2） | **不要直接改 CSV**：先 `cd Evaluation/oc_judge && cat <prompt_file> \| opencode run --format json` 手动验证 → 确认 CORRECT 后改 `03_reports/{p}.csv` 的 `judge_verdict`/`verdict`/`process_score`/`judge_reason` → 重跑 `parse_agent_stats`。多数是 API 偶发抖动，非 Agent 问题 |
| RDF serve 进程静默崩溃（端口无监听、无错误日志） | `serve --paradigm ALL` 下偶发（P2） | 复启即可 |
| 首跳 `*_semantic_query` 返回空（`success:true, confidence:0.0`，structures/entities: []） | 全局首跳不分类型混排取前 30 条再按类型过滤——目标实体排名 >30 被截断；属性/PE 命中被丢弃、未反算到实体（P2，q1472 DLR 实证） | 临时：改问法或带 `db` 重试（锁库走全量扫描必中）；根治见下方「召回收口位置修正」（已改码，重启生效） |
| 续跑时失败的题被当成成功跳过 | 旧版只要输出文件存在就跳过 | 已修（`01_run_agent.py`）：仅当输出非空**且无同名 `.err`** 才跳过 |
| `parse_agent_stats` 后统计只剩一个范式 | 逐范式跑互相覆盖 | 用 `--paradigm ALL` 一次跑齐 |
| 归档 CSV 与 raw 对不上 | §5 坑 1 | 查 raw mtime，手动刷新 |
| 同一题两处归档记录 | §5 坑 2 | 按 §5 坑 2 的修复形状处理 |
| token 数看着不对 | 口径 | `total = input + cache_read + reasoning(CoT) + output`（全算消耗）；`cache_read` 随步数累积，占比可达 80%+。**差异看 steps，不看单步** |

### 召回收口位置修正（首跳空召回的根治，2026-09-16 已改码；重启 serve 生效）

**只改位置，不动收口逻辑与形态差异**：现在"先截断、后收口"（取混排 top-30 再按类型过滤）→ 改为**"先收口、后截断"**——**全量召回**（~950–975 条小库成本可忽略）→ 归并去重（分数取 max）→ 排序取前 **top_k=5** 个顶层对象交付（ER→实体 / DLR→LE / RDF→class；**交付封顶 5**，用户拍板）。**两个动作服务两个目的**：截断（检索侧）= 检索经济；收口后交付的一致性（三范式都 ≤5 个顶层对象、同构字段）= token 经济 + 幻觉低。缺陷本质 = 截断被错当成收口的输入边界。**不抹平形态差异**——ER 的子层归并与 DLR/RDF 的"只吃顶层"均为各自设计（入口瘦↔融合），属被测变量，本次不动。RDF confidence 顺带取归并后 max（对齐 ER/DLR）。**代码已改**（三范式 MCP 工具 + ER 的 `query_service._query_er`），**重启 serve 即生效**；改后受影响批次按单轮重跑纪律处理。

### 争议题（已知缺陷题）

预期流程：Agent 按知识层口径答对 → strict FAIL（原始 gold 错）→ judge 查 `Evaluation/oc_judge/disputes.md` 裁定 → 翻 CORRECT。

**若 judge 没翻**：先查 `judge_reason` 是否引用了 disputes.md；裁定有疑问时按 `disputes > SkillPath > KnowledgePath > evidence 字面` 的判序核对。新翻盘争议题**追加 disputes.md**（裁决唯一权威，勿只改 cache）。

---

## 7. 命令速查

```bash
# 环境
export PYTHONIOENCODING=utf-8
PY=/d/ProgramData/anaconda3/envs/lepe_som/python

# 服务（⚠ 由项目主执行）
cd "Semantic Core Service"
python main.py build --paradigm ALL                 # 停 serve 后
python main.py serve --paradigm ALL                 # ER 28765 / DLR 28775 / RDF 28785
python "tool&test/verify_db_recall.py"              # 构建校验

# 跑一批
cd Evaluation/scripts
bash eval_run.sh EDR <q1> <q2> --parallel           # Stage 1
for p in er dlr rdf; do                             # Stage 2/3/4
  $PY 02_extract_and_run.py --paradigm $p --log-subdir $RID
  $PY 03_evaluate.py        --paradigm $p --log-subdir $RID
  $PY 04_judge.py           --paradigm $p --log-subdir $RID
done
$PY parse_agent_stats.py --paradigm ALL --log-subdir $RID
$PY post_process.py --run-id $RID --qids <q1>,<q2> [--group original|control]  # 归档（确认后）

# 单范式补跑（首字母）
bash eval_run.sh D <qid> <qid> --parallel           # 只跑 DLR
```

---

## 8. 人机边界

| 可自主执行 | 需项目主操作 |
|---|---|
| Stage 1–4 流水线 | `build` / `serve` / `reset` |
| `parse_agent_stats` 汇总 | 改 yaml / ttl 配置（改完需 rebuild） |
| 知识库编辑（`rag_knowledge` / `skills`） | **任何重跑**（先报方案） |
| 更新 memory / 文档 | **Stage 5 归档**（结果确认后） |
| 写 commit | `git push` |

---

## 相关文档

- [evaluation.md](evaluation.md) —— 四阶段流水线的**设计**（为什么这么拆、判定政策、Prompt 铁律）
- [agent.md](agent.md) —— 评测 Agent 层（opencode + AGENTS.md + 防作弊）
- [tsm-design.md](tsm-design.md) —— 三级语义建模协作协议与知识分层准入
- [modeling.md](modeling.md) / [modeling-guide-dlr.md](modeling-guide-dlr.md) —— 建模与配置
- [dataset.md](dataset.md) —— 数据集与已知缺陷清单
