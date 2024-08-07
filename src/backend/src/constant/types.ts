type UrlShortener = {
  id: string;
  url: string;
  shortId: string;
  numberOfVisits: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type { UrlShortener };