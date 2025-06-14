import { QdrantClient } from "@qdrant/js-client-rest";
import { QDRANT_DATABASE_URL } from "@repo/env";

export const qdrantClient = new QdrantClient({
  url: QDRANT_DATABASE_URL,
  ...(process.env.QDRANT_API_KEY ? { apiKey: process.env.QDRANT_API_KEY } : {}),
});

qdrantClient.versionInfo().then((res) => {
  console.log(res);
});
