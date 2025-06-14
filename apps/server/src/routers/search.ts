import { FastifyInstance } from "fastify";
import { DocumentRepository } from "@repo/qdrant";
import { embedding } from "@repo/embedding";

export async function searchRoute(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const { query } = request.query as { query: string };
    const vector = await embedding(query);
    const repo = new DocumentRepository();
    const results = await repo.search(vector);
    reply.send({ results });
  });
}
