-- Create slug field
ALTER TABLE "lessons" ADD COLUMN "slug" VARCHAR(50);

-- Add slug's to existing lessons
UPDATE "lessons"
SET "slug" = 'js' || "lessons".order;

-- Make slug field required
ALTER TABLE "lessons" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex (ensure no deplicate slugs)
CREATE UNIQUE INDEX "lessons.slug_unique" ON "lessons"("slug");
