-- AlterTable
ALTER TABLE "enrollments" ALTER COLUMN "status" SET DEFAULT 'draft';

-- AddForeignKey
ALTER TABLE "enrollment_reviews" ADD CONSTRAINT "enrollment_reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
