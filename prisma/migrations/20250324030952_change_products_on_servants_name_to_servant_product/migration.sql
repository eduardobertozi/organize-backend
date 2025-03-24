/*
  Warnings:

  - You are about to drop the `products_on_servants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products_on_servants" DROP CONSTRAINT "products_on_servants_productId_fkey";

-- DropForeignKey
ALTER TABLE "products_on_servants" DROP CONSTRAINT "products_on_servants_servantId_fkey";

-- DropTable
DROP TABLE "products_on_servants";

-- CreateTable
CREATE TABLE "servant_products" (
    "servantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "servant_products_pkey" PRIMARY KEY ("servantId","productId")
);

-- AddForeignKey
ALTER TABLE "servant_products" ADD CONSTRAINT "servant_products_servantId_fkey" FOREIGN KEY ("servantId") REFERENCES "servants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servant_products" ADD CONSTRAINT "servant_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
