import { api } from "@/lib/api";

interface fetchCommentsRepliesParams {
  commentId: string;
}

interface fetchCommentsRepliesResponse {
  datas: {
    profileId: string;
    id: string;
    content: string;
    publicationId: string;
    createdAt: Date;
    updatedAt: Date | null;
    username: string | null;
  }[];
}
 
export function fetchCommentsReplies({ commentId }:fetchCommentsRepliesParams) {
  try {
    const response = api.get<fetchCommentsRepliesResponse>(`/comment/${commentId}/comments-replies`)
    return response
  } catch (error) {
    throw error
  }
}