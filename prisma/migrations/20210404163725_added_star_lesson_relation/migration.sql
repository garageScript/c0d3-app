-- Clean orphan values
DELETE FROM "stars"
WHERE
	"lessonId" IS NULL
	OR "studentId" IS NULL
	OR "mentorId" IS NULL;

-- AddForeignKey
ALTER TABLE "stars" ADD FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Make the columns not nullable
ALTER TABLE "stars" ALTER COLUMN "lessonId" SET NOT NULL;
ALTER TABLE "stars" ALTER COLUMN "studentId" SET NOT NULL;
ALTER TABLE "stars" ALTER COLUMN "mentorId" SET NOT NULL;

-- Drop and recreate student and mentor FK to update the ON DELETE action
ALTER TABLE "stars" DROP CONSTRAINT "stars_mentorId_fkey";
ALTER TABLE "stars" DROP CONSTRAINT "stars_studentId_fkey";

ALTER TABLE "stars" ADD CONSTRAINT "stars_mentorId_fkey" 
FOREIGN KEY ("mentorId") REFERENCES "users"("id") 
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE "stars" ADD CONSTRAINT "stars_studentId_fkey" 
FOREIGN KEY ("studentId") REFERENCES "users"("id") 
ON DELETE CASCADE
ON UPDATE CASCADE;
