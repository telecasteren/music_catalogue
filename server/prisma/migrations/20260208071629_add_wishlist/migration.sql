-- CreateTable
CREATE TABLE "WishList" (
    "id" SERIAL NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT NOT NULL,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WishList_artist_idx" ON "WishList"("artist");

-- CreateIndex
CREATE INDEX "WishList_album_idx" ON "WishList"("album");
