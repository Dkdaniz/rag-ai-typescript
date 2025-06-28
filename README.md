# 🧠 RAG AI System - TypeScript Monorepo

This project is a complete **Retrieval-Augmented Generation (RAG)** system built with **TypeScript** in a monorepo architecture. It integrates document upload, semantic search using vector embeddings, and intelligent responses powered by local language models.

## 🔧 Tech Stack

| Layer         | Technology                                                            |
|---------------|-----------------------------------------------------------------------|
| Backend       | Fastify, TypeScript, Tsup                                             |
| Embeddings    | Ollama (`huggingface/nomic-ai/nomic-embed-text-v2-moe-gguf`)          |
| Model         | Ollama (`nomic-embed-text-v2`)                                        |
| Vector DB     | Qdrant                                                                |
| Relational DB | PostgreSQL                                                            |
| ORM           | Drizzle ORM                                                           |
| Workspace     | TurboRepo, PNPM                                                       |
| Build Tool    | Tsup                                                                  |
| Dev Tools     | ESLint, Prettier, VSCode configuration                                |

---

## 🚀 Getting Started

### 1. Requirements

- Node.js v20+
- PNPM (`npm i -g pnpm`)
- Docker + Docker Compose (for Qdrant and PostgreSQL)
- **Ollama** installed locally ([official site](https://ollama.com/))

#### Install Ollama

```
# macOS (via Homebrew)
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh
```

#### Pull required Embeddings Model

```
ollama pull huggingface/nomic-ai/nomic-embed-text-v2-moe-gguf
```

#### Pull required LLM Model 

```
ollama pull mistral:latest
```

#### Install dependencies

```
pnpm install
```

#### Start infrastructure services

```
docker-compose up -d
```

#### Create a .env

```
POSTGRES_USER=local_user
POSTGRES_PASSWORD=local_password
POSTGRES_DB=rag
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE_URL=postgres://local_user:local_password@localhost:5432/rag

QDRANT_ATABASE_URL=http://127.0.0.1:6333

OLLAMA_URL="http://127.0.0.1:11434"
OLLAMA_EMBEDDING_MODEL="hf.co/nomic-ai/nomic-embed-text-v2-moe-gguf"
OLLAMA_CHAT_MODEL="mistral"

OPENAI_API_KEY=
AI_IS_LOCAL=true #if is false, OPENAI_API_KEY is required.
```

### Useful Commands

```
ollama serve             # Run ollama server
pnpm dev                 # Run backend in development mode
pnpm build               # Build packages
docker-compose up -d     # Start Qdrant and PostgreSQL
```


