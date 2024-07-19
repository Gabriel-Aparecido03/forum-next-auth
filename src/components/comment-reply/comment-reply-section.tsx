"use client";

import { useProfile } from "@/hooks/use-profile";
import { usePublicationView } from "@/hooks/user-publication-view";
import { fetchCommentsReplies } from "@/services/comment-reply/fetch-comments-reply";
import { useQuery } from "@tanstack/react-query";
import { PostNewCommentReply } from "../post-new-comment-reply";
import { CommentReply } from "./comment-reply";

interface CommentsRepliesSectionsParamsType {
  commentId: string;
}

export function CommentReplySection({
  commentId,
}: CommentsRepliesSectionsParamsType) {
  const { id } = usePublicationView();
  const profile = useProfile();
  const publication = usePublicationView();

  async function handleFetchCommentsReplies() {
    try {
      const res = await fetchCommentsReplies({ commentId });
      return res.data;
    } catch (error) {}
  }

  const { data } = useQuery({
    initialData: null,
    queryKey: [`comment-${commentId}-reply`],
    queryFn: handleFetchCommentsReplies,
  });

  if (!data) return null;

  return (
    <div className="flex flex-col gap-3 w-[90%] mx-auto">
       {profile.id && <PostNewCommentReply commentId={commentId} />}
      <div className="flex flex-col justify-start items-start gap-4 w-full">
        {data.datas.map((x) => (
          <CommentReply
            content={x.content}
            createdAt={new Date(x.createdAt)}
            id={x.id}
            profileId={x.profileId}
            username={x.username ?? ""}
            key={x.id}
            commentId={commentId}
          />
        ))}
      </div>
    </div>
  );
}
