import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const POSTGRES_DATABASE_URL = process.env.POSTGRES_DATABASE_URL;

export const QDRANT_DATABASE_URL = process.env.QDRANT_DATABASE_URL;
export const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

export const OLLAMA_URL = process.env.OLLAMA_URL;
export const OLLAMA_EMBEDDING_MODEL = process.env.OLLAMA_EMBEDDING_MODEL;
export const OLLAMA_CHAT_MODEL = process.env.OLLAMA_CHAT_MODEL;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const AI_IS_LOCAL = process.env.AI_IS_LOCAL == "true";
