-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "removedAt" TIMESTAMP(3),
ADD COLUMN     "removedById" INTEGER;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_removedById_fkey" FOREIGN KEY ("removedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
