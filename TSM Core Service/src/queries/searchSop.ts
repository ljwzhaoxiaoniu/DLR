/**
 * L3 业务逻辑级 SOP 检索 —— MCP 工具 `dlr_search_sop`
 *
 * 交付口径（2026-09-28 定）：SOP 从"skills/sop 整文件逐轮载入"改为**按题检索索引**——
 *   1) **精确命中**：题面归一化后与某节标题逐字相同 → `match:"exact"`，直接按该节口径执行
 *      （节标题就是题面原文，逐字相同即"复述本题"，零误配）；
 *   2) 否则给近邻候选（带相似度）：**只有标题逐字复述本题时才可采用**——沿用原纪律，
 *      "A section covers ONLY the question it restates"；
 *   3) 都没有 → 空结果：本题无 L3 口径，按 L1 描述 + L2 共识自解。
 *
 * 口径与判定侧同源：Expected/类型随节返回（`tsm grade` 读的也是 sop.md 真源）。
 */
import type { LanceStore } from "../store/lance.js";

export interface SopHit {
  id: string;
  db: string;
  system: string;
  question: string; // 节标题（= 题面原文）
  type: string;
  expected: string;
  section: string; // 节正文
  score: number; // 1 = 精确命中
}

/** 题面归一化（精确命中的判据）：小写、去首尾空白与包裹引号、折叠空白、去尾问号 */
function norm(s: string): string {
  return s
    .trim()
    .replace(/^["'“”‘’]+|["'“”‘’]+$/g, "")
    .replace(/\s+/g, " ")
    .replace(/\?+$/, "")
    .toLowerCase();
}

/** 每次现读（表仅几十行、每题一次调用）——不进程内缓存，保证「改 SOP 源 → build → 即生效」 */
async function loadSections(store: LanceStore, system?: string) {
  const rows = await store.listRows("sop", true);
  const hasSystem = rows.some((r) => Object.prototype.hasOwnProperty.call(r, "system"));
  const sys = (system ?? "").trim();
  const filtered =
    sys && hasSystem
      ? rows.filter((r) => {
          const s = String(r.system ?? "");
          return s === sys || s === "shared" || s === "";
        })
      : rows;
  return {
    hasSystem,
    sections: filtered.map((r) => ({ title: String(r.title ?? ""), norm: norm(String(r.title ?? "")), row: r })),
  };
}

export async function searchSop(
  store: LanceStore,
  question: string,
  topK = 2,
  threshold = 0.7,
  system?: string,
): Promise<{
  success: boolean;
  match: "exact" | "similar" | "none";
  system: string;
  count: number;
  results: SopHit[];
  note?: string;
}> {
  const sys = (system ?? "").trim();
  const toHit = (r: Record<string, unknown>, score: number): SopHit => ({
    id: String(r.id ?? ""),
    db: String(r.db ?? ""),
    system: String(r.system ?? ""),
    question: String(r.title ?? ""),
    type: String(r.type ?? ""),
    expected: String(r.expected ?? ""),
    section: String(r.text ?? ""),
    score: Math.round(score * 10000) / 10000,
  });

  // 1) 精确命中（零误配；有系统作用域时只看本节 + shared 行）
  const { hasSystem, sections } = await loadSections(store, sys);
  const nq = norm(question);
  const exact = sections.find((s) => s.norm === nq);
  if (exact) {
    return {
      success: true,
      match: "exact",
      system: sys,
      count: 1,
      results: [toHit(exact.row, 1)],
      note: "标题与本题逐字相同：该节即本题的 L3 口径（L3 最权威），按它执行。",
    };
  }

  // 2) 近邻候选（需自行核对标题是否复述本题；按系统过滤）
  const where = sys && hasSystem ? `(system = '${sys.replace(/'/g, "''")}' OR system = 'shared' OR system = '')` : undefined;
  const hits = await store.search("sop", question, { limit: topK, fresh: true, ...(where ? { where } : {}) });
  const results = hits.filter((h) => h.score >= threshold).map((h) => toHit(h as Record<string, unknown>, h.score));
  if (!results.length) {
    return {
      success: true,
      match: "none",
      system: sys,
      count: 0,
      results: [],
      note: "无精确命中，且近邻候选相似度低于阈值：本题没有 L3 节，按 L1 描述 + L2 共识自解。",
    };
  }
  return {
    success: true,
    match: "similar",
    system: sys,
    count: results.length,
    results,
    note: "近似候选，**并非本题的节**：只有标题逐字复述本题时才采用；否则当作背景，按 L1+L2 自解。",
  };
}
