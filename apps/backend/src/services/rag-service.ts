import { OllamaProvider, OpenAIProvider } from "@repo/llm";
import { ChunkRepositoryQdrant } from "@repo/qdrant";
import { embedding } from "@repo/embedding";
import { AI_IS_LOCAL } from "@repo/env";

export type FilterAsk = {
  key: string;
  value: string;
};

export class RAGService {
  private chunkRepository = new ChunkRepositoryQdrant();

  async ask(question: string, filter?: FilterAsk[]): Promise<string> {
    console.log(question);

    const vector = await embedding(question);

    await this.chunkRepository.initCollection(768, "Cosine");
    const docs = await this.chunkRepository.search(vector, 5, filter);

    console.log(docs);

    const context = docs.map((d) => d.payload?.content).join("\n---\n");
    console.log({ context });
    const messages = [
      {
        role: "system",
        content:
          "Você é um assistente que responde **exclusivamente em português do Brasil**. Evite palavras de outros idiomas como espanhol ou inglês, exceto quando forem citadas literalmente no contexto.",
      },
      {
        role: "user",
        content: `Contexto: ${context}`,
      },
      {
        role: "user",
        content: `Pergunta: ${question}`,
      },
    ] as any;

    console.log(AI_IS_LOCAL);

    const AiProvider = Boolean(AI_IS_LOCAL)
      ? new OllamaProvider()
      : new OpenAIProvider();
    const response = await AiProvider.complete(messages);

    return response;
  }
}
