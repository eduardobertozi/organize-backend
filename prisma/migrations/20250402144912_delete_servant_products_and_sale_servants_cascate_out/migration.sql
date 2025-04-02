-- DropForeignKey
ALTER TABLE "sale_servants" DROP CONSTRAINT "sale_servants_sale_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_servants" DROP CONSTRAINT "sale_servants_servant_id_fkey";

-- DropForeignKey
ALTER TABLE "servant_products" DROP CONSTRAINT "servant_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "servant_products" DROP CONSTRAINT "servant_products_servant_id_fkey";

-- AddForeignKey
ALTER TABLE "servant_products" ADD CONSTRAINT "servant_products_servant_id_fkey" FOREIGN KEY ("servant_id") REFERENCES "servants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servant_products" ADD CONSTRAINT "servant_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_servants" ADD CONSTRAINT "sale_servants_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_servants" ADD CONSTRAINT "sale_servants_servant_id_fkey" FOREIGN KEY ("servant_id") REFERENCES "servants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
