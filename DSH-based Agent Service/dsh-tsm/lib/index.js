//#region node 半
/**
 * `dsh-tsm` bundle 的 **node 半**。
 *
 * 职责：把**随包技能目录**暴露为 `DLR_SKILLS_DIR`——boot 期就设好，早于任何 preset
 * 物化（preset 里的 skill-filesystem 行要到会话采用 preset 时才求值）。
 * 这样装完 bundle 就能拿到 skills（`skills/paradigm` 认知层；L3 SOP 走 MCP 检索，不随包发技能），
 * 不再依赖启动器注入；启动器若已显式设置，则以启动器为准。
 *
 * 浏览器半（TSM 状态浮层）走 `exports["./client"]`；本包的行见 cordis.patch.yml 与 presets/。
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/dsh-tsm/lib

/** Host plugin body. */
function apply() {
  if (!process.env.DLR_SKILLS_DIR) {
    process.env.DLR_SKILLS_DIR = path.join(HERE, "..", "skills");
  }
}
//#endregion
export { apply };
