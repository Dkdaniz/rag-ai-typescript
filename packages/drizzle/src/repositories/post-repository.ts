import { eq } from "drizzle-orm";
import { BaseRepository } from "./base-repository";
import { posts } from "../schema";
import { db } from "../config";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class PostRepository extends BaseRepository<Post> {
  protected table = posts;

  async findByAuthor(authorId: number): Promise<Post[]> {
    return db.select().from(posts).where(eq(posts.authorId, authorId));
  }

  async findWithAuthor(id: number) {
    const result = await db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: {
        author: true,
      },
    });

    return result;
  }
}
