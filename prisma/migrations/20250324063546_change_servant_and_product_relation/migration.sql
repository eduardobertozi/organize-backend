/*
  Warnings:

  - You are about to drop the `servant_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "servant_products" DROP CONSTRAINT "servant_products_productId_fkey";

-- DropForeignKey
ALTER TABLE "servant_products" DROP CONSTRAINT "servant_products_servantId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "servantId" TEXT;

-- DropTable
DROP TABLE "servant_products";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_servantId_fkey" FOREIGN KEY ("servantId") REFERENCES "servants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
