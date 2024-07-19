import { api } from "@/lib/api"

interface CreatePublicationParamType {
  title : string
  description : string
}

export async function createPublication(data: CreatePublicationParamType) {
  try {
    const response = await api.post('/publication',{ ...data })
    return response
  } catch (error) {
    throw error
  }
}