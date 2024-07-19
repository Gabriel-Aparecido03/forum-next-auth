-- CreateTable
CREATE TABLE "PublicationRelevant" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "publication_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PublicationNotRelevant" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "publication_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CommentRelevant" (
    "id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CommentNotRelevant" (
    "id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CommentReplyRelevant" (
    "id" TEXT NOT NULL,
    "comment_reply_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CommentNotReplyRelevant" (
    "id" TEXT NOT NULL,
    "comment_reply_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicationRelevant_id_key" ON "PublicationRelevant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PublicationRelevant_profile_id_publication_id_key" ON "PublicationRelevant"("profile_id", "publication_id");

-- CreateIndex
CREATE UNIQUE INDEX "PublicationNotRelevant_id_key" ON "PublicationNotRelevant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PublicationNotRelevant_profile_id_publication_id_key" ON "PublicationNotRelevant"("profile_id", "publication_id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentRelevant_id_key" ON "CommentRelevant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentRelevant_profile_id_comment_id_key" ON "CommentRelevant"("profile_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentNotRelevant_id_key" ON "CommentNotRelevant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentNotRelevant_profile_id_comment_id_key" ON "CommentNotRelevant"("profile_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentReplyRelevant_id_key" ON "CommentReplyRelevant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentReplyRelevant_profile_id_comment_reply_id_key" ON "CommentReplyRelevant"("profile_id", "comment_reply_id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentNotReplyRelevant_id_key" ON "CommentNotReplyRelevant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentNotReplyRelevant_profile_id_comment_reply_id_key" ON "CommentNotReplyRelevant"("profile_id", "comment_reply_id");

-- AddForeignKey
ALTER TABLE "PublicationRelevant" ADD CONSTRAINT "PublicationRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationRelevant" ADD CONSTRAINT "PublicationRelevant_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationNotRelevant" ADD CONSTRAINT "PublicationNotRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationNotRelevant" ADD CONSTRAINT "PublicationNotRelevant_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentRelevant" ADD CONSTRAINT "CommentRelevant_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentRelevant" ADD CONSTRAINT "CommentRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentNotRelevant" ADD CONSTRAINT "CommentNotRelevant_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentNotRelevant" ADD CONSTRAINT "CommentNotRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReplyRelevant" ADD CONSTRAINT "CommentReplyRelevant_comment_reply_id_fkey" FOREIGN KEY ("comment_reply_id") REFERENCES "CommentReply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReplyRelevant" ADD CONSTRAINT "CommentReplyRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentNotReplyRelevant" ADD CONSTRAINT "CommentNotReplyRelevant_comment_reply_id_fkey" FOREIGN KEY ("comment_reply_id") REFERENCES "CommentReply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentNotReplyRelevant" ADD CONSTRAINT "CommentNotReplyRelevant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
