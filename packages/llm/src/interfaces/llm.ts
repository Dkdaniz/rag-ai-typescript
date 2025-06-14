import { ChatCompletionMessageParam } from "openai/resources";

export type Message = ChatCompletionMessageParam;
export interface LLMProvider {
  complete(message: Message[]): Promise<string>;
}
