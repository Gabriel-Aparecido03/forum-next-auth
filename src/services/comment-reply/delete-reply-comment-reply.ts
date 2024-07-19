import { api } from "@/lib/api"

interface DeleteCommentReplyParamType {
  commentReplyId : string
}

export async function deleteCommentReply({ commentReplyId }: DeleteCommentReplyParamType) {
  try {
    const res = await api.delete(`/comment-reply/${commentReplyId}`)
    return res
  } catch (error) {
    throw error
  }
}