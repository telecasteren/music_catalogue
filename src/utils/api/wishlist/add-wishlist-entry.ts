import type { WishList } from "../../types";

type NewAlbum = Omit<WishList, "id">;

export const addWishlistEntry = async (albumData: NewAlbum) => {
  try {
    const response = await fetch("/wishlist", {
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

    const newAlbum = (await response.json()) as WishList;
    return newAlbum;
  } catch (error) {
    throw new Error("Error adding album: " + (error as Error).message);
  }
};
