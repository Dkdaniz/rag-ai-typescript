export interface QdrantPayload {
  [key: string]: string | number | boolean | null | string[];
}

export interface QdrantPoint {
  id: string | number;
  vector: number[];
  payload?: QdrantPayload;
}

export interface QdrantSearchResult {
  id: string | number;
  score: number;
  payload?: QdrantPayload;
}

export type QdrantFilter = {
  key: string;
  value: string;
};
