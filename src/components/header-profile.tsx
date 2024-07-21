"use client";

import { updateProfileInfos } from "@/features/profile/profile-slice";
import { updateUserInfos } from "@/features/user/user-slice";
import { useProfile } from "@/hooks/use-profile";
import { useUser } from "@/hooks/use-user";
import { useAppDispatch } from "@/redux-hook";
import {
  Gear,
  List,
  Plus,
  SignIn,
  SignOut,
  User,
  WechatLogo
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from "./ui";

export function HeaderProfile() {
  const { email, id } = useUser();
  const profile = useProfile();

  const dispatch = useAppDispatch()

  const router = useRouter()

  function handleLogout() {
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

    router.push('/app')
  }
  
  return (
    <div className="flex justify-end gap-6 items-center">
      <div>
        <Popover>
          <PopoverTrigger>
            {id ? "Account" : <List data-testid="open-dialog-without-logged"/>}
          </PopoverTrigger>
          <PopoverContent className="flex flex-col mr-3">
            <ul>
              {id && (
                <>
                  <li className="p-2 hover:cursor-pointer m-1 rounded-md hover:bg-zinc-300/20 flex flex-col gap-1 min-h-10">
                    <Link
                      href={`/app/profile/me`}
                      className="text-sm font-semibold text-zinc-600"
                    >
                      <span className="text-xs font-normal text-zinc-400">
                        {email}
                      </span>
                    </Link>
                  </li>
                  <Separator />
                  <li className=" flex items-center justify-start p-2 hover:cursor-pointer m-1 rounded-md hover:bg-zinc-300/20 gap-1 h-10">
                    <Gear className="text-zinc-800 w-5 h-5" />
                    <Link
                      href={`/app/profile/me/edit`} className="text-xs font-semibold text-zinc-600">
                      Settings
                    </Link>
                  </li>
                  <Separator />
                  <li className="flex items-center justify-start p-2 hover:cursor-pointer m-1 rounded-md hover:bg-zinc-300/20 gap-1 h-10">
                    <Plus className="text-zinc-800 w-5 h-5" />
                    <span className="text-xs font-semibold text-zinc-600">
                      New Publication
                    </span>
                  </li>
                </>
              )}
              {!id && (
                <>
                  <li className="flex items-center justify-start p-2 hover:cursor-pointer m-1 rounded-md hover:bg-zinc-300/20 gap-1 h-10">
                    <User className="text-zinc-800 w-5 h-5" />
                    <Link
                      href="/auth/"
                      className="text-xs font-semibold text-zinc-600"
                    >
                      Create account
                    </Link>
                  </li>
                  <li className="flex items-center justify-start p-2 hover:cursor-pointer m-1 rounded-md hover:bg-zinc-300/20 gap-1 h-10">
                    <SignIn className="text-zinc-800 w-5 h-5" />
                    <Link
                      href="/auth/login"
                      className="text-xs font-semibold text-zinc-600"
                    >
                      Make Login
                    </Link>
                  </li>
                  <Separator />
                </>
              )}
              <li className=" flex items-center justify-start p-2 hover:cursor-pointer m-1 rounded-md hover:bg-zinc-300/20 gap-1 h-10">
                <WechatLogo className="text-zinc-800 w-5 h-5" />
                <span className="text-xs font-semibold text-zinc-600">
                  Send feedback
                </span>
              </li>
              {id && (
                <>
                  <Separator />
                  <li className=" flex items-center justify-start p-2 hover:cursor-pointer m-1 rounded-md hover:bg-zinc-300/20 gap-1 h-10">
                    <SignOut className="text-red-500 w-5 h-5" />
                    <button onClick={handleLogout} className="text-xs font-semibold text-red-500">
                      Log out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
