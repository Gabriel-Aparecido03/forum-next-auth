import { api } from "@/lib/api";

interface FetchCommentsRepliesProfileResponse {
  commentsReplies: {
    username: string | null;
    profileId: string;
    createdAt: Date;
    updatedAt: Date | null;
    content: string;
    id: string;
}[]
}
interface FetchCommentsRepliesProfileParams {
  profileId: string;
}

export async function fetchCommentsRepliesProfile({ profileId }:FetchCommentsRepliesProfileParams) {
  try {
    const res = await api.get<FetchCommentsRepliesProfileResponse>(`/profile/get-by-id/${profileId}/fetch-comments-replies`)
    return res
  } catch (error) {
    throw error
  }
}