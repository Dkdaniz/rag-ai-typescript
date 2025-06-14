import axios from "axios";

import { OLLAMA_URL } from "@repo/env";

export const ollmaClient = axios.create({
  baseURL: OLLAMA_URL || "http://127.0.0.1:11434",
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
