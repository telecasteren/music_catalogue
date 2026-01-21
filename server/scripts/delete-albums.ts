import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

const deleteAlbums = async () => {
  try {
    // change the condition in where clause to what you want to delete
    const result = await prisma.album.deleteMany({ where: { album: "" } });
    console.log(`Deleted ${result.count} album(s).`);
  } catch (error) {
    console.error("Error deleting albums:", error);
  } finally {
    await prisma.$disconnect();
  }
};

deleteAlbums();

// Run from server folder
// npx ts-node scripts/delete-albums.ts
