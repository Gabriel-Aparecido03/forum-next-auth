"use client";

import { useProfile } from "@/hooks/use-profile";
import { usePublicationView } from "@/hooks/user-publication-view";
import { useToast } from "@/hooks/user-toast";
import { queryClient } from "@/lib/query";
import { deletePublication } from "@/services/publication/delete-publication";
import { putPublication } from "@/services/publication/put-publication";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { DateShow } from "./date-show";
import { PublicationHeaderProfileAction } from "./publication-header-profile-action";
import { Button, EditorMarkdown, TextInput, ViewerMarkdown } from "./ui";

const schemaFormEditPublication = z.object({
  title: z.string().min(1, "Title is soo short !"),
  description: z.string().min(1, "Description is soo short !"),
});

type SchemaFormEditPublicationType = z.infer<typeof schemaFormEditPublication>;

export function PublicationBody() {
  const { title, description, username, createdAt, id } = usePublicationView();
  const profile = useProfile();
  const { toast } = useToast()
  const { push } = useRouter()

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SchemaFormEditPublicationType>({
    resolver: zodResolver(schemaFormEditPublication),
    defaultValues: {
      description,
      title,
    },
  });

  async function handleSend({
    description,
    title,
  }: SchemaFormEditPublicationType) {
    try {
      setIsLoading(true);
      const res = await putPublication({
        description,
        publicationId: id,
        title,
      });
      if (res.status === 204) {
        toast({
          title : 'Publication updated with success'
        })
      }
    } catch (error) {} finally {
      setIsLoading(false);
      setIsEditing(false);
      queryClient.refetchQueries({ queryKey: [`publication-${id}`] });
    }
  }

  async function handleDeletePublication() {
    try {
      const res = await deletePublication({ publicationId : id })
      if(res.status === 204 ) {
        toast({
          title : 'Publication deleted with success'
        })
        push('/app')
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col justify-start items-start">
          <Link href={username === profile.username ? `/app/profile/me` : `/app/profile/${username}`} className="text-sm text-zinc-800 font-bold">
            {username}
          </Link>
          <DateShow createdAt={createdAt} />
        </div>
        {profile.id && (
          <PublicationHeaderProfileAction
            handleApproveDelete={handleDeletePublication}
            handleCancelDelete={() => setIsEditing(false)}
            handleEdit={() => setIsEditing(!isEditing)}
          />
        )}
      </div>
      <div className="flex flex-col justify-start items-start gap-2 w-full">
        {!isEditing && (
          <>
            <h1 className="font-bold text-4xl text-zinc-800">{title}</h1>
            <ViewerMarkdown value={description} />
          </>
        )}
        {isEditing && (
          <form
            onSubmit={handleSubmit(handleSend)}
            className="w-full flex flex-col gap-3"
          >
            <TextInput
              {...register("title")}
              autoComplete="off"
              isInvalid={!!errors.title?.message}
              errorMessage={errors.title?.message}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <EditorMarkdown value={value} onChange={onChange} />
              )}
            />
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              text="Send"
              variant="confirm"
            />
          </form>
        )}
      </div>
    </div>
  );
}
