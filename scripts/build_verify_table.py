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
        for r in rows:
            qid = int(r["q_id"])
            par = r["paradigm"].strip()
            csv_data.setdefault(qid, {})[par] = {
                "strict": r["strict_match"].strip(),
                "judge": r["judge_verdict"].strip(),
                "result": r["verdict"].strip(),
                "token": int(r["total_tokens"]),
                "db": r["db_id"].strip(),
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

# 4. Per-quid notes (from results.md pair notes + dataset.md)
q_notes = {
    1481: "gold bug修正", 1482: "gold bug修正", 1490: "gold bug修正",
    1529: "gold笛卡尔积修正", 1531: "gold bug修正",
    1505: "gold COUNT(*)", 1525: "gold COUNT(*)", 1526: "gold NULL",
    94: "question修正", 95: "gold bug修正", 1031: "evidence伪代码修正",
    1029: "gold ASC/DESC修正", 1152: "gold ratio方向修正",
    198: "evidence笛卡尔积修正", 207: "gold SQL bug修正",
    341: "gold typo修正", 344: "evidence补充", 349: "gold bug修正", 352: "gold bug修正",
    533: "evidence DATE()修正",
    26: "gold bug(FreeMeal→FRPM)待修正",
    27: "average歧义/LLM极限", 1037: "ER/RDF JOIN键错",
    17: "gold RANK()过度", 726: "gold RANK()过度",
    23: "evidence公式→自然语言", 206: "RDF探索≠答案", 347: "RDF扁平漏JOIN",
    208: "RDF语义理解错", 1036: "RDF缺DISTINCT",
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
out.append("| 专题 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 备注 |")
out.append("|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|")

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

        note = " ".join(flags) if flags else q_notes.get(qid, "")

        er_t_s = f"{er_t:,}" if er_t else "—"
        dlr_t_s = f"{dlr_t:,}" if dlr_t else "—"
        rdf_t_s = f"{rdf_t:,}" if rdf_t else "—"

        out.append(
            f"| {db_short.get(db, db)} | q{qid} | {er_s} | {er_j} "
            f"| {dlr_s} | {dlr_j} "
            f"| {rdf_s} | {rdf_j} "
            f"| {er_r} | {dlr_r} | {rdf_r} "
            f"| {er_t_s} | {dlr_t_s} | {rdf_t_s} | {note} |"
        )

with open(OUT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(out))

print(f"Written {len(out)} lines to {OUT_PATH}")
print(f"Databases: {[(db_short[d], len(by_db[d])) for d in db_order if by_db[d]]}")
