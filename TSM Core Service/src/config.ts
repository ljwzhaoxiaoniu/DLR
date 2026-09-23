/**
 * 路径与场景配置（唯一来源）
 *
 * 场景（scenario）= 一套完整 TSM：sources（L1 建模 / L2 证据 / L3 口径）+ fixtures（对照真值）。
 * 可覆盖：TSM_SCENARIO / TSM_STORE_DIR / TSM_MODEL_DIR（环境变量或 .env）。
 */
import * as path from "node:path";

export const ROOT = "D:/Code_Proj/DLR Proj";

// 先加载 .env（TSM_* / NEO4J_* 覆盖项），再读环境变量——被任何模块 import 都生效
try {
  process.loadEnvFile(path.join(ROOT, "TSM Core Service", ".env"));
} catch {
  /* 无 .env 时用系统环境变量 */
}

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
  process.env.TSM_STORE_DIR ?? path.join(ROOT, "TSM Core Service", ".store", "lance", "dlr");
/** ONNX 模型目录（scripts/fetch-model.sh 拉取） */
export const MODEL_DIR = process.env.TSM_MODEL_DIR ?? path.join(ROOT, "tmp_scripts", "bge-onnx");
