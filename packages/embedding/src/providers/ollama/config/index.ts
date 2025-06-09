import axios from "axios";

import { OLLAMA_EMBEDDING_URL } from "@repo/env";

export const ollmaClient = axios.create({
  baseURL: OLLAMA_EMBEDDING_URL || "http://127.0.0.1:11434/api/embeddings",
});

// Add a request interceptor
ollmaClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
ollmaClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
