"use client";

import { useToast } from "@/hooks/user-toast";
import { createCommentReply } from "@/services/comment-reply/create-comment-reply";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, TextInput } from "../ui";

const schemaFormCommentReply = z.object({
  content: z.string(),
});

type SchemaFormCommentReply = z.infer<typeof schemaFormCommentReply>;

interface CommentReplyParamsProps {
  commentId: string;
}

export function CommentReply({ commentId }: CommentReplyParamsProps) {

  const [isShowingTextInput, setIsShowingTextInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SchemaFormCommentReply>({
    resolver: zodResolver(schemaFormCommentReply),
  });

  async function handleCreateCommentReply(data: SchemaFormCommentReply) {
    try {
      setIsLoading(true)
      const res = await createCommentReply({
        commentId,
        content: data.content,
      });
      if (res.status === 201) {
        toast({
          title: "Comment reply created with success !",
          variant: "success",
        });
      }
    } catch (error) {}
    finally {
      setIsLoading(false)
      setIsShowingTextInput(false);
    }
  }

  return (
    <div className="flex justify-between items-center">
      {!isShowingTextInput && <Button text="Reply" variant="secondary" onClick={() => setIsShowingTextInput(true)} />}
      {isShowingTextInput && (
        <form
          onSubmit={handleSubmit(handleCreateCommentReply)}
          className="flex items-center justify-start gap-3"
        >
          <TextInput
            width="w-full"
            placeholder="Type your comment here"
            {...register("content")}
          />
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            text="Send"
            variant="confirm"
            width="w-44"
            type="submit"
          />
          <Button
            variant="secondary"
            width="w-20"
            type="submit"
            text="Cancel"
            onClick={() => setIsShowingTextInput(false)}
          />
        </form>
      )}
    </div>
  );
}
