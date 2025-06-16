import { FastifyRequest, FastifyReply } from "fastify";
import { UserRepository } from "@repo/drizzle";

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async find(_req: FastifyRequest, reply: FastifyReply) {
    const users = await this.userRepository.findAll();
    await reply.send(users);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { email, name } = request.body as {
      email: string;
      name?: string;
    };

    const user = await this.userRepository.create({
      email,
      name,
    });

    reply.send(user);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const user = await this.userRepository.findById({ id });

    if (!user) return reply.status(404).send({ error: "User not found" });
    reply.send(user);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { email, name } = request.body as {
      email?: string;
      name?: string;
    };

    const updated = await this.userRepository.update({ id, email, name });
    reply.send(updated);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await this.userRepository.delete({ id });
    reply.send({ message: "Deleted." });
  }
}
