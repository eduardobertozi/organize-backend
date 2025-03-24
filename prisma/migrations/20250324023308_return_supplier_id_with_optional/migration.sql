/*
  Warnings:

  - Made the column `supplier_id` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_supplier_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "supplier_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
