import { api } from "@/lib/api"

interface CreateCommentReplyParamType {
  content : string
  commentId : String
}

export async function createCommentReply(data:CreateCommentReplyParamType) {
  try {
    const res = await api.post(`/comment-reply`,{ ...data })
    return res
  } catch (error) {
    throw error
  }
}