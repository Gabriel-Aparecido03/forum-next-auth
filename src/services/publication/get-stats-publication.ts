import { api } from "@/lib/api"

interface GetStatsPublicationParamType {
  publicationId : string
}

interface ResponseGetStatsPublication {
  count : number
}

export async function getStatsPublication({ publicationId  }: GetStatsPublicationParamType) {
  try {
    const res = await api.get<ResponseGetStatsPublication>(`/publication/${publicationId}/stats-relevance`)
    return res
  } catch (error) {
    throw error
  }
}