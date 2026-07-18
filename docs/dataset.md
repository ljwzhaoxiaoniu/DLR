# 数据集说明 — mini_dev（BIRD-bench 精简开发版）

本项目使用 **mini_dev**（bird-bench 子集，版本 **0703**）作为 NL2SQL 评测基准。

| 属性 | 详情 |
|------|------|
| **名称** | mini_dev（BIRD-bench 精简开发版） |
| **版本** | 0703 |
| **数据库数量** | 11 个 SQLite 数据库 |
| **任务数量** | 500 个自然语言查询任务 |
| **评测目标** | NL2SQL（自然语言 → SQL 查询） |

## 数据库一览

| 数据库 | 领域 | 题数 | 说明 |
|--------|------|------|------|
| `california_schools` | 教育 | 30 | 加州学校信息（学校、学区、学生数等） |
| `financial` | 金融 | 32 | 银行账户、交易、客户信息 |
| `superhero` | 娱乐 | 52 | 超级英雄角色、能力、所属团队 |
| `debit_card_specializing` | 零售 | 30 | 借记卡消费记录与商户信息 |
| `european_football_2` | 体育 | 51 | 欧洲足球联赛、球队、球员、比赛记录 |
| `card_games` | 游戏 | 52 | 卡牌游戏、卡牌属性、对战记录 |
| `formula_1` | 体育 | 66 | F1 赛车、车手、赛道、比赛结果 |
| `codebase_community` | 技术 | 49 | 开源社区、帖子、用户关系 |
| `student_club` | 教育 | 48 | 大学社团、成员、活动信息 |
| `thrombosis_prediction` | 医疗 | 50 | 血栓预测临床数据 |
| `toxicology` | 化学 | 40 | 毒性物质、分子结构、毒性反应 |

## 下载与目录

```
版本：mini_dev 0703
下载地址：https://drive.google.com/file/d/13VLWIwpw5E3d5DUkMvzw7hvHE7a4XkG/view
```

下载后解压到项目根目录：

```
DLR Proj/
└── MINIDEV_sqlite/
    ├── dev_tables.json              # 表结构元数据
    ├── mini_dev_sqlite.json         # 任务集（500 条 NL → SQL）
    ├── mini_dev_sqlite_gold.sql     # 标准答案 SQL
    └── dev_databases/               # 11 个 SQLite 数据库
        ├── california_schools/california_schools.sqlite
        ├── financial/financial.sqlite
        └── ...
```

> `MINIDEV_sqlite/` 已加入 `.gitignore`，不纳入版本控制。

## 任务格式

`mini_dev_sqlite.json` 每条任务字段：`question_id, db_id, question, evidence, SQL, difficulty`。

```json
{
  "question_id": 1471,
  "db_id": "debit_card_specializing",
  "question": "What is the ratio of customers who pay in EUR against customers who pay in CZK?",
  "evidence": "ratio of customers who pay in EUR against customers who pay in CZK = ...",
  "SQL": "SELECT CAST(SUM(IIF(Currency = 'EUR', 1, 0)) AS FLOAT) / SUM(IIF(Currency = 'CZK', 1, 0)) AS ratio FROM customers",
  "difficulty": "simple"
}
```

## 与评测相关的实测特征

- **question_id 不连续**：前 15 个 qid 为 `1471, 1472, 1473, 1476, 1479, 1480, 1481, 1482, 1483, 1484, 1486, 1490, 1493, 1498, 1500`；全量 min=5、max=1533，共 317 处跳号。评测脚本按 `question_id >= OFFSET` 定位起点。
- **文件按 db 分组排列**，并非全局按 qid 升序。
- **evidence 为空的仅 2 条**：qid 1507、1528。
- 任务字段中 question/evidence **不含 `|` 字符**（500 条实测零冲突），评测脚本以 `|` 作字段分隔安全。
- **本项目设定：Agent 不拿到 `db_id`**（区别于 BIRD 官方"给定库写 SQL"设定）——语义层负责从问题定位数据库（语义路由），见 [Agent 说明](agent.md)。`db_id` 仅用于 Stage 2 重放定库与 Golden 缓存。

## SQLite 元数据注意事项

- `dev_tables.json` 的 FK 元数据严重缺失（如 debit_card_specializing 只记录 1 条 FK，实际 transactions_1k 有 3 条）——凡需要真实 FK 的地方（如 R2RML 生成）一律用 `PRAGMA foreign_key_list(table)` 从 SQLite 直读。
- `sqlite_sequence` 是 SQLite 自增元数据表（4 个库中存在），**不属于业务表**：语义层解析与映射生成均已排除。
