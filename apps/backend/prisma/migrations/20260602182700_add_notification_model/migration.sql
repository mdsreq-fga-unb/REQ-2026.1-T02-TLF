/*
  Warnings:

  - Added the required column `updated_at` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BUDGET_WARNING', 'BUDGET_EXCEEDED', 'RECURRENCE_DUE_WARNING', 'RECURRENCE_DUE', 'INVOICE_CLOSING_WARNING', 'INVOICE_CLOSING', 'INVOICE_DUE_WARNING', 'INVOICE_DUE', 'INVOICE_OVERDUE', 'INVOICE_PAID', 'INVOICE_PARTIALLY_PAID');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "primary_action_label" TEXT,
    "primary_action" TEXT,
    "secondary_action_label" TEXT,
    "secondary_action" TEXT,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "reference_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
