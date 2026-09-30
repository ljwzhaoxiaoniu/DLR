/**
 * prepack：把仓库根的 AGENTS.md 复制进包（发布件自带 agent 规则）。
 *
 * 单一源仍是 `DSH-based Agent Service/AGENTS.md`；本脚本只在 `npm pack` / `npm publish`
 * 时执行，产物 `dsh-tsm-agent/AGENTS.md` 已被 .gitignore 忽略（不进版本库）。
 */
import { copyFileSync, existsSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/dsh-tsm-agent/scripts
const SRC = path.resolve(HERE, "..", "..", "AGENTS.md"); // …/DSH-based Agent Service/AGENTS.md
const DST = path.resolve(HERE, "..", "AGENTS.md");

if (!existsSync(SRC)) {
  console.error(`[prepack] 找不到 AGENTS.md 源文件：${SRC}`);
  process.exit(1);
}
copyFileSync(SRC, DST);
console.log(`[prepack] AGENTS.md → ${DST}`);
