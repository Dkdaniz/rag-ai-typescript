import { varchar, pgTable, timestamp, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { createUUID } from "@repo/utils";

export const questions = pgTable("questions", {
  id: varchar("id", { length: 36 })
    .$defaultFn(() => createUUID())
    .primaryKey(),
  userId: varchar("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const questionsRelations = relations(questions, ({ one }) => ({
  user: one(users, { fields: [questions.userId], references: [users.id] }),
}));

export type Question = typeof questions.$inferSelect;
