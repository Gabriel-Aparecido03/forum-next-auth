import { api } from "@/lib/api";

interface fetchCommentsParams {
  publicationId: string;
}

interface fetchCommentsResponse {
  data: {
    profileId: string;
    id: string;
    content: string;
    publicationId: string;
    createdAt: Date;
    updatedAt: Date | null;
    username: string | null;
  }[];
  count : number,
}
 
export function fetchComments({ publicationId }:fetchCommentsParams) {
  try {
    const response = api.get<fetchCommentsResponse>(`/publication/${publicationId}/comments`)
    return response
  } catch (error) {
    throw error
  }
}