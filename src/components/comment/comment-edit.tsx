"use client";

import { usePublicationView } from "@/hooks/user-publication-view";
import { useToast } from "@/hooks/user-toast";
import { queryClient } from "@/lib/query";
import { putComment } from "@/services/comments/put-comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, TextInput } from "../ui";

const schemaFormReply = z.object({
  content : z.string()
})

type SchemaFormReplyType = z.infer<typeof schemaFormReply>

interface PostNewReplyPropsType {
  commentId : string
  content : string
}

export function CommentEdit({ commentId,content } : PostNewReplyPropsType) {

  const [isLoading, setIsLoading ] = useState(false)
  const publication = usePublicationView()

  const { toast } = useToast()

  const { register , handleSubmit, formState : { errors } } = useForm<SchemaFormReplyType>({
    resolver : zodResolver(schemaFormReply),
    defaultValues : {
      content
    }
  })

  async function handleEditContent(data : SchemaFormReplyType) {
    try {
      setIsLoading(true)
      const res = await putComment({ commentId , content : data.content })
      if(res.status === 204 ) {
        queryClient.refetchQueries({ queryKey : [`publication-${publication.id}-comments`]})
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
      <form onSubmit={handleSubmit(handleEditContent)} className="flex items-center justify-start gap-3">
        <TextInput width="w-full" placeholder="Type your reply here" {...register("content")} />
        <Button disabled={isLoading} isLoading={isLoading} text="Send" variant="confirm" width="w-44"/>
      </form>
    </div>
  );
}
