export const deleteWishlistEntry = async (id: number) => {
  try {
    const response = await fetch(`/wishlist/${id}`, {
      method: "DELETE",
    });

    console.log("DeleteBtn id:", id);

    if (!response.ok) {
      throw new Error("Failed to delete from wishlist");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      "Error deleting from wishlist: " + (error as Error).message,
    );
  }
};
