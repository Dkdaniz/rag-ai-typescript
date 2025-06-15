import { FastifyRequest, FastifyReply } from "fastify";
import crypto from "crypto";
import { DocumentRepository } from "@repo/drizzle";

export async function listDocuments(_req: FastifyRequest, reply: FastifyReply) {
  const documentRepository = new DocumentRepository();
  const docs = await documentRepository.findAll();

  await reply.send(docs);
}

export async function createDocument(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { text, source, userId } = request.body as {
    text: string;
    source: string;
    userId: number;
  };

  const documentRepository = new DocumentRepository();
  const hash = crypto.createHash("sha256").update(text).digest("hex");
  const doc = await documentRepository.create({
    userId: userId,
    text: text,
    source: source,
    hash: hash,
  });

  reply.send(doc);
}

export async function getDocumentById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const documentRepository = new DocumentRepository();
  const doc = await documentRepository.findById({ id });

  if (!doc) return reply.status(404).send({ error: "Document not found" });
  reply.send(doc);
}

export async function deleteDocument(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const documentRepository = new DocumentRepository();
  await documentRepository.delete({ id });
  reply.send({ message: "Deleted." });
}
