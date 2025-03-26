/*
  Warnings:

  - You are about to drop the column `servantId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `servant_products` table. All the data in the column will be lost.
  - You are about to drop the column `servantId` on the `servant_products` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `servant_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servant_id` to the `servant_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_servantId_fkey";

-- DropForeignKey
ALTER TABLE "servant_products" DROP CONSTRAINT "servant_products_productId_fkey";

-- DropForeignKey
ALTER TABLE "servant_products" DROP CONSTRAINT "servant_products_servantId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "servantId",
ADD COLUMN     "servant_id" TEXT;

-- AlterTable
ALTER TABLE "servant_products" DROP COLUMN "productId",
DROP COLUMN "servantId",
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "servant_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_servants" (
    "id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "servant_id" TEXT NOT NULL,

    CONSTRAINT "sale_servants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "servant_products" ADD CONSTRAINT "servant_products_servant_id_fkey" FOREIGN KEY ("servant_id") REFERENCES "servants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servant_products" ADD CONSTRAINT "servant_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_servant_id_fkey" FOREIGN KEY ("servant_id") REFERENCES "servants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_servants" ADD CONSTRAINT "sale_servants_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_servants" ADD CONSTRAINT "sale_servants_servant_id_fkey" FOREIGN KEY ("servant_id") REFERENCES "servants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
