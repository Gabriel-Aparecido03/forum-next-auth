import { api } from "@/lib/api";

interface FetchCommentsProfileResponse {
  comments: {
    username: string | null;
    profileId: string;
    createdAt: Date;
    updatedAt: Date | null;
    content: string;
    id: string;
}[]
}
interface FetchCommentsProfileParams {
  profileId: string;
}

export async function fetchCommentsProfile({ profileId }:FetchCommentsProfileParams) {
  try {
    const res = await api.get<FetchCommentsProfileResponse>(`/profile/get-by-id/${profileId}/fetch-comments`)
    return res
  } catch (error) {
    throw error
  }
}