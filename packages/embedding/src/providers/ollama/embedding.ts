import { OLLAMA_EMBEDDING_MODEL } from "@repo/env";
import { ollmaClient } from "./config";

export async function embedding(text: string): Promise<number[]> {
  try {
    const response = await ollmaClient.post("/api/embeddings", {
      model: OLLAMA_EMBEDDING_MODEL,
      prompt: text,
    });

    const embedding = response.data?.embedding;

    if (!embedding || !Array.isArray(embedding)) {
      throw new Error("Invalid embedding response");
    }

    return embedding;
  } catch (error: any) {
    throw new Error(
      `Failed to generate embedding from Ollama: ${error.message}`
    );
  }
}
