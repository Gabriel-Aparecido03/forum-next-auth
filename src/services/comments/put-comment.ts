import { api } from "@/lib/api"

interface PutCommentParamType {
  commentId : string
  content : string
}

export async function putComment({ commentId , content }: PutCommentParamType) {
  try {
    const res = await api.put(`/comment/${commentId}`,{ content })
    return res
  } catch (error) {
    throw error
  }
}