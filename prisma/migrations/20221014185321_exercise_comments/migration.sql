/*
  Warnings:

  - You are about to drop the `Discussion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_parentId_fkey";

-- DropTable
DROP TABLE "Discussion";

-- CreateTable
CREATE TABLE "ExerciseComments" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "userPic" TEXT,
    "content" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "ExerciseComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseComments" ADD CONSTRAINT "ExerciseComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseComments" ADD CONSTRAINT "ExerciseComments_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseComments" ADD CONSTRAINT "ExerciseComments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ExerciseComments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
