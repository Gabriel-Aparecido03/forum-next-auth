import { api } from "@/lib/api";

interface GetByUserIdProfileParams {
  userId : string
}

interface GetByUserIdProfileResponse {
  profile: {
    id: string;
    activedAt: Date | null;
    createdAt: Date;
    userId: string;
    description: string | null;
    username: string | null;
    updatedAt: Date | null;
}
}

export async function GetByUserIdProfile({ userId } : GetByUserIdProfileParams) {
  try {
    const response = await api.get<GetByUserIdProfileResponse>(`/profile/get-by-user-id/${userId}`)
    return response
  } catch (error) {
    throw error
  }
}