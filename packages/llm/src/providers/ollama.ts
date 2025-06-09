import axios from "axios";
import { LLMProvider } from "../prov";

export class OllamaProvider implements LLMProvider {
  async complete(prompt: string): Promise<string> {
    const response = await axios.post("http://localhost:11434/api/chat", {
      model: process.env.OLLAMA_LLM_MODEL || "mistral",
      messages: [{ role: "user", content: prompt }],
    });

    return response.data.message?.content?.trim() || "";
  }
}
