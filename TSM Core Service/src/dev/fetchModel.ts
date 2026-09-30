/**
 * tsm fetch-model —— 拉取 embedding 模型（ONNX，本地推理用）
 *
 * 目标目录 = config 解析出的 MODEL_DIR（env TSM_MODEL_DIR → 仓库内 tmp_scripts/bge-onnx → 数据目录）。
 * 从 hf-mirror 镜像下载、已存在非空文件跳过；HF 仓库布局（onnx/model.onnx + tokenizer 等）。
 * 纯 Node 实现（跨平台，不依赖 bash/curl）；scripts/fetch-model.sh 是它的薄壳。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { MODEL_DIR } from "../config.js";

const BASE = "https://hf-mirror.com/Xenova/bge-small-zh-v1.5/resolve/main";
const FILES = [
  "onnx/model.onnx",
  "tokenizer.json",
  "tokenizer_config.json",
  "special_tokens_map.json",
  "config.json",
];

const dst = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : MODEL_DIR;
fs.mkdirSync(path.join(dst, "onnx"), { recursive: true });

const mb = (n: number) => (n / 1024 / 1024).toFixed(1) + " MB";

for (const f of FILES) {
  const out = path.join(dst, f);
  if (fs.existsSync(out) && fs.statSync(out).size > 0) {
    console.log(`  [skip] ${f} 已存在 (${mb(fs.statSync(out).size)})`);
    continue;
  }
  process.stdout.write(`  [get ] ${f} … `);
  const res = await fetch(`${BASE}/${f}`);
  if (!res.ok) {
    console.error(`\n[ERR] 下载失败 ${f}: HTTP ${res.status}`);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(out, buf);
  console.log(mb(buf.length));
}

console.log(`[model] 就绪: ${dst}`);
