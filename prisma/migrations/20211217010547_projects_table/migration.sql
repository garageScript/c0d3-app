-- AlterTable
ALTER TABLE "users" ADD COLUMN     "projectsId" INTEGER;

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "docUrl" VARCHAR(255),
    "githubUrl" VARCHAR(255),
    "videoUrl" VARCHAR(255),
    "order" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "chatUrl" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects.slug_unique" ON "projects"("slug");

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
