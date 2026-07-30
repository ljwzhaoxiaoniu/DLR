"""Build per-question verification table: strict/judge/result/token per paradigm."""
import csv, os, re
from collections import defaultdict

BASE = "D:/Code_Proj/DLR Proj/validated_results/round_1"
MD_PATH = "D:/Code_Proj/DLR Proj/docs/results.md"
OUT_PATH = "D:/Code_Proj/DLR Proj/docs/_verify_table.md"


def read_csv_safe(path):
    for enc in ["utf-8-sig", "gbk", "latin-1"]:
        try:
            with open(path, encoding=enc) as f:
                rows = list(csv.DictReader(f))
            if rows and ("q_id" in rows[0] or "question_id" in rows[0]):
                return rows
        except (UnicodeDecodeError, KeyError):
            continue
    return []


# 1. Read all CSVs
csv_data = {}
for pair_dir in os.listdir(BASE):
    if not re.match(r"^\d+-\d+$", pair_dir):
        continue
    csv_path = os.path.join(BASE, pair_dir, "agent_stats.csv")
    if not os.path.exists(csv_path):
        continue
    rows = read_csv_safe(csv_path)
    if not rows:
        continue
    if "q_id" in rows[0]:
        # 新格式: paradigm,q_id,db_id,strict_match,judge_verdict,judge_reason,verdict,...,total_tokens
        for r in rows:
            qid = int(r["q_id"])
            par = r["paradigm"].strip().lower()
            csv_data.setdefault(qid, {})[par] = {
                "strict": r["strict_match"].strip(),
                "judge": r["judge_verdict"].strip(),
                "result": r["verdict"].strip(),
                "token": int(r["total_tokens"]),
                "db": r["db_id"].strip(),
            }
    elif "question_id" in rows[0]:
        # 旧格式: question_id,paradigm,steps,tokens_total,...,strict_match,judge_verdict,judge_reason,verdict
        for r in rows:
            try:
                qid = int(r["question_id"])
            except (ValueError, KeyError):
                continue
            par = r["paradigm"].strip().lower()
            csv_data.setdefault(qid, {})[par] = {
                "strict": r.get("strict_match", "").strip(),
                "judge": r.get("judge_verdict", "").strip(),
                "result": r.get("verdict", "").strip(),
                "token": int(r["tokens_total"]) if r.get("tokens_total","").strip().isdigit() else 0,
                "db": r.get("db_id", "").strip(),
            }

# 2. Parse results.md for verdicts + tokens
md_rows = {}
with open(MD_PATH, encoding="utf-8") as f:
    md = f.read()

for line in md.split("\n"):
    if not line.startswith("|"):
        continue
    parts = [p.strip() for p in line.split("|")]
    if len(parts) < 8:
        continue
    pair_str = parts[1]
    if not re.match(r"^\d+-\d+$", pair_str):
        continue
    db = parts[2]
    qids_str = parts[3]
    if not re.match(r"^q\d", qids_str):
        continue
    try:
        er_p = int(parts[4].replace("*", "").replace("%", ""))
        dlr_p = int(parts[5].replace("*", "").replace("%", ""))
        rdf_p = int(parts[6].replace("*", "").replace("%", ""))
    except ValueError:
        continue
    note = parts[7] if len(parts) > 7 else ""
    qids = [int(q.strip()[1:]) for q in qids_str.split(",")]
    for qid in qids:
        md_rows[qid] = {"er": er_p, "dlr": dlr_p, "rdf": rdf_p, "note": note, "db": db}

# Token sub-table from results.md
token_line = {}
for line in md.split("\n"):
    m = re.match(r"\|\s*q(\d+)\s*\|\s*([\d,]+)\s*\|\s*([\d,]+)\s*\|\s*([\d,]+)\s*\|", line)
    if m:
        qid = int(m.group(1))
        token_line[qid] = (m.group(2), m.group(3), m.group(4))

# 3. DB ordering + mapping
db_map = {
    "credit": "debit_card_specializing",
    "student": "student_club",
    "thrombosis": "thrombosis_prediction",
    "football": "european_football_2",
    "formula_1": "formula_1",
    "superhero": "superhero",
    "codebase": "codebase_community",
    "card_games": "card_games",
    "toxicology": "toxicology",
    "california": "california_schools",
    "financial": "financial",
    "formula_1+superhero": "formula_1",
    "superhero+formula_1": "superhero",
}
db_order = [
    "debit_card_specializing", "student_club", "thrombosis_prediction",
    "european_football_2", "formula_1", "superhero", "codebase_community",
    "card_games", "toxicology", "california_schools", "financial",
]
db_short = {
    "debit_card_specializing": "debit_card", "student_club": "student_club",
    "thrombosis_prediction": "thrombosis", "european_football_2": "football",
    "formula_1": "formula_1", "superhero": "superhero",
    "codebase_community": "codebase", "card_games": "card_games",
    "toxicology": "toxicology", "california_schools": "california",
    "financial": "financial",
}

all_qids = sorted(set(csv_data.keys()) | set(md_rows.keys()))
by_db = defaultdict(list)
for qid in all_qids:
    md_db = md_rows.get(qid, {}).get("db", "")
    canon = db_map.get(md_db, md_db)
    by_db[canon].append(qid)

# 4. Per-quid notes — split into 数据集问题 vs 范式行为/归档观察
# 数据集备注: gold/evidence/question 本身的缺陷 (对应 dataset.md § Gold SQL 已知错误)
q_dataset_notes = {
    1481: "gold bug(未过滤最低消费客户)",
    1482: "gold bug(分母应为2013)",
    1490: "gold bug(两轮修正)",
    1529: "gold笛卡尔积bug(已修正cache)",
    1531: "gold bug(SUM(Price/Amount)→SUM(Price)/SUM(Amount))",
    1505: "gold语义偏差(COUNT(*)非客户数)",
    1525: "gold同1505缺陷",
    1526: "gold返回NULL(子查询无匹配)",
    94: "question修正(条件互斥)",
    95: "gold bug(只实现最年轻丢掉最高薪资)",
    1031: "evidence伪代码(SUBTRACT(DATETIME,birthday))",
    1029: "gold ASC/DESC颠倒",
    1152: "gold ratio方向反(门诊/住院→住院/门诊)",
    198: "evidence笛卡尔积(去笛卡尔积修正)",
    207: "gold SQL bug(分子级关联vs原子级)",
    341: "gold typo",
    344: "evidence缺印刷版本约束",
    349: "gold bug(答非所问)",
    352: "gold bug(分母错)",
    533: "evidence缺DATE()",
    26: "gold bug(Free Meal→FRPM Count)待修正",
    27: "average歧义(列名+question双触发AVG)",
    17: "gold过度要求RANK()列",
    726: "gold过度要求RANK()列",
    23: "evidence公式触发ABS()→自然语言修正",
    847: "gold NULL排序bug(Fisichella应为Räikkönen)",
}
# 备注: 测试观察 + 建模发现 (不含系统修复记录)
q_obs_notes = {
    1471: "DLR教科书链路(3工具1次SQL)；RDF唯一strict PASS",
    1473: "简单题ER更高效(35K vs 72K vs 94K)",
    1037: "ER/RDF JOIN键错",
    206: "RDF探索≠答案",
    347: "RDF扁平漏JOIN",
    208: "RDF语义理解错",
    1036: "RDF缺DISTINCT",
    1166: "⚠️CSV=INCORRECT MD=100%",
}

# 5. Build table
out = []
out.append("## 逐题校验表 — strict / judge / result / token")
out.append("")
out.append("> **说明**: 每行一题，每范式 4 列（strict 初判 / judge 仲裁 / result 最终判定 / token 消耗）。")
out.append("> **数据来源**: `validated_results/round_1/*/agent_stats.csv`（94 题标准格式）+ `results.md` token 表（38 题旧格式仅 token）。")
out.append("> **⚠️ 标记**: CSV 实际 verdict 与 results.md 不一致的题。")
out.append("> **旧格式 pair**（仅 token，无 strict/judge/result）: 7-8, 9-10, 17-18, 21-22, 31-32, 33-34, 37-38, 39-40, 41-42, 61-62, 63-64, 67-68, 69-70, 73-74, 75-76, 77-78, 83-84, 85-86, 89-90")
out.append("")
out.append("| 专题 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 数据集备注 | 备注 |")
out.append("|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|----------|------|")

for db in db_order:
    for qid in by_db.get(db, []):
        er = csv_data.get(qid, {}).get("er", {})
        dlr = csv_data.get(qid, {}).get("dlr", {})
        rdf = csv_data.get(qid, {}).get("rdf", {})
        md = md_rows.get(qid, {})

        er_s = er.get("strict", "—")
        er_j = er.get("judge", "—")
        er_r = er.get("result", "—")
        er_t = er.get("token", "")
        dlr_s = dlr.get("strict", "—")
        dlr_j = dlr.get("judge", "—")
        dlr_r = dlr.get("result", "—")
        dlr_t = dlr.get("token", "")
        rdf_s = rdf.get("strict", "—")
        rdf_j = rdf.get("judge", "—")
        rdf_r = rdf.get("result", "—")
        rdf_t = rdf.get("token", "")

        # Flag mismatches
        flags = []
        if er_r != "—" and md.get("er") == 100 and er_r != "CORRECT":
            flags.append("⚠️ER")
        if dlr_r != "—" and md.get("dlr") == 100 and dlr_r != "CORRECT":
            flags.append("⚠️DLR")
        if rdf_r != "—" and md.get("rdf") == 100 and rdf_r != "CORRECT":
            flags.append("⚠️RDF")

        # 数据集备注 (gold/evidence/question 缺陷)
        ds_note = q_dataset_notes.get(qid, "")
        # 范式行为/归档观察备注
        obs_note = " ".join(flags) if flags else q_obs_notes.get(qid, "")

        er_t_s = f"{er_t:,}" if er_t else "—"
        dlr_t_s = f"{dlr_t:,}" if dlr_t else "—"
        rdf_t_s = f"{rdf_t:,}" if rdf_t else "—"

        out.append(
            f"| {db_short.get(db, db)} | q{qid} | {er_s} | {er_j} "
            f"| {dlr_s} | {dlr_j} "
            f"| {rdf_s} | {rdf_j} "
            f"| {er_r} | {dlr_r} | {rdf_r} "
            f"| {er_t_s} | {dlr_t_s} | {rdf_t_s} | {ds_note} | {obs_note} |"
        )

with open(OUT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(out))

print(f"Written {len(out)} lines to {OUT_PATH}")
print(f"Databases: {[(db_short[d], len(by_db[d])) for d in db_order if by_db[d]]}")
