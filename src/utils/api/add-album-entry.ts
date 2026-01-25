import type { MusicEntry } from "../types";

type NewAlbum = Omit<MusicEntry, "id" | "addedDate">;

export const addAlbumEntry = async (albumData: NewAlbum) => {
  try {
    const response = await fetch("/albums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(albumData),
    });

    if (!response.ok) {
      console.error("Failed to add album:", response.statusText);
      return null;
    }

    const newAlbum = (await response.json()) as MusicEntry;
    return newAlbum;
  } catch (error) {
    console.error("Error adding album:", error);
    return null;
  }
};
