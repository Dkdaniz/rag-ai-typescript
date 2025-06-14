import axios from "axios";
import { LLMProvider, Message } from "../../interfaces/llm";
import { OLLAMA_URL, OLLAMA_CHAT_MODEL } from "@repo/env";

export class OllamaProvider implements LLMProvider {
  formatMessagesForOllama(messages: Message[]): string {
    console.log({ messages });
    return (
      messages.map(({ role, content }) => `${role}: ${content}`).join("\n") +
      "\nassistant:"
    );
  }

  async complete(messages: Message[]): Promise<string> {
    const message = this.formatMessagesForOllama(messages);

    console.log({ message });

    const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
      model: OLLAMA_CHAT_MODEL,
      prompt: message,
      stream: false,
    });

    return response.data.response?.trim() || "";
  }
}
