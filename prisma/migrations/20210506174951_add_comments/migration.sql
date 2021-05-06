-- CreateTable
CREATE TABLE "Comment" (
    "submissionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "line" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment.id_unique" ON "Comment"("id");

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
