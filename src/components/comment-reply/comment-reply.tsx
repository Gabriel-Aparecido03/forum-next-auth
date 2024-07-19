"use client";

import { CommentReplyRelevance } from "@/high-order-component/comment-reply-relevance";
import { useState } from "react";
import { CommentReplyEdit } from "./comment-reply-edit";
import { CommentReplyHeader } from "./comment-reply-header";

interface CommentTypeProps {
  id: string;
  username: string;
  createdAt: Date;
  content: string;
  profileId: string;
  commentId: string;
}

export function CommentReply({
  content,
  createdAt,
  id,
  profileId,
  username,
  commentId
}: CommentTypeProps) {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex justify-start gap-2 w-full">
      <CommentReplyRelevance commentReplyId={id} />
      <div className="flex flex-col gap-2 w-full">
        <CommentReplyHeader
          createdAt={createdAt}
          profileId={profileId}
          username={username}
          commentReplyId={id}
          handleEdit={() => {
            setIsEditing(!isEditing);
          }}
          commentId={commentId}
        />
        {!isEditing && (
          <p className="text-base text-zinc-800 font-medium px-4">{content}</p>
        )}
        {isEditing && (
          <CommentReplyEdit
            commentReplyId={id}
            content={content}
            handleCancel={() => setIsEditing(false)}
            commentId={commentId}
          />
        )}
      </div>
    </div>
  );
}
