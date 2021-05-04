-- Delete legacy data
DELETE FROM "submissions"
WHERE "status" = 'underReview';

-- AlterTable
ALTER TABLE "submissions"
ADD CONSTRAINT "submissions_status_check"
CHECK ("status" IN ('needMoreWork', 'open', 'passed'));

ALTER TABLE "submissions" ALTER COLUMN "status" SET NOT NULL;
ALTER TABLE "submissions" ALTER COLUMN "status" SET DEFAULT 'open';
