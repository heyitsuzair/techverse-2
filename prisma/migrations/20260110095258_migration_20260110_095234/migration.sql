-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "locationAddress" TEXT,
ADD COLUMN     "locationLat" DOUBLE PRECISION,
ADD COLUMN     "locationLng" DOUBLE PRECISION,
ADD COLUMN     "pointValue" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "qrCodeUrl" TEXT;

-- CreateTable
CREATE TABLE "BookHistory" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "notes" TEXT,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookHistory_bookId_idx" ON "BookHistory"("bookId");

-- CreateIndex
CREATE INDEX "BookHistory_userId_idx" ON "BookHistory"("userId");

-- CreateIndex
CREATE INDEX "Book_genre_idx" ON "Book"("genre");

-- AddForeignKey
ALTER TABLE "BookHistory" ADD CONSTRAINT "BookHistory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
