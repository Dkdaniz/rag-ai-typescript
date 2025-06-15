import { FastifyInstance } from "fastify";
import * as DocumentController from "../controllers/documents-controller";

export async function documentsRoute(app: FastifyInstance) {
  app.get("/", DocumentController.listDocuments);
  app.post("/", DocumentController.createDocument);
  app.get("/:id", DocumentController.getDocumentById);
  app.delete("/:id", DocumentController.deleteDocument);
}
