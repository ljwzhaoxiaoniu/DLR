/**
 * 路径与场景配置（唯一来源）
 *
 * 场景（scenario）= 一套完整 TSM：sources（L1 建模 / L2 证据 / L3 口径）+ fixtures（对照真值）。
 * 可覆盖：TSM_SCENARIO / TSM_STORE_DIR / TSM_MODEL_DIR（环境变量或 .env）。
 */
import * as path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * 位置解耦：一切路径从**包自身位置**推导——不依赖 cwd、无硬编码盘符。
 * 仓库挪到任意目录、分体部署（服务与数据分开）都能跑；可用 env 覆盖：
 *   TSM_SERVICE_DIR（服务目录）· TSM_ROOT（数据/场景的根）
 */
const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/TSM Core Service/src
export const SERVICE_DIR = process.env.TSM_SERVICE_DIR ?? path.resolve(HERE, "..");

// 先加载服务目录下的 .env（TSM_* / NEO4J_* 覆盖项），再推导其余路径——被任何模块 import 都生效
try {
  process.loadEnvFile(path.join(SERVICE_DIR, ".env"));
} catch {
  /* 无 .env 时用系统环境变量 */
}

/** 仓库根：默认 = 服务目录的上一级；分体部署时用 TSM_ROOT 指向场景/数据集所在处 */
export const ROOT = process.env.TSM_ROOT ?? path.resolve(SERVICE_DIR, "..");

/** 场景目录（切换数据集 = 换这个） */
export const SCENARIO =
  process.env.TSM_SCENARIO ?? path.join(ROOT, "scenarios", "birdminidev");

/** L1 建模真源（per-db YAML，按范式分目录） */
export const YAML_DIR = path.join(SCENARIO, "sources", "configs", "DLR");
/** L2 领域共识源（Domain Consensus：按库一个 jsonl，两种格式都支持） */
export const CONSENSUS_DIR = path.join(SCENARIO, "sources", "consensus");
/** L3 口径源（sync_sop.sh 的输入） */
export const SOP_SOURCE = path.join(SCENARIO, "sources", "sop.md");
/** 对照真值（verify 套件用，已固化入库） */
export const FIXTURES_DIR = path.join(SCENARIO, "fixtures");

/** LanceDB 存储（构建产物，gitignored） */
export const STORE_DIR =
  process.env.TSM_STORE_DIR ?? path.join(SERVICE_DIR, ".store", "lance", "dlr");
/** ONNX 模型目录（scripts/fetch-model.sh 拉取） */
export const MODEL_DIR = process.env.TSM_MODEL_DIR ?? path.join(ROOT, "tmp_scripts", "bge-onnx");
