import { OpenAI } from "openai";
import { LLMProvider, Message } from "../../interfaces/llm";
import { OPENAI_API_KEY } from "@repo/env";

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export class OpenAIProvider implements LLMProvider {
  async complete(messages: Message[]): Promise<string> {
    try {
      const res = await client.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        temperature: 0.2,
      });

      const choice = res.choices?.[0];
      const message = choice?.message?.content;

      if (!message) {
        console.error("No content returned from OpenAI:", res);
        throw new Error("No content in OpenAI response.");
      }

      return message.trim();
    } catch (error) {
      console.error("OpenAI completion error:", error);
      throw new Error("Failed to complete prompt with OpenAI.");
    }
  }
}
