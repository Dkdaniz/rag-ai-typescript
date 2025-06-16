import { varchar, pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").references(() => users.id),
  content: text("content").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const questionsRelations = relations(questions, ({ one }) => ({
  user: one(users, { fields: [questions.userId], references: [users.id] }),
}));

export type Question = typeof questions.$inferSelect;
