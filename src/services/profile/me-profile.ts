import { api } from "@/lib/api";

interface MeProfileResponse {
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

export async function meProfile() {
  try {
    const response = await api.get<MeProfileResponse>('/profile/me')
    return response
  } catch (error) {
    throw error
  }
}