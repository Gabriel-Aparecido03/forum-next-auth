import { api } from "@/lib/api"

interface ItsRelevanceCommentReplyParamType {
  commentReplyId : string
}

export async function itsRelevanceCommentReply({ commentReplyId  }: ItsRelevanceCommentReplyParamType) {
  try {
    const res = await api.post(`/comment-reply/${commentReplyId}/its-relevance`)
    return res
  } catch (error) {
    throw error
  }
}