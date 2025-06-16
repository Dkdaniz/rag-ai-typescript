import { relations } from "drizzle-orm";
import { uuid, varchar, pgTable, timestamp } from "drizzle-orm/pg-core";
import { documents } from "./documents";
import { questions } from "./questions";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  documents: many(documents),
  questions: many(questions),
}));

export type User = typeof users.$inferSelect;
