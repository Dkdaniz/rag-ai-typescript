import { eq, SQL, SQLWrapper, Table } from "drizzle-orm";
import { db } from "../config";

export type TableWithId = Table & {
  id: { name: "id" };
};

export abstract class BaseRepository<T> {
  protected abstract table: Table;

  async findAll(options?: {
    where?: SQL | SQLWrapper;
    orderBy?: SQL | SQLWrapper;
    limit?: number;
    offset?: number;
  }): Promise<T[]> {
    let query = db.select().from(this.table).$dynamic();

    if (options?.where) {
      query = query.where(options.where as any);
    }

    if (options?.orderBy) {
      query = query.orderBy(options.orderBy as any);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const result = await query.execute();
    return result as T[];
  }

  async findById(input: { id: string }): Promise<T> {
    let query = db
      .select()
      .from(this.table)
      .where(eq((this.table as any).id, input.id));

    const result = await query.execute();
    return result as T;
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const [record] = await db.insert(this.table).values(data).returning();

    return record as unknown as T;
  }

  async update(input: {
    id: number;
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>;
  }): Promise<T | undefined> {
    const [record] = await db
      .update(this.table)
      .set({ ...input.data, updatedAt: new Date() })
      .where(eq((this.table as any).id, input.id))
      .returning();

    return record as T | undefined;
  }

  async delete(input: { id: string }): Promise<T | undefined> {
    const [record] = await db
      .delete(this.table)
      .where(eq((this.table as any).id, input.id))
      .returning();

    return record as T | undefined;
  }
}
