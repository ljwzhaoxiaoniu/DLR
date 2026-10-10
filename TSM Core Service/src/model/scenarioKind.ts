/**
 * 场景形态判别：`dlr`（数据库形态）| `dlr-state`（非数据库形态）
 *
 * 依据 `sources/configs/DLR/*.yaml` 的 mapping_type（任一文件为 dlr-state 即判 state——
 * 两形态不混装；将来若有混合场景再演进为逐文件分派）。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { parse } from "yaml";
import { YAML_DIR } from "../config.js";

export type ScenarioKind = "dlr" | "dlr-state";

export function scenarioKind(): ScenarioKind {
  try {
    for (const f of fs.readdirSync(YAML_DIR).filter((f) => f.endsWith(".yaml")).sort()) {
      const raw = parse(fs.readFileSync(path.join(YAML_DIR, f), "utf8")) as { mapping_type?: string };
      if (raw.mapping_type === "dlr-state") return "dlr-state";
    }
  } catch {
    /* 目录缺失等 → 退回 dlr 形态 */
  }
  return "dlr";
}
