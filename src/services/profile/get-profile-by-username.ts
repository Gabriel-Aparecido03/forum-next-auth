import { api } from "@/lib/api";

interface GetByUsernameProfileParams {
  username: string;
}

interface GetByUsernameProfileResponse {
  profile: {
    id: string;
    activedAt: Date | null;
    createdAt: Date;
    userUsername: string;
    description: string | null;
    username: string | null;
    updatedAt: Date | null;
    userId : string
  };
}

export async function getByUsernameProfile({ username }: GetByUsernameProfileParams) {
  try {
    const response = await api.get<GetByUsernameProfileResponse>(
      `/profile/get-by-username/${username}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
