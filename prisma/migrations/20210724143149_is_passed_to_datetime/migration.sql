-- Remove unused columns
ALTER TABLE "userLessons"
DROP COLUMN "isEnrolled",
DROP COLUMN "isTeaching";

-- Rename isPassed to passedAt
ALTER TABLE "userLessons"
RENAME COLUMN "isPassed" TO "passedAt";

-- Change passedAt column type to TIMESTAMPTZ, converting existing values
ALTER TABLE "userLessons"
ALTER COLUMN "passedAt" TYPE TIMESTAMPTZ(6)
USING to_timestamp(cast("passedAt" AS bigint) / 1000);
