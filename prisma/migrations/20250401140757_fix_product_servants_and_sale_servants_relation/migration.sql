-- CreateTable
CREATE TABLE "_ServantProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ServantProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SaleServants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SaleServants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ServantProducts_B_index" ON "_ServantProducts"("B");

-- CreateIndex
CREATE INDEX "_SaleServants_B_index" ON "_SaleServants"("B");

-- AddForeignKey
ALTER TABLE "_ServantProducts" ADD CONSTRAINT "_ServantProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServantProducts" ADD CONSTRAINT "_ServantProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "servants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SaleServants" ADD CONSTRAINT "_SaleServants_A_fkey" FOREIGN KEY ("A") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SaleServants" ADD CONSTRAINT "_SaleServants_B_fkey" FOREIGN KEY ("B") REFERENCES "servants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
