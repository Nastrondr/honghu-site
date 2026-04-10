-- AlterTable
ALTER TABLE "competitions" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "competitions_deleted_at_idx" ON "competitions"("deleted_at");
