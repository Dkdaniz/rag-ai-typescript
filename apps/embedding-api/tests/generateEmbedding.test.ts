import { describe, it, expect } from "vitest";
import { generateEmbedding } from "../src/app/generateEmbedding";

describe("generateEmbedding", () => {
  it("should return a valid embedding array", async () => {
    const vector = await generateEmbedding("The obstacle is the way.");
    expect(Array.isArray(vector)).toBe(true);
    expect(vector.length).toBeGreaterThan(0);
    expect(typeof vector[0]).toBe("number");
  }, 10000); // timeout de 10s
});
