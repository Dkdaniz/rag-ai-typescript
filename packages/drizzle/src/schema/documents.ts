import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

import { relations } from "drizzle-orm";
import { chunks } from "./chunks";
import { createUUID } from "@repo/utils";

export const documents = pgTable("documents", {
  id: varchar("id", { length: 36 })
    .$defaultFn(() => createUUID())
    .primaryKey(),
  userId: varchar("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  source: text("source").notNull(),
  text: text("text").notNull(),
  hash: varchar("hash", { length: 64 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const documentsRelations = relations(documents, ({ many, one }) => ({
  user: one(users, { fields: [documents.userId], references: [users.id] }),
  chunks: many(chunks),
}));

export type Document = typeof documents.$inferSelect;
