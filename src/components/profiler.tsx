"use client";

import { useProfileView } from "@/hooks/use-profile-view";
import { useUserView } from "@/hooks/use-user-view";


export function Profiler() {

  const { username } = useProfileView()
  const { email } = useUserView()

  return (
    <div className="flex justify-start gap-4 items-center mt-10">
      <div>
        <p className="text-xl text-zinc-800 font-bold">{ username }</p>
        <span className="text-sm text-zinc-600">{ email }</span>
      </div>
    </div>
  );
}
