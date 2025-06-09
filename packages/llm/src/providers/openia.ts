import { OpenAI } from "openai";
import { LLMProvider } from "../interfaces/llm";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export class OpenAIProvider implements LLMProvider {
  async complete(prompt: string): Promise<string> {
    const res = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Você responde com base no contexto abaixo.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    return res.data.choices[0].message?.content?.trim() || "";
  }
}
