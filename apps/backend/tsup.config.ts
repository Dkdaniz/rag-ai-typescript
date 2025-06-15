import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/server.ts"],
  format: ["esm", "cjs"],
  sourcemap: true,
  minify: true,
  target: "esnext",
  outDir: "dist",
  noExternal: [
    "@repo/embedding",
    "@repo/drizzle",
    "@repo/env",
    "@repo/llm",
    "@repo/qdrant",
  ],
});
