# -*- coding: utf-8 -*-
"""Parse opencode NDJSON agent logs → per-question stats CSV.

Extracts: steps, tokens(in/out/total/reasoning/cache_read), tool calls(by type), L1/L2/L3 命中.
**token 的唯一来源**（03_evaluate 不再自己扫 NDJSON，见 09-17 注释）；
SQL / Final Answer 的提取在 Stage 2（02_extract_and_run.py），本脚本不重复做。

Usage:
  python parse_agent_stats.py --log-subdir <run_id>        # 默认 --paradigm ALL，归档前跑这一条
  python parse_agent_stats.py --paradigm DLR --qid 1472    # 单题调试（其他行原样保留）
"""
import json, csv, argparse
from collections import Counter
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
    # 三级命中统计（L1/L2/L3，2026-08-27 起）
    l1_calls, l1_dbs = 0, []          # L1 semantic_query: 调用次数 + 返回中出现的 db
    l2_calls, l2_hits, l2_top = 0, 0, ""   # L2 search_evidence: 调用/非空命中/top kid:score
    l3_calls, l3_hit = 0, 0           # L3 read skills: 尝试次数/是否读到内容
    # error 列不再从 NDJSON 提取,由 Stage 4 judge 在判定 INCORRECT 时写入 judge_reason

    with open(path, encoding="utf-8", errors="replace") as f:
        for line in f:
            try:
                obj = json.loads(line.strip())
            except Exception:
                continue
            p = obj.get("part", {})
            pt = p.get("type", "")

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
                # L1: semantic_query 返回里的 db 字段 = 语义路由锁定的库
                if tname.endswith("semantic_query"):
                    l1_calls += 1
                    try:
                        out = json.loads(st.get("output", "") or "{}")
                    except Exception:
                        out = {}
                    for k, v in _walk(out):
                        if k == "db" and isinstance(v, str) and v not in l1_dbs:
                            l1_dbs.append(v)
                # L2: search_evidence 非空结果 = 知识命中
                elif tname.endswith("search_evidence"):
                    l2_calls += 1
                    try:
                        out = json.loads(st.get("output", "") or "{}")
                    except Exception:
                        out = {}
                    res = out.get("results") or []
                    if res:
                        l2_hits += 1
                        if not l2_top:
                            top = res[0]
                            l2_top = f"{top.get('qid', '?')}:{top.get('score', '?')}"
                # L3: read skills/*.md（09-18 起统一为 sop.md）且 completed = SOP 读到
                elif tname == "read":
                    fp = ((st.get("input") or {}).get("filePath", "") or "")
                    if "skills" in fp:
                        l3_calls += 1
                        if st.get("status") == "completed":
                            l3_hit = 1

    return {
        "steps": steps,
        "tokens_total": tokens_total,
        "tokens_in": tokens_in,
        "tokens_out": tokens_out,
        "tokens_reasoning": tokens_reasoning,
        "tokens_cache_read": tokens_cache_read,
        "tool_calls_total": len(tool_calls),
        "tool_calls_detail": json.dumps(dict(Counter(tool_calls)), ensure_ascii=False),
        "l1_calls": l1_calls,
        "l1_dbs": l1_dbs,
        "l2_calls": l2_calls,
        "l2_hits": l2_hits,
        "l2_top": l2_top,
        "l3_calls": l3_calls,
        "l3_hit": l3_hit,
    }


def refresh(run_id, paradigms, qid=None):
    """解析 run 的 NDJSON + 03_reports，写回 {OUT_BASE}/{run_id}/agent_stats.csv。
    返回 (rows, kept, out_path)。**解析不到任何行时不会清空已有 CSV**（未解析的旧行原样保留），
    所以 post_process 可以在归档前无条件调用它做闭环刷新。"""
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
            q = int(f.stem)
            if qid and q != qid:
                continue
            stats = parse_ndjson(f)
            rows.append({"question_id": q, "paradigm": para, **stats})

    # 单范式解析告警：同一个 run 下还有其他范式日志时提醒没跑齐（旧行会保留，但汇总会缺列）
    if run_id and len(paradigms) == 1:
        others = [p for p in ("ER", "DLR", "RDF")
                  if p not in paradigms and (LOG_DIR / run_id / p.lower()).is_dir()]
        if others:
            print(f"[WARN] 本 run 还有 {'/'.join(others)} 的日志，本次只解析了 {paradigms[0]}"
                  f"（一次刷齐用 --paradigm ALL）")

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
        # L1 db 命中: semantic_query 返回中是否出现正确库
        dbs = r.pop("l1_dbs", [])
        r["l1_first_dbs"] = ",".join(dbs[:3])
        db_id = ev.get("db_id", "")
        r["l1_db_hit"] = 1 if db_id and db_id in dbs else 0

    # 输出到 run 目录下(对齐 Stage 1/2/3)
    out_dir = base
    out_dir.mkdir(parents=True, exist_ok=True)
    out_name = "agent_stats.csv"
    out_path = out_dir / out_name

    # 保留本次未解析的 (范式, 题号) 旧行：分范式跑 / 单题调试不再冲掉其他行
    kept = []
    if out_path.exists():
        parsed_keys = {(r["paradigm"], str(r["question_id"])) for r in rows}
        try:
            with open(out_path, encoding="utf-8") as f:
                kept = [r for r in csv.DictReader(f)
                        if (r.get("paradigm", ""), r.get("question_id", "")) not in parsed_keys]
        except Exception:
            kept = []

    # write CSV (no final_answer/evidence_sql)
    fields = ["question_id", "paradigm", "steps",
              "tokens_total", "tokens_in", "tokens_out", "tokens_reasoning", "tokens_cache_read",
              "tool_calls_total", "tool_calls_detail",
              "l1_calls", "l1_db_hit", "l1_first_dbs",
              "l2_calls", "l2_hits", "l2_top",
              "l3_calls", "l3_hit",
              "error",
              "strict_match", "judge_verdict", "judge_reason", "verdict"]
    with open(out_path, "w", newline="", encoding="utf-8") as w:
        dw = csv.DictWriter(w, fieldnames=fields, extrasaction='ignore')
        dw.writeheader()
        for r in kept:
            dw.writerow(r)
        for r in rows:
            dw.writerow(r)

    print(f"[OK] wrote {len(rows)} rows"
          + (f"（另有 {len(kept)} 条本次未解析的旧行原样保留）" if kept else "")
          + f" -> {out_path}")
    return rows, kept, out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--paradigm", default="ALL", choices=["ER", "DLR", "RDF", "ALL"],
                    help="默认 ALL = 一次跑齐；分范式跑会丢其他范式的行（会保留旧行并告警，但别依赖它）")
    ap.add_argument("--qid", type=int, default=None, help="single question id（调试用）")
    ap.add_argument("--log-subdir", default="", help="Stage 1 run-id")
    a = ap.parse_args()

    # 自动检测最新 run-id
    run_id = a.log_subdir
    if not run_id:
        subdirs = sorted([d for d in LOG_DIR.iterdir() if d.is_dir()], reverse=True)
        if subdirs:
            run_id = subdirs[0].name

    paradigms = ["ER", "DLR", "RDF"] if a.paradigm == "ALL" else [a.paradigm]
    rows, _kept, _path = refresh(run_id, paradigms, qid=a.qid)

    # summary
    for para in paradigms:
        sub = [r for r in rows if r["paradigm"] == para]
        if sub:
            avg_tok = sum(r["tokens_total"] for r in sub) / len(sub)
            avg_steps = sum(r["steps"] for r in sub) / len(sub)
            print(f"  {para}: n={len(sub)}, avg_tokens={avg_tok:,.0f}, avg_steps={avg_steps:.1f}")


if __name__ == "__main__":
    main()
