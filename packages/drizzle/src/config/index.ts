import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DATABASE_URL } from "@repo/env";
import * as schema from "../schema";

// Database connection config
const connectionString = DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Client for queries only
const connection = postgres(process.env.DATABASE_URL as string, {
  max: 1,
  ssl: process.env.NODE_ENV === "production" ? "require" : false,
});

// ✅ Drizzle ORM instance com schema tipado
export const db = drizzle(connection, { schema });

export type DB = typeof db;
export type DBTransaction = Parameters<Parameters<DB["transaction"]>[0]>[0];
