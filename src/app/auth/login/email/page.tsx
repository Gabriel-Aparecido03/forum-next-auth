"use client";

import { Button, Separator, TextInput } from "@/components/ui";
import { updateProfileInfos } from "@/features/profile/profile-slice";
import { updateUserInfos } from "@/features/user/user-slice";
import { useToast } from "@/hooks/user-toast";
import { MakeLoginWithPassword } from "@/services/auth/make-login-with-password";
import { meUser } from "@/services/auth/user-me";
import { meProfile } from "@/services/profile/me-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

const SchemaFormLoginPassword = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SchemaFormLoginPasswordType = z.infer<typeof SchemaFormLoginPassword>;

export default function Email() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { push } = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<SchemaFormLoginPasswordType>({
    resolver: zodResolver(SchemaFormLoginPassword),
    defaultValues: {
      email: "jonhdoe@email.com",
      password: "Teste@123",
    },
  });

  async function handleMakeLogin({
    email,
    password,
  }: SchemaFormLoginPasswordType) {
    try {
      setIsLoading(true);
      const res = await MakeLoginWithPassword({ email , password })

      if (res.status === 201) {
        toast({
          title: "Login make with Success !",
          description: "Enjoy your journet at Forum",
          variant: "success",
        });

        const responseUser = await meUser()
        const responseProfile = await meProfile()

        if (responseUser.status === 200 && responseProfile.status === 200) {
          const { email , id } = responseUser.data.user
          dispatch(
            updateUserInfos({
              email,
              id
            })
          );

          const { username ,description,activedAt } = responseProfile.data.profile

          dispatch(
            updateProfileInfos({
              id: responseProfile.data.profile.id,
              username,
              userId: id,
              description,
              activedAt,
            })
          );

          if(!activedAt) {
            toast({
              title: "Congratsss ! Welcome =)",
              description: "Its look like your first access !",
            });

            return push(`/app/profile/${responseProfile.data.profile.id}/edit`)
          }

          toast({
            title: "Enjoy your journey at Next Forum",
            description: "Its look like your first access !",
          });

          return push(`/app`)
        }
      }

      toast({
        title: "Email or password invalid !",
        description: "Check your email or password",
        variant: "destructive",
      });

      setError("root", { message: "" });
    } catch (error) {
      toast({
        title: "Expected error =(",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleMakeLogin)}
      className="flex flex-1 justify-center items-center gap-8 flex-col max-w-80 mx-auto"
    >
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
            type="email"
            {...register("email")}
            isInvalid={!!errors.email?.message}
            errorMessage={errors.email?.message}
          />
        </div>
        <div>
          <span className="text-sm mb-1">Password</span>
          <TextInput
            {...register("password")}
            type={showPassword ? "text" : "password"}
            icon={
              showPassword ? (
                <Eye onClick={() => setShowPassword(false)} />
              ) : (
                <EyeSlash onClick={() => setShowPassword(true)} />
              )
            }
            isInvalid={!!errors.password?.message}
            errorMessage={errors.password?.message}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          text="Sign In"
        />
        <Button text="Forgot password" variant="text" />
        <Separator />
        <div className="flex items-center justify-center w-full gap-2">
          <Link
            className="text-sm underline underline-offset-4 text-center"
            href="/auth/login"
          >
            Other sign in options
          </Link>
          <span>or</span>
          <Link
            className="text-sm underline underline-offset-4 text-center"
            href="/auth/register"
          >
            Create account
          </Link>
        </div>
      </div>
    </form>
  );
}
