import axios from "axios";

import { OLLAMA_EMBEDDING_URL } from "@repo/env";

export const ollmaClient = axios.create({
  baseURL: OLLAMA_EMBEDDING_URL || "http://127.0.0.1:11434/api/embeddings",
});
