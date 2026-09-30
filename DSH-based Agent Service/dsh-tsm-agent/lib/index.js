//#region node 半
/**
 * `dsh-tsm-agent` bundle 的 **node 半**。
 *
 * 职责（boot 期，早于任何 preset 物化）：
 *  1) `DLR_SKILLS_DIR` ← 随包技能目录（`skills/paradigm` 认知层；L3 SOP 走 MCP 检索，不随包发技能）；
 *  2) `DLR_AGENTS_MD` ← 随包 AGENTS.md（仅当 cwd 上溯**找不到** AGENTS.md 时才设）——
 *     仓库内工作区（DSH-based Agent Service/）自有 AGENTS.md，行为不变；仓库外安装则由包内提供。
 * 启动器若已显式设置，则以启动器为准。
 *
 * 浏览器半（TSM 状态浮层）走 `exports["./client"]`；本包的行见 cordis.patch.yml 与 presets/。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/dsh-tsm-agent/lib

/** 从 cwd 向上找 AGENTS.md（到文件系统根为止）——有则说明工作区自带指令文件 */
function hasAgentInstructions() {
  let dir = process.cwd();
  for (;;) {
    if (fs.existsSync(path.join(dir, "AGENTS.md"))) return true;
    const parent = path.dirname(dir);
    if (parent === dir) return false;
    dir = parent;
  }
}

/** Host plugin body. */
function apply() {
  if (!process.env.DLR_SKILLS_DIR) {
    process.env.DLR_SKILLS_DIR = path.join(HERE, "..", "skills");
  }
  if (!process.env.DLR_AGENTS_MD && !hasAgentInstructions()) {
    const bundled = path.join(HERE, "..", "AGENTS.md");
    if (fs.existsSync(bundled)) process.env.DLR_AGENTS_MD = bundled;
  }
}
//#endregion
export { apply };
