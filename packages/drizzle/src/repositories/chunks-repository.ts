import { BaseRepository } from "./base-repository";
import { chunks, Chunk } from "../schema";

export class ChunkRepository extends BaseRepository<Chunk> {
  protected table = chunks;
}
