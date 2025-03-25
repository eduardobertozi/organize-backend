-- CreateTable
CREATE TABLE "servant_products" (
    "id" TEXT NOT NULL,
    "servantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "servant_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "servant_products" ADD CONSTRAINT "servant_products_servantId_fkey" FOREIGN KEY ("servantId") REFERENCES "servants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servant_products" ADD CONSTRAINT "servant_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
