import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const POSTGRES_DATABASE_URL = process.env.POSTGRES_DATABASE_URL;

export const QDRANT_DATABASE_URL = process.env.QDRANT_DATABASE_URL;
export const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

export const OLLAMA_EMBEDDING_URL = process.env.OLLAMA_EMBEDDING_URL;
export const OLLAMA_EMBEDDING_MODEL = process.env.OLLAMA_EMBEDDING_MODEL;
