import { api } from "@/lib/api"

interface GetStatsCommentReplyParamType {
  commentReplyId : string
}

interface ResponseGetStatsCommentReply {
  count : number
}

export async function getStatsCommentReply({ commentReplyId  }: GetStatsCommentReplyParamType) {
  try {
    const res = await api.get<ResponseGetStatsCommentReply>(`/comment-reply/${commentReplyId}/stats-relevance`)
    return res
  } catch (error) {
    throw error
  }
}