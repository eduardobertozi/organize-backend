/*
  Warnings:

  - The primary key for the `sale_servants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sale_servants` table. All the data in the column will be lost.
  - The primary key for the `servant_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `servant_products` table. All the data in the column will be lost.
  - You are about to drop the `_SaleServants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ServantProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SaleServants" DROP CONSTRAINT "_SaleServants_A_fkey";

-- DropForeignKey
ALTER TABLE "_SaleServants" DROP CONSTRAINT "_SaleServants_B_fkey";

-- DropForeignKey
ALTER TABLE "_ServantProducts" DROP CONSTRAINT "_ServantProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServantProducts" DROP CONSTRAINT "_ServantProducts_B_fkey";

-- AlterTable
ALTER TABLE "sale_servants" DROP CONSTRAINT "sale_servants_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "sale_servants_pkey" PRIMARY KEY ("sale_id", "servant_id");

-- AlterTable
ALTER TABLE "servant_products" DROP CONSTRAINT "servant_products_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "servant_products_pkey" PRIMARY KEY ("servant_id", "product_id");

-- DropTable
DROP TABLE "_SaleServants";

-- DropTable
DROP TABLE "_ServantProducts";
