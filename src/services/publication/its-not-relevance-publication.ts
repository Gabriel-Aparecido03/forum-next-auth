import { api } from "@/lib/api"

interface ItsNotRelevancePublicationParamType {
  publicationId : string
}

export async function postItsNotRelevancePublication({ publicationId  }: ItsNotRelevancePublicationParamType) {
  try {
    const res = await api.post(`/publication/${publicationId}/its-not-relevance`)
    return res
  } catch (error) {
    throw error
  }
}