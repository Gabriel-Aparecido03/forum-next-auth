"use client";

import { useProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/user-toast";
import { queryClient } from "@/lib/query";
import { createCommentReply } from "@/services/comment-reply/create-comment-reply";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, TextInput } from "./ui";

const schemaFormCommentReply = z.object({
  content: z.string(),
});

type SchemaFormCommentReplyType = z.infer<typeof schemaFormCommentReply>;

interface PostNewCommentReplyPropsType {
  commentId: string;
}

export function PostNewCommentReply({
  commentId,
}: PostNewCommentReplyPropsType) {
  const profile = useProfile();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isShowingInput, setIsShowingInput] = useState(false);

  const { register, handleSubmit } = useForm<SchemaFormCommentReplyType>({
    resolver: zodResolver(schemaFormCommentReply),
  });

  async function handleSendNewCommentReply(data: SchemaFormCommentReplyType) {
    try {
      setIsLoading(true);
      const res = await createCommentReply({
        content: data.content,
        commentId,
      });
      if (res.status === 201) {
        queryClient.refetchQueries({
          queryKey: [`comment-${commentId}-reply`],
        });
        toast({
          title: "Comment created with success !",
          variant: "success",
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {isShowingInput && (
        <form
          onSubmit={handleSubmit(handleSendNewCommentReply)}
          className="flex items-center justify-start gap-3"
        >
          <TextInput
            width="w-full"
            placeholder="Type your comment reply here"
            {...register("content")}
          />
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            text="Send"
            variant="confirm"
            width="w-44"
          />
          <Button
            text="Cancel"
            variant="cancel"
            width="w-20"
            onClick={() => setIsShowingInput(false)}
          />
        </form>
      )}
      {!isShowingInput && (
        <Button
          onClick={() => setIsShowingInput(true)}
          width="w-52"
          text="Create new comment reply"
          variant="secondary"
        />
      )}
    </div>
  );
}
