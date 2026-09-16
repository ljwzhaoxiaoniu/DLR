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
CFG = json.load(open(ROOT / "config.json", encoding="utf-8")) if (ROOT / "config.json").exists() else {}
_EVAL_OUT = CFG.get("eval", {}).get("output_dir", "Evaluation/outputs")
LOG_DIR = ROOT / _EVAL_OUT / "01_logs"
OUT_BASE = ROOT / _EVAL_OUT


def _walk(obj):
    """递归产出所有 (key, value)，用于从 MCP 返回中收集 db 字段."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield k, v
            yield from _walk(v)
    elif isinstance(obj, list):
        for v in obj:
            yield from _walk(v)


def parse_ndjson(path):
    steps = 0
    tokens_total = tokens_in = tokens_out = tokens_reasoning = tokens_cache_read = 0
    tool_calls = []
    final_answer = ""
    evidence_sql = ""
    # 三级命中统计（Ch1/Ch2/Ch3，2026-08-27 起）
    ch1_calls, ch1_dbs = 0, []          # Ch1 semantic_query: 调用次数 + 返回中出现的 db
    ch2_calls, ch2_hits, ch2_top = 0, 0, ""   # Ch2 search_evidence: 调用/非空命中/top kid:score
    ch3_calls, ch3_hit = 0, 0           # Ch3 read skills: 尝试次数/是否读到内容
    # error 列不再从 NDJSON 提取,由 Stage 4 judge 在判定 INCORRECT 时写入 judge_reason

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
                    # 所有字段按每步增量累加；sum(input+output+reasoning+cache_read) = sum(total)
                    tokens_total += tk.get("total", 0)
                    tokens_in += tk.get("input", 0)
                    tokens_out += tk.get("output", 0)
                    tokens_reasoning += tk.get("reasoning", 0)
                    tokens_cache_read += tk.get("cache", {}).get("read", 0)

            if obj.get("type") == "tool_use" and pt == "tool":
                tname = p.get("tool", "")
                st = p.get("state", {}) or {}
                if tname.startswith("semantic-core_"):
                    tool_calls.append(tname.split("_", 1)[1])
                # Ch1: semantic_query 返回里的 db 字段 = 语义路由锁定的库
                if tname.endswith("semantic_query"):
                    ch1_calls += 1
                    try:
                        out = json.loads(st.get("output", "") or "{}")
                    except Exception:
                        out = {}
                    for k, v in _walk(out):
                        if k == "db" and isinstance(v, str) and v not in ch1_dbs:
                            ch1_dbs.append(v)
                # Ch2: search_evidence 非空结果 = 知识命中
                elif tname.endswith("search_evidence"):
                    ch2_calls += 1
                    try:
                        out = json.loads(st.get("output", "") or "{}")
                    except Exception:
                        out = {}
                    res = out.get("results") or []
                    if res:
                        ch2_hits += 1
                        if not ch2_top:
                            top = res[0]
                            ch2_top = f"{top.get('qid', '?')}:{top.get('score', '?')}"
                # Ch3: read skills/{db}.md 且 completed = SOP 命中
                elif tname == "read":
                    fp = ((st.get("input") or {}).get("filePath", "") or "")
                    if "skills" in fp:
                        ch3_calls += 1
                        if st.get("status") == "completed":
                            ch3_hit = 1

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

    return {
        "steps": steps,
        "tokens_total": tokens_total,
        "tokens_in": tokens_in,
        "tokens_out": tokens_out,
        "tokens_reasoning": tokens_reasoning,
        "tokens_cache_read": tokens_cache_read,
        "tool_calls_total": len(tool_calls),
        "tool_calls_detail": json.dumps(dict(Counter(tool_calls)), ensure_ascii=False),
        "ch1_calls": ch1_calls,
        "ch1_dbs": ch1_dbs,
        "ch2_calls": ch2_calls,
        "ch2_hits": ch2_hits,
        "ch2_top": ch2_top,
        "ch3_calls": ch3_calls,
        "ch3_hit": ch3_hit,
        "final_answer": final_answer,
        "evidence_sql": evidence_sql,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--paradigm", required=True, choices=["ER", "DLR", "RDF", "ALL"])
    ap.add_argument("--qid", type=int, default=None, help="single question id")
    ap.add_argument("--log-subdir", default="", help="Stage 1 run-id")
    a = ap.parse_args()

    # 自动检测最新 run-id
    run_id = a.log_subdir
    if not run_id:
        subdirs = sorted([d for d in LOG_DIR.iterdir() if d.is_dir()], reverse=True)
        if subdirs:
            run_id = subdirs[0].name

    paradigms = ["ER", "DLR", "RDF"] if a.paradigm == "ALL" else [a.paradigm]
    rows = []

    for para in paradigms:
        log_dir = LOG_DIR / run_id / para.lower() if run_id else LOG_DIR / para.lower()
        if not log_dir.exists():
            print(f"[SKIP] {para}: {log_dir} not found")
            continue
        files = sorted(log_dir.glob("*.json"))
        for f in files:
            if not f.stem.isdigit():
                continue  # 跳过脏文件
            qid = int(f.stem)
            if a.qid and qid != a.qid:
                continue
            stats = parse_ndjson(f)
            rows.append({"question_id": qid, "paradigm": para, **stats})

    # load evaluation results for merge
    base = OUT_BASE / run_id if run_id else OUT_BASE
    eval_dir = base / "03_reports"
    eval_data = {}  # (qid, paradigm) -> {strict_match, judge_verdict, judge_reason, verdict}
    for ev_csv in (eval_dir.glob("*.csv") if eval_dir.exists() else []):
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
                        "db_id": erow.get("db_id", ""),
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
        # Ch1 db 命中: semantic_query 返回中是否出现正确库
        dbs = r.pop("ch1_dbs", [])
        r["ch1_first_dbs"] = ",".join(dbs[:3])
        db_id = ev.get("db_id", "")
        r["ch1_db_hit"] = 1 if db_id and db_id in dbs else 0

    # 输出到 run 目录下(对齐 Stage 1/2/3)
    out_dir = base
    out_dir.mkdir(parents=True, exist_ok=True)
    out_name = "agent_stats.csv"
    out_path = out_dir / out_name

    # write CSV (no final_answer/evidence_sql)
    fields = ["question_id", "paradigm", "steps",
              "tokens_total", "tokens_in", "tokens_out", "tokens_reasoning", "tokens_cache_read",
              "tool_calls_total", "tool_calls_detail",
              "ch1_calls", "ch1_db_hit", "ch1_first_dbs",
              "ch2_calls", "ch2_hits", "ch2_top",
              "ch3_calls", "ch3_hit",
              "error",
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
