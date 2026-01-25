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

    if (response.status === 409) {
      throw new Error("Album already exists");
    }

    if (!response.ok) {
      throw new Error("Failed to add album");
    }

    const newAlbum = (await response.json()) as MusicEntry;
    return newAlbum;
  } catch (error) {
    throw new Error("Error adding album: " + (error as Error).message);
  }
};
