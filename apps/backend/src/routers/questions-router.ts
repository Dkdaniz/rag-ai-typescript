import { FastifyInstance } from "fastify";
import { QuestionsController } from "../controllers/questions-controller";

export async function questionsRoute(app: FastifyInstance) {
  const questionController = new QuestionsController();
  app.get("/", questionController.find.bind(questionController));
  app.get("/:id", questionController.findById.bind(questionController));
  app.post("/", questionController.create.bind(questionController));
  app.put("/", questionController.update.bind(questionController));
  app.delete("/:id", questionController.delete.bind(questionController));
}
