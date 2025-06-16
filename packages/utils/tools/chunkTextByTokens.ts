import { encoding_for_model, get_encoding, Tiktoken } from "@dqbd/tiktoken";
import type { TiktokenModel } from "@dqbd/tiktoken";

type encoderType = "cl100k_base";

export const encoderGeneric = (encoderType: encoderType): Tiktoken =>
  get_encoding(encoderType);

export const encoderFromModel = (model: TiktokenModel) =>
  encoding_for_model(model);

export function chunkTextByTokens(input: {
  encoder: Tiktoken;
  text: string;
  maxTokens: number;
  overlap: number;
}): string[] {
  const { encoder, text, maxTokens = 200, overlap = 30 } = input;

  const sentences = text.split(/(?<=[.?!])\s+/);
  const chunks: string[] = [];
  let current = "";
  let lastChunkTokens: number[] = [];

  for (const sentence of sentences) {
    const currentTokens = Array.from(encoder.encode(current));
    const sentenceTokens = Array.from(encoder.encode(sentence));

    if (currentTokens.length + sentenceTokens.length <= maxTokens) {
      current += sentence + " ";
    } else {
      if (current.trim()) {
        chunks.push(current.trim());
        if (overlap > 0) {
          // preserve overlap from end of last chunk
          const overlapTokens = currentTokens.slice(-overlap);
          lastChunkTokens = overlapTokens;
        }
      }
      current = sentence + " ";
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}
