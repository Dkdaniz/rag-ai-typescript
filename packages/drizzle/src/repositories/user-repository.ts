import { eq } from "drizzle-orm";
import { BaseRepository } from "./base-repository";
import { users } from "../schema";
import { db } from "../config";

export interface User {
  id: number;
  email: string;
  name: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserRepository extends BaseRepository<User> {
  protected table = users;

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user as unknown as User | undefined;
  }

  async findWithPosts(id: number) {
    const result = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        posts: true,
      },
    });

    return result;
  }
}
