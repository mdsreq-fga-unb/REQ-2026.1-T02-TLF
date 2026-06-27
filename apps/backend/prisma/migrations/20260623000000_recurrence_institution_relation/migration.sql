-- AlterTable
ALTER TABLE "recurrences" ADD COLUMN "institution_id" TEXT;

-- Backfill from previous account-based structure
UPDATE "recurrences" r
SET "institution_id" = a."institution_id"
FROM "accounts" a
WHERE r."account_id" = a."id";

-- Drop recurrences that cannot be linked to an institution (orphaned data)
DELETE FROM "recurrences" WHERE "institution_id" IS NULL;

-- Enforce required institution
ALTER TABLE "recurrences" ALTER COLUMN "institution_id" SET NOT NULL;

-- Add foreign key
ALTER TABLE "recurrences"
  ADD CONSTRAINT "recurrences_institution_id_fkey"
  FOREIGN KEY ("institution_id") REFERENCES "institutions"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Remove legacy foreign key/column
ALTER TABLE "recurrences" DROP CONSTRAINT IF EXISTS "recurrences_account_id_fkey";
ALTER TABLE "recurrences" DROP COLUMN IF EXISTS "account_id";
