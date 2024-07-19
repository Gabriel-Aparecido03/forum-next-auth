import { api } from "@/lib/api";

interface GetByIdProfileParams {
  id: string;
}

interface GetByIdProfileResponse {
  profile: {
    id: string;
    activedAt: Date | null;
    createdAt: Date;
    userId: string;
    description: string | null;
    username: string | null;
    updatedAt: Date | null;
  };
}

export async function GetByIdProfile({ id }: GetByIdProfileParams) {
  try {
    const response = await api.get<GetByIdProfileResponse>(
      `/profile/get-by-id/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
