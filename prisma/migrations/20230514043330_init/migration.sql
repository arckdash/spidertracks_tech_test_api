-- CreateEnum
CREATE TYPE "CUSTOMER_STATUS" AS ENUM ('ACTIVE', 'NON_ACTIVE', 'LEAD');

-- CreateEnum
CREATE TYPE "SALE_OPPORTUNITY_STATUS" AS ENUM ('NEW', 'CLOSED_WON', 'CLOSED_LOST');

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "phoneNo" TEXT,
    "email" TEXT NOT NULL,
    "status" "CUSTOMER_STATUS" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saleOpportunities" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "status" "SALE_OPPORTUNITY_STATUS" NOT NULL DEFAULT 'NEW',

    CONSTRAINT "saleOpportunities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_uuid_key" ON "customers"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "saleOpportunities_uuid_key" ON "saleOpportunities"("uuid");
