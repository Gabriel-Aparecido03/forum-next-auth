import { api } from "@/lib/api"

interface PutPublicationParamType {
  publicationId : string
  description : string
  title : string
}

export async function putPublication({ publicationId , description, title }: PutPublicationParamType) {
  try {
    const res = await api.put(`/publication/${publicationId}`,{ description , title })
    return res
  } catch (error) {
    throw error
  }
}