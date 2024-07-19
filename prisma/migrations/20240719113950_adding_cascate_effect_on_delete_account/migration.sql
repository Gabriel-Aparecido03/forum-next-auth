-- DropForeignKey
ALTER TABLE "CommentNotRelevant" DROP CONSTRAINT "CommentNotRelevant_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentNotRelevant" DROP CONSTRAINT "CommentNotRelevant_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentNotReplyRelevant" DROP CONSTRAINT "CommentNotReplyRelevant_comment_reply_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentNotReplyRelevant" DROP CONSTRAINT "CommentNotReplyRelevant_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentRelevant" DROP CONSTRAINT "CommentRelevant_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentRelevant" DROP CONSTRAINT "CommentRelevant_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentReplyRelevant" DROP CONSTRAINT "CommentReplyRelevant_comment_reply_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentReplyRelevant" DROP CONSTRAINT "CommentReplyRelevant_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PublicationNotRelevant" DROP CONSTRAINT "PublicationNotRelevant_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "PublicationNotRelevant" DROP CONSTRAINT "PublicationNotRelevant_publication_id_fkey";

-- DropForeignKey
ALTER TABLE "PublicationRelevant" DROP CONSTRAINT "PublicationRelevant_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "PublicationRelevant" DROP CONSTRAINT "PublicationRelevant_publication_id_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationRelevant" ADD CONSTRAINT "PublicationRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationRelevant" ADD CONSTRAINT "PublicationRelevant_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationNotRelevant" ADD CONSTRAINT "PublicationNotRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationNotRelevant" ADD CONSTRAINT "PublicationNotRelevant_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentRelevant" ADD CONSTRAINT "CommentRelevant_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentRelevant" ADD CONSTRAINT "CommentRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentNotRelevant" ADD CONSTRAINT "CommentNotRelevant_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentNotRelevant" ADD CONSTRAINT "CommentNotRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReplyRelevant" ADD CONSTRAINT "CommentReplyRelevant_comment_reply_id_fkey" FOREIGN KEY ("comment_reply_id") REFERENCES "CommentReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReplyRelevant" ADD CONSTRAINT "CommentReplyRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentNotReplyRelevant" ADD CONSTRAINT "CommentNotReplyRelevant_comment_reply_id_fkey" FOREIGN KEY ("comment_reply_id") REFERENCES "CommentReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentNotReplyRelevant" ADD CONSTRAINT "CommentNotReplyRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
