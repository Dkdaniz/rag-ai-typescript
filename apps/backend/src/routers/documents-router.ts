import { FastifyInstance } from "fastify";
import { DocumentController } from "../controllers/documents-controller";

export async function documentsRoute(app: FastifyInstance) {
  const documentController = new DocumentController();
  app.get("/", documentController.find);
  app.post("/", documentController.create);
  app.get("/:id", documentController.findById);
  app.delete("/:id", documentController.delete);
}
