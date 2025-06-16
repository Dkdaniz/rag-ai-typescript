import { relations } from "drizzle-orm";
import { varchar, pgTable, timestamp } from "drizzle-orm/pg-core";
import { documents, questions, chunks } from "./";
import { createUUID } from "@repo/utils";

export const users = pgTable("users", {
  id: varchar("id", { length: 36 })
    .$defaultFn(() => createUUID())
    .primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  documents: many(documents),
  questions: many(questions),
  chunks: many(chunks),
}));

export type User = typeof users.$inferSelect;
