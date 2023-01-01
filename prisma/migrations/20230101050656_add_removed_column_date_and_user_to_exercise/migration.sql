/*
  Warnings:

  - You are about to drop the column `removed` on the `exercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "removed",
ADD COLUMN     "removedAt" TIMESTAMP(3),
ADD COLUMN     "removedById" INTEGER;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_removedById_fkey" FOREIGN KEY ("removedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
