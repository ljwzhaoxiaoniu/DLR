//#region node 半
/**
 * `dsh-tsm-agent` bundle 的 **node 半**。
 *
 * 职责（boot 期，早于任何 preset 物化）：
 *  1) `DLR_SKILLS_DIR` ← 随包技能目录（`skills/paradigm` 认知层；L3 SOP 走 MCP 检索，不随包发技能）；
 *  2) **随包 AGENTS.md 注入（user-global 副本）**——见 `syncUserGlobalCopy` 注释；
 *     工作区自带 AGENTS.md（仓库内）或启动器显式给了 `DLR_AGENTS_MD` 时不动、并清掉本包旧副本。
 * 启动器若已显式设置（仓库内运行、dsh_cob 按题指令等），一律以启动器为准。
 *
 * 浏览器半（TSM 状态浮层）走 `exports["./client"]`；本包的行见 cordis.patch.yml 与 presets/。
 */
import fs from "node:fs";
import os from "node:os";
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

/** $DSH_HOME 解析（与 @deepseek-ai/dsh-home-paths 同序：env → ~/.dsh） */
function resolveDshHome() {
  const env = process.env.DSH_HOME;
  if (env && env.trim()) return env.trim();
  return path.join(os.homedir(), ".dsh");
}

/**
 * 随包 AGENTS.md 注入 = user-global 副本机制。
 *
 * 语义依据（dsh-agent-instructions 源码核实，2026-10-10）：
 *  - `instructionFileCandidates` 只认**裸文件名**——含 `/` `\` 的候选（含一切绝对路径）会被
 *    `resolveInstructionFileCandidates` 静默过滤；把包内 AGENTS.md 的绝对路径塞进
 *    `DLR_AGENTS_MD` 在安装态**不生效**（历史 bug）；
 *  - 加载 = cwd 逐级向上找候选名 + **`$DSH_HOME/AGENTS.md`（user-global，无条件加载）**。
 *
 * 所以唯一可用的注入点 = `$DSH_HOME/AGENTS.md` 副本：
 *  - 工作区自带 AGENTS.md（仓库内）或启动器显式给了 DLR_AGENTS_MD → **删除本包副本**
 *    （user-global 是无条件加载的，留着会重复注入/跨场景串扰）；仅当内容与随包逐字节
 *    一致才删（= 本包此前装的副本），绝不误删用户自己的文件；
 *  - 两者都没有（安装态）→ 写入/刷新副本；目标已存在且内容不同（用户自定义）→ 保留并告警。
 */
function syncUserGlobalCopy() {
  const bundled = path.join(HERE, "..", "AGENTS.md");
  if (!fs.existsSync(bundled)) return;
  const target = path.join(resolveDshHome(), "AGENTS.md");
  const workspaceHas = hasAgentInstructions();
  const launcherSet = !!(process.env.DLR_AGENTS_MD && process.env.DLR_AGENTS_MD.trim());
  try {
    const bundledBuf = fs.readFileSync(bundled);
    const targetExists = fs.existsSync(target);
    const isOurs = targetExists && fs.readFileSync(target).equals(bundledBuf);
    if (workspaceHas || launcherSet) {
      if (isOurs) fs.rmSync(target);
      return;
    }
    if (targetExists && !isOurs) {
      console.error(
        `[dsh-tsm-agent] $DSH_HOME/AGENTS.md 已存在且并非本包副本——保留用户文件，不注入随包指令`,
      );
      return;
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(bundled, target);
  } catch {
    /* boot 期尽力而为，不阻断 */
  }
}

/** Host plugin body. */
function apply() {
  if (!process.env.DLR_SKILLS_DIR) {
    process.env.DLR_SKILLS_DIR = path.join(HERE, "..", "skills");
  }
  syncUserGlobalCopy();
}
//#endregion
export { apply };
