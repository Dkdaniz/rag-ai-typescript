// src/controllers/questions-controller.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { QuestionRepository } from "@repo/drizzle";
import { RAGService, FilterAsk } from "../services";

export class QuestionsController {
  private questionRepository: QuestionRepository;
  private ragService: RAGService;

  constructor() {
    this.questionRepository = new QuestionRepository();
    this.ragService = new RAGService();
  }

  async find(_req: FastifyRequest, reply: FastifyReply) {
    const questions = await this.questionRepository.findAll();
    await reply.send(questions);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { userId, documentId, answer } = request.body as {
      userId: string;
      documentId?: string;
      answer: string;
    };

    const filter: FilterAsk[] = [
      {
        key: "userId",
        value: userId,
      },
    ];

    if (documentId) {
      filter.push({
        key: "documentId",
        value: documentId,
      });
    }

    const response = await this.ragService.ask(answer, filter);

    const question = await this.questionRepository.create({
      userId,
      content: response,
      answer,
    });

    reply.send(question);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const question = await this.questionRepository.findById({ id });

    if (!question)
      return reply.status(404).send({ error: "Question not found" });
    reply.send(question);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await this.questionRepository.delete({ id });
    reply.send({ message: "Deleted." });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { content, answer } = request.body as {
      content?: string;
      answer?: string;
    };

    const updated = await this.questionRepository.update({
      id,
      data: { content, answer },
    });

    reply.send({
      message: "Question updated",
      question: updated,
    });
  }
}
