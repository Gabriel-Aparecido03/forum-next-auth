"use client";

import { useProfile } from "@/hooks/use-profile";
import { usePublicationView } from "@/hooks/user-publication-view";
import { useToast } from "@/hooks/user-toast";
import { queryClient } from "@/lib/query";
import { createComment } from "@/services/comments/create-comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, TextInput } from "./ui";

const schemaFormComment = z.object({
  content: z.string(),
});

type SchemaFormCommentType = z.infer<typeof schemaFormComment>;

export function PostNewComment() {
  const publication = usePublicationView();
  const profile = useProfile();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isShowingInput, setIsShowingInput] = useState(false);

  const { register, handleSubmit } = useForm<SchemaFormCommentType>({
    resolver: zodResolver(schemaFormComment),
  });

  async function handleSendNewComment(data: SchemaFormCommentType) {
    try {
      setIsLoading(true);
      const res = await createComment({
        content: data.content,
        profileId: profile.id as unknown as string,
        publicationId: publication.id,
      });
      if (res.status === 201) {
        queryClient.refetchQueries({
          queryKey: [`publication-${publication.id}-comments`],
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
          onSubmit={handleSubmit(handleSendNewComment)}
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
          />
          <Button
            text="Cancel"
            variant="cancel"
            width="w-20"
            onClick={() =>setIsShowingInput(false)}
          />
        </form>
      )}
      {!isShowingInput && (
        <Button onClick={() =>setIsShowingInput(true)} width="w-44" text="Create new comment" variant="secondary" />
      )}
    </div>
  );
}
