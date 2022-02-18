/*
  Warnings:

  - You are about to drop the column `explaination` on the `exercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "explaination",
ADD COLUMN     "explanation" TEXT;
