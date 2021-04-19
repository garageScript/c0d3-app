-- AddForeignKey
ALTER TABLE "stars" ADD FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Make the column not nullable
ALTER TABLE "stars" ALTER COLUMN "lessonId" SET NOT NULL;
