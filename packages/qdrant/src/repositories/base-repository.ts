import { qdrantClient } from "../config";
import type {
  QdrantPoint,
  QdrantSearchResult,
  QdrantPayload,
  QdrantFilter,
} from "../types/qdrant";

export abstract class QdrantBaseRepository {
  protected abstract collectionName: string;

  async initCollection(size: number, distance: "Cosine" | "Dot" | "Euclid") {
    const collections = await qdrantClient.getCollections();
    const exists = collections.collections.find(
      (c) => c.name === this.collectionName
    );

    if (!exists) {
      await qdrantClient.createCollection(this.collectionName, {
        vectors: { size, distance, on_disk: true },
      });
    }

    console.log(collections);
  }

  async upsert(points: QdrantPoint[]): Promise<void> {
    await qdrantClient.upsert(this.collectionName, { points });
  }

  async deleteById(id: string): Promise<void> {
    await qdrantClient.delete(this.collectionName, { points: [id] });
  }

  async search(
    vector: number[],
    topK = 5,
    filtersByFields?: QdrantFilter[]
  ): Promise<QdrantSearchResult[]> {
    const paramFilter = filtersByFields
      ? filtersByFields.map((filter) => {
          return {
            key: filter.key,
            match: {
              value: filter.value,
            },
          };
        })
      : [];

    const filter = paramFilter.length === 0 ? {} : { must: paramFilter };

    const result = await qdrantClient.search(this.collectionName, {
      vector,
      limit: topK,
      filter,
    });

    return result.map((r) => ({
      id: r.id,
      score: r.score,
      payload: r.payload as QdrantPayload,
    }));
  }

  async drop(): Promise<void> {
    await qdrantClient.deleteCollection(this.collectionName);
  }
}
