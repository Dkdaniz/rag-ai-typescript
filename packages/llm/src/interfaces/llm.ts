export interface LLMProvider {
  complete(prompt: string): Promise<string>;
}
