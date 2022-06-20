-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "flaggedById" INTEGER;

-- AddForeignKey
ALTER TABLE "exercises" ADD FOREIGN KEY ("flaggedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
