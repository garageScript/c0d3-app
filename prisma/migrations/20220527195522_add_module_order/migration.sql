/*
  Warnings:

  - Added the required column `order` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "order" INTEGER NOT NULL;
