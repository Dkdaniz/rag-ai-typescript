import { QdrantBaseRepository } from "./base-repository";

export class DocumentRepository extends QdrantBaseRepository {
  protected collectionName = "documents";
}
