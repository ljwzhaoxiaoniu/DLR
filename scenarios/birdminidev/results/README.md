# 跑批结果（结果文档）

> 本目录记录 `birdminidev` 的**跑题结果**——结构仿照旧结果：**raw 可追溯 + 汇总 + 逐题明细**，随跑随更新。
> 产生方式：`run_batch.sh`（并行跑）→ `tsm grade`（判定与汇总）→ `tsm stats`（综合统计 + 明细文档 [DETAIL.md](../DETAIL.md) + 同步场景 README）。

## 结构

```
results/
├── README.md            # ← 本文（怎么产生、怎么看、怎么更新）
├── stats.svg            # 综合统计图（tsm stats 生成；场景 README §五 引用同一份）
├── STATS.md             # 跨轮统计文字版（逐轮 / 跑题覆盖度 / 效率）
└── <run_id>/            # 一轮 = 一个目录（如 0924_1559_qids_1473_1480_1500）
    ├── questions.tsv    # 本轮题单（qid / db / question，取自数据集本身）
    ├── raw/             # ★ 可追溯：每题 dsh --json 事件流（+ .err）
    │   └── 0924_1559_1473_dlr.ndjson
    ├── questions.csv    # 逐题机器可读明细：判定 / 评定 / 精度 / 答案 / 期望 / 步数 / 工具数 / token / 日志路径 / session id
    └── summary.md       # 单轮汇总：分库 × 判定 + 非 PASS 明细
```

对应的**会话日志**在 `DSH-based Agent Service/.dsh-home/sessions/<cwd-slug>/<session>/session.v4.jsonl.zstd`（`<session>` 即 CSV 里的 `session` 列，可回放取证；多帧 zstd，解码器 `DSH-based Agent Service/scripts/decode_session_log.cjs`）。

## 判定口径（`tsm grade` v1）

- **期望值** = 题目自带的 **gold SQL** 在该库 SQLite 上执行的结果（**数据集原生，不修正**）
- **比对**：数值按 `[1e-9, 1e-6, 1e-4, 1e-3]` 逐级容差；文本/列表按归一化包含
- **判定**：`PASS` ｜ `FAIL` ｜ `UNCERTAIN`（抽不出可比对的值）｜ `GOLD_ERR`（gold 本身执行失败）
- ⚠ v1 是**规则判定**：`UNCERTAIN` / `GOLD_ERR` 进人工/仲裁清单，**不自动记对错**

## 评定口径（与判定并列的第二维：SOP 生效时按 SOP 裁定）

| 评定 | 含义 |
|---|---|
| ✅ 正确 | 与 gold 一致（即 PASS） |
| 🔁 翻盘 | 与 gold 对不上，但**答法符合 SOP 裁定口径** → 计正确，**单独标注、单独计数，不并入 ✅ 正确** |
| ❌ 错误 | 判错（含「SOP 已给口径而 agent 答法违背它」） |
| ⚠️ 待仲裁 | 无人裁定 / 抽不出可比对的值 |

- 推导：`questions.csv` 的 `ruling` 列；`tsm grade` 查 `sources/sop.md` 里**题面命中的 `类型：数据集问题` 节**——节内给了 `> **裁定期望**：<值>` 就按该值比，节的口径是「答案为空」就比 agent 是否也说空。
- **判定列一律不动**（仍与 gold 比、数据集原生）；**翻盘永不计入 PASS**：README / DETAIL / STATS / `stats.svg` 一律单独成栏。
- 口径来源是知识层（SOP）——符合「判定口径以知识层为准」；改口径 = 改 SOP，不改统计代码。

## 更新（边跑边更新）

跑题中遇到的**数据集问题 / 建模冲突 / 难题 / 其他** → 在 `../sources/sop.md` 补节并打标
（口径见 [docs/04-application.md](../../../docs/04-application.md) §二）→ 下一轮跑批读取新 SOP 生效。

## 一轮怎么跑

```bash
# 1) 并行跑（多开 dsh 进程；先起后端）
bash "DSH-based Agent Service/scripts/run_batch.sh" --all --jobs 4
# 2) 判定与汇总（单轮；产出 questions.csv / summary.md）
cd "TSM Core Service" && tsm grade --run "../scenarios/birdminidev/results/<run_id>"
# 3) 综合统计 + 明细（跨轮；重算 stats.svg / STATS.md / DETAIL.md，并同步场景 README §一/§五）
tsm stats
```

## 口径提醒

- **分布按判定次数**（同题重跑会重复计入），**跑题覆盖度按去重题数**（跑过多少题，与判定/评定无关）；两栏都出自 `tsm stats`。
- `UNCERTAIN` / `GOLD_ERR` 是**待仲裁**，不自动记错；raw 与判定都留档（`questions.csv` 由 `tsm grade` 按规则重算，人工仲裁前不要重跑 grade）。
