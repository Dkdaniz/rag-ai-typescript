import { OllamaProvider, OpenAIProvider } from "@repo/llm";
import { DocumentRepository } from "@repo/qdrant";
import { embedding } from "@repo/embedding";
import { AI_IS_LOCAL } from "@repo/env";

export class RAGService {
  private documentRepository = new DocumentRepository();

  async ask(question: string): Promise<string> {
    const vector = await embedding(question);

    await this.documentRepository.initCollection(768, "Cosine");
    const docs = await this.documentRepository.search(vector, 5);

    const context = docs.map((d) => d.payload?.text).join("\n---\n");
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

    const AiProvider =
      AI_IS_LOCAL === true ? new OllamaProvider() : new OpenAIProvider();
    const response = await AiProvider.complete(messages);

    return response;
  }
}
