import type { MusicEntry } from "../types";

export const searchEvents = (albums: MusicEntry[]) => {
  const searchInput = document.getElementById("search-bar") as HTMLInputElement;

  const query = searchInput.value;
  const searchResults = albums.filter(
    (item) =>
      item.artist.toLowerCase().includes(query) ||
      item.album.toLowerCase().includes(query) ||
      item.genre.toLowerCase().includes(query) ||
      String(item.releaseYear).includes(query),
  );

  const sortedResults = searchResults.sort((a, b) =>
    a.artist.localeCompare(b.artist),
  );

  return sortedResults;
};
