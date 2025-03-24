-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_supplier_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "supplier_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
