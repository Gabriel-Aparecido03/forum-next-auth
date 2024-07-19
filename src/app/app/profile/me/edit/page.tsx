"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EditorMarkdown,
  TextInput,
} from "@/components/ui";
import { updateProfileInfos } from "@/features/profile/profile-slice";
import { updateUserInfos } from "@/features/user/user-slice";
import { useProfile } from "@/hooks/use-profile";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/api";
import { useAppDispatch } from "@/redux-hook";
import { meUserDelete } from "@/services/auth/delete-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schemaFormEditProfile = z.object({
  username: z
    .string()
    .min(3, { message: "" })
    .refine((s) => !s.includes(" "), "Whitespaces is not valid !"),
  email: z.string().email(),
  description: z.string(),
});

type FormEditType = z.infer<typeof schemaFormEditProfile>;

export default function Edit() {
  const user = useUser();
  const profile = useProfile();
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormEditType>({
    resolver: zodResolver(schemaFormEditProfile),
    defaultValues: {
      email: user.email ?? "",
      username: profile.username ?? "",
      description: profile.description ?? "",
    },
  });

  async function handleSendUpdateProfile(data: FormEditType) {
    await api.put(`/profile/me`, { ...data });
  }

  async function handleDeleteAccount() {
    const res = await meUserDelete();
    if(res.status === 204 ) {
      dispatch(updateUserInfos({
        email : null,
        id : null
      }))
  
      dispatch(updateProfileInfos({
        activedAt : null,
        description : null,
        id : null,
        userId : null,
        username : null
      }))
  
      push('/app')
    }
  }

  return (
    <main className="gap-8 w-[96%] max-w-[1200px] mx-auto mb-10">
      <h1 className="font-bold text-6xl text-left mt-10">Profile</h1>
      <form
        onSubmit={handleSubmit(handleSendUpdateProfile)}
        className="w-[90%] mx-auto mt-10"
      >
        <div className="flex flex-col gap-6 items-center justify-center w-full">
          <div className=" mt-5 ">
            <span className="font-bold text-zinc-800">Username : </span>
            <TextInput
              width="w-96"
              {...register("username")}
              autoComplete="off"
              isInvalid={!!errors.username?.message}
              errorMessage={errors.username?.message}
            />
          </div>
          <div className="">
            <span className="font-bold text-zinc-800">Email : </span>
            <TextInput
              width="w-96"
              type="email"
              {...register("email")}
              autoComplete="off"
              isInvalid={!!errors.email?.message}
              errorMessage={errors.email?.message}
            />
          </div>
          <div className="">
            <span className="font-bold text-zinc-800 mb-3">Description : </span>
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <EditorMarkdown value={value} onChange={onChange} />
              )}
            />
          </div>
          <div className="w-1/2">
            <Button fullWidth variant="confirm" text="Confirm" />
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
              <Button fullWidth variant="cancel" text="Delete Account" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                  <DialogFooter>
                    <div className="flex items-center justify-center gap-3">
                      <Button onClick={handleDeleteAccount} text="Yes,i do" />
                    </div>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </main>
  );
}
