import Fastify from "fastify";
import { generateEmbedding } from "./app/generateEmbedding";

const app = Fastify();

app.post("/embedding", async (req, res) => {
  const { text } = req.body as { text: string };
  const embedding = await generateEmbedding(text);
  return { embedding };
});

app.listen({ port: 3001 }, () => {
  console.log("🧠 Embedding server on http://localhost:3001");
});
