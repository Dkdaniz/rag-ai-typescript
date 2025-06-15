import { BaseRepository } from "./base-repository";
import { documents, Document } from "../schema";

export class DocumentRepository extends BaseRepository<Document> {
  protected table = documents;
}
