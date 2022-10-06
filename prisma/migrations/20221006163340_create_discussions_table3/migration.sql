-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
