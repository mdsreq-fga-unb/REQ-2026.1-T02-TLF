/*
  Warnings:

  - Changed the type of `table_name` on the `deleted_records` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TableName" AS ENUM ('CATEGORIES', 'SUB_CATEGORIES', 'INSTITUTIONS', 'BUDGETS', 'ACCOUNTS', 'INVOICES', 'RECURRENCES', 'TRANSACTIONS', 'NOTIFICATIONS');

-- AlterTable
ALTER TABLE "deleted_records" DROP COLUMN "table_name",
ADD COLUMN     "table_name" "TableName" NOT NULL;
