import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const postgresClient = drizzle(process.env.DATABASE_URL!);
