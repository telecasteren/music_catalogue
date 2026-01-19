import Library from "../utils/helpers/mockup-data.json";
import type { MusicEntry } from "./types";

export const searchLibrary = (query: string) => {
  if (!query) return Library as MusicEntry[];

  const lowerQuery = query.toLowerCase();

  const results = (Library as MusicEntry[]).filter(
    (item) =>
      item.artist.toLowerCase().includes(lowerQuery) ||
      item.album.toLowerCase().includes(lowerQuery) ||
      item.genre.toLowerCase().includes(lowerQuery) ||
      String(item.releaseYear).includes(lowerQuery),
  );

  return results;
};
