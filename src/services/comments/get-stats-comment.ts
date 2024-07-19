import { api } from "@/lib/api"

interface GetStatsCommentParamType {
  commentId : string
}

interface ResponseGetStatsComment {
  count : number
}

export async function getStatsComment({ commentId  }: GetStatsCommentParamType) {
  try {
    const res = await api.get<ResponseGetStatsComment>(`/comment/${commentId}/stats-relevance`)
    return res
  } catch (error) {
    throw error
  }
}