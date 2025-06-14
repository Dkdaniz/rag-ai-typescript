import { FastifyInstance } from "fastify";
import { DocumentRepository } from "@repo/qdrant";
import { embedding } from "@repo/embedding";
import { createUUID } from "@repo/utils";

export async function ingestRoute(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    console.log({ body: request.body });

    const { texts } = request.body as { texts: string[] };

    const documentRepository = new DocumentRepository();
    await documentRepository.initCollection(768, "Cosine");

    for (const text of texts) {
      const vector = await embedding(text);

      const id = createUUID();
      await documentRepository.upsert([{ id, vector, payload: { text } }]);
    }

    reply.send({ message: "Ingest complete" });
  });
}
