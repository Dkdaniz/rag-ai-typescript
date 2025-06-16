import { FastifyInstance } from "fastify";
import { DocumentController } from "../controllers/documents-controller";

export async function documentsRoute(app: FastifyInstance) {
  const documentController = new DocumentController();
  app.get("/", documentController.find.bind(documentController));
  app.get("/:id", documentController.findById.bind(documentController));
  app.post("/", documentController.create.bind(documentController));
  app.put("/", documentController.update.bind(documentController));
  app.delete("/:id", documentController.delete.bind(documentController));
}
