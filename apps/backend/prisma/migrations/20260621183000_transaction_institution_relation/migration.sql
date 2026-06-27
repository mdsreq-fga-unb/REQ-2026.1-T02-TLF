-- AlterTable
ALTER TABLE "transactions" ADD COLUMN "institution_id" TEXT;
ALTER TABLE "transactions" ADD COLUMN "destination_institution_id" TEXT;

-- Backfill from previous account-based structure
UPDATE "transactions" t
SET "institution_id" = a."institution_id"
FROM "accounts" a
WHERE t."account_id" = a."id";

UPDATE "transactions" t
SET "destination_institution_id" = a."institution_id"
FROM "accounts" a
WHERE t."destination_account_id" = a."id";

-- Enforce required source institution
ALTER TABLE "transactions" ALTER COLUMN "institution_id" SET NOT NULL;

-- Add foreign keys
ALTER TABLE "transactions"
  ADD CONSTRAINT "transactions_institution_id_fkey"
  FOREIGN KEY ("institution_id") REFERENCES "institutions"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transactions"
  ADD CONSTRAINT "transactions_destination_institution_id_fkey"
  FOREIGN KEY ("destination_institution_id") REFERENCES "institutions"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

-- Remove legacy foreign keys/columns
ALTER TABLE "transactions" DROP CONSTRAINT IF EXISTS "transactions_account_id_fkey";
ALTER TABLE "transactions" DROP CONSTRAINT IF EXISTS "transactions_destination_account_id_fkey";
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "account_id";
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "destination_account_id";
