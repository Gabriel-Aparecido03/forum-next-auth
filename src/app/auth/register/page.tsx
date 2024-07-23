"use client";

import { PasswordValidation } from "@/components/password-validation";
import { Button, Separator, TextInput } from "@/components/ui";
import { useToast } from "@/hooks/user-toast";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SchemaForm = z
  .object({
    username: z
      .string()
      .min(2, "Username is too short")
      .max(25, "Username is soo long"),
    email: z.string().email(),
    password: z
      .string()
      .min(2, "Password is too short")
      .max(25, "Password is soo long")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
        { message: "Password dont agree with password policy requirements"}
      ),
    confirmPassword: z
      .string()
      .min(2, "Confrim Password is too short")
      .max(25, "Confrim Password is soo long"),
  })
  

type SchemaFormType = z.infer<typeof SchemaForm>;

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTransaction, setIsTransaction] = useState(false);

  const { toast } = useToast();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm<SchemaFormType>({
    resolver: zodResolver(SchemaForm),
    defaultValues: {
      confirmPassword: "",
      username: "",
      email: "",
      password: "",
    },
  });

  /* 
  confirmPassword: "Teste@123",
      username: "JohnDoe",
      email: "jonhdoe@email.com",
      password: "Teste@123", 
  
  */

  async function handleRegister(data: SchemaFormType) {
    console.log('..')
    try {
      setIsTransaction(true);
      const [emailAlreadyExits, usernameAlreadyExists] = await Promise.all([
        handleEmailAlreadyExists(data.email.trim()),
        handleUsernameAlreadyExists(data.username.trim()),
      ]);

      if (emailAlreadyExits) {
        setError("email", { message: "Email is already exists !" });
        setFocus("email");
        return;
      }

      if (usernameAlreadyExists) {
        setError("username", { message: "Username is already exists !" });
        setFocus("username");
        return;
      }

      const res = await api.post("/auth", {
        email: data.email.trim(),
        username: data.username.trim(),
        password: data.password,
      });

      if (res.status === 200) {
        toast({
          title: "Congrats !",
          description: "Welcome, enjoy your journey at FORUM !",
          variant: "success",
        });
        /* return push(`/auth/congrats?username=${data.username}`) */
        return push(`/auth/login/email`);
      }
    } catch (error) {
    } finally {
      setIsTransaction(false);
    }
  }

  async function handleEmailAlreadyExists(email: string) {
    try {
      const res = await api.get(`/validate/email/${email}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async function handleUsernameAlreadyExists(username: string) {
    try {
      const res = await api.get(`/validate/username/${username}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-1 justify-center items-center gap-8 flex-col max-w-80 mx-auto my-10"
    >
      <div>
        <h1 className="font-bold text-center text-2xl">Next Forum</h1>
        <h2 className="font-sembold text-center text-zinc-600">
          A Next.js Forum project
        </h2>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div>
          <span className="text-sm mb-1">Username</span>
          <TextInput
            {...register("username")}
            isInvalid={!!errors.username?.message}
            errorMessage={errors.username?.message}
          />
        </div>
        <div>
          <span className="text-sm mb-1">Email</span>
          <TextInput
            type="email"
            {...register("email")}
            autoComplete="off"
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
        <div>
          <span className="text-sm mb-1">Confirm Password</span>
          <TextInput
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            icon={
              showConfirmPassword ? (
                <Eye onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <EyeSlash onClick={() => setShowConfirmPassword(true)} />
              )
            }
            isInvalid={!!errors.confirmPassword?.message}
            errorMessage={errors.confirmPassword?.message}
          />
        </div>
      </div>
      <PasswordValidation
        password={getValues().password}
        show={
          errors.password?.message ===
          "Password dont agree with password policy requirements"
        }
      />
      <div className="flex flex-col gap-4 w-full">
        <Button
          isLoading={isTransaction}
          disabled={isTransaction}
          type="submit"
          text="Create new account"
          variant="primary"
        />
        <Separator />
        <div className="flex items-center justify-center w-full gap-2">
          <Link
            className="text-sm underline underline-offset-4"
            href="/auth/register"
          >
            Go back
          </Link>
          <span>or</span>
          <Link
            className="text-sm underline underline-offset-4"
            href="/auth/login"
          >
            Already has account
          </Link>
        </div>
      </div>
    </form>
  );
}
