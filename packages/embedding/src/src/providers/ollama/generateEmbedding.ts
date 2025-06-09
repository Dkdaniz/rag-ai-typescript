import axios from "axios";
import { OLLAMA_EMBEDDING_URL, OLLAMA_EMBEDDING_MODEL } from "../../config";

export async function generateEmbeddingOllama(text: string): Promise<number[]> {
  try {
    const response = await axios.post(OLLAMA_EMBEDDING_URL, {
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
