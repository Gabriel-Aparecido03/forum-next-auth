import { updateProfileInfos } from "@/features/profile/profile-slice";
import { updateUserInfos } from "@/features/user/user-slice";
import { useAppDispatch } from "@/redux-hook";
import { meUser } from "@/services/auth/user-me";
import { validateAccess } from "@/services/auth/validate-access";
import { meProfile } from "@/services/profile/me-profile";
import { ReactNode, useEffect } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  async function validateIfHasLogging() {
    try {
      const res = await validateAccess()

      if (res.status === 200) {
        const responseUser = await meUser();
        const responseProfile = await meProfile()

        const { email, id } = responseUser.data.user;

        dispatch(
          updateUserInfos({
            email,
            id,
          })
        );

        const { username, description, activedAt } =
          responseProfile.data.profile;

        dispatch(
          updateProfileInfos({
            id: responseProfile.data.profile.id,
            username,
            userId: id,
            description,
            activedAt,
          })
        );
      }
    } catch (error) {}
  }

  useEffect(() => {
    validateIfHasLogging();
  }, []);

  return <>{children}</>;
}
