-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Album_artist_idx" ON "Album"("artist");

-- CreateIndex
CREATE INDEX "Album_genre_idx" ON "Album"("genre");
