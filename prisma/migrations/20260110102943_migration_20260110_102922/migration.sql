/*
  Warnings:

  - You are about to drop the column `location` on the `BookHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookHistory" DROP COLUMN "location",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "locationAddress" TEXT,
ADD COLUMN     "locationLat" DOUBLE PRECISION,
ADD COLUMN     "locationLng" DOUBLE PRECISION,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "BookHistory_action_idx" ON "BookHistory"("action");
