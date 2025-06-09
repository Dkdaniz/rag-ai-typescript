import { embedding } from "@repo/ollama";
import { DocumentRepository } from "@repo/qdrant";
import { openaiCompletion } from "@repo/openai";

export class RAGService {
  private documentRepository = new DocumentRepository();

  async ask(question: string): Promise<string> {
    const vector = await embedding(question);
    const docs = await this.documentRepository.search(vector, 5);

    const context = docs.map((d) => d.payload?.text).join("\n---\n");

    const prompt = `
Contexto:\n${context}
---
Pergunta: ${question}
Resposta:
`;

    const response = await openaiCompletion(prompt); // ou modelo local

    return response;
  }
}
