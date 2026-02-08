import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /wishlist
router.get("/", async (_, res) => {
  try {
    const wishlist = await prisma.wishList.findMany({
      orderBy: {
        artist: "desc",
      },
    });
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /wishlist
router.post("/", async (req, res) => {
  try {
    const { artist, album } = req.body;

    const trimmedArtist = artist.trim();
    const trimmedAlbum = album.trim();

    const existingList = await prisma.wishList.findFirst({
      where: {
        artist: { equals: trimmedArtist, mode: "insensitive" },
        album: { equals: trimmedAlbum, mode: "insensitive" },
      },
    });

    if (existingList) {
      return res
        .status(409)
        .json({ error: "Album already exists in wishlist" });
    }

    const newList = await prisma.wishList.create({
      data: { artist: trimmedArtist, album: trimmedAlbum },
    });
    res.status(201).json(newList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /wishlist/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.wishList.delete({ where: { id } });
    res.status(200).json({ message: "Album deleted from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete album from wishlist" });
  }
});

export default router;
