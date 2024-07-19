-- CreateTable
CREATE TABLE "CommentReply" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "profile_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CommentReply_id_key" ON "CommentReply"("id");

-- AddForeignKey
ALTER TABLE "CommentReply" ADD CONSTRAINT "CommentReply_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReply" ADD CONSTRAINT "CommentReply_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
