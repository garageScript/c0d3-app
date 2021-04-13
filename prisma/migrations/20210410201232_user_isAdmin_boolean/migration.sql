-- Alter table changing the column type, converting the values to booleans
ALTER TABLE "users" ALTER COLUMN "isAdmin" TYPE boolean
USING CASE "isAdmin" WHEN 'true' THEN TRUE ELSE FALSE END;

-- Set the default value for the column
ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT false;

-- Make the column not nullable
ALTER TABLE "users" ALTER COLUMN "isAdmin" SET NOT NULL;
