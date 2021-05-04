/*
  Warnings:

  - Made the column `description` on table `lessons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `lessons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `lessons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "lessons" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "order" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
