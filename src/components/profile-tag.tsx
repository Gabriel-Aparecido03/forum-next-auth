"use client"

import { useProfile } from "@/hooks/use-profile";
import Link from "next/link";

interface ProfileTagType {
  username : string
}

export function ProfileTag({ username }:ProfileTagType) {

  const profile = useProfile()

  return (
    <Link href={username === profile.username ? `/app/profile/me` : `/app/profile/${username}`} className="p-1 px-5 hover:bg-zinc-500 transition-all duration-150 rounded-lg text-[.5rem] underline z-10 bg-zinc-400 text-zinc-50 cursor-pointer">
      { username }
    </Link>
  )
}