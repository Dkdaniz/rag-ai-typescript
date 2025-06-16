import { FastifyInstance } from "fastify";
import { ChunkController } from "../controllers/chunks-controller";

export async function chunksRoute(app: FastifyInstance) {
  const chunkController = new ChunkController();
  app.get("/", chunkController.find.bind(chunkController));
  app.get("/:id", chunkController.findById.bind(chunkController));
  app.post("/", chunkController.create.bind(chunkController));
  app.put("/", chunkController.update.bind(chunkController));
  app.delete("/:id", chunkController.delete.bind(chunkController));
}
