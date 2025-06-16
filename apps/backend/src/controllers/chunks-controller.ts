import { FastifyRequest, FastifyReply } from "fastify";
import { ChunkRepository, DocumentRepository } from "@repo/drizzle";
import { ChunkRepositoryQdrant } from "@repo/qdrant";
import { chunkTextByTokens, encoderGeneric } from "@repo/utils";
import { embedding } from "@repo/embedding";

export class ChunkController {
  private chunkRepository: ChunkRepository;
  private documentRepository: DocumentRepository;
  private chunkRepositoryQdrant: ChunkRepositoryQdrant;

  constructor() {
    this.chunkRepository = new ChunkRepository();
    this.documentRepository = new DocumentRepository();
    this.chunkRepositoryQdrant = new ChunkRepositoryQdrant();
  }

  async find(_req: FastifyRequest, reply: FastifyReply) {
    const chunks = await this.chunkRepository.findAll();
    await reply.send(chunks);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { documentId } = request.body as {
      documentId: string;
    };

    const doc = await this.documentRepository.findById({ id: documentId });
    if (!doc) {
      return reply.status(404).send({ error: "Document not found" });
    }

    await this.chunkRepositoryQdrant.initCollection(768, "Cosine");

    const encoder = encoderGeneric("cl100k_base");

    const chunks = chunkTextByTokens({
      encoder: encoder,
      text: doc.text,
      maxTokens: 200,
      overlap: 30,
    });

    for (const content of chunks) {
      const vector = await embedding(content);

      const tokenCount = encoder.encode(content).length;

      const chunk = await this.chunkRepository.create({
        userId: doc.userId,
        documentId,
        content,
        tokenCount,
      });

      await this.chunkRepositoryQdrant.upsert([
        {
          id: chunk.id,
          vector,
          payload: {
            userId: chunk.userId,
            documentId: chunk.documentId,
            content,
          },
        },
      ]);
    }

    encoder.free();

    reply.send({ message: "Chunks created", total: chunks.length });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { content } = request.body as { content: string };

    const encoder = encoderGeneric("cl100k_base");
    const tokenCount = encoder.encode(content).length;

    const updated = await this.chunkRepository.update({
      id,
      data: { content, tokenCount },
    });

    const vector = await embedding(content);

    await this.chunkRepositoryQdrant.initCollection(768, "Cosine");
    await this.chunkRepositoryQdrant.upsert([
      {
        id,
        vector,
        payload: {
          userId: updated.userId,
          documentId: updated.documentId,
          content,
        },
      },
    ]);

    reply.send({ message: "Chunk updated", chunk: updated });
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const chunk = await this.chunkRepository.findById({ id });
    const vector = await this.chunkRepositoryQdrant;
    if (!chunk) return reply.status(404).send({ error: "Chunk not found" });
    reply.send({ chunk, vector });
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await this.chunkRepository.delete({ id });
    await this.chunkRepositoryQdrant.deleteById(id);
    reply.send({ message: "Deleted." });
  }
}
