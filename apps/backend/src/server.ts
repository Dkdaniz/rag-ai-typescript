import Fastify from "fastify";
import {
  chunksRoute,
  documentsRoute,
  usersRoute,
  questionsRoute,
} from "./routers";

const app = Fastify({ logger: true });

app.register(chunksRoute, { prefix: "/chunks" });
app.register(documentsRoute, { prefix: "/documents" });
app.register(usersRoute, { prefix: "/users" });
app.register(questionsRoute, { prefix: "/questions" });

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
