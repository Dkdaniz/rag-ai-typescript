import { FastifyRequest, FastifyReply } from "fastify";
import crypto from "crypto";
import { DocumentRepository } from "@repo/drizzle";

export class DocumentController {
  private documentRepository: DocumentRepository;

  constructor() {
    this.documentRepository = new DocumentRepository();
  }

  async find(_req: FastifyRequest, reply: FastifyReply) {
    const docs = await this.documentRepository.findAll();

    await reply.send(docs);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { text, source, userId } = request.body as {
      text: string;
      source: string;
      userId: string;
    };

    const hash = crypto.createHash("sha256").update(text).digest("hex");
    const doc = await this.documentRepository.create({
      userId: userId,
      text: text,
      source: source,
      hash: hash,
    });

    reply.send(doc);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const doc = await this.documentRepository.findById({ id });

    if (!doc) return reply.status(404).send({ error: "Document not found" });
    reply.send(doc);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await this.documentRepository.delete({ id });
    reply.send({ message: "Deleted." });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id, text, source } = request.body as {
      id: string;
      text: string;
      source: string;
    };

    const data: {
      id: string;
      text?: string;
      source?: string;
      hash?: string;
    } = { id };

    if (text) {
      const hash = crypto.createHash("sha256").update(text).digest("hex");
      data.hash = hash;
      data.text = text;
    }

    if (source) {
      data.source = source;
    }

    const updated = await this.documentRepository.update({
      id,
      data,
    });

    reply.send({ message: "Document updated", documents: updated });
  }
}
