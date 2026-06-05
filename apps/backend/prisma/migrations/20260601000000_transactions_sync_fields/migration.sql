-- Offline-first sync (WatermelonDB) support for transactions.

ALTER TABLE "transactions" ALTER COLUMN "category_id" DROP NOT NULL;

-- created_at / updated_at let the pull endpoint split records into created vs
-- updated since lastPulledAt; deleted_at is a tombstone for propagating deletes.
ALTER TABLE "transactions"
  ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "deleted_at" TIMESTAMP(3);
