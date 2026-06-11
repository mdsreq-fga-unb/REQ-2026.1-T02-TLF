-- CreateTable
CREATE TABLE "deleted_records" (
    "id" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "table_name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deleted_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "deleted_records_user_id_deleted_at_idx" ON "deleted_records"("user_id", "deleted_at");

-- AddForeignKey
ALTER TABLE "deleted_records" ADD CONSTRAINT "deleted_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
