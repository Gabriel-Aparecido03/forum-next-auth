import { api } from "@/lib/api"

interface ItsNotRelevanceCommentParamType {
  commentId : string
}

export async function itsNotRelevanceComment({ commentId  }: ItsNotRelevanceCommentParamType) {
  try {
    const res = await api.post(`/comment/${commentId}/its-not-relevance`)
    return res
  } catch (error) {
    throw error
  }
}