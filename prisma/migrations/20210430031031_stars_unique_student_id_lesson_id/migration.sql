/*
  Warnings:

  - A unique constraint covering the columns `[studentId,lessonId]` on the table `stars` will be added. If there are existing duplicate values, this will fail.

*/
-- Delete duplicates (2 rows)
DELETE FROM stars s
WHERE s.id in (
  SELECT s1.id
  FROM stars s1, stars s2
  WHERE s1.id < s2.id
    AND s1."studentId" = s2."studentId"
    AND s1."lessonId" = s2."lessonId"
);

-- CreateIndex
CREATE UNIQUE INDEX "stars.studentId_lessonId_unique" ON "stars"("studentId", "lessonId");
