/**
 * 路径与场景配置（唯一来源）
 *
 * 场景（scenario）= 一套完整 TSM：sources（L1 建模 / L2 证据 / L3 口径）+ fixtures（对照真值）。
 * 可覆盖：TSM_* 环境变量或 .env（先读 <服务>/.env，再读 <数据目录>/.env；系统环境变量优先）。
 *
 * 两种部署形态同一套默认值：
 *   · 仓库内（本检出）——数据落 SERVICE_DIR/.store，与原行为逐项一致；
 *   · npm 安装态（路径含 node_modules）——数据落用户目录（默认 ~/.tsm，TSM_DATA_DIR 可覆盖）。
 */
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

/**
 * 位置解耦：一切路径从**包自身位置**推导——不依赖 cwd、无硬编码盘符。
 * 仓库挪到任意目录、分体部署（服务与数据分开）都能跑；可用 env 覆盖：
 *   TSM_SERVICE_DIR（服务目录）· TSM_ROOT（数据/场景的根）· TSM_DATA_DIR（可写数据目录）
 */
const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/TSM Core Service/src
export const SERVICE_DIR = process.env.TSM_SERVICE_DIR ?? path.resolve(HERE, "..");

/** 安装态判定（node_modules 内）→ 数据默认落用户目录；仓库内保持 SERVICE_DIR/.store */
const INSTALLED = SERVICE_DIR.split(path.sep).includes("node_modules");
export const DATA_DIR =
  process.env.TSM_DATA_DIR ?? (INSTALLED ? path.join(os.homedir(), ".tsm") : path.join(SERVICE_DIR, ".store"));

// 先加载 .env（TSM_* / NEO4J_* 覆盖项），再推导其余路径——被任何模块 import 都生效。
// 顺序：服务目录（仓库内现状）→ 数据目录（安装态的配置位）；已存在的系统环境变量不会被覆盖。
for (const envFile of [path.join(SERVICE_DIR, ".env"), path.join(DATA_DIR, ".env")]) {
  try {
    process.loadEnvFile(envFile);
  } catch {
    /* 无 .env 时用系统环境变量 */
  }
}

/** 仓库根：默认 = 服务目录的上一级；分体部署时用 TSM_ROOT 指向场景/数据集所在处 */
export const ROOT = process.env.TSM_ROOT ?? path.resolve(SERVICE_DIR, "..");

/** 场景目录 + 来源标签。解析序：
 *  ① `TSM_SCENARIO` 是路径样式（./ ../ / \ 盘符）→ 直接解析；
 *  ② 否则按 **npm 包名**解析（`<ref>/package.json`，即 `npm i tsm-scenario-xxx` 后的用法）；
 *  ③ 还失败但同名目录存在 → 当相对路径；再失败 → 报错（提示装包）；
 *  ④ 未设 `TSM_SCENARIO` → 仓库内默认 `scenarios/birdminidev`（source=fallback）。 */
function resolveScenario(): { dir: string; source: "env-path" | "env-package" | "fallback" | "default" } {
  const ref = process.env.TSM_SCENARIO;
  if (!ref) return { dir: path.join(ROOT, "scenarios", "birdminidev"), source: "default" };
  const looksPath = /^[.\\/]/.test(ref) || /^[A-Za-z]:[\\/]/.test(ref) || path.isAbsolute(ref);
  if (looksPath) return { dir: path.resolve(ref), source: "env-path" };
  try {
    const req = createRequire(import.meta.url);
    return { dir: path.dirname(req.resolve(`${ref}/package.json`)), source: "env-package" };
  } catch {
    const asPath = path.resolve(ref);
    if (fs.existsSync(asPath)) return { dir: asPath, source: "env-path" };
    throw new Error(
      `TSM_SCENARIO="${ref}" 既不是路径也不是已安装的场景包——先安装（npm i ${ref}）或给出路径`,
    );
  }
}
const scenarioRef = resolveScenario();
export const SCENARIO = scenarioRef.dir;
export const SCENARIO_SOURCE = scenarioRef.source;

/** 场景清单（可选）：`<场景>/tsm-scenario.json` 声明各子目录——新 benchmark 无需改服务 */
const SCENARIO_MANIFEST = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(SCENARIO, "tsm-scenario.json"), "utf8")) as {
      name?: string;
      yamlDir?: string;
      consensusDir?: string;
      sop?: string;
      fixturesDir?: string;
    };
  } catch {
    return null;
  }
})();
export const SCENARIO_NAME = SCENARIO_MANIFEST?.name ?? path.basename(SCENARIO);

/** L1 建模真源（per-db YAML，按范式分目录） */
export const YAML_DIR = path.join(SCENARIO, SCENARIO_MANIFEST?.yamlDir ?? "sources/configs/DLR");
/** L2 领域共识源（Domain Consensus：按库一个 jsonl，两种格式都支持） */
export const CONSENSUS_DIR = path.join(SCENARIO, SCENARIO_MANIFEST?.consensusDir ?? "sources/consensus");
/** L3 口径源（sync_sop.sh 的输入） */
export const SOP_SOURCE = path.join(SCENARIO, SCENARIO_MANIFEST?.sop ?? "sources/sop.md");
/** 对照真值（verify 套件用，已固化入库） */
export const FIXTURES_DIR = path.join(SCENARIO, SCENARIO_MANIFEST?.fixturesDir ?? "fixtures");

/** 数据集（MINIDEV_sqlite，手动下载）的根：默认 ROOT；分体部署用 TSM_DATASET_DIR */
export const DATASET_ROOT = process.env.TSM_DATASET_DIR ?? ROOT;
export const DATASET_DIR = path.join(DATASET_ROOT, "MINIDEV_sqlite");
/** 数据集题目/证据/gold 元数据（judge / stats / coverage 用） */
export const DATASET_QUESTIONS = path.join(DATASET_DIR, "mini_dev_sqlite.json");

/** LanceDB 存储（构建产物，gitignored） */
export const STORE_DIR = process.env.TSM_STORE_DIR ?? path.join(DATA_DIR, "lance", "dlr");
/** 开发态缓存目录（可重建、可删；如 gold 期望值缓存）——与构建产物分开放 */
export const CACHE_DIR = process.env.TSM_CACHE_DIR ?? path.join(DATA_DIR, "cache");
/** 图谱可视化产物（tsm viz / GET /viz/dlr） */
export const VIZ_DIR = process.env.TSM_VIZ_DIR ?? path.join(DATA_DIR, "viz");
/** 建模覆盖度报告（tsm coverage） */
export const COVERAGE_DIR = process.env.TSM_COVERAGE_DIR ?? path.join(DATA_DIR, "coverage");
/** 运行日志/临时产物：仓库内保持 tmp_scripts；安装态落数据目录 */
export const LOG_DIR =
  process.env.TSM_LOG_DIR ?? (INSTALLED ? path.join(DATA_DIR, "log") : path.join(ROOT, "tmp_scripts"));

/** 场景写入落点（results / DETAIL / README 标记块）：
 *  仓库内默认 = 场景目录本身（行为不变）；**安装态（node_modules）默认落数据目录**，
 *  不写进场景包；`TSM_OUT_DIR` 可显式覆盖。 */
export const SCENARIO_OUT =
  process.env.TSM_OUT_DIR ??
  (INSTALLED ? path.join(DATA_DIR, "scenario", path.basename(SCENARIO)) : SCENARIO);
export const RESULTS_DIR = path.join(SCENARIO_OUT, "results");
export const DETAIL_DIR = path.join(SCENARIO_OUT, "DETAIL");
export const DETAIL_MD = path.join(SCENARIO_OUT, "DETAIL.md");
export const SCENARIO_README = path.join(SCENARIO_OUT, "README.md");

/** ONNX 模型目录（scripts/fetch-model.sh 拉取；HF 仓库布局：onnx/model.onnx + tokenizer.json）
 *  探测序：env → 仓库内旧位置（存在才用）→ 数据目录 */
export const MODEL_DIR =
  process.env.TSM_MODEL_DIR ??
  [path.join(ROOT, "tmp_scripts", "bge-onnx"), path.join(DATA_DIR, "models", "bge-onnx")].find((p) =>
    fs.existsSync(path.join(p, "onnx", "model.onnx")),
  ) ??
  path.join(DATA_DIR, "models", "bge-onnx");
