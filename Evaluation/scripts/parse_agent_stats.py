# -*- coding: utf-8 -*-
"""Parse opencode NDJSON agent logs → per-question stats CSV.

Extracts: steps, tokens(in/out/total), tool calls(by type), final answer, evidence SQL.

Usage:
  python parse_agent_stats.py --paradigm ER --qid 1472
  python parse_agent_stats.py --paradigm ALL
"""
import json, csv, re, argparse
from collections import Counter
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LOG_DIR = ROOT / "Evaluation" / "outputs" / "01_logs"
EVAL_DIR = ROOT / "Evaluation" / "outputs" / "03_reports"
OUT_DIR = ROOT / "Evaluation" / "outputs"


def parse_ndjson(path):
    steps = 0
    tokens_total = tokens_in = tokens_out = 0
    tool_calls = []
    final_answer = ""
    evidence_sql = ""
    first_error = ""

    with open(path, encoding="utf-8", errors="replace") as f:
        for line in f:
            try:
                obj = json.loads(line.strip())
            except Exception:
                continue
            p = obj.get("part", {})
            pt = p.get("type", "")
            text = p.get("text", "") or ""

            if pt == "step-finish":
                steps += 1
                tk = p.get("tokens", {})
                if tk:
                    # total 是累计值,只取最后一次; input/output 是每步增量
                    tokens_total = tk.get("total", tokens_total)
                    tokens_in += tk.get("input", 0)
                    tokens_out += tk.get("output", 0)

            if obj.get("type") == "tool_use" and pt == "tool":
                tname = p.get("tool", "")
                if tname.startswith("semantic-core_"):
                    tool_calls.append(tname.split("_", 1)[1])

            if "final answer:" in text.lower():
                m = re.search(r"Final Answer:\s*(.+?)(?:\n|$)", text, re.I)
                if m:
                    final_answer = m.group(1).strip()[:200]

            if "evidence sql:" in text.lower():
                # try inline
                m = re.search(r"Evidence SQL:\s*(.+?)(?:\n\n|$)", text, re.I)
                if m:
                    evidence_sql = m.group(1).strip()[:300]
                else:
                    # try fenced code block
                    m2 = re.search(r"Evidence SQL:\s*```(?:sql)?\s*(.+?)```", text, re.I | re.S)
                    if m2:
                        evidence_sql = m2.group(1).strip()[:300]

            if not first_error and p.get("state", {}).get("status") == "error":
                first_error = text[:100]

    return {
        "steps": steps,
        "tokens_total": tokens_total,
        "tokens_in": tokens_in,
        "tokens_out": tokens_out,
        "tool_calls_total": len(tool_calls),
        "tool_calls_detail": json.dumps(dict(Counter(tool_calls)), ensure_ascii=False),
        "final_answer": final_answer,
        "evidence_sql": evidence_sql,
        "error": first_error,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--paradigm", required=True, choices=["ER", "DLR", "RDF", "ALL"])
    ap.add_argument("--qid", type=int, default=None, help="single question id")
    a = ap.parse_args()

    paradigms = ["ER", "DLR", "RDF"] if a.paradigm == "ALL" else [a.paradigm]
    rows = []

    for para in paradigms:
        log_dir = LOG_DIR / para.lower()
        if not log_dir.exists():
            print(f"[SKIP] {para}: {log_dir} not found")
            continue
        files = sorted(log_dir.glob("*.json"))
        for f in files:
            qid = int(f.stem)
            if a.qid and qid != a.qid:
                continue
            stats = parse_ndjson(f)
            rows.append({"question_id": qid, "paradigm": para, **stats})

    # load evaluation results for merge
    eval_data = {}  # (qid, paradigm) -> {strict_match, judge_verdict, judge_reason, verdict}
    for ev_csv in EVAL_DIR.glob("*.csv"):
        para = ev_csv.stem.upper()  # er.csv -> ER
        if para not in ("ER", "DLR", "RDF"):
            continue
        try:
            with open(ev_csv, encoding="utf-8") as ef:
                for erow in csv.DictReader(ef):
                    eval_data[(int(erow["q_id"]), para)] = {
                        "strict_match": erow.get("strict_match", ""),
                        "judge_verdict": erow.get("judge_verdict", ""),
                        "judge_reason": erow.get("judge_reason", ""),
                        "verdict": erow.get("verdict", ""),
                    }
        except Exception:
            pass

    # merge eval results into rows
    for r in rows:
        key = (r["question_id"], r["paradigm"])
        ev = eval_data.get(key, {})
        r["strict_match"] = ev.get("strict_match", "")
        r["judge_verdict"] = ev.get("judge_verdict", "")
        r["judge_reason"] = ev.get("judge_reason", "")
        r["verdict"] = ev.get("verdict", "")

    # build timestamped filename with question range
    qids = sorted(set(r["question_id"] for r in rows))
    q_range = f"{min(qids)}-{max(qids)}" if len(qids) > 1 else str(qids[0]) if qids else "none"
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_name = f"agent_stats_{q_range}_{ts}.csv"
    out_path = OUT_DIR / out_name

    # write CSV (no final_answer/evidence_sql)
    fields = ["question_id", "paradigm", "steps", "tokens_total", "tokens_in", "tokens_out",
              "tool_calls_total", "tool_calls_detail", "error",
              "strict_match", "judge_verdict", "judge_reason", "verdict"]
    with open(out_path, "w", newline="", encoding="utf-8") as w:
        dw = csv.DictWriter(w, fieldnames=fields, extrasaction='ignore')
        dw.writeheader()
        for r in rows:
            dw.writerow(r)

    print(f"[OK] wrote {len(rows)} rows -> {out_path}")
    # summary
    if rows:
        for para in paradigms:
            sub = [r for r in rows if r["paradigm"] == para]
            if sub:
                avg_tok = sum(r["tokens_total"] for r in sub) / len(sub)
                avg_steps = sum(r["steps"] for r in sub) / len(sub)
                print(f"  {para}: n={len(sub)}, avg_tokens={avg_tok:,.0f}, avg_steps={avg_steps:.1f}")


if __name__ == "__main__":
    main()
