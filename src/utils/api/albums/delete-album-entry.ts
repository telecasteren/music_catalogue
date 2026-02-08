export const deleteAlbumEntry = async (id: number) => {
  try {
    const response = await fetch(`/albums/${id}`, {
      method: "DELETE",
    });

    console.log("DeleteBtn id:", id);

    if (!response.ok) {
      throw new Error("Failed to delete album");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error deleting album: " + (error as Error).message);
  }
};
