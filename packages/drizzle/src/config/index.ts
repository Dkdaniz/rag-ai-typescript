import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { POSTGRES_DATABASE_URL } from "@repo/env";
import * as schema from "../schema";

// Database connection config
const connectionString = POSTGRES_DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Client for queries only
export const connection = postgres(connectionString, {
  max: 1,
  ssl: process.env.NODE_ENV === "production" ? "require" : false,
});

// ✅ Drizzle ORM instance com schema
export const db = drizzle(connection, { schema });

export type DB = typeof db;
export type DBTransaction = Parameters<Parameters<DB["transaction"]>[0]>[0];
