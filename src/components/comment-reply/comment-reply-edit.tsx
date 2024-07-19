"use client";

import { useToast } from "@/hooks/user-toast";
import { queryClient } from "@/lib/query";
import { putCommentReply } from "@/services/comment-reply/put-comment-reply";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, TextInput } from "../ui";

const schemaFormReply = z.object({
  content: z.string(),
  commentReplyId: z.string(),
});

type SchemaFormReplyType = z.infer<typeof schemaFormReply>;

interface PostNewReplyPropsType {
  commentReplyId: string;
  content: string;
  handleCancel : () => void
  commentId : string
}

export function CommentReplyEdit({
  commentReplyId,
  content,
  handleCancel,
  commentId
}: PostNewReplyPropsType) {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaFormReplyType>({
    resolver: zodResolver(schemaFormReply),
    defaultValues: {
      content,
    },
  });

  async function handleEditContent(data: SchemaFormReplyType) {
    try {
      setIsLoading(true)
      const res = await putCommentReply({ commentReplyId : commentReplyId , content : data.content })
      if(res.status === 204 ) {
        queryClient.refetchQueries({ queryKey :[ `comment-${commentId}-reply`] })
        toast({
          title : 'Content updated with success !',
          variant : 'success'
        })
      }
    } catch (error) {}
    finally{ setIsLoading(false)}
  } 

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={handleSubmit(handleEditContent)}
        className="flex items-center justify-start gap-3"
      >
        <TextInput
          width="w-full"
          placeholder="Type your reply here"
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
          variant="secondary"
          width="w-20"
          onClick={handleCancel}
          type="button"
        />
      </form>
    </div>
  );
}
