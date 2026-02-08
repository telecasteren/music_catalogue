import type { MusicEntry, WishList } from "../types";

export const searchCatalogueEvents = (albums: MusicEntry[]) => {
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

export const searchWishlistEvents = (albums: WishList[]) => {
  const searchInput = document.getElementById("search-bar") as HTMLInputElement;

  const query = searchInput.value;
  const searchResults = albums.filter(
    (item) =>
      item.artist.toLowerCase().includes(query) ||
      item.album.toLowerCase().includes(query),
  );

  const sortedResults = searchResults.sort((a, b) =>
    a.artist.localeCompare(b.artist),
  );

  return sortedResults;
};
