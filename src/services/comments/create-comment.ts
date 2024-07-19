import { api } from "@/lib/api"

interface createCommentParams {
  publicationId : string
  content : string
  profileId : string
}

export async function createComment({ content ,profileId ,publicationId  }: createCommentParams) {
  try {
    const response = await api.post(`/publication/${publicationId}/comments`,{ content , profileId })
    return response
  } catch (error) {
    throw error
  }
}