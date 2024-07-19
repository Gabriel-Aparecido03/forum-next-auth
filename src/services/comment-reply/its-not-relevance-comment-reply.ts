import { api } from "@/lib/api"

interface ItsNotRelevanceCommentReplyParamType {
  commentReplyId : string
}

export async function itsNotRelevanceCommentReply({ commentReplyId  }: ItsNotRelevanceCommentReplyParamType) {
  try {
    const res = await api.post(`/comment-reply/${commentReplyId}/its-not-relevance`)
    return res
  } catch (error) {
    throw error
  }
}