import { api } from "@/lib/api"

interface ItsRelevanceCommentParamType {
  commentId : string
}

export async function itsRelevanceComment({ commentId  }: ItsRelevanceCommentParamType) {
  try {
    const res = await api.post(`/comment/${commentId}/its-relevance`)
    return res
  } catch (error) {
    throw error
  }
}