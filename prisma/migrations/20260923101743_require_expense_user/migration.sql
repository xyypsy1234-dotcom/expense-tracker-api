/*
  Warnings:

  - Made the column `userId` on table `Expense` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "userId" SET NOT NULL;
