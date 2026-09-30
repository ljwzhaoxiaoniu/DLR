/**
 * tsm scenario —— 打印**当前生效场景**的解析结果（"哪套场景在跑"的唯一诊断）
 *
 * 覆盖：解析来源（env-path / env-package / default）、各子目录、数据集根、输出落点。
 * 与 /status 的 scenario 段同口径；排查"换场景没生效/写错地方"先看这里。
 */
import {
  CONSENSUS_DIR,
  DATASET_DIR,
  DATASET_ROOT,
  FIXTURES_DIR,
  RESULTS_DIR,
  SCENARIO,
  SCENARIO_NAME,
  SCENARIO_OUT,
  SCENARIO_SOURCE,
  SOP_SOURCE,
  YAML_DIR,
} from "../config.js";

console.log(
  JSON.stringify(
    {
      name: SCENARIO_NAME,
      dir: SCENARIO,
      source: SCENARIO_SOURCE,
      out_dir: SCENARIO_OUT,
      yaml_dir: YAML_DIR,
      consensus_dir: CONSENSUS_DIR,
      sop: SOP_SOURCE,
      fixtures_dir: FIXTURES_DIR,
      results_dir: RESULTS_DIR,
      dataset_root: DATASET_ROOT,
      dataset_dir: DATASET_DIR,
    },
    null,
    2,
  ),
);
