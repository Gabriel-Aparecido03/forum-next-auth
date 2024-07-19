import { api } from "@/lib/api"

interface PutCommentParamType {
  commentReplyId : string
  content : string
}

export async function putCommentReply({ commentReplyId , content }: PutCommentParamType) {
  try {
    const res = await api.put(`/comment-reply/${commentReplyId}`,{ content })
    return res
  } catch (error) {
    throw error
  }
}