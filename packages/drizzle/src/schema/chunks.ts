import {
  pgTable,
  text,
  timestamp,
  integer,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { documents, users } from "./";
import { createUUID } from "@repo/utils";

export const chunks = pgTable("chunks", {
  id: varchar("id", { length: 36 })
    .$defaultFn(() => createUUID())
    .primaryKey(),
  userId: varchar("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  documentId: varchar("document_id")
    .references(() => documents.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  tokenCount: integer("token_count").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chunksRelations = relations(chunks, ({ one }) => ({
  document: one(documents, {
    fields: [chunks.documentId],
    references: [documents.id],
  }),
  user: one(users, {
    fields: [chunks.userId],
    references: [users.id],
  }),
}));

export type Chunk = typeof chunks.$inferSelect;
