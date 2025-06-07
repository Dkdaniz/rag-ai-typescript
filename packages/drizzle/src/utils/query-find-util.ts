import { and, eq, SQLWrapper } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type * as schema from "../schema";

export function queryFind<T extends object>(
  input: T,
  model: any,
  db: PostgresJsDatabase<typeof schema>
) {
  const filters: SQLWrapper[] = [];

  Object.entries(input).forEach(([key, value]) => {
    const columnName = model[key]?.name;
    if (!columnName) return;

    filters.push(eq(model[key], value));
  });

  return db
    .select()
    .from(model)
    .where(and(...filters));
}
