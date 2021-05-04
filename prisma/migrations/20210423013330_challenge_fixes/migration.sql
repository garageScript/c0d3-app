/*
  Warnings:

  - You are about to drop the column `status` on the `challenges` table. All the data in the column will be lost.
  - Made the column `description` on table `challenges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `challenges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `challenges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lessonId` on table `challenges` required. This step will fail if there are existing NULL values in that column.

*/
-- Delete legacy data
DELETE FROM "challenges"
WHERE 
  "challenges"."description" IS NULL
  OR "challenges"."title" IS NULL
  OR "challenges"."order" IS NULL
  OR "challenges"."lessonId" IS NULL;

-- AlterTable
ALTER TABLE "challenges" 
DROP COLUMN "status",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "order" SET NOT NULL,
ALTER COLUMN "lessonId" SET NOT NULL,
DROP CONSTRAINT IF EXISTS "challenges_lessonId_fkey";

-- Recreate foreign key with ON DELETE CASCADE
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_lessonId_fk" 
FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
