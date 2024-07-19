import { api } from "@/lib/api"

interface ItsRelevancePublicationParamType {
  publicationId : string
}

export async function postItsRelevancePublication({ publicationId  }: ItsRelevancePublicationParamType) {
  try {
    const res = await api.post(`/publication/${publicationId}/its-relevance`)
    return res
  } catch (error) {
    throw error
  }
}