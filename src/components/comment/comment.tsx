"use client";

import { CommentRelevance } from "@/high-order-component/comment-relevance";
import { useProfile } from "@/hooks/use-profile";
import { useState } from "react";
import { CommentReplySection } from "../comment-reply/comment-reply-section";
import { CommentEdit } from "./comment-edit";
import { CommentHeader } from "./comment-header";

interface CommentTypeProps {
  id: string;
  username: string;
  createdAt: Date;
  content: string;
  profileId: string;
}

export function Comment({
  content,
  createdAt,
  id,
  profileId,
  username,
}: CommentTypeProps) {

  const profile = useProfile()

  const [ isEditing , setIsEditing] = useState(false)
  
  return (
    <div className="flex justify-start gap-2 w-full">
      <CommentRelevance commentId={id} />
      <div className="flex flex-col gap-2 w-full">
        <CommentHeader
          createdAt={createdAt}
          profileId={profileId}
          username={username}
          commentId={id}
          handleEdit={() => { setIsEditing(!isEditing)} }
        />
        {!isEditing && <p className="text-base text-zinc-800 font-medium px-4">{content}</p> }
        { isEditing && <CommentEdit commentId={id} content={content} />}
        {  profile.id &&  <CommentReplySection commentId={id} />}
      </div>
    </div>
  );
}
