/**
 * 文本编码器（Node / ONNX），逐位复刻 Python 侧 sentence-transformers 的行为：
 *   BAAI/bge-small-zh-v1.5 → CLS pooling → L2 归一化
 *
 * ⚠ 复刻要点（实测踩过）：ST 的 Transformer 模块走 `do_lower_case = true` 的分词
 * （见模型目录的 sentence_bert_config.json），而 fast tokenizer（Python 的
 * AutoTokenizer 与 transformers.js 都一样）**不会**自动小写 —— 大写英文会变成 [UNK]。
 * 不先 toLowerCase()，同一文本的向量 cosine 只有 0.75~0.98（同模型同权重！）。
 * 实测：小写后 token ids 与 ST 逐位一致。
 */
import { env, pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers";

export class TextEncoder {
  private constructor(private readonly pipe: FeatureExtractionPipeline) {}

  /** modelDir 需为 HF 仓库布局（onnx/model.onnx + tokenizer.json 等） */
  static async load(modelDir: string): Promise<TextEncoder> {
    env.allowRemoteModels = false; // 一切走本地，绝不联网
    env.allowLocalModels = true;
    const pipe = await pipeline("feature-extraction", modelDir, { dtype: "fp32" });
    return new TextEncoder(pipe);
  }

  /** 批量编码：返回 L2 归一化后的 512 维向量 */
  async encode(texts: string[]): Promise<number[][]> {
    const out = await this.pipe(
      texts.map((t) => t.toLowerCase()), // 复刻 ST do_lower_case
      { pooling: "cls", normalize: true },
    );
    return out.tolist() as number[][];
  }

  /** 单条便捷方法 */
  async encodeOne(text: string): Promise<number[]> {
    return (await this.encode([text]))[0];
  }
}
