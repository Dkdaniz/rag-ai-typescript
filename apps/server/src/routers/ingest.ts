import { FastifyInstance } from "fastify";
import { DocumentRepository } from "@repo/qdrant";
import { embedding } from "@repo/ollama";

export async function ingestRoute(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const { texts } = request.body as { texts: string[] };
    const repo = new DocumentRepository();

    for (const text of texts) {
      const vector = await embedding(text);
      await repo.insertOne({ vector, payload: { text } });
    }

    reply.send({ message: "Ingest complete" });
  });
}
