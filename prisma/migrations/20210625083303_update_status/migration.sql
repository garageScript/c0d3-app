-- AlterTable
ALTER TABLE "submissions"
DROP CONSTRAINT "submissions_status_check",
ADD CONSTRAINT "submissions_status_check"
CHECK ("status" IN ('overwritten', 'needMoreWork', 'open', 'passed'))