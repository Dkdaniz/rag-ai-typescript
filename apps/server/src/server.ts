import Fastify from "fastify";
import { askRoute } from "./routers/ask";
import { ingestRoute } from "./routers/ingest";
import { searchRoute } from "./routers/search";

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
