import { QdrantBaseRepository } from "./base-repository";

export class DocumentRepositoryQdrant extends QdrantBaseRepository {
  protected collectionName = "documents";
}
