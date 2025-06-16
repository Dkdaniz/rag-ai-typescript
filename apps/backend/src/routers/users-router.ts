import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/users-controller";

export async function usersRoute(app: FastifyInstance) {
  const userController = new UserController();
  app.get("/", userController.find.bind(userController));
  app.get("/:id", userController.findById.bind(userController));
  app.post("/", userController.create.bind(userController));
  app.put("/", userController.update.bind(userController));
  app.delete("/:id", userController.delete.bind(userController));
}
