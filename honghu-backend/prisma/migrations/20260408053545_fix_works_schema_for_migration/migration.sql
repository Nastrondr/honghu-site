/*
  Warnings:

  - You are about to drop the column `is_current` on the `work_versions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_team_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_user_fkey";

-- AlterTable
ALTER TABLE "work_versions" DROP COLUMN "is_current";

-- AlterTable
ALTER TABLE "works" ADD COLUMN     "user_id" TEXT,
ALTER COLUMN "team_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_team_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
