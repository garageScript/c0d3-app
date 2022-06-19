/*
  Warnings:

  - You are about to drop the column `flagged` on the `exercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "flagged",
ADD COLUMN     "flaggedAt" TIMESTAMP(3);
