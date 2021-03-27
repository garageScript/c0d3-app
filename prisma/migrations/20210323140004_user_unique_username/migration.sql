/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[username]` on the table `users`. If there are existing duplicate values, the migration will fail.
  - Made the column `username` on table `users` required. The migration will fail if there are existing NULL values in that column.

*/
-- Delete duplicate usernames while keeping the latest entry
DELETE FROM "users" A USING "users" B
WHERE A.username = B.username AND A.id < B.id;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users.username_unique" ON "users"("username");
