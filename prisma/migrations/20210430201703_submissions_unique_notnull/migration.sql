/*
  Warnings:

  - A unique constraint covering the columns `[userId,lessonId,challengeId]` on the table `submissions` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `submissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `challengeId` on table `submissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lessonId` on table `submissions` required. This step will fail if there are existing NULL values in that column.

*/
-- Delete legacy data
DELETE FROM submissions s
WHERE s."userId" IS NULL
   OR s."challengeId" IS NULL
   OR s."lessonId" IS NULL;

-- AlterTable
ALTER TABLE "submissions"
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "challengeId" SET NOT NULL,
ALTER COLUMN "lessonId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "submissions.userId_lessonId_challengeId_unique" ON "submissions"("userId", "lessonId", "challengeId");

-- Drop foreign keys
ALTER TABLE "submissions" 
DROP CONSTRAINT IF EXISTS "submissions_lessonId_fkey",
DROP CONSTRAINT IF EXISTS "submissions_challengeId_fkey",
DROP CONSTRAINT IF EXISTS "submissions_userId_fkey";

-- Recreate foreign key with ON DELETE CASCADE
ALTER TABLE "submissions" 
ADD CONSTRAINT "submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT "submissions_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT "submissions_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
