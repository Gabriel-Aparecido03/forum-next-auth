"use client";

import { Button, EditorMarkdown, TextInput } from "@/components/ui";
import { useProfile } from "@/hooks/use-profile";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/hooks/user-toast";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schemaFormCreatePublication = z.object({
  title : z.string(),
  description : z.string()
})

type FormCreatePublication = z.infer<typeof schemaFormCreatePublication>


export default function CreatePublication() {

  const [isLoading, setIsLoading ] = useState(false)

  const user = useUser();
  const profile = useProfile();

  const { push } = useRouter()

  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormCreatePublication>({
    resolver: zodResolver(schemaFormCreatePublication),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function handleCreatePublication(data : FormCreatePublication) {
    try {
      setIsLoading(true)
      const response = await api.post('/publication',{ ...data })
      if(response.status === 201) {
        toast({
          title : "Publication was created with success !",
          description : "Now you will redirect to home page , and you'll see your post at feed !"
        })
        push('/app')
      }
    } catch (error) {
      toast({
        title : "Unexpected error !",
        description : "If the problem persist contact the developer !",
        variant :"destructive"
      })
    }
  }

  useEffect(() => {
    /* if(user.id) return push('/app') */
  },[])
  
  return (
    <main className="gap-8 w-[96%] max-w-[1200px] mx-auto mb-10">
      <h1 className="font-bold text-6xl text-left mt-10">Create Publication</h1>
      <form
        onSubmit={handleSubmit(handleCreatePublication)}
        className="mt-10 w-[80%] mx-auto"
      >
        <div className="flex flex-col gap-6 items-start justify-start w-full">
          <div className="mt-5 w-full">
            <span className="font-bold text-zinc-800">Title : </span>
            <TextInput
              {...register("title")}
              autoComplete="off"
              isInvalid={!!errors.title?.message}
              errorMessage={errors.title?.message}
            />
          </div>
          <div className="w-full">
            <span className="font-bold text-zinc-800 mb-3">Description : </span>
            <Controller
              control={control}
              name="description"
              render={({ field: { value,onChange } }) => (
                <EditorMarkdown value={value} onChange={onChange} />
              )}
            />
          </div>
          <div className="w-1/2 mx-auto">
            <Button isLoading={isLoading} disabled={isLoading} fullWidth variant="confirm" text="Post" />
          </div>
        </div>
      </form>
    </main>
  );
}
