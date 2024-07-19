import { api } from "@/lib/api";

interface FetchPublicationsProfileResponse {
  publications: {
    username: string | null;
    profileId: string;
    createdAt: Date;
    updatedAt: Date | null;
    title: string;
    description: string;
    id: string;
  }[];
}
interface FetchPublicationsProfileParams {
  profileId: string;
}

export async function fetchPublicationsProfile({ profileId }:FetchPublicationsProfileParams) {
  try {
    const res = await api.get<FetchPublicationsProfileResponse>(`/profile/get-by-id/${profileId}/fetch-publications`)
    return res
  } catch (error) {
    throw error
  }
}