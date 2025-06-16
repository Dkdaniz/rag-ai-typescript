import { defineConfig } from "drizzle-kit";
import { POSTGRES_DATABASE_URL } from "@repo/env";

if (!POSTGRES_DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

console.log(POSTGRES_DATABASE_URL);

export default defineConfig({
  schema: "./src/schema/*.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: POSTGRES_DATABASE_URL as string,
    ssl: process.env.NODE_ENV === "production" ? "require" : false,
  },
});
