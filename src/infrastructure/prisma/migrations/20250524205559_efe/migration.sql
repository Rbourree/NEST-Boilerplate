-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_id_user_fkey";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
