import type { MusicEntry } from "../types";

export const sortEvents = (
  sortKey: string,
  albums: MusicEntry[],
  direction: "asc" | "desc" = "asc",
) => {
  const albumsCopy = [...albums];
  const isAsc = direction === "asc";

  if (sortKey === "artist" && isAsc) {
    albumsCopy.sort((a, b) => a.artist.localeCompare(b.artist));
  } else if (sortKey === "album" && isAsc) {
    albumsCopy.sort((a, b) => a.album.localeCompare(b.album));
  } else if (sortKey === "genre" && isAsc) {
    albumsCopy.sort((a, b) => a.genre.localeCompare(b.genre));
  } else if (sortKey === "releaseYear" && isAsc) {
    albumsCopy.sort((a, b) => a.releaseYear - b.releaseYear);
  } else if (sortKey === "artist" && !isAsc) {
    albumsCopy.sort((a, b) => b.artist.localeCompare(a.artist));
  } else if (sortKey === "album" && !isAsc) {
    albumsCopy.sort((a, b) => b.album.localeCompare(a.album));
  } else if (sortKey === "genre" && !isAsc) {
    albumsCopy.sort((a, b) => b.genre.localeCompare(a.genre));
  } else if (sortKey === "releaseYear" && !isAsc) {
    albumsCopy.sort((a, b) => b.releaseYear - a.releaseYear);
  }

  return albumsCopy;
};
