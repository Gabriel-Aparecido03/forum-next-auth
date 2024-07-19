"use client";

import { ProfileSwitchter } from "@/components/profile-switcher";
import { Profiler } from "@/components/profiler";
import { Button } from "@/components/ui";
import { updateProfileViewInfos } from "@/features/profile-view/profile-view-slice";
import { updateUserViewInfos } from "@/features/user-view/user-slice-view";
import { useProfile } from "@/hooks/use-profile";
import { useUser } from "@/hooks/use-user";
import { useAppDispatch } from "@/redux-hook";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const profile = useProfile()
  const user = useUser()

  dispatch(updateProfileViewInfos(profile))
  dispatch(updateUserViewInfos(user))

return (
  <main className="gap-8 w-[96%] max-w-[1200px] mx-auto">
      <h1 className="font-bold text-6xl text-left mt-10">Profile</h1>
      <div className="w-[90%] mx-auto">
        <div className="flex items-center justify-between">
          <Profiler />
          <Button text="Edit profile" onClick={() => push('/app/profile/me/edit')} />
        </div>
        <ProfileSwitchter />
      </div>
    </main>
  );
}
