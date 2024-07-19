"use client";

import { ProfileSwitchter } from "@/components/profile-switcher";
import { Profiler } from "@/components/profiler";
import { ProfilerShimmer } from "@/components/shimmers/profiler";
import { updateProfileViewInfos } from "@/features/profile-view/profile-view-slice";
import { updateUserViewInfos } from "@/features/user-view/user-slice-view";
import { api } from "@/lib/api";
import { useAppDispatch } from "@/redux-hook";
import { getByUsernameProfile } from "@/services/profile/get-profile-by-username";
import { useQuery } from "@tanstack/react-query";

export default function Profile({ params : { username} }:{ params : { username : string }}) {

  const dispatch = useAppDispatch()

  async function handleGetProfileInfos() {
    try {
      const responseProfile = await getByUsernameProfile({ username })
      if(responseProfile.status === 200 ) {
        const { username ,description,activedAt,userId, id } = responseProfile.data.profile

        dispatch(updateProfileViewInfos({
          activedAt,
          description,
          id,
          userId,
          username
        }))

        const responseUser = await api.get(`/auth/get-by-id/${userId}`)
        if(responseUser.status === 200) {
          dispatch(updateUserViewInfos({
            email : responseUser.data.user.email,
            id : userId
          }))
        }
      }
    } catch (error) {}
  }

  const { isLoading } = useQuery({ initialData : null , queryKey: [`profile-${username}`] , queryFn : handleGetProfileInfos})

  return (
    <main className="gap-8 w-[96%] max-w-[1200px] mx-auto">
      <h1 className="font-bold text-6xl text-left mt-10">Profile</h1>
      <div className="w-[90%] mx-auto">
        <div className="flex items-center justify-between">
          { isLoading ? <ProfilerShimmer /> : <Profiler />}
        </div>
        { !isLoading && <ProfileSwitchter />}
      </div>
    </main>
  );
}
