/*
  Warnings:

  - You are about to drop the column `servant_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_servant_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "servant_id";
