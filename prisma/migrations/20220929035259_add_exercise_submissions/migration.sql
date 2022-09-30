-- CreateTable
CREATE TABLE "exerciseSubmissions" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "userAnswer" TEXT NOT NULL,

    CONSTRAINT "exerciseSubmissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exerciseSubmissions" ADD CONSTRAINT "exerciseSubmissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exerciseSubmissions" ADD CONSTRAINT "exerciseSubmissions_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
