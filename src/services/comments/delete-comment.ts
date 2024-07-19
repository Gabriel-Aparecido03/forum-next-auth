import { api } from "@/lib/api"

interface DeleteCommentParamType {
  commentId : string
}

export async function deleteComment({ commentId }: DeleteCommentParamType) {
  try {
    const res = await api.delete(`/comment/${commentId}`)
    return res
  } catch (error) {
    throw error
  }
}