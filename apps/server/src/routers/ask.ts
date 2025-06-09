import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { RAGService } from "../services/rag-service";

export async function askRoute(
  app: FastifyInstance,
  _opts: FastifyPluginOptions
) {
  const ragService = new RAGService();

  app.post("/", async (request, reply) => {
    const { question } = request.body as { question: string };
    const answer = await ragService.ask(question);
    reply.send({ answer });
  });
}
