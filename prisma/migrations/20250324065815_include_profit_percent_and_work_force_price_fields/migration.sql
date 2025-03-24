/*
  Warnings:

  - Added the required column `profitPercent` to the `servants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workForcePrice` to the `servants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servants" ADD COLUMN     "profitPercent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "workForcePrice" DOUBLE PRECISION NOT NULL;
