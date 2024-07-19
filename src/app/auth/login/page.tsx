"use client";

import { Button, Separator, TextInput } from "@/components/ui";
import { useToast } from "@/hooks/user-toast";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SchemaFormMagicLink = z.object({
  email: z.string().email({ message: "invalid email !" }),
});

type SchemaFormMagicLinkType = z.infer<typeof SchemaFormMagicLink>;

export default function Email() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SchemaFormMagicLinkType>({
    resolver: zodResolver(SchemaFormMagicLink),
  });
  const { toast } = useToast();
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function handleValidateEmail({ email} : SchemaFormMagicLinkType) {
    try {
      setIsLoading(true);
      const res = await api.post("/auth/magic-link", { email });
      if(res.status === 201 ) {
        return toast({
          title : 'Check your mailbox !',
          description : 'You will receive the link to access your account'
        })
      } 
      setError("email", {
        message : "Invalid email"
      })
      toast({
        title : 'Email invalid !',
        description : 'Email not exits or typed wrong',
        variant : 'destructive'
      })
    } catch (error) {
      toast({
        title : 'Email invalid !',
        description : 'Check if email typed correct or you dont have account !',
        variant : 'destructive'
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleValidateEmail)} className="flex flex-col gap-4 w-full flex-1">
      <div>
        <h1 className="font-bold text-center text-2xl">Next Forum</h1>
        <h2 className="font-sembold text-center text-zinc-600">
          A Next.js Forum project
        </h2>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div>
          <span className="text-sm mb-1">Email</span>
          <TextInput
            {...register("email")}
            isInvalid={!!errors.email?.message}
            errorMessage={errors.email?.message}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Button type="submit" isLoading={isLoading} disabled={isLoading} text="Continue with email" />
        <Separator />
        <Button type="button" variant="secondary" text="Sign with Github" />
        <Button type="button" onClick={() => push('/auth/login/email')} variant="secondary" text="Sign with password" />
        <Separator />
        <Link
          className="text-sm underline underline-offset-4 text-center"
          href="/auth/register"
        >
          Create new account
        </Link>
      </div>
    </form>
  );
}
