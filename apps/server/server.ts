import Fastify from "fastify";
import { askRoute } from "./routes/ask";
import { ingestRoute } from "./routes/ingest";
import { searchRoute } from "./routes/search";

const app = Fastify({ logger: true });

app.register(askRoute, { prefix: "/ask" });
app.register(ingestRoute, { prefix: "/ingest" });
app.register(searchRoute, { prefix: "/search" });

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`🚀 Server ready at ${address}`);
});
