/*
  Warnings:

  - Added the required column `customerId` to the `saleOpportunities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "saleOpportunities" ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "saleOpportunities" ADD CONSTRAINT "saleOpportunities_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
