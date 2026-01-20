import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /albums
router.get("/", async (_, res) => {
  try {
    const albums = await prisma.album.findMany({
      orderBy: {
        releaseYear: "desc",
      },
    });
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /albums
router.post("/", async (req, res) => {
  try {
    const { artist, album, genre, releaseYear } = req.body;
    const newAlbum = await prisma.album.create({
      data: { artist, album, genre, releaseYear },
    });
    res.status(201).json(newAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
