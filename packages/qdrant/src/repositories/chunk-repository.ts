import { QdrantBaseRepository } from "./base-repository";

export class ChunkRepositoryQdrant extends QdrantBaseRepository {
  protected collectionName = "chunks";
}
