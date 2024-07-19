import { api } from "@/lib/api"

interface DeletePublicationParamType {
  publicationId : string
}

export async function deletePublication({ publicationId }: DeletePublicationParamType) {
  try {
    const res = await api.delete(`/publication/${publicationId}`)
    return res
  } catch (error) {
    throw error
  }
}